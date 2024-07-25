import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../services/api'
import * as session from '../../services/session'
import { RootState } from '../../store'
import { AuthState, loginPayload, Person } from './types'

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  persist: false,
  error: null,
}

const init = async () => {
  const token = session.getToken()

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

    const response = await api().authenticateUser(email, password)
    const { token } = response.body

    thunk.dispatch(setCurrentUser(token))

    if (persist) {
      session.persistToken(token)
    }

    return { token, persist }
  }
)

export const setCurrentUser = createAsyncThunk(
  'auth/setCurrentUser',
  async (token: string) => {
    const response = await api().fetchProfile(token)
    return response.body
  }
)

export const editCurrentUser = createAsyncThunk(
  'auth/editCurrentUser',
  async (payload: Person, thunk) => {
    const state = thunk.getState() as RootState
    const token = state.auth.token

    if (!token) return thunk.rejectWithValue('No token found')

    const response = await api().editProfile(token, payload)
    return response.body
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
    builder.addCase(authenticateUser.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message
      }
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
