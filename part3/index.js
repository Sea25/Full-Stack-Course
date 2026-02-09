const express = require('express')
const morgan = require('morgan')

const app = express()

// ---------- Middleware ----------
app.use(express.json())

// Custom Morgan Token for POST Body
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

// Morgan Logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Request Logger Middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// ---------- Data ----------
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

// ---------- Routes ----------

// 3.1: Get All Persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// 3.2: Info Page
app.get('/info', (request, response) => {
  const time = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `)
})

// 3.3: Get Single Person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// 3.4: Delete Person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

// Generate ID
const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString()
}

// 3.5 & 3.6: Add Person
app.post('/api/persons', (request, response) => {

  const body = request.body

  // Missing name or number
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // Check duplicate name
  const exists = persons.find(p => p.name === body.name)

  if (exists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

// ---------- Unknown Endpoint ----------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// ---------- Server ----------
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
