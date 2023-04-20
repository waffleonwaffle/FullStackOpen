const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config')


// npm test -- -t 'addition of a new blog'
// npm test -- blog_api.test.js

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
    let token = null
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("12345", 10);
        const user = await new User({ username: "name", passwordHash }).save();

        const userForToken = { username: "name", id: user.id };
        return (token = jwt.sign(userForToken, config.SECRET));
    })
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        
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
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
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
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noUrlBlog).expect(400)
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(noAuthorBlog).expect(400)
    })

    test('fails when no token is provided', async () => {
        const testblog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
        }
        await api.post('/api/blogs').set('Authorization', `Bearer `).send(testblog).expect(401)
    })
})


describe('deletion of a new blog', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("12345", 10);
        const user = await new User({ username: "name", passwordHash }).save();
        const userForToken = { username: "name", id: user.id };
        token = jwt.sign(userForToken, process.env.SECRET)
        const testBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        }
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(testBlog)


    })
    test('succeeds with status code 204 if the id is valid', async () => {
        const blogsAtStart = await Blog.find({}).populate('user')
        const blog = blogsAtStart[0]
        await api.delete(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).expect(204)
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

