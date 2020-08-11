const Router = require('express-promise-router');

const authProvider = require('./authProvider');
const db = require('../db');

const router = new Router();
module.exports = router;

// CREATE
router.post('/', async (request, response) => {
  const decoded = authProvider.verifyRequest(request);
  console.info(`Decoded UUID -> ${decoded.userUuid}`);

  const { id, version, state } = request.body;
  const characterObject = JSON.stringify(state);

  try {
    console.info('INSERT character...');
    let result = await db.queryAsyncAwait(
      'INSERT INTO wrath_glory.characters (character_object, version, unique_hash, uuid) VALUES ($1, $2, $3, $4)',
      [characterObject, version, id, decoded.userUuid],
    );
    console.info(result);
    response.status(200).json({});
  } catch (error) {
    console.warn(error);
    response.status(400).json({ message: error.message });
  }
});

// READ LIST
router.get('/', async (request, response) => {
  const decoded = authProvider.verifyRequest(request);
  console.info(`Decoded UUID -> ${decoded.userUuid}`);
  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.characters WHERE uuid = $1',
    [decoded.userUuid],
  );
  const characters = rows.map((row) => ({
    ...row.character_object,
    id: row.id,
  }));
  response.status(200).json(characters);
});

// READ SINGLE
router.get('/:character_hash/', async (request, response) => {
  const { userUuid } = authProvider.verifyRequest(request);
  const { character_hash } = request.params;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.characters where unique_hash = $1 AND uuid = $2',
    [character_hash, userUuid],
  );

  const characters = rows.map((row) => ({ ...row.character_object, id: row.id }));
  response.status(200).json(characters[0]);
});

// READ SINGLE Snippet
router.get('/:character_hash/:column/', async (request, response) => {
  const { userUuid } = authProvider.verifyRequest(request);
  const { character_hash, column } = request.params;

  const { rows } = await db.queryAsyncAwait(
    'SELECT character_object->$1 AS snippet, unique_hash FROM wrath_glory.characters where unique_hash = $2 AND uuid = $3',
    [column, character_hash, userUuid],
  );
  const characters = rows.map((row) => {
    const character = { unique_hash: row.unique_hash };
    character[column] = row.snippet;
    return character;
  });
  response.status(200).json(characters[0]);
});

// UPDATE
router.put('/:id', async (request, response) => {

  const decoded = authProvider.verifyRequest(request);
  console.info(`Decoded UUID -> ${decoded.userUuid}`);

  const id = parseInt(request.params.id);
  const characterObject = JSON.stringify(request.body.state);
  const { version } = request.body;

  const { rows } = await db.queryAsyncAwait(
    'UPDATE wrath_glory.characters SET character_object = $1, version = $2 WHERE id = $3 AND uuid = $4',
    [characterObject, version, id, decoded.userUuid],
  );

  response.status(200).json({});
});

/**
 * PATCH character json
 */
router.patch('/:character_hash/:column/', async (request, response) => {

  const decoded = authProvider.verifyRequest(request);
  const { userUuid } = decoded;
  console.info(`Decoded UUID -> ${userUuid}`);

  const { character_hash, column } = request.params;

  const patch = request.body.patch;
  let snippetString = '';

  try {
    console.info(`PATCH character...`);

    if (Array.isArray(patch)) {
      snippetString = '$$'+JSON.stringify([...patch])+'$$';
    } else if (patch instanceof Object) {
      snippetString = '$$'+JSON.stringify({...patch})+'$$';
    } else {
      snippetString = `'"${patch}"'`;
    }

    const { rows } = await db.queryAsyncAwait(
      'UPDATE wrath_glory.characters ' +
      'SET character_object = jsonb_set(character_object::jsonb, $1, '+snippetString+') ' +
      'WHERE unique_hash = $2 AND uuid = $3',
      [`{${column}}`, character_hash, userUuid],
    );
    response.status(200).json({});
  } catch (error) {
    console.warn(error);
    response.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id/', async (request, response) => {
  // TODO fetch ID from JWT
  const uuid = request.header('X-USER-UUID');

  const id = parseInt(request.params.id);

  const { rows } = await db.queryAsyncAwait(
    'DELETE FROM wrath_glory.characters WHERE id = $1 AND uuid = $2',
    [id, uuid],
  );

  response.status(200).json({});
});
