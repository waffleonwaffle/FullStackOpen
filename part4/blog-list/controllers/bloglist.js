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

blogRouter.delete('/:id', async(request, response) => {
  const id = request.params.id
  Blog.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  })
})
module.exports = blogRouter