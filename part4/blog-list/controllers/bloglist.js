const blogRouter = require('express').Router()
const Blog = require('../models/blogschema')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true, runValidators: true, context: 'query'})
  // response.status(200).json(updatedBlog)

  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' }).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => next(error))
})
module.exports = blogRouter