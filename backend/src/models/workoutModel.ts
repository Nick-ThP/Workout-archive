import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		muscleGroup: {
			type: String,
			required: [true, 'Please choose a muscle group']
		},
		sets: {
			type: Number,
			required: [true, 'Please specify sets']
		},
		reps: {
			type: Number,
			required: [true, 'Please specify reps']
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
