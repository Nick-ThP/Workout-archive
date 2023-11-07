export interface Workout {
	_id: string
	user_id: string
	calories: number
	createdAt: Date
	updatedAt: Date
}

export interface User {
	username?: string
	email?: string
	password?: string
	id?: string
}

export interface workoutPutPackage {
	workoutData: Workout
	workoutId: string
}
