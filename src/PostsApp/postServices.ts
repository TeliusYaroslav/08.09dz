import postsRepository from './postRepository' 
import { Prisma } from '@prisma/client' 


const getCurrentDate = postsRepository.getCurrentDate 


async function getAllPosts(max?: number) {
    try {
        const posts = await postsRepository.getAllPosts(max) 
        return posts 
    } catch (error) {
        console.error('Ошибка при получении постов:', error)
        throw new Error('Ошибка при получении постов') 
    }
}


async function getPostByIdServices(id: number) {
    try {
        const { post, error } = await postsRepository.getPostByIdServices(id) 
        return { post, error } 
    } catch (error) {
        console.error('Ошибка при получении поста по ID:', error) 
        return { post: null, error: 'Неизвестная ошибка' } 
    }
}


async function createPostService(data: Prisma.PostsCreateInput) {
    try {
        const post = await postsRepository.createPostService(data) 
        return post 
    } catch (error) {
        console.error('Ошибка при создании поста:', error)
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

