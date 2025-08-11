const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)


// Middleware before routes
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)

// Middleware after routes

module.exports = app
