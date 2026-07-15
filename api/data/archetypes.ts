import {ATTRIBUTES, SKILLS, TRAITS} from "../db/static/_statUtils";
import {
    addModifier,
    archetype,
    costz,
    reqAttribute,
    reqSkill,
    simpleAbility,
    suggestedAttributes,
    wargearz
} from "./archetypes/utils";
import {Archetype, ArchetypeRepositorySchema} from "../shared/schemas/archetype";

import {afas} from "../data/archetypes/books/afflictionAscendant";
import {fspg} from "../data/archetypes/books/forsakenSystemPlayersGuide";
import {core} from "../data/archetypes/books/core";
import {voab} from "../data/archetypes/books/voab";
import {red2} from "../data/archetypes/books/redactedRecordsTwo";
import {aioe} from "../data/archetypes/books/inheritanceOfEmbers";
import {tnh} from "../data/archetypes/books/theNullHypothesis";
import {dod} from "../data/archetypes/books/doctorsOfDoom";
import {aaoaRep} from "../data/archetypes/books/apocrypha";

const aotgtRep = [
    archetype('aotgt', '', 'Agents of the Imperium', 'Callidus Assassin', 4, 'Human', true),
    archetype('aotgt', '', 'Agents of the Imperium', 'Culexus Assassin', 4, 'Human', true),
    archetype('aotgt', '', 'Agents of the Imperium', 'Vindicare Assassin', 4, 'Human', true),
    archetype('aotgt', '', 'Agents of the Imperium', 'Grey Knight', 4, 'Adeptus Astartes', true),
];

const ltgbRep = [
    archetype('ltgb', '9', 'Renegades', 'Apostate', 1, 'Human', true),
    archetype('ltgb', 10, 'Renegades', 'Cultist', 1, 'Human', true),
    archetype('ltgb', 11, 'Renegades', 'Renegade', 1, 'Human', true),
    archetype('ltgb', 11, 'Renegades', 'Heretek', 2, 'Human', true),
    archetype('ltgb', 12, 'Renegades', 'Rogue Psyker', 2, 'Human', true),
    archetype('ltgb', 13, 'Renegades', 'Pirate', 2, 'Human', true),
    archetype('ltgb', 13, 'Renegades', 'Legionnaire', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 14, 'Renegades', 'Havoc', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 15, 'Renegades', 'Raptor', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 15, 'Renegades', 'Warpsmith', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 16, 'Renegades', 'Sorcerer', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 17, 'Renegades', 'Noise Marine', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 17, 'Renegades', 'Plague Marine', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 18, 'Renegades', 'Khorne Berzerker', 3, 'Adeptus Astartes', true),
    archetype('ltgb', 19, 'Renegades', 'Dark Apostle', 4, 'Adeptus Astartes', true),
];

const teaRep = [
    {
        ...archetype('tea', 22, 'Adeptus Astartes', 'Devastator Space Marine', 3, 'Adeptus Astartes'),
        ...costz(60, [  /* TODO */]),
        hint: 'Devastate the wast masses of enemies with your focus fire.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Focus Fire',
                snippet: 'Devastator Marines are known for their ability to lay down waves of suppressive fire, cutting down any enemy foolish enough to approach them. They add +Rank bonus dice to hit with weapons with the Heavy trait, but only if they did not move that turn.',
            },
        ],
        wargearString:
            'Aquila power armor, heavy bolter with ammunition backpack, bolt pistol, Astartes combat knife, 3 frag and krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Heavy Bolter' },
            { name: 'Ammunition Backpack' },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('tea', 23, 'Adeptus Astartes', 'Assault Space Marine', 3, 'Adeptus Astartes'),
        ...costz(55, [  /* TODO */]),
        hint: 'Decent like a meteor into the enemy lines.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ],
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Meteoric Descent',
                snippet: 'An Assault Marine uses his jump pack to its fullest potential, using his momentum as a weapon. After charging while equipped with a jump pack, an Assault Marine may add +Rank ED to any melee attacks he makes that round.',
            },
        ],
        wargearString:
            'Aquila power armor, Chainsword, bolt pistol, jump pack, 3 frag and krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Chainsword' },
            { name: 'Bolt Pistol' },
            { name: 'Jump Pack' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    archetype('tea', 23, 'Adeptus Astartes', 'Tactical Marine', 3, 'Adeptus Astartes', true),
    {
        ...archetype('tea', 24, 'Adeptus Astartes', 'Techmarine', 3, 'Adeptus Astartes'),
        ...costz(85, [  /* TODO */]),
        hint: 'Support the Chapter with your craftsmanship and technical knock.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
            reqSkill(SKILLS.TECH, 4),
            reqSkill(SKILLS.PILOT, 3),
        ],
        keywords: 'Imperium,Adeptus Astartes,Adeptus Mechanicus,[Chapter]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Master of the Forge',
                snippet: 'A Techmarine gains +Rank to all Scholar, Pilot and Tech tests involving vehicles, weapons, armor, and wargear with the Adeptus Astartes keyword and +½ Rank to all other Imperium items.',
            },
        ],
        wargearString:
            'Aquila power armor, bolt pistol or boltgun, Omnissian Axe, 3 frag and krak grenades, augmetic Servo Arm.',
        wargear: [
            { name: 'Aquila Mk VII' },
            {
                name: 'Bolt Pistol or Boltgun',
                options: [
                    { name: 'Bolt Pistol' },
                    { name: 'Boltgun' },
                ],
            },
            { name: 'Omnissian Axe' },
            { name: 'Mechadendrites (Servo-Arm)' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('tea', 25, 'Adeptus Astartes', 'Apothecary', 3, 'Adeptus Astartes'),
        ...costz(70, [  /* TODO */]),
        hint: 'Rescue the dying from their well earned retirement.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
            reqSkill(SKILLS.MEDICAE, 4),
            reqSkill(SKILLS.SCHOLAR, 3),
        ],
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Prime Helix',
                snippet: 'An Apothecary adds +½ Rank to the number of wounds he heals when performing first aid. He gains +Rank bonus dice to all Scholar and Medicae tests he makes regarding Adeptus Astartes or Primaris Astartes. An Apothecary will never willingly leave recoverable gene-seed behind, and is duty-bound to recover any that can be.',
            },
        ],
        wargearString:
            'Aquila power armor with Diagnostor helmet, bolt pistol, boltgun or Chainsword, 3 frag and krak grenades, narthecium, reductor',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Diagnostor Helmet' },
            { name: 'Bolt Pistol' },
            {
                name: 'Boltgun or Chainsword',
                options: [
                    { name: 'Boltgun' },
                    { name: 'Chainsword' },
                ],
            },
            { name: 'Narthecium' },
            { name: 'Reductor' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('tea', 25, 'Adeptus Astartes', 'Librarian', 3, 'Adeptus Astartes'),
        ...costz(80, [  /* TODO */]),
        hint: 'Harness the universal and librarius powers of the warp.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
            reqSkill(SKILLS.SCHOLAR, 4),
        ],
        keywords: 'Imperium,Adeptus Astartes,Psyker,[Chapter]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You gain the Smite Power and one Minor or Librarius Power. You gain access To Minor, Universal and Librarius powers.',
                description:
                    '<p>A Librarian begins play with one minor or Librarius psychic power and the smite psychic power. ' +
                    'They may purchase additional Minor psychic powers, Librarius psychic powers, and powers from up to one other discipline, ' +
                    'subject to Tier restrictions.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinorOrLibrarius', selected: '', query: { discipline: 'Minor,Librarius' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Biomancy',
                    'Divination',
                    'Pyromancy',
                    'Telekinesis',
                    'Telepathy',
                    'Universal',
                    'Librarius',
                ],
            },
            {
                name: 'Abandon the Witch',
                snippet: 'Marines from the Black Templars Chapter may not choose this Archetype.',
            },
        ],
        wargearString:
            'Aquila power armor with psychic hood, bolt pistol, force sword or force staff, 3 frag and krak Grenade',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Psychic Hood' },
            { name: 'Bolt Pistol' },
            {
                name: 'force sword or force staff',
                options: [
                    { name: 'Force Sword' },
                    { name: 'Force Staff' },
                ],
            },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    archetype('tea', 26, 'Adeptus Astartes', 'Chaplain', 4, 'Adeptus Astartes', true),
    archetype('tea', 27, 'Adeptus Astartes', 'Primaris Intercessor', 4, 'Primaris Astartes', true),
    archetype('tea', 27, 'Adeptus Astartes', 'Primaris Hellblaster', 4, 'Primaris Astartes', true),
    archetype('tea', 28, 'Adeptus Astartes', 'Primaris Reiver', 4, 'Primaris Astartes', true),
    archetype('tea', 28, 'Adeptus Astartes', 'Primaris Inceptor', 4, 'Primaris Astartes', true),
    archetype('tea', 29, 'Adeptus Astartes', 'Primaris Aggressor', 4, 'Primaris Astartes', true),
    archetype('tea', 29, 'Adeptus Astartes', 'Primaris Apothecary', 4, 'Primaris Astartes', true),
    archetype('tea', 30, 'Adeptus Astartes', 'Primaris Librarian', 4, 'Primaris Astartes', true),
    archetype('tea', 31, 'Adeptus Astartes', 'Primaris Chaplain', 5, 'Primaris Astartes', true),
];

