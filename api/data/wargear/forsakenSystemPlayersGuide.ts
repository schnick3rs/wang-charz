import {armour, gear, meleez, metaMelee, metaRange, rangez} from "./utils";
import {SKILLS, TRAITS} from "../../shared/constants";
import {Wargear} from "../../shared/schemas/wargear.schema";

export const fspg: Wargear[] = [
    {
        ...gear('fspg',121,'Kroot Rifle','3V','2-Handed,Blade,Kroot,Primitive'),
        type: 'Ranged Weapon',
        subtype: undefined,
        meta: [
            metaRange(8, 1, 0, 24, 2, ['Rapid Fire(1)']),
            metaMelee(4, 4, 0, 1,[]),
        ],
    },
    {
        ...gear('fspg',121,'Blessed Blade','8V','Blade,Imperium,Adeptus Ministorum,Adepta Sororitas'),
        ...meleez('Imperium Melee',5,5,-3,0,'Blessed(3),Parry,Rending(1)'),
    },
    {
        ...gear('fspg',121,'Crozius Arcanum','6V','Exotic,Adeptus Astartes'),
        ...meleez('Imperium Melee',5,4,-2,0,'Brutal'),
        snippet: 'Also counts as Symbol of Authority (core, pg. 240).',
    },
    {
        ...gear('fspg',121,'Dialogus Staff','5R','Adepta Sororitas'),
        ...meleez('Imperium Melee',3,3,0,0,'Reliable'),
        snippet: 'A Dialogus Staff functions as a weapon, a Symbol of Authority (core, pg. 240),and a Laud-Hailer (fspg, pg. 126).'
    },
    {
        ...gear('fspg',121,'Power Maul','6V','Power Field,Imperium,Adeptus Astartes,Adeptus Ministorum'),
        ...meleez('Imperium Melee',5,4,0,0,'Brutal'),
    },
    {
        ...gear('fspg',121,'Teaser Goad','4R','Adeptus Mechanicus'),
        ...meleez('Adeptus Mechanicus Melee',5,5,0,0,'Agonising'),
    },
    {
        ...gear('fspg',121,'Transonic Blade','6V','Blade,Transonic,Adeptus Mechanicus'),
        ...meleez('Adeptus Mechanicus Melee',5,5,0,0,'Parry,Rending(5)'),
    },
    {
        ...gear('fspg',121,'Transonic Razor','5V','Blade,Transonic,Adeptus Mechanicus'),
        ...meleez('Adeptus Mechanicus Melee',3,4,0,0,'Rending(4)'),
    },
    {
        ...gear('fspg',121,'Bullgryn Maul','3U','Imperium,Astra Militarum,Militarum Auxilla'),
        ...meleez('Ogryn Melee',4,4,-1,0,'Brutal'),
    },
    {
        ...gear('fspg',121,'Ripper Gun Bayonet','3U','Blade,Imperium,Astra Militarum,Militarum Auxilla'),
        ...meleez('Ogryn Melee',3,3,-1,0,'Reliable'),
    },
    // Ranged Weapons
    {
        ...gear('fspg',123,'Bolt Carbine','6V','Bolt,Imperium,Adeptus Astartes,Astartes Primaris'),
        ...rangez(undefined,12,1,0,24,2, 'Assault,Brutal,Rapid Fire(2)'),
    },
    {
        ...gear('fspg',123,'Condemnor Boltgun','6L','Bolt,Imperium,Adepta Sororitas'),
        ...rangez(undefined,10,1,0,24,2, 'Blessed(3),Brutal,Rapid Fire(2)'),
    },
    {
        ...gear('fspg',123,'Eradication Ray','8V','Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',13,1,-2,24,1, 'Heavy(5),Rending(3)'),
    },
    {
        ...gear('fspg',123,'Flechette Blaster','4U','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',8,2,0,12,2, 'Pistol,Rapid Fire(4)'),
    },
    {
        ...gear('fspg',123,'Macrostubber','6V','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',9,2,0,12,3, 'Pistol,Rapid Fire(3)'),
    },
    {
        ...gear('fspg',123,'Phosphor Serpenta','7V','Phosphex,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',12,2,-1,18,1, 'Assault,Melta'),
    },
    {
        ...gear('fspg',123,'Stubcarbine','6R','Projectile,Adeptus Mechanicus'),
        ...rangez('Adeptus Mechanicus Weapon',10,1,0,18,1, 'Pistol'),
    },
    {
        ...gear('fspg',123,'Grenadier Gauntlet','6V','Explosive,Astra Militarum,Militarum Auxilla'),
        ...rangez('Militarum Auxilla',11,3,0,12,1, 'Assault,Blast(2),Heavy(5)'),
    },
    {
        ...gear('fspg',123,'Ratling Rifle','6U','Projectile,Imperium,Astra Militarum,Militarum Auxilla'),
        ...rangez('Militarum Auxilla',9,1,0,36,0, 'Sniper(3),Reliable'),
    },
    {
        ...gear('fspg',123,'Ripper Gun','5V','Projectile,Imperium,Astra Militarum,Militarum Auxilla'),
        ...rangez('Militarum Auxilla',11,2,0,12,2, 'Assault,Brutal,Heavy(5)'),
    },
    {
        ...gear('fspg',124,'Frag Bomb','5U','Explosive,Imperium'),
        ...rangez('Grenades & Grenade Launcher',12,4,0,'STRx4','-', 'Blast(8)'),
    },
    {
        ...gear('fspg',124,'Melta Bomb','5V','Explosive,Imperium'),
        ...rangez('Grenades & Grenade Launcher',16,4,-4,'STRx4','-', 'Blast(4)'),
    },
    {
        ...gear('fspg',124,'Mindscrambler Grenade','5R','Explosive,Adeptus Mechanicus'),
        ...rangez('Grenades & Grenade Launcher',10,4,0,'STRx4','-', 'Agonising,Arc(4),Blast(6)'),
    },
    {
        ...gear('fspg',124,'Shock Grenade','2U','Explosive,Imperium'),
        ...rangez('Grenades & Grenade Launcher',3,4,0,'STRx4','-', 'Blast(6),Inflict(Blinded 1),Inflict(Vulnerable 1)'),
        snippet: 'Deals shock damage instead of wounds. Those that suffer shock are affected by Blinded and Vulnerable.'
        // does SHOCK damage
    },
    //
    {
        ...gear('fspg',125,'Kroot Armour','1U','Light,Primitive,Kroot'),
        ...armour('Primitive Armour',2,''),
    },
    {
        ...gear('fspg',125,'Mk X Phobos Power Armour','9V','Powered,Imperium,Adeptus Astartes,Primaris'),
        ...armour('Astartes Armour',4,'Powered(3)'),
    },
    {
        ...gear('fspg',125,'Sicarian Battle Armour','6R','Imperium,Adeptus Mechanicus,Skitarii'),
        ...armour('Astartes Armour',4,'Power Field'),
    },
    {
        ...gear('fspg',125,'Bullgryn Plate','5U','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
        ...armour('Militarum Auxilla',4,'Ogryn'),
        snippet: 'Ogryn Armour can`t be worn by Average-sized characteres.',
    },
    {
        ...gear('fspg',125,'Brute Shield','5R','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
        ...armour('Militarum Auxilla',3,'Shield,Ogryn'),
        snippet: 'Average-sized characters treat Ogryn shields as having the Bulk(2) trait.',
    },
    {
        ...gear('fspg',125,'Slabshield','5U','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
        ...armour('Militarum Auxilla',4,'Cumbersome,Shield,Ogryn'),
        snippet: 'Average-sized characters treat Ogryn shields as having the Bulk(2) trait.',
    },
    // Equipment
    {
        ...gear('fspg',125,'Brazier of Holy Fire','5L','Imperium,Adeptus Ministorum,Adepta Sororitas'),
        type: 'Tools & Equipment',
        snippet: 'Sheds light in 6m. If the carrier has Faith, DAEMONs touched by the light are Hindered. As a reflexive Action, spend Faith to attack with a +3ED (+6ED against DAEMONs) Hand Flamer (Core, pg. 219).',
    },
    {
        ...gear('fspg',126,'Diagnostor Helmet','5V','Imperium,Adeptus Astartes'),
        type: 'Tools & Equipment',
        snippet: 'Add +1 dice (+2 when targeting Astartes) to Medicae, when detecting/diagnosing diseases, injuries, ailments and cause of death.',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0, condition: 'when detecting/diagnosing diseases, injuries, ailments, cause of death.'},
            { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0, condition: 'when detecting/diagnosing diseases, injuries, ailments, cause of death targeting Astartes Species.'},
        ],
    },
    {
        ...gear('fspg',126,'Excrutiator','3R','Adeptus Ministorum,Inquisition'),
        type: 'Tools & Equipment',
        snippet: 'Oh boy, check the rules please',
    },
    {
        ...gear('fspg',126,'Laud-Hailer','3C','[ANY]'),
        type: 'Tools & Equipment',
        snippet: 'Doubles the range of talents and abilities that uses you voice.',
    },
    {
        ...gear('fspg',126,'Grapnel Launcher','4U','Imperium,Adeptus Astartes, Primaris'),
        type: 'Tools & Equipment',
        snippet: 'As Combat Action, fire at surface (Dn 3), range 30m, pull yourself up (Free Action).',
    },
    {
        ...gear('fspg',126,'Infravision','4U','Imperium,Adeptus Mechanicus'),
        type: 'Tools & Equipment',
        snippet: 'Count as Preysense Googles (Core, pg. 239) and allows to detect radiation in immediate area.',
    },
    {
        ...gear('fspg',127,'Narthecium','5R','Imperium,Adeptus Astartes'),
        type: 'Tools & Equipment',
        snippet: 'May make Medicae test for surgery and healing without DN penalty due to situation. When use as part of a Multi-Action, DN penalty is reduced by 2. Most Narthecium contains a Reductor to recover a dead Astartes geen seed with a Simple Action.',
    },
    {
        ...gear('fspg',127,'Null Rod','5R','Imperium,Adeptus Astartes'),
        type: 'Tools & Equipment',
        snippet: 'While wielding, any Psychic Mastery test within 18m suffer +3 DN.',
    },
    {
        ...gear('fspg',127,'Purity Seal','2R','Imperium'),
        type: 'Tools & Equipment',
        snippet: '+1 die to Corruption tests per seal while without corruption points.',
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 1, rank: 0, condition: 'to corruption test while without corruption points.'},
        ],
    },
    {
        ...gear('fspg',127,'Psychic Hood','5V','Imperium,Adeptus Astartes'),
        type: 'Tools & Equipment',
        snippet: '+1 die to Psychic Mastery Test. Your Deny the Witch DN is equal 1+ DN of the power.',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.PSYCHIC_MASTERY, modifier: 1, rank: 0},
        ],
    },
    {
        ...gear('fspg',127,'Simulacrum Imperialis','5L','Imperium,Adeptus Ministorum,Adepta Sororitas'),
        type: 'Tools & Equipment',
        snippet: 'While wielding, you and all faithfull allies within 15m gain +2 dice to corruption tests. ',
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 2, rank: 0, condition: 'to corruption tests, while faithfull and within 15m.'},
        ],
    },
    {
        ...gear('fspg',127,'Skull Helmet','4V','Imperium,Adeptus Astartes'),
        type: 'Tools & Equipment',
        snippet: 'While wearing, +1 die to Leadership tests against ADEPTUS ASTARTES.',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 1, rank: 0, condition: 'when targeting ADEPTUS ASTARTES.'},
        ],
    },
    // Augmetics
    {
        ...gear('fspg',128,'Abeyant','8L','Adeptus Mechanicus'),
        type: 'Augmetics',
        snippet: 'Hover up to 3m and move at your speed. You take no falling damage.',
        description:
            '<p><strong>Requirements:</strong> Four other augmetics</p>' +
            '<p>Allows you to hover up to 3 meters off the ground and move at your speed. You take no falling damage.</p>',
    },
    {
        ...gear('fspg',128,'B.O.N.E','4C','Imperium,Militarum Auxilla'),
        type: 'Augmetics', subtype: 'Auxilla Implants',
        snippet: 'Increase Max Intellect to 3 and increase Intellect by 1.',
        description:
            '<p><strong>Requirements:</strong> Ogryn Species, Leadership 1, Rank 3</p>' +
            '<p>Raise your Maximum Intellect to 3 and increase your Intellect by 1</p>',
        modifications: [
            { targetGroup: 'maxAttributes', targetValue: 'intellect', modifier: 3 },
            { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 },
        ],
    },
    {
        ...gear('fspg',128,'Chordclaw','5V','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics',
        snippet: 'Your hand becomes a weapon.',
        meta: [
            metaMelee(3,3,0,0,['Agonising','Rending(6)']),
        ],
    },
    {
        ...gear('fspg',128,'Enhanced Ballistic Mechadendrit','5V','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics',
        snippet: 'Reduce Multi-Attack/-Action DN penalty by 2. Using a Salvo option deals [Salvo] Shock. Never needs to be reloaded.',
        description:
            '<p><strong>Requirements:</strong> The Weapon you want to integrate into the Mechadendrite.</p>' +
            '<p>Reduce the DN penalty by 2 when attacking with this weapon as part of a Multi-Action or Multi-Attack. The weapon does not need to reload. Using Salvo options deal [Salvo] Shock.</p>',
    },
    {
        ...gear('fspg',128,'Infiltrator Headpiece','3U','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics',
        snippet: '+Rank to Passive Awareness.',
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.PASSIVE_AWARENESS, modifier: 0, rank: 1 },
        ],
    },
    {
        ...gear('fspg',129,'Princeps Limb Rig','3V','Imperium,Adeptus Mechanicus'),
        type: 'Augmetics',
        snippet: 'Additional limb that can operate equipment (pass a Tech test) or wield a melee weapon. Reduce Multi-Action/-Attack DN penalty by 1 when you use your additional limp.',
    },
];