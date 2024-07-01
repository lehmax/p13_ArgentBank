import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/auth/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState> // This is the type of the Redux store state
