const db = require('.');

const checkEmail = async (props) => {
  return await db.query('SELECT * FROM users WHERE email = $1', props);
};

const postUser = async (props) => {
  return await db.query(
    'INSERT INTO users(name, email, hash) VALUES($1, $2, $3) RETURNING *',
    props
  );
};

const updateUser = async (props) => {
  return await db.query(
    'UPDATE users SET id = $1, name = $2, email = $3 WHERE id = $1 RETURNING *',
    props
  );
};

const updatePassword = async (props) => {
  return await db.query('UPDATE users SET hash = $1 WHERE id = $2', props);
};

const deleteUser = async (props) => {
  return await db.query('DELETE FROM users WHERE id = $1', props);
};

module.exports = { checkEmail, postUser, updateUser, updatePassword, deleteUser };
