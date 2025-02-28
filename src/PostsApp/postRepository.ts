import { PrismaClient } from "@prisma/client"
// Импорт не используется, нужно убрать
import { CreateCommentData } from "../ComentApp/ctypes"
// Импорт не используется, нужно убрать
import { CreatePostData, Posts } from "./ptypes"
// Здесь это не надо. У тебя есть файл prismaClient с клиентом
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

// try...catch в принципе нет ни в одном из слоев.
// при любой ошибке призмы сервер завершится  