/* eslint-disable no-unused-vars */
const { getNotes, postNote, putNote, deleteNote } = require('../db/notesQueries');
const notesRouter = require('express').Router();

notesRouter.get('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

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
  const user = request.user;
  if (!user) {
    return response.status(401).send('token missing or invalid');
  }

  const newNote = request.body;

  if (newNote.title.length > 100) {
    response.statusMessage = 'Note title is too long (over 100 characters)';
    return response.status(400).end();
  }

  try {
    var res = await postNote([newNote.id, user.id, newNote.title, newNote.content]);
  } catch (error) {
    return response.status(400).json(error);
  }

  return response.status(201).json(res.rows[0]);
});

notesRouter.put('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }
  console.log(request.body.id);
  try {
    var res = await putNote([request.body.title, request.body.content, request.body.id]);
  } catch (error) {
    return response.status(404).json(error).end();
  }

  return response.json(res.rows[0]);
});

notesRouter.delete('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await deleteNote([request.query.data]);
  } catch (error) {
    return response.status(404).json(error);
  }

  return res;
});

module.exports = notesRouter;
