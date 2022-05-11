import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import activityReducer from './activitySlice'
import recordReducer from './recordSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer,
    record: recordReducer
  }
})