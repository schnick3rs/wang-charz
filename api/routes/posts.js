if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { NUXT_ENV_CTF_SPACE_ID, NUXT_ENV_CTF_CD_ACCESS_TOKEN } = process.env;

const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

const contentful = require('contentful');
const client = contentful.createClient({
  space: NUXT_ENV_CTF_SPACE_ID,
  accessToken: NUXT_ENV_CTF_CD_ACCESS_TOKEN,
});

router.get('/', (request, response) => {
  const query = {
    'content_type': 'blogPost',
    'sys.revision[gt]': 0,
    'order': '-fields.publishedAt',
  };
  client.getEntries(query)
  .then( (data) => {
    response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
    response.status(200).json(data.items);
  })
  .catch( (error) => {
    console.warn(error);
  });
});


router.get('/:slug', (request, response) => {
  const { slug } = request.params;

  const query = {
    'content_type': 'blogPost',
    'sys.revision[gt]': 0,
    'fields.slug[in]': slug,
  };
  client.getEntries(query)
  .then( (data) => {
    response.set('Cache-Control', 'public, max-age=1800'); // 1/2 hour
    response.status(200).json(data.items);
  })
  .catch( (error) => {
    console.warn(error);
  });
});
