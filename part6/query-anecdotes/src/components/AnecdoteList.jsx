import { useMutation, useQueryClient } from "@tanstack/react-query"
import { voteAnecdote } from "../requests"

const AnecdoteList = ({anecdotes}) => {
    const queryClient = useQueryClient()
    
    const voteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')
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
