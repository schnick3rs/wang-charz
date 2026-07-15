import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";


export const red2 = [
    {
        ...archetype('red2', 34,'Adepta Sororitas','Novitiate Militant',1,'Human'),
        ...costz(24,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A determined warrior, filled with purity and faith.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Impetuous Fervour',
                snippet: 'When you Charge you reduce the Multi-Attack penalty by 2.',
            },
        ],
        wargear: wargearz('Novitiate Armour, Novitiate Vestments, Rule of the Sororitas, 1 Frag Grenade, 1 Krak Grenade, Autopistol, Novitiate Melee Weapon'),
        influence: 1,
    },
    {
        ...archetype('red2', 35,'Adepta Sororitas','Celestian Sacresant',3,'Human'),
        ...costz(142,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        hint: 'A determined warrior, filled with purity and faith.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Keeper of the Faith',
                snippet:
                    'You have 1 Faith. ' +
                    'Once per Round, you may spend 1 point of Faith, Wrath, or Glory to move up to your Speed and increase your Defence by +1 until the start of your next Turn. ' +
                    'You can use this movement to interpose yourself between an attack and its target, making you the target',
            },
        ],
        wargear: wargearz('Sororitas Power Armour, Sacresant Shield, Bolt Pistol, Hallowed Mace, 3 Frag Grenades, 3 Krak Grenades, Chaplet Ecclesiasticus, Rule of the Sororitas'),
        influence: 0,
    },
    {
        ...archetype('red2', 35,'Adepta Sororitas','Sister Dogmata',4,'Human'),
        ...costz(236,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 6),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.LEADERSHIP, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A determined warrior, filled with purity and faith.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Bolstering Light',
                snippet:
                    'You have the Bolstering Purity and Consecrated Light Faith Talents (Wrath & Glory Rulebook, pages 142–143).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-bolstering-purity', meta: { name: 'Bolstering Purity' } },
                    { targetGroup: 'talents', targetValue: 'core-consecrated-light', meta: { name: 'Consecrated Light' } },
                ],
            },
        ],
        wargear: wargearz('Sororitas Power Armour, Bolt Pistol, Mace of the Righteous, 3 Frag Grenades, 3 Krak Grenades, Chaplet Ecclesiasticus, Rule of the Sororitas'),
        influence: 0,
    },
    {
        ...archetype('red2', 37,'Adepta Sororitas','Palatine',3,'Human'),
        ...costz(167,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.LEADERSHIP, 3),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A determined warrior, filled with purity and faith.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Fury of the Righteous',
                snippet:
                    'You have 1 Faith. You can spend 1 Faith at any time to activate Fury of the Righteous until the start of your next Turn. ' +
                    'While Fury of the Righteous is active, any allies with the ADEPTUS MINISTORUM Keyword within 6m of you gain +Rank bonus dice to melee attack Tests.',
                modifications: [
                    { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
                ],
            },
        ],
        wargear: wargearz('Rosarius, Sororitas Power Armour, Chaplet Ecclesiasticus, copy of the Rule of the Sororitas, Power Sword, 3 Frag Grenades, 3 Krak Grenades, Bolt Pistol or Plasma Pistol'),
        influence: 0,
    },
    // Ministorum
    {
        ...archetype('red2', 48,'Adeptus Mechanicus','Corpuscarii Electro-Priest',2,'Human'),
        ...costz(72,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus',
        archetypeFeatures: [
            {
                name: 'Voltagheist Field',
                snippet:
                    'You can roll Determination against Mortal Wounds. Whenever you inflict a Wrath Critical, you can choose to activate a Voltagheist Burst, inflicting Mortal Wounds equal to your Rank on everyone within 5m that doesn’t have this ability',
            },
            {
                name: 'Omnissiah’s Tears',
                snippet:
                    'You are immune to the Blinded Condition.',
            },
            {
                name: 'Omnissian Proliferation',
                snippet:
                    'You can sacrifice half of your Maximum Shock to fully restore electrical power to technology of Huge or smaller Size. At the Gamemaster’s discretion, this ability can also be used to repair weaponry, recharge ammo packs, or be used for Tech Interaction Attacks.',
            },
        ],
        wargear: wargearz('Corpuscarii Robes, Electrostatic Gauntlets'),
        influence: 0,
    },
    {
        ...archetype('red2', 48,'Adeptus Mechanicus','Fulgrite Electro-Priest',2,'Human'),
        ...costz(72,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus',
        archetypeFeatures: [
            {
                name: 'Voltagheist Field',
                snippet:
                    'You can roll Determination against Mortal Wounds. Whenever you inflict a Wrath Critical, you can choose to activate a Voltagheist Burst, inflicting Mortal Wounds equal to your Rank on everyone within 5m that doesn’t have this ability',
            },
            {
                name: 'Omnissiah’s Tears',
                snippet:
                    'You are immune to the Blinded Condition.',
            },
            {
                name: 'Syphoned Vigour',
                snippet:
                    'Whenever you deal one or more Wounds with your Electroleech Stave, you may recover an amount of Shock equal to the number of Wounds you dealt.',
            },
        ],
        wargear: wargearz('Fulgrite Robes,  Electroleech Stave'),
        influence: 0,
    },
    {
        ...archetype('red2', 49,'Adeptus Mechanicus','Pteraxii Skystalker',2,'Human'),
        ...costz(112,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Heavily Augmented',
                snippet:
                    'Your body has been redesigned to withstand the rigours of war. ' +
                    'You do not bleed (making you immune to the Bleeding Condition) and gain +Rank bonus dice to Determination rolls.',
            },
            {
                name: 'Fleeting Barrage',
                snippet:
                    'When you Fall Back, you can make a ranged attack as a Free Action.',
            },
        ],
        wargear: wargearz('Pteraxii Flight Pack, Pteraxii Talons, Flechette Carbine, Skitarii Auto-cuirass'),
        influence: 0,
    },
    {
        ...archetype('red2', 49,'Adeptus Mechanicus','Pteraxii Sterylizor',2,'Human'),
        ...costz(112,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Heavily Augmented',
                snippet:
                    'Your body has been redesigned to withstand the rigours of war. ' +
                    'You do not bleed (making you immune to the Bleeding Condition) and gain +Rank bonus dice to Determination rolls.',
            },
            {
                name: 'Darting Hunter',
                snippet:
                    'When you Fall Back, you can Charge as a Free Action.',
            },
        ],
        wargear: wargearz('Pteraxii Flight Pack, Pteraxii Talons, Phosphor Torch, Skitarii Auto-cuirass'),
        influence: 0,
    },
    {
        ...archetype('red2', 50,'Adeptus Mechanicus','Serberys Raider',2,'Human'),
        ...costz(121,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.SURVIVAL, 1),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Heavily Augmented',
                snippet:
                    'Your body has been redesigned to withstand the rigours of war. ' +
                    'You do not bleed (making you immune to the Bleeding Condition) and gain +Rank bonus dice to Determination rolls.',
            },
            {
                name: 'Eye of Serberys',
                snippet:
                    'You have the Deadshot Talent (Wrath & Glory Rulebook, page 131).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-deadshot', meta: { name: 'Deadshot' } },
                ],
            },
            {
                name: 'Skirmisher',
                snippet:
                    'If you are not surprised at the start of combat you may immediately Move or command your mount to Move.',
            },
        ],
        wargear: wargearz('Raider Cybercanid, Galvanic Carbine, Cavalry Sabre or Sword, Skitarii Auto-cuirass'),
        influence: 0,
    },
    {
        ...archetype('red2', 50,'Adeptus Mechanicus','Serberys Sulphurhound',2,'Human'),
        ...costz(121,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.SURVIVAL, 1),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Heavily Augmented',
                snippet:
                    'Your body has been redesigned to withstand the rigours of war. ' +
                    'You do not bleed (making you immune to the Bleeding Condition) and gain +Rank bonus dice to Determination rolls.',
            },
            {
                name: 'Pistoleer',
                snippet:
                    'You have the Dual Wield Talent (Wrath & Glory Rulebook, page 133).',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-dual-wield', meta: { name: 'Dual Wield' } },
                ],
            },
            {
                name: 'Rad-saturated',
                snippet:
                    'Whenever an individual enters Engagement with you or starts their Turn Engaged with you they must make a Toughness Test with a DN equal to your Rank x2. If they fail, they are Hindered until the start of their next Turn.',
            },
        ],
        wargear: wargearz('Sulphurhound Cybercanid, 2 Phosphor Pistols, Skitarii Auto-cuirass'),
        influence: 0,
    },
    {
        ...archetype('red2', 51,'Adeptus Mechanicus','Cybernetica Datasmith',3,'Human'),
        ...costz(101,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 4),
        ]),
        hint: 'A fanatical warrior, fighting at the forefront of the Adeptus Mechanicus forces.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Reprogrammer',
                snippet:
                    'The DN of any Tech Test you make with a target that has the ROBOT Keyword is halved. ' +
                    'Additionally, you can attempt a Tech Test to repair a target with the ROBOT Keyword, ' +
                    'restoring their Wounds as though you were making a Medicae Test (Wrath & Glory Rulebook, page 124).',
            },
        ],
        wargear: wargearz('Refractor Field, Power Fist, Gamma Pistol, Datasmith Robes, a Comb i Tool, a Mind Impulse Unit, and any 1 Augmetic Enhancement'),
        influence: 0,
    },
];
