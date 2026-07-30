import {archetype, costz, reqSkill, wargearz} from "../../utils";
import {SKILLS} from "../../../../db/static/_statUtils";


export const aaoaTauEmpire = [
    {
        ...archetype('aaoa', 59,'T´au','Fire Cast Warrior',1,'aaoa/Shas T´au'),
        ...costz(
            8,
            [
                reqSkill(SKILLS.BALLISTIC_SKILL, 2),
                reqSkill(SKILLS.TECH, 1),
            ],
        ),
        hint: 'A well-maintained warrior is an effective warrior.',
        keywords: 'T´au Empire,Fire Cast, [Sept]',
        modifications: [],
        archetypeFeatures: [
            {
                name: 'Disciplined Volley',
                snippet: 'You are used to laying down consistent, deadly volleys of fire. When you make a ranged attack with a PULSE weapon, and did not move during your turn, you may increase the weapon’s Salvo rating by +Rank.',
            },
        ],
        wargear: wargearz('T’au Body Armour, Pulse Rifle or Pulse Carbine, 3 Photon Grenades'),
    },
];
