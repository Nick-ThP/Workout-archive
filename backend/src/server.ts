import dotenv from 'dotenv'
import express from 'express'
import { connectDb } from './config/dbConnection'
import { errorHandler } from './middleware/errorHandler'

const app = express()
dotenv.config()
connectDb()

// Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Endpoints
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/workouts', require('./routes/workoutRoutes'))

// Error Middleware
app.use(errorHandler)

// Spin-up
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
