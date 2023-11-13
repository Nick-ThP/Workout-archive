import axios from 'axios'

export const axiosConfigured = axios.create({
	baseURL: `http://localhost:3050/`
})
