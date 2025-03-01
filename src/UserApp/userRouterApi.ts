import express, { RequestHandler } from 'express'
import { loginUser, authRegistration, getCurrentUser } from './userControllerApi'
import { authTokenMiddleware } from '../middlewares/authTokenMiddleware'

const router = express.Router()


router.post('/logincrypt', loginUser)

router.post('/registercrypt', authRegistration)

router.get("/me", authTokenMiddleware , getCurrentUser)

export default router