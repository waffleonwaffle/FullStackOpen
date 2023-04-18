const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: String, 
    required: true
  },
  url: {
    type: String, 
    required: true
  },
  likes: {
    type: Number, 
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)