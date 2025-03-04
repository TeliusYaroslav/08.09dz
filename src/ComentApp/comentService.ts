import * as commentRepository from './comentRepository'
import { Comment, CreateCommentData, UpdateComment } from './ctypes'

export async function getAllComments(): Promise<Comment[]> {
  return await commentRepository.getAllComments()
}

export async function getCommentById(id: number): Promise<Comment | null> {
  return await commentRepository.getCommentById(id)
}

export async function createComment(data: CreateCommentData): Promise<Comment> {
  return await commentRepository.createComment(data)
}

export async function updateComment(id: number, data: UpdateComment): Promise<Comment | null> {
  return await commentRepository.updateComment(id, data)
}

export async function deleteComment(id: number): Promise<Comment> {
  return await commentRepository.deleteComment(id)
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  return await commentRepository.getCommentsByPostId(postId)
}
