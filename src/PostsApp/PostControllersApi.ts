import { Request, Response } from "express"
import * as postService from "./postServices"


async function getPosts(req: Request, res: Response) {
    const posts = await postService.getAllPosts() 
    res.json( posts ) 
}


async function getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id) 
    const post = await postService.getPostByIdServices(id) 
    res.json(post) 
}



const postControllerApi = {
    getPosts ,
    getPostById
}

export default postControllerApi