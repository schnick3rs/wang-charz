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
    filter.source = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter((item) => filter.source.includes(item.source.key));
    }
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

/**
 * returns a list of all astartes chapter abilities
 */
router.get('/chapters/', (request, response) => {
  let items = [];
  items = chaptersRepository;

  const filter = {};
  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter.source = filterSourceString.split(',');
    if (filter.source) {
      items = items.filter((item) => filter.source.includes(item.source.key));
    }
  }

  items = items.map( (chapter) => {
    const label = chapter.source.key === 'core' ? chapter.name : `${chapter.name} [${chapter.source.book}]` ;
    return {
      ...chapter,
      label,
    }
  });

  items = items.sort((a, b) => a.name.localeCompare(b.name));

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(items);
});

router.get('/:slug', (request, response) => {
  const { slug } = request.params;

  const item = speciesRepository.find((archetype) => archetype.key === slug);

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
