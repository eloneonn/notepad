const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const emailValidator = require('email-validator');
const db = require('../db/index');
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

  const res = await db.query('SELECT * FROM users WHERE email = $1', [body.email]);

  if (res.rows.length !== 0) {
    response.statusMessage = 'Email already in use';
    return response.status(400).end();
  }

  const passwordHash = await bcrypt.hash(body.password, SALTROUNDS);

  try {
    const savedUser = await db.query(
      'INSERT INTO users(name, email, hash) VALUES($1, $2, $3) RETURNING *',
      [body.name, body.email, passwordHash]
    );
    await db.query('INSERT INTO userprefs(user_id) VALUES($1)', [savedUser.rows[0].id]);
    return response.status(201).json(savedUser.rows);
  } catch (e) {
    return response.status(400).json(e.message);
  }
});

usersRouter.get('/', async (request, response) => {
  const res = await db.query('SELECT FROM users');
  return response.json(res.rows);
});

module.exports = usersRouter;
