import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import { store } from './store'
import { auth } from '../firebase.config'
import defaultTheme from '../app/defaultTheme'

const HOST = 'http://localhost:4000/api'
// const HOST = 'https://us-central1-panel-epsa.cloudfunctions.net/app'

const initialState = {
  _id: null,
  email: null,
  uid: null,
  tokenlog: true,
  token: null,
  fullname: '',
  username: '',
  position: '',
  signature: '',
  loading: false,
  theme: defaultTheme,
}

export const login = createAsyncThunk('login', async (token) => {
  const response = await axios.get(`${HOST}/login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return { token, success: response.data.success, response: response.data.response }
})

export const signup = createAsyncThunk('signup', async (token) => {
  const response = await axios.get(`${HOST}/signup`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return { token, success: response.data.success, response: response.data.response }
})

export const editUser = createAsyncThunk('editUser', async ({ values, token }) => {
  const response = await axios.put(`${HOST}/user`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return { token, success: response.data.success, response: response.data.response }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLog: (state) => {
      state.tokenlog = false
    },
    clearUserState: (state) => {
      state._id = null
      state.email = null
      state.uid = null
      state.tokenlog = false
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { success, response, token } = action.payload
        if (success) {
          state._id = response._id
          state.uid = response.uid
          state.email = response.email
          state.fullname = response.fullname
          state.username = response.username
          state.position = response.position
          state.signature = response.signature
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
      .addCase(editUser.pending, (state) => {
        state.loading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { success, response } = action.payload
        if (success) {
          state.email = response.email
          state.fullname = response.fullname
          state.username = response.username
          state.position = response.position
          state.signature = response.signature
        }
        state.loading = false
      })
  },
})

export const { changeLog, clearUserState } = userSlice.actions

export const getUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) store.dispatch(login(user.accessToken))
    else store.dispatch(changeLog())
  })
}

export const userState = (state) => state.user

export default userSlice.reducer
