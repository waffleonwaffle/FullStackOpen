import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.tokenForUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.tokenForUser)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title, 
      author: author,
      url: url
    }
    try {
      const blog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
    }
  }

  const addBlogForm = () => {
    return <form onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <section>
        <div>
          title: <input value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url} onChange={({target}) => setUrl(target.value)}/>
        </div>
      </section>
      <button type='submit'>create</button>
    </form>
  }
  const loginForm = () => {
    return <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input value={username} type='text' name='username' onChange={({ target }) => setUserName(target.value)}></input>
      </div>
      <div>
        password
        <input value={password} type='text' name='password' onChange={({ target }) => setPassword(target.value)}></input>
      </div>
      <button type='submit'>login</button>
    </form>
  }

  const blogList = () => {
    return <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
      {addBlogForm()}
    </div>

  }
  return (
    <div>

      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App