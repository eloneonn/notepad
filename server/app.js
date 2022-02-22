const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const { errorHandler, userExtractor } = require('./utils/middleware')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/notes', userExtractor, notesRouter)
app.use('/api/users', usersRouter)


app.use(errorHandler)

module.exports = app