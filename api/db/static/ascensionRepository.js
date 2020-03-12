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

const core = [
  {
    name: 'Stay The Course',
    ...simpleStub('core', 199, 'Stay The Course', 'Overcome struggles, build alliances, acquire equipment.', false),
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [
      'Required Skills +1',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: '<Any>',
    storyElementString:
      'The character gains their choice of either 3 Corruption points or ' +
      'a Memorable Injury (see page 233) of their choice and the +1D Bonus to ' +
      'Intimidation that comes with it from the Table 4-4: Memorable Injury.',
    wargearString:
      'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value ' +
      'equal or lesser than 3 + the new Tier. This may include cybernetics.',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the <Any> keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: '<Any>' },
        ],
      },
      {
        key: 'story-element',
        name: 'Story Element',
        snippet: 'You gain 3 points Corruption or a Memorable Injury.',
        description:
          '<p>The character gains their choice of either 3 Corruption points or ' +
          'a Memorable Injury (see page 233) of their choice and the +1D Bonus to ' +
          'Intimidation that comes with it from the Table 4-4: Memorable Injury.</p>',
        selected: '',
        options: [
          {
            key: 'corruption', name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }],
          },
          {
            key: 'memorableInjury', name: 'Memorable Injury (+1 die to Intimidation)',
            modifications: [ { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' }],
          },
        ],
      },
      {
        key: 'wargear',
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics.',
        hideInSheet: true,
        options: [
          {
            key: 'two-rare-items',
            name: 'Two Rare Items ',
            wargear: [
              {
                key: 'first-rare-item',
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
                key: 'second-rare-item',
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
            ],
          },
          {
            key: 'single-very-rare-item',
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
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Psyker',
    storyElementString:
      'The character gains the smite psychic power. ' +
      'They also may choose one Minor Psychic power per Tier ' +
      'ascended and may purchase powers from one Discipline of their choice. ' +
      'The character must purchase the Psychic Mastery Skill.',
    wargearString: 'none',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Psyker',
        snippet: 'You gain the Psyker Keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Psyker' },
        ],
      },
      {
        key: 'unlook-discipline',
        name: 'Unlook Discipline',
        snippet: 'You unlook a single Psychic Discipline. You must purchase the Psychic Mastery Skill.',
        description:
          '<p>The character may purchase powers from one Discipline of their choice. The character must purchase the Psychic Mastery Skill.</p>',
        selected: '',
        optionsPlaceholder: 'Choose a Psychic Discipline',
        options: [
          { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
          { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
          { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
          { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
          { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
          { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
          { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
          { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
          { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
          // todo, handle homebrew disciplines
        ],
        modifications: [
          // { targetGroup: 'psychicDisciplines', targetValue: 'Minor' },
        ],
      },
      {
        key: 'story-element',
        name: 'Story Element',
        snippet: 'You gain the Smite psychic power and one Minor psychic Power per tier ascended.',
        description:
          '<p>The character gains the smite psychic power. They also may choose one Minor Psychic power per Tier ascended.</p>',
        psychicPowers: [
          { key: 'ascension-smite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { key: 'ascension-minor-1', selected: '', query: { discipline: 'Minor' }, options: [], free: true, requiredAscendedTiers: 1 },
          { key: 'ascension-minor-2', selected: '', query: { discipline: 'Minor' }, options: [], free: true, requiredAscendedTiers: 2 },
          { key: 'ascension-minor-3', selected: '', query: { discipline: 'Minor' }, options: [], free: true, requiredAscendedTiers: 3 },
          { key: 'ascension-minor-4', selected: '', query: { discipline: 'Minor' }, options: [], free: true, requiredAscendedTiers: 4 },
        ],
      },
    ],
  },
];

const aaoa = [
  {
    ...simpleStub('aaoa', 78, 'Agent of the Inquisition', 'Join the Inquisition (that was unexpected).', false),
    description: '<p>You have been recruited by an Inquisitor to continue the ongoing fight against the Enemies of the Imperium. You’re not merely an informant or minion bearing the Inquisition’s mark, but a trusted associate and confidante of an Inquisitor, with valued skills, experience, and insights, and the ability to wield some measure of their authority.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      'Insight 2 OR Awareness 2',
      '<Imperium> Keyword',
    ],
    // Benefits
    keywordString: 'Inqisition, <Ordo>',
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Inquisition and <Ordo>',
    storyElementString:
      'The character’s status means that they may invoke the name and authority of their ' +
      'Inquisitor to gain +Rank to an Influence or Interaction skill test involving a ' +
      'being with the Imperium keyword. However, because of the character’s experiences, ' +
      'they gain 3 Corruption points or a Memorable Injury of their choice.',
    wargearString:
      'Inquisitorial Rosette (symbol of authority), plus up to two items of Rare Wargear, ' +
      'or one item of Very Rare Wargear, with a Value up to 3 + the new Tier.',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Inquisition and <Ordo> keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: '<Ordo>' },
        ],
      },
      {
        key: 'authority-of-the-inquisition',
        name: 'Authority of the Inquisition',
        snippet: 'You add +Rank dice to Influence and Interaction Skill Tests involving a character with the <Imperium> Keyword',
        description:
          '<p>The character’s status means that they may invoke the name and authority of their Inquisitor ' +
          'to gain +Rank to an Influence or Interaction skill test involving a being with the Imperium keyword.</p>',
      },
      {
        key: 'scourged-from-experience',
        name: 'Scourged from experience',
        snippet: 'You gain 3 points Corruption or a Memorable Injury.',
        description: '<p>Because of the character’s experiences, they gain 3 Corruption points or a Memorable Injury of their choice.</p>',
        selected: '',
        options: [
          {
            key: 'corruption', name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }],
          },
          {
            key: 'memorableInjury', name: 'Memorable Injury (+1 die to Intimidation)',
            modifications: [ { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' } ],
          },
        ],
      },
      {
        key: 'wargear',
        name: 'Wargear',
        description:
          '<p>Inquisitorial Rosette (symbol of authority), plus up to two items of Rare Wargear, ' +
          'or one item of Very Rare Wargear, with a Value up to 3 + the new Tier.</p>',
        wargear: [
          { name: 'Symbol of Authority', variant: 'Inquisitorial Rosette' },
        ],
        selected: '',
        options: [
          {
            key: 'two-rare-items',
            name: 'Two Rare Items ',
            wargear: [
              {
                key: 'first-rare-item',
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
                key: 'second-rare-item',
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
            ],
          },
          {
            key: 'single-very-rare-item',
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
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa', 78, 'Apocryphon Oath', 'The Deathwatch have requested your service.',false),
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 5,
    prerequisites: [
      'Willpower 5',
      'Ballistic Skill 5 OR Weapon Skill 5',
      '<Adeptus Astartes> Keyword',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Deathwatch, Inquisition and Ordo Xenos',
    storyElementString:
      'initiated into secrets that allow you to hunt Xenos more effectively. ' +
      'You receive the normal benefit for having the Ordo Xenos keyword (page 119 of the ' +
      'Wrath & Glory core rulebook) and have access to special Deathwatch arsenals containing ' +
      'rare and specialised equipment. In addition, so efficiently do you coordinate with your ' +
      'Kill-Team that at any time you may spend one Wrath in order to give one Wrath to any ' +
      'other character with the Deathwatch keyword.',
    wargearString:
      'One reload each of Dragonfire, Hellfire, Kraken, and Vengeance bolt rounds, ' +
      'and one Weapon Upgrade with a value of up to 7 (Very Rare).',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Deathwatch, Inquisition and Ordo Xenos keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Deathwatch' },
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: 'Ordo Xenos' },
        ],
      },
      {
        key: 'deathwatch-arsenal',
        name: 'Deathwatch Arsenal',
        description:
          '<p>You join the ranks of the Deathwatch, and you are initiated into secrets that allow you to hunt Xenos more effectively. ' +
          'You receive the normal benefit for having the Ordo Xenos keyword ' +
          '(page 119 of the Wrath & Glory core rulebook) and have access to special Deathwatch ' +
          'arsenals containing rare and specialised equipment.</p>',
      },
      {
        key: 'brothers-in-arms',
        name: 'Brothers in Arms',
        snippet: 'As an Action, you can transfer one Wrath to any other character with the Deathwatch Keyword. ',
        description:
          '<p>In addition, so efficiently do you coordinate with your Kill-Team that at any time you may ' +
          'spend one Wrath in order to give one Wrath to any other character with the Deathwatch keyword.</p>',
      },
      {
        key: 'wargear',
        name: 'Wargear',
        description:
          '<p>One reload each of Dragonfire, Hellfire, Kraken, and Vengeance bolt rounds, and one Weapon Upgrade with a value of up to 7 (Very Rare).</p>',
        wargear: [
          { name: 'Dragonfire Bolt Rounds', amount: 1 },
          { name: 'Hellfire Bolt Rounds', amount: 1 },
          { name: 'Kraken Bolt Rounds', amount: 1 },
          { name: 'Vengeance Bolt Rounds', amount: 1 },
          {
            key: 'very-rare-weapon-upgrade',
            name: 'One Weapon Upgrade with a value of up to 7 (Very Rare)',
            selected: '',
            options: [
              {
                filter: true,
                valueFilter: {
                  useCharacterTier: false,
                  useSettingTier: false,
                  useAscensionTargetTier: false,
                  fixedValue: 7
                },
                rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                typeFilter: ['Weapon Upgrade'],
              },
            ],
          },
        ],
      },
    ],
    description: '<p>You have sworn to serve the Deathwatch, perhaps for a decade-long Vigil, perhaps in perpetuity. Either way, you are amongst the mightiest of Astartes, and you shall not suffer the alien to live.</p>',
  },
  {
    ...simpleStub('aaoa', 79, 'Betrayal', 'Missing the Chaos keyword? Wait no more! Also; Corruption...',false),
    description:
      '<p>You have seen that the Emperor is a False God, and you have forsaken the Imperium for the Dark Gods.</p>',
    alert: 'The Keyword replacement (e.g. from <code>Adeptus Astartes</code> to <code>Heretic Astartes</code>) is not implemented.',
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [
      '<Imperium> Keyword',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Heretic, Chaos and <Mark of Chaos>',
    storyElementString: 'You lose the Imperium keyword. If you had the Adeptus Astartes keyword, you replace it with the Heretic Astartes keyword. If you had the Adeptus Mechanicus keyword, you replace it with the Dark Mechanicus keyword. If you had any talents that required you not to have the Chaos keyword, the build points from those talents are refunded. The recent nature of your betrayal means that you gain +2d on all Deception tests to pretend that you are still loyal.',
    wargearString: 'None.',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Heretic, Chaos and <Mark of Chaos> keywords.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Heretic' },
          { targetGroup: 'keywords', targetValue: 'Chaos' },
          { targetGroup: 'keywords', targetValue: '<Mark of Chaos>' },
        ],
      },
      {
        key: 'switch-sides',
        name: 'Switch Sides',
        description:
          '<p>You lose the Imperium keyword. ' +
          'If you had the Adeptus Astartes keyword, you replace it with the Heretic Astartes keyword. ' +
          'If you had the Adeptus Mechanicus keyword, you replace it with the Dark Mechanicus keyword. ' +
          'If you had any talents that required you not to have the Chaos keyword, the build points from those talents are refunded.</p>',
      },
      {
        key: 'hide-in-plain-sight',
        name: 'Hide in plain sight',
        description:
          '<p>The recent nature of your betrayal means that you gain +2d on all Deception tests to pretend that you are still loyal.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 78, 'Crux Terminatus', '"May I request a Terminator Armour, please?"', false),
    description:
      '<p>The Crux Terminatus is a stone medallion awarded to highly skilled and experienced Space Marine Veterans. All members of a Chapter trained in the use of Terminator Armour will have been first awarded the Crux Terminatus. These badges, set into the left shoulder plate of Terminator armour, are highly distinctive and usually fashioned from stone. In Codex Chapters, members of the Chapter\'s veteran First Company are the exclusive users of Terminator armour.</p>' +
      '<p>This Honour appears most commonly as a skull set onto a cruciform shape of red iron or bone. Terminator sergeants often add crossed bones behind the skull, whilst lightning bolts behind the skull are often added for Terminators trained as Assault units wielding lightning claws and thunder hammers with storm shields. Variations include the size and dimensions of the skull and the removal of the crossed lightning bolts or bones or their scale in relation to the shape of the cruciform. The Crux Terminatus is almost always worn on the left shoulder pad, though it may also be worn on one knee pad (this is usually done only in combination with the shoulder pad, however). Legend has it that the first Crux Terminatus ever crafted contained a tiny fragment of the Emperor\'s own armour within it, an honour granted to commemorate a squad of Imperial Fists Terminators who aided the Emperor in the battle against Horus. Whether or not this is true it means that ancient suits of power armour bearing Terminator Honours are considered even more rare and precious to a Chapter as a result of their reputed connection to the Master of the Imperium.</p>',
    cost: 50,
    costPerTier: 0,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Skills +1',
      '<Adeptus Astartes> Keyword',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    keywordString: 'none',
    storyElementString:
      'The character is regarded as an honoured veteran amongst the Adeptus Astartes, ' +
      'and even when not wearing Terminator Armour, they are seen as some of the mightiest and most dedicated warriors in the Imperium. ' +
      'The character’s Resolve is increased by +2, ' +
      'and whenever the character makes a successful Weapon Skill, Ballistic Skill, or Leadership test, ' +
      'they may shift a single exalted icon to allow themselves and all allies with the Imperium keyword within 15m to heal 1+Rank Shock.',
    wargearString:
      'The character may request the use of Terminator Armour and accompanying weapons ' +
      '(normally a Storm Bolter and Power fist, but other combinations are common, including a Thunder Hammer and Storm Shield, or a pair of lightning claws)' +
      'from their Chapter’s armoury before embarking upon a mission. ' +
      'Primaris Astartes cannot use Terminator Armour, as no suits of it exist which fit their enhanced stature.',
    // Crunch
    ascensionFeatures: [
      {
        key: 'honoured-veteran',
        name: 'Honoured Veteran',
        snippet: 'Increase your resolve by 2.',
        description: '<p>The character’s Resolve is increased by +2.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 2 },
        ],
      },
      {
        key: 'lead-by-example',
        name: 'Lead by Example',
        snippet: 'Shift a single exalted icon per Test (Weapon Skill, Ballistic Skill, Leadership) and all <Imperium> allies within 15m heal 1+Rank Shock.',
        description:
          '<p>Whenever the character makes a successful Weapon Skill, Ballistic Skill, or Leadership test, ' +
          'they may shift a single exalted icon to allow themselves and all allies with the Imperium keyword within 15m to heal 1+Rank Shock.</p>',
      },
      {
        key: 'terminator-armour-requisition',
        name: 'Terminator Armour Requisition',
        snippet: 'The character may request a Terminator Armour and accompanying Weapons.',
        description:
          '<p>The character may request the use of Terminator Armour and accompanying weapons ' +
          '(normally a Storm Bolter and Power fist, but other combinations are common, including a Thunder Hammer and Storm Shield, or a pair of lightning claws)' +
          'from their Chapter’s armoury before embarking upon a mission. ' +
          'Primaris Astartes cannot use Terminator Armour, as no suits of it exist which fit their enhanced stature.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 80, 'The Rubicon Primaris', 'Pick an Astartes and cross the rubicon to show those trueborn Primaris who\'s boss.',false),
    description:
      '<p></p>',
    cost: 50,
    costPerTier: 0,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Toughness 5',
      '<Adeptus Astartes> Keyword',
      'NOT <Primaris Astartes> Keyword',
    ],
    // Benefits
    influenceBonus: 1,
    influencePerTier: 0,
    keywordString: 'Primaris Astartes',
    storyElementString:
      'Change your Species from Adeptus Astartes to Primaris Astartes, with all the accompanying benefits. ' +
      'The cost of this has already been accounted for in the cost of this ascension package.',
    wargearString:
      'You replace your weapons and armour with the nearest equivalents which have the Primaris keyword. ' +
      'At the GM’s discretion, unique wargear may be altered or upgraded as well.',
    // Crunch
    ascensionFeatures: [
      {
        ky: 'keyword',
        name: 'Keywords',
        snippet: 'You gain the Primaris Astartes keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Primaris Astartes' },
        ],
      },
      {
        ky: 'story-element',
        name: 'Story Element',
        description:
          '<p>Change your Species from Adeptus Astartes to Primaris Astartes, with all the accompanying benefits. The cost of this has already been accounted for in the cost of this ascension package.</p>' +
          '<p>Your Strength is increased by 1 and Wounds your Wounds are increased by 4.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'wounds', modifier: 4 },
        ],
      },
      {
        ky: 'wargear',
        name: 'Wargear',
        description:
          '<p>You replace your weapons and armour with the nearest equivalents which have the Primaris keyword. At the GM’s discretion, unique wargear may be altered or upgraded as well.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 81, 'Lost upon the Path of the Warrior', 'Gain some fancy Exarch gear but not everyone is pleased. '),
    description:
      '<p>An Exarch is a former Eldar Aspect Warrior who has lost himself upon the Eldar Path of the Warrior and is unable to ever leave it again. At this point he is considered to have abandoned the Eldar Paths with their promise of new experiences and development of new skills in favour of a constant life of bloodshed. The Eldar becomes the elite warrior called an Exarch; simultaneously, an Exarch is a priest of Kaela Mensha Khaine, the Eldar God of War as well as a caretaker of the individual warrior shrine, and trainer, teacher, and instructor for other Aspect Warriors. The sacrifice of an Eldar Exarch can summon an Avatar of Kaela Mensha Khaine. He is equipped with ancient and powerful Eldar weaponry and armour. Each Eldar Warrior Aspect has its own particular kind of Exarch. On the battlefield, an Exarch commands an individual squad of Eldar Aspect Warriors. Exarchs are formidable opponents, and most of them can use their often-potent psychic and combat abilities to help the whole squad of Aspect Warriors under their command.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Attributes +1',
      'Required Skills +1',
      '<Aspect Warrior> Keyword',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keyworString: 'Exarch',
    storyElementString:
      'You can no longer empathise with those who have not devoted their existence to war. ' +
      'You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return. ' +
      'In addition, you may now purchase and use Exarch Powers.',
    wargearString:
      'You replace your Aspect Armour with Exarch Armour, which provides the same functions but has ' +
      'an AP of 6 and loses the Bulky (X) or Cumbersome traits (if it had them). ' +
      'You may also replace one of your weapons with a weapon of up to Unique rarity and a Value of up to 5 plus your new Tier. ' +
      'The GM may create a unique weapon, an ancient relic of the Aeldari, for this purpose.',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Exarch Keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Exarch' },
        ],
      },
      {
        key: 'you-walk-alone',
        name: 'You walk alone',
        description:
          '<p>You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return.</p>',
      },
      {
        key: 'exalted',
        name: 'Exalted',
        snippet: 'You may purchase and use up to two Exarch Powers (special talents).',
        description:
          '<p>An Exarch may purchase <strong>up to two Exarch powers</strong>, at the costs listed, so long as the Exarch meets the listed prerequisites. Some of the powers in this section are distinct to Exarchs of particular Aspect Temples, and they may only be selected by an Exarch of that temple.</p>' +
          '<p>Many of the powers in this section affect the Exarch’s students as well, granting a benefit to the Aspect Warriors under their command. An Exarch may consider all Aspect Warriors of the same type as the Exarch within 10m as being part of the Exarch’s squad.</p>'
      },
      {
        key: 'exarch-armour',
        name: 'Exarch Armour',
        description:
          '<p>You replace your Aspect Armour with Exarch Armour, which provides the same functions ' +
          'but has an AP of 6 and loses the Bulky (X) or Cumbersome traits (if it had them).</p>',
        wargear: [
          { name: 'Exarch Armour' },
        ],
      },
      {
        key: 'exarch-weapon',
        name: 'Exarch Weapon',
        description:
          '<p>replace one of your weapons with a weapon of up to Unique rarity and a Value of up to 5 plus your new Tier.</p>' +
          '<p>The GM may create a unique weapon, an ancient relic of the Aeldari, for this purpose.</p>',
        wargear: [
          {
            key: 'very-rare-weapon-upgrade',
            name: 'One Weapon Upgrade with a value of up to 7 (Very Rare)',
            selected: '',
            options: [
              {
                filter: true,
                valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 5 },
                rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Unique'],
                typeFilter: ['Ranged Weapon', 'Melee Weapon'],
              },
            ],
          },
        ],
      }
    ],
  },
  {
    ...simpleStub('aaoa', 80, 'Lost upon the Seer Path', 'A prophet for the Aeldari, but lost on this course.'),
    description:
      '<p>A Farseer is the most potent and respected form of Eldar psyker or Seer. A Farseer has become lost upon the Path of the Seer forever in the same way as the Exarchs are wed eternally to the Path of the Warrior. A council of the most powerful Farseers generally governs a Craftworld. Farseers possess a wide diversity of psychic specialities with divination being the most common skill. They are most often known for using their vast psychic powers to see the possibilities of the future so that they can manipulate events to better ensure the survival of the Eldar species in the wake of the Fall.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Willpower 6',
      'Insight 6',
      'Psychic Mastery 6',
      '<Aeldari> Keyword',
      '<Asuryani> Keyword',
      '<Psyker> Keyword',
    ],
    // Benefits
    influenceBonus: 3,
    influencePerTier: 0,
    keywordString: 'Farseer',
    storyElementString:
      'You gain the Prophetic Visions and Scry psychic powers. ' +
      'In addition, you may purchase additional Runes of Fate psychic powers, subject to Tier restrictions. ' +
      'Your maximum number of Psychic Powers is increased by 2. ' +
      'If you wish, you may trade in psychic powers you already possess, regaining the points spent on them, in order to buy new powers.',
    wargearString:
      'Ghosthelm, Runes of Witnessing, Runes of Warding.',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Farseer Keyword.',
        description: '<p>You gain the <em>Farseer</em> Keyword.</p>',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Farseer' },
        ],
      },
      {
        key: 'recognisable-fortitude',
        name: 'Recognisable Fortitude',
        description:
          '<p>You may use your Willpower instead of your Fellowship to determine your Influence.</p>',
      },
      {
        key: 'unlock-faith-powers',
        name: 'Unlock Faith Powers',
        snippet: 'You gain the Prophetic Visions and Scry psychic powers and access to the Runes of Faith Discipline.',
        description:
          '<p>You gain the <em>Prophetic Visions</em> and <em>Scry</em> psychic powers and access to the <em>Runes of Faith</em> Discipline.</p>' +
          '<p>If you wish, you may trade in psychic powers you already possess, regaining the points spent on them, in order to buy new powers.</p>',
        psychicPowers: [
          { key: 'ascension-prophetic-visions', selected: 'Prophetic Visions', query: { name: 'Prophetic Visions' }, options: [], free: true },
          { key: 'ascension-scry', selected: 'Scry', query: { name: 'Scry' }, options: [], free: true },
        ],
        modifications: [
          { targetGroup: 'psychicDisciplines', targetValue: 'Runes of Faith' },
        ],
        // increase power tier +2
        // may trade powers
      },
      {
        key: 'seer-wargear',
        name: 'Seer Wargear',
        snippet: 'Ghosthelm, Runes of Witnessing, Runes of Warding.',
        wargear: [
          { name: 'Ghosthelm' },
          { name: 'Runes of Witnessing' },
          { name: 'Runes of Warding' },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa', 82, 'Possession', 'Invited a deamon (knock, knock) into yourself, boosting stats and corruption.',false),
    description:
      '<p>Daemonic Possession is the act of the essence of a Daemon possessing and controlling the body of another being. As Daemons can only exist in the Materium for a limited period before being forced back into the Warp, Daemonic Possession is one of the most common methods for Daemons to enter the material realm. Daemonic Possession can occur involuntarily to those of psychic potential, but the host sometimes willingly gives themselves over to Daemonic Possession, as is the case with Possessed Chaos Space Marines and certain Cultists. Possessed individuals can often be used as gateways to the Warp, allowing Daemons to spill into the Materium.</p>' +
      '<p>A character selecting this Ascension Package has invited a daemon into their flesh, granting them tremendous power, at the cost of subjecting their body, mind, and soul to the ravening touch of the Warp. Few who become possessed can endure it for long, often finding their bodies degenerating into spawndom or becoming purely a vessel for the daemon’s will, but some can find a degree of symbiosis with the daemon they are host to, becoming a singular mighty entity.</p>',
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 3,
    prerequisites: [
      'Willpower 4',
      '<Chaos> Keyword',
    ],
    // Benefits
    influenceBonus: 3,
    influencePerTier: 0,
    // corruption: +3, see below
    keywordString: 'Daemon',
    storyElementString:
      'The character is now possessed by a daemon of Chaos. ' +
      'The character gains the Daemonic special rule, described below. ' +
      'In addition, the character may draw upon the daemon’s power. ' +
      'Select three attributes when the character first becomes possessed; ' +
      'as a free action you may gain a number of bonus dice to those attributes equal to the campaign’s Tier. ' +
      'You may sustain this for as many rounds as you wish (or minutes, if outside of combat), ' +
      'but when you stop using this power, you suffer 1d3 Shock, ' +
      '+1 for each Round (or minute) you used the daemon’s power, and gain +1 Corruption. ' +
      'While using the daemon’s power, the character also gains the Horns, Spines, Fangs, ' +
      'or Claws minor mutation (page 373 of the Wrath & Glory rulebook), ' +
      'and a single major mutation, chosen when the character first became possessed. ' +
      'The character may attempt to Soak Mortal Wounds, and Soaking does not cost this character any Shock.',
    wargearString:
      'None. While manifesting the daemon’s power, it tends to meld your wargear and your flesh together, ' +
      'but this effect is normally reversed when you revert to your mortal state.',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Daemon keyword and 3 points Corruption.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Daemon' },
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
      {
        key: 'invoke-daemonic-power',
        name: 'Invoke Daemonic Power',
        description:
          '<p>Select three attributes when the character first becomes possessed; as a free action you may gain a number of bonus dice to those attributes equal to the campaign’s Tier.</p>' +
          '<p>You may sustain this for as many rounds as you wish (or minutes, if outside of combat), but when you stop using this power, you suffer 1d3 Shock, +1 for each Round (or minute) you used the daemon’s power, and gain +1 Corruption.</p>',
      },
      {
        key: 'bestial-features',
        name: 'Bestial Features',
        description:
          '<p>While using the daemon’s power, the character also gains the Horns, Spines, Fangs, ' +
          'or Claws minor mutation (page 373 of the Wrath & Glory rulebook), and a single major mutation, ' +
          'chosen when the character first became possessed.</p>' +
          '<p>While manifesting the daemon’s power, it tends to meld your wargear and your flesh together, ' +
          'but this effect is normally reversed when you revert to your mortal state.</p>',
        // options: [],  select a mutation
      },
      {
        key: 'daemonic-fortitude',
        name: 'Daemonic Fortitude',
        snippet: 'You may Soak Mortal Wounds and soaking does not cost you any Shock.',
        description:
          '<p>The character may attempt to Soak Mortal Wounds, and Soaking does not cost this character any Shock.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 82, 'Reborn', 'Once an Aeldari, no Yinnari',false),
    description:
      '<p>The Ynnari are the members of a newly formed eponymous Eldar group that worship the God Ynnead and believe their race can be saved from the depredation of Slaanesh by helping to bring about the birth of the slumbering god of the dead.</p>' +
      '<p>Under the leadership of the prophet Yvraine, the "Daughter of Shades," the Ynnari seek to fully awaken the Aeldari god of the dead Ynnead, who they believe can defeat Slaanesh and restore the Aeldari species\' unity and its lost glory.</p>' +
      '<p>They aim to achieve this in a ritual that would not require the sacrifice of the entire Aeldari species, using a method known as the "Seventh Path" or the "Seventh Way."</p>' +
      '<p>A great many Aeldari, hailing from every sub-faction and allegiance save the most conservative and entrenched, have joined their cause. No abstract philosophy is this, for the effects of their new deity can be seen manifesting around them -- the Reborn can draw upon the souls within the Spirit Stones they wear to bolster their own abilities, can siphon the power of those slain nearby to invigorate their attacks, and turn their foes to ashes with the strange weapons and psychic powers they wield.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      '<Aeldari> Keyword',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    keywordString: 'Ynnari',
    storyElementString:
      'The character has been reborn as one of the Ynnari, and now has a powerful connection to the spirits of the dead. ' +
      'The character may attempt a Psychic Mastery test in order to communicate with the spirits of Aeldari dead ' +
      '(contained within spirit stones, infinity circuits, Exodite world-spirits, and similar). ' +
      'Further, they gain the Strength From Death ability, below: ' +
      'Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. ' +
      'You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you regroup or take a respite. ' +
      'Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied Ynnari within 10m.',
    wargearString:
      'Spirit Stone. ' +
      'When carried by an Ynnari character, a Spirit Stone may be used to generate 1d3+1 Soul tokens as a free action once every 24 hours – ' +
      'the character taps into the powerful spirits within, which then take some time to recover their strength.',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Ynnari keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Ynnari' },
        ],
      },
      {
        key: 'connection-to-the-dead-spirits',
        name: 'Connection to the dead spirits',
        description:
          '<p>The character may attempt a Psychic Mastery test in order to communicate with the spirits of Aeldari dead ' +
          '(contained within spirit stones, infinity circuits, Exodite world-spirits, and similar).</p>',
      },
      {
        key: 'strength-from-death',
        name: 'Strength From Death',
        description:
          '<p>Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. ' +
          'You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you regroup or take a respite. ' +
          'Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied Ynnari within 10m.</p>',
      },
      {
        key: 'spiritual-harvester',
        name: 'Spiritual Harvester',
        description:
          '<p>A <em>Spirit Stone</em> may be used to generate 1d3+1 Soul tokens as a free action once every 24 hours – ' +
          'the character taps into the powerful spirits within, which then take some time to recover their strength.</p>',
      },
      {
        key: 'wargear',
        name: 'Wargear',
        snippet: 'You gain a Spirit Stone.',
        wargear: [
          { name: 'Spirit Stone' },
        ],
      },
    ],
  },
];

