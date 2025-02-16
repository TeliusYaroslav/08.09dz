import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{}>
export type CreateUserData = Prisma.UserUncheckedCreateInput



