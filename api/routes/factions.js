const Router = require('express-promise-router');

const factionRepository = require('../db/static/factionRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {
  let items = factionRepository;

  const filter = {};

  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter.source = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter((item) => filter.source.includes(item.source.key));
    }
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {
  const { slug } = request.params;

  const item = factionRepository.find((faction) => faction.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
