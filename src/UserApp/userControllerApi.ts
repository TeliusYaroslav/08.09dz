import { Request, Response } from 'express'
import * as userService from './userService'
import bcrypt from 'bcryptjs'

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {

        res.status(400).json({ message: 'Требуется адрес электронной почты и пароль' })
        return
    }
    try {
        const user = await userService.getUserByEmail(email)
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' })
            return
        }
        const rightPassword = await bcrypt.compare(password, user.password)
        if (!rightPassword) {
            res.status(401).json({ message: 'Пароли не совпадают' })
            return
        }
        const token = await userService.authenticateUser(email, password)
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ token })
    // any не используем. instanceof
    } catch (error: any) {
        console.error('Ошибка при авторизации:', error)
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' })
    }
}

export async function authRegistration(req: Request, res: Response) {
    const { username, email, password, role } = req.body
    if (!username || !email || !password || !role) {
        res.status(400).json({ message: 'Введите данные' })
        return
    }
    try {
        const rightUser = await userService.getUserByEmail(email)
        if (rightUser) {
            res.status(409).json({ message: 'Такой пользователь уже существует' })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const token = await userService.registerAndAuthenticateUser({
            username,
            email,
            password: hashedPassword,
            role,
        })
        res.cookie('token', token, { httpOnly: true })
        res.status(201).json({ token })
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' })
    }
}
