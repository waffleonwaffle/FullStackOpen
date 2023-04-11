import { useState } from 'react'
import uniqid from 'uniqid';
const Persons = ({ filterPersons }) => {
  return (
    filterPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)
  )
}
const PersonForm = ({ handleAddPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>

  )
}


const Filter = ({ filterWords, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filterWords} onChange={handleFilterChange} />
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: uniqid() },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: uniqid() },
    { name: 'Dan Abramov', number: '12-43-234345', id: uniqid() },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: uniqid() }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWords, setFilterWords] = useState('')
  const filterPersons = persons.filter(person => person.name.includes(filterWords))
  const handleAddPerson = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uniqid()
    }
    setPersons(persons.concat(newPerson))

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWords(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWords={filterWords} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </div>
  )
}

export default App