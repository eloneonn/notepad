const db = require('.');

const getNotes = async (props) => {
  return await db.query('SELECT * FROM notes WHERE user_id = $1', props);
};

const postNote = async (props) => {
  return await db.query(
    'INSERT INTO notes (id, user_id, title, content) VALUES($1, $2, $3, $4) RETURNING *',
    props
  );
};

const putNote = async (props) => {
  return await db.query(
    'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    props
  );
};

const deleteNote = async (props) => {
  return await db.query('DELETE FROM notes WHERE id = $1', props);
};

module.exports = { getNotes, postNote, putNote, deleteNote };
