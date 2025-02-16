import { User, CreateUserData} from './utype'
import {client } from "../client/prismaClient"

export async function findByEmail(email: string): Promise<User | null> {
    if (!email) {
        throw new Error('Email is required')
    }
    const user = await client.user.findUnique({
        where: { email },
    });
    return user ? (user as User) : null
}

export async function createUser(data: CreateUserData): Promise<User> {
    const user = await client.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password,
            role: 'user',
        },
    })
    return user as User
}
