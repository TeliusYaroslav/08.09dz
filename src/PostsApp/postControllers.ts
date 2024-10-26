
//  Контроллеры обрабатывают запросы, поступающие от Роутера
//  Контроллеры разделяют логику приложения 
 
import {Request, Response} from "express"
// import { getCurrentDate,getAllPosts,getPostByIdServices, createPostService } from "./postServices"
import createPostService from './postServices'

function getDate(req:Request, res:Response) {
    const currentDate = createPostService.getCurrentDate()
    res.send(currentDate)
}

function getPosts(req:Request, res:Response) {
    const posts = createPostService.getAllPosts()
    res.render('post', { posts })
}

function getPostById(req:Request, res:Response) {
    const id = req.params.id
    console.log(id)

    const context = createPostService.getPostByIdServices(+id)
    res.render('posts', context)
}

function createPost(req:Request, res:Response) {
    console.log(req.body)
    const postse = req.body
    createPostService.createPostService(postse)
    // getAllPosts().push({ 
    //     name: postse.name, 
    //     description: postse.description, 
    //     author: postse.author 
    // })
}

export{
    getDate,
    getPosts,
    getPostById,
    createPost
};
