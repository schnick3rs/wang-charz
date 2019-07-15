// https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr?sf92467419=1
// api/index.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

app.get('/backgrounds', function (req, res) {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query('SELECT id, name, hint FROM wrath_glory.background;', (error, response) => {
    if (error) {
      res.status(500).json({status: 'error', message: `Somthing wrong`});
    };

    let data = [];
    for (let row of response.rows) {
      data.push(row)
    }
    console.log(data);
    res.status(200).json({status: 'success', data: data});
    client.end();
  });
});

app.get('/characters', function (req, res) {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query('SELECT * FROM wrath_glory.characters;', (error, response) => {
    if (error) {
      res.status(500).json({status: 'error', message: `Somthing wrong`});
    };

    let data = [];
    for (let row of response.rows) {
      data.push(row)
    }
    console.log(data);
    res.status(200).json({status: 'success', data: data});
    client.end();
  });
});

module.exports = {
  path: '/api',
  handler: app
};
