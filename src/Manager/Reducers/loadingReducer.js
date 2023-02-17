import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: false,
}

export const loadingReducer = createSlice({
  name: 'Loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isActive = action.payload
    },
  },
})

export default loadingReducer
