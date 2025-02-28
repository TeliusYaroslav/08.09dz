// лучше просто импортировать {Router}
import express from 'express'
import { loginUser, authRegistration } from './userControllerApi'

const router = express.Router()

// сrypt?
router.post('/login', loginUser)

router.post('/registercrypt', authRegistration)

export default router