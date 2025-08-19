import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(addAnec(content))
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
