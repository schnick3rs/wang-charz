import {commonNames, cost, species, statMax} from "./utils";

export const aaoa = [
    // Human Origins
    {
        ...species('aaoa', 8, 'Mankind', 'Death World Origin', 'Survivor of endless hostility', 0, 6),
        variant: 'core-human',
        description:
            '<p>Born to harsh, savage worlds, which are hostile to human life. To survive in such places creates people as fierce and unforgiving as the worlds that raised them, and many of the mightiest defenders of the Imperium hail from worlds where existence is a daily struggle for survival.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Strength, Toughness, Stealth, Survival.</em></p>',
        speciesFeatures: [
            {
                name: 'Bitter Survivor',
                snippet: 'You add +1 bonus die to Determination Tests.',
                description:
                    'The character clings onto life and is well-versed in eluding death’s grasp. The character adds +1 to Determination.',
            },
            {
                name: 'Not One of Us',
                snippet: 'You suffer +1 DN to Interaction Tests with non-Deathworldlers.',
                description:
                    'DeathDeathworlders don’t easily trust those who haven’t endured the same kind of hostile environments. They suffer +1DN to all Interaction tests with those who aren’t Deathworlders.'
            },
        ],
    },
    {
        ...species('aaoa', 8, 'Mankind', 'Hive World Origin', 'One in a bazzilion', 0, 6),
        variant: 'core-human',
        description:
            '<p>Towering, overcrowded megacities dominating polluted worlds, even the smallest hive city is home to billions of souls. These people toil in obscurity, slaving away for their entire lives in vast manufactories, or battling for survival in breadline riots or territorial skirmishes. For most, the only hope of seeing open sky is to leave their homes and fight for the Imperium.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Agility, Initative, Cunning, Tech.</em></p>',
        speciesFeatures: [
            {
                name: 'Caves of Steel',
                snippet: 'You gain +1 dice to Tech tests.',
                description:
                    '<p>The character has been surrounded by technology, some of which may be centuries or millennia old, for their entire lives. The character gains +1d to Tech tests.</p>',
            },
            {
                name: 'Hivebound',
                snippet: 'You suffer +1 DN to Survival tests not made within urban or manufactured environments.',
                description:
                    '<p>Hivers are unaccustomed to the ways of wild, untamed places. Even the wilderness of underhive levels and abandoned habs is still built around artificial structures. Hiveworlders suffer +1DN on all Survival tests made when not in an urban or manufactured environment.</p>'
            },
        ],
    },
    {
        ...species('aaoa', 9, 'Mankind', 'Voidborn Origin', 'Born into darkness', 0, 6),
        variant: 'core-human',
        description:
            '<p>Born and raised in the darkness between the stars, the voidborn are a strange breed. Accustomed to the peculiar life aboard city-sized voidships and vast orbital stations, they are often seen as warp-touched, and the weird, insular customs of life in space often set them apart from planetborn people.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Initiative, Willpower, Pilot, Tech.</em></p>',
        speciesFeatures: [
            {
                name: 'Voidwise',
                snippet: 'You gain +1 dice to Tests ti resist radiation. You also ignore all penalties to actions due to low- or zero-gravity.',
                description:
                    '<p>The character is accustomed to the vagaries of life aboard ship or station and is well-versed in protective rites and emergency doctrines. The character gains +1d on all tests to resist radiation and ignores all penalties to action caused by low- or zero-gravity environments.</p>',
            },
            {
                name: 'Ill-Omened',
                snippet: 'Interaction tests with non-Voidborn must use two Wrath dice and can`t score criticals.',
                description:
                    '<p>Voidborn are considered strange and inauspicious by others, who look for even the slightest sign of ill-fortune. When attempting an interaction test with a non-Voidborn, two dice are treated as Wrath dice, rather than one, and the character is unable to score criticals on these tests.</p>'
            },
        ],
    },
    {
        ...species('aaoa', 9, 'Mankind', 'Forge World Origin', 'Under the Omnissiahs watch', 0, 6),
        variant: 'core-human',
        description:
            '<p>You hail from a domain of the Adeptus Mechanicus and were raised invoking psalms to the Omnissiah rather than prayers to the God-Emperor. You are a cog within a grand machine that contains trillions of souls, honed to serve your specific purpose.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Strength, Intelligence, Scholar, Tech.</em></p>',
        speciesFeatures: [
            {
                name: 'Ave Omnissiah',
                snippet: 'You add +1 die to all Tech and Scholar tests related to the Adeptus Mechanicus.',
                description:
                    '<p>The character has memorised countless operation litanies and maintenance hymnals, giving them an innate familiarity with machines and the Cult Mechanicus. They receive +1d on all Tech tests and Scholar tests relating to the Adeptus Mechanicus.</p>',
            },
            {
                name: 'Stranger to the Church',
                snippet: 'You suffer a +2 DN Penalty to Scholar tests related to the Imparial Creed. You may not choose an Archetype with the ADEPTUS MINISTORUM keyword.',
                description:
                    '<p>Forgeworlders are unfamiliar with the ways of the Ministorum and the Imperial Creed and suffer +2DN on all Scholar tests relating to the Imperial Creed. The character may not take any archetypes with the ADEPTUS MINISTORUM keyword.</p>'
            },
        ],
    },
    {
        ...species('aaoa', 10, 'Mankind', 'Scholar Progenium Origin', 'Orphaned but not without family', 0, 6),
        variant: 'core-human',
        description:
            '<p>You were an orphaned child of a notable servant of the Imperium, raised in one of the Schola Progenium abbeys scattered across the galaxy. Under the tutelage of Drill-Abbots and other stern teachers, young Progena are honed into devout, highly capable servants of Him-on-Terra. Many of the most renowned figures in Imperial history are former Progena, recruited into positions of status and power.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Toughness, Willpower, Athletics, Leadership.</em></p>',
        speciesFeatures: [
            {
                name: 'Schola Education',
                snippet: 'You gain +1 die to any two of the following skills: Insight, Intimidation, Leadership, Scholar',
                description:
                    '<p>The character was groomed from a young age to be an example to others. You gain +1d on any two of the following skills, chosen during character creation: Insight, Intimidation, Leadership, Scholar.</p>',
            },
            {
                name: 'Cloistered Upbringing',
                snippet: 'You suffer a +2 DN penalty to non-hostile Interaction tests when dealing with SCUM.',
                description:
                    '<p>Progena have little patience for, or understanding of, the dregs of society. The character suffers +2DN on all non-hostile Interaction tests made when dealing with characters who have the SCUM keyword.</p>'
            },
        ],
    },
    {
        ...species('aaoa', 10, 'Mankind', 'Shrine World Origin', 'Children of Faith', 0, 6),
        variant: 'core-human',
        description:
            '<p>You were raised on a world which exists to exalt the God-Emperor. You were raised amidst faith and fury, exposed to lore of saints and martyrs and the Emperor’s righteousness at every moment of every day.</p>' +
            '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Willpower, Fellowship, Insight, Scholar.</em></p>',
        speciesFeatures: [
            {
                name: 'The Scorn of the Devout',
                snippet: 'You increase Resolve and Conviction by 1. You gain +1 die to Weapon Skill tests when attacking HERETICs.',
                description:
                    '<p>The character is filled with holy hatred and fury. They receive +1 to Resolve and Conviction, and +1d on all Weapon Skill tests made to attack enemies with the Heretic keyword.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
                    { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
                ],
            },
            {
                name: 'Abhor the Unhallowed',
                snippet: 'You suffer a +1 DN penalty to Scholar and Tech tests related to HERETIC, CHAOS or Xenos items or characters.',
                description:
                    '<p>The character is filled with an instinctive revulsion for the unholy or unclean. They suffer +1DN on all Scholar or Tech tests relating to items or characters with the HERETIC or CHAOS keywords, or with any keyword belonging to a Xenos species.</p>',
            },
        ],
    },
    // Pariah
    {
        ...species('aaoa',12,'Mankind','Pariah','The blank, the void',30,8),
        ...cost(30,0,30, 0),
        ...statMax(7,7,12,12,12,10,6,10),
        variant: 'core-human',
        speciesFeatures: [
            {
                name: 'Abhorrent Presence',
                snippet: 'You suffer +2 DN to all Interaction tests with non-Pariahs. You suffer +4 DN to all Interaction tests with Psykers. You Influence is reduced by 1.',
                description:
                    '<p>+2DN to all interaction tests with non-pariah characters. +4DN to interaction tests with psykers. Pariahs reduce their Influence by 1.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'influence', modifier: -1 },
                ],
            },
            {
                name: 'Psychic Abomination',
                snippet: 'You may never be a PSYKER nor gain Faith points or abilities that draw from the warp. Any psychic powers attempted or targeted within a number of metres of you  equal to your Willpower increase their DN by +Double Rank.',
                description:
                    '<p>A pariah cannot be directly affected by psychic powers or other warp phenomena, whether positive or negative. A pariah can never gain the PSYKER keyword, nor can they ever gain Faith points or any other ability that requires drawing upon the Warp for power. Any psychic powers attempted or targeted within a number of metres of the Pariah equal to their Willpower increase their DN by twice the Pariah’s Rank.</p>',
            },
        ],
    },
    // Aeldarie
    {
        ...species('aaoa', 13,'Drukhari','Drukhari','The Sinister Kin',20,8),
        ...cost(20,20,0, 0),
        ...commonNames('Akhirion, Anarkyss, Anielyn, Bekliel, Ethrilliac, Grendett, Grevyth, Kylos, Laelanyel, Madrax, Melikka, Mellyx, Monsatos, Narlek, Nyktos, Peiythia, Phyrix, Selithrian, Theskril, Thessa, Thraed, Thresyn, Thrixxesh, Quaez, Uless, Vrexith, Vylekh, Vypus, Xela, Xurul'),
        ...statMax(7,7,12,12,12,10,6,8),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3 },
            { group: 'attributes', value: 'strength', threshold: 2 },
            { group: 'skills', value: 'intimidation', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Blade Artist',
                snippet: 'When you make an attack with a melee weapon, increase the weapon’s AP by 1 (i.e., from -1 to -2) if you shift one or more Icons on the attack. This stacks with effects such as the Rending weapon trait.',
            },
            {
                name: 'The Thirst',
                snippet: 'You cannot recover Shock by spending Wrath or the use of Medicae. You recover 1d3+Rank Shock when you inflict Shock on or kill an opponent, when you succeed at an Intimidation Interaction Attack, or when an enemy fails a Resolve test. The GM gains +1 Ruin whenever you become Exhausted.',
            },
            {
                name: 'She Who Thirsts',
                snippet: 'Your Max Shock is reduced by your Corruption Level.',
            },
        ],
    },
    // Squats
    {
        ...species('aaoa', 13, 'Squats','Squat','The forgotten',28,5),
        ...cost(28,28,0, 0),
        ...commonNames('Algunella, Athgni, Athlun, Balgrimella, Beladokina, Burnir, Burzin, Drokgrimella, Dronglin, Elanya, Elruna, Fimagrin, Fimarun, Gadrinella, Gimzin, Grendl, Grimgrund, Grimtoka, Hakakin, Harmin, Harnina, Kazgrond, Lundor, Moranina, Mori, Odaskina,Olfmir, Ollagona, Ollanya, Ragni, Rorangona, Rorgar, Skagromina, Skoraskina, Skordokina, Snoragund, Throngana, Thuramin, Uthagrund, Zakgni'),
        prerequisites: [
            { group: 'attributes', value: 'toughness', threshold: 3 },
            { group: 'attributes', value: 'willpower', threshold: 3 },
            { group: 'skills', value: 'tech', threshold: 1 },
            { group: 'skills', value: 'weaponSkill', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Abhuman',
                snippet: '+1DN to all Interaction tests with the IMPERIUM.',
                description:
                    '<p>+1DN to all Interaction tests with characters possessing the IMPERIUM keyword.</p>',
            },
            {
                name: 'Grudges',
                snippet: 'You gain +1 die to melee attacks against ORK and CHAOS. You suffer +2 DN to non-hostile Interaction skill tests with ORKs and CHAOS.',
                description:
                    '<p>+1d to all melee attacks against characters possessing the ORK or CHAOS keywords. +2DN penalty on all non-hostile Interaction skill tests vs. targets possessing the ORK or CHAOS keywords.</p>',
            },
            {
                name: 'Legacy of the Cataclysm',
                snippet: 'Your Resolve and Conviction is increased by 1. You suffer +3 Corruption.',
                description:
                    '<p>Your Resolve and Conviction increase by +1 each. You begin play with +3 corruption.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
                    { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
                    { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
                ],
            },
        ],
    },
    // Beastman
    {
        ...species('aaoa', 15, 'Chaos', 'Beastman', 'Servants of Chaos', 20, 7),
        prerequisites: [
            { group: 'attributes', value: 'strength', threshold: 3 },
            { group: 'attributes', value: 'toughness', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Reviled Abhuman',
                snippet: 'You suffer +2 DN to Interaction tests with CHAOS.',
                description:
                    '<p>+2DN to all Interaction tests with characters who do not possess the Chaos keyword.</p>',
            },
            {
                name: 'Horns',
                snippet: 'You may attack with your Horns (5 +2 ED).',
                description:
                    '<p>You may make melee attacks with your horns (5+2ED; AP 0). Thus, you are always armed.</p>',
            },
            {
                name: 'Bestial Savagery',
                snippet: 'You gain +1 die to Intimidation tests.',
                description:
                    '<p>+1d to all Intimidation tests.</p>',
            },
            {
                name: 'Child of Chaos',
                snippet: 'You gain +3 Corruption.',
                description:
                    '<p>You begin play with +3 corruption.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
                ],
            },
        ],
    },
    // T'au
    {
        ...species('aaoa', 19, 'T’au','Shas T’au','The Warrior',4,6),
        ...cost(4,4,0, 0),
        ...commonNames(''),
        prerequisites: [
            { group: 'skills', value: 'ballisticSkill', threshold: 1 },
            { group: 'skills', value: 'tech', threshold: 1 },
        ],
        speciesFeatures: [
            {
                name: 'For the Greater Good (Shas)',
                snippet: 'When you assist an ally using Awareness, Ballistic Skill, or Stealth, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
            },
            {
                name: 'Dull Soul',
                snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
            },
        ],
    },
    {
        ...species('aaoa', 21, 'T’au', 'Fio T’au', 'The Builder', 14, 5),
        ...cost(14, 14, 0, 0),
        ...commonNames(''),
        prerequisites: [
            { group: 'attributes', value: 'intellect', threshold: 3 },
            { group: 'skills', value: 'scholar', threshold: 1 },
            { group: 'skills', value: 'tech', threshold: 1 },
        ],
        speciesFeatures: [
            {
                name: 'For the Greater Good (Fio)',
                snippet: 'When you assist an ally using Medicae, Scholar, or Tech , you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
            },
            {
                name: 'Dull Soul',
                snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
            },
        ],
    },
    {
        ...species('aaoa', 21, 'T’au', 'Kor T’au', 'The Flyer', 14, 6),
        ...cost(14, 14, 0, 0),
        ...commonNames(''),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3 },
            { group: 'skills', value: 'awareness', threshold: 1 },
            { group: 'skills', value: 'pilot', threshold: 1 },
        ],
        speciesFeatures: [
            {
                name: 'For the Greater Good (Kor)',
                snippet: 'When you assist an ally using Awareness, Pilot, or Tech, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
            },
            {
                name: 'Grav-Adapted',
                snippet: 'You ignore all DN increases for high, low, or zero-gravity, and you gain a Flying Speed equal to your normal Speed when in zero gravity.',
            },
            {
                name: 'Dull Soul',
                snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
            },
        ],
    },
    {
        ...species('aaoa', 21, 'T’au', 'Por T’au', 'The Bureaucrat', 14, 6),
        ...cost(14, 14, 0, 0),
        ...commonNames(''),
        prerequisites: [
            { group: 'attributes', value: 'fellowship', threshold: 3 },
            { group: 'skills', value: 'insight', threshold: 1 },
            { group: 'skills', value: 'persuasion', threshold: 1 },
        ],
        speciesFeatures: [
            {
                name: 'For the Greater Good (Por)',
                snippet: 'When you assist an ally using Cunning, Deception, or Persuasion, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
            },
            {
                name: 'Polyglot',
                snippet: 'You know additional languages equal to your Scholar rank. When you encounter an unfamiliar language, you gain +Double Rank on Scholar tests to learn or translate that language.',
            },
            {
                name: 'Dull Soul',
                snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
            },
        ],
    },
    {
        ...species('aaoa', 21, 'T’au', 'Aun T’au', 'The Lord', 40, 6),
        ...cost(40, 40, 0, 0),
        ...commonNames(''),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3 },
            { group: 'attributes', value: 'willpower', threshold: 3 },
            { group: 'skills', value: 'leadership', threshold: 2 },
            { group: 'skills', value: 'scholar', threshold: 3 },
            { group: 'skills', value: 'weaponSkill', threshold: 1 },
        ],
        speciesFeatures: [
            {
                name: 'Ethereal Presence',
                snippet: 'T’AU characters within 12m always add bonus dice equal to twice the Ethereal’s Rank to their Resolve and Conviction tests. T’AU characters cannot willingly harm an Ethereal, and must pass a DN 5 Resolve test or become Pinned if their actions allow an Ethereal to be harmed.',
            },
            {
                name: 'Dull Soul',
                snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
            },
        ],
    },
];
