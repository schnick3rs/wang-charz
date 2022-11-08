/**
 * see https://node-postgres.com/guides/async-express
 */
const Router = require('express-promise-router');

import { v4 } from 'uuid';

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

  await db.queryAsyncAwait(
    'INSERT INTO wrath_glory.user (username, password, uuid) VALUES ($1, $2, $3)',
    [username, hash, v4()],
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
    const jwtPayload = {
      username: user.username,
      userId: user.id,
      userUuid: user.uuid,
    };

    const token = authProvider.sign(user.indexOf, jwtPayload);

    response.status(201).json({ token });
  }
});

// login user
router.get('/me', async (request, response) => {
  const decoded = authProvider.verifyRequest(request);
  // assert valid

  const { rows } = await db.queryAsyncAwait(
    'SELECT id, username, uuid FROM wrath_glory.user WHERE id = $1',
    [decoded.userId],
  );
  // asert == 0
  const user = rows[0];

  response.status(200).json({ data: user });
});
