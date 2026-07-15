import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../../db/static/_statUtils";

export const aaoaOrks = [
    {
        ...archetype('aaoa', 48,'Orks','Burna Boy',2,'Ork'),
        ...costz(48,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'Pyromaniacal Greenskins whose desire to burn and destroy grows to consume them entirely.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Da Burna Dance',
                snippet: 'You add +1 to Resolve for every creature you can see which is currently On Fire.',
            },
        ],
        wargear: wargearz('Burna, Ork Flak, 3 Stikkbomb'),
    },
    {
        ...archetype('aaoa', 53,'Orks','Mekboy',2,'Ork'),
        ...costz(52,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'A type of Ork Oddboy who build all the weapons, vehicles, and other advanced technology used by the Greenskins.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Fix It Proppa',
                description:
                    '<p>You gain +Double Rank bonus dice on Tech tests to fix any weapon, vehicle, or other machine with the ORK keyword. In addition, during a regroup or respite, you may tinker with a weapon, vehicle, or other machine with the ORK keyword. If tinkering with a weapon, you may add your Rank from the weapon’s Range (add the same to all range categories), ED, Salvo rating, or any rated Trait the weapon already possesses. Other machines gain a bonus of the GM’s discretion. These bonuses last until the next respite, or until the machine suffers a complication, whichever comes first.</p>',
            },
        ],
        wargear: wargearz('Kustom Mega Blasta, Choppa, 3 Stikkbomb, Ork Flak, Mek Toolz'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 55,'Orks','Painboy',2,'Ork'),
        ...costz(52,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.MEDICAE, 3),
        ]),
        hint: 'Responsible for fixing injuries even the highly regenerative Ork physiology cannot repair.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Make It All Betta',
                description:
                    '<p>You add Double Rank bonus dice to all Medicae tests made on characters with the ORK keyword. In addition, when making a Medicae test on an ORK character outside of combat, you may spend an Exalted Icon from to remove a single Traumatic Injury immediately, as you crudely reattached lost body parts.</p>',
            },
        ],
        wargear: wargearz('‘Urty Syringe, Choppa, Ork Flak, Dok´s Toolz'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 55,'Orks','Runtherd',2,'Ork'),
        ...costz(58,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.INTIMIDATION, 3),
            reqSkill(SKILLS.LEADERSHIP, 2),
        ]),
        hint: 'Oddboyz who exhibit a trait extremely uncommon amongst Orks: patience.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Slaver',
                description:
                    '<p>You are accompanied by a mob of Grots (p. 358) equal to your Rank x4. If any of your Grots die, they can be replaced between sessions at the GM’s discretion. All Grots, Snotlings, and Squigs within 10 + Rank metres of you add your Leadership to their Resolve.</p>',
            },
        ],
        wargear: wargearz('Slugga, grabba stikk, 3 stikkbomb, grot lash, Ork Flak'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 58,'Orks','Tankbusta',2,'Ork'),
        ...costz(48,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.TECH, 1),
        ]),
        hint: 'A Tankbusta (pl. Tankbustaz) has become completely addicted to the thrill of destroying the armoured fighting vehicles of his foes.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Tank Hunters',
                description:
                    '<p>When you make an attack against a vehicle, you may reroll up to Double Rank dice.</p>',
            },
        ],
        wargear: wargearz('Rokkit Launcher, Ork Flak, 3 stikkbomb, 1 tankbusta bomb'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 72,'Orks','Flash Git',3,'Ork'),
        ...costz(84,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
        ]),
        hint: 'An elite breed of Ork Nobz who are obsessed with their lovingly customised, ostentatiously polished and painted weapons known as Snazzguns.',
        keywords: 'Ork,[Clan]',
        archetypeFeatures: [
            {
                name: 'Gun Crazy Show-Offs',
                description:
                    '<p>If you roll a 6 on your Wrath die when making a ranged attack, you may spend a reload to immediately make a second shooting attack with that weapon at the nearest target.</p>',
            },
        ],
        wargear: wargearz('Snazzgun, ‘Eavy armour, 3 stikkbomb, ammo runt'),
        influence: 2,
    },
    {
        ...archetype('aaoa', 86,'Orks','Weirdboy',3,'Ork'),
        ...costz(66,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
        ]),
        hint: 'Capable of vomiting blasts of Warp energy that can reduce foes to molten goop in seconds.',
        keywords: 'Ork,Psyker,[Clan]',
        archetypeFeatures: [
            {
                name: 'The Power of the WAAAGH!',
                description:
                    '<p>You are a Psyker; you know the Smite psychic power and may learn other powers from the WAAAGH discipline. When using psychic powers, you do not choose a Power Level; rather, you gain one additional Wrath die for every five Orks within 20 metres of you. You must roll these Wrath dice. Each 1 rolled on a Wrath die when using a Psychic Power inflicts one Mortal Wound on you instead of a roll on the Perils of the Warp table, and if you exceed your Max Wounds from this, you explode, dying instantly and inflicting 1d3+Tier Mortal Wounds on all Orks within 20 metres.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'WAAAGH!',
                ],
            },
        ],
        wargear: wargearz('Weirdboy Staff, Ork Flak, collection of jangly baubles'),
    },
];
