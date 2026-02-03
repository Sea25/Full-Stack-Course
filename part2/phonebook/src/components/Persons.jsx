import Person from './Person'

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person =>
      <Person
        key={person.id}
        person={person}
        deletePerson={deletePerson}
      />
    )}
  </div>
)

export default Persons
