const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    let result = await User.find({})
    response.json(result)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password){
        return response.status(400).send({error: 'Password is required'})
    }
    if (password.length < 3) {
        return response.status(400).send({error: 'Password should at least 3 characters long'})
    }
    const salts = 10
    const pwHash = await bcrypt.hash(password, salts)

    const newUser = new User({
        username,
        name,
        pwHash,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter
