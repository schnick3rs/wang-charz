const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (request, response) => {

  const slug = request.params.slug;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.homebrews WHERE is_active = true',
    [],
  );

  const vaultItems = rows;

  response.status(200).json(vaultItems);
});

router.get('/:slug', async (request, response) => {

  const slug = request.params.slug;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.homebrews WHERE slug = $1 LIMIT 1',
    [slug],
  );

  const vaultItem = rows[0];

  response.status(200).json(vaultItem);
});
