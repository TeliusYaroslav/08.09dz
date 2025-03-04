import express from 'express'
import { loginUser, authRegistration, getCurrentUser } from './userControllerApi'
import { authTokenMiddleware } from '../middlewares/authTokenMiddleware'

const router = express.Router()


router.post('/login', loginUser)

router.post('/register', authRegistration)

router.get("/me", authTokenMiddleware , getCurrentUser)

export default router