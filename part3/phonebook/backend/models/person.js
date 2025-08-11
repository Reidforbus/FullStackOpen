const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const db_url = process.env.MONGODB_URI


console.log('Connecting to ' + db_url)

mongoose.connect(db_url)
    .then(result => {
        console.log('Connected')
    })
    .catch(error => {
        console.log('error connecting: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'must be at least 3 characters long'],
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (val) => {
                return val.length >= 8 && /^\d{2,3}-\d*$/.test(val) 
            },
            message: () => 'Number has to be of format: XXX-XXXX, and at least 8 long'
        }
    },
})

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
