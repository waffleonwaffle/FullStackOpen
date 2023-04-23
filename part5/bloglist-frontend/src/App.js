import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
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
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const showNotification = (message, type) => {
    setErrorMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const handleAddBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      showNotification(`a new blog ${blog.title} by ${blog.author}`, 'successful')
    } catch {
      showNotification('Missing input information', 'error')
    }
  }

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)
    const confirmDelete = window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}`)
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        showNotification(`deleted ${blogToDelete.title} by ${blogToDelete.author} successfully`, 'successful')
      } catch {
        showNotification('can only delete your own blogs', 'error')
      }
    }
  }

  const handleUpdateLikes = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const blogResponse = await blogService.updateLikes(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : blogResponse))
      showNotification(`${blog.title} by ${blog.author} was liked`, 'successful')
    } catch {
      showNotification('Error updating likes', 'error')
    }
  }


  const loginForm = () => {
    return <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification type={messageType} message={errorMessage} />
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
    blogs.sort((a, b) => b.likes - a.likes)
    return <div>
      <h2>blogs</h2>
      <Notification type={messageType} message={errorMessage} />
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdateLikes={handleUpdateLikes} handleDeleteBlog={handleDeleteBlog} user={user}/>
        )
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleSubmitBlog={handleAddBlog} />
      </Togglable>
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