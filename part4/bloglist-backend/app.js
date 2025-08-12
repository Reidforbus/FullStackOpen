require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)


// Middleware before routes
app.use(express.json())

// Routes
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

// Middleware after routes
app.use(middleware.errorHandler)

module.exports = app