const hevaRep = [
    archetype('heva', 9, 'Aeldari', 'Kabalite', 1, 'heva/Dark Eldar', true),
    archetype('heva', 10, 'Aeldari', 'Wych', 2, 'heva/Dark Eldar', true),
    archetype('heva', 11, 'Aeldari', 'Scourge', 3, 'heva/Dark Eldar', true),
    archetype('heva', 12, 'Aeldari', 'Incubus', 4, 'heva/Dark Eldar', true),
];

const goenRep = [
    archetype('goen', 6, 'Adeptus Titanicus', 'Moderati', 2,'Human', true),
    archetype('goen', 7, 'Adeptus Titanicus', 'Princeps', 3, 'Human', true),
    archetype('goen', 8, 'Adeptus Titanicus', 'Legate', 4, 'Human', true),
];

const togRep = [
    {
        ...archetype('tog', 8, 'Chaos', 'Raider', 2, 'Human'),
        ...costz(24, [
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.PILOT, 1),
        ]),
        hint: 'A corrupted thug for lightning strikes',
        keywords: '[Any],Chaos,[Mark of Chaos]',
        archetypeFeatures: [
            {
                ...simpleAbility('Take Everything!', 'The Raider gains +Rank to all Pilot tests. They also begin each game session with one additional Reload.'),
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
        ],
        wargear: wargearz('Lasgun or Hand Flamer, Mono Knife or Sword, 2 Throwing Knifes, 1 Frag Grenade, Mesh Armour'),
        influence: 1,
    },
    {
        ...archetype('tog', 8, 'Chaos', 'Champion', 3, 'Human'),
        ...costz(64, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A champion for the dark gods',
        keywords: 'Chaos,Heretic,[Mark of Chaos]',
        archetypeFeatures: [
            {
                ...simpleAbility('Favour of the Gods', 'You start each session with an additional point of Wrath. You also gain a Wrath point when you kill a creature with the IMPERIUM Keyword.'),
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        wargear: wargearz('Flak Armour, Chain Axe or Chain Sword, Bolt Pistol, 2 Frag Grenades, 1 krak Grenade'),
        influence: 2,
    },
    {
        ...archetype('tog', 9, 'Chaos', 'Apostate', 2, 'Human'),
        ...costz(78, [
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.PERSUASION, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
        ]),
        hint: 'A demagoge of the forbidden words',
        keywords: 'Chaos,Heretic,[Mark of Chaos]',
        archetypeFeatures: [
            {
                ...simpleAbility('Demagogue', 'You gain +Rank on all Leadership and Persuasion tests.'),
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 1 },
                    { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1 },
                ],
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        wargear: wargearz('Duelling Las Pistol, Mono Knife, Refractor Field, Heretical Texts, Fine Robes'),
        influence: 2,
    },
    {
        ...archetype('tog', 9, 'Chaos', 'Plague Marine', 3, 'Adeptus Astartes'),
        ...costz(246, [
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.INTIMIDATION, 3),
            reqSkill(SKILLS.MEDICAE, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A bloated harbinger of plagues',
        keywords: 'Chaos,Heretic Astartes,[Legion],[Nurgle]',
        archetypeFeatures: [
            {
                ...simpleAbility('Abnormal Physiology', 'The marine is immune to all diseases, poisons, and automatically passes any test that would case FEAR. You also gain +Rank bonus when using Intimidation or any effect that instills FEAR.'),
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 1 },
                ],
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        wargear: wargearz('Plague Marine Armour, Boltgun, Bolt Pistol, Plague Knife, 3 frag grenades, 3 tox grenades'),
        influence: 1,
    },
    {
        ...archetype('tog', 9, 'Chaos', 'Khorne Berzerker', 3, 'Adeptus Astartes'),
        key: 'tog-khorne-berserker',
        ...costz(228, [
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A raging berserker in search for worthy prey',
        keywords: 'Chaos,Heretic Astartes,[Legion],[Khorne]',
        archetypeFeatures: [
            {
                ...simpleAbility('More Blood!', 'Increase the berserkers speed by 2 when they charge. You do not suffer a penalty when wounded and instead gain +Rank bonus to all Weapon Skill and Resolve tests'),
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 2, rank: 0, condition: 'when charging' },
                    { targetGroup: 'skills', targetValue: SKILLS.WEAPON_SKILL, modifier: 0, rank: 1, condition: 'when wounded' },
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when wounded' },
                ],
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Chain Axe or Chain Sword, Bolt Pistol, Astartes Combat Knife, 3 frag grenades, 3 krak grenades'),
        influence: 1,
    },
    {
        ...archetype('tog', 9, 'Chaos', 'Noise Marine', 3, 'Adeptus Astartes'),
        ...costz(226, [
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A sound addicted follower of slaanesh',
        keywords: 'Chaos,Heretic Astartes,[Legion],[Slaanesh]',
        archetypeFeatures: [
            {
                ...simpleAbility('New Sensations', 'The Gamemaster must spend 2 Ruin o Seize the initative while you are in the necounter. In Addition, once per combat encounter the Noise Marine may seize the initiative without spending a point of Glory.'),
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Noise Marine Sonic Blaster, Bolt Pistol, Astartes Combat Knife, 3 frag grenades, 3 concussion grenades'),
        influence: 2,
    },
    {
        ...archetype('tog', 9, 'Chaos', 'Chaos Sorcerer', 3, 'Adeptus Astartes'),
        ...costz(214, [
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 3),
        ]),
        hint: 'A weaver of the corrupted warp magic',
        keywords: 'Chaos,Heretic Astartes,[Legion],[Mark of Chaos],Psyker',
        archetypeFeatures: [
            {
                ...simpleAbility('Arcane Secrets', 'The Character gains the PSYKER keyword and starts the game with one minor Psychic Power and Smite. When performing a Ritual they may reroll a number of failed dice equal to Rank. Complications cannot be rerolled. If they already posses the PSYKER keyword, the start with an additional minor power.'),
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
                    { name: 'psykerMinorDouble', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor and Universal Disciplines. You unlock an addtional single Psychic Discipline.',
                description: '<p>You gain access to the Minor and Universal Disciplines. You unlock an additional single Psychic Discipline, following the rules in Chapter 11.</p>',
                selected: [''],
                options: [
                    // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
                    // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
                    { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
                    { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
                    { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
                    { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
                    { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
                    { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
                    { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                ],
            },
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Force Axe or Force Sword, Boltgun, Astartes Combat Knife, PSychic Focus'),
        influence: 1,
    },
];

const lotnRep = [
    {
        ...archetype('lotn', 5, 'Necrons', 'Immortal', 3, 'lotn/Necron'),
        ...costz(60, [ /* TODO */]),
        hint: 'Formerly members of the Necrontyr’s professional military, the Immortals were known for their peerless skill and resolve.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Undying Warrior',
                snippet: 'An Immortal reduces the amount of shock it loses when soaking wounds by ½ Rank.',
            },
        ],
        wargearString:
            'Heavy plating, Gauss blaster or Tesla carbine',
        wargear: [
            { name: 'Heavy plating' },
            {
                name: 'Gauss blaster or Tesla carbine',
                options: [
                    { name: 'Gauss blaster' },
                    { name: 'Tesla carbine' },
                ],
            },
        ],
    },
    {
        ...archetype('lotn', 5, 'Necrons', 'Deathmark', 3, 'lotn/Necron'),
        ...costz(65, [ /* TODO */]),
        hint: 'Assassins without peer, the Deathmarks are highly accurate and well-trained soldiers',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.AWARENESS, 3),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Hunter’s Mark',
                description:
                    'A Deathmark may declare a single elite or adversary-level threat as its  “mark” as a free action. ' +
                    'Once a target has been marked in such a way, ' +
                    'the Deathmark will know the marked target’s exact geographic location relative to the Deathmark, ' +
                    'as well as his status as alive or dead. ' +
                    'This does not give the Deathmark information about the surroundings of the target, ' +
                    'only its relative location. It may use this ability ½ Rank times per day.',
            },
        ],
        wargearString:
            'Heavy plating, Synaptic Disintegrator, Dimensional Oubliette generator',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Synaptic Disintegrator' },
            { name: 'Dimensional Oubliette generator' },
        ],
    },
    {
        ...archetype('lotn', 6, 'Necrons', 'Destroyer', 3, 'lotn/Necron'),
        ...costz(85, [ /* TODO */]),
        hint: 'Awoken with their minds decayed and damaged.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Hardwired Hatred',
                snippet: 'You add +½ Rank bonus dice to Attack Tests against organic targets. You suffer +2 DN to Social Tests with non-Destroyer Necrons.',
                description:
                    '<p>A Destroyer gains +½ Rank to Attack tests against organic targets, ' +
                    'but suffers a +2DN penalty to social tests with non-Destroyer Necrons.</p>',
            },
        ],
        wargearString:
            'Heavy plating, Gauss Cannon, Grav-platform',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Gauss Cannon' },
            { name: 'Grav-platform' },
        ],
    },
    {
        ...archetype('lotn', 6, 'Necrons', 'Lychguard', 4, 'lotn/Necron'),
        ...costz(70, [ /* TODO */]),
        hint: 'The Royal Guard of the Necron Dynasties.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
            reqSkill(SKILLS.AWARENESS, 4),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Guardian Protocols',
                description:
                    '<p>The Lychguard may designate another &lt;Dynasty&gt; Necron as its Charge as a free action. ' +
                    'If the Lychguard is within 6m of its charge, it may make a DN 3 Agility test when the Charge is attacked or ' +
                    'would otherwise take damage from an outside source. If it succeeds on this test, the ' +
                    'Lychguard takes the place of its Charge as the target of the attack or effect. ' +
                    'If the effect would harm both the Lychguard and its charge, such as a weapon with the Blast trait, ' +
                    'the Lychguard takes the damage for both itself and its charge separately. ' +
                    'If the Lychguard loses wounds by taking damage for its charge, reduce any wounds lost by the Lychguard by ½ Rank.</p>',
            },
        ],
        wargearString:
            'Heavy plating, Warscythe, Dynastic Crest (symbol of authority)',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Warscythe' },
            { name: 'symbol of authority', variant: 'Dynastic Crest' },
        ],
    },
    {
        ...archetype('lotn', 7, 'Necrons', 'Triarch Praetorian', 4, 'lotn/Necron'),
        ...costz(70, [ /* TODO */]),
        hint: 'The law enforcing arm of the old triarch.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.SCHOLAR, 5),
            reqSkill(SKILLS.PERSUASION, 3),
        ],
        keywords: 'Necron, Triarch',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Codes of Combat',
                description:
                    '<p>A Triarch gains +Rank bonus dice to all Scholar tests to decide matters of Necrontyr law. ' +
                    'A Praetorian may make choose a single non-Necron elite or adversary-tier threat and make a DN 4 Scholar test as an action. ' +
                    'If successful, the Triarch may declare that threat Honorable or Dishonorable. ' +
                    'If it is Honorable, all Necrons within 12m gain +½ Rank to Weapon Skill tests against that threat. ' +
                    'If it is Dishonorable, all Necrons within 12m gain +½ Rank to Ballistic Skill tests against that target, ' +
                    'and certain tactics and cruelties may be permissible to use against it.</p>',
            },
        ],
        wargearString:
            'Heavy plating, Rod of Covenant, Crest of the Triarch (Symbol of Authority)',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Rod of Covenant' },
            { name: 'symbol of authority', variant: 'Crest of the Triarch' },
        ],
    },
    {
        ...archetype('lotn', 7, 'Necrons', 'Lord', 4, 'lotn/Necron'),
        ...costz(80, [ /* TODO */]),
        hint: 'The least of the many nobles that make up a Necron Dynasty.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 5),
            reqSkill(SKILLS.PERSUASION, 3),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'The Lord`s will',
                description:
                    '<p>A Lord may make a DN 4 Leadership test and designate a specific threat as a free ' +
                    'action at the beginning of each of its turns. If it is successful, ' +
                    'all other <Dynasty> Necrons within 12m that are not Lords or Overlords may reroll ' +
                    'up to Rank failed ED on damage rolls against that threat.</p>',
            },
        ],
        wargearString:
            'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority)',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Staff of Light' },
            { name: 'symbol of authority', variant: 'Dynastic Crest' },
        ],
    },
    {
        ...archetype('lotn', 8, 'Necrons', 'Cryptek', 4, 'lotn/Necron'),
        ...costz(75, [ /* TODO */]),
        hint: 'Techno-Wizards that dedicated their lives to understanding and working with the many Necron technologies.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.TECH, 5),
            reqSkill(SKILLS.SCHOLAR, 4),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Technomancer',
                description:
                    '<p>A Cryptek gains +½ Rank to Tech tests when working on any item with the Necron keyword. All Necrons within 6m of a Cryptek gain +1 to Defiance tests.</p>',
            },
        ],
        wargearString:
            'Staff of Light',
        wargear: [
            { name: 'Staff of Light' },
        ],
    },
    {
        ...archetype('lotn', 8, 'Necrons', 'Destroyer Lord', 5, 'lotn/Necron'),
        ...costz(95, [ /* TODO */]),
        hint: 'Of those that fall victim to the path of the Destroyer, few are seemingly as insane as the Destroyer Lords.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 5),
            reqSkill(SKILLS.PERSUASION, 4),
        ],
        keywords: 'Necron,[Dynasty]',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'United Hatred',
                description:
                    '<p>A Destroyer Lord may issue orders to Destroyers. The Destroyer Lord and all Destroyers within 12m may reroll up to ½ Rank ED on damage rolls when attacking organic targets.</p>',
            },
        ],
        wargearString:
            'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority), Phase Shifter, Grav-Platform',
        wargear: [
            { name: 'Heavy plating' },
            { name: 'Staff of light' },
            { name: 'symbol of authority', variant: 'Dynastic Crest' },
            { name: 'Phase Shifter' },
            { name: 'Grav-platform' },
        ],
    },
];

