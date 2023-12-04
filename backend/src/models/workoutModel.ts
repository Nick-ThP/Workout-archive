import mongoose, { Schema } from 'mongoose'

const movementSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	area: {
		type: String,
		required: true
	},
	targetedMuscle: {
		type: Array,
		required: true
	}
})

const exerciseSchema = new Schema({
	movement: movementSchema,
	sets: {
		type: Number,
		required: true
	},
	reps: {
		type: Number,
		required: true
	}
})

const workoutSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		exercises: [exerciseSchema],
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
