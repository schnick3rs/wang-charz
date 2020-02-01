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
    tier,
  };
};

const coreRep = [
  {
    key: 'bloodAngles',
    name: 'Blood Angels',
    beliefsAndTraditions: [
      {
        name: 'Blood Frenzy',
        effect: 'When attacking in melee combat, a Blood Angels Space Marine may reroll up to Rank damage dice on every attack.',
      },
      {
        name: 'The Red Thirst',
        origin: 'Gene-seed',
        effect: 'After engaging in melee combat, Blood Angels must pass a Willpower test (DN 3). On a failure, the Blood Angels Space Marine feels a strong urge to drink the blood of the fallen—the player may choose how to respond to this urge. If the failure involves a complication, the Blood Angels Space Marine may not resist this urge. The Game Master may alter the DN based on how long it has been since the character has tasted blood.',
      }
      ],
  },
  {
    key: 'darkAngles',
    name: 'Dark Angels',
    beliefsAndTraditions: [
      {
        name: 'Fire Discipline',
        effect: 'When Dark Angels make a ranged attack using a held action, they ignore up to Rank penalties on the attack.',
      },
      {
        name: 'The Secret',
        origin: 'Tradition',
        effect: 'Dark Angels distrust anyone outside of their chapter. They suffer a +2DN penalty for Interaction tests involving anyone outside the Dark Angels chapter',
      },
    ],
  },
  {
    key: 'imperialFists',
    name: 'Imperial Fists',
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'Imperial Fists immediately recognise the weaknesses in any fortification. '
        + 'An Imperial Fists Space Marine may add his Rank bonus to damage when attacking '
        + 'any building or fortifi cation. An Imperial Fists Space Marine may spend a '
        + 'Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.',
      },
      {
        name: 'No Retreat',
        origin: 'Tradition',
        effect: 'Imperial Fists are stubborn, tenacious and stoic. If an Imperial Fists '
        + 'Space Marine fails a Willpower test, the GM gains 1 Ruin.',
      },
    ],
  },
  {
    key: 'ironHands',
    name: 'Iron Hands',
    beliefsAndTraditions: [
      {
        name: 'The Flesh is Weak',
        effect: 'Iron Hands draw surety from their cybernetic replacements. An Iron Hands Space Marine gains a bonus to Willpower tests equal to the number of cybernetic replacement parts he has, up to Rank.',
      },
      {
        name: 'Unforgiving',
        origin: 'Tradition',
        effect: 'The Iron Hands despise weakness and corruption. When an Iron Hands Space '
        + 'Marine fails a Corruption test, the GM gains 2 Ruin rather than 1.',
      },
    ],
  },
  {
    key: 'ravenGuard',
    name: 'Raven Guard',
    beliefsAndTraditions: [
      {
        name: 'Master of Shadows',
        effect: 'A Raven Guard may reroll up to Rank dice when making a Stealth test. '
        + 'Raven Guards may make Stealth tests even under unusual circumstances, such as '
        + 'while Running (but not Sprinting) or while using a Jump Pack.',
      },
      {
        name: 'Fiercely Independent',
        origin: 'Tradition',
        effect: 'Raven Guards traditionally disdain using direct tactics and have a '
        + 'reputation for independent action. A Raven Guard Space Marine suffers a +2DN '
        + 'penalty to any combined action (see page 52) with non- Raven Guards',
      },
    ],
  },
  {
    key: 'salamanders',
    name: 'Salamanders',
    beliefsAndTraditions: [
      {
        name: 'Fire Born',
        effect: 'Salamanders receive +Rank bonus dice for Soak rolls when resisting '
        + 'damage from any weapon or effect with the Fire or Melta keywords',
      },
      {
        name: 'Unyielding',
        origin: 'Tradition',
        effect: 'Salamanders are determined warriors who consider retreat or surrender an '
        + 'act of last resort. If a Salamanders Space Marine fails a Resolve test, '
        + 'the GM gains 1 Ruin.',
      },
    ],
  },
  {
    key: 'spaceWolves',
    name: 'Space Wolves',
    beliefsAndTraditions: [
      {
        name: 'Heightened Senses',
        effect: 'Space Wolves receive +Rank bonus dice to any Awareness test due to their '
        + 'lupine senses.',
      },
      {
        name: 'Savage Within',
        origin: 'Tradition',
        effect: 'Space Wolves suffer a +2DN penalty for any Infl uence tests for authority '
        + 'outside of dealing with their own Chapter.',
      },
    ],
  },
  {
    key: 'ultramarines',
    name: 'Ultramarines',
    beliefsAndTraditions: [
      {
        name: 'Courage and Honour',
        effect: 'The Ultramarines are adept at multiple aspects of war—they are exemplars '
        + 'of brotherhood and adapt quickly to changing circumstances. An Ultramarines Space '
        + 'Marine may choose to bank up to 2 Exalted Icons for Glory per test instead of just 1.',
      },
      {
        name: 'Pride of Ultramar',
        origin: 'Tradition',
        effect: 'The Ultramarines are held to a high standard, and work doubly hard to '
        + 'excel under the eyes of their reborn Primarch, Roboute Guilliman. An Ultramarines '
        + 'Space Marine begins each session with 1 fewer Wrath. The character regains this '
        + 'lost Wrath point if he accomplishes his Objective during the session (in addition '
        + 'to the normal benefits of accomplishing an Objective).',
      },
    ],
  },
  {
    key: 'whiteScars',
    name: 'White Scars',
    beliefsAndTraditions: [
      {
        name: 'Swift as the Wind',
        effect: 'White Scars are famously agile in the saddles of their bikes. A White '
        + 'Scars Space Marine gains +Rank bonus to Piloting tests for vehicles with '
        + 'the Adeptus Astartes keyword.',
      },
      {
        name: 'Strike like Lightning',
        origin: 'Tradition',
        effect: 'White Scars value swift action and are reluctant to give up the chase '
        + 'when hunting their foes. A White Scars Space Marine must spend a point of Glory '
        + 'to Hold Action (see page 222).',
      },
    ],
  },
  {
    key: 'dodHouseIsenwell',
    name: 'House Isenwell',
    beliefsAndTraditions: [
      {
        name: 'Thunder’s Call',
        effect: 'Blade in hand, Isenwellers loudly issue challenges to those enemies they deem worthy to face them. A Isenweller may spend a Glory as a free action to issue a Thunder’s Call, picking out a specific threat. So long as he spends his next action(s) attempting to engage that enemy in melee, the target of the Call suffers a +½ Rank DN penalty to all attacks against targets that are not the Warden, and the Warden gains +½ Rank bonus dice to all melee attacks against the target until the target is dead or combat has ended. Only one enemy may be the target of a specific Isenweller’s Thunder’s Call at a time.',
      },
      {
        name: 'My Oath is My Bond',
        origin: 'Tradition',
        effect: 'A Isenweller who breaks his word is without honor, and to purposefully use a false oath to deceive an enemy is the lowest cowardice. If the Isenweller says that he will perform an action, and then does not at least earnestly attempt to perform that action, then the GM gains 2 ruin. ',
      },
    ],
  },
  {
    key: 'sosHouseHironiat',
    name: 'Houst Hironiat',
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'Hironians immediately recognise the weaknesses in any fortification. '
          + 'An Imperial Fists Space Marine may add his Rank bonus to damage when attacking '
          + 'any building or fortification. An Hironian Space Marine may spend a '
          + 'Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.',
      },
      {
        name: 'No Retreat',
        origin: 'Tradition',
        effect: 'Hironians are stubborn, tenacious and stoic. If an Hironian '
          + 'Space Marine fails a Willpower test, the GM gains 1 Ruin.',
      },
    ],
  },
];

const homebrewReps = [
];

module.exports = [
  ...coreRep,
  ...homebrewReps,
];
