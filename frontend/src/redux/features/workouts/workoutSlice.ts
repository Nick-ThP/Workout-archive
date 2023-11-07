import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Workout, workoutPutPackage } from '../../../utils/types'
import { workoutService } from './workoutService'

interface WorkoutState {
	workouts: Workout[]
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
}

const initialState: WorkoutState = {
	workouts: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Create new workout
export const createWorkout = createAsyncThunk('workouts/create', async (workout: Workout, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token as string
		return await workoutService.createWorkout(workout, token)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get user workouts
export const getWorkouts = createAsyncThunk('workouts/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await workoutService.getWorkouts(token)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Update workout
export const updateWorkout = createAsyncThunk('workouts/update', async ({ workoutId, workoutData }: workoutPutPackage, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await workoutService.updateWorkout(workoutId, workoutData, token)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Delete user workout
export const deleteWorkout = createAsyncThunk('workouts/delete', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		return await workoutService.deleteWorkout(id, token)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder

			// Create
			.addCase(createWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts.push(action.payload)
			})
			.addCase(createWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
			})

			// Read
			.addCase(getWorkouts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getWorkouts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts = action.payload
			})
			.addCase(getWorkouts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
			})

			// Update
			.addCase(updateWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts = state.workouts.map((workout) =>
					workout._id !== action.payload.id ? { ...workout, text: action.payload } : workout
				)
			})
			.addCase(updateWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
			})

			// Delete
			.addCase(deleteWorkout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteWorkout.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.workouts = state.workouts.filter((workout) => workout._id !== action.payload.id)
			})
			.addCase(deleteWorkout.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
			})
	}
})

export const { reset } = workoutSlice.actions
export const workoutReducer = workoutSlice.reducer
