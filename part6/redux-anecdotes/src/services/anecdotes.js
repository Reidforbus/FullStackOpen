import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteFor = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdote = response.data
    anecdote.votes += 1
    await axios.put(`${baseUrl}/${id}`, anecdote)
}

export default {
    getAll,
    createNew,
    voteFor,
}
