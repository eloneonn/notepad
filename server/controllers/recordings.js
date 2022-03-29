/* eslint-disable no-unused-vars */
const recordingsRouter = require('express').Router();
const fs = require('fs');
const { request } = require('http');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './recordings',
  filename: function (req, file, cb) {
    console.log(req.query.id);
    cb(null, `${req.query.id}.ogg`);
  }
});
const upload = multer({ storage: storage });
const {
  deleteRecording,
  postRecording,
  getRecordings,
  deleteRecordings,
  putRecording
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

  return response.status(204).send(res.rows);
});

recordingsRouter.get('/audiofile', async (request, response, next) => {
  response.download(request.query.path);
});

recordingsRouter.post('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }
  const res = await postRecording([
    request.body.id,
    request.user.id,
    request.body.note_id,
    request.body.title
  ]);

  return response.json(res.rows);
});

recordingsRouter.post('/newfile', upload.single('audiofile'), async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    await putRecording([request.file.path, request.body.id]);
  } catch (error) {
    next(error);
  }
  return response.status(201).end();
});

recordingsRouter.delete('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  const path = `recordings/${request.query.id}.ogg`;

  fs.unlink(path, (err) => {
    if (err) console.log(err);
  });

  try {
    deleteRecording([request.query.id]);
  } catch (error) {
    response.status(404).json(error);
  }
  return response.status(204).end();
});

recordingsRouter.delete('/multiple', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  try {
    var filesRes = await getRecordings([request.query.data]);
  } catch (error) {
    return response.status(404).json(error);
  }

  if (filesRes.rows.length !== 0) {
    filesRes.rows.forEach((recording) => {
      fs.unlink(recording.path, (err) => {
        if (err) console.log(err);
      });
    });
    try {
      deleteRecordings([request.query.data]);
    } catch (error) {
      response.status(404).json(error);
    }
  }

  return response.status(204).end();
});

module.exports = recordingsRouter;
