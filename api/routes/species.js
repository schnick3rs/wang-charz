const Router = require('express-promise-router');

const speciesRepository = require('../db/static/speciesRepository');
const chaptersRepository = require('../db/static/speciesChaptersRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {

  let items = [];
  items = speciesRepository;

  const filter = {};
  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter['source'] = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter( item => filter.source.includes(item.source.key));
    }
  }

  response.status(200).json(items);
});

/**
 * returns a list of all astartes chapter abilities
 */
router.get('/chapters/', (request, response) => {

  let items = [];
  items = chaptersRepository;

  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {

  const slug = request.params.slug;

  const key = slug.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

  const item = speciesRepository.find( archetype => archetype.key === key );

  response.status(200).json(item);
});
