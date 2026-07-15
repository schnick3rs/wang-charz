import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../../db/static/_statUtils";


export const aaoaAstraMilitarum = [
    {
        name: 'Beastman Auxiliary',
        ...archetype('aaoa', 42, 'Astra Militarum', 'Beastman Auxiliary', 1, 'aaoa/Beastman'),
        ...costz(28, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'You have been drafted to serve alongside Astra Militarum forces as an auxiliary.',
        keywords: 'Imperium,Astra Militarum,Abhuman',
        influence: 0,
        archetypeFeatures: [
            {
                ...simpleAbility('Bestial Zealotry','When you can see an enemy (either an obvious foe, or a creature identified as an enemy by an ally or superior), you add +Rank to your Resolve, and add +Rank bonus dice to any melee attacks you make when you charge.'),
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when you can see your enemy.' },
                    // XXX { targetGroup: 'combat', targetValue: 'meleeAttacks', modifier: 0, rank: 1, condition: 'when you can see charge.' },
                ],
            }
        ],
        wargearString: 'Two melee weapon s each of Value 3 or less of up to Common rarity, primitive armour',
        wargear: [
            { name: 'Primitive Armour' },
            {
                name: 'Common Melee Weapon up to value 3',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                        typeFilter: ['Melee Weapon'],
                        rarityFilter: ['Common'],
                    },
                ],
            },
            {
                name: 'Common Melee Weapon up to value 3',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                        typeFilter: ['Melee Weapon'],
                        rarityFilter: ['Common'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Imperial Guard Medic',
        ...archetype('aaoa', 36, 'Astra Militarum', 'Imperial Guard Medic', 1, 'Human'),
        ...costz(22, [
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.MEDICAE, 2),
        ]),
        hint: 'A disciplined soldier trained to treat the injuries of their comrades.',
        keywords: 'Imperium,Astra Militarum,[Regiment]',
        influence: 0,
        archetypeFeatures: [
            {
                ...simpleAbility('Field Medic','When you make a Medicae test during combat on a Dying character, +Double Rank bonus dice.'),
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 0, rank: 2, condition: 'when treating a Dying character.' },
                ],
            },
        ],
        wargear: wargearz(
            'Flak armour, Lasgun, knife, Munitorum-Issue Mess Kit/guard issue mess kit, blanket, grooming kit, Uplifting Primer, 3 ration pack, medikit'),
    },
    {
        name: 'Imperial Guard Officer',
        ...archetype('aaoa', 64, 'Astra Militarum', 'Imperial Guard Officer', 1, 'Human'),
        ...costz(22,[
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.LEADERSHIP, 2),
        ]),
        hint: 'A stern commander trained to inspire and lead others into the fray.',
        keywords: 'Imperium,Astra Militarum,[Regiment]',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Voice of Command',
                description:
                    '<p>As a Combat Action, you may issue an order to allies with the ASTRA MILITARUM keyword who are able to hear you. Issuing orders requires a DN 1 Leadership test to order a single ally, adding +2 DN for each additional ally . Orders can be found on the sidebar below:</p>' +
                    '<ul>' +
                    '<li><strong>TAKE AIM!</strong> The ally may re - roll Double Rank dice on their next aimed ranged attack.</li>' +
                    '<li><strong>BRING IT DOWN!</strong> The officer chooses a single enemy, and the ally adds +Rank ED to their next ranged attack against that target.</li>' +
                    '<li><strong>FORWARDS, FOR THE EMPEROR!</strong> The ally may shoot as part of a run action as if their weapon had the Assault trait.</li>' +
                    '<li><strong>MOVE! MOVE! MOVE!</strong> The ally adds +Rank to their Speed if they Run or Sprint in their next turn</li>' +
                    '<li><strong>FIX BAYONETS!</strong> The ally adds +Rank bonus dice t o their next melee attack</li>' +
                    '</ul>' +
                    '<p>All references to Rank in the orders below refer to the Rank of the character giving the order. A character may only benefit from one order at a time , and an order’s effects last only until the start of the officer’s next turn.</p>'
            },
        ],
        wargear: wargearz('Flak armour, Refractor Field, Laspistol, chainsword, knife, Munitorum-Issue Mess Kit/guard issue mess kit, blanket, grooming kit, Uplifting Primer, 3 ration packs'),
    },
];
