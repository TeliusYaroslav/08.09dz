import express from 'express'
import { loginUser, registrationUser, authUser, authRegistration } from './userController'

const router = express.Router()

router.get('/login', loginUser)
router.get('/registration', registrationUser)


router.post('/login', async (req, res, next) => {
  try {
    await authUser(req, res)
  } catch (error) {
    next(error)
  }
})

router.post('/registration', async (req, res, next) => {
  try {
    await authRegistration(req, res)
  } catch (error) {
    next(error)
  }
})

export default router
