import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createWorkout, updateWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'
import { Workout } from '../utils/types'

type CreateProps = {
	submitType: 'createOnSubmit'
}

type PutProps = {
	submitType: 'putOnSubmit'
	id: string
}

export const WorkoutForm = (props: CreateProps | PutProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const [formData, setFormData] = useState<Workout>({
		muscleGroup: 'Chest',
		sets: 0,
		reps: 0
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!Object.values(formData).some((value) => value === 0 || value === '')) {
			if (props.submitType === 'putOnSubmit') {
				dispatch(updateWorkout({ workoutId: props.id, workoutData: formData }))
			}

			if (props.submitType === 'createOnSubmit') {
				dispatch(createWorkout(formData))
			}

			return setFormData({
				muscleGroup: 'Chest',
				sets: 0,
				reps: 0
			})
		}

		toast.error('Please submit a number instead')
	}

	return (
		<section className='form'>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<select
						id='muscle-group'
						name='muscleGroup'
						placeholder='Choose a muscle group'
						onChange={onChange}
						value={formData.muscleGroup}
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
						value={formData.sets}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='number'
						name='reps'
						id='reps'
						placeholder='Specify how many reps per set'
						value={formData.reps}
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
	)
}
