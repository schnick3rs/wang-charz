import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS} from "../../../../db/static/_statUtils";

export const aaoaAdeptusMechanicus = [
    {
        name: 'Corpuscarii Electro-Priest',
        ...archetype('aaoa', 49, 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 2, 'Human'),
        ...costz(46,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'Devotee of the Motive Force that flows through the universe.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 0,
        archetypeFeatures: [
            simpleAbility('Fanatical Devotion', 'You add +Double Rank bonus dice to Determination rolls, and you do not suffer any Shock when you roll Determination.'),
        ],
        wargearString: 'Luminen capacitor, electrostatic gauntlets, Voltagheist field generator, any two augmetics.',
        wargear: [
            { name: 'Luminen capacitor' },
            { name: 'electrostatic gauntlets' },
            { name: 'Voltagheist field generator' },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Fulgurite Electro-Priest',
        ...archetype('aaoa', 50, 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 2, 'Human'),
        ...costz(50,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'Devotee of the Motive Force that flows through the universe.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 0,
        archetypeFeatures: [
            simpleAbility('Fanatical Devotion', 'You add +Double Rank bonus dice to Determination rolls, and you do not suffer any Shock when you roll Determination.'),
        ],
        wargearString: 'Luminen capacitor, Electroleech staff, Voltagheist field generator, any two augmetics.',
        wargear: [
            { name: 'Luminen capacitor' },
            { name: 'Electroleech staff' },
            { name: 'Voltagheist field generator' },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Skitarius Vanguard',
        ...archetype('aaoa', 57, 'Adeptus Mechanicus', 'Skitarius Vanguard', 2, 'Human'),
        ...costz(28,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.TECH, 1),
        ]),
        hint: 'Devotee of the Motive Force that flows through the universe.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 0,
        archetypeFeatures: [
            simpleAbility('Irradiated and Augmented','You do not bleed (making you immune to Bleeding), and gain +Rank bonus dice to Determination rolls. In addition, any living creature without the ADEPTUS MECHANICUS keyword within 2 metres of you at the start of their turn must pass a DN 3 Toughness Test or suffer the Poisoned condition. This poison is radiation poisoning, inflicting 1 Mortal Wound and Rank Shock at the start of each of the Poisoned character’s turns.'),
        ],
        wargear: wargearz('Radium carbine, data-tether, Skitarii Auto-Cuirass'),
    },
    {
        name: 'Sicarian Infiltrator',
        ...archetype('aaoa', 78, 'Adeptus Mechanicus', 'Sicarian Infiltrator', 3, 'Human'),
        ...costz(94,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'You are an assassin, a blade turned towards those who would blaspheme against the Machine God.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 1,
        archetypeFeatures: [
            simpleAbility('More Machine Than Man','You do not bleed (making you immune to Bleeding), and you add +Rank to your Maximum Wounds and Maximum Shock.'),
        ],
        wargearString: 'Sicarian battle-armour, stubcarbine and power sword or flechette blaster and taser goad, Augmetic Arms (two), data-tether, augmetic legs, augmetic viscera, Neurostatic projector',
        wargear: [
            { name: 'Sicarian battle-armour' },
            {
                name: 'stubcarbine and power sword or flechette blaster and taser goad',
                selected: '',
                options: [
                    { name: 'stubcarbine and power sword' },
                    { name: 'flechette blaster and taser goad' },
                ],
            },
            { name: 'Augmetic Arm' },
            { name: 'Augmetic Arm' },
            { name: 'data-tether' },
            { name: 'augmetic legs' },
            { name: 'augmetic viscera' },
            { name: 'Neurostatic projector' },
        ],
    },
    {
        name: 'Sicarian Ruststalker',
        ...archetype('aaoa', 94, 'Adeptus Mechanicus', 'Sicarian Ruststalker', 3, 'Human'),
        ...costz(94,[
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'You have had the weakness of flesh cast away to hone your body into a living weapon in the Omnissiah’s arsenal.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World], Skitarii',
        influence: 1,
        archetypeFeatures: [
            simpleAbility('More Machine Than Man','You do not bleed (making you immune to Bleeding), and you add +Rank to your Maximum Wounds and Maximum Shock.'),
        ],
        wargear: wargearz('Sicarian battle-armour, transonic razor and chordclaw or transonic blade and transonic blade, Augmetic Arm, Augmetic Arm, data-tether, augmetic legs, augmetic viscera'),
    },
    {
        name: 'Transmechanic',
        ... archetype('aaoa', 48, 'Adeptus Mechanicus', 'Transmechanic', 2, 'Human'),
        ...costz(28,[
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.INVESTIGATION, 2),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'You are attuned to wavelengths and signals that flesh cannot discern.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 1,
        archetypeFeatures: [
            simpleAbility('Vox Communion','You can silently communicate with any vox or similar communications device within Rank x100 kilometres. You may also make Awareness or Investigation tests to detect concealed signals and study intercepted signals. You add +Rank bonus dice to any Investigation or Scholar test to decipher a code, translate a language, or create a new cipher.'),
        ],
        wargearString: 'Augur array (auspex), enhanced data tether, any two augmetics, mesh armour, laspistol.',
        wargear: [
            { name: 'Augur array (auspex)' },
            { name: 'enhanced data tether' },
            { name: 'mesh armour' },
            { name: 'laspistol' },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Lexmechanic',
        ...archetype('aaoa', 52, 'Adeptus Mechanicus', 'Lexmechanic', 2, 'Human'),
        ...costz(28,[
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.INVESTIGATION, 1),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'You are a voracious consumer of information, collating and compiling vast quantities of data.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 1,
        archetypeFeatures: [
            simpleAbility('Infovore', 'You may reroll up to Double Rank dice on Investigation and Scholar tests, and such tests take you only half as long to perform.'),
        ],
        wargearString: 'Calculus Logi implant, one optical or utility Mechadendrite, any two Augmetics, mesh armour, laspistol.',
        wargear: [
            { name: 'Calculus Logi implant' },
            { name: 'mesh armour' },
            { name: 'laspistol' },
            {
                name: 'optical or utility Mechadendrite.',
                selected: '',
                options: [
                    { name: 'Mechadendrites (Utility)' },
                    { name: 'Mechadendrites (Optical)' },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Genetor',
        ...archetype('aaoa', 91, 'Adeptus Mechanicus', 'Genetor', 4, 'Human'),
        ...costz(98,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.MEDICAE, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 4),
        ]),
        hint: 'A devotee of the biological sciences.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 3,
        archetypeFeatures: [
            simpleAbility('Magos Biologis','You add +Rank bonus dice to any Medicae test you attempt and take only half as long to perform a Medicae test. In addition, your bioengineered and genetic augmentations increase your Max Wounds and Max Shock by +Rank.'),
        ],
        wargearString: 'Omnissian Axe, Augur Array (diagnostor), Medicae Mechadendrite, any two augmetics, any one cybernetic of up to Availability 7 (Unique), light power armour, and any one weapon of up to Availability 6 (Very Rare).',
        wargear: [
            { name: 'Omnissian Axe' },
            { name: 'Augur array (diagnostor)' },
            { name: 'Mechadendrites (Medicae)' },
            { name: 'light power armour' },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'one cybernetic of up to Availability 7 (Unique)',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'one weapon of up to Availability 6 (Very Rare).',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 6 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Logis',
        ...archetype('aaoa', 95, 'Adeptus Mechanicus', 'Logis', 4, 'Human'),
        ...costz(109,[
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 4),
        ]),
        hint: 'Through mathemantic rite and numerological prophecy, you discern the future from the raw data of today.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 3,
        archetypeFeatures: [
            simpleAbility('Technoprophet', 'You may purchase psychic powers from the Divination discipline even though you are not a Psyker. Using these powers requires an Investigation test in place of a Psychic Mastery test, and you do not choose a power level. Use of these abilities is not considered a psychic power. A Complication that results from one of these abilities inflicts 1d3+1 Shock, due to logic errors and paradoxical outcomes.'),
        ],
        wargearString: 'Omnissian Axe, Calculus Logi implant, any 3 augmetics, any one cybernetic of up to Availability 7 (Unique), light power armour, and any one weapon of up to Availability 6 (Very Rare).',
        wargear: [
            { name: 'Omnissian Axe' },
            { name: 'Calculus Logi implant' },
            { name: 'light power armour' },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetic of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'one cybernetic of up to Availability 7 (Unique)',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'one weapon of up to Availability 6 (Very Rare).',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 6 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        typeFilter: ['Ranged Weapon','Melee Weapon'],
                    },
                ],
            },
        ],
    },
    {
        name: 'Magos',
        ...archetype('aaoa', 96,'Adeptus Mechanicus','Magos',4,'Human'),
        ...costz(139 ,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 4),
        ]),
        hint: 'The High-Priest of the Omnissiah.',
        keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
        influence: 4,
        archetypeFeatures: [
            simpleAbility('Forge-Lord', 'You halve the time it takes to attempt any Tech test, and you add +Double Rank bonus dice to interact with machinery. In addition, as a Simple Action you may invoke one of the Canticles of the Omnissiah (see AAOA, pg. 96).'),
            {
                name: 'Canticles of the Omnissiah',
                description:
                    '<p>These binaric blessings are as much programming as exhortations to action, and they take effect automatically.</p>' +
                    '<p>Invoking a Canticle requires a DN 1 Tech test, adding +1 to the DN for each affected ADEPTUS MECHANICUS character after the first. Affected characters must be within 15m of the Magos or connected by Data-Tether.</p>' +
                    '<p>All references to Rank in the Canticles below refer to the Rank of the Magos invoking the Canticle. A character may only benefit from one Canticle at a time, and the effects last only until the start of the Magos’ next turn.</p>' +
                    '<ul>' +
                    '<li>INCANTATION OF THE IRON SOUL: Affected characters add +Rank to their Resolve</li>' +
                    '<li>LITANY OF THE ELECTROMANCER: Roll 1d6 for each enemy Engaged with an affected character; on a 6, that enemy suffers 1d3 Mortal Wounds.</li>' +
                    '<li>CHANT OF THE REMORSELESS FIST: Affected characters add +Rank bonus dice to melee attacks.</li>' +
                    '<li>SHROUDPSALM: Affected characters add +Rank to Defence.</li>' +
                    '<li>INVOCATION OF MACHINE MIGHT: Affected characters add +Rank to the damage value of their melee weapons.</li>' +
                    '<li>BENEDICTION OF THE OMNISSIAH: Affected characters add +Rank bonus dice to ranged attacks.</li>' +
                    '<li>ORISON OF SCRUTINY: Affected characters add +Rank bonus dice to Awareness Tests.</li>' +
                    '<li>TECHNOSUPPLICATION: Affected characters add +Rank bonus dice to Tech Tests.</li>' +
                    '</ul>',
            }
        ],
        wargearString: 'Omnissian Axe, augmetic servo-arm, any two augmetics, any two cybernetics of up to Availability 7 (Unique), light power armour, and any two weapons of up to Availability 7 (Unique).',
        wargear: [
            { name: 'Omnissian Axe' },
            { name: 'Mechadendrites (Servo-Arm)' },
            { name: 'Light Power Armour' },
            {
                name: 'One augmetic enhancement of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Enhancements'],
                    },
                ],
            },
            {
                name: 'One augmetic enhancement of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Enhancements'],
                    },
                ],
            },
            {
                name: 'One augmetic implant up to value 7 of Unique or lower rarity of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Implants'],
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                    },
                ],
            },
            {
                name: 'One augmetic implant up to value 7 of Unique or lower rarity of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Implants'],
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                    },
                ],
            },
            {
                name: 'One unique weapon up to value 7 of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Melee Weapon','Ranged Weapon'],
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                    },
                ],
            },
            {
                name: 'One unique weapon up to value 7 of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Melee Weapon','Ranged Weapon'],
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                    },
                ],
            },
        ],
    },
];
