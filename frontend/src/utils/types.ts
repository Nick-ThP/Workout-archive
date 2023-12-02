export interface Workout {
	user_id?: string
	exercises: Exercise[]
}

export interface Exercise {
	movement: Movement
	reps: number
	sets: number
}

export interface Movement {
	name: string
	area: 'Chest' | 'Shoulders' | 'Back' | 'Arms' | 'Legs' | 'Core'
	targetedMuscle: string[]
}

export interface CreatedWorkout extends Workout {
	_id: string
	createdAt: Date
	updatedAt?: Date
	calories: number
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
