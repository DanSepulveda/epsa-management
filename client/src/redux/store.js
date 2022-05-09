import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import activitiesReducer from './activitiesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    activities: activitiesReducer
  }
})
