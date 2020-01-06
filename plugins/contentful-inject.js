// ~/plugins/contentful-inject.js

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { createClient } from 'contentful';

// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: process.env.NUXT_ENV_CTF_SPACE_ID,
  accessToken: process.env.NUXT_ENV_CTF_CD_ACCESS_TOKEN,
};

export default ({ app }, inject) => {
  //inject('myContentful', () => createClient(config));
  /*
  app.myContentful = createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CD_ACCESS_TOKEN,
  });
  */
}
