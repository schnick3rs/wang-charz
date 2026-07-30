import {archetype, costz, reqAttribute, reqSkill} from "../utils";
import {stringToKebab} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../shared/constants";

let faction = 'Adeptus Arbites';

export const lex = [
    {
        ...archetype('lex',8, faction,'Arbites Arbitrator',2,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(70, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A judgment, arbitrary given.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'The Eye of the Lex',
                snippet:
                    'In combat, you may spend a Simple Action to declare one enemy you can see as a Designated Lawbreaker. ' +
                    'You and any Allies targeting that enemy gain +Rank bonus dice to attack rolls against them. ' +
                    'You may only have one Designated Lawbreaker active at a time.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Arbites Assault Shield' },
            { name: 'Shock Maul' },
            { name: 'Arbites Combat Shotgun' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
    {
        ...archetype('lex',9,faction,'Arbites Castigator',2,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(70, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A shield and mace, to calm the riot.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'Summary Execution',
                snippet:
                    'When you reduce an enemy to 0 Wounds using a melee weapon, you can choose to execute ' +
                    'them in a brutal, highly visible display of Imperial justice. All enemies within a ' +
                    '15-metre radius who witness the execution must immediately pass a ' +
                    'Resolve Test (DN 2 + Rank) or become Pinned and Staggered ' +
                    'for 1 round as their morale shatters.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Arbites Assault Shield' },
            { name: 'Shock Maul' },
            { name: 'Arbites Combat Shotgun' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
    {
        ...archetype('lex',10,faction,'Arbites Chirurgant',2,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(76, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.MEDICAE, 2),
        ]),
        hint: 'A bringer of mercy.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'Ruthless Triage',
                snippet:
                    'When you use an Arbites Medi-kit to restore Wounds or Shock to an ally with the ADEPTUS ARBITES Keyword you add +Rank to the total amount restored.',
            },
            {
                name: 'Ruthless Interrogation',
                snippet:
                    'When interrogating a suspect, you may use your Arbites Medi-kit to assist, ' +
                    'gaining +Rank to any Test to aquire information. ' +
                    'If successful, this action also immediately restores 1 point of Glory to the group pool.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Arbites Medi-kit' },
            { name: 'Shock Maul' },
            { name: 'Arbites Shotpistol' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
    {
        ...archetype('lex',11,faction,'Arbites Revelatum',2,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(70, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A hunter of criminals.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'Recidivist Hunter',
                snippet:
                    'You gain +Rank Bonus Dice on all Awareness (Int) and Survival (Wil) tests made to track targets, navigate hostile environments, or detect hidden hazards.',
            },
            {
                name: 'Soulscanner',
                snippet:
                    'As a Simple Action, you can use your Soulguilt Scanner to mark a single target within your ' +
                    'line of sight. For the rest of the combat encounter, that target cannot benefit from ' +
                    'Cover or Stealth against attacks made by you or your allies.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Shock Maul' },
            { name: 'Arbites Shotpistol' },
            { name: 'Soulguild Scanner' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
    {
        ...archetype('lex',12,faction,'Arbites Leashmaster',2,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(70, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A beast on a leash.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'Watchdog',
                snippet:
                    'While your Cyber Mastiff is within 3m of you, you gain +Double Rank bonus dice on any' +
                    ' Intimidation tests.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Arbites Assault Shield' },
            { name: 'Arbites Combat Shotgun' },
            { name: 'Shock Maul' },
            { name: 'Cyber Mastiff' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 1,
    },
    {
        ...archetype('lex',13,faction,'Arbites Proctor-Exactant',4,'Human'),
        factionKey: `lex-${stringToKebab(faction)}`,
        ...costz(174, [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.SCHOLAR, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A bringer of authority.',
        keywords: 'Imperium,Adeptus Arbites',
        archetypeFeatures: [
            {
                name: 'Dictat Authoritas',
                snippet:
                    'As a Simple Action, choose one ally with the ADEPTUS ARBITES Keyword within 15-metres who can hear you. That ally may immediately take a free Movement action or a single Weapon Attack action using your Rank as bonus dice to their pool. This can only be done once per combat encounter.',
            },
        ],
        wargear: [
            { name: 'Arbites Carapace Armour' },
            { name: 'Excruciator Maul' },
            { name: 'Nuncio Aquila' },
            { name: 'Chastisor Auto-Vox' },
            { name: 'Arbites Combat Shotgun' },
            { name: 'Data-Slate' },
            { name: 'Vox Bead' },
        ],
        influence: 3,
    },
];