const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {title, author, url, likes} = request.body
  const user = request.user
  if(!user) {
    return response.status(401).json({error: 'No User Found'})
  }
  const blog = new Blog({
    title, author, url,
    likes: likes ? likes : 0,
    user: user.id
  })
  const result = await blog.save()
  await result.populate('user', { username: 1, name: 1, id:1})

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id)
  const user = request.user
  if(!blogToRemove) {
    return response.status(410).json({error: 'blog not found'})
  }
  if(blogToRemove.user.toString() !== user.id.toString()) {
    return response.status(401).json({error: 'can only delete own blogs'})
  }
  await Blog.findByIdAndDelete(blogToRemove.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    ...body,
    likes: body.likes
  }
  console.log(newBlog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
  await updatedBlog.populate('user', { username: 1, name: 1, id:1})
  response.status(200).json(updatedBlog)
})
module.exports = blogRouter
