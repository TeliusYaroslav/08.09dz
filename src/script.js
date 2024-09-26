const moment = require("moment")
const express = require("express")
const path = require("path")

const app = express()

const HOST = 'localhost' 
const PORT = 8000

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./templates"))


app.use("/static/", express.static(path.resolve(__dirname, "./static")))

function getDatee() {
    return moment().format("YYYY/MM/DD hh:mm:ss")}
app.get("/date",(req,res) => {
    res.send(getDatee())})
app.get('/index/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
})

app.get("/post", (req, res) => {
    const context = {
        posts: [{name:"post1",author:"Author1"},
                {name:"post2",author:"Author2"}]};
    res.render("post", context)
})

const posts = [
    {
        id: 1,
        name: 'post1',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description',
        author:"Author1"
    },
    {
        id: 2,
        name: 'post2',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description2',
        author:"Author2"
    },
    {
        id: 3,
        name: 'post3',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description3',
        author:"Author3"
    },
]
app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    if (id > 0 && id <= posts.length) {
        const context = { posts: posts[id - 1], error: null }   //без этого null у меня выводилась ошибка но не выводились данные нормальных id жаловалось что не может найти этот тип данных
        res.render('posts', context)
    } else {
    res.render('posts', { error: "Такого поста не существует" })} // а так как я и говорил просто проверка списка по длинне и вывод ошибки через контекст
});














app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})