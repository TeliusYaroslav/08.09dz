import { User, CreateUserData } from './utype'
// так импортировать, конечно, не очень, старайся импортировать то, что тебе надо {sign}
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/token'
import { findByEmail, createUser } from './userRepository'

export function getUserByEmail(email: string): Promise<User | null> {
    // Не понял смысла промиса? избавится от ассинхронности?
    // Она специально в JS/TS реализуется очень легко, поэтому такой промис очень сильно бьет по чиатемости кода
    return new Promise(async (resolve, reject) => {
        // слишком много однотипных проверок(в контроллере уже есть)
        if (!email) {
            // не понятно зачем этот костыль
            const error = new Error('Требуется электронная почта') as Error & { status?: number }
            // Сервис в принципе не должен составлять какие то коды для клиента
            error.status = 400
            reject(error)
            return
        }

        try {
            const user = await findByEmail(email)
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
// все что написано выше применимо и ниже
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

export function registerAndAuthenticateUser(userData: CreateUserData): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await getUserByEmail(userData.email)
            if (existingUser) {
                const error = new Error('Пользователь уже существует') as Error & { status?: number }
                error.status = 400
                reject(error)
                return
            }

            const newUser = await createUser(userData)
            console.log(`Создан новый пользователь: ${newUser.email}`)
            resolve(generateJWT(newUser))
        } catch (err) {
            reject(err)
        }
    })
}

export function generateJWT(user: User): string {
    const payload = { email: user.email, role: user.role }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
}
