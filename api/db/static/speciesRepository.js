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

const statMax = function (str, agi, tou, int, wil, fel, ini, spe) {
  return {
    attributeMaximums: [
      { name: 'Strength', value: str },
      { name: 'Agility', value: agi },
      { name: 'Toughness', value: tou },
      { name: 'Intellect', value: int },
      { name: 'Willpower', value: wil },
      { name: 'Fellowship', value: fel },
      { name: 'Initiative', value: ini },
    ],
    traitMaximums: [
      { name: 'Speed', value: spe },
    ],
  }
};

const simpleStub = function (sourceKey, sourcePage, group, name, hint, bp, tier) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    group,
    cost: bp,
    baseTier: tier,
    stub: true,
    keywords: [],
    ...statMax(8,8,8,8,8,8,8,8),
  };
};

const coreRep = [
  {
    key: 'core-human',
    name: 'Human',
    group: 'Mankind',
    hint: 'The humble human',
    description: 'Each human is just one of untold billions spread across the galaxy over millions of planets. Those in the Imperium live under the authority of the Emperor, but He has not stirred from His Golden Throne on Holy Terra for over ten thousand years. The remorseless government agencies of the Imperium use His authority to mercilessly rule Humanity according to their interpretations of the Emperor’s will. Every planet has its own culture and unique interpretations of the Imperium’s laws and sacred beliefs, but a few things are especially common.',
    source: { ...source.core, page: 86 },
    cost: 0,
    baseTier: 1,
    speed: 6,
    speciesFeatures: [],
    avatar: null,
  },
  {
    key: 'coreab-ratling',
    name: 'Ratling',
    group: 'Mankind',
    hint: 'Half-man by name, but not by nature',
    description:
      'These small Abhumans are loud, lecherous, hungry, and always on the lookout for something to steal. ' +
      'They like to go into battle barefoot so they can feel the ground beneath their feet. ' +
      'They are often referred to as akin to a plague of rats, for a squad of these Ratlings can ' +
      'strip an Imperial Guard canteen bare in the time it takes the cook to call a squad to mess. ' +
      'Despite this, Ratlings are considered a valuable resource for the Astra Militarum.',
    source: { ...source.coreab },
    cost: 15,
    baseTier: 1,
    speed: 5,
    size: 'Small',
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Strength by 1. Increase Agility by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'agility', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'strength', modifier: -1 },
        ],
      },
      {
        name: 'Conniving',
        snippet: 'You gain the Scum Keyword',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Scum' },
        ],
      },
      {
        name: 'Abhuman',
        snippet: '+1DN to all interaction tests with characters possessing the Imperium keyword.',
      },
      {
        name: 'Born Sharpshooter',
        snippet: '+2d to all Ballistic Skill tests.',
      }
    ],
    avatar: null,
    variant: 'core-human',
  },
  {
    key: 'coreab-ogryn',
    name: 'Ogryn',
    group: 'Mankind',
    hint: 'The brutal, eeh... human?',
    source: { ...source.coreab },
    description:
      'Ogryns are the heavy assault backbone of the Astra Militarum, ' +
      'usually attached to the various regiments of the Imperial Guard. ' +
      'These Abhumans are loyal, stalwart, brutal, and extremely strong. ' +
      'They are capable of shrugging off damage that would slaughter a human outright; in short, ' +
      'they make perfect assault and shock troopers when the Imperial Guard requires a heavy fist. ' +
      'Some Ogryns take this to heart, bearing shields and clubs to act as melee powerhouses, ' +
      'whilst many others use their prized (and heavily constructed) Ripper guns.',
    cost: 15,
    baseTier: 2,
    speed: 4,
    size: 'Large',
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Fellowship and Intellect by 1. Increase Strength and Toughness by 2.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'intellect', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 2 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 2 },
        ],
      },
      {
        name: 'Abhuman',
        snippet: '+1DN to all interaction tests with characters possessing the Imperium keyword.',
      },
      {
        name: 'Burly',
        snippet: '+2d to all Intimidation tests.',
      },
    ],
    avatar: null,
    variant: 'core-human',
  },
  {
    key: 'core-eldar',
    name: 'Eldar',
    group: 'Aeldari',
    hint: 'The Mysterious Aeldari',
    description:
      'The Aeldari ruled the galaxy for millions of years. During their rise to power, ' +
      'this species uncovered secrets of the galaxy’s very essence, ' +
      'learning to create and shatter entire worlds. They discovered and developed the webway, ' +
      'enabling them to quickly travel across the galaxy without the risk of warp travel. ' +
      'Their collective knowledge eventually reached the point that any drive to learn dampened, ' +
      'as they could accomplish virtually any task they could imagine. ' +
      'The longlived Aeldari existed in luxury, pursuing whatever interests drew their attention. ' +
      'Eventually, such leisure led to increasingly hedonistic pursuits that spread in cults ' +
      'across their entire population. Those moral failings, over time, coalesced within the warp, ' +
      'giving birth to Slaanesh.',
    source: { ...source.core, page: 90 },
    cost: 10,
    baseTier: 1,
    speed: 8,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Agility by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'agility', modifier: 1 },
        ],
      },
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve tests. Failing a Willpower-based test in a scene involving intense emotion grants the GM +1 Ruin.',
      },
      {
        name: 'Outsider',
        snippet: '+2DN to all Interaction tests with those with the Keyword <Imperium>.',
      },
      {
        name: 'Psychosensitive',
        snippet: 'All Eldar may purchase 1 Minor Psychic Power if they also purchase the Psychic Mastery skill. This purchase also gives them the Psyker keyword. In addition, the Tier Restriction for Maximum Psychic Powers for Eldar Characters is increased by 1 to accommodate this purchase.',
        psychicDisciplines: [ 'Minor' ],
        psychicPowers: [
          { name: 'psychosensitive', selected: '', query: { discipline: 'Minor' }, options: [], free: false },
        ],
      },
    ],
    avatar: null,
  },
  {
    key: 'core-ork',
    name: 'Ork',
    group: 'Orks',
    hint: 'The savage brute',
    description:
      'Orks are ubiquitous throughout the galaxy. Their incomprehensible physiology and ecosystem ' +
      'is capable of actively proliferating in even the most hostile of environments—from ash ' +
      'wastes, to overgrown Death Worlds, to barren asteroids. Even a small tribe of a few dozen ' +
      'Orks can inexplicably grow into a force of tens of thousands in relatively short order. ' +
      'The biological mechanisms behind this growth and adaptability confound even the most ' +
      'accomplished scholars of the Adeptus Mechanicus. There are no consistent requirements for ' +
      'Orks to thrive within any climate. However, their functionality is clearly evident on the ' +
      'countless worlds they have subsumed.',
    source: { ...source.core, page: 88 },
    cost: 10,
    baseTier: 1,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Toughness by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
        ],
      },
      {
        name: 'Outsider',
        snippet: '+2DN to all Interaction tests with those with the Keyword <Imperium>.',
      },
      {
        name: 'Orky',
        snippet: '+1 to all Intimidation tests.',
      },
      {
        name: 'Bigger is Better',
        snippet: 'Orks calculate Influence using their Strength in place of Fellowship.',
      },
    ],
    avatar: null,
  },
  {
    key: 'core-adeptus-astartes',
    name: 'Adeptus Astartes',
    group: 'Mankind',
    source: { ...source.core, page: 92 },
    cost: 50,
    baseTier: 2,
    speed: 7,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Strength, Ability, Toughness and Resolve by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'agility', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
        ],
      },
      {
        name: 'Angel of Death',
        snippet: 'Space Marines add +½ Rank icons to any successful attack against a Mob.',
      },
      {
        name: 'Honour the Chapter',
        snippet: 'You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter.',
      },
      {
        name: 'Space Marine Implants',
        snippet: 'Space Marines do not bleed. Space Marines gain +1 bonus dice as a situational modifier to any test if the Game Master deems it appropriate for one of the 19 implants.',
      },
    ],
    hint: 'the sword of mankind',
    description: 'Prior to launching the Great Crusade, the Emperor of Man created the Adeptus Astartes and assembled them into his legions. Each began as a mortal man, but a combination of genetic manipulations and physical implantations transformed each into a superhuman warrior—an Imperial Space Marine. The Emperor initially created twenty legions of Space Marines, each one containing vast numbers. All members of each of the twenty legions used a gene-seed developed from one of the twenty godlike Primarchs, whom the emperor also created. During the Great Crusade, Primarchs served as the generals of the Space Marine Legions, as the Emperor strove to reunify all lost human worlds, bringing the galaxy into Imperial Compliance.',
    avatar: null,
  },
  {
    key: 'core-primaris-astartes',
    name: 'Primaris Astartes',
    group: 'Mankind',
    hint: 'the newborn breed',
    description: 'In the wake of the Horus Heresy, after completing the Codex Astartes, Primarch Roboute Guilliman decided that the Adeptus Astartes needed further enhancements to better defend the Imperium from outside threats—including those Space Marines who had turned traitor. He assigned the job of improving them to Archmagos Dominus Belisarius Cawl of the Adeptus Mechanicus. To aid the Tech-Priest, Guilliman provided him with an archive of genetic material taken from his fellow Primarchs, called the Sangprimus Portum.',
    source: { ...source.core, page: 98 },
    cost: 100,
    baseTier: 4,
    speed: 7,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Strength by 2, increase Ability, Toughness and Resolve by 1 and increase Wounds by 4.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 2 },
          { targetGroup: 'attributes', targetValue: 'agility', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'wound', modifier: 4 },
        ],
      },
      {
        name: 'Angel of Death',
        snippet: 'Space Marines add +½ Rank icons to any successful attack against a Mob.',
      },
      {
        name: 'Honour the Chapter (Primaris)',
        snippet: 'You are subject to the orders of your chapter master and the beliefs and traditions of your chapter. Primaris Space Marines gain the fi rst special rule from their Chapter and ignore any penalties or drawbacks from the second if it is marked as being related to the Chapter’s gene-seed.',
      },
      {
        name: 'Space Marine Implants',
        snippet: 'Space Marines do not bleed. Space Marines gain +1 bonus dice as a situational modifier to any test if the Game Master deems it appropriate for one of the 19 implants.',
      },
    ],
    avatar: null,
  },
];

