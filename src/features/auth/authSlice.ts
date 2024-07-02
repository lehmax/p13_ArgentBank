import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('sessionToken')
  ? localStorage.getItem('sessionToken')
  : null

const loggedIn = token ? true : false

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

export interface AuthState {
  loggedIn: boolean
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  loggedIn,
  token,
  user: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = true
      state.token = action.payload
    },
    setLoggedOut: () => initialState,
  },
})

export const { setLoggedIn, setLoggedOut } = slice.actions

export default slice.reducer
