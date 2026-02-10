const express = require('express')
const app = express()

// Middleware to read JSON body
app.use(express.json())

// Phonebook data
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

// ==========================
// 3.1 Get all persons
// ==========================
app.get('/api/persons', (req, res) => {
  res.json(persons)
})


// ==========================
// 3.2 Info page
// ==========================
app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})


// ==========================
// 3.3 Get single person
// ==========================
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({
      error: "person not found"
    })
  }
})


// ==========================
// 3.4 Delete person
// ==========================
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})


// Helper: Generate ID
const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString()
}


// ==========================
// 3.5 + 3.6 Add person
// ==========================
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Check missing fields
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  // Check duplicate name
  const exists = persons.find(p => p.name === body.name)

  if (exists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})


// ==========================
// Start Server
// ==========================
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
