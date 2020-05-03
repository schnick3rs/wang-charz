const homebrews = require('./homebrews');
const wargear = require('./wargear');
const psychicPowers = require('./psychicPowers');
const talents = require('./talents');

const factions = require('./factions');
const species = require('./species');
const archetypes = require('./archetypes');
const ascensionPackages = require('./ascensionPackages');
const threats = require('./threats');

const posts = require('./posts');

const users = require('./users');
const characters = require('./characters');

module.exports = (app) => {
  app.use('/homebrews', homebrews);
  app.use('/talents', talents);
  app.use('/wargear', wargear);
  app.use('/psychic-powers', psychicPowers);

  app.use('/factions', factions);
  app.use('/species', species);
  app.use('/archetypes', archetypes);
  app.use('/ascension-packages', ascensionPackages);
  app.use('/threats', threats);

  app.use('/posts', posts);

  app.use('/users', users);
  app.use('/characters', characters);
};
