const Router = require('express-promise-router');

const db = require('../db');
const { sourceSql } = require('./_sqlSnippets');

const router = new Router();

module.exports = router;

const TABLE_FIELDS = ['id', 'name', 'cost', 'keywords', 'effect', 'discipline'];

router.get('/', async (request, response) => {

  let select = '*';
  const fieldsString = request.query.fields;
  if ( fieldsString ) {
    const selectFields = [];
    fieldsString.split(',').forEach( potentialField => {
      if ( TABLE_FIELDS.includes(potentialField) ) {
        selectFields.push(potentialField);
      }
    });
    select = selectFields.join(',');
  }

  let where = '';
  const filter = {};
  const filterDisciplineString = request.query.discipline;
  if (filterDisciplineString) {
    filter['discipline'] = filterDisciplineString.split(',');
    if (filter.discipline) {
      where = `WHERE discipline in ( '${filter.discipline.join("','")}' )`;
    }
  }

  // for now, all powers are from the CORE rules, replace with 'p.source_id' once added
  const query = `select p.*, ${sourceSql('1')} as source from wrath_glory.psychic_powers p ${where}`;
  const { rows } = await db.queryAsyncAwait(query, [], );

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(rows);
});

router.get('/:id', async (request, response) => {

  const id = request.params.id;

  // for now, all powers are from the CORE rules, replace with 'p.source_id' once added
  const query = `select p.*, ${sourceSql('1')} as source from wrath_glory.psychic_powers p WHERE p.id = $1 LIMIT 1`;
  const { rows } = await db.queryAsyncAwait(query, [id], );

  const item = rows[0];

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
