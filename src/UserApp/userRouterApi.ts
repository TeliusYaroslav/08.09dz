import express from 'express'
import { loginUser, authRegistration } from './userControllerApi'

const router = express.Router()


router.post('/logincrypt', loginUser)

router.post('/registercrypt', authRegistration)

export default router