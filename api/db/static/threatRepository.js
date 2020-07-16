// TODO
// ArdentPurple's Tyranid Bestiary

const source = {
  core: { book: 'Core Rules (v1.5)', key: 'core', version: 'v1.5' },
  aaoa: { book: 'An Abundance of Apocrypha (v3.1)', supplements: 'core', key: 'aaoa', version: 'v3.1', path: '/vault/an-abundance-of-apocrypha' },
  lotn: {
    book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr',
  },
  thaot: {
    book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology',
  },
  ltgb: {
    book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn',
  },
  aptb: {
    book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary',
  },
  jtb: {
    book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary',
  },
  aotgt: {
    book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne',
  },
  tea: {
    book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels',
  },
  heva: {
    book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault',
  },
  goen: {
    book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines',
  },
  tog: {
    book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory',
  },
  pax: {
    book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis',
  },
  sotah: {
    book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde',
  },
};

const simpleMelee = function (name, range, damage, ap, ...traits) {
  const splitDamage = damage.split('+').map((i) => i.trim());
  const ed = splitDamage[1];
  return {
    name,
    type: 'melee-weapon',
    range,
    damage: { static: splitDamage[0], ed },
    ap,
    traits,
  };
};
const simpleRanged = function (name, range, damage, ap, salvo, ...traits) {
  const splitDamage = damage.split('+').map((i) => i.trim());
  const ed = splitDamage[1];
  return {
    name,
    type: 'ranged-weapon',
    range,
    damage: { static: splitDamage[0], ed },
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
const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

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

const threatz = function (sourceKey, sourcePage, threatGroup, name, level) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${source[sourceKey].key} ${name}`)}`,
    name,
    threatGroup: threatGroup,
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
    },
    size: splits[7],
  }
};

// 'Lasgun,
// 7 +1 ED / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'
// 7 +1 ED / AP -2 / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'
const attackz = function(name, string) {

  const sections = string.split('\/').map((i) => i.trim());

  // 7 +1 ED
  const damage = sections.find((item) => item.endsWith("ED")).split(' ED')[0].trim();

  // Range 12 – 24 – 36
  // Range 12
  // Range 1
  const rangeString = sections.find((item) => item.startsWith("Range")).split('Range ')[1];
  // 12 – 24 – 36
  // 12
  // 1
  const ranges = rangeString.split('-').map((i) => i.trim());
  const range = ranges.length === 1 ? parseInt(ranges[0]) : parseInt(ranges[1]);

  const apString = sections.find((item) => item.startsWith("AP"));
  const ap = apString ? parseInt(apString.split(' ')[1]) : 0;

  const salvoString = sections.find((item) => item.startsWith("Salvo"));
  const salvo = salvoString ? salvoString.split(' ')[1] : null;

  const traits = [];

  if (range <= 5 && salvo === null) {
    return simpleMelee(name, range, damage, ap, traits);
  }

  return simpleRanged(name, range, damage, ap, salvo, traits);
};

const abilityz = function(type, name, snippet) {
  return { type, name, snippet };
};

const determinationz = function(determination, name = null, snippet = null) {
  const myName = name ? name : '';
  const mySnippet = snippet ? snippet : `Spend 1 Ruin to roll ${determination}d6.`;
  return abilityz('Determination', myName, mySnippet);
};

const mobAbilityz = function(string) {
  const sections = string.split(':').map((i) => i.trim());
  const type = 'Mob Ability';
  const name = sections[0];
  const snippet = sections[1];
  return abilityz(type, name, snippet);
};

const mobOptionz = function(min, string) {
  const sections = string.split(':').map((i) => i.trim());
  const type = 'Mob Obtions';
  const name = sections[0];
  const snippet = sections[1];
  return { min: parseInt(min), ...abilityz(type, name, snippet) };
};

const complicationz = function(string) {
  const sections = string.split(':').map((i) => i.trim());
  const type = 'Complication';
  const name = sections[0];
  const snippet = sections[1];
  return abilityz(type, name, snippet);
};

const keywordz = function(string) {
  const keywords = string.split(',').map((i) => i.trim());
  return { keywords };
};

