import { PrismaClient } from "@prisma/client"
import { CreatePostData} from "./ptypes"
const prisma = new PrismaClient()

export async function getAllPosts() {
    return await prisma.posts.findMany()
}

export async function getPostById(id: number){
    return await prisma.posts.findUnique({
        where: { id },
    }) 
}

export async function createPost(postData: CreatePostData) {
    return await prisma.posts.create({
        data: postData,
    })
}

  export async function getAllPostsWithComments() {
    return await prisma.posts.findMany({
      include: { comments: true },
    })
  }
  

  export async function getPostWithCommentsById(id: number) {
    return await prisma.posts.findUnique({
      where: { id },
      include: { comments: true },
    })
  }