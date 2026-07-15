import {archetype, cost, costz, reqAttribute, reqSkill, wargearz} from "../utils";
import {ATTRIBUTES, SKILLS, TRAITS} from "../../../db/static/_statUtils";

export const aioe = [
    // Asuryani
    {
        ...archetype('aioe', 22,'Asuryani','Guardian',2,'aioe/Aeldari'),
        ...cost(42,10,32, 0, 0),
        hint: 'Militia but with pointy ears.',
        keywords: 'Aeldari,Asuryani,[Craftworld]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'Martial Citizenry',
                snippet:
                    'You are drilled in using basic Asuryani weaponry. ' +
                    'When attacking whilst in cover, gain +Rank to the Rending rating of any SHURIKEN weapons. ' +
                    'When attacking an enemy in cover, gain +Rank ED on any melee attacks.',
            },
        ],
        wargear: wargearz('Aeldari Mesh Armour, Civilian Clothing, 3 Plasma Grenades, Ritual Tools, Shuriken Catapult or Shuriken Pistol and Guardian Chainsword, War Mask'),
    },
    {
        ...archetype('aioe', 23,'Asuryani','Ranger',2,'aioe/Aeldari'),
        ...cost(34,10,24, 0, 0),
        hint: 'A wanderer, a scout, and tracker for the good of their people.',
        keywords: 'Aeldari,Asuryani,[Craftworld]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.STEALTH, 1),
            reqSkill(SKILLS.SURVIVAL, 2),
        ],
        archetypeFeatures: [
            {
                name: 'From the Shadows',
                snippet:
                    'You are adept at exploiting any form of concealment. ' +
                    'Whenever a Vision Penalty (Wrath & Glory page 191) or Cover (Wrath & Glory page 181) ' +
                    'imposes a penalty on someone trying to attack or detect you, the penalty is increased by +Rank DN.',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'defence', modifier: 0, rank: 1, condition: 'when obscured (vision penalty) or in cover' },
                ],
            },
        ],
        wargear: wargearz('Ranger Long Rifle, Shuriken Pistol, Knife, Aeldari Mesh Armour, Cameleoline Cloak, Magnocular Scope, Spirit Stone, Bedroll, Blanket.'),
    },
    {
        ...archetype('aioe', 31,'Asuryani','Warlock',3,'aioe/Aeldari'),
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
                description:
                    '<p>You are a warrior and a Psyker both, adapting your powers to either augment your allies or assail your enemies. ' +
                    'You know the Universal Psyker Abilities (Wrath & Glory page 267), the Smite psychic power, ' +
                    'and a single power of your choice from the Runes of Battle Discipline.</p>',
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
        wargear: wargearz('Shuriken Pistol, Witchblade or Singing Spear, Rune Armour, Set of Wraithbone Runes, Spirit Stone'),
        influence: 2,
    },
    {
        ...archetype('aioe', 32,'Asuryani','Wraithguard',4,'Wraith Construct/aioe-wraith-construct'),
        ...cost(164,30,134, 0, 0),
        hint: 'A guardian of bone and soul',
        keywords: 'Aeldari,Asuryan,Wraith-Construct,[Craftworld]',
        prerequisites: [
            reqAttribute(ATTRIBUTES.STRENGTH, 5),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ],
        archetypeFeatures: [
            {
                name: 'War Construct',
                snippet:
                    'Your new body weathers the strains of battle better than any living creature could. ' +
                    'Any ranged weapons you wield without the Heavy Trait gain the Pistol Trait. ' +
                    'When wielding two melee weapons, you reduce the DN penalty for making Multi-Attacks by 2. ' +
                    'You gain +Rank Determination.',
                modifications: [
                    { targetGroup: 'traits', targetValue: 'determination', modifier: 0, rank: 1 },
                ],
            },
        ],
        wargear: wargearz('Wraithcannon or 2 Ghostswords, Spirit Stone'),
    },
    // Drukhaei
    {
        ...archetype('aioe', 36,'Drukhari','Kabalite Warrior',2,'aioe/Drukhari'),
        ...costz(42,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A power-hungry killer with dark ambitions.',
        keywords: 'Aeldari,Drukhari,[Kabal]',
        archetypeFeatures: [
            {
                name: 'Prey on the Weak',
                snippet:
                    'Your mind is focussed by the scent of fear and suffering. ' +
                    'You gain +Rank bonus dice on attack Tests against enemies that have suffered Wounds, ' +
                    'or Mobs of Troops that have suffered casualties.',
            },
        ],
        wargear: wargearz('Splinter Rifle, Knife, Kabalite Armour, Hooks, Chains, Initiation Token'),
        influence: 1,
    },
    {
        ...archetype('aioe', 37,'Drukhari','Wych',2,'aioe/Drukhari'),
        ...costz(62,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A lightning-fast slayer and gladiatorial performer.',
        keywords: 'Aeldari,Drukhari,[Wych Cult]',
        archetypeFeatures: [
            {
                name: 'Lightning Dodge',
                snippet:
                    'You run circles around your enemy, and take them apart one slice at a time. ' +
                    'When wearing no armour besides a Wychsuit, you gain +Rank Defence against melee attacks.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1, condition: 'when only wearing a Wychsuit' },
                ],
            },
        ],
        wargear: wargearz('Splinter Pistol, Hekatarii Blade, 3 Plasma Grenades, Wychsuit, Combat Drugs, Arena Trophy'),
        influence: 1,
    },
    {
        ...archetype('aioe', 38,'Drukhari','Hellion',2,'aioe/Drukhari'),
        ...costz(36,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.PILOT, 2),
        ]),
        hint: 'An adrenaline junkie and anarchist street racer.',
        keywords: 'Aeldari,Drukhari,[Wych Cult]',
        archetypeFeatures: [
            {
                name: 'Hit and Run',
                snippet:
                    'You do not provoke Reflexive Attacks when you move out of Engagement. You gain +Rank bonus dice on any Pilot (A) Tests related to the operation of your Skyboard.',
                description:
                    '<p>You revel in the confusion of swift attacks, striking fast before sweeping away from victims who fall prey to your Skyboard or Hellglaive. ' +
                    'You do not provoke Reflexive Attacks when you move out of Engagement. ' +
                    'You gain +Rank bonus dice on any Pilot (A) Tests related to the operation of your Skyboard.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.PILOT, modifier: 0, rank: 1, condition: 'when operating your Skyboard' },
                ],
            },
        ],
        wargear: wargearz('Hellglaive, Skyboard with Splinter Pods, Wychsuit, Combat Drugs, Gang Colours, Ornamental Skull'),
    },
    {
        ...archetype('aioe', 39,'Drukhari','Beastmaster',3,'aioe/Drukhari'),
        ...costz(100,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.LEADERSHIP, 2),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.SURVIVAL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A commander of the deadliest animals in the galaxy.',
        keywords: 'Aeldari,Drukhari,[Wych Cult]',
        archetypeFeatures: [
            {
                name: 'Beast Handler',
                snippet:
                    'Gain +Double Rank dice to social Skill Tests against BEASTs. Allied BEASTs within hearing range can spend your Wrath (if that\'s ok for you)',
                description:
                    '<p>You command respect from wild animals, cowing them into obedience. ' +
                    'You gain +Double Rank bonus dice on all social Skill Tests against a creature with the BEAST Keyword. ' +
                    'When you consent, allied BEAST creatures in communication range can spend your Wrath Points as their own.</p>',
            },
        ],
        wargear: wargearz('Agoniser, Skyboard with Splinter Pods, Wychsuit, Beastmaster Mask, Combat Drugs, Hunting Trophy'),
        influence: 2,
    },
    {
        ...archetype('aioe', 40,'Drukhari','Incubus',3,'aioe/Drukhari'),
        ...costz(84,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A formidable disciple of an elite warrior creed.',
        keywords: 'Aeldari,Drukhari,Blades for Hire',
        archetypeFeatures: [
            {
                name: 'Lethal Precision',
                snippet: 'When you inflict a Critical Hit on a melee attack, you inflict +Double Rank Mortal Wounds.',
                description:
                    '<p>You train tirelessly to master the perfect killing strike. ' +
                    'When you inflict a Critical Hit on a melee attack, you inflict +Double Rank Mortal Wounds.</p>',
            },
        ],
        wargear: wargearz('Klaive, Incubus Warsuit, Tormentor, Terms of Covenant, Stolen Spirit Stones and other trophies, Shrine of the Father'),
        influence: 2,
    },
    {
        ...archetype('aioe', 41,'Drukhari','Mandrake',3,'aioe/Drukhari'),
        ...costz(92,[
            reqAttribute(ATTRIBUTES.STRENGTH, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.STEALTH, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A formidable disciple of an elite warrior creed.',
        keywords: 'Aeldari,Drukhari,Blades for Hire',
        archetypeFeatures: [
            {
                name: 'Shadow Resilience',
                snippet: 'When you are not wearing armour, you gain +Rank Resilience, and can roll Determination against attacks that inflict Mortal Wounds.',
                description:
                    '<p>When you are not wearing armour, you gain +Rank Resilience, and can roll Determination against attacks that inflict Mortal Wounds.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: 0, rank: 1, condition: 'when not wearing armour' },
                ],
            },
            {
                name: 'Fog Creature',
                snippet: 'You always count as being in heavy fog, with all corresponding vision penalties (+3 DN to target with Awareness and Ballistic Skill Tests, +2 DN to target with Weapon Skill Tests).',
                description:
                    '<p>You always count as being in heavy fog, with all corresponding vision penalties (+3 DN to target with Awareness and Ballistic Skill Tests, +2 DN to target with Weapon Skill Tests).</p>',
            },
            {
                name: 'Shadow Strider',
                snippet: 'When you move, you ignore all obstacles between your start and end point, so long as you move from one shadow to another.',
                description:
                    '<p>When you move, you ignore all obstacles between your start and end point, so long as you move from one shadow to another.</p>',
            },
        ],
        wargear: wargearz('Glimmersteel Blade, Cloak of Skin, Hooks, Chains, Generated Baleblasts'),
    },
    {
        ...archetype('aioe', 42,'Drukhari','Scourge',3,'aioe/Drukhari'),
        ...costz(70,[
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.INITIATIVE, 3),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A formidable disciple of an elite warrior creed.',
        keywords: 'Aeldari,Drukhari,Blades for Hire',
        archetypeFeatures: [
            {
                name: 'Surgerieal Wings',
                snippet: 'You can fly with 2x Speed and gain +Double Rank dice for aerial maneuveres.',
                description:
                    '<p>You are grafted with wings that allow you to fly at double your normal Speed. ' +
                    'More complicated aerial manoeuvres may require an Athletics (S) Test, with +Double Rank bonus dice.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.ATHLETICS, modifier: 0, rank: 2, condition: 'when making aerial maneuvers with your wings' },
                ],
            },
            {
                name: 'Winged Strike',
                snippet: 'You can spend [Target\'s Resolve -1] shifts on range attacks to Inflict (Pinned) on the target.',
                description:
                    '<p>You can spend Shifts on a successful ranged attack Test to inflict the Pinned Condition on the target. ' +
                    'This costs a number of Shifts equal to the target’s Resolve minus Rank.</p>',
            },
        ],
        wargear: wargearz('Shardcarbine, 3 Plasma Grenades, Ghostplate Armour, Terms of Covenant, Delivery Capsule'),
        influence:2,
    },
    {
        ...archetype('aioe', 43,'Drukhari','Archon',5,'aioe/Drukhari'),
        ...costz(192,[
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqAttribute(ATTRIBUTES.INTELLECT, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.AWARENESS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.CUNNING, 2),
            reqSkill(SKILLS.INTIMIDATION, 4),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A master of a warrior Kabal, seeking bounties in realspace.',
        keywords: 'Aeldari,Drukhari,[Kabal]',
        archetypeFeatures: [
            {
                name: 'Overlord',
                snippet: 'As a Simple Action, spend 1 Wrath to grant all allies (including you) +Rank bonus dice to the next Test they make this encounter in your presence.',
                description:
                    '<p>As a Simple Action, you may spend 1 Wrath to provide yourself and all allies +Rank bonus dice to the next Test they make this encounter in your presence.</p>',
            },
            {
                name: 'Leverage',
                snippet: 'As a free Action, spend 1 Glory to gain 1 Wrath. (up to Rank times per session)',
                description:
                    '<p>As a free Action, spend 1 Glory to gain 1 Wrath. (up to Rank times per session)</p>',
            },
        ],
        wargear: wargearz('Splinter Pistol, Huskblade, Kabalite Armour, Shadowfield, Trophy Rack, Initiation Brand'),
        influence: 4,
    },
    // Harlequin
    {
        ...archetype('aioe', 47,'Harlequin','Troupe Player',3,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(94, [
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A warrior-artist serving the Laughing god (lol).',
        keywords: 'Aeldari,Harleqin,[Masque]',
        archetypeFeatures: [
            {
                name: 'War Dancer',
                snippet:
                    'You fight best as part of a chorus, the strikes of your allies blurring into your own as a storm of blades. ' +
                    'You gain +Double Rank bonus dice on melee attacks against an enemy engaged with an ally.',
                modifications: [
                    { targetGroup: 'skills', targetValue: 'weaponSkill', modifier: 0, rank: 2, condition: 'when target is engaged with an ally' },
                ],
            },
        ],
        wargear: wargearz('Harlequin’s Blade or Harlequin’s Kiss or Harlequin’s Caress or Harlequin’s Embrace, Shuriken Pistol, 3 Plasma Grenades, Holo-Suit, False Face, Flip-Belt'),
        influence: 2,
    },
    {
        ...archetype('aioe', 48,'Harlequin','Death Jester',3,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(176, [
            reqAttribute(ATTRIBUTES.STRENGTH, 4),
            reqAttribute(ATTRIBUTES.AGILITY, 5),
            reqAttribute(ATTRIBUTES.INITIATIVE, 5),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A masked killer with a heavy weapon.',
        keywords: 'Aeldari,Harleqin,[Masque]',
        archetypeFeatures: [
            {
                name: 'Death Is Not Enough ',
                snippet:
                    'You delight in brutal volleys of firepower that demoralise and terrify your enemies. ' +
                    'When you succeed on a ranged attack, any targets of the attack must make a Fear Test, with a DN of 1 + Double Rank. ' +
                    'If none of your targets survived the attack, you can choose another character who witnessed the attack to make the Fear Test instead.',
            },
        ],
        wargear: wargearz('Shrieker Cannon with Jester’s Blade attachment, Holo-Suit, Rictus Mask, Flip-Belt'),
        influence: 2,
    },
    // Corsairs
    {
        ...archetype('aioe', 52,'Corsairs','Voidreaver',2,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(44, [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.PILOT, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 2),
        ]),
        hint: 'A recent recruit to a Corsair Fleet.',
        keywords: 'Aeldari,Anhrathe,[Coterie]',
        archetypeFeatures: [
            {
                name: 'Raiders of the Void',
                snippet:
                    'You are a raider, experienced at operating in the vacuum of space. ' +
                    'Used to zero gravity, and engaging in lighting strike raids, you use speed and guile to your advantage in battle. ' +
                    'You gain +Rank bonus dice to melee or ranged attacks when you Seize the Initiative. ' +
                    'You gain a further +1 die bonus if this ability is used when fighting in zero gravity',
                modifications: [
                    { targetGroup: 'skills', targetValue: 'weaponSkill', modifier: 0, rank: 1, condition: 'when you Seize the Initiative' },
                    { targetGroup: 'skills', targetValue: 'weaponSkill', modifier: 1, rank: 0, condition: 'when you Seize the Initiative in 0g' },
                    { targetGroup: 'skills', targetValue: 'ballisticSkill', modifier: 0, rank: 1, condition: 'when you Seize the Initiative' },
                    { targetGroup: 'skills', targetValue: 'ballisticSkill', modifier: 1, rank: 0, condition: 'when you Seize the Initiative in 0g' },
                ],
            },
        ],
        wargear: wargearz('Shuriken Rifle or Shuriken Pistol and Void Sabre, 3 Plasma Grenades, Corsair Armour, Void Suit, Spirit Stone, 1 extra random trinket'),
    },
    {
        ...archetype('aioe', 53,'Corsairs','Voidscarred',3,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(94, [
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqSkill(SKILLS.ATHLETICS, 2),
            reqSkill(SKILLS.BALLISTIC_SKILL, 2),
            reqSkill(SKILLS.PILOT, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A hardened veteran of the pirating profession.',
        keywords: 'Aeldari,Anhrathe,[Coterie]',
        archetypeFeatures: [
            {
                name: 'Wrath of the Stars ',
                snippet:
                    'Your training has prepared you for any battlefield. When you make a Critical Hit you may roll twice on the Critical Hit table and choose either result.',
            },
        ],
        wargear: wargearz('Shuriken Rifle or Shuriken Pistol and Void Sabre, 3 Plasma Grenades, Corsair Armour, Void Suit, Spirit Stone, 1 extra random trinket'),
    },
    {
        ...archetype('aioe', 54,'Corsairs','Soul Weaver & Wayseeker',2,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(64, [
            reqAttribute(ATTRIBUTES.AGILITY, 3),
            reqAttribute(ATTRIBUTES.WILLPOWER, 4),
            reqSkill(SKILLS.ATHLETICS, 1),
            reqSkill(SKILLS.BALLISTIC_SKILL, 1),
            reqSkill(SKILLS.PILOT, 1),
            reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
            reqSkill(SKILLS.WEAPON_SKILL, 1),
        ]),
        hint: 'A powerful psyker, wielding devastating energies.',
        keywords: 'Aeldari,Anhrathe,[Coterie],Psyker',
        archetypeFeatures: [
            {
                name: 'Void Dreamer',
                snippet: 'You have the PSYKER Keyword, and are a Psyker; you know the Smite psyhcic power.',
                psychicPowers: [
                    { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
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
        wargear: wargearz('Shuriken Pistol and a Corsair Sabre or a Witchstaff, Spirit Stone, Ritual Tools, Set of Wraithbone Runes and recovered Spirit Stones'),
    },
    {
        ...archetype('aioe', 55,'Corsairs','Felarch',3,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(144, [
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 2),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.LEADERSHIP, 3),
            reqSkill(SKILLS.PILOT, 3),
            reqSkill(SKILLS.WEAPON_SKILL, 3),
        ]),
        hint: 'A veteran Corsair, inspiring those in your command.',
        keywords: 'Aeldari,Anhrathe,[Coterie]',
        archetypeFeatures: [
            {
                name: 'Captain of the Stars',
                snippet: 'You and visible allies within 20m gain +Double Rank to Resolve test. Add +Double Rank dice to Intimidation tests.',
                description:
                    '<p>You and any allies within 20 metres of you that can see you may add +Double Rank bonus dice to Resolve Tests. ' +
                    'You add +Double Rank bonus dice to any Intimidation (Wil) Tests, including Interaction Attacks.</p>',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 2, condition: 'for You and allies within 20 metres' },
                    { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 2 },
                ],
            },
        ],
        wargear: wargearz('Shuriken Rifle or Shuriken Pistol and Master Crafted Void Sabre, Corsair Armour, 3 Plasma Grenades, Spirit Stone, Void Suit, +d3 Trinkets'),
    },
    {
        ...archetype('aioe', 56,'Corsairs','Corsair Prince',3,'aioe/Aeldari'),
        species:  [
            { name: 'Aeldari', key: `aioe-aeldari}`, sourceKey: 'aioe' },
            { name: 'Drukhari', key: `aioe-drukhari}`, sourceKey: 'aioe' },
        ],
        ...costz(210, [
            reqAttribute(ATTRIBUTES.STRENGTH, 2),
            reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
            reqAttribute(ATTRIBUTES.AGILITY, 4),
            reqAttribute(ATTRIBUTES.INITIATIVE, 4),
            reqAttribute(ATTRIBUTES.WILLPOWER, 3),
            reqAttribute(ATTRIBUTES.INTELLECT, 2),
            reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
            reqSkill(SKILLS.ATHLETICS, 3),
            reqSkill(SKILLS.AWARENESS, 3),
            reqSkill(SKILLS.BALLISTIC_SKILL, 3),
            reqSkill(SKILLS.CUNNING, 3),
            reqSkill(SKILLS.INTIMIDATION, 2),
            reqSkill(SKILLS.LEADERSHIP, 4),
            reqSkill(SKILLS.PILOT, 4),
            reqSkill(SKILLS.WEAPON_SKILL, 4),
        ]),
        hint: 'A leader of a Corsair fleet, strategic and ruthless.',
        keywords: 'Aeldari,Anhrathe,[Coterie]',
        archetypeFeatures: [
            {
                name: 'Lord of the Galaxy',
                snippet: '+Double Rank dice to social interactions with AELDARI or DRUKHARI. +Double Rank to Cunning when commanding ANRATHE.',
                description:
                    '<p>You gain +Double Rank bonus dice to social Skill Tests when interacting with a character with the AELDARI or DRUKHARI Keywords. ' +
                    'You gain +Double Rank bonus to all Cunning Tests when commanding ANHRATHE characters and units.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.CUNNING, modifier: 0, rank: 2, condition: 'when commanding ANRATHE' },
                ],
            },
        ],
        wargear: wargearz('Shuriken Pistol and Master Crafted Void Sabre, 3 Plasma Grenades, Corsair Armour, Mist Shield, Spirit Stone, Court garb, Ritual Tools, d6+3 Trinkets'),
    },
];
