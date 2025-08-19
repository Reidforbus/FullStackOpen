import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action) {
            const fltr = action.payload
            return fltr.toLowerCase()
        }
    }
})

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default: 
            return state
    }
}

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
