/* eslint-disable no-unused-vars */
const recordingsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { request } = require('http');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './recordings',
  filename: function (req, file, cb) {
    cb(null, `${req.query.id}.ogg`);
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });
const {
  deleteRecording,
  postRecording,
  getRecordings,
  deleteRecordings,
  putRecording
} = require('../db/recordingsQueries');
const { SECRET } = require('../utils/config');

recordingsRouter.get('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }
  try {
    var res = await getRecordings([request.query.id]);
  } catch (error) {
    return response.status(404).json(error);
  }

  if (res.rows.length === 0) {
    return response.status(204).end();
  }

  return response.send(res.rows);
});

recordingsRouter.get('/audiofile', async (request, response, next) => {
  const decodedToken = jwt.verify(request.query.token, SECRET);

  if (decodedToken.id === Number(request.query.user_id)) {
    response.download(request.query.path);
  }
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
