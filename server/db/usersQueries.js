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

const getUsers = async (props) => {
  return await db.query('SELECT FROM users', props);
};

module.exports = { checkEmail, postUser, getUsers };
