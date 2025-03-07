import { CreateCommentData, UpdateComment } from './ctypes'
import { client } from '../client/prismaClient'



export async function getAllComments() {
  return await client.comment.findMany()
}

export async function getCommentById(id: number) {
  return await client.comment.findUnique({
    where: { id },
  })
}

export async function createComment(data: CreateCommentData){
  return await client.comment.create({
    data,
  })
}

export async function updateComment(id: number, data: UpdateComment) {
  return await client.comment.update({
    where: { id },
    data,
  })
}

export async function deleteComment(id: number) {
  return await client.comment.delete({
    where: { id },
  })
}
export async function getCommentsByPostId(postId: number) {
  return await client.comment.findMany({
      where: { postId },
  })
}