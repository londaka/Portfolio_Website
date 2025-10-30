import express from 'express'
import { userLogin, userLogout, userRegister, verifyEmail,  } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.post('/signup', userRegister)

userRouter.post('/login', userLogin)

userRouter.post('/verifyemail', verifyEmail )

userRouter.post('/logout', userLogout)

export default userRouter