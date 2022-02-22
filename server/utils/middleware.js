const jwt = require('jsonwebtoken')
const db = require('../db')
const { SECRET } = require('./config')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET)
    if (decodedToken) {
      res = await db.query('SELECT * FROM users WHERE user_id = $1', [decodedToken.id])
      request.user = res.rows[0]
    }
  }

  next()
}

module.exports = {
  errorHandler, userExtractor
}