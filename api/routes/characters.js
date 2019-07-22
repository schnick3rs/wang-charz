const db = require('../db');

const Router = require('express-promise-router');
const router = new Router();
module.exports = router;

// CREATE
router.post('/characters', async (request, response) => {

  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const characterObject = JSON.stringify(request.body.state);
  const version = request.body.version;

  const { rows } = await db.queryAsyncAwait(
    'INSERT INTO wrath_glory.characters (character_object, version, uuid) VALUES ($1, $2, $3)',
    [characterObject, version, uuid]);

  response.status(200).json({});
});

// READ
router.get('/', async(request, response) => {

  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const { rows } = await db.queryAsyncAwait('SELECT * FROM wrath_glory.characters WHERE uuid = $1', [uuid]);
  const characters = rows.map( row => { return row.character_object } );
  response.status(200).json(characters);
});

router.get('/:id', async(request, response) => {

  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const id = parseInt(request.params.id);
  const { rows } = await db.queryAsyncAwait('SELECT * FROM wrath_glory.characters where id = $1 AND uuid = $2', [id, uuid]);

  const characters = rows.map( row => { return row.character_object } );
  response.status(200).json(characters[0]);
});

// UPDATE
router.put('/characters/:id', async (request, response) => {

  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const id = parseInt(request.params.id);
  const characterObject = JSON.stringify(request.body.state);
  const version = request.body.version;

  const { rows } = await db.queryAsyncAwait(
    'UPDATE wrath_glory.characters SET character_object = $1, version = $2 WHERE id = $3 AND uuid = $4',
    [characterObject, version, id, uuid]);

  response.status(200).json({});
});

// DELETE
router.delete('/characters/:id', async(request, response) => {

  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const id = parseInt(request.params.id);

  const { rows } = await db.queryAsyncAwait(
    'DELETE FROM wrath_glory.characters WHERE id = $1 AND uuid = $2',
    [id, uuid]);

  response.status(200).json({});
});
