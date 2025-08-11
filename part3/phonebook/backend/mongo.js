const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]\nGiven a name and number, adds a document to the database, otherwise fetches all documents.')
}

const pwd = process.argv[2]

const db_url = `mongodb+srv://fullstack:${pwd}@cluster0.39tqpqi.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(db_url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const new_person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  new_person.save().then(() => {
    console.log('Person saved')
    mongoose.connection.close()
  })
} else {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
