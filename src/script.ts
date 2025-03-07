import express, { Express, Request, Response, NextFunction } from "express" 
import cookieParser from 'cookie-parser' 
import path from "path" 
import userRouter from './UserApp/userRouter' 
import postRouter from './PostsApp/postRouter' 
import authMiddleware from './middlewares/authMiddleware' 
import userRoleMiddleware from './middlewares/userRoleMiddleware' 
import commentRouter from './ComentApp/comentRouter'
import cors from "cors"
import PostRouterApi from "./PostsApp/PostRouterApi"
import categoryRouterApi from "./CategoryApp/categoryRouterApi"
import userRouterApi from "./UserApp/userRouterApi"



const app: Express = express() 
const HOST: string = 'localhost' 
const PORT: number = 8001 

app.use(cors({
    origin : ["http://localhost:3000"]
}))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 


app.set("view engine", "ejs") 
app.set("views", path.resolve(__dirname, "./templates")) 


app.use("/static/", express.static(path.resolve(__dirname, "./static"))) 


app.use('/users', userRouter) 
app.use('/posts/', authMiddleware, postRouter) 
app.use('/comments/', commentRouter)
app.use("/api/posts/", PostRouterApi)
app.use("/api/posts/", PostRouterApi)
app.use("/api/categories/", categoryRouterApi)
app.use("/api/users/", userRouterApi)





























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

