const mongoose = require('mongoose')

const supertest = require('supertest')
const User = require('../models/userSchema')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('when a user gets created with ', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User ({username: 'Anu', name: 'Bannu'})
        await user.save()
    })

    test('valid data, it passes', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'Good Username', 
            name : 'random name',
            password: 'good password'
        }
        
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    })

    test('an invalid username (less than 3 characters), it fails', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'me', 
            name : 'random',
            password: 'chinter'
        }
        
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('an invalid password (less than 3 characters), it fails', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'me', 
            name : 'random',
            password: 'wh'
        }
        
        await api.post('/api/users').send(newUser).expect(401).expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('an duplicate username, it fails', async () => {
        const usersAtStart = await helper.usersInDB()
        const newUser = {
            username: 'Anu', 
            name : 'random',
            password: 'good password'
        }
        
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
    
})
// npm test -- -t 'when a user gets created with'

afterAll(async () => {
    await mongoose.connection.close()
})