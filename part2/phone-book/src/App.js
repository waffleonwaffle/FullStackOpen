import { useState } from 'react'
import uniqid from 'uniqid'; 
const Person = ({person}) => {
  return (
    <div>
      {person.name}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: uniqid()}
  ])
  const [newName, setNewName] = useState('')

  const handleAddPerson = (event) => {

    event.preventDefault()
    console.log(newName)
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    const newNameObject = {
      name: newName,
      id: uniqid()
    }
    setPersons(persons.concat(newNameObject))
    setNewName('')

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <div>
          {persons.map(person => <Person key={person.id} person={person}/>)}
        </div>

      </div>
    </div>
  )
}

export default App