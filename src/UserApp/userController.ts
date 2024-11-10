import { Request, Response } from 'express'
import { UserService, IUserService } from './userService'

const userService: IUserService = new UserService()

export async function loginUser(req: Request, res: Response) {
  res.render('login')
}

export async function registrationUser(req: Request, res: Response) {
  res.render('registration')
}

export async function authUser(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }
  
  try {
    const user = await userService.getUserByEmail(email)

    if (user && user.password === password) {
      const token = userService.generateJWT(user)
      res.cookie('token', token, { httpOnly: true })
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function authRegistration(req: Request, res: Response) {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email, and password are required' })
    return
  }

  try {
    const existingUser = await userService.getUserByEmail(email)

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    const newUser = await userService.registerUser({ username, email, password })
    const token = userService.generateJWT(newUser)
    res.cookie('token', token, { httpOnly: true })
    res.status(201).json({ token })
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
