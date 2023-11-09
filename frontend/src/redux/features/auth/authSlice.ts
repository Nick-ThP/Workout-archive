import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from './authService'
import { User } from '../../../utils/types'

interface UserState {
	user: User | null
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
}

const initialState: UserState = {
	user: (localStorage.getItem('user') as User) || null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user: User, thunkAPI) => {
	try {
		return await authService.register(user)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Log in user
export const login = createAsyncThunk('auth/login', async (user: User, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	authService.logout()
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as string
				state.user = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	}
})

export const { reset } = authSlice.actions
export const authReducer = authSlice.reducer
