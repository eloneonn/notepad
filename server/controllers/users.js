const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const emailValidator = require('email-validator')
const db = require('../db/index')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  //TODO EMAIL-DUPLIKAATION TARKISTAMINEN JO TÄSSÄ
  if (body.password.length > 3 && body.password !== undefined && emailValidator.validate(body.email)) {

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

        response.status(201).json(savedUser.rows)

      } catch(e) {
          response.status(400).json(e.message)
      }
  } else {
    response.status(400).json('User validation failed: either the password was too short or the email was invalid')
  }
})

usersRouter.get('/', async (request, response) => {

    const res = await db.query('SELECT * FROM users')
    response.json(res.rows)
})

module.exports = usersRouter
