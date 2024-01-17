import {source} from './_sourcesRepository';
import {SKILLS} from './_statUtils';

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
    name: 'Back From The Brink',
    ...simpleStub('core',150,'Back From The Brink','Dead, forgotten, found, rebuild.',false),
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: '[Any] (representing the Faction who saved you)',
    storyElementDescription:
      '<p>After a horrific encounter, you were somehow reconstructed by the marvels of holy (or unholy) technology.</p>' +
      '<ol>' +
      '<li>Roll on the Memorable Injury table (p.194) twice.</li>' +
      '<li>Roll on the Traumatic Injury (p.195) twice.</li>' +
      '<li>Replace any lost body parts with the appropriate augmetics; you may choose an option of any Rarity the GM deems appropriate.</li>' +
      '</ol>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the [Any] keyword, representing the Faction who saved you.',
        modifications: [
          { targetGroup: 'keywords', targetValue: '[ANY]' },
        ],
      },
      {
        key: 'memorableInjury',
        name: 'Memorable Injury',
        snippet: 'Grants +1 die to Intimidation when revealed.',
        modifications: [
          { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' },
          { name: 'Memorable Injury', targetGroup: 'skills', targetValue: 'intimidation', modifier: 1, condition: 'when revealed' },
        ],
      },
      {
        key: 'traumatic-injury-one',
        name: 'Traumatic Injury',
        snippet: 'Your roll on the Traumatic Injury Table',
        selected: '',
        optionsPlaceholder: 'Roll d6 and select a Injury',
        options: [
          {
            key: 'core-injury-one-hand',
            name: 'Hand',
            snippet: 'You suffer a severe hand injury; you can no longer use that hand. Losing both hands means you are unable to hold any weapons or similar gear.',
            wargear: [
              {
                key: 'appropriate-augmetics-hand',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-one-arm',
            name: 'Arm',
            snippet: 'You suffer a severe injury to your arm. Losing both arms means you are unable to hold any weapons or similar gear.',
            wargear: [
              {
                key: 'appropriate-augmetics-arm',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-one-foot',
            name: 'Foot',
            snippet: 'You suffer a severe foot injury. Losing both feet means you are unable to walk, Run, or Sprint, and may only Crawl (p.180).',
            wargear: [
              {
                key: 'appropriate-augmetics-foot',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-one-leg',
            name: 'Leg',
            snippet: 'You suffer a severe leg injury. Losing both legs means you are unable to walk, Run, or Sprint, and may only Crawl (p.180).',
            wargear: [
              {
                key: 'appropriate-augmetics-leg',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-one-torso',
            name: 'Torso',
            snippet: 'You suffer a severe injury that impairs your organs, like the heart, lungs, or liver. Any Toughness based Tests may become more difficult.',
            wargear: [
              {
                key: 'appropriate-augmetics-torso',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-one-eye',
            name: 'Eye',
            snippet: 'One of your eyes is damaged beyond repair. A single injured eye may add a penalty, such as +2 DN, to any Tests that require sight. Losing both eyes leaves you Blinded (p.199).',
            wargear: [
              {
                key: 'appropriate-augmetics-eye',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'traumatic-injury-two',
        name: 'Traumatic Injury',
        snippet: 'Your roll on the Traumatic Injury Table',
        selected: '',
        optionsPlaceholder: 'Roll d6 and select a Injury',
        options: [
          {
            key: 'core-injury-two-hand',
            name: 'Hand',
            snippet: 'You suffer a severe hand injury; you can no longer use that hand. Losing both hands means you are unable to hold any weapons or similar gear.',
            wargear: [
              {
                key: 'appropriate-augmetics-hand',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-two-arm',
            name: 'Arm',
            snippet: 'You suffer a severe injury to your arm. Losing both arms means you are unable to hold any weapons or similar gear.',
            wargear: [
              {
                key: 'appropriate-augmetics-arm',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-two-foot',
            name: 'Foot',
            snippet: 'You suffer a severe foot injury. Losing both feet means you are unable to walk, Run, or Sprint, and may only Crawl (p.180).',
            wargear: [
              {
                key: 'appropriate-augmetics-foot',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-two-leg',
            name: 'Leg',
            snippet: 'You suffer a severe leg injury. Losing both legs means you are unable to walk, Run, or Sprint, and may only Crawl (p.180).',
            wargear: [
              {
                key: 'appropriate-augmetics-leg',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-two-torso',
            name: 'Torso',
            snippet: 'You suffer a severe injury that impairs your organs, like the heart, lungs, or liver. Any Toughness based Tests may become more difficult.',
            wargear: [
              {
                key: 'appropriate-augmetics-torso',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
                  },
                ],
              },
            ],
          },
          {
            key: 'core-injury-two-eye',
            name: 'Eye',
            snippet: 'One of your eyes is damaged beyond repair. A single injured eye may add a penalty, such as +2 DN, to any Tests that require sight. Losing both eyes leaves you Blinded (p.199).',
            wargear: [
              {
                key: 'appropriate-augmetics-eye',
                name: 'Any option that the Gm deems appropriate',
                selected: '',
                options: [
                  {
                    filter: true,
                    typeFilter: ['Augmetics'],
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
    name: 'Dauntless Reputation',
    ...simpleStub('core', 151,'Dauntless Reputation','Acknowledged, praised, wellcomed, hated.', false),
    cost: 0,
    costPerTier: 30,
    minimumCampaignTier: 2,
    prerequisites: [],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 2,
    keywordString: '[Any]',
    storyElementDescription:
      '<p>You gain:</p>' +
      '<ul>' +
      '<li>The Devotees Talent (p.132). You do not need to meet the Leadership Skill prerequisite.</li>' +
      '<li>A tremendous reputation with a Faction.</li>' +
      '<li>A nemesis.</li>' +
      '</ul>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the [Any] keyword. And a tremendous reputation with that faction.',
        modifications: [
          { targetGroup: 'keywords', targetValue: '[Any]' },
        ],
      },
      {
        key: 'devotee',
        name: 'Devotees',
        snippet: 'You gain the Devotees talent.',
        description: '<p>You gain the Devotees talent. You do not need to meet the Leadership Skill prerequisites.</p>',
        modifications: [
          { targetGroup: 'talents', targetValue: 'core-devotees', meta: { name: 'Devotees' } },
        ],
      },
      {
        key: 'nemesis',
        name: 'Nemesis',
        snippet: 'You gain a nemesis.',
        description: '<p>You gain a nemesis. Work with your GM to figure out who this might be, or leave it a mystery.</p>',
      },
    ],
  },
  {
    name: 'Demanding Patron',
    ...simpleStub('core', 151,'Demanding Patron','Watched, promoted, demanded.', false),
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [
      'Persuasion 3',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 0,
    keywordString: '[Any] (the Faction of your patron)',
    storyElementDescription:
      '<p>You now report to a demanding patron between every adventure.</p>' +
      '<p>When you take this Ascension Package, choose to gain one of the following:</p>' +
      '<ul>' +
      '<li>Immediately gain 1 item of Rare Wagear with a value of 3 + new Tier.</li>' +
      '<li>Immediately gain 2 Wealth.</li>' +
      '<li>Immediately gain +2 Influence per Tier Ascended.</li>' +
      '</ul>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the [Any] keyword, the Faction of your now patron.',
        modifications: [
          { targetGroup: 'keywords', targetValue: '[Any]' },
        ],
      },
      {
        key: 'patrons-gift',
        name: 'A Patron`s Gift',
        snippet: 'Your Patron grants you either rare Wargear, two assets or significant influence',
        optionsPlaceholder: 'Choose: Wargear, Assets or Influence',
        options: [
          {
            key: 'wargear',
            name: 'Wargear',
            snippet: 'You gain one Rare item of value 3+Tier.',
            wargear: [
              {
                key: 'some-rare-item',
                name: 'A rare item',
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
            key: 'assets',
            name: 'Wealth',
            snippet: 'You gain +2 wealth.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'wealth', modifier: 2 },
            ],
          },
          {
            key: 'influence',
            name: 'Influence',
            snippet: 'You gain 2 influence per tier ascended.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'influence', modifier: 0, modifierPerAscendedTier: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Perfidious Wretch',
    ...simpleStub('core', 152,'Perfidious Wretch','Overseen, baited, convinced, turned.', false),
    cost: 0,
    costPerTier: 5,
    minimumCampaignTier: 2,
    prerequisites: [
      'Cunning 3',
    ],
    // Benefits
    influenceBonus: -2,
    influencePerTier: 0,
    keywordString: '[Any]',
    storyElementDescription:
      '<p>Your new allies gift you the following:</p>' +
      '<ul>' +
      '<li>3 Wealth</li>' +
      '<li>1 item of Rare Wargear with a value of 3 + new Tier.</li>' +
      '</ul>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the [Any] keyword, remove the Keyword you betrayed (not yet implemented).',
        modifications: [
          { targetGroup: 'keywords', targetValue: '[Any]' },
        ],
      },
      {
        key: 'wargear',
        name: 'Wargear',
        snippet: 'You gain one Rare item of value 3+Tier.',
        wargear: [
          {
            name: 'A item, 3+Tier, Rare',
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
        key: 'wealth',
        name: 'Wealth',
        snippet: 'You gain +3 wealth.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'wealth', modifier: 3 },
        ],
      },
    ],
  },
  {
    name: 'Psychic Revelations',
    ...simpleStub('core', 152, 'Psychic Revelations', 'Tap into the warp, awaken powers, lure the Immaterium.', false),
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Psyker',
    storyElementDescription :
      '<p>You gain:</p>' +
      '<ul>' +
      '<li>The Smite pschic power.</li>' +
      '<li>One minor power per tier ascended.</li>' +
      '<li>Access to one psychic disciplone.</li>' +
      '</ul>',
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
          //{ key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
          //{ key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
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
  {
    name: 'Stay The Course',
    ...simpleStub('core', 154, 'Stay The Course', 'Overcome struggles, build alliances, acquire equipment.', false),
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    storyElementDescription:
      '<p>If you do not have a Memorable Injury, roll on the Memorable Injury table (p.194) and decide with your GM how you received the Memorable Injury. You may choose to gain 3 Corruption points instead of, or in addition to, a Memorable Injury.</p>',
    wargearString:
      'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value ' +
      'equal or lesser than 3 + the new Tier. This may include augmetics.',
    ascensionFeatures: [
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
            key: 'corruption',
            name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 } ],
          },
          {
            key: 'memorableInjury',
            name: 'Memorable Injury (+1 die to Intimidation)',
            modifications: [
              { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' },
              { name: 'Memorable Injury', targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
            ],
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
];

const red2 = [
  {
    name: 'Cadre Questor',
    ...simpleStub('red2', 73, 'Cadre Questor', 'A quest, gladly taken or demandfull given', false),
    cost: 0,
    costPerTier: 30,
    minimumCampaignTier: 2,
    prerequisites: [],
    keywordString: '[Any]',
    // Benefits
    influenceBonus: 0,
    influencePerTier: 0,
    storyElementDescription:
        '<p>A Faction tasks or forces you into resolving a quest. You gain:</p>' +
        '<ul>' +
        '<li>The Devotee Talent</li>' +
        '<li>+1 Influence (or -1 if this is a punishment)</li>' +
        '<li>A quest, and +1 Influence on fullfillment</li>' +
        '<li>+Rank dice to persuade the right people</li>' +
        '</ul>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the [Any] Keyword of the group that gave you the quest and cadre.',
        modifications: [
          { targetGroup: 'keywords', targetValue: '[Any]' },
        ],
      },
      {
        key: 'source-of-the-quest',
        name: 'Source of the Quest',
        snippet: 'You gain +1 Influence (or -1, if this quest is a punishment).',
        description: '<p>You gain +1 Influence (or -1, if this quest is a punishment).</p>',
        selected: '',
        optionsPlaceholder: 'Choose granted or punishment',
        options: [
          {
            key: 'granted',
            name: 'Granted',
            snippet: 'You gain +1 Influence.',
            modifications: [
              { name: 'Granted', targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
            ],
          },
          {
            key: 'punishment',
            name: 'Punishment',
            snippet: 'You lose -1 Influence.',
            modifications: [
              { name: 'Punishment', targetGroup: 'traits', targetValue: 'influence', modifier: -1 },
            ],
          },
        ],
      },
      {
        key: 'devotee',
        name: 'Devotees',
        snippet: 'You gain the Devotees talent. If your Devotees die, you get -1 Influence.',
        description: '<p>You gain the Devotees talent. You do not need to meet the Leadership (Wil) Skill prerequisite. However, if your Devotees die, you get -1 Influence.</p>',
        modifications: [
          { targetGroup: 'talents', targetValue: 'core-devotees', meta: { name: 'Devotees' } },
        ],
      },
      {
        key: 'holy-quest',
        name: 'Holy Quest',
        snippet: 'Once completed you gain +1 Influence.',
        description: '<p>A holy quest to perform. If you complete the quest, you gain +1 Influence.</p>',
        selected: '',
        optionsPlaceholder: 'Choose wip or done',
        options: [
          {
            key: 'ongoing',
            name: 'Ongoing',
            snippet: 'Fulfill your destiny to gain +1 Influence.',
          },
          {
            key: 'completed',
            name: 'Completed',
            snippet: 'You gain +1 Influence.',
            modifications: [
              { name: 'Completed', targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
            ],
          },
        ],
      },
      {
        key: 'persuasive',
        name: 'Persuasive',
        snippet: '+Rank dice to persuasion when targeting creatures with the awarded keyword that know of your quest.',
        description: '<p>You gain +Rank bonus dice on any Persuasion (Fel) Test targeting individuals with the awarded Keyword that know of your quest.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when targeting those that know of your quest'},
        ],
      },
    ],
  },
];

const aaoa = [
  {
    name: 'Agent of the Inquisition',
    ...simpleStub('aaoa', 127, 'Agent of the Inquisition', 'Join the Inquisition (that was unexpected).', false),
    description: '<p>You have been recruited by an Inquisitor to continue the ongoing fight against the Enemies of the Imperium. You’re not merely an informant or minion bearing the Inquisition’s mark, but a trusted associate and confidante of an Inquisitor, with valued skills, experience, and insights, and the ability to wield some measure of their authority.</p>',
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      'Persuasion 2 or Awareness 2',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Inqisition, [Ordo]',
    storyElementDescription:
      '<p>Your new status as an Agent of the Inquisition means that they may invoke the name of your Inquisitor to gain +Rank to an Influence or social Skill test involving a character with the IMPERIUM keyword, once per scene.</p>' +
      '<p>Because of the circumstances of your recruitment to the Inquisition, you gain 3 Corruption points and a Memorable Injury.</p>',
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the INQUISITION and [ORDO] keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Inquisition' },
          { targetGroup: 'keywords', targetValue: '[Ordo]' },
        ],
      },
      {
        key: 'authority-of-the-inquisition',
        name: 'Authority of the Inquisition',
        snippet: 'You add +Rank dice to Influence and Interaction Skill Tests involving a IMPERIUM character.',
        description:
          '<p>Your new status as an Agent of the Inquisition means that they may invoke the name of your Inquisitor to gain +Rank to an Influence or social Skill test involving a character with the IMPERIUM keyword, once per scene.</p>',
      },
      {
        key: 'scourged-from-experience',
        name: 'Scourged from experience',
        snippet: 'You gain 3 points Corruption or a Memorable Injury.',
        description: '<p>Because of the circumstances of your recruitment to the Inquisition, you gain 3 Corruption points and a Memorable Injury.</p>',
        selected: '',
        optionsPlaceholder: 'Choose corruption ro injury',
        options: [
          {
            key: 'corrupted',
            name: 'Corrupted',
            snippet: 'You gain 3 points Corruption.',
            modifications: [
              { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
            ],
          },
          {
            key: 'memorable-injury',
            name: 'Memorable Injury',
            snippet: 'You add +1 die to Intimidation Tests.',
            modifications: [
              { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' },
              { name: 'Memorable Injury', targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
            ],
          },
        ],
      },
      {
        key: 'wargear',
        name: 'Wargear',
        description:
          '<p>Inquisitorial Rosette (symbol of authority), plus up to two items of Rare Wargear, or one item of Very Rare Wargear, with a Value up to 3 + the new Tier.</p>',
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
    name: 'Apocryphon Oath',
    ...simpleStub('aaoa', 127, 'Apocryphon Oath', 'The Deathwatch have requested your service.',false),
    description: '<p>You have sworn to serve the Deathwatch, perhaps for a decade-long Vigil, perhaps in perpetuity. Either way, you are amongst the mightiest of Astartes, and you shall not suffer the alien to live.</p>',
    cost: 0,
    costPerTier: 10,
    minimumCampaignTier: 4,
    prerequisites: [
      'Willpower 4',
      'Ballistic Skill 5 OR Weapon Skill 5',
      'Scholar 2',
      'You must be Adeptus Astartes or Primaris Astartes.'
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    keywordString: 'Deathwatch, Inqisition, Ordo Xenos',
    storyElementDescription:
      '<p>You join the ranks of the Deathwatch, and you are initiated into secrets that allow you to hunt Xenos more effectively. You receive the normal benefit for having the Ordo Xenos keyword (page 64 of the Wrath & Glory core rulebook) and have access to special Deathwatch arsenals containing rare and specialised equipment.</p>' +
      '<p>Further, due to your specialised training, at each Regroup, you may select a single keyword which relates to a Xenos faction. You add +Rank ED to all attacks against enemies with that keyword.</p>',
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
          '<p>You join the ranks of the Deathwatch, and you are initiated into secrets that allow you to hunt Xenos more effectively. You receive the normal benefit for having the Ordo Xenos keyword (page 64 of the Wrath & Glory core rulebook) and have access to special Deathwatch arsenals containing rare and specialised equipment.</p>',
      },
      {
        key: 'deathwatch-training',
        name: 'Deathwatch Training',
        description:
          '<p>Further, due to your specialised training, at each Regroup, you may select a single keyword which relates to a Xenos faction. You add +Rank ED to all attacks against enemies with that keyword.</p>',
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
  },
  {
    name: 'Crux Terminatus',
    ...simpleStub('aaoa', 128, 'Crux Terminatus', '"May I request a Terminator Armour, please?"', false),
    description:
      '<p>The Crux Terminatus is a stone medallion awarded to highly skilled and experienced Space Marine Veterans. All members of a Chapter trained in the use of Terminator Armour will have been first awarded the Crux Terminatus. These badges, set into the left shoulder plate of Terminator armour, are highly distinctive and usually fashioned from stone. In Codex Chapters, members of the Chapter\'s veteran First Company are the exclusive users of Terminator armour.</p>' +
      '<p>This Honour appears most commonly as a skull set onto a cruciform shape of red iron or bone. Terminator sergeants often add crossed bones behind the skull, whilst lightning bolts behind the skull are often added for Terminators trained as Assault units wielding lightning claws and thunder hammers with storm shields. Variations include the size and dimensions of the skull and the removal of the crossed lightning bolts or bones or their scale in relation to the shape of the cruciform. The Crux Terminatus is almost always worn on the left shoulder pad, though it may also be worn on one knee pad (this is usually done only in combination with the shoulder pad, however). Legend has it that the first Crux Terminatus ever crafted contained a tiny fragment of the Emperor\'s own armour within it, an honour granted to commemorate a squad of Imperial Fists Terminators who aided the Emperor in the battle against Horus. Whether or not this is true it means that ancient suits of power armour bearing Terminator Honours are considered even more rare and precious to a Chapter as a result of their reputed connection to the Master of the Imperium.</p>',
    cost: 50,
    costPerTier: 0,
    minimumCampaignTier: 2,
    prerequisites: [
      'Ballistic Skill 5 or Weapon Skill 5',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 2,
    keywordString: 'none',
    storyElementDescription:
      '<p>You are an honoured veteran amongst the Adeptus Astartes, and even when not wearing Terminator Armour, you are amongst the mightiest and most dedicated warriors in the Imperium. Your Resolve is increased by +2, and whenever you succeed at a Weapon Skill, Ballistic Skill, or Leadership test, you may shift a single exalted icon to allow yourself and all allies with the ADEPTUS ASTARTES keyword within 15m to recover 1+Rank Shock.</p>',
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
        snippet: 'Shift a single exalted icon per Test (Weapon Skill, Ballistic Skill, Leadership) and all ADEPTUS ASTARTES allies within 15m recover 1+Rank Shock.',
        description:
          '<p>Whenever the character makes a successful Weapon Skill, Ballistic Skill, or Leadership test, ' +
          'they may shift a single exalted icon to allow themselves and all allies with the ADEPTUS ASTARTES keyword within 15m to heal 1+Rank Shock.</p>',
      },
      {
        key: 'terminator-armour-requisition',
        name: 'Terminator Armour Requisition',
        snippet: 'The character may request a Terminator Armour and accompanying Weapons or may begin the mission with +1 Wrath.',
        description:
          '<p>You gain a suit of Terminator Armour, and one of the following weapon selections:</p>' +
          '<ul class="mb-2">' +
          '<li>Storm Bolter and Power Sword</li>' +
          '<li>Storm Bolter and Power Fist</li>' +
          '<li>Thunder Hammer and Storm Shield</li>' +
          '<li>Paired Lightning Claws</li>' +
          '</ul>' +
          '<p>You may not always be able to use your Terminator Armour and its accompanying weapons; if you choose not to deploy in your Terminator armour, or are unable to use it, you begin the mission with +1 Wrath instead.</p>',
      },
    ],
  },
  {
    name: 'The Rubicon Primaris',
    ...simpleStub('aaoa', 128, 'The Rubicon Primaris', 'Pick an Astartes and cross the rubicon to show those trueborn Primaris who´s boss.',false),
    description:
      '<p>The induction of the Primaris Marines into the Adeptus Astartes was not an easy process by any means. The Chapters of the Space Marines are arch traditionalists, and some are conservative in the extreme, having upheld the same warrior traditions for thousands of Terran years. Of course, the express command of Roboute Guilliman as the Lord Commander of the Imperium eased the transition into the new era.</p>',
    cost: 40,
    costPerTier: 0,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Strength 5',
      'Toughness 5',
      'Ballistic Skill 4',
      'Weapon Skill 4',
      'ADEPTUS ASTARTES Keyword',
      'NOT PIRMARIS ASTARTES Keyword',
    ],
    // Benefits
    influenceBonus: 1,
    influencePerTier: 0,
    keywordString: 'Primaris Astartes',
    storyElementDescription:
      '<p>You become a Primaris Marine. Increase your Strength and Toughness by +1 each, and +3 Wounds. In addition, you no longer suffer impurities in your Chapter Gene-Seed, and you benefit from the Primaris implants alongside your original Space Marine Implants. The cost for all these benefits is included in the cost of taking this package.</p>',
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
          '<p>You become a Primaris Marine. Increase your Strength and Toughness by +1 each, and +3 Wounds.</p>' +
          '<p>In addition, you no longer suffer impurities in your Chapter Gene-Seed, and you benefit from the Primaris implants alongside your original Space Marine Implants.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'wounds', modifier: 3 },
        ],
      },
      {
        ky: 'wargear',
        name: 'Wargear',
        description:
          '<p>You may replace your weapons with the nearest equivalents which have the Primaris keyword, and you replace your Power Armour with a suit of Mark X Power Armour (your choice of Tacticus, Phobos, or Gravis). At the GM’s discretion, unique wargear may be altered or upgraded to fit your enhanced form.</p>',
      },
    ],
  },
  {
    name: 'Lost upon the Path of the Warrior',
    ...simpleStub('aaoa', 129, 'Lost upon the Path of the Warrior', 'Gain some fancy Exarch gear but not everyone is pleased.', false),
    description:
      '<p>An Exarch is a former Eldar Aspect Warrior who has lost himself upon the Eldar Path of the Warrior and is unable to ever leave it again. At this point he is considered to have abandoned the Eldar Paths with their promise of new experiences and development of new skills in favour of a constant life of bloodshed. The Eldar becomes the elite warrior called an Exarch; simultaneously, an Exarch is a priest of Kaela Mensha Khaine, the Eldar God of War as well as a caretaker of the individual warrior shrine, and trainer, teacher, and instructor for other Aspect Warriors. The sacrifice of an Eldar Exarch can summon an Avatar of Kaela Mensha Khaine. He is equipped with ancient and powerful Eldar weaponry and armour. Each Eldar Warrior Aspect has its own particular kind of Exarch. On the battlefield, an Exarch commands an individual squad of Eldar Aspect Warriors. Exarchs are formidable opponents, and most of them can use their often-potent psychic and combat abilities to help the whole squad of Aspect Warriors under their command.</p>',
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Aeldari Species',
      'ASPECT WARRIOR Keyword',
    ],
    // Benefits
    alert: 'Excarch powers are not yet implemented',
    influenceBonus: 0,
    influencePerTier: 1,
    keyworString: 'Exarch',
    storyElementDescription:
      '<p>You take up the armour, identity, and Aspect Shrine of an Exarch of your Aspect. This has a number of effects:</p>' +
      '<ul>' +
      '<li>Lost to War: You can no longer empathise with those who have not devoted their existence to war. You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return.</li>' +
      '<li>Students of War: You gain followers as per the Devotees talent, without needing to meet the Leadership requirement. These followers are Aspect Warriors from your shrine.</li>' +
      '<li>Master of War: You may purchase Exarch powers. You may purchase one power if you are Tier 4, or two if you are Tier 5 or higher.</li>' +
      '</ul>',
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
        key: 'lost-to-war',
        name: 'Lost to War',
        description:
          '<p>You can no longer empathise with those who have not devoted their existence to war. You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return.</p>',
      },
      {
        key: 'students-of-war',
        name: 'Students of War',
        description:
          '<p>You gain followers as per the Devotees talent, without needing to meet the Leadership requirement. These followers are Aspect Warriors from your shrine.</p>',
        modifications: [
          { targetGroup: 'talents', targetValue: 'core-devotees', meta: { name: 'Devotees' } },
        ],
      },
      {
        key: 'master-of-war',
        name: 'Master of War',
        description:
          '<p>You may purchase Exarch powers. You may purchase one power if you are Tier 4, or two if you are Tier 5 or higher.</p>'
      },
      {
        key: 'exarch-armour',
        name: 'Exarch Armour',
        description:
          '<p>You replace your Aspect Armour with Exarch Armour, which provides the same functions but has an Armour Rating of 6 and loses the Bulky (X) or Cumbersome traits (if it had them).</p>',
        wargear: [
          { name: 'Exarch Armour' },
        ],
      },
      {
        key: 'exarch-weapon',
        name: 'Exarch Weapon',
        description:
          '<p>All of your weapons gain the Master-Crafted upgrade, and you may replace one of your weapons with a weapon of any rarity and a Value of up to 5 + the new Tier. The GM may create a unique weapon, an ancient relic of the Aeldari, for this purpose.</p>',
        wargear: [
          {
            key: 'one-unique-weapon',
            name: 'You may replace one of your weapons with a weapon of any rarity and a Value of up to 5 + the new Tier.',
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
    name: 'Lost upon the Seer Path',
    ...simpleStub('aaoa', 130, 'Lost upon the Seer Path', 'A prophet for the Aeldari, but lost on this course.', false),
    description:
      '<p>A Farseer is the most potent and respected form of Eldar psyker or Seer. A Farseer has become lost upon the Path of the Seer forever in the same way as the Exarchs are wed eternally to the Path of the Warrior. A council of the most powerful Farseers generally governs a Craftworld. Farseers possess a wide diversity of psychic specialities with divination being the most common skill. They are most often known for using their vast psychic powers to see the possibilities of the future so that they can manipulate events to better ensure the survival of the Eldar species in the wake of the Fall.</p>',
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 6',
      'Insight 6',
      'Psychic Mastery 6',
      'Aeldari Species',
      'ASURYANI Keyword',
      'PSYKER Keyword',
    ],
    // Benefits
    alert: 'The Special path Psychic powers not yet implemented.',
    influenceBonus: 3,
    influencePerTier: 0,
    keywordString: 'Farseer',
    storyElementDescription:
      '<p>You gain the Prescience and Scrier’s Gaze psychic powers, if you did not already possess them (if you already possess them, you gain additional XP equal to their costs to spend on other powers). In addition, you may now purchase psychic powers from the Runes of Fate discipline.</p>' +
      '<p>You may use your Willpower instead of your Fellowship to determine your Influence.</p>',
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
        snippet: 'You gain the Prescience and Scrier’s Gaze psychic powers and access to the Runes of Faith Discipline.',
        description:
          '<p>You gain the <em>Prescience</em> and <em>Scrier’s Gaze</em> psychic powersif you did not already possess them (if you already possess them, you gain additional XP equal to their costs to spend on other powers).</p>' +
          '<p>In addition, you may now purchase psychic powers from the <em>Runes of Fate</em> discipline.</p>',
        psychicPowers: [
          { key: 'ascension-Prescience', selected: 'Prescience', query: { name: 'Prescience' }, options: [], free: true },
          { key: 'ascension-scriers-gaze', selected: 'Scrier’s Gaze', query: { name: 'Scrier’s Gaze' }, options: [], free: true },
        ],
        modifications: [
          { targetGroup: 'psychicDisciplines', targetValue: 'Runes of Faith' },
        ],
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
    name: 'Reborn',
    ...simpleStub('aaoa', 130, 'Reborn', 'Once an Aeldari, now Yinnari',false),
    description:
      '<p>The Ynnari are the members of a newly formed eponymous Eldar group that worship the God Ynnead and believe their race can be saved from the depredation of Slaanesh by helping to bring about the birth of the slumbering god of the dead.</p>' +
      '<p>Under the leadership of the prophet Yvraine, the "Daughter of Shades," the Ynnari seek to fully awaken the Aeldari god of the dead Ynnead, who they believe can defeat Slaanesh and restore the Aeldari species\' unity and its lost glory.</p>' +
      '<p>They aim to achieve this in a ritual that would not require the sacrifice of the entire Aeldari species, using a method known as the "Seventh Path" or the "Seventh Way."</p>' +
      '<p>A great many Aeldari, hailing from every sub-faction and allegiance save the most conservative and entrenched, have joined their cause. No abstract philosophy is this, for the effects of their new deity can be seen manifesting around them -- the Reborn can draw upon the souls within the Spirit Stones they wear to bolster their own abilities, can siphon the power of those slain nearby to invigorate their attacks, and turn their foes to ashes with the strange weapons and psychic powers they wield.</p>',
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      'Aeldari or Drukhari Species',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    keywordString: 'Ynnari',
    storyElementDescription:
      '<p>You have been reborn as one of the Ynnari, and you now have a powerful connection to the spirits of the dead. You may attempt a Psychic Mastery test (even if untrained) in order to communicate with the spirits of Aeldari dead (contained within spirit stones, infinity circuits, Exodite world-spirits, and similar). Further, you gain the Strength From Death ability, below:</p>' +
      '<p><strong>STRENGTH FROM DEATH</strong>: Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you Regroup or take a Respite. Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied YNNARI characters within 10m.</p>',
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
          '<p>You may attempt a Psychic Mastery test (even if untrained) in order to communicate with the spirits of Aeldari dead (contained within spirit stones, infinity circuits, Exodite world-spirits, and similar).</p>',
      },
      {
        key: 'strength-from-death',
        name: 'Strength From Death',
        description:
          '<p>Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you Regroup or take a Respite. Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied YNNARI characters within 10m.</p>',
      },
      {
        key: 'spiritual-harvester',
        name: 'Spiritual Harvester',
        description:
          '<p>When carried by an YNNARI character, a Spirit Stone may be used to generate 1d3+1 Soul tokens as a Simple Action as the character taps into the powerful spirits within. This takes time to recover, and cannot be done again until after the next Respite..</p>',
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
  {
    name: 'Willing Possession',
    ...simpleStub('aaoa', 131, 'Willing Possession', 'Invited a deamon (knock, knock) into yourself, boosting stats and corruption.',false),
    description:
      '<p>Daemonic Possession is the act of the essence of a Daemon possessing and controlling the body of another being. As Daemons can only exist in the Materium for a limited period before being forced back into the Warp, Daemonic Possession is one of the most common methods for Daemons to enter the material realm. Daemonic Possession can occur involuntarily to those of psychic potential, but the host sometimes willingly gives themselves over to Daemonic Possession, as is the case with Possessed Chaos Space Marines and certain Cultists. Possessed individuals can often be used as gateways to the Warp, allowing Daemons to spill into the Materium.</p>' +
      '<p>A character selecting this Ascension Package has invited a daemon into their flesh, granting them tremendous power, at the cost of subjecting their body, mind, and soul to the ravening touch of the Warp. Few who become possessed can endure it for long, often finding their bodies degenerating into spawndom or becoming purely a vessel for the daemon’s will, but some can find a degree of symbiosis with the daemon they are host to, becoming a singular mighty entity.</p>',
    cost: 0,
    costPerTier: 20,
    // Prerequisites
    minimumCampaignTier: 3,
    alert: 'Corruption is not added correctly currently. Also, no mutaiton selection.',
    prerequisites: [
      'Willpower 4',
      'CHAOS Keyword',
    ],
    // Benefits
    influenceBonus: 3,
    influencePerTier: 0,
    // corruption: +3, see below
    keywordString: 'Daemon',
    storyElementDescription:
      '<p>The character is now possessed by a daemon of Chaos. You immediately gain 1d3 Corruption per Tier ascended. Then, you gain a number of benefits:</p>' +
      '<ul class="mb-2">' +
      '<li>DAEMONIC: You may roll Determination against Mortal Wounds, and you do not suffer Shock when you roll Determination.</li>' +
      '<li>ACCURSED VIGOUR: Select three attributes when you take this Ascension Package; as a Free Action on your turn, you may gain a number of bonus dice to those attributes equal to the campaign’s Tier. You may sustain this for as many rounds as you wish (or minutes, if outside of combat), but when you stop using this ability, you suffer 1d3 Shock, +1 for each Round (or minute) you used the daemon’s power, and gain +1d3 Corruption.</li>' +
      '<li>MUTATED FORM: While using the daemon’s power, you gain the Horns, Spines, Fangs, or Claws minor mutation (page 290 of the Wrath & Glory rulebook), and a single severe mutation, determined when the character first became possessed.</li>' +
      '</ul>',
    // Crunch
    ascensionFeatures: [
      {
        key: 'keywords',
        name: 'Keywords',
        snippet: 'You gain the Daemon keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Daemon' },
        ],
      },
      {
        key: 'heavily-corrupted',
        name: 'Heavily Corrupted',
        snippet: 'You gain 1d3 points Corruption per tier ascended.',
        selected: '',
        optionsPlaceholder: 'Choose your amount of corruption.',
        options: [
          { key: 'corruption-1', name: 'Corruption (1pt)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 1 }] },
          { key: 'corruption-2', name: 'Corruption (2pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 2 }] },
          { key: 'corruption-3', name: 'Corruption (3pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }] },
          { key: 'corruption-4', name: 'Corruption (4pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 4 }] },
          { key: 'corruption-5', name: 'Corruption (5pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 5 }] },
          { key: 'corruption-6', name: 'Corruption (6pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 6 }] },
          { key: 'corruption-7', name: 'Corruption (7pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 7 }] },
          { key: 'corruption-8', name: 'Corruption (8pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 8 }] },
          { key: 'corruption-9', name: 'Corruption (9pts)', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 9 }] },
        ],
      },
      {
        key: 'deamonic',
        name: 'Deamonic',
        description:
          '<p>You may roll Determination against Mortal Wounds, and you do not suffer Shock when you roll Determination.</p>',
      },
      {
        key: 'accursed-vigor',
        name: 'Accursed Vigor',
        description:
          '<p>Select three attributes when you take this Ascension Package; as a Free Action on your turn, you may gain a number of bonus dice to those attributes equal to the campaign’s Tier. You may sustain this for as many rounds as you wish (or minutes, if outside of combat), but when you stop using this ability, you suffer 1d3 Shock, +1 for each Round (or minute) you used the daemon’s power, and gain +1d3 Corruption.</p>',
      },
      {
        key: 'mutated-form',
        name: 'Mutated Form',
        description:
          '<p>While using the daemon’s power, you gain the Horns, Spines, Fangs, or Claws minor mutation (page 290 of the Wrath & Glory rulebook), and a single severe mutation, determined when the character first became possessed.</p>',
        // TODO mutation options
      },
      {
        key: 'melded-wargear',
        name: 'Melded Wargear',
        description:
          '<p>While manifesting the daemon’s power, it tends to meld your wargear and your flesh together, but this effect is normally reversed when you revert to your mortal state.</p>',
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
    ...simpleStub(
      'tog',
      14,
      'Veteran of the Long War',
      'You have a burning Hatred for (well, against) the Imperium.',
      false,
      ),
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Skills +1',
      'Heretic Astartes',
      'Hatred IMPERIUM',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 2,
    storyElementDescription:
      '<p>You may apply your Hatred Damage Bonus to Ranged attacks against those that bear the IMPERIUM keyword and you gain a +Rank bonus to Resolve tests.</p>' +
      '<p>You also gain 2 corruption per tier ascended</p>' +
      '<p>Also some items.</p>',
    wargearString: '',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Further corrupted',
        description: '<p>You gain +2 corruption per tier ascended</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 0, modifierPerAscendedTier: 2 },
        ],
      },
      {
        name: 'Death to the False Emperor',
        description: '<p>You may apply your Hatred Damage Bonus to Ranged attacks against those that bear the IMPERIUM keyword and you gain a +Rank bonus to Resolve tests.</p>',
        modifications: [
          { name: 'Death to the False Emperor', targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 4 the new Tier. This may include augmetics.',
        options: [
          {
            name: 'Two Rare Items ',
            wargear: [
              {
                name: 'First Rare Item of Value new Tier+4',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue:4 },
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
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 4 },
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
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 4 },
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
  ...red2,
  ...aaoa,
  ...tog,
  ...ltgb,
  ...aotgt,
  ...thaot,
  ...sotah,
  ...goen,
];
