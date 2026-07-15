import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../../db/static/_statUtils";

export const aaoaAdeptusAstraTelephatica = [
    archetype('aaoa', 46,'Adeptus Astra Telephatica','Astropath',2,'Human',true),
    {
        ...archetype('aaoa', 91,'Adeptus Astra Telephatica','Sister of Silence Null-Maiden',3,'aaoa/Pariah'),
        ...costz(
            110,
            [
                reqAttribute(ATTRIBUTES.AGILITY, 4),
                reqAttribute(ATTRIBUTES.INITIATIVE, 4),
                reqAttribute(ATTRIBUTES.WILLPOWER, 4),
                reqSkill(SKILLS.BALLISTIC_SKILL, 3),
                reqSkill(SKILLS.INVESTIGATION, 2),
                reqSkill(SKILLS.WEAPON_SKILL, 3),
            ],
        ),
        hint: 'A pariah trained and honed as a deadly hunter of witches.',
        keywords: 'Imperium, Adeptus Astra Telepathica, Silent Sisterhood, Talons of the Emperor',
        influence: 2,
        modifications: [],
        archetypeFeatures: [
            {
                name: 'Witch Hunter',
                snippet: 'You add +Rank ED to all attacks you make against creatures with the PSYKER keyword.',
                modifications: [],
            },
        ],
        wargearString:
            'Vratine armour, Mono Knife, Psyk-out Grenades, translator servo-skull, and one of the following: Bolter, Flamer, or Executioner Greatblade.',
        wargear: [
            { name: 'Vratine armour' },
            { name: 'Mono Knife' },
            { name: 'Psyk-out Grenades' },
            { name: 'Translator Servo-Skull' },
            {
                name: 'Bolter, Flamer, or Executioner Greatblade.',
                options: [
                    { name: 'Bolter' },
                    { name: 'Flamer' },
                    { name: 'Executioner Greatblade' },
                ],
            },
        ],
    },
    {
        ...archetype('aaoa', 91,'Adeptus Astra Telephatica','Sister of Silence Oblivion Knight',4,'aaoa/Pariah'),
        ...costz(
            245,
            [
                reqAttribute(ATTRIBUTES.STRENGTH, 3),
                reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
                reqAttribute(ATTRIBUTES.AGILITY, 5),
                reqAttribute(ATTRIBUTES.INITIATIVE, 5),
                reqAttribute(ATTRIBUTES.INTELLECT, 3),
                reqAttribute(ATTRIBUTES.WILLPOWER, 5),
                reqSkill(SKILLS.BALLISTIC_SKILL, 5),
                reqSkill(SKILLS.INTIMIDATION, 2),
                reqSkill(SKILLS.INVESTIGATION, 3),
                reqSkill(SKILLS.LEADERSHIP, 2),
                reqSkill(SKILLS.WEAPON_SKILL, 5),
            ],
        ),
        hint: 'Elite warriors of the Silent Sisterhood, hunting the mightiest of witches and daemonic foes.',
        keywords: 'Imperium, Adeptus Astra Telepathica, Silent Sisterhood, Talons of the Emperor',
        influence: 3,
        modifications: [],
        archetypeFeatures: [
            {
                name: 'Ex Oblivio',
                snippet: 'For the purposes of your Pariah species abilities, and any Pariah-specific talents you possess, your Willpower is increased by +Rank. Additionally, for the purposes of Pariah species abilities or Pariah-specific talents, your Rank is counted as 1 higher than normal.',
                modifications: [],
            },
        ],
        wargearString:
            'Vratine armour, Mono Knife, Psyk-out Grenades, translator servo-skull, bolt pistol, and master-crafted Executioner Greatblade.',
        wargear: [
            { name: 'Vratine armour' },
            { name: 'Mono Knife' },
            { name: 'Psyk-out Grenades' },
            { name: 'Translator Servo-Skull' },
            { name: 'Bolt Pistol' },
            { name: 'Executioner Greatblade', variant: 'Master-Crafted Executioner Greatblade' },
            { name: 'Mastercrafted' },
        ],
    },
];
