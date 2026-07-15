import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";


export const tnh = [
    {
        ...archetype('tnh', 8,'Adeptus Astra Telephatica','Sister of Silence Prosecutor',3,'Human'),
        ...costz(100,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INSIGHT, 1),
            reqSkill(SKILLS.INVESTIGATION, 2),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A silent sister.',
        keywords: 'Imperium,Anathema Psykana,[Enclave]',
        archetypeFeatures: [
            {
                name: 'Master of Warfare',
                snippet: 'Psychic Powers may not target you. Powers that target or are cast from points within +Double Rank metres of you have their DN increased by +Double Rank, and always treat the Wrath Die as if it rolled a 1. Daemons within +Double Rank metres of you become Hindered (+Double Rank) until they leave this area.',
            },
        ],
        wargear: wargearz('Vratine Power Armour, 3 Frag Grenades, 3 Krak Grenades or 1 Psyk-Out Grenade, Boltgun'),
        influence: 0,
    },
];