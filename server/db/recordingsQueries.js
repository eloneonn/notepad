const db = require('.');

const getRecordings = async (props) => {
  return await db.query('SELECT * FROM recordings WHERE note_id = $1', props);
};

const postRecording = async (props) => {
  return await db.query(
    'INSERT INTO recordings (id, user_id, note_id, title) VALUES ($1, $2, $3, $4 )',
    props
  );
};

const putRecording = async (props) => {
  return await db.query('UPDATE recordings SET path = $1 WHERE id = $2', props);
};

const deleteRecording = async (props) => {
  return await db.query('DELETE FROM recordings WHERE id = $1', props);
};

const deleteRecordings = async (props) => {
  return await db.query('DELETE FROM recordings WHERE note_id = $1', props);
};

const deleteRecordingsOfUser = async (props) => {
  return await db.query('DELETE FROM recordings WHERE user_id = $1', props);
};

module.exports = {
  getRecordings,
  postRecording,
  deleteRecording,
  deleteRecordings,
  deleteRecordingsOfUser,
  putRecording
};