const skillz = function(defaultSkill, string) {
  const skills = string.split(',').map((i) => i.trim());
  return { skills: [ `Default ${defaultSkill}`, ...skills ] };
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

const core = [
  {
    name: 'Imperial Citizen',
    ...threatz('core', 327, 'Imperial', 'Imperial Citizen', 'tttt'),
    ...keywordz('Imperium,Human'),
    ...attributz('2 2 3 2 3 1 2'),
    ...traitz('1 3 2 2 2 1 6 Avg', 2),
    ...skillz(4, 'Awareness 3 (Passive 2)'),
    actions: [
      attackz('Unarmed', '2 +1 ED / Range 1'),
      complicationz('Cheap Augmetic: Whenever this Threat rolls a Complication, one of their augmetics malfunctions. They are Hindered and unable to use the body part effectively until it is repaired by a DN 3 Tech (Int) Test.'),
    ],
  },
  {
    name: 'Astra Militarum Trooper',
    ...threatz('core', 328, 'Imperial', 'Astra Militarum Trooper', 'tttt'),
    ...keywordz('Imperium,Human'),
    ...attributz('2 2 3 2 3 1 2'),
    ...traitz('1 3 2 2 3 3 6 Avg', 3),
    ...skillz(4, 'Awareness 5 (Passive 3), Ballistic Skill 5'),
    actions: [
      attackz('Lasgun', '7 +1 ED / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'),
      attackz('Frag Grenade (1 Ammo)', '10 +4 ED / Range 12 / Salvo - / Blast (Medium)'),
      attackz('Knife or Bayonet', '5 +2 ED / Range 1'),
    ],
    mobOptions: [
      mobOptionz(10, 'Ten-Strong Squad: In a Mob of ten or more Astra Militarum Troopers, one Trooper can exchange their Lasgun for any of the following weapons (details on core, pg. 328).'),
      mobOptionz(20, 'Twenty-Strong Squad: In a Mob of twenty or more Astra Militarum Troopers, two Troopers can operate a heavy weapon carriage with one of the weapons below. The heavy weapon carriage negates the Heavy Trait.'),
    ],
    mobAbilities: [
      mobAbilityz('Human Waves: Whenever this Mob fails a Resolve Test or is destroyed the GM gains 1 Ruin.'),
      mobAbilityz('Bring It Down! This Mob gains +2 ED when all individuals attack the same target.'),
    ],
  },
  {
    name: 'Astra Militarum Veteran Troopers & Sergeants',
    ...threatz('core', 329, 'Imperial', 'Astra Militarum Veteran Troopers & Sergeants', 'aatt'),
    ...keywordz('Imperium,Human'),
    ...attributz('2 2 3 2 3 1 2'),
    ...traitz('3 8 5 5 5 5 6 Avg', 3),
    ...skillz(6, 'Awareness 8 (Passive 4), Ballistic Skill 7, Leadership 7'),
    actions: [
      attackz('Lasgun', '7 +1 ED / Range 12 – 24 – 36 / Salvo 2 / Rapid Fire (1), Reliable'),
      attackz('Frag Grenade (1 Ammo)', '10 +4 ED / Range 12 / Salvo - / Blast (Medium)'),
      attackz('Knife or Bayonet', '5 +2 ED / Range 1'),
      abilityz('Ruin', 'Stand Fast!', 'The Veteran Trooper may make a Leadership-based Action or Test.'),
      abilityz('Reaction', 'First Rank, Fire! Second Rank, Fire!', 'Pick an allied Mob within 6m — that Mob may add a Salvo Option to its next ranged attack in addition to any other attack option.'),
    ],
    note: 'May carry other equipment like Laspistol and Chainsword. Veterans work well as Adversaries for Tier 1 and 2.'
  },
  {
    name: 'Tactical Space Marine',
    ...threatz('core', 330, 'Imperial', 'Tactical Space Marine', 'aaee'),
    ...keywordz('Adeptus Astartes, Imperium, [Chapter]'),
    ...attributz('8 6 5 5 4 3 2'),
    ...traitz('4 10 12 8 4 4 7 Avg', 6),
    ...skillz(7, 'Awareness 9 (Passive 5), Ballistic Skill 8, Weapon Skill 8'),
    bonuses: [
      abilityz('Bonus', 'Know No Fear', 'Reroll any failed dice on a Resolve Test.'),
      abilityz('Bonus', 'Space Marine Implants', 'Gain bonus dice and options for actions from Space Marine Implants (see core, pg 75).'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 3 personal Ruin.'),
    ],
    actions: [
      attackz('Boltgun', '10 +1 ED / Range 12 – 24 – 36 / Salvo, 2 / Brutal, Rapid Fire (2)'),
      attackz('Astartes Combat Knife', '11 +2 ED / Range 1 / Reliable'),
      abilityz('Ruin', 'Angel of Death', 'Spend 1 Ruin to add the game’s Tier in ED to all attacks this round.'),
    ],
  },
  {
    name: 'Assault Space Marine',
    ...threatz('core', 331, 'Imperial', 'Assault Space Marine', 'aaee'),
    ...keywordz('Adeptus Astartes, Imperium, [Chapter]'),
    ...attributz('8 6 5 5 4 3 2'),
    ...traitz('4 10 12 8 4 4 7 Avg', 6),
    ...skillz(7, 'Awareness 9 (Passive 5), Ballistic Skill 8, Weapon Skill 8'),
    bonuses: [
      abilityz('Bonus', 'Know No Fear', 'Reroll any failed dice on a Resolve Test.'),
      abilityz('Bonus', 'Space Marine Implants', 'Gain bonus dice and options for actions from Space Marine Implants (see core, pg 75).'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 3 personal Ruin.'),
    ],
    actions: [
      attackz('Bolt Pistol', '10 +1 ED / Range 6 – 12 – 18 / Salvo 1 / Brutal, Pistol'),
      attackz('Chain Sword', '13 +4 ED / Range 1 / Brutal, Parry'),
      abilityz('Ruin', 'Angel of Death', 'Spend 1 Ruin to add the game’s Tier in ED to all attacks this round.'),
    ],
    note: 'Assault Marines are equipped with a Jump pack (see core, pg. 237).'
  },
  {
    name: 'Enforcer',
    ...threatz('core', 331, 'Imperial', 'Enforcer', 'eett'),
    ...keywordz('Imperium, Scum'),
    ...attributz('4 5 4 4 3 3 3'),
    ...traitz('3 10 6 8 3 2 5 Avg', 5),
    ...skillz(5, 'Awareness 6 (Passive 3), Intimidation 7, Investigation 6, Weapon Skill 6'),
    bonuses: [
      abilityz('Bonus', 'Brutal Discipline', '+2 bonus dice to Tests made against targets with the SCUM or HERETIC Keywords.'),
    ],
    actions: [
      abilityz('Battlecry', 'Freeze, Scum!', 'Make an Intimidation Interaction Attack against 2 targets with no penalty.'),
      attackz('Combat Shotgun', '10 + 1 ED / Range 6 – 12 – 18 / Salvo 2 / Assault, Rapid-Fire (1), Spread'),
      attackz('Shock Maul', '8 + 2 ED / AP -1 / Range 1 / Agonising, Brutal'),
    ],
  },
  {
    name: 'Chrono Gladiator (Scissor Variant)',
    ...threatz('core', 332, 'Imperial', 'Chrono Gladiator (Scissor Variant)', 'aett'),
    ...keywordz('Adeptus Mechanicus, Imperium, Scum'),
    ...attributz('4 4 2 4 3 2 1'),
    ...traitz('3 6 5 4 5 4 6 Avg', 4),
    ...skillz(7, 'Awareness 4 (Passive 2)'),
    actions: [
      abilityz('Bonus', 'Second Strike', 'This Threat reduces the Multi- Attack penalty by –2DN, as though it had the Dual Wield Talent (p.133).'),
      attackz('Power Blades', '9 +3 ED / AP -2 / Range 1 / Parry'),
      abilityz('Wrath', 'Borrowed Time', 'Make an Attack as a Free Action against any target in range.'),
      abilityz('Reaction', 'Combat Stimms', 'Once per round, you can suffer 1 Shock to immediately take a Combat Action. Roll a Contested Initiative Test if interrupting.'),
      determinationz(4),
    ],
  },
  {
    name: 'Chrono Gladiator (Secutor Variant)',
    ...threatz('core', 332, 'Imperial', 'Chrono Gladiator (Secutor Variant)', 'aett'),
    ...keywordz('Adeptus Mechanicus, Imperium, Scum'),
    ...attributz('4 4 2 4 3 2 1'),
    ...traitz('5 8 5 4 5 4 5 Avg', 4),
    ...skillz(7, 'Awareness 4 (Passive 2)'),
    actions: [
      attackz('Shock Whip', '8 +2ED / Range 4 / Agonising, Rending (2)'),
      abilityz('Wrath', 'Borrowed Time', 'Make an Attack as a Free Action against any target in range.'),
      abilityz('Reaction', 'Combat Stimms', 'Once per round, you can suffer 1 Shock to immediately take a Combat Action. Roll a Contested Initiative Test if interrupting.'),
      determinationz(4, 'Storm Shield', 'Spend 1 Ruin to roll 4d6. This Threat can roll Determination against Mortal Wounds.'),
    ],
  },
  {
    name: 'Chrono Gladiator',
    ...threatz('core', 333, 'Imperial', 'Mutant', 'aett'),
    ...keywordz('Mutant, Scum'),
    ...attributz('4 3 3 4 3 2 2'),
    ...traitz('3 5 3 3 2 1 6 Avg'),
    ...skillz(5, 'Weapon Skill 6'),
    bonuses: [
      abilityz('Bonus', 'Mutative', 'Whenever a Mutant deals a Wound, the GM gains +1 Ruin.'),
    ],
    actions: [
      attackz('Industrial Bludgeon', '8 +2 ED / Range 1 / Brutal, Unwieldy'),
      abilityz('Wrath', 'Sticky Fingers', 'A target within 2m must succeed on an opposed Strength Test or drop a random piece of Wargear.'),
      abilityz('Reaction', 'Desperation', 'Whenever a piece of Wargear is dropped within 18m of a Mutant, they Sprint toward it and pick it up as a Reflexive Action. Their Defence is reduced by 2 for the next Round.'),
      determinationz(3),
    ],
  },
  {
    name: 'Scum',
    ...threatz('core', 334, 'Imperial', 'Scum', 'tttt'),
    ...keywordz('Human, Scum'),
    ...attributz('3 3 3 3 3 1 2'),
    ...traitz('2 4 3 3 3 2 6 Avg'),
    ...skillz(5, 'Awareness 6 (Passive 3), Stealth 7, Weapon Skill 6'),
    actions: [
      attackz('Autopistol', '7 +1 ED / Range 6 – 12 – 18 / Salvo 2 / Pistol'),
      attackz('Combat Knife', '6 +2 ED / Range 1'),
      abilityz('Battlecry', 'Without Honour', 'Scum cheat in any fight. On the first round of combat, this Threat may substitute their Stealth for Weapon Skill or Ballistic Skill Tests.'),
      determinationz(3),
    ],
    mobOptions: [
      mobOptionz(10, 'Scroungers: Occasionally Scum acquire better Wargear than would otherwise be expected. In a Mob of ten or more Scum, replace one of the Mob’s Autopistols with one of the following weapons (details on core, pg. 334).'),
    ],
    mobAbilities: [
      abilityz('Mob Ability', 'Followers', 'If a friendly Elite or Adversary is within 10m, the Scum Mob gains +1 Resolve.'),
    ],
  },
  {
    name: 'Combat Servitor',
    ...threatz('core', 334, 'Imperial', 'Combat Servitor', 'tttt'),
    ...keywordz('Adeptus Mechanicus, Imperium, Servitor'),
    ...attributz('4 2 2 2 1 1 1'),
    ...traitz('2 1 7 3 2 1 5 Avg'),
    ...skillz(4, 'Weapon Skill 5'),
    bonuses: [
      abilityz('Bonus', 'Iron Soul', 'This Threat is unaffected by abilities that target the mind, and never needs to make a Resolve Test to continue fighting'),
    ],
    actions: [
      attackz('Servo Arm', '9 +2 ED / AP -3 / Range 1 / Brutal, Unwieldy (2)'),
      abilityz('Complication', 'Error', 'The Servitor is Exhausted for 1 Round. This can be negated by an ally succeeding on a DN 3 Tech (Int) Test.'),
      determinationz(3),
    ],
  },
  {
    name: 'Gun Servitor',
    ...threatz('core', 335, 'Imperial', 'Gun Servitor', 'tttt'),
    ...keywordz('Adeptus Mechanicus, Imperium, Servitor'),
    ...attributz('4 2 2 2 1 1 1'),
    ...traitz('2 1 7 3 2 1 5 Avg'),
    ...skillz(4, 'Ballistic Skill 5'),
    bonuses: [
      abilityz('Bonus', 'Iron Soul', 'This Threat is unaffected by abilities that target the mind, and never needs to make a Resolve Test to continue fighting'),
    ],
    actions: [
      attackz('Heavy Bolter', '12 +2 ED / AP -1 / Range 18 – 36 – 54 / Salvo 3 / Brutal, Heavy (4)'),
      abilityz('Complication', 'Error', 'The Servitor is Exhausted for 1 Round. This can be negated by an ally succeeding on a DN 3 Tech (Int) Test.'),
      determinationz(3),
    ],
  },
  {
    name: 'Servo Skull',
    ...threatz('core', 336, 'Imperial', 'Servo Skull', 'tttt'),
    ...keywordz('Adeptus Mechanicus, Imperium, Servitor'),
    ...attributz('2 2 2 4 2 3 2'),
    ...traitz('5 4 2 - 2 2 10Flight Tiny'),
    ...skillz(5, 'Awareness 6 (Passive 3), Stealth 7'),
    bonuses: [
      abilityz('Bonus', 'Iron Soul', 'This Threat is unaffected by abilities that target the mind, and never needs to make a Resolve Test to continue fighting.'),
      abilityz('Bonus', 'Assistant', 'Any Elite or Adversary ally within 10m of the Servo-Skull gains +2 bonus dice to all Skill Tests.'),
    ],
    actions: [
      attackz('Skill Bash', '3 +1 ED / Range 1'),
      determinationz(2),
    ],
  },
  {
    name: 'Gun Skull',
    ...threatz('core', 336, 'Imperial', 'Gun Skull', 'tttt'),
    ...keywordz('Adeptus Mechanicus, Imperium, Servitor'),
    ...attributz('2 2 2 4 2 3 2'),
    ...traitz('5 4 2 - 2 2 10Flight Tiny'),
    ...skillz(5, 'Awareness 6 (Passive 3), Stealth 7'),
    bonuses: [
      abilityz('Bonus', 'Iron Soul', 'This Threat is unaffected by abilities that target the mind, and never needs to make a Resolve Test to continue fighting.'),
      abilityz('Bonus', 'Assistant', 'Any Elite or Adversary ally within 10m of the Servo-Skull gains +2 bonus dice to all Skill Tests.'),
    ],
    actions: [
      attackz('Skill Bash', '3 +1 ED / Range 1'),
      attackz('Laspistol', '7 +1 ED / Range 6 – 12 – 18 / Salvo 1 / Pistol, Reliable'),
      determinationz(2),
    ],
  },
  // Heretical Threats
  {
    name: 'Cultist',
    ...threatz('core', 337, 'Heretical', 'Cultist', 'tttt'),
    ...keywordz('Chaos, Heretic, Human'),
    ...attributz('2 3 2 3 3 2 3'),
    ...traitz('2 3 3 3 3 2 6 Avg'),
    ...skillz(3, 'Awareness 4 (Passive 2), Deception 5, Stealth 5, Weapon Skill 5'),
    bonuses: [
      abilityz('Bonus', 'Devotion', 'Any time a Cultist is slain by a Critical Hit, the GM gains 1 Ruin.'),
    ],
    actions: [
      abilityz('Ability', 'Shoot and Stab', 'A Cultist takes no Multi-Action penalty on a turn where they elect to shoot their Autopistol and stab with their Knife.'),
      attackz('Autopistol', '7 +1 ED / Range 6 – 12 – 18 / Salvo 2 / Pistol'),
      attackz('Knife', '5 +2 ED / Range 1'),
      determinationz(3),
    ],
  },
  {
    name: 'Cultist (Ranged)',
    ...threatz('core', 338, 'Heretical', 'Cultist (Ranged)', 'tttt'),
    ...keywordz('Chaos, Heretic, Human'),
    ...attributz('2 3 2 3 3 2 3'),
    ...traitz('2 3 3 3 3 2 6 Avg'),
    ...skillz(3, 'Awareness 4 (Passive 2), Deception 5, Stealth 5, Weapon Skill 5'),
    bonuses: [
      abilityz('Bonus', 'Devotion', 'Any time a Cultist is slain by a Critical Hit, the GM gains 1 Ruin.'),
    ],
    actions: [
      abilityz('Wrath', 'For the Dark Gods', 'Whenever the Cultist rolls a 6 on the Wrath Die, the GM gains 2 Ruin instead of 1.'),
      attackz('Autogun', '7 +1 ED / Range 12 – 24 – 36 / Salvo 3 / Rapid Fire (1)'),
      determinationz(3),
    ],
  },
  {
    name: 'Cult Leader',
    ...threatz('core', 338, 'Heretical', 'Cult Leader', 'aeee'),
    ...keywordz('Chaos, Heretic, Human'),
    ...attributz('3 4 3 4 5 4 4'),
    ...traitz('3 6 5 5 5 4 6 Avg'),
    ...skillz(6, 'Awareness 7 (Passive 3), Deception 7, Intimidation 7, Persuasion 8, Stealth 6, Weapon Skill 7'),
    bonuses: [
      abilityz('Bonus', 'Herald of Ruin', 'At the start of each Round this Threat is alive, the GM gains a point of Ruin for every 6 Cultists alive in the Scene.'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 1 personal Ruin.'),
      abilityz('Bonus', 'Priest of the Dark Gods', 'This Threat gains +2 bonus dice to all Interaction Attacks.'),
    ],
    actions: [
      abilityz('Battlecry', 'Kneel Before the Dark Gods!', 'As an Action the Cult Leader makes an Interaction Attack against all targets within 15m who do not possess the CHAOS Keyword. Any target affected by the Interaction Attack is Prone in addition to the normal effects.'),
      abilityz('Ruin', 'Kill Them ALL!', 'Spend 1 Ruin. As a Free Action, the Cult Leader commands a Mob of Cultists within 3m to make one Combat Action immediately. The GM may spend 1 Ruin to have the Cult Leader use Kneel Before the Dark Gods! as a Ruin Action'),
      attackz('Autogun', '7 +1 ED / Range 12 – 24 – 36 / Salvo 3 / Rapid Fire (1)'),
      determinationz(4),
    ],
  },
  {
    name: 'Rogue Psyker',
    ...threatz('core', 339, 'Heretical', 'Rogue Psyker', 'aeee'),
    ...keywordz('Chaos, Heretic, Human, Psyker'),
    ...attributz('2 3 2 5 5 4 2'),
    ...traitz('4 4 5 6 5 4 6 Avg'),
    ...skillz(5, 'Awareness 6 (Passive 3), Psychic Mastery 8'),
    bonuses: [
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 2 personal Ruin.'),
      abilityz('Bonus', 'Warp Touched', 'Whenever a Rogue Psyker rolls a Psychic Mastery (Wil) Test, they gain bonus Wrath dice equal to the Tier of the game.'),
    ],
    actions: [
      abilityz('Action', 'Maleficarium', 'The Rogue Psyker attempts to activate Smite or a Maleficarum psychic power (p.280).'),
      attackz('Laspistol', '7 +1 ED / Range 6 – 12 – 18 / Salvo 1 / Pistol, Reliable'),
      abilityz('Ruin', 'Psychic Storm', 'Spend 1 Ruin. The Rogue Psyker attempts to activate a psychic power or Deny the Witch (p.267).'),
      determinationz(3),
    ],
    notes: 'A Rogue Psyker could focus on any of the Disciplines presented in Chapter 12.'
  },
  {
    name: 'Possessed Mortal',
    ...threatz('core', 341, 'Heretical', 'Possessed Mortal', 'aaet'),
    ...keywordz('Chaos, Daemon'),
    ...attributz('5 4 2 4 3 4 3'),
    ...traitz('3 10 8 7 3 2 6 Avg'),
    ...skillz(5, 'Awareness 9 (Passive 5), Weapon Skill 7'),
    bonuses: [
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 2 personal Ruin.'),
    ],
    actions: [
      abilityz('Battlecry', 'Frightful Form', 'Anyone that can see this Threat must make a DN 3 Fear Test.'),
      attackz('Horrifying Tendril', '11 +2 ED / AP -2 / Range 4'),
      determinationz(3, 'Daemonic Determination', 'Spend 1 Ruin to roll 3d6. Daemons can roll Determination against Mortal Wounds. Any Wounds negated by Determination are ignored instead of being converted to Shock.'),
      abilityz('Annihilation', 'Burnt Body', 'Unless prevented from doing so, the Daemon escapes back to the Warp, and the resultant Warp energy explodes from the now empty mortal host. Warp Explosion: 5 +5 ED / Agonizing, Blast (Medium)'),
    ],
  },
  {
    name: 'Chaos Space Marine',
    ...threatz('core', 342, 'Heretical', 'Chaos Space Marine', 'aeee'),
    ...keywordz('Chaos, Heretic Astartes'),
    ...attributz('8 6 5 4 4 3 2'),
    ...traitz('4 10 12 8 4 4 7 Avg'),
    ...skillz(5, 'Awareness 9 (Passive 5), Ballistic Skill 8, Weapon Skill 8'),
    bonuses: [
      abilityz('Bonus', 'Architect of Ruin', 'The GM gains 1 point of Ruin at the start of each of this Threat’s turns.'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 1 personal Ruin.'),
      abilityz('Bonus', 'Mark of Chaos', 'This Threat has a Mark of Chaos (p.136)'),
      abilityz('Bonus', 'Space Marine Implants', 'Gain bonus dice and options for actions from Space Marine Implants (see core, pg 75).'),
    ],
    actions: [
      attackz('Bolt Pistol', '10 +1 ED / Range 6 – 12 – 18 / Salvo 1 / Brutal, Pistol'),
      attackz('Chainsword', '13 +4 ED / Range 1 / Brutal, Parry'),
      abilityz('Ruin', 'Veteran of the Long War', 'Spend 1 Ruin to add the game’s Tier as ED to all attacks this Threat makes this Round.'),
      determinationz(6),
    ],
  },
  {
    name: 'Aspiring Champion',
    ...threatz('core', 342, 'Heretical', 'Aspiring Champion', 'aeee'),
    ...keywordz('Chaos, Heretic Astartes'),
    ...attributz('8 6 5 4 4 3 2'),
    ...traitz('4 10 12 8 4 4 7 Avg'),
    ...skillz(5, 'Awareness 9 (Passive 5), Ballistic Skill 8, Weapon Skill 8'),
    bonuses: [
      abilityz('Bonus', 'Architect of Ruin', 'The GM gains 1 point of Ruin at the start of each of this Threat’s turns.'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 1 personal Ruin.'),
      abilityz('Bonus', 'Mark of Chaos', 'This Threat has a Mark of Chaos (p.136)'),
      abilityz('Bonus', 'Space Marine Implants', 'Gain bonus dice and options for actions from Space Marine Implants (see core, pg 75).'),
    ],
    actions: [
      attackz('Bolt Pistol', '10 +1 ED / Range 6 – 12 – 18 / Salvo 1 / Brutal, Pistol'),
      attackz('Power Sword', '13 +4 ED / AP -3 / Range 1 / Parry'),
      abilityz('Ruin', 'Veteran of the Long War', 'Spend 1 Ruin to add the game’s Tier as ED to all attacks this Threat makes this Round.'),
      abilityz('Ruin', 'Death to the False Emperor!', 'Spend 1 Ruin to Charge, gaining +2 bonus dice to the attack Test.'),
      determinationz(6),
    ],
  },
  {
    name: 'Plague Marine',
    ...threatz('core', 343, 'Heretical', 'Plague Marine', 'aeee'),
    ...keywordz('Chaos, Heretic Astartes'),
    ...attributz('8 8 5 4 4 3 2'),
    ...traitz('4 10 12 12 4 4 5 Avg'),
    ...skillz(5, 'Awareness 9 (Passive 5), Ballistic Skill 8, Weapon Skill 8'),
    bonuses: [
      abilityz('Bonus', 'Architect of Ruin', 'The GM gains 1 point of Ruin at the start of each of this Threat’s turns.'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 1 personal Ruin.'),
      abilityz('Bonus', 'Mark of Chaos', 'This Threat has a Mark of Chaos (p.136)'),
      abilityz('Bonus', 'Space Marine Implants', 'Gain bonus dice and options for actions from Space Marine Implants (see core, pg 75).'),
    ],
    actions: [
      attackz('Plague Belcher', '10 +1 ED / Range 5 – 9 – 14 / Salvo 1 / Assault, Inflict (Poison 4)'),
      attackz('Plague Sword', '13 +5 ED / Range 1 / Brutal, Inflict (Poison 4)'),
      abilityz('Ruin', 'Veteran of the Long War', 'Spend 1 Ruin to add the game’s Tier as ED to all attacks this Threat makes this Round.'),
      abilityz('Reaction', 'Noxious Discharge', 'Whenever this Threat takes a Wound, roll a d6. If you roll an Icon, a mix of virulent gasses and toxic effluent spills from the Wound. The Noxious Discharge hits every target Engaged with the Death Guard. Noxious Discharge 2 +4 ED / AP -4 / Blast (Small), Inflict (Poison 4)'),
      determinationz(8, 'Disgustingly Resilient', 'You do not need to spend Ruin to roll Determination for this Threat. Roll 8d6. This Threat can roll Determination against Mortal Wounds. ), Inflict (Poison 4)'),
    ],
  },
  {
    name: 'Possessed Chaos Space Marine',
    ...threatz('core', 344, 'Heretical', 'Possessed Chaos Space Marine', 'aaae'),
    ...keywordz('Chaos, Daemon, Heretic Astartes, [Legion], [Mark of Chaos]'),
    ...attributz('9 8 6 6 5 5 1'),
    ...traitz('5 13 11 10 5 5 7 Avg'),
    ...skillz(5, 'Awareness 9 (Passive 5), Ballistic Skill 9, Weapon Skill 9'),
    bonuses: [
      abilityz('Bonus', 'Architect of Ruin', 'The GM gains 1 point of Ruin at the start of each of this Threat’s turns.'),
      abilityz('Bonus', 'Champion', 'This Threat may use Ruin Actions and has 4 personal Ruin.'),
      abilityz('Bonus', 'Writhing Tentacles', 'This Threat may Multi-Attack all enemies it is Engaged with without suffering a DN penalty.)'),
    ],
    actions: [
      abilityz('Battlecry', 'Sea of Mutations', 'The Daemon warps its host’s form, preparing it for battle. At the start of any combat with this Threat, apply a Severe Mutation to this Threat. You can roll on the Severe Mutations table (p.288) when this Threat is encountered, or before the session'),
      attackz('Horrifying Mutations', '13 + 2 ED / AP -2 / Range 1'),
      attackz('Plague Sword', '13 +5 ED / Range 1 / Brutal, Inflict (Poison 4)'),
      abilityz('Ruin', 'Veteran of the Long War', 'Spend 1 Ruin to add the game’s Tier as ED to all attacks this Threat makes this Round.'),
      determinationz(6),
      abilityz('Annihilation', 'Painful Lessons', 'When this Threat dies, the GM gains 2 Ruin.'),
    ],
  },
  // Daemonic Threats
];


module.exports = [
  ...core,
];