const ltgb = [
  {
    ...simpleStub('ltgb', 3, 'Forsake Your Chains (Ascension)', 'Leave the Imperium (Keyword) behind and join the Chaos or it\'s various factions.',true),
    description: '<p>Many worshippers of the Gods were once loyal servants of the Imperium, and Chaos can corrupt anyone and anything. This ascension package does not require one to ascend a er, though you may if you wish, it merely represents an existing character joining the powers of Chaos, which may be done either mid-campaign or be part of the backstory of an existing character. This would be the foundation for an Inquisitor whose radical nature became too much for his superiors to bear, or a loyal commissar forcibly broken through torture and brainwashing. There are as many reasons for one to choose to join Chaos as there are worshippers of the Dark Gods.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      '<Imperium> Keyword',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    storyElementString: 'The character gains 3 corruption. Any enemy that is a part of an organization the character was part of gains the Hatred talent against them.',
    wargearString:
      'A character only gains Wargear if they ascend a tier. Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3  the new Tier. This may include cybernetics and must have the Imperium keyword.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Corruption',
        snippet: 'You gain 3 points of Corruption.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
      {
        name: 'Betrayed allies',
        snippet: 'Any enemy that is a part of an organization the character was part of gains the Hatred talent against them.',
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3  the new Tier. This may include cybernetics and must have the Imperium keyword.',
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
              {
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                    keywordFilter: 'Imperium',
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
            ],
          },
        ]
      }
    ],
  },
];

