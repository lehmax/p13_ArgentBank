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
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true
      state.token = action.payload
    },
    logout: () => initialState,
  },
})

export const { login, logout } = slice.actions

export default slice.reducer
