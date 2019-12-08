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

const kebabToCamel = function (slug) {
  return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

const stringToKebabToCamel = function (text) {
  const slug = stringToKebab(text);
  return kebabToCamel(slug);
};

const simpleStub = function (sourceKey, sourcePage, name, hint) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebabToCamel(`${sourceKey} ${name}`)}`,
    name,
    hint,
  };
};


const ascensionRepository = [
  simpleStub('aotgt', 4, 'Rosette in Hand', 'Join the Inquisition and brag with new gear.'),
  simpleStub('aaoa', 77, 'Agent of the Inquisition', 'Join the Inquisition (that was unexpected).'),
  simpleStub('aaoa', 77, 'Apocryphon Oath', 'The Deathwatch have requested your service.'),
  simpleStub('aaoa', 78, 'Betrayal', 'Missing the Chaos keyword? Wait no more! Also; Corruption...'),
  simpleStub('aaoa', 78, 'Crux Terminatus', '"May I request a Terminator Armour, please?"'),
  simpleStub('aaoa', 79, 'The Rubicon Primaris', 'Pick an Astartes and cross the rubicon to show those trueborn Primaris who\'s boss.'),
  simpleStub('aaoa', 80, 'Lost upon the Path of the Warrior', 'Gain some fancy Exarch gear but not everyone is pleased. '),
  simpleStub('aaoa', 80, 'Lost upon the Seer Path', 'A prophet for the Aeldari, but lost on this course.'),
  simpleStub('aaoa', 81, 'Possession', 'Invited a deamon (knock, knock) into yourself, boosting stats and corruption.'),
  simpleStub('goen', 9, 'The Titan walks', 'Gain a ship, but it can\'t fly, has feet and is a Titan and not a ship.'),
  simpleStub('tog', 14, 'Veteran of the Long War', 'You have a burning Hatred for (well, against) the Imperium.'),
  simpleStub('tog', 14, 'Traitor', 'It\'s like Stay the Course, but with Chaos Keywords.'),
  simpleStub('tog', 15, 'Deamon Prince', 'Become a Deamon Prince!'),
  simpleStub('thaot', 25, 'Chosen by the Omnissiah', 'Damaged, broken, repaired, enlisted, welcome on Mars.'),
  simpleStub('sotah', 2, 'To Hunt the Alien', 'Join the Deathwatch, gain neat Ammunition.'),
  simpleStub('sotah', 3, 'Unnumbered Sons', 'Aaah, the Grayshields. Wait, what?'),
  simpleStub('ltgb', 3, 'Forsake Your Chains', 'Leave the Imperium (Keyword) behind and join the Chaos or it\'s various factions.'),
];

module.exports = ascensionRepository;
