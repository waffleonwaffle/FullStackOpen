import { useState} from "react"
const BlogForm = ({ handleSubmitBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAddBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        handleSubmitBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return <form onSubmit={handleAddBlog}>
        <h2>create new</h2>
        <section>
            <div>
                title: <input value={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
                author: <input value={author} onChange={event => setAuthor(event.target.value)} />
            </div>
            <div>
                url: <input value={url} onChange={event => setUrl(event.target.value)} />
            </div>
        </section>
        <button type='submit'>create</button>
    </form>
}

export default BlogForm