import { FaTimesCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { AppDispatch } from '../redux/store'

interface

const GoalItem = ({ workout }) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className='goal'>
			<div className='date'>{new Date(goal.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
			<h2>{goal.text}</h2>
			<button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
				<FaTimesCircle />
			</button>
		</div>
	)
}

export default GoalItem
