import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'

export const WorkoutForm = () => {
	const [calories, setCalories] = useState('')
	const dispatch = useDispatch<AppDispatch>()

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let numCalories: number = +calories
		if (typeof numCalories === 'number') {
			dispatch(createWorkout({ calories: numCalories }))

			return setCalories('')
		}

		toast.error('Please submit a number instead')
	}

	return (
		<section className='form'>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<input
						type='number'
						name='calories'
						id='calories'
						placeholder='Specify calories'
						value={calories}
						onChange={(e) => setCalories(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block' type='submit'>
						Pin Goal
					</button>
				</div>
			</form>
		</section>
	)
}
