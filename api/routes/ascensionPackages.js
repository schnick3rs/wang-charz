const Router = require('express-promise-router');

const ascensionPackagesRepository = require('../db/static/ascensionRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {

  let items = ascensionPackagesRepository;

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

  const item = ascensionPackagesRepository.find((archetype) => archetype.key === slug);

  response.status(200).json(item);
});
