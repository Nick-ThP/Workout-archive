const dotenv = require('dotenv').config()
import express from 'express'
import { connectDb } from './config/dbConnection'

const app = express()
const port = process.env.PORT || 5000

connectDb()
app.use(express.json())
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
