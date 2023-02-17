import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Reducers/authSlice'
import { loadingReducer } from './Reducers/loadingReducer'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loading: loadingReducer.reducer,
  },
})
