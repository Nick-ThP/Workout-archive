import express from 'express'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workoutController'
import { authMiddleware } from '../middleware/authMiddleware'

export const workoutRouter = express.Router()
workoutRouter.use(authMiddleware)

workoutRouter.route('/').get(getWorkouts).post(createWorkout)
workoutRouter.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout)
