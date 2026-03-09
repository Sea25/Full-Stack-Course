const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')
require('dotenv').config()

const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    return User.findOne({ username: 'root' })
  })
  .then(async user => {
    if (!user) {
      console.log('User root not found')
      return
    }
    const passwordHash = await bcrypt.hash('secret', 10)
    user.passwordHash = passwordHash
    await user.save()
    console.log('Password for root reset to "secret"')
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error:', err)
    mongoose.connection.close()
  })
