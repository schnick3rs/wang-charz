// api/index.js

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr?sf92467419=1
const db = require('./queries');
const uuidv4 = require('uuid/v4');
const express = require('express');
const app = express();
app.use(express.json());

/**
 * request to create a new account
 * returns 201 CREATED
 */
app.post('/account', (request, response) => {

  // TODO normalize email
  // TODO check if email exists => 4xx CONFLICT

  // TODO normalize password
  // TODO generate bcrypt password

  // generate a unique random user id
  const uuid = uuidv4();

  //db.createUser({ uuid:  uuid }, response);
  db.query(`INSERT INTO wrath_glory.user (uuid) VALUES ($1) RETURNING *`, [uuid], (error, result) => {
    if ( error ) {
      response.status(500).json({status: 'error', message:'Could not create user.', error: error})
    } else {
      const user = result.rows.map( r => { return { id: r.id, uuid: r.uuid}; });
      response.status(201).json({status:'success', data: user[0] });
    }
  });

  // TODO send verification email
});

/**
 * Login using the UUID (and later name and password)
 */
app.post('/account/login', (request, response) => {
  // TODO normalize email/username
  // TODO normalize password

  const uuid = request.body.uuid;

  const user = db.getUserByUuid(uuid)
});

// CREATE
app.post('/characters', db.createCharacter);

// READ
app.get('/characters', db.getCharacters);
app.get('/characters/:id', db.getCharacterById);

// UPDATE
app.put('/characters/:id', db.updateCharacterById);

// DELETE
app.delete('/characters/:id', db.deleteCharacterById);



app.get('/backgrounds', db.getBackgrounds);
app.get('/backgrounds/:id', db.getBackgroundById);


module.exports = {
  path: '/api',
  handler: app
};
