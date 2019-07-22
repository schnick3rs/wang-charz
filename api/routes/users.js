/**
 * see https://node-postgres.com/guides/async-express
 */
const Router = require('express-promise-router');

const uuidv4 = require('uuid/v4');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

// creates a user
router.post('/register', async (request, response) => {

  // TODO normalize email normalize.lower.trim
  // TODO check if email exists => 4xx CONFLICT

  // TODO normalize password normalize.trim
  // TODO generate bcrypt password

  const uuid = uuidv4();
  const { rows } = await db.queryAsyncAwait('INSERT INTO wrath_glory.user (uuid) VALUES ($1) RETURNING id, username, uuid', [uuid]);
  // TODO should return only one row => assert
  const user = rows[0];
  response.status(201).json(user); // only return the first match
});

// login user
router.post('/login', async (request, response) => {

  // TODO normalize email/username
  // const password = request.body.username.toLowerCase().trim();

  // TODO normalize password
  // const password = request.body.password.trim();

  const uuid = request.body.uuid;

  const { rows } = await db.queryAsyncAwait('SELECT id, username, uuid, password FROM wrath_glory.user WHERE uuid = $1', [uuid]);

  // TODO should return only one row => assert
  const user = rows[0];

  // TODO validate password
  // BCrypt.checkPw(password, user.password) =>
  const token = 'someJwtToBeGenerated';

  response.status(201).json({uuid: user.uuid, token: token});
});

