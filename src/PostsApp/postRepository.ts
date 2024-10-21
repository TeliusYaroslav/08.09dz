import { PrismaClient, Prisma } from '@prisma/client' 
import moment from 'moment' 

const client = new PrismaClient() 

function getCurrentDate() {
    return moment().format("YYYY/MM/DD HH:mm:ss") 
}

async function getAllPosts(max?: number) {
    try {
        const posts = await client.posts.findMany({
            take: max
        }) 
        return posts 
    } catch (err) {

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Ошибка Prisma: ${err.code} - ${err.message}`) 
            throw new Error('Ошибка при получении постов') 
        } else {
            throw new Error('Ошибка при получении постов') 
        }
    }
}

async function getPostByIdServices(id: number) {
    try {
        const post = await client.posts.findUnique({
            where: { id: id },
        }) 

        if (post) {
            return { post, error: null } 
        }
        return { error: "Такого поста не существует" } 
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return { post: null, error: 'Ошибка при получении поста' } 
        }
        return { post: null, error: 'мы такое не знаем' } 
    }
}


async function createPostService(data: Prisma.PostsCreateInput) {
    try {
        const post = await client.posts.create({
            data: data,
        }) 
        return post 
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error('Ошибка при создании поста') 
        } else {
            throw new Error('Ошибка при создании поста') 
        }
    }
}

const postsRepository= {getCurrentDate,
                    getAllPosts,
                    getPostByIdServices,
                    createPostService}
export default postsRepository