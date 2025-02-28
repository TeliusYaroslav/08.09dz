// Здесь это не надо
import { PrismaClient } from '@prisma/client'
import { CreateCommentData, updateComment } from './ctypes'
// Здесь это не надо. У тебя есть файл prismaClient с клиентом
const prisma = new PrismaClient()

// Соблюдай одинаковые табуляции по коду, где то 2, где то 4
export async function getAllComments() {
  return await prisma.comment.findMany()
}

export async function getCommentById(id: number) {
  return await prisma.comment.findUnique({
    where: { id },
  })
}

export async function createComment(data: CreateCommentData){
  return await prisma.comment.create({
    data,
  })
}

export async function updateComment(id: number, data: updateComment) {
  return await prisma.comment.update({
    where: { id },
    data,
  })
}

export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id },
  })
}
export async function getCommentsByPostId(postId: number) {
  return await prisma.comment.findMany({
      where: { postId },
  })
}