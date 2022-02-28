const db = require('../db')
const notesRouter = require('express').Router()

notesRouter.get('/', async (request, response, next) => {
    try {
        var res = await db.query('SELECT * FROM notes WHERE user_id = $1', [request.user.id])
    } catch (error) {
        return response.status(404).json(error)
    }

    if (res.rows.length === 0) {
        return response.status(404).json({ error: '0 notes found' })
    } else {
        return response.json(res.rows)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const res = await db.query('INSERT INTO notes (user_id, title, content) VALUES($1, $2, $3) RETURNING *', [user.id, request.body.title, request.body.content])
    return response.status(201).json(res.rows[0])
})

notesRouter.put('/', async (request, response, next) => {
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const res = await db.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [request.body.title, request.body.content, request.body.id])
    return response.json(res.rows[0])
})

notesRouter.delete('/', async (request, response, next) => {

    const res = await db.query('DELETE FROM notes WHERE id = $1', [request.body.note.id])
    return res
})

module.exports = notesRouter