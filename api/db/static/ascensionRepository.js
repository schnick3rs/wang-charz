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

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleSource = function(key, page) {
  return {
    ...source[key],
    page: page,
  }
};

const simpleStub = function (sourceKey, sourcePage, name, hint, stub = true) {
  return {
    source: simpleSource(sourceKey, sourcePage),
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    teaser: hint,
    stub: stub,
  };
};

const coreRepository = [
  {
    ...simpleStub('core', 199, 'Stay The Course', 'Overcome struggles, build alliances, acquire equipment.', false),
    cost: 10, // per tier difference
    minimumCampaignTier: 2,
    attributePrerequisites: [],
    skillPrerequisites: ['Required Archetype Skills +1'],
    influencePerTier: 1,
    ascensionFeatures: [
      { name: 'Keyword', /*<Any>*/ },
      {
        name: 'Story Element',
        snippet: '',
        description:
          '<p>The character gains their choice of either 3 Corruption points or ' +
          'a Memorable Injury (see page 233) of their choice and the +1D Bonus to ' +
          'Intimidation that comes with it from the Table 4-4: Memorable Injury.</p>',
        selected: '',
        options: [
          { key: 'corruption', name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }]
          },
          { key: 'memorableInjury', name: 'Memorable Injury',
            modifications: [ { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' }]
          },
        ],
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics.',
        options: [
          {
            name: 'Two Rare Items ',
            wargear: [
              {
                name: 'First Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
              {
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: true, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
            ],
          },
          {
            name: 'One Very Rare Item ',
            wargear: [
              {
                name: 'Very Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                  },
                ],
              },
            ],
          },
        ]
      }
    ],
  },
  {
    ...simpleStub('core', 200, 'Psychic Revelations', 'Tap into the warp, awaken powers, lure the Immaterium.', false),
    cost: 10, // per tier difference
    minimumCampaignTier: 2,
    attributePrerequisites: ['Willpower 3'],
    skillPrerequisites: [],
    influencePerTier: 1,
    ascensionFeatures: [
      {
        name: 'Psyker',
        snippet: 'You gain the Psyker Keyword',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Psyker' },
        ],
      },
      {
        name: 'Story Element',
        snippet: '',
        description:
          '<p>The character gains the smite psychic power. ' +
          'They also may choose one Minor Psychic power per Tier ' +
          'ascended and may purchase powers from one Discipline of their choice. ' +
          'The character must purchase the Psychic Mastery Skill.</p>',
        psychicPowers: [
          { name: 'ascensionSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'ascensionMinor1', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor2', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor3', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor4', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        modifications: [
          // access to one minor power
        ],
      },
    ],
  },
];

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

module.exports = [
  ...coreRepository,
  ...ascensionRepository,
];
