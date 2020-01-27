// TODO
// Astra Militarum

const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
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
  amb: {
    book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew',
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

const simpleStub = function (sourceKey, sourcePage, species, group, name, bp, tier) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost: bp,
    tier,
    group,
    species: [ species ],
    speciesKey: [ species ],
    stub: true,
  };
};

const core = [
  // Adeptus Ministorum
  {
    source: { ...source.core },
    name: 'Ministorum Priest',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum',
    abilities: [
      {
        name: 'Fiery Invective',
        effect: 'Once per combat, the Ministorum priest may take '
        + 'a free action to preach the Imperial Creed. The character and all his allies '
        + 'with the Imperium Keyword within hearing range heal 1d3 + Rank Shock.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    group: 'Adeptus Ministorum',
    key: 'core-ministorum-priest',
    description: null,
    hint: 'A zealous preacher of the Imperial Creed.',
  },
  {
    source: { ...source.core },
    name: 'Death Cult Assassin',
    cost: 20,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Ministorum',
    abilities: [
      {
        name: 'Glancing Blow',
        effect: 'Death Cult Assassins depend upon their movement to '
        + 'avoid harm. Unless they are immobilised or restrained, they may attempt to soak '
        + 'Mortal Wounds, and may substitute their Agility for their Soak when doing so.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    group: 'Adeptus Ministorum',
    key: 'core-death-cult-assassin',
    description: null,
    hint: 'An agile killer, expressing worship through the art of death.',
  },
  {
    source: { ...source.core },
    name: 'Crusader',
    cost: 40,
    tier: 3,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum',
    abilities: [
      {
        name: 'Armour of Faith',
        effect: 'Crusaders rely upon their faith to carry them '
        + 'through; they increase their Resolve by ½ Rank. Crusaders gain +Rank bonus '
        + 'dice to melee attacks against any opponent with the Heretic or Chaos keywords.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'initiative', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    group: 'Adeptus Ministorum',
    key: 'core-Crusader',
    description: null,
    hint: 'A holy warrior with unfl agging devotion to the God-Emperor.',
  },
  // Adepta Sororitas
  {
    source: { ...source.core },
    name: 'Sister Hospitaller',
    key: 'core-sister-hospitaller',
    hint: 'A pious healer dedicated to care of both body and soul.',
    group: 'Adepta Sororitas',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    keywordOption: '<Order>',
    abilities: [
      {
        name: 'Loyal Compassion',
        effect: 'A Sister Hospitaller adds +Rank on Medicae tests when treating characters '
        + 'with the Imperium Keyword',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'medicae', threshold: 1 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    description: null,
  },
  {
    source: { ...source.core },
    name: 'Sister of Battle',
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    cost: 40,
    tier: 2,
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    abilities: [
      {
        name: 'Purity of Faith',
        effect: 'Sisters of Battle and any allies within 15 '
        + 'meters and line of sight add +Rank to Corruption Tests. Sisters of Battle gain '
        + '+Rank to any dice pool to resist psychic powers and effects.',
      },
    ],
    keywordOption: '<Order>',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    group: 'Adepta Sororitas',
    key: 'core-sister-of-battle',
    description: 'As the militant arm of the of the Adeptus Ministorum, the Sisters of Battle are equipped to engage any who would dare to oppose the Imperial Creed. It is their sacred duty to cleanse the galaxy of heresy and corruption, wherever they should fi nd it, including within the various organisations of the Imperium of Man. Due to their shared goals, the Orders Militant often work in conjunction with the Imperial Inquisition, though they remain distinct organisations. Many of the orders maintain convents on Shrine Worlds, so that they can more easily defend those places most blessed to the Imperial Creed.',
    hint: 'A determined warrior, filled with purity and faith.',
  },
  // Adeptus Militarum
  {
    source: { ...source.core },
    name: 'Imperial Guardsman',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Astra Militarum,<Regiment>',
    abilities: [
      {
        name: 'Look Out Sir',
        effect: 'Once per battle, an Imperial Guardsman may suffer '
        + 'the effects of an attack that hits an ally instead of the allied character. '
        + 'When doing so, increase the Guardsman’s resilience by +Rank for determining the '
        + 'damage of the attack.',
      },
    ],
    keywordOption: '<Regiment>',
    prerequisites: [
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
    ],
    group: 'Astra Militarum',
    key: 'core-imperial-guardsman',
    description: null,
    hint: 'A disciplined soldier, used to fighting amid multitudes',
  },
  {
    source: { ...source.core },
    name: 'Tempestus Scion',
    cost: 30,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Astra Militarum,Militarum Tempest',
    abilities: [
      {
        name: 'Elite Soldier',
        effect: 'After spending one or more Glory to increase '
        + 'damage from a successful attack using a weapon with the Imperium and Astra '
        + 'Militarum keywords, a Tempestus Scion may add +Rank to the fi nal damage value.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'initiative', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 2 },
    ],
    group: 'Astra Militarum',
    key: 'core-tempestus-scion',
    description: null,
    hint: 'An elite, highly-trained soldier, used to undertaking special missions.',
  },
  {
    source: { ...source.core },
    name: 'Commissar',
    cost: 50,
    tier: 3,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 3,
    keywords: 'Imperium,Astra Militarum,Officio Prefectus',
    abilities: [
      {
        name: 'Fearsome Respect',
        effect: 'Commissars and any allies within 15 metres and '
        + 'line of sight add +Rank to Resolve tests. A commissar adds +Rank to '
        + 'Intimidation tests, including Interaction attacks.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    group: 'Astra Militarum',
    key: 'core-commissar',
    description: null,
    hint: 'A fearsome leader, inspiring both dread and respect in great measure.',
  },
  // Agents of the Imperium
  {
    source: { ...source.core },
    name: 'Inquisitorial Acolyte',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Inquisition,<ANY>,<Ordo>',
    abilities: [
      {
        name: 'Inquisitorial Decree',
        effect: 'Once per scene, an Inquisitorial Acolyte '
        + 'may invoke the name of their Inquisitor to gain +Rank to an Influence or '
        + 'Interaction Skill test involving a being with the Imperium keyword.',
      },
    ],
    keywordOption: '<Ordo>',
    skills: 'Any (2)',
    prerequisites: [],
    /* prerequisites: [
      { group: 'skills', value: '<Any>', threshold: 2, },
    ], */
    group: 'Agents of the Imperium',
    key: 'core-inquisitorial-acolyte',
    description: null,
    hint: 'A representative of the Inquisition, adaptable and possessing great potential.',
  },
  {
    source: { ...source.core },
    name: 'Inquisitorial Adept',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Inquisition,<Ordo>',
    abilities: [
      {
        name: 'Administratum Records',
        effect: 'he character is particularly adept at '
        + 'navigating Imperial Bureaucracy. Add +Rank to Influence and Investigation tests '
        + 'to acquire information.',
      },
    ],
    keywordOption: '<Ordo>',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 2 },
    ],
    group: 'Agents of the Imperium',
    key: 'core-inquisitorial-adept',
    description: null,
    hint: 'A learned scholar and scribe, adept at navigating bureaucratic obstacles.',
  },
  {
    source: { ...source.core },
    name: 'Rogue Trader',
    cost: 40,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Rogue Trader,<Dynasty>',
    keywordOption: '<Dynasty>',
    abilities: [
      {
        name: 'Warrant of Trade',
        effect: 'Rogue Traders are masters at manipulating '
        + 'situations to their advantage. They receive +Rank to all Persuasion tests and '
        + 'Influence tests to acquire goods or services.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'cunning', threshold: 1 },
      { group: 'skills', value: 'insight', threshold: 2 },
      { group: 'skills', value: 'persuasion', threshold: 2 },
      { group: 'skills', value: 'awareness', threshold: 1 },
    ],
    group: 'Agents of the Imperium',
    key: 'core-rogue-trader',
    description: null,
    hint: 'An adventuresome and infl uential explorer with their own space vessel.',
  },
  {
    source: { ...source.core },
    name: 'Sanctioned Psyker',
    cost: 50,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Astra Telepathica,Psyker,Scholastica Psykana',
    abilities: [
      {
        name: 'Psyker',
        effect: 'A Sanctioned Psyker begins play with one minor psychic '
        + 'power and the smite psychic power. They may purchase additional Minor Psychic '
        + 'Powers and Universal Psychic powers, subject to Tier restrictions.',
      },
    ],
    psychicPowers: {
      discount: [
        {
          name: 'smite', selected: 'Smite', query: { discipline: 'Universal' }, filter: (power) => (power.name === 'Smite'),
        },
        {
          name: 'minor', selected: undefined, query: { discipline: 'Minor' }, filter: (power) => (['Minor'].includes(power.discipline)),
        },
      ],
      access: [
        'Minor',
        'Biomancy',
        'Divination',
        'Pyromancy',
        'Telekinesis',
        'Telepathy',
        'Universal',
      ],
    },
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
    ],
    group: 'Agents of the Imperium',
    key: 'core-sanctioned-psyker',
    description: null,
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
  },
  {
    source: { ...source.core },
    name: 'Inquisitor',
    cost: 70,
    tier: 4,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 4,
    keywords: 'Imperium,Inquisition,<Any>,<Ordo>',
    abilities: [
      {
        name: 'Unchecked Authority',
        effect: 'Inquisitors have supreme authority for '
        + 'maintaining the security of the Imperium. They gain +Rank to all Influence and '
        + 'Interaction skill tests involving characters with the Imperium Keyword.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'cunning', threshold: 2 },
      { group: 'skills', value: 'insight', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
      { group: 'skills', value: 'awareness', threshold: 2 },
    ],
    group: 'Agents of the Imperium',
    key: 'core-inquisitor',
    description: null,
    hint: 'A bearer of profound Imperial authority, adept at discovering the truth in the shadows.',
  },
  // Adeptus Astartes
  {
    source: { ...source.core },
    name: 'Space Marine Scout',
    key: 'core-space-marine-scout',
    species: ['Aceptus Astartes (Core)'],
    speciesKey: ['core-adeptus-astartes'],
    hint: 'A stealthy warrior adept at reconnaissance.',
    group: 'Adeptus Astartes',
    cost: 20,
    tier: 2,
    influence: 1,
    keywords: 'Imperium,Adeptus Astartes,<Chapter>',
    keywordOption: '<Chapter>',
    abilities: [
      {
        name: 'Use the Terrain',
        effect: 'Space Marine Scouts receive +Rank to all Stealth '
        + 'tests if they are in cover.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    description: null,
  },
  {
    source: { ...source.core },
    name: 'Tactical Space Marine',
    species: ['Aceptus Astartes (Core)'],
    speciesKey: ['core-adeptus-astartes'],
    cost: 50,
    tier: 3,
    influence: 2,
    keywords: 'Imperium,Adeptus Astartes,<Chapter>',
    keywordOption: '<Chapter>',
    abilities: [
      { name: 'Tactical Versatility', effect: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).' },
    ],
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    group: 'Adeptus Astartes',
    key: 'core-tactical-space-marine',
    description: null,
    hint: 'A versatile warrior, veteran of a hundred battles.',
  },
  {
    source: { ...source.core },
    name: 'Primaris Intercessor',
    key: 'core-primaris-intercessor',
    hint: 'A skilled and focused warrior, adept at bringing death at range.',
    group: 'Adeptus Astartes',
    cost: 60,
    tier: 4,
    species: ['Primaris Astartes (Core)'],
    speciesKey: ['core-primaris-astartes'],
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
    ],
    influence: 1,
    keywords: 'Imperium, Adeptus Astartes, Primaris, <Chapter>',
    keywordOption: '<Chapter>',
    abilities: [
      { name: 'Intercessor Focus', effect: 'When firing a bolt rifle or heavy bolt pistol they gain +Rank bonus to attack rolls.' },
    ],
    description: '',
  },
  // Adeptus Mechanicus
  {
    source: { ...source.core },
    name: 'Skitarius',
    cost: 40,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Mechanicus,Skitarii,<Forge World>',
    abilities: [
      {
        name: 'Heavily Augmented',
        effect: 'The Skitarius’ body is designed to withstand '
        + 'the rigours of war. Skitarii do not bleed and gain +½ Rank to Soak tests.',
      },
    ],
    keywordOption: '<Forge World>',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'tech', threshold: 1 },
    ],
    group: 'Adeptus Mechanicus',
    key: 'core-skitarius',
    description: null,
    hint: 'A warrior of the Machine Cult, sturdy and reliable.',
  },
  {
    source: { ...source.core },
    name: 'Tech-Priest',
    cost: 60,
    tier: 3,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,<Forge World>',
    keywordOption: '<Forge World>',
    abilities: [
      {
        name: 'Rite of Repair',
        effect: 'Tech-Priests automatically reduce the time by '
        + 'half for any Tech test. They receive +Rank on Tech tests to fix or repair a '
        + 'damaged machine.',
      },
    ],
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    group: 'Adeptus Mechanicus',
    key: 'core-tech-priest',
    description: null,
    hint: 'A priest of the Omnissiah, able to commune with the machine-spirits.',
  },
  // Scum
  {
    source: { ...source.core },
    name: 'Ganger',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Scum,<ANY>',
    keywordOption: '<Any>',
    abilities: [
      {
        name: 'Scrounger',
        effect: 'Gangers make use of every available resource, and '
        + 'have a knack for „fi nding“ spares. They receive +Rank to Cunning tests, and '
        + 'may make a single retroactive Infl uence test with a bonus of +Rank once per '
        + 'session, representing an item that they had prepared in advance.',
      },
    ],
    prerequisites: [
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    group: 'Scum',
    key: 'core-ganger',
    description: null,
    hint: 'A resourceful and tenacious survivor from the depths of enormous industrial cities.',
  },
  {
    source: { ...source.core },
    name: 'Scavvy',
    cost: 10,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: -1,
    abilities: [
      {
        name: 'Mutant',
        effect: 'The Scavvy may select one mutation (see Scavvy Mutations, '
        + 'page 368). Every time the Scavvy gains a Rank, they may select an additional '
        + 'mutation from that list.',
      },
    ],
    keywords: 'Scum,<Any>',
    keywordOption: '<Any>',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 1 },
    ],
    group: 'Scum',
    key: 'core-scavvy',
    description: null,
    hint: 'A mutant—cast out and reviled—yet their mutations give them power.',
  },
  {
    source: { ...source.core },
    name: 'Desperado',
    cost: 30,
    tier: 3,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    abilities: [
      {
        name: 'Valuable Prey',
        effect: 'Desperados receive +Rank for Cunning tests. They '
        + 'also receive +Rank to Awareness tests when tracking a target.',
      },
    ],
    keywords: 'Scum,<Any>',
    keywordOptions: '<Any>',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'skills', value: 'awareness', threshold: 2 },
      { group: 'skills', value: 'cunning', threshold: 2 },
      { group: 'skills', value: 'investigation', threshold: 2 },
    ],
    group: 'Scum',
    key: 'core-desperado',
    description: null,
    hint: 'A savvy and dangerous bounty hunter, mercenary, and gun for hire.',
  },
  // Renegades
  {
    source: { ...source.core },
    name: 'Cultist',
    cost: 0,
    tier: 1,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Any>',
    abilities: [
      {
        name: 'From Within',
        effect: 'Cultists gain +Rank to Deception tests, including '
        + 'Interaction attacks, against targets with the Imperium keyword.',
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modification: 1 },
    ],
    prerequisites: [
      { group: 'skills', value: 'deception', threshold: 1 },
    ],
    group: 'Renegades',
    key: 'core-cultist',
    description: null,
    hint: 'A disciple of the Ruinous Powers, eager to gain their capricious favour.',
  },
  {
    source: { ...source.core },
    name: 'Chaos Space Marine',
    cost: 50,
    tier: 3,
    species: ['Aceptus Astartes (Core)'],
    speciesKey: ['core-adeptus-astartes'],
    influence: 2,
    keywords: 'Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Legion>',
    abilities: [
      { name: 'Tactical Versatility', effect: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).' },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
    ],
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    group: 'Renegades',
    key: 'core-chaos-space-marine',
    description: null,
    hint: 'A renegade warrior and death-dealer, a dark refl ection of their noble brethren.',
  },
  {
    source: { ...source.core },
    name: 'Heretek',
    cost: 60,
    tier: 2,
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Chaos,Heretic,Adeptus Mechanicus,Dark Mechanicus',
    abilities: [
      {
        name: 'Transformative Technology',
        effect: 'Hereteks automatically reduce the time '
        + 'by half for any Tech test. They also gain +Rank for Tech interaction attacks.',
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
    ],
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    group: 'Renegades',
    key: 'core-heretek',
    description: null,
    hint: 'A tinkerer, corruptor of machine-spirits, a bearer of the sin of innovation.',
  },
  {
    source: { ...source.core },
    name: 'Rogue Psyker',
    key: 'core-rogue-psyker',
    group: 'Renegades',
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    cost: 50,
    tier: 2,
    abilities: [
      {
        name: 'Psyker',
        effect: 'A rogue psyker begins play with one Minor Psychic Power, the '
        + 'Smite Power and may purchase additional Minor Psychic Powers, Universal Psychic '
        + 'Powers and Maleficarum Psychic Powers subject to Tier restrictions.',
      },
    ],
    psychicPowers: {
      discount: [
        {
          name: 'smite', selected: 'Smite', query: { discipline: 'Universal' }, filter: (power) => (power.name === 'Smite'),
        },
        {
          name: 'minor', selected: undefined, query: { discipline: 'Minor' }, filter: (power) => (['Minor'].includes(power.discipline)),
        },
      ],
      access: [
        'Minor',
        'Biomancy',
        'Divination',
        'Pyromancy',
        'Telekinesis',
        'Telepathy',
        'Maleficarum',
        'Universal',
      ],
    },
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
    ],
    influence: 0,
    keywords: 'Chaos,Heretic,Psyker',
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
    ],
    description: null,
    hint: 'An unsanctioned bearer of psychic powers, wielding the warp’s power without discipline.',
  },
  // Aeldari
  {
    source: { ...source.core },
    name: 'Corsair',
    cost: 0,
    tier: 1,
    species: ['Eldar (Core)'],
    speciesKey: ['core-eldar'],
    influence: 0,
    keywords: 'Aeldari,Anhrathe,<Coterie>',
    abilities: [
      {
        name: 'Dancing the Blade\'s Edge',
        effect: 'Choose one of the following Interaction '
        + 'Attacks: Athletics or Persuasion. Corsairs get +Rank to the chosen Interaction '
        + 'Attack and get the same bonus for resisting those same attacks. Corsairs suffer '
        + 'a +1DN penalty to any Fear test.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 2 },
    ],
    group: 'Aeldari',
    key: 'core-corsair',
    description: null,
    hint: 'A space-faring pirate of an ancient race.',
  },
  {
    source: { ...source.core },
    name: 'Ranger',
    cost: 30,
    tier: 2,
    species: ['Eldar (Core)'],
    speciesKey: ['core-eldar'],
    influence: 0,
    keywords: 'Aeldari,Asuryani,<Craftworld>',
    abilities: [
      {
        name: 'From the Shadows',
        effect: 'Rangers are adept at exploiting any concealment. '
        + 'Any penalties to detect (using Awareness) or attack a ranger due to lighting or '
        + 'cover are increased by +½ Rank.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'stealth', threshold: 1 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    group: 'Aeldari',
    key: 'core-ranger',
    description: null,
    hint: 'A wanderer, a scout, and tracker for the good of their people.',
  },
  {
    source: { ...source.core },
    name: 'Warlock',
    cost: 80,
    tier: 3,
    species: ['Eldar (Core)'],
    speciesKey: ['core-eldar'],
    influence: 2,
    keywords: 'Aeldari,Asuryani,Psyker,<Craftworld>',
    abilities: [
      {
        name: 'Runes of Battle',
        effect: 'A Warlock begins play with the Psyniscience and '
        + 'smite psychic powers (these do not count towards the maximum), and may purchase '
        + 'additional Minor Psychic Powers, Universal Psychic Powers, and Runes of Battle '
        + 'Psychic Powers, subject to Tier restrictions.',
      },
    ],
    psychicPowers: {
      discount: [
        { name: 'psyniscience', selected: 'Psyniscience', filter: (power) => (power.name === 'Psyniscience') },
        { name: 'smite', selected: 'Smite', filter: (power) => (power.name === 'Smite') },
      ],
      access: [
        'Minor',
        'Biomancy',
        'Divination',
        'Pyromancy',
        'Telekinesis',
        'Telepathy',
        'Universal',
        'Runes of Battle',
      ],
    },
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
    ],
    group: 'Aeldari',
    key: 'core-warlock',
    description: null,
    hint: 'A powerful psyker, wielding strictly-guided powers for the Aeldari cause.',
  },
  // Orks
  {
    source: { ...source.core },
    name: 'Boy',
    cost: 0,
    tier: 1,
    species: ['Ork (Core)'],
    speciesKey: ['core-ork'],
    influence: 0,
    keywords: 'Ork,<Clan>',
    abilities: [
      {
        name: 'Get Stuck In',
        effect: 'A Boy gains +Rank to melee attacks for every ally '
        + 'engaged in melee combat with the same target.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    group: 'Orks',
    key: 'core-boy',
    description: null,
    hint: 'A brutish warrior and thug who believes that might makes right.',
  },
  {
    source: { ...source.core },
    name: 'Kommando',
    cost: 30,
    tier: 2,
    species: ['Ork (Core)'],
    speciesKey: ['core-ork'],
    influence: 0,
    keywords: 'Ork,<Clan>',
    abilities: [
      {
        name: 'Kunnin\' Plan',
        effect: 'A Kommando and any allies with the Ork Keyword '
        + 'within 15 metres gain +½ Rank to Stealth tests.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'attributes', value: 'toughness', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 1 },
    ],
    group: 'Orks',
    key: 'core-kommando',
    description: null,
    hint: 'A stealthy and cunning warrior who knows how to turn almost any battle to his advantage.',
  },
  {
    source: { ...source.core },
    name: 'Nob',
    cost: 60,
    tier: 3,
    species: ['Ork (Core)'],
    speciesKey: ['core-ork'],
    influence: 2,
    keywords: 'Ork,<Clan>',
    abilities: [
      {
        name: 'Boys',
        effect: 'A Nob commands a mob of Troops numbering up to Rank x 3 Boyz '
        + 'who loyally follow his direction. These Ork Boyz use the profi le found on page '
        + '150.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    group: 'Orks',
    key: 'core-nob',
    description: null,
    hint: 'A savage warrior and capable leader, using brute force to succeed where others fail.',
  },
];

const dodScumPsyker = [
  {
    name: 'Scum Psyker',
    cost: 50,
    tier: 2,
    source: {
      book: 'Doctors of Doom Compendium',
      key: 'dodc',
      version: '',
      path: '',
    },
    species: ['Human (Core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Scum,Psyker',
    abilities: [
      {
        name: 'Psyker',
        effect: 'A Scum Psyker begins play with one minor psychic '
        + 'power and the smite psychic power. They may purchase additional Minor Psychic '
        + 'Powers and Universal Psychic powers, subject to Tier restrictions.',
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    group: 'Scum',
    key: 'core-scum-psyker',
    description: null,
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
  },
];

const aotgtRep = [
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Callidus Assassin', 70, 4),
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Culexus Assassin', 75, 4),
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Vindicare Assassin', 80, 4),
  simpleStub('aotgt', '', 'core-adeptus-astartes', 'Agents of the Imperium', 'Grey Knight', 90, 4),
];

const aaoaRep = [
  simpleStub('aaoa', 22, 'core-human', 'Adeptus Ministorum', 'Frateris Militia', 0, 1),
  simpleStub('aaoa', 22, 'core-human', 'Adeptus Ministorum', 'Confessor', 40, 3),
  simpleStub('aaoa', 23, 'core-human', 'Adepta Sororitas', 'Sister Dialogous', 0, 1),
  simpleStub('aaoa', 23, 'core-human', 'Adepta Sororitas', 'Sister Famulous', 10, 1),
  simpleStub('aaoa', 24, 'core-human', 'Adepta Sororitas', 'Sister Seraphim', 55, 3),
  simpleStub('aaoa', 24, 'core-human', 'Adepta Sororitas', 'Sister Repentia', 40, 2),
  simpleStub('aaoa', 25, 'core-human', 'Astra Militarum', 'Imperial Guard Medic', 0, 1),
  simpleStub('aaoa', 25, 'core-human', 'Astra Militarum', 'Imperial Guard Officer', 15, 1),
  simpleStub('aaoa', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Assault Space Marine', 60, 3),
  simpleStub('aaoa', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Devastator Space Marine', 60, 3),
  simpleStub('aaoa', 27, 'core-adeptus-astartes', 'Adeptus Astartes', 'Grey Knight', 70, 3),
  simpleStub('aaoa', 27, 'core-primaris-astartes', 'core-adeptus-astartes', 'Primaris Marine Hellblaster', 70, 4),
  simpleStub('aaoa', 28, 'core-primaris-astartes', 'core-adeptus-astartes', 'Primaris Marine Inceptor', 80, 4),
  simpleStub('aaoa', 28, 'core-primaris-astartes', 'core-adeptus-astartes', 'Primaris Marine Reiver', 50, 4),
  simpleStub('aaoa', 29, 'core-primaris-astartes', 'core-adeptus-astartes', 'Primaris Marine Aggressor', 80, 4),
  simpleStub('aaoa', 29, 'core-adeptus-astartes', 'Adeptus Astartes', 'Librarian', 90, 4),
  simpleStub('aaoa', 30, 'core-adeptus-astartes', 'Adeptus Astartes', 'Apothecary', 60, 3),
  simpleStub('aaoa', 30, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarine', 60, 3),
  simpleStub('aaoa', 31, 'core-adeptus-astartes', 'Adeptus Astartes', 'Chaplain', 60, 4),
  simpleStub('aaoa', 32, 'core-human', 'Agents of the Imperium', 'Astropath', 60, 2),
  simpleStub('aaoa', 33, 'core-human', 'Agents of the Imperium', 'Sister of Silence', 40, 3),
  simpleStub('aaoa', 33, 'core-human', 'Agents of the Imperium', 'Arbitrator', 30, 3),
  simpleStub('aaoa', 34, 'core-human', 'Agents of the Imperium', 'Eversor Assassin', 150, 5),
  simpleStub('aaoa', 34, 'core-human', 'Agents of the Imperium', 'Callidus Assassin', 150, 5),
  simpleStub('aaoa', 35, 'Pariah', 'Agents of the Imperium', 'Culexus Assassin', 150, 5),
  simpleStub('aaoa', 35, 'core-human', 'Agents of the Imperium', 'Vindicare Assassin', 150, 5),
  simpleStub('aaoa', 37, 'core-human', 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 40, 2),
  simpleStub('aaoa', 37, 'core-human', 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 40, 2),
  simpleStub('aaoa', 38, 'core-human', 'Adeptus Mechanicus', 'Skitarius Vanguard', 50, 2),
  simpleStub('aaoa', 38, 'core-human', 'Adeptus Mechanicus', 'Sicarian Infiltrator', 60, 3),
  simpleStub('aaoa', 39, 'core-human', 'Adeptus Mechanicus', 'Sicarian Ruststalker', 50, 3),
  simpleStub('aaoa', 39, 'core-human', 'Adeptus Mechanicus', 'Lexmechanic', 30, 2),
  simpleStub('aaoa', 40, 'core-human', 'Adeptus Mechanicus', 'Transmechanic', 30, 2),
  simpleStub('aaoa', 40, 'core-human', 'Adeptus Mechanicus', 'Magos', 80, 4),
  simpleStub('aaoa', 41, 'core-human', 'Adeptus Mechanicus', 'Genetor', 80, 4),
  simpleStub('aaoa', 41, 'core-human', 'Adeptus Mechanicus', 'Logis', 80, 4),
  simpleStub('aaoa', 42, 'core-human', 'Renegades', 'Chaos Space Marine', 50, 3),
  simpleStub('aaoa', 42, 'core-human', 'Renegades', 'Chaos Space Marine Raptor', 60, 3),
  simpleStub('aaoa', 43, 'core-adeptus-astartes', 'Renegades', 'Chaos Space Marine Havoc', 60, 3),
  simpleStub('aaoa', 43, 'core-adeptus-astartes', 'Renegades', 'Khorne Berzerker', 80, 3),
  simpleStub('aaoa', 44, 'core-adeptus-astartes', 'Renegades', 'Nurgle Plague Marine', 70, 3),
  simpleStub('aaoa', 44, 'core-adeptus-astartes', 'Renegades', 'Slaanesh Noise Marine', 60, 3),
  simpleStub('aaoa', 45, 'core-adeptus-astartes', 'Renegades', 'Sorcerer', 90, 4),
  simpleStub('aaoa', 45, 'core-adeptus-astartes', 'Renegades', 'Warpsmith', 60, 3),
  simpleStub('aaoa', 46, 'core-adeptus-astartes', 'Renegades', 'Dark Apostle', 60, 4),
  simpleStub('aaoa', 46, 'Beastman', 'Renegades', 'Khorngor', 20, 1),
  simpleStub('aaoa', 47, 'Beastman', 'Renegades', 'Pestigor', 20, 1),
  simpleStub('aaoa', 47, 'Beastman', 'Renegades', 'Slaangor', 20, 1),
  simpleStub('aaoa', 48, 'Beastman', 'Renegades', 'Tzaangor', 20, 1),
  simpleStub('aaoa', 49, 'Eldar', 'Aeldari', 'Guardian', 0, 1),
  simpleStub('aaoa', 49, 'Eldar', 'Aeldari', 'Dire Avenger', 50, 3),
  simpleStub('aaoa', 50, 'Eldar', 'Aeldari', 'Dark Reaper', 70, 3),
  simpleStub('aaoa', 50, 'Eldar', 'Aeldari', 'Fire Dragon', 60, 3),
  simpleStub('aaoa', 51, 'Eldar', 'Aeldari', 'Howling Banshee', 60, 3),
  simpleStub('aaoa', 51, 'Eldar', 'Aeldari', 'Shining Spear', 90, 3),
  simpleStub('aaoa', 52, 'Eldar', 'Aeldari', 'Striking Scorpion', 60, 3),
  simpleStub('aaoa', 52, 'Eldar', 'Aeldari', 'Swooping Hawk', 60, 3),
  simpleStub('aaoa', 53, 'Eldar', 'Aeldari', 'Warp Spider', 80, 3),
  simpleStub('aaoa', 53, 'Eldar', 'Aeldari', 'Bonesinger', 50, 2),
  simpleStub('aaoa', 54, 'Eldar', 'Aeldari', 'Kabalite Warrior', 0, 1),
  simpleStub('aaoa', 54, 'Eldar', 'Aeldari', 'Wych', 15, 1),
  simpleStub('aaoa', 55, 'Eldar', 'Aeldari', 'Harlequin Player', 100, 4),
  simpleStub('aaoa', 55, 'Eldar', 'Aeldari', 'Harlequin Troupe Master', 150, 5),
  simpleStub('aaoa', 56, 'Eldar', 'Aeldari', 'Harlequin Shadowseer', 150, 5),
  simpleStub('aaoa', 56, 'Eldar', 'Aeldari', 'Harlequin Death Jester', 150, 5),
  simpleStub('aaoa', 57, 'Eldar', 'Aeldari', 'Harlequin Solitaire', 150, 5),
  simpleStub('aaoa', 58, 'Ork', 'Orks', 'Mekboy', 30, 2),
  simpleStub('aaoa', 58, 'Ork', 'Orks', 'Painboy', 30, 2),
  simpleStub('aaoa', 59, 'Ork', 'Orks', 'Burna Boy', 30, 2),
  simpleStub('aaoa', 59, 'Ork', 'Orks', 'Flash Git', 60, 3),
  simpleStub('aaoa', 60, 'Ork', 'Orks', 'Tankbusta', 30, 2),
  simpleStub('aaoa', 60, 'Ork', 'Orks', 'Runtherd', 30, 2),
  simpleStub('aaoa', 61, 'Ork', 'Orks', 'Weirdboy', 60, 3),
  simpleStub('aaoa', 63, 'Squat', 'Squats', 'War-Pledged Warrior', 0, 1),
  simpleStub('aaoa', 63, 'Squat', 'Squats', 'Guild Engineer', 60, 3),
  simpleStub('aaoa', 64, 'Squat', 'Squats', 'Hearthguard', 60, 3),
  simpleStub('aaoa', 64, 'Squat', 'Squats', 'Ancestor Lord', 100, 4),
];

const ltgbRep = [
  simpleStub('ltgb', '9', 'core-human', 'Renegades', 'Apostate', 0, 1),
  simpleStub('ltgb', '10', 'core-human', 'Renegades', 'Cultist', 0, 1),
  simpleStub('ltgb', '11', 'core-human', 'Renegades', 'Renegade', 0, 1),
  simpleStub('ltgb', '11', 'core-human', 'Renegades', 'Heretek', 60, 2),
  simpleStub('ltgb', '12', 'core-human', 'Renegades', 'Rogue Psyker', 50, 2),
  simpleStub('ltgb', '12', 'core-human', 'Renegades', 'Rogue Psyker', 50, 2),
  simpleStub('ltgb', '13', 'core-human', 'Renegades', 'Pirate', 40, 2),
  simpleStub('ltgb', '13', 'core-adeptus-astartes', 'Renegades', 'Legionnaire', 50, 3),
  simpleStub('ltgb', '14', 'core-adeptus-astartes', 'Renegades', 'Havoc', 60, 3),
  simpleStub('ltgb', '15', 'core-adeptus-astartes', 'Renegades', 'Raptor', 55, 3),
  simpleStub('ltgb', '15', 'core-adeptus-astartes', 'Renegades', 'Warpsmith', 85, 3),
  simpleStub('ltgb', '16', 'core-adeptus-astartes', 'Renegades', 'Sorcerer', 80, 3),
  simpleStub('ltgb', '17', 'core-adeptus-astartes', 'Renegades', 'Noise Marine', 55, 3),
  simpleStub('ltgb', '17', 'core-adeptus-astartes', 'Renegades', 'Plague Marine', 60, 3),
  simpleStub('ltgb', '18', 'core-adeptus-astartes', 'Renegades', 'Khorne Berzerker', 60, 3),
  simpleStub('ltgb', '19', 'core-adeptus-astartes', 'Renegades', 'Dark Apostle', 80, 4),
];

const teaRep = [
  simpleStub('tea', 22, 'core-adeptus-astartes', 'Adeptus Astartes', 'Devastator Space Marine', 60, 3),
  simpleStub('tea', 23, 'core-adeptus-astartes', 'Adeptus Astartes', 'Assault Space Marine', 55, 3),
  simpleStub('tea', 23, 'core-adeptus-astartes', 'Adeptus Astartes', 'Tactical Marine', 50, 3),
  simpleStub('tea', 24, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarine', 85, 3),
  simpleStub('tea', 25, 'core-adeptus-astartes', 'Adeptus Astartes', 'Apothecary', 70, 3),
  simpleStub('tea', 25, 'core-adeptus-astartes', 'Adeptus Astartes', 'Librarian', 80, 3),
  simpleStub('tea', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Chaplain', 85, 4),
  simpleStub('tea', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Intercessor', 60, 4),
  simpleStub('tea', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Hellblaster', 75, 4),
  simpleStub('tea', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Reiver', 60, 4),
  simpleStub('tea', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Inceptor', 80, 4),
  simpleStub('tea', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Aggressor', 80, 4),
  simpleStub('tea', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Apothecary', 80, 4),
  simpleStub('tea', 30, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Librarian', 90, 4),
  simpleStub('tea', 31, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Chaplain', 95, 5),
];

const hevaRep = [
  simpleStub('heva', 9, 'heva-dark-eldar', 'Aeldari', 'Kabalite', 0, 1),
  simpleStub('heva', 10, 'heva-dark-eldar', 'Aeldari', 'Wych', 30, 2),
  simpleStub('heva', 11, 'heva-dark-eldar', 'Aeldari', 'Scourge', 60, 3),
  simpleStub('heva', 12, 'heva-dark-eldar', 'Aeldari', 'Incubus', 70, 4),
];

const goenRep = [
  simpleStub('goen', 6, 'core-human', 'Adeptus Titanicus', 'Moderati', 40, 2),
  simpleStub('goen', 7, 'core-human', 'Adeptus Titanicus', 'Princeps', 70, 3),
  simpleStub('goen', 8, 'core-human', 'Adeptus Titanicus', 'Legate', 80, 4),
];

const togRep = [
  simpleStub('tog', 6, 'core-human', 'Renegades', 'Raider', 30, 2),
  simpleStub('tog', 6, 'core-human', 'Renegades', 'Champion', 50, 3),
  simpleStub('tog', 7, 'core-human', 'Renegades', 'Apostate', 50, 3),
  simpleStub('tog', 8, 'core-adeptus-astartes', 'Renegades', 'Plague Marine', 60, 3),
  simpleStub('tog', 8, 'core-adeptus-astartes', 'Renegades', 'Khorne Berserker', 60, 3),
  simpleStub('tog', 9, 'core-adeptus-astartes', 'Renegades', 'Chaos Sorcerer', 70, 3),
  simpleStub('tog', 9, 'core-adeptus-astartes', 'Renegades', 'Noise Marine', 60, 3),
];

const lotnRep = [
  simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Immortal', 60, 3),
  simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Deathmark', 65, 3),
  simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Destroyer', 85, 3),
  simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Lichguard', 70, 4),
  simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Triarch Praetorian', 70, 4),
  simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Lord', 80, 4),
  simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Cryptek', 75, 4),
  simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Destroyer Lord', 95, 4),
];

const paxRep = [
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Scribe', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Ordinate', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Sage', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Prefect', 40, 4),
  simpleStub('pax', '-', 'core-human', 'Adeptus Arbites', 'Arbitrator', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Arbites', 'Proctor', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Arbites', 'Marshal', 60, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Arbites', 'Judge', 80, 4),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Cleric', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Confessor', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Deacon', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Preacher', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Banisher', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Exorcist', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Missionary', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Saint', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Cardinal', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Crusader', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Heirophant', 50, 4),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropathicus Envoy', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Black Sentinel', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropath', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Choirmaster', 60, 3),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropath Transcendent', 70, 4),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Acquisitionist', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Guilder', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Chartist Captain', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Executioner', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Seneschal', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Servo-Master', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Tech-Thrall', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Merchant Magnate', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Noble Scion', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Politico', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Noble Lord', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Sprye Hunter', 60, 3),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Blooodsworn', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Bounty Hunter', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Freelancer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Oathsworn Bodyguard', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Veteran Guardsman', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Arch-Militant', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'ArchGunslinger', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Hive Hanger', 'Juve', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Hive Hanger', 'Ganger', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Hive Hanger', 'Heavy', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Hive Hanger', 'Gang Leader', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Scholar', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Artisan', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Chirurgeon', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Colonist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Enforcer', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Menial', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Planetary Defender', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Bonded Emissary', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Planetary Governor', 40, 4),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Charlatan', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Convert', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Cultist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Frateris Militia', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Penitent', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Crusader of Faith', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Cult Magus', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Death Cult Assassin', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Fanatic', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Redemptionist', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Demagoge', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Rating', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Voidsman-At-Arms', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Midshipman', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Junior Officer', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Warrant Officer', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Senior Officer', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Law-Wright', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Offense-Barker', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Magistrate', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Sentencing Lord', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Hive Twist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Mutant Outcast', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Twist Hulk', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Wyrd', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Ghilliam', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Psychic Abomination', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Scavvy', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Hullghast', 30, 3),
  {
    ...simpleStub('pax', 195, 'pax-navigator', 'Navis Nobility Houses', 'Navis Scion', 20, 1),
    stub: false,
    hint: 'A young navigator, groomed for diplomacy since birth.',
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'leadership', threshold: 2 },
      { group: 'skills', value: 'persuasion', threshold: 2 },
      { group: 'skills', value: 'deception', threshold: 2 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 1,
    abilities: [
      {
        name: 'Groomed from Birth',
        effect: 'Navis Scions begin play without an initial mutation. Additionally, they gain a +½ Rank bonus to Persuasion skill tests.',
      },
    ],
    // new
    wargearString: 'Staff, mesh armor, nobilite robes, charm (silk headscarf), flask of amasec',
    wargear: [
      { name: 'Staff' },
      { name: 'Mesh Armour' },
      { name: 'Nobilite Robes' }, // possession
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Flask of amasec' }, // possession
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Nobilite Emissary', 10, 1),
    stub: false,
    hint: 'A representative of the Navis Nobilite, empowered to enact the will of a houses Novators.',
    species: [ 'Human (Core)', 'Navigator (Pex)' ],
    speciesKey: [ 'core-human', 'pax-navigator' ],
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 1 },
      { group: 'skills', value: 'persuasion', threshold: 1 },
      { group: 'skills', value: 'deception', threshold: 1 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 1,
    abilities: [
      {
        name: 'House Operative',
        effect: 'A Nobilite Emissary gains +Rank to opposed skill tests to resist the effects of seduction and interrogation. In addition, the Nobilite Emissary character may utilize an interrogator’s questions and techniques to garner detailed information about the nature, aims, and motivations of the interrogator himself and those he works for. If the Nobilite Emissary is subjected to interrogation, and wins an opposed test, he may immediately make an Awareness Test (DN 4). On a success and for every shifted icon, he can learn one detail about his captors (what he can and cannot learn is ultimately up to the GM but it should be something valuable).',
      },
    ],
    wargearString: 'Laspistol, staff, nobilite robes or imperial robes, charm (silk headscarf) or micro-bead, gene-coded slate monitron.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Staff' },
      {
        name: 'Nobilite Robes or Imperial Robes',
        options: [
          { name: 'Nobilite Robes' },
          { name: 'Imperial Robes' },
        ],
      },
      {
        name: 'Charm or micro-bead',
        options: [
          { name: 'Charm', variant: 'Silk headscarf' }, // possession
          { name: 'Micro-bead' },
        ],
      },
      { name: 'gene-coded slate monitron' }, // possession
    ],
  },
  {
    ...simpleStub('pax','-','pax-navigator','Navis Nobility Houses','Navigator Primaris',30,2),
    stub: false,
    hint: 'A warp guide, tasked with the sacred charge of guiding voidships through the immaterium.',
    prerequisites: [
     { group: 'attributes', value: 'willpower', threshold: 4 },
     { group: 'skills', value: 'pilot', threshold: 2 },
     { group: 'skills', value: 'persuasion', threshold: 2 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 2,
    abilities: [
      {
        name: 'Warp Guide',
        effect: 'The Navigator Primaris gains +Rank bonus dice to Pilot skill tests when steering a voidship through the Warp. Additionally, he gains +½ Rank to Conviction tests.',
      },
    ],
    wargearString:
      'Dueling laspistol or hand cannon, staff, mesh armor, emperor’s tarot deck, nobilite robes, ' +
      'charm (silk headscarf), charm (navis occulta), micro-bead.',
    wargear: [
      {
        name: 'Dueling laspistol or hand cannon',
        options: [
          { name: 'Dueling laspistol' },
          { name: 'Hand Cannon' },
        ],
      },
      { name: 'Staff' },
      { name: 'Mesh Armor' },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Charm', variant: 'Navis Occulta' }, // possession
      { name: 'Micro-bead' },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Novator', 40, 3),
    stub: false,
    hint: 'An elder navigator who directs the interests of their house.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 6 },
      { group: 'skills', value: 'pilot', threshold: 5 },
      { group: 'skills', value: 'leadership', threshold: 4 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
      { group: 'skills', value: 'deception', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
      { group: 'skills', value: 'insight', threshold: 3 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 3,
    abilities: [
      {
        name: 'Exalted Lineage',
        effect: 'As the head of a family of the most ancient and powerful houses of the Imperium, the Novator is able to utilize his prestige among the nobility of the Imperium. The Novator may call upon his lineage in social situations and gains +Rank bonus to any Interaction Skill tests when dealing with characters with both the <Nobility> and <Imperium> keywords',
      },
    ],
    wargearString:
      'Digi-weapon or infernal pistol, staff, mesh armor, emperor’s tarot deck, ' +
      'charm (silk headscarf), nobilite robes, devoted attendant or mono-tasked servo-skull, ' +
      'choice of augmetic',
    wargear: [
      {
        name: 'Digi-Weapon or Infernal Pistol',
        options: [
          { name: 'Digi Weapon' },
          { name: 'Inferno Pistol' },
        ],
      },
      { name: 'Staff' },
      { name: 'Mesh Armor' },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      {
        name: 'devoted attendant or mono-tasked servo-skull',
        options: [
          { name: 'Devoted Attendant' },
          { name: 'mono-tasked servo-skull' },
        ],
      },
      { name: 'Choice of Augmetic' },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Heir-Apparent', 50, 4),
    stub: false,
    hint: 'The strongest navigators, primed to become the next paternova.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 7 },
      { group: 'skills', value: 'persuasion', threshold: 5 },
      { group: 'skills', value: 'pilot', threshold: 4 },
      { group: 'skills', value: 'intimidation', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 4 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 3,
    abilities: [
      {
        name: 'The Call of the Paternova',
        effect: 'As Heir-Apparents are inexorably drawn to each, their power waxes in preparation of contending to become the next Paternova. Heir-Apparents gains a chosen Navigator Mutation with each Rank and also gain +Rank when utilizing his Lidless Stare power.',
      },
    ],
    wargearString:
      'Hotshot laspistol or hand cannon, staff, mesh armor or carapace armor, emperor’s tarot deck, ' +
      'nobilite robes, charm (silk headscarf), micro-bead',
    wargear: [
      {
        name: 'Hotshot laspistol or hand cannon',
        options: [
          { name: 'Hotshot Laspistol' },
          { name: 'Hand Cannon' },
        ],
      },
      { name: 'Staff' },
      {
        name: 'Mesh Armor or Carapace',
        options: [
          { name: 'Mesh Armor' },
          { name: 'Carapace Armor' },
        ],
      },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Micro-bead' },
    ],
  },
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Bannerman', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Boundsman', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Drover', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Serfitor', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Knight Scion', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Sacristan', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Freeblade', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Knight Baron', 60, 4),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Household Trooper', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Rejuvenat Adept', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Child of Destiny', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Companion', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Rogue Trader', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Legendary Trader', 60, 4),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Explicator-Progenii', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Progena', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Truant', 5, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Drill-Abbot', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Scapegrace', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Scavenger', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Stubjack', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Performancer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Verminspeaker', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Witch', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Reclaimator', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Desperado', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Dreg', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Fixer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Malifixer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Skulker', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Smuggler', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Thug', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Cold Trader', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Crime Lord', 40, 2),
  simpleStub('pax', '-', 'core-untouchable', 'Untouchables', 'Blank', 0, 1),
  simpleStub('pax', '-', 'core-untouchable', 'Untouchables', 'Null', 20, 2),
  simpleStub('pax', '-', 'core-untouchable', 'Untouchables', 'Pariah', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Dark-Holder', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Pilgrim', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Voidborn Clanner', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Void-Master', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Wolfpack Raiders', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Pirate Prince', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Reaver', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Swashbuckler', 40, 2),
];

const sotahRep = [
  simpleStub('sotah', 4, 'core-adeptus-astartes', 'Deathwatch', 'Blackshield', 60, 4),
  simpleStub('sotah', 4, 'core-adeptus-astartes', 'Deathwatch', 'Keeper', 80, 5),
  simpleStub('sotah', 5, 'core-adeptus-astartes', 'Deathwatch', 'Kill Marine', 60, 4),
];

const thaotRep = [
  simpleStub('thaot', 4, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarin', 70, 3),
];

const ambRep = [
  simpleStub('amb', 2, 'core-human', 'Astra Militarum', 'Weapon Specialist', 25, 2),
  simpleStub('amb', 3, 'core-human', 'Astra Militarum', 'Brawler', 25, 2),
  simpleStub('amb', 4, 'core-human', 'Astra Militarum', 'Scout', 30, 2),
  simpleStub('amb', 4, 'core-human', 'Astra Militarum', 'Sniper', 30, 2),
  simpleStub('amb', 5, 'core-human', 'Astra Militarum', 'Heavy Weapon Specialist', 35, 2),
  simpleStub('amb', 6, 'coreab-ogryn', 'Astra Militarum', 'Bulwark', 25, 2),
  simpleStub('amb', 6, 'core-human', 'Astra Militarum', 'Field Medicae', 25, 2),
];

const archetypeRepository = [
  ...core,
  ...dodScumPsyker,
  ...aaoaRep,
  ...ltgbRep,
  ...aotgtRep,
  ...teaRep,
  ...hevaRep,
  ...goenRep,
  ...lotnRep,
  ...togRep,
  ...paxRep,
  ...sotahRep,
  ...thaotRep,
  ...ambRep,
];

module.exports = archetypeRepository;
