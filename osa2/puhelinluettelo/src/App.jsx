import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterstr, setFilterstr] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    //Adds person to persons at form submit
    const addPerson = (event) => {
        event.preventDefault()
        if (newName !=='') {  
            if (!persons.find(pers => newName === pers.name)){  
                const maxId = Math.max(...persons.map(pers => parseInt(pers.id)))
                const person = {
                    name: newName,
                    number: newNumber,
                    id: `${maxId + 1}`
                }
                phonebookService
                    .create(person)
                    .then(data => {
                        console.log(data)
                        const newpersons = [...persons]
                        newpersons.push(data)
                        setPersons(newpersons)
                        console.log('Added person:', data)
                        setErrorMessage({ 
                            body: `Added ${data.name}`,
                            class: 'note'
                        })
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 4000)


                    })
                    .catch(error => {
                        setErrorMessage({ 
                            body: `Information for ${newName} already exists on the server`,
                            class: 'error'
                        })
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }else{
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    const id = persons.find(pers => newName === pers.name).id
                    const person = {
                        name: newName,
                        number: newNumber,
                        id: `${id}`
                    }
                    phonebookService
                        .update(id, person)
                        .then(data => {
                            console.log(`Updated ${data.name}`)
                            setErrorMessage({
                                body: `Updated number for ${data.name}`,
                                class: 'note'
                            })
                            setTimeout(() => {
                                setErrorMessage(null)
                            },4000)
                            setPersons(persons.map(pers => {
                                if (pers.id !== data.id) {
                                    return pers
                                }
                                return data
                            }))
                        })
                        .catch(error => {
                            setErrorMessage({
                                body: `Could not update information. Perhaps information was deleted from server elsewhere?`,
                                class: 'error'
                            })
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 4000)
                            phonebookService.getAll().then(data => setPersons(data))
                        })
                }
            }
        }
    }

    //gets starting values with axios from json-server
    useEffect(() => {
        console.log('requesting phonebook')
        phonebookService
            .getAll()
            .then(data => {
                console.log('phonebook request fulfilled')
                setPersons(data)
            })
    }, [])

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

    //deletes persons from json
    const handleDelete = (event) => {
        const id = event.target.id
        const name = persons.find(pers => pers.id === id).name
        if (window.confirm(`Delete ${name}`)) {
            phonebookService
                .remove(id)
                .then(data => {
                    console.log(`Deleted ${data.name}, id:${data.id}`)
                    setPersons(persons.filter(pers => pers.id !== data.id))
                    setErrorMessage({
                        body: `Deleted ${data.name}`,
                        class: 'note'
                    })
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 4000)
                })
                .catch(error => {
                    setErrorMessage({
                        body: `Information of ${name} has already been removed from the server`,
                        class: 'error'
                    })
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 4000)
                    phonebookService.getAll().then(data => setPersons(data))
                })
        } else {
            console.log('Delete cancelled')
        }
    }



    return (
        <div>
        <h2>Phonebook</h2>
        <NotificationBar message={errorMessage}/>
        <Filter handleFilter={handleFilter}/>

        <h3>add a new</h3>
        <PersonForm addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

        <h3>Numbers</h3>
        <Persons persons={persons} filterstr={filterstr} handleDelete={handleDelete}/>
        </div>
    )

}

const NotificationBar = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.class === 'error') {
        return (
            <div className='error'>
            {message.body}
            </div>
        )}
    else if (message.class === 'note') {
        return (
            <div className='note'>
            {message.body}
            </div>
        )
    }
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
const Persons = ({persons,filterstr,handleDelete}) => {
    return (
        persons.filter(person => person.name.toUpperCase().includes(filterstr.toUpperCase()))
        .map(person => <p key={person.name}>{person.name} {person.number} <button type="button" id={person.id} onClick={handleDelete}>delete</button></p>)
    )
}

export default App
