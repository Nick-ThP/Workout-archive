import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import { connectDb } from './config/dbConnection'
import { errorMiddleware } from './middleware/errorMiddleware'
import { movementRouter } from './routes/movementRouter'
import { userRouter } from './routes/userRouter'
import { workoutRouter } from './routes/workoutRouter'

// Initialization
const app: Application = express()

// Environment variables
dotenv.config()

// Database connection
connectDb()

// Set up CORS
app.use(cors())

// Morgan for logging
app.use(morgan('dev'))

// Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Endpoints
app.use('/api/users', userRouter)
app.use('/api/movements', movementRouter)
app.use('/api/workouts', workoutRouter)

// Error middleware
app.use(errorMiddleware)

// Spin-up
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
