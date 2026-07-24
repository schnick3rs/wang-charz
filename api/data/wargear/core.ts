import {armour, gear, meleez, metaMelee, metaRange, rangez, toolz} from "./utils";
import {ATTRIBUTES, SKILLS} from "../../shared/constants";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const core: Wargear[]  = [
    {
        ...gear('core',211,'Knife','2C','Blade,[Any]'),
        ...meleez(undefined,2,2,0,0),
    },
    {
        ...gear('core',211,'Psykana Mercy Blade','2C','Adeptus Astra Telephatica'),
        ...meleez(undefined,2,2,-1,0),
    },
    {
        ...gear('core',211,'Astartes Combat Knife','3U','Blade,Adeptus Astartes'),
        ...meleez(undefined,3,2,-1,0,'Reliable'),
    },
    {
        ...gear('core',211,'Sword','3C','Blade,[Any]'),
        ...meleez(undefined,3,3,0,0,'Parry'),
    },
    {
        ...gear('core',211,'Mono Knife','3U','Blade,Imperium,Scum'),
        ...meleez(undefined,3,2,-1,0,'Rending(1)'),
    },
    {
        ...gear('core',211,'Imperial Bludgeon','3U','[Any]'),
        ...meleez(undefined,4,2,0,0,'Brutal,Unwieldy(1)'),
    },
    {
        ...gear('core',213,'Chain Bayonet','3R','Chain,Imperium,Chaos'),
        ...meleez('Chain Weapon',4,1,0,0,'Brutal'),
    },
    { // not a real entry delete soon
        ...gear('core',213,'Chain Sword','4U','Chain,Aeldari,Imperium,Chaos'),
        ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
    },
    {
        ...gear('core',213,'Chainsword','4U','Chain,Aeldari,Imperium,Chaos'),
        ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
    },
    {
        ...gear('core',213,'Chain Axe','5R','Chain,Chaos'),
        ...meleez('Chain Weapon',5,5,0,0,'Brutal,Rending(1)'),
    },
    {
        ...gear('core',214,'Eviscerator','6R','Chain,2-Handed,Adeptus Astartes,Adeptus Ministorum,Adepta Sororitas'),
        ...meleez('Chain Weapon',6,6,-4,2,'Brutal,Unwieldy(2)'),
    },
    {
        ...gear('core',214,'Chain Fist','10V','Chain,Power Field,Imperium,Chaos,Adeptus Astartes'),
        ...meleez('Chain Weapon',7,6,-4,0,'Brutal,Unwieldy(3)'),
    },
    {
        ...gear('core',214,'Whip','2C','Primitive,[Any]'),
        ...meleez('Exotic Melee Weapon',1,1,0,4,'Agonising'),
    },
    {
        ...gear('core',214,'Neural Whip','5R','Exotic,Adepta Sororitas'),
        ...meleez('Exotic Melee Weapon',3,2,-2,4,'Agonising'),
    },
    {
        ...gear('core',214,'Shock Whip','4V','Exotic,[Any]'),
        ...meleez('Exotic Melee Weapon',4,2,0,4,'Agonising,Rending(2)'),
    },
    {
        ...gear('core',214,'Shock Maul','5U','Exotic,Adeptus Arbites'),
        ...meleez('Exotic Melee Weapon',4,4,-1,0,'Agonising,Brutal'),
    },
    {
        ...gear('core',214,'Force Stave','2U','Forde,2-Handed,Inquisition,Adeptus Astartes,Adeptus Astra Telepathica'),
        ...meleez('Force Weapon',4,2,-1,2,'Brutal,Force'),
    },
    {
        ...gear('core',214,'Force Sword','6R','Force,Inquisition,Adeptus Astartes'),
        ...meleez('Force Weapon',5,4,-3,0,'Force,Parry'),
    },
    {
        ...gear('core',214,'Force Axe','6V','Force,Inquisition,Adeptus Astartes'),
        ...meleez('Force Weapon',5,5,-2,0,'Force'),
    },
    {
        ...gear('core',214,'Nemesis Deamon Hammer','10L','Force,2-Handed,Inquisition,Adeptus Astartes'),
        ...meleez('Force Weapon',8,6,-3,2,'Brutal,Force,Unwieldy(2)'),
    },
    {
        ...gear('core',215,'Death Cult Powerblade','6V','Power Field,Imperium,Adeptus Ministorum'),
        ...meleez('Power Weapon',5,4,-2,0,'Parry'),
    },
    {
        ...gear('core',215,'Power Sword','6R','Power Field,Imperium,Aeldari'),
        ...meleez('Power Weapon',5,4,-3,0,'Parry'),
    },
    {
        ...gear('core',215,'Void Sabre','6V','Power Field,Aeldari,Anhrathe'),
        ...meleez('Aeldari Weapon',5,4,-3,0,'Brutal,Parry'),
    },
    {
        ...gear('core',215,'Omnissian Axe','6V','Power Field,2-Handed,Imperium,Adeptus Mechanicus'),
        ...meleez('Power Weapon',5,5,-2,2),
    },
    {
        ...gear('core',215,'Power Axe','6R','Power Field,Imperium,Adeptus Mechanicus,Aeldari'),
        ...meleez('Power Weapon',5,5,-2,0, 'Rending(1)'),
    },
    {
        ...gear('core',215,'Power Fist','8V','Power Field,Imperium,Adeptus Astartes'),
        ...meleez('Power Weapon',5,5,-3,0, 'Brutal,Unwieldy(2)'),
    },
    {
        ...gear('core',215,'Thunder Hammer','9L','Power Field,2-Handed,Imperium,Adeptus Astartes,Inquisition'),
        ...meleez('Power Weapon',8,6,-3,2, 'Brutal,Unwieldy(2)'),
    },
    {
        ...gear('core',215,'Singing Spear','11L','Force,Aeldari,Asuryani'),
        ...meleez('Aeldari Weapon',6,5,0,2, 'Assault,Force,Warp Weapon,Thrown(STRx5)'),
    },
    {
        ...gear('core',215,'Witchblade','9V','Force,Aeldari,Asuryani'),
        ...meleez('Aeldari Weapon',6,5,0,0, 'Force,Parry,Warp Weapon'),
    },
    {
        ...gear('core',215,'Choppa','2C','Blade,Ork'),
        ...meleez('Ork Weapon',3,3,0,0, 'Reliable,Waaagh!'),
    },
    {
        ...gear('core',216,'Wierdboy Staff','5V','Force,2-Handed,Ork'),
        ...meleez('Ork Weapon',4,1,-1,2, 'Force,Waaagh!'),
    },
    {
        ...gear('core',216,'Chain Choppa','5V','Chain,Ork'),
        ...meleez('Ork Weapon',5,4,0,0, 'Brutal,Waaagh!'),
    },
    {
        ...gear('core',216,'Big Choppa','4R','Blade,2-Handed,Ork'),
        ...meleez('Ork Weapon',5,5,-1,0, 'Waaagh!'),
    },
    {
        ...gear('core',216,'Power Klaw','8V','Power Field,Ork'),
        ...meleez('Ork Weapon',6,5,-3,1, 'Brutal,Unwieldy(3),Waaagh!'),
    },
    {
        ...gear('core',216,'Bolt Pistol','4U','Bolt,Imperium'),
        ...rangez('Bolt Weapon',10,1,0,12,1,'Brutal,Pistol'),
    },
    {
        ...gear('core',216,'Heavy Bolt Pistol','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
        ...rangez('Bolt Weapon',10,1,-1,12,1,'Brutal,Pistol'),
    },
    {
        ...gear('core',216,'Boltgun','6U','Bolt,Imperium'),
        ...rangez('Bolt Weapon',10,1,0,24,2,'Brutal,Rapid Fire(2)'),
    },
    {
        ...gear('core',216,'Bolt Rifle','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
        ...rangez('Bolt Weapon',10,1,-1,30,2,'Brutal,Rapid Fire(2)'),
    },
    {
        ...gear('core',216,'Storm Bolter','6R','Bolt,Imperium'),
        ...rangez('Bolt Weapon',10,1,0,24,4,'Brutal,Heavy(3),Rapid Fire(3)'),
    },
    {
        ...gear('core',216,'Assault Bolter','8V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
        ...rangez('Bolt Weapon',12,2,-1,18,3,'Assault,Brutal,Rapid Fire(2)'),
    },
    {
        ...gear('core',216,'Heavy Bolter','6U','Bolt,Imperium'),
        ...rangez('Bolt Weapon',12,2,-1,36,3,'Brutal,Heavy(4),Rapid Fire(4)'),
    },
    {
        ...gear('core',221,'Laspistol','3C','Las,Imperium'),
        ...rangez('Las Weapon',7,1,0,12,1,'Pistol,Reliable'),
    },
    {
        ...gear('core',221,'Hot-Shot Laspistol','6R','Las,Imperium,Astra Militarum'),
        ...rangez('Las Weapon',7,1,-2,6,1,'Pistol,Reliable'),
    },
    {
        ...gear('core',221,'Master-Crafted Laspistol','6V','Las,Imperium'),
        ...rangez('Las Weapon',10,1,0,12,1,'Pistol,Reliable'),
    },
    {
        ...gear('core',221,'Lasgun','3C','Las,Imperium'),
        ...rangez('Las Weapon',7,1,0,24,2,'Rapid Fire(1),Reliable'),
    },
    {
        ...gear('core',222,'Hot-Shot Lasgun','6R','Las,Imperium,Astra Militarum'),
        ...rangez('Las Weapon',7,1,-2,18,2,'Rapid Fire(1),Reliable'),
    },
    {
        ...gear('core',222,'Hot-Shot Volley Gun','6R','Las,Imperium,Astra Militarum'),
        ...rangez('Las Weapon',10,1,-2,24,4,'Heavy(4),Reliable'),
    },
    {
        ...gear('core',222,'Long Las','6U','Las,Imperium,Astra Militarum'),
        ...rangez('Las Weapon',10,1,0,24,0,'Sniper(1),Reliable'),
    },
    {
        ...gear('core',222,'Lascannon','9U','Las,Imperium'),
        ...rangez('Las Weapon',18,3,-3,48,1,'Heavy(8),Reliable'),
    },
    {
        ...gear('core',223,'Plasmapistol','6R','Plasma,Imperium'),
        ...rangez('Plasma Weapon',15,1,-3,12,1,'Pistol,Supercharge'),
    },
    {
        ...gear('core',223,'Plasma Gun','6R','Plasma,Imperium'),
        ...rangez('Plasma Weapon',15,1,-3,24,2,'Rapid Fire(1),Supercharge'),
    },
    {
        ...gear('core',223,'Plasma Cannon','7V','Plasma,Imperium'),
        ...rangez('Plasma Weapon',15,2,-3,36,3,'Heavy(8),Supercharge'),
    },
    {
        ...gear('core',223,'Inferno Pistol','6V','Melta,Imperium,Adeptus Astartes,Adepta Sororitas'),
        ...rangez('Melta Weapon',16,1,-4,6,1,'Melta,Pistol'),
    },
    {
        ...gear('core',223,'Meltagun','6R','Melta,Imperium'),
        ...rangez('Melta Weapon',16,2,-4,12,1,'Assault,Melta'),
    },
    {
        ...gear('core',224,'Multi-Melta','7R','Melta,Imperium'),
        ...rangez('Melta Weapon',16,3,-4,24,1,'Heavy(8),Melta'),
    },
    {
        ...gear('core',222,'Autopistol','3C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',7,1,0,12,2,'Pistol'),
    },
    {
        ...gear('core',222,'Hand Cannon','4C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',9,1,0,12,1,'Pistol'),
    },
    {
        ...gear('core',222,'Autogun','3C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',7,1,0,24,3,'Rapid Fire(1)'),
    },
    {
        ...gear('core',222,'Stubber','2C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',7,1,0,12,1,'Pistol'),
    },
    {
        ...gear('core',222,'Needle Pistol','6V','Projectile,Imperium'),
        ...rangez('Projectile Weapon',8,2,0,12,1,'Agonising,Inflict(Poisoned 4),Pistol,Silent'),
    },
    {
        ...gear('core',222,'Stubcannon','3C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',9,1,0,18,1,'Brutal'),
    },
    {
        ...gear('core',222,'Shotgun','3C','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',8,1,0,12,1,'Assault,Spread'),
    },
    {
        ...gear('core',223,'Combat Shotgun','3U','Projectile,Imperium'),
        ...rangez('Projectile Weapon',9,1,0,12,2,'Assault,Rapid Fire(1),Spread'),
    },
    {
        ...gear('core',223,'Astartes Shotgun','6R','Projectile,Imperium,Adeptus Astartes'),
        ...rangez('Projectile Weapon',10,1,0,12,2,'Assault,Spread,Reliable'),
    },
    {
        ...gear('core',223,'Needle Rifle','6V','Needle,Imperium'),
        ...rangez('Projectile Weapon',8,2,0,28,2,'Agonising,Inflict(Poisoned 4),Silent'),
    },
    {
        ...gear('core',223,'Heavy Stubber','5U','Projectile,Imperium,Scum'),
        ...rangez('Projectile Weapon',10,2,0,36,3,'Heavy(4)'),
    },
    {
        ...gear('core',223,'Astartes Sniper Rifle','6U','Projectile,Imperium,Adeptus Astartes'),
        ...rangez('Projectile Weapon',10,1,0,36,0,'Sniper(2),Silent'),
    },
    {
        ...gear('core',223,'Assault Cannon','6U','Projectile,Imperium,Adeptus Astartes'),
        ...rangez('Projectile Weapon',14,2,-1,24,6,'Heavy(8)'),
    },
    {
        ...gear('core',223,'Autocannon','5C','Projectile,Imperium'),
        ...rangez('Projectile Weapon',16,1,-1,48,3,'Heavy(8)'),
    },
    {
        ...gear('core',224,'Hand Flamer','5U','Fire,Imperium'),
        ...rangez('Flame Weapon',7,1,0,6,1,'Flamer,Pistol'),
    },
    {
        ...gear('core',224,'Flamer','5U','Fire,Imperium'),
        ...rangez('Flame Weapon',10,1,0,8,1,'Assault,Flamer'),
    },
    {
        ...gear('core',224,'Heavy Flamer','5U','Fire,Imperium'),
        ...rangez('Flame Weapon',12,2,-1,8,2,'Flamer,Heavy(6)'),
    },
    {
        ...gear('core',224,'Arc Pistol','5R','Arc,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',14,1,-1,12,1,'Arc(2),Pistol'),
    },
    {
        ...gear('core',224,'Radium Pistol','6R','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',7,1,0,12,1,'Pistol,Rad(2)'),
    },
    {
        ...gear('core',224,'Galvanic Rifle','5R','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',10,1,0,30,2,'Rapid Fire(1),Rending(1)'),
    },
    {
        ...gear('core',224,'Arc Rifle','6R','Arc,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',14,1,-1,24,2,'Arc(2),Rapid Fire(1)'),
    },
    {
        ...gear('core',224,'Radium Carbine','6V','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',7,1,0,18,3,'Assault,Rad(2)'),
    },
    {
        ...gear('core',224,'Volkite Blaster','11L','Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',14,2,0,24,2,'Blast(Small),Heavy(4),Inflict(On Fire),Rapid Fire(2)'),
    },
    {
        ...gear('core',224,'Frag Grenade','2C','Explosive,Imperium'),
        ...rangez('Grenade & Missile Weapon',10,4,0,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
    },
    {
        ...gear('core',225,'Plasma Grenade','5V','Explosive,Aeldari'),
        ...rangez('Grenade & Missile Weapon',10,5,-1,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
    },
    {
        ...gear('core',225,'Krak Grenade','4U','Explosive,Imperium'),
        ...rangez('Grenade & Missile Weapon',14,5,-2,'*','-','Blast(Small),Thrown(STRx4),Launcher'),
    },
    {
        ...gear('core',225,'Militarum Tempestus Grenade Launcher','6U','Explosive,Imperium,Astra Militarum'),
        ...rangez('Grenade & Missile Weapon','*','*','*',28,'-','Assault'),
    },
    {
        ...gear('core',225,'Frag Missile','4C','Explosive,Imperium,[Any]'),
        ...rangez('Grenade & Missile Weapon',10,5,0,'*','-','Blast(Large),Launcher'),
    },
    {
        ...gear('core',225,'Krak Missile','6C','Explosive,Imperium'),
        ...rangez('Grenade & Missile Weapon',16,6,-2,'*','-','Blast(Medium),Launcher'),
    },
    {
        ...gear('core',225,'Missile Launcher','4C','Explosive,Imperium'),
        ...rangez('Grenade & Missile Weapon','*','*','*',48,'-','Heavy(6)'),
    },
    {
        ...gear('core',225,'Cyclone Missile Launcher','11V','Explosive,Imperium,Adeptus Astartes'),
        ...rangez('Grenade & Missile Weapon','*','*','*',36,'-','Heavy(8)'),
    },
    {
        ...gear('core',225,'Lasblaster','5V','Las,Aeldari'),
        ...rangez('Aeldari Weapon',7,1,0,24,4,'Assault'),
    },
    {
        ...gear('core',225,'Shuriken Catapult','6R','Shuriken,Aeldari,Asuryani'),
        ...rangez('Aeldari Weapon',10,1,0,12,3,'Assault,Rending(3)'),
    },
    {
        ...gear('core',226,'Shuriken Pistol','6R','Shuriken,Aeldari,Asuryani'),
        ...rangez('Aeldari Weapon',10,1,0,12,3,'Pistol,Rending(3)'),
    },
    {
        ...gear('core',226,'Ranger Long Rifle','7V','Las,Aeldari'),
        ...rangez('Aeldari Weapon',10,1,0,36,0,'Sniper(4)'),
    },
    {
        ...gear('core',226,'Fusion Gun','6V','Melta,Aeldari'),
        ...rangez('Aeldari Weapon',16,2,-4,12,1,'Assault,Melta'),
    },
    {
        ...gear('core',226,'Slugga','3C','Projectile,Ork'),
        ...rangez('Ork Weapon',10,1,0,12,1,'Pistol,Waaagh!'),
    },
    {
        ...gear('core',226,'Shoota','4U','Projectile,Ork'),
        ...rangez('Ork Weapon',10,1,0,18,2,'Assault,Waaagh!'),
    },
    {
        ...gear('core',226,'Burna','5U','Fire,Ork'),
        type: 'Ranged Weapon',
        subtype: 'Ork Weapon',
        meta: [
            metaRange(10,1,0,8,1,['Assault','Flamer']),
            metaMelee(7,1,-2,0,['Inflict(On Fire)']),
        ],
    },
    {
        ...gear('core',226,'Big Shoota','5U','Projectile,Ork'),
        ...rangez('Ork Weapon',12,2,0,36,3,'Assault,Waaagh!'),
    },
    {
        ...gear('core',227,'Snazzgun','8L','Ork'),
        ...rangez('Ork Weapon',12,2,-2,24,3,'Heavy(4),Kustom'),
    },
    {
        ...gear('core',227,'Rokkit Launcher','7R','Explosive,Ork'),
        ...rangez('Ork Weapon',16,'1d3',-2,24,'-','Assault,Blast(Small)'),
    },
    {
        ...gear('core',227,'Stikkbomb','2U','Explosive,Ork'),
        ...rangez('Ork Weapon',9,5,0,'*','-','Blast(Medium),Trown(STRx4),Launcher'),
    },
    // Weapon Upgrades
    {
        ...gear('core',227,'Ammo Drum','3C','Imperium,Scum'),
        type: 'Weapon Upgrade',
        snippet: 'You can carry 1 additional Reload.',
    },
    {
        ...gear('core',227,'Autoloader','5R','Imperium'),
        type: 'Weapon Upgrade',
        snippet: 'You can Reload your weapon as a Free Action.',
    },
    {
        ...gear('core',227,'Bayonet Lug','1C','[Any]'),
        key: 'core-bayonet-lung',
        type: 'Weapon Upgrade',
        upgradeType: 'Bayonet',
        snippet: 'You can use this weapon as a Knife (p. 211).',
    },
    {
        ...gear('core',227,'Chain Bayonet','4R','Imperium,Chaos'),
        key: 'core-weapon-upgrade-chain-bayonet',
        type: 'Weapon Upgrade',
        upgradeType: 'Bayonet',
        snippet: 'You can use this weapon as a Chain Bayonet (p. 213).',
    },
    {
        ...gear('core',227,'Combi Weapon','6R','Imperium,Chaos,Scum'),
        type: 'Weapon Upgrade',
        snippet: 'You may fire the both Weapons as a Multi-Action.',
        description:
            '<p>A combi-weapon may be fired as either or both of its component weapons each round. Firing both component weapons is treated as a Multi-Action.</p>' +
            '<p>You must own the two ranged weapons you want to combine when you purchase this upgrade. Pistols can only be combined with other Pistols, and weapons with the Heavy Trait cannot take this upgrade.</p>',
    },
    {
        ...gear('core',228,'Distinction','5U','[Any]'),
        type: 'Weapon Upgrade',
        snippet: '+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon.',
        description:
            '<p>+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon. Distinction does not count toward a weapon’s maximum number of upgrades.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1, rank: 0, condition: 'when brandishing that weapon' },
        ],
    },
    {
        ...gear('core',228,'Duelling Grip','3U','[Any]'),
        type: 'Weapon Upgrade',
        upgradeType: 'Grip',
        snippet: '+1 bonus die on Attack Tests using this weapon.',
        description: '<p>+1 bonus die on Attack Tests using this weapon. This upgrade can only be applied to Pistols or onehanded melee weapons.</p>',
    },
    {
        ...gear('core',228,'Gene-Grip Bio-Verator','5R','Imperium'),
        type: 'Weapon Upgrade',
        upgradeType: 'Grip',
        snippet: 'Any mechanisms your weapon has (triggers, chain engines, etc.) will not activate for anyone but you.',
    },
    {
        ...gear('core',228,'Mastercrafted','7V','[Any]'),
        type: 'Weapon Upgrade',
        snippet: 'The weapon gains the Reliable Trait. You gain +2 bonus dice to any Attack Test made with this weapon.',
    },
    {
        ...gear('core',228,'Megathoule Accelerator (Lucius Pattern)','6V','Imperium,Astra Militarum'),
        type: 'Weapon Upgrade',
        snippet: 'The weapon gains +2 Damage. The weapon loses the Reliable Trait.',
    },
    {
        ...gear('core',228,'Magnocular Scope','2U','Imperium,Astra Militarum'),
        type: 'Weapon Upgrade',
        upgradeType: 'Scope',
        snippet: 'Awareness (Int) Tests no penalties due to distance. Any Range penalties are reduced by 2.',
    },
    {
        ...gear('core',228,'Percussive Muzzle Brake','3U','[Any]'),
        type: 'Weapon Upgrade',
        upgradeType: 'Muzzle',
        snippet: 'The weapon gains +1 Salvo. This upgrade can only be applied to a weapon without the Heavy Trait.',
    },
    {
        ...gear('core',228,'Preysense Sight','6R','Imperium,Scum,[Any]'),
        type: 'Weapon Upgrade',
        upgradeType: 'Scope',
        snippet: 'This weapon upgrade allows the wielder to detect targets via ambient heat, even in total darkness.',
    },
    {
        ...gear('core',228,'Red-Dot Sight','5U','Imperium,Scum'),
        type: 'Weapon Upgrade',
        upgradeType: 'Scope',
        snippet: '+1 bonus die to ranged attacks made with this weapon.',
    },
    {
        ...gear('core',229,'Silencer','3U','Imperium,Scum,[Any]'),
        type: 'Weapon Upgrade',
        upgradeType: 'Muzzle',
        snippet: 'The weapon gains the Silent Trait. This upgrade can only be applied to a weapon with the BOLT or PROJECTILE Keywords.',
    },
    // Ammo
    {
        ...gear('core',229,'Ammo Backpack','5U','[Any]'),
        type: 'Ammo',
        subtype: 'Ammo Container',
        snippet: 'You can carry 10 additional Reloads.',
    },
    {
        ...gear('core',229,'Bandolier','2C','[Any]'),
        type: 'Ammo',
        subtype: 'Ammo Container',
        snippet: 'You can carry 2 additional Reloads.',
    },
    {
        ...gear('core',230,'Dragonfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
        type: 'Ammo',
        subtype: 'Special Bolt Ammo',
        snippet: 'The Weapon gains the Spread trait. The weapon ignores Defence bonuses from cover.',
    },
    {
        ...gear('core',230,'Hellfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
        type: 'Ammo',
        subtype: 'Special Bolt Ammo',
        snippet: '+3 ED against organic targets. +2 ED against inorganic targets.',
    },
    {
        ...gear('core',231,'Kraken Bolt Rounds','6V','Imperium,Adeptus Astartes'),
        type: 'Ammo',
        subtype: 'Special Bolt Ammo',
        snippet: 'AP -2',
    },
    {
        ...gear('core',231,'Bleeder Rounds','5U','Imperium,Scum'),
        type: 'Ammo',
        subtype: 'Special Projectile Ammo',
        snippet: 'You can Shift an Exalted Icon when you make an Attack Test with this weapon to inflict the Bleeding Condition.',
    },
    {
        ...gear('core',231,'Dumdum Bullets','4U','Imperium,Scum'),
        type: 'Ammo',
        subtype: 'Special Projectile Ammo',
        snippet: '+1 ED',
    },
    // Armour
    {
        ...gear('core',232,'Primitive Armour','2C','Heavy,Primitive'),
        ...armour('Imperial Armour',2,'Bulk(2)'),
    },
    {
        ...gear('core',232,'Bodyglove','3R','Light,Imperium,Adeptus Ministorum'),
        ...armour('Imperial Armour',2),
    },
    {
        ...gear('core',232,'Mesh Armour','3R','Light,Imperium,[Any]'),
        ...armour('Imperial Armour',3),
    },
    {
        ...gear('core',232,'Flak Armour','4C','Flak,Imperium,Astra Militarum'),
        ...armour('Imperial Armour',3),
    },
    {
        ...gear('core',232,'Flak Coat','4U','Flak,Imperium,Astra Militarum'),
        ...armour('Imperial Armour',3),
    },
    {
        ...gear('core',232,'Skitarii Auto-Cuirass','5R','Heavy,Imperium,Adeptus Mechanicus,Skitarii'),
        ...armour('Imperial Armour',4),
    },
    {
        ...gear('core',232,'Carapace Armour','5U','Imperium,Adeptus Astartes,Astra Militarum'),
        ...armour('Imperial Armour',4,'Bulk(1)'),
    },
    {
        ...gear('core',232,'Tempestus Carapace','6R','Heavy,Imperium,Astra Militarum,Militarum Tempestus'),
        ...armour('Imperial Armour',4),
    },
    {
        ...gear('core',234,'Light Power Armour','6V','Powered,Imperium'),
        ...armour('Powered Armour',4, 'Powered(1)'),
    },
    {
        ...gear('core',234,'Sororitas Power Armour','6V','Powered,Imperium,Adepta Sororitas'),
        ...armour('Powered Armour',5, 'Powered(2)'),
    },
    {
        ...gear('core',234,'Ignatus Power Armour','7V','Powered,Imperium,Inquisition'),
        ...armour('Powered Armour',5, 'Powered(2)'),
    },
    {
        ...gear('core',234,'Heavy Power Armour','8V','Heavy,Powered,Imperium,Inquisition'),
        ...armour('Powered Armour',6, 'Bulk(1),Cumbersome,Powered(3)'),
    },
    {
        ...gear('core',234,'Storm Shield','8L','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum,Inquisition'),
        ...armour('Power Fields',2, 'Bulk(1),Shield,Power Field'),
    },
    {
        ...gear('core',234,'Refractor Field','5R','Force Field,Imperium,Astra Militarum'),
        ...armour('Power Fields',3, 'Power Field'),
    },
    {
        ...gear('core',234,'Rosarius','7V','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum'),
        ...armour('Power Fields',4, 'Power Field'),
    },
    {
        ...gear('core',234,'Scout Armour','5R','Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',4),
    },
    {
        ...gear('core',234,'Aquila Mk VII','8V','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',5,'Powered(3)'),
    },
    {
        ...gear('core',235,'Tacticus Mk X','9V','Powered,Imperium,Adeptus Astartes,Adeptus Primaris'),
        ...armour('Astartes Armour',5,'Powered(4)'),
    },
    {
        ...gear('core',235,'Terminator Armour','10L','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',7,'Powered(4),Cumbersome'),
    },
    {
        ...gear('core',235,'Corsair Armour','4R','Light,Aeldari,Anhrathe'),
        ...armour('Aeldari Armour',3),
    },
    {
        ...gear('core',235,'Aeldari Mesh Armour','4V','Light,Aeldari,Asuryani'),
        ...armour('Aeldari Armour',3),
    },
    {
        ...gear('core',235,'Rune Armour','6L','Force Field,Aeldari,Asuryani'),
        ...armour('Aeldari Armour',4,'Power Field'),
    },
    {
        ...gear('core',235,'Heavy Mesh Armour','6V','Aeldari,Anhrathe'),
        ...armour('Aeldari Armour',4),
    },
    {
        ...gear('core',235,'Voidplate Harness','7R','Aeldari,Anhrathe'),
        ...armour('Aeldari Armour',5,'Bulk(1)'),
    },
    {
        ...gear('core',235,'Shimmershield','7L','Force Field,Aeldari,Asuryani'),
        ...armour('Aeldari Armour',2,'Power Field,Shield'),
    },
    // Armour - Ork Armour
    {
        ...gear('core',235,'Ork Flak','2U','Primitive,Ork'),
        ...armour('Ork Armour',2),
    },
    {
        ...gear('core',235,'\'Eavy Armour','3U','Heavy,Primitive,Ork'),
        ...armour('Ork Armour',4,'Ere We Go,Bulk(1)'),
    },
    {
        ...gear('core',235,'Mega Armour','9V','Powered,Ork'),
        ...armour('Ork Armour',7,'Ere We Go,Cumbersome,Powered(4)'),
    },
    // Tools & Equipment
    {
        ...gear('core',236,'9-70 Entrenching Tool','2C','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','Dig trenches, foxholes, and other earthen fortifications.'),
        description: '<p>A 9-70 entrenching tool halves the time needed to dig trenches, foxholes, and other earthen fortifications. It also makes for a sturdy improvised weapon, as many a Guardsman can attest.</p>'
    },
    {
        ...gear('core',236,'Auspex','5R','Imperium,Adeptus Mechanicus'),
        ...toolz('Imperial Equipment','Activated as a Combat Action to detect energy emissions, motion, and other life signs within 50 metres.'),
    },
    {
        ...gear('core',236,'Auto-Quill','3U','Imperium'),
        ...toolz('Imperial Equipment','+2 bonus dice to Tests to forge or alter documents.'),
    },
    {
        ...gear('core',236,'Ballistic Appeasement Autoreliquary (Absolutis Pattern)','6V','Imperium,Adeptus Astartes,Adeptus Primaris'),
        ...toolz('Imperial Equipment','Clear a jammed weapon as a Free Action.'),
    },
    {
        ...gear('core',236,'Clothing','1C','Imperium'),
        ...toolz('Imperial Equipment','Common Clothing, nothing Special.'),
    },
    {
        ...gear('core',236,'Clothing, Uncommon','1U','Imperium'),
        ...toolz('Imperial Equipment','Common Clothing may grant a small bonus to social skill tests.'),
    },
    {
        ...gear('core',236,'Clothing, Rare','1R','Imperium'),
        ...toolz('Imperial Equipment','Rare Clothing may grant a small bonus to social skill tests.'),
    },
    {
        ...gear('core',236,'Clothing, Very Rare','1V','Imperium'),
        ...toolz('Imperial Equipment','Very Rare Clothing may grant a small bonus to social skill tests.'),
    },
    {
        ...gear('core',236,'Combi-Tool','3U','[Any]'),
        ...toolz('Universal Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Imperial technology.'),
    },
    {
        ...gear('core',236,'Cameleoline Cloak','5R','[Any]'),
        ...toolz('Universal Equipment','+1 bonus die to Stealth (A) Tests and +1 to Defence when in shadow or cover.'),
        modifications: [
            { targetGroup: 'skills', targetValue: 'stealth', modifier: 1, condition: 'when in shadow or cover' },
            { targetGroup: 'traits', targetValue: 'defence', modifier: 1, condition: 'when in shadow or cover' },
        ],
    },
    {
        ...gear('core',237,'Chaplet Ecclesiasticus','3U','Imperium,Adeptus Ministorum,Adepta Sororitas'),
        ...toolz('Imperial Equipment','The Chaplet can be used as a Symbol of Authority (p.240) or, if necessary a garrote.'),
    },
    {
        ...gear('core',237,'Chrono','2C','[Any]'),
        ...toolz('Universal Equipment','Settings on the chrono’s display allow for the accurate tracking of Imperial standard, shipboard, and local planetary time.'),
    },
    {
        ...gear('core',237,'Data-Slate','2C','[Any]'),
        ...toolz('Universal Equipment','You can record any information transferable from a cogitator, such as local maps, familial records, or manufactorum outputs, onto your Data-Slate.'),
    },
    {
        ...gear('core',237,'Diagnostor','5R','Imperium'),
        ...toolz('Imperial Equipment','+1 bonus die to Medicae (Int) Tests to detect and diagnose diseases, injuries, and ailments, and to determine cause of death.'),
    },
    {
        ...gear('core',237,'Grav-Chute','5R','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','You can hover or control a fall for up to one hour. You can recharge the Grav-Chute’s solar battery by leaving it in sunlight for one hour.'),
    },
    {
        ...gear('core',237,'Jump Pack','7R','[Any]'),
        ...toolz('Universal Equipment','Pilot Test to fly at double speed. Fail and Scatter, suffering 1d3 shock on a complication.'),
        description: '<p>You can fly at double your Speed by making a Pilot (A) Test, ignoring any terrain. If you fail the Pilot (A) Test, your movement deviates according to the Scattering (p.186) rules. A Complication triggers a crash, which deals a minimum of 1d3 Shock.</p>',
    },
    {
        ...gear('core',237,'Mag-Boots','4U','[Any],Navis Imperialis'),
        ...toolz('Universal Equipment','Pilot Test to fly at double speed. Fail and Scatter, suffering 1d3 shock on a complication.'),
        description: '<p>When activated with a Simple Action, the wearer’s feet are fully secured to any metallic surface. The wearer’s feet cannot be removed from the metallic surface by any means, other than their own volition. The wearer can walk and move on the metallic surface whilst the boots are on, but their Speed is reduced by 3.</p>',
    },
    {
        ...gear('core',238,'Medikit','3U','[Any]'),
        ...toolz('Universal Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124).'),
    },
    {
        ...gear('core',238,'Chirurgeon\'s Tools','5R','Imperium,Adepta Sororitas'),
        ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). +2 bonus dice to Medicae (Int) Tests when a character is Dying.'),
    },
    {
        ...gear('core',238,'Martyr\'s Gift Medkit','6R','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Includes a standard augmetic replacement for any lost limb or eye (p.242); the augmetic is temporary, and becomes useless after 24 hours. The subcutaneous frag charge has the same damage profile as a Frag Missile (p.220).'),
    },
    {
        ...gear('core',238,'Missionary Kit','2U','Imperium,Adeptus Ministorum'),
        ...toolz('Imperial Equipment','+1 bonus die to Persuasion (Fel) Tests made involving converts to the Imperial Creed and those seeking redemption through the grace of the God-Emperor.'),
    },
    {
        ...gear('core',238,'Monoscope','4R','Imperium,Militarum Tempestus'),
        ...toolz('Universal Equipment','Can act as a light source and show live footage if connected wirelessly to a data-slate.'),
    },
    {
        ...gear('core',238,'Munitorum-Issue Mess Kit','5R','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','+1 bonus die to Survival (Wil) tests made to find food and water.'),
    },
    {
        ...gear('core',238,'Periculum Kit','5R','Imperium,[Any]'),
        ...toolz('Imperial Equipment','A Periculum Kit contains: * Chrono * Data-Slate * Magnoculars * 2 Ration Packs * Respirator * Vox-bead.'),
    },
    {
        ...gear('core',238,'Preysense Goggles','5R','[Any]'),
        ...toolz('Universal Equipment','You ignore any penalties to Tests due to visual conditions.'),
    },
    {
        ...gear('core',238,'Psychic Focus','3R','[Any]'),
        ...toolz('Universal Equipment','+1 bonus die to Psychic Mastery (Wil) Tests.'),
    },
    {
        ...gear('core',238,'Ration Packs','1C','[Any]'),
        ...toolz('Universal Equipment','Nomnomnom...'),
    },
    {
        ...gear('core',239,'Respirator','2U','[Any]'),
        ...toolz('Universal Equipment','A Respirator canister lasts for 2 hours of continuous breathing. Whilst breathing through the Respirator, you are immune to breathable poisons and toxic atmospheres.'),
    },
    {
        ...gear('core',239,'Rule Of The Sororitas','2U','[Any]'),
        ...toolz('Imperial Equipment','If you have the ADEPTA SORORITAS Keyword, you can read the Rule of Sororitas as part of a Regroup to recover 1d3 Shock.'),
    },
    {
        ...gear('core',239,'Sacred Machine Oil','3U','Imperium,Adeptus Mechanicus'),
        ...toolz('Imperial Equipment','You may ignore any Complication involving Imperial technology in any scene (including combat).'),
    },
    {
        ...gear('core',239,'Slate Monitron','5R','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','+2 bonus dice to Medicae (Int) Tests made to heal your Wounds.'),
    },
    {
        ...gear('core',239,'Stimm','3U','Imperium,Scum'),
        ...toolz('Imperial Equipment','Can be used as part of a Medicae (Int) Test to restore 1d3 + 3 Shock.'),
    },
    {
        ...gear('core',239,'Survival Kit','3U','[Any]'),
        ...toolz('Universal Equipment','+1 bonus die to all Survival (Wil) Tests.'),
    },
    {
        ...gear('core',240,'Symbol Of Authority','3U','[Any]'),
        ...toolz('Universal Equipment','+1 bonus die to Leadership (Wil) and Intimidation (Wil) Tests versus targets who would respect your position.'),
    },
    {
        ...gear('core',240,'Uplifting Primer','2C','Imperium,Astra Militarum'),
        ...toolz('Imperial Equipment','+1 bonus die to Scholar (Int) Test. A Complication on the Test means that the user learns potentially dangerous misinformation as determined by the GM.'),
    },
    {
        ...gear('core',240,'Void Suit','5R','[Any]'),
        ...toolz('Universal Equipment','Protects the wearer from the vacuum of space, with enough oxygen for five hours of continuous use. Includes a Vox Caster.'),
    },
    {
        ...gear('core',240,'Vox Bead','3U','[Any]'),
        ...toolz('Universal Equipment','You can communicate with anyone within 1,000 metres (one kilometer) that has a vox unit tuned to the same frequency.'),
    },
    {
        ...gear('core',240,'Vox Caster','3R','[Any]'),
        ...toolz('Universal Equipment','You can communicate with anyone within 100,000 metres (100 kilometers) that has a vox unit.'),
    },
    {
        ...gear('core',240,'Writing Kit','2C','Imperium'),
        ...toolz('Imperial Equipment','A kit to write stuff'),
    },
    {
        ...gear('core',241,'Bonesinger Shard','6R','Aeldari'),
        ...toolz('Aeldari Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Aeldari technology.'),
    },
    {
        ...gear('core',241,'Spirit Stone','7V','Aeldari'),
        ...toolz('Aeldari Equipment','If an Aeldari dies while wearing a Spirit Stone, the Stone immediately absorbs the soul and stores it safely and secretly inside.'),
    },
    {
        ...gear('core',241,'Webway Keystone','7L','Aeldari'),
        ...toolz('Aeldari Equipment','You can make a DN 5 Tech (Int) Test to activate either of the following effects: (a) Detect the distance and orientation of the nearest Webway portal. (b) Open or close a Webway portal within 30 metres. Large or complex gates have higher DNs.'),
    },
    {
        ...gear('core',241,'Ammo Runt','5U','Ork'),
        ...toolz('Ork Equipment',''),
    },
    {
        ...gear('core',241,'Dok´s Toolz','5V','Ork'),
        ...toolz('Ork Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Only usable for Ork biology. Whenever you roll a Complication whilst using a Dok Bag, the target suffers either 1 Wound or 1 Shock, whichever is funnier.'),
    },
    {
        ...gear('core',241,'Mek Toolz','5U','Ork'),
        ...toolz('Ork Equipment','Functions as a Combi-Tool (p.236) for Ork technology. Mek Toolz can be used to dismantle and other technology and reassemble it into Ork Wargear of an equal or lesser Value and Rarity. This re-assembly requires a Tech (Int) Test with a DN equal to the Value of the Ork Wargear you are creating, and takes a number of hours equal to the Value of the Wargear you are creating.'),
    },
    // Augments
    {
        ...gear('core',243,'Augmetic Arm','4R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'You gain +1 Strength per Augmetic Arm.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
    },
    {
        ...gear('core',243,'Augmetic Eye (Auger)','6U','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: '+1 bonus die to sight-based Awareness (Int) Tests.',
    },
    {
        ...gear('core',243,'Augmetic Eye (Night)','6U','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'Acts as Preysense Goggles (p.238).',
    },
    {
        ...gear('core',243,'Augmetic Eye (Pict Recorder)','6U','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'Can record up to 1 hour of video or 86,400 still images.',
    },
    {
        ...gear('core',243,'Augmetic Eye (Reticule)','6U','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: '+1 bonus die to ranged Attack Tests.',
    },
    {
        ...gear('core',243,'Augmetic Eye (Telescope)','6U','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'You ignore any penalties related to visual distance.',
    },
    {
        ...gear('core',243,'Augmetic Legs','4R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'You gain +2 Speed and add 2 metres to any jump.',
        modifications: [ { targetGroup: 'traits', targetValue: 'speed', modifier: 2 } ],
    },
    {
        ...gear('core',244,'Augmetic Respirator','5R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'You gain +1 bonus die to Toughness Tests to resist toxic gasses and airborne poisons or diseases. You can hold your breath for twice as long, which doubles how long the air in a Void Suit or similar equipment lasts.',
    },
    {
        ...gear('core',244,'Augmetic Viscera','5V','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Enhancements',
        snippet: 'You gain +1 Toughness.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ],
    },
    {
        ...gear('core',244,'Auger Array (Auspex)','4R','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You have an Auspex (p.236) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
    },
    {
        ...gear('core',244,'Auger Array (Diagnostor)','4R','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You have a Diagnostor (p.237) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
    },
    {
        ...gear('core',244,'Autodogmatic Cortex','6V','Imperium,Adeptus Mechanicus,Adeptus Administorum'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Willpower.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ],
    },
    {
        ...gear('core',244,'Cardioproxy','6L','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Toughness.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ],
    },
    {
        ...gear('core',244,'Cortex Implant','7V','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Intellect.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 } ],
    },
    {
        ...gear('core',244,'Mechadendrites (Ballistic)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'Functions as a Laspistol (p.217). Your biology powers the weapon, so it does not use Ammo or need to be Reloaded.',
        meta: [ metaRange(7,1,0,12,1,['Pistol,Reliable']) ],
    },
    {
        ...gear('core',245,'Mechadendrites (Exploration)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'Functions as an Auspex (p.236). +1 bonus die to Survival (Wil) Tests to navigate or track.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.SURVIVAL, modifier: 1, condition: 'when navigation or tacking.' } ],
    },
    {
        ...gear('core',245,'Mechadendrites (Medicae)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'Functions as a Medikit (p.238) and a Diagnostor (p.237). +1 bonus die to Medicae (Int) Tests. Can be used to inject toxins, sedatives, and stimulants in combat as a Simple Injecting an unwilling target requires an Opposed Initiative Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1 } ],
    },
    {
        ...gear('core',245,'Mechadendrites (Optical)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'Functions as a Magnocular Scope (p.228) and Preysense Goggles (p.237). +1 bonus die to Awareness (Int) Tests; allows you to make microscopic examinations.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 1 } ],
    },
    {
        ...gear('core',245,'Mechadendrites (Servo-Arm)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'You gain +4 Strength when using the arm. In combat, the arm allows you to Brace (p.189) as a Free Action. You can use the arm as a melee weapon with the following profile: Damage 4+2ED, AP-3, Unwieldy(2)',
        meta: [ metaMelee(4,2,-3,1,['Unwieldy(2)']) ],
    },
    {
        ...gear('core',245,'Mechadendrites (Utility)','5V','Adeptus Mechanicus'),
        type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
        snippet: 'Functions as a Combi-Tool (p.236). +1 bonus die to Tech (Int) Tests.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 1 } ],
    },
    {
        ...gear('core',245,'Mind Impulse Unit','6R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet:
            'You can converse with a machine spirit as an Action; this may require a Tech (Int) Test for unruly spirits. ' +
            'If you succeed, you gain +Double Rank bonus dice to all Tests to operate the machine.',
    },
    {
        ...gear('core',245,'Neuroplastic Psychosectemy','7L','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Intellect and +1 Willpower but suffer −2 Fellowship.',
        modifications: [
            { targetGroup: 'attributes', targetValue: ATTRIBUTES.INTELLECT, modifier: 1 },
            { targetGroup: 'attributes', targetValue: ATTRIBUTES.WILLPOWER, modifier: 1 },
            { targetGroup: 'attributes', targetValue: ATTRIBUTES.FELLOWSHIP, modifier: -2 },
        ],
    },
    {
        ...gear('core',246,'Reflex Catalyst','6V','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Initiative.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ],
    },
    {
        ...gear('core',246,'Sinew Armature','6V','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Strength.',
        modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
    },
    {
        ...gear('core',246,'Subdermal Armour','4R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'You gain +1 Base Resilience.',
        modifications: [ { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 } ],
    },
    {
        ...gear('core',246,'Weapon Implant','3R','[Any]'),
        type: 'Augmetics', subtype: 'Augmetic Implants',
        snippet: 'Value is 3+ Weapoin Value. Augmetic Arm Weapon Implant (p.246).',
    },
    {
        ...gear('core',246,'Eyes Of The Crone','5V','Aeldari'),
        type: 'Augmetics', subtype: 'Aeldari Augmetics',
        snippet: 'A single Eye of the Crone can have two different Augmetic Eye effects (p.243).',
    },
    {
        ...gear('core',246,'Heart Of Vaul','7L','Aeldari'),
        type: 'Augmetics', subtype: 'Aeldari Augmetics',
        snippet: 'You gain +1 to Defence and Armour in addition to any armour or shield you have.',
    },
    {
        ...gear('core',247,'Iron Gob','3R','Ork'),
        type: 'Augmetics', subtype: 'Ork Bionics',
        snippet: 'You gain +1 Armour (this stacks with worn Armour) and +1 bonus die to Intimidation (Wil) Tests. You can make a melee bite attack with a Damage of 6 +2 ED.',
    },
    {
        ...gear('core',247,'Iron Gutz','5V','Ork'),
        type: 'Augmetics', subtype: 'Ork Bionics',
        snippet: 'You gain +2 bonus dice to Tests to resist ingested poisons. You can automatically find food to subsist you in any environment.',
    },
    {
        ...gear('core',247,'Rebuild Cranium','6V','Ork'),
        type: 'Augmetics', subtype: 'Ork Bionics',
        snippet: 'Roll 1d3 at the start of each session. Your Intellect Attribute increases by the result. You may spend a point of Wrath to reroll the 1d3 at any time. The GM may force a reroll of the 1d3 under circumstances that could cause the bionik to malfunction.',
    },
];
