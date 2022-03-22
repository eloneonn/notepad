const db = require('.');

const putUserprefs = async (props) => {
  return await db.query(
    'UPDATE userprefs SET darkmode = $1, sorter = $2, autosave = $3 WHERE user_id = $4',
    props
  );
};

const postUserprefs = async (props) => {
  return await db.query('INSERT INTO userprefs(user_id) VALUES($1)', props);
};

const deleteUserPrefs = async (props) => {
  return await db.query('DELETE FROM userprefs WHERE user_id = $1', props);
};

module.exports = { putUserprefs, postUserprefs, deleteUserPrefs };
