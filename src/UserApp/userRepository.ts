import { CreateUserData } from './utype'
import { client } from "../client/prismaClient"

export async function findByEmail(email: string){
    if (!email) {
        throw new Error('Email is required')
    }
    const user = await client.user.findUnique({
        where: { email },
    })
    return user ? (user) : null
}

export async function createUser(data: CreateUserData){
    const user = await client.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password,
            role: 'user',
        },
    })
    return user
}

export async function getUserById(userId: number){
    const user = await client.user.findUnique({
        where: { id: userId },
    })

    return user || null
}