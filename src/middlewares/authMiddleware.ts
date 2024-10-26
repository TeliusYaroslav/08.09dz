import { Request, Response, NextFunction } from 'express'

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const userCookie = req.cookies.user

    if (userCookie) {
      const user = JSON.parse(userCookie)

      if (user.email && user.role) {
        
        (req as any).user = user
        return next() 
      }
    }
    res.status(401).json({ message: 'Unauthorized' })
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export default authMiddleware
