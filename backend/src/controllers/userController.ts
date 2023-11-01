import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { ExtendedRequest } from '../utils/types'

//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = asyncHandler(async (req, res) => {
	// Destructure and check body object for mistakes
	const { username, email, password } = req.body
	if (!username || !email || !password) {
		res.status(400)
		throw new Error('All fields are mandatory')
	}

	// Check if user is already registered
	const userAvailable = await User.findOne({ email })
	if (userAvailable) {
		res.status(400)
		throw new Error('User is already registered')
	}

	// Hash password and create user in database
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	})

	// Send a response
	if (user) {
		res.status(201).json({ _id: user.id, email: user.email })
	} else {
		res.status(400)
		throw new Error('User data is not valid')
	}
})

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = asyncHandler(async (req, res) => {
	// Destructure and check body object for mistakes
	const { email, password } = req.body
	if (!email || !password) {
		res.status(400)
		throw new Error('All fields are mandatory')
	}

	// Check if user's email is registered and create user object
	const user = await User.findOne({ email })
	if (!user) {
		res.status(400)
		throw new Error('User does not exist')
	}

	// Compare user's password with hashed, sign in and send response
	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				user: {
					username: user.username,
					email: user.email,
					id: user.id,
				},
			},
			process.env.JWT_SECRET as string,
			{ expiresIn: '15m' }
		)
		res.status(200).json({ accessToken })
	} else {
		res.status(401)
		throw new Error('Password is not valid')
	}
})

//@desc Current information about user
//@route GET /api/users/current
//@access private
export const currentUser = asyncHandler(async (req: ExtendedRequest, res) => {
	// Give the user their stored information
	res.json(req.user)
})
