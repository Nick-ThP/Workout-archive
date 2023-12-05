import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import exercises from '../data/exercises.json'
import { createWorkout, getWorkouts, updateWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout, Exercise, ExerciseForm, Movement } from '../utils/types'
import Modal from './Modal'

type CreateProps = {
	submitType: 'createOnSubmit'
}

type PutProps = {
	submitType: 'putOnSubmit'
	id: string
	initialState: CreatedWorkout
}

export const WorkoutForm = (props: CreateProps | PutProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [workout, setWorkout] = useState<Exercise[]>(props.submitType === 'putOnSubmit' ? props.initialState.exercises : [])
	const [exerciseForm, setExerciseForm] = useState<ExerciseForm>({
		movementName: '',
		sets: 0,
		reps: 0
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		setExerciseForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const archiveWorkout = async () => {
		if (workout.length > 0) {
			if (props.submitType === 'putOnSubmit') {
				await dispatch(updateWorkout({ workoutId: props.id, workoutData: { exercises: workout } }))
			}

			if (props.submitType === 'createOnSubmit') {
				await dispatch(createWorkout({ exercises: workout }))
				setWorkout([])
			}

			return dispatch(getWorkouts())
		}

		toast.error('Please include exercises in your workout')
	}

	const workoutSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (Object.values(exerciseForm).some((value) => value === 0 || '')) {
			return toast.error('Fill out all fields before adding an exercise')
		}

		if (workout.find((exercise) => exercise.movement.name === exerciseForm?.movementName)) {
			return toast.error('You cannot add the same exercise twice')
		}

		const foundMovement = exercises.find((exercise) => exercise.name === exerciseForm.movementName)
		if (!foundMovement) return toast.error('You need an eligible movement to continue')

		const assembledExercise: Exercise | ExerciseForm = {
			sets: exerciseForm.sets,
			reps: exerciseForm.reps,
			movement: foundMovement as Movement
		}

		setWorkout((prevState) => [...prevState, assembledExercise])

		setExerciseForm({
			movementName: '',
			sets: 0,
			reps: 0
		})
	}

	return (
		<>
			<h2>workout</h2>
			<ul className='flex gap-2 justify-start'>
				{workout.map((exercise) => (
					<li className='flex flex-col'>
						<div>{exercise.movement.name}</div>
						<div>{exercise.movement.area}</div>
						<div>{exercise.reps}</div>
						<div>{exercise.sets}</div>
					</li>
				))}
			</ul>
			<div className='flex gap-4'>
				<button onClick={() => setIsModalOpen(true)}>Add Exercise</button>
				<button onClick={archiveWorkout}>Archive Workout</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<section className='form bg-slate-800'>
					<form onSubmit={workoutSubmitHandler} method='dialog'>
						<div className='form-group'>
							<select
								id='muscle-group'
								name='movementName'
								placeholder='Choose a muscle group'
								onChange={onChange}
								value={exerciseForm.movementName}
							>
								<option value='' disabled selected>
									Choose a muscle group
								</option>
								{exercises.map((exercise, index) => (
									<option key={index} value={exercise.name}>
										{exercise.name}
									</option>
								))}
							</select>
						</div>
						<div className='form-group'>
							<input
								type='number'
								name='sets'
								id='sets'
								placeholder='Specify how many sets'
								value={exerciseForm.sets}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='number'
								name='reps'
								id='reps'
								placeholder='Specify how many reps per set'
								value={exerciseForm.reps}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<button className='btn btn-block' type='submit'>
								Archive workout
							</button>
						</div>
					</form>
				</section>
			</Modal>
		</>
	)
}
