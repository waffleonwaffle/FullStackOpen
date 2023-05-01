import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(anecdote => anecdote.content
        .includes(filter))
        .sort((a, b) => b.votes - a.votes))

    const dispatch = useDispatch()
    const handleVote = (id) => {
        dispatch(vote(id))
    }

    return (<div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </div>

    )
}
export default AnecdoteList