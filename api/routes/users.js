/**
 * see https://node-postgres.com/guides/async-express
 */
const Router = require('express-promise-router');

const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const db = require('../db');
const authProvider = require('./authProvider');

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
  // const hash = await bcrypt.hash(password, saltRounds);
  const hash = bcrypt.hashSync(password, saltRounds);

  const uuid = uuidv4();
  await db.queryAsyncAwait(
    'INSERT INTO wrath_glory.user (username, password, uuid) VALUES ($1, $2, $3)',
    [username, hash, uuid],
  );

  response.status(201).json({});
});

// login user
router.post('/login', async (request, response) => {
  console.info(`Login request...`);
  const username = request.body.username.toLowerCase().trim();
  console.info(`  for user: ${username}`);
  const { rows } = await db.queryAsyncAwait('SELECT * FROM wrath_glory.user WHERE username = $1', [username]);
  const user = rows[0];

  const password = request.body.password.toLowerCase().trim();
  const match = bcrypt.compareSync(password, user.password);

  if (match) {
    console.info(`Passwords for ${username} match. Login Successful, create and return JWT.`);
    const jwtPayload = {
      username: user.username,
      userId: user.id,
      userUuid: user.uuid,
    };

    const token = authProvider.sign(user.indexOf, jwtPayload);

    response.status(201).json({ token });
  } else {
    console.warn(`Passwords for ${username} did not match. Login Failed.`);
  }
});

// login user
router.get('/me', async (request, response) => {
  const decoded = authProvider.verifyRequest(request);

  const { rows } = await db.queryAsyncAwait(
    'SELECT id, username, uuid FROM wrath_glory.user WHERE id = $1',
    [decoded.userId],
  );
  // asert == 0
  const user = rows[0];

  response.status(200).json({ data: user });
});
