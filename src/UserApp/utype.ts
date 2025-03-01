import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{}>
export type CreateUserData = Prisma.UserUncheckedCreateInput





  export interface UserWithoutPassword {
    id: number
    username: string
    email: string
    role: string
  }
  