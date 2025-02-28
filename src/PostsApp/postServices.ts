import * as postRepository from "./postRepository"
import { CreatePostData, Posts } from "./ptypes"


// выдели один стиль написания функций сервисов
// Здесь таким образом, в юезрах другим
export async function getAllPosts() {
    return await postRepository.getAllPosts()
}

export async function getPostByIdServices(id: number) {
    return await postRepository.getPostById(id)
}
// Тут тип указал, а выше? Или не указывай или указывай везде
export async function createPostService(postData: CreatePostData): Promise<Posts> {
    return await postRepository.createPost(postData)
}