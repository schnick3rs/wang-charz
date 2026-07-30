import {archetype, costz, reqAttribute, reqSkill, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../../db/static/_statUtils";


export const aaoaOfficioAssassinorum = [
    {
        name: 'Callidus Assassin',
        ...archetype('aaoa', 109,'Officio Assassinorum','Callidus Assassin',5,'Human'),
        ...costz(308,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.DECEPTION, 4),
            reqSkill(SKILLS.INSIGHT, 4),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.PERSUASION, 2),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        factionKey: 'aaoa-officio-assassinorum',
        hint: 'The second skinned assassin.',
        keywords: 'Imperium,Officio Assassinorum,Templum Callidus',
        archetypeFeatures: [
            {
                name: 'Assassinorum Conditioning',
                snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
                description:
                    '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
            },
            {
                name: 'Betrayal’s Blade',
                snippet: 'When disguised or otherwise concealing your identity, you gain a Stealth Score based on the total of your Deception test. This score only decreases when you take actions which may reveal your true intentions (GM’s discretion).',
                description:
                    '<p>When disguised or otherwise concealing your identity, you gain a Stealth Score based on the total of your Deception test. This score only decreases when you take actions which may reveal your true intentions (GM’s discretion).</p>',
            },
        ],
        influence: 0,
        wargear: wargearz('C’Tan Phase Sword, Neural Shredder, 2 Polymorphine, 3 poisoned mono-knive, bodyglove'),
    },
    {
        name: 'Culexus Assassin',
        ...archetype('aaoa', 110,'Officio Assassinorum','Culexus Assassin',5,'aaoa/Pariah'),
        ...costz(308,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        factionKey: 'aaoa-officio-assassinorum',
        hint: 'Witch-slayer, wyrd-bane, living nightmare to all psykers.',
        keywords: 'Imperium,Officio Assassinorum,Templum Culexus',
        archetypeFeatures: [
            {
                name: 'Assassinorum Conditioning',
                snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
                description:
                    '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
            },
            {
                name: 'Life Drain',
                snippet: 'Enemies engaged with you at the end of their turn must pass a Willpower test (DN 2+Rank) or suffer Shock equal to your Rank. PSYKERS suffer Double Rank shock damage instead.',
                description:
                    '<p>Enemies engaged with you at the end of their turn must pass a Willpower test (DN 2+Rank) or suffer Shock equal to your Rank. PSYKERS suffer Shock equal to twice your Rank instead.</p>',
            },
        ],
        influence: 0,
        wargear: wargearz('Etherium, Force Matrix, Animus Speculum, 3 Psyk-Out Grenade, Bodyglove'),
        description:
            '<p><strong>You are anathema, witch-bane, wyrdslayer, psychic abomination. Your foes dread your presence, desperately hoping that you are a nightmarish figment, for their minds cannot bear to acknowledge the abyss within your soul.</strong></p>' +
            '<p>The Culexus Assassins are the most sinister, feared, and hated of all Imperial Assassins. They are null-entities in the warp, and their unnatural lack of a presence inspiring a sense of unease even in non-psykers. To psykers their mere presence is terrifying, invoking panic. In the confusion caused by this fear, the assassin can move in on its target and eliminate them. To purely psychic entities like daemons, they are nigh-invisible at best, akin to trying to see a black hole amidst the inky void of space.</p>' +
            '<p>The Culexus Assassins possess the "Pariah Gene", making them for all intents, "soulless," accounting for their lack of warp-presence. This gene manifests itself very rarely, in a single individual among a billion, or more. This extreme rarity, coupled with the inevitable losses during training, makes the Culexus assassins the rarest of all Imperial assassins. The Culexus temple is known to hunt down and recruit these Pariahs but also to vat-grow them, an arduous and complex process that produces only a few viable candidates a year.</p>',
    },
    {
        name: 'Eversor Assassin',
        ...archetype('aaoa', 111,'Officio Assassinorum','Eversor Assassin',5,'Human'),
        ...costz(308,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        factionKey: 'aaoa-officio-assassinorum',
        hint: 'Hunter, killer, bane.',
        keywords: 'Imperium,Officio Assassinorum,Templum Eversor',
        archetypeFeatures: [
            {
                name: 'Assassinorum Conditioning',
                snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
                description:
                    '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
            },
            {
                name: 'Alchemical Metabolism',
                snippet: 'When you suffer one or more Wounds in melee, roll 1d6; on a 4+, the attacker suffers a Mortal Wound. If you are killed, you detonate, inflicting 10+4ED damage with AP-2 to everything within a number of metres equal to your Toughness.',
                description:
                    '<p>When you suffer one or more Wounds in melee, roll 1d6; on a 4+, the attacker suffers a Mortal Wound. If you are killed, you detonate, inflicting 10+4ED damage with AP-2 to everything within a number of metres equal to your Toughness.</p>',
            },
        ],
        influence: 0,
        wargear: wargearz('Augmetic viscera, cardioproxy, reflex catalyst, sinew armature, executor pistol, sentinel array, neuro-gauntlet, power sword, 2 melta bomb, Eversor combat drugs, Bodyglove'),
    },
    {
        name: 'Vindicare Assassin',
        ...archetype('aaoa', 118,'Officio Assassinorum','Vindicare Assassin',5,'Human',false),
        ...costz(320,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 6),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        factionKey: 'aaoa-officio-assassinorum',
        hint: 'Stalker, patience, death.',
        keywords: 'Imperium,Officio Assassinorum,Templum Vindicare',
        archetypeFeatures: [
            {
                name: 'Assassinorum Conditioning',
                snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
                description:
                    '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
            },
            {
                name: 'Perfect Shot',
                snippet: 'When you aim with a ranged weapon, you double the listed Range of the weapon, and you add +Rank bonus dice to the subsequent ranged attack.',
                description:
                    '<p>: When you aim with a ranged weapon, you double the listed Range of the weapon, and you add +Rank bonus dice to the subsequent ranged attack.</p>',
            },
        ],
        influence: 0,
        wargear: wargearz('Exitus Longrifle, Exitus Pistol, Exitus Hellfire Rounds, Exitus Shield-breaker Rounds, Exitus Turbo-Penetrator Rounds, Vindicare Stealth Suit, Vindicare Spy Mask'),
    },
];
