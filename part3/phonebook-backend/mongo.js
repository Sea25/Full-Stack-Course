require('dotenv').config()  // ← MUST be first line
const mongoose = require('mongoose')

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting:', err))

// schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

// data to insert
const data = [
  { name: "Alice", number: "123-456" },
  { name: "Bob", number: "987-654" },
  { name: "Charlie", number: "555-555" }
]

// insert data
Person.insertMany(data)
  .then(() => {
    console.log('Data added!')
    mongoose.connection.close()
  })
  .catch(err => {
    console.log('Error:', err)
    mongoose.connection.close()
  })
