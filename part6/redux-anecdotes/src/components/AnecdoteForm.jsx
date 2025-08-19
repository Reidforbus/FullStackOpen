import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/noficationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''

        dispatch(createAnecdote(content))

        dispatch(setNotification(`You added: '${content}'`, 5))
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