const aotgt = [
  {
    ...simpleStub('aotgt', 4, 'Rosette in Hand', 'Join the Inquisition and brag with new gear.',false),
    description: '<p>Many worshippers of the Gods were once loyal servants of the Imperium, and Chaos can corrupt anyone and anything. This ascension package does not require one to ascend a er, though you may if you wish, it merely represents an existing character joining the powers of Chaos, which may be done either mid-campaign or be part of the backstory of an existing character. This would be the foundation for an Inquisitor whose radical nature became too much for his superiors to bear, or a loyal commissar forcibly broken through torture and brainwashing. There are as many reasons for one to choose to join Chaos as there are worshippers of the Dark Gods.</p>',
    cost: 0,
    costPerTier: 15,
    alert: 'The Influence Bonus from the Homebrew is <code>Replace archetype bonus with Tier</code>. This is not easy to implement. Therefore,  I changed it to <code>+1 per Tier ascended -1</code>. I think this is near enough as the default for archetypes seems to be <em>their tier -1</em>.',
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Intellect 4',
      'Willpower 4',
      'Required Skills +1',
      'Insight 2',
      'Intimidation 2',
      'Imperium Keyword',
    ],
    // Benefits
    influenceBonus: -1, // workaround
    influencePerTier: 1,
    keywordString: 'Inquisition and <Ordo>',
    storyElementString: 'Inquisitors have supreme authority for maintaining the security of the Imperium. They gain +Rank to all Influence and Interaction skill tests involving characters with the Imperium Keyword. ' +
      'The character may gain either a memorable injury or a strange artifact (GM’s choice) related to their Ordo.',
    wargearString: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics. The character gains a Rosette (Symbol of Authority).',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Inquisition and <Ordo> keywords.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: '<Ordo>' },
        ],
      },
      {
        key: 'unchecked-authority',
        name: 'Unchecked Authority',
        snippet: 'You add +Rank bonus dice to all Influence and Interaction skill testes with <Imperium> characters.',
        description: 
          '<p>Inquisitors have supreme authority for maintaining the security of the Imperium. ' +
          'They gain +Rank to all Influence and Interaction skill tests involving characters with ' +
          'the Imperium Keyword.</p>',
      },
      {
        key: 'wargear',
        name: 'Wargear',
        snippet: 'A Iquisitorial Rosette (Symbol of Authority) plus either two rare or one very rare <Imperial> Item of value up to 3 + new tier.',
        descriptions:
          '<p>Select either two items of Rare Wargear or one item of Very Rare Wargear with a value ' +
          'equal or lesser than 3 + the new Tier. This may include cybernetics and must have the ' +
          'Imperium keyword. The character gains a Rosette (Symbol of Authority).</p>',
        wargear: [
          { name: 'Symbol of Authority', variant: 'Rosette' },
        ],
        options: [
          {
            key: 'two-rare-items',
            name: 'Two Rare Items ',
            wargear: [
              {
                key: 'first-rare-item',
                name: 'First Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                    keywordFilter: 'Imperium',
                  },
                ],
              },
              {
                key: 'second-rare-item',
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                    keywordFilter: 'Imperium',
                  },
                ],
              },
            ],
          },
          {
            key: 'single-very-rare-item',
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
            ],
          },
        ],
      }
    ],
  },
];

