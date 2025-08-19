import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const newAnecMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notificationDispatch({
                type: 'ADD',
                payload: `You created: '${data.content}'`
            })
            setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecMutation.mutate({ 
            content,
            votes: 0
        })
    }

    return (
        <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
