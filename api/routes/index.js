const homebrews = require('./homebrews');
const wargear = require('./wargear');

module.exports = app => {
  // more uses...
  app.use('/homebrews', homebrews);
  app.use('/wargear', wargear);
};
