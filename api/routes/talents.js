const Router = require('express-promise-router');

const db = require('../db');

const { sourceSql } = require('./_sqlSnippets');

const router = new Router();

module.exports = router;

router.get('/', async (request, response) => {

  const query = `select t.*, ${sourceSql('t.source_id')} as source from wrath_glory.talents t`;

  const { rows } = await db.queryAsyncAwait(query, [], );

  const vaultItems = rows;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(vaultItems);
});

router.get('/:id', async (request, response) => {

  const id = request.params.id;

  const { rows } = await db.queryAsyncAwait(
    `SELECT t.*, ${sourceSql('t.source_id')} as source FROM wrath_glory.talents t WHERE t.id = $1 LIMIT 1`,
    [id],
  );

  const item = rows[0];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
