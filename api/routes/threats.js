const Router = require('express-promise-router');

const threatRepository = require('../db/static/threatRepository');

const router = new Router();

module.exports = router;

router.get('/', (request, response) => {
  const items = threatRepository;

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {
  const { slug } = request.params;

  const key = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  const item = threatRepository.find((threat) => threat.key === key);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
