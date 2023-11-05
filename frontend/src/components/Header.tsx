import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

export const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Workout Archive</Link>
			</div>
			<ul>
				{user ? (
					<li className='flex'>
						<button className='btn' onClick={onLogout}>
							<FaSignOutAlt /> Log out
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login' className='flex'>
								<button className='btn'>
									<FaSignInAlt /> Log in
								</button>
							</Link>
						</li>
						<li>
							<Link to='/register' className='flex'>
								<button className='btn'>
									<FaUser /> Register
								</button>
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}
