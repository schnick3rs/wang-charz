import {archetype, costz, reqAttribute, reqSkill, suggestedAttributes, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS} from "../../../db/static/_statUtils";


export const fspg = [
    // Sororitas
    {
        ...archetype('fspg',100,'Adepta Sororitas','Sister Repentia',2,'Human'),
        ...costz(70,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'The sinfull zealot.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Solace in Anguish',
                description:
                    '<p>You ignore DN penalties for being Wounded, and instead gain +Rank Bonus Dice to all melee Attack Tests whilst Wounded. When you are Dying, this bonus applies for all Tests — you do not fall Prone, and are not restricted in which actions you can take.</p>' +
                    '<p>You gain +Double Rank bonus dice to any Test to resist the effects of a Psychic Power.</p>',
            },
        ],
        wargear: [
            { name: 'Eviscerator' },
            { name: 'Clothing', variant: 'Rags' },
            { name: 'Purity Seal', amount: 2 },
            { name: 'Chaplet Ecclesiasticus' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
        suggestedStats: [
            ...suggestedAttributes(3,4,3,4,4,2,1),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 1),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ],
    },
    {
        ...archetype('fspg',101,'Adepta Sororitas','Sister Dialogus',3,'Human'),
        ...costz(146,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INVESTIGATION, 3),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.PERSUASION, 2),
            reqSkill(SKILLS.SCHOLAR, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'The word of the emperor.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Polyglot Superior',
                description:
                    '<p>When you speak aloud another person’s words (for example, translating xenos text, distributing an officer’s orders, repeating another agent’s inspiring oration, reciting scripture), gain +Rank Bonus Dice to any corresponding Test.</p>' +
                    '<p>Half any DN penalties for interacting with an unfamiliar species or culture.</p>',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Bolt Pistol' },
            { name: 'Dialogus Staff' },
            { name: 'Laud Hailer' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
            { name: 'Numerious books on linguistics and the Imperial Creed' },
        ],
        influence: 2,
    },
    {
        ...archetype('fspg',102,'Adepta Sororitas','Sister Imagifier',3,'Human'),
        ...costz(146,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.PERSUASION, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'Bearer of your martyrs image.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Litany of Deeds',
                description:
                    '<p>When you carry or are adjacent to your Simulacrum Imperialis, you and any allies faithful to the Imperial Cult within hearing distance gain +1 Strength.</p>' +
                    '<p>In addition, as a Combat Action, you can plant your Simulacrum in place. Until you next move, you and any allies faithful to the Imperial Cult within 5m gain +Rank Determination.</p>',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Bolt Pistol' },
            { name: 'Boltgun' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Simulacrum Imperialis' },
            { name: 'Complete records of your martyr' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
        ],
        influence: 2,
    },
    {
        ...archetype('fspg',103,'Adepta Sororitas','Seraphim',3,'Human'),
        ...costz(118,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.PILOT, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'Wings of fire and flames.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Angelic Presence',
                description:
                    '<p>You and any allies within 15m faithful to the Imperial Cult gain +Rank Bonus Dice to Resolve Tests.</p>' +
                    '<p>In addition, when you use a jump pack to move away from Engagement, enemies cannot make Reflexive Attacks against you.</p>',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Jump Pack', variant: 'San Leor-pattern Jump Pack' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
            {
                name: 'Pair of Bolt Pistols, Hand Flameres or Inferno Pistols',
                selected: 'Bolt Pistol',
                options: [
                    { name: 'Bolt Pistol', variant: '2 Bolt Pistols' },
                    { name: 'Hand Flamer', variant: '2 Hand Flamers' },
                    { name: 'Inferno Pistol', variant: '2 Inferno Pistols' },
                ],
            },
        ],
        influence: 2,
    },
    {
        ...archetype('fspg',104,'Adepta Sororitas','Canoness',4,'Human'),
        ...costz(249,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 6),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.SCHOLAR, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'The seasoned matriarch.',
        keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
        archetypeFeatures: [
            {
                name: 'Lead the Righteous',
                description:
                    '<p>You are an inspiring warleader and walking miracle both. You gain +Rank Faith (see page142 of Wrath & Glory Rulebook).</p>' +
                    '<p>Whenever you deal a Wound, you may spend 1 Faith to gain +1 Glory as a Free Action.</p>',
            },
        ],
        wargear: [
            { name: 'Sororitas Power Armour' },
            { name: 'Rosarius' },
            { name: 'Clothing', variant: 'Sororitas Vestments' },
            { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
            {
                name: 'Condemnor Boltgun or Boltgun with Combi-Weapon',
                selected: 'Condemnor Boltgun',
                options: [
                    { name: 'Condemnor Boltgun' },
                    { name: 'Boltgun and Combi Weapon and Flamer' },
                    { name: 'Boltgun and Combi Weapon and Meltagun' },
                    { name: 'Boltgun and Combi Weapon and Plasma Gun' },
                ],
            },
            {
                name: 'A Blessed Blade or a Chainsword or an Eviscerator or a Power Sword',
                selected: 'Blessed Blade',
                options: [
                    { name: 'Blessed Blade' },
                    { name: 'Chainsword' },
                    { name: 'Eviscerator' },
                    { name: 'Power Sword' },
                ],
            },
            {
                name: 'A Bolt Pistol or a Plasma Pistol or an Inferno Pistol',
                selected: 'Bolt Pistol',
                options: [
                    { name: 'Bolt Pistol' },
                    { name: 'Plasma Pistol' },
                    { name: 'Inferno Pistol' },
                ],
            },
            {
                name: 'A Brazier of Holy Fire or a Null Rod',
                selected: 'Brazier of Holy Fire',
                options: [
                    { name: 'Brazier of Holy Fire' },
                    { name: 'Null Rod' },
                ],
            },
        ],
        influence: 3,
    },
    // Astartes
    {
        ...archetype('fspg', 105,'Adeptus Astartes','Astartes Apothecary',4,'Adeptus Astartes'),
        ...costz(357,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 4), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 5), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.LEADERSHIP, 1), // 12
            reqSkill(SKILLS.MEDICAE, 5), // 12
            reqSkill(SKILLS.SCHOLAR, 1), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 5), // 12
        ]),
        hint: 'The medical specialist.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        archetypeFeatures: [
            {
                name: 'Prime helix',
                snippet: 'When you succeed on a Medicae Test to heal a target’s Wounds, they recover +Rank additional Wounds.',
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Chainsword, 3 Frag Grenade, 3 Krak Grenade, Narthecium, Reductor'),
        influence: 2,
    },
    {
        ...archetype('fspg', 105,'Adeptus Astartes','Astartes Chaplain',4,'Adeptus Astartes'),
        ...costz(392,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 5), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 5), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.INSIGHT, 3), // 12
            reqSkill(SKILLS.LEADERSHIP, 3), // 12
            reqSkill(SKILLS.SCHOLAR, 4), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 5), // 12
        ]),
        hint: 'Chapters beliefs incarnated.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter]',
        archetypeFeatures: [
            {
                name: 'Chapter Cult',
                snippet: 'You gain 1 Faith, and can purchase Faith Talents available to characters with the ADEPTUS MINISTORUM Keyword.',
            },
            {
                name: 'Grant Brotherhood',
                snippet: 'As a Combat Action, you may spend 1 Faith to give an ally within hearing distance your [CHAPTER] Keyword for the rest of the scene, with all corresponding effects except those with the Tradition or Gene-seed title, or that provide equipment.',
            },
            {
                name: 'Beacon of Tradition',
                snippet: 'Any allies within 5xRank metres who share your [CHAPTER] Keyword gain +Rank to Resolve Tests.',
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Skull Helm, Crozius Arcanum, Bolt Pistol, Rosarius, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 2,
    },
    {
        ...archetype('fspg', 107,'Adeptus Astartes','Astartes Librarian',4,'Adeptus Astartes'),
        ...costz(359,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5), // 18
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
            reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
            reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
            reqAttribute(ATTRIBUTES.WILLPOWER, 6), // 10
            reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
            reqSkill(SKILLS.ATHLETICS, 3), // 12
            reqSkill(SKILLS.AWARENESS, 3), // 12
            reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
            reqSkill(SKILLS.PSYCHIC_MASTERY, 4), // 12
            reqSkill(SKILLS.SCHOLAR, 2), // 12
            reqSkill(SKILLS.STEALTH, 3), // 12
            reqSkill(SKILLS.SURVIVAL, 1), // 12
            reqSkill(SKILLS.WEAPON_SKILL, 5), // 12
        ]),
        hint: 'Invoke the librarian powers.',
        keywords: 'Imperium,Adeptus Astartes,[Chapter],Psyker',
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You know the Smite psychic power and one Librarius psychic.',
                description:
                    '<p>You are a psyker; you know the Smite psychic power and one Librarius psychic power.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerLibrarius', selected: '', query: { discipline: 'Librarius' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor Universal and Librarius Disciplines. You unlock an additional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum',
                description: '<p>You gain access to the Minor Universal and Librarius Disciplines. You unlock an additional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum.</p>',
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
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                    'Librarius',
                ],
            },
        ],
        wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Psychic Hood, Bolt Pistol, Force Stave, 3 Frag Grenade, 3 Krak Grenade'),
        influence: 2,
    },
    // Primaris
    {
        ...archetype('fspg', 108,'Adeptus Astartes','Primaris Reiver',4,'Primaris Astartes'),
        ...costz(288, [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.INTIMIDATION, 3),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        hint: 'Shock and awe... aweeeeee.',
        keywords: 'Imperium, Adeptus Astartes, Primaris, [Chapter]',
        archetypeFeatures: [
            {
                name: 'Terror Tactics',
                snippet: 'When your Stealth Score is reduced to 0 or you Ambush a Threat, you can choose for all enemies who can see or hear you to take a Terror Test, with a DN equal to 1+Rank.',
            },
        ],
        wargear: wargearz('Mk X Phobos Power Armour, Bolt Carbine, Heavy Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade, 3 Shock Grenade'),
        influence: 1,
    },
    // Mechanicus
    {
        ...archetype('fspg',109,'Adeptus Mechanicus','Tech-Adept',1,'Human'),
        ...costz(22,[
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'The mechanical admin.',
        keywords: 'Imperium,Adeptus Mechanicus,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Admin Access',
                snippet: 'Your purpose is to commune with Machine Spirits and catalogue their wisdom, to further the Quest for Knowledge. When you commune with a Machine Spirit as part of a Test, you gain Icons equal to your Rank.',
            },
        ],
        wargear: [
            { name: 'Laspistol' },
            { name: 'Clothing', variant: 'Adepts Robes' },
            { name: 'Data-Slate' },
            { name: 'Combi-Tool' },
            { name: 'Sacred Machine Oil' },
            {
                name: 'Any Augmetic Enhancement',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                        subtypeFilter: ['Augmetic Enhancements'],
                    },
                ],
            },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-augmetic', 'core-binary-chatter', 'core-deductive' ],
        },
        suggestedStats: [
            ...suggestedAttributes(1,2,1,1,1,4,1),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.INVESTIGATION, 2),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ],
    },
    {
        ...archetype('fspg',110,'Adeptus Mechanicus','Sicarian Infiltrator',3,'Human'),
        ...costz(76,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'The transonic scout',
        keywords: 'Imperium,Adeptus Mechanicus,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Mechanical Build',
                snippet: 'You are immune to Bleeding.',
            },
            {
                name: 'Neurostatic Aura',
                snippet: 'As a Combat Action, you may choose a number up to your Rank, and inflict that many Hindered Conditions on all characters within 10m that don’t have this ability or null-code audio inputs.',
            },
        ],
        wargear: [
            { name: 'Sicarian Battle Armour' },
            { name: 'Augmetic Legs' },
            { name: 'Infiltrator Headpiece' },
            {
                name: 'Flechette Blaster and Taser Goad or Stubcarbine and Power Sword',
                selected: 'Flechette Blaster and Taser Goad',
                options: [
                    { name: 'Flechette Blaster and Taser Goad' },
                    { name: 'Stubcarbine and Power Sword' },
                ],
            },
        ],
    },
    {
        ...archetype('fspg',111,'Adeptus Mechanicus','Sicarian Ruststalker',3,'Human'),
        ...costz(76,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        hint: 'The mechanical assassin',
        keywords: 'Imperium,Adeptus Mechanicus,[Forge World]',
        archetypeFeatures: [
            {
                name: 'Mechanical Build',
                snippet: 'You are immune to Bleeding.',
            },
            {
                name: 'Transonic Assassin',
                snippet: 'In addition, you gain +Rank bonus dice when Charging or making All-Out Attacks whilst wielding a weapon with the TRANSONIC Keyword.',
            },
        ],
        wargear: [
            { name: 'Sicarian Battle Armour' },
            { name: 'Augmetic Legs' },
            { name: 'Infiltrator Headpiece' },
            {
                name: '2 Transonic Blades or a Transonic Razor and a Chordclaw',
                selected: 'Transonic Blade',
                options: [
                    { name: 'Transonic Blade', variant: 'Pair of Transonic Blades' },
                    { name: 'Transonic Razor and a Chordclaw' },
                ],
            },
        ],
    },
    {
        ...archetype('fspg', 112,'Adeptus Mechanicus','Tech-Priest Dominus',4,'Human'),
        ...costz(113,[
            reqAttribute(ATTRIBUTES.INTELLECT, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 5),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'Behold! I roll Tech vs DN 13.',
        keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 3),
        ],
        archetypeFeatures: [
            {
                name: 'Lord of the Machine Cult',
                snippet: 'As a Simple Action, you can Help all allies within 10m that have the ADEPTUS MECHANICUS Keyword, or are utilising equipment with a Machine Spirit (including guns and non-basic melee weapons), granting +Rank Bonus Dice to their Tests.',
            },
        ],
        wargear: [
            { name: 'Omnissian Axe' },
            {
                name: 'Volkite Blaster or Eradication Ray',
                selected: 'Volkite Blaster',
                options: [
                    { name: 'Volkite Blaster' },
                    { name: 'Eradication Ray' },
                ],
            },
            {
                name: 'Macrostubber or Phosphor Serpenta',
                selected: 'Macrostubber',
                options: [
                    { name: 'Macrostubber' },
                    { name: 'Phosphor Serpenta' },
                ],
            },
            { name: 'Light Power Armour' },
            { name: 'Refractor Field' },
            { name: 'Combi-Tool' },
            { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
            { name: 'Sacred Machine Oil' },
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
        ],
        influence: 2,
    },
    // Adeptus Ministorum
    {
        ...archetype('fspg',113,'Adeptus Ministorum','Confessor',2,'Human'),
        ...costz(90,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.INSIGHT, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.MEDICAE, 3),
            reqSkill(SKILLS.SCHOLAR, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'The spiritual companion',
        keywords: 'Imperium,Adeptus Ministorum',
        archetypeFeatures: [
            {
                name: 'Spiritual Administration',
                snippet: 'When you Test to discover the sins of another character (by coercion, investigation, or instinct), gain +Rank Bonus Dice.',
            },
            {
                name: 'Faithfull Replenishment',
                snippet: 'During a Regroup, you can choose one character faithful to the Imperial Cult to regain all Shock.',
            },
        ],
        wargear: wargearz('Ministorum Robes, Rosarius, Missionary Kit, Power Maul, Laspistol, Torture Kit, Ministorum Tomes, Portable Lectern'),
        influence: 1,
    },
    // Abhumans
    {
        ...archetype('fspg',114,'Astra Militarum','Ratling Sniper',1,'fspg/Ratling'),
        ...costz(54,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 2),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.DECEPTION, 2),
            reqSkill(SKILLS.STEALTH, 3),
        ]),
        hint: 'An uncatchable sniper.',
        keywords: 'Imperium,Astra Militarum,Militarum Auxilla,[Regiment],Abhuman',
        archetypeFeatures: [
            {
                name: 'Shoot Sharp and Scarper',
                snippet: 'When using a weapon with the Sniper Weapon Trait, increase the weapon’s Sniper rating by +Rank. In addition, when you make a successful ranged Attack Test, you may immediately move up to your Speed as a Reflexive Action.',
            },
        ],
        wargear: [
            {
                name: 'Ratling Rifle or Sniper Rifle.',
                selected: 'Ratling Rifle',
                options: [
                    { name: 'Ratling Rifle' },
                    { name: 'Sniper Rifle' },
                ],
            },
            { name: 'Knife' },
            { name: 'Flak Armour' },
            { name: 'Ration', amount: 3 },
            { name: 'Ration', amount: 2, variant: 'Stolen Rations' },
            { name: 'Ratling Keepsakes' },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-deadshot', 'core-eliminator', 'core-silent' ],
        },
        suggestedStats: [
            ...suggestedAttributes(1,2,3,1,1,2,3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.DECEPTION, 2),
            reqSkill(SKILLS.INSIGHT, 1),
            reqSkill(SKILLS.PERSUASION, 1),
            reqSkill(SKILLS.STEALTH, 3),
        ],
    },
    {
        ...archetype('fspg',115,'Astra Militarum','Ogryn Warrior',2,'fspg/Ogryn'),
        ...costz(98,[
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'Fire at will!',
        keywords: 'Imperium,Astra Militarum,Militarum Auxilla,[Regiment],Abhuman',
        archetypeFeatures: [
            {
                name: 'Let It Rip',
                snippet: 'When you Charge and have a ranged weapon, you can fire it wildly as a Free Action. This is treated as a Salvo Option that awards Bonus Dice to your Melee Attack Test equal to your weapon’s Salvo rating.',
            },
        ],
        wargear: [
            { name: 'Flak Armour' },
            { name: 'Ripper Gun' },
            { name: 'Ripper Gun Bayonet' },
            { name: 'Frag Bomb', amount: 3 },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-augmetic', 'core-brutalist', 'core-duty-until-death' ],
        },
        suggestedStats: [
            ...suggestedAttributes(5,5,2,2,2,1,1),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 1),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ],
    },
    {
        ...archetype('fspg',116,'Astra Militarum','Bullgryn',3,'fspg/Ogryn'),
        ...costz(172,[
            reqAttribute(ATTRIBUTES.STRENGTH, 6),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
            reqAttribute(ATTRIBUTES.AGILITY, 2),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'The handy bullwark',
        keywords: 'Imperium,Astra Militarum,Militarum Auxilla,[Regiment],Abhuman',
        archetypeFeatures: [
            {
                name: 'Shieldwall',
                snippet: 'You provide your allies with a mobile defence line formed of carapace, tank tracks and Abhuman muscle. If an attack is made against an ally within 3m, that ally can add your Shield’s Armour Rating to their Armour Rating.',
            },
        ],
        wargear: [
            { name: 'Bullgryn Plate' },
            { name: 'Frag Bomb', amount: 3 },
            {
                name: 'Slabshield and Grenadier Gauntlet',
                selected: 'Slabshield and Grenadier Gauntlet OR Bullgryn Maul and Brute Shield',
                options: [
                    { name: 'Slabshield and Grenadier Gauntlet' },
                    { name: 'Bullgryn Maul and Brute Shield' },
                ],
            },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-brutalist', 'core-die-hard', 'core-fear' ],
        },
        suggestedStats: [
            ...suggestedAttributes(6,6,3,3,2,1,1),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.LEADERSHIP, 1),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 6),
        ],
    },
    // Inquisition
    {
        ...archetype('fspg',117,'The Inquisition','Lexmechanic',2,'Human'),
        ...costz(44,[
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.SCHOLAR, 3),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'The human prozessor.',
        keywords: 'Imperium,Adeptus Mechanicus,[Forge World],Inquisition,[Ordo]',
        archetypeFeatures: [
            {
                name: 'Statistical Certainty',
                snippet: 'The assistance you provide your allies comes with the benefit of exacting mathematical analysis, to remove all possibility of ill-fortune or doubt. When you Help an ally, you may reduce the amount of Bonus Dice you provide by an amount equal up to your Rank. For every die removed, your ally gains an extra Icon on their Test result.',
            },
        ],
        alerts: [
            { type: 'warning', text: 'The source (Forsaken System Player Guide) of this archetype is incomplete. The gaps are filled by the Doctors of Doom Chapter Master.', },
        ],
        influence: 1,
        wargear: [
            { name: 'Laspistol' },
            { name: 'Clothing', variant: 'Adepts Robes' },
            { name: 'Auspex' },
            { name: 'Auto-Quill' },
            { name: 'Combi-Tool' },
            { name: 'Data-Slate' },
            {
                name: 'Any Augmetic',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'Any Augmetic',
                selected: '',
                options: [
                    {
                        filter: true,
                        typeFilter: ['Augmetics'],
                    },
                ],
            },
            { name: 'Sacred Machine Oil' },
            { name: 'Symbol of Authority', variant: 'Symbol of the Mechanicus & Inquisition' },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-augmetic', 'core-binary-chatter', 'core-deductive' ],
        },
        suggestedStats: [
            ...suggestedAttributes(1,2,1,1,1,4,1),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.INVESTIGATION, 2),
            reqSkill(SKILLS.MEDICAE, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ],
    },
    {
        ...archetype('fspg',118,'The Inquisition','Interrogator',2,'Human'),
        ...costz(64,[
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqSkill(SKILLS.INSIGHT, 2),
            reqSkill(SKILLS.MEDICAE, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: '"Maybe if I clip another finger....".',
        keywords: 'Imperium,Inquisition,[Ordo],[Any]',
        archetypeFeatures: [
            {
                name: 'Extract the Truth',
                snippet: 'To earn an Inquisitorial Rosette, the first skill you must master is to lay bare the sinful hearts of Human and xenos. When you succeed on a Test to acquire information from an individual, you gain free Shifts equal to your Rank.',
            },
        ],
        influence: 1,
        wargear: [
            { name: 'Symbol of Authority' },
            { name: 'Excrutiator' },
            {
                name: 'Any IMPERIUM equipment up to Rare rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        rarityFilter: ['Common', 'Uncommon', 'Rare'],
                        keywordFilter: 'Imperium',
                    },
                ],
            },
            {
                name: 'Any IMPERIUM equipment up to Rare rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        rarityFilter: ['Common', 'Uncommon', 'Rare'],
                        keywordFilter: 'Imperium',
                    },
                ],
            },
            {
                name: 'Any IMPERIUM equipment up to Rare rarity',
                selected: '',
                options: [
                    {
                        filter: true,
                        rarityFilter: ['Common', 'Uncommon', 'Rare'],
                        keywordFilter: 'Imperium',
                    },
                ],
            },
        ],
    },
    // Kroot
    {
        ...archetype('fspg',119,'Tau Empire','Kroot Mercenary',1,'fspg/Kroot'),
        ...costz(62,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 2),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'Gourmet for hire',
        factionKey: 'fspg-tau-empire',
        keywords: 'Kroot,[Any]',
        archetypeFeatures: [
            {
                name: 'Adaptive Loyalty',
                snippet: 'You gain the [ANY] Keyword, which should be substituted for the Faction that currently commands your allegiance. At the GM’s discretion, you may swap this Keyword out for a different one when your loyalties shift in play.',
            },
        ],
        wargear: [
            { name: 'Kroot Rifle' },
            { name: 'Kroot Armour' },
        ],
        suggested: {
            attributes: [],
            skills: [],
            talents: [ 'core-brutalist', 'core-die-hard', 'core-fear' ],
        },
        suggestedStats: [
            ...suggestedAttributes(3,2,3,2,2,1,1),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.AWARENESS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.STEALTH, 2),
            reqSkill(SKILLS.SURVIVAL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ],
    },
];
