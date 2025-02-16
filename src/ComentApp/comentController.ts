import { Request, Response } from 'express'
import * as commentService from './comentService'


export async function getAllComments(req: Request, res: Response) {
  try {
    const comments = await commentService.getAllComments()
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error })
  }
}

export async function getCommentById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const comment = await commentService.getCommentById(Number(id))
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' })
    res.json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error })
  }
}

export async function createComment(req: Request, res: Response) {
  try {
    const data = req.body
    const newComment = await commentService.createComment(data)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(400).json({ message: 'Ошибка создания комментария', error })
  } 
}

export async function updateComment(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = req.body
    const updatedComment = await commentService.updateComment(Number(id), data)
    if (!updatedComment) return res.status(404).json({ message: 'Комментарий не найден' })
    res.json(updatedComment)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления комментария', error })
  }
}

export async function deleteComment(req: Request, res: Response) {
  try {
    const { id } = req.params
    await commentService.deleteComment(Number(id))
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления комментария', error })
  }
}
