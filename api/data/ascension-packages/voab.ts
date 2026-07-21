import {simpleStub} from "./utils";

export const voab = [
    {
        name: 'Battle Company Doctrine',
        ...simpleStub('voab', 43, 'Battle Company Doctrine', '', false),
        cost: 60,
        costPerTier: 0,
        minimumCampaignTier: 3,
        prerequisites: ['Adeptus Astartes Species'],
        influenceBonus: 2,
        influencePerTier: 0,
        storyElementDescription:
            '<p>You have battled across countless worlds and faced all manner of heretics and xenos threats. You have mastered numerous weapons and your skills and conviction have earned you a place amongst a Battle Company of the Chapter.</p>',
        ascensionFeatures: [
            {
                key: 'talent-choice',
                name: 'Talent Choice',
                snippet: 'You gain Bolter Discipline, and either Built Tough or Chainsaw Warrior talent.',
                optionsPlaceholder: 'Talent choice',
                selected: [''],
                options: [
                    {
                        key: 'built-tough',
                        name: 'Built Tough',
                        snippet: 'You get the Built Tough talent.',
                        modifications: [
                            { targetGroup: 'talents', targetValue: 'voab-built-tough', meta: { name: 'Built Tough' } },
                        ],
                    },
                    {
                        key: 'chainsaw-warrior',
                        name: 'Chainsaw Warrior',
                        snippet: 'You get the Chainsaw Warrior talent.',
                        modifications: [
                            { targetGroup: 'talents', targetValue: 'voab-chainsaw-warrior', meta: { name: 'Chainsaw Warrior' } },
                        ],
                    },
                ],
            },
            {
                key: 'bolter-discipline',
                name: 'Bolter Discipline Talent',
                snippet: 'You gain the Bolter Discipline talent.',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'voab-bolter-discipline', meta: { name: 'Bolter Discipline' } },
                ],
            },
            {
                key: 'hatred',
                name: 'Hatred Talent',
                snippet: 'You gain the Hatred Talent against a different enemy if you already possess one.',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-hatred', meta: { name: 'Hatred [Any]' } },
                ],
            },
            {
                key: 'wargear',
                name: 'Wargear',
                wargear: [
                    {
                        name: 'A item, Uncommon',
                        selected: '',
                        options: [
                            {
                                filter: true,
                                valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                                rarityFilter: ['Uncommon'],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Crux Terminatus',
        ...simpleStub('voab', 43, 'Crux Terminatus', 'Veteran of the 1st Company, bearer of the Crux Terminatus.', false),
        cost: 60,
        costPerTier: 0,
        minimumCampaignTier: 3,
        prerequisites: [
            '1st Company Veteran, Chaplain or Librarian Archetype',
        ],
        influenceBonus: 0,
        influencePerTier: 0,
        keywordString: 'Adeptus Astartes',
        storyElementDescription:
            '<p>A 1st Company Veteran, Librarian, or Chaplain may begin with Terminator armour. Terminator armour comes with the following weapon combinations:</p>' +
            '<ul>' +
            '<li>Storm Bolter and Power Fist or Chainfist as standard.</li>' +
            '<li>The Storm Bolter may be exchanged for a Heavy Flamer or Assault Cannon.</li>' +
            '<li>Alternatively, the Powerfist/Chainfist may be exchanged for a Power Sword.</li>' +
            '<li>The Storm Bolter and Powerfist/Chainfist can both be exchanged for a pair of Lightning Claws.</li>' +
            '<li>If worn by a Chaplain, the Powerfist/Chainfist is replaced with a Crozius Arcanum.</li>' +
            '<li>If worn by a Librarian, the Powerfist/Chainfist is replaced with a Force Weapon.</li>' +
            '</ul>',
        ascensionFeatures: [
            {
                key: 'terminator-armour-requisition',
                name: 'Terminator Armour Requisition',
                snippet: 'You may begin with Terminator armour and select a weapon combination.',
                modifications: [
                    { targetGroup: 'wargear', targetValue: 'voab-terminator-armour', meta: { name: 'Terminator Armour' } },
                ],
                selected: '',
                options: [
                    {
                        key: 'power-fist-storm-bolter',
                        name: 'Power Fist & Storm Bolter',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-fist', meta: { name: 'Power Fist' } },
                            { targetGroup: 'wargear', targetValue: 'storm-bolter', meta: { name: 'Storm Bolter' } },
                        ],
                    },
                    {
                        key: 'chainfist-storm-bolter',
                        name: 'Chainfist & Storm Bolter',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'chainfist', meta: { name: 'Chainfist' } },
                            { targetGroup: 'wargear', targetValue: 'storm-bolter', meta: { name: 'Storm Bolter' } },
                        ],
                    },
                    {
                        key: 'power-fist-heavy-flamer',
                        name: 'Power Fist & Heavy Flamer',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-fist', meta: { name: 'Power Fist' } },
                            { targetGroup: 'wargear', targetValue: 'heavy-flamer', meta: { name: 'Heavy Flamer' } },
                        ],
                    },
                    {
                        key: 'power-fist-assault-cannon',
                        name: 'Power Fist & Assault Cannon',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-fist', meta: { name: 'Power Fist' } },
                            { targetGroup: 'wargear', targetValue: 'assault-cannon', meta: { name: 'Assault Cannon' } },
                        ],
                    },
                    {
                        key: 'chainfist-heavy-flamer',
                        name: 'Chainfist & Heavy Flamer',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'chainfist', meta: { name: 'Chainfist' } },
                            { targetGroup: 'wargear', targetValue: 'heavy-flamer', meta: { name: 'Heavy Flamer' } },
                        ],
                    },
                    {
                        key: 'chainfist-assault-cannon',
                        name: 'Chainfist & Assault Cannon',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'chainfist', meta: { name: 'Chainfist' } },
                            { targetGroup: 'wargear', targetValue: 'assault-cannon', meta: { name: 'Assault Cannon' } },
                        ],
                    },
                    {
                        key: 'power-sword-storm-bolter',
                        name: 'Power Sword & Storm Bolter',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-sword', meta: { name: 'Power Sword' } },
                            { targetGroup: 'wargear', targetValue: 'storm-bolter', meta: { name: 'Storm Bolter' } },
                        ],
                    },
                    {
                        key: 'power-sword-heavy-flamer',
                        name: 'Power Sword & Heavy Flamer',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-sword', meta: { name: 'Power Sword' } },
                            { targetGroup: 'wargear', targetValue: 'heavy-flamer', meta: { name: 'Heavy Flamer' } },
                        ],
                    },
                    {
                        key: 'power-sword-assault-cannon',
                        name: 'Power Sword & Assault Cannon',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'power-sword', meta: { name: 'Power Sword' } },
                            { targetGroup: 'wargear', targetValue: 'assault-cannon', meta: { name: 'Assault Cannon' } },
                        ],
                    },
                    {
                        key: 'lightning-claws',
                        name: 'Pair of Lightning Claws',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'aaoa-lightning-claw', meta: { name: 'Lightning Claw' } },
                            { targetGroup: 'wargear', targetValue: 'aaoa-lightning-claw', meta: { name: 'Lightning Claw' } },
                        ],
                    },
                    {
                        key: 'crozius-arcanum-storm-bolter',
                        name: '[Chaplain] Crozius Arcanum & Storm Bolter',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'crozius-arcanum', meta: { name: 'Crozius Arcanum' } },
                            { targetGroup: 'wargear', targetValue: 'storm-bolter', meta: { name: 'Storm Bolter' } },
                        ],
                    },
                    {
                        key: 'crozius-arcanum-heavy-flamer',
                        name: '[Chaplain] Crozius Arcanum & Heavy Flamer',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'crozius-arcanum', meta: { name: 'Crozius Arcanum' } },
                            { targetGroup: 'wargear', targetValue: 'heavy-flamer', meta: { name: 'Heavy Flamer' } },
                        ],
                    },
                    {
                        key: 'crozius-arcanum-assault-cannon',
                        name: '[Chaplain] Crozius Arcanum & Assault Cannon',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'crozius-arcanum', meta: { name: 'Crozius Arcanum' } },
                            { targetGroup: 'wargear', targetValue: 'assault-cannon', meta: { name: 'Assault Cannon' } },
                        ],
                    },
                    {
                        key: 'force-weapon-storm-bolter',
                        name: '[Librarian] Force Weapon & Storm Bolter',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'force-weapon', meta: { name: 'Force Weapon' } },
                            { targetGroup: 'wargear', targetValue: 'storm-bolter', meta: { name: 'Storm Bolter' } },
                        ],
                    },
                    {
                        key: 'force-weapon-heavy-flamer',
                        name: '[Librarian] Force Weapon & Heavy Flamer',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'force-weapon', meta: { name: 'Force Weapon' } },
                            { targetGroup: 'wargear', targetValue: 'heavy-flamer', meta: { name: 'Heavy Flamer' } },
                        ],
                    },
                    {
                        key: 'force-weapon-assault-cannon',
                        name: '[Librarian] Force Weapon & Assault Cannon',
                        modifications: [
                            { targetGroup: 'wargear', targetValue: 'force-weapon', meta: { name: 'Force Weapon' } },
                            { targetGroup: 'wargear', targetValue: 'assault-cannon', meta: { name: 'Assault Cannon' } },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Rubicon Primaris',
        ...simpleStub('voab', 43, 'Rubicon Primaris', '', false),
        cost: 80,
        costPerTier: 0,
        minimumCampaignTier: 3,
        prerequisites: ['Adeptus Astartes Species'],
        influenceBonus: 2,
        influencePerTier: 0,
        storyElementDescription:
            '<p>Few Space Marines could refuse the prospect of being remade, stronger and faster, more capable of waging war against the enemies of the Imperium. You have undergone the extensive and agonising operation required to be implanted with the three additional organs needed to join your Primaris brethren and now count yourself among those who have crossed the Rubicon Primaris.</p>',
        ascensionFeatures: [
            {
                key: 'bolter-discipline',
                name: 'Bolter Discipline',
                snippet: 'You gain the Bolter Discipline talent.',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'voab-bolter-discipline', meta: { name: 'Bolter Discipline' } },
                ],
            },
            {
                key: 'built-tough',
                name: 'Built Tough',
                snippet: 'You get the Built Tough talent.',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'voab-built-tough', meta: { name: 'Built Tough' } },
                ],
            },
            {
                key: 'primaris-keyword',
                name: 'Primaris Keyword',
                snippet: 'You gain the PRIMARIS keyword.',
                modifications: [
                    { targetGroup: 'keywords', targetValue: 'Primaris' },
                ],
            },
            {
                key: 'primaris-ascensions',
                name: 'Primaris Ascensions',
                snippet: 'In the future you may choose from the Primaris Ascension packages.',
            },
            {
                key: 'wargear',
                name: 'Wargear',
                wargear: [
                    {
                        name: 'A item, Uncommon',
                        selected: '',
                        options: [
                            {
                                filter: true,
                                valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                                rarityFilter: ['Uncommon'],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
