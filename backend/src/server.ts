import dotenv from 'dotenv'
import express, { Application } from 'express'
import { connectDb } from './config/dbConnection'
import { errorMiddleware } from './middleware/errorMiddleware'
import { userRoutes } from './routes/userRoutes'

// Initialization
const app: Application = express()

// Environment variables
dotenv.config()

// Database connection
connectDb()

// Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Endpoints
app.use('/api/users', userRoutes)
// app.use('/api/workouts', require('./routes/workoutRoutes'))

// Error middleware
app.use(errorMiddleware)

// Spin-up
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
