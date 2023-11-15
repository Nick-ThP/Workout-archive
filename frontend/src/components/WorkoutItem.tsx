import { FaTimesCircle, FaWrench } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteWorkout, getWorkouts, updateWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout } from '../utils/types'

type Props = {
	workout: CreatedWorkout
	calories: number
}

export const WorkoutItem = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>()

	const deleteHandler = async () => {
		await dispatch(deleteWorkout(props.workout._id))
		dispatch(getWorkouts())
	}

	const putHandler = async () => {
		await dispatch(updateWorkout({ workoutId: props.workout._id, workoutData: { calories: props.calories } }))
		dispatch(getWorkouts())
	}

	return (
		<div className='workout'>
			<div className='date'>{new Date(props.workout.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
			<h2>{props.workout.calories.toString()}</h2>
			<button onClick={putHandler} className='change'>
				<FaWrench />
			</button>
			<button onClick={deleteHandler} className='close'>
				<FaTimesCircle />
			</button>
		</div>
	)
}
