const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const { SECRET } = require('../utils/config');
const login = require('../db/loginQueries');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  try {
    var res = await login(body.email);
  } catch (err) {
    return response.status(401).json(err);
  }

  if (res.rows.length === 0) {
    return response.status(401).json({ error: 'Wrong email' }).end();
  }

  const user = res.rows[0];
  console.log(user);

  if (!(await bcrypt.compare(body.password, user.hash))) {
    return response.status(401).json({ error: 'Wrong password' }).end();
  }

  const token = jwt.sign({ email: user.email, id: user.id }, SECRET);

  return response.status(200).send({
    token,
    id: user.id,
    email: user.email,
    name: user.name,
    darkmode: user.darkmode,
    sorter: user.sorter,
    autosave: user.autosave
  });
});

module.exports = loginRouter;
