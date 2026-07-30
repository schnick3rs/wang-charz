import {Framework} from "../../shared/schemas/framework.schema";
import {getLegacySource} from "../legacy-sources";
import {SKILLS, TRAITS} from "../../shared/constants";

export const core: Framework[] = [
    {
        name: 'Varonius Vanguard',
        source: {
            ...getLegacySource('core'),
            page: 311,
        },
        key: 'core-varonius-vanguard',

        patron: {
            name: 'Rogue Trader Jakel Varonius',
            agents: 'Agents of the Flotilla',
        },

        hint: 'The Varonius Flotilla is a discreet problem-solving force operating across the Gilead System.',

        limitationsString: 'Any character with the IMPERIUM Keyword, and possibly an Aeldari mercenary — provided they are discreet.',
        wargearString: 'Each member of thegroup receives a Periculum Kit (p.238) and a Symbol of Authority (p.240) marking them as an agent of theVaronius Flotilla.',
        bonusString: '+1 bonus die to Influence Tests made when requesting Wargear from the Varonius Flotilla.',

        limitations: [
            {
                condition: 'must',
                type: 'keyword',
                key: ['Imperium'],
            }
        ],

        wargear: [
            { name: 'Periculum Kit' },
            { name: 'Symbol of authority', variant: 'Agent of theVaronius Flotilla' },
        ],

        features: [
            {
                name: 'Flotilla Influence',
                snippet: '+1 bonus die to Influence Tests made when requesting Wargear from the Varonius Flotilla.',
                modifications: [
                    {
                        targetGroup: 'traits',
                        targetValue: TRAITS.INFLUENCE,
                        modifier: 1,
                        condition: 'when requesting Wargear from the Varonius Flotilla'
                    }
                ]
            }
        ]
    },
    {
        name: 'The Deniables',
        source: {
            ...getLegacySource('core'),
            page: 311,
        },
        key: 'core-the-deniables',

        patron: {
            name: 'Rogue Trader Jakel Varonius',
            agents: 'Agents of the Flotilla',
        },

        hint: 'You are a Flotilla operative, expendable and controlled by Varonius.',

        limitationsString: 'None — if you can convince the pragmatic Varonius Dynasty you could be useful, you’re in',
        wargearString: 'A Frag Grenade Weapon Implant (p.246) with a remote detonator controlled by a Scion of theVaronius Dynasty.',
        bonusString: '+1 bonus dice to Deception (Fel) Tests against characters with the IMPERIUM Keyword',

        limitations: [],

        wargear: [
            { name: 'Frag Grenade Weapon Implant (Remote controlled by a Scion of theVaronius Dynasty.' },
        ],

        features: [
            {
                name: 'Flotilla Deception',
                snippet: '+1 bonus dice to Deception (Fel) Tests against characters with the IMPERIUM Keyword',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.DECEPTION,
                        modifier: 1,
                        condition: 'against IMPERIUM characters'
                    }
                ]
            }
        ]
    },
    {
        name: 'Cannon Fodder',
        source: {
            ...getLegacySource('core'),
            page: 313,
        },
        key: 'core-cannon-fodder',

        patron: {
            name: 'Lord-Militant Taleria Flyamon',
            agents: 'Agents of the Militant',
        },

        hint: 'Fylamon recruits untrained volunteers for dangerous frontline duties to test their potential for promotion.',

        limitationsString: 'Must not have the AELDARI or ORK Keywords',
        wargearString: 'A 9-70 Entrenching Tool (p.236) for every individual.',
        bonusString: '+1 bonus die whenever you Aim (p.189).',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Aeldari', 'Ork'],
            }
        ],

        wargear: [
            { name: '9-70 Entrenching Tool' },
        ],

        features: [
            {
                name: 'Flotilla Deception',
                snippet: '+1 bonus die whenever you Aim (p.189).',
            }
        ]
    },
    {
        name: 'Fylamon’s Finest',
        source: {
            ...getLegacySource('core'),
            page: 313,
        },
        key: 'core-fylamon-s-finest',

        patron: {
            name: 'Lord-Militant Taleria Flyamon',
            agents: 'Agents of the Militant',
        },

        hint: 'As an Imperial hammer, you crush rebellion and enforce justice in the Gilead System for the Astra Militarum.',

        limitationsString: 'Must not have the AELDARI, SCUM, or ORK Keywords, Tier 2 or above.',
        wargearString: 'A Survival Kit (p.239) and a 9-70 Entrenching Tool (p.236) for every individual, one Vox Caster (p.240) and one Martyr’s Gift Medikit (p.238).',
        bonusString: '+2 bonus dice to any Leadership (Wil) or Influence Test whilst on Gilead Primus.',

        limitations: [
            {
                condition: 'mustNot',
                type: 'keyword',
                key: ['Aeldari', 'Scum', 'Ork'],
            },
            {
                condition: 'must',
                type: 'character',
                key: 'tier',
                value: 2,
            }
        ],

        wargear: [
            { name: 'Survival Kit' },
            { name: '9-70 Entrenching Tool' },
            { name: 'Vox Caster', shared: true },
            { name: 'Martyr’s Gift Medikit', shared: true },
        ],

        features: [
            {
                name: 'Gilead Protects',
                snippet: '+2 bonus dice to any Leadership (Wil) or Influence Test whilst on Gilead Primus.',
                modifications: [
                    {
                        targetGroup: 'skills',
                        targetValue: SKILLS.LEADERSHIP,
                        modifier: 2,
                        condition: 'whilst on Gilead Primus',
                    },
                    {
                        targetGroup: 'traits',
                        targetValue: TRAITS.INFLUENCE,
                        modifier: 2,
                        condition: 'whilst on Gilead Primus',
                    },
                ]
            }
        ]
    },
]