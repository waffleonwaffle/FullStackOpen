const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogschema')
// npm test -- tests/blog_api.test.js

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

})

describe('when there is initially some blogs saved', () => {
    test('we can succesfully get all blogs', async () => {
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(helper.initialBlogs.length)
    })

    test('all blogs contain id attribute', async () => {
        const blogs = await helper.blogsInDB()
        const blogToCheck = blogs[0]
        expect(blogToCheck.id).toBeDefined()
    })
})

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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


    test('defaults likes to 0', async () => {
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

    test('fails with status code 400 if author or url is not provided', async () => {
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
})


describe('deletion of a new blog', () => {
    test('succeeds with status code 204 if the id is valid', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blog = blogsAtStart[0]
        await api.delete(`/api/blogs/${blog.id}`).expect(204)
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })
})
describe('updating a blog with a new number of likes', () => {
    test('succeeds with a status code 200 if the id is valid', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blog = blogsAtStart[0]
        const newBlog = {
            ...blog, 
            likes: blog.likes + 10
        }
        const updatedBlog = await api.put(`/api/blogs/${blog.id}`).send(newBlog).expect(200)
        expect(updatedBlog.body.likes).toEqual(newBlog.likes)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})

// npm test -- -t "updating a blog with a new number of likes"        