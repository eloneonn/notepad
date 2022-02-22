const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length > 3 && body.password !== undefined) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = ({
        type_id: body.type_id,
        email: body.email,
        name: body.name,
        passwordHash,
      })
    
      try {
        const savedUser = await db.query('INSERT INTO users(type_id, name, email, hash) VALUES($1, $2, $3, $4) RETURNING *', [user.type_id, user.name, user.email, user.passwordHash])

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
    
//   response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
