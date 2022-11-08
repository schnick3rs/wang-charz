const homebrews = require('./homebrews');
const wargear = require('./wargear');
const psychicPowers = require('./psychicPowers');
const talents = require('./talents.js');

const factions = require('./factions');
const species = require('./species');
const archetypes = require('./archetypes');
const ascensionPackages = require('./ascensionPackages');
const threats = require('./threats');

const posts = require('./posts');
const actualPlays = require('./actualPlays');

//const users = require('./users.js_');
//const characters = require('./characters.js_');

module.exports = (app) => {
  app.use('/talents', talents);
  app.use('/wargear', wargear);
  app.use('/psychic-powers', psychicPowers);

  app.use('/factions', factions);
  app.use('/species', species);
  app.use('/archetypes', archetypes);
  app.use('/ascension-packages', ascensionPackages);
  app.use('/threats', threats);

  // via contentfull
  app.use('/homebrews', homebrews);
  app.use('/posts', posts);
  app.use('/actual-plays', actualPlays);

  // Users
  //app.use('/users', users);
  //app.use('/characters', characters);
};
