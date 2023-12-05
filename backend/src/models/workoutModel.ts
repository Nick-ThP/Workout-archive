import mongoose, { Schema } from 'mongoose'

const movementSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	area: {
		type: String,
		enum: ['Chest', 'Shoulders', 'Back', 'Arms', 'Legs', 'Core'],
		required: true
	},
	targetedMuscle: {
		type: [String],
		required: true
	}
})

const exerciseSchema = new Schema({
	movement: {
		type: movementSchema,
		required: true
	},
	reps: {
		type: Number,
		required: true
	},
	sets: {
		type: Number,
		required: true
	},
	calories: {
		type: Number,
		required: true
	}
})

const workoutSchema = new Schema(
	{
		exercises: {
			type: [exerciseSchema],
			required: true
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		calories: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Workout', workoutSchema)
