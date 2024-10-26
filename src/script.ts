import express, { Express, Request, Response, NextFunction } from "express" 
import cookieParser from 'cookie-parser' 
import path from "path" 
import userRouter from './UserApp/userRouter' 
import postRouter from './PostsApp/postRouter' 
import authMiddleware from './middlewares/authMiddleware' 
import userRoleMiddleware from './middlewares/userRoleMiddleware' 

const app: Express = express() 
const HOST: string = 'localhost' 
const PORT: number = 8000 


app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 


app.set("view engine", "ejs") 
app.set("views", path.resolve(__dirname, "./templates")) 


app.use("/static/", express.static(path.resolve(__dirname, "./static"))) 


app.use('/users', userRouter) 
app.use('/', userRouter) 
app.use('/posts', authMiddleware, postRouter) 

app.get('/profile', authMiddleware, (req: Request, res: Response) => {
    const user = (req as any).user 
    res.send(`Welcome to your profile, ${user.email}!`) 
}) 


app.post('/admin', authMiddleware, userRoleMiddleware, (req: Request, res: Response) => {
    res.send('Welcome, Admin!') 
}) 


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`) 
}) 

