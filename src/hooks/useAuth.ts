import { useDispatch, useSelector } from 'react-redux'

import { setLoggedOut } from '../features/auth/authSlice'
import * as session from '../services/session'
import { RootState } from '../store'

export const useAuth = () => {
  const { loggedIn, user, token, error } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setLoggedOut())

    if (session.getToken() !== null) {
      session.removeToken()
    }
  }

  return {
    currentUser: user,
    isLoggedIn: loggedIn,
    token,
    logout,
    error,
  }
}
