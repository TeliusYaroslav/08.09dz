// с интерфейсами я так и не подружился 


import { Request, Response } from 'express'
import { UserService } from './userService'
import jwt from 'jsonwebtoken'

const userService = new UserService()
const JWT_SECRET = 'your_jwt_secret_key'
function loginUser(req: Request, res: Response) {
    res.render('login')
}
function registrationUser(req: Request, res: Response) {
    res.render('registration')
}
async function authUser(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try {
        const user = await userService.getUserByEmail(email);

        if (user && user.password === password) {
            const token = jwt.sign(
                { email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, { httpOnly: true, secure: true })
            res.status(200).json({ message: 'Logged in successfully' })
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
async function authRegistration(req: Request, res: Response) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' })
    }
    try {
        const existingUser = await userService.getUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const newUser = await userService.registerUser({ username, email, password })
        const token = jwt.sign(
            { email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.cookie('token', token, { httpOnly: true, secure: true })
        res.status(201).json({ message: 'Registered successfully' })
    } catch (error) {
        console.error('Ошибка при регистрации:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


export {
    loginUser,
    registrationUser,
    authUser,
    authRegistration
};
