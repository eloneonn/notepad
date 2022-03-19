const recordingsRouter = require('express').Router();
const { deleteRecording, postRecording, getRecordings } = require('../db/recordingsQueries');

recordingsRouter.get('/', async (request, response) => {
  try {
    var res = await getRecordings([request.query.id]);
  } catch (error) {
    return response.status(404).json(error);
  }

  return response.json(res.rows);
});

recordingsRouter.post('/', async (request, response) => {
  const res = await postRecording([
    request.body.id,
    request.body.note_id,
    request.body.blob,
    request.body.title
  ]);

  return response.json(res.rows);
});

recordingsRouter.delete('/', async (request, response) => {
  try {
    var res = await deleteRecording([request.body.recording.id]);
  } catch (error) {
    response.status(404).json(error);
  }
  return res;
});

module.exports = recordingsRouter;
