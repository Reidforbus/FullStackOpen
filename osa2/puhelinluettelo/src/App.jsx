import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(pers => newName === pers.name)){  
      let person = {
        id: persons.length +1,
        name: newName,
        number: newNumber
      }
      const newpersons = [...persons]
      newpersons.push(person)
      setPersons(newpersons)
      console.log('Added person:',person)
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log('Current text:',event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    //console.log('Current text:',event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

const Numbers = ({persons}) => {
  return (
    
      persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
    
  )
}

export default App