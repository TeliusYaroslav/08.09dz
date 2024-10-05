
//  Контроллеры обрабатывают запросы, поступающие от Роутера
//  Контроллеры разделяют логику приложения 
 


const service = require("../services/postServices")

function getDate(req, res) {
    const currentDate = service.getCurrentDate()
    res.send(currentDate)
}

function getPosts(req, res) {
    const posts = service.getAllPosts()
    res.render('post', { posts })
}

function getPostById(req, res) {
    const id = req.params.id
    console.log(id)

    const context = service.getPostById(id)
    res.render('posts', context)
}

function createPost(req, res) {
    console.log(req.body)
    const postse = req.body
    service.getAllPosts().push({ 
        name: postse.name, 
        description: postse.description, 
        author: postse.author 
    })
}

module.exports = {
    getDate,
    getPosts,
    getPostById,
    createPost
};
