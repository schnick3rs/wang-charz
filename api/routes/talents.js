const Router = require('express-promise-router');

const db = require('../db');
const { sourceSql } = require('./_sqlSnippets');

const talentRepository = require('../db/static/talentRepository');

const router = new Router();

module.exports = router;

router.get('/', async (request, response) => {

  let homebrewPowers = talentRepository;

  let where = ' WHERE 1=1';
  const filter = {};

  const query = `select t.*, ${sourceSql('t.source_id')} as source from wrath_glory.talents t ${where}`;
  const { rows } = await db.queryAsyncAwait(query, []);

  let merged = [
    ...rows,
    ...homebrewPowers,
  ];

  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter.source = filterSourceString.split(',');
    if (filter.source) {
      merged = merged.filter((item) => filter.source.includes(item.source.key));
    }
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(merged);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  const { rows } = await db.queryAsyncAwait(
    `SELECT t.*, ${sourceSql('t.source_id')} as source FROM wrath_glory.talents t WHERE t.id = $1 LIMIT 1`,
    [id],
  );

  const item = rows[0];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
