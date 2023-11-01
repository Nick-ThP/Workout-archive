import { NextFunction, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../utils/types'

export const authMiddleware = asyncHandler(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
	// Initialize variables
	let token
	let authHeader = req.headers.authorization as string

	// Check if there's something wrong with the request header
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		res.status(401)
		throw new Error('User is not authorized or token is missing in request')
	}

	// Format token correctly
	token = authHeader.split(' ')[1]

	// Verify the token and execute callback to pass the decoded user information on
	jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
		if (err) {
			res.status(401)
			throw new Error('User is not authorized')
		}
		if (!decoded || typeof decoded === 'string') {
			res.status(401)
			throw new Error('There is something wrong with the payload')
		}

		req.user = decoded.user
		next()
	})
})
