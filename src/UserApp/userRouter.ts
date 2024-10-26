import express from 'express' 
import { loginUser, registrationUser, authUser, authRegistration } from './userController' 

const router = express.Router() 

router.get('/login', loginUser) 
router.get('/registration', registrationUser) 

router.post('/login', authUser)  
router.post('/registration', authRegistration)  

export default router 
