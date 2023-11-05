import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '040-123456' },
    { name: 'Pate Postimies',number: '050-654321' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterstr, setFilterstr] = useState('')

  //Adds person to persons at form submit
  const addPerson = (event) => {
    event.preventDefault()
    if (newName !=='') {  
      if (!persons.find(pers => newName === pers.name)){  
        let person = {
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
  }


  //updates name field state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  //updates number field state
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //updates filter field state
  const handleFilter = (event) => {
    setFilterstr(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter handleFilter={handleFilter}/>
      
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filterstr={filterstr}/>
    </div>
  )

}

const Filter = ({handleFilter}) => {
  return(
    <form onSubmit={event => event.preventDefault()}>
      filter shown with <input onChange={handleFilter}/>
    </form>)
}

const PersonForm = ({addPerson,handleNameChange,handleNumberChange}) => {
  return (
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

  )
}

//returns component with persons whose name includes filter string
const Persons = ({persons,filterstr}) => {
  return (
      persons.filter(person => person.name.toUpperCase().includes(filterstr.toUpperCase()))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

export default App