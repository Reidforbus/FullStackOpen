const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(result)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    let blog = request.body
    const user = await User.findById(request.user.id)
    blog.user = user.id
    blog = new Blog(blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(204).end()
    }

    if (blog.user.toString() !== request.user.id) {
        return response.status(403).send({ error: 'forbidden' })
    }

    await Blog.deleteOne(blog)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const updated = request.body
    updated.user = updated.user.id

    await Blog.findByIdAndUpdate(id, updated, { runValidators: true })
    response.status(204).end()
})

module.exports = blogsRouter
