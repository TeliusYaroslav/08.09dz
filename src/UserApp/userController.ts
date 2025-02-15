import { Request, Response } from 'express'
import * as userService from "./userService"


export async function loginUser(req: Request, res: Response) {
    res.render('login');
}

export async function registrationUser(req: Request, res: Response) {
    res.render('registration');
}

export async function authUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Требуется адрес электронной почты и пароль' })
        return;
    }
    try {
        const token = await userService.authenticateUser(email, password)
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ token })
    } catch (error: any) {
        console.error('Ошибка при авторизации:', error)
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' })
    }
}

export async function authRegistration(req: Request, res: Response) {
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
        res.status(400).json({ message: 'Требуется имя пользователя, адрес электронной почты, пароль и роль.' })
        return;
    }

    try {
        const token = await userService.registerAndAuthenticateUser({ username, email, password, role })
        res.cookie('token', token, { httpOnly: true })
        res.status(201).json({ token })
    } catch (error: any) {
        console.error('Ошибка при регистрации:', error)
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' })
    }
}
