import express from 'express'
import { loginUser, registrationUser, authUser, authRegistration } from './userController'

const router = express.Router()


router.get('/login', loginUser)
router.get('/register', registrationUser)
router.post('/login', authUser)
router.post('/register', authRegistration)



export default router
