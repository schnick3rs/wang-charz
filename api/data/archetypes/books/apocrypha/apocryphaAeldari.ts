import {archetype, costz, reqAttribute, reqSkill, simpleAbility, wargearz} from "../../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../../db/static/_statUtils";

export const aaoaAeldari = [
    // Craftsworld
    {
        ...archetype('aaoa', 35, 'Aeldari', 'Guardian', 1, 'Aeldari'),
        ...costz(20,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            // OR reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A Cratsworld Last Line of Defence.',
        keywords: 'Aeldari, Asuryani, [Craftworld]',
        archetypeFeatures: [
            {
                name: 'The Last Line',
                description:
                    '<p>Guardians march to war only when necessary, for the Asuryani are few and their lives are precious. This grim necessity means you increase your Resolve and Conviction by Rank.</p>',
            },
        ],
        wargear: wargearz('Eldar Mesh Armour, Shuriken Catapult, Mono Knife, 3 plasma grenade, spirit stone'),
    },
    {
        ...archetype('aaoa', 47, 'Aeldari', 'Bonesinger', 2, 'Aeldari'),
        ...costz(72,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'Shapers of Bone.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Psyker',
        archetypeFeatures: [
            {
                name: 'Path of the Shaper',
                // TODO probably error
                snippet: 'You are a psyker; you know the Smite and Vaul’s Song psychic powers and may learn other powers as described in Chapter 11.',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                    { name: 'psykerVaulsSong', selected: 'Vaul´s Song', query: { name: 'Vaul´s Song' }, options: [], free: true },
                ],
            },
            {
                name: 'Unlock Disciplines',
                snippet: 'You gain access to the Minor, Universal, Divination and Runes of Shaping Disciplines. You also gain access to one additional Discipline.',
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
                    { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
                ],
                psychicDisciplines: [
                    'Minor',
                    'Universal',
                    'Divination',
                    'Runes of Shaping',
                ],
            },
        ],
        wargear: wargearz('Rune armour, psytronome shaper, a set of wraithbone runes, Bonesinger shard, Spirit Stone'),
        influence: 1,
    },
    // Craftsworld > Aspect warriors
    {
        ...archetype('aaoa', 67, 'Aeldari', 'Dark Reaper', 3, 'Aeldari'),
        ...costz(92,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 5),
            reqSkill(SKILLS.AWARENESS, 3),
        ]),
        hint: 'Aspect warriors, merciless and deadly at range.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Inescapable Aim: You may reroll up to Double Rank dice on any Ranged Attack you make.'),
        ],
        wargear: wargearz('Heavy Aspect Armour, Reaper Launcher, Dark Reaper Rangefinder, Mono Knife, spirit stone'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 70, 'Aeldari', 'Dire Avenger', 3, 'Aeldari'),
        ...costz(116,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        hint: 'Aspect warriors, skilled in the arts of aggressive defence.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Defensive Tactics: You add +Rank to your Defence. In addition, when an enemy Charges you, you may make a ranged attack against them as a Reflexive Action, adding +2 to the DN of the attack. This attack is resolved before the enemy moves.'),
        ],
        wargear: wargearz('Aspect Armour, Avenger Shuriken Catapult, targeting vane, Mono Knife, 3 plasma grenade, spirit stone'),
        influence: 2,
    },
    {
        ...archetype('aaoa', 71, 'Aeldari', 'Fire Dragon', 3, 'Aeldari'),
        ...costz(108,[
            reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 5),
            reqSkill(SKILLS.TECH, 3),
        ]),
        hint: 'Aspect warriors, turning all in their path to molten ruin.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        modifications: [],
        archetypeFeatures: [
            simpleAbility('Assured Destruction: When you attack a vehicle, structure, or monstrous creature, add +Rank ED to the attack. In addition, add +Rank to your resilience against attacks with the FIRE or MELTA keywords.'),
        ],
        wargear: wargearz('Heavy Aspect Armour, Fusion Gun, 1 melta bomb, Mono Knife, spirit stone'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 75, 'Aeldari', 'Howling Banshee', 3, 'Aeldari'),
        ...costz(127,[
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'Aspect warriors, swift shock troops whose shriek freezes the hearts of their foes.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Swift Death: When you Run, Charge, or Sprint, increase your Speed by +Rank. In addition, you may use Agility instead of Strength for your Athletics skill tests.'),
        ],
        wargear: wargearz('Aspect Armour, shuriken pistol, power sword, Banshee Mask, spirit stone'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 75, 'Aeldari', 'Shining Spear', 3, 'Aeldari'),
        ...costz(141,[
            reqAttribute(ATTRIBUTES.STRENGTH, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.PILOT, 5),
            reqSkill(SKILLS.TECH, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'Aspect warriors, jetbike-mounted lancers who slay the mightiest foes',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Ride the Wind: You may reroll Double Rank dice on any Pilot test you make when operating an Aeldari Jetbike'),
        ],
        wargear: wargearz('Heavy Aspect Armour, Laser Lance, Aeldari Jetbike, spirit stone'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 82, 'Aeldari', 'Striking Scorpion', 3, 'Aeldari'),
        ...costz(108,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.STEALTH, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'Aspect warriors, stealthy killers who strike with unseen power.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Hunt in the Shadows: You may reroll up to Double Rank dice when making a Stealth test. In addition, you add +Rank bonus dice when you make a Surprise Attack.'),
        ],
        wargear: wargearz('Heavy Aspect Armour, Scorpion Chainsword, Shuriken Pistol, Mandiblaster Helm, 3 plasma grenade, Spirit Stone'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 83, 'Aeldari', 'Swooping Hawk', 3, 'Aeldari'),
        ...costz(101,[
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 5),
        ]),
        hint: 'Aspect warriors, flitting across the skies to deal vengeance.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Skyleap: So long as you are able to Fly, you may Fall Back as a Simple action, rather than a Combat Action. In addition, when you take the Full Defence action, you immediately move twice your Flying Speed (instead of halving your Speed) away from the enemy and add +Rank bonus dice to the Initiative test to increase your Defence. Naturally, these abilities require that you be able to fly, and have room to do so.'),
        ],
        wargear: wargearz('Aspect Armour, Lasblaster, Mono Knife, Swooping Hawk Wings, Swooping Hawk Grenade Pack, 6 plasma grenade, Spirit Stone'),
        influence: 2,
    },
    {
        ...archetype('aaoa', 85, 'Aeldari', 'Warp Spider', 3, 'Aeldari'),
        ...costz(108,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.TECH, 2),
        ]),
        hint: 'Aspect warriors, appearing from nowhere to cut down their prey.',
        keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
        archetypeFeatures: [
            simpleAbility('Flickerjump: As a Reflexive Action when a ranged attack is made against you, you may add +Double Rank to your Defence, as you use your Warp Jump Generator to flicker in and out of reality.'),
        ],
        wargear: wargearz('Heavy Aspect Armour, Death Spinner, Warp Jump Generator, Mono Knife, spirit stone'),
        influence: 1,
    },
    // Harlequin
    {
        ...archetype('aaoa', 93, 'Aeldari', 'Harlequin Player', 4, 'Aeldari'),
        ...costz(200, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'You are a performer upon a galactic stage, playing your part in a performance that shapes worlds and lives. Your existence is enigma, but there can be no doubting your skill or your lethality.',
        keywords: 'Aeldari, Harlequin, [Masque]',
        archetypeFeatures: [
            {
                name: 'We Dance the Dance of Death',
                description:
                    '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                ],
            },
        ],
        wargear: wargearz('Holo-suit, Agaith, Flip-Belt, Harlequins Blade, Shuriken Pistol, 3 Plasma Grenades'),
        influence: 3,
    },
    {
        ...archetype('aaoa', 115, 'Aeldari', 'Harlequin Troupe Master', 5, 'Aeldari'),
        ...costz(226, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'Your soul is forfeit, for you portray the Great Enemy in the grimmest of performances, and none can do so without cost. But you pay that price willingly, to defend your people from the horror that awaits you.',
        keywords: 'Aeldari, Harlequin, [Masque]',
        archetypeFeatures: [
            {
                name: 'We Dance the Dance of Death',
                description:
                    '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                ],
            },
            {
                name: 'Pivotal Role',
                snippet: 'Choose one...',
                selected: [''],
                options: [
                    {
                        name: 'Choreographer of War',
                        snippet: 'Harlequin allies within 6 metres of you add +Rank ED to their melee attacks.',
                    },
                    {
                        name: 'Prince of Light',
                        snippet: 'When you or any HARLEQUIN allies within 6 metres Charge, you increase your total movement by +Rank.',
                    },
                    {
                        name: 'Darkness Bite',
                        snippet: 'After you make a melee attack, you may inflict a number of Mortal Wounds equal to your Rank, allocated amongst any enemies you hit during your attack.',
                    },
                    {
                        name: 'Twilight Grasp',
                        snippet: 'When you make a melee attack against an enemy which is not a Vehicle or Monstrous Creature, your melee weapon gains the Warp Weapon trait.',
                    },
                ],
            },
        ],
        wargear: [
            { name: 'Holo-suit' },
            { name: 'Agaith' },
            { name: 'flip-belt' },
            { name: 'Webway Keystone' },
            { name: 'Plasma Grenade', amount: 3 },
            {
                name: 'Any one AELDARI melee weapon of Value 9 or less up to Very Rare',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        typeFilter: ['Melee Weapon'],
                        keywordFilter: ['Aeldari'],
                    },
                ],
            },
            {
                name: 'Any one pistol of Value 9 or less up to Very Rare',
                selected: '',
                options: [
                    {
                        filter: true,
                        valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                        rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                        traitFilter: ['Pistol']
                    },
                ],
            },
        ],
        influence: 5,
    },
    {
        ...archetype('aaoa', 113, 'Aeldari', 'Harlequin Shadowseer', 5, 'Aeldari'),
        ...costz(281, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 6),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'You personify Fate, and all who look upon your mirrored face see something different; what was, what might be, what could have been, or what must be.',
        keywords: 'Aeldari, Harlequin, [Masque], Psyker',
        archetypeFeatures: [
            {
                ...simpleAbility('We Dance the Dance of Death', 'You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.'),
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                ],
            },
            {
                name: 'Pivotal Role',
                snippet: 'Choose one...',
                selected: [''],
                options: [
                    {
                        name: 'Shield from Harm',
                        snippet: 'Allies within 6 metres of you add +Rank to their Resilience.',
                    },
                    {
                        name: 'Veil of Illusion',
                        snippet: 'Whenever a ranged attack targets an ally within 6 metres of you, the attacker counts the range to their attacker as being +Triple Rank metres longer than it actually is.',
                    },
                    {
                        name: 'Gloomwake',
                        snippet: 'Allies within 6 metres of you receive +Rank Defence against ranged attacks. This is considered to be a bonus from Cover.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1, condition: 'you and allies within 6m, against ranged attacks.' },
                        ],
                    },
                    {
                        name: 'Agent of Bedlam',
                        snippet: 'Enemies within 6 metres of you add +Rank to the DN of all melee attacks they make.',
                    },
                ],
            },
            {
                name: 'Psyker',
                snippet: 'You are a Psyker, and you know the Smite psychic power. You may learn additional psychic powers from the Divination, Telepathy, and Phantasmancy disciplines.',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
                ],
                psychicDisciplines: [
                    'Divination',
                    'Telepathy',
                    'Phantasmancy', // AAOA Spells
                ],
            },
        ],
        wargear: wargearz('Holo-suit, Agaith, flip-belt, miststave, shuriken pistol, pack grenade launcher, 6 hallucinogen grenades'),
        influence: 4,
    },
    {
        ...archetype('aaoa', 112, 'Aeldari', 'Harlequin Death Jester', 5, 'Aeldari'),
        ...costz(238, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 4),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.TECH, 1),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        hint: 'Upon the stage and the battlefield alike, you portray Death itself—aloof, bold, inescapable, cruel, and often ironic.',
        keywords: 'Aeldari, Harlequin, [Masque]',
        archetypeFeatures: [
            {
                name: 'We Dance the Dance of Death',
                description:
                    '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                ],
            },
            {
                name: 'Pivotal Role',
                snippet: 'Choose one...',
                selected: [''],
                options: [
                    {
                        name: 'Death is Not Enough',
                        snippet: 'Damage rolls you make against enemies who are currently suffering from the effects of Fear, Terror, or Pinning add +Rank ED.',
                    },
                    {
                        name: 'Harvester of Torment',
                        snippet: 'When you make a successful ranged attack against a Mob, you count as scoring +Double Rank additional Icons when determining how many of the Mob you hit.',
                    },
                    {
                        name: 'The Jest Inescapable',
                        snippet: 'Add +6 to the short range of your ranged weapon, +12 to the medium range, and +18 to the long range. In addition, the weapon gains the Mortal [1] trait.',
                    },
                    {
                        name: 'Humbling Cruelity',
                        snippet: 'Your ranged weapon gains the Inflict [Pinned] trait, and enemies add your Rank to the DN of tests to resist being Pinned or to recover from pinning.',
                    },
                ],
            },
        ],
        wargearString:'Holo-suit, Agaith, Flip-Belt, Master-Crafted Shuriken Cannon, 3 Shrieker Bio-Explosive Discs',
        wargear: [
            { name: 'Holo-suit' },
            { name: 'Agaith' },
            { name: 'Flip-Belt' },
            { name: 'Shrieker Bio-Explosive Discs', amount: 3 },
            { name: 'Shuriken Cannon', variant: 'Master-Crafted Shuriken Cannon' },
        ],
        influence: 4,
    },
    {
        ...archetype('aaoa', 114, 'Aeldari', 'Harlequin Solitaire', 5, 'Aeldari'),
        ...costz(283, [
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 6),
            reqSkill(SKILLS.ATHLETICS, 4),
            reqSkill(SKILLS.DECEPTION, 3),
            reqSkill(SKILLS.INTIMIDATION, 3),
            reqSkill(SKILLS.INSIGHT, 3),
            reqSkill(SKILLS.SCHOLAR, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 6),
        ]),
        hint: 'Your soul is forfeit, for you portray the Great Enemy in the grimmest of performances, and none can do so without cost. But you pay that price willingly, to defend your people from the horror that awaits you.',
        keywords: 'Aeldari, Harlequin, [Masque]',
        archetypeFeatures: [
            {
                name: 'Impossible Grace',
                description:
                    '<p>You add +Rank to Speed and Defence, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                    { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1 },
                ],
            },
            {
                name: 'The Path of Damnation',
                description:
                    '<p>Other Aeldari shun you, and you add +6 to the DN of all Interaction tests with other Aeldari outside of ritual circumstances or performances. All Aeldari – even allies – must pass a Fear test (DN 3) when they first meet you. However, you automatically succeed at all Conviction and Resolve tests.</p>',
            },
            {
                name: 'Pivotal Role',
                snippet: 'Choose one...',
                selected: [''],
                options: [
                    {
                        name: 'Blitz',
                        snippet: 'At the start of one of your turns, you may choose to initiate a Blitz. When you do so, your Speed is doubled, and you ignore Double Rank DN increases on Multi-Attacks until the end of your turn. Once you have done this, you cannot do so again until after your next Regroup.',
                    },
                    {
                        name: 'Shocking Emergence',
                        snippet: 'As a Free Action at the start of combat, you may take on an indistinct, shimmering form, and cannot be seen or targeted by enemies or allies; you cannot take any actions other than movement in this form. At the start of any of your turns, you may reveal yourself, and you add +Rank bonus dice to any melee attack you make if you charge on the turn you reveal yourself.',
                    },
                    {
                        name: 'Chromatic Rush',
                        snippet: 'Your speed is increased by +Double Rank instead of +Rank.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
                        ],
                    },
                    {
                        name: 'Unnatural Acrobatics',
                        snippet: 'Your Defence is increased by +Double Rank instead of +Rank.',
                        modifications: [
                            { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1 },
                        ],
                    },
                ],
            },
        ],
        wargear: wargearz('Holo-suit, Agaith, flip-belt, Harlequins Caress, Harlequins Kiss'),
    },
    // druchari
    {
        ...archetype('aaoa', 38, 'Drukhari', 'Kabalite Warrior', 1, 'aaoa/Drukhari'),
        ...costz(38,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.STRENGTH, 2),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.CUNNING, 1),
            reqSkill(SKILLS.INTIMIDATION, 2),
        ]),
        factionKey: 'aaoa-drukhari',
        hint: 'A dark hunter from the noble houses.',
        keywords: 'Aeldari,Drukhari,[Cabal]',
        archetypeFeatures: [
            {
                name: 'Tormentor',
                snippet: 'You add +Double Rank bonus dice to all Intimidation Interaction attacks you make.',
            },
        ],
        wargear: wargearz('Kabalite Warsuit, Splinter Rifle, Mono Knife'),
        influence: 1,
    },
    {
        ...archetype('aaoa', 38, 'Drukhari', 'Wych', 1, 'aaoa/Drukhari'),
        ...costz(52,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.STRENGTH, 2),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        factionKey: 'aaoa-drukhari',
        hint: 'A deadly cult gladiator.',
        keywords: 'Aeldari,Drukhari,[Cult]',
        archetypeFeatures: [
            {
                name: 'Hekatarii Prowess',
                snippet: 'As long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds. In addition, enemies attempting to Fall Back must pass an Agility test (DN 2+ Double Rank); failure means that they cannot Fall Back this turn.',
            },
        ],
        wargear: wargearz('Wychsuit, Hekatarii blade, splinter pistol, 3 plasma grenade, 3 Hekatarii Combat Drugs'),
    },
    {
        ...archetype('aaoa', 76, 'Drukhari', 'Incubus', 3, 'aaoa/Drukhari'),
        ...costz(102,[
            reqAttribute(ATTRIBUTES.STRENGTH, 3),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 5),
        ]),
        factionKey: 'aaoa-drukhari',
        hint: 'A deadly cult gladiator.',
        keywords: 'Drukhari',
        archetypeFeatures: [
            {
                name: 'Lethal Precision',
                snippet: 'For each Exalted Icon you roll on the damage roll for a melee attack, you may roll one additional ED. These additional ED cannot themselves allow you to roll extra ED.',
            },
        ],
        wargear: wargearz('Incubi Warsuit, Klaive, Tormentor'),
        influence: 1,
    },
];