const paxRep = [
    archetype('pax', '-', 'Adeptus Administratum', 'Scribe', 1, 'Human', true),
    archetype('pax', '-', 'Adeptus Administratum', 'Ordinate', 2, 'Human', true),
    archetype('pax', '-', 'Adeptus Administratum', 'Sage', 3, 'Human', true),
    archetype('pax', '-', 'Adeptus Administratum', 'Prefect', 4, 'Human', true),
    {
        ...archetype('pax', 37, 'Adeptus Arbites', 'Arbitrator', 1, 'Human'),
        ...costz(10, [ /* TODO */]),
        hint: 'A guardian of imperial law, ruthless and implacable.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
        ],
        keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'The Face of the Law',
                snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. Add +Rank to Intimidation tests against any with the <Imperium> keywords.',
            },
        ],
        wargearString:
            'Carapace armor, ' +
            'bolt pistol or riot shield, ' +
            'shock maul, ' +
            'book of law, ' +
            'manacles, ' +
            'arbitrator ID, ' +
            'chrono, ' +
            'pack of lho-sticks or flask of amasec.',
        wargear: [
            { name: 'Carapace Armour' },
            {
                name: 'bolt pistol or riot shield',
                options: [
                    { name: 'Bolt Pistol' },
                    { name: 'Riot Shield' },
                ],
            },
            { name: 'Shock Maul' },
            { name: 'Book of Law' },
            { name: 'Manacles' },
            { name: 'Arbitrator ID' },
            { name: 'Chrono' },
            {
                name: 'pack of lho-sticks or flask of amasec',
                options: [
                    { name: 'Pack of loh-sticks' },
                    { name: 'flask of amasec' },
                ],
            },
        ],
    },
    {
        ...archetype('pax', 38, 'Adeptus Arbites', 'Proctor', 1, 'Human'),
        ...costz(30, [ /* TODO */]),
        hint: 'An unrelenting warrior, adept at tracking down the most recalcitrant recidivist.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 3),
        ],
        keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Imperial Authority',
                snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +½ Rank to Resolve and Corruption Tests, and add +Rank to Intimidation tests against any with the <Imperium> keyword.',
            },
        ],
        wargearString:
            'Carapace armor, ' +
            'combat shotgun or boltgun or riot shield, ' +
            'power maul, ' +
            'book of law, ' +
            'manacles, ' +
            'arbitrator ID, ' +
            'chrono, ' +
            'pack of lho-sticks or flask of amasec',
        wargear: [
            { name: 'Carapace Armour' },
            {
                name: 'combat shotgun or boltgun or riot shield',
                options: [
                    { name: 'Combat Shotgun' },
                    { name: 'Boltgun' },
                    { name: 'Riot Shield' },
                ],
            },
            { name: 'Power Maul' },
            { name: 'Book of Law' },
            { name: 'Manacles' },
            { name: 'Arbitrator ID' },
            { name: 'Chrono' },
            {
                name: 'pack of lho-sticks or flask of amasec',
                options: [
                    { name: 'Pack of loh-sticks' },
                    { name: 'flask of amasec' },
                ],
            },
        ],
    },
    {
        ...archetype('pax', 38, 'Adeptus Arbites', 'Mortiurge', 3, 'Human'),
        ...costz(50, [ /* TODO */]),
        hint: 'Little more than judicially recognized assassins',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.STEALTH, 2),
        ],
        keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'Last Killer Standing',
                snippet: 'Veteran of a hundred gun battles, summary executions and black operations, a Mortiurge has learned to stay alive regardless of the odds when the bullets and las-bolts fly by, using them environment to their best advantage. They are immune to pinning from personal small arms excluding weapons with the Heavy (x) trait. Additionally, they add +1 to the defensive value of any cover except when ambushed in combat.',
            },
        ],
        wargearString:
            'Bolt pistol or needle pistol, ' +
            'sniper rifle or needle rifle, ' +
            'arbites carapace armor, ' +
            'arbitrator ID (Symbol of Authority), ' +
            'abridged copy of the Lex Imperialis.',
        wargear: [
            {
                name: 'Bolt pistol or needle pistol',
                options: [
                    { name: 'Bolt Pistol' },
                    { name: 'Needle Pistol' },
                ],
            },
            {
                name: 'Sniper Rifle or Needle Rifle',
                options: [
                    { name: 'Sniper Rifle' },
                    { name: 'Needle Rifle' },
                ],
            },
            { name: 'Arbites Carapace' },
            { name: 'Symbol of Authority', variant: 'Arbitrator ID' },
            { name: 'abridged copy of the Lex Imperialis' },
        ],
    },
    {
        ...archetype('pax', 39, 'Adeptus Arbites', 'Marshal', 3, 'Human'),
        ...costz(60, [ /* TODO */]),
        hint: 'A fearsome commander, championing the righteous Imperial law.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 4),
        ],
        keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'The Thin Black Line',
                snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +½ Rank to Corruption Tests and add +Rank to Intimidation and Resolve tests against any with the <Imperium> keywords.',
            },
            {
                name: 'Psi-Marshal',
                snippet: 'Arbites Psi-Marshals are rare solitary figures, held at bay by their own men as much as the citizenry. Each precinct-house will have a single Psi-Marshal assigned under ideal conditions to lend their unique talents to the Arbites law-enforcement efforts. Adeptus Arbites Marshals who ascend with the Psychic Revelations package gain access to the Judicium psychic discipline.',
            },
        ],
        wargearString:
            'Carapace armor, ' +
            'combat shotgun or bolt pistol, ' +
            'power maul, ' +
            'book of law, ' +
            'manacles, ' +
            'cyber-mastiff, ' +
            'arbitrator ID, ' +
            'chrono, ' +
            'pack of lho-sticks or flask of amasec',
        wargear: [
            { name: 'Carapace Armour' },
            {
                name: 'combat shotgun or Bolt Pistol',
                options: [
                    { name: 'Combat Shotgun' },
                    { name: 'Bolt Pistol' },
                ],
            },
            { name: 'Power Maul' },
            { name: 'Book of Law' },
            { name: 'Manacles' },
            { name: 'Cyber-mastiff' },
            { name: 'Arbitrator ID' },
            { name: 'Chrono' },
            {
                name: 'pack of lho-sticks or flask of amasec',
                options: [
                    { name: 'Pack of loh-sticks' },
                    { name: 'flask of amasec' },
                ],
            },
        ],
    },
    {
        ...archetype('pax', 40, 'Adeptus Arbites', 'Judge', 4, 'Human'),
        ...costz(80, [ /* TODO */]),
        hint: 'A lord of justice, inspiring both dread and respect in great measure.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 5),
        ],
        keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'Hammer of Heretics',
                snippet: 'The character is the very embodiment of imperial law and retribution, striking fear to recidivists and heretics alike.. Add +Rank to Intimidation, Resolve, and Corruption tests against any with the <Imperium> and <Chaos> keywords.',
            },
        ],
        wargearString:
            'Judge carapace armor, ' +
            'combat shotgun or bolt gun, ' +
            'bolt pistol, ' +
            'power maul or shock maul, ' +
            'book of law, ' +
            'manacles, ' +
            'cyber-mastiff, ' +
            'grapplehawk or patrol bike, ' +
            'arbitrator ID, ' +
            'chrono, ' +
            'pack of lho-sticks or flask of amasec.',
        wargear: [
            { name: 'Judge Carapace Armour' },
            {
                name: 'combat shotgun or Boltgun',
                options: [
                    { name: 'Combat Shotgun' },
                    { name: 'Boltgun' },
                ],
            },
            {
                name: 'Power Maul or Shock Maul',
                options: [
                    { name: 'Power Mail' },
                    { name: 'Shock Maul' },
                ],
            },
            { name: 'Book of Law' },
            { name: 'Manacles' },
            {
                name: 'Grapplehawk or Patrol Bike',
                options: [
                    { name: 'Grapplehawk' },
                    { name: 'Ptarol Bike' },
                ]
            },
            { name: 'Cyber-mastiff' },
            { name: 'Arbitrator ID' },
            { name: 'Chrono' },
            {
                name: 'pack of lho-sticks or flask of amasec',
                options: [
                    { name: 'Pack of loh-sticks' },
                    { name: 'flask of amasec' },
                ],
            },
        ],
    },
    archetype('pax', '-', 'Adeptus Ministorum', 'Cleric', 1, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Confessor', 1, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Deacon', 1, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Preacher', 1, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Banisher', 2, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Exorcist', 2, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Missionary', 2, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Saint', 2, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Cardinal', 3, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Crusader', 3, 'Human', true),
    archetype('pax', '-', 'Adeptus Ministorum', 'Heirophant', 4, 'Human', true),
    archetype('pax', '-', 'Astrophathicus Choirs', 'Astropathicus Envoy', 1, 'Human', true),
    archetype('pax', '-', 'Astrophathicus Choirs', 'Black Sentinel', 1, 'Human', true),
    archetype('pax', '-', 'Astrophathicus Choirs', 'Astropath', 2, 'Human', true),
    archetype('pax', '-', 'Astrophathicus Choirs', 'Choirmaster', 3, 'Human', true),
    archetype('pax', '-', 'Astrophathicus Choirs', 'Astropath Transcendent', 4, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Acquisitionist', 1, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Guilder', 1, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Chartist Captain', 2, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Executioner', 2, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Seneschal', 2, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Servo-Master', 2, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Tech-Thrall', 2, 'Human', true),
    archetype('pax', '-', 'Commercia Imperialis', 'Merchant Magnate', 3, 'Human', true),
    archetype('pax', '-', 'Highborn', 'Noble Scion', 1, 'Human', true),
    archetype('pax', '-', 'Highborn', 'Politico', 1, 'Human', true),
    archetype('pax', '-', 'Highborn', 'Noble Lord', 2, 'Human', true),
    archetype('pax', '-', 'Highborn', 'Sprye Hunter', 3, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Blooodsworn', 1, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Bounty Hunter', 1, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Freelancer', 1, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Oathsworn Bodyguard', 2, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Veteran Guardsman', 2, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'Arch-Militant', 3, 'Human', true),
    archetype('pax', '-', 'Hired Guns', 'ArchGunslinger', 3, 'Human', true),
    {
        ...archetype('pax', 116, 'Hive Ganger', 'Juve', 1, 'Human'),
        ...costz(0, [ /* TODO */]),
        hint: 'An inexperienced youth, eager for chance to prove themselves.',
        prerequisites: [],
        prerequisiteText: 'The respective <Gang> Skill at (1).',
        keywords: 'Imperium,Scum,[Gang],Outcast',
        influence: -1,
        archetypeFeatures: [
            {
                name: 'Eager to kill',
                snippet: 'Once per combat, a Juve can add +Rank to a single Action. They also gain a +½ Rank bonus to Resolve tests in combat.',
            },
        ],
        wargearString:
            'Hive leathers or outlandish attire, ' +
            'stubber, ' +
            'knife or brass knuckles, ' +
            '3 doses of narcotics or graphic memento, ' +
            'lho-sticks, ' +
            'gang trappings.',
        wargear: [
            {
                name: 'Hive leathers or outlandish attire',
                options: [
                    { name: 'Hive leathers' },
                    { name: 'outlandish attire' },
                ],
            },
            { name: 'Stubber' },
            {
                name: 'knife or brass knuckles',
                options: [
                    { name: 'Knife' },
                    { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
                ],
            },
            {
                name: '3 doses of narcotics or graphic memento',
                options: [
                    { name: 'doses of narcotics', amount: 3 },
                    { name: 'graphic memento' },
                ],
            },
            { name: 'lho-sticks' },
            { name: 'Trappings', variant: 'Gang Trappings' },
        ],
    },
    {
        ...archetype('pax', 117, 'Hive Ganger', 'Ganger', 1, 'Human'),
        ...costz(10, [ /* TODO */]),
        hint: 'Competent and trusted fighters, accustomed to brutality and violence.',
        prerequisites: [
            reqSkill(SKILLS.CUNNING, 1),
        ],
        prerequisiteText: 'The respective <Gang> Skill at (3).',
        keywords: 'Imperium,Scum,[Gang],Outcast',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Hab-wise',
                snippet: 'Gangers are accustomed to the deadly environs of the underhives. They gain +Rank to Cunning and Insight tests when interacting with underworld or similar characters.',
            },
        ],
        wargearString:
            'Hive leathers or outlandish attire, ' +
            'stubber, autogun or combat shotgun, ' +
            'knife or brass knuckles, ' +
            'flask of amasec or 3 doses of narcotics, ' +
            'lho-sticks, ' +
            'charm (graphic memento), ' +
            'gang trappings',
        wargear: [
            {
                name: 'Hive leathers or outlandish attire',
                options: [
                    { name: 'Hive leathers' },
                    { name: 'outlandish attire' },
                ],
            },
            {
                name: 'stubber, autogun or combat shotgun',
                options: [
                    { name: 'Stubber' },
                    { name: 'Autogun' },
                    { name: 'Combat Shotgun' },
                ],
            },
            {
                name: 'knife or brass knuckles',
                options: [
                    { name: 'Knife' },
                    { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
                ],
            },
            {
                name: 'flask of amasec or 3 doses of narcotics',
                options: [
                    { name: 'Flask of amasec' },
                    { name: 'doses of narcotics', amount: 3 },
                ],
            },
            { name: 'lho-sticks' },
            { name: 'charm', variant: 'graphic memento' },
            { name: 'Trappings', variant: 'Gang Trappings' },
        ],
    },
    {
        ...archetype('pax', 118, 'Hive Ganger', 'Heavy', 1, 'Human'),
        ...costz(20, [ /* TODO */]),
        hint: 'A strong warrior, bigger and burlier than ordinary gangers.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
        ],
        prerequisiteText: 'The respective <Gang> Skill at (1).',
        keywords: 'Imperium,Scum,[Gang],Outcast',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Pure muscle',
                snippet: 'Heavies are capable of shouldering many weapons other gangers find difficult to wield properly. They gain +Rank when determining their Strength for the Heavy weapon trait. Additionally, they gain +½ Rank damage to their melee attacks.',
            },
        ],
        wargearString:
            'Hive leathers or flak armor, heavy stubber or chainaxe, knife, lho-sticks, charm (graphic memento) or dog, gang trappings.',
        wargear: [
            {
                name: 'Hive leathers or outlandish attire',
                options: [
                    { name: 'Hive leathers' },
                    { name: 'outlandish attire' },
                ],
            },
            {
                name: 'stubber, knife or brass knuckles',
                options: [
                    { name: 'Stubber' },
                    { name: 'Knife' },
                    { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
                ],
            },
            {
                name: '3 doses of narcotics or graphic memento',
                options: [
                    { name: 'doses of narcotics', amount: 3 },
                    { name: 'graphic memento' },
                ],
            },
            { name: 'lho-sticks' },
            { name: 'Trappings', variant: 'Gang Trappings' },
        ],
    },
    {
        ...archetype('pax', 118, 'Hive Ganger', 'Gang Leader', 2, 'Human'),
        ...costz(30, [ /* TODO */]),
        hint: 'A terrifying leader, leading by strength and will',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
        ],
        prerequisiteText: 'The respective <Gang> Skill at (4).',
        keywords: 'Imperium,Scum,[Gang],Outcast',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Bigger and badder',
                snippet: 'The gang leaders are often the biggest (next to the heavies) and the baddest member of his crew. The gang leader gains +Rank bonus to his Gang Skill. During a combat, he also gains +½ Rank bonus to his Resolve tests',
            },
        ],
        wargearString:
            'Outlandish garb or attire, ' +
            'flak armor or carapace armor, ' +
            'chainsword, bolt pistol or plasma pistol, ' +
            'charm (grisly trophies) or dog, ' +
            'stimm-injector, ' +
            'lho sticks, ' +
            'gang trappings.',
        wargear: [
            {
                name: 'Outlandish garb or outlandish attire',
                options: [
                    { name: 'Outlandish garb' },
                    { name: 'outlandish attire' },
                ],
            },
            {
                name: 'flak armor or carapace armor',
                options: [
                    { name: 'Flak Armour' },
                    { name: 'Carapace Armour' },
                ],
            },
            {
                name: 'chainsword, bolt pistol or plasma pistol',
                options: [
                    { name: 'Chainsword' },
                    { name: 'Bolt Pistol' },
                    { name: 'Plasma Pistol' },
                ],
            },
            {
                name: 'charm (grisly trophies) or dog',
                options: [
                    { name: 'Charm', variant: 'Grisly Thropies)' },
                    { name: 'Dog' },
                ],
            },
            { name: 'Stimm-injector' },
            { name: 'Lho-sticks' },
            { name: 'Trappings', variant: 'Gang Trappings' },
        ],
    },
    archetype('pax', '-', 'Imperial Civilians', 'Scholar', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Artisan', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Chirurgeon', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Colonist', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Enforcer', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Menial', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Planetary Defender', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Bonded Emissary', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Civilians', 'Planetary Governor', 4, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Charlatan', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Convert', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Cultist', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Frateris Militia', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Penitent', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Crusader of Faith', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Cult Magus', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Death Cult Assassin', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Fanatic', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Redemptionist', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Cults', 'Demagoge', 3, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Rating', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Voidsman-At-Arms', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Midshipman', 1, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Junior Officer', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Warrant Officer', 2, 'Human', true),
    archetype('pax', '-', 'Imperial Navy', 'Senior Officer', 3, 'Human', true),
    archetype('pax', '-', 'Magistratum', 'Law-Wright', 1, 'Human', true),
    archetype('pax', '-', 'Magistratum', 'Offense-Barker', 1, 'Human', true),
    archetype('pax', '-', 'Magistratum', 'Magistrate', 2, 'Human', true),
    archetype('pax', '-', 'Magistratum', 'Sentencing Lord', 2, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Hive Twist', 1, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Mutant Outcast', 1, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Twist Hulk', 1, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Wyrd', 1, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Ghilliam', 2, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Psychic Abomination', 2, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Scavvy', 2, 'Human', true),
    archetype('pax', '-', 'Mutant Outcast', 'Hullghast', 3, 'Human', true),
    {
        ...archetype('pax', 195, 'Navis Nobility Houses', 'Navis Scion', 1, 'pax/Navigator'),
        ...costz(20, [/* TODO */]),
        stub: false,
        hint: 'A young navigator, groomed for diplomacy since birth.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.PERSUASION, 2),
            reqSkill(SKILLS.DECEPTION, 2),
        ],
        keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'Groomed from Birth',
                snippet: 'Navis Scions begin play without an initial mutation. Additionally, they gain a +½ Rank bonus to Persuasion skill tests.',
            },
        ],
        // new
        wargearString: 'Staff, Mesh Armour, nobilite robes, charm (silk headscarf), flask of amasec',
        wargear: [
            { name: 'Staff' },
            { name: 'Mesh Armour' },
            { name: 'Nobilite Robes' }, // possession
            { name: 'Charm', variant: 'Silk headscarf' }, // possession
            { name: 'Flask of amasec' }, // possession
        ],
    },
    {
        ...archetype('pax', '-', 'Navis Nobility Houses', 'Nobilite Emissary', 1, 'pax/Navigator'),
        ...costz(10, [/* TODO */]),
        stub: false,
        hint: 'A representative of the Navis Nobilite, empowered to enact the will of a houses Novators.',
        "species": [
            {
                "name": "Human",
                "key": "core-human",
                "sourceKey": "core"
            },
            {
                "name": "Navigator",
                "key": "pax-navigator",
                "sourceKey": "pax"
            },
        ],
        prerequisites: [
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.INTIMIDATION, 1),
            reqSkill(SKILLS.PERSUASION, 1),
            reqSkill(SKILLS.DECEPTION, 1),
        ],
        keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
        influence: 1,
        archetypeFeatures: [
            {
                name: 'House Operative',
                snippet: 'A Nobilite Emissary gains +Rank to opposed skill tests to resist the effects of seduction and interrogation. In addition, the Nobilite Emissary character may utilize an interrogator’s questions and techniques to garner detailed information about the nature, aims, and motivations of the interrogator himself and those he works for. If the Nobilite Emissary is subjected to interrogation, and wins an opposed test, he may immediately make an Awareness Test (DN 4). On a success and for every shifted icon, he can learn one detail about his captors (what he can and cannot learn is ultimately up to the GM but it should be something valuable).',
            },
        ],
        wargearString: 'Laspistol, staff, nobilite robes or imperial robes, charm (silk headscarf) or micro-bead, gene-coded slate monitron.',
        wargear: [
            { name: 'Laspistol' },
            { name: 'Staff' },
            {
                name: 'Nobilite Robes or Imperial Robes',
                options: [
                    { name: 'Nobilite Robes' },
                    { name: 'Imperial Robes' },
                ],
            },
            {
                name: 'Charm or micro-bead',
                options: [
                    { name: 'Charm', variant: 'Silk headscarf' }, // possession
                    { name: 'Micro-bead' },
                ],
            },
            { name: 'gene-coded slate monitron' }, // possession
        ],
    },
    {
        ...archetype('pax', '-', 'Navis Nobility Houses', 'Navigator Primaris', 2, 'pax/Navigator'),
        ...costz(30, [ /* TODO */]),
        stub: false,
        hint: 'A warp guide, tasked with the sacred charge of guiding voidships through the immaterium.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.PERSUASION, 2),
        ],
        keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
        influence: 2,
        archetypeFeatures: [
            {
                name: 'Warp Guide',
                snippet: 'The Navigator Primaris gains +Rank bonus dice to Pilot skill tests when steering a voidship through the Warp. Additionally, he gains +½ Rank to Conviction tests.',
            },
        ],
        wargearString:
            'Dueling Laspistol or hand cannon, staff, Mesh Armour, emperor’s tarot deck, nobilite robes, ' +
            'charm (silk headscarf), charm (navis occulta), micro-bead.',
        wargear: [
            {
                name: 'Dueling Laspistol or hand cannon',
                options: [
                    { name: 'Dueling Laspistol' },
                    { name: 'Hand Cannon' },
                ],
            },
            { name: 'Staff' },
            { name: 'Mesh Armour' },
            { name: 'Emperor`s tarot deck' },
            { name: 'Nobilite Robes' },
            { name: 'Charm', variant: 'Silk headscarf' }, // possession
            { name: 'Charm', variant: 'Navis Occulta' }, // possession
            { name: 'Micro-bead' },
        ],
    },
    {
        ...archetype('pax', '-', 'Navis Nobility Houses', 'Novator', 3, 'pax/Navigator'),
        ...costz(40, [/* TODO */]),
        stub: false,
        hint: 'An elder navigator who directs the interests of their house.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 6),
            reqSkill(SKILLS.PILOT, 5),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.PERSUASION, 3),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INTIMIDATION, 3),
            reqSkill(SKILLS.INSIGHT, 3),
        ],
        keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'Exalted Lineage',
                snippet: 'As the head of a family of the most ancient and powerful houses of the Imperium, the Novator is able to utilize his prestige among the nobility of the Imperium. The Novator may call upon his lineage in social situations and gains +Rank bonus to any Interaction Skill tests when dealing with characters with both the <Nobility> and <Imperium> keywords',
            },
        ],
        wargearString:
            'Digi-weapon or infernal pistol, staff, Mesh Armour, emperor’s tarot deck, ' +
            'charm (silk headscarf), nobilite robes, devoted attendant or mono-tasked servo-skull, ' +
            'choice of augmetic',
        wargear: [
            {
                name: 'Digi-Weapon or Infernal Pistol',
                options: [
                    { name: 'Digi Weapon' },
                    { name: 'Inferno Pistol' },
                ],
            },
            { name: 'Staff' },
            { name: 'Mesh Armour' },
            { name: 'Emperor`s tarot deck' },
            { name: 'Nobilite Robes' },
            { name: 'Charm', variant: 'Silk headscarf' }, // possession
            {
                name: 'devoted attendant or mono-tasked servo-skull',
                options: [
                    { name: 'Devoted Attendant' },
                    { name: 'mono-tasked servo-skull' },
                ],
            },
            { name: 'Choice of Augmetic' },
        ],
    },
    {
        ...archetype('pax', '-', 'Navis Nobility Houses', 'Heir-Apparent', 4, 'pax/Navigator'),
        ...costz(50, [/* TODO */]),
        stub: false,
        hint: 'The strongest navigators, primed to become the next paternova.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 7),
            reqSkill(SKILLS.PERSUASION, 5),
            reqSkill(SKILLS.PILOT, 4),
            reqSkill(SKILLS.INTIMIDATION, 4),
            reqSkill(SKILLS.LEADERSHIP, 4),
        ],
        keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
        influence: 3,
        archetypeFeatures: [
            {
                name: 'The Call of the Paternova',
                snippet: 'As Heir-Apparents are inexorably drawn to each, their power waxes in preparation of contending to become the next Paternova. Heir-Apparents gains a chosen Navigator Mutation with each Rank and also gain +Rank when utilizing his Lidless Stare power.',
            },
        ],
        wargearString:
            'Hotshot laspistol or hand cannon, staff, Mesh Armour or carapace Armour, emperor’s tarot deck, ' +
            'nobilite robes, charm (silk headscarf), micro-bead',
        wargear: [
            {
                name: 'Hotshot laspistol or hand cannon',
                options: [
                    { name: 'Hotshot Laspistol' },
                    { name: 'Hand Cannon' },
                ],
            },
            { name: 'Staff' },
            {
                name: 'Mesh Armour or Carapace',
                options: [
                    { name: 'Mesh Armour' },
                    { name: 'Carapace Armour' },
                ],
            },
            { name: 'Emperor`s tarot deck' },
            { name: 'Nobilite Robes' },
            { name: 'Charm', variant: 'Silk headscarf' }, // possession
            { name: 'Micro-bead' },
        ],
    },
    archetype('pax', '-', 'Questoris Famila', 'Bannerman', 1, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Boundsman', 1, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Drover', 1, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Serfitor', 1, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Knight Scion', 2, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Sacristan', 2, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Freeblade', 3, 'Human', true),
    archetype('pax', '-', 'Questoris Famila', 'Knight Baron', 4, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Household Trooper', 1, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Rejuvenat Adept', 2, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Child of Destiny', 2, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Companion', 2, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Rogue Trader', 3, 'Human', true),
    archetype('pax', '-', 'Rogue Trader Fleets', 'Legendary Trader', 4, 'Human', true),
    archetype('pax', '-', 'Schola Progenium', 'Explicator-Progenii', 1, 'Human', true),
    archetype('pax', '-', 'Schola Progenium', 'Progena', 1, 'Human', true),
    archetype('pax', '-', 'Schola Progenium', 'Truant', 1, 'Human', true),
    archetype('pax', '-', 'Schola Progenium', 'Drill-Abbot', 2, 'Human', true),
    archetype('pax', '-', 'Scum', 'Scapegrace', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Scavenger', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Stubjack', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Performancer', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Verminspeaker', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Witch', 1, 'Human', true),
    archetype('pax', '-', 'Scum', 'Reclaimator', 2, 'Human', true),
    archetype('pax', '-', 'Scum', 'Desperado', 3, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Dreg', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Fixer', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Malifixer', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Skulker', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Smuggler', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Thug', 1, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Cold Trader', 2, 'Human', true),
    archetype('pax', '-', 'Underworld Syndicates', 'Crime Lord', 2, 'Human', true),
    {
        ...archetype('pax', '-', 'Untouchables', 'Blank', 1, 'pax/Untouchable'),
        ...costz(0, [ /* TODO */ ]),
        stub: false,
        hint: 'An untouchable, whose aura of ‘wrongness’ sets them apart from his fellow man.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.SURVIVAL, 2),
        ],
        keywords: 'Imperium,Untouchable',
        influence: -1,
        archetypeFeatures: [
            {
                name: 'Social Pariah',
                snippet: 'You obtain the Lower Class or Outcast Keyword',
                selected: '',
                options: [
                    { name: 'Lower Class', keywords: [ 'Lower Class' ] },
                    { name: 'Outcast', keywords: [ 'Outcast' ] },
                ],
            },
            {
                name: 'Soulless Aura',
                snippet: 'All Characters within the Untouchables Willpower x ½ Rank meters suffer a +Rank DN increase to all Social skill test. Characters with the [Eldar] or [Psyker] keyword suffer a single point of Shock for every Round they remain within this area of effect.',
                description:
                    '<p>The Many feel the Untouchable’s unnatural essence as a subconscious irritation. ' +
                    'Those unused to this often find their emotional stability irritated to distraction ' +
                    'from his mere presence. Characters within a distance of meters equal to the ' +
                    'Untouchables Willpower x ½ Rank suffer a +Rank increase to all Social skill test Difficulty Numbers.</p>' +
                    '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer a single point of Shock for every Round they remain within this area of effect.</p>'
            },
        ],
        wargear: [
            {
                name: 'Rag-robes, uniform or street clothes',
                options: [
                    { name: 'Rag-Robes' },
                    { name: 'Uniform' },
                    { name: 'Street Clothes' },
                ],
            },
            {
                name: 'sword or mace or autogun',
                options: [
                    { name: 'Sword' },
                    { name: 'Mace' },
                    { name: 'Autogun' },
                ],
            },
            {
                name: 'null-limiter or Flak Armour',
                options: [
                    { name: 'Null-Limiter' },
                    { name: 'Flak Armour' },
                ],
            },
        ],
    },
    {
        ...archetype('pax', '-', 'Untouchables', 'Null', 2, 'pax/Untouchable'),
        ...costz(20, [ /* TODO */ ]),
        stub: false,
        hint: 'A more unnatural untouchable, whose presence can harm the psychically gifted and ward of the daemonic.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SURVIVAL, 2),
        ],
        keywords: 'Imperium,Untouchable',
        influence: -2,
        archetypeFeatures: [
            {
                name: 'Social Pariah',
                snippet: 'You obtain the Lower Class or Outcast Keyword',
                selected: '',
                options: [
                    { name: 'Lower Class', keywords: [ 'Lower Class' ] },
                    { name: 'Outcast', keywords: [ 'Outcast' ] },
                ],
            },
            {
                name: 'Null-Field',
                snippet: '',
                description:
                    '<p>Untouchables of greater power present a stronger aversion to the Immaterium, encompassing a wider area surrounding them. In this region, psykers see their powers fail and despair, knowing an Untouchable is nearby. The characters Psychic Null traits extend outwards, protecting a number of allies equal to his Rank who are nearby, no further than a distance in meters equal to his Passive Awareness +½ Rank. Characters with the [Eldar] or [Psyker] keyword suffer ½ Rank points of Shock for every Round they remain within this area of effect.</p>'
            },
        ],
        // Rag-robes, uniform or street clothes, trade tools, laspistol or autopistol, null-limiter or Flak Armour.
        wargear: [
            {
                name: 'Rag-robes, uniform or street clothes',
                options: [
                    { name: 'Rag-Robes' },
                    { name: 'Uniform' },
                    { name: 'Street Clothes' },
                ],
            },
            { name: 'trade tools' },
            {
                name: 'laspistol or autopistol',
                options: [
                    { name: 'Laspistol' },
                    { name: 'Autopistol' },
                ],
            },
            {
                name: 'null-limiter or Flak Armour',
                options: [
                    { name: 'Null-Limiter' },
                    { name: 'Flak Armour' },
                ],
            },
        ],
    },
    {
        ...archetype('pax', '-', 'Untouchables', 'Pariah', 3, 'pax/Untouchable'),
        ...costz(50, [ /* TODO */ ]),
        stub: false,
        hint: 'A particularly powerful untouchable, whose aura is palpable and capable of disrupting the strongest of psychic manifestations.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.SURVIVAL, 3),
        ],
        keywords: 'Imperium,Untouchable',
        influence: -3,
        archetypeFeatures: [
            {
                name: 'Social Pariah',
                snippet: 'You obtain the Lower Class or Outcast Keyword',
                selected: '',
                options: [
                    { name: 'Lower Class', keywords: [ 'Lower Class' ] },
                    { name: 'Outcast', keywords: [ 'Outcast' ] },
                ],
            },
            {
                name: 'Bane of the Immaterium',
                snippet:
                    '[Psyker]s within Willpower x ½ Rank suffer + Rank DN to manifest Powers. ' +
                    '[Eldar] and [Psyker]s in range also suffer Rank points of shock each round. ' +
                    'The Character is healed by an equal amount shock that is suffered. ' +
                    'Also, [Deamonic]s within range suffer +½ Rank DN to Skill Tests.',
                description:
                    '<p>The abyss where the Untouchable’s soul should be is unrelenting in its psychic hemorrhage, ' +
                    'and increases the anathema he projects into larger areas. ' +
                    'Psykers can suddenly find themselves diminished as an Untouchable charges forward, ' +
                    'emanating a wavefront they find terrible to contemplate. All character with the &lt;Psyker&gt; ' +
                    'keyword increase the DN to manifest their powers by +Rank while they remain within a ' +
                    'distance from the untouchable equal to his Willpower x ½ Rank.</p>' +
                    '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer Rank points of Shock for ' +
                    'every Round they remain within this area of effect, which automatically ' +
                    'heal any Shock the Untouchable may have incurred with an equal amount. ' +
                    'Additionally, creatures with the &lt;Daemonic&gt; keyword suffer a penalty to all skill tests ' +
                    'equal to the Untouchables ½ Rank within the same area of effect.</p>',
            },
        ],
        // Flak or Mesh Armour or symbol of inquisitorial authority, boltgun or bolt pistol and Chainsword, null-limiter
        wargear: [
            {
                name: 'Flak or Mesh Armour or symbol of inquisitorial authority',
                options: [
                    { name: 'Flak Armour' },
                    { name: 'Mesh Armour' },
                    { name: 'Symbol of Authority' },
                ],
            },
            {
                name: 'Boltgun or bolt pistol and Chainsword',
                options: [
                    { name: 'Boltgun' },
                    { name: 'Bolt Pistol and Chainsword' },
                ],
            },
            { name: 'Null-Limiter' },
        ],
    },
    archetype('pax', '-', 'Voidfarers', 'Dark-Holder', 1, 'Human', true),
    archetype('pax', '-', 'Voidfarers', 'Pilgrim', 1, 'Human', true),
    archetype('pax', '-', 'Voidfarers', 'Voidborn Clanner', 1, 'Human', true),
    archetype('pax', '-', 'Voidfarers', 'Void-Master', 2, 'Human', true),
    archetype('pax', '-', 'Void Pirates', 'Wolfpack Raiders', 1, 'Human', true),
    archetype('pax', '-', 'Void Pirates', 'Pirate Prince', 2, 'Human', true),
    archetype('pax', '-', 'Void Pirates', 'Reaver', 2, 'Human', true),
    archetype('pax', '-', 'Void Pirates', 'Swashbuckler', 2, 'Human', true),
];

