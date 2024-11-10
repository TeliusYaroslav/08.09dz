import { PrismaClient } from '@prisma/client'

export interface IUser {
  username: string
  email: string
  password: string
  role: string
}

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>
  createUser(userData: IUserCreateData): Promise<IUser>
}

export interface IUserCreateData {
  username: string
  email: string
  password: string
}

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
