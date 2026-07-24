import {armour, gear, meleez, rangez} from "./utils";
import {SKILLS} from "../../shared/constants";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const voab: Wargear[] = [
    // MELEE WEAPONS
    {
        ...gear('voab', 62, 'Crozius Arcanum', '6R', 'POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 5, 4, -2, 1, 'Brutal')
    },
    {
        ...gear('voab', 62, 'Heavy Thunder Hammer', '6L', '2-HANDED, POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 10, 8, -3, 2, 'Brutal,Unwieldy(3)')
    },
    {
        ...gear('voab', 62, 'Lightning Claws', '8R', 'POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 5, 5, -3, 1, 'Brutal,Rending(2)')
    },
    {
        ...gear('voab', 62, 'Gladius Revelationis', '', '2-HANDED, POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 10, 6, -3, 1, 'Brutal,Rending(2),Unwieldy(2)')
    },
    {
        ...gear('voab', 62, 'Fames Sanguinius', '', '2-HANDED,POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 10, 6, -3, 1, 'Brutal,Rending(2),Unwieldy(2)')
    },
    {
        ...gear('voab', 62, 'Relic Blade', '6V', 'IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 6, 5, -3, 1, 'Brutal,Parry')
    },
    {
        ...gear('voab', 62, 'Force Sword', '6R', 'FORCE, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Force Weapon', 5, 4, -3, 1, 'Force,Parry')
    },
    {
        ...gear('voab', 62, 'Force Axe', '6V', 'FORCE,IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Force Weapon', 5, 5, -2, 1, 'Force')
    },
    {
        ...gear('voab', 62, 'Power Sword', '6R', 'POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 5, 4, -3, 1, 'Parry')
    },
    {
        ...gear('voab', 62, 'Chainsword', '4U', 'CHAIN, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Chain Weapon', 5, 4, 0, 1, 'Brutal,Parry')
    },
    {
        ...gear('voab', 62, 'Power Fist', '8V', 'POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 5, 5, -3, 1, 'Brutal,Unwieldy(2)')
    },
    {
        ...gear('voab', 62, 'Thunder Hammer', '9L', '2-HANDED, POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 8, 6, -3, 2, 'Brutal,Unwieldy(2)')
    },
    {
        ...gear('voab', 62, 'Power Axe', '6R', 'POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 5, 5, -2, 1, 'Rending(1)')
    },
    {
        ...gear('voab', 62, 'Eviscerator', '6R', '2-HANDED, POWER FIELD, IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 6, 6, -4, 2, 'Brutal,Unwieldy(2)')
    },
    {
        ...gear('voab', 62, 'Astartes Combat Knife', '3U', 'IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Astartes Weapon', 3, 2, -1, 1, 'Reliable')
    },
    {
        ...gear('voab', 62, 'Siege Drills', '10L', '2-HANDED,IMPERIUM, ADEPTUS ASTARTES'),
        ...meleez('Power Weapon', 12, 8, -4, 1, 'Brutal,Unwieldy(4)')
    },
    // RANGED WEAPONS
    {
        ...gear('voab', 67, 'Accelerator Autocannon', '8R', 'Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 16, 2, -1, 48, 3, 'Brutal,Heavy(8)')
    },
    {
        ...gear('voab', 67, 'Astartes Grenade Launcher', '6U', 'Explosive,Imperium,Adeptus Astartes'),
        ...rangez('Grenade & Missile Weapon', '*', '*', '*', 30, '-', 'Assault')
    },
    {
        ...gear('voab', 67, 'Auto Bolt Rifle', '8V', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 10, 1, 0, 24, 3, 'Assault,Brutal,Rapid Fire(3)')
    },
    {
        ...gear('voab', 67, 'Centurion Missile Launcher', '6U', 'Explosive,Imperium,Adeptus Astartes'),
        ...rangez('Grenade & Missile Weapon', 14, 3, -2, 36, 2, 'Heavy(6),Blast(Medium)')
    },
    {
        ...gear('voab', 67, 'Executor Bolt Rifle', '6R', 'Bolt,Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 12, 2, -1, 30, 2, 'Brutal,Rapid Fire(2)')
    },
    {
        ...gear('voab', 67, 'Godwyn Pattern Boltgun', '6R', 'Bolt,Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 10, 1, 0, 24, 2, 'Brutal,Rapid Fire(2)')
    },
    {
        ...gear('voab', 67, 'Grapnel Launcher', '4U', 'IMPERIUM, ADEPTUS ASTARTES'),
        ...rangez('Projectile Weapon', 8, 1, -6, 12, 18, 'Assault')
    },
    {
        ...gear('voab', 67, 'Heavy Bolt Rifle', '8V', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 12, 2, -2, 30, 1, 'Brutal,Heavy(4),Rapid Fire(1)')
    },
    {
        ...gear('voab', 67, 'Hellstorm Bolt Rifle', '6R', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 10, 1, 0, 18, 4, 'Assault,Brutal,Rapid Fire(4)')
    },
    {
        ...gear('voab', 67, 'Las Fusil', '5U', 'Las,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Las Weapon', 15, 3, -3, 36, 1, 'Heavy(6)')
    },
    {
        ...gear('voab', 67, 'Bolt Pistol', '4U', 'Bolt,Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 10, 1, 0, 12, 1, 'Brutal,Pistol')
    },
    {
        ...gear('voab', 67, 'Heavy Bolt Pistol', '7V', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 10, 2, -1, 12, 1, 'Brutal,Pistol')
    },
    {
        ...gear('voab', 67, 'Bolt Rifle', '7V', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 10, 2, -1, 30, 2, 'Brutal,Rapid Fire(1)')
    },
    {
        ...gear('voab', 67, 'Storm Bolter', '6R', 'Bolt,Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 10, 1, 0, 24, 4, 'Brutal,Rapid Fire(2)')
    },
    {
        ...gear('voab', 67, 'Heavy Bolter', '6U', 'Bolt,Imperium,Adeptus Astartes'),
        ...rangez('Bolt Weapon', 14, 2, -1, 36, 3, 'Brutal,Heavy(6)')
    },
    {
        ...gear('voab', 67, 'Assault Bolter', '8V', 'Bolt,Imperium,Adeptus Astartes,Primaris'),
        ...rangez('Bolt Weapon', 12, 1, -1, 18, 3, 'Assault,Brutal,Rapid Fire(3)')
    },
    {
        ...gear('voab', 67, 'Grav Cannon', '8V', 'Grav,Imperium,Adeptus Astartes'),
        ...rangez('Grav Weapon', 8, 2, -3, 24, 4, 'Grav,Heavy(8)')
    },
    {
        ...gear('voab', 67, 'Astartes Shotgun', '6R', 'Projectile,Imperium,Adeptus Astartes'),
        ...rangez('Projectile Weapon', 9, 2, 0, 12, 1, 'Assault,Spread')
    },
    {
        ...gear('voab', 67, 'Plasma Gun', '6R', 'Plasma,Imperium,Adeptus Astartes'),
        ...rangez('Plasma Weapon', 14, 1, -3, 24, 2, 'Rapid Fire(1),Supercharge')
    },
    {
        ...gear('voab', 67, 'Astartes Sniper Rifle', '6U', 'Projectile,Imperium,Adeptus Astartes'),
        ...rangez('Projectile Weapon', 10, 1, -1, 36, 1, 'Heavy(4),Sniper(3)')
    },
    {
        ...gear('voab', 67, 'Melta Rifle', '6V', 'Melta,Imperium,Adeptus Astartes'),
        ...rangez('Melta Weapon', 16, 4, -4, 18, 1, 'Assault,Melta')
    },
    // WEAPON UPGRADES
    {
        ...gear('voab',68,'M40 Targeting System', '7V','Imperium,Adeptus Astartes'),
        type: 'Weapon Upgrade',
        upgradeType: 'Scope',
        snippet: ' The M40 unit enhances visual imagery, calculates distance and environmental factors that might interfere with a shot,  and provides an assessment of likely weak spots in a target’s armour.',
        description:
            '<p>Can be fitted to any weapon with the BOLT and ADEPTUS ASTARTES Keywords. </p> <p>Weapon gains Sniper (2), +1 bonus dice to ranged attacks, and reduces Range penalties by -2. </p> <p>Weapon reduces any Salvo and Rapid Fire ratings it has by -1.</p>',
    },
    {
        ...gear('voab',68,'Vortex Bolts', '10U','Imperium,Adeptus Astartes'),
        type: 'Ammo',
        upgradeType: 'Special Bolt Ammo',
        snippet: 'Inflicts Corruption Tests and deals more damage to targets with the PSYKER keyword.',
        description:
            '<p> Blast (1), Targets with the PSYKER Keywords take double damage and treat the attack asAgonising, A DN 9 Corruption Test is required by anyone  caught in the blast. Single round only - no Salvo or Rapid Fire possible.</p>',
    },
    // ARMOUR
    {
        ...gear('voab',69,'Mk IV Imperial Maximus','9U','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',5,'Powered(2)'),
        description:
            '<p>One of the earliest mass-produced power armour systems issued to the Astartes, the Chapter maintains only a handful of these venerable suits. Mark IV armour was historically used for mainly ceremonial purposes, but the desperate circumstances of the Gilead System have seen them return to war once more.</p>' +
            '<p>Effect: AR 5, Powered (2)</p>',
    },
    {
        ...gear('voab',69,'Mk V Heresy Armour','9U','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',5,'Powered(2),Bulk(1)'),
        description:
            '<p>Despite their provenance as grim relics of the darkest time in the history of the Imperium, the Absolvers regard these ancient armours as sacred relics of a distant age. To be shielded in battle by one of these most ancient suits is seen as a great honour and seldom awarded to anyone outside the revered veterans of the First Company.</p>' +
            '<p>Effect: AR 5, Powered (2), Bulk (1)</p>',
    },
    {
        ...gear('voab',70,'Mk VI Corvus Armour','7V','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',5,'Powered(2)'),
        description:
            '<p>Instantly recognisable due to its distinctive helmet, Mk VI Corvus Armour was produced at the height of the Horus Heresy. Within the Absolvers, the Chapter’s suits are often used for training newly-graduated Marines in the use of their Black Carapace.</p>' +
            '<p>Effect: AR 5, Powered (2)</p>',
    },
    {
        ...gear('voab',70,'Mk VII Aquila Armour','8V','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',5,'Powered(3)'),
        description:
            '<p>This armour came about at the end of the Horus Heresy; the most iconic and enduring marque of Astartes armour ever created. Its sophistication and protection easily trumped the MK VI, and it has remained the standard armour of loyal Astartes for the past ten thousand years.</p>' +
            '<p>Effect: AR 5, Powered (3)</p>',
    },
    {
        ...gear('voab',71,'Mk VIII Errant Armour','9U','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',6,'Powered(3)'),
        description:
            '<p>Designed as the next great advance in Astartes armour, Mk VIII armour is an adaption to the Mark VII with a distinct gorget that offers greatly increased neck protection and expanded plating.</p>' +
            '<p>Effect: AR 6, Powered (3)</p>',
    },
    {
        ...gear('voab',71,'Mk X Tacticus Armour','9V','Powered,Imperium,Adeptus Astartes,Primaris'),
        ...armour('Astartes Armour',5,'Powered(4)'),
        description:
            '<p>This is the standard power armour worn by Primaris marines. A complete redesign based on exhaustive analysis of all previous marks of Astartes power armour by Archmagos Belisarius Cawl, it is probably the most advanced armour currently in common production within the Imperium.</p>' +
            '<p>Effect: AR 5, Powered (4)</p>',
    },
    {
        ...gear('voab',72,'Mk X Gravis Armour','12V','Powered,Imperium,Adeptus Astartes,Primaris'),
        ...armour('Astartes Armour',6,'Powered(4)'),
        description:
            '<p>The ultimate expression of the Mk X suit, the Gravis armour variant is only issued to Primaris officers and battle-brothers whose role leads them to expect to take heavy enemy fire. With extra layers of ceramite cladding, Gravis armour provides nearly unmatched protection.</p>' +
            '<p>Effect: AR 6, Powered (4)</p>',
    },
    {
        ...gear('voab',72,'Mk X Omnis Armour','10V','Powered,Imperium,Adeptus Astartes,Primaris'),
        ...armour('Astartes Armour',5,'Grav-Chute,Jump Pack,Powered(3)'),
        description:
            '<p>A lighter version of the Mk X armour, this variant is capable of flight, allowing Primaris Marines to soar above the battlefield or quickly manoeuvre around enemy forces. The armour also incorporates a Grav-Chute.</p>' +
            '<p>Effect: AR 5, Powered (3), Jump Pack, Grav-Chute</p>',
    },
    {
        ...gear('voab',72,'Mk X Phobos Armour','9V','Powered,Imperium,Adeptus Astartes,Primaris'),
        ...armour('Astartes Armour',4,'Powered(3),+1 Movement,+2 Stealth'),
        description:
            '<p>This variant of the Mk X armour is designed for mobility and stealth, and is commonly employed by Reiver and Infiltrator Squads. It is built to operate near-silently and offers increased movement and stealth capabilities.</p>' +
            '<p>Effect: AR 4, Powered (3), +1 Movement, +2 bonus dice to Stealth (A) Tests</p>',
        modifications: [
            { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
            { targetGroup: 'skills', targetValue: SKILLS.STEALTH, modifier: 2 },
        ],
    },
    {
        ...gear('voab',72,'Centurion Warsuit','10U','Powered,Imperium,Adeptus Astartes'),
        ...armour('Astartes Armour',8,'Size: Large,Bulk(1),Powered(5)'),
        description:
            '<p>Gigantic armoured figures, Centurion Warsuits bridge the gap between Dreadnought and powered armour, rendering the wearer virtually invulnerable. The pilot’s Black Carapace is interfaced directly with the control system, allowing them to move as if the warsuit was an extension of their own body.</p>' +
            '<p>Effect: AR 8, Bulky (1), Powered (5), Size: Large</p>',
    },
    // AUGMETICS & OTHER TOOLS
    {
        ...gear('voab', 73, 'Adamantine Cuirass', '8V', 'Powered,Imperium,Adeptus Astartes'),
        type: 'Armour Upgrade',
        snippet: 'Reinforced Aquila chestplate for power armour.',
        description: '<p>+1 AR and Bulky (1) to any armour with both the POWERED and ADEPTUS ASTARTES Keywords. Reduce any Flight Speed by -2.</p>',
    },
    {
        ...gear('voab', 73, 'Astartes Servo-Arm', '7V', 'Augmetics,Imperium,Adeptus Astartes'),
        type: 'Augmetics',
        snippet: 'Powerful Techmarine augmetic limb.',
        description: '<p>You gain +5 Strength when using the Astartes Servo-Arm. Allows you to Brace as a Free Action in combat. Adds +1 bonus die to all Tech (Int) Tests for engineering tasks, and can be used as a melee weapon.</p>',
    },
    {
        ...gear('voab', 74, 'Battle Standard', '8V', 'Imperium,Adeptus Astartes'),
        type: 'Tool',
        snippet: 'Rallying banner for the Chapter.',
        description: '<p>All Astartes within 1km who share a [CHAPTER] Keyword with the banner receive +2 dice to Resolve and Conviction Tests.</p>',
    },
    {
        ...gear('voab', 74, 'Halo Indomitus', '9U', 'Imperium,Adeptus Astartes'),
        type: 'Tool',
        snippet: 'Spiked iron halo with force field generator.',
        description: '<p>Functions as an AR 3 Invulnerable force field and gives +1 to all Leadership (Wil) and Intimidation (Wil) Tests against creatures with the ADEPTUS ASTARTES Keyword.</p>',
    },
    {
        ...gear('voab', 74, 'Molecular Bonding Studs', '7V', 'Augmetics,Imperium,Adeptus Astartes'),
        type: 'Augmetics',
        snippet: 'Shoulder studs for extra protection.',
        description: '<p>Power armour fitted with Molecular Bonding Studs can equip additional armour plates. These grant +2 AR but are destroyed if the wearer is struck by a weapon with AP better than -3 (after the attack is resolved). Plates can be replaced by a Tech-Priest or Techmarine.</p>',
    },
    {
        ...gear('voab', 74, 'Narthecium', '6V', 'Tool,Imperium,Adeptus Astartes,Apothecary'),
        type: 'Tool',
        snippet: 'Advanced medical tool for Astartes.',
        description: '<p>Adds +1 die to all Medicae (Int) Tests and +2 dice to Tests to surgically recover progenoid glands. Refills a Sanguine Flask in one round.</p>',
    },
    {
        ...gear('voab', 75, 'Omni-Scrambler', '7V', 'Tool,Imperium,Adeptus Astartes,Infiltrator'),
        type: 'Tool',
        snippet: 'Disrupts enemy communications.',
        description: '<p>Adds +3 bonus dice to any Tech (Int) or Intimidate (Wil) Tests to disrupt enemy communications within 500 metres.</p>',
    },
    {
        ...gear('voab', 75, 'Sanguine Flask', '5V', 'Tool,Imperium,Adeptus Astartes'),
        type: 'Tool',
        snippet: 'Blessed blood flask for the Red Thirst.',
        description: '<p>Consuming the contents allows an Astartes to recover 1d3 Shock and staves off the Red Thirst for 24 hours.</p>',
    },
    {
        ...gear('voab', 75, 'Teleport Homer', '9U', 'Tool,Imperium,Adeptus Astartes'),
        type: 'Tool',
        snippet: 'Relic teleportation beacon.',
        description: '<p>Provides a stable targeting focus for teleportation chambers, allowing safe teleportation of troops to its location.</p>',
    },
]