const Router = require('express-promise-router');

const archetypeRepository = require('../db/static/archetypeRepository');
const objectivesRepository = require('../db/static/archetypeObjectivesRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {

  let items = [];
  items = archetypeRepository;

  const filter = {};
  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter['source'] = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter( item => filter.source.includes(item.source.key));
    }
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/groups/', (request, response) => {

  let items = [];
  items = archetypeRepository;

  const filter = {};

  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter['source'] = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter( item => filter.source.includes(item.source.key));
    }
  }

  items = items.map( item => item.group );

  items = [ ...new Set(items)].sort();

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/objectives/', (request, response) => {

  let items = [];
  items = objectivesRepository;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {

  const slug = request.params.slug;

  const key = slug.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

  const item = archetypeRepository.find( archetype => archetype.key === key );

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});

