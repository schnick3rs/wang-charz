import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../../db/static/_statUtils";

export const aaoaSquat = [
    {
        ...archetype('aaoa', 43,'The Squat Remnant','War-Pledged Warrior',1,'aaoa/Squat'),
        ...costz(34,  [
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        factionKey: 'aaoa-the-squat-remnant',
        hint: 'The rank and file of a Squat Stronghold.',
        keywords: 'Squat, [League]',
        influence: 0,
        archetypeFeatures: [
            {
                name: 'War-Pledged',
                description:
                    '<p>When you make an attack against an enemy who has already been attacked this round, you gain +Rank bonus dice.</p>',
            },
        ],
        wargear: wargearz('Bolter, hand-cannon, axe, flak armour, 3 frag grenade'),
    },
    {
        ...archetype('aaoa', 73,  'The Squat Remnant', 'Guild Engineer',  3, 'aaoa/Squat'),
        ...costz(70,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        factionKey: 'aaoa-the-squat-remnant',
        hint: 'Masterful artisans, creating the devices necessary for survival.',
        keywords: 'Squat, [League]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Guild Techniques',
                description:
                    '<p>You receive +Rank on Tech tests to repair a damaged machine, or to craft a new one. You may re-roll up to Rank dice on any skill test made to use a device you’ve personally built. You are considered to have built all of your starting wargear personally.</p>',
            },
        ],
        wargear: wargearz('Bolt Pistol, Power Axe, augmetic servo-arm, Ionclad Carapace Armour, Refractor Field, combi-tool'),
    },
    {
        ...archetype('aaoa', 74, 'The Squat Remnant', 'Hearthguard',  3,'aaoa/Squat'),
        ...costz(128,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.PERSUASION, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        factionKey: 'aaoa-the-squat-remnant',
        hint: 'Doughty elite warriors pledged to defend hearth and home.',
        keywords: 'Squat, [League]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Close Protection',
                description:
                    '<p>When an enemy makes an attack against an ally within 5m of you, then as a Reflexive Action, you may increase that ally’s Defence and Resilience by +Rank against that attack.</p>',
            },
        ],
        wargear: wargearz('Bolter, Power Axe, Bolt Pistol, Mono Knife, Ionclad Carapace Armour, 3 frag grenade, 3 krak grenade'),
    },
    {
        ...archetype('aaoa', 87, 'The Squat Remnant', 'Ancestor Lord', 4,'aaoa/Saquat'),
        ...costz(182,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.PERSUASION, 2),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        factionKey: 'aaoa-the-squat-remnant',
        hint: 'Ancient sages, wise enough to tap into the Warp with care and listen to the voices of the dead.',
        keywords: 'Squat [League], Psyker',
        influence: 4,
        archetypeFeatures: [
            {
                name: 'Psychic Protector',
                description:
                    '<p>You are a Psyker; you know the <strong>Smite</strong> psychic power and may learn other powers from the <strong>Telekinesis</strong> and <strong>Ancestral Rites</strong> disciplines.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Telekinesis',
                    'Universal',
                    'Ancestral Rites',
                ],
            },
        ],
        wargearString: 'Ionclad Carapace armour, ancestor’s robes (clothing), Master-Crafted Force Stave, Master-Crafted Bolt Pistol.',
        wargear: [
            { name: 'Ionclad Carapace Armour' },
            { name: 'Clothing', variant: 'Ancestor’s robes' },
            { name: 'Force Stave (MC)', variant: 'Master-Crafted Force Stave' },
            { name: 'Bolt Pistol (MC)', variant: 'Master-Crafted Bolt Pistol' },
        ],
    },
];
