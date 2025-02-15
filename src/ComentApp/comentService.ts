import * as commentRepository from './comentRepository'

export async function getAllComments() {
  return await commentRepository.getAllComments()
}

export async function getCommentById(id: number) {
  return await commentRepository.getCommentById(id)
}

export async function createComment(data: { title: string; body: string; postId: number }) {
  return await commentRepository.createComment(data)
}

export async function updateComment(id: number, data: { title?: string; body?: string }) {
  return await commentRepository.updateComment(id, data)
}

export async function deleteComment(id: number) {
  return await commentRepository.deleteComment(id)
}
export async function getCommentsByPostId(postId: number) {
  return await commentRepository.getCommentsByPostId(postId)
}