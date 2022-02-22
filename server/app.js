const express = require('express')
const db = require('./db/index')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(cors())
app.use(express.json())

module.exports = app