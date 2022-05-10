import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const initialState = {
    records: []
}

export const createRecord = createAsyncThunk(
    'createRecord',
    async (values) => {
        const response = await axios.post(`${HOST}/records`, values)
        return response.data
    }
)

export const getRecords = createAsyncThunk(
    'getRecords',
    async () => {
        const response = await axios.get(`${HOST}/records`)
        return response.data
    }
)

export const editRecord = createAsyncThunk(
    'editRecord',
    async (data) => {
        const { values, id } = data
        const response = await axios.put(`${HOST}/record/${id}`, values)
        return response.data
    }
)

export const deleteRecord = createAsyncThunk(
    'deleteRecord',
    async (id) => {
        const response = await axios.delete(`${HOST}/record/${id}`)
        return response.data
    }
)

export const recordSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                // state.loading = true
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records, response].sort((a, b) => a.name.localeCompare(b.name))
                }
            })
            .addCase(getRecords.pending, (state) => {
                // state.loading = true
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = response.sort((a, b) => a.name.localeCompare(b.name))
                }
            })
            .addCase(editRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records.filter(activity => activity._id !== response._id), response].sort((a, b) => a.name.localeCompare(b.name))
                }
            })
            .addCase(deleteRecord.fulfilled, (state, action) => {
                const { success, response } = action.payload
                if (success) {
                    state.records = [...state.records.filter(activity => activity._id !== response)].sort((a, b) => a.name.localeCompare(b.name))
                }
            })
    },
})

export const recordsState = (state) => state.records

export default recordSlice.reducer