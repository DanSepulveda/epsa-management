import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import activitiesReducer from './activitiesSlice'
import recordReducer from './recordSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    activities: activitiesReducer,
    record: recordReducer
  }
})
