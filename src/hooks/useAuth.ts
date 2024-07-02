import { useDispatch, useSelector } from 'react-redux'

import { setLoggedIn, setLoggedOut, setUser } from '../features/auth/authSlice'
import { api } from '../services/api'
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
      const response = await api().authenticateUser(email, password)

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

  const setCurrentUser = async () => {
    if (!token) return false

    try {
      const response = await api().fetchProfile(token)

      if (response.status === 200) {
        dispatch(setUser(response.body))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    currentUser: user,
    isLoggedIn: loggedIn,
    token,
    logout,
    login,
    setCurrentUser,
  }
}
