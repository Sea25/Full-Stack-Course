const express = require('express')
const app = express()

const PORT = 3001

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  }
]

// route
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/info', (request, response) => {
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `
  response.send(info)
})

