const homebrews = require('./homebrews');

module.exports = app => {
  // more uses...
  app.use('/homebrews', homebrews);
};
