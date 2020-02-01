
const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  aaoa: {
    book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha',
  },
  lotn: {
    book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr',
  },
  thaot: {
    book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology',
  },
  ltgb: {
    book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn',
  },
  aptb: {
    book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary',
  },
  jtb: {
    book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary',
  },
  aotgt: {
    book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne',
  },
  tea: {
    book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels',
  },
  heva: {
    book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault',
  },
  goen: {
    book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines',
  },
  tog: {
    book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory',
  },
  pax: {
    book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis',
  },
  sotah: {
    book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde',
  },
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleStub = function (id, sourceKey, sourcePage, cost, name, discipline, effect) {

  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub: true,
  };
};

const paxNavigatorPowers = [
  simpleStub(101, 'pax', 190, 8, 'A Cloud in the Warp', 'Navigator Powers', 'Mask yourself from observations through powers.'),
  simpleStub(102, 'pax', 191, 10, 'Foreshadowing', 'Navigator Powers', 'Make a Narrative declaration for free within the next round.'),
  simpleStub(103, 'pax', 191, 10, 'Gaze into the Warp', 'Navigator Powers', 'Probe suspects for taint of the warp.'),
  simpleStub(104, 'pax', 191, 8, 'Held in my Gaze', 'Navigator Powers', 'Prevent Movement and Ruin Powers of the subject.'),
  simpleStub(105, 'pax', 192, 10, 'Inertia', 'Navigator Powers', 'Increase the DN for an targeted Psyker to manifest powers.'),
  simpleStub(106, 'pax', 192, 0, 'The Lidless Stare', 'Navigator Powers', 'Deal a Mortal Wound and cause Terror.'),
  simpleStub(107, 'pax', 193, 6, 'Temporal Distortion', 'Navigator Powers', 'Allow yourself to make an additional Move.'),
];

const psychicPowersRepository = [
  ...paxNavigatorPowers,
];

module.exports = psychicPowersRepository;
