const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogschema')

beforeEach(async () => {
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('gets all the blogs', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})