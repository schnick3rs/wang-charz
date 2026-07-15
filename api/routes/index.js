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

// Handles both CommonJS (module.exports = router) and
// TS-compiled ESM (export default router) route modules
// during the incremental TS migration.
function resolveRouter(mod) {
  return mod && mod.__esModule && mod.default ? mod.default : mod;
}

module.exports = (app) => {
  app.use('/talents', resolveRouter(talents));
  app.use('/wargear', resolveRouter(wargear));
  app.use('/psychic-powers', resolveRouter(psychicPowers));
  app.use('/factions', resolveRouter(factions));
  app.use('/species', resolveRouter(species));
  app.use('/archetypes', resolveRouter(archetypes));
  app.use('/ascension-packages', resolveRouter(ascensionPackages));
  app.use('/threats', resolveRouter(threats));
  // via contentfull
  app.use('/homebrews', resolveRouter(homebrews));
  app.use('/posts', resolveRouter(posts));
  app.use('/actual-plays', resolveRouter(actualPlays));
  // Users
  // app.use('/users', resolveRouter(users));
  // app.use('/characters', resolveRouter(characters));
};