import {Threat} from "../../shared/schemas/threat.schema";
import {
    attributArray,
    createSimpleThreatDetermination,
    createThreatMeleeAttack, createThreatRangedAttack,
    skillRating,
    threatBuilder
} from "./utils";
import {SKILLS} from "../../db/static/_statUtils";

export const core: Threat[] = [
    {
        ...threatBuilder('core', 327, 'Imperium', 'Imperial Citizen', 'TTTTT'),
        keywords: ['Imperium'],
        attributes: attributArray(2, 2, 3, 2, 3, 1, 2),
        traits: {
            defence: 1,
            wounds: 4,
            shock: 3,
            conviction: 2,
            resolve: 1,
            speed: 6,
            resilience: 3,
        },
        size: 'Average',
        resilience: {
            total: 3,
            armourName: 'Ragged Cloth',
            armourRating: 0,
        },
        skills: {
            default: 4,
            others: [
                skillRating(SKILLS.AWARENESS, 3),
            ]
        },
        specialAbilities: [
            {
                type: 'Complication',
                name: 'Cheap Augmetic',
                effect:
                    'Whenever this Threat rolls a Complication, one of their augmetics malfunctions. ' +
                    'They are Hindered and unable to use the body part effectively until it is repaired by a DN 3 Tech (Int) Test.',
            },
            createSimpleThreatDetermination(2),
        ],
        attacks: [
            createThreatMeleeAttack('Unarmed', 2, 1),
        ]
    },
    {
        ...threatBuilder('core', 327, 'Imperium', 'Astra Militarum Trooper', 'TTTTT'),
        keywords: ['Imperium'],
        attributes: attributArray(3,3,3,3,2,1,2),
        traits: {
            defence: 2,
            wounds: 5,
            shock: 3,
            conviction: 2,
            resolve: 1,
            speed: 6,
            resilience: 7,
        },
        size: 'Average',
        resilience: {
            total: 7,
            armourName: 'Flak Armour',
            armourRating: 3,
        },
        skills: {
            default: 4,
            others: [
                skillRating(SKILLS.AWARENESS, 5),
                skillRating(SKILLS.BALLISTIC_SKILL, 5),
            ]
        },
        attacks: [
            createThreatRangedAttack('Lasgun', 7, 1, 24, 2, 0, ['Rapid Fire (1)', 'Reliable']),
            createThreatRangedAttack('Frag Grenade (1 Ammo)', 10, 4, 12, null, 0, ['Blast (6)']),
            createThreatMeleeAttack('Knife or Bayonet', 5, 2),
        ],
        specialAbilities: [
            createSimpleThreatDetermination(3),
        ],
    },
]