import {ATTRIBUTES, SKILLS, TRAITS} from "../../../db/static/_statUtils";
import {archetype, cost, costz, reqAttribute, reqSkill, suggestedAttributes, wargearz} from "../utils";

export const core = [
    {
        ...archetype('core',92,'Adeptus Ministorum','Ministorum Priest',1,'Human'),
        ...cost(12,0,12, 0, 0),
        hint: 'A zealous preacher of the Imperial Creed.',
        keywords: 'Imperium,Adeptus Ministorum',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Fiery Invective',
                snippet: 'You can preach the word of the Imperial Creed as a Free Action once per combat. You and all allies with the IMPERIUM keyword heal 1d3+Rank Shock.',
            },
        ],
        wargear: [
            { name: 'Chainsword' },
            { name: 'Laspistol' },
            { name: 'Rosarius' },
            { name: 'Knife' },
            { name: 'Clothing', variant: 'Ministorum Robes' },
            { name: 'Missionary Kit' },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-flagellant', 'core-in-his-name', 'core-repent-' ],
        },
        suggestedStats: [
            ...suggestedAttributes(1,2,2,2,3,2,3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INSIGHT, 1),
            reqSkill(SKILLS.INTIMIDATION, 1),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.SCHOLAR, 2),
        ],
    },
    {
        ...archetype('core', 102,'Adeptus Ministorum','Death Cult Assassin',2,'Human'),
        ...cost(36,10,26, 0, 0),
        hint: 'An agile killer, expressing worship through the art of death.',
        keywords: 'Imperium,Adeptus Ministorum',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Glancing Blow',
                snippet: 'Unless you are immobilised or restrained, you may roll Determination against Damage from attacks and against Mortal Wounds. You may use Agility instead Toughness for Determination when doing so.',
                description: '<p>You depend upon your swift movement and honed reflexes to avoid harm. You may use your Agility instead of your Toughness when you roll Determination against Damage from attacks, and may roll Determination against Mortal Wounds. You cannot use this ability if you are immobilised in some way, such as through the Restrained Condition.</p>',
            },
        ],
        wargear: wargearz('2 Death Cult Powerblade/Two Death Cult Powerblades, Bodyglove, Knife, Laspistol, 3 dose of Stimm'),
        influence: 1,
    },
    {
        ...archetype('core', 110,'Adeptus Ministorum','Crusader',3,'Human'),
        ...cost(54,20,34, 0, 0),
        hint: 'A holy warrior with unflagging devotion to the God-Emperor.',
        keywords: 'Imperium,Adeptus Ministorum',
        prerequisites: [
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        archetypeFeatures: [
            {
                name: 'Armour of Faith',
                snippet: 'You gain +Double Rank bonus dice to melee attack tests against targets with the CHAOS or HERETIC keyword. Your Resolve also increases by +Rank.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1 },
                ],
            },
        ],
        wargear: wargearz('Power Sword, Storm Shield, Carapace Armour, Clothing/Ministorum Robes'),
        influence: 1,
    },
    // Adepta Sororitas
    {
        ...archetype('core', 91,'Adepta Sororitas','Sister Hospitaller',1,'Human'),
        ...cost(24,0,24,0,0),
        hint: 'A pious healer dedicated to care of both body and soul.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.SCHOLAR, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Loyal Compassion',
                snippet: 'Add +Double Rank bonus dice for Medicae (Int) Test on an IMPERIUM character.',
                description: '<p>+Double Rank bonus dice whenever you make a Medicae (Int) Test on a character with the <strong>IMPERIUM</strong> Keyword</p>',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Chirurgeon\'s Tools' },
            { name: 'Chain Bayonet', variant: 'Chain Bayonet (wrist mounted)' },
            { name: 'Laspistol' },
            { name: 'Clothing', variant: 'Sororitas vestments' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
    },
    {
        ...archetype('core', 99,'Adepta Sororitas','Sister of Battle',2,'Human'),
        ...cost(64,10,54, 0, 0),
        hint: 'A determined warrior, filled with purity and faith.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Purity of Faith',
                snippet: 'You and any allies within 15 metres gain +Double Rank bonus dice to Corruption Tests. You gain +Double Rank bonus dice to any Test to resist the effects of a Psychic Power.',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Chaplet Ecclesiasticus' },
            {
                name: 'Either a boltgun OR a Chainsword and bolt pistol.',
                selected: 'Boltgun',
                options: [
                    { name: 'Boltgun' },
                    { name: 'Chainsword and Bolt Pistol' },
                ],
            },
            { name: 'Clothing', variant: 'Sororitas vestments' },
            { name: 'Writing Kit' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
        influence: 1,
    },
    // Adeptus Militarum
    {
        ...archetype('core', 93,'Astra Militarum','Imperial Guardsman',1,'Human'),
        ...cost(6,0,6, 0, 0),
        hint: 'A disciplined soldier, used to fighting amid multitudes',
        keywords: 'Imperium,Astra Militarum,[Regiment]',
        prerequisites: [
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Look Out, Sir!',
                snippet: 'Once per combat, as a Reflexive Action, move up to half your Speed to intercept an attack that hit an ally. You Resilience is increased by +Rank.',
                description: '<p>You have been drilled in sacrificing yourself to save your allies. Once per combat, you may take a Reflexive Action to move up to half your Speed to get in the way of any attack that hit an ally. The attacker then rolls against your Resilience instead of your ally’s, and may deal Wounds to you. Your Resilience increases by +Rank for the purpose of calculating damage.</p>'
                // TODO conditional modifier
            },
        ],
        wargear: wargearz('Flak Armour, Lasgun, Knife, Munitorum-Issue Mess Kit, Grooming kit, Uplifting Primer/A copy of the Imperial Infantryman’s Uplifting Primer, 3 ration packs'),
        suggestedStats: [
            ...suggestedAttributes(3,3,3,3,2,1,2),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SURVIVAL, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ],
    },
    {
        ...archetype('core', 103,'Astra Militarum','Tempestus Scion',2,'Human'),
        ...cost(52,10,42, 0, 0),
        hint: 'An elite, highly-trained soldier, used to undertaking special missions.',
        keywords: 'Imperium,Astra Militarum,Militarum Tempest',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.STEALTH, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Elite Soldier',
                snippet: 'You’re an expert in inflicting pain through the weapons of the Imperium. Whenever you spend Glory to increase damage when using a weapon with the ASTRA MILITARUM you can add +Rank to the final damage value.',
            },
        ],
        wargear: wargearz('Tempestus Carapace, Hot-Shot Lasgun, Grav-Chute, Knife, Munitorum-Issue Mess Kit, Uplifting Primer/a copy of the Imperial Infantryman’s Uplifting Primer, Slate Monitron, Monoscope, 3 ration packs'),
        influence: 1,
    },
    {
        ...archetype('core', 111,'Astra Militarum','Imperial Commissar',3,'Human'),
        ...costz(76,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A fearsome leader, inspiring both dread and respect in great measure.',
        keywords: 'Imperium,Astra Militarum,Officio Prefectus',
        archetypeFeatures: [
            {
                name: 'Fearsome Respect',
                snippet: 'You and any allies within 15 metres of you that can see you may add +Double Rank bonus dice to Resolve Tests. You add +Double Rank bonus dice to any Intimidation (Wil) Tests, including Interaction Attacks.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 2, condition: 'for You and allies within 15 metres' },
                    { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 2, condition: null },
                ],
            },
        ],
        wargear: wargearz('Bolt Pistol, Chainsword, Flak Coat, Munitorum-Issue Mess Kit, Blanket, Grooming Kit, Uplifting Primer, 3 ration packs'),
        influence: 3,
    },
    // Inquisition
    {
        ...archetype('core', 94,'The Inquisition','Inquisitorial Acolyte',1,'Human'),
        ...cost(6,0,6, 0, 0),
        hint: 'A representative of the Inquisition, adaptable and possessing great potential.',
        keywords: 'Imperium,Inquisition,[ANY],[ORDO]',
        prerequisitesSkillString: 'Increase a skill of your choice to 2.',
        archetypeFeatures: [
            {
                name: 'Inquisitorial Decree',
                snippet: 'You can invoke the name of your Inquisitor to gain +Rank bonus dice to any social Skill test when interacting with an individual with the IMPERIUM. You can only use this ability once per scene.',
            },
        ],
        wargearString: 'Flak Armour, Any two IMPERIUM weapons with a Value of 5 or less and a Rarity of Uncommon or lower, Symbol of Authority',
        wargear: [
            { name: 'Flak Armour' },
            {
                name: 'Any IMPERIUM weapon with a value 5 or less and up to Uncommon rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
                        rarityFilter: ['Common', 'Uncommon'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                        keywordFilter: 'Imperium',
                    },
                ],
            },
            {
                name: 'Any IMPERIUM weapon with a value 5 or less and up to Uncommon rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
                        rarityFilter: ['Common', 'Uncommon'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                        keywordFilter: 'Imperium',
                    },
                ],
            },
            { name: 'Symbol of Authority' },
        ],
    },
    {
        ...archetype('core', 95,'The Inquisition','Inquisitorial Sage',1,'Human'),
        ...cost(16,0,16, 0, 0),
        hint: 'A learned scholar and scribe, adept at navigating bureaucratic obstacles.',
        keywords: 'Adeptus Administratum,Imperium,Inquisition,[Ordo]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Administratum Records',
                snippet: 'You are particularly adept at navigating the Imperium’s colossal bureaucracy. You gain +Rank bonus dice whenever you make a Test to gather information from Imperial sources, typically on Influence or Investigation (Int) tests.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 0, rank: 1, condition: 'when gathering information from Imperial sources' },
                ],
            },
        ],
        wargear: wargearz('Clothing/Administratum Robes, Laspistol, Knife, Auto-Quill, Data-Slate, 3 Scroll of Ancient Records'),
        influence: 1,
    },
    {
        ...archetype('core', 104,'Rogue Trader Dynasties','Rogue Trader',2,'Human'),
        ...cost(36,10,26,0,0),
        hint: 'An adventuresome and influential explorer with their own space vessel.',
        keywords: 'Imperium,Rogue Trader,[Dynasty]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.CUNNING, 1),
            reqSkill(SKILLS.INSIGHT, 2),
            reqSkill(SKILLS.PERSUASION, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Warrant of Trade',
                snippet: 'You are a master of manipulating a situation to your advantage. You gain +Rank bonus dice to all Persuasion (Fel) Tests and Influence tests to acquire goods and services.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when acquiring goods and services.' },
                    { targetGroup: 'traits', targetValue: TRAITS.INFLUENCE, modifier: 0, rank: 1, condition: 'when acquiring goods and services.' },
                ],
            },
        ],
        wargearString: 'Imperial Frigate. Choose any two pieces of Wargear with a Value of your Tier +4 or less, and a Rarity of Rare or lower. Choose from any of the following options; Flak Coat or Carapace Armour or Light Power Armour.',
        wargear: [
            { name: 'Imperial Frigate' },
            {
                name: 'Wargear up to value Tier+4 and rarity Rare',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
                        rarityFilter: ['Uncommon', 'Common', 'Rare'],
                    },
                ],
            },
            {
                name: 'Wargear up to value Tier+4 and rarity Rare',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
                        rarityFilter: ['Uncommon', 'Common', 'Rare'],
                    },
                ],
            },
            {
                name: 'Choice of Flak Coat, carapace armour or Light Power Armour',
                options: [
                    { name: 'Flak Coat' },
                    { name: 'Carapace Armour' },
                    { name: 'Light Power Armour' },
                ],
            },
        ],
        influence: 2,
    },
    {
        ...archetype('core', 100,'Adeptus Astra Telephatica','Sanctioned Psyker',2,'Human'),
        ...cost(32, 10, 22, 0, 0),
        hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
        keywords: 'Imperium,Adeptus Astra Telepathica,Psyker,Scholastica Psykana',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.',
                description:
                    '<p>You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
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
            }
        ],
        wargear: wargearz('Laspistol, Force Stave, Psykana Mercy Blade, Munitorum-Issue Mess Kit, Blanket, Grooming kit, 2 ration packs'),
    },
    {
        ...archetype('core', 116,'The Inquisition','Inquisitor',4,'Human'),
        ...cost(110,30,80, 0, 0),
        hint: 'A bearer of profound Imperial authority, adept at discovering the truth in the shadows.',
        keywords: 'Imperium,Inquisition,[Ordo],[Any]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.CUNNING, 4),
            reqSkill(SKILLS.INSIGHT, 4),
        ],
        archetypeFeatures: [
            {
                name: 'Unchecked Authority',
                snippet: 'You have supreme authority to maintain the security of the Imperium. You gain +Double Rank bonus dice whenever you make a social Skill Test against a character with the IMPERIUM keyword.',
            },
        ],
        wargearString: 'Inquisitorial Rosette, Any two weapons with a Value of 7 or less and a Rarity of Very Rare or lower, Choose one of the following options: Flack Coat or Carapace Armour or Ignatus Power Armour or Light Power Armour',
        wargear: [
            { name: 'Inquisitorial Rosette' },
            {
                name: 'Any weapon with a value 7 or less and up to Very Rare rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                    },
                ],
            },
            {
                name: 'Any weapon with a value 7 or less and up to Very Rare rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                    },
                ],
            },
            {
                name: 'Choose one of the following options: Flack Coat or Carapace Armour or Ignatus Power Armour or Light Power Armour',
                options: [
                    { name: 'Flak Coat' },
                    { name: 'Carapace Armour' },
                    { name: 'Ignatus Power Armour' },
                    { name: 'Light Power Armour' },
                ],
            },
        ],
        influence: 4,
    },
    {
        ...archetype('core', 106,'Adeptus Astartes','Space Marine Scout',2,'Adeptus Astartes'),
        ...cost(170,10,160, 0, 0),
        hint: 'A stealthy warrior adept at reconnaissance.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        archetypeFeatures: [
            {
                name: 'Use the Terrain',
                snippet: 'You gain +Rank to any Stealth (A) Test when there is some form of terrain to hide behind.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.STEALTH, modifier: 0, rank: 1, condition: 'when there is some form of terrain to hide behind' },
                ],
            },
        ],
        wargear: [
            { name: 'Scout Armour' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Vox Bead' },
            {
                name: 'Choose any one of the following options; A Boltgun or A Bolt pistol and a Chainsword or An Astartes Shotgun or An Astartes Sniper Rifle and a Cameleoline Cloak',
                selected: 'Boltgun',
                options: [
                    { name: 'Boltgun' },
                    { name: 'Chainsword and Bolt Pistol' },
                    { name: 'Astartes Shotgun' },
                    { name: 'Astartes Sniper Rifle and Cameleoline Cloak' },
                ],
            },
        ],
        influence: 1,
    },
    {
        ...archetype('core', 113,'Adeptus Astartes','Tactical Space Marine',3,'Adeptus Astartes'),
        ...costz(257,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.LEADERSHIP, 1), // 12
            reqSkill(SKILLS.SCHOLAR, 1), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
        ]),
        hint: 'A versatile warrior, veteran of a hundred battles.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        alerts: [
            { type: 'info', text: 'The errata states the cost as 277 but this is probably an error. Thus, we use 272 XP as the cost.', },
        ],
        archetypeFeatures: [
            {
                name: 'Tactical Versatility',
                snippet: 'Your training has prepared you for any circumstance. When you make a Critical Hit you may roll twice on the Critical Hit Table and choose either result.',
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 2,
    },
    {
        ...archetype('core', 117,'Adeptus Astartes','Primaris Intercessor',4,'Primaris Astartes'),
        ...costz(300, [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 6),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A skilled and focused warrior, adept at bringing death at range.',
        keywords: 'Imperium, Adeptus Astartes, Primaris, [Chapter]',
        archetypeFeatures: [
            {
                name: 'Intercessor Focus',
                snippet: 'You gain +Double Rank bonus dice to any Ballistic Skill Tests to fire a ranged weapon with the PRIMARIS Keyword.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.BALLISTIC_SKILL, modifier: 0, rank: 2, condition: 'when firing a PRIMARIS weapon.' },
                ],
            },
        ],
        wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Bolt Rifle, Heavy Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 1,
    },
    // Adeptus Mechanicus
    {
        ...archetype('core', 101,'Adeptus Mechanicus','Skitarius',2,'Human'),
        ...cost(28,10,18, 0, 0),
        hint: 'A warrior of the Machine Cult, sturdy and reliable.',
        keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.TECH, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Heavily Augmented',
                snippet: 'Your body has been redesigned to withstand the rigours of war. You do not bleed (making you immune to the Bleeding) and gain +Rank bonus dice to Determination rolls.',
            },
        ],
        wargear: wargearz('Combi-Tool, Galvanic Rifle, Skitarii Auto-Cuirass'),
    },
    {
        ...archetype('core', 109,'Adeptus Mechanicus','Tech-Priest',3,'Human'),
        ...costz(44,[
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'A priest of the Omnissiah, able to commune with the machine-spirits.',
        keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Rite of Repair',
                snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
                ],
            },
        ],
        wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi-Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
        wargear: [
            { name: 'Omnissian Axe' },
            { name: 'Laspistol' },
            {
                name: 'One Mechandrite.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Implants'],
                        triptypeFilter: ['Mechadendrites'],
                    },
                ],
            },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            { name: 'Combi-Tool' },
            { name: 'Light Power Armour' },
            { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
        ],
        influence: 2,
    },
    // Scum
    {
        ...archetype('core', 96,'Scum','Ganger',1,'Human'),
        ...cost(2,0,2, 0, 0),
        hint: 'A resourceful and tenacious survivor from the depths of enormous industrial cities.',
        keywords: 'Scum,[Any]',
        prerequisites: [
            reqSkill(SKILLS.CUNNING, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Scrounger',
                snippet: 'You add +Rank dice to Cunning Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.',
                description:
                    '<p>Your life with less has made you adept at finding spares and supplies in the most unlikely of places. You gain +Rank bonus dice to Cunning (Fel) Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.CUNNING, modifier: 0, rank: 1, condition: null },
                ],
            },
        ],
        wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stubber',
        wargear: [
            {
                name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stubber.',
                selected: 'Autopistol',
                options: [
                    { name: 'Autopistol' },
                    { name: 'Laspistol' },
                    { name: 'Hand Cannon' },
                    { name: 'Stubber' },
                ],
            },
            {
                name: 'Choice of a Knife or a Sword.',
                selected: 'Knife',
                options: [
                    { name: 'Knife' },
                    { name: 'Sword' },
                ],
            },
            { name: 'Bedroll' },
            { name: 'Canteen' },
            { name: 'Clothing', variant: 'Gang Colours' },
        ],
        influence: 1,
    },
    {
        ...archetype('core', 105,'Scum','Scavvy',2,'Human'),
        ...cost(16,10,6, 0, 0),
        hint: 'A mutant—cast out and reviled—yet their mutations give them power.',
        keywords: 'Scum,[Any]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqSkill(SKILLS.SURVIVAL, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Mutant',
                snippet: 'You start with two mutations (pg. 287). Whenever your Rank increases, you may select another Mutation.',
                description: '<p>Your life in the unsanitary underbelly of the Imperium has mutated you. Select two Mutations from the list of Scavvy Mutations on p.287. Whenever your Rank increases, you may select another Mutation from the list.</p>',
                alerts: [
                    { type: 'warning', text: 'In case the mutation modifiers are not displayed correctly in the WEB or PRINT view, please clear and re-select your mutations.', },
                    { type: 'info', text: 'Only select the amount of mutations that you are allowed to.', },
                ],
                selected: ['', '', '', ''],
                options: [
                    {
                        name: 'Hint of Red Eye',
                        snippet: 'Add 1 dice to Awareness (Int) Tests. You suffer +1 DN to actions that require vision, while exposed to light.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 1, condition: null },
                        ],
                    },
                    {
                        name: 'Voice of the Aurelian',
                        snippet: 'Add +Rank dice to social tests. Psykers within 25m must reroll Wrath Dice without compolications.'
                    },
                    {
                        name: 'Living Shadow',
                        snippet: 'You are aware of any Ambush as if you had spend a Point of Glory. You suffer +1 DN to opposing psychic powers of its effect.'
                    },
                    {
                        name: 'Gossamer Flesh',
                        snippet: 'You gain +Double Rank dice to Awareness (Int) Tests involving touch. You Reduce Resistance and Max Shock by 1. You suffer +1 DN to resist painfull contact.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 0, rank: 2, condition: 'when involving touch' },
                            { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: -1 },
                            { targetGroup: 'traits', targetValue: TRAITS.MAX_SHOCK, modifier: -1 },
                        ],
                    },
                    {
                        name: 'Blightend Soul',
                        snippet: 'You add +1 dice to resist Poison. You and anyone within 10m suffer +1 DN to Corruption and Malignancy Tests.'
                    },
                    {
                        name: 'Wyrdling',
                        snippet: 'You gain the PSYKER Keyword. You gain one Minor Psychic Power (GM choice). If you already are a PSYKER, you gan one aditional Minow Psychic Power.'
                    },
                    {
                        name: 'Misshapen',
                        snippet: 'Increase your Resolve by 2. Reduce your Max Shock by 1.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 2 },
                            { targetGroup: 'traits', targetValue: TRAITS.MAX_SHOCK, modifier: -1 },
                        ],
                    },
                    {
                        name: 'Grotesque',
                        snippet: 'You add +1 die to Intimidation (Wil) Tests. You suffer +1 DN to (other) social interaction tests with non-CHAOS.',
                        modifications: [
                            { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 1 },
                        ],
                    },
                    {
                        name: 'Bestial Hide',
                        snippet: 'Increase your Resilience by 1. You add +1 dice to Intimidation (Wil) Tests. You suffer +2 DN to (other) social interaction tests with non-CHAOS.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: 1 },
                            { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 1 },
                        ],
                    },
                    {
                        name: 'Brute',
                        snippet: 'Increase your Strength and Toughness by 1. You suffer +1 DN to all tests involving Tools and Range Weapons, if they are not adjusted to your build.',
                        modifications: [
                            { targetGroup: 'attributes', targetValue: ATTRIBUTES.STRENGTH, modifier: 1 },
                            { targetGroup: 'attributes', targetValue: ATTRIBUTES.TOUGHNESS, modifier: 1 },
                        ],
                    },
                    {
                        name: 'Toxic Blood',
                        snippet: 'You are immune to Poisend and diseases. Any Medicae Test on you suffers +2 DN. On a Complication, the Medic must pass DN 4 Toughness or suffer one Mortal Wound.',
                    },
                    {
                        name: 'Withered',
                        snippet: 'Increase your Willpower by 2. Reduce your Toughness by 1.',
                        modifications: [
                            { targetGroup: 'attributes', targetValue: ATTRIBUTES.WILLPOWER, modifier: 2 },
                            { targetGroup: 'attributes', targetValue: ATTRIBUTES.TOUGHNESS, modifier: -1 },
                        ],
                    },
                    {
                        name: 'Vile Alacrity',
                        snippet: 'Increase your Speed by 2. Add +1 dice to Athletic (Str) tests. You suffer (at least) +2 DN to social interaction tests with non-CHAOS.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 2 },
                            { targetGroup: 'skills', targetValue: SKILLS.ATHLETICS, modifier: 1 },
                        ],
                    },
                ],
            },
        ],
        // A Laspistol or an Autopistol, Knife, Bedroll, Canteen, Tattered Clothes
        wargear: [
            {
                name: 'Choice of Laspistol or Autopistol.',
                selected: 'Laspistol',
                options: [
                    { name: 'Laspistol' },
                    { name: 'Autpistol' },
                ],
            },
            { name: 'Knife' },
            { name: 'Bedroll' },
            { name: 'Canteen' },
            { name: 'Clothing', variant: 'Tattered Clothing' },
        ],
        influence: -1,
    },
    {
        ...archetype('core', 112,'Scum','Desperado',3,'Human'),
        ...cost(52,20,32, 0, 0),
        hint: 'A savvy and dangerous bounty hunter, mercenary, and gun for hire.',
        keywords: 'Scum,[Any]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.INVESTIGATION, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Valuable Prey',
                snippet: 'You gain +Rank bonus dice on Cunning Tests, and any Test made to track an individual.',
            },
        ],
        wargearString: 'Flak Coat, Preysense Goggles, Maps of the Heartworlds, Combi-Tool, any PROJECTILE weapon, any melee weapon of Uncommon or lower Rarity.',
        wargear: [
            { name: 'Flak Coat' },
            { name: 'Prysense Googles' },
            { name: 'Maps of the Heartworlds' },
            { name: 'Combi-Tool' },
            {
                name: 'any PROJECTILE weapon',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Ranged Weapon'],
                        subtypeFilter: ['Projectile Weapon'],
                    },
                ],
            },
            {
                name: 'One melee weapon of Uncommon or lower Rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        rarityFilter: ['Common','Uncommon'],
                        typeFilter: ['Melee Weapon'],
                    },
                ],
            },
        ],
        influence: 1,
    },
    // Renegades
    {
        ...archetype('core', 96,'Chaos','Cultist',1,'Human'),
        ...cost(2,0,2, 0, 0),
        hint: 'A disciple of the Ruinous Powers, eager to gain their capricious favour.',
        keywords: 'Scum,[Any],Chaos,[Mark of Chaos]',
        prerequisites: [
            reqSkill(SKILLS.CUNNING, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Enemy Within',
                snippet: 'You gain +Double Rank bonus dice to Deception (Fel) Tests, including Interaction Attacks, against targets with the IMPERIUM Keyword.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.DECEPTION, modifier: 0, rank: 2, condition: 'against IMPERIAL targets' },
                ],
            },
            {
                name: 'Corruption',
                snippet: 'You gain 1d3 corruption.',
                selected: [''],
                options: [
                    { key: 'corruption-1', name: 'Gain 1 point Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 1 }] },
                    { key: 'corruption-2', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 }] },
                    { key: 'corruption-3', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
                ],
            },
        ],
        wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stubber',
        wargear: [
            {
                name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stubber.',
                selected: 'Autopistol',
                options: [
                    { name: 'Autopistol' },
                    { name: 'Laspistol' },
                    { name: 'Hand Cannon' },
                    { name: 'Stubber' },
                ],
            },
            {
                name: 'Choice of a Knife or a Sword.',
                selected: 'Knife',
                options: [
                    { name: 'Knife' },
                    { name: 'Sword' },
                ],
            },
            { name: 'Bedroll' },
            { name: 'Canteen' },
            { name: 'Clothing', variant: 'Gang Colours' },
        ],
    },
    {
        ...archetype('core', 100,'Chaos','Rogue Psyker',2,'Human'),
        ...cost(32,10,22, 0, 0),
        hint: 'How could you...',
        keywords: 'Chaos,Psyker,Scholastica Psykana',
        prerequisites: [
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
        ],
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.',
                description:
                    '<p>You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor and Universal disciplines. You may unlock the Maleficarum discipline. You unlock an additional single Psychic Discipline.',
                description: '<p>You gain access to the Minor and Universal disciplines. You unlock an additional single Psychic Discipline, following the rules in Chapter 11.</p>',
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
                    //'Maleficarum',
                ],
            },
            {
                name: 'Corruption',
                snippet: 'You gain 1d3 x2 corruption.',
                selected: [''],
                options: [
                    { key: 'corruption-1', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 }] },
                    { key: 'corruption-2', name: 'Gain 4 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 4 }] },
                    { key: 'corruption-3', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
                ],
            },
        ],
        wargear: wargearz('Laspistol, Force Stave, Psykana Mercy Blade, Munitorum-Issue Mess Kit, Blanket, Grooming kit, 2 ration packs'),
    },
    {
        ...archetype('core', 109,'Chaos','Heretek',3,'Human'),
        ...costz(44,[
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'A fallen priest, able to commune with the heretic machine-spirits.',
        keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World],Chaos,Dark Mechanicus',
        archetypeFeatures: [
            {
                name: 'Rite of Repair',
                snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
                ],
            },
            {
                name: 'Corruption',
                snippet: 'You gain 1d3 x3 corruption.',
                selected: [''],
                options: [
                    { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
                    { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
                    { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 9 }] },
                ],
            },
        ],
        wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi-Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
        wargear: [
            { name: 'Omnissian Axe' },
            { name: 'Laspistol' },
            {
                name: 'One Mechandrite.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Implants'],
                        triptypeFilter: ['Mechadendrites'],
                    },
                ],
            },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            { name: 'Combi-Tool' },
            { name: 'Light Power Armour' },
            { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
        ],
        influence: 2,
    },
    {
        ...archetype('core', 113,'Chaos','Chaos Space Marine',3,'Adeptus Astartes'),
        ...costz(257,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4), // 20
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.LEADERSHIP, 1), // 12
            reqSkill(SKILLS.SCHOLAR, 1), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
        ]),
        hint: 'A dark warrior, veteran of a thousand years.',
        keywords: 'Imperium,Adeptus Astartes,[Legion],Chaos,[Mark of Chaos],Heretic Astartes',
        alerts: [
            { type: 'info', text: 'The errata states the cost as 277 but this is probably an error. Thus, we use 272 XP as the cost.', },
        ],
        archetypeFeatures: [
            {
                name: 'Tactical Versatility',
                snippet: 'Your training has prepared you for any circumstance. When you make a Critical Hit you may roll twice on the Critical Hit Table and choose either result.',
            },
            {
                name: 'Corruption',
                snippet: 'You gain 1d3 x3 corruption.',
                selected: [''],
                options: [
                    { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
                    { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
                    { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 9 }] },
                ],
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 2,
    },
    // Aeldari
    {
        ...archetype('core', 97,'Aeldari','Corsair',1,'Aeldari'),
        ...cost(16,0,16, 0, 0),
        hint: 'A space-faring pirate of an ancient race.',
        keywords: 'Aeldari,Anhrathe,[Corerie]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Dancing the Blade\'s Edge',
                snippet: 'You throw yourself into danger with reckless abandon to hide your ancestral fears. You gain +Rank bonus dice whenever you make or resist an Athletics (S) or Persuasion (Fel) Attack. You suffer a +1 DN penalty to Fear Tests.',
            },
        ],
        wargear: wargearz('Corsair Armour, Shuriken Pistol, Lasblaster, Spirit Stone, 3 Plasma Grenade, Void Suit'),
    },
    {
        ...archetype('core', 107,'Aeldari','Ranger',2,'Aeldari'),
        ...cost(34,10,24, 0, 0),
        hint: 'A wanderer, a scout, and tracker for the good of their people.',
        keywords: 'Aeldari,Asuryani',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.STEALTH, 1),
            reqSkill(SKILLS.SURVIVAL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'From the Shadows',
                snippet: 'You are adept at exploiting any form of concealment. Whenever a Vision Penalty (p.191) or Cover (p.181) impose a penalty on someone trying to attack or detect you, the penalty is increased by +Rank DN.',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'defence', modifier: 0, rank: 1, condition: 'when obscured (vision penalty) or in cover' },
                ],
            },
        ],
        wargear: wargearz('Cameleoline Cloak, Aeldari Mesh Armour, Ranger Long Rifle, Shuriken Pistol, Knife, Spirit Stone, Bedroll, Blanket, Magnocular Scope'),
    },
    {
        ...archetype('core', 114,'Aeldari','Warlock',3,'Aeldari'),
        ...cost(56,20,36, 0, 0),
        hint: 'A powerful psyker, wielding strictly-guided powers for the Aeldari cause.',
        keywords: 'Aeldari,Asuryani,Psyker,[Craftworld]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Runes of Battle',
                snippet: 'You are a Psyker; you know the Smite psyhcic power, a single Runes of Battle psychic power and may learn other powers as described in Chapter 11.',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerRunesOfBattle', selected: 'Runes of Battle', query: { discipline: 'Runes of Battle' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline.',
                description:
                    '<p>You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline. See Chapter 11 for details.</p>',
                selected: [''],
                options: [
                    // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
                    // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
                    { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
                    // { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
                    { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
                    { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
                    { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
                    { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
                    // { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
                    { key: 'aaoa-runes-of-shaping', name: 'Runes of Shaping', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Shaping' }] },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                    'Divination',
                    'Runes of Battle',
                ],
            },
        ],
        wargear: [
            { name: 'Rune Armour' },
            { name: 'Shuriken Pistol' },
            { name: 'Witchblade' },
            { name: 'A set of Wraithbone Runes' },
            { name: 'Spirit Stone' },
        ],
        influence: 2,
    },
    // Orks
    {
        ...archetype('core', 98,'Orks','Boy',1,'Ork'),
        ...cost(26,0,26, 0, 0),
        hint: 'A brutish warrior and thug who believes that might makes right.',
        keywords: 'Ork,[Clan]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Get Stuck In',
                snippet: 'You gain +Rank bonus dice to melee attacks for every ally engaged with the same target as you.',
            },
        ],
        wargear: wargearz('Shoota, Slugga, Choppa, Clothing/Ripped clothes'),
    },
    {
        ...archetype('core', 108,'Orks','Kommando',2,'Ork'),
        ...cost(54,10,44, 0, 0),
        hint: 'A stealthy and cunning warrior who knows how to turn almost any battle to his advantage.',
        keywords: 'Ork,[Clan]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.SURVIVAL, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Kunnin\' Plan',
                snippet: 'You and any of your allies with the ORK within 15 metres gain +Rank bonus dice to Stealth (A) Tests.',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.STEALTH, modifier: 0, rank: 1, condition: 'for You and ORK allies within 15 metres' },
                ],
            },
        ],
        wargear: wargearz('Shoota, Slugga, Choppa, 3 Stikkbomb, Survival Kit'),
    },
    {
        ...archetype('core', 115,'Orks','Ork Nob',3,'Ork'),
        key: 'core-nob',
        ...cost(56,20,36, 0, 0),
        hint: 'A savage warrior and capable leader, using brute force to succeed where others fail.',
        name: 'Nob',
        keywords: 'Ork,[Clan]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
        ],
        archetypeFeatures: [
            {
                name: 'The Green Tide',
                snippet: 'You command a mob of Boyz (p.354) equal to your Rank x3. If any of your Boyz die, they can be replaced between sessions at the GMs discretion.',
            },
        ],
        wargear: wargearz('\'Eavy Armour, Kustom Slugga, Kustom Choppa'),
        influence: 2,
    },
];