const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
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

const simpleStub = function(sourceKey, sourcePage, name, hint, bp, tier) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebabToCamel(sourceKey+' '+name)}`,
    name: name,
    hint: hint,
    cost: bp,
    tier: tier,
  };
};


const ascensionRepository = [
  simpleStub('core', 86, 'Human', 'The Humble Human', 0, 1),
  simpleStub('core', 88, 'Ork', 'The Savage Brute', 10, 1),
  simpleStub('core', 90, 'Eldar', 'The Mysterious Aeldari', 10, 1),
  simpleStub('core', 92, 'Adeptus Astartes', 'The Sword of Mankind', 50, 2),
  simpleStub('core', 98, 'Primaris Astartes', 'The newborn Breed', 100, 2),
  simpleStub('core', '', 'Ratling', 'Half-man by name, but not by nature', 10, 1),
  simpleStub('core', '', 'Ogryn', 'The brutal, eeh... human?', 10, 1),
  simpleStub('heva', 6, 'Dark Eldar', 'From the shadows, from the Dark City', 20, 1),
  simpleStub('lotn', 3, 'Necron', 'Living metal form the deepest slumber', 60, 3),
  simpleStub('aaoa', 10, 'Death World Origin', 'Humans from the deadly worlds', 10, 1),
  simpleStub('aaoa', 10, 'Hive World Origin', 'Humans from the overcrowded cities', 10, 1),
  simpleStub('aaoa', 10, 'Voidborn Origin', 'Humans form the void of space', 10, 1),
  simpleStub('aaoa', 11, 'Forge World Origin', 'Humans form the mechanical grindhouse', 10, 1),
  simpleStub('aaoa', 11, 'Scholar Progenium Origin', 'Humans form the nobel orphanage', 25, 1),
  simpleStub('aaoa', 11, 'Shrine World Origin', 'Humans form the cradle of the imperial creed', 10, 1),
  simpleStub('aaoa', 16, 'Pharia', 'The blank, the untouched, the hated', 30, 2),
  simpleStub('aaoa', 17, 'Squat', 'Abhuman and dwarfish underground variant', 15, 1),
  simpleStub('aaoa', 18, 'Beastman', 'Touched by fate... eeh chaos.', 20, 1),
  simpleStub('pax', 13, 'Beastman', 'Beastly touch of unknown origin', 10, 1),
  simpleStub('pax', 14, 'Navigator', 'Blessed with the third eye', 50, 1),
  simpleStub('pax', 18, 'Untouchable', 'The soulless', 20, 1),

];

module.exports = ascensionRepository;

