const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (request, response) => {

  const slug = request.params.slug;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.talents',
    [],
  );

  const vaultItems = rows;

  response.set('Cache-Control', 'public, max-age=3600'); // one year
  response.status(200).json(vaultItems);
});

router.get('/:id', async (request, response) => {

  const id = request.params.id;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.talents WHERE id = $1 LIMIT 1',
    [id],
  );

  const item = rows[0];

  response.status(200).json(item);
});
