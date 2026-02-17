import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
  event.preventDefault()

  // check if name already exists
  const nameExists = persons.some(person => person.name === newName)

  if (nameExists) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  setPersons(persons.concat({ name: newName, number: newNumber }))
setNewName('')
setNewNumber('')

  setNewName('')
}


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
  <div>
    name:
    <input value={newName} onChange={handleNameChange} />
  </div>

  <div>
    number:
    <input value={newNumber} onChange={handleNumberChange} />
  </div>

  <button type="submit">add</button>
</form>


      <h2>Numbers</h2>

      {persons.map(person =>
  <p key={person.name}>
    {person.name} {person.number}
  </p>
)}

    </div>
  )
}

export default App
