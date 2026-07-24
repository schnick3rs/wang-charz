import {gear, metaRange} from "./utils";

export const doctorsOfDoom = [
    {
        ...gear('dod',0,'Lawgiver','6C','Projectile,Adeptus Arbites'),
        type: 'Ranged Weapon',
        subtype: undefined,
        meta: [
            metaRange(9,1,0,12,1,['Pistol']),
            metaRange(9,1,0,12,2,['Pistol','Fullauto']),
            metaRange(0,0,0,12,1,['Pistol','Shock']),
            metaRange(9,1,0,12,1,['Pistol','Armor Piering']),
        ],
    },
];