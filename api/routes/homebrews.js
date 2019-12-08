const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

const TABLE_FIELDS = ['id', 'title', 'subtitle', 'slug', 'version', 'author'];

module.exports = router;

router.get('/', async (request, response) => {
  let select = '*';
  const fieldsString = request.query.fields;
  if (fieldsString) {
    const selectFields = [];
    fieldsString.split(',').forEach((potentialField) => {
      if (TABLE_FIELDS.includes(potentialField)) {
        selectFields.push(potentialField);
      }
    });
    select = selectFields.join(',');
  }

  const { rows } = await db.queryAsyncAwait(
    `SELECT ${select} FROM wrath_glory.homebrews WHERE is_active = true`,
    [],
  );

  const vaultItems = rows;

  response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
  response.status(200).json(vaultItems);
});

router.get('/:slug', async (request, response) => {
  const { slug } = request.params;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.homebrews WHERE slug = $1 LIMIT 1',
    [slug],
  );

  const vaultItem = rows[0];

  response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
  response.status(200).json(vaultItem);
});
