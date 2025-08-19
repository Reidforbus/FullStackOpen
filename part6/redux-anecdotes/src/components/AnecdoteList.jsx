import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/noficationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes
        .filter(a => a.content.toLowerCase().includes(state.filter))
        .sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id))

        dispatch(setNotification(`You voted for '${anecdote.content}' `, 5))
    }

    return (
        <div>
        { anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList
