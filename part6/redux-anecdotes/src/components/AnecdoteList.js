import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

import { useSelector, useDispatch } from 'react-redux'
const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(anecdote => anecdote.content
        .includes(filter))
        .sort((a, b) => b.votes - a.votes))

    const dispatch = useDispatch()
    const handleVote = (id) => {
        dispatch(vote(id))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(setNotification(`you voted for '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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