const userprefsRouter = require('express').Router();
const { putUserprefs } = require('../db/userprefsQueries');

userprefsRouter.put('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).send('token missing or invalid');
  }

  const res = await putUserprefs([
    request.body.prefs.darkmode,
    request.body.prefs.sorter,
    request.body.prefs.autosave,
    request.body.id
  ]);
  return response.json(res.rows);
});

module.exports = userprefsRouter;
