const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app