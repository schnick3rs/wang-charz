import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../../db/static/_statUtils";


export const aaoaChaos = [
    {
        ...archetype('aaoa2', 44, 'Chaos', 'Chaos Space Marine', 3, 'Adeptus Astartes'),
        ...costz(50, [  /* TODO */]),
        hint: 'Monstrous traitors and savage posthuman killers',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
        influence: 2,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Masters of Slaughter: The cruelty and malice of a Chaos Space Marine knows no limit, and few can endure their wrath. When making a critical hit, they count as improving the severity of the critical hit as if they had spent one Glory. They may still spend additional Glory to increase the severity further.'),
        ],
        wargearString:
            'Aquila power armour, boltgun or chainsword, bolt pistol, Astartes combat knife, 3 frag and 3 krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            {
                name: 'Boltgun or Chainsword',
                options: [
                    { name: 'Boltgun' },
                    { name: 'Chainsword' },
                ]
            },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 44, 'Chaos', 'Chaos Space Marine Raptor', 3, 'Adeptus Astartes'),
        ...costz(60, [  /* TODO */]),
        hint: 'Cruel hunters who descent upon shrieking wings of fire',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.PILOT, 3),
            reqSkill(SKILLS.INTIMIDATION, 3),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
        influence: 2,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Cruel Hunters: Enemies within 15m of a Chaos Space Marine Raptor add +½ Rank to the DN of any Resolve tests they are required to make.'),
        ],
        wargearString:
            'Aquila power armour, bolt pistol, chainsword, 3 frag and krak grenades, jump pack.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Jump Pack' },
            { name: 'Chainsword' },
            { name: 'Bolt Pistol' },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 45, 'Chaos', 'Chaos Space Marine Havoc', 3, 'Adeptus Astartes'),
        ...costz(60, [  /* TODO */]),
        hint: 'Heavy weapon specialists who revel in endless destruction',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.TECH, 3),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
        influence: 2,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Addicted to Destruction: When a Chaos Space Marine Havoc rolls a 6 on their Wrath die when making a ranged attack, they may forego their critical hit and spend a reload in order to make a second ranged attack with that weapon. This second attack may not allow them to make any additional attacks.'),
        ],
        wargearString:
            'Aquila power armour, bolt pistol, 3 frag and krak grenades, and one of the following weapons: autocannon, flamer, heavy bolter, missile launcher with 6 frag and 6 krak missiles, lascannon, melta gun, or plasma gun.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Bolt Pistol' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            {
                name: 'Krak Grenade',
                options: [
                    { name: 'autocannon' },
                    { name: 'flamer' },
                    { name: 'heavy bolter' },
                    { name: 'missile launcher' },
                    { name: 'lascannon' },
                    { name: 'melta gun' },
                    { name: 'plasma gun' },
                ],
            },
        ],
    },
    {
        ...archetype('aaoa2', 43, 'Chaos', 'Khorne Berzerker', 3, 'Adeptus Astartes'),
        ...costz(80, [  /* TODO */]),
        hint: 'Frenzied, bloodthirsty killers who have devoted themselves to the Blood God',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ],
        keywords: 'Heretic, Chaos, Khorne, Heretic Astartes, [Legion]',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Blood for the Blood God!: When a Khorne Berzerker makes an All-Out Attack, they may choose up to ½ Rank dice in their dice pool to be Wrath dice, in addition to the normal Wrath die. If any of these Wrath dice are 6s, then the character scores a critical hit. They gain one level of extra severity on that critical hit, as if a Glory had been spent, for every Wrath die after the first which rolls a 6.'),
        ],
        wargearString:
            'Aquila power armour, chainsword or chain axe, bolt pistol, 3 frag and 3 krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            {
                name: 'Chainsword or chain axe',
                options: [
                    { name: 'Chainsword' },
                    { name: 'chain axe' },
                ],
            },
            { name: 'Bolt Pistol' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 46, 'Chaos', 'Nurgle Plague Marine', 3, 'Adeptus Astartes', true),
        hint: 'Nigh-unstoppable foot-soldiers of the God of Disease',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
        ],
        keywords: 'Heretic, Chaos, Nurgle, Heretic Astartes, [Legion]',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
            { targetGroup: 'traits', targetValue: TRAITS.SPEED, modification: -1 },
        ],
        archetypeFeatures: [
            simpleAbility('Disgustingly Resilient: Plague Marines are extraordinarily durable, as they feel no pain and they draw their nauseating vitality from their patron god. A Plague Marine may Soak mortal wounds and does not cost them any Shock.'),
            {
                name: 'Bulky and Bloated',
                snippet: 'Your speed is decreased by 1.',
                description: '<p>Plague Marines reduce their Speed by 1.</p>',
            }
        ],
        wargearString:
            'Aquila power armour, bolt gun, plague knife, 3 blight grenades and 3 krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Bolt Gun' },
            { name: 'Plague Knife' },
            { name: 'Blight Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 46, 'Chaos', 'Slaanesh Noise Marine', 3, 'Adeptus Astartes', true),
        hint: 'Sensation-addicted warriors of the Prince of Pleasure, armed with sonic weaponry',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.AWARENESS, 4),
        ],
        keywords: 'Heretic, Chaos, Slaanesh, Heretic Astartes, [Legion]',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Cacophony and Ecstasy: Noise Marines gain +Rank on all skill tests that relate specifically to hearing, and can pick out sounds, and variations in sounds that a normal human cannot. Further, a Noise Marine heals ½ Rank shock at the end of every turn, as they revel in the sensations of battle. However, a Noise Marine who is reduced to 0 Shock is staggered as well as exhausted, as they are overcome by sensation.'),
        ],
        wargearString:
            'Aquila power armour, bolt gun or sonic blaster, Astartes combat knife, 3 frag and 3 krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            {
                name: 'bolt gun or sonic blaster',
                options: [
                    { name: 'Bolt Gun' },
                    { name: 'Sonic Blaster' },
                ],
            },
            { name: 'Astartes Combat Knife' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 47, 'Chaos', 'Chaos Sorcerer', 3, 'Adeptus Astartes', true),
        hint: 'Warrior-mystics who have dabbled in the blasphemous powers of the Warp',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 3),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Psyker',
        influence: 3,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            {
                name: 'Psyker',
                snippet: 'You learn the Smite power and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specifc powers',
                description:
                    '<p>A Sorcerer begins play with the smite psychic power and one minor psychic power. ' +
                    'He may also purchase additional minor psychic powers and Universal Psychic powers, ' +
                    'Maleficarum Psychic Powers, or Dark Hereticus discipline, subject to Tier restrictions.</p>',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Biomancy',
                    'Divination',
                    'Pyromancy',
                    'Telekinesis',
                    'Telepathy',
                    'Universal',
                    'Maleficarum',
                    'Dark Hereticus', // AAOA Spells
                ],
            },
            simpleAbility('Hatred of Khorne', 'Sorcerers may never choose the Khorne keyword.'),
        ],
        wargearString:
            'Aquila power armour, force sword, bolt pistol, 3 frag and 3 krak grenades.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Force Sword' },
            { name: 'Bolt Pistol' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
        ],
    },
    {
        ...archetype('aaoa2', 46, 'Chaos', 'Warpsmith', 3, 'Adeptus Astartes'),
        ...costz(55, [  /* TODO */]),
        hint: 'An artisan who blends warpcraft and engineering to create daemonic machines of war.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
            reqSkill(SKILLS.SCHOLAR, 1),
            reqSkill(SKILLS.TECH, 3),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Dark Mechanicus',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Master of Mechanisms: Warpsmiths automatically reduce the time by half for any Tech test. They receive +Rank on any test to summon or bind a daemon into a machine, or to command a daemonic machine.'),
        ],
        wargearString:
            'Fleshmetal armour, bolt pistol, power axe, 3 frag and krak grenades, augmetic servo-arm, choice of two augmetics',
        wargear: [
            { name: 'Fleshmeta Armor' },
            { name: 'Bolt Pistol' },
            { name: 'Power Axe' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Mechadendrites (Servo-Arm)' },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        subtypeFilter: ['Augmetics'],
                    },
                ],
            },
            {
                name: 'One augmetics of your choice.',
                selected: '',
                options: [
                    {
                        filter: true,
                        subtypeFilter: ['Augmetics'],
                    },
                ],
            },
        ],
    },
    {
        ...archetype('aaoa2', 46, 'Chaos', 'Dark Apostle', 4, 'Adeptus Astartes'),
        ...costz(60, [  /* TODO */]),
        hint: 'A furious zealot-priest, speaking blasphemous prayers from blood-flecked lips.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
            reqSkill(SKILLS.SCHOLAR, 4),
            reqSkill(SKILLS.INTIMIDATION, 4),
        ],
        keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Priest',
        influence: 3,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Demagogue: A Chaplain, and all allies with the Chaos keyword within 15+Rank metres, may add +Rank to their Resolve.'),
        ],
        wargearString:
            'Aquila power armour, bolt pistol, Accursed Crozius (Crozius Arcanum), 3 frag and krak grenades, Sigil of Corruption.',
        wargear: [
            { name: 'Aquila Mk VII' },
            { name: 'Crozius Arcanum', variant: 'Accused Crozium' },
            { name: 'Frag Grenade', amount: 3 },
            { name: 'Krak Grenade', amount: 3 },
            { name: 'Sigil of Corruption' },
        ],
    },
    {
        ...archetype('aaoa2', 48, 'Chaos', 'Khorngor', 1, 'aaoa/Beastman'),
        ...costz(20, [  /* TODO */]),
        hint: 'Savage beastmen, driven to a berserk rage by the scent of blood.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        keywords: 'Heretic, Chaos, Khorne',
        influence: 0,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('The Scent of Blood: After an enemy has been killed in a scene, a Khorngor becomes frenzied, and must make WP tests to restrain themselves. While frenzied, however, they add +½ Rank ED to all melee damage rolls they make.'),
        ],
        wargearString:
            'Two axes, or chainaxe and Autopistol, flak armour',
        wargear: [
            { name: 'Flak Armour' },
            {
                name: 'Two axes, or chainaxe and Autopistol, flak armour',
                options: [
                    { name: 'Axe', amount: 2 },
                    { name: 'Chain Axe and Autopistol' },
                ],
            },
        ],
    },
    {
        ...archetype('aaoa2', 49, 'Chaos', 'Pestigor', 1, 'aaoa/Beastman'),
        ...costz(20, [  /* TODO */]),
        hint: 'Monstrous beastmen, uncaring to pain or fear.',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 1),
        ],
        keywords: 'Heretic, Chaos, Nurgle',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Inured to Suffering: Pestigor know no pain or fear, and little can dissuade them from their task. They increase both their Resolve and their Soak by +½ Rank.'),
        ],
        wargearString:
            'Autogun, plague knife, flak armour',
        wargear: [
            { name: 'Flak Armour' },
            { name: 'Autogun' },
            { name: 'Plague Knife' },
        ],
    },
    {
        ...archetype('aaoa2', 49,  'Chaos', 'Slaangor',  1,'aaoa/Beastman', false),
        ...costz(20, [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
            reqSkill(SKILLS.PERSUASION, 1),
        ]),
        hint: 'Beastmen who glory in the name of the Prince of Pleasure',
        keywords: 'Heretic, Chaos, Slaanesh',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            simpleAbility('Distracting Musk: Slaangor exude a faintly soporific musk that disrupts the concentration of any who stray too close. Characters within 5m of a Slaangor increase the DN of all Willpower and Resolve tests by ½ Rank. This does not affect characters with the Slaanesh keyword, who’ve already built up a resistance to it.'),
        ],
        wargearString:
            'Two swords, mesh armour.',
        wargear: [
            { name: 'Mesh Armour' },
            { name: 'Sword' },
            { name: 'Sword' },
        ],
    },
    {
        ...archetype('aaoa', 42, 'Chaos', 'Tzaangor', 1, 'aaoa/Beastman'),
        ...costz(
            38,
            [
                reqAttribute(ATTRIBUTES.STRENGTH, 3),
                reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
                reqAttribute(ATTRIBUTES.INTELLECT, 3),
                reqSkill(SKILLS.SCHOLAR, 1),
                reqSkill(SKILLS.WEAPON_SKILL, 2),
            ],
        ),
        hint: 'Twisted, cunning Beastmen who serve sorcerous masters',
        keywords: 'Chaos, Abhuman, Heretic, Tzeentch',
        influence: 1,
        modifications: [
            { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
        ],
        archetypeFeatures: [
            {
                name: 'Aura of Change',
                snippet: 'Your Resilience increases by +Rank, and you make roll Determination against Mortal Wounds. In addition, gain +1d3 Corruption.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: 0, rank: 1 },
                ],
                selected: [''],
                options: [
                    { key: 'corruption-1', name: 'Gain 1 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 1 }] },
                    { key: 'corruption-2', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 }] },
                    { key: 'corruption-3', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
                ],
            },
        ],
        wargearString:
            'Two swords, or chainsword and autopistol.',
        wargear: [
            {
                name: 'Two swords, or chainsword and autopistol.',
                options: [
                    { name: 'Sword', amount: 2 },
                    { name: 'Chainsword and Autopistol' },
                ],
            },
        ],
    },
];
