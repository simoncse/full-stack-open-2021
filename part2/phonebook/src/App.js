import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import phoneService from './services/phones'
import Notification from './components/Notification'


const App = () => {

  const [ persons, setPersons ] = useState([]) 

  useEffect( ()=> {
    phoneService.getAll()
    .then(data =>{
      setPersons(data)
    })
    }, [])



  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')
  const [notifyMessage, setNotifyMessage] = useState('')
  const [notifyStyle, setNotifyStyle] = useState('')

  const handleNameChange = (e) =>{ 
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) =>{
    setNewNumber(e.target.value)
  }

  
  const handleFilter = (e) =>{
    setFilter(e.target.value)
    
  }

  const handleDelete = (id, name) =>{
    window.confirm(`Delete ${name}?`)
    && phoneService.remove(id)
    .then(()=>{
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
      setNotifyMessage(`Successfully deleted ${name}`)
      setNotifyStyle('success')
      setTimeout(()=>{
        setNotifyStyle('')
      },3000)
      }
    )
    .catch(err=>{
      setNotifyMessage(`Information of ${name} has already been removed from the system`)
      setNotifyStyle('error')
    })
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const newObject = {
      name: newName, 
      number: newNumber}

    const personToChange = persons.find(person => person.name === newName)
    const personToUpdate = {...personToChange, number: newNumber}

    if (personToChange){
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      && phoneService
      .update(personToChange.id, personToUpdate)
      .then(returnedPerson => {
        setPersons(
          persons.map(person=>
            person.id !== personToChange.id ? person : returnedPerson
          )
        )
        setNotifyMessage(`Updated ${returnedPerson.name}`)
        setNotifyStyle('success')
        setTimeout(()=> {
          setNotifyStyle('')
        },3000)

      })
      .catch(err =>{
        setNotifyMessage(`Information of ${newName} has already been removed from the system`)
        setNotifyStyle('error')
      })
      }else{
        phoneService
        .create(newObject)
        .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNotifyMessage(`Added ${newPerson.name}`)
        setNotifyStyle('success')
        setTimeout(()=>{
          setNotifyStyle('')
        },3000)
        }
        )
        setNewName('')
        setNewNumber('')
      }
  }
 


  return (
    <div>
      <h2>Phonebook</h2>
      {notifyStyle && <Notification message={notifyMessage} style = {notifyStyle}/>}
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
          <Phonebook filter ={filter} persons = {persons} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App