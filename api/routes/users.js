/**
 * see https://node-postgres.com/guides/async-express
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const JWT_SECRET = process.env.JWT_SECRET;

const Router = require('express-promise-router');

const uuidv4 = require('uuid/v4');
const db = require('../db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

// creates a user
router.post('/register', async (request, response) => {

  // normalize email normalize.lower.trim
  const username = request.body.username.toLowerCase().trim();
  // TODO check if email exists => 4xx CONFLICT

  // normalize password normalize.trim
  const password = request.body.password.toLowerCase().trim();
  // TODO generate bcrypt password
  //const hash = await bcrypt.hash(password, saltRounds);
  var hash = bcrypt.hashSync(password, saltRounds);

  const uuid = uuidv4();
  const { rows } = await db.queryAsyncAwait(
    'INSERT INTO wrath_glory.user (username, password, uuid) VALUES ($1, $2, $3)',
    [username, hash, uuid]
  );

  response.status(201).json({});
});

// login user
router.post('/login', async (request, response) => {

  const username = request.body.username.toLowerCase().trim();
  const { rows } = await db.queryAsyncAwait('SELECT * FROM wrath_glory.user WHERE username = $1', [username]);
  const user = rows[0];

  const password = request.body.password.toLowerCase().trim();
  const match = bcrypt.compareSync(password, user.password);

  if (match) {
    const token = jwt.sign({userId: user.id, username: user.username}, JWT_SECRET );
    response.status(201).json({userId: user.id, username: user.username, token: token});
  }

});