const homebrewReps = [
  simpleStub('heva', 6, 'Aeldari', 'Dark Eldar', 'From the shadows, from the Dark City', 20, 1),
  simpleStub('lotn', 3, 'Necrons', 'Necron', 'Living metal form the deepest slumber', 60, 3),
  {
    ...simpleStub('aaoa', 10, 'Mankind', 'Death World Origin', 'Humans from the deadly worlds', 10, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 Strength or +1 Toughness',
        options: [
          { name: 'Strength', modifications: [ { name: 'Strength', targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ] },
          { name: 'Toughness', modifications: [ { name: 'Toughness', targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ] },
        ],
      },
      {
        name: 'Bitter Survivor',
        snippet: 'You add +1 bonus die to all Soak Tests and may re-roll one Defiance roll per scene.',
        description:
          'The character clings onto life and is well-versed in eluding death’s grasp. ' +
          'The character receives +1d on all Soak tests and may re-roll one Defiance roll per scene.'
      },
      {
        name: 'Not One of Us',
        snippet: 'You suffer +1 DN to Interaction Tests with non-Deathworldlers.',
        description:
          'Deathworlders don’t easily trust those who haven’t endured the same kind of hostile environments. ' +
          'They suffer +1DN to all Interaction tests with those who aren’t Deathworlders.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 10, 'Mankind', 'Hive World Origin', 'Humans from the overcrowded cities', 10, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 Agility or +1 Initiative',
        options: [
          { name: 'Agility', modifications: [ { name: 'Agility', targetGroup: 'attributes', targetValue: 'agility', modifier: 1 } ] },
          { name: 'Initiative', modifications: [ { name: 'Initiative', targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ] },
        ],
      },
      {
        name: 'Caves of Steel',
        snippet: 'You add +1 bonus die to Tech Tests.',
        description:
          'The character has been surrounded by technology, some of which may be centuries or millennia old, ' +
          'for their entire lives. The character gains +1 to Tech tests.'
      },
      {
        name: 'Hivebound',
        snippet: 'You suffer +1 DN to Survival Tests when not in urban or manufactured environment.',
        description:
          'Hivers are unaccustomed to the ways of wild, untamed places. ' +
          'Even the wilderness of underhive levels and abandoned habs is still built around artificial structures. ' +
          'Hiveworlders suffer +1DN on all Survival tests made when not in an urban or manufactured environment.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 10, 'Mankind', 'Voidborn Origin', 'Humans form the void of space', 10, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 Willpower or +1 Initiative',
        options: [
          { name: 'Willpower', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
          { name: 'Initiative', modifications: [ { name: 'Initiative', targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ] },
        ],
      },
      {
        name: 'Voidwise',
        snippet: 'You add +1 bonus die to tests resisting radiation and you ignore all penalties to actions caused by low- or Zero-gravity.',
        description:
          'The character is accustomed to the vagaries of life aboard ship or station and ' +
          'is well-versed in protective rites and emergency doctrines. ' +
          'The character gains +1d on all tests to resist radiation and ignores all ' +
          'penalties to action caused by low- or zero-gravity environments.'
      },
      {
        name: 'Ill-Omened',
        snippet: 'Your Interaction Tests with non-Voidbornd use 2 wrath dice and you can\'t crit.',
        description:
          'Voidborn are considered strange and inauspicious by others, ' +
          'who look for even the slightest sign of ill-fortune. ' +
          'When attempting an interaction test with a non-Voidborn, ' +
          'two dice are treated as Wrath dice, rather than one, ' +
          'and the character is unable to score criticals on these tests.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 11, 'Mankind', 'Forge World Origin', 'Humans form the mechanical grindhouse', 10, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 to one Attribute of your choice',
        options: [
          { name: 'Strength', modifications: [ { name: 'Strength', targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ] },
          { name: 'Agility', modifications: [ { name: 'Agility', targetGroup: 'attributes', targetValue: 'agility', modifier: 1 } ] },
          { name: 'Toughness', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
          { name: 'Intellect', modifications: [ { name: 'Intellect', targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 } ] },
          { name: 'Fellowship', modifications: [ { name: 'Fellowship', targetGroup: 'attributes', targetValue: 'fellowship', modifier: 1 } ] },
          { name: 'Willpower', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
          { name: 'Initiative', modifications: [ { name: 'Initiative', targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ] },
        ],
      },
      {
        name: 'Ave Omnissiah',
        snippet: 'You ad +1 bonus die to Tech and Scholar Tests relating to the Adeptus Mechanicus.',
        description:
          'The character has memorised countless operation litanies and maintenance hymnals, ' +
          'giving them an innate familiarity with machines and the Cult Mechanicus. ' +
          'They receive +1d on all Tech tests and Scholar tests relating to the Adeptus Mechanicus.'
      },
      {
        name: 'Stranger to the Church',
        snippet: 'You suffer +2 DN to Lore Tests relating to the Imperial Creed. You may not take archetypes with the Adeptus Ministorum keyword.',
        description:
          'Forgeworlders are unfamiliar with the ways of the Ministorum and the Imperial Creed ' +
          'and suffer +2DN on all Lore tests relating to the Imperial Creed. ' +
          'The character may not take any archetypes with the Adeptus Ministorum keyword.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 11, 'Mankind', 'Scholar Progenium Origin', 'Humans form the nobel orphanage', 25, 2),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 to Toughness or Willpower',
        options: [
          { name: 'Toughness', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
          { name: 'Willpower', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
        ],
      },
      {
        name: 'Schola Education (1)',
        snippet: 'You add +1 bonus die to any two of the following skill tests.',
        description:
          'The character was groomed from a young age to be an example to others. ' +
          'You gain +1d on any two of the following skills, chosen during character creation: Insight, Intimidate, Leadership, Scholar.',
        options: [
          { name: 'Insight', modifications: [ { name: 'Insight', targetGroup: 'skills', targetValue: 'insight', modifier: 1 } ] },
          { name: 'Intimidate', modifications: [ { name: 'Intimidate', targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 } ] },
          { name: 'Leadership', modifications: [ { name: 'Leadership', targetGroup: 'skills', targetValue: 'leadership', modifier: 1 } ] },
          { name: 'Scholar', modifications: [ { name: 'Scholar', targetGroup: 'skills', targetValue: 'Scholar', modifier: 1 } ] },
        ],
      },

      {
        name: 'Schola Education (2)',
        snippet: 'You add +1 bonus die to any two of the following skill tests.',
        description:
          'The character was groomed from a young age to be an example to others. ' +
          'You gain +1d on any two of the following skills, chosen during character creation: Insight, Intimidate, Leadership, Scholar.',
        options: [
          { name: 'Insight', modifications: [ { name: 'Insight', targetGroup: 'skills', targetValue: 'insight', modifier: 1 } ] },
          { name: 'Intimidate', modifications: [ { name: 'Intimidate', targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 } ] },
          { name: 'Leadership', modifications: [ { name: 'Leadership', targetGroup: 'skills', targetValue: 'leadership', modifier: 1 } ] },
          { name: 'Scholar', modifications: [ { name: 'Scholar', targetGroup: 'skills', targetValue: 'Scholar', modifier: 1 } ] },
        ],
      },
      {
        name: 'Cloistered Upbringing',
        snippet: 'You suffer +2 DN to non-hostile Interaction Tests when dealing with characters with the Scum keyword.',
        description:
          'Progena have little patience for, or understanding of, the dregs of society. ' +
          'The character suffers +2DN on all non-hostile Interaction tests made when dealing with characters who have the Scum keyword.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 11, 'Mankind', 'Shrine World Origin', 'Humans form the cradle of the imperial creed', 10, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: '+1 to Willpower or Fellowship',
        options: [
          { name: 'Fellowship', modifications: [ { name: 'Fellowship', targetGroup: 'attributes', targetValue: 'fellowship', modifier: 1 } ] },
          { name: 'Willpower', modifications: [ { name: 'Willpower', targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ] },
        ],
      },
      {
        name: 'The Scorn of the Devout',
        snippet: 'You add +1 bonus die to Resolve and Conviction Tests and +1 bonus die to Weapon Skill Tests against enemies with the Heretic Keyword.',
        description:
          'The character is filled with holy hatred and fury. ' +
          'They receive +1 to Resolve and Conviction, and +1d on all Weapon Skill tests made to attack enemies with the Heretic keyword.'
      },
      {
        name: 'Abhor the Unhallowed',
        snippet: 'You suffer +1 DN to Scholar and Tech Tests related to Chaos or Heretic items, or those of Xenos Origin.',
        description:
          'The character is filled with an instinctive revulsion for the unholy or unclean. ' +
          'They suffer +1DN on all Scholar or Tech tests relating to items or characters with the Heretic or ' +
          'Chaos keywords, or with any keyword belonging to a Xenos species.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 16, 'Mankind', 'Pharia', 'The blank, the untouched, the hated', 30, 2),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Abhorrent Presence',
        snippet: 'You Suffer +2 DN to Interaction Tests with non-Pariahs and +4 DN with Psykers.',
        description:
          '+2DN to all interaction tests with non-pariah characters. +4DN to interaction tests with psykers. Pariahs reduce their Influence by 1.',
        modifications: [ { targetGroup: 'traits', targetValue: 'Influence', modifier: -1 } ]
      },
      {
        name: 'Indistinguishable from Human',
        snippet: 'You are considered Human for all purposes.',
        description:
          'Pariahs are considered to be Human for all purposes.'
      },
      {
        name: 'Psychic Abomination',
        snippet: 'Within Willpower Meters, each Psychic Power that originate or target that area increase their DN by Rank x2',
        description:
          'A pariah cannot be directly affected by psychic powers or other warp phenomena, whether positive or negative. ' +
          'A pariah can never gain the Psyker keyword, nor can they ever gain Faith points or any other ability that requires drawing upon the Warp for power. ' +
          'Any psychic powers attempted or targeted within a number of metres of the Pariah equal to their Willpower increase their DN by twice the Pariah’s Rank.'
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 17, 'Mankind', 'Squat', 'Abhuman and dwarfish underground variant', 15, 1),
    ...statMax(9,7,10,8,10,8,7,6),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Toughness and Willpower by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 },
        ],
      },
      {
        name: 'Abhuman',
        snippet: '+1DN to all interaction tests with characters possessing the Imperium keyword.',
      },
      {
        name: 'Grudges',
        snippet: 'You add +1 bonus die to Melee Attack tests against characters possessing the Ork or Chaos Keyword. ' +
          'You suffer +2 DN to non-hostile Interaction tests against the same targets.',
        description:
          '+1d to all melee attacks against characters possessing the Ork or Chaos keywords. ' +
          '+2DN penalty on all non-hostile Interaction skill tests vs. targets possessing the Ork or Chaos keywords.'
      },
      {
        name: 'Technology Without Superstition',
        snippet: 'You add +1 bonus die to Tech Tests.',
        description:
          '+1d bonus to all Tech tests.'
      },
      {
        name: 'Legacy of the Cataclysm',
        snippet: 'You begin play with 3 points corruption.',
        description:
          'You begin play with +3 corruption.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('aaoa', 18, 'Mankind', 'Beastman', 'Touched by fate... eeh chaos.', 20, 1),
    stub: false,
    speed: 6,
    ...statMax(10,10,12,6,8,6,10,9),
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Strength and Toughness by 1, and Wounds by 2. Decrease Intellect and Fellowship by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'intellect', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
          { targetGroup: 'traits', targetValue: 'wounds', modifier: 2 },
        ],
      },
      {
        name: 'Reviled Abhuman',
        snippet: 'You suffer +2 DN to Interaction Tests with characters not-possessing the Chaos keyword.',
      },
      {
        name: 'Horns',
        snippet: 'You may make melee attacks with your horns (5+1ED; AP 0). Thus, you are always armed.',
      },
      {
        name: 'Bestial Savagery',
        snippet: 'You add +1 bonus die to Intimidation tests.',
      },
      {
        name: 'Child of Chaos',
        snippet: 'You begin play with 3 points corruption.',
        description:
          'You begin play with +3 corruption.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('pax', 14, 'Mankind', 'Navigator', 'Blessed with the third eye', 50, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Fellowship by 1. Increase Willpower by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 },
        ],
      },
      {
        name: 'Warp Eye',
        snippet: 'Gain the Lidless Stare Power. Lean or improve powers with each Rank or point buy.',
        description:
          'All Navigators begin with the Lidless Stare Navigator power and may select an ' +
          'additional navigator power or improve an existing power (see Navigator Powers) at each ' +
          'additional Rank. They may also purchase additional powers, subject to Tier ' +
          'restrictions (as if they were psychic powers), including powers gained for free.',
        psychicDisciplines: [ 'Navigator Powers'],
        psychicPowers: [
          { name: 'navigatorPowers', selected: 'The Lidless Stare', query: { name: 'The Lidless Stare' }, options: [], free: true },
        ],
      },
      {
        name: 'Stared into the Abyss',
        snippet: 'Gain +1 die to Fear tests against daemons. +2 DN to Melificarum, Chaos and Daemonic Powers against you.',
        description:
          'All Navigators have witnessed the horrors of the Warp many times, because of this ' +
          'they gain +1 bonus die to Fear tests when confronted by any daemonic creatures.' +
          'Navigators are also resistant to Chaos, so any psychic powers from the Malificarum discipline ' +
          'or possessing the <Chaos> or <Daemonic> keywords have a reduced effect against Navigators, ' +
          'with the Navigator inflicting a +2 DN penalty to such powers that target him.',
      },
      {
        name: 'Are Navigators Psykers?',
        snippet: 'You are considered a Psyker. But you can never lear powers, the keyword or respective ascension packages.',
        description:
          'Navigators are not marked as psykers in the traditional sense within the Imperium, ' +
          'though they do have a connection with the warp and use its power to fuel their abilities. ' +
          'For all game purposes, however, a Navigator character is considered a psyker. ' +
          'This means that weapons, powers, and creatures that have special effects on a character ' +
          'that possess the Psyker keyword will have similar effects on a Navigator character. ' +
          'However, Navigators can never gain the Psyker keyword, nor gain psychic powers or take the Psychic Revelation ascension package.',
      },
      {
        name: 'Navigator Mutation',
        snippet: 'Roll a random mutation or select Strangely Jointed Limbs, Elongated Form, Pale and Hairless Flesh, Eyes as Dark as the Void.',
        description:
          'Navigators begin play with a single mutations randomly determined from Table: Navigator Mutations, ' +
          'or chosen from the following options: ' +
          'Strangely Jointed Limbs, Elongated Form, Pale and Hairless Flesh, Eyes as Dark as the Void.',
        options: [
          { name: 'Strangely Jointed Limbs', snippet: 'You gain +2 bd to Agility attribute tests when performing acts of contortionism or similar acrobatic feats requiring flexibility.' },
          { name: 'Elongated Form', snippet: 'You lose -1 Toughness permanently. Re-roll this mutation if you already have the Bloated Form mutation.' },
          { name: 'Pale and Hairless Flesh', snippet: 'Your skin is pale, marbled with veins and completely without hair.' },
          { name: 'Eyes as Dark as the Void', snippet: 'you gain the ability to see in the dark, and never suffer penalties to your vision from it.' },
          { name: 'Withered Form', snippet: 'You reduce your Strength Attribute species maximum by 1 permanently and reduce your Speed by 2. Re-roll this mutation if you already have the Bloated Form mutation.' },
          { name: 'Bloated Form', snippet: 'You gain 1 Resilience and increase your Shock value by 2 but may no longer run. Re-roll this mutation if you already have the Elongated Form or Withered Form mutations.' },
          { name: 'Membranous Growths', snippet: 'you suffer -1 to your Fellowship attribute species maximum.' },
          { name: 'Inhuman Visage', snippet: 'You gain the Fear (1) Trait.' },
          { name: 'Fingers like Talons', snippet: 'Your unarmed attacks gain an AP value of -1' },
          { name: 'Teeth as Sharp as Needles', snippet: 'Your unarmed attacks gain an AP value of -1 and suffer -1 to your Fellowship attribute species maximum.' },
          { name: 'Disturbing Grace', snippet: 'You gain +2 Speed' },
          { name: 'Strange Vitality', snippet: 'You gain +2 Resilience.' },
          { name: 'Unnatural Presence', snippet: 'All your tests that involve positive social interaction increase their DN by 1, whilst all those that involve intimidation or inducing fear gain +1 bd.' },
        ],
      },
      {
        name: 'Navigating the Warp',
        snippet: 'Use Willpower instead of Agility for warp-travel related Pilot tests.',
        description:
          'When making Pilot tests when traveling the warp (see Travelling the Immaterium, ' +
          'page 249 of the Wrath & Glory core rulebook), a Navigator combines her Pilot skill with ' +
          'her Willpower Attribute instead of Intellect',
      }
    ],
  },
  {
    ...simpleStub('pax', 18, 'Mankind', 'Untouchable', 'The soulless', 20, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'The Untouchable and the Profane',
        snippet: 'May not use, utilize or suffer from force, warp or deamon weapons.',
        description:
          'A force weapon, daemon weapon, or occult artefact (or the like) in the hands of an ' +
          'untouchable is merely a weapon or object of its type. The character may not unleash or ' +
          'benefit from any of the weapon’s special powers or abilities, or (in the case of a daemon weapon) master it. ' +
          'However, the same also applies to such items and weapons used against the untouchable. ' +
          'Other than base damage listed (a sword in the guts is still a sword in the guts after all) ' +
          'any other particular effect such a weapon would normally have on the untouchable is likewise ignored.',
      },
      {
        name: 'Psychic Null',
        snippet: 'Immune to positive and negative effects from Powers, unnatural talents, traits or abilities.',
        description:
          'An untouchable (thanks to his special nature) is spared the perils of interaction with the Warp. ' +
          'The untouchable can never gain nor benefit from the positive effects of psychic powers ' +
          'or any other related unnatural talents, traits, or abilities that call on the Warp for ' +
          'power, including sorcery, dark pacts or acts of faith. ' +
          'They may not take the psychic revelation ascension and can never gain the <Psyker> keyword. ' +
          'However, they are completely immune to the negative consequences of psychic power and ' +
          'similar abilities, and ignore any such effects that target them outright.',
      },
      {
        name: 'Soulless',
        snippet: '+1 DN to all interactions tests with other characters.',
        description:
          'Psychic Untouchables are incredibly rare, and often live lonely and short lives due ' +
          'to the effect they have on all living beings that get near them. ' +
          'They suffer +1 DN to all interaction tests with other characters.',
      },
      {
        name: 'Human',
        snippet: 'May select Archetypes for Humans and Untouchables.',
        description:
          'Untouchables can take any archetypes listed with a prerequisite species of Human. ' +
          'In addition, there are Untouchable exclusive archetypes.',
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('pax', 13, 'Mankind', 'Beastman', 'Beastly touch of unknown origin', 10, 1),
    stub: false,
    speed: 8,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Fellowship by 1. Increase Toughness or Strength by 1.',
        options: [
          { name: 'Toughness', modifications: [ { name: 'Toughness', targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ] },
          { name: 'Strength', modifications: [ { name: 'Strength', targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ] },
        ],
        modifications: [
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
        ],
      },
      {
        name: 'Abhuman',
        snippet: '+1 DN to all interaction tests with characters possessing the Imperium keyword.',
      },
      {
        name: 'Restricted Archetypes',
        snippet: 'Beastmen can take any Tier 1 archetypes listed with a prerequisite species of Human.',
      },
      {
        name: 'Stable Mutation',
        snippet: 'All Beastmen have the Aberration Mutation (page 374 of the Wrath & Glory core rulebook) and choose an animal hybrid from Table 7-14: Hybrid Merges (page 375).',
        description:
          'The force of Corruption transforms the mutant, merging their flesh with that of a ' +
          'nearby animal to turn them into a hybrid beastman. If an animal. is in the immediate ' +
          'vicinity, choose that species or the nearest approximation from Table 7-14: Hybrid Merges. ' +
          'If no animals are nearby, roll on the chart, assuming that beast was the closest, even ' +
          'if it was on a distant world. While the example animals are all terrestrial, players are ' +
          'encouraged to coin names for species from other planets that fulfil similar niches. ' +
          'If the player and GM wish to use another animal, they are encouraged to do so using these examples as a model.',
         options: [
          {
            name: 'Horse',
            snippet: 'You increase Toughness and Speed by 1.',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of an equine, ' +
              'and they grow a lengthy mane and tail. Their feet transform into hooves and their ' +
              'legs become digitigrade. The character must modify any clothing worn on the head or ' +
              'lower body to have it fit.</p><p>The character gains +1 modified Toughness and +1 Speed.</p>',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
            ],
          },
          {
            name: 'Tortoise',
            snippet: 'You increase Toughness and Resilience by 1.',
            description:
              '<p>The character loses all body hair, and their torso becomes encased in a thick shell, ' +
              'into which they may withdraw their head and limbs. All clothing and armour must be ' +
              'modified to accommodate the extreme physiological transformation.</p>' +
              '<p>The character gains +1 modified Toughness and +1 Resilience.</p>',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 },
            ],
          },
          {
            name: 'Goat',
            snippet: 'Add +1 dice to Athletics test and you horns are a natural weapon (count as knife).',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of a goat, ' +
              'and they grow horns upon their brow. Their feet transform into hooves and their ' +
              'legs become digitigrade. The character must modify any clothing worn on the head or ' +
              'lower body to have it fit.</p>' +
              '<p>The character gains +1d to Athletics tests. ' +
              'They may make melee attacks with their horns, treating them as if they were a knife. ' +
              'Consequently, the character is never unarmed. ' +
              'When these growths are visible, the character suffers +1DN to all social interactions unless the character has the Chaos keyword.</p>',
            modifications: [
              { targetGroup: 'skills', targetValue: 'athletics', modifier: 1 },
            ],
          },
          {
            name: 'Shark',
            snippet: 'You can breath underwater and your fangs are natural weapons (count as knife).',
            description:
              '<p>The character loses all body hair, and their skin becomes rough to the touch. ' +
              'They grow gills, which they can distend at will for aquatic respiration. ' +
              'Their mouth expands and fills with massive fangs.</p>' +
              '<p>The character cannot drown underwater. ' +
              'They may make melee attacks with their fangs, treating them as if they were a knife. ' +
              'Consequently, the character is never unarmed.</p>',
            modifications: [
            ],
          },
          {
            name: 'Dog',
            snippet: 'Increase Speed by 1 and add +2 dice to Awareness tests.',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of a dog, ' +
              'including pointed or dropped ears. Their senses of smell and hearing improve. ' +
              'Their feet transform into paws and their legs become digitigrade. The character ' +
              'must modify any clothing worn on the head or lower body to have it fit.</p>' +
              '<p>The character gains +1 Speed and +2d to all Awareness tests.</p>',
            modifications: [
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 2 },
            ],
          },
          {
            name: 'Eagle',
            snippet: 'Add +1 die to Awareness tests and your beak is a natural melee weapon (count as knife).',
            description:
              '<p>The character’s body is covered in feathers, and a hooked beak emerges from their face. ' +
              'Their vision sharpens substantially. Their feet transform into scaly, ' +
              'hooked talons, and their legs become digitigrade. ' +
              'The character must modify any clothing worn on the head or lower body to have it fit. ' +
              'The character gains +1d to Awareness tests. ' +
              'They may make melee attacks with their beak, treating it as if it was a knife. ' +
              'Consequently, the character is never unarmed.</p>' +
              '<p>The character gains +1d to Awareness tests. ' +
              'They may make melee attacks with their beak, treating it as if it was a knife. ' +
              'Consequently, the character is never unarmed.</p>',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 1 },
            ],
          },
        ],
      }
    ],
    variant: 'core-human',
    archetypeRestrictionsMaxTier: 1,
  },
];

module.exports = [
  ...coreRep,
  ...homebrewReps,
];
