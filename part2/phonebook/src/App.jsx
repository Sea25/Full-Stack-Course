import { useState, useEffect } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} is already added. Replace the old number?`)) {
        const updatedPerson = { ...existing, number: newNumber }
        personService.update(existing.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returned))
            setMessage(`Updated ${returned.name}`)
            setMessageType("success")
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setMessage(`Information of ${existing.name} has already been removed`)
            setMessageType("error")
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
personService
  .create(newPerson)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
  })
  .catch(error => {
    setErrorMessage(error.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })

  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
