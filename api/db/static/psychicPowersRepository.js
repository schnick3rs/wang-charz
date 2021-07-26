import { source } from './_sourcesRepository';

const ACTIVATION = {
  FREE_ACTION: 'Free Action',
  ACTION: 'Action',
  COMBAT_ACTION: 'Combat Action',
  SIMPLE_ACTION: 'Simple Action',
  FULL_ACTION: 'Full Action',
  REACTION: 'Reaction',
};

const DURATION = {
  INSTANT: 'Instant',
  SUSTAINED: 'Sustained',
  ONE_ROUND: '1 Round',
  ONE_COMBAT: '1 Combat',
  ONE_SCENE: '1 Scene',
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const powerz = function(sourceKey, sourcePage, name, discipline, cost, effect, stub = false) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub,
  };
};

const simpleStub = function (id, sourceKey, sourcePage, cost, name, discipline, effect) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    discipline,
    effect,
    stub: true,
  };
};

const simpleCrunch = function (dn, activation, duration, range, multi, effect, potency = '') {
  return {
    crunch_difficulty_number: dn,
    crunch_activation: activation,
    crunch_duration: duration,
    crunch_range: range,
    crunch_multi_target: multi,
    crunch_effect: effect,
    crunch_potency: potency.split(';'),
  };
};

const coreUniversalAbilities = [
  {
    ...powerz('core',267,'Psyniscience','Universal Ability',0),
    ...simpleCrunch(3, ACTIVATION.FREE_ACTION, DURATION.INSTANT,'50 m',false),
    keywords: ['Psychic'],
    effect: 'Search the area for signs of psychic presence. I not considered a psychic power, no perils of warp.',
  },
  {
    ...powerz('core',267,'Deny The Witch','Universal Ability',0),
    ...simpleCrunch(3,'Action*', DURATION.INSTANT,'50 m',false),
    keywords: ['Psychic'],
    effect: 'Hinder others to affect the Warp.',
  },
];

