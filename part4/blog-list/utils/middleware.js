const logger = require('./logger')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(400).json({ error: 'token expired' })
    }
    next(error)
}


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const tokenId = request.token
    if (tokenId) {
        const decodedToken = jwt.verify(tokenId, process.env.SECRET)
        request.user = await User.findById(decodedToken.id)
        // console.log(request.user)
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}