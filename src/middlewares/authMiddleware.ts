import { NextFunction, Request, Response } from "express"
import { verify, JwtPayload } from "jsonwebtoken"
import { SECRET_KEY } from "../config/token"

interface IToken {
    id: number;
    username: string;
    email: string;
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token

    if (!token) {
        res.status(403).json({ message: "Доступ запрещён: токен отсутствует" })
        return
    }

    try {
        console.log("Полученный токен:", token);
        const tokenData = verify(token, SECRET_KEY) as IToken;
        res.locals.user = {
            id: tokenData.id,
            username: tokenData.username,
            email: tokenData.email,
        }
        next()
    } catch (error) {
        console.error("Ошибка проверки токена:", error)
        res.status(403).json({ message: "Недействительный токен" })
    }
}
export default authMiddleware