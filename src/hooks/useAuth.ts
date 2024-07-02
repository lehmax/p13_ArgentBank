import { useDispatch, useSelector } from 'react-redux'

import { setLoggedIn, setLoggedOut } from '../features/auth/authSlice'
import { authenticateUser } from '../services/api'
import { RootState } from '../store'

interface loginPayload {
  email: string
  password: string
  persist: boolean
}

export const useAuth = () => {
  const { loggedIn, user, token } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch()

  const login = async (payload: loginPayload) => {
    const { email, password, persist } = payload

    try {
      const response = await authenticateUser(email, password)

      if (response.status === 200) {
        const { token } = response.body

        dispatch(setLoggedIn(token))

        if (persist) {
          localStorage.setItem('sessionToken', token)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    dispatch(setLoggedOut())

    if (localStorage.getItem('sessionToken') !== null) {
      localStorage.removeItem('sessionToken')
    }
  }

  return {
    currentUser: user,
    isLoggedIn: loggedIn,
    token,
    logout,
    login,
  }
}
