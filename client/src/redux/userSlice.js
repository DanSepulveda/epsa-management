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
  token: null,

}

export const getUser = () => {
  onAuthStateChanged(auth, user => {
    if (user) store.dispatch(login(user.accessToken))
    else store.dispatch(changeLog())
  })
}

export const login = createAsyncThunk(
  'login',
  async (token) => {
    const response = await axios.get(`${HOST}/login`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { token, success: response.data.success, response: response.data.response }
  }
)

export const signup = createAsyncThunk(
  'signup',
  async (token) => {
    const response = await axios.get(`${HOST}/signup`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { token, success: response.data.success, response: response.data.response }
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
        const { success, response, token } = action.payload
        if (success) {
          state._id = response._id
          state.uid = response.uid
          state.email = response.email
          state.token = token
        }
        state.tokenlog = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { success, response, token } = action.payload
        if (success) {
          state._id = response._id
          state.email = response.email
          state.uid = response.uid
          state.token = token
        }
      })
  },
})

export const { changeLog } = userSlice.actions

export const userState = (state) => state.user

export default userSlice.reducer