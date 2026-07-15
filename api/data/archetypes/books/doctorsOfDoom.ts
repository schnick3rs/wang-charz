import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";


export const dod = [
    {
        ...archetype('dod', '','Scum','Scum Psyker',2,'Human'),
        ...costz(20,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
            reqSkill(SKILLS.CUNNING, 1),
        ]),
        hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
        influence: 0,
        keywords: 'Imperium,Scum,Psyker',
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'A Scum Psyker begins play with one minor psychic '
                    + 'power and the smite psychic power. They may purchase additional Minor Psychic '
                    + 'Powers and Universal Psychic powers, subject to Tier restrictions.',
                psychicPowers: [
                    { name: 'psykerSmmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor and Universal Disciplines. You unlock an addtional single Psychic Discipline.',
                description: '<p>You gain access to the Minor and Universal Disciplines. You unlock an additional single Psychic Discipline, following the rules in Chapter 11.</p>',
                selected: [''],
                options: [
                    // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
                    // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
                    { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
                    { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
                    { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
                    { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
                    { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
                    { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
                    { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                ],
            }
        ],
        description: null,
    },
    {
        ...archetype('dod', '','Adeptus Astartes','Aspiring Assault Marine',3,'Adeptus Astartes'),
        ...costz(257,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.LEADERSHIP, 1), // 12
            reqSkill(SKILLS.SCHOLAR, 1), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
        ]),
        hint: 'A versatile warrior, veteran of a hundred battles.',
        keywords: 'Imperium,Adeptus Astartes,Doctors of Doom,[House Latveria]',
        alerts: [
            { type: 'info', text: 'The errata states the cost as 277 but this is probably an error. Thus, we use 272 XP as the cost.', },
        ],
        archetypeFeatures: [
            {
                name: 'Tactical Versatility',
                snippet: 'Your training has prepared you for any circumstance. When you make a Critical Hit you may roll twice on the Critical Hit Table and choose either result.',
            },
            {
                name: 'Wrath of Doom',
                snippet:
                    'You have the Angel of Death Talent (Wrath & Glory Rulebook).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-angel-of-death', meta: { name: 'Angel of Death' } },
                ],
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Chainsword, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade, Jump Pack'),
        influence: 2,
    },
    {
        ...archetype('dod', '','Adeptus Astartes','Aspiring Techmarine',3,'Adeptus Astartes'),
        ...costz(277,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 4), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 5), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 4), // 12
            reqSkill(SKILLS.SCHOLAR, 2), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.TECH, 4), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
        ]),
        hint: 'A versatile warrior, veteran of a hundred battles.',
        keywords: 'Imperium,Adeptus Astartes,Doctors of Doom,[House Latveria],Adeptus Mechanicus',
        archetypeFeatures: [
            {
                name: 'Rite of Repair',
                snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
                ],
            },
            {
                name: 'Wrath of Doom',
                snippet:
                    'You have the Angel of Death Talent (Wrath & Glory Rulebook, pg. 129).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-angel-of-death', meta: { name: 'Angel of Death' } },
                ],
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 2,
    },
];
