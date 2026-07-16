import {archetype, costz, reqAttribute, reqSkill, simpleAbility} from "../../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../../db/static/_statUtils";


export const aaoaAdeptusMinistorum=  [
    {
        name: 'Frateris Militia',
        ...archetype('aaoa', 34,  'Adeptus Ministorum', 'Frateris Militia', 1, 'Human'),
        ...costz(6, [
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            // or reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A faithful citizen whipped into a fervour and eager to slay in the Emperor’s name.',
        keywords: 'Imperium',
        influence: 0,
        archetypeFeatures: [
            {
                ...simpleAbility('Fevour', 'When within hearing range of a character with the ADEPTUS MINISTORUM keyword, you increase your Resolve by +Rank. In addition, if that Adeptus Ministorum character has suffered any wounds during the current scene, your Determination is increased by +Rank while you remain within 10 metres of them.'),
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when in hearing range of another ADEPTUS MINISTORUM character.' },
                    { targetGroup: 'traits', targetValue: TRAITS.DETERMINATION, modifier: 0, rank: 1, condition: 'when an ADEPTUS MINISTORUM character within hearing range suffere any wound during this combat and you are witin 10m.' },
                    // XXX { targetGroup: 'combat', targetValue: 'meleeAttacks', modifier: 0, rank: 1, condition: 'when you can see charge.' },
                ],
            },
        ],
        wargearString: 'One ranged or melee weapon of Value 3 or less of up to Common rarity, knife, symbol of devotion (tin aquila, devotional scroll, etc.).',
        wargear: [
            {
                name: 'One ranged or melee weapon of Value 3 or less of up to Common rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 3 },
                        rarityFilter: ['Common'],
                        typeFilter: ['Ranged Weapon', 'Melee Weapon'],
                    },
                ],
            },
            { name: 'Knife' },
            { name: 'Symbol of devotion' },
        ],
    },
    {
        name: 'Confessor',
        ...archetype('aaoa', 66, 'Adeptus Ministorum', 'Confessor', 3, 'Human'),
        ...costz(84, [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            reqSkill(SKILLS.PERSUASION, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
        ]),
        hint: 'A high-ranking priest whose rhetoric inspires zeal and piety wherever they go.',
        keywords: 'Imperium,Adeptus Ministorum,Priest',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'Incite Zeal',
                description:
                    '<p>You add +Double Rank to all Persuasion Interaction attacks against targets with the IMPERIUM, SCUM, or HERETIC keywords. In addition, you may spend a Wrath point to make yourself Frenzied; If you do so, then you may make all allies with the IMPERIUM keyword within 15+Double Rank metres Frenzied as well.</p>'
            },
        ],
        wargearString: 'Laspistol, one melee weapon or one ranged weapon of up to Value 7 and a rarity of up to Rare, Rosarius, knife, clothing (Ministorum robes), missionary kit, symbol of authority.',
        wargear: [
            { name: 'Laspistol' },
            {
                name: 'one melee weapon or one ranged weapon of up to Value 7 and a rarity of up to Rare',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 3 },
                        rarityFilter: ['Common','Uncommon','Rare'],
                        typeFilter: ['Ranged Weapon', 'Melee Weapon'],
                    },
                ],
            },
            { name: 'Rosarius' },
            { name: 'Knife' },
            { name: 'Clothing', variant: 'Ministorum robes' },
            { name: 'Missionary kit' },
            { name: 'symbol of authority' },
        ],
    },
];
