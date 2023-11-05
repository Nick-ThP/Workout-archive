import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkouts, reset } from '../redux/features/workouts/workoutSlice'
import { toast } from 'react-toastify'
import WorkoutForm from '../components/WorkoutForm'
import WorkoutItem from '../components/WorkoutItem'
import Spinner from '../components/Spinner'
import { AppDispatch, RootState } from '../redux/store'

const Dashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const { user } = useSelector((state: RootState) => state.auth)
	const { workouts, isLoading, isError, message } = useSelector((state: RootState) => state.workouts)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		if (!user) {
			navigate('/login')
		}
		dispatch(getWorkouts())
		return () => {
			dispatch(reset())
		}
	}, [user, navigate, isError, message, dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1 className='welcome'>Welcome {user && user.name}</h1>
				<p>Workouts Dashboard</p>
			</section>
			<WorkoutForm />
			<section className='content'>
				{workouts.length > 0 ? (
					<div className='workouts'>
						{workouts.map((workout) => (
							<WorkoutItem key={workout._id} workout={workout} />
						))}
					</div>
				) : (
					<h3>You have not pinned any workouts</h3>
				)}
			</section>
		</>
	)
}

export default Dashboard