const thaot = [
  {
    ...simpleStub('thaot', 25, 'Chosen by the Omnissiah', 'Damaged, broken, repaired, enlisted, welcome on Mars.',true),
    description: '<p>Many worshippers of the Gods were once loyal servants of the Imperium, and Chaos can corrupt anyone and anything. This ascension package does not require one to ascend a er, though you may if you wish, it merely represents an existing character joining the powers of Chaos, which may be done either mid-campaign or be part of the backstory of an existing character. This would be the foundation for an Inquisitor whose radical nature became too much for his superiors to bear, or a loyal commissar forcibly broken through torture and brainwashing. There are as many reasons for one to choose to join Chaos as there are worshippers of the Dark Gods.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 3,
    prerequisites: [
      'Intellect 3',
      'Tech 2',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    storyElementString: 'Inquisitors have supreme authority for maintaining the security of the Imperium. They gain +Rank to all Influence and Interaction skill tests involving characters with the Imperium Keyword. ' +
      'The character may gain either a memorable injury or a strange artifact (GM’s choice) related to their Ordo.',
    wargearString: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics. The character gains a Rosette (Symbol of Authority).',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keywords',
        snippet: 'Gain the Inquisition and <Ordo> keywords if the character did not have them.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: '<Ordo>' },
        ],
      },
      {
        name: 'Unchecked Authority',
        description: '<p>Inquisitors have supreme authority for maintaining the security of the Imperium. They gain +Rank to all Influence and Interaction skill tests involving characters with the Imperium Keyword.</p>',
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3  the new Tier. This may include cybernetics and must have the Imperium keyword. The character gains a Rosette (Symbol of Authority).',
        wargear: [
          { name: 'Symbol of Authority', variant: 'Rosette' },
        ],
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
              {
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                    keywordFilter: 'Imperium',
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
            ],
          },
        ]
      }
    ],
  },
];

