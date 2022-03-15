const userprefsRouter = require('express').Router();
const db = require('../db/index');

userprefsRouter.put('/', async (request, response) => {
  const res = await db.query('UPDATE userprefs SET darkmode = $1, sorter = $2 WHERE user_id = $3', [
    request.body.prefs.darkmode,
    request.body.prefs.sorter,
    request.body.id
  ]);
  return response.json(res.rows);
});

module.exports = userprefsRouter;
