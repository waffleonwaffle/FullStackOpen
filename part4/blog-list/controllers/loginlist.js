const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userSchema')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)) {
        return response.status(401).json({error: 'invalid password or username'})
    }

    const userForToken = {
        username: user.username, 
        id: user.id
    }

    const tokenForUser = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).json({ tokenForUser, username: user.username, name: user.name })

})

module.exports = loginRouter

