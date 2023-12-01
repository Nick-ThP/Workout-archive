import { FaTimesCircle, FaWrench } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteWorkout, getWorkouts } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout } from '../utils/types'
import { useState } from 'react'
import { Modal } from './Modal'
import { WorkoutForm } from './WorkoutForm'

type Props = {
	workout: CreatedWorkout
	id: string
}

export const WorkoutItem = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const deleteHandler = async () => {
		await dispatch(deleteWorkout(props.workout._id))
		dispatch(getWorkouts())
	}

	return (
		<div className='workout'>
			<div className='date'>{new Date(props.workout.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
			<h2>{props.workout.muscleGroup.toString()}</h2>
			<button onClick={() => setIsModalOpen(true)} className='change'>
				<FaWrench />
			</button>
			<button onClick={deleteHandler} className='close'>
				<FaTimesCircle />
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<WorkoutForm submitType={'putOnSubmit'} id={props.id} initialState={props.workout} />
			</Modal>
		</div>
	)
}
