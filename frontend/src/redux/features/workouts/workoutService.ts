import axios from 'axios'
import { Workout } from '../../../utils/types'

// Get user workouts
const getWorkouts = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.get('/api/workouts/', config)
	return response.data
}

// Create new workout
const createWorkout = async (workoutData: Workout, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.post('/api/workouts/', workoutData, config)
	return response.data
}

// Update workout
const updateWorkout = async (workoutId: string, workoutData: Workout, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.put('/api/workouts/' + workoutId, workoutData, config)
	return response.data
}

// Delete user workout
const deleteWorkout = async (workoutId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const response = await axios.delete('/api/workouts/' + workoutId, config)
	return response.data
}

export const workoutService = {
	createWorkout,
	getWorkouts,
	updateWorkout,
	deleteWorkout
}