const tog = [
  {
    ...simpleStub('tog', 14, 'Veteran of the Long War', 'You have a burning Hatred for (well, against) the Imperium.'),
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Skills +1',
      'Heretic Astartes',
      'Hatred <Imperium>',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    storyElementString: '',
    wargearString: '',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keywords',
        snippet: 'Gain the Inquisition and <Ordo> keywords if the character did not have them.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: '<Ordo>' },
        ],
      },
      {
        name: 'Unchecked Authority',
        description: '<p>Inquisitors have supreme authority for maintaining the security of the Imperium. They gain +Rank to all Influence and Interaction skill tests involving characters with the Imperium Keyword.</p>',
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3  the new Tier. This may include cybernetics and must have the Imperium keyword. The character gains a Rosette (Symbol of Authority).',
        wargear: [
          { name: 'Symbol of Authority', variant: 'Rosette' },
        ],
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
              {
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                    keywordFilter: 'Imperium',
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
                    keywordFilter: 'Imperium',
                  },
                ],
              },
            ],
          },
        ]
      }
    ],
  },
  simpleStub('tog', 14, 'Traitor', 'It\'s like Stay the Course, but with Chaos Keywords.'),
  simpleStub('tog', 15, 'Deamon Prince', 'Become a Deamon Prince!'),
];

const sotah = [
  simpleStub('sotah', 2, 'To Hunt the Alien', 'Join the Deathwatch, gain neat Ammunition.'),
  simpleStub('sotah', 3, 'Unnumbered Sons', 'Aaah, the Grayshields. Wait, what?'),
];

const goen = [
  simpleStub('goen', 9, 'The Titan walks', 'Gain a ship, but it can\'t fly, has feet and is a Titan and not a ship.'),
];

module.exports = [
  ...core,
  ...aaoa,
  ...ltgb,
  ...aotgt,
  ...thaot,
  ...sotah,
  ...goen,
];
