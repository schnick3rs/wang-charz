import type { Express } from 'express';
import homebrews from './homebrews';
import wargear from './wargear';
import psychicPowers from './psychicPowers';
import talents from './talents';
import factions from './factions';
import species from './species';
import archetypes from './archetypes';
import ascensionPackages from './ascensionPackages';
import threats from './threats';
import posts from './posts';
import actualPlays from './actualPlays';
// import users from './users';
// import characters from './characters';

export default (app: Express) => {
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
  // app.use('/users', users);
  // app.use('/characters', characters);
};