const moment = require("moment")
const express = require("express")
const path = require("path")

const router = require("./routers/postRouter");



const app = express()

const HOST = 'localhost' 
const PORT = 8000

app.set("view engine", "ejs")

app.set("views", path.resolve(__dirname, "./templates"))

app.use(express.json())

app.use("/static/", express.static(path.resolve(__dirname, "./static")))

app.use(router)


app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

