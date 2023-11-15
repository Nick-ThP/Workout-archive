import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createWorkout } from '../redux/features/workouts/workoutSlice'
import { AppDispatch } from '../redux/store'

type Props = {
	calories: number
	setCalories: (state: number) => void
}

export const WorkoutForm = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>()

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let numCalories: number = +props.calories
		if (typeof numCalories === 'number') {
			dispatch(createWorkout({ calories: numCalories }))

			return props.setCalories(0)
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
						value={props.calories}
						onChange={(e) => props.setCalories(+e.target.value)}
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
