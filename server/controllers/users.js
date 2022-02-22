const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length > 3 && body.password !== undefined) {

    const saltRounds = 15
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = ({
        passwordHash,
        type_id: body.type_id,
        email: body.email,
        name: body.name
        })
    
      try {
        const savedUser = await db.query('INSERT INTO users(name, email, hash, type_id) VALUES($1, $2, $3, $4) RETURNING *', [user.name, user.email, user.passwordHash, user.type_id])

        response.json(savedUser.rows)

      } catch(e) {
          response.status(400).json(e.message)
      }
  } else {
    response.status(400).json('User validation failed: password was either undefined or too short (minimum length: 3)')
  }
})

usersRouter.get('/', async (request, response) => {

    const res = await db.query('SELECT * FROM users')
    response.json(res.rows)
})

module.exports = usersRouter
