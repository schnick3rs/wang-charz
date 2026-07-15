import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../../db/static/_statUtils";

export const aaoaAdeptaSororitas = [
    {
        name: 'Sister Dialogus',
        ...archetype('aaoa', 40, 'Adepta Sororitas', 'Sister Dialogus', 1, 'Human'),
        ...costz(24, [
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.PERSUASION, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
        ]),
        hint: 'A devout scholar of language, ensuring that the Emperor’s Word is understood by all.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        influence: 1,
        archetypeFeatures: [
            {
                ...simpleAbility('Sanctified Linguist','You add +Rank bonus dice on Scholar tests relating to language, and you know Double Rank additional languages. You also gain +Rank Conviction.'),
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 0, rank: 1, condition: 'when related to language' },
                    { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 0, rank: 1 },
                ],
            },
        ],
        wargearString: 'Sororitas power armour, bolt pistol, copy of the Rule of the Sororitas, collection of reference texts, vox caster, laud hailer.',
        wargear: [
            { name: 'Sororitas power armour' },
            { name: 'Bolt Pistol' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
            { name: 'collection of reference texts' },
            { name: 'vox caster' },
            { name: 'laud hailer' },
        ],
    },
    {
        name: 'Sister Famulous',
        ...archetype('aaoa', 23, 'Adepta Sororitas', 'Sister Famulous', 1, 'Human'),
        ...costz(28, [
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.PERSUASION, 1),
        ]),
        hint: 'A pious advisor to those of noble birth and ancient bloodlines.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        influence: 1,
        archetypeFeatures: [
            {
                ...simpleAbility('Spiritual Advisor','You add +Rank bonus dice to Leadership and Persuasion tests when interacting with the Nobility of the Imperium. You also add +Rank to your Conviction.'),
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 1, condition: 'when interacting with imperial nobility.' },
                    { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when interacting with imperial nobility.' },
                    { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 0, rank: 1 },
                ],
            },
        ],
        wargearString: 'Formal Sororitas Robes (clothing), bodyglove, Laspistol, Mono Knife, Chaplet Ecclesiasticus, copy of Rule of the Sororitas.',
        wargear: [
            { name: 'Laspistol' },
            { name: 'Bodyglove' },
            { name: 'Clothing', variant: 'Formal Sororitas Robes' },
            { name: 'Mono Knife' },
            { name: 'Chaplet Ecclesiasticus' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
    },
    {
        name: 'Sister Seraphim',
        ...archetype('aaoa2', 24, 'Adepta Sororitas', 'Sister Seraphim', 3, 'Human'),
        ...costz(55, [ /* TODO */]),
        hint: 'An elite and zealous warrior, faithful even compared to other Sisters of Battle.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.PILOT, 4),
        ],
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Angelic',
                snippet:
                    'Sisters Seraphim and allies within 15 metres and line of sight add +Rank to Corruption tests. Sisters Seraphim gain +Rank to any dice pool to resist psychic powers and effects. Sisters Seraphim also have +1 Faith.'
            },
        ],
        wargearString:
            'Sororitas power armour, Chaplet Ecclesiasticus, two bolt pistols (with Matched Pair upgrade), ' +
            'jump pack, clothing (Sororitas vestments), writing kit, copy of the Rule of the Sororitas.',
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Chaplet Ecclesiasticus' },
            { name: 'Bolt Pistol', variant: 'Bolt Pistol with Matched Pair upgrade' },
            { name: 'Bolt Pistol', variant: 'Bolt Pistol with Matched Pair upgrade' },
            { name: 'Jump Pack' },
            { name: 'Clothing', variant: 'Sororitas vestments' },
            { name: 'Writing Kit' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
    },
    {
        name: 'Sister Repentia',
        ...archetype('aaoa2', 24, 'Adepta Sororitas', 'Sister Repentia', 2, 'Human'),
        ...costz(40, [ /* TODO */]),
        hint: 'A penitent soul, seeking atonement for her sins through death and pain.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ],
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        influence: -2,
        archetypeFeatures: [
            {
                name: 'Outcast',
                snippet:
                    'Sisters Repentia add +2DN to all interaction tests with other characters with the Adeptus Ministorum or Adepta Sororitas keywords and may not benefit from their Adepta Sororitas keyword in social situations.'
            },
            {
                name: 'Penitent',
                snippet:
                    'Sisters Repentia add +Rank to Corruption tests and all dice pools to resist psychic powers and effects. Sisters Repentia may become frenzied at will and may re-roll up to Rank dice on Soak rolls.'
            },
        ],
        wargearString:
            'Eviscerator, clothes (tattered penitent robes).',
        wargear: [
            { name: 'Eviscerator' },
            { name: 'Clothing', variant: 'tattered penitent robes' },
        ],
    },
];
