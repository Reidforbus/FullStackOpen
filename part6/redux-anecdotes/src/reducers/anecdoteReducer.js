import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnec(state, action) {
            const id = action.payload
            state.find(a => a.id === id).votes += 1
        },
        addAnec(state, action) {
            const anecdote = action.payload
            state.push(anecdote)
        },
        setAnecs(state, action) {
            return action.payload
        }
    }
})

export const { voteAnec, addAnec, setAnecs } = anecdoteSlice.actions
export default anecdoteSlice.reducer
