import { useState } from "react"
const Blog = ({ blog, handleUpdateLikes, handleDeleteBlog, user }) => {
  const [view, setView] = useState(false)
  const showWhenVisible = { display: view ? '' : 'none' }
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showDeleteButton = { display: blog.user.username === user.username ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 
  return (
    <section style={blogStyle}>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={() => setView(true)}>view</button>
      <div style={showWhenVisible}>
        <div>
          url {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleUpdateLikes(blog.id)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button style={showWhenVisible} onClick={() => setView(false)}>hide</button>
        </div>
        <button style={showDeleteButton} onClick={() => handleDeleteBlog(blog.id)}>delete</button>
      </div>
    </section>

  )
}


export default Blog