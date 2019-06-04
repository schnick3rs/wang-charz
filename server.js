// server.js
// see https://medium.com/js-dojo/how-i-deployed-my-vue-spa-on-heroku-4884fb81d73e

const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(serveStatic(path.join(_dirname, "/dist")));


const port = process.env.PORT || 80;
app.listen(port);

console.log('server started http://localhost:'+ port);
