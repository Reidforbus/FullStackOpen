import { createSlice } from "@reduxjs/toolkit"

const randomId = () => (1000* Math.random()).toFixed(0)

const initialState = []


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotify(state, action) {
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

export const { setNotify, clearNotification } = notificationSlice.actions

export const setNotification = (msg, time) => {
    return async dispatch => {
        dispatch(setNotify(msg))
        setTimeout(() => dispatch(clearNotification()), time * 1000)
    }
}

export default notificationSlice.reducer
