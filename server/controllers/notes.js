const db = require('../db')
const notesRouter = require('express').Router()

notesRouter.get('/', async (request, response) => {
    try {
        console.log(request.user.user_id);
        const res = await db.query('SELECT * FROM notes WHERE user_id = $1', [request.user.user_id])

        if (!(res.rows.length === 0)) {
            response.json(res.rows)
        } else {
            response.status(404).json('0 notes found')
        }
    
    } catch (error) {
        console.log(error.message)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const newNote = {
        title: request.body.title,
        content: request.body.content
    }

    const res = await db.query('INSERT INTO notes (user_id, title, content) VALUES($1, $2, $3) RETURNING *', [user.user_id, newNote.title, newNote.content])
    return response.status(201).json(res.rows[0])
})

notesRouter.put('/:id', async (request, response) => {
})

notesRouter.delete('/:id', async (request, response) => {

})

module.exports = notesRouter