import { newAnecdote } from  '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from  '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const contents = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(contents))
        dispatch(setNotification('you added a new anecdote'))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm