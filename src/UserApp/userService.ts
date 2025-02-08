import { UserRepository, IUserRepository, IUser, IUserCreateData } from './userRepository'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/token"

export interface IUserService {
    getUserByEmail(email: string): Promise<IUser | null>
    authenticateUser(email: string, password: string): Promise<string>
    registerAndAuthenticateUser(userData: IUserCreateData): Promise<string>
    generateJWT(user: IUser): string
}

export class UserService implements IUserService {
    private userRepository: IUserRepository = new UserRepository()

    async getUserByEmail(email: string): Promise<IUser | null> {
        if (!email) {
            const error = new Error('Требуется электронная почта') as Error & { status?: number }
            error.status = 400
            throw error
        }
        const user = await this.userRepository.findUserByEmail(email)
        if (!user) {
            console.log('Пользователь не найден')
        } else {
            console.log(`Найден пользователь: ${user.email}`)
        }
        return user
    }

    async authenticateUser(email: string, password: string): Promise<string> {
        const user = await this.getUserByEmail(email)
        if (!user) {
            const error = new Error('Пользователь не найден') as Error & { status?: number };
            error.status = 404;
            throw error;
        }

        if (user.password !== password) {
            const error = new Error('Неверный пароль') as Error & { status?: number };
            error.status = 401;
            throw error;
        }

        console.log('Успешная аутентификация:', user.email);
        return this.generateJWT(user);
    }
    async registerAndAuthenticateUser(userData: IUserCreateData): Promise<string> {
        const existingUser = await this.getUserByEmail(userData.email)

        if (existingUser) {
            const error = new Error('Пользователь уже существует') as Error & { status?: number }
            error.status = 400
            throw error
        }

        const newUser = await this.userRepository.createUser(userData)
        console.log(`Создан новый пользователь: ${newUser.email}`)
        return this.generateJWT(newUser)
    }

    generateJWT(user: IUser): string {
        const payload = { email: user.email, role: user.role }
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    }
}



//в разы лучше чем было