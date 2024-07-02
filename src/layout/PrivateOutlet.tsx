import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateOutlet = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />
}

export default PrivateOutlet
