const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { SECRET } = require('../utils/config')
const db = require('../db')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    const res = await db.query('SELECT * FROM users WHERE email=($1)', [body.email])
    const user = res.rows[0]
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.hash)
  
    if (!passwordCorrect) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      email: user.email,
      id: user.user_id,
    }
  
    const token = jwt.sign(userForToken, SECRET)
  
    response
      .status(200)
      .send({ token, email: user.email, name: user.name })
  
  } catch (err) {
    return response.status(401).json({
      error: 'invalid username or password'
  })
}})

module.exports = loginRouter
