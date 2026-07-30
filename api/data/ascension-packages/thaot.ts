import {simpleStub} from "./utils";

export const thaot = [
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
