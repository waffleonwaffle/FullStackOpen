const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogschema')
// npm test -- tests/blog_api.test.js

beforeEach(async () => {
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('gets all the blogs', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs contain id attribute', async () => {
    const blogs = await helper.blogsInDB()
    const blogToCheck = blogs[0]
    expect(blogToCheck.id).toBeDefined()
})


test('can add a blog to the db', async () => {
    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDB()
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain("TDD harms architecture")
})


test('likes default to 0 when not given', async () => {
    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDB()
    blogsAtEnd.forEach(blog => {
        expect(blog.likes).toBeDefined()
    })
})

test('400 code request when no url or author is provided', async () => {
    const noUrlBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
    }

    const noAuthorBlog = {
        title: "TDD harms architecture",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }
    await api.post('/api/blogs').send(noUrlBlog).expect(400)
    await api.post('/api/blogs').send(noAuthorBlog).expect(400)
})
afterAll(async () => {
    await mongoose.connection.close()
})