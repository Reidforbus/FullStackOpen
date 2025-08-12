const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [3,' should be at least 3 characters long'],
    },
    name: String,
    pwHash: {
        type: String,
        required: true,
    }
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.pwHash
  }
})

module.exports = mongoose.model('User', userSchema)
