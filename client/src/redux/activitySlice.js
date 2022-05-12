import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const initialState = {
    activities: [],
    loading: false
}

export const createActivity = createAsyncThunk(
    'createActivity',
    async ({ values, token }) => {
        const response = await axios.post(`${HOST}/activities`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const getActivities = createAsyncThunk(
    'getActivities',
    async (token) => {
        const response = await axios.get(`${HOST}/activities`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const editActivity = createAsyncThunk(
    'editActivity',
    async (data) => {
        const { values, id, token } = data
        const response = await axios.put(`${HOST}/activity/${id}`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const deleteActivity = createAsyncThunk(
    'deleteActivity',
    async (data) => {
        const { id, token } = data
        const response = await axios.delete(`${HOST}/activity/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        clearActivityState: (state) => {
            state.activities = []
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createActivity.pending, (state) => {
                state.loading = true
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.activities = [...state.activities, response].sort((a, b) => a.name.localeCompare(b.name))
                }
                state.loading = false
            })
            .addCase(getActivities.pending, (state) => {
                state.loading = true
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.activities = response.sort((a, b) => a.name.localeCompare(b.name))
                }
                state.loading = false
            })
            .addCase(editActivity.pending, (state) => {
                state.loading = true
            })
            .addCase(editActivity.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.activities = [...state.activities.filter(activity => activity._id !== response._id), response].sort((a, b) => a.name.localeCompare(b.name))
                }
                state.loading = false
            })
            .addCase(deleteActivity.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.activities = [...state.activities.filter(activity => activity._id !== response)].sort((a, b) => a.name.localeCompare(b.name))
                }
                state.loading = false
            })
    },
})

export const { clearActivityState } = activitySlice.actions

export const activityState = (state) => state.activity

export default activitySlice.reducer