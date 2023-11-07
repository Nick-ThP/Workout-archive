import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		calories: {
			type: Number,
			required: [true, 'Please specify amount of calories burned']
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model('Workout', workoutSchema)
