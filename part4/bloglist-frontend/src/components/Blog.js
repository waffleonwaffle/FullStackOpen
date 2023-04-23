import { useState } from "react"
const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const showWhenVisible = {display: view ? '' : 'none'}
  const hideWhenVisible = {display: view ? 'none' : ''}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <section style={blogStyle}>
      {blog.title}
      <button style={hideWhenVisible} onClick={() => setView(true)}>view</button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} 
          <button>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={showWhenVisible} onClick={() => setView(false)}>hide</button>
      </div>
    </section>

  )
}

export default Blog