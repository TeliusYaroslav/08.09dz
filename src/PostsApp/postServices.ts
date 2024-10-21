import postsRepository from './postRepository'  
import { Prisma } from '@prisma/client' 

const getCurrentDate = postsRepository.getCurrentDate 

async function getAllPosts(max?: number) {
    try {
        const posts = await postsRepository.getAllPosts(max) 
        return posts 
    } catch (err) {
        throw new Error('Ошибка при получении постов') 
    }
}

async function getPostByIdServices(id: number) {
    try {
        const { post, error } = await postsRepository.getPostByIdServices(id) 
        return { post, error } 
    } catch (err) {
        return { post: null, error: 'Неизвестная ошибка' } 
    }
}

async function createPostService(data: Prisma.PostsCreateInput) {
    try {
        const post = await postsRepository.createPostService(data) 
        return post 
    } catch (err) {
        throw new Error('Ошибка при создании поста') 
    }
}

const postsService = {
    getCurrentDate,
    getAllPosts,
    getPostByIdServices,
    createPostService,
} 

export default postsService 
