import {simpleStub} from "./utils";

export const ltgb = [
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