import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const initialState = {
    records: [],
    loading: false,
    fetching: false,
    fetched: false
}

export const createRecord = createAsyncThunk(
    'createRecord',
    async ({ values, token }) => {
        const response = await axios.post(`${HOST}/records`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const getRecords = createAsyncThunk(
    'getRecords',
    async (token) => {
        const response = await axios.get(`${HOST}/records`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const editRecord = createAsyncThunk(
    'editRecord',
    async ({ values, id, token }) => {
        const response = await axios.put(`${HOST}/record/${id}`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const deleteRecord = createAsyncThunk(
    'deleteRecord',
    async ({ id, token }) => {
        const response = await axios.delete(`${HOST}/record/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        clearRecordState: (state) => {
            state.records = []
            state.loading = false
            state.fetching = false
            state.fetched = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                state.loading = true
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records, response].sort((a, b) => b.date.localeCompare(a.date))
                }
                state.loading = false
            })
            .addCase(getRecords.pending, (state) => {
                state.fetching = true
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = response.sort((a, b) => b.date.localeCompare(a.date))
                }
                state.fetched = true
                state.fetching = false
            })
            .addCase(editRecord.pending, (state) => {
                state.loading = true
            })
            .addCase(editRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records.filter(activity => activity._id !== response._id), response].sort((a, b) => b.date.localeCompare(a.date))
                }
                state.loading = false
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records.filter(activity => activity._id !== response)]
                }
            })
    },
})

export const { clearRecordState } = recordSlice.actions

export const recordState = (state) => state.record

export default recordSlice.reducer