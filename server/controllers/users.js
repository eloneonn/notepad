const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const emailValidator = require('email-validator')
const db = require('../db/index')
const { SALTROUNDS } = require('../utils/config')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined && body.password.length <= 3) {
    return response.status(400).json({ error: 'Invalid password' }).end()
  }

  if (!emailValidator.validate(body.email)) {
    return response.status(400).json({ error: 'Invalid email' }).end()
  }

  const res = await db.query('SELECT * FROM users WHERE email = $1', [body.email])

  if (res.rows.length !== 0) {
    return response.status(400).json({ error: 'Email already in use' }).end()
  }

  const passwordHash = await bcrypt.hash(body.password, SALTROUNDS)

  try {
    const savedUser = await db.query('INSERT INTO users(name, email, hash, type_id) VALUES($1, $2, $3, $4) RETURNING *', [body.name, body.email, passwordHash, body.type_id])
    return response.status(201).json(savedUser.rows)
  } catch(e) {
    return response.status(400).json(e.message)
  }
})

usersRouter.get('/', async (request, response) => {
  const res = await db.query('SELECT FROM users')
  return response.json(res.rows)
})

module.exports = usersRouter
