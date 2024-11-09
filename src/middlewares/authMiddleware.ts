import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const decoded = jwt.verify(token, 'secret-key') as { email: string; role: string }
    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    (req as any).user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export default authMiddleware
