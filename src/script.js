const moment = require("moment")
const express = require("express")
const path = require("path")

const app = express()

const HOST = 'localhost' 
const PORT = 8000

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./templates"))
app.use(express.json())

app.use("/static/", express.static(path.resolve(__dirname, "./static")))

function getDatee() {
    return moment().format("YYYY/MM/DD hh:mm:ss")}
app.get("/date",(req,res) => {
    res.send(getDatee())})
app.get('/index/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
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


app.get('/post', (req, res) => {
    res.render('post', {posts});
  });



app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    if (id > 0 && id <= posts.length) {
        const context = { posts: posts[id - 1], error: null }   //без этого null у меня выводилась ошибка но не выводились данные нормальных id жаловалось что не может найти этот тип данных
        res.render('posts', context)
    } else {
    res.render('posts', { error: "Такого поста не существует" })} // а так как я и говорил просто проверка списка по длинне и вывод ошибки через контекст
});


app.post("/postes/create", (req,res)=>{
    console.log(req.body);
    const postse = req.body
    posts.push({ name: postse.name, description: postse.description, author: postse.author });
    res.send("bobr")
})


app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}`)
})