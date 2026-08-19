import {simpleStub} from "./utils";

export const tog = [
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
