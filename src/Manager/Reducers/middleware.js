import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

export const authSlice = createSlice({
  name: 'midleware',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.value = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export default authSlice
