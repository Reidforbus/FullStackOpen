import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

    const query = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
    })

    if (query.isPending) {
        return (
            <span>Loading anecdotes...</span>
        )
    }

    if (query.isError) {
        return (
            <span>anecdote service not available due to problems in server</span>
        )
    }

    const anecdotes = query.data

    return (
        <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        <AnecdoteList anecdotes={anecdotes} />
        </div>
    )
}

export default App
