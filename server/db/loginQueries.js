const db = require('.');

const login = async (props) => {
  return await db.query(
    'SELECT users.id, users.type_id, users.name, users.email, users.hash, userprefs.sorter, userprefs.darkmode, userprefs.autosave FROM users INNER JOIN userprefs ON users.id=userprefs.user_id WHERE email=($1)',
    [props]
  );
};

module.exports = login;
