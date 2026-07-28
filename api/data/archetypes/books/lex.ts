import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";
import {archetype, costz, reqAttribute, reqSkill} from "../utils";

export const lex = [
    {
        ...archetype('lex',5,'Adeptus Arbites','Arbites Arbitrator',2,'Human'),
        ...costz(70, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A judgment, arbitrary given.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'The Eye of the Lex',
                snippet:
                    'In combat, you may spend a Simple Action to declare one enemy you can see as a Designated Lawbreaker. ' +
                    'You and any Allies targeting that enemy gain +Rank bonus dice to attack rolls against them. ' +
                    'You may only have one Designated Lawbreaker active at a time.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Arbites Assault Shield' },
            { name: 'Shock Maul' },
            { name: 'Combat Shotgun' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
];