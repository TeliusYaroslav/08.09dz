const moment = require("moment")
const express = require("express")
const path = require("path")

const app = express()

const HOST = 'localhost' 
const PORT = 8000


app.use("/static/", express.static(path.resolve(__dirname, "./static")))


function getDatee() {
    return moment().format("YYYY/MM/DD hh:mm:ss")}

app.get("/date",(req,res) => {
    res.send(getDatee())})
    

app.get('/index/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
})


app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

