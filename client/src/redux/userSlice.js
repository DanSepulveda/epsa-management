import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const initialState = {
  _id: null,
  username: null,
  email: null,
  uid: null,
  loading: false, //disable button while loading
  tokenlog: true
}

export const login = createAsyncThunk(
  'login',
  async (values) => {
    const response = await axios.post(`${HOST}/login`, values)
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

export const loginWithToken = createAsyncThunk(
  'login',
  async () => {
    const response = await axios.get(`${HOST}/login`)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const { success, response } = action.payload
        if (success) {
          state._id = response._id
          state.email = response.email
        }
        state.tokenlog = false
        state.loading = false
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { success, response } = action.payload
        if (success) {
          state._id = response._id
          state.email = response.email
        }
        state.loading = false
      })
  },
})

export const userState = (state) => state.user

export default userSlice.reducer