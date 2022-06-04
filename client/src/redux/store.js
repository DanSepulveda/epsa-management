/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import activityReducer from './activitySlice'
import recordReducer from './recordSlice'

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer,
    record: recordReducer,
  },
})
