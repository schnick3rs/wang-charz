// https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr?sf92467419=1
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const express = require('express');

const app = express();
app.use(express.json());

const mountRoutes = require('./routes');

mountRoutes(app);

module.exports = {
  path: '/api',
  handler: app,
};
