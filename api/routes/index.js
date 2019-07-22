const users = require('./users');
const characters = require('./characters');

module.exports = app => {
  app.use('/users', users);
  app.use('/characters', characters);
  // more uses...
};
