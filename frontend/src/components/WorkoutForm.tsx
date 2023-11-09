import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'

export const WorkoutForm = () => {
	const [calories, setCalories] = useState('')

	const dispatch = useDispatch<AppDispatch>()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(createWorkout({ calories }))
		setCalories('')
	}

	return (
		<section className='form'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
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
