

import express,{Express} from "express"
import path from "path"


// 
import router from './PostsApp/postRouter'

const app:Express = express()

const HOST:string = 'localhost' 
const PORT:number = 8000

app.set("view engine", "ejs")

app.set("views", path.resolve(__dirname, "./templates"))

app.use(express.json())

app.use("/static/", express.static(path.resolve(__dirname, "./static")))

app.use(router)


app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

