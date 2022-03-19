/* eslint-disable no-unused-vars */
const { getNotes, postNote, putNote, deleteNote } = require('../db/notesQueries');
const notesRouter = require('express').Router();

notesRouter.get('/', async (request, response, next) => {
  try {
    var res = await getNotes([request.user.id]);
  } catch (error) {
    return response.status(404).json(error);
  }

  if (res.rows.length === 0) {
    return response.status(404).send('0 notes found');
  } else {
    return response.json(res.rows);
  }
});

notesRouter.post('/', async (request, response, next) => {
  //TODO validaatiot
  const user = request.user;

  if (!user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await postNote([request.body.id, user.id, request.body.title, request.body.content]);
  } catch (error) {
    response.status(400).json(error);
  }
  return response.status(201).json(res.rows[0]);
});

notesRouter.put('/', async (request, response, next) => {
  const user = request.user;

  if (!user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await putNote([request.body.title, request.body.content, request.body.id]);
  } catch (error) {
    response.status(404).json(error);
  }
  return response.json(res.rows[0]);
});

notesRouter.delete('/', async (request, response, next) => {
  try {
    var res = await deleteNote([request.body.note.id]);
  } catch (error) {
    response.status(404).json(error);
  }

  return res;
});

module.exports = notesRouter;
