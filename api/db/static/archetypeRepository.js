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

const simpleStub = function (sourceKey, sourcePage, species, group, name, bp, tier, stub = true) {
  let speciesSourceKey = 'core';
  let speciesName = 'Human';

  let split = [];

  split = species.split('/');
  if ( split.length === 2) {
    speciesSourceKey = split[0];
    speciesName = split[1];
  } else {
    split = species.split('-');
    if ( split.length >= 2 ){
      speciesSourceKey = split[0];
      speciesName = split.splice(1).map((i)=>i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
    } else {
      speciesName = species;
    }
  }

  const speciesLabel = `${speciesName} (${speciesSourceKey.toLowerCase()})`;
  const speciesKey = `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`;

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
    species: [ speciesLabel ],
    speciesKey: [ speciesKey ],
    stub: stub,
  };
};

const core = [
  // Adeptus Ministorum
  {
    source: { ...source.core },
    name: 'Ministorum Priest',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum',
    archetypeFeatures: [
      {
        name: 'Fiery Invective',
        snippet: 'Once per combat, the Ministorum priest may take '
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
    wargear: [
      { name: 'Laspistol' },
      { name: 'Rosarius' },
      { name: 'Knife' },
      { name: 'Clothing', variant: 'Ministorum robes' },
      { name: 'Missionary Kit' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Death Cult Assassin',
    cost: 20,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Ministorum',
    archetypeFeatures: [
      {
        name: 'Glancing Blow',
        snippet: 'Death Cult Assassins depend upon their movement to '
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
    wargear: [
      { name: 'Bodyglove' },
      { name: 'Death Cult Powerblade' },
      { name: 'Death Cult Powerblade' },
      { name: 'Knife' },
      { name: 'Laspistol' },
      { name: 'Doses of stimm', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Crusader',
    cost: 40,
    tier: 3,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum',
    archetypeFeatures: [
      {
        name: 'Armour of Faith',
        snippet: 'Crusaders rely upon their faith to carry them '
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
    wargear: [
      { name: 'Power Sword' },
      { name: 'Storm Shield' },
      { name: 'Carapace Armour' },
      { name: 'Clothing', variant: 'Ministorum robes' },
    ],
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
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    keywordOption: '<Order>',
    archetypeFeatures: [
      {
        name: 'Loyal Compassion',
        snippet: 'A Sister Hospitaller adds +Rank on Medicae tests when treating characters '
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
    wargear: [
      { name: 'Sororitas Powered Armour' },
      { name: 'Chirurgeon\'s Tools' },
      { name: 'Laspistol' },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Copy of the Rule of the Sororitas' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Sister of Battle',
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    cost: 40,
    tier: 2,
    influence: 1,
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    archetypeFeatures: [
      {
        name: 'Purity of Faith',
        snippet: 'Sisters of Battle and any allies within 15 '
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
    wargear: [
      { name: 'Sororitas Powered Armour' },
      { name: 'Chaplet Ecclesiasticus' },
      {
        name: 'Either a boltgun OR a Chain Sword and bolt pistol.',
        selected: 'Boltgun',
        options: [
          { name: 'Boltgun' },
          { name: 'Chain Sword and Bolt Pistol' },
        ],
      },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Writing Kit' },
      { name: 'Copy of the Rule of the Sororitas' },
    ],
  },
  // Adeptus Militarum
  {
    source: { ...source.core },
    name: 'Imperial Guardsman',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Astra Militarum,<Regiment>',
    archetypeFeatures: [
      {
        name: 'Look Out Sir',
        snippet: 'Once per battle, an Imperial Guardsman may suffer '
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
    wargear: [
      { name: 'Flak Armour' },
      { name: 'Lasgun' },
      { name: 'Knife' },
      { name: 'Guard issue mess kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Uplifting Primer' },
      { name: 'Ration Packs', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Tempestus Scion',
    cost: 30,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Astra Militarum,Militarum Tempest',
    archetypeFeatures: [
      {
        name: 'Elite Soldier',
        snippet: 'After spending one or more Glory to increase '
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
    wargear: [
      { name: 'Carapace Armour' },
      { name: 'Hot-Shot Lasgun' },
      { name: 'Grav-chute' },
      { name: 'Knife' },
      { name: 'Guard issue mess kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Uplifting Primer' },
      { name: 'Ration Packs', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Commissar',
    cost: 50,
    tier: 3,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 3,
    keywords: 'Imperium,Astra Militarum,Officio Prefectus',
    archetypeFeatures: [
      {
        name: 'Fearsome Respect',
        snippet: 'Commissars and any allies within 15 metres and '
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
    wargear: [
      { name: 'Flak Coat' },
      { name: 'Bolt Pistol' },
      { name: 'Chain Sword' },
      { name: 'Guard issue mess kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Uplifting Primer' },
      { name: 'Ration Packs', amount: 3 },
    ],
  },
  // Agents of the Imperium
  {
    source: { ...source.core },
    name: 'Inquisitorial Acolyte',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Inquisition,<ANY>,<Ordo>',
    archetypeFeatures: [
      {
        name: 'Inquisitorial Decree',
        snippet: 'Once per scene, an Inquisitorial Acolyte '
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
    wargear: [
      { name: 'Flak Armour' },
      {
        name: 'Range weapon of value 5 or less of up to Uncommon rarity (must have the Imperium keyword)',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
            rarityFilter: ['Common', 'Uncommon'],
            typeFilter: 'Ranged Weapon',
            keywordFilter: 'Imperium',
          },
        ],
      },
      { name: 'Knife' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Inquisitorial Adept',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Imperium,Inquisition,<Ordo>',
    archetypeFeatures: [
      {
        name: 'Administratum Records',
        snippet: 'he character is particularly adept at '
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
    wargear: [
      { name: 'Flak Armour' },
      { name: 'Laspistol' },
      { name: 'Knife' },
      { name: 'Auto quill' },
      { name: 'Data-slate' },
      { name: 'Ancient Records', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Rogue Trader',
    cost: 40,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Rogue Trader,<Dynasty>',
    keywordOption: '<Dynasty>',
    archetypeFeatures: [
      {
        name: 'Warrant of Trade',
        snippet: 'Rogue Traders are masters at manipulating '
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
    hint: 'An adventuresome and influential explorer with their own space vessel.',
    wargear: [
      {
        name: 'Choice of Flak Coat, carapace armour or Light Power Armour',
        options: [
          { name: 'Flak Coat' },
          { name: 'Carapace Armour' },
          { name: 'Light Power Armour' },
        ],
      },
      {
        name: 'Ranged weapon up to value Tier+4 and rarity Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
            rarityFilter: ['Uncommon', 'Common', 'Rare'],
            typeFilter: 'Ranged Weapon',
          },
        ],
      },
      {
        name: 'Melee weapon up to value Tier+4 and rarity Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
            rarityFilter: ['Uncommon', 'Common', 'Rare'],
            typeFilter: 'Melee Weapon',
          },
        ],
      },
      { name: 'Imperial Frigate' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Sanctioned Psyker',
    cost: 50,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Astra Telepathica,Psyker,Scholastica Psykana',
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite power and one additional minor power. You gain access to Minor and Universal powers.',
        description:
          '<p>A Sanctioned Psyker begins play with <strong>one minor psychic power</strong> ' +
          'and the <string>smite psychic power</string>.</p>' +
          '<p>They may purchase additional Minor Psychic Powers and Universal Psychic powers, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
        ],
      }
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
    ],
    group: 'Agents of the Imperium',
    key: 'core-sanctioned-psyker',
    description: null,
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Force rod' },
      { name: 'Psykana Mercy Blade' },
      { name: 'Guard issue mess kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Ration Packs', amount: 2 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Inquisitor',
    cost: 70,
    tier: 4,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 4,
    keywords: 'Imperium,Inquisition,<Any>,<Ordo>',
    archetypeFeatures: [
      {
        name: 'Unchecked Authority',
        snippet: 'Inquisitors have supreme authority for '
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
    wargear: [
      {
        name: 'Choice of Flak Coat, Ignatus Power Armour or Light Power Armour',
        selected: '',
        options: [
          { name: 'Flak Coat' },
          { name: 'Ignatus Power Armour' },
          { name: 'Light Power Armour' },
        ],
      },
      {
        name: 'Ranged weapon up to availability 7 and rarity Very Rare.',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Uncommon', 'Common', 'Rare', 'Very Rare'],
            typeFilter: 'Ranged Weapon',
          },
        ],
      },
      {
        name: 'Melee weapon up to availability 7 and rarity Very Rare.',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Uncommon', 'Common', 'Rare', 'Very Rare'],
            typeFilter: 'Melee Weapon',
          },
        ],
      },
      { name: 'Symbol of authority' },
    ],
  },
  // Adeptus Astartes
  {
    source: { ...source.core },
    name: 'Space Marine Scout',
    key: 'core-space-marine-scout',
    species: ['Adeptus Astartes (core)'],
    speciesKey: ['core-adeptus-astartes'],
    hint: 'A stealthy warrior adept at reconnaissance.',
    group: 'Adeptus Astartes',
    cost: 20,
    tier: 2,
    influence: 1,
    keywords: 'Imperium,Adeptus Astartes,<Chapter>',
    keywordOption: '<Chapter>',
    archetypeFeatures: [
      {
        name: 'Use the Terrain',
        snippet: 'Space Marine Scouts receive +Rank to all Stealth '
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
    wargear: [
      { name: 'Scout Armour' },
      {
        name: 'Either a boltgun OR a bolt pistol.',
        selected: 'Boltgun',
        options: [
          { name: 'Boltgun' },
          { name: 'Bolt Pistol' },
        ],
      },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Tactical Space Marine',
    species: ['Aceptus Astartes (core)'],
    speciesKey: ['core-adeptus-astartes'],
    cost: 50,
    tier: 3,
    influence: 2,
    keywords: 'Imperium,Adeptus Astartes,<Chapter>',
    keywordOption: '<Chapter>',
    archetypeFeatures: [
      { name: 'Tactical Versatility', snippet: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).' },
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
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Boltgun' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Primaris Intercessor',
    key: 'core-primaris-intercessor',
    hint: 'A skilled and focused warrior, adept at bringing death at range.',
    group: 'Adeptus Astartes',
    cost: 60,
    tier: 4,
    species: ['Primaris Astartes (core)'],
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
    archetypeFeatures: [
      { name: 'Intercessor Focus', snippet: 'When firing a bolt rifle or heavy bolt pistol they gain +Rank bonus to attack rolls.' },
    ],
    description: '',
    wargear: [
      { name: 'Mark X Tacticus Power Armour' },
      {
        name: 'Either a bolt rifle OR a heavy bolt pistol.',
        selected: 'Bolt Rifle',
        options: [
          { name: 'Bolt Rifle' },
          { name: 'Heavy Bolt Pistol' },
        ],
      },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  // Adeptus Mechanicus
  {
    source: { ...source.core },
    name: 'Skitarius',
    cost: 40,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 0,
    keywords: 'Imperium,Adeptus Mechanicus,Skitarii,<Forge World>',
    archetypeFeatures: [
      {
        name: 'Heavily Augmented',
        snippet: 'The Skitarius’ body is designed to withstand '
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
    wargear: [
      { name: 'Skatarii Auto-Cuirass' },
      { name: 'Galvanic Rifle' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Tech-Priest',
    cost: 60,
    tier: 3,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,<Forge World>',
    keywordOption: '<Forge World>',
    archetypeFeatures: [
      {
        name: 'Rite of Repair',
        snippet: 'Tech-Priests automatically reduce the time by '
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
    wargear: [
      { name: 'Light Power Armour' },
      { name: 'Ommnissian Axe' },
      { name: 'Laspistol' },
      { name: 'Mechandrites (Servo-Arm)' },
      {
        name: 'One augmentic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: 'Augmentic',
          },
        ],
      },
      {
        name: 'One augmentic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: 'Augmentic',
          },
        ],
      },
    ],
  },
  // Scum
  {
    source: { ...source.core },
    name: 'Ganger',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Scum,<ANY>',
    keywordOption: '<Any>',
    archetypeFeatures: [
      {
        name: 'Scrounger',
        snippet: 'Gangers make use of every available resource, and '
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
    wargear: [
      {
        name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stub Gun.',
        selected: 'Laspistol',
        options: [
          { name: 'Laspistol' },
          { name: 'Autpistol' },
          { name: 'Hand Cannon' },
          { name: 'Stub Gun' },
        ],
      },
      {
        name: 'Choice of Knife or Sword.',
        selected: 'Knife',
        options: [
          { name: 'Knife' },
          { name: 'Sword' },
        ],
      },
      { name: 'Bedroll' },
      { name: 'Canteen' },
      { name: 'Clothing', variant: 'Gang Colours' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Scavvy',
    cost: 10,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: -1,
    archetypeFeatures: [
      {
        name: 'Mutant',
        snippet: 'The Scavvy may select one mutation (see Scavvy Mutations, '
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
    wargear: [
      {
        name: 'Choice of Laspistol or Autopistol.',
        selected: 'Laspistol',
        options: [
          { name: 'Laspistol' },
          { name: 'Autpistol' },
        ],
      },
      { name: 'Knife' },
      { name: 'Bedroll' },
      { name: 'Canteen' },
      { name: 'Clothing', variant: 'Tattered' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Desperado',
    cost: 30,
    tier: 3,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Valuable Prey',
        snippet: 'Desperados receive +Rank for Cunning tests. They '
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
    wargear: [
      {
        name: 'Choce of boltgun OR a Chain Sword and bolt pistol.',
        selected: 'Boltgun',
        options: [
          { name: 'Boltgun' },
          { name: 'Chain Sword and Bolt Pistol' },
        ],
      },
      { name: 'Flak Coat' },
      { name: 'Prysense Googles' },
      { name: 'Various Maps' },
      { name: 'Combi Tool' },
    ],
  },
  // Renegades
  {
    source: { ...source.core },
    name: 'Cultist',
    cost: 0,
    tier: 1,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 2,
    keywords: 'Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Any>',
    archetypeFeatures: [
      {
        name: 'From Within',
        snippet: 'Cultists gain +Rank to Deception tests, including '
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
    wargear: [
      {
        name: 'Choce of lasgun OR autogun.',
        selected: 'Lasgun',
        options: [
          { name: 'Lasgun' },
          { name: 'Autogun' },
        ],
      },
      { name: 'Knife' },
      { name: 'Symbol of Authority', variant: 'Unholy icon' },
      { name: 'Guard issue mess kit' },
      { name: 'blanket', variant: 'tattered' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Chaos Space Marine',
    cost: 50,
    tier: 3,
    species: ['Aceptus Astartes (core)'],
    speciesKey: ['core-adeptus-astartes'],
    influence: 2,
    keywords: 'Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Legion>',
    archetypeFeatures: [
      { name: 'Tactical Versatility', snippet: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).' },
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
    hint: 'A renegade warrior and death-dealer, a dark reflection of their noble brethren.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Boltgun' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  {
    source: { ...source.core },
    name: 'Heretek',
    cost: 60,
    tier: 2,
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    influence: 1,
    keywords: 'Chaos,Heretic,Adeptus Mechanicus,Dark Mechanicus',
    archetypeFeatures: [
      {
        name: 'Transformative Technology',
        snippet: 'Hereteks automatically reduce the time '
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
    wargear: [
      { name: 'Laspistol' },
      { name: 'Mechandrites (Servo-Arm)' },
      {
        name: 'One augmentic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: 'Cybernetic',
          },
        ],
      },
      {
        name: 'One augmentic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: 'Cybernetic',
          },
        ],
      },
    ],
  },
  {
    source: { ...source.core },
    name: 'Rogue Psyker',
    key: 'core-rogue-psyker',
    group: 'Renegades',
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    cost: 50,
    tier: 2,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'A rogue psyker begins play with one Minor Psychic Power, the '
        + 'Smite Power and may purchase additional Minor Psychic Powers, Universal Psychic '
        + 'Powers and Maleficarum Psychic Powers subject to Tier restrictions.',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
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
    ],
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
    wargear: [
      { name: 'Laspistol' },
      { name: 'Psychic Focus' },
      { name: 'Tattered blanket' },
      { name: 'Guard issue mess kit' },
    ],
  },
  // Aeldari
  {
    source: { ...source.core },
    name: 'Corsair',
    cost: 0,
    tier: 1,
    species: ['Eldar (core)'],
    speciesKey: ['core-eldar'],
    influence: 0,
    keywords: 'Aeldari,Anhrathe,<Coterie>',
    archetypeFeatures: [
      {
        name: 'Dancing the Blade\'s Edge',
        snippet: 'Choose one of the following Interaction '
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
    wargear: [
      { name: 'Corsair Armour' },
      { name: 'Shuriken Pistol' },
      { name: 'Lasblaster' },
      { name: 'Spirit Stone' },
      { name: 'Plasma Grenades', amount: 3 },
      { name: 'Void Suite' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Ranger',
    cost: 30,
    tier: 2,
    species: ['Eldar (core)'],
    speciesKey: ['core-eldar'],
    influence: 0,
    keywords: 'Aeldari,Asuryani,<Craftworld>',
    archetypeFeatures: [
      {
        name: 'From the Shadows',
        snippet: 'Rangers are adept at exploiting any concealment. '
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
    wargear: [
      { name: 'Chameleoline Cloak' },
      { name: 'Eldar Mesh Armour' },
      { name: 'Ranger Long Rifle' },
      { name: 'Shuriken Pistol' },
      { name: 'Spirit Stone' },
      { name: 'Knife' },
      { name: 'Bedroll' },
      { name: 'Blanket' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Warlock',
    cost: 80,
    tier: 3,
    species: ['Eldar (core)'],
    speciesKey: ['core-eldar'],
    influence: 2,
    keywords: 'Aeldari,Asuryani,Psyker,<Craftworld>',
    archetypeFeatures: [
      {
        name: 'Runes of Battle',
        snippet: 'A Warlock begins play with the Psyniscience and '
        + 'smite psychic powers (these do not count towards the maximum), and may purchase '
        + 'additional Minor Psychic Powers, Universal Psychic Powers, and Runes of Battle '
        + 'Psychic Powers, subject to Tier restrictions.',
        psychicPowers: [
          { name: 'psykerSmmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerPsyniscience', selected: 'Psyniscience', query: { name: 'Psyniscience' }, options: [], free: true },
        ],
        psychicDisciplines: [
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
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
    ],
    group: 'Aeldari',
    key: 'core-warlock',
    description: null,
    hint: 'A powerful psyker, wielding strictly-guided powers for the Aeldari cause.',
    wargear: [
      { name: 'Rune Armour' },
      { name: 'Shuriken Pistol' },
      { name: 'Witchblade' },
      { name: 'A set of Wraithbone Runes' },
      { name: 'Spirit Stone' },
    ],
  },
  // Orks
  {
    source: { ...source.core },
    name: 'Boy',
    cost: 0,
    tier: 1,
    species: ['Ork (core)'],
    speciesKey: ['core-ork'],
    influence: 0,
    keywords: 'Ork,<Clan>',
    archetypeFeatures: [
      {
        name: 'Get Stuck In',
        snippet: 'A Boy gains +Rank to melee attacks for every ally '
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
    wargear: [
      { name: 'Shoota' },
      { name: 'Slugga' },
      { name: 'Choppa' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Kommando',
    cost: 30,
    tier: 2,
    species: ['Ork (core)'],
    speciesKey: ['core-ork'],
    influence: 0,
    keywords: 'Ork,<Clan>',
    archetypeFeatures: [
      {
        name: 'Kunnin\' Plan',
        snippet: 'A Kommando and any allies with the Ork Keyword '
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
    wargear: [
      { name: 'Shoota' },
      { name: 'Slugga' },
      { name: 'Choppa' },
      { name: 'Stikkbombs' },
    ],
  },
  {
    source: { ...source.core },
    name: 'Nob',
    cost: 60,
    tier: 3,
    species: ['Ork (core)'],
    speciesKey: ['core-ork'],
    influence: 2,
    keywords: 'Ork,<Clan>',
    archetypeFeatures: [
      {
        name: 'Boys',
        snippet: 'A Nob commands a mob of Troops numbering up to Rank x 3 Boyz '
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
    wargear: [
      { name: '\'Eavy Armour' },
      { name: 'Kustom Slugga' },
      { name: 'Kustom Choppa' },
    ],
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
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
    influence: 0,
    keywords: 'Imperium,Scum,Psyker',
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'A Scum Psyker begins play with one minor psychic '
        + 'power and the smite psychic power. They may purchase additional Minor Psychic '
        + 'Powers and Universal Psychic powers, subject to Tier restrictions.',
        psychicPowers: [
          { name: 'psykerSmmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
        ],
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
  simpleStub('aaoa', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Marine Hellblaster', 70, 4),
  simpleStub('aaoa', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Marine Inceptor', 80, 4),
  simpleStub('aaoa', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Marine Reiver', 50, 4),
  simpleStub('aaoa', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Marine Aggressor', 80, 4),
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
  {
    ...simpleStub('aaoa', 58, 'Ork', 'Orks', 'Mekboy', 30, 2, false),
    hint: 'A type of Ork Oddboy who build all the weapons, vehicles, and other advanced technology used by the Greenskins.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Fix It Proppa',
        description:
          '<p>A Mek gains +Rank on Tech tests to fix any weapon, vehicle, or other machine with the Ork keyword. ' +
          'In addition, during a regroup or respite, a Mek may tinker with a weapon, vehicle, or other machine with the Ork keyword. ' +
          'Weapons gain ED equal to ½ the Mek’s Rank. ' +
          'Vehicles gain +1/2 Rank to their Cruising Speed, Wounds, or Resilience. ' +
          'Other machines gain a bonus of the GM’s discretion. ' +
          'These bonuses last until the Mek’s next respite, or until the machine suffers a complication, whichever comes first.</p>',
      },
    ],
    wargearString:
      'Kustom Mega Blasta, Choppa, 3 Stikkbombs, Ork Flak armour, Mek Toolz',
    wargear: [
      { name: 'Kustom Mega-Blasta' },
      { name: 'Choppa' },
      { name: 'Stikkbombs', amount: 3 },
      { name: 'Ork Flak armour' },
      { name: 'Mek Toolz' },
    ],
  },
  {
    ...simpleStub('aaoa', 58, 'Ork', 'Orks', 'Painboy', 30, 2, false),
    hint: 'Responsible for fixing injuries even the highly regenerative Ork physiology cannot repair.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'medicae', threshold: 3 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Make It All Betta',
        snippet: 'You add +1/2 Rank to Medicae Tests on characters with the Ork Keyword. Additionally, a stabilasing an Ork restores Rank Wounds (rather then 1).',
        description:
          '<p>A Painboy may add +1/2 Rank to all Medicae tests made on characters with the Ork keyword. ' +
          'In addition, a successful Medicae test to stabilise a dying character with the Ork keyword restores Rank wounds rather than 1.</p>',
      },
    ],
    wargearString:
      '‘Urty Syringe, Choppa, Ork Flak armour, Dok Bag',
    wargear: [
      { name: '‘Urty Syringe' },
      { name: 'Choppa' },
      { name: 'Ork Flak armour' },
      { name: 'Dok Bag' },
    ],
  },
  {
    ...simpleStub('aaoa', 59, 'Ork', 'Orks', 'Burna Boy', 30, 2, false),
    hint: 'Pyromaniacal Greenskins whose desire to burn and destroy grows to consume them entirely.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Da Burny Dance',
        snippet: 'You gain +1 icon on Resolve Tests for every burning creature you can see.',
        description:
          '<p>Burnas revel in the flames they spread. A Burna gains +1 icon on Resolve tests for every creature they can see who is currently burning.</p>',
      },
    ],
    wargearString:
      'Burna, Ork Flak armour, 3 stikkbombs',
    wargear: [
      { name: 'Burna' },
      { name: 'Ork Flak armour' },
      { name: 'Stikkbombs', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa', 59, 'Ork', 'Orks', 'Flash Git', 60, 3, false),
    hint: 'An elite breed of Ork Nobz who are obsessed with their lovingly customised, ostentatiously polished and painted weapons known as Snazzguns.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'cunning', threshold: 2 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Gun Crazy Show-Offs',
        description:
          '<p>If a Flash Git rolls a 6 on their Wrath die during a shooting attack, they may spend a Reload to immediately make a second shooting attack with that weapon at the nearest target.</p>',
      },
    ],
    wargearString:
      'Snazzgun, ‘Eavy armour, 3 stikkbombs, ammo runt',
    wargear: [
      { name: 'Snazzgun' },
      { name: '‘Eavy armour' },
      { name: 'Stikkbombs', amount: 3 },
      { name: 'Ammo runt' },
    ],
  },
  {
    ...simpleStub('aaoa', 60, 'Ork', 'Orks', 'Tankbusta', 30, 2, false),
    hint: 'A Tankbusta (pl. Tankbustaz) has become completely addicted to the thrill of destroying the armoured fighting vehicles of his foes.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Tank Hunters',
        description:
          '<p>When making a ranged attack against a vehicle, a Tankbusta may re-roll failures on their attack.</p>',
      },
    ],
    wargearString:
      'Rokkit Launcha, Ork Flak armour, 3 stikkbombs, 1 tankbusta bomb',
    wargear: [
      { name: 'Rokkit Launcha' },
      { name: 'Ork Flak armour' },
      { name: 'Stikkbombs', amount: 3 },
      { name: 'tankbusta bomb', amount: 1 },
    ],
  },
  {
    ...simpleStub('aaoa', 60, 'Ork', 'Orks', 'Runtherd', 30, 2, false),
    hint: 'Oddboyz who exhibit a trait extremely uncommon amongst Orks: patience.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
      { group: 'skills', value: 'leadership', threshold: 2 },
    ],
    keywords: 'Ork,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Slaver',
        description:
          '<p>A Runtherd is accompanied by a mob of Gretchin (Rank x 3 Gretchin in total). ' +
          'Gretchin, Snotlings, and Squigs owned by the Runtherd within 10+Rank metres add the Runtherd’s Leadership to their Resolve, ' +
          'and as a bonus on any skill test they are commanded to make by the Runtherd.</p>',
      },
    ],
    wargearString:
      'Slugga, grabba-stikk, 3 stikkbombs, grot lash, Ork Flak armour.',
    wargear: [
      { name: 'Slugga' },
      { name: 'grabba-stikk' },
      { name: 'Stikkbombs', amount: 3 },
      { name: 'Grot lash' },
      { name: 'Ork Flak armour' },
    ],
  },
  {
    ...simpleStub('aaoa', 61, 'Ork', 'Orks', 'Weirdboy', 60, 3, false),
    hint: 'Capable of vomiting blasts of Warp energy that can reduce foes to molten goop in seconds.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
    ],
    keywords: 'Ork,Psyker,<Clan>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'The Power of the WAAAGH!',
        description:
          '<p>Weirdboyz begin play with the shove, inflict pain, and smite psychic powers, ' +
          'and they may purchase additional Power of the WAAAGH psychic powers, subject to Tier restrictions. ' +
          'A Weirdboy may not gain additional Wrath dice by drawing on the Warp as other psykers do. ' +
          'Rather, they gain one additional Wrath die for every five Orks (but not other greenskins such as Gretchin, Snotlings, and squigs) within 20 metres. ' +
          'They must use these Wrath dice—they cannot choose not to. ' +
          'Each 1 rolled on a Wrath die for a Weirdboy using a psychic power ' +
          'inflicts one Mortal Wound to the Weirdboy instead of a roll on the Perils of the Warp table, ' +
          'and a Weirdboy who is reduced to 0 wounds by this damage explodes, ' +
          'inflicting 1d3 Mortal Wounds to all Orks within 15m.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerShove', selected: 'Shove', query: { name: 'Shove' }, options: [], free: true },
          { name: 'psykerInflictPain', selected: 'Inflict Pain', query: { name: 'Inflict Pain' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'WAAAGH!',
        ],
      },
    ],
    wargearString:
      'Weirdboy Staff, Ork Flak armour.',
    wargear: [
      { name: 'Weirdboy Staff' },
      { name: 'Ork Flak armour' },
    ],
  },
  {
    ...simpleStub('aaoa', 63, 'aaoa-squat', 'Squats', 'War-Pledged Warrior', 0, 1, false),
    hint: 'The rank and file of a Squat Stronghold.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'cunning', threshold: 2 },
    ],
    keywords: 'Squat,<League>',
    influence: 0,
    archetypeFeatures: [
      {
        name: 'War-Pledged',
        description:
          '<p>A War-Pledged Warrior is bound by oaths of loyalty and duty and stands united with their comrades-in-arms.</p>' +
          'Whenever a War-Pledged Warrior attacks an enemy who has been attacked by an ' +
          'ally already during this round (including Interaction attacks), ' +
          'they gain a bonus of +1/2 Rank to their attack.</p>',
      },
    ],
    wargearString:
      'Bolter, hand-cannon, mono-knife, Flak armour, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Bolter' },
      { name: 'Hand-cannon' },
      { name: 'mono-knife' },
      { name: 'Flak armour' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa', 63, 'aaoa-squat', 'Squats', 'Guild Engineer', 60, 3, false),
    hint: 'Masterful artisans, creating the devices necessary for survival.',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    keywords: 'Squat,<League>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Guild Techniques',
        description:
          '<p>Guild Engineers receive +Rank on Tech tests to repair a damaged machine. They may re-roll up to ½ Rank dice on any skill test to use a device that they have personally built or repaired. They are considered to have built all of their starting wargear.</p>',
      },
    ],
    wargearString:
      'Bolter, Power Axe, augmetic servo-arm, Ionclad Carapace armour, Refractor field, Guild Engineer’s tools.',
    wargear: [
      { name: 'Bolter' },
      { name: 'Power Axe' },
      { name: 'Augmetic Servo Arm' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Refractor field' },
      { name: 'Guild Engineer’s tools' },
    ],
  },
  {
    ...simpleStub('aaoa', 64, 'aaoa-squat', 'Squats', 'Hearthguard', 60, 3, false),
    hint: 'Doughty elite warriors pledged to defend hearth and home.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 2 },
    ],
    keywords: 'Squat,<League>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Bodyguard',
        description:
          '<p>A Hearthguard is unstinting in their devotion to their comrades, ' +
          'and they will not permit their allies to come to harm if it can be helped. ' +
          'When an enemy makes an attack against a character within 5m of the Hearthguard (and who is one of the Hearthguard’s allies), the DN of the attack is increased by ½ the Hearthguard’s Rank.</p>',
      },
    ],
    wargearString:
      'Bolter, Power Axe, Bolt Pistol, mono-knife, Ionclad Carapace Armour, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Bolter' },
      { name: 'Power Axe' },
      { name: 'Bolt Pistol' },
      { name: 'Mono-Knife' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Frag Grenades', amount: 3 },
      { name: 'Krak Grenades', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa', 64, 'aaoa-squat', 'Squats', 'Ancestor Lord', 100, 4, false),
    hint: 'Ancient sages, wise enough to tap into the Warp with care and listen to the voices of the dead.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'attributes', value: 'fellowship', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 3 },
      { group: 'skills', value: 'psychicMastery', threshold: 3 },
    ],
    keywords: 'Squat,<League>,Psyker',
    influence: 4,
    archetypeFeatures: [
      {
        name: 'Psychic Protector',
        description:
          '<p>An Ancestor Lord begins play with the Psyniscience and smite psychic powers (which do not count towards the maximum), ' +
          'and may purchase additional Minor Psychic Powers, Universal Psychic Powers, and Ancestral Rites Psychic Powers, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerPsyniscience', selected: 'Psyniscience', query: { name: 'Psyniscience' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Ancestral Rites',
        ],
      },
    ],
    wargearString:
      'Master-Crafted Force Rod, Ionclad Carapace armour, clothing (Ancestor’s robes).',
    wargear: [
      { name: 'Force Rod', variant: 'Master-Crafted Force Rod' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Clothing', variant: 'Ancestor’s robes' },
    ],
  },

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
  {
    ...simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Immortal', 60, 3, false),
    hint: 'Formerly members of the Necrontyr’s professional military, the Immortals were known for their peerless skill and resolve.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Undying Warrior',
        snippet: 'An Immortal reduces the amount of shock it loses when soaking wounds by ½ Rank.',
      },
    ],
    wargearString:
      'Heavy plating, Gauss blaster or Tesla carbine',
    wargear: [
      { name: 'Heavy plating' },
      {
        name: 'Gauss blaster or Tesla carbine',
        options: [
          { name: 'Gauss blaster' },
          { name: 'Tesla carbine' },
        ],
      },
    ],
  },
  {
    ...simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Deathmark', 65, 3, false),
    hint: 'Assassins without peer, the Deathmarks are highly accurate and well-trained soldiers',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'stealth', threshold: 4 },
      { group: 'skills', value: 'awareness', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hunter’s Mark',
        description:
          'A Deathmark may declare a single elite or adversary-level threat as its  “mark” as a free action. ' +
          'Once a target has been marked in such a way, ' +
          'the Deathmark will know the marked target’s exact geographic location relative to the Deathmark, ' +
          'as well as his status as alive or dead. ' +
          'This does not give the Deathmark information about the surroundings of the target, ' +
          'only its relative location. It may use this ability ½ Rank times per day.',
      },
    ],
    wargearString:
      'Heavy plating, Synaptic Disintegrator, Dimensional Oubliette generator',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Synaptic Disintegrator' },
      { name: 'Dimensional Oubliette generator' },
    ],
  },
  {
    ...simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Destroyer', 85, 3, false),
    hint: 'Awoken with their minds decayed and damaged.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hardwired Hatred',
        snippet: 'You add +½ Rank bonus dice to Attack Tests against organic targets. You suffer +2 DN to Social Tests with non-Destroyer Necrons.',
        description:
          '<p>A Destroyer gains +½ Rank to Attack tests against organic targets, ' +
          'but suffers a +2DN penalty to social tests with non-Destroyer Necrons.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Gauss Cannon, Grav-platform',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Gauss Cannon' },
      { name: 'Grav-platform' },
    ],
  },
  {
    ...simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Lichguard', 70, 4, false),
    hint: 'The Royal Guard of the Necron Dynasties.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 5 },
      { group: 'skills', value: 'awareness', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Guardian Protocols',
        description:
          '<p>The Lychguard may designate another &lt;Dynasty&gt; Necron as its Charge as a free action. ' +
          'If the Lychguard is within 6m of its charge, it may make a DN 3 Agility test when the Charge is attacked or ' +
          'would otherwise take damage from an outside source. If it succeeds on this test, the ' +
          'Lychguard takes the place of its Charge as the target of the attack or effect. ' +
          'If the effect would harm both the Lychguard and its charge, such as a weapon with the Blast trait, ' +
          'the Lychguard takes the damage for both itself and its charge separately. ' +
          'If the Lychguard loses wounds by taking damage for its charge, reduce any wounds lost by the Lychguard by ½ Rank.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Warscythe, Dynastic Crest (symbol of authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Warscythe' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
    ],
  },
  {
    ...simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Triarch Praetorian', 70, 4, false),
    hint: 'The law enforcing arm of the old triarch.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'scholar', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
    ],
    keywords: 'Necron, Triarch',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Codes of Combat',
        description:
          '<p>A Triarch gains +Rank bonus dice to all Scholar tests to decide matters of Necrontyr law. ' +
          'A Praetorian may make choose a single non-Necron elite or adversary-tier threat and make a DN 4 Scholar test as an action. ' +
          'If successful, the Triarch may declare that threat Honorable or Dishonorable. ' +
          'If it is Honorable, all Necrons within 12m gain +½ Rank to Weapon Skill tests against that threat. ' +
          'If it is Dishonorable, all Necrons within 12m gain +½ Rank to Ballistic Skill tests against that target, ' +
          'and certain tactics and cruelties may be permissible to use against it.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Rod of Covenant, Crest of the Triarch (Symbol of Authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Rod of Covenant' },
      { name: 'symbol of authority', variant: 'Crest of the Triarch' },
    ],
  },
  {
    ...simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Lord', 80, 4, false),
    hint: 'The least of the many nobles that make up a Necron Dynasty.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'The Lord`s will',
        description:
          '<p>A Lord may make a DN 4 Leadership test and designate a specific threat as a free ' +
          'action at the beginning of each of its turns. If it is successful, ' +
          'all other <Dynasty> Necrons within 12m that are not Lords or Overlords may reroll ' +
          'up to Rank failed ED on damage rolls against that threat.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Staff of Light' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
    ],
  },
  {
    ...simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Cryptek', 75, 4, false),
    hint: 'Techno-Wizards that dedicated their lives to understanding and working with the many Necron technologies.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'tech', threshold: 5 },
      { group: 'skills', value: 'scholar', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Technomancer',
        description:
          '<p>A Cryptek gains +½ Rank to Tech tests when working on any item with the Necron keyword. All Necrons within 6m of a Cryptek gain +1 to Defiance tests.</p>',
      },
    ],
    wargearString:
      'Staff of Light',
    wargear: [
      { name: 'Staff of Light' },
    ],
  },
  {
    ...simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Destroyer Lord', 95, 5, false),
    hint: 'Of those that fall victim to the path of the Destroyer, few are seemingly as insane as the Destroyer Lords.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 6 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'United Hatred',
        description:
          '<p>A Destroyer Lord may issue orders to Destroyers. The Destroyer Lord and all Destroyers within 12m may reroll up to ½ Rank ED on damage rolls when attacking organic targets.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority), Phase Shifter, Grav-Platform',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Staff of light' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
      { name: 'Phase Shifter' },
      { name: 'Grav-platform' },
    ],
  },
];

const paxRep = [
  simpleStub('pax', '-', 'core/Human', 'Adeptus Administratum', 'Scribe', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Ordinate', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Sage', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Prefect', 40, 4),
  {
    ...simpleStub('pax', 37, 'core-human', 'Adeptus Arbites', 'Arbitrator', 10, 1, false),
    hint: 'A guardian of imperial law, ruthless and implacable.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'The Face of the Law',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. Add +Rank to Intimidation tests against any with the <Imperium> keywords.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'bolt pistol or riot shield, ' +
      'shock maul, ' +
      'book of law, ' +
      'manacles, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec.',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'bolt pistol or riot shield',
        options: [
          { name: 'Bolt Pistol' },
          { name: 'Riot Shield' },
        ],
      },
      { name: 'Shock Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 38, 'core-human', 'Adeptus Arbites', 'Proctor', 30, 1, false),
    hint: 'An unrelenting warrior, adept at tracking down the most recalcitrant recidivist.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Imperial Authority',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +1/2 Rank to Resolve and Corruption Tests, and add +Rank to Intimidation tests against any with the <Imperium> keyword.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'combat shotgun or boltgun or riot shield, ' +
      'power maul, ' +
      'book of law, ' +
      'manacles, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'combat shotgun or boltgun or riot shield',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Boltgun' },
          { name: 'Riot Shield' },
        ],
      },
      { name: 'Power Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 38, 'core-human', 'Adeptus Arbites', 'Mortiurge', 50, 3, false),
    hint: 'Little more than judicially recognized assassins',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'investigation', threshold: 3 },
      { group: 'skills', value: 'survival', threshold: 2 },
      { group: 'skills', value: 'Stealth', threshold: 2 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Last Killer Standing',
        snippet: 'Veteran of a hundred gun battles, summary executions and black operations, a Mortiurge has learned to stay alive regardless of the odds when the bullets and las-bolts fly by, using them environment to their best advantage. They are immune to pinning from personal small arms excluding weapons with the Heavy (x) trait. Additionally, they add +1 to the defensive value of any cover except when ambushed in combat.',
      },
    ],
    wargearString:
      'Bolt pistol or needle pistol, ' +
      'sniper rifle or needle rifle, ' +
      'arbites carapace armor, ' +
      'arbitrator ID (Symbol of Authority), ' +
      'abridged copy of the Lex Imperialis.',
    wargear: [
      {
        name: 'Bolt pistol or needle pistol',
        options: [
          { name: 'Bolt Pistol' },
          { name: 'Needle Pistol' },
        ],
      },
      {
        name: 'Sniper Rifle or Needle Rifle',
        options: [
          { name: 'Sniper Rifle' },
          { name: 'Needle Rifle' },
        ],
      },
      { name: 'Arbites Carapace Armour' },
      { name: 'Symbol of Authority', variant: 'Arbitrator ID' },
      { name: 'abridged copy of the Lex Imperialis' },
    ],
  },
  {
    ...simpleStub('pax', 39, 'core-human', 'Adeptus Arbites', 'Marshal', 60, 3, false),
    hint: 'A fearsome commander, championing the righteous Imperial law.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 4 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'The Thin Black Line',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +1/2 Rank to Corruption Tests and add +Rank to Intimidation and Resolve tests against any with the <Imperium> keywords.',
      },
      {
        name: 'Psi-Marshal',
        snippet: 'Arbites Psi-Marshals are rare solitary figures, held at bay by their own men as much as the citizenry. Each precinct-house will have a single Psi-Marshal assigned under ideal conditions to lend their unique talents to the Arbites law-enforcement efforts. Adeptus Arbites Marshals who ascend with the Psychic Revelations package gain access to the Judicium psychic discipline.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'combat shotgun or bolt pistol, ' +
      'power maul, ' +
      'book of law, ' +
      'manacles, ' +
      'cyber-mastiff, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'combat shotgun or Bolt Pistol',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Bolt Pistol' },
        ],
      },
      { name: 'Power Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Cyber-mastiff' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 40, 'core-human', 'Adeptus Arbites', 'Judge', 80, 4,false),
    hint: 'A lord of justice, inspiring both dread and respect in great measure.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 5 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Hammer of Heretics',
        snippet: 'The character is the very embodiment of imperial law and retribution, striking fear to recidivists and heretics alike.. Add +Rank to Intimidation, Resolve, and Corruption tests against any with the <Imperium> and <Chaos> keywords.',
      },
    ],
    wargearString:
      'Judge carapace armor, ' +
      'combat shotgun or bolt gun, ' +
      'bolt pistol, ' +
      'power maul or shock maul, ' +
      'book of law, ' +
      'manacles, ' +
      'cyber-mastiff, ' +
      'grapplehawk or patrol bike, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec.',
    wargear: [
      { name: 'Judge Carapace Armour' },
      {
        name: 'combat shotgun or Boltgun',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Boltgun' },
        ],
      },
      {
        name: 'Power Maul or Shock Maul',
        options: [
          { name: 'Power Mail' },
          { name: 'Shock Maul' },
        ],
      },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      {
        name: 'Grapplehawk or Patrol Bike',
        options: [
          { name: 'Grapplehawk' },
          { name: 'Ptarol Bike' },
        ]
      },
      { name: 'Cyber-mastiff' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
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
  {
    ...simpleStub('pax',116, 'core-human', 'Hive Ganger', 'Juve', 0, 1, false),
    hint: 'An inexperienced youth, eager for chance to prove themselves.',
    prerequisites: [],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: -1,
    archetypeFeatures: [
      {
        name: 'Eager to kill',
        snippet: 'Once per combat, a Juve can add +Rank to a single Action. They also gain a +½ Rank bonus to Resolve tests in combat.',
      },
    ],
    wargearString:
      'Hive leathers or outlandish attire, ' +
      'stubber, ' +
      'knife or brass knuckles, ' +
      '3 doses of narcotics or graphic memento, ' +
      'lho-sticks, ' +
      'gang trappings.',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      { name: 'Stubber' },
      {
        name: 'knife or brass knuckles',
        options: [
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: '3 doses of narcotics or graphic memento',
        options: [
          { name: 'doses of narcotics', amount: 3 },
          { name: 'graphic memento' },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 117, 'core-human', 'Hive Ganger', 'Ganger', 10, 1, false),
    hint: 'Competent and trusted fighters, accustomed to brutality and violence.',
    prerequisites: [
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (3).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hab-wise',
        snippet: 'Gangers are accustomed to the deadly environs of the underhives. They gain +Rank to Cunning and Insight tests when interacting with underworld or similar characters.',
      },
    ],
    wargearString:
      'Hive leathers or outlandish attire, ' +
      'stubber, autogun or combat shotgun, ' +
      'knife or brass knuckles, ' +
      'flask of amasec or 3 doses of narcotics, ' +
      'lho-sticks, ' +
      'charm (graphic memento), ' +
      'gang trappings',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'stubber, autogun or combat shotgun',
        options: [
          { name: 'Stubber' },
          { name: 'Autogun' },
          { name: 'Combat Shotgun' },
        ],
      },
      {
        name: 'knife or brass knuckles',
        options: [
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: 'flask of amasec or 3 doses of narcotics',
        options: [
          { name: 'Flask of amasec' },
          { name: 'doses of narcotics', amount: 3 },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'charm', variant: 'graphic memento' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 118, 'core-human', 'Hive Ganger', 'Heavy', 20, 1, false),
    hint: 'A strong warrior, bigger and burlier than ordinary gangers.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Pure muscle',
        snippet: 'Heavies are capable of shouldering many weapons other gangers find difficult to wield properly. They gain +Rank when determining their Strength for the Heavy weapon trait. Additionally, they gain +1/2 Rank damage to their melee attacks.',
      },
    ],
    wargearString:
      'Hive leathers or flak armor, heavy stubber or chainaxe, knife, lho-sticks, charm (graphic memento) or dog, gang trappings.',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'stubber, knife or brass knuckles',
        options: [
          { name: 'Stubber' },
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: '3 doses of narcotics or graphic memento',
        options: [
          { name: 'doses of narcotics', amount: 3 },
          { name: 'graphic memento' },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 118, 'core-human', 'Hive Ganger', 'Gang Leader', 30, 2, false),
    hint: 'A terrifying leader, leading by strength and will',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'strength', threshold: 3 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (4).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Bigger and badder',
        snippet: 'The gang leaders are often the biggest (next to the heavies) and the baddest member of his crew. The gang leader gains +Rank bonus to his Gang Skill. During a combat, he also gains +1/2 Rank bonus to his Resolve tests',
      },
    ],
    wargearString:
      'Outlandish garb or attire, ' +
      'flak armor or carapace armor, ' +
      'chainsword, bolt pistol or plasma pistol, ' +
      'charm (grisly trophies) or dog, ' +
      'stimm-injector, ' +
      'lho sticks, ' +
      'gang trappings.',
    wargear: [
      {
        name: 'Outlandish garb or outlandish attire',
        options: [
          { name: 'Outlandish garb' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'flak armor or carapace armor',
        options: [
          { name: 'Flak Armour' },
          { name: 'Carapace Armour' },
        ],
      },
      {
        name: 'chainsword, bolt pistol or plasma pistol',
        options: [
          { name: 'Chain Sword' },
          { name: 'Bolt Pistol' },
          { name: 'Plasma Pistol' },
        ],
      },
      {
        name: 'charm (grisly trophies) or dog',
        options: [
          { name: 'Charm', variant: 'Grisly Thropies)' },
          { name: 'Dog' },
        ],
      },
      { name: 'Stimm-injector' },
      { name: 'Lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
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
    archetypeFeatures: [
      {
        name: 'Groomed from Birth',
        snippet: 'Navis Scions begin play without an initial mutation. Additionally, they gain a +½ Rank bonus to Persuasion skill tests.',
      },
    ],
    // new
    wargearString: 'Staff, Mesh Armour, nobilite robes, charm (silk headscarf), flask of amasec',
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
    species: [ 'Human (core)', 'Navigator (pax)' ],
    speciesKey: [ 'core-human', 'pax-navigator' ],
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 1 },
      { group: 'skills', value: 'persuasion', threshold: 1 },
      { group: 'skills', value: 'deception', threshold: 1 },
    ],
    keywords: 'Imperium,Navis Nobilite,<Navis House>,Nobility',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'House Operative',
        snippet: 'A Nobilite Emissary gains +Rank to opposed skill tests to resist the effects of seduction and interrogation. In addition, the Nobilite Emissary character may utilize an interrogator’s questions and techniques to garner detailed information about the nature, aims, and motivations of the interrogator himself and those he works for. If the Nobilite Emissary is subjected to interrogation, and wins an opposed test, he may immediately make an Awareness Test (DN 4). On a success and for every shifted icon, he can learn one detail about his captors (what he can and cannot learn is ultimately up to the GM but it should be something valuable).',
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
    archetypeFeatures: [
      {
        name: 'Warp Guide',
        snippet: 'The Navigator Primaris gains +Rank bonus dice to Pilot skill tests when steering a voidship through the Warp. Additionally, he gains +½ Rank to Conviction tests.',
      },
    ],
    wargearString:
      'Dueling Laspistol or hand cannon, staff, Mesh Armour, emperor’s tarot deck, nobilite robes, ' +
      'charm (silk headscarf), charm (navis occulta), micro-bead.',
    wargear: [
      {
        name: 'Dueling Laspistol or hand cannon',
        options: [
          { name: 'Dueling Laspistol' },
          { name: 'Hand Cannon' },
        ],
      },
      { name: 'Staff' },
      { name: 'Mesh Armour' },
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
    archetypeFeatures: [
      {
        name: 'Exalted Lineage',
        snippet: 'As the head of a family of the most ancient and powerful houses of the Imperium, the Novator is able to utilize his prestige among the nobility of the Imperium. The Novator may call upon his lineage in social situations and gains +Rank bonus to any Interaction Skill tests when dealing with characters with both the <Nobility> and <Imperium> keywords',
      },
    ],
    wargearString:
      'Digi-weapon or infernal pistol, staff, Mesh Armour, emperor’s tarot deck, ' +
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
      { name: 'Mesh Armour' },
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
    archetypeFeatures: [
      {
        name: 'The Call of the Paternova',
        snippet: 'As Heir-Apparents are inexorably drawn to each, their power waxes in preparation of contending to become the next Paternova. Heir-Apparents gains a chosen Navigator Mutation with each Rank and also gain +Rank when utilizing his Lidless Stare power.',
      },
    ],
    wargearString:
      'Hotshot laspistol or hand cannon, staff, Mesh Armour or carapace Armour, emperor’s tarot deck, ' +
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
        name: 'Mesh Armour or Carapace',
        options: [
          { name: 'Mesh Armour' },
          { name: 'Carapace Armour' },
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
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Blank', 0, 1),
    stub: false,
    hint: 'An untouchable, whose aura of ‘wrongness’ sets them apart from his fellow man.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -1,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Soulless Aura',
        snippet: 'All Characters within the Untouchables Willpower x ½ Rank meters suffer a +Rank DN increase to all Social skill test. Characters with the <Eldar> or <Psyker> keyword suffer a single point of Shock for every Round they remain within this area of effect.',
        description:
          '<p>The Many feel the Untouchable’s unnatural essence as a subconscious irritation. ' +
          'Those unused to this often find their emotional stability irritated to distraction ' +
          'from his mere presence. Characters within a distance of meters equal to the ' +
          'Untouchables Willpower x ½ Rank suffer a +Rank increase to all Social skill test Difficulty Numbers.</p>' +
          '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer a single point of Shock for every Round they remain within this area of effect.</p>'
      },
    ],
    wargear: [
      {
        name: 'Rag-robes, uniform or street clothes',
        options: [
          { name: 'Rag-Robes' },
          { name: 'Uniform' },
          { name: 'Street Clothes' },
        ],
      },
      {
        name: 'sword or mace or autogun',
        options: [
          { name: 'Sword' },
          { name: 'Mace' },
          { name: 'Autogun' },
        ],
      },
      {
        name: 'null-limiter or Flak Armour',
        options: [
          { name: 'Null-Limiter' },
          { name: 'Flak Armour' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Null', 20, 2),
    stub: false,
    hint: 'A more unnatural untouchable, whose presence can harm the psychically gifted and ward of the daemonic.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -2,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Null-Field',
        snippet: '',
        description:
          '<p>Untouchables of greater power present a stronger aversion to the Immaterium, encompassing a wider area surrounding them. In this region, psykers see their powers fail and despair, knowing an Untouchable is nearby. The characters Psychic Null traits extend outwards, protecting a number of allies equal to his Rank who are nearby, no further than a distance in meters equal to his Passive Awareness +½ Rank. Characters with the <Eldar> or <Psyker> keyword suffer ½ Rank points of Shock for every Round they remain within this area of effect.</p>'
      },
    ],
    // Rag-robes, uniform or street clothes, trade tools, laspistol or autopistol, null-limiter or Flak Armour.
    wargear: [
      {
        name: 'Rag-robes, uniform or street clothes',
        options: [
          { name: 'Rag-Robes' },
          { name: 'Uniform' },
          { name: 'Street Clothes' },
        ],
      },
      { name: 'trade tools' },
      {
        name: 'laspistol or autopistol',
        options: [
          { name: 'Laspistol' },
          { name: 'Autopistol' },
        ],
      },
      {
        name: 'null-limiter or Flak Armour',
        options: [
          { name: 'Null-Limiter' },
          { name: 'Flak Armour' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Pariah', 50, 3),
    stub: false,
    hint: 'A particularly powerful untouchable, whose aura is palpable and capable of disrupting the strongest of psychic manifestations.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'survival', threshold: 3 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -3,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Bane of the Immaterium',
        snippet:
          '<Psyker>s within Willpower x ½ Rank suffer + Rank DN to manifest Powers. ' +
          '<Eldar> and <Psyker>s in range also suffer Rank points of shock each round. ' +
          'The Character is healed by an equal amount shock that is suffered. ' +
          'Also, <Deamonic>s within range suffer +½ Rank DN to Skill Tests.',
        description:
          '<p>The abyss where the Untouchable’s soul should be is unrelenting in its psychic hemorrhage, ' +
          'and increases the anathema he projects into larger areas. ' +
          'Psykers can suddenly find themselves diminished as an Untouchable charges forward, ' +
          'emanating a wavefront they find terrible to contemplate. All character with the &lt;Psyker&gt; ' +
          'keyword increase the DN to manifest their powers by +Rank while they remain within a ' +
          'distance from the untouchable equal to his Willpower x ½ Rank.</p>' +
          '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer Rank points of Shock for ' +
          'every Round they remain within this area of effect, which automatically ' +
          'heal any Shock the Untouchable may have incurred with an equal amount. ' +
          'Additionally, creatures with the &lt;Daemonic&gt; keyword suffer a penalty to all skill tests ' +
          'equal to the Untouchables ½ Rank within the same area of effect.</p>',
      },
    ],
    // Flak or Mesh Armour or symbol of inquisitorial authority, boltgun or bolt pistol and Chain Sword, null-limiter
    wargear: [
      {
        name: 'Flak or Mesh Armour or symbol of inquisitorial authority',
        options: [
          { name: 'Flak Armour' },
          { name: 'Mesh Armour' },
          { name: 'Symbol of Authority' },
        ],
      },
      {
        name: 'boltgun or bolt pistol and Chain Sword',
        options: [
          { name: 'Boltgun' },
          { name: 'Bolt Pistol and Chain Sword' },
        ],
      },
      { name: 'Null-Limiter' },
    ],
  },
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
