/* eslint-disable no-unused-vars */
const recordingsRouter = require('express').Router();
const {
  deleteRecording,
  postRecording,
  getRecordings,
  deleteRecordings
} = require('../db/recordingsQueries');

recordingsRouter.get('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await getRecordings([request.query.id]);
  } catch (error) {
    return response.status(404).json(error);
  }

  return response.json(res.rows);
});

recordingsRouter.post('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  const res = await postRecording([
    request.body.id,
    request.body.note_id,
    request.body.blob,
    request.body.title
  ]);

  return response.json(res.rows);
});

recordingsRouter.delete('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await deleteRecording([request.query.data]);
  } catch (error) {
    response.status(404).json(error);
  }
  return res;
});

recordingsRouter.delete('/multiple', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var res = await deleteRecordings([request.query.data]);
  } catch (error) {
    response.status(404).json(error);
  }
  return res;
});

module.exports = recordingsRouter;
