import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";


export const afas = [
    {
        ...archetype('afas', 25,'Adeptus Astartes','1st Company Veteran',4,'Adeptus Astartes'),
        ...costz(330,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 5),
            reqSkill(SKILLS.LEADERSHIP, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.SURVIVAL, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'A veteran of centuries of war.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        alerts: [
            { type: 'info', text: 'This archetype has multiple weapon loadouts. See Affliction Ascendet, pg. 25.', },
        ],
        archetypeFeatures: [
            {
                name: 'Master of Warfare',
                snippet: 'Add 1 to the damage of all weapons.',
            },
        ],
        wargear: wargearz('Terminator Armour, Storm Bolter, Power Sword or Power Fist, Crux Terminatus'),
        influence: 2,
    },
];