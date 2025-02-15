import { PrismaClient } from '@prisma/client'
import { IUser, IUserCreateData, IUserRepository } from './utype'

const prisma = new PrismaClient()

export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    if (!email) {
      throw new Error('Email is required')
    }
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user ? (user as IUser) : null
  }

  async createUser(userData: IUserCreateData): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'user',
      },
    })
    return user as IUser
  }
}
