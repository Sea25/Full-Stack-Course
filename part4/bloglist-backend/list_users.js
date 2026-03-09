const mongoose = require('mongoose')
const User = require('./models/user')
require('dotenv').config()

const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    return User.find({})
  })
  .then(users => {
    console.log('Users found:', users)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error:', err)
    mongoose.connection.close()
  })
