const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

// Helper
const range = (s, e) => Array.from('x'.repeat(e - s), (_, i) => s + i);
const rangeP = (s, e) => range(s,e).map( i => `\$${i}` );
const toP = (a, o) => rangeP( o+1, o+a.length+1 );


router.get('/', async (request, response) => {

  let where = '';
  const filter = {};
  const params = [];

  const filterTypeString = request.query.type;
  if (filterTypeString) {
    filter['type'] = filterTypeString.split(',');
    if (filter.type) {
      where += (where.length>0) ? ' AND ' : ' WHERE ';
      where += ` type in ( ${toP(filter.type, params.length).join(",")} )`;
      params.push(...filter.type);
    }
  }

  const filterRarityString = request.query.rarity;
  if (filterRarityString) {
    filter['rarity'] = filterRarityString.split(',');
    if (filter.rarity) {
      where += (where.length>0) ? ' AND ' : ' WHERE ';
      where += ` rarity in ( ${toP(filter.rarity, params.length).join(",")} )`;
      params.push(...filter.rarity);
    }
  }

  const filterValueLowerEqualString = request.query['value-leq'];
  if (filterValueLowerEqualString) {
    filter['value-leq'] = filterValueLowerEqualString;
    if (filter['value-leq']) {
      where += (where.length>0) ? ' AND ' : ' WHERE ';
      where += ` value <= ${toP(filter['value-leq'], params.length)}  `;
      params.push(...filter['value-leq']);
    }
  }

  const filterNameString = request.query.name;
  if (filterNameString) {
    filter['name'] = filterNameString.split(',');
    if (filter.name) {
      where += (where.length>0) ? ' AND ' : ' WHERE ';
      where += ` name in ( ${toP(filter.name, params.length).join(",")} )`;
      params.push(...filter.name);
    }
  }

  console.log(where);
  console.log(params);
  const { rows } = await db.queryAsyncAwait(
    `SELECT * FROM wrath_glory.wargear ${where}`,
    params,
  );

  const vaultItems = rows;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(vaultItems);
});

router.get('/:id', async (request, response) => {

  const id = request.params.id;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.wargear WHERE id = $1 LIMIT 1',
    [id],
  );

  const item = rows[0];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
