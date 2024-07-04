import { useDispatch, useSelector } from 'react-redux'

import { STORAGE_KEY, setLoggedOut } from '../features/auth/authSlice'
import { RootState } from '../store'

export const useAuth = () => {
  const { loggedIn, user, token } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setLoggedOut())

    if (localStorage.getItem(STORAGE_KEY) !== null) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    currentUser: user,
    isLoggedIn: loggedIn,
    token,
    logout,
  }
}
