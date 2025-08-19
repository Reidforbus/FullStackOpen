import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/noficationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''

        const anecdote = await anecdoteService.createNew(content)

        dispatch(addAnec(anecdote))
        dispatch(setNotification(`You added: '${content}'`))
        setTimeout(() => dispatch(clearNotification()), 5000)
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addNew}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
