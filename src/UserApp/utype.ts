import { Prisma } from "@prisma/client";

export interface IUser {
    email: string;
    password: string;
    role: string;
}

export interface IUserCreateData {
    email: string;
    password: string;
    role: string;
    username: string;
}

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>
    createUser(userData: IUserCreateData): Promise<IUser>
}
export interface IUserService {
    getUserByEmail(email: string): Promise<IUser | null>
    authenticateUser(email: string, password: string): Promise<string>
    registerAndAuthenticateUser(userData: IUserCreateData): Promise<string>
    generateJWT(user: IUser): string
}