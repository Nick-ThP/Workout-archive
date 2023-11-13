import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export function App() {
	return (
		<>
			<Router>
				<div>
					<Header />
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/Login' element={<Login />} />
						<Route path='/Register' element={<Register />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	)
}
