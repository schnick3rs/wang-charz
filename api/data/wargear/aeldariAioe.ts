import {armour, gear, metaMelee, rangez, toolz} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const aioe: Wargear[] = [
    {
        ...gear('aioe', 84, 'Splinter Rifle', '5U', 'Aeldari,Drukhari'),
        ...rangez('Splinter Weapon',7,1,0,24,2,'Assault,Inflict(Poison 4),Rapid Fire(2)'),
    },
    {
        ...gear('aioe', 92, 'Kabalite Armour', '4U', 'Aeldari,Drukhari'),
        ...armour('Aeldari Armour', 3, ''),
    },
    {
        ...gear('aioe', 96, 'Chains', '4C', 'Aeldari,Drukhari,Kabal'),
        ...toolz('Drukhari Equipment','May be used as a Whip, +1 to Grapple attacks.'),
        meta: [
            metaMelee(1,1,0,4,['Agonising', '+1 to Grapple']),
        ],
    },
    {
        ...gear('aioe', 96, 'Blades', '4C', 'Aeldari,Drukhari,Kabal'),
        ...toolz('Drukhari Equipment','Successful melee attacks also inflict 1 Bleeding Condition.'),
    },
    {
        ...gear('aioe', 96, 'Hooks', '4C', 'Aeldari,Drukhari,Kabal'),
        ...toolz('Drukhari Equipment','All attempts to grapple the Drukhari increase their DN by 1.'),
    },
    {
        ...gear('aioe', 96, 'Initiation Token', '4U', 'Aeldari,Drukhari,Kabal'),
        ...toolz('Drukhari Equipment','When taking damage, the owner may instead choose another character with the same KABAL Keyword to take the hit. The new target must be within the owner’s move distance.'),
    },
];
