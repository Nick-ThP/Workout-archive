import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'

export const WorkoutForm = () => {
	const [text, setText] = useState('')

	const dispatch = useDispatch<AppDispatch>()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(createWorkout({ text }))
		setText('')
	}

	return (
		<section className='form'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='text' name='text' id='text' placeholder='Write a goal...' value={text} onChange={(e) => setText(e.target.value)} />
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
