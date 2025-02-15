import { IUserRepository, IUser, IUserCreateData } from './utype';
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/token'
import { UserRepository } from './userRepository'


const userRepository: UserRepository = new UserRepository()

export function getUserByEmail(email: string): Promise<IUser | null> {
    return new Promise(async (resolve, reject) => {
        if (!email) {
            const error = new Error('Требуется электронная почта') as Error & { status?: number }
            error.status = 400
            reject(error)
        }

        try {
            const user = await userRepository.findUserByEmail(email)
            if (!user) {
                console.log('Пользователь не найден')
            } else {
                console.log(`Найден пользователь: ${user.email}`)
            }
            resolve(user)
        } catch (err) {
            reject(err)
        }
    })
}

export function authenticateUser(email: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getUserByEmail(email)
            if (!user) {
                const error = new Error('Пользователь не найден') as Error & { status?: number }
                error.status = 404
                reject(error)
                return
            }

            if (user.password !== password) {
                const error = new Error('Неверный пароль') as Error & { status?: number }
                error.status = 401
                reject(error)
                return
            }

            console.log('Успешная аутентификация:', user.email)
            resolve(generateJWT(user))
        } catch (err) {
            reject(err)
        }
    })
}

export function registerAndAuthenticateUser(userData: IUserCreateData): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await getUserByEmail(userData.email)
            if (existingUser) {
                const error = new Error('Пользователь уже существует') as Error & { status?: number }
                error.status = 400
                reject(error)
                return
            }

            const newUser = await userRepository.createUser(userData)
            console.log(`Создан новый пользователь: ${newUser.email}`)
            resolve(generateJWT(newUser))
        } catch (err) {
            reject(err)
        }
    });
}

export function generateJWT(user: IUser): string {
    const payload = { email: user.email, role: user.role }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
}
