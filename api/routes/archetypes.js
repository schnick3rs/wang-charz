const Router = require('express-promise-router');

const archetypeRepository = require('../db/static/archetypeRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {

  const items = archetypeRepository;

  //response.set('Cache-Control', 'public, max-age=3600'); // one year
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {

  const slug = request.params.slug;

  const key = slug.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

  const item = archetypeRepository.find( archetype => archetype.key === key );

  response.status(200).json(item);
});
