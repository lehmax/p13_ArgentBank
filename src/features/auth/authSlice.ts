import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../services/api'
import { RootState } from '../../store'
import { AuthState, Person, loginPayload } from './types'

export const STORAGE_KEY = 'SESSION'

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  persist: false,
}

const init = async () => {
  const token = localStorage.getItem(STORAGE_KEY)

  if (!token) return initialState

  const state = {
    ...initialState,
    loggedIn: true,
    persist: true,
    token,
  }

  const request = await api().fetchProfile(token)
  if (request.status === 200) {
    return {
      ...state,
      user: request.body,
    }
  }

  return state
}

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (payload: loginPayload, thunk) => {
    const { email, password, persist } = payload

    try {
      const response = await api().authenticateUser(email, password)
      const { token } = response.body

      thunk.dispatch(setCurrentUser(token))

      if (persist) {
        localStorage.setItem(STORAGE_KEY, token)
      }

      return { token, persist }
    } catch (error: any) {
      return thunk.rejectWithValue(error?.response.message)
    }
  }
)

export const setCurrentUser = createAsyncThunk(
  'auth/setCurrentUser',
  async (token: string, thunk) => {
    try {
      const response = await api().fetchProfile(token)
      return response.body
    } catch (error: any) {
      return thunk.rejectWithValue(error?.response.message)
    }
  }
)

export const editCurrentUser = createAsyncThunk(
  'auth/editCurrentUser',
  async (payload: Person, thunk) => {
    const state = thunk.getState() as RootState
    const token = state.auth.token

    if (!token) return thunk.rejectWithValue('No token found')

    try {
      const response = await api().editProfile(token, payload)
      return response.body
    } catch (error: any) {
      return thunk.rejectWithValue(error?.response.message)
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: await init(),
  reducers: {
    setLoggedOut: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      const { token, persist } = action.payload
      state.loggedIn = true
      state.token = token
      state.persist = persist
    })
    builder.addCase(setCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(editCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { setLoggedOut } = slice.actions

export default slice.reducer
