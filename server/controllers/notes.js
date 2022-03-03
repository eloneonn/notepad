const db = require('../db')
const notesRouter = require('express').Router()

notesRouter.get('/', async (request, response, next) => {
    try {
        var res = await db.query('SELECT * FROM notes WHERE user_id = $1', [request.user.id])
    } catch (error) {
        return response.status(404).json(error)
    }

    if (res.rows.length === 0) {
        return response.status(404).send('0 notes found')
    } else {
        return response.json(res.rows)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const user = request.user

    if (!user) {
        return response.status(401).send('token missing or invalid')
    }

    try {
        const res = await db.query('INSERT INTO notes (id, user_id, title, content) VALUES($1, $2, $3, $4) RETURNING *', [request.body.id, user.id, request.body.title, request.body.content])
    } catch (error) {
        response.status(400).json(error)
    }
    return response.status(201).json(res.rows[0])
})

notesRouter.put('/', async (request, response, next) => {
    const user = request.user

    if (!user) {
        return response.status(401).send('token missing or invalid')
    }

    try {
        const res = await db.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [request.body.title, request.body.content, request.body.id])
    } catch (error) {
        response.status(404).json(error)
    }
    return response.json(res.rows[0])
})

notesRouter.delete('/', async (request, response, next) => {
    try {
        const res = await db.query('DELETE FROM notes WHERE id = $1', [request.body.note.id])
    } catch (error) {
        response.status(404).json(error)
    }

    return res
})

module.exports = notesRouter