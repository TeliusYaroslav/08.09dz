import * as postRepository from "./postRepository"
import { CreatePostData } from "./ptypes"

export async function getAllPosts() {
    return await postRepository.getAllPosts()
}

export async function getPostByIdServices(id: number) {
    return await postRepository.getPostById(id)
}

export async function createPostService(postData: CreatePostData){
    return await postRepository.createPost(postData)
}