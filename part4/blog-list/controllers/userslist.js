
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
require('express-async-errors')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if(password.length < 3) {
        return response.status(401).json({error: 'password too short'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})


module.exports = usersRouter

