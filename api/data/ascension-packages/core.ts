import {simpleStub} from "./utils";

export const core = [
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