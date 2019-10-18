if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Pool, Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL_PROD;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: true,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, (error, result) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: result.rowCount });
      callback(error, result);
    });
  },
  queryAsyncAwait: (text, params) => pool.query(text, params),
};
