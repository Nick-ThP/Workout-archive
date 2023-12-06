import { useState } from 'react'
import { FaTimesCircle, FaWrench } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteWorkout, getWorkouts } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout } from '../utils/types'
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
		<>
			<div className='workout'>
				<div className='date'>{new Date(props.workout.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
				<div>This workout burned {props.workout.calories} calories</div>
				<ul className='flex gap-5'>
					{props.workout.exercises.map((exercise, idx) => (
						<li key={idx} className='bg-teal-100 p-8 flex justify-center items-start flex-col gap text-start relative'>
							<div>
								Exercise name: <b>{exercise.movement.name}</b>
							</div>
							<div>
								Targeted area: <b>{exercise.movement.area}</b>
							</div>
							<div>
								Amount of reps: <b>{exercise.reps}</b>
							</div>
							<div>
								Amount of sets: <b>{exercise.sets}</b>
							</div>
							<div>
								Burned calories: <b>{exercise.calories}</b>
							</div>
						</li>
					))}
				</ul>
				<button onClick={() => setIsModalOpen(true)} className='change'>
					<FaWrench />
				</button>
				<button onClick={deleteHandler} className='close'>
					<FaTimesCircle />
				</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<WorkoutForm submitType={'putOnSubmit'} id={props.id} initialState={props.workout} />
			</Modal>
		</>
	)
}
