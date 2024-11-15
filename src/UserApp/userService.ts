import { UserRepository, IUserRepository, IUser, IUserCreateData } from './userRepository'
import jwt from 'jsonwebtoken'

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser | null>
  authenticateUser(email: string, password: string): Promise<string>
  registerAndAuthenticateUser(userData: IUserCreateData): Promise<string>
  generateJWT(user: IUser): string
}

export class UserService implements IUserService {
  private userRepository: IUserRepository = new UserRepository()
  private jwtSecret = 'verysecretkey'

  async getUserByEmail(email: string): Promise<IUser | null> {
    if (!email) {
      const error = new Error('Требуется электронная почта') as Error & { status?: number }
      error.status = 400
      throw error
    }
    return this.userRepository.findUserByEmail(email)
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email)

    if (!user || user.password !== password) {
      const error = new Error('Незарегестрирован') as Error & { status?: number }
      error.status = 401
      throw error
    }

    return this.generateJWT(user)
  }

  async registerAndAuthenticateUser(userData: IUserCreateData): Promise<string> {
    const existingUser = await this.getUserByEmail(userData.email)

    if (existingUser) {
      const error = new Error('Пользователь уже существует') as Error & { status?: number }
      error.status = 400
      throw error
    }

    const newUser = await this.userRepository.createUser(userData)
    return this.generateJWT(newUser)
  }

  generateJWT(user: IUser): string {
    const payload = { email: user.email, role: user.role }
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' })
  }
}
