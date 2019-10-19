import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  const { newFilter, handleNoteChange3 } = props
  return (
    <form> rajaa näytettävä
        <input
        value={newFilter}
        onChange={handleNoteChange3}
      />
    </form>
  )
}
const PersonForm = (props) => {

  const { addPerson, newName, newNumber, handleNoteChange1, handleNoteChange2 } = props
  return (
    <form onSubmit={addPerson}>
      <div>
        nimi:
          <input
          value={newName}
          onChange={handleNoteChange1}
        />
      </div>
      <div>
        numero:
          <input
          value={newNumber}
          onChange={handleNoteChange2}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}
const Persons = ({ showPersons }) => {
  return showPersons()
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
const OkNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="ok">
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) */
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setOkMessage(
            `Lisättiin ${returnedPerson.name}`
          )
          setTimeout(() => {
            setOkMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha uudella numerolla?`)) {

        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        let id = person.id
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setOkMessage(
              `Päivitettiin ${person.name}`
            )
            setTimeout(() => {
              setOkMessage(null)
            }, 5000)
          })
          .catch(error => {
            axios
              .get('http://localhost:3001/persons')
              .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
              })
            setErrorMessage(
              `Henkilö ${person.name} oli jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }
  const removePerson = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(returnedData => {
          console.log('removed:', returnedData)
          setPersons(persons.filter(p => p.id !== person.id))
          setNewName('')
          setNewNumber('')
          setOkMessage(
            `Poistettiin ${person.name}`
          )
          setTimeout(() => {
            setOkMessage(null)
          }, 5000)
        })
        .catch(error => {
          axios
            .get('http://localhost:3001/persons')
            .then(response => {
              console.log('promise fulfilled')
              setPersons(response.data)
            })
          setErrorMessage(
            `Henkilö ${person.name} oli jo poistettu`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNoteChange1 = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNoteChange2 = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNoteChange3 = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const showPersons = () => {

    const filtered = persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

    return filtered.map(person =>
      <p key={person.id}>
        {person.name + ' '}
        {person.number}
        <button onClick={() => removePerson(person)}>poista</button>
      </p>)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <ErrorNotification message={errorMessage} />
      <OkNotification message={okMessage} />
      <Filter
        newFilter={newFilter}
        handleNoteChange3={handleNoteChange3}
      />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNoteChange1={handleNoteChange1}
        handleNoteChange2={handleNoteChange2}
      />
      <h2>Numerot</h2>
      <Persons showPersons={showPersons} />
    </div>
  )
}

export default App