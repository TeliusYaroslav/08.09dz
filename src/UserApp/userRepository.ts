import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient() 

export class UserRepository {
    async findUserByEmail(email: string) {
        if (!email) {
            throw new Error('Email is required') 
        }
        const user = await prisma.user.findUnique({
            where: { email },
        }) 
        return user || null  
    }

    async createUser(userData: { username: string; email: string; password: string }) {
        const user = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                role: 'user', 
            },
        });
        return user
    }
}
