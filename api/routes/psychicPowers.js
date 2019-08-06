const Router = require('express-promise-router');

const db = require('../db');

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

  const { rows } = await db.queryAsyncAwait(
    `SELECT ${select} FROM wrath_glory.psychic_powers ${where}`,
    [],
  );

  const vaultItems = rows;

  response.status(200).json(vaultItems);
});

router.get('/:id', async (request, response) => {

  const id = request.params.id;

  const { rows } = await db.queryAsyncAwait(
    'SELECT * FROM wrath_glory.psychic_powers WHERE id = $1 LIMIT 1',
    [id],
  );

  const item = rows[0];

  response.status(200).json(item);
});
