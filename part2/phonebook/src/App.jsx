import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName
    }

    if (persons.some(person => person.name === newName)) {
  alert(`${newName} is already added to phonebook`)
  return
}

setPersons(persons.concat({ name: newName, number: newNumber }))



    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
  <div>
    name: <input value={newName} onChange={handleNameChange} />
  </div>
  <div>
    number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
  </div>
  <button type="submit">add</button>
</form>


      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
  {person.name} {person.number}
</li>

        )}
      </ul>
    </div>
  )
}

export default App
