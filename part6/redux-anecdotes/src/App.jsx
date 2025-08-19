import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecs } from './reducers/anecdoteReducer'
import anecService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecService.getAll().then(data => {
            console.log('Setting initial anecdotes ', data)
            dispatch(setAnecs(data))
        })
    }, [dispatch])

    return (
        <div>
        <Notification />
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
        </div>
    )
}

export default App
