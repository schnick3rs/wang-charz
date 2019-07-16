// api/index.js

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr?sf92467419=1
const db = require('./queries');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/backgrounds', db.getBackgrounds);
app.get('/backgrounds/:id', db.getBackgroundById);

// CREATE
app.post('/characters', db.createCharacter);

// READ
app.get('/characters', db.getCharacters);
app.get('/characters/:id', db.getCharacterById);

// UPDATE
//app.put('/characters', db.updateCharacter);

// DELETE
//app.delete('/characters', db.deleteCharacter);

module.exports = {
  path: '/api',
  handler: app
};
