import express from 'express'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workoutController'
import { authMiddleware } from '../middleware/authMiddleware'
import { calorieMiddleware } from '../middleware/calorieMiddleware'

export const workoutRouter = express.Router()

workoutRouter.use(authMiddleware)
workoutRouter.route('/').get(getWorkouts).post(calorieMiddleware, createWorkout)
workoutRouter.route('/:id').get(getWorkout).put(calorieMiddleware, updateWorkout).delete(deleteWorkout)
