import { createSlice } from "@reduxjs/toolkit"

const randomId = () => (1000* Math.random()).toFixed(0)

const initialState = []


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.push({
                msg: action.payload,
                id: randomId()
            })
        },
        clearNotification(state, action) {
            return state.slice(1)
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
