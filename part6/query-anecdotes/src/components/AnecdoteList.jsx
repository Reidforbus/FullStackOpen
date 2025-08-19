import { useMutation, useQueryClient } from "@tanstack/react-query"
import { voteAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteList = ({anecdotes}) => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()
    
    const voteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notificationDispatch({
                type: 'ADD',
                payload: `You voted: '${data.content}'`
            })
            setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
        }
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })
    }


    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList
