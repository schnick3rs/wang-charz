import {archetype, costz, keywords, reqAttribute, reqSkill } from "../utils";


export const sofr = [
    {
        ...archetype('sofr', 19, 'Space Wolves', 'Blood Claw', 3, 'Primaris Astartes'),
        ...costz(255, [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        keywords: keywords('Imperium,Adeptus Astartes,Primaris,Space Wolves'),
        hint: 'The young claw',
        archetypeFeatures: [
            {
                key: 'fury-of-the-pack',
                name: 'Fury of the Pack',
                snippet: 'Once per combat, when you Charge or make your first Melee Attack in a scene, you may unleash a fearsome Fenrisian war-howl.',
                description:
                    '<p>Once per combat, when you Charge or make your first Melee Attack in a scene, you may unleash a fearsome Fenrisian war-howl and choose one effect:</p>' +
                    '<p>(A) Allies within 10 metres who can hear you gain +Rank dice to their next Melee Attack Test this round.</p>' +
                    '<p>(B) Enemies within 10 metres must make a Willpower (DN 3) Test or suffer +Rank DN on all Attack Tests targeting you until the start of your next turn, as your ferocity shakes their nerve.</p>'
            },
        ],
        wargear: [
            { name: 'Astartes Chainsword' },
            { name: 'Astartes Combat Knife' },
            { name: 'Bolt Pistol' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Mark X Tacticus Power Armour' },
        ],
        influence: 2,
    },
    {
        ...archetype('sofr', 21, 'Space Wolves', 'Grey Hunter', 3, 'Primaris Astartes'),
        ...costz(280, [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        keywords: keywords('Imperium,Adeptus Astartes,Primaris,Space Wolves'),
        hint: 'The experienced hunter',
        archetypeFeatures: [
            {
                key: 'oath-of-the-Wolf',
                name: 'Oath of the Wolf',
                snippet: 'Once per combat, when an ally within 5 metres is attacked, you may interpose yourself, becoming the target instead. ' +
                    'When you fight alongside at least one ally, you gain +Rank to Determination rolls.',
            },
        ],
        wargear: [
            { name: 'Bolt Carbine' },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Chainsword' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Tacticus Mk X', variant: 'Mark X Tacticus Power Armour' },
        ],
        influence: 2,
    },
    {
        ...archetype('sofr', 23, 'Space Wolves', 'Wolf Guard Headtaker', 4, 'Primaris Astartes'),
        ...costz(383, [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 6),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 5),
            reqSkill(SKILLS.LEADERSHIP, 3),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        keywords: keywords('Imperium,Adeptus Astartes,Primaris,Space Wolves'),
        hint: 'The promised death',
        archetypeFeatures: [
            {
                key: 'saga-of-the-slain',
                name: 'Saga of the Slain',
                snippet: 'When you slay an Elite foe in melee, all allies within 10 metres gain +Rank ED on their next melee attack this round.',
            },
            {
                key: 'saga-of-the-challenge',
                name: 'Saga of the Challenge',
                snippet: 'Once per session, when you fell a powerful foe, you may bellow a challenge: all enemies within 15 metres must test Resolve (DN 2 + Rank) or suffer +1 Rank Shock.',
            },
        ],
        wargear: [
            { name: 'Power Axe' },
            { name: 'Power Sword or Storm Shield' },
            { name: 'Heavy Bolt Pistol' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Tacticus Mk X', variant: 'Mark X Tacticus Power Armour' },
            { name: 'Fenrisian Wolf' },
        ],
        influence: 4,
    },
    // ...
    {
        ...archetype('sofr', 39, 'Space Wolves', 'Wulfen', 4, 'Primaris Astartes'),
        ...costz(393, [
            reqAttribute(ATTRIBUTES.STRENGTH, 6),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 6),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.AWARENESS, 4),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.SURVIVAL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        keywords: keywords('Imperium,Adeptus Astartes,Primaris,Space Wolves'),
        hint: 'The cursed kin',
        archetypeFeatures: [
            {
                key: 'curseborn-fury',
                name: 'Curseborn Fury',
                snippet: 'When you make a melee attack and shift an Exalted Icon, you may immediately make an additional melee attack against the same or another adjacent target.',
            },
            {
                key: 'cureseborn-vengeance',
                name: 'Cureseborn Vengeance',
                snippet: 'The first time you are reduced to 0 Wounds in a combat, you may immediately make one last melee attack before falling.',
            },
            {
                key: 'cureseborn-might',
                name: 'Cureseborn Might',
                snippet: 'Wulfen ignore any restrictions associated with the TWO-HANDED Keyword.',
            },
        ],
        wargear: [
            { name: 'Paired Frost Claws or Frost Axe or Thunderhammer and Stormshield' },
            { name: 'Scout Armour', variant: 'Wulfen Partial Armour' },
        ],
        influence: 4,
    },
];