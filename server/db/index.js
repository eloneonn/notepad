const { Pool } = require('pg');
const { DATABASE_URL } = require('../utils/config');

const pool = new Pool({ connectionString: DATABASE_URL });

pool
  .connect()
  .then((res) => console.log('Connected to database', res.database, 'at', res.host))
  .catch((err) => console.error('Could not connect to database, error:', err.message));

pool.query('SELECT NOW() as time_now').then((res) => console.log(res.rows[0]));

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  }
};
