
const express = require('express')
const { Pool } = require('pg')

const app = express()
const { DATABASE_URL } = require('./utils/config')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const pool = new Pool({connectionString: DATABASE_URL})

pool.connect()
    .then(res => console.log('Connected to database', res.database, 'at', res.host))

pool
    .query('SELECT NOW() as time_now')
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))


app.use(cors())
app.use(express.json())

module.exports = app