const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

testUsers = [
    {
        username: 'matti',
        name: 'Matti',
        pwHash: 'notapassword'
    },
    {
        username: 'teppo',
        name: 'Teppo',
        pwHash: 'notapassword'
    },
    {
        username: 'maija',
        pwHash: 'notapassword'
    },
    {
        username: 'sanna',
        name: 'Sanna',
        pwHash: 'notapassword'
    },
]

beforeEach(async () => {
    await User.deleteMany({ username: { $not: { $eq: process.env.TEST_USERNAME }}})
    const userObjects = testUsers.map(user => new User(user))
    const promises = userObjects.map(user => user.save())
    await Promise.all(promises)
})

describe('users api', () => {
    describe('adding a user', () => {
        test('succeeds', async () => {
            const new_user = {
                username: 'testtest',
                password: 'testpw',
            }

            await api
                .post('/api/users')
                .send(new_user)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const result = await User.findOne({username: new_user.username})
            assert.notStrictEqual(result, null)
        })

        test('fails for an existing username', async () => {
            const state1 = await User.find({})
            const new_user = {
                username: 'matti',
                password: 'testpw',
            }

            const result = await api
                .post('/api/users')
                .send(new_user)
                .expect(400)

            const state2 = await User.find({})
            assert.deepStrictEqual(state2, state1)
        })

        test('fails if username is missing', async () => {
            const state1 = await User.find({})
            const new_user = {
                password: 'testpw',
            }

            const result = await api
                .post('/api/users')
                .send(new_user)
                .expect(400)

            const state2 = await User.find({})
            assert.deepStrictEqual(state2, state1)
        })

        test('fails if pw is missing', async () => {
            const state1 = await User.find({})
            const new_user = {
                username: 'test',
            }

            const result = await api
                .post('/api/users')
                .send(new_user)
                .expect(400)

            const state2 = await User.find({})
            assert.deepStrictEqual(state2, state1)
        })

        test('fails if username is too short', async () => {
            const state1 = await User.find({})
            const new_user = {
                username: 'ma',
                password: 'testpw',
            }

            const result = await api
                .post('/api/users')
                .send(new_user)
                .expect(400)

            const state2 = await User.find({})
            assert.deepStrictEqual(state2, state1)
        })

        test('fails if pw is too short', async () => {
            const state1 = await User.find({})
            const new_user = {
                username: 'test',
                password: 'pw',
            }

            const result = await api
                .post('/api/users')
                .send(new_user)
                .expect(400)

            const state2 = await User.find({})
            assert.deepStrictEqual(state2, state1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})
