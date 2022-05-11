import axios from 'axios'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from './store'

const HOST = 'http://localhost:4000/api'

const initialState = {
  _id: null,
  email: null,
  uid: null,
  tokenlog: true,
}

export const getUser = () => {
  onAuthStateChanged(auth, user => {
    if (user) store.dispatch(login(user.uid))
    else console.log(store.dispatch(changeLog()))
  })
}

export const login = createAsyncThunk(
  'login',
  async (uid) => {
    const response = await axios.post(`${HOST}/login`, { uid })
    return response.data
  }
)

export const signup = createAsyncThunk(
  'signup',
  async (values) => {
    const response = await axios.post(`${HOST}/signup`, values)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLog: (state) => {
      state.tokenlog = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { success, response } = action.payload
        if (success) {
          state._id = response._id
          state.uid = response.uid
          state.email = response.email
        }
        state.tokenlog = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { success, response } = action.payload
        if (success) {
          state._id = response._id
          state.email = response.email
          state.uid = response.uid
        }
      })
  },
})

export const { changeLog } = userSlice.actions

export const userState = (state) => state.user

export default userSlice.reducer