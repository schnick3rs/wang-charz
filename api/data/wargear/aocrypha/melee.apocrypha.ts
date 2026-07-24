import {gear, meleez} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

export const aaoaMelee: Wargear[] = [
    // Ordinary Melee Weapons
    ...[
        {
            ...gear('aaoa',133,'Axe', '3C','Blade, [Any]'),
            ...meleez('Ordinary Melee Weapon', 3, 4, 0, 1, 'Rending (1)'),
        },
        {
            ...gear('aaoa',133,'Flail', '3C','[Any]'),
            ...meleez('Ordinary Melee Weapon', 3, 3, 0, 1, 'Brutal, Overhelming'),
        },
        {
            ...gear('aaoa',133,'Greataxe', '3C','Blade, 2-Handed, [Any]'),
            ...meleez('Ordinary Melee Weapon', 4, 4, 0, 2, 'Rending (1), Unwieldy (1)'),
        },
        {
            ...gear('aaoa',133,'Greatsword', '3C','Blade, 2-Handed, [Any]'),
            ...meleez('Ordinary Melee Weapon', 4, 3, -1, 2, 'Parry'),
        },
        {
            ...gear('aaoa',133,'Spear', '2C','[Any]'),
            ...meleez('Ordinary Melee Weapon', 3, 3, 0, 2, ''),
        },
    ],
    // Force Melee Weapon
    ...[
        {
            ...gear('aaoa',133,'Nemesis Falchion', '6V','Force, Grey Knights'),
            ...meleez('Force Weapon', 5, 4, -2, 1, 'Force, Nemesis, Paired, Parry'),
        },
        {
            ...gear('aaoa',133,'Nemesis Force Halberd', '6V','Force, Grey Knights'),
            ...meleez('Force Weapon', 5, 5, -2, 2, 'Force, Nemesis'),
        },
        {
            ...gear('aaoa',133,'Nemesis Force Sword', '6V','Force, Grey Knights'),
            ...meleez('Force Weapon', 5, 4, -3, 1, 'Force, Nemesis, Parry'),
        },
        {
            ...gear('aaoa',133,'Nemesis Warding Stave', '6V','Force, Grey Knights'),
            ...meleez('Force Weapon', 4, 2, -1, 1, 'Brutal, Force, Nemesis, Special'),
            description:
                '<p><strong>Special: </strong>Against melee attacks, a Nemesis Warding Stave also counts as a shield, providing an Armour Rating of *2, with the Force Shield and Shield traits.</p>',
        },
    ],
    // Power Melee Weapons
    ...[
        {
            ...gear('aaoa',134,'Crozius Arcanum', '6V', 'Power Field,Adeptus Astartes'),
            ...meleez('Power Weapon',5,5,-1,1,'Brutal'),
        },
        {
            ...gear('aaoa',134,'Accursed Crozius', '6V', 'Power Field,Heretic Astartes'),
            ...meleez('Power Weapon',5,5,-1,1,'Brutal'),
        },
        {
            ...gear('aaoa',177,'Executioner Greatblade', '7V', 'Power Field, 2-Handed, Anathma Psykana'),
            ...meleez('Power Weapon',6,5,-3,2,'Parry, Rending(2)'),
        },
        {
            ...gear('aaoa',134,'Lightning Claw', '7V', 'Power Field, Adeptus Astartes'),
            ...meleez('Power Weapon',5,4,-2,1,'Paired, Tearing'),
        },
        {
            ...gear('aaoa',134,'Power Lance', '6V', 'Power Field, Imperium, Adeptus Astartes'),
            ...meleez('Power Weapon',5,4,-1,2,'Special'),
            description:
                '<p><strong>Special: </strong>When used from a moving open-topped vehicle or other mount, add the Brutal trait.</p>',
        },
        {
            ...gear('aaoa',134,'Relic Blade', '8V', 'Power Field, 2-Handed, Adeptus Astartes'),
            ...meleez('Power Weapon',6,5,-3,2,''),
        },
    ],
    // Exotic Melee Weapons
    ...[
        {
            ...gear('aaoa',135,'Chordclaw (Apocrypha Pattern)', '6R', 'Transonic,Adeptus Mechanicus,Skitarii'),
            ...meleez('Exotic Melee Weapon',4,3,0,1,'Careful, Mortal (d3)'),
        },
        {
            ...gear('aaoa',135,'Electroleech Staff', '6R', 'Luminen, 2-Handed, Adeptus Mechanicus'),
            ...meleez('Exotic Melee Weapon', 6, 3, -2, 2,  'Agonizing, Mortal(d3), Special'),
            description:
                '<p><strong>Special: </strong>Only a character with a Luminen Capacitor may wield an Electroleech Staff – in the hands of anyone else, it counts as a normal staff. Each point of Shock inflicted by an Electroleech Staff adds 1 point of charge to the user’s Luminen Capacitor..</p>',
        },
        {
            ...gear('aaoa',135,'Electrostatic Gauntlets', '6R', 'Luminen, 2-Handed, Adeptus Mechanicus'),
            ...meleez('Exotic Melee Weapon', 6, 3, 0, 1,  'Tesla'),
            //...rangez('Projectile Range Weapon', 12, 1, 0, 12, 3, 'Assault, Tesla, Special'),
            description:
                '<p><strong>Ranged: </strong>Electrostatic Gauntlets can be used as a Ranged weapon, using the following profile:</p>' +
                '<p>Range: 12, Damage: 12+1ED, Salvo: 3, Assault, Tesla</p>' +
                '<p><strong>Special: </strong>Only a character with a Luminen Capacitor may wield Electrostatic Gauntlets. Electrostatic Gauntlets do not use normal reloads – instead, the wielder may expend charges from their Luminen Capacitor to gain the benefits of spending a reload, with each charge spent counting as one reload.</p>',
        },
        {
            ...gear('aaoa',135,'Neuro Gauntlet', '9L', 'Officio Assassinorum, Templus Eversor'),
            ...meleez('Exotic Melee Weapon', 6, 4, -1, 1,  'Inflict (Poisoned 5), Special'),
            description:
                '<p><strong>Special: </strong>While <em>Poisoned</em> by a Neuro-Gauntlet, a character is <em>Restrained</em> and suffers 1d3 Mortal Wounds at the beginning of each of their turns.</p>',
        },
        {
            ...gear('aaoa',135,'Phase Sword', '10L', 'Phase Blade, Officio Assasinorum, Templum Callidus'),
            ...meleez('Exotic Melee Weapon',5,4,-3,1,'Warp Weapon'),
        },
        {
            ...gear('aaoa',135,'Poisoned Blades', '7V', 'Blade, Officio Assasinorum, Templum Callidus'),
            ...meleez('Exotic Melee Weapon',3,2,-1,1,'Inflict (Poisoned 5), Mortal (d3), Rending (3), Special'),
            description:
                '<p><strong>Special: </strong>A character Poisoned by Poisoned Blades suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa',135,'Taser Goad', '5R', 'Taser, Adeptus Mechanicus, Skitarii'),
            ...meleez('Exotic Melee Weapon',7,3,0,1,'Agonizing, Tesla'),
        },
        {
            ...gear('aaoa',135,'Transonic Blade', '6R', 'Transonic, Adeptus Mechanicus, Skitarii'),
            ...meleez('Exotic Melee Weapon',5,3,0,1,'Paired, Mortal (1)'),
        },
        {
            ...gear('aaoa',135,'Transonic Razor', '6R', 'Transonic, Adeptus Mechanicus, Skitarii'),
            ...meleez('Exotic Melee Weapon',4,3,0,1,'Mortal (1)'),
        },
    ],
    // Chaos Melee Weapons
    ...[
        {
            ...gear('aaoa',137,'Bubobic Axe', '7R', 'Blade, Chaos, Nurgle'),
            ...meleez('Chaos Melee Weapon',5,5,-2,1,'Inflict (Poisoned 4), Rending (1)'),
        },
        {
            ...gear('aaoa',137,'Flail of Corruption', '7R', 'Chaos, Nurgle'),
            ...meleez('Chaos Melee Weapon',6,4,-2,2,'Brutal, Inflict (Poisoned 4), Overwhelming'),
        },
        {
            ...gear('aaoa',137,'Great Plague Cleaver', '7V', 'Blade, 2-Handed, Chaos, Nurgle'),
            ...meleez('Chaos Melee Weapon',8,6,-3,2,'Brutal, Inflict (Poisoned 4), Unwieldy (2)'),
        },
        {
            ...gear('aaoa',137,'Mace of Contagion', '6R', '2-Handed, Chaos, Nurgle'),
            ...meleez('Chaos Melee Weapon',5,5,-1,1,'Inflict (Poisoned 4), Unwieldy (2)'),
        },
        {
            ...gear('aaoa',137,'Manreaper', '7L', 'Blade, 2-Handed, Chaos, Nurgle, Heretic Astartes'),
            ...meleez('Chaos Melee Weapon',7,4,-3,2,'Inflict (Poisoned 4), Reaping'),
        },
        {
            ...gear('aaoa',137,'Plague Knife', '5U', 'Blade, Chaos, Nurgle'),
            ...meleez('Chaos Melee Weapon',3,2,0,1,'Inflict (Poisoned 3)'),
        },
        {
            ...gear('aaoa',137,'Plague Sword', '7R', 'Blade, Chaos, Daemon, Nurgle'),
            ...meleez('Chaos Melee Weapon',5,4,0,1,'Inflict (Poisoned 4), Parry'),
        },
    ],
    // Aeldari Melee Weapons
    ...[
        {
            ...gear('aaoa',138,'Biting Blade', '8L','Chain, 2-Handed, Ancient, Aeldari, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 6, 4, -1, 2, 'Brutal, Silent, Parry, Tearing'),
        },
        {
            ...gear('aaoa',138,'Diresword', '9L','Power Field, Force, Ancient, Aeldari, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 5, 3, -3, 1, 'Force, Mortal (1), Parry'),
        },
        {
            ...gear('aaoa',182,'Executioner', '9L','Power Field, 2-Handed, Ancient, Aeldari, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 7, 4, -3, 2, 'Parry, Special'),
            description:
                '<p><strong>Special: </strong>The Parry trait of an Executioner adds +2 to the wielder’s Defence in melee, rather than +1.</p>',
        },
        {
            ...gear('aaoa',138,'Harlequins Blade', '4U','Blade, Harlequin'),
            ...meleez('Aeldari Melee Weapon', 4, 3, 0, 1, 'Parry, Rending (2)'),
        },
        {
            ...gear('aaoa',138,'Harlequins Caress', '6V','Power Field, Harlequin'),
            ...meleez('Aeldari Melee Weapon', 5, 5, -2, 1, 'Brutal'),
        },
        {
            ...gear('aaoa',138,'Harlequins Embrace', '6V','Monofilament, Harlequin'),
            ...meleez('Aeldari Melee Weapon', 5, 4, -3, 1),
        },
        {
            ...gear('aaoa',138,'Harlequins Kiss', '6V','Monofilament, Harlequin'),
            ...meleez('Aeldari Melee Weapon', 5, 4, -1, 1, 'Careful, Mortal (3)'),
        },
        {
            ...gear('aaoa',138,'Mirrorsword', '9L','Power Field, Aeldari, Anient, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 5, 4, -2, 1, 'Paired, Parry'),
        },
        {
            ...gear('aaoa',138,'Miststave', '7V','Force, Harlequin'),
            ...meleez('Aeldari Melee Weapon', 5, 3, -1, 1, 'Agonizing, Force'),
        },
        {
            ...gear('aaoa',138,'Power Blade', '6R','Power Field, Aeldari, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 5, 3, -2, 1),
        },
        {
            ...gear('aaoa',138,'Psytronome Shaper', '5R','Force, Aeldari, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 3, 2, 0, 1, 'Force'),
        },
        {
            ...gear('aaoa',138,'Scorpion Chainsword', '5R','Chain, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 5, 4, 0, 1, 'Brutal, Parry, Silent'),
        },
        {
            ...gear('aaoa',138,'Scorpions Claw', '5R','Power Field, Aeldari, Anient, Asuryani'),
            ...meleez('Aeldari Melee Weapon', 5, 5, -3, 1, 'Brutal'),
        },
    ],
    // Drukhari Melee Weapons
    ...[
        {
            ...gear('aaoa',140,'Agoniser','7V','Exotic, Drukhari'),
            ...meleez('Drukhari Melee Weapon',5,3,-2,2,'Agonizing, Inflict (Poisoned 5), Special'),
            description:
                '<p><strong>Special: </strong>While suffering the Poisoned condition from an Agoniser, a creature also suffers 1d3+1 Shock at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa',140,'Hekatarii Blade','5R','Blade, Drukhari'),
            ...meleez('Drukhari Melee Weapon',3,3,-1,1,'Parry,Rending(1)'),
        },
        {
            ...gear('aaoa',140,'Huskblade','8V','Blade, Drukhari'),
            ...meleez('Drukhari Melee Weapon',6,4,-2,1,'Mortal (d3)'),
        },
        {
            ...gear('aaoa',140,'Hydra Gauntlet','6V','Exotic, Drukhari'),
            ...meleez('Drukhari Melee Weapon',4,3,-1,1,'Paired, Tearing'),
        },
        {
            ...gear('aaoa',140,'Impaler','6V','Blade, Drukhari'),
            ...meleez('Drukhari Melee Weapon',4,4,-1,2,'Brutal'),
        },
        {
            ...gear('aaoa',140,'Klaive','7V','Power Field, 2-Handed, Drukhari'),
            ...meleez('Drukhari Melee Weapon',5,5,-3,1,'Parry'),
        },
        {
            ...gear('aaoa',140,'Raizorflail','5R','Blade, Drukhari'),
            ...meleez('Drukhari Melee Weapon',4,3,-1,2,'Overwhelming, Reaping'),
        },
        {
            ...gear('aaoa',140,'Shardnet','6R','Exotic, Drukhari'),
            ...meleez('Drukhari Melee Weapon',4,4,0,3,'Agonising, Careful, Inflict (Restrained)'),
        },
        {
            ...gear('aaoa',140,'Venom Blade','7V','Blade, Drukhari'),
            ...meleez('Drukhari Melee Weapon',5,4,0,1,'Inflict (Poisoned 7), Special'),
            description:
                '<p>Special: While suffering the Poisoned condition from a Venom Blade, a creature also suffers 1d3 Mortal Wounds at the start of each of their turns.</p>'
        },
    ],
    // Ork Melee Weapons
    ...[
        {
            ...gear('aaoa',141,'‘Urty Syringe', '4U', 'Exotic, Ork'),
            ...meleez('Ork Melee Weapon', 4, 4, 0, 1, 'Careful,Inflict(Poisoned 4), Waaagh!'),
        },
        {
            ...gear('aaoa',141,'Grabba Stikk', '4U', 'Exotic, Ork'),
            ...meleez('Ork Melee Weapon', 5, 3, 0, 2, 'Inflict(Restrained), Waaagh!'),
        },
        {
            ...gear('aaoa',141,'Grot Prod', '5R', 'Exotic, Ork'),
            ...meleez('Ork Melee Weapon', 5, 5, -1, 1, 'Agonising, Waaagh!'),
        },
        {
            ...gear('aaoa',141,'Killsaw', '10V', 'Exotic, Ork'),
            ...meleez('Ork Melee Weapon', 7, 6, -4, 1, 'Brutal, Unwieldy (3), Waaagh!'),
        },
        {
            ...gear('aaoa',141,'Power Stabba', '6R', 'Power Field, Ork'),
            ...meleez('Ork Melee Weapon', 5, 4, -2, 1, 'Waaagh!'),
        },
        {
            ...gear('aaoa',141,'Tankhammer', '8U', 'Exotic, Ork'),
            ...meleez('Ork Melee Weapon', 10, 5, -2, 1, 'Careful, Blast (Small), Waaagh!'),
        },
    ],
];

