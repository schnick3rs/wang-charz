import { source } from './_sourcesRepository';

const simpleMelee = function (name, range, damage, ap, ...traits) {
  const splitDamage = damage.split('+');
  return {
    name,
    type: 'melee-weapon',
    range,
    damage: { static: splitDamage[0], ed: splitDamage[1] },
    ap,
    traits,
  };
};
const simpleRanged = function (name, range, damage, ap, salvo, ...traits) {
  const splitDamage = damage.split('+');
  return {
    name,
    type: 'ranged-weapon',
    range,
    damage: { static: splitDamage[0], ed: splitDamage[1] },
    ap,
    salvo,
    traits,
  };
};
const simpleAbility = function (text) {
  const textSplit = text.split(': ');
  return {
    name: textSplit[0],
    effect: textSplit[1],
  };
};

/**
 *
 * @param text
 * @returns {string}
 */
const textToSlug = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const slugToKebab = function (slug) {
  return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

const textSlugKebab = function (text) {
  const slug = textToSlug(text);
  const kebab = slugToKebab(slug);
  return kebab;
};

const levelMap = {
  t: 'Troops',
  e: 'Elite',
  a: 'Adversary',
  c: 'Monstrous Creature',
  v: 'Vehicle',
};

const classificationHelper = function (shortcode) {
  const split = shortcode.split('');
  return split.map((code) => levelMap[code]);
};

const aaoa = {
  feed: {
    name: 'Instinctive Behaviour (Lurk)',
    effect:
    'At the start of the creature’s turn, it must pass a Resolve test (DN 3) or act according to that instinct; '
    + 'if the Resolve test is passed, the creature may act freely. '
    + 'If the creature is part of a mob, then the whole mob makes a single Resolve test. '
    + 'Tyranids with the Feed instinct are driven by a voracious need to attack and consume, and they will rampage towards the nearest prey without thought for anything but sating appetites that will never be satisfied. '
    + 'A Tyranid with the Feed instinct becomes frenzied.',
  },
  lurk: {
    name: 'Instinctive Behaviour (Lurk)',
    effect:
      'At the start of the creature’s turn, it must pass a Resolve test (DN 3) or act according to that instinct; '
      + 'if the Resolve test is passed, the creature may act freely. '
      + 'If the creature is part of a mob, then the whole mob makes a single Resolve test. '
      + 'Tyranids with the Lurk instinct are driven by their survival instincts to seek out cover, hiding themselves away and attacking only when threatened. '
      + 'A Tyranid with the Lurk instinct becomes pinned.',
  },
  fleshborer: {
    name: 'Fleshborer',
    type: 'ranged-weapon',
    range: 24,
    damage: { static: 10, ed: 1 },
    ap: 0,
    salvo: 1,
    traits: ['Assault', 'Brutal'],
  },
  devourer: {
    name: 'Devourer',
    type: 'ranged-weapon',
    range: 36,
    damage: { static: 10, ed: 1 },
    ap: 0,
    salvo: 3,
    traits: ['Agonising', 'Asault', 'Spread'],
  },
  fleshHooks: simpleRanged('Flesh Hooks', 12, '15+1', 0, 2, 'Assault', 'Pistol'),
  adrenalGlands: {
    name: 'Adrenalin Glands',
    effect: 'Increase Speed by 1.',
  },
  toxinSacs: {
    name: 'Toxin Sacs',
    effect: 'Melee attacks gain +1 ED and Toxic(3).',
  },
  synapseCreature: simpleAbility('Synapse Creature: Tyranids automatically pass Resolve tests if they are within 25m of a friendly Synapse Creature. Further, Tyranids within range of a Synapse Creature cannot suffer Shock, as they are driven to action without regard for fear, pain, fatigue, or the limits of their own bodies. Naturally, a Synapse Creature also receives these benefits, as they are always considered to be “within range of a Synapse Creature”.'),
  shadowOfTheWarp: simpleAbility('Shadow of the Warp: Whenever a Psyker uses a psychic power while within 35m of a Tyranid with this ability, they must count all 6s on their Wrath dice as 1s. Psykers with the Tyranid keyword are not affected.'),
  necrons: {
    ancientMachines: simpleAbility('Ancient Machines: Necrons cannot suffer Shock, and abilities which inflict Shock have no effect on Necrons. Necron NPCs do may not roll to Soak unless they have an ability which permits them to, such as Living Metal.'),
    livingMetal: simpleAbility('Living Metal: Soaking does not cost any Shock for this Threat. In addition, if it ever scores more Icons when Soaking than is necessary to negate all the damage being inflicted, it regains 1 lost Wound for each surplus Icon, up to its normal maximum.'),
    reanimationProtocols: simpleAbility('Reanimation Protocols: Roll 1d6 for each slain Necron with this rule at the start of each round: on a 1, the Necron’s remains vanish, either self-destructing or teleporting away (it is impossible to tell which). On a 5 or 6, however, the Necron regains all lost Wounds and stands back up. On any other result, the Necron’s remains stay on the battlefield, but may roll again next round, unless no other Necrons of that type remain active on the battlefield, in which case they teleport away. Necrons which have been Annihilated immediately vanish.'),
    variants: {
      name: 'Necron Dynasties',
      options: [
        simpleAbility('Mephrit: Necrons of this dynasty improve the AP of their ranged weapons by 1 if they attack a target within Close range.'),
        simpleAbility('Nephrekh: If a Necron of this dynasty takes a Run or Sprint action, they vanish, and instantly reappear anywhere within a distance equal to their Speed, or twice their Speed if they sprinted. They must reappear on solid ground or another surface stable enough to stand upon.'),
        simpleAbility('Nihilakh: Necrons of this dynasty may re-roll any dice which roll 1s on their ranged attacks, provided that they did not move in the same turn.'),
        simpleAbility('Novokh: Necrons of this dynasty may re-roll all failures on melee attacks made when they charge, or if they were charged since their last turn.'),
        simpleAbility('Sautekh: When a Necron of this dynasty Runs, it treats all weapons as if they had the Assault trait. In addition, Necrons of this dynasty ignore the Heavy trait on weapons.'),
      ],
    },
  },
  tau: {
    fire: simpleAbility('For the Greater Good! (Fire): When an enemy declares a charge against a T’au ally within 12m of you, you may spend a Reload to make a shooting attack against the charging enemy, adding +4 to the DN and resolving the attack before the enemy moves. This ability may only be used once per round.'),
    water: simpleAbility('For the Greater Good! (Water): When a T’au ally attempts a Cunning, Deception, Insight, or Persuasion test, and you assist them, you add icons to their test for your assistance, rather than dice.'),
    air: simpleAbility('For the Greater Good! (Air): When making an attack from a vehicle or spacecraft, shifts from your roll may be used to increase the DN of your target’s next attack against a T’au ally by +1 per shift.'),
    earth: simpleAbility('For the Greater Good! (Earth): When a T’au ally attempts a Medicae, Scholar, or Tech test, and you assist them, you add icons to their test for your assistance, rather than dice.'),
    bonding: simpleAbility('Ta\'lissera Bonding Ritual: Any T’au with this rule are part of a bonded team (the GM should determine which T’au are part of which team for roleplaying purposes). Whenever a T’au with this ability attempts a Resolve or Conviction test, and rolls a 6 on their Wrath die, then the test is automatically successful, regardless of how many icons were rolled.'),
    markerlights: simpleRanged('Markerlights', 72, '0+0', 0, 0, 'Heavy (5)', 'Sniper'),
    pulsePistol: simpleRanged('Pulse Pistol', 60, '12+1', 0, 1, 'Pistol', 'Reliable'),
    pulseRifle: simpleRanged('Pulse Rifle', 60, '12+1', 0, 1, 'Rapid Fire (2)', 'Reliable'),
    photonGrenade: simpleRanged('Photon Grenades', 12, '0+0', 0, '-', 'Blast (Medium)', 'Suppression'),
    haywireGrenade: simpleRanged('Haywire Grenade', 12, '0+0', 0, '-', 'Blast (Small)', 'Haywire (3)'),
    pulseCarbine: simpleRanged('Pulse Carbine', 36, '12+1', 0, 2, 'Assault', 'Reliable', 'includes  Range 36m'),
    buildInPhotonGrenadeLauncher: simpleRanged('+ build-in Photon Grenade Launcher', 36, '0+0', 0, '-', 'Blast (Medium)', 'Suppression'),
    septs: {
      borkan: {
        fire: simpleAbility('Bork\'an Sept (Fire Caste): Increasing the range of all weapons with the Rapid Fire or Heavy trait by 12 metres.'),
      },
      dalyth: {
        fire: simpleAbility('Dal\'yth Sept (Fire Caste): If they do not move during their turn, they add +2 to their Defence (as if in cover) until the start of their next turn.'),
      },
      farsight: {
        fire: simpleAbility('The Farsight Enclave (Fire Caste): Add +2 to their Conviction. They may re-roll any failures on their extra damage dice for shooting attacks against enemies within 12m.'),
      },
      sacea: {
        fire: simpleAbility('Sa\'cea Sept (Fire Caste): All T’au from Sa’cea add +1 to their Resolve. May re-roll one die on any Ballistic Skill test they attempt.'),
      },
      tau: {
        fire: simpleAbility('T\'au Sept (Fire Caste): T’au from T’au reduce the DN of tests using Ballistic Skill by 2.'),
      },
      viorla: {
        fire: simpleAbility('Vior\'la Sept (Fire Caste): Treat any Rapid Fire weapon as if it had the Assault trait.'),
      },
    },
  },
};

aaoa.tau.septs.fire = {
  name: 'T\'au Septs (Fire Caste)',
  options: [
    aaoa.tau.septs.borkan.fire,
    aaoa.tau.septs.dalyth.fire,
    aaoa.tau.septs.farsight.fire,
    aaoa.tau.septs.sacea.fire,
    aaoa.tau.septs.tau.fire,
    aaoa.tau.septs.viorla.fire,
  ],
};

const threatz = function (sourceKey, sourcePage, faction, name, level) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${textSlugKebab(`${source[sourceKey].key} ${name}`)}`,
    name,
    faction,
    classification: classificationHelper(level),
    stub: false,
  };
};

const attributz = function(string) {
  const splits = string.split(' ').map((i) => i.trim());
  return {
    attributes: {
      strength: splits[0],
      toughness: splits[1],
      agility: splits[2],
      initiative: splits[3],
      willpower: splits[4],
      intellect: splits[5],
      fellowship: splits[6],
    }
  }
};

const traitz = function(string, determination) {
  const splits = string.split(' ').map((i) => i.trim());
  return {
    traits: {
      defence: splits[0],
      resilience: splits[1],
      wounds: splits[2],
      shock: splits[3],
      conviction: splits[4],
      resolve: splits[5],
      speed: splits[6],
      soak: determination,
      determination: determination,
    },
    size: splits[7],
  }
};

// 'Lasgun,
// 7 +1 ED / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'
// 7 +1 ED / AP -2 / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'
const attackz = function(name, string) {
  const sections = string.split(' / ').map((i) => i.trim());

  return simpleRanged(name,'','', '', '');
};

const simpleStub = function (sourceKey, sourcePage, faction, name, level) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${textSlugKebab(`${sourceKey} ${name}`)}`,
    name,
    faction,
    classification: classificationHelper(level),
    stub: true,
  };
};

/** An Abundance of Apocrypha */
const aaoaThreatsTyranidsHiveFleets = [
  {
    name: 'Behemoth',
    crunch: 'Add <Campaign Tier> to Speed when Charging.',
  },
  {
    name: 'Gorgon',
    crunch: 'Melee Attacks gain (or increase) the Toxic Trait, with a Rating equals the <Campaign Tier>.',
  },
  {
    name: 'Hydra',
    crunch: 'Mobs add <Campaign Tier> dice to melee attacks.',
  },
  {
    name: 'Jormungandr',
    crunch: 'Non-Flying Tyranids increase their Defence by <Campaign Tier>. The bonus is lost, while Running, Sprinting or Charging.',
  },
  {
    name: 'Kraken',
    crunch: 'Add <Campaign Tier> to Speed when Running, Sprinting or Charging. May Disengage as a Free Action.',
  },
  {
    name: 'Kronos',
    crunch: 'Add <Campaign Tier> dice to aimed range attacks.',
  },
  {
    name: 'Leviathan',
    crunch: 'Add <Campaign Tier> dice to Soak rolls. May soak Mortal Wounds while within range of a Synapse Creature. Mobs within Synapse Range are not slayn on a 6+.',
  },
];

