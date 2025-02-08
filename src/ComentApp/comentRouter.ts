import express from 'express'
import * as commentController from './comentController'

const router = express.Router()

router.get('/', commentController.getAllComments)
router.post('/', commentController.createComment)
router.delete('/:id', commentController.deleteComment)

export default router
