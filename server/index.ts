import express from 'express';
import consola from 'consola';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config.js'; // stays .js, esModuleInterop handles default

config.dev = process.env.NODE_ENV !== 'production';

const app = express();

async function start() {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);
  app.listen(port, host);

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();