const core15 = [
  {
    ...threatz('core', 328, 'Imperial', 'Astra Militarum Trooper', 'tttt'),
    ...attributz('2 2 3 2 3 1 2'),
    ...traitz('1 3 2 2 3 3 6 Avg', 3),
    actions: [
      attackz('Lasgun', '7 +1 ED / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'),
    ]
  }
];

const threatRepository = [
  //...core15,
  /** TODO CORE */
  {
    source: {
      ...source.core,
      page: '409',
    },
    key: 'coreAstraMilitarumTrooper',
    name: 'Astra Militarum Trooper',
    faction: 'Imperial',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 3,
    },
    traits: {
      defence: 3,
      speed: 3,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 3,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 8,
        armourRating: 3,
        armourName: 'Flak Armour',
      },
    },
    skills: {
      ballisticSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Human',
      'Imperium',
    ],
    attacks: [
      {
        name: 'Lasgun',
        type: 'ranged-weapon',
        damage: { static: 7, ed: 1 },
        range: 48,
        salvo: 2,
        ap: 0,
        traits: ['Reliable', 'Rapid Fire (2)'],
      },
      {
        name: '2 Frag Grenades',
        type: 'ranged-weapon',
        damage: { static: 10, ed: 1 },
        range: 12,
        salvo: -1,
        ap: 0,
        traits: ['Blast (Medium)'],
      },
      {
        name: 'Knife or Bayonet',
        type: 'melee-weapon',
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: 'Human Waves',
        effect: 'Any time a mob of Imperial Guardsman fail a Resolve Test or are destroyed, the Game Master gains 1 Ruin.',
      },
      {
        name: '(Mob) Bring it Down!',
        type: 'Mob',
        effect: 'When the mob makes a combined attack, it gains +2ED to damage',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '409',
    },
    key: 'coreAstraMilitarumVeteranTrooper',
    name: 'Astra Militarum Veteran Trooper',
    faction: 'Imperial',
    variantOf: 'astraMilitarumTrooper',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Troops',
      'Troops',
    ],
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 3,
    },
    traits: {
      defence: 3,
      speed: 3,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 3,
      passiveAwareness: 4,
      resilience: {
        total: 8,
        armourRating: 3,
        armourName: 'Flak Armour',
      },
    },
    skills: {
      ballisticSkill: 7,
      default: 6,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Human',
      'Imperium',
    ],
    attacks: [
      {
        name: 'Lasgun',
        type: 'ranged-weapon',
        damage: { static: 7, ed: 1 },
        range: 48,
        salvo: 2,
        ap: 0,
        traits: ['Reliable', 'Rapid Fire (2)'],
      },
      {
        name: '2 Frag Grenades',
        type: 'ranged-weapon',
        damage: { static: 10, ed: 1 },
        range: 12,
        salvo: -1,
        ap: 0,
        traits: ['Blast (Medium)'],
      },
      {
        name: 'Knife or Bayonet',
        type: 'melee-weapon',
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: '(Ruin) Stand Fast!',
        type: 'Ruin',
        effect: 'A veteran trooper can spend one Ruin to make a Leadership Test as a free action.',
      },
      {
        name: 'First Rank Fire! Second Rank Fire!',
        effect: 'As an action, the veteran trooper may order a mob of Astra Militarum troops to focus their attention on fi ring their ranged weapons. Choose one mob within 6 metres of the veteran trooper. The selected mob may use a Salvo action on their next turn. This action does not cost a Reload.',
      },
    ],
  },
  /** TODO Altar of Mechanicus */
  {
    source: {
      ...source.thaot,
      page: '',
    },
    key: 'thaotKastelanRobot',
    name: 'Kastelan Robot',
    faction: 'Adeptus Mechanicus',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: 'An echoing remnant of the once-great Legio Cybernetica, the Kastelan is a true robot, capable of making combat decisions without the input of a human operator. Edging dangerously close to the Silica Animus the Mechanicum fears, every Kastelan Robot is programmed with special data-chips, sanctified and warded against what the Adeptus Mechanicus fears above all else: another uprising of Artificial Intelligence. To help prevent this, Kastelan robots are usually fielded alongside Cybernetica Datasmiths, tech-priests who dedicate themselves to monitoring and feeding combat data to these walking automatons.'
    + '<br/><br/>While the Kastelan Robot is technically classed as a vehicle and is treated as such for most purposes, it operates on its own will without a human intelligence, and therefore much in common with a normal enemy as well. For all purposes that involve the vehicle’s pilot, consider the profile below to represent both the Kastelan itself and its “pilot”.',
    attributes: {
      strength: 8,
      agility: 4,
      toughness: '--',
      intellect: 2,
      willpower: '--',
      fellowship: '--',
      initiative: 4,
    },
    traits: {
      defence: 4,
      speed: 8,
      wounds: 10,
      shock: '--',
      soak: 8,
      resolve: '--',
      conviction: '--',
      passiveAwareness: 3,
      resilience: {
        total: 17,
        armourRating: 17,
        armourName: 'Walker',
      },
    },
    skills: {
      ballisticSkill: 6,
      weaponSkill: 6,
      default: 5,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Robot',
      'Imperium',
      'Adeptus Mechanicus',
      '<Forge World>',
    ],
    attacks: [
      {
        name: 'Kastelan Fists',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 18, ed: 2 },
        ap: -3,
        traits: ['Brutal'],
      },
      {
        name: 'Incendine Combustor',
        type: 'ranged-weapon',
        range: 16,
        damage: { static: 12, ed: 2 },
        salvo: 2,
        ap: -1,
        traits: ['Blast (Large)', 'Blaze', 'Heavy (6)', 'Spread'],
      },
      {
        name: '3x Heavy Phosphor Blaster',
        type: 'ranged-weapon',
        range: 72,
        damage: { static: 14, ed: 2 },
        salvo: 3,
        ap: -2,
        traits: ['Blaze', 'Heavy (6)', 'Phosphor'],
        special: 'All three Phosphor Blasters may be fired individually each turn.',
      },
    ],
    specialAbilities: [
      {
        name: 'Repulsor Grid',
        effect: 'A Kastelan Robot has a Force Shield with AV *5. When attempting to soak wounds, if two or more 6s are rolled on the soak roll, the enemy that made the attack suffers a mortal wound.',
      },
      {
        name: 'Battle-Automata',
        effect: 'A Robot is not alive, and therefore ignores any effects that would affect the mind or physiology, such as poisons, radiation, disease, or mind-affecting psychic powers. A Robot does not have a toughness, willpower, fellowship resolve or conviction score and is considered to automatically pass those tests if it is required to make them, except where the GM determines otherwise.',
      },
      {
        name: 'Battle Protocols',
        effect: 'Kastelan Robots can have one of three battle protocols active at a time. '
        + 'A Kastelan Robot begins combat with Aegis Protocol active and cannot change to '
        + 'another except by the actions of a Cybernetica Datasmith. '
        + '(1) Aegis Protocol: The Kastelan robot adds 2 to its resilience and increases the AV of its Repulsor Grid force shield to 7.'
        + '(2) Conqueror Protocol: The Kastelan cannot fire any ranged weapons it has equipped, but may ignore up to 2DN penalty for making a melee Multi-Attack.'
        + '(3) Protector Protocol: The Kastelan cannot use any melee weapons it has equipped and cannot move, but doubles the Salvo rating for all its ranged weapons.',
      },
    ],
  },
  /** Legacy of the Necrontyr */
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnWarrior',
    name: 'Necron Warrior',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Elite',
      'Elite',
      'Troops',
      'Troops',
    ],
    description: 'When the Necrontyr gave up their mortality, countless workers, shopkeepers, artisans, and farmers were among their number. After the entire race became soulless machines, these menial workers became the basest of the new Necron race: foot soldiers with only enough intelligence to follow orders. These “Warriors” are supremely unintelligent, following highly predictable processes with extremely basic programming, unless directed by an overseer. However, predicting their actions is entirely different from being able to stop them, and even the basic Warrior is a near-immortal combatant, with superhuman strength and weaponry that baffles the Adeptus Mechanicus.',
    attributes: {
      strength: 5,
      agility: 4,
      toughness: 5,
      intellect: 1,
      willpower: 4,
      fellowship: 1,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 8,
      shock: 7,
      soak: 5,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 4,
      resilience: {
        total: 10,
        armourRating: 4,
        armourName: 'Living Metal',
      },
    },
    skills: {
      ballisticSkill: 8,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Gauss Flayer',
        type: 'ranged-weapon',
        range: 48,
        damage: { static: 10, ed: 1 },
        ap: -1,
        salvo: 2,
        traits: ['Rappid Fire (2)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers. A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and never have to eat, sleep, or breathe. For the purposes of weapons and abilities that affect machines, a Necron is considered a machine.',
      },
      {
        name: '(Mob) Undying Legions',
        effect: 'Whenever a mob of Necron Warriors successfully regains more than two members due to Reanimation Protocols, the GM gains 1 Ruin.',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnImmortal',
    name: 'Necron Immortal',
    faction: 'Necrons',
    classification: classificationHelper('aaeee'),
    description: 'Formerly professional soldiers in the Necrontyr military, these warriors retained a spark of their sentience, though they are still only capable of slightly more than a Warrior. Often assigned as leaders of groups of Warriors, Immortals carry much more powerful weapons and are covered in enhanced plating that gives them their name. Even amongst the deathless Necrons, the Immortals are particularly resilient.',
    attributes: {
      strength: 5,
      agility: 4,
      toughness: 6,
      intellect: 3,
      willpower: 4,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 9,
      shock: 7,
      soak: 6,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 4,
      resilience: {
        total: 12,
        armourRating: 5,
        armourName: 'Heavy Plating',
      },
    },
    skills: {
      ballisticSkill: 9,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Gauss Blaster',
        type: 'ranged-weapon',
        range: 48,
        damage: { static: 12, ed: 1 },
        ap: -2,
        salvo: 2,
        traits: ['Rapid Fire (2)'],
      },
      {
        name: 'Tesla Carbine',
        type: 'ranged-weapon',
        range: 48,
        damage: { static: 12, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Assault', 'Tesla'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      { name: '(Ruin) Champion', effect: 'This threat may take Ruin Actions.' },
      {
        name: '(Ruin) Immortal',
        effect: 'An Immortal may spend a point of Ruin to negate any critical effects it would suffer from a critical hit.',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnDeathmark',
    name: 'Necron Deathmark',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: 'Patience and vigilance are some of the most important qualities for a sniper, and the Deathmarks exemplify them. With no need for sleep, food, or drink, nothing can distract these assassins from their task, hiding in the spaces between dimensions as they watch for their prey to draw near enough for them to attack. So feared are the Deathmarks that ancient laws forbid their use against fellow Necrons, but against mortals there are no such restrictions, and with their unparalleled tracking abilities, they never lose their mark once they have it. ',
    attributes: {
      strength: 5,
      agility: 4,
      toughness: 5,
      intellect: 4,
      willpower: 4,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 8,
      shock: 7,
      soak: 5,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 5,
      resilience: {
        total: 11,
        armourRating: 5,
        armourName: 'Heavy Plating',
      },
    },
    skills: {
      ballisticSkill: 10,
      awareness: 10,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Synaptic Disintegrator',
        type: 'ranged-weapon',
        range: 48,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Rapid Fire (1)', 'Sniper (2)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      {
        name: '(Ruin) Hunter’s Mark',
        effect: 'The GM may spend a point of Ruin in order to select a single non-Necron character. All Deathmarks in the current combat gain a +2d bonus to Ballistic Skill tests when targeting that character for the rest of the combat. They may also track the character without a test required.',
      },
      {
        name: '(Wrath) Assassin',
        effect: 'Whenever a Deathmark rolls a 6 on the Wrath die when attacking with its Synaptic Disintegrator, the target suffers a Mortal Wound in addition to any critical effects.',
      },
      {
        name: 'Ethereal Interception',
        effect: 'A Deathmark may hide within an extradimensional space, undetectable but unable to do more than watch outside. When anyone enters the area it has hidden within, it may emerge instantly, making a single attack with its Synaptic Disintegrator. This counts as an Ambush.\n',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnFlayedOne',
    name: 'Necron Flayed One',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Troops',
    ],
    description: 'Infected by the ancient Flayer virus, the Flayed Ones seem to have an unsettling fascination with flesh, perhaps desiring to regain it, perhaps simply playing with it like a toy. Regardless, they have altered themselves for the purpose of obtaining more, with wicked talons designed to strip away everything from the bone, tearing asunder any mortal unfortunate enough to encounter one. They then wear these strips of flesh like clothing, draping them over their frame in a mess of bloody gore.',
    attributes: {
      strength: 5,
      agility: 4,
      toughness: 5,
      intellect: 2,
      willpower: 4,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 5,
      wounds: 8,
      shock: 7,
      soak: 5,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 5,
      resilience: {
        total: 10,
        armourRating: 4,
        armourName: 'Living Metal',
      },
    },
    skills: {
      weaponSkill: 10,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Flayer Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Brutal'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      {
        name: '(Ruin) Flesh Hunger',
        effect: 'If a Flayed One kills its target, the GM may spend a Ruin. If so, the Flayed One begins mutilating the corpse and draping its flesh about itself. If it does this, all those present in the combat that share a keyword with the dead individual suffer a +2DN penalty to Resolve tests so long as the Flayed One is alive.\n',
      },
      {
        name: 'Flesh Render',
        effect: 'A Flayed One may reroll any failed damage dice on its melee attacks. It may ignore up to +2DN worth of penalties when making melee multi-attacks, and gains +2d to its melee attack rolls when attacking mobs.',
      },
      {
        name: 'Hunting Horrors',
        effect: 'Flayed Ones usually hide within a charnel pocket-dimension, emerging into reality when they detect somewhere where new flesh can be harvested. A Flayed One may claw its way into reality into any combat involving Necrons and non-Necrons at the beginning of any Round. This does not count as an ambush.',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnNecronTriarchPraetorian',
    name: 'Necron Triarch Praetorian',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: 'Enforcers of ancient Necrontyr law, a Praetorian’s task is not to fight on the front lines, but to ensure that the codes of the Empire are being upheld in any given combat. They are beholden to none but the Silent King himself, but they may lend their blades should a situation that threatens the Necron Empire arise.',
    attributes: {
      strength: 7,
      agility: 5,
      toughness: 7,
      intellect: 6,
      willpower: 5,
      fellowship: 4,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 10,
      wounds: 12,
      shock: 10,
      soak: 6,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 6,
      resilience: {
        total: 12,
        armourRating: 5,
        armourName: 'Praetorian Plate',
      },
    },
    skills: {
      weaponSkill: 11,
      ballisticSkill: 11,
      scholar: 11,
      default: 10,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Rod of Covenant',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 12, ed: 1 },
        ap: -3,
        traits: [],
      },
      {
        name: 'Rod of Covenant',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 12, ed: 1 },
        ap: -3,
        salvo: 1,
        traits: ['Assault'],
      },
      {
        name: 'Voidblade',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 12, ed: 1 },
        ap: -3,
        traits: [],
      },
      {
        name: 'Particle Caster',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 14, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Pistol'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      {
        name: '(Ruin) Champion',
        effect: 'This threat may take Ruin Actions.',
      },
      {
        name: '(Ruin) Solemn Judgement',
        effect: 'A Triarch Praetorian may judge whether an enemy’s conduct in the current combat is honorable or dishonorable once per combat, if the GM spends a point of Ruin. If the enemy is honorable, all Necrons in the combat (including the Praetorian) gain a +1d bonus to Weapon Skill tests against that enemy. If the enemy is dishonorable, they instead gain a +1d bonus to Ballistic Skill tests against that enemy.',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnNecronDestroyer',
    name: 'Necron Destroyer',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: 'Corrupted by glitches, viruses, and decay after aeons of slumber, the Destroyers are nihilistic, even by the standards of the hateful Necrons. Seeking nothing less than the end of all things, the Destroyers would gladly annihilate the galaxy if it was within their power. In order to make themselves better weapons of war, the Destroyers mutilate themselves, removing their legs and replacing them with anti-gravity repulsors, amputating limbs and attaching massive weapons to the stumps. A Destroyer serves no lord other than one of his own kind, but they may assist an Overlord whose goals temporarily align with their own.',
    attributes: {
      strength: 5,
      agility: 5,
      toughness: 7,
      intellect: 4,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 10,
      wounds: 12,
      shock: 7,
      soak: 7,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 4,
      resilience: {
        total: 14,
        armourRating: 5,
        armourName: 'Heavy Plating',
      },
    },
    skills: {
      ballisticSkill: 11,
      default: 8,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Gauss Cannon',
        type: 'ranged-weapon',
        range: 48,
        damage: { static: 14, ed: 2 },
        ap: -3,
        salvo: 3,
        traits: ['Heavy (3)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      {
        name: 'Hardwired Hatred',
        effect: 'When making attack rolls against anyone without the Necron keyword, a Destroyer may reroll unmodified die results of 1.',
      },
      {
        name: 'Repulsor Platform',
        effect: 'A Destroyer ignores penalties to movement due to difficult terrain, and may fly. It is always considered to be braced for the purposes of firing its weapons.\n',
      },
    ],
  },
  {
    source: {
      ...source.lotn,
      page: '',
    },
    key: 'lotnHeavyNecronDestroyer',
    name: 'Necron Heavy Destroyer',
    faction: 'Necrons',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: 'Equipped with a much more powerful gauss weapon, these Destroyers are ideal for annihilating vehicles and other hardened targets. Corrupted by glitches, viruses, and decay after aeons of slumber, the Destroyers are nihilistic, even by the standards of the hateful Necrons. Seeking nothing less than the end of all things, the Destroyers would gladly annihilate the galaxy if it was within their power. In order to make themselves better weapons of war, the Destroyers mutilate themselves, removing their legs and replacing them with anti-gravity repulsors, amputating limbs and attaching massive weapons to the stumps. A Destroyer serves no lord other than one of his own kind, but they may assist an Overlord whose goals temporarily align with their own.',
    attributes: {
      strength: 5,
      agility: 5,
      toughness: 7,
      intellect: 4,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 10,
      wounds: 12,
      shock: 7,
      soak: 7,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 4,
      resilience: {
        total: 14,
        armourRating: 5,
        armourName: 'Heavy Plating',
      },
    },
    skills: {
      ballisticSkill: 11,
      default: 8,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      '<Dynasty>',
    ],
    attacks: [
      {
        name: 'Heavy Gauss Cannon',
        type: 'ranged-weapon',
        range: 72,
        damage: { static: 18, ed: 1 },
        ap: -4,
        salvo: 1,
        traits: ['Heavy'],
      },
    ],
    specialAbilities: [
      {
        name: 'Reanimation Protocols',
        effect: 'When this threat is reduced to 0 wounds, except by Annihilation, roll a d6 '
        + 'at the beginning of each following round until combat ends or reanimation occurs. '
        + 'On a die result of 5 or 6, the threat returns to consciousness with 1d6*Tier wounds '
        + 'remaining. '
        + 'For mobs with this ability, instead roll a d6 for each member of the mob that has '
        + 'been lost, and for each result of 5 or 6, restore it to the mob. A mob that is '
        + 'reduced to 0 members does not roll for Reanimation Protocols.'
        + 'As a full round action, a character may attack a Necron at 0 wounds, spending enough '
        + 'time to blast its remains apart or chop it to pieces, killing it permanently (or at '
        + 'least for the remainder of the combat). It may still be teleported away from the '
        + 'battlefield by its tomb.',
      },
      {
        name: ' Soulless Machine',
        effect: 'A Necron is immune to fear, pinning, and mind-affecting abilities and powers.'
        + ' A Necron never needs to pass Resolve tests in order to keep fighting. A Necron’s '
        + 'Corruption is permanently locked at 0. Necrons are immune to disease and toxins, and '
        + 'never have to eat, sleep, or breathe. For the purposes of weapons and abilities that '
        + 'affect machines, a Necron is considered a machine.',
      },
      {
        name: 'Hardwired Hatred',
        effect: 'When making attack rolls against anyone without the Necron keyword, a Destroyer may reroll unmodified die results of 1.',
      },
      {
        name: 'Repulsor Platform',
        effect: 'A Destroyer ignores penalties to movement due to difficult terrain, and may fly. It is always considered to be braced for the purposes of firing its weapons.\n',
      },
    ],
  },
  /** ArdentPurple's Tyranid Bestiary */
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsTermagant',
    name: 'Termagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: '-',
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 7,
        armourRating: 3,
        armourName: 'Carapace',
      },
    },
    skills: {
      ballisticSkill: 7,
      weaponSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      {
        name: 'Fleshborer',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Living Ammunition'],
      },
      {
        name: 'Teeth and Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 3, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Hail of Living Ammunition',
        effect: 'If this troop is in a mob with more than 20 members, its ranged attacks gain the Brutal trait.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsHormagant',
    name: 'Hormagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: '-',
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 8,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 7,
        armourRating: 3,
        armourName: 'Carapace',
      },
    },
    skills: {
      weaponSkill: 7,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 6, ed: 1 },
        ap: -1,
        traits: [],
      },
      {
        name: 'Teeth and Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 3, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Hungering Swarm',
        effect: 'If this troop is in a mob with more than 20 members, its melee attacks gain the Brutal trait.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsTyranidWarrior',
    name: 'Tyranid Warrior',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 5,
      agility: 4,
      toughness: 5,
      intellect: 3,
      willpower: 5,
      fellowship: '-',
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 5,
      shock: 3,
      soak: 4,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 3,
      resilience: { total: 12, armourRating: 6, armourName: 'Carapace' },
    },
    skills: {
      ballisticSkill: 8,
      weaponSkill: 8,
      default: 5,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
      'Synapse Creature',
    ],
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: -1,
        traits: ['Off-Hand'],
      },
      {
        name: 'Devourer',
        type: 'ranged-weapon',
        range: 36,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 3,
        traits: ['Assault', 'Brutal', 'Living Ammunition'],
      },
    ],
    attackTraits: [
      {
        name: 'Off-Hand',
        crunch: 'Multi-Attacks with this weapon ignore up to +2 DN penalties.',
        description: 'Often small and well-balanced, an Off-Hand weapon is designed for dual wielding, allowing the user to blend both weapons together in a single, seamless combat style. If used as part of a melee Multi-attack, ignore up to +2DN worth of penalties when attacking with an Off-Hand weapon.',
      },
      {
        name: 'Living Ammunition',
        crunch: 'The weapon ignore the Jam and Out of Ammunition Combat Complication.',
        description: 'Weapons with this trait generate ammunition from their very bodies, and therefore do not run out of it. However, using excessive amounts of it can tax the Tyranid’s body. A weapon with this trait is never considered to be empty and does not jam--the Tyranid can always generate enough to fire normally--but all rules regarding reloads are used as normal. A Tyranid with no reloads remaining cannot spend them to Salvo or other actions, and Troop-level tyranids do not gain the ability to spend reloads.',
      },
    ],
    specialAbilities: [
      {
        name: 'Synapse',
        effect: 'Creatures with the Tyranid keyword who do NOT possess the Synapse Creature keyword automatically pass all Resolve tests when within 8m of a Synapse.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsLictor',
    name: 'Lictor',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 6,
      agility: 4,
      toughness: 4,
      intellect: 2,
      willpower: 4,
      fellowship: '-',
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 10,
      shock: 6,
      soak: 4,
      resolve: 3,
      conviction: 5,
      passiveAwareness: 4,
      resilience: { total: 9, armourRating: 4, armourName: 'Carapace' },
    },
    skills: {
      weaponSkill: 10,
      default: 8,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Toxic (3)', 'Off-Hand'],
      },
      {
        name: 'Rending Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: -1,
        traits: ['Rending (4)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Flesh Hooks',
        effect: 'Lictors  have  dozens  of tiny  hooks  which  they  can  fire  from their chests to snare prey and drag their victims toward them. These allow a Lictor to initiate a Grapple with  a  target  up  to 10m away. With every successful Opposed  Strength  Test the Lictor makes as part of the Grapple action, the target is pulled closer by 1m plus 1m for each degree of success.',
      },
      {
        name: 'Chameleonic Scales',
        effect: '+2D to Stealth tests and +2 to Defence against an opponent who cannot locate them. The Lictor may attempt Stealth tests during combat as a Move Action and while in plain sight.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsZoanthrope',
    name: 'Zoanthrope',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 4,
      agility: 4,
      toughness: 4,
      intellect: 4,
      willpower: 6,
      fellowship: '-',
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 11,
      shock: 6,
      soak: 4,
      resolve: 3,
      conviction: 5,
      passiveAwareness: 4,
      resilience: { total: 9, armourRating: '*4', armourName: 'Warp Field' },
    },
    skills: {
      psychicMastery: 8,
      default: 7,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
      'Psyker',
      'Synapse Creature',
    ],
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Toxic (3)', 'Off-Hand'],
      },
    ],
    specialAbilities: [
      {
        name: 'Synapse',
        effect: 'Creatures with the Tyranid keyword who do NOT possess the Synapse Creature keyword automatically pass all Resolve tests when within 8m of a Synapse Creature.',
      },
      {
        name: 'Shadow in the Warp',
        effect: 'A Tyranid Psyker may never suffer daemonic possession. A Tyranid Psyker’s attempts to Deny the Witch gain +2d.',
      },
      {
        name: 'Psyker',
        effect: 'A Zoanthrope has the Smite power and one other power from the Hive Mind discipline.',
      },
      {
        name: 'Warp Blast',
        effect: 'A Zoanthrope increases the range of Smite to 50m. If there are 4-5 Zoanthropes within 12m of each other, Smite deals an extra d3 mortal wounds. If there are 6 or more, it deals 3 extra mortal wounds instead.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsRavener',
    name: 'Ravener',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 4,
      agility: 4,
      toughness: 4,
      intellect: 4,
      willpower: 4,
      fellowship: '-',
      initiative: 4,
    },
    traits: {
      defence: 4,
      speed: 12,
      wounds: 10,
      shock: 6,
      soak: 4,
      resolve: 3,
      conviction: 4,
      passiveAwareness: 4,
      resilience: { total: 8, armourRating: 3, armourName: 'Carapace' },
    },
    skills: {
      ballisticSkill: 7,
      weaponSkill: 7,
      default: 6,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      {
        name: '2x Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Toxic (3)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Death From Below',
        effect: 'A Ravener may freely burrow through dirt and stone, halving its speed as it does so, and is considered to always have cover while burrowed. It may be detected by sensitive equipment, or an Awareness test opposed by a Stealth test by the Ravener. It may charge while burrowing, and if the charge is made while undetected, the charge is treated as an Ambush.',
      },
    ],
  },
  {
    source: {
      ...source.aptb,
      page: '',
    },
    key: 'arpuTyranidsCarnifex',
    name: 'Carnifex',
    faction: 'Tyranids',
    classification: [
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
    ],
    description: '',
    attributes: {
      strength: 8,
      agility: 7,
      toughness: 7,
      intellect: 5,
      willpower: 7,
      fellowship: '-',
      initiative: 7,
    },
    traits: {
      defence: 6,
      speed: 12,
      wounds: 10,
      shock: 6,
      soak: 4,
      resolve: 3,
      conviction: 4,
      passiveAwareness: 4,
      resilience: { total: 8, armourRating: 3, armourName: 'Carapace' },
    },
    skills: {
      ballisticSkill: 7,
      weaponSkill: 7,
      default: 6,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      {
        name: '2x Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Toxic (3)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Death From Below',
        effect: 'A Ravener may freely burrow through dirt and stone, halving its speed as it does so, and is considered to always have cover while burrowed. It may be detected by sensitive equipment, or an Awareness test opposed by a Stealth test by the Ravener. It may charge while burrowing, and if the charge is made while undetected, the charge is treated as an Ambush.',
      },
    ],
  },
  /** Javelin's Tyranid Bestiary */
  {
    source: {
      ...source.jtb,
      page: '',
    },
    key: 'jtbTyranidHormagant',
    name: 'Tyranid Hormagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 4,
      agility: 3,
      toughness: 3,
      intellect: 2,
      willpower: 4,
      fellowship: 1,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 8,
      wounds: 4,
      shock: 4,
      soak: 3,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 7,
        armourRating: 3,
        armourName: 'Chitin',
      },
    },
    skills: {
      athletics: 7,
      weaponSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
      '<Hive Fleet>',
    ],
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 7, ed: 1 },
        ap: 0,
        traits: ['Rending (1)'],
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Brood Mind',
        effect: 'Whilst in a mob, Hormagaunts gain +3d to Resolve tests while they are within 20 meters of a Genestealer or any other Tyranid with the Synapse Creature keyword.',
      },
      {
        name: 'Bounding Leap',
        effect: 'Hormagaunts double their movement characteristic when using the Charge action.',
      },
      {
        name: 'Instinctive Behaviour (Feed)',
        effect: 'A Hormagaunt that is further away than 1KM from a Genestealer or any other Tyranid with the Synapse Creature keyword, or otherwise cut from the Hivemind will start feeding on whatever is nearby, attacking only to defend itself.',
      },
    ],
  },
  {
    source: {
      ...source.jtb,
      page: '',
    },
    key: 'jtbTyranidTermagant',
    name: 'Tyranid Termagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 4,
      toughness: 2,
      intellect: 2,
      willpower: 4,
      fellowship: 1,
      initiative: 3,
    },
    traits: {
      defence: 2,
      speed: 8,
      wounds: 4,
      shock: 4,
      soak: 2,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 6,
        armourRating: 3,
        armourName: 'Chitin',
      },
    },
    skills: {
      ballisticSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
      '<Hive Fleet>',
    ],
    attackOptions: 'Termagants are equipped with a <strong>Fleshborer</strong> and <strong>Claws and Teeth</strong>.',
    attacks: [
      {
        name: 'Fleshborer',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Assault (1)'],
      },
      {
        name: 'Claws and Teeth',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
      {
        name: 'Strangleweb Cannon',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 5, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Blast (Medium)', 'Strangleweb'],
      },
    ],
    attackTraits: [
      {
        name: 'Strangleweb',
        effect: 'Furthermore when a target is hit by this attack they are Restrained until they succeed on a DN 3 Strength test. At the start of the target´s turn they take 1d3+1 Shock damage from the web tightening around them.',
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Brood Mind',
        effect: 'Whilst in a mob, Termagants gain +3d to Resolve tests while they are within 20 meters of a Genestealer or any other Tyranid with the Synapse Creature keyword.',
      },
      {
        name: 'Instinctive Behaviour (Lurk)',
        effect: 'A Termagaunt that is further away than 1KM from a Genestealer or any other Tyranid with the Synapse Creature keyword, or otherwise cut from the Hivemind will turn from combat and actively seek out a shelter to hide in, attacking only to defend itself.',
      },
      {
        name: '(Mob) Strangleweb',
        effect: 'Occasionally Termagaunts are equipped with debilitating weaponry in order to capture live specimen for gene-splicing and dissecting. In a mob of at least 10 Termagaunts you may replace one´s Fleshborer with a Strangleweb Cannon.',
      },
    ],
  },
  {
    source: {
      ...source.jtb,
      page: '',
    },
    key: 'jtbTyranidRipperSwarm',
    name: 'Tyranid Ripper Swarm',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 2,
      intellect: 1,
      willpower: 4,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 3,
      shock: 4,
      soak: 2,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 6,
        armourRating: 3,
        armourName: 'Chitin',
      },
    },
    skills: {
      athletics: 6,
      stealth: 7,
      weaponSkill: 4,
      default: 2,
    },
    size: 'Small (Swarm of 10 Rippers)',
    sizeModifier: -1,
    keywords: [
      'Tyranid',
      '<Hive Fleet>',
    ],
    attacks: [
      {
        name: 'Claws and Teeth',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Brood Mind',
        effect: 'Whilst in a mob, Ripper Swarms gain +3d to Resolve tests while they are within 20 meters of a Genestealer or any other Tyranid with the Synapse Creature keyword.',
      },
      {
        name: 'Fearless',
        effect: 'Ripper Swarms are immune to Fear and Pinned effects.',
      },
      {
        name: 'Swarm',
        effect: 'This creature uses its minute form and large numbers to overpower their foe. They are immune to Prone and Restrained effects but their tight grouping makes them ideal targets for ordnance and flame. Any attack targeting a Swarm that has an area of effect affects a number of targets one size category greater than listed on the weapon´s profile.',
      },
      {
        name: 'Instinctive Behaviour (Feed)',
        effect: 'A Ripper Swarm that is further away than 1KM from a Genestealer or any other Tyranid with the Synapse Creature keyword, or otherwise cut from the Hivemind will start feeding on whatever is nearby, attacking only to defend itself.',
      },
      {
        name: 'Tunnel Swarm',
        effect: 'As an action on its turn this creature can tunnel under the ground, becoming invisible to the naked eye. While underground it cannot use the Sprint action. As an action while tunneling it can emerge from the ground.',
      },
    ],
  },
  {
    source: {
      ...source.jtb,
      page: '',
    },
    key: 'jtbTyranidWarrior',
    name: 'Tyranid Warrior',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Elite',
      'Elite',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 7,
      agility: 4,
      toughness: 4,
      intellect: 2,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 6,
      shock: 5,
      soak: 5,
      resolve: 5,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 10,
        armourRating: 5,
        armourName: 'Hardened Carapace',
      },
    },
    skills: {
      athletics: 9,
      awareness: 6,
      ballisticSkill: 6,
      weaponSkill: 7,
      default: 5,
    },
    size: 'Large',
    sizeModifier: 1,
    keywords: [
      'Tyranid',
      '<Hive Fleet>',
      'Synapse Creature',
    ],
    attackOptions: 'Some (Anti-Tank) Warriors come equipped with a <strong>Venom Cannon</strong> instead of a <strong>Devourer</strong>. '
      + 'Others (Venguards) change the weapon layout to <strong>Boneswords</strong> and <strong>Spinefists</strong>.',
    attacks: [
      {
        name: 'Devourer',
        type: 'ranged-weapon',
        range: 40,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Brutal', 'Rapid Fire (2)'],
      },
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 10, ed: 1 },
        ap: 0,
        traits: ['Rending (1)'],
      },
      {
        name: 'Venom Cannon',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 16, ed: 2 },
        ap: -4,
        salvo: 1,
        traits: ['Melta', 'Toxic (2)'],
      },
      {
        name: 'Boneswords',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 12, ed: 1 },
        ap: -3,
        traits: ['Brutal', 'Parry'],
      },
      {
        name: 'Spinefists',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Pistol'],
      },
    ],
    specialAbilities: [
      {
        name: 'Shadow in the Warp',
        effect: 'Characters without the Tyranid keyword within 20 meters suffer +2 DN on Psychic Mastery tests.',
      },
    ],
  },
  /** TODO Let The Galaxy Burn https://docs.google.com/document/d/1bdtobuS39XgY_7WJ0cbP5xzHMvozJh9gIgyf6K5nBvw/view */
  {
    source: {
      ...source.ltgb,
      page: '',
    },
    key: 'ltgbGalaxCultist',
    name: 'Cultist',
    faction: 'Chaos',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: 'Anyone can free themselves from their chains, but most have little value other than fodder, never seeing any great achievements or power. Some willingly sacrifice themselves to summon daemons, others brutalize and mutilate themselves in their worship, desperately begging for a shred of the gods’ favor. Often, these cults are led by a priest of the Dark Gods, serving much the same purpose as the Corpse Emperor’s own zealots. However, on the field of battle, hordes of cultists can be goaded into battle before a Chaos Space Marine.',
    attributes: {
      strength: 3,
      agility: 2,
      toughness: 2,
      intellect: 2,
      willpower: 3,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 1,
      shock: 2,
      soak: 2,
      resolve: 2,
      conviction: 2,
      passiveAwareness: 2,
      resilience: {
        total: 6,
        armourRating: 2,
        armourName: 'Robes',
      },
    },
    skills: {
      deception: 5,
      stealth: 5,
      weaponSkill: 5,
      default: 3,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Human',
      'Heretic',
      'Chaos',
      '<Mark of Chaos>',
    ],
    attacks: [
      {
        name: 'Autopistol',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Pistol'],
      },
      {
        name: 'Knife',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: 'Devotion',
        effect: 'Any time a cultist is slain by a Critical Hit, the GM gains 1 Ruin.',
      },
      {
        name: 'Shoot and Stab',
        effect: 'Cultists take no penalty for a multi-action where they fire their pistol and stab with their knife in the same turn.',
      },
    ],
  },
  {
    source: {
      ...source.ltgb,
      page: '',
    },
    key: 'ltgbGalaxCultistRangedVariant',
    name: 'Cultist (Ranged Variant)',
    faction: 'Chaos',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: 'Anyone can free themselves from their chains, but most have little value other than fodder, never seeing any great achievements or power. Some willingly sacrifice themselves to summon daemons, others brutalize and mutilate themselves in their worship, desperately begging for a shred of the gods’ favor. Often, these cults are led by a priest of the Dark Gods, serving much the same purpose as the Corpse Emperor’s own zealots. However, on the field of battle, hordes of cultists can be goaded into battle before a Chaos Space Marine.',
    attributes: {
      strength: 3,
      agility: 2,
      toughness: 2,
      intellect: 2,
      willpower: 3,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 1,
      shock: 2,
      soak: 2,
      resolve: 2,
      conviction: 2,
      passiveAwareness: 2,
      resilience: {
        total: 6,
        armourRating: 2,
        armourName: 'Robes',
      },
    },
    skills: {
      deception: 5,
      stealth: 5,
      ballisticSkill: 5,
      default: 3,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Human',
      'Heretic',
      'Chaos',
      '<Mark of Chaos>',
    ],
    attacks: [
      {
        name: 'Autogun',
        type: 'ranged-weapon',
        range: 40,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 3,
        traits: ['Rapid Fire (1)'],
      },
      {
        name: 'Knife',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: 'Devotion',
        effect: 'Any time a cultist is slain by a Critical Hit, the GM gains 1 Ruin.',
      },
      {
        name: '(Mob) (Wrath) For the Dark Gods',
        effect: 'Whenever a mob attack rolls a 6 on the Wrath Die, the GM gains 2 Ruin instead of 1.',
      },
    ],
  },
  {
    source: {
      ...source.ltgb,
      page: '',
    },
    key: 'ltgbGalaxCultLeader',
    name: 'Cult Leader',
    faction: 'Chaos',
    classification: [
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: 'A cult needs a leader, a force of personality and a charismatic anchoring point that inspires and motivates his followers. \tOften promising the galaxy to his followers, he seeks his own glory and power above all else, or simply legitimately wants to do the work of the Dark Gods. In any case, a group of cultists led by their idol are driven to greater and greater acts of depravity.',
    attributes: {
      strength: 4,
      agility: 3,
      toughness: 5,
      intellect: 4,
      willpower: 4,
      fellowship: 4,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 5,
      shock: 4,
      soak: 5,
      resolve: 3,
      conviction: 4,
      passiveAwareness: 4,
      resilience: { total: 7, armourRating: 2, armourName: 'Robes' },
    },
    skills: {
      deception: 5,
      stealth: 5,
      weaponSkill: 5,
      default: 3,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Human',
      'Heretic',
      'Chaos',
      '<Mark of Chaos>',
    ],
    attacks: [
      {
        name: 'Autopistol',
        type: 'ranged-weapon',
        range: 20,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Pistol'],
      },
      {
        name: 'Knife',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: 'Devotion',
        effect: 'Any time a cultist is slain by a Critical Hit, the GM gains 1 Ruin.',
      },
      {
        name: 'Shoot and Stab',
        effect: 'Cultists take no penalty for a multi-action where they fire their pistol and stab with their knife in the same turn.',
      },
    ],
  },
  {
    source: {
      ...source.ltgb,
      page: '',
    },
    key: 'ltgbGalaxBloodthirster',
    name: 'Bloodthirster',
    faction: 'Chaos',
    classification: [
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
    ],
    description: 'The ultimate embodiment of Khorne’s unflinching rage, a Bloodthirster charges into combat with a fervor only outstripped by its ferocity. Tearing through hordes of soldiers like a farmer reaps wheat, no amount of slaughter is enough for this juggernaut.',
    attributes: {
      strength: 10,
      agility: 8,
      toughness: 9,
      intellect: 7,
      willpower: 8,
      fellowship: 6,
      initiative: 10,
    },
    traits: {
      defence: 6,
      speed: 12,
      wounds: 32,
      shock: '-',
      soak: 8,
      resolve: '-',
      conviction: '-',
      passiveAwareness: 6,
      resilience: { total: 18, armourRating: 8, armourName: 'Armour of Rage' },
    },
    skills: {
      weaponSkill: 18,
      default: 14,
    },
    size: 'Gargantuan',
    sizeModifier: 3,
    keywords: [
      'Chaos',
      'Daemon',
      'Khorne',
    ],
    attacks: [
      {
        name: 'Hellfire',
        type: 'ranged-weapon',
        range: 16,
        damage: { static: 12, ed: 1 },
        ap: -1,
        salvo: 1,
        traits: ['Assault', 'Blaze', 'Blast (large)'],
      },
      {
        name: 'Great Axe of Khorne (Mighty Strikes)',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 28, ed: 4 },
        ap: -4,
        traits: [],
      },
      {
        name: 'Great Axe of Khorne (Sweeping Blows)',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 14, ed: 1 },
        ap: -2,
        traits: ['Spread'],
      },
    ],
    specialAbilities: [
      {
        name: 'Daemonic',
        effect: 'This threat may attempt to Soak Mortal Wounds. Soaking does not cost any Shock for this threat.',
      },
      {
        name: 'Fear (8)',
        effect: 'This threat causes fear. Enemies are required to pass a Fear test (DN 8) to act normally.',
      },
      {
        name: '(Wrath) Blood for the Blood God',
        effect: 'If a Bloodthirster rolls a 6 on the Wrath dice when attacking with its weapons, any character that loses a wound from the attack also gains the Bleeding condition.',
      },
      {
        name: 'Greater Daemon',
        effect: 'All those with the Khorne keyword within 12 metres of a Bloodthirster (including itself) automatically pass Resolve or Fear tests.',
      },
      {
        name: '(Ruin) Deathbringer',
        effect: 'A Bloodthirster may spend a Ruin to activate this ability until the end of its turn. All exalted icons shifted to damage produce 2 ED each, rather than 1.',
      },
    ],
  },
  /** CORE Orks */
  {
    source: {
      ...source.core,
      page: '432',
    },
    key: 'coreOrkBoys',
    name: 'Ork Boys',
    faction: 'Orks',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 6,
      agility: 3,
      toughness: 6,
      intellect: 2,
      willpower: 3,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 4,
      shock: 4,
      soak: 6,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: { total: 10, armourRating: 2, armourName: 'Orky Armour' },
    },
    skills: {
      weaponSkill: 7,
      ballisticSkill: 4,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Slugga',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Pistol', 'Waaagh!'],
      },
      {
        name: 'Choopa',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 9, ed: 2 },
        ap: 0,
        traits: ['Reliable', 'Waaagh!'],
      },
      {
        name: '2 Stikkbombs',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: -1,
        traits: ['Blast (Medium)'],
      },
    ],
    attackOptions: 'In mobs of up to 30 Boyz, one out of every ten may wield a Big Shoota or a Rokkit Launcha',
    specialAbilities: [
      {
        name: 'Get Stuck',
        effect: 'Gain +2 damage on melee attacks if this troop is engaged in melee at the beginning of his turn.',
      },
      {
        name: '(Complication)(Mob) Animosity',
        effect: 'Orks are prone to attacking one another. When a Complication is rolled in combat, a mob of Ork Boyz infl icts 1d3 Shock to itself.',
      },
      {
        name: '(Mob) Mob Rule',
        effect: 'A Mob of Orks gains one bonus icon to all Resolve tests.',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '434',
    },
    key: 'coreOrkNobz',
    name: 'Ork Nobz',
    faction: 'Orks',
    classification: [
      'Adversary',
      'Elite',
      'Elite',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 7,
      agility: 3,
      toughness: 6,
      intellect: 2,
      willpower: 5,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 9,
      shock: 10,
      soak: 6,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 4,
      resilience: { total: 12, armourRating: 4, armourName: '\'Eavy Armour' },
    },
    skills: {
      weaponSkill: 8,
      ballisticSkill: 5,
      default: 6,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Shoota',
        type: 'ranged-weapon',
        range: 36,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Assault', 'Waaagh!'],
      },
      {
        name: 'Big Choopa',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 12, ed: 2 },
        ap: -1,
        traits: ['Waaagh!'],
      },
      {
        name: '2 Stikkbombs',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: -1,
        traits: ['Blast (Medium)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Get Stuck',
        effect: 'Gain +2 damage on melee attacks if a Nob is engaged in melee at the beginning of his turn.',
      },
      {
        name: '(Ruin) Champion',
        effect: 'This threat may take Ruin Actions.',
      },
      {
        name: '(Ruin) I\' da Boss!',
        effect: 'Boss!: As a free action, spend 1 Ruin to add +2d to all Melee attacks for the Nob and any Ork allies within 10 metres. This bonus lasts until the beginning of this threat’s next turn.',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '435',
    },
    key: 'coreOrkMegaNobz',
    name: 'Mega Nobz',
    faction: 'Orks',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: '7 (11)',
      agility: 3,
      toughness: 6,
      intellect: 2,
      willpower: 5,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: '6 (May not Run or Sprint)',
      wounds: 9,
      shock: 10,
      soak: 6,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 4,
      resilience: { total: 15, armourRating: 7, armourName: 'Mega Armour' },
    },
    skills: {
      weaponSkill: 8,
      ballisticSkill: 5,
      default: 6,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Big Shoota',
        type: 'ranged-weapon',
        range: 72,
        damage: { static: 12, ed: 2 },
        ap: 0,
        salvo: 3,
        traits: ['Assault', 'Waaagh!'],
      },
      {
        name: 'Power Claw',
        type: 'melee-weapon',
        range: 2,
        damage: { static: 17, ed: 3 },
        ap: -3,
        traits: ['Brutal', 'Unwieldy (3)'],
      },
      {
        name: '2 Stikkbombs',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: -1,
        traits: ['Blast (Medium)'],
      },
    ],
    specialAbilities: [
      {
        name: 'Get Stuck',
        effect: 'Gain +2 damage on melee attacks if a Nob is engaged in melee at the beginning of his turn.',
      },
      {
        name: '(Ruin) Champion',
        effect: 'This threat may take Ruin Actions.',
      },
      {
        name: '(Ruin) I\' da Boss!',
        effect: 'Boss!: As a free action, spend 1 Ruin to add +2d to all Melee attacks for the Nob and any Ork allies within 10 metres. This bonus lasts until the beginning of this threat’s next turn.',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '435',
    },
    key: 'coreGretchin',
    name: 'Gretchin',
    faction: 'Orks',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 7,
      agility: 3,
      toughness: 2,
      intellect: 3,
      willpower: 3,
      fellowship: 2,
      initiative: 4,
    },
    traits: {
      defence: 4,
      speed: 5,
      wounds: 1,
      shock: 2,
      soak: 2,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 2,
      resilience: { total: 4 },
    },
    skills: {
      ballisticSkill: 5,
      default: 4,
    },
    size: 'Small',
    sizeModifier: -1,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Grot Blasta',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Pistol', 'Waaagh!'],
      },
      {
        name: 'Knife',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 4, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      {
        name: '(Mob) Dangerous in Large Numbers',
        effect: 'If a mob of Gretchin includes more than 10 members, they can reroll any 1’s (aside from a Complication) on a ranged attack.',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '436',
    },
    key: 'coreOrkKommando',
    name: 'Kommando',
    faction: 'Orks',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 6,
      agility: 3,
      toughness: 6,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 6,
      shock: 7,
      soak: 6,
      resolve: 3,
      conviction: 3,
      passiveAwareness: 5,
      resilience: { total: 10, armourRating: 2, armourName: 'Orky Armour' },
    },
    skills: {
      stealth: 8,
      weaponSkill: 7,
      ballisticSkill: 3,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Slugga',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Pistol', 'Waaagh!'],
      },
      {
        name: 'Choopa',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 9, ed: 2 },
        ap: 0,
        traits: ['Reliable', 'Waaagh!'],
      },
      {
        name: '2 Stikkbombs',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: -1,
        traits: ['Blast (Medium)'],
      },
    ],
    attackOptions: 'In mobs of up to 10 Kommandos, up to two may wield a Big Shoota, Burna or a Rokkit Launcher.',
    specialAbilities: [
      {
        name: 'Sneaky Gits',
        effect: 'Kommandos may use Stealth in place of Weapon Skill (or Stealth -3 in place of Ballistic Skill) on any attacks in the first Round.',
      },
      {
        name: '(Mob) Kunin\' Infiltrators',
        effect: 'Kommandos may make Stealth Tests as a mob rather than as individuals. When they do so, they gain one bonus icon.',
      },
    ],
  },
  {
    source: {
      ...source.core,
      page: '437',
    },
    key: 'coreKaptinKommando',
    name: 'Kaptin Kommando',
    faction: 'Orks',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 6,
      agility: 3,
      toughness: 6,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 10,
      shock: 7,
      soak: 6,
      resolve: 3,
      conviction: 3,
      passiveAwareness: 5,
      resilience: { total: 10, armourRating: 2, armourName: 'Orky Armour' },
    },
    skills: {
      stealth: 8,
      weaponSkill: 7,
      ballisticSkill: 3,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Ork',
    ],
    attacks: [
      {
        name: 'Slugga',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 10, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Pistol', 'Waaagh!'],
      },
      {
        name: 'Big Choopa',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 11, ed: 2 },
        ap: -1,
        traits: ['Waaagh!'],
      },
      {
        name: '2 Stikkbombs',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 7, ed: 1 },
        ap: 0,
        salvo: -1,
        traits: ['Blast (Medium)'],
      },
    ],
    specialAbilities: [
      { name: '(Ruin) Champion', effect: 'This threat may take Ruin Actions.' },
      {
        name: 'Sneaky Gits',
        effect: 'Kommandos may use Stealth in place of Weapon Skill (or Stealth -3 in place of Ballistic Skill) on any attacks in the first Round.',
      },
      {
        name: '(Mob) Kunin\' Infiltrators',
        effect: 'Kommandos may make Stealth Tests as a mob rather than as individuals. When they do so, they gain one bonus icon.',
      },
    ],
  },
  /** An Abundance of Apocrypha - NECRONS */
  {
    source: {
      ...source.aaoa2,
      page: '167',
    },
    key: 'aaoaCanoptekScarabs',
    name: 'Canoptek Scarabs',
    faction: 'Necrons',
    classification: classificationHelper('ttttt'),
    description: 'A Canoptek Scarab is a small, silver, beetle-like Necron construct, about the size of a Space Marine’s armoured fist. These robotic Scarabs are the most numerous and diverse of the Necrons\' Canoptek machine servants. They are designed to break down organic and non-organic matter into raw energy, which can then be woven into fresh construct forms at the direction of the Scarabs’ controller.',
    attributes: {
      strength: 1,
      agility: 4,
      toughness: 3,
      intellect: 1,
      willpower: 6,
      fellowship: 1,
      initiative: 3,
    },
    traits: {
      defence: 4,
      speed: '10 (Flight)',
      wounds: 3,
      shock: '-',
      soak: 3,
      resolve: 2,
      conviction: 3,
      passiveAwareness: 3,
      resilience: {
        total: 5,
        armourRating: 1,
        armourName: 'Armour',
      },
    },
    skills: {
      awareness: 7,
      tech: 7,
      default: 6,
    },
    size: 'Tiny',
    sizeModifier: 0,
    keywords: [
      'Necron',
      'Canoptek',
    ],
    attacks: [
      simpleMelee('Feeder Mandibles', 1, '5+1', 0, 'Arc (2)', 'Warp Weapon'),
    ],
    specialAbilities: [
      aaoa.necrons.ancientMachines,
      simpleAbility('(Ruin) Self-Destruct: A lone scarab (one not in a mob) may spend 1 Ruin when it attempts a melee attack; if the attack is successful, it inflicts 1d3+1 Mortal Wounds and is then destroyed.'),
      simpleAbility('(Mob) Devouring Swarm: While in a mob, scarabs add +2ED to their melee attacks.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '168',
    },
    key: 'aaoaNecronWarriors',
    name: 'Necron Warriors',
    faction: 'Necrons',
    classification: classificationHelper('aeett'),
    description: 'Necron Warriors are the primary infantry troops of the soulless, undying mechanical monstrosities known as the Necrons. They were created from the majority of the ancient humanoid Necrontyr species who agreed to be bound to the will of their Star Gods, the terrible entities known as the C\'tan. The Necrontyr\'s consciousnesses were transferred into robotic bodies made of the living metal called necrodermis. Over a long period of time, the new unliving bodies dulled the Necrontyr\'s minds and their abilities to feel emotion or pleasure. Over many millennia, the ultimate outcome of this process of gradual desensitization was that the Necron Warriors became little more than soulless automatons, the warrior-slaves of the still-sentient Necron royalty and military elite who seek to rebuild their star-spanning empires across the portions of the galaxy now controlled by the "lesser races."',
    attributes: {
      strength: 7,
      agility: 3,
      toughness: 5,
      intellect: 2,
      willpower: 6,
      fellowship: 1,
      initiative: 3,
    },
    traits: {
      defence: 2,
      speed: 5,
      wounds: 5,
      shock: '-',
      soak: 5,
      resolve: 5,
      conviction: 6,
      passiveAwareness: 4,
      resilience: {
        total: 10,
        armourRating: 4,
        armourName: 'Armour',
      },
    },
    skills: {
      ballisticSkill: 8,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
    ],
    attacks: [
      simpleRanged('Gauss Flayer', 48, '10+1', -1, 2, 'Rapid Fire (1)'),
      simpleMelee('Combat Blade', 1, '10+2', 0, 'Rending (1)'),
    ],
    specialAbilities: [
      aaoa.necrons.ancientMachines,
      aaoa.necrons.reanimationProtocols,
      simpleAbility('(Ruin) Disruption Field: Spend 1 Ruin when a Necron Warrior attempts a melee attack, to add +2ED to the attack’s damage.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '170',
    },
    key: 'aaoaFlayedOnes',
    name: 'Flayed Ones',
    faction: 'Necrons',
    classification: classificationHelper('aeett'),
    description: 'Flayed Ones are twisted and ghoulish Necron terrors afflicted by an ancient infection that breeds a hunger for organic flesh in them. Flayed Ones act as specialised close combat troops. They appear from an unknown pocket dimension of their hideous kind to join the Necron armies in battle, though never by invitation from the Necrons themselves.',
    attributes: {
      strength: 7,
      agility: 4,
      toughness: 5,
      intellect: 2,
      willpower: 6,
      fellowship: 1,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 5,
      wounds: 5,
      shock: '-',
      soak: 5,
      resolve: 5,
      conviction: 6,
      passiveAwareness: 4,
      resilience: {
        total: 10,
        armourRating: 4,
        armourName: 'Armour',
      },
    },
    skills: {
      weaponSkill: 8,
      default: 7,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Necron',
      'Flayed One',
    ],
    attacks: [
      simpleMelee('Talons', 1, '12+2', 0, 'Tearing (2)', 'Rending (1)'),
    ],
    specialAbilities: [
      aaoa.necrons.ancientMachines,
      aaoa.necrons.reanimationProtocols,
      simpleAbility('Fear (3): This threat causes fear. Enemies are required to make a fear test (DN 3) to act normally.'),
      simpleAbility('(Ruin) Haunting Horror: Spend 1 Ruin to have a Flayed One emerge from their charnel dimension, drawn by slaughter and bloodshed. Regain 1 Ruin to have a Flayed One vanish back into that dimension.'),
      simpleAbility('(Ruin) Disruption Field: Spend 1 Ruin when a Flayed One attempts a melee attack, to add +2ED to the attack’s damage.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '169',
    },
    key: 'aaoaNecronImmortals',
    name: 'Necron Immortals',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '171',
    },
    key: 'aaoaDestroyers',
    name: 'Destroyers',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '172',
    },
    key: 'aaoaDeathmarks',
    name: 'Deathmarks',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '173',
    },
    key: 'aaoaLychguard',
    name: 'Lychguard',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '174',
    },
    key: 'aaoaNecronLord',
    name: 'Necron Lord',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '175',
    },
    key: 'aaoaNecronOverlord',
    name: 'Necron Overlord',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '176',
    },
    key: 'aaoaNecronDestroyerLord',
    name: 'Necron Destroyer Lord',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '179',
    },
    key: 'aaoaNecronCryptek',
    name: 'Necron Cryptek',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '183',
    },
    key: 'aaoaTriarchPraetorians',
    name: 'Triarch Praetorians',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '184',
    },
    key: 'aaoaTriarchStalker',
    name: 'Triarch Stalker',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '185',
    },
    key: 'aaoaCanoptekWraith',
    name: 'Canoptek Wraith',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '186',
    },
    key: 'aaoaCanoptekSpyder',
    name: 'Canoptek Spyder',
    faction: 'Necrons',
  },
  {
    source: {
      ...source.aaoa2,
      page: '187',
    },
    key: 'aaoaCtanShardOfTheDeceiver',
    name: 'C’Tan Shard of the Deceiver',
    faction: 'Necrons',
    classification: classificationHelper('ccccc'),
    keywords: ['C´Tan Shard'],
  },
  {
    source: {
      ...source.aaoa2,
      page: '188',
    },
    key: 'aaoaCtanShardOfTheNightbringer',
    name: 'C’Tan Shard of the Nightbringer',
    faction: 'Necrons',
    classification: classificationHelper('ccccc'),
    keywords: ['C´Tan Shard'],
  },
  {
    source: {
      ...source.aaoa2,
      page: '190',
    },
    key: 'aaoaGhostArk',
    name: 'Ghost Ark',
    faction: 'Necrons',
    classification: classificationHelper('vvvvv'),
  },
  {
    source: {
      ...source.aaoa2,
      page: '190',
    },
    key: 'aaoaDoomsdayArk',
    name: 'Doomsday Ark',
    faction: 'Necrons',
    classification: classificationHelper('vvvvv'),
  },
  {
    source: {
      ...source.aaoa2,
      page: '191',
    },
    key: 'aaoaAnnihilationBarge',
    name: 'Annihilation Barge',
    faction: 'Necrons',
    classification: classificationHelper('vvvvv'),
  },
  {
    source: {
      ...source.aaoa2,
      page: '191',
    },
    key: 'aaoaCatacombCommandBarge',
    name: 'Catacomb Command Barge',
    faction: 'Necrons',
    classification: classificationHelper('vvvvv'),
  },
  {
    source: {
      ...source.aaoa2,
      page: '192',
    },
    key: 'aaoaMonolith',
    name: 'Monolith',
    faction: 'Necrons',
    classification: classificationHelper('vvvvv'),
  },
  /** An Abundance of Apocrypha - TYRANIDS */
  {
    source: {
      ...source.aaoa2,
      page: '',
    },
    key: 'aaoaHormagant',
    name: 'Hormagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 4,
      agility: 5,
      toughness: 3,
      intellect: 1,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 8,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 3,
      resilience: {
        total: 5,
        armourRating: 1,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      athletics: 6,
      weaponSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
      'Gaunt',
    ],
    variants: {
      name: 'Biomorphs',
      options: [
        aaoa.adrenalGlands,
        aaoa.toxinSacs,
      ],
    },
    attacks: [
      {
        name: 'Scything Talons',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 7, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      aaoa.lurk,
      {
        name: 'Bounding Leap',
        effect: 'Whenever a Hormagaunt runs, sprints, or charges, it adds +2 to its Speed, and may leap over gaps and obstacles up to 2m high and up to 4m wide.',
      },
      {
        name: '(Mob) Hungering Swarm',
        effect: 'Whilst in a mob, Hormagaunts gain a +2d bonus to melee attack rolls.',
      },
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '',
    },
    key: 'aaoaTermagant',
    name: 'Termagant',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 5,
      toughness: 3,
      intellect: 2,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 3,
      resilience: {
        total: 5,
        armourRating: 1,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      stealth: 6,
      ballisticSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
      'Gaunt',
    ],
    variants: {
      name: 'Biomorphs',
      options: [
        aaoa.adrenalGlands,
        aaoa.toxinSacs,
      ],
    },
    attackOptions: 'Termagants are normally armed with Fleshborers, but some carry Devourers or Spinefists instead. In a mob, one Termagant in every 10 may carry a Spike Rifle or Strangleweb instead.',
    attacks: [
      aaoa.devourer,
      aaoa.fleshborer,
      {
        name: 'Spinefist',
        type: 'ranged-weapon',
        range: 24,
        damage: { static: 8, ed: 1 },
        ap: 0,
        salvo: 2,
        traits: ['Paired', 'Pistol'],
      },
      {
        name: 'Spike Rifle',
        type: 'ranged-weapon',
        range: 36,
        damage: { static: 8, ed: 1 },
        ap: 0,
        salvo: 1,
        traits: ['Assault', 'Sniper (1)'],
      },
      {
        name: 'Strangleweb',
        type: 'ranged-weapon',
        range: 16,
        damage: { static: 5, ed: 1 },
        ap: 0,
        salvo: 0,
        traits: ['Assault', 'Blast (Small)', 'Tangle (3)'],
      },
      {
        name: 'Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      aaoa.lurk,
      {
        name: '(Mob) Hail of Living Ammunition',
        effect: 'Whilst in a mob, Termagants gain a +1d bonus to ranged attack rolls.',
      },
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '',
    },
    key: 'aaoaGargolye',
    name: 'Gargolye',
    thumbnail: '/img/bestiary/threats/tyranid_gargolye_artwork.jpg',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 5,
      toughness: 3,
      intellect: 2,
      willpower: 5,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: '12 (Flight)',
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 5,
      passiveAwareness: 3,
      resilience: {
        total: 5,
        armourRating: 1,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      stealth: 6,
      ballisticSkill: 6,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
      'Gaunt',
    ],
    variants: {
      name: 'Biomorphs',
      options: [
        aaoa.adrenalGlands,
        aaoa.toxinSacs,
      ],
    },
    attacks: [
      aaoa.fleshborer,
      {
        name: 'Blinding Venom',
        type: 'melee-weapon',
        range: 2,
        damage: { static: 7, ed: 1 },
        ap: 0,
        traits: ['Agonising', 'Toxic (3)'],
      },
      {
        name: 'Claws',
        type: 'melee-weapon',
        range: 1,
        damage: { static: 5, ed: 1 },
        ap: 0,
        traits: [],
      },
    ],
    specialAbilities: [
      aaoa.lurk,
      {
        name: 'Blinding Venom',
        effect: 'A creature which becomes Poisoned from a Gargoyle’s Blinding Venom is also blinded.',
      },
      {
        name: '(Mob) Hail of Living Ammunition',
        effect: 'Add +1d to ranged attacks.',
      },
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '',
    },
    key: 'aaoaRipper',
    name: 'Ripper',
    faction: 'Tyranids',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 2,
      agility: 4,
      toughness: 2,
      intellect: 1,
      willpower: 4,
      fellowship: 1,
      initiative: 5,
    },
    traits: {
      defence: 6,
      speed: '12 (Flight)',
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 3,
      conviction: 4,
      passiveAwareness: 3,
      resilience: {
        total: 4,
        armourRating: 1,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      stealth: 5,
      weaponSkill: 5,
      default: 4,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      simpleMelee('Claws and Teeth', 1, '5+1', 0),
      simpleRanged('Spine-Maw', 12, '7+1', 0, 1, 'Pistol'),
    ],
    attackOptions: 'Rippers attack using their claws and teeth, but some swarms are adapted with spine-maws as well.',
    specialAbilities: [
      aaoa.feed,
      {
        name: '(Mob) Swarm and Consume',
        effect: 'Whilst in a mob, Rippers add +2ED and the Brutal trait to their melee attacks. In addition, any enemy attacked by a Ripper mob must pass an Athletics test (DN 3) or be knocked prone.',
      },
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '204',
    },
    key: 'aaoaLictor',
    name: 'Lictor',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 12,
      agility: 6,
      toughness: 6,
      intellect: 4,
      willpower: 9,
      fellowship: 1,
      initiative: 6,
    },
    traits: {
      defence: 5,
      speed: 9,
      wounds: 12,
      shock: 9,
      soak: 6,
      resolve: 8,
      conviction: 9,
      passiveAwareness: 6,
      resilience: {
        total: 9,
        armourRating: 2,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      athletics: 12,
      awareness: 11,
      stealth: 12,
      weaponSkill: 11,
      default: 9,
    },
    size: 'Large',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      simpleMelee('Rending Claws', 1, '16+1', -1, 'Rending (4)'),
      simpleMelee('Grasping Talons', 2, '15+1', -1),
      aaoa.fleshHooks,
    ],
    specialAbilities: [
      simpleAbility('Chameleonic Skin: The Lictor’s skin grants it a +2d bonus to Stealth tests, and a +2 bonus to Defence when in shadow or cover.'),
      simpleAbility('Terror (3): This threat causes terror. Enemies are required to pass a Terror test (DN 3) to act normally.'),
      simpleAbility('Flesh Hooks: A Tyranid with Flesh Hooks adds +2d to any Athletics test to climb.'),
      simpleAbility('Feeder Tendrils: As an action, a Lictor may drain knowledge and memory from the brain of a creature it has killed. This adds 1 to Ruin.'),
      simpleAbility('(Ruin) Champion: This threat may take Ruin Actions.'),
      simpleAbility('(Ruin) Invisible Predator: As a Ruin Action when not engaged in melee, the Lictor may move up to its Speed and make a Stealth test to hide (DN is nearest foe’s Passive Awareness).'),
      simpleAbility('Pheromone Trail: When a Lictor is slain, the Game Master gains 2 Ruin, as there are sure to be more Tyranids arriving soon.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '205',
    },
    key: 'aaoaTyranidWarrior',
    name: 'Tyranid Warrior',
    faction: 'Tyranids',
    classification: [
      'Adversary',
      'Adversary',
      'Elite',
      'Elite',
      'Elite',
    ],
    description: '',
    attributes: {
      strength: 8,
      agility: 4,
      toughness: 6,
      intellect: 3,
      willpower: 9,
      fellowship: 1,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 6,
      wounds: 9,
      shock: '-',
      soak: 6,
      resolve: 8,
      conviction: 9,
      passiveAwareness: 5,
      resilience: {
        total: 9,
        armourRating: 2,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      awareness: 9,
      weaponSkill: 10,
      default: 8,
    },
    size: 'Large',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      aaoa.devourer,
      simpleMelee('Scyching Talons', 1, '11+1', 0, '+1 to attacks'),
      aaoa.fleshHooks,
    ],
    attackOptions: 'Tyranid Warriors have been encountered armed with a wide range of weapons. Commonly, they carry a Devourer and a pair of Scything Talons. The Devourer may be exchanged for a Basic Bio-Weapon or Melee Bio-Weapon. The Scything Talons may be exchanged for a Melee Bio-Weapon. One in three replace their Devourer with Bio-Cannon instead. Some Tyranid Warriors have Flesh Hooks. See Bio-Weapons, later, for details on other Tyranid weapon options.',
    variants: {
      name: 'Biomorphs',
      options: [
        aaoa.adrenalGlands,
        aaoa.toxinSacs,
      ],
    },
    specialAbilities: [
      simpleAbility('Terror (3): This threat causes terror. Enemies are required to pass a Terror test (DN 3) to act normally.'),
      simpleAbility('Flesh Hooks: A Tyranid with Flesh Hooks adds +2d to any Athletics test to climb.'),
      aaoa.synapseCreature,
      aaoa.shadowOfTheWarp,
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '209',
    },
    key: 'aaoaCarnifex',
    name: 'Carnifex',
    faction: 'Tyranids',
    classification: [
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
      'Monstrous Creature',
    ],
    description: '',
    attributes: {
      strength: 12,
      agility: 3,
      toughness: 12,
      intellect: 2,
      willpower: 6,
      fellowship: 1,
      initiative: 3,
    },
    traits: {
      defence: 2,
      speed: 7,
      wounds: 16,
      shock: 12,
      soak: 12,
      resolve: 5,
      conviction: 6,
      passiveAwareness: 3,
      resilience: {
        total: 18,
        armourRating: 5,
        armourName: 'Tyranid Carapace',
      },
    },
    skills: {
      weaponSkill: 8,
      intimidation: 8,
      default: 6,
    },
    size: 'Huge',
    sizeModifier: 0,
    keywords: [
      'Tyranid',
    ],
    attacks: [
      simpleMelee('Monstrous Scything Talons', 3, '16+1', -3, 'Spread'),
      simpleMelee('Crushing Claws', 2, '20+3', -3, 'Brutal', 'Unwieldy (2)'),
      simpleRanged('Bio-Plasma', 25, '14+1', -3, 0, 'Assault', 'Blast (Small)'),
      simpleMelee('Monstrous Acid Maw', 1, '15+2', -5, 'Brutal'),
      simpleMelee('Thresher Scythe (Tail)', 2, '12+1', -1, 'Spread'),
      simpleMelee('Bone Mace (Tail)', 2, '16+2', -1),
      simpleRanged('Twin Deathspitters with Slimer Maggots (Bio-Cannon)', 48, '15+1', -1, 6, 'Assault'),
      simpleRanged('Twin Devourers with Brainleech Worms (Bio-Cannon)', 36, '14+1', 0, 12, 'Agonising', 'Assault', 'Spread'),
      simpleRanged('Stranglethorn Cannon (Bio-Cannon)', 72, '16+2', -1, 1, 'Assault', 'Blast (Large)', 'Tangle (5)', 'Strangle', 'Unique'),
      simpleRanged('Heavy Venom Cannon (Bio-Cannon)', 72, '18+3', -2, 2, 'Arc (2)', 'Assault', 'Blast (Small)', 'Toxic (5)', 'Unique'),
    ],
    attackTraits: [
      { name: 'Strangle', crunch: 'Enemies hit by a Stranglethorn Cannon must take a Resolve test or become pinned.' },
      { name: 'Unique', crunch: 'A Tyranid may only have a single Stranglethorn cannon or Heavy Venom Cannon.' },
    ],
    attackOptions:
    'A Carnifex is armed with two pairs of Monstrous Scything Talons. '
    + 'It may replace one or both of those with a weapon from the Monstrous Bio-Cannons list (pg. 208). '
    + 'It may replace one pair of Monstrous Scything Talons with a pair of Crushing Claws. '
    + 'It may also take one of the following: Bio-plasma, enhanced senses, or monstrous acid maw. '
    + 'It may also have a thresher scythe or a bone mace on its tail.',
    variants: {
      name: 'Biomorphs',
      options: [
        aaoa.adrenalGlands,
        aaoa.toxinSacs,
        simpleAbility('Chitin Thorns: Enemies who attack the Tyranid in melee and suffer a complication suffer a Mortal Wound.'),
        simpleAbility('Spine Bank: (Damage 12+1ED; AP 0; Range 12m; Salvo 4; Assault, Pistol, Spread)'),
        simpleAbility('Spore Cysts: The Tyranid receives +2 Defence against shooting attacks, as if it were in cover.'),
        simpleAbility('Enhanced Senses: The Tyranid adds a bonus of +2d to all ranged attacks.'),
      ],
    },
    specialAbilities: [
      aaoa.feed,
      simpleAbility('Terror (3): This threat causes terror. Enemies are required to pass a Terror test (DN 3) to act normally.'),
      simpleAbility('Living Battering Ram: When a Carnifex charges, roll a d6 for each enemy within 2m of it along the path of its charge; each enemy that rolls a 4+ suffers 1 Mortal Wound and is knocked prone. The Carnifex adds +2d to melee attacks when it charges.'),
      simpleAbility('(Ruin) Sweeping Tail: When an enemy moves or attacks while within 2m of the Carnifex, it may make an attack with a Thresher Scythe or Bone Mace as a Ruin action.'),
    ],
  },
  // simpleStub('aaoa2', 240, 'Tau', 'Drones', 'ttttt'),
  /** An Abundance of Apocrypha - TAU */
  {
    source: {
      ...source.aaoa2,
      page: '235',
    },
    key: 'aaoaFireCasteStrikeShasLa',
    name: 'Fire Caste Strike Shas\'La',
    thumbnail: '/img/bestiary/threats/tau_striker.png',
    faction: 'Tau',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 2,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 3,
    },
    traits: {
      defence: 2,
      speed: 6,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 4,
      passiveAwareness: 3,
      resilience: {
        total: 8,
        armourRating: 4,
        armourName: 'Armour',
      },
    },
    skills: {
      ballisticSkill: 6,
      weaponSkill: 4,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tau',
      'Fire Caste',
      '<Sept>',
    ],
    attacks: [
      aaoa.tau.pulseRifle,
      aaoa.tau.pulseCarbine,
      aaoa.tau.buildInPhotonGrenadeLauncher,
      aaoa.tau.pulsePistol,
      aaoa.tau.photonGrenade,
      aaoa.tau.haywireGrenade,
    ],
    attackTraits: [
      { name: 'Suppression', crunch: 'enemies hit are blinded until the end of their next turn, and must test to avoid being pinned)' },
    ],
    attackOptions:
    'Fire caste Strike teams are armed with Pulse Rifles and Photon Grenades. '
    + 'They sometimes exchange their Pulse Rifles for Pulse Carbines '
    + 'and may carry additional armament like Pulse Pistols and/or EMP Grenades.',
    specialAbilities: [
      aaoa.tau.fire,
      aaoa.tau.bonding,
      simpleAbility('(Ruin) (Mob) Turret Support: A mob of Fire Warriors which did not move may spend 1 Ruin to have a DS8 Tactical Support Turret air-dropped on their position. The turret lands at the end of their turn but may not act until the mob’s next turn.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '236',
    },
    key: 'aaoaFireCasteBreacherShasLa',
    name: 'Fire Caste Breacher Shas\'La',
    thumbnail: '/img/bestiary/threats/tau_breacher.png',
    faction: 'Tau',
    classification: [
      'Troops',
      'Troops',
      'Troops',
      'Troops',
      'Troops',
    ],
    description: '',
    attributes: {
      strength: 3,
      agility: 2,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 3,
    },
    traits: {
      defence: 2,
      speed: 6,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 4,
      passiveAwareness: 3,
      resilience: {
        total: 8,
        armourRating: 4,
        armourName: 'Armour',
      },
    },
    skills: {
      ballisticSkill: 6,
      weaponSkill: 4,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tau',
      'Fire Caste',
      '<Sept>',
    ],
    attacks: [
      simpleRanged('Pulse Blaster (Close Range)', 20, '14+1', -2, 2, 'Assault', 'Reliable'),
      simpleRanged('Pulse Blaster', 20, '12+1', -1, 2, 'Assault', 'Reliable'),
      simpleRanged('Pulse Blaster (Long Range)', 20, '10+1', 0, 2, 'Assault', 'Reliable'),
      aaoa.tau.pulsePistol,
      aaoa.tau.photonGrenade,
      aaoa.tau.haywireGrenade,
    ],
    attackTraits: [
      { name: 'Suppression', crunch: 'enemies hit are blinded until the end of their next turn, and must test to avoid being pinned)' },
    ],
    attackOptions:
      'Fire caste Breacher teams are armed with Pulse Blasters and Photon Grenades. They sometimes carry additional armament like Pulse Pistols and/or EMP Grenades.',
    specialAbilities: [
      aaoa.tau.fire,
      aaoa.tau.bonding,
      simpleAbility('(Ruin) (Mob) Turret Support: A mob of Fire Warriors which did not move may spend 1 Ruin to have a DS8 Tactical Support Turret air-dropped on their position. The turret lands at the end of their turn but may not act until the mob’s next turn.'),
      simpleAbility('(Mob) Breach and Clear! When any member of a Breacher team attacks enemies who are in cover and under the effects of a Photon grenade, they may add a +2d bonus to their shooting attacks, and +2ED to the damage of those attacks.'),
    ],
  },
  {
    source: {
      ...source.aaoa2,
      page: '237',
    },
    key: 'aaoaFireCastePathfinderShasLa',
    name: 'Fire Caste Pathfinder Shas\'La',
    thumbnail: '/img/bestiary/threats/tau_pathfinder.png',
    faction: 'Tau',
    classification: classificationHelper('etttt'),
    description: '',
    attributes: {
      strength: 3,
      agility: 3,
      toughness: 3,
      intellect: 3,
      willpower: 3,
      fellowship: 3,
      initiative: 4,
    },
    traits: {
      defence: 3,
      speed: 7,
      wounds: 3,
      shock: 3,
      soak: 3,
      resolve: 4,
      conviction: 4,
      passiveAwareness: 3,
      resilience: {
        total: 7,
        armourRating: 3,
        armourName: 'Armour',
      },
    },
    skills: {
      ballisticSkill: 6,
      awareness: 6,
      stealth: 6,
      weaponSkill: 4,
      default: 5,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'Tau',
      'Fire Caste',
      '<Sept>',
    ],
    attacks: [
      aaoa.tau.pulseCarbine,
      aaoa.tau.buildInPhotonGrenadeLauncher, // Suppression
      aaoa.tau.markerlights,
      aaoa.tau.photonGrenade, // Suppression
      simpleRanged('Ion Rifle', 60, '15+1', 0, 1, 'Rapid Fire (1)', 'Supercharge', 'Ion Charge'),
      simpleRanged('Rail Rifle', 60, '14+2', -4, 1, 'Mortal (1)', 'Rapid Fire (1)', 'Sniper (1)'),
    ],
    attackTraits: [
      { name: 'Suppression', crunch: 'Enemies hit are blinded until the end of their next turn, and must test to avoid being pinned)' },
      { name: 'Ion Charge', crunch: 'Using the weapon on Supercharge adds the Blast [Medium] and Heavy [5] traits)' },
    ],
    attackOptions:
      'Pathfinders are armed with Pulse Carbines, Markerlights, and Photon Grenades. Some exchange their Pulse Carbine and Markerlight for an Ion Rifle or Rail Rifle.',
    specialAbilities: [
      aaoa.tau.fire,
      aaoa.tau.bonding,
      simpleAbility('Vanguard: A Pathfinder increases their Speed by +2 when they Run or Sprint. They do not reduce their Defence when they Sprint.'),
    ],
    variants: aaoa.tau.septs.fire,
  },
  {
    source: {
      ...source.aaoa2,
      page: '239',
    },
    key: 'aaoaFireCasteCadreFirebladeShasEl',
    name: 'Fire Caste Cadre Fireblade Shas’el',
    faction: 'Tau',
    classification: classificationHelper('aaaaa'),
    description: '',
    attributes: {
      strength: 4,
      agility: 4,
      toughness: 4,
      intellect: 5,
      willpower: 6,
      fellowship: 5,
      initiative: 5,
    },
    traits: {
      defence: 4,
      speed: 6,
      wounds: 7,
      shock: 9,
      soak: 4,
      resolve: 7,
      conviction: 7,
      passiveAwareness: 4,
      resilience: {
        total: 9,
        armourRating: 4,
        armourName: 'Armour',
      },
    },
    skills: {
      ballisticSkill: 9,
      leadership: 9,
      weaponSkill: 7,
      default: 8,
    },
    size: 'Average',
    sizeModifier: 0,
    keywords: [
      'T´au',
      'Fire Caste',
      '<Sept>',
    ],
    attacks: [
      aaoa.tau.pulseRifle,
      aaoa.tau.markerlights,
      aaoa.tau.photonGrenade, // Suppression
    ],
    attackTraits: [
      { name: 'Suppression', crunch: 'Enemies hit are blinded until the end of their next turn, and must test to avoid being pinned)' },
    ],
    attackOptions:
      'A Cadre Fireblade may also take one item from the Support Systems section.',
    specialAbilities: [
      aaoa.tau.fire,
      aaoa.tau.bonding,
      simpleAbility('(Ruin) Champion: This threat may take Ruin actions.'),
      simpleAbility('(Ruin) Directed Fire: As a free action, spend 1 Ruin to add +2ED to the shooting attacks of all Fire Warriors within 15 metres. This bonus lasts until the beginning of the Cadre Fireblade’s next turn.'),
      simpleAbility('Volley Fire: Allied Fire Warriors within 15 metres may add +2 to the Salvo of their Pulse Rifles, Pulse Carbines, and Pulse Rifles when firing at a target within close range.'),
    ],
    variants: aaoa.tau.septs.fire,
  },
  simpleStub('aaoa2', 240, 'Tau', 'Drones', 'ttttt'),
  simpleStub('aaoa2', 244, 'Tau', 'Firesight Marksman Shas\'la', 'aeeee'),
  simpleStub('aaoa2', 245, 'Tau', 'Shas\'ui in XV-15 Stealthsuit', 'aaeee'),
  simpleStub('aaoa2', 246, 'Tau', 'Shas\'ui in XV-25 Stealthsuit', 'aaeee'),
  simpleStub('aaoa2', 247, 'Tau', 'Shas\'ui in XV-8 Crisis Suit', 'aaeee'),
  simpleStub('aaoa2', 248, 'Tau', 'Shas\'ui in XV-88 Broadside Suit', 'aaaae'),
  simpleStub('aaoa2', 249, 'Tau', 'Shas\'vre in XV-15 XV-25 Stealthsuit', 'aaaee'),
  simpleStub('aaoa2', 249, 'Tau', 'Shas\'vre in XV-8 Crisis Suit', 'aaaee'),
  simpleStub('aaoa2', 249, 'Tau', 'Shas\'vre in XV-88 Broadside Suit', 'aaaae'),
  simpleStub('aaoa2', 250, 'Tau', 'Fire Caste Commander in XV-85 Enforcer Suit', 'aaaaa'),
  simpleStub('aaoa2', 251, 'Tau', 'Ethereal Caste Advisor', 'aaaaa'),
  simpleStub('aaoa2', 252, 'Tau', 'Earth Caste Worker Fio\'la', 'ttttt'),
  simpleStub('aaoa2', 253, 'Tau', 'Air Caste Pilot Kor\'la', 'eeeee'),
  simpleStub('aaoa2', 254, 'Tau', 'Water Caste Envoy Por\'ui', 'eeeee'),
  simpleStub('aaoa2', 255, 'Tau', 'Kroot Carnivore', 'ttttt'),
  simpleStub('aaoa2', 256, 'Tau', 'Kroot Shaper', 'aaaaa'),
  simpleStub('aaoa2', 257, 'Tau', 'Kroothound', 'ttttt'),
  simpleStub('aaoa2', 258, 'Tau', 'Krootox', 'eeett'),
  simpleStub('aaoa2', 259, 'Tau', 'Vespid Stingwing', 'eettt'),
  simpleStub('aaoa2', 260, 'Tau', 'Shas\'vre in XV-95 Ghostkeel Battlesuit', 'aaaae'),
  simpleStub('aaoa2', 261, 'Tau', 'Shas\'vre in XV-104 Riptide Battlesui', 'aaaaa'),
  simpleStub('aaoa2', 262, 'Tau', 'TY-7 Devilfish', 'v'),
  simpleStub('aaoa2', 262, 'Tau', 'TX-4 Piranha', 'v'),
  simpleStub('aaoa2', 263, 'Tau', 'TX-7 Hammerhead Gunship', 'v'),
  simpleStub('aaoa2', 263, 'Tau', 'TX-78 Skyray Gunship', 'v'),
  simpleStub('thaot', 27, 'Adeptus Mechanicus', 'Monotask Servitor', 'ttttt'),
  simpleStub('thaot', 27, 'Adeptus Mechanicus', 'Kataphron Battle Servitor', 'aaeee'),
  simpleStub('thaot', 28, 'Adeptus Mechanicus', 'Skitarii Vanguard', 'etttt'),
  simpleStub('thaot', 29, 'Adeptus Mechanicus', 'Skitarii Ranger', 'etttt'),
  simpleStub('thaot', 30, 'Adeptus Mechanicus', 'Sicaran Ruststalker', 'aaeet'),
  simpleStub('thaot', 31, 'Adeptus Mechanicus', 'Sicaran Infiltrator', 'aaeet'),
  simpleStub('thaot', 31, 'Adeptus Mechanicus', 'Tech-Priest Engineseer', 'aeett'),
  simpleStub('thaot', 32, 'Adeptus Mechanicus', 'Cybernetica Datasmith', 'aaaee'),
  simpleStub('thaot', 33, 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 'etttt'),
  simpleStub('thaot', 33, 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 'etttt'),
  simpleStub('thaot', 34, 'Adeptus Mechanicus', 'Tech-Priest Dominus', 'aaaae'),
  simpleStub('sotah', 17, 'Deathwatch', 'Deathwatch Marine', 'aaaee'),
  simpleStub('pax', 17, 'Deathwatch', 'Deathwatch Marine', 'aaaee'),
];


module.exports = threatRepository;
