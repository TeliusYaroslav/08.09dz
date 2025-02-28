import { User, CreateUserData} from './utype'
import {client } from "../client/prismaClient"

// В данном случае типизировать функции нет смысла
export async function findByEmail(email: string): Promise<User | null> {
    // Выкидывать ошибки дурной тон, лучше вернуть ее клиенту или просто в консоль вывести
    // К тому же проверка уже есть в сервисе
    if (!email) {
        throw new Error('Email is required')
    }
    // При ассинхронности нужен try...catch иначе код завершит работу
    const user = await client.user.findUnique({
        where: { email }
    })
    // В этом нет смысла
    // return user
    return user ? (user as User) : null
}
// В данном случае типизировать функции нет смысла
export async function createUser(data: CreateUserData) {
    const user = await client.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password,
            role: 'user',
        },
    })
    // as Здесь это не надо
    return user 
}
