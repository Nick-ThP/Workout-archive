import { Request } from 'express'

export interface User {
	username?: string
	email: string
	password: string
}

export interface ExtendedRequest extends Request {
	user?: User
}
