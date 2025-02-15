import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllComments() {
  return await prisma.comment.findMany()
}

export async function getCommentById(id: number) {
  return await prisma.comment.findUnique({
    where: { id },
  })
}

export async function createComment(data: { title: string; body: string; postId: number }) {
  return await prisma.comment.create({
    data,
  })
}

export async function updateComment(id: number, data: { title?: string; body?: string }) {
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