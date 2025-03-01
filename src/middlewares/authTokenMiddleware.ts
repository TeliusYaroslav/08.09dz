import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/token'

export interface AuthRequest extends Request {
  user?: { email: string; userId: number }
}

export function authTokenMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authTitel = req.headers.authorization

  if (!authTitel) {
    res.status(401).json({ message: "Отсутствует заголовок Authorization" })
    return
  }
  const parts = authTitel.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(400).json({ message: "Неверный формат заголовка Authorization" })
    return
  }
  const token = parts[1]
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { email: string, userId: number }
    req.user = { email: decoded.email, userId: decoded.userId }
    next()
  } catch (error) {
    res.status(403).json({ message: "Неверный или просроченный токен" })
    return
  }
}























// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import { SECRET_KEY } from '../config/token'

// export interface AuthRequest extends Request {
//     user?: { email: string ; userId: number } 
// }

// export function authTokenMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
//     const authTitel = req.headers.authorization
//     if (!authTitel) {
//         return res.status(401).json({ message: "Отсутствует заголовок Authorization" })
//     }
//     const parts = authTitel.split(" ")
//     if (parts.length !== 2 || parts[0] !== "Bearer") {
//         return res.status(400).json({ message: "Неверный формат заголовка Authorization" })
//     }
//     const token = parts[1]
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY) as { email: string, userId: number }
//         req.user = { email: decoded.email, userId: decoded.userId }
//         next()
//     } catch (error) {
//         res.status(403).json({ message: "Неверный или просроченный токен" })
//         return 
//     }
// }
