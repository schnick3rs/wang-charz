import {armour, gear, meleez, metaMelee, rangez, toolz} from "./utils";
import {Wargear} from "../../shared/schemas/wargear.schema";
import { SKILLS, TRAITS} from "../../shared/constants";

export const lex: Wargear[]  = [
    {
        ...gear('lex',12,'Cyber Mastiff','2C','Imperium,Adeptus Arbites'),
        ...toolz('Familiar', 'A cyber familiar to aid your wims (see Lex Imperialis pg 12 for details).'),
        meta: [
            metaMelee(6,4,0,0, ['Rending(3)'], 'Plasteel Bite', true)
        ],
    },
    {
        ...gear('lex',17,'Arbites Shotpistol','5C','Projectile,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 6, 1 ,0, 12, 1, 'Brutal,Pistol')
    },
    {
        ...gear('lex',17,'Arbites Combat Shotgun','6U','Projectile,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 8, 1 ,0, 12, 1, 'Brutal,Rapid Fire(2)')
    },
    {
        ...gear('lex',17,'Arbites Grenade Launcher','5C','Projectile,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', '*', '*' ,0, 28, 0, 'Assault')
    },
    {
        ...gear('lex',17,'Executioner Shotgun','3C','Projectile,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 9, 2 ,0, 12, 1, 'Assault,Spread')
    },
    {
        ...gear('lex',17,'Heavy Stubber','5U','Projectile,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 10, 2 ,0, 36, 3, 'Heavy(4)'),
    },
    {
        ...gear('lex',17,'Webber','3C','Explosive,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', '-', '-' ,0, 24, 0, 'Blast(3)'),
    },
    {
        ...gear('lex',17,'Arbites Grenade','5U','Explosive,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 10, 2 ,0, '*', 0, 'Spread,Throw(Sx4)'),
    },
    {
        ...gear('lex',17,'Voltaic Shock Mine','1U','Explosive,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 6, 1 ,0, '*', 0, 'Blast(6),Throw(Sx4)'),
    },
    {
        ...gear('lex',17,'Remote Detonation','5U','Explosive,Imperium,Adeptus Arbites'),
        ...rangez('Arbitrator Ranged Weapons', 10, 1 ,0, 1, 0, 'Heavy(4),Blast(6)'),
    },
    {
        ...gear('lex',17,'Power Sword','6R','Imperium,Adeptus Arbites,Power Field'),
        ...meleez('Arbitrator Melee Weapons', 5, 4 ,-3, 0, 'Parry'),
    },
    {
        ...gear('lex',17,'Excruciator Maul','8V','Adeptus Arbites,Power Field'),
        ...meleez('Arbitrator Melee Weapons', 5, 4 ,-2, 0, 'Agonising,Parry,Brutal'),
    },
    {
        ...gear('lex',17,'Power Maul','6V','Imperium,Adeptus Arbites,Power Field'),
        ...meleez('Arbitrator Melee Weapons', 5, 4 ,-1, 0, 'Brutal'),
    },
    {
        ...gear('lex',17,'Shock Maul','5U','Imperium,Adeptus Arbites'),
        ...meleez('Arbitrator Melee Weapons', 4, 4 ,-1, 0, 'Agonising,Brutal'),
    },
    {
        ...gear('lex',17,'Power Fist','8V','Imperium,Adeptus Arbites'),
        ...meleez('Arbitrator Melee Weapons', 5, 5 ,-3, 0, 'Brutal,Unwieldy(2)'),
    },
    {
        ...gear('lex',17,'Combat Knife','2C','Blade,Imperium,Adeptus Arbites'),
        ...meleez('Arbitrator Melee Weapons', 3, 1 ,0, 0),
    },
    // Others
    {
        ...gear('lex',18,'Arbites Carapace Armour','6R','Adeptus Arbites'),
        ...armour('Adeptus Arbites Carapace Armour', 4),
    },
    {
        ...gear('lex',18,'Arbites Medi-kit','3U','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'When making a Medicae (Int) test to heal an ally, you gain +1 Bonus Dice. If used on an incapacitated enemy, they are automatically stabilised and cannot bleed out for the next hour.'),
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, condition: 'when healing an ally' },
        ],
        description:
            '<p>When making a Medicae (Int) test to heal an ally, you gain +1 Bonus Dice.</p>' +
            '<p>If used on an incapacitated enemy, they are automatically stabilised and cannot bleed out for the next hour.</p>'
    },
    {
        ...gear('lex',18,'Nuncio Aquila','6R','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'When in use, ranged attacks gain +Rank Bonus Dice. Can be activated once per combat.')
    },
    {
        ...gear('lex',18,'Soulguilt Scanner','7U','Imperium,Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'You gain +Rank Bonus Dice on all Insight (Wil) tests. Additionally, it negates any benefits an enemy receives from concealing their identity or hiding in a crowd.'),
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INSIGHT, rank: 1 },
        ],
        description:
            '<p>You gain +Rank Bonus Dice on all Insight (Wil) tests.</p>' +
            '<p>Additionally, it negates any benefits an enemy receives from concealing their identity or hiding in a crowd.</p>'
    },
    {
        ...gear('lex',19,'Arbites Assault Shield','6U','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'You gain +Rank to your Resilience when equipped. As a Simple Action, you may plant the shield to gain the benefits of Light Cover (+Rank to Defence) until the start of your next turn. Additionally, any enemy who fails a melee attack against you must immediately make a Strength Test (DN 2 + Rank) or be knocked back, gaining the Staggered condition by the shield’s kinetic discharge.'),
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, rank: 1, condition: 'while equipping the shield' },
        ],
        description:
            '<p>You gain +Rank to your Resilience when equipped.</p>' +
            '<p>As a Simple Action, you may plant the shield to gain the benefits of Light Cover (+Rank to Defence) until the start of your next turn. Additionally, any enemy who fails a melee attack against you must immediately make a Strength Test (DN 2 + Rank) or be knocked back, gaining the Staggered condition by the shield’s kinetic discharge.</p>',
    },
    {
        ...gear('lex',19,'Lex Imperialis','3C','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'You gain +Rank Bonus Dice on all Scholar (Int) and Leadership (Wil) tests. Additionally, as a Simple Action, you may spend a point of Glory to read a verdict aloud, quoting the Lex Imperialis directly. All enemies within a 15-meter radius who can hear you must immediately pass a Resolve Test (DN 2 + Rank) or suffer the Pinned condition as the terrifying weight of their Emperor’s justice shatters their resolve.'),
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, rank: 1 },
            { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, rank: 1 },
        ],
        description:
            '<p>You gain +Rank Bonus Dice on all Scholar (Int) and Leadership (Wil) tests.</p>' +
            '<p>Additionally, as a Simple Action, you may spend a point of Glory to read a verdict aloud, quoting the Lex Imperialis directly. All enemies within a 15-meter radius who can hear you must immediately pass a Resolve Test (DN 2 + Rank) or suffer the Pinned condition as the terrifying weight of their Emperor’s justice shatters their resolve.</p>',
    },
    {
        ...gear('lex',19,'Manhunter\'s Helm','5U','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'When worn, you gain +Rank to all Intimidate Tests. You gain a +1 bonus to defence against the target of your current investigation or pursuit.'),modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, rank: 1, condition: 'while wearing the helm' },
            { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 1, condition: 'against the target of your current investigation/pursuit' },
        ],
        description:
            '<p>When worn, you gain +Rank to all Intimidate Tests.</p>' +
            '<p>You gain a +1 bonus to defence against the target of your current investigation or pursuit.</p>',
    },
    {
        ...gear('lex',19,'Vasov\'s Auto-Oppressor','6V','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'Once per combat, you can activate this device to target an area within 15 meters. The target must pass a Strength Test (DN 3) or immediately fall Prone and have their Speed reduced to 0 until the end of their next turn.')
    },
    {
        ...gear('lex',19,'Chastisor Auto-Vox','4U','Adeptus Arbites'),
        ...toolz('Arbites Equipment', 'You gain +2 Bonus Dice to all Intimidation (Wil) tests. Once per encounter, you can shout a command; all non-Elite enemies within 10 meters must pass a Resolve Test (DN 2+Rank) or be Pinned.'),
        description:
            '<p>You gain +2 Bonus Dice to all Intimidation (Wil) tests.</p>' +
            '<p>Once per encounter, you can shout a command; all non-Elite enemies within 10 meters must pass a Resolve Test (DN 2+Rank) or be Pinned.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 2 },
        ],
    },
]
