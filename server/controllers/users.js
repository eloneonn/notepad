const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const emailValidator = require('email-validator');
const { deleteNotesOfUser } = require('../db/notesQueries');
const { deleteRecordingsOfUser } = require('../db/recordingsQueries');
const { postUserprefs, deleteUserPrefs } = require('../db/userprefsQueries');
const {
  checkEmail,
  postUser,
  getUsers,
  updateUser,
  updatePassword,
  deleteUser
} = require('../db/usersQueries');
const { SALTROUNDS } = require('../utils/config');

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password === undefined || body.password.length <= 3) {
    response.statusMessage = 'Invalid password';
    return response.status(400).end();
  }

  if (body.name === undefined || body.name.trim() === '') {
    response.statusMessage = 'Invalid name';
    return response.status(400).end();
  }

  if (!emailValidator.validate(body.email)) {
    response.statusMessage = 'Invalid email';
    return response.status(400).end();
  }

  const res = await checkEmail([body.email]);

  if (res.rows.length !== 0) {
    response.statusMessage = 'Email already in use';
    return response.status(400).end();
  }

  const passwordHash = await bcrypt.hash(body.password, SALTROUNDS);

  try {
    const savedUser = await postUser([body.name, body.email, passwordHash]);
    await postUserprefs([savedUser.rows[0].id]);
    return response.status(201).json(savedUser.rows);
  } catch (e) {
    return response.status(400).json(e.message);
  }
});

usersRouter.put('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  if (request.body.name === undefined || request.body.name.trim() === '') {
    response.statusMessage = 'Invalid name';
    return response.status(400).end();
  }

  if (!emailValidator.validate(request.body.email)) {
    response.statusMessage = 'Invalid email';
    return response.status(400).end();
  }

  try {
    var res = await updateUser([request.user.id, request.body.name, request.body.email]);
  } catch (error) {
    next(error);
  }

  return response.json(res.rows[0]);
});

usersRouter.put('/password', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  const oldPassword = request.body.oldPassword;
  const newPassword = request.body.newPassword;

  if (!(await bcrypt.compare(oldPassword, request.user.hash))) {
    response.statusMessage = 'Wrong password';
    return response.status(401).end();
  }

  if (newPassword === undefined || newPassword.length <= 3) {
    response.statusMessage = 'Invalid password';
    return response.status(400).end();
  }

  const passwordHash = await bcrypt.hash(newPassword, SALTROUNDS);

  try {
    await updatePassword([passwordHash, request.user.id]);
  } catch (error) {
    next(error);
  }
  return response.status(200).end();
});

usersRouter.delete('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  if (!(await bcrypt.compare(request.query.password, request.user.hash))) {
    response.statusMessage = 'Wrong password';
    return response.status(401).end();
  }

  try {
    await deleteUserPrefs([request.user.id]);
    await deleteRecordingsOfUser([request.user.id]);
    await deleteNotesOfUser([request.user.id]);
    await deleteUser([request.user.id]);
  } catch (error) {
    next(error);
  }

  return response.status(200).end();
});

usersRouter.get('/', async (request, response) => {
  const res = await getUsers();
  return response.json(res.rows);
});

module.exports = usersRouter;
