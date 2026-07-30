import { requireKeyword, talent} from "./utils";

export const lex = [
    {
        ...talent('lex', 14, 'Break the Line', 20, 'Glory'),
        requirements: [
            requireKeyword('Imperium,Adeptus Arbites'),
        ],
        snippet: 'As a Simple Action, spend a point of Glory. All attacks you make this turn gain +Double Rank Bonus Dice. Enemies that suffer damage from any melee attacks you make this turn also gain the Staggered Condition until their next Turn.',
    },
    {
        ...talent('lex', 14, 'Breaking Dissent', 20, 'Glory'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'As a Simple Action, spend a point of Glory. You and any Allies with the ADEPTUS ARBITES keyword within a 15m radius inflict +Rank additional ED against enemies with the Staggered condition until the end of the next combat round.',
    },
    {
        ...talent('lex', 15, 'Castigator\s Stance', 20, 'Glory'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'As a Simple Action, spend a point of Glory. You gain +Rank movement speed, and the effects of “Full Defence” without the movement or action penalties for 1 round. Upon activation, roll Determination and replenish wounds and gain shock as normal.',
    },
    {
        ...talent('lex', 15, 'Fury of the Lawbringer', 10, 'Glory'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'As a Simple Action, spend a point of Glory. For +Rank rounds, you and any Allies with the ADEPTUS ARBITES keyword are immune to the Pinned, Staggered, and Fear conditions.',
    },
    {
        ...talent('lex', 15, 'Go Get \'Em!', 10, 'Mastiff'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'Your Cyber Mastiff gains +Double Rank bonus dice when rolling to hit against Mobs of enemies.',
    },
    {
        ...talent('lex', 15, 'Lone Wolf', 20),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'When not within 20m of an ally, you gain +Rank to Determination and Weapon Skill Tests, as well as reducing multi-attack DN by 2 (to a minimum of 0).',
    },
    {
        ...talent('lex', 15, 'Part of the Squad', 10, 'Glory,Mastiff'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'As a reaction, you may spend a point of Glory to make your Cyber Mastiff intercept an attack against yourself or an Ally (Target must be within 8m of the Cyber Mastiff). You must choose to do this after the attack is rolled, but before damage is applied. A Cyber Mastiff that receives damage in this way reduces the amount received by +Rank.',
    },
    {
        ...talent('lex', 15, 'Ruthless Efficiency', 10, 'Salvo'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'Once per combat, you may perform 1 Salvo attack without needing to Reload afterwards.',
    },
    {
        ...talent('lex', 15, 'Stand and Die Protocol', 20, 'Glory'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'As a Simple Action, you may spend a point of Glory to declare that the STAND AND DIE PROTOCOL is in effect. You and allies within 30m with the ADEPTUS ARBITES keyword may immediately make a ranged attack. Additionally, until the end of the current encounter or until moving away from a foe, they automatically pass any Leadership tests they are required to make. The STAND AND DIE PROTOCOL may be declared only once per encounter.',
    },
    {
        ...talent('lex', 15, 'Unleashed Brutality', 10, 'Mastiff'),
        requirements: [
            requireKeyword('Adeptus Arbites'),
        ],
        snippet: 'When you and your Cyber Mastiff are tracking a known target together, your Cyber Mastiff’s attacks gain +Rank ED vs Elites and Adversaries.',
    },
];
