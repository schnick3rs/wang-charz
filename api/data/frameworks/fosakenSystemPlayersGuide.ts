import {Framework} from "../../shared/schemas/framework.schema";
import {getLegacySource} from "../legacy-sources";
import {SKILLS, TRAITS} from "../../shared/constants";

export const fspg: Framework[] = [
    {
        name: 'Sinful Tools',
        source: {
            ...getLegacySource('fspg'),
            page: 66,
        },
        key: 'fspg-sinful-tools',

        hint: 'You are a deniable asset for Archdeacon Clade, performing covert missions as penance and expected to die before revealing his secrets.',

        limitationsString: 'Must not have the ADEPTUS MINISTORUM Keyword, XENOS Keyword, or CHAOS Keyword; Tier 2 or below',
        wargearString: 'A prayer wafer laced with poison.',
        bonusString: 'Increase your Determination value by +1.',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Adeptus Ministorum', 'Xenos', 'Chaos'],
            },
            {
                condition: 'mustNot',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [
            { name: 'Prayer wafer laced with poison' },
        ],

        features: [
            {
                name: 'Sinful Determination',
                snippet: 'Increase your Determination value by +1.',
                modifications: [
                    {
                        targetGroup: 'traits',
                        targetValue: TRAITS.DETERMINATION,
                        modifier: 1,
                    }
                ]
            }
        ]
    },
    {
        name: 'Blessed Exemplars',
        source: {
            ...getLegacySource('fspg'),
            page: 67,
        },
        key: 'fspg-blessed-exemplars',

        hint: 'Imperial agents of the Ecclesiarchy, you enforce the Emperor’s will, punishing heresy within political limits while embodying Imperial ideals to inspire the masses.',

        limitationsString: 'Must have the IMPERIUM Keyword. Must not have the SCUM Keyword. Tier 2 or above.',
        wargearString: 'A cherubim or laud-hailer for the group',
        bonusString: '+1 Bonus Dice to Persuasion (Fel) Tests against characters with the IMPERIUM Keyword, ' +
            'unless they have the ADEPTUS MECHANICUS Keyword or ADEPTUS ASTARTES Keywords.',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Imperium', 'Scum'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 2,
            },
        ],

        wargear: [
            { name: 'cherubim or laud-hailer', shared: true },
        ],

        features: [
            {
                name: 'Exemplar Persuasion',
                snippet: '+1 Bonus Dice to Persuasion (Fel) Tests against characters with the IMPERIUM and not the ADEPTUS MECHANICUS or ADEPTUS ASTARTES Keywords',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.PERSUASION,
                        modifier: 1,
                        condition: 'against non-MECHANICUS / non-ASTARTES but IMPERIUM characters'
                    }
                ]
            }
        ]
    },
    {
        name: 'Mechavangelists',
        source: {
            ...getLegacySource('fspg'),
            page: 69,
        },
        key: 'fspg-mechavangelists',

        hint: 'A motley team secretly spreads the Omnissiah’s word and undermines Adeptus Ministorum faith across the system for Archdomina Vakuul.',

        limitationsString: 'Must not have the AELDARI or ORK Keywords.',
        wargearString: 'A servo-skull for the group',
        bonusString: '+1 bonus die to Persuasion (Fel) Tests against characters with the IMPERIUM Keyword.',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Aeldari', 'Ork'],
            },
        ],

        wargear: [
            { name: 'servo-skull for the group', shared: true },
        ],

        features: [
            {
                name: 'Mechanicus Gospel',
                snippet: '+1 bonus die to Persuasion (Fel) Tests against characters with the IMPERIUM Keyword.',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.PERSUASION,
                        modifier: 1,
                        condition: 'against IMPERIUM characters'
                    }
                ]
            }
        ]
    },
    {
        name: 'Hammer and/ or Anvil',
        source: {
            ...getLegacySource('fspg'),
            page: 69,
        },
        key: 'fspg-hammer-and-or-anvil',

        hint: 'Elite cybernetic warriors enforcing the Omnissiah\'s will through brutal efficiency in reclaiming tech and crushing heresy.',

        limitationsString: 'Must have the ADEPTUS MECHANICUS Keyword. ',
        wargearString: 'A combat servitor for the group.',
        bonusString: '+2 Bonus Dice to Influence Tests made when requisitioning Wargear from the Adeptus Mechanicus.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Adeptus Mechanicus'],
            },
        ],

        wargear: [
            { name: 'combat servitor for the group', shared: true },
        ],

        features: [
            {
                name: 'Mechanicus Gospel',
                snippet: '+2 Bonus Dice to Influence Tests made when requisitioning Wargear from the Adeptus Mechanicus.',
                modifications: [
                    {
                        targetGroup: 'traits',
                        targetValue: TRAITS.INFLUENCE,
                        modifier: 2,
                        condition: 'when requisitioning from the Adeptus Mechanicus'
                    }
                ]
            }
        ]
    },
    {
        name: 'Paper Punishers',
        source: {
            ...getLegacySource('fspg'),
            page: 71,
        },
        key: 'fspg-paper-punishers',

        hint: 'You are undercover auditors extremis, authorized by Master Lorae to discreetly investigate and punish bureaucratic heresy and crimes within the Sortium.',

        limitationsString: 'Must have the ADEPTUS ADMINISTRATUM Keyword.',
        wargearString: 'A Symbol of Authority with the ADEPTUS ADMINISTRATUM Keyword (badge depicting a quill stylised as a sword) for each individual.',
        bonusString: '+1 Bonus Dice to Scholar (Int) Tests pertaining to the Administratum or bureaucracy. ' +
            'You gain the ADEPTUS ADMINISTRATUM Keyword if you do not already have it.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Adeptus Administratum'],
            },
        ],

        wargear: [
            { name: 'Symbol of Authority', variant: 'badge depicting a quill stylised as a sword' },
        ],

        features: [
            {
                name: 'Bureaucratic Knowledge',
                snippet: '1 Bonus Dice to Scholar (Int) Tests pertaining to the Administratum or bureaucracy.',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.SCHOLAR,
                        modifier: 1,
                        condition: 'when pertaining to the Administratum or bureaucracy',
                    },
                ],
            },
            {
                name: 'Anointed Administrators',
                snippet: 'You gain the ADEPTUS ADMINISTRATUM Keyword if you do not already have it.',
                modifications: [
                    {
                        targetGroup: 'keywords',
                        targetValue: 'Adeptus Administratum',
                    },
                ],
            },
        ]
    },
    {
        name: 'Troubleshooters',
        source: {
            ...getLegacySource('fspg'),
            page: 71,
        },
        key: 'fspg-troubleshooters',

        hint: 'Undertake covert missions for Master Lorae across Ostia, often serving her personal interests.',

        limitationsString: 'Must have the IMPERIUM Keyword.',
        wargearString: 'A sharpened auto-quill with a reservoir of deadly toxin.',
        bonusString: '+1 Bonus Dice to Influence Tests made when requisitioning Wargear from the Adeptus Administratum.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
        ],

        wargear: [
            { name: 'auto-quill with a reservoir of deadly toxin' },
        ],

        features: [
            {
                name: 'Bureaucratic Requisition',
                snippet: '+1 Bonus Dice to Influence Tests made when requisitioning Wargear from the Adeptus Administratum.',
                modifications: [
                    {
                        targetGroup: 'traits',
                        targetValue: TRAITS.INFLUENCE,
                        modifier: 1,
                        condition: 'when requisitioning from the Adeptus Administratum',
                    },
                ],
            },
        ]
    },
    {
        name: 'In Plain Sight',
        source: {
            ...getLegacySource('fspg'),
            page: 73,
        },
        key: 'fspg-in-plain-sight',

        hint: 'Openly serve House Omincara as trusted agents, protecting Navigators on dangerous missions while representing the House\'s honour.',

        limitationsString: 'Any character with the IMPERIUM Keyword',
        wargearString: 'One Rare item for each individual (the item must be something worn openly and visibly).',
        bonusString: 'Gain the NAVIS NOBILITE Keyword.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
        ],

        wargear: [],

        features: [
            {
                name: 'Gift of the Navis',
                snippet: 'One Rare item for each individual (the item must be something worn openly and visibly).',
            },
            {
                name: 'Annointed Nobilite',
                snippet: 'Gain the NAVIS NOBILITE Keyword.',
                modifications: [
                    {
                        targetGroup: 'keywords',
                        targetValue: 'Navis Nobilite',
                    },
                ],
            },
        ]
    },
    {
        name: 'Third Eye, Blind',
        source: {
            ...getLegacySource('fspg'),
            page: 74,
        },
        key: 'fspg-third-eye-blind',

        hint: 'A covert House Omincara operative who conducts espionage, sabotage, theft, and assassination with absolute loyalty to protect the House\'s interests and eliminate its enemies.',

        limitationsString: 'Must have the IMPERIUM Keyword, Tier 3 or above.',
        wargearString: 'Any limbs or organs you lose in the course of your duties are replaced with an augmetic enhancement at the expense of House Omincara.',
        bonusString: '+1 Bonus Dice to Deception (Fel) Tests against characters with the IMPERIUM Keyword.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [],

        features: [
            {
                name: 'Omincara Care',
                snippet: 'Any limbs or organs you lose in the course of your duties are replaced with an augmetic enhancement at the expense of House Omincara.',
            },
            {
                name: 'Omincara Deception',
                snippet: '+1 Bonus Dice to Deception (Fel) Tests against characters with the IMPERIUM Keyword.',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.DECEPTION,
                        modifier: 1,
                        condition: 'against IMPERIUM characters'
                    },
                ],
            },
        ]
    },
    {
        name: 'Shadow Warriors',
        source: {
            ...getLegacySource('fspg'),
            page: 76,
        },
        key: 'fspg-shadow-warriors',

        hint: 'Covert agents of Inquisitor Dikaisune who relentlessly investigate and eliminate heresy, daemonic, xenos, and other threats across Gilead, ' +
            'calling on the Inquisition only when a danger exceeds their own capabilities.',

        limitationsString: 'Must not have the CHAOS or ORK Keywords, Tier 2 or below.',
        wargearString: 'None.',
        bonusString: '+1 Bonus Dice on Deception (Fel) Tests against characters with the IMPERIUM Keyword.',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Chaos', 'Ork'],
            },
            {
                condition: 'mustNot',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [],

        features: [
            {
                name: 'Dikaisune\'s Deception',
                snippet: '+1 Bonus Dice to Deception (Fel) Tests against characters with the IMPERIUM Keyword.',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.DECEPTION,
                        modifier: 1,
                        condition: 'against IMPERIUM characters'
                    },
                ],
            },
        ]
    },
    {
        name: 'Kill-Team',
        source: {
            ...getLegacySource('fspg'),
            page: 76,
        },
        key: 'fspg-kill-team',

        hint: 'An elite Inquisitorial strike force undertakes the Imperium\'s most dangerous missions against threats too' +
            ' powerful or secret for conventional forces to handle.',

        limitationsString: 'Must have the IMPERIUM Keyword, Tier 3 or above.',
        wargearString: 'None.',
        bonusString: '+1 Bonus Dice on Tests against characters with the CHAOS Keyword',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [
            { name: 'Symbol of Authority', variant: 'A Symbol of Authority with the INQUISITION Keyword'}
        ],

        features: [
            {
                name: 'Chaos-Hunter',
                snippet: '+1 Bonus Dice on Tests against characters with the CHAOS Keyword',
            },
        ]
    },
    {
        name: 'Eye, Ear, and Blade',
        source: {
            ...getLegacySource('fspg'),
            page: 79,
        },
        key: 'fspg-eye-ear-and-blade',

        hint: 'A covert Imperial intelligence team gathers secrets, hunts threats, and survives deadly missions without waiting for Space Marine aid.',

        limitationsString: 'Must have the IMPERIUM Keyword, Tier 2 or below.',
        wargearString: 'A vox bead for each individual.',
        bonusString: '+1 Bonus Dice to Resolve Tests.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
            {
                condition: 'mustNot',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [
            { name: 'Vox Bead' },
        ],

        features: [
            {
                name: 'Grim Resolve',
                snippet: '+1 Bonus Dice to Resolve Tests.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 1 },
                ]
            },
        ]
    },
    {
        name: 'Angels of Death',
        source: {
            ...getLegacySource('fspg'),
            page: 79,
        },
        key: 'fspg-angels-of-death',

        hint: 'Elite warriors of Captain Akahir, you undertake impossible special operations across Gilead, ' +
            'striking behind enemy lines and sacrificing all to secure victory.',

        limitationsString: 'Must have the IMPERIUM Keyword, Tier 3 or above.',
        wargearString: 'Each member receives 1 Ammo Point at the beginning of each mission.',
        bonusString: '+1 Bonus Dice to attacks targeting Mobs.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [
            { name: 'Ammo' },
        ],

        features: [
            {
                name: 'Plenty of Bullets',
                snippet: '1 Ammo Point at the beginning of each mission.',
                modifications: [
                    {
                        targetGroup: 'resources',
                        targetValue: 'reloads',
                        modifier: 1,
                    },
                ],
            },
            {
                name: 'Mob-Hunter',
                snippet: '+1 Bonus Dice to attacks targeting Mobs.',
            },
        ]
    },
    {
        name: 'Lay Servants',
        source: {
            ...getLegacySource('fspg'),
            page: 81,
        },
        key: 'fspg-lay-servants',

        hint: 'Lay Servants are faithful agents of the Ecclesiarchy who serve Canoness d’Emysa by gathering information, rooting out heresy, ' +
            'strengthening faith, and investigating signs of the Emperor’s presence in Gilead.',

        limitationsString: 'Must have the IMPERIUM Keyword.',
        wargearString: 'A purity seal for each member of the group',
        bonusString: '+1 Bonus Dice to Resolve Tests',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            },
        ],

        wargear: [
            { name: 'purity seal' },
        ],

        features: [
            {
                name: 'Grim Resolve',
                snippet: '+1 Bonus Dice to Resolve Tests.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 1 },
                ]
            },
        ]
    },
    {
        name: 'Holy Warriors',
        source: {
            ...getLegacySource('fspg'),
            page: 81,
        },
        key: 'fspg-holy-warriors',

        hint: 'Holy warriors of the Emperor, you carry out sacred missions across the Gilead System, purging heretics, ' +
            'mutants, and xenos in the name of the Adepta Sororitas.',

        limitationsString: 'Must have the ADEPTUS MINISTORUM Keyword, Rank 3 or above.',
        wargearString: 'Symbol of Authority with the ADEPTUS MINISTORUM Keyword.',
        bonusString: '+1 Bonus Dice to Corruption Tests',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Adeptus Ministorum'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 3,
            },
        ],

        wargear: [
            { name: 'Symbol of Authority', variant: 'Adeptus Ministorum Sign' },
        ],

        features: [
            {
                name: 'Bureaucratic Purity',
                snippet: '+1 Bonus Dice to Corruption Tests',
            },
        ]
    },
    // pawns and knigts
    // rooks and bishops
    // the elders
    // a motley crew
    // da intel-giz
    // da ard boys
    // lost and damed
    // slaves to darknwss
]