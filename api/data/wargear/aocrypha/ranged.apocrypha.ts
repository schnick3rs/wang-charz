import {gear, metaMelee, metaRange, rangez} from "../utils";
import {Wargear} from "../../../shared/schemas/wargear.schema";

const aaoaRanged: Wargear[] = [
    // Bolt Weapons
    ...[
        {
            ...gear('aaoa',186,'Absolvor Bolt Pistol','8V','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',12,2,-1,16,1,'Brutal,Pistol'),
        },
        {
            ...gear('aaoa',186,'Auto Bolt Rifle','7V','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,1,0,24,3,'Assault,Brutal,Rapid Fire (3)'),
            description:
                '<p><em>An Auto Bolt Rifle is fitted with an Ammunition Drum as standard.</em></p>',
        },
        {
            ...gear('aaoa',186,'Auto-Boltstorm Gauntlet','8V','Bolt, Power Field, Adeptus Astartes, Primaris'),
            type: 'Ranged Weapon',
            subtype: 'Bolt Weapon',
            meta: [
                metaRange(10, 1, 0, 18, 3, ['Assault','Brutal','Paired','Rapid Fire (3)']),
                metaMelee(5, 5, -3, 1,['Brutal', 'Unwieldy(2)', 'Paired']),
            ],
        },
        {
            ...gear('aaoa',186,'Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,1,0,24,2,'Assault, Brutal, Reliable, Rapid Fire (1)'),
        },
        {
            ...gear('aaoa',186,'Bolt Sniper Rifle','8V','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',12,1,0,36,1,'Brutal, Heavy (6), Sniper (2), Special'),
            description:
                '<p><strong>Special: </strong>When firing a Bolt Sniper Rifle, choose a single ammo type: Executioner (AP -1, +2d to the attack roll and ignore cover), Hyperfrag (add the Blast [Small] trait), or Mortis (+1ED, AP -2, add Inflict [Poisoned 5] trait)</p>' +
                '<p><em>A Bolt Sniper Rifle includes a Monoscope, Preysense Sight and Silencer as standard.</em></p>',
        },
        {
            ...gear('aaoa',186,'Boltstorm Gauntlet','8V','Bolt, Power Field, Adeptus Astartes, Primaris'),
            type: 'Ranged Weapon',
            subtype: 'Bolt Weapon',
            meta: [
                metaRange(10, 1, 0, 18, 3, ['Brutal','Pistol']),
                metaMelee(5, 5, -3, 1,['Brutal', 'Unwieldy(2)']),
            ],
        },
        {
            ...gear('aaoa',142,'Instigator Bolt Carbine','7R','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,2,-1,24,1,'Assault, Brutal, Silent, Sniper (1)'),
        },
        {
            ...gear('aaoa',186,'Marksman Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,1,0,24,1,'Brutal, Rapid Fire (1), Sniper (1)'),
            description:
                '<p><em>Marksman Bolt Carbines are fitted with a Monoscope as standard.</em></p>',
        },
        {
            ...gear('aaoa',186,'Occulus Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,1,0,24,1,'Brutal, Rapid Fire (1), Special'),
            description:
                '<p><strong>Special: </strong>If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.</p>' +
                '<p><em>Occulus Bolt Carbines are fitted with a Preysense Sight as standard.</em></p>',
        },
        {
            ...gear('aaoa',186,'Stalker Bolt Rifle','7V','Bolt, Adeptus Astartes, Primaris'),
            ...rangez('Bolt Weapon',10,2,-2,36,1,'Brutal, Heavy (4), Rapid Fire (1), Sniper (1)'),
            description:
                '<p><em>A Stalker Bolt Rifle comes with a Monoscope as standard.</em></p>',
        },
        {
            ...gear('aaoa',186,'Stalker-Pattern Boltgun','7V','Bolt, Adeptus Astartes, Deathwatch'),
            ...rangez('Bolt Weapon',10,1,-1,30,2,'Brutal, Heavy (4), Rapid Fire (1), Sniper (1)'),
            description:
                '<p><em>A Stalker-pattern Boltgun comes with a Monoscope as standard.</em></p>',
        },
    ],
    // Grav < Ranged
    ...[
        {
            ...gear('aaoa',143,'Grav-pistol','6V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
            ...rangez('Grav Weapon',8,1,-3,12,1,'Grav, Pistol'),
        },
        {
            ...gear('aaoa',143,'Grav-gun','6V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
            ...rangez('Grav Weapon',8,1,-3,18,1,'Grav, Rapid Fire (1)'),
        },
        {
            ...gear('aaoa',143,'Grav-cannon','7V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
            ...rangez('Grav Weapon',8,2,-3,24,4,'Grav, Heavy (8)'),
        },
    ],
    // Plasma < Ranged
    ...[
        {
            ...gear('aaoa',144,'Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
            ...rangez('Plasma Weapon',15,1,-4,30,2,'Rapid Fire (1), Supercharge'),
        },
        {
            ...gear('aaoa',144,'Assault Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
            ...rangez('Plasma Weapon',13,1,-4,24,2,'Assault, Supercharge'),
        },
        {
            ...gear('aaoa',144,'Heavy Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
            ...rangez('Plasma Weapon',16,2,-4,36,1,'Heavy (4), Supercharge'),
            description:
                '<p><em>A Heavy Plasma Incinerator comes with a backpack ammunition supply.</em></p>',
        },
        {
            ...gear('aaoa',144,'Plasma Exterminator','8V','Plasma, Adeptus Astartes, Primaris'),
            ...rangez('Plasma Weapon',15,2,-3,18,1,'Blast (Small), Heavy (4), Supercharge'),
        },
        {
            ...gear('aaoa',144,'Plasma Caliver','8V','Plasma, Adeptus Mechanicus, Skitarii'),
            ...rangez('Plasma Weapon',15,1,-3,18,3,'Assault, Supercharge'),
        },
    ],
    // Flame Weapons
    ...[
        {
            ...gear('aaoa',145,'Flamestorm Gauntlet','8V','Flame, Power Field, Adeptus Astartes, Primaris'),
            ...rangez('Flame Weapon',10,1,0,8,1,'Assault, Blast (Medium), Inflict (On Fire), Paired, Spread'),
            description:
                '<p>May be used as Power Fist (Core pg. 212).</p>',
        },
        {
            ...gear('aaoa',145,'Incinerator','8V','Flame, Power Field, Adeptus Astartes, Grey Knights'),
            ...rangez('Flame Weapon',13,2,-1,8,2,'Blast (Large), Inflict (On Fire), Heavy (6), Spread'),
        },
    ],
    // Exotic < Ranged
    ...[
        {
            ...gear('aaoa',145,'Animus Speculum', '10L', 'Exotic, Officio Assasinorum, Tempus Culexus'),
            ...rangez('Exotic Weapon', 12, 1, -4, 18, 3, 'Agonizing, Assault, Special'),
            description:
                '<p><strong>Special: </strong>The animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.</p>',
        },
        {
            ...gear('aaoa',145,'Archeo-Revolver', '7R', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 12, 2, -2, 12, 1, 'Pistol, Stalwart'),
        },
        {
            ...gear('aaoa',145,'Deathwatch Frag Cannon', '8V', 'Explosive, Projectile, Deathwatch'),
            type: 'Ranged Weapon',
            subtype: 'Exotic Weapon',
            meta: [
                metaRange(14, 2, -1, 8, 2, ['Assault', 'Blast (Large)', 'Heavy (6)', 'Spread', 'Special'], 'Shrapnel'),
                metaRange(16, 2, -2, 24, 2, ['Assault', 'Heavy (6)', 'Special'], 'Shell'),
            ],
            description:
                '<p><strong>Special: </strong>When firing a Deathwatch frag cannon, select either shrapnel or solid shell mode. When the solid shell mode is used, add +2ED to the damage, and increase the AP to -3 when the target is within short range.</p>',
        },
        {
            ...gear('aaoa',193,'Executioner Pistol', '9L', 'Bolt, Needle, Officio Assasinorum, Tempus Eversor'),
            type: 'Ranged Weapon',
            subtype: 'Exotic Weapon',
            meta: [
                metaRange(10, 2, 0, 12, 1, ['Brutal', 'Pistol', 'Silent', 'Special'], 'Bolt'),
                metaRange(8, 3, 0, 12, 1, ['Agonizing', 'Inflict (Poisoned 4)', 'Pistol', 'Silent', 'Special'], 'Needler'),
            ],
            description:
                '<p><em>This functions as a combi-weapon (CORE, pg. 227) composed of a customised master-crafted bolt pistol and a customised needle pistol, fitted with a gene-grip bio-veritor.</em></p>',
        },
        {
            ...gear('aaoa',148,'Exitus Longrifle', '9L', 'Projectile, Officio Assasinorum, Tempus Vindicare'),
            ...rangez('Exotic Weapon', 12, 2, -3, 72, 1, 'Sniper (3), Steadfast'),
        },
        {
            ...gear('aaoa',146,'Exitus Pistol', '9L', 'Projectile, Officio Assasinorum, Tempus Vindicare'),
            ...rangez('Exotic Weapon', 10, 1, -3, 12, 1, 'Pistol, Steadfast'),
        },
        {
            ...gear('aaoa',146,'Flechette Blaster', '5R', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 7, 2, 0, 12, 5, 'Pistol, Spread'),
        },
        {
            ...gear('aaoa',146,'Flechette Carbine', '5R', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 7, 3, 0, 24, 5, 'Assault, Spread'),
        },
        {
            ...gear('aaoa',146,'Macrostubber', '5R', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 10, 1, 0, 12, 5, 'Pistol'),
        },
        {
            ...gear('aaoa',146,'Neural Shredder', '9L', 'Exotic, Officio Assasinorum, Templum Callidus'),
            ...rangez('Exotic Weapon', 4, 4, 0, 9, 0, 'Assault, Blast (Medium), Special'),
            description:
                '<p><strong>Special: </strong>A Neural Shredder uses no ammo and never needs to reload. It just works. Nobody knows entirely how. The damage of a Neuro Disruptor is compared to the target’s Resolve, rather than Resilience, and each point of damage inflicted is a Mortal Wound instead of a normal wound. It has no effect against mindless creatures or inanimate objects.</p>',
        },
        {
            ...gear('aaoa',146,'Phosphor Blast Pistol', '6R', 'Phosphex, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 12, 1, -1, 12, 1, 'Inflict (On Fire), Luminagen, Pistol'),
        },
        {
            ...gear('aaoa',146,'Phosphor Carbine', '6R', 'Phosphex, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 12, 1, -1, 24, 4, 'Assault, Inflict (On Fire), Luminagen'),
        },
        {
            ...gear('aaoa',146,'Phosphor Pistol', '5R', 'Phosphex, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 10, 1, -1, 12, 1, 'Luminagen, Pistol'),
        },
        {
            ...gear('aaoa',146,'Phosphor Serpenta', '7V', 'Phosphex, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 12, 1, -1, 18, 1, 'Assault, Inflict (On Fire), Luminagen'),
        },
        {
            ...gear('aaoa',146,'Phosphor Torch', '6R', 'Fire, Phosphex, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 10, 1, -1, 12, 1, 'Assault, Blast (Medium), Inflict (On Fire), Spread'),
        },
        {
            ...gear('aaoa',146,'Psilencer', '7V', 'Force, Grey Knights'),
            ...rangez('Exotic Weapon', 10, 2, 0, 24, 6, 'Force, Heavy (6), Special'),
            description:
                '<p><strong>Special: </strong>A Psilencer will not function in the hands of any character who does not have the PSYKER keyword.</p>',
        },
        {
            ...gear('aaoa',146,'Psycannon', '7V', 'Bolt, Force, Grey Knights, Ordo Malleus'),
            ...rangez('Exotic Weapon', 13, 2, -1, 36, 4, 'Brutal, Force, Heavy (6)'),
        },
        {
            ...gear('aaoa',146,'Stubcarbine', '5R', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 10, 1, 0, 18, 3, 'Pistol'),
        },
        {
            ...gear('aaoa',146,'Transuranic Arquebus', '8V', 'Projectile, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 16, 2, -2, 60, 0, 'Heavy (6), Mortal (1), Sniper (3), Special'),
            description:
                '<p><strong>Special: </strong>A Transuranic Arquebus cannot be fired if the wielder has moved in the same turn.</p>',
        },
        {
            ...gear('aaoa',146,'Volkite Serpenta', '10L', 'Volite, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 13, 1, 0, 10, 1, 'Inflict (On Fire), Pistol'),
        },
        {
            ...gear('aaoa',146,'Volkite Charger', '10L', 'Volite, Adeptus Mechanicus'),
            ...rangez('Exotic Weapon', 13, 1, 0, 15, 2, 'Assault, Inflict (On Fire)'),
        },
    ],
    // Grenades & Launchers < Ranged
    ...[
        {
            ...gear('aaoa', 149, 'Fragstorm Grenade Launcher', '6V', 'Explosive, Adeptus Astartes, Primaris'),
            ...rangez('Grenades & Grenade Launcher', 10, 4, 0, 18, 0, 'Assault, Blast (Medium)'),
            triptype: 'Grenade Launcher',
        },
        {
            ...gear('aaoa', 149, 'Melta Bomb', '6R', 'Melta, Imperium, Aeldari'),
            ...rangez('Grenades & Grenade Launcher', 16, 6, -4, 'STRx4', '-', 'Blast (Small), Melta, Unwieldy (2)'),
            triptype: 'Grenade',
            description:
                '<p><strong>Special: </strong>Any target within a Melta Bomb’s blast is considered to be within close range for the purposes of the Melta trait. Melta Bombs cannot be used in a grenade launcher. In addition, they may be placed onto a vehicle or structure within 1m rather than thrown, requiring a Tech test with a DN equal to the vehicle’s Defence. Placed melta bombs do not detonate immediately and can be detonated as a simple action on any of the character’s subsequent turns.</p>',
        },
        {
            ...gear('aaoa', 149, 'Psyk-Out Grenade', '8L', 'Exotic, Silent Sisterhood, Grey Knights, Templum Culexus'),
            ...rangez('Grenades & Grenade Launcher', 7, 4, 0, 'STRx4', '-', 'Blast (Medium)'),
            triptype: 'Grenade',
            description:
                '<p><strong>Special: </strong>Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.</p>',
        },
        {
            ...gear('aaoa', 149, 'Shock Grenade', '7V', 'Exotic, Adeptus Astartes, Primaris'),
            ...rangez('Grenades & Grenade Launcher', '-', '-', '-', 'STRx4', '-', 'Blast (Medium)'),
            triptype: 'Grenade',
            description:
                '<p><strong>Special: </strong>Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable—you can’t mix and match.</p>',
        },
        {
            ...gear('aaoa', 149, 'Smoke Grenade', '4C', 'Explosive, [Any]'),
            ...rangez('Grenades & Grenade Launcher', '-', '-', '-', 'STRx4', '-', 'Blast (Large)'),
            triptype: 'Grenade',
            description:
                '<p><strong>Special: </strong>Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round. Strong winds may make the smoke dissipate more quickly, at GM’s discretion.</p>',
        },
        {
            ...gear('aaoa', 168, 'Psyk-Out Grenades', '8L', 'Exotic, Silent Sisterhood, Grey Knights, Templum Culexus'),
            ...rangez('Grenades & Grenade Launcher', 7, 4, '-', 'STRx4', '-', 'Blast (6)'),
            triptype: 'Grenade',
            description:
                '<p><strong>Special: </strong>Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.</p>',
        },
    ],
    // Chaos Ranged
    ...[
        {
            ...gear('aaoa', 150, 'Blastmaster', '7V', 'Sonic, Chaos, Slaanesh'),
            type: 'Ranged Weapon', subtype: 'Chaos Weapon',
            meta: [
                metaRange(16, 2, -2, 48, 1, ['Blast (Medium)', 'Cacophony', 'Heavy (6)'], 'Single Frequenzy'),
                metaRange(10, 1, -1, 36, 1, ['Blast (Large)', 'Cacophony', 'Heavy (6)'], 'Varied Frequenzy'),
            ],
            description:
                '<p><strong>Special: </strong>When firing a Blastmaster, choose which profile you wish to use before resolving the attack.</p>',
        },
        {
            ...gear('aaoa', 150, 'Blight Grenade', '4U', 'Explosive, Chaos, Nurgle'),
            ...rangez('Chaos Weapon',10,4,0,'STRx4','-','Blast (Medium), Inflict (Poisoned 4)'),
            description:
                '<p><strong>Special: </strong>A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa', 150, 'Blight Launcher', '7V', 'Explosive, Chaos, Nurgle'),
            ...rangez('Chaos Weapon',13,4,-2,24,2,'Assault, Blast (Medium), Inflict (Poisoned 4)'),
            description:
                '<p><strong>Special: </strong>A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa', 150, 'Doom Siren', '6R', 'Sonic, Chaos, Slaanesh'),
            ...rangez('Chaos Weapon',12,1,-2,8,1,'Assault, Blast (Medium), Cacophony'),
        },
        {
            ...gear('aaoa', 150, 'Heavy Warpflamer', '6R', 'Fire, Chaos, Tzeench'),
            ...rangez('Chaos Weapon',12,2,-2,8,2,'Corrupting, Flamer, Heavy (6)'),
        },
        {
            ...gear('aaoa', 150, 'Plague Belcher', '6R', 'Pestilent, Chaos, Nurgle'),
            ...rangez('Chaos Weapon',10,1,0,8,1,'Assault, Flamer, Inflict (Poisoned 4), Spread'),
            description:
                '<p><strong>Special: </strong>PESTILENT weapons with the Flamer trait do not inflict the On Fire condition. Rather, they inflict the Poisoned 4 condition. A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa', 150, 'Plague Spewer', '6R', 'Pestilent, Chaos, Nurgle'),
            ...rangez('Chaos Weapon',12,2,-1,8,2,'Flamer, Heavy (6), Inflict (Poisoned 4)'),
            description:
                '<p><strong>Special: </strong>PESTILENT weapons with the Flamer trait do not inflict the On Fire condition. Rather, they inflict the Poisoned 4 condition. A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
        },
        {
            ...gear('aaoa', 150, 'Sonic Blaster', '6R', 'Sonic, Chaos, Slaanesh'),
            ...rangez('Chaos Weapon',10,1,0,24,3,'Assault, Cacophony'),
        },
        {
            ...gear('aaoa', 150, 'Warpflame Pistol', '6R', 'Fire, Chaos, Tzeench'),
            ...rangez('Chaos Weapon',7,1,-2,6,1,'Corrupting, Flamer, Pistol'),
        },
        {
            ...gear('aaoa', 150, 'Warpflamer', '6R', 'Fire, Chaos, Tzeench'),
            ...rangez('Chaos Weapon',10,1,-2,8,1,'Assault, Corrupting, Flamer'),
        },
    ],
    // Aeldari < Ranged
    ...[{
        ...gear('aaoa',152,'Avenger Shuriken Catapult', '7R','Shuriken, Aeldari, Asuryani'),
        ...rangez('Aeldari Ranged Weapon', 10, 1, 0, 18, 3, 'Assault, Rending (3)'),
    },
        {
            ...gear('aaoa',152,'Bright Lance', '7R','Las, Aeldari, Asuryani'),
            ...rangez('Aeldari Ranged Weapon', 16, 3, -4, 36, 0, 'Heavy (4), Sniper (1)'),
        },
        {
            ...gear('aaoa',152,'Deathspinner', '7V','Monofilament, Aeldari, Asuryani'),
            ...rangez('Aeldari Ranged Weapon', 14, 2, 0, 12, 3, 'Assault, Brutal, Inflict (Restrained), Rending (4)'),
        },
        {
            ...gear('aaoa',152,'Dragon´s Breath Flamer', '7L','Fire, Ancient, Aeldari, Asuryani'),
            ...rangez('Aeldari Ranged Weapon', 12, 3, -1, 20, 3, 'Assault, Blast (Large), Inflict (On Fire), Spread'),
        },
        {
            ...gear('aaoa',152,'Firepike', '7L','Melta, Ancient, Aeldari, Asuryani'),
            ...rangez('Aeldari Ranged Weapon', 16, 4, -4, 18, 1, 'Assault, Blast (Small), Inflict (On Fire), Melta'),
        },
        {
            ...gear('aaoa',152,'Fusion Pistol', '7R','Melta, Aeldari'),
            ...rangez('Aeldari Ranged Weapon', 16, 1, -4, 6, 1, 'Melta, Pistol'),
        },
        {
            ...gear('aaoa',152,'Laser Lance', '7R','Las, Aeldari, Asuryani, Exodite'),
            ...rangez('Aeldari Ranged Weapon', 14, 2, -4, 6, 0, 'Assault, Melee'),
            description:
                '<p><strong>Melee:</strong> A Laser Lance can be used as a melee weapon, using the following profile:</p>' +
                '<p>Range: 2m, Damage: 3 +3ED, AP: -4, Special</p>' +
                '<p><strong>Special:</strong> When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>',
        },
        {
            ...gear('aaoa',153,'Neuro Disruptor', '8V','Exotic, Harlequins'),
            ...rangez('Aeldari Ranged Weapon', 4,4,0, 18, 0, 'Pistol, Special'),
            description:
                '<p><strong>Special:</strong> A Neuro Disruptor uses no ammunition and cannot run out of ammunition. It just works. Nobody knows entirely how. The damage of a Neuro Disruptor is compared to the target’s Resolve, rather than Resilience, and each point of damage inflicted is a Mortal Wound instead of a normal wound. It has no effect against mindless creatures or inanimate objects.</p>',
        },
        {
            ...gear('aaoa',153,'Hallucinogen Grenade', '7R','Gas, Aeldari, Harlequins'),
            ...rangez('Aeldari Ranged Weapon', '*','*','*', 'STRx4', '-', 'Blast (Large), Special'),
            description:
                '<p><strong>Special:</strong> Any creature caught in the blast of a Hallucinogen Grenade must pass a Terror test (TN 5). Further, if a creature suffers a complication on this test, then they also suffer 1d3 mortal wounds.</p>',
        },
        {
            ...gear('aaoa',153,'Pack Grenade Launcher', '7R','Explosive, Harlequins'),
            ...rangez('Aeldari Ranged Weapon','*','*','*',18,'-','Assault, Special'),
            description:
                '<p><strong>Special:</strong> A Pack Grenade Launcher can carry up to 6 grenades, and additional grenades cannot be loaded during battle.</p>',
        },
        {
            ...gear('aaoa',153,'Shuriken Cannon', '6R','Shuriken, Aeldari'),
            ...rangez('Aeldari Ranged Weapon',14,2,0,24,4,'Assault, Heavy (3), Rending (3)'),
        },
    ],
    // Drukhari < Ranged
    ...[
        {
            ...gear('aaoa',156,'Splinter Pistol','5U','Splinter,Drukhari'),
            ...rangez('Drukhari Ranged Weapon',8,2,0,12,2,'Inflict(Poisoned 4),Pistol'),
            snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
        },
        {
            ...gear('aaoa',156,'Splinter Rifle','5U','Splinter,Drukhari'),
            ...rangez('Drukhari Ranged Weapon',8,2,0,24,2,'Inflict(Poisoned 4),Rapid Fire(2)'),
            snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
        },
    ],
    // Ork < Ranged
    ...[
        {
            ...gear('aaoa',158,'Kustom Mega Blasta','7R','Kustom, Plasma, Ork'),
            ...rangez('Ork Weapon',16,5,-3,24,1,'Assault,Supercharge,Waaagh!'),
            snippet: 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it. The additional ED it provides are already included in the weapon’s profile.',
        },
        {
            ...gear('aaoa',158,'Tankbusta Bomb', '5R', 'Explosive, Ork'),
            ...rangez('Ork Range Weapon', 16, 3, -3, 1, '-', 'Brutal, Blast(Small), Waaagh!'),
            snippet: 'A Tankbusta Bomb cannot be thrown or fired from a launcher. It must be planted with a Tech test against a vehicle within 1m, with a DN equal to the vehicle’s Defence. The bomb will detonate at the end of the current turn. After placing a Tankbusta Bomb, the character may move 1d3+1 metres away from the bomb and fall Prone as they leap away before the bomb detonates.',
        },
    ],
];
export default aaoaRanged

