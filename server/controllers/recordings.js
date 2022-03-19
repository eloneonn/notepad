/* eslint-disable prettier/prettier */
const recordingsRouter = require('express').Router();
const db = require('../db/index');

recordingsRouter.get('/', async (request, response) => {
  try {
    var res = await db.query('SELECT * FROM recordings WHERE note_id = $1', [request.query.id]);
  } catch (error) {
    return response.status(404).json(error);
  }

  return response.json(res.rows);
});

recordingsRouter.post('/', async (request, response) => {
  const res = await db.query(
    'INSERT INTO recordings (id, note_id, blob, title) VALUES ($1, $2, $3, $4)',
    [request.body.id, request.body.note_id, request.body.blob, request.body.title]
  );

  return response.json(res.rows);
});

recordingsRouter.delete('/', async (request, response) => {
  try {
    var res = await db.query('DELETE FROM recordings WHERE id = $1', [request.body.recording.id]);
  } catch (error) {
    response.status(404).json(error);
  }
  return res;
});

module.exports = recordingsRouter;
