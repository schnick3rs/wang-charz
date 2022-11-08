const Router = require('express-promise-router');

const { sourceSql } = require('./_sqlSnippets');

const { powers, abilities } = require('../db/static/psychicPowersRepository');

const router = new Router();

module.exports = router;

const TABLE_FIELDS = ['id', 'name', 'cost', 'keywords', 'effect', 'discipline'];

router.get('/', async (request, response) => {

  const fieldsString = request.query.fields;
  if (fieldsString) {
    const selectFields = [];
    fieldsString.split(',').forEach((potentialField) => {
      if (TABLE_FIELDS.includes(potentialField)) {
        selectFields.push(potentialField);
      }
    });
  }

  let homebrewPowers = powers;

  const filter = {};

  const filterDisciplineString = request.query.discipline;
  if (filterDisciplineString) {
    filter.discipline = filterDisciplineString.split(',');
    if (filter.discipline) {
      homebrewPowers = homebrewPowers.filter( (p) => filter.discipline.includes(p.discipline));
    }
  }

  const filterNameString = request.query.name;
  if (filterNameString) {
    filter.name = filterNameString.split(',');
    if (filter.name) {
      homebrewPowers = homebrewPowers.filter( (p) => filter.name.includes(p.name));
    }
  }

  // for now, all powers are from the CORE rules, replace with 'p.source_id' once added

  let merged = [
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

router.get('/universal-abilities', async (request, response) => {

  const items = abilities;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});


router.get('/:slug', async (request, response) => {
  const { slug } = request.params;

  const item = powers.find(power => power.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
