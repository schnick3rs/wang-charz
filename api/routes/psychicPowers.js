const Router = require('express-promise-router');

const db = require('../db');
const { sourceSql } = require('./_sqlSnippets');

const psychicPowersRepository = require('../db/static/psychicPowersRepository');

const router = new Router();

module.exports = router;

const TABLE_FIELDS = ['id', 'name', 'cost', 'keywords', 'effect', 'discipline'];

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

  let homebrewPowers = psychicPowersRepository;

  let where = ' WHERE 1=1';
  const filter = {};

  const filterDisciplineString = request.query.discipline;
  if (filterDisciplineString) {
    filter.discipline = filterDisciplineString.split(',');
    if (filter.discipline) {
      where += ` AND discipline in ( '${filter.discipline.join("','")}' )`;
      homebrewPowers = homebrewPowers.filter( (p) => filter.discipline.includes(p.discipline));
    }
  }

  const filterNameString = request.query.name;
  if (filterNameString) {
    filter.name = filterNameString.split(',');
    if (filter.name) {
      where += ` AND name in ( '${filter.name.join("','")}' )`;
      homebrewPowers = homebrewPowers.filter( (p) => filter.name.includes(p.name));
    }
  }

  // for now, all powers are from the CORE rules, replace with 'p.source_id' once added
  const query = `select p.*, ${sourceSql('1')} as source from wrath_glory.psychic_powers p ${where}`;
  const { rows } = await db.queryAsyncAwait(query, []);

  const merged = [
    ...rows,
    ...homebrewPowers,
  ];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(merged);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  // for now, all powers are from the CORE rules, replace with 'p.source_id' once added
  const query = `select p.*, ${sourceSql('1')} as source from wrath_glory.psychic_powers p WHERE p.id = $1 LIMIT 1`;
  const { rows } = await db.queryAsyncAwait(query, [id]);

  const item = rows[0];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
