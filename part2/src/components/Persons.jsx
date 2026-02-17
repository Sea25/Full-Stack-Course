const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filteredPersons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default Persons
