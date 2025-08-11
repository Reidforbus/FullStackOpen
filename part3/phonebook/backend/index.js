require('dotenv').config()
const express = require('express')
const reqLogger = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

reqLogger.token('post-body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(reqLogger(':method :url :status :res[content-length] - :response-time ms :post-body'))

app.get('/api/persons', (_, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'No such id' })
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  const new_person = new Person({
    name: name,
    number: number,
  })

  new_person.save()
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndUpdate(id, req.body, { runValidators: true })
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'No such id' })
      }
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (_, res, next) => {
  Person.countDocuments()
    .then(result => {
      const body =
                `<p>Phonebook has info for ${result} people</p>
                <p>${Date(Date.now()).toString()}</p>`
      res.send(body)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
