// ~/plugins/contentful-inject.js
import Vue from 'vue';
import { createClient } from 'contentful';

export default ({ app }, inject) => {
  // use default environment config for convenience
  // these will be set via `env` property in nuxt.config.js
  const config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  };
  app.myContentful = createClient(config);
}
