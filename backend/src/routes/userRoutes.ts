import express from 'express'
import { currentUser, loginUser, registerUser } from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

export const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/current', authMiddleware, currentUser)
