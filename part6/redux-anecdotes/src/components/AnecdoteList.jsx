import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/noficationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes
        .filter(a => a.content.toLowerCase().includes(state.filter))
        .sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnec(anecdote.id))
        dispatch(setNotification(`You voted for '${anecdote.content}' `))
        setTimeout(() => dispatch(clearNotification()), 5000)
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
