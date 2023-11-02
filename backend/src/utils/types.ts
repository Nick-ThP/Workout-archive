import { Request } from 'express'

export interface User {
	email: string
	username?: string
	id?: string
	password?: string
}

export interface ExtendedRequest extends Request {
	user?: User
}