const sotahRep = [
    archetype('sotah', 4, 'Deathwatch', 'Blackshield', 4, 'Adeptus Astartes', true),
    archetype('sotah', 4, 'Deathwatch', 'Keeper', 5, 'Adeptus Astartes', true),
    archetype('sotah', 5, 'Deathwatch', 'Kill Marine', 4, 'Adeptus Astartes', true),
];

const thaotRep = [
    archetype('thaot', 4, 'Adeptus Astartes', 'Techmarin', 3, 'Adeptus Astartes', true),
];

const ambRep = [
    archetype('amb', 2, 'Astra Militarum', 'Weapon Specialist', 2, 'Human', true),
    archetype('amb', 3, 'Astra Militarum', 'Brawler', 2, 'Human', true),
    archetype('amb', 4, 'Astra Militarum', 'Scout', 2, 'Human', true),
    archetype('amb', 4, 'Astra Militarum', 'Sniper', 2, 'Human', true),
    archetype('amb', 5, 'Astra Militarum', 'Heavy Weapon Specialist', 2, 'Human', true),
    archetype('amb', 6, 'Astra Militarum', 'Bulwark',  2, 'coreab/Ogryn', true),
    archetype('amb', 6, 'Astra Militarum', 'Field Medicae', 2, 'Human', true),
];

