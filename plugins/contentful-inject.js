// ~/plugins/contentful-inject.js
import { createClient } from 'contentful';

export default ({ app, env }, inject) => {
  // use default environment config for convenience
  // these will be set via `env` property in nuxt.config.js
  const config = {
    space: env.CTF_SPACE_ID,
    accessToken: env.CTF_CD_ACCESS_TOKEN,
  };
  app.myContentful = createClient(config);
}
