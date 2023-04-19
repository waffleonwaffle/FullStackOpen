const express = require('express')
const cors = require('cors')
const app = express()
const blogRouter = require('./controllers/bloglist')
const usersRouter = require('./controllers/userslist')
const loginRouter = require('./controllers/loginlist')

const config = require('./utils/config')
const logger = require('./utils/logger')
const { requestLogger, errorHandler, unknownEndpoint, tokenExtractor, userExtractor} = require('./utils/middleware')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app