import { Request, Response } from "express" 
import * as postService from "./postServices" 

export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await postService.getAllPosts() 
        res.render('post', { posts }) 
    } catch (error) {
        console.error("Error retrieving posts:", error) 
        res.status(500).send("Error retrieving posts") 
    }
}

export async function getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id) 
    try {
        const post = await postService.getPostByIdServices(id) 
        if (post) {
            res.render('posts', { post }) 
        } else {
            res.status(404).send("Post not found") 
        }
    } catch (error) {
        console.error("Error retrieving post by ID:", error) 
        res.status(500).send("Error retrieving post") 
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const { name, description, author, time } = req.body 
        await postService.createPostService({ name, description, author, time }) 
        res.status(201).send("Post created successfully") 
    } catch (error) {
        console.error("Error creating post:", error) 
        res.status(500).send("Error creating post") 
    }
}
