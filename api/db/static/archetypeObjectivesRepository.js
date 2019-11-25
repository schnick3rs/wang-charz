// TODO
// Astra Militarum

const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
  goen: { book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
  tog: { book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
  pax: { book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
  sotah: { book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
  amb: { book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
};

const stringToKebab = function(text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const kebabToCamel = function(slug) {
  return slug.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
};

const stringToKebabToCamel = function(text) {
   const slug = stringToKebab(text);
  return kebabToCamel(slug);
};

const simpleStub = function(sourceKey, sourcePage, species, group, name, bp, tier) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebabToCamel(sourceKey+' '+name)}`,
    name: name,
    cost: bp,
    tier: tier,
    group: group,
    species: [ species ],
  };
};

const core = [
  {
    group: 'Adeptus Ministorum',
    objectives: [
      'Extoll the virtues of worshipping the God-Emperor to an unbeliever.',
      'Proclaim your enemy to be a heretic and unworthy of the Emperor’s light.',
      'Bear witness to an act that you consider a miracle of the divine Emperor',
    ],
  },
  {
    group: 'Adepta Sororitas',
    objectives: [
      'Describe how faith and/or sacrifice in the Emperor’s name brings success.',
      'Invoke an Imperial Saint (Saint Alicia Dominica and Saint Celestine are two examples) to bless your achievements',
      'Bear witness to an act that you consider a miracle of the divine Emperor.',
    ],
  },
  {
    group: 'Astra Militarum',
    objectives: [
      'Express confidence (or the opposite!) in the virtue of overwhelming numbers and fi repower',
      'Explain how the Imperial Infantryman’s Uplifting Primer has a lesson appropriate to the current situation.',
      'Reminisce about your far-fl ung home world and compare it to the current situation.',
    ],
  },
  {
    group: 'Agents of the Imperium',
    objectives: [
      'Solve a problem using wealth, influence, psychic abilities, or guile instead of threats or force.',
      'Compare the current situation to a far-fl ung exotic world (within or beyond the Imperium) that you have visited.',
      'Display a symbol of your authority, and use it to firmly establish your position in an interaction with another NPC.',
    ],
  },
  {
    group: 'Adeptus Astartes',
    objectives: [
      'Call upon your Chapter’s Primarch as you defeat an enemy.',
      'Describe how the Codex Astartes applies (or does not apply) to the current situation.',
      'Reminisce upon the traditions of your Chapter (and the Chapter’s home world, if any) and compare it to the current situation.',
    ],
  },
  {
    group: 'Adeptus Mechanicus',
    objectives: [
      'Praise the Omnissiah as you commune with a machine-spirit (a successful Tech test counts for this).',
      'Calculate the odds of any given task and provide an estimate of either survival or success (or both).',
      'Reminisce about a Forge World you have visited and compare it to the current location.',
    ],
  },
  {
    group: 'Scum',
    objectives: [
      'Compare the current situation to a crime you once observed (or participated in).',
      'Verbally estimate the potential value of an item (or person!) if it were in your possession. This may be as subtle or as overt as you wish.',
      'Describe a desperate act of survival you attempted under diffi cult circumstances.',
    ],
  },
  {
    group: 'Renegade',
    objectives: [
      'Describe the benefi ts (or lack thereof!) of gaining the attention of the Ruinous Powers.',
      'Proclaim how a fl aw of the Imperium shall lead to its downfall.',
      'Bear witness to an act that you consider a sign of the Ruinous Powers’ favour (or contempt).',
    ],
  },
  {
    group: 'Aeldari',
    objectives: [
      'Unfavourably evaluate a facet of another species against Eldar culture, technology, or art.',
      'Call upon one of the gods of the Eldar as you accomplish a diffi cult task or defeat an enemy.',
      'Reminisce upon the traditions of an Eldar Craftworld, and compare it to the current situation.',
    ],
  },
  {
    group: 'Ork',
    objectives: [
      'Reminisce on the traditions of your Ork Clan, and compare them to the current situation.',
      'Use your size, physical might, or reputation in a fearsome manner.',
      'Sincerely express a desire for brutal, uncompromising combat.',
    ],
  },
];

const objectivesRepository = [
  ...core,
];

module.exports = objectivesRepository;
