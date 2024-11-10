import { UserRepository, IUserRepository, IUser, IUserCreateData } from './userRepository'
import jwt from 'jsonwebtoken'

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>
  registerUser(userData: IUserCreateData): Promise<IUser>
  generateJWT(user: IUser): string
}

export class UserService implements IUserService {
  private userRepository: IUserRepository = new UserRepository()
  private jwtSecret = 'verysecretkey'

  async getUserByEmail(email: string): Promise<IUser | null> {
    if (!email) {
      throw new Error('Email is required')
    }
    return this.userRepository.findUserByEmail(email)
  }

  async registerUser(userData: IUserCreateData): Promise<IUser> {
    return this.userRepository.createUser(userData)
  }

  generateJWT(user: IUser): string {
    const payload = { email: user.email, role: user.role }
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' })
  }
}
