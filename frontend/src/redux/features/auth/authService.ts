import axios from 'axios'
import { User } from '../../../utils/types'

// Register user
const register = async (userData: User) => {
	const response = await axios.post('/api/users/register', userData)
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

// Login user
const login = async (userData: User) => {
	const response = await axios.post('/api/users/login', userData)
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

// Logout user
const logout = () => {
	localStorage.removeItem('user')
}

export const authService = {
	register,
	login,
	logout
}
