const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
        return res.status(400).json({error: 'expected username to be unique'})
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '')
    }
    next()
}

const userExtractor = (req, res, next) => {
    const token = req.token
    if (!token) {
        return res.status(401).json({ error: 'token missing' })
    }
    const decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    const user = {
        id: decoded.id,
        username: decoded.username
    }

    req.user = user
    next()
}

module.exports = { 
    errorHandler,
    tokenExtractor,
    userExtractor,
}
