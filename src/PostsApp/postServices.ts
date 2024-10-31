import * as postRepository from "./postRepository"

export async function getAllPosts() {
    return await postRepository.getAllPosts()
}

export async function getPostByIdServices(id: number) {
    return await postRepository.getPostById(id)
}

export async function createPostService(postData: { name: string; description?: string; author: string; time: number }) {
    return await postRepository.createPost(postData)
}
