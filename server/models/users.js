const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length > 3 && body.password !== undefined) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })
    
      try {
        const savedUser = await user.save() //! TÄMÄ MUUTTUU

        response.json(savedUser)

      } catch(e) {
          response.status(400).json(e.message)
      }
    
    
  } else {
    response.status(400).json('User validation failed: password was either undefined or too short (minimum length: 3)')
  }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0 })  //! TÄMÄ MUUTTUU
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
