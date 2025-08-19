import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes  = await anecService.getAll()
        dispatch(setAnecs(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await anecService.createNew(content)
        dispatch(addAnec(anecdote))
    }
}

export const voteForAnecdote = (id) => {
    return async dispatch => {
        await anecService.voteFor(id)
        dispatch(voteAnec(id))
    }
}


export default anecdoteSlice.reducer
