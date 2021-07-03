import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')

  const handleNameChange = (e) =>{ 
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) =>{
    setNewNumber(e.target.value)
  }

  
  const handleFilter = (e) =>{
    setFilter(e.target.value)
    
  }



  const handleSubmit = (e) => {
    e.preventDefault()

    //this returns an arrray of the names and check if they include the newName
    if (persons.map(person =>person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }else {
      const nameObject = {name: newName, number: newNumber}
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter}/>
      <div>
        <h2>add a new</h2>
        <PersonForm
          newName = {newName}
          handleNameChange = {handleNameChange}
          newNumber = {newNumber}
          handleNumberChange = {handleNumberChange}
          handleSubmit = {handleSubmit}         
        />
      </div>
      <div>
        <h2>Numbers</h2>
          <Phonebook filter ={filter} persons = {persons} />
      </div>
    </div>
  )
}

export default App