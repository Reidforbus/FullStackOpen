const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { nonExistingBlogId } = require('./test_helper')

const api = supertest(app)

const sampleBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = sampleBlogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
})

describe('blogs api', () => {
    describe('getting blogs', () => {
        test('Correct number of blogs are returned', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.length, 6)
        })

        test('returned object contains id field', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.notStrictEqual(response.body[0].id, undefined)
        })
    })

    describe('adding a blog', () => {
        test('POST request adds a blog ', async () => {
            const new_blog = {
                title: "Tech won't save us",
                author: "Paris Marks",
                url: "https://techwontsave.us",
                likes: 5,
            }

            const response = await api
                .post('/api/blogs')
                .send(new_blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            delete response.body.id
            assert.deepStrictEqual(response.body, new_blog)

            const response2 = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
            assert.strictEqual(response2.body.length, 7)

        })
        test('missing likes defaults to 0', async () => {
            const new_blog = {
                title: "Tech won't save us",
                author: "Paris Marks",
                url: "https://techwontsave.us",
            }
            const response = await api
                .post('/api/blogs')
                .send(new_blog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.likes, 0)
        })

        test('missing title returns 404', async () => {
            const new_blog = {
                author: "Paris Marks",
                url: "https://techwontsave.us",
                likes: 5,
            }

            const response = await api
                .post('/api/blogs')
                .send(new_blog)
                .expect(400)
        })

        test('missing url returns 404', async () => {
            const new_blog = {
                title: "Tech won't save us",
                author: "Paris Marks",
                likes: 5,
            }

            const response = await api
                .post('/api/blogs')
                .send(new_blog)
                .expect(400)
        })
    })

    describe('deleting a blog', () => {
        test('that exists succeeds', async () => {
            const blog = await Blog.findOne()
            const id = blog.id
            assert.notStrictEqual(id, undefined)

            const response = await api
                .delete(`/api/blogs/${id}`)
                .expect(204)

            const result = await Blog.findById(id)
            assert.strictEqual(result, null)
        })

        test('that doesnt exist doesnt alter db', async () => {
            const id = await nonExistingBlogId()

            const state1 = await Blog.find({})

            const response = await api
                .delete(`/api/blogs/${id}`)
                .expect(204)

            const state2 = await Blog.find({})

            assert.deepStrictEqual(state1, state2)

        })

        test('with invalid id fails', async () => {
            const response = await api
                .delete('/api/blogs/abcdefg')
                .expect(400)
        })
    })

    describe('updating a blog', () => {
        test('that exists succeeds', async () => {
            const blog = await Blog.findOne()
            const id = blog.id
            const new_likes = { likes: 321 }
            assert.notStrictEqual(id, undefined)

            const response = await api
                .put(`/api/blogs/${id}`)
                .send(new_likes)
                .expect(204)

            const result = await Blog.findOne({ likes: 321 })
            assert.notStrictEqual(result, null)
        })

        test('that doesnt exist doesnt alter db', async () => {
            const id = await nonExistingBlogId()
            const new_likes = { likes: 321 }

            const state1 = await Blog.find({})


            const response = await api
                .put(`/api/blogs/${id}`)
                .send(new_likes)
                .expect(204)

            const state2 = await Blog.find({})

            assert.deepStrictEqual(state1, state2)
        })

        test('with invalid id fails', async () => {
            const response = await api
                .put('/api/blogs/abcdefg')
                .expect(400)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})
