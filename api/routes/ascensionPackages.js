const Router = require('express-promise-router');

const ascensionPackagesRepository = require('../db/static/ascensionRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {

  const items = ascensionPackagesRepository;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {

  const slug = request.params.slug;

  const key = slug.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

  const item = ascensionPackagesRepository.find( archetype => archetype.key === key );

  response.status(200).json(item);
});
