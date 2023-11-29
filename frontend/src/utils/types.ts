export interface Workout {
	user_id?: string
	muscleGroup: 'Chest' | 'Shoulders' | 'Back' | 'Arms' | 'Legs' | 'Core'
	reps: number
	sets: number
}

export interface CreatedWorkout extends Workout {
	_id: string
	createdAt: Date
	updatedAt?: Date
}

export interface User {
	username?: string
	email?: string
	password?: string
	id?: string
	token?: string
}

export interface workoutPutPackage {
	workoutData: Workout
	workoutId: string
}
