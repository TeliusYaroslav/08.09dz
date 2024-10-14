import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function createPost(){
    const post = await prisma.posts.create({
        data: {
            name: 'First Post',
            time: 120,
            description: 'desepticon',
            author: 'Avatar 1'
        }
    }) 
    console.log(post) 
}


async function createMultiplePosts(){
    const posts = await prisma.posts.createMany({
        data: [
            { name:'Post1', time: 60, description:'desepticon1', author:'Avatar1' },
            { name:'Post2', time: 90, description:'desepticon2', author:'Avatar2' },
            { name:'Post3', time: 150, description:'desepticon3', author:'Avatar3' }
        ]
    }) 
    console.log(`Was created ${posts.count}posts`) 
}

async function getPostById(){
    const post = await prisma.posts.findUnique({
        where: {id: 1}}) 
    console.log('post', post) 
}

async function getMultiplePosts(){
    const posts = await prisma.posts.findMany() 
    console.log('posts', posts) 
}

async function updatePost() {
    const post = await prisma.posts.update({
        where: {id: 1},
        data: {name: 'Updated Post'}}) 
    console.log('updated', post) 
}

async function deletePost() {
    const post = await prisma.posts.delete({
        where: {id: 1}}) 
    console.log('deleted', post) 
}

async function main() {
    await createPost()            
    await createMultiplePosts()   
    await getPostById()           
    await getMultiplePosts()      
    await updatePost()            
    await deletePost()            
}

main().then(() => {
        prisma.$disconnect() 
    }).catch((err) => {
        console.log(err) 
        prisma.$disconnect() 
    }) 
