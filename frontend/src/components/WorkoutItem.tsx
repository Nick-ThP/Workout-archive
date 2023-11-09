import { FaTimesCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout } from '../utils/types'

type Props = {
	workout: CreatedWorkout
}

export const WorkoutItem = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className='goal'>
			<div className='date'>{new Date(props.workout.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
			<h2>{props.workout.calories.toString()}</h2>
			<button onClick={() => dispatch(deleteWorkout(props.workout._id))} className='close'>
				<FaTimesCircle />
			</button>
		</div>
	)
}
