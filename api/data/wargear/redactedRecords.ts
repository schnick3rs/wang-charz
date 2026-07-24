import {armour, gear, meleez, metaMelee, metaRange, rangez} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";


export const red2Eclisiarchy: Wargear[] = [
    // Melee
    {
        ...gear('red2', 43, 'Anointed Halberd', 'R7', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...meleez('Ecclesiarchy Melee Weapon',7,4,-3,2,'Blessed (1)'),
    },
    {
        ...gear('red2', 43, 'Hallowed Mace', 'U6', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...meleez('Ecclesiarchy Melee Weapon',6,4,-2,1,'Blessed (1), Brutal'),
    },
    {
        ...gear('red2', 43, 'Mace of the Righteous', 'R8', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...meleez('Ecclesiarchy Melee Weapon',6,6,-2,1,'Blessed (2), Brutal'),
    },
    {
        ...gear('red2', 43, 'Novitiate Melee Weapon', 'C4', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...meleez('Ecclesiarchy Melee Weapon',4,4,0,1,'Parry'),
    },
    {
        ...gear('red2', 43, 'Spear of the Faithful', 'R6', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...meleez('Ecclesiarchy Melee Weapon',7,6,-3,2,'Blessed (2), Parry'),
    },
    {
        ...gear('red2', 43, 'Vindictor', 'U5', 'Flame, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        type: 'Melee Weapon',
        subtype: 'Ecclesiarchy Melee Weapon',
        meta: [
            metaMelee(5,5,-2,2,['Brutal', 'Inflict (On Fire)'], 'Melee'),
            metaRange(11, 2, -1, 8, 0, ['Flamer'], 'Shooting'),
        ],
    },
    // Ranged
    {
        ...gear('red2', 44, 'Artificer-crafted Storm Bolter', 'R7', 'BOLT, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...rangez('Ecclesiarchy Ranged Weapon',10,2,0,24,4,'Brutal, Heavy (3), Rapid Fire (4), Mastercrafted'),
    },
    {
        ...gear('red2', 44, 'Ministorum Flamer', 'R6', 'FLAME, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...rangez('Ecclesiarchy Ranged Weapon',11,2,0,12,1,'Flamer'),
    },
    {
        ...gear('red2', 44, 'Ministorum Hand Flamer', 'U5', 'FLAME, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...rangez('Ecclesiarchy Ranged Weapon',8,2,0,12,1,'Flamer, Pistol'),
    },
    {
        ...gear('red2', 44, 'Ministorum Shotgun', 'U5', 'PROJECTILE, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...rangez('Ecclesiarchy Ranged Weapon',9,2,0,12,1,'Spread'),
    },
    // Armor
    {
        ...gear('red2', 45, 'Novitiate Armour', 'U3', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...armour('Ecclesiarchy Armour', 3, ''),
    },
    {
        ...gear('red2', 45, 'Sacresant Shield', 'R6', 'FORCE FIELD, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
        ...armour('Ecclesiarchy Armour', 3, 'Shield,Power Field'),
    },
];

export const red2Mechanicus: Wargear[] = [
    // Melee
    {
        ...gear('red2', 61, 'Arc Maul', 'U7', 'ARC, ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',6,3,-2,1,'Arc (3), Brutal'),
    },
    {
        ...gear('red2', 61, 'Cavalry Sabre', 'C3', 'Blade, ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',3,3,-1,1),
    },
    {
        ...gear('red2', 61, 'Clawed Serberys Limbs', 'C0', 'ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',4,3,0,1,'Brutal'),
    },
    {
        ...gear('red2', 61, 'Electroleech Stave', 'R7', 'ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',5,6,-2, 1,'Agonising,Brutal'),
    },
    {
        ...gear('red2', 61, 'Electrostatic Gauntlets', 'R7', 'ADEPTUS MECHANICUS'),
        type: 'Melee Weapon',
        subtype: 'Adeptus Mechanicus Melee Weapon',
        meta: [
            metaMelee(5,4,-1, 1, ['Agonising','Brutal'], 'Melee'),
            metaRange(11, 1, -1, 12, 1, ['Flamer'], 'Shooting'),
        ],
    },
    {
        ...gear('red2', 61, 'Pteraxii Talons', 'C0', 'ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',3,2,-1, 1,'Reliable'),
    },
    {
        ...gear('red2', 61, 'Taser Goad', 'U4', 'ADEPTUS MECHANICUS'),
        ...meleez('Adeptus Mechanicus Melee Weapon',5,5,0, 1,'Agonising'),
    },
    // Ranged
    {
        ...gear('red2', 63, 'Archeo-revolver', 'L7', 'PROJECTILE'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-2,12,1,'Pistol'),
    },
    {
        ...gear('red2', 63, 'Flechette Blaster', 'C4', 'PROJECTILE,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',8,2,0,12,2,'Pistol, Rapid Fire (4)'),
    },
    {
        ...gear('red2', 63, 'Flechette Carbine', 'C4', 'PROJECTILE,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',8,2,0,18,2,'Assault, Rapid Fire (4)'),
    },
    {
        ...gear('red2', 63, 'Gamma Pistol', 'R8', 'ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',13,3,-3,18,1,'Pistol, Rad (3)'),
    },
    {
        ...gear('red2', 63, 'Galvanic Carbine', 'U5', 'PROJECTILE,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',10,1,-1,18,2,'Rending (1)'),
    },
    {
        ...gear('red2', 63, 'Phosphor Blast Carbine', 'L8', 'PHOSPHEX,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-1,12,2,'Assault, Blast (4), Melta'),
    },
    {
        ...gear('red2', 63, 'Phosphor Blast Pistol', 'L8', 'PHOSPHEX,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-1,12,1,'Blast (4), Melta, Pistol'),
    },
    {
        ...gear('red2', 63, 'Phosphor Pistol', 'R7', 'PHOSPHEX,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',10,2,-1,12,1,'Melta, Pistol'),
    },
    {
        ...gear('red2', 63, 'Phosphor Torch', 'R7', 'PHOSPHEX,ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',10,1,-1,12,1,'Flamer, Melta'),
    },
    {
        ...gear('red2', 63, 'Sulphur Breath', 'C0', 'ADEPTUS MECHANICUS'),
        ...rangez('Adeptus Mechanicus Ranged Weapon',10,2,-2,12,0,'Assault,Flamer'),
    },
];
