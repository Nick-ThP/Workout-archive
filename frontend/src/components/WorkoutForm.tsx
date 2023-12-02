import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import exercises from '../data/exercises.json'
import { createWorkout, getWorkouts, updateWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { CreatedWorkout, Exercise, Movement, Workout } from '../utils/types'
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
	const [exerciseForm, setExerciseForm] = useState<Exercise>({
		movement: exercises[0] as Movement,
		sets: 0,
		reps: 0
	})
	const [workout, setWorkout] = useState<Workout>(
		props.submitType === 'putOnSubmit'
			? {
					exercises: props.initialState.exercises
			  }
			: {
					exercises: []
			  }
	)

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		setWorkout((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const archiveWorkout = async () => {
		if (workout.exercises.length > 0) {
			if (props.submitType === 'putOnSubmit') {
				await dispatch(updateWorkout({ workoutId: props.id, workoutData: workout }))
			}

			if (props.submitType === 'createOnSubmit') {
				await dispatch(createWorkout(workout))
				setWorkout({
					exercises: []
				})
			}

			return dispatch(getWorkouts())
		}

		toast.error('Please include exercises in your workout')
	}

	const exerciseSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (workout.exercises.find((exercise) => exercise.movement.name === exerciseForm?.movement.name)) {
			return toast.error('You cannot add the same exercise twice')
		}

		setWorkout((prev) => ({
			exercises: [...prev.exercises, exerciseForm]
		}))
		setExerciseForm({
			movement: exercises[0] as Movement,
			sets: 0,
			reps: 0
		})
	}

	return (
		<>
			<h2>Exercises</h2>
			<ul style={{ display: 'flex' }}>
				{workout.exercises.map((exercise) => (
					<li style={{ width: '20px', display: 'flex', flexDirection: 'column' }}>
						<p>{exercise.movement.name}</p>
						<p>{exercise.movement.area}</p>
						<p>{exercise.reps}</p>
						<p>{exercise.sets}</p>
					</li>
				))}
			</ul>
			<div style={{ display: 'flex', gap: '10px' }}>
				<button onClick={() => setIsModalOpen(true)}>Add Exercise</button>
				<button onClick={archiveWorkout}>Archive Workout</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<section className='form'>
					<form onSubmit={exerciseSubmitHandler} method='dialog'>
						<div className='form-group'>
							<select
								id='muscle-group'
								name='muscleGroup'
								placeholder='Choose a muscle group'
								onChange={onChange}
								value={exerciseForm.movement.name}
							>
								<option value='Chest'>Chest</option>
								<option value='Shoulders'>Shoulders</option>
								<option value='Back'>Back</option>
								<option value='Arms'>Arms</option>
								<option value='Legs'>Legs</option>
								<option value='Core'>Core</option>
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
