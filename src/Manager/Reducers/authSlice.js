import { createSlice } from '@reduxjs/toolkit'
import tokenService from '../Service/tokenService'

const initialState = {
  user: {},
  token: null,
  isAuthenticated: tokenService.getToken() ? true : false,
  category: {},
}

export const authSlice = createSlice({
  name: 'auth',
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