const goheRep = [
    {
        ...archetype('gohe',2,'Tau Empire','Kroot Shaper',2,'fspg/Kroot'),
        ...costz(44,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
        ]),
        hint: 'Shepherd of Cannibals',
        factionKey: 'fspg-tau-empire',
        keywords: 'Kroot,Tau Empire,Xenos',
        archetypeFeatures: [
            {
                name: 'Guiding Hand',
                snippet: 'Kroot subordinates gain a Kroot mutation and you add +Rank to Leadership, Insight, Cunning, Deception and Medicae with KROOT.',
                description:
                    '<p>Any Kroot under the Shaper`s command gains a mutation from the list of Kroot Mutations (see FSPG), so long as they could have reasonable eaten the living creature required.</p>' +
                    '<p>Furthermore, the Shaper gains +Rank bonus dice to Leadership, Insight, Cunning, Deception, and Medicae tests when dealing with anyone with the KROOT Keayword.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 1, condition: 'when dealing with KROOT' },
                    { targetGroup: 'skills', targetValue: SKILLS.INSIGHT, modifier: 0, rank: 1, condition: 'when dealing with KROOT' },
                    { targetGroup: 'skills', targetValue: SKILLS.CUNNING, modifier: 0, rank: 1, condition: 'when dealing with KROOT' },
                    { targetGroup: 'skills', targetValue: SKILLS.DECEPTION, modifier: 0, rank: 1, condition: 'when dealing with KROOT' },
                    { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 0, rank: 1, condition: 'when dealing with KROOT' },
                ],
            },
        ],
        wargear: [
            { name: 'Pulse Rifle (Heathen Pattern)' },
            { name: 'Laud Hailer' },
            { name: 'Knife', variant: 'Ritual Knife' },
            { name: 'Medikit' },
        ],
        influence: 1,
        suggested: {
            attributes: [],
            skills: [],
            talents: [],
        },
        suggestedStats: [
            ...suggestedAttributes(3,2,3,2,2,1,1),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ],
    },
    {
        ...archetype('gohe',3,'Tau Empire','Kroot Master Shaper',3,'fspg/Kroot'),
        ...costz(149,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.PERSUASION, 1),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
        ]),
        hint: 'Lead the tribe',
        factionKey: 'fspg-tau-empire',
        keywords: 'Kroot,Tau Empire,Xenos,Psyker',
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You know the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.',
                description:
                    '<p>You know the Smite psychic power. You may purchase additional psychic powers from the Divination Discipline, following the rules in Chapter 11.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'Universal',
                    'Divination',
                ],
            },
            {
                name: 'Additional Mutation',
                snippet: 'You gain one additional mutation as your Tier usually allows.',
                selected: [''],
                options: [
                    {
                        name: 'Maneater (Strength)',
                        snippet: '+1 to your lowest Attribute (Strength).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
                    },
                    {
                        name: 'Maneater (Toughness)',
                        snippet: '+1 to your lowest Attribute (Toughness).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
                    },
                    {
                        name: 'Maneater (Agility)',
                        snippet: '+1 to your lowest Attribute (Agility).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
                    },
                    {
                        name: 'Maneater (Initiative)',
                        snippet: '+1 to your lowest Attribute (Initiative).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 1) ],
                    },
                    {
                        name: 'Maneater (Willpower)',
                        snippet: '+1 to your lowest Attribute (Willpower).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
                    },
                    {
                        name: 'Maneater (Intellect)',
                        snippet: '+1 to your lowest Attribute (Intellect).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 1) ],
                    },
                    {
                        name: 'Maneater (Fellowship)',
                        snippet: '+1 to your lowest Attribute (Fellowship).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 1) ],
                    },
                    {
                        name: 'Astartes Eater (Strength)',
                        snippet: '+2 to any Attribute (Strength).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Toughness)',
                        snippet: '+2 to any Attribute (Toughness).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Agility)',
                        snippet: '+2 to any Attribute (Agility).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Initiative)',
                        snippet: '+2 to any Attribute (Initiative).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Willpower)',
                        snippet: '+2 to any Attribute (Willpower).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Intellect)',
                        snippet: '+2 to any Attribute (Intellect).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Fellowship)',
                        snippet: '+2 to any Attribute (Fellowship).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 2) ],
                    },
                    {
                        name: 'Aeldari Eater (Agility)',
                        snippet: '+1 to Agility.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
                    },
                    {
                        name: 'Aeldari Eater (Willpower)',
                        snippet: '+1 to Willpower.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
                    },
                    {
                        name: 'Ork Eater (Strength)',
                        snippet: '+1 to Strength.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
                    },
                    {
                        name: 'Ork Eater (Toughness)',
                        snippet: '+1 to Toughness.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
                    },
                    {
                        name: 'Armoured Hide',
                        snippet: 'You gain +Rank to your Base Resilience.',
                        modifications: [ addModifier('traits', TRAITS.RESILIENCE, 0, 1) ],
                    },
                    {
                        name: 'Bioluminescence',
                        snippet: 'You may cause any part of your body to glow with light. If your entire body is emitting light, it sheds enough light to see in a 10m radius.',
                    },
                    {
                        name: 'Camouflage',
                        snippet: 'As a Simple Action you can control the appearance of your hide, with the same effects as a Cameleoline Cloak (core, pg. 237).',
                    },
                    {
                        name: 'Facultative Bipedalism',
                        snippet: 'You may Sprint twice as fast as normal and make Athletics (S) Tests to jump or climb with +Double Rank Bonus Dice.',
                        modifications: [ addModifier('skills', SKILLS.ATHLETICS, 0, 2, 'when jumping or climbing.') ],
                    },
                    {
                        name: 'Hypersensetive Quills',
                        snippet: 'Your quills act as an Auspex (core, pg. 236) with a range of 30m.',
                    },
                    {
                        name: 'Wings',
                        snippet: 'You can Fly at Speed 7',
                    },
                    {
                        name: 'Weaponised Biology',
                        snippet: '',
                        description: '<p>Your Unarmed Strikes deal (S)+4 Damage / +3 ED, and have one of the following Traits:</p>' +
                            '<ul>' +
                            '<li>Brutal</li>' +
                            '<li>Rending (Rank)</li>' +
                            '<li>Inflict (Poison (Rank))</li>' +
                            '<li>Parry</li>' +
                            '</ul>',
                    },
                ],
            },
        ],
        wargear: [
            { name: 'Force Axe' },
            { name: 'Cameleoline Cloak' },
            { name: 'Symbol of Authority' },
        ],
        influence: 1,
        suggested: {
            attributes: [],
            skills: [],
            talents: [ ],
        },
        suggestedStats: [
        ],
    },
    {
        ...archetype('gohe',6,'The Inquisition','Jokaero Weaponsmith',2,'gohe/Jokaero'),
        ...costz(110,[
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            reqSkill(SKILLS.TECH, 5),
            reqSkill(SKILLS.SCHOLAR, 3),
        ]),
        hint: 'Build the ... stuff?',
        keywords: 'Xenos,Jokaero,Inquisition',
        archetypeFeatures: [
            {
                name: 'Inconceivable Customizazion',
                snippet: '',
                description:
                    '<p>Once per regroup, you may customize one allies weapon using advanced and obscure Jokaero methods. When you do so, roll a D6 and consult the table below. The allies weapon retains this ability until the next regroup.</p>' +
                    '<ul>' +
                    '<li><strong>1-2 Targeting:</strong> Weapon gains +Rank dice when attacking</li>' +
                    '<li><strong>3-4 Penetration:</strong> Weapon can reroll Rank ED</li>' +
                    '<li><strong>5-6 Composition</strong> Weapon adds +Rank to AP</li>' +
                    '</ul>',
            },
        ],
        wargear: [
            { name: 'Jokaero Defense Orbs' },
            { name: 'Jokaero Scattershot' },
        ],
        influence: 0,
        suggested: {
            attributes: [],
            skills: [],
            talents: [ ],
        },
        suggestedStats: [
        ],
    },
];



export const rawArchetypeRepository = [
    ...core,/*
    ...voab,
    ...fspg,
    ...red2,
    ...aioe,
    ...afas,
    ...tnh,
    ...dod,
    ...aaoaRep,
    ...ltgbRep,
    ...aotgtRep,
    ...teaRep,
    ...hevaRep,
    ...goenRep,
    ...lotnRep,
    ...togRep,
    ...paxRep,
    ...sotahRep,
    ...thaotRep,
    ...ambRep,
    ...goheRep,*/
];

export const archetypeRepository: Archetype[] = ArchetypeRepositorySchema.parse(rawArchetypeRepository);

export default archetypeRepository;
