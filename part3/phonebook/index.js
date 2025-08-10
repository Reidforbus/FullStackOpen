const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('post-body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons', (_, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const new_id = Math.floor(Math.random() * 10000)
    const new_person = {id: new_id.toString(), ...req.body}

    if (!new_person.name){
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!new_person.number){
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.find(person => person.name === new_person.name)){
        return res.status(400).json({
            error: 'name already exists in phonebook'
        })
    }

    persons = persons.concat(new_person)
    res.json(new_person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/info', (_, res) => {
    const body = 
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date(Date.now()).toString()}</p>`
    res.send(body)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is go')
})
