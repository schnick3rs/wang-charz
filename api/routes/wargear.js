const Router = require('express-promise-router');

const wargearRepository = require('../db/static/wargearRepository');

const router = new Router();

module.exports = router;

// Helper
const range = (s, e) => Array.from('x'.repeat(e - s), (_, i) => s + i);
const rangeP = (s, e) => range(s, e).map((i) => `$${i}`);
const toP = (a, o) => rangeP(o + 1, o + a.length + 1);


router.get('/', async (request, response) => {
  let where = '';
  const filter = {};
  const params = [];

  let homebrewWargear = wargearRepository;

  const filterTypeString = request.query.type;
  if (filterTypeString) {
    filter.type = filterTypeString.split(',');
    if (filter.type) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` type in ( ${toP(filter.type, params.length).join(',')} )`;
      params.push(...filter.type);
      homebrewWargear.filter((w)=>filter.type.includes(w.type));
    }
  }

  const filterRarityString = request.query.rarity;
  if (filterRarityString) {
    filter.rarity = filterRarityString.split(',');
    if (filter.rarity) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` rarity in ( ${toP(filter.rarity, params.length).join(',')} )`;
      params.push(...filter.rarity);
      homebrewWargear.filter((w)=>filter.rarity.includes(w.rarity));
    }
  }

  const filterValueLowerEqualString = request.query['value-leq'];
  if (filterValueLowerEqualString) {
    filter['value-leq'] = filterValueLowerEqualString;
    if (filter['value-leq']) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` value <= ${toP(filter['value-leq'], params.length)}  `;
      params.push(...filter['value-leq']);
      homebrewWargear.filter((w)=>w.value <= filter['value-leq']);
    }
  }

  const filterNameString = request.query.name;
  if (filterNameString) {
    filter.name = filterNameString.split(',');
    if (filter.name) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` name in ( ${toP(filter.name, params.length).join(',')} )`;
      params.push(...filter.name);
      homebrewWargear.filter((w)=>filter.name.includes(w.name));
    }
  }

  /*
  const { rows } = await db.queryAsyncAwait(
    `SELECT * FROM wrath_glory.wargear ${where}`,
    params,
  );

  sourcedRows = rows.map((r)=>{
    return {
      ...r,
      source: {
        book: 'Core Rules',
        key: 'core',
        version: '1',
        path: undefined,
        page: '-'
      },
    };
  });
  */

  let merged = [
    //...sourcedRows,
    ...homebrewWargear,
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
    'SELECT * FROM wrath_glory.wargear WHERE id = $1 LIMIT 1',
    [id],
  );

  let responseItem = {};

  if (rows && rows.length >= 1) {
    responseItem = rows[0];
  } else {
    responseItem = wargearRepository.find((i) => i.id == id);
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(responseItem );
});
