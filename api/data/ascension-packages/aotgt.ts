import {simpleStub} from "./utils";

export const aotgt = [
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
