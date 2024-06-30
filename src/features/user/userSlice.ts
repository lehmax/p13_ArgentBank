import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Login: () => {},
    Logout: () => {},
    editName: () => {},
  },
})

export default userSlice.reducer
