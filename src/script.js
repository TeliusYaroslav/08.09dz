const moment = require("moment")
const express = require("express")

const app = express()

const HOST = 'localhost' 
const PORT = 8000

function getDatee() {
    return moment().format("YYYY/MM/DD hh:mm:ss")}

app.get("/date",(req,res) => {
    
    res.send(getDatee())})

app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

