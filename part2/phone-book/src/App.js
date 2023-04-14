import { useEffect, useState } from 'react'
import uniqid from 'uniqid';
import personService from './services/persons';
const Notification = ({ notification, messageType }) => {
  if (notification === null) {
    return null
  }
  const messageClass = messageType === 'notification' ? 'notification' : 'error'
  return (
    <div className={messageClass}>
      {notification}
    </div>
  )
}
const Person = ({person, handleDeletePerson}) => {

  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </div>
  )
}
const Persons = ({ filterPersons, handleDeletePerson}) => {
  return (
    filterPersons.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWords, setFilterWords] = useState('')
  const [notification, setNotification] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const filterPersons = persons.filter(person => person.name.includes(filterWords))
  useEffect(() => {
    personService
    .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const handleDeletePerson = (id) => {
    const toDelete = window.confirm('Are you sure you want to delete?')
    if(toDelete){
      personService
      .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        }).catch(() => {
          showNotification(`Failed to delete`, 'error')
        }) 
    }
  }

  const handleUpdatePerson = (id, changedPerson) => {
    personService.updatePerson(id, changedPerson)
      .then((updatePerson) => {
        setPersons(persons.map(person => person.id !== id ? person : updatePerson));
        showNotification(`Updated ${newName}`, 'notification');
      })
      .catch(error => {
        showNotification(`Information of ${changedPerson.name} has already been removed from the server`, 'error');
        setPersons(persons.filter(person => person.id !== id));
      });
  };
  const handleAddPerson = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')
    const personToUpdate = persons.find(person => person.name === newName);
    if (personToUpdate) {
      const toUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)
      if(toUpdate) {
        const changedPerson = {...personToUpdate, number: newNumber}
        handleUpdatePerson(personToUpdate.id, changedPerson)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uniqid()
    }
    personService.createPerson(newPerson).then(returnedData => {
      setPersons(persons.concat(returnedData))
      showNotification(`Added ${newName}`, 'notification')
    }).catch(error => {
      showNotification(`Unformated or Missing Information`, 'error');
    });
   
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

  const showNotification = (notification, messageType) => {
    setNotification(notification)
    setMessageType(messageType)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} messageType={messageType}/>
      <Filter filterWords={filterWords} handleFilterChange={handleFilterChange} />
      <h2>add a new number</h2>
      <PersonForm handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} handleDeletePerson={handleDeletePerson}/> 
    </div>
  )
}

export default App