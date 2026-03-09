const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id → id
    delete returnedObject._id                        // Remove _id
    delete returnedObject.__v                        // Remove __v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