const corePowers = [
  {
    ...powerz('core',268,'Chameleon','Minor',8),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: '+3 to Stealth and +1 Defence vs Ranged Attacks.',
    description: '<p>You bend reality just enough to cause your image to blend with your surroundings. While this power remains in effect, you gain +5 bonus dice to Stealth (A) Tests and + 1 to your Defence against ranged attacks.</p>',
  },
  {
    ...powerz('core',268,'Compel','Minor',10),
    ...simpleCrunch(5, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'5 m',false),
    keywords: ['Psychic'],
    effect: 'Target must pass DN 4 Wil test or must follow a single command.',
  },
  {
    ...powerz('core',268,'Conceal Phenomena','Minor',5),
    ...simpleCrunch(3,'Full-Round Action', DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Psychic atempts to detect you are at +2 DN.',
  },
  {
    ...powerz('core',269,'Conjure Flame','Minor',10),
    ...simpleCrunch(4, ACTIVATION.MOVEMENT, DURATION.SUSTAINED,'Self',false),
    keywords: ['Fire','Psychic'],
    effect: 'Flaming Melee Attacks that deal 8+1ED and may (GM) inflict On Fire',
  },
  {
    ...powerz('core',269,'Dull Pain','Minor',8),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'5 m',true),
    keywords: ['Psychic'],
    effect: 'Affected targets reduce all shock they suffer by 1.',
  },
  {
    ...powerz('core',269,'Flash Bang','Minor',8),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',true),
    keywords: ['Auditory','Light','Psychic'],
    effect: 'Targets in range must pass DN 3 Tou of suffer 1 shock and be blinded.',
  },
  {
    ...powerz('core',269,'Invoke Luck','Minor',10),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'Self',false),
    keywords: ['Psychic'],
    effect: 'You may gain +1 die to one Test you make.',
  },
  {
    ...powerz('core',269,'Inflict Pain','Minor',8),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.SUSTAINED,'5 m',true),
    keywords: ['Psychic'],
    effect: 'Deal 1d3 shock, target must pass DN3 Wil or be staggered.',
  },
  {
    ...powerz('core',270,'Subvert Machine','Minor',10),
    ...simpleCrunch(4, ACTIVATION.ACTION, DURATION.INSTANT,'25 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Jam machine for 1 minute. Might be fixed with DN 3 Tech (Int) Test.',
  },
  {
    ...powerz('core',270,'Hover','Minor',7),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Float freely at half speed.',
  },
  {
    ...powerz('core',270,'Psychic Torch','Minor',5),
    ...simpleCrunch(4, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Create an illuminating, flying orb.',
  },
  {
    ...powerz('core',270,'Phantom Grip','Minor',8),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Manifest phantom hands under your control.',
  },
  {
    ...powerz('core',270,'Mental Force','Minor',8),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.INSTANT,'15 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Do a mental flex to push the target prone.',
  },
  {
    ...powerz('core',271,'Otherworlldy Voices','Minor',5),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Auditory','Psychic'],
    effect: 'Disturb others with you AWESOME WARP VOICE.',
  },
  // Universal
  {
    ...powerz('core',272,'Smite','Universal',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'35 m',true),
    keywords: ['Psychic'],
    effect: 'Roll Psychic Mastery VS Defence to deal 1d3 Mortal Wounds.',
  },
  // Biomancy
  {
    ...powerz('core',272,'Enfeeble','Biomancy',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'10 m',true),
    keywords: ['Psychic'],
    effect: 'The target’s Strength is reduced by 1 and they suffer 1 Shock at the beginning of each of their turns while the power is sustained.',
  },
  {
    ...powerz('core',272,'Life Leech','Biomancy',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
    keywords: ['Psychic'],
    effect: 'Deal 1d6 shock and 1d3 Wounds, heal half of the inflicted amount.',
  },
  {
    ...powerz('core',272,'Warp Speed','Biomancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Double your speed, may take an additional Action per round, +1 Defence, you act first in combat round. Suffer 1d3+1 Shock each round.',
  },
  {
    ...powerz('core',272,'Phantom Form','Biomancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Move through solid matter at half speed. Suffer 1 Shock each round.',
  },
  {
    ...powerz('core',273,'Regeneration','Biomancy',15),
    ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    effect: 'Heal one Wound per round or - if completely healed - regain 1 Shock per round.',
  },
  {
    ...powerz('core',273,'Shape Flesh','Biomancy',20),
    key: 'core-sharp-flesh',
    ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Biomancy Power.'],
    effect: 'Change your form, you filthy shapechanger.',
  },
  // Divination
  {
    ...powerz('core',274,'Forewarding','Divination',15),
    ...simpleCrunch(6, ACTIVATION.FULL_ACTION, DURATION.ONE_COMBAT,'Self',false),
    keywords: ['Psychic'],
    effect: 'Seize initiative for free and gain +1 Defence.',
  },
  {
    ...powerz('core',274,'Presience','Divination',15),
    ...simpleCrunch(7, '30 Minutes', DURATION.ONE_SCENE,'Self',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Divination Power.'],
    effect: '',
  },
  {
    ...powerz('core',274,'Misfortune','Divination',15),
    ...simpleCrunch('Defence', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',true),
    keywords: ['Psychic'],
    effect: '',
  },
  {
    ...powerz('core',275,'Psychometry','Divination',15),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Psychic'],
    prerequisite: ['At least one other Divination Power.'],
    effect: 'When you use this power you are able to glimpse visions of past events in an area where an individual expressed an emotional outburst.',
  },
  {
    ...powerz('core',275,'Scrier’s Gaze','Divination',5),
    ...simpleCrunch(6,'Full Action (or 10 min)', DURATION.SUSTAINED,'5,000 m',false),
    keywords: ['Psychic'],
    effect: 'You project your mind remotely to view events occurring in another place within range.',
  },
  // Pyromancy
  {
    ...powerz('core',275,'Fiery Form','Pyromancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Fire','Psychic'],
    effect: 'You burst into flame, your body engulfed in a roaring inferno. These flames cause no harm to you or your possessions.',
  },
  {
    ...powerz('core',276,'Flame Breath','Pyromancy',5),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.INSTANT,'30 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Anything within Blast(Medium) suffers 14 +2 ED and is On Fire.',
  },
  {
    ...powerz('core',276,'Mindfire','Pyromancy',15),
    ...simpleCrunch('Willpower', ACTIVATION.ACTION, DURATION.SUSTAINED,'100 m',false),
    keywords: ['Fire','Psychic'],
    prerequisite: ['At least one other Pyromancy Power.'],
    effect: 'Hinder the enemy by raising his temperatur.',
  },
  {
    ...powerz('core',276,'Molten Beam','Pyromancy',20),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'10 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Deal 18 +2 ED and might set targets On Fire.',
  },
  {
    ...powerz('core',276,'Spontaneous Combustion','Pyromancy',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Fire','Psychic'],
    effect: 'Deal 12 +1 ED and might set targets On Fire.',
  },
  {
    ...powerz('core',276,'Wall Of Flame','Pyromancy',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'20 m',false),
    keywords: ['Fire','Psychic'],
    effect: 'Summon a 3x20x10 Wall, dealing up to 12 +1 ED any might set On Fire.',
  },
  // Telekinesis
  {
    ...powerz('core',277,'Assail','Telekinesis',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Throw large objects (your mom?), dealing 10 +1 ED.',
  },
  {
    ...powerz('core',277,'Crush','Telekinesis',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'20 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Force grapple, dealing 10 +1 ED and might restrain.',
  },
  {
    ...powerz('core',277,'Levitation','Telekinesis',8),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Fly, but pay 1 shock per hour.',
  },
  {
    ...powerz('core',278,'Telekinetic Dome','Telekinesis',15),
    ...simpleCrunch(5, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'Self',false),
    keywords: ['Kinetic','Psychic'],
    prerequisite: ['At least one other Telekinesis Power.'],
    effect: 'Sustain a Force Field that grants +2 Resilience, cost shock to maintain.',
  },
  {
    ...powerz('core',278,'Grav-Warp','Telekinesis',20),
    ...simpleCrunch('Willpower +2', ACTIVATION.ACTION, DURATION.SUSTAINED,'50 m',true),
    keywords: ['Kinetic','Psychic'],
    effect: 'Prone, Restrain or pull with manipulated gravity.',
  },
  {
    ...powerz('core',278,'Shock Wave','Telekinesis',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
    keywords: ['Kinetic','Psychic'],
    effect: 'Deal 12 +1 ED and probably Prone those around you.',
  },
  // Telepathy
  {
    ...powerz('core',278,'Erasure','Telepathy',15),
    ...simpleCrunch('Willpower +2', ACTIVATION.FULL_ACTION, DURATION.INSTANT,'30 m',true),
    keywords: ['Telepathy','Psychic'],
    prerequisite: ['At least one other Telepathy Power.'],
    effect: 'Purge some memories from the target.',
  },
  {
    ...powerz('core',279,'Fog The Mind','Telepathy',15),
    ...simpleCrunch(4, ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Telepathy','Psychic'],
    effect: 'Hinder and Stagger multiple foes.',
  },
  {
    ...powerz('core',279,'Mind Probe','Telepathy',15),
    ...simpleCrunch('Willpower', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',false),
    keywords: ['Telepathy','Psychic'],
    prerequisite: ['At least one other Telepathy Power.'],
    effect: 'Probe the mind, ask questions, learn answers.',
  },
  {
    ...powerz('core',279,'Psychic Shriek','Telepathy',10),
    ...simpleCrunch('Willpower', ACTIVATION.ACTION, DURATION.INSTANT,'50 m',true),
    keywords: ['Psychic'],
    effect: 'Deal d3+3 Shock and (Wil vs. DN 5) stagger.',
  },
  {
    ...powerz('core',279,'Telepathy','Telepathy',5),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.SUSTAINED,'100 m',true),
    keywords: ['Telepathy','Psychic'],
    effect: 'Do the chit-chat, or eavesdrop. Use shifts to boost the range.',
  },
  {
    ...powerz('core',280,'Terrify','Telepathy',15),
    ...simpleCrunch(5, ACTIVATION.FULL_ACTION, DURATION.INSTANT,'10 m',true),
    keywords: ['Telepathy','Psychic'],
    effect: 'Enemies must succeed a DN 5 Fear test of suffer the consequences.',
  },
  // Maleficarum
  {
    ...powerz('core', 281, 'Dark Flame', 'Maleficarum', 15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT, '20 m', false),
    keywords: ['Chaos', 'Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Targets within Blast(Medium) suffer shock any maybe mortal wounds.',
    description:
      '<p>You unleash the roiling inferno of your rage. The power affects all creatures in a Medium Blast from a point in range, unholy flames burning their very souls. Affected targets suffer 1d3 + your Corruption level in Shock damage and must pass a DN 5 Toughness Test or suffer 1d3 Mortal Wounds as well.</p>',
  },
  {
    ...powerz('core',281,'Possession','Maleficarum',20),
    ...simpleCrunch('Willpower', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED,'30 m',false),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Dominate and control a target.',
    description:
      '<p>You breach your enemy’s mind, quashing its will completely, and turning their body into your puppet.</p>' +
      '<p>You and your target make an Opposed Willpower Test. If you succeed, the target is completely dominated — they have no free will whatsoever. With a simple thought you can compel the target to perform any task you choose as long as the power is Sustained. This control has no limits, and victims do anything you command them to do without question. You immediately gain 1 Corruption on activation of this power, and the target must make a DN 6 Corruption Test when the power ends.</p>' +
      '<p>Possession is mentally draining, as you must constantly overpower the target’s persona. You suffer 1d3+1 Shock for each target you control every round you sustain the power. You may not recover Shock while sustaining this power.</p>',
  },
  {
    ...powerz('core',281,'Soul Shrivel','Maleficarum',20),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT,'20 m',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Deal d3 Mortal Wounds and force a Corruption test.',
  },
  {
    ...powerz('core',281,'Touch Of Corruption','Maleficarum',15),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'Touch',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Deal Corruption and trigger a temporary mutation.',
  },
  {
    ...powerz('core',281,'Infernal Gaze','Maleficarum',10),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',true),
    keywords: ['Chaos','Psychic'],
    prerequisite: ['You must have the CHAOS Keyword.'],
    effect: 'Reduce Int and see hallucinations.',
  },
  // Runes of Battle
  {
    ...powerz('core',283,'Conceal / Reveal','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',true),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You reach out with your mind and take command of the shadows, bending and shaping them to your will.',
    effect: 'Concealed allies within 5m gain +1 to Defence and Stealth. Revealed targets can not benefit from Cover.',
  },
  {
    ...powerz('core',283,'Embolden / Horrofy','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You reach into the minds of those around you, either fortifying or eroding their resolve.',
    effect: 'Gain +1 to resolve or cause +1 DN to resolve tests.',
  },
  {
    ...powerz('core',283,'Empower / Enervate','Runes of Battle',30),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You commune with the spirits of those around you, expanding their potential or draining their will to fight.',
    effect: 'Gain +1 ED in melee or cause -1 ED in melee.',
  },
  {
    ...powerz('core',284,'Enhance / Drain','Runes of Battle',30),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Drawing upon the favour of Khaine, you enhance the combat prowess of your allies or diminish that of your enemies.',
    effect: 'Gain +1 to Weapon Skill or suffer +1 DN to Weapon Skill.',
  },
  {
    ...powerz('core',284,'Protect / Jinx','Runes of Battle',20),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Tugging on the threads of fate that surround any field of battle, you isolate and bind those of a specific individual, reshaping their destiny.',
    effect: 'Gain +1 to Resilience or suffer -1 to Resilience',
  },
  {
    ...powerz('core',284,'Quicken / Restrain','Runes of Battle',20),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You twist time itself, briefly altering its flow for a select few on the battlefield.',
    effect: 'Gain additional movement or apply difficult terrain.',
  },
];

const fspgPowers = [
  {
    ...powerz(source.fspg.key,129,'Veil of Time','Librarius',20),
    ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'20m',true),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: 'Act twice per ronud.',
    description: '<p>For as long as you Sustain this power, your target may take two Turns in each Round.</p>',
  },
  {
    ...powerz(source.fspg.key,129,'Might of Heroes','Librarius',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'15m',false),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: 'Increase Strength, Toughness and Initative by 1.',
    description: '<p>Your target gains +1 Strength, Toughness, and Initiative until the start of your next Turn.</p>',
  },
  {
    ...powerz(source.fspg.key,130,'Psychic Scourge','Librarius',20),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT,'20m',true),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: 'Succeed in opposed Willpower and deal 1d3 mortal wounds and Fear.',
    description: '<p>To activate this power, you must win an Opposed Willpower Test with your target. If you succeed, you deal 1d3 Mortal Wounds and the target suffers the Fear Condition.</p>',
  },
  {
    ...powerz(source.fspg.key,130,'Fury of the Ancients','Librarius',15),
    ...simpleCrunch(10, ACTIVATION.ACTION, DURATION.INSTANT,'14m',false),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: 'Line that deals 2d6 mortal wounds to enemies.',
    description: '<p>If you successfully activate this power, the Fury of the Ancients travels in a straight line for 14m in a direction you choose. All enemies on that line suffer 2d3 Mortal Wounds.</p>',
  },
  {
    ...powerz(source.fspg.key,130,'Psychic Fortress','Librarius',15),
    ...simpleCrunch(6, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'20m',true),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: 'Immune to Fear and Terror. Add +Willpower dice to Determination vs Psychic Powers. And more..',
    description: '<p>Your target becomes immune to the Fear and Terror Conditions for as long as you Sustain this power. Your target also gains Bonus Dice equal to your Willpower Attribute when they roll Determination against damage caused by a Psychic Power, and may roll Determination against Mortal Wounds caused by Psychic Powers for as long as you sustain this power.</p>',
  },
  {
    ...powerz(source.fspg.key,130,'Null Zone','Librarius',15),
    ...simpleCrunch(7, ACTIVATION.SIMPLE_ACTION, DURATION.INSTANT,'20m',false),
    keywords: ['Psychic'],
    prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
    effect: '6m radius within range that incease cast DN by Willpower and nullifies invulnerable trait.',
    description: '<p>When you successfully activate this power, select a point or target in range. You create a null zone with a 6m radius centered on that point or target until the start of your next Turn. The DN of all Psychic Mastery (Wil) Tests made within the null zone is increased by your Willpower Rating. The Invulnerable Armour Trait has no effect inside the null zone.</p>',
  },
];

const paxNavigatorPowers = [
  {
    ...simpleStub(101, 'pax', 190, 8, 'A Cloud in the Warp', 'Navigator Powers', 'Mask yourself from observations through powers.'),
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.SUSTAINED, 'Self', false, ''),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>By understanding and perceiving the currents of the warp, the Navigator can hide his ' +
      'presence from those that would use the Immaterium to detect him. ' +
      'Whilst it does not in any way mask his presence in the real universe, ' +
      'it can ably hide him from detection by Psykers and confuse creatures whose essence and ' +
      'existence are linked to the warp, such as Daemons and other warp entities. ' +
      'As the Navigator grows in power, he will become harder to detect, ' +
      'as well as being able to mask others if they stand nearby.</p>' +
      '<p>If successful, the Navigator becomes shrouded in an immaterial cloak, ' +
      'forcing those that use any kind of psychic sight, detection or divination ' +
      'to increase a powers DN by +2 to see him with such powers. ' +
      'This power also has the same effect on the (passive) awareness of all Daemons and warp entities. ' +
      'This power will last as long as the Navigator maintains it, ' +
      'however whilst he does so, he cannot use any other powers (though he may take other actions normally).</p>',
  },
  {
    ...simpleStub(102, 'pax', 191, 10, 'Foreshadowing', 'Navigator Powers', 'Make a Narrative declaration for free within the next round.'),
    ...simpleCrunch('5', ACTIVATION.ACTION, '1 Round', 'Self', false, '', '[2] Increase the time of the declaration lasting by +1 Round.'),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>By using his warp eye to filter small secrets from the near future, the Navigator can choose ' +
      'to make slight adjustments to his actions to avoid harm and manipulate the course of events. ' +
      'Only if the Navigator tries to dig too deep into the near future for secrets does this power ' +
      'become unpredictable and he may become victim of the warp’s lies.</p>' +
      '<p>If successful, the Navigator can make a Narrative Declaration as if he spent a point of Wrath. ' +
      'However, the Navigator (or his allies) only has the next Round to make use of the declaration, ' +
      'lest it vanishes as a lie of the warp.</p>',
  },
  {
    ...simpleStub(103, 'pax', 191, 10, 'Gaze into the Warp', 'Navigator Powers', 'Probe suspects for taint of the warp.'),
    ...simpleCrunch('Resolve', 'Action', 'Sustained', '30m', true, '', '[1] Increase range by +5m'),
    keywords: ['Navigator','Psychic'],
    description: '<p>This power allows a Navigator to see a creature’s or object’s reflection in the warp and learn things hidden from the real universe. This power is most useful in unmasking both psykers and daemons, but has other applications, such as reading residual psychic taint on objects and tracking powerful psychic entities. With a successful attempt, the Navigator can determine if a creature or object holds the taint of the warp. This will tell the Navigator if the person or object has the psychic presence or is tainted (roughly speaking if they have the Psyker, Chaos, Daemon or similar keywords). Psykers who have made dark pacts with the warp and daemons are more resistant to this power, however. Against these creatures, the DN of the power increases by +2.</p>',
  },
  {
    ...simpleStub(104, 'pax', 191, 8, 'Held in my Gaze', 'Navigator Powers', 'Prevent Movement and Ruin Powers of the subject.'),
    ...simpleCrunch('Resolve','Action','Sustained','5m', false, '', '[2] Increase range by +5m;[3] +1 Mortal Wounds'),
    keywords: ['Navigator','Psychic'],
    description:
      '<p>The unflinching eye of a Navigator locks a creature in place with a gaze that pierces ' +
      'flesh and bone to see the immaterial essence of all things. ' +
      'Most commonly employed against psykers, this ability can be used to render them effectively ' +
      'powerless and prevent them from calling upon their abilities. It is also undeniably ' +
      'effective against creatures with a strong connection to the warp, such as daemons, ' +
      'for which it can have spectacular and devastating consequences.</p>' +
      '<p>The Navigator chooses a target which he has line of sight to and within range. ' +
      'If he is successful, then the target is locked and cannot make a Move. ' +
      'A locked target must beat the Navigator in an opposed Willpower test each time it wishes ' +
      'to use a psychic power or invoke the Ruin abilities. ' +
      'Daemons affected by this power suffer 1 Mortal Wound.</p>',
  },
  {
    ...simpleStub(105, 'pax', 192, 10, 'Inertia', 'Navigator Powers', 'Increase the DN for an targeted Psyker to manifest powers.'),
    ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.SUSTAINED, '30m', false, '', '[1] Increase range by +5m;[3] Increase DN penalty by +1'),
    keywords: ['Navigator','Psychic'],
    description: '<p>The Navigator alters the tides of the Warp, making it difficult for enemy psykers to draw their power from the Immaterium. This power does not require line of sight, but can only be used against characters with the <Psyker> keyword. If they are affected, then the psyker suffers a +1 DN penalty when manifesting their powers.</p>',
  },
  {
    ...simpleStub(106, 'pax', 192, 0, 'The Lidless Stare', 'Navigator Powers', 'Deal a Mortal Wound and cause Terror.'),
    ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.SUSTAINED, '30m', true, '', '[3] Increase the DN penalty of Terror of a single target by +1;[3] One target suffers an additional Mortal Wound'),
    keywords: ['Navigator','Psychic'],
    description: '<p>If a Navigator opens his warp eye fully, anyone gazing into its depths will witness the power and mind breaking unreality of the warp. In an instant, they witness the chaos boiling beneath the skin of existence and for many, it is the last thing they ever see. The navigator chooses a number of targets within range. If the power is successful, the targets suffer a single Mortal Wound and counts as having failed a Terror test against the Navigator</p>',
  },
  {
    ...simpleStub(107, 'pax', 193, 6, 'Temporal Distortion', 'Navigator Powers', 'Allow yourself to make an additional Move.'),
    ...simpleCrunch('4', ACTIVATION.ACTION, DURATION.INSTANT, 'Self', false, '', '[1] Increase the Speed of the additional Move by +1;[2] Reduce shock gained by -1;[3] Instead of a Move, the Navigator may make an additional Action'),
    keywords: ['Navigator','Psychic'],
    description: '<p>The Navigator can manipulate the tides of the Immaterium to affect time in the temporal universe. The Navigator may only use this power on himself, and if successful, he may make an additional Move. Regardless if this power is successfully manifested or not, the Navigator suffers 2 points of Shock.</p>',
  },
];

const aaoaWaaaghPowers = [
  {
    ...simpleStub(200, 'aaoa', 233, 20, '‘Eadbanger', 'WAAAGH!', 'Bring the closest enemy to zero wounds.'),
    ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>A bolt of raw power erupts from your head and rockets across the battlefield, causing the head of the first unfortunate victim caught in its path to explode in a shower of brains and gore. This power targets the closest enemy, who must pass a Toughness test (DN 3) immediately suffer enough wounds to exceed their Max Wounds by 1.</p>',
  },
  {
    ...simpleStub(201, 'aaoa', 233, 15, 'Da Jump', 'WAAAGH!', 'Short Teloport yourself and allied orks.'),
    ...simpleCrunch('6', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '12m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>You close your eyes tight and, in a storm of flashing green light, you teleport a mass of confused greenskins to another part of the battlefield. Select a number of allies with the ORK keyword equal to your Willpower within range. Those allies vanish, and then reappear moments later anywhere within 100m. They must reappear more than 9m from an enemy, and they forfeit their move in their following turn.</p>',
  },
  {
    ...simpleStub(202, 'aaoa', 233, 15, 'Da Krunch', 'WAAAGH!', 'Stomp enemies with mortal force and knock them prone.'),
    ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>Green energies erupt from your eyes, ears, nose, and mouth, and coalesce into a roiling cloud above the enemy. That cloud then solidifies into the vast green foot of Gork (or Mork) himself, which commences to stamp down upon the foe. This power affects all enemies in a Medium blast within range. Affected enemies take 1d3 Mortal Wounds and are knocked prone. Foes who were already prone become staggered as well. Then, roll a d6: on an Exalted Icon, repeat the power’s effects (repositioning the blast as desired) as the foot stamps down again.</p>',
  },
  {
    ...simpleStub(203, 'aaoa', 233, 8, 'Fists of Gork', 'WAAAGH!', 'Boost yourself or an allie with great Strength.'),
    ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.ONE_ROUND, '12m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>You channel Waaagh energy into your own fists or those of another Ork, providing strength enough to punch through the armour of tanks. This power affects you or one ally with the ORK keyword within range. Until the end of your next turn, the affected character’s Strength is increased by +4 and they receive +2 bonus dice on all melee attacks.</p>',
  },
  {
    ...simpleStub(204, 'aaoa', 234, 10, 'Roar of Mork', 'WAAAGH!', 'Enemies within range reduce their resolve by 2.'),
    ...simpleCrunch('7', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '18m', false, ''),
    keywords: ['Ork','Telepathy','Psychic'],
    description:
      '<p>You open your gob impossibly wide and give vent to a bellowing roar that reverberates through your enemies’ minds. Coherent thought becomes nigh-impossible, and as the roar thunders on, panic begins to spread. While this power remains in effect, all enemies within range add +2 DN to all Resolve tests.</p>',
  },
  {
    ...simpleStub(205, 'aaoa', 234, 15, 'Warpath', 'WAAAGH!', 'Allies within range increase strength and make more multi-actions or attacks.'),
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
    keywords: ['Ork','Psychic'],
    description:
      '<p>You disperse the Waaagh energy coursing through your frame into the Ork warriors around you, stoking their already bellicose nature into a roaring fever pitch. Select a number of allies with the ORK keyword equal to your Willpower within range. The affected allies add +2 bonus dice to all melee attacks they attempt until the start of your next turn, and they may ignore up to 2 points of DN increase for taking the Multi-Attack or Multi-Action options.</p>',
  },
];

const aaoaSancticPowers = [
  {
    ...simpleStub(220, 'aaoa2', 157, 20, 'Astral Aim', 'Sanctic', ''),
    ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1d bonus to ranged attacks;[3] +5m range'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker reaches to the minds of his battle-brothers, guiding their aim to the chosen target. ' +
      'The psyker, and all allies within 5m, may make ranged attacks against enemies they cannot see, ' +
      'and ignore any bonuses to Defence from cover on those ranged attacks, until the start of your next turn.</p>',
  },
  {
    ...simpleStub(221, 'aaoa2', 157, 20, 'Gate of Infinity', 'Sanctic', ''),
    ...simpleCrunch('6', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '500m', false, '', '[3] +500m range'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker punches a corridor through the roiling immaterium, allowing him to cross great distances in the blink of an eye. ' +
      'The psyker, and all allies within 5m immediately vanish, and reappear anywhere within range, ' +
      'which must also be more than 20m from an enemy.</p>',
  },
  {
    ...simpleStub(222, 'aaoa2', 157, 20, 'Hammerhand', 'Sanctic', ''),
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1ED to damage,[3] +5m range'),
    keywords: ['Psychic'],
    description:
      '<p>Focusing the raging power of his mind, the psyker augments the strength of his comrades ' +
      'to the point where they can crush flesh and bone with a single blow. ' +
      'The psyker, and all allies within 5m, add +1ED to the damage of all melee attacks they make until the start of the psyker’s next turn.</p>',
  },
  {
    ...simpleStub(223, 'aaoa2', 157, 15, 'Purge Soul', 'Sanctic', ''),
    ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.INSTANT, '25m', true, '', '[1] +1 Mortal Wound'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker draws upon all of his willpower to purge the evil of his foes’ souls, ' +
      'scouring every trace of corruption even if it destroys them in the process. ' +
      'The psyker targets one enemy with a psychic ranged attack. ' +
      'If hit, the target suffers 1 Mortal Wound and is staggered until the start of its next turn.</p>' +
      '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
  },
  {
    ...simpleStub(224, 'aaoa2', 158, 10, 'Rites of Banishment', 'Sanctic', ''),
    ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT, '25m', true, '', '[2] +1 Mortal Wound'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker utters prayers and litanies of detestation and antipathy, which sever the bonds holding Daemons to the material universe, ' +
      'banishing them to the roiling hellscape from whence they came. ' +
      'The psyker targets one enemy with a psychic ranged attack. ' +
      'If hit, the target suffers 1d3 Mortal Wounds, or 1d3+3 Mortal Wounds if they have the Daemon keyword.</p>' +
      '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
  },
  {
    ...simpleStub(225, 'aaoa', 158, 25, 'Sanctuary', 'Sanctic', ''),
    ...simpleCrunch('25', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1d to Soak rolls;[3] +5m range.'),
    keywords: ['Psychic'],
    description:
      '<p>Chanting words of warding, the psyker creates a zone of light around him that can protect him from harm and repel daemonic creatures. ' +
      'The psyker, and all allies within 5m, add +1d to all Soak tests, may Soak Mortal Wounds, and do not suffer Shock when they Soak damage, ' +
      'until the start of next turn. ' +
      'Further, creatures with the Daemon keyword treat the area within range of the psyker as difficult terrain until the start of your next turn.</p>',
  },
  {
    ...simpleStub(226, 'aaoa', 158, 30, 'Vortex of Doom', 'Sanctic', ''),
    ...simpleCrunch('8', ACTIVATION.FULL_ACTION, DURATION.ONE_ROUND, '25m', false, '', '[2] +1 Mortal Wound per target.;*[2] Increase the area of effect to a Large Blast.;*[2] Time to activate reduced to an Action.'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker tears a rift between realspace and the Warp, condemning his foes to oblivion. ' +
      'The power affects all creatures in a Medium Blast, dragging them into a howling vortex. ' +
      'Every creature within the area suffers 1d3 Mortal Wounds.</p>' +
      '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
  },
];

const aaoaAncestrialRites = [
  {
    ...simpleStub(210, 'aaoa', 183, 20, 'Domination', 'Ancestral Rites', 'Command a single action of the target at the cost of some shock.'),
    ...simpleCrunch('Willpower (Opposed)', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '25m', false, ''),
    keywords: ['Squat','Telepathy','Psychic'],
    description:
      '<p>The Ancestor Lord turns his immense willpower on the mind of a single enemy and takes over its body for a moment. ' +
      'Select an enemy within range: if the psyker wins an opposed willpower test against the target, ' +
      'the target immediately takes a single action of the Ancestor Lord’s choice, following all the normal rules. ' +
      'This power cannot force a creature to take an action which would kill them. ' +
      'The Ancestor Lord suffers 1d3+1 Shock after this power is used.</p>',
  },
  {
    ...simpleStub(211, 'aaoa', 183, 20, 'Force Dome', 'Ancestral Rites', 'Create a Protective Dome.'),
    ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.SUSTAINED, '50m', false, ''),
    keywords: ['Squat','Kinetic','Psychic'],
    description:
      '<p>At the Ancestor Lord’s command, a dome of energy erupts from the ground, and it is as unyielding as the Ancestor Lord’s own mind. ' +
      'The dome appears at anywhere within range, with a radius of 5m (so, it’s 10m across and 5m tall). ' +
      'The dome blocks all line of sight, and ranged attacks cannot damage it. ' +
      'The dome can be attacked in melee: attacks automatically hit, and the dome has a Resilience equal to three times the Ancestor Lord’s Willpower, ' +
      'and Wounds equal to twice the Ancestor Lord’s Psychic Mastery score. It collapses and dissipates when reduced to 0 Wounds. ' +
      'The Ancestor Lord suffers 1 Shock at the end of each turn they sustain this power.</p>',
  },
  {
    ...simpleStub(212, 'aaoa', 184, 20, 'Hammer of Fury', 'Ancestral Rites', 'Deal mortal wounds in a large (18m) range.'),
    ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
    keywords: ['Squat','Kinetic','Psychic'],
    description:
      '<p>The Ancestor Lord unleashes a mighty psychic hammer blow against their foes, smashing them back with an inexorable kinetic impact. ' +
      'All enemies within range suffer 1d3+1 Mortal Wounds. ' +
      'In addition, enemies must pass a Strength test (DN 5) or be knocked prone and moved away from ' +
      'the Ancestor Lord a number of metres equal to the number of Mortal Wounds they suffered.</p>',
  },
  {
    ...simpleStub(214, 'aaoa', 184, 20, 'Mental Fortress', 'Ancestral Rites', 'Hinder hostile psychic powers that affect you or you allies.'),
    ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.SUSTAINED, '25m', false, ''),
    keywords: ['Squat','Psychic'],
    description:
      '<p>The Ancestor Lord weaves a powerful mental barrier around themselves and those nearby, warding them from mental assault. ' +
      'While this power remains in effect, any hostile psychic power targeted at the Ancestor Lord or an ally within range suffers +4 DN.</p>',
  },
];

const aaoaLibrariusPowers = [
  {
    ...simpleStub(241, 'aaoa', 283, 15, 'Fury of the Ancients (AAOA)', 'Librarius', ''),
    key: 'aaoa-fury-of-the-ancients',
    ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '*', false, '', '[2] +1 Mortal Wound per target.;[2] Increase the range by +1d6.'),
    keywords: ['Psychic'],
    description:
      '<p>Calling upon the myths and legends of his Chapter’s homeworld, the Librarian sends forth a terrifying monstrosity wrought from psychic energy. If successful, roll a number of d6 equal to the psyker’s Willpower. This power projects a monstrous psychic projection two metres wide in a straight line which extends out a number of metres equal to the total rolled. Any enemy touched by the projection suffers 1d3 Mortal Wounds.</p>',
  },
  {
    ...simpleStub(242, 'aaoa', 283, 20, 'Might of Heroes (AAOA)', 'Librarius', ''),
    key: 'aaoa-might-of-heroes',
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.ONE_COMBAT, '25m', false, '', '[2] Bonuses to Strength, Toughness, and DN reduction increase by +1.'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker cages the immense power of the immaterium within his physical form and becomes the Emperor’s vengeance given flesh. If successful, select an ally with the Adeptus Astartes keyword (which may include yourself) within range. While the power remains in effect, the chosen character increases his Strength and Toughness by +4, and he ignores up to 4 points of DN increase for taking</p>',
  },
  {
    ...simpleStub(243, 'aaoa', 283, 30, 'Null Zone (AAOA)', 'Librarius', ''),
    key: 'aaoa-null-zone',
    ...simpleCrunch('8', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '25m', false, '', '[2] +6m range.;*[2] Time to activate reduced to an Action.'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker unleashes the full might of his mind to cast down his opponent’s defences, both technological and mystical. While this power remains in effect, enemies within range of the psyker may not attempt to Soak and increase the DN for all Psychic Mastery tests by +4. This power is taxing to sustain, so the psyker suffers 1 Shock each turn they sustain the power.</p>',
  },
  {
    ...simpleStub(244, 'aaoa', 283, 15, 'Psychic Fortress (AAOA)', 'Librarius', ''),
    key: 'aaoa-psychic-fortress',
    ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.SUSTAINED, '35m', true, '', '[2] +5m range.;*[2] The target is also automatically successful on Conviction tests.'),
    keywords: ['Psychic'],
    description:
      '<p>Drawing on boundless reserves of inner strength, the psyker shields his battle-brothers from mortal fears and the threat of sorcerous assault. If successful, select an ally within range. That ally will automatically succeed at all Resolve tests and are immune to fear, terror, and intimidation-based Interaction attacks. Further, each time the ally Soaks to resist damage from a psychic power, they gain bonus dice equal to your Psychic Mastery, and may Soak Mortal Wounds.</p>',
  },
  {
    ...simpleStub(245, 'aaoa', 284, 15, 'Psychic Scourge (AAOA)', 'Librarius', ''),
    key: 'aaoa-psychic-scourge',
    ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.INSTANT, '35m', true, '', '[1] +1 Mortal Wound.'),
    keywords: ['Psychic', 'Telepathy'],
    description:
      '<p>The psyker pits his superhuman willpower against that of his enemies in a battle of mental fortitude, seeking to destroy their minds in a burst of psychic fury. The psyker targets one enemy with a psychic ranged attack. If hit, the target suffers 1d3 Mortal Wounds.</p>',
  },
  {
    ...simpleStub(246, 'aaoa', 284, 20, 'Veil of Time (AAOA)', 'Librarius', ''),
    key: 'aaoa-veil-of-time',
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.INSTANT, '35m', true, '', '[2] Bonus to Speed increases by +1.'),
    keywords: ['Psychic'],
    description:
      '<p>The psyker projects their will beyond the regular passage of time, taking in the strands of fate before returning to the present to sway the tide of battle. If successful, select an ally within range. That ally increases their Speed by +2 when charging, advancing, or running. In addition, it does not cost Glory for that ally to Seize the Initiative.</p>',
  },
];

const aaoaAeldariPowers = [
  // Runes of Fortune (Minor powers)
  {
    ...powerz('aaoa',226,'Crushing Orb','Runes of Fortune',10),
    ...simpleCrunch('Strength', ACTIVATION.ACTION, DURATION.INSTANT,'18m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You crush your foe in a sphere of kinetic energy.',
    effect: 'Deal 1 mortal wound and restrain.',
    description:
      '<p>You crush your foe in a sphere of kinetic energy. You target a single enemy within range with a psychic ranged attack, inflicting 1 Mortal Wound and the Restrained condition.</p>',
  },
  {
    ...powerz('aaoa',226,'Fateful Divergence','Runes of Fortune',10),
    ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',true),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Exerting your will upon destiny, you shift the paths of fate.',
    effect: 'Target ally may reroll a single dice.',
    description:
      '<p>Exerting your will upon destiny, you shift the paths of fate. You select a single ally within range. Until the start of your next turn, the target may re-roll a single die in any dice pool.</p>',
  },
  {
    ...powerz('aaoa',226,'Focus Will','Runes of Fortune',10),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You channel your mind to aid a fellow seer.',
    effect: 'An ally adds +1/+2 dice to Psychic Mastery tests.',
    description:
      '<p>You channel your mind to aid a fellow seer. You select a single Psyker within range. Whenever the target attempts a Psychic Mastery test before the end of their next turn, they may add +1 bonus dice to their test, or +2 bonus dice if they have the ASURYANI keyword.</p>',
  },
  {
    ...powerz('aaoa',226,'Ghostwalk','Runes of Fortune',10),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Imbue your allies with ethereal speed.',
    effect: 'Up to WIL targets gain +2 Speed.',
    description:
      '<p>Channelling energies from your runes, you imbue your allies with ethereal speed. You select a number of allies within range equal to your Willpower. Until the start of your next turn, the targets increase their Speed by +2.</p>',
  },
  {
    ...powerz('aaoa',226,'Impair Senses','Runes of Fortune',10),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'The psyker dims the foe’s senses.',
    effect: 'Reduce enemies awareness and line-of-sight.',
    description:
      '<p>The psyker dims the foe’s senses. The power affects all enemies in a Medium Blast within range. Until the start of the psyker’s next turn, the affected enemies add +2DN to all Awareness tests, reduce their Passive Awareness to 0, and may only make ranged attacks at the closest target.</p>',
  },
  {
    ...powerz('aaoa',227,'Witch Strike','Runes of Fortune',10),
    ...simpleCrunch(3, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'Self',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Strike foes with potent aetheric energies.',
    effect: 'Add +2ED to your FORCE melee Weapon.',
    description:
      '<p>Focusing a still greater portion of your power into your weapon, each strike blasts foes with potent aetheric energies. Until the start of your next turn, you add +2ED to the damage of one melee weapon you are wielding which has the Force trait.</p>',
  },
  // Runes of Shaping (Bonesinger)
  {
    ...powerz('aaoa',227,'Vaul´s Song','Runes of Shaping',10),
    ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'You invoke the psychosonic ringing of Vaul´s anvil, knitting together wraithbone and psychoreactive crystal in moments.',
    effect: 'Heal AELDARI vehicles or wraith-structures.',
    description:
      '<p>You invoke the psychosonic ringing of Vaul´s anvil, knitting together wraithbone and psychoreactive crystal in moments. Select a single AELDARI vehicle or wraith-construct within range. The target regains 1d3+1 Wounds. Alternatively, target one other pieces of Aeldari technology within range: the device is repaired, and any malfunctions or jams are fixed instantly.</p>' +
      '<p><em>You can multi-target for small items of technology</em></p>',
  },
  {
    ...powerz('aaoa',227,'Webway Step','Runes of Shaping',20),
    ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.INSTANT,'25 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword and must be holding a Webway key to use this power.'],
    hint: 'You are highly attuned to the Webway, and can slip within its reaches with ease, without the use of a gate.',
    effect: 'You vanish and reappear a few moments later at any point within range.',
    description:
      '<p>You are highly attuned to the Webway, and can slip within its reaches with ease, without the use of a gate. You vanish and reappear a few moments later at any point within range. You must reappear standing on solid ground or another object sturdy enough to support your weight.</p>',
  },
  {
    ...powerz('aaoa',227,'Wraithtomb','Runes of Shaping',15),
    ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'10 m',false),
    keywords: ['Aeldari','Psychic'],
    prerequisite: ['Psyker must have the AELDARI Keyword.'],
    hint: 'Grapple enemies with thorny tendrils or create shapes.',
    effect: 'Grapple enemies with thorny tendrils or create shapes.',
    description:
      '<p>You conjure and weave a tangle of wraithvines, psychic constructs that take the form of thorny tendrils which enwrap themselves around the target. Though they will not remain coherent without wraithbone or psychocrystal to make the structure tangible, the vines are solid enough for the moment. This power targets a single creature, vehicle, or structure within range. If a creature or vehicle, the target is restrained and hindered (3) while the power remains in effect. If a structure is the target, then the wraithvines wrap themselves around and into the structure in a manner determined by the Bonesinger and the GM: it may seal over or force open doors, ensnare and shut down automated defences, create a climbable surface, or something similar.</p>',
  },
  // Runes of Fate Farseer)
  // Phantasmancy (Harlequin)
    {
      ...powerz('aaoa',230,'Fog of Dreams','Phantasmancy',20),
      ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
      keywords: ['Aeldari','Psychic', 'Telepathy'],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'Reduce the attack efficiency of affected ennemies',
      effect: 'The power affects all enemies in a Medium Blast within range. All attacks made by the affected enemies suffer +2 DN until the start of your next turn.',
      description:
        '<p>You send forth your consciousness like a creeping mist, baffling the senses of the enemy. The power affects all enemies in a Medium Blast within range. All attacks made by the affected enemies suffer +2 DN until the start of your next turn..</p>',
    },
    {
      ...powerz('aaoa',230,'Mirror of Minds','Phantasmancy',25),
      ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'25 m',false),
      keywords: ['Aeldari','Psychic', 'Telepathy'],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'you gamble with your target to deal mortal wounds',
      effect: 'you and the target roll 1d6. If you roll equal to or higher than the target, then the target suffers 1 Mortal Wound. Repeat this until either the target is reduced to 0 Wounds or they roll higher than you.',
      description:
        '<p>A maddening clash of wills consumes the victim’s mind as reality falls away. Select an enemy within range, and both you and the target roll 1d6. If you roll equal to or higher than the target, then the target suffers 1 Mortal Wound. Repeat this until either the target is reduced to 0 Wounds or they roll higher than you.</p>',
    },
    {
      ...powerz('aaoa',230,'Shards of Light','Phantasmancy',20),
      ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
      keywords: ['Aeldari','Psychic', 'Telepathy'],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'Deal mortal wound and apply nasty status effect in an area',
      effect: 'The power affects all enemies in a Medium Blast within range. Each target suffers 1 Mortal Wound and is blinded and pinned until the start of your next turn.',
      description:
        '<p>Blades of polychrome energy dazzle the foe, inflicting horrific and disorienting psychosomatic wounds. The power affects all enemies in a Medium Blast within range. Each target suffers 1 Mortal Wound and is blinded and pinned until the start of your next turn.</p>',
    },
    {
      ...powerz('aaoa',230,'Twilight Pathways','Phantasmancy',15),
      ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
      keywords: ['Aeldari','Psychic',],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'Immediate group free movement',
      effect: 'You and any number of allies within range may immediately move up to your Speed.',
      description:
        '<p>Eerie half-lit tunnels blink into existence, opening new paths of manoeuvre and attack. You and any number of allies within range may immediately move up to your Speed.</p>',
    },
    {
      ...powerz('aaoa',230,'Veil of Tear','Phantasmancy',15),
      ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
      keywords: ['Aeldari','Psychic', 'Telepathy'],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'Boost defence and stealth of allies',
      effect: 'Select a number of allies equal to your Willpower within range. The affected allies gain +2 Defence and +2 bonus dice on Stealth tests.',
      description:
        '<p>Sketching a gesture in the air, you snatch the image of your allies from the minds of your foes, hiding them from sight. Select a number of allies equal to your Willpower within range. The affected allies gain +2 Defence and +2 bonus dice on Stealth tests.</p>',
    },
    {
      ...powerz('aaoa',230,'Webway Dance','Phantasmancy',25),
      ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'12 m',false),
      keywords: ['Aeldari','Psychic'],
      prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
      hint: 'Allies and you roll Determination without suffering shock',
      effect: 'Until the start of your next turn, you and any allies within range may roll Determination without suffering Shock—Icons rolled simply negate Wounds instead.',
      description:
        '<p>The veil between realspace and the Webway grows thin, allowing Harlequins to jink away from danger in directions that shouldn’t exist, only to reappear unharmed moments later. Until the start of your next turn, you and any allies within range may roll Determination without suffering Shock—Icons rolled simply negate Wounds instead.</p>',
    },
  // Revenant (Ynnari)
];

const teaLibrariusPowers = [
  {
    ...simpleStub(300, 'tea', 72, 15, 'Veil of Time', 'Librarius', 'Grants the target the ability to interfere with the standard flow of time'),
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.SUSTAINED, '40m', true, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>The psyker projects his will beyond the regular passage of time, taking in the strands of fate before returning to the present to sway the tide of battle. If successful, those affected may choose which threat will take its turn next after each of their turns.</p>',
  },
  {
    ...simpleStub(301, 'tea', 73, 15, 'Might of Heroes', 'Librarius', 'Fills the target with psychic might, enhancing their strength and durability'),
    ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.SUSTAINED, '25m', true, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>The psyker cages the immense power of the immaterium within his physical form and becomes the Emperor’s vengeance made manifest. If successful, those affected gain +1 ED on all melee attacks, +1 to Resilience, and may ignore up to +2DN penalty for making melee multi-attacks.</p>',
  },
  {
    ...simpleStub(302, 'tea', 73, 15, 'Psychic Scourge', 'Librarius', 'Forces a battle of wills, harming and stunning the enemy if the psyker wins'),
    ...simpleCrunch('Willpower (Opposed)', ACTIVATION.ACTION, DURATION.INSTANT, '40m', false, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>The psyker pits his superhuman willpower against that of his enemies in a battle of mental fortitude, seeking to destroy their minds in a burst of psychic fury. If the opposed test is won by the psyker, the target takes d3 Mortal Wounds and d3 Shock. If the test was a tie, the target takes 1 Mortal Wound and 1 shock.</p>',
  },
  {
    ...simpleStub(303, 'tea', 73, 15, 'Fury of the Ancients', 'Librarius', 'Selects a target for the psyker’s wrath, harming all enemies in the way'),
    ...simpleCrunch('Defense', ACTIVATION.ACTION, DURATION.INSTANT, '25m', false, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>Calling upon the myths and legends of his Chapter’s home world, the psyker sends forth a terrifying monstrosity wrought from psychic energy. If successful, draw a line from the psyker to the target, noting any enemies the line passes over. If using theater of the mind, any enemies that could be reasonably assumed to be between the psyker and the target are affected instead. Each enemy the line crosses, including the target, suffers a Mortal Wound.</p>',
  },
  {
    ...simpleStub(304, 'tea', 73, 15, 'Psychic Fortress', 'Librarius', 'Places a shield of energy, protecting against the warp and reinforcing the will'),
    ...simpleCrunch('5', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '40m', true, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>Drawing on boundless reserves of inner strength, the psyker shields his mind – and those of his battle-brothers – from mortal fears and the threat of sorcerous assault. If successful, all affected automatically pass Resolve tests. Additionally, if dealt Mortal Wounds by a psychic power, roll a d6 per Mortal Wound. On a result 4, 5, or 6, the Mortal Wound is negated.</p>',
  },
  {
    ...simpleStub(305, 'tea', 74, 15, 'Null Zone', 'Librarius', 'Purges psychic energies and protective fields from an area'),
    ...simpleCrunch('8', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '15m (Radius)', true, ''),
    keywords: ['Adeptus Astartes','Psychic'],
    description:
      '<p>The psyker unleashes the full might of his mind to cast down his opponent’s defences, both technological and mystical, rendering them vulnerable to the retribution of the Adeptus Astartes. If successful, for as long as the power is sustained, each enemy psyker within range must subtract 1 from the result of each die on Psychic Mastery tests. In addition, enemies may not attempt to soak Mortal Wounds while within range or benefit from armor with the Force Shield trait.</p>',
  },
];

const psychicPowersRepository = [
  ...corePowers,
  ...fspgPowers,
  ...paxNavigatorPowers,
  ...aaoaWaaaghPowers,
  ...aaoaSancticPowers,
  ...aaoaAncestrialRites,
  ...aaoaLibrariusPowers,
  ...aaoaAeldariPowers,
  ...teaLibrariusPowers,
];

module.exports = {
  powers: psychicPowersRepository,
  abilities: coreUniversalAbilities,
};
