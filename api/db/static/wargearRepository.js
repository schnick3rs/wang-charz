const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha', key: 'aaoa', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angles', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
  goen: { book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
  tog: { book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
  pax: { book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
  sotah: { book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
  amb: { book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
};

const rarity = {
  'U': 'Uncommon',
  'C': 'Common',
  'R': 'Rare',
  'V': 'Very Rare',
  'L': 'Unique',
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleStub = function (id, sourceKey, sourcePage, name, value, keywords, hint, stub = true) {
  const valueParts = value.split('');
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    id: id,
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    type: 'Misc',
    subtype: '',
    value: valueParts[0],
    rarity: rarity[valueParts[1]],
    keywords: keywords.split(',').map((k)=>k.trim()),
    stub: stub,
    meta: [],
  };
};

const armour = function (subtype, armourRating, traits) {
  return {
    type: 'Armour',
    subtype: subtype,
    meta: [
      {
        type: 'armour',
        armourRating: armourRating,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};

const simpleRange = function (subtype, range, damageStatic, damageEd, ap, salvo, traits, specialTrait) {

  let finalTraits = traits ? traits.split(',').map((k)=>k.trim()) : [];

  if (specialTrait) {
    finalTraits.push('Special*');
  }

  return {
    type: 'Ranged Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'range-weapon',
        range: range,
        damage: {
          static: parseInt(damageStatic),
          ed: parseInt(damageEd),
        },
        ap: ap,
        salvo: salvo,
        traits: finalTraits,
        special: specialTrait,
      }
    ],
  };
};

const simpleMelee = function (subtype, range, damageStatic, damageEd, ap, traits) {
  return {
    type: 'Melee Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'melee-weapon',
        range: range < 1 ? 1 : range,
        damage: {
          static: parseInt(damageStatic),
          ed: parseInt(damageEd),
        },
        ap: ap,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};

/**
 * 16+2ED; AP -3; Range 48m; Salvo 1; Assault, Supercharge, Waaagh!
 *
 * @param brewString
 * @param subtype
 * @returns {{subtype: string, meta: [{damage: {static: *, ed: *}, traits: (*|[]), range: (number|*), type: string, ap: *}], type: string}|{subtype: *, meta: [{damage: {static: *, ed: *}, traits: (*|[]), salvo: *, range: *, type: string, ap: *}], type: string}}
 */
const rangeAaoa = function (brewString, subtype = '', specialTrait = '') {
  const parts = brewString.split(';').map((k)=>k.trim());

  const damageString = parts[0]; // 4+1ED
  const ap = parts[1].split(' ')[1]; // AP -1
  const rangeValue = parts[2].split(' ')[1].split('m')[0]; // Range 48m
  const salvo = parts[3].split(' ')[1];
  const traitString = parts[4];

  const damageParts = damageString.split('+');
  const damageStatic = damageParts[0];
  const damageEd = damageParts[1].split('ED')[0];
  const traits = traitString ? traitString.split(',').map((k)=>k.trim()) : [];

  return simpleRange(subtype, rangeValue, damageStatic, damageEd, ap, salvo, traitString, specialTrait);
};

/**
 *
 * @param brewString -> 4+2ED; AP 0; Toxic [4], Waaagh!
 * @param subtype
 * @returns {{subtype: *, meta: [{damage: {static: *, ed: *}, traits: (*|[]), salvo: *, range: *, type: string, ap: *}], type: string}}
 */
const meleeAaoa = function (brewString, subtype = '') {
  const parts = brewString.split(';').map((k)=>k.trim());

  const damageString = parts[0]; // 4+1ED
  const ap = parts[1].split(' ')[1]; // AP -1
  const traitString = parts[2]; // a, b, c

  const damageParts = damageString.split('+'); // 4+1ED -> 4 1ED
  const damageStatic = damageParts[0];
  const damageEd = damageParts[1].split('ED')[0];
  const traits = traitString ? traitString.split(',').map((k)=>k.trim()) : [];

  return simpleMelee(subtype, 1, damageStatic, damageEd, ap, traitString);
};

/**
 * Damage 2+1ED; AP 0; Range M; Steadfast
 * [Damage 2+1ED][AP 0][Range M]; Steadfast
 * Damage 4+1ED; AP 0; Range 2m; Steadfast, Two-Handed, Unwieldy (2)s
 *
 * @param paxString
 * @param subtype
 * @returns {{subtype: string, meta: [{traits: (*|[]), armourRating: *}], type: string}}
 */
const meleePax = function (paxString, subtype = '') {
  const parts = paxString.split('; ');

  const damageString = parts[0].split(' ')[1]; // Damage: 4+1ED
  const ap = parts[1].split(' ')[1];
  const rangeString = parts[2].split(' ')[1];
  const traits = parts[3];

  const damageParts = damageString.split('+');
  const damageStatic = damageParts[0];
  const damageEd = damageParts[1].split('ED')[0];

  return {
    type: 'Melee Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'melee-weapon',
        range: rangeString === 'M' ? 1 : rangeString.split('m')[0],
        damage: {
          static: damageStatic,
          ed: damageEd,
        },
        ap: ap,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};


const core = [];

const aaoa = [
  {
    ...simpleStub(30901, 'aaoa',90,'Absolvor Bolt Pistol', '8V','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('12+2ED; AP -1; Range 35m; Salvo 1; Brutal, Pistol', 'Bolt Weapon',''),
  },
  {
    ...simpleStub(30903, 'aaoa',90,'Auto-Boltstorm Gauntlet', '8V','Bolt, Power Field, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 24m; Salvo 3; Assault, Brutal, Paired', 'Bolt Weapon',''),
    description:
      '<p>Larger, and more stable than the conventional Boltstorm Gauntlet, the bolter component of these weapons allows them to sustain a higher rate of fire while on the move, compared to the close quarters burst fire of the smaller version. Auto Boltstorm Gauntlets are normally wielded in pairs by Primaris Aggressors; when operated as a pair, they may fire as a single weapon, but with a Salvo value of 6.</p>' +
      '<p>The profile below describes the gun component, though the Value and Keywords apply to the whole weapon. The power fist uses the profile found on page 293 of the Wrath & Glory rulebook but gains the Paired trait.</p>',
  },
  {
    ...simpleStub(30904, 'aaoa',90,'Bolt Carbine', '6R', 'Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 2; Assault, Brutal, Steadfast', 'Bolt Weapon', ''),
  },
  {
    ...simpleStub(30905, 'aaoa',90,'Bolt Sniper Rifle', '8V', 'Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('12+1ED; AP 0; Range 75m; Salvo 1; Heavy [6], Sniper [2]', 'Bolt Weapon','When firing a Bolt Sniper Rifle, choose a single ammo type: Executioner (AP -1, +2d to the attack roll and ignore cover), Hyperfrag (add the Blast [Small] trait), or Mortis (+1ED, AP -2, add Toxic [5] trait)'),
  },
  {
    ...simpleStub(30921, 'aaoa',92,'Instigator Bolt Carbine', '7R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+2ED; AP -1; Range 40m; Salvo 1; Assault, Brutal, Sniper [1]', 'Bolt Weapon', ''),
    snippet: 'Instigator Bolt Carbines are fitted with silencers as standard.',
  },
  {
    ...simpleStub(30922, 'aaoa',92,'Marksman Bolt Carbine', '6R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 1; Brutal, Rapid Fire, Sniper [1]', 'Bolt Weapon', ''),
    snippet: 'Marksman Bolt Carbines are fitted with a Monoscope as standard.',
  },
  {
    ...simpleStub(30923, 'aaoa',92,'Occulus Bolt Carbine', '6R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 1; Brutal, Rapid Fire','Bolt Weapon','If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.'),
    snippet: 'Occulus Bolt Carbines are fitted with a Preysense Sight as standard. If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.',
    // If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.
  },
  {
    ...simpleStub(30925, 'aaoa',92,'Plasma Incinerator', '7V', 'Plasma, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('15+1ED; AP -4; Range 60m; Salvo 2; Rapid Fire [1], Supercharge', 'Plasma Weapon', ''),
    description:
      '<p>A more advanced version of the standard plasma gun, the Mark III Belisarius-pattern plasma incinerator is the primary weapon of Primaris Hellblasters, used to deliver death and destruction to armoured targets from afar.</p>',
  },
  {
    ...simpleStub(30934, 'aaoa', 93, 'Fragstorm Grenade Launcher', '6V', 'Explosive, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 35m; Salvo 3; Assault, Blast (Medium)', 'Grenades and Grenade Launchers', ''),
    description:
      '<p>Utilised by Primaris Aggressors and aboard certain Astartes vehicles, Fragstorm grenade launchers fire salvoes of charges similar to frag grenades, though somewhat denser and more compact, raining down fire and shrapnel upon the enemy.</p>',
  },
  {
    ...simpleStub(30936, 'aaoa', 93, 'Psyk-Out Grenades', '8L', 'Explosive, Imperium, Inquisition, Grey Knights, Silent Sisterhood, Templum Culexus', ''),
    ...rangeAaoa('8+1ED; AP 0; Range Strength x 4 metres [T] or as launcher [R]; Salvo –; Blast [Medium]', 'Grenades and Grenade Launchers', 'Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.'),
    snippet: 'Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.',
    description:
      '<p>Psyk-out grenades are anti-psyker weapons. When they detonate, they release fine dust particles which are heavily impregnated with negative psychic energy. This form of energy is extremely rare; in all of human space it can be obtained only as a by-product of the Emperor\'s metabolism. Using the material to create anti-psyker weapons is considered by many to be a great waste, and their issue is strictly controlled. Psyk-out weapons are nigh-useless against non-psychic targets. Against psychic creatures such as daemons and psykers, however, their effects are devastating.</p>',
  },
  {
    ...simpleStub(30941, 'aaoa',94,'Shock Grenade', '7V','Explosive, Imperium, Adeptus Astartes, Primaris', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '-', '-', '-', '-', 'Blast (Medium)', 'Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable – you can’t mix and match.'),
    snippet: 'Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable – you can’t mix and match.',
  },
  {
    ...simpleStub(30942, 'aaoa',94,'Smoke Grenade', '4C','Explosive, Imperium', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '-', '-', '-', '-', 'Blast (Large)', 'Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round.'),
    snippet: 'Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round.',
  },
  {
    ...simpleStub(30952, 'aaoa', 95, 'Animus Speculum', '10L', 'Exotic, Imperium, Officio Assassinorum, Templum Culexus', ''),
    ...rangeAaoa('12+1ED; AP -4; Range 36m; Salvo 3; Agonizing, Assault', 'Exotic Ranged Weapon', 'the animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.'),
    snippet: 'The animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.',
    description:
      '<p>A helmet-mounted psychic weapon, the animus speculum focusses the negative psychic presence of the wearer into bolts of energy that overwhelm the minds and souls of others. They draw additional power from nearby psykers, becoming deadlier with each psyker nearby.</p>',
  },
  {
    ...simpleStub(30982, 'aaoa',98,'Blight Grenade', '4U', 'Explosive, Chaos, Nurgle', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '10', '1', '0', '-', 'Blast (Medium),Toxic (5)', ''),
  },
  {
    ...simpleStub(30992, 'aaoa',99,'Sonic Blaster', '6R','Sonic, Chaos, Slaanesh', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 48m; Salvo 3; Assault, Cacophony'),
  },
  {
    ...simpleStub(30996, 'aaoa',99,'Avenger Shuriken Catapult', '7R','Shuriken, Aeldari, Asuryani', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 36m; Salvo 3; Assault, Penetrating (3)', 'Aeldari Ranged Weapon'),
  },
  {
    ...simpleStub(31005, 'aaoa',100,'Deathspinner', '7V','Monofilament, Aeldari, Asuryani', ''),
    ...rangeAaoa('14+2ED; AP 0; Range 24m; Salvo 3; Assault, Brutal, Penetrating (4), Tangle (3)', 'Aeldari Ranged Weapon'),
  },
  {
    ...simpleStub(31016, 'aaoa',101,'Laser Lance', '7V','Las, Aeldari, Asuryani, Exodite', ''),
    ...rangeAaoa('14+2ED; AP -4; Range 12m; Salvo 1; Assault', 'Aeldari Ranged Weapon'),
    // 3+1ED; AP -4; Range 2m
    description:
      '<p>The Laser Lance has a range and a melee weapon profile</p>' +
      '<p>When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>'
  },
  {
    ...simpleStub(31022, 'aaoa',102,'Reaper Launcher', '7V','Explosive, Aeldari, Asuryani', ''),
    // Starshot Missile
    ...rangeAaoa('16+3ED; AP -2; Range 100m; Salvo –; Blast (Small), Heavy (5)', 'Aeldari Ranged Weapon'),
    // Starswarm Missile
    ...rangeAaoa('12+2ED; AP -2; Range 100m; Salvo 3; Heavy (5)', 'Aeldari Ranged Weapon'),
    description:
      '<p>The Laser Lance has a range and a melee weapon profile</p>' +
      '<p>When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>'
  },
  {
    ...simpleStub(31043, 'aaoa',104,'Grenade Pack', '6V','Explosive, Aeldari, Asuryani', ''),
    ...simpleRange('Grenades and Grenade Launchers', 'special', '-', '-', '-', '-', 'Assault'),
    description: '<p>A Swooping Hawk Grenade Pack can only launch grenades downwards, and the user may launch grenades at any point while flying. This is done as part of the character’s move, rather than as a distinct attack action.</p>',
  },
  {
    ...simpleStub(31050, 'aaoa',105,'Kustom Mega-Blasta', '7R', 'Kustom, Plasma, Ork', ''),
    ...rangeAaoa('16+2ED; AP -3; Range 48m; Salvo 1; Assault, Supercharge, Waaagh!', 'Ork Ranged Weapon', 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.'),
    snippet: 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.',
  },
  {
    ...simpleStub(31053, 'aaoa',105,'Tankbusta Bomb', '7R', 'Explosive, Ork', ''),
    ...rangeAaoa('16+3ED; AP -2; Salvo –; Blast (Small), Waaagh!', 'Ork Ranged Weapon', 'Cannot be thrown or fired from a launcher. They are placed as a melee attack against a vehicle. An Ork placing a Tankbusta bomb may immediately Disengage as a free action.'),
  },
  {
    ...simpleStub(31099, 'aaoa',109,'Nemesis Force Sword', '6V', 'Force, Imperium, Adeptus Astartes, Grey Knights', ''),
    ...meleeAaoa('5+1ED; AP -3; Force, Nemesis, Parry'),
    description:
      '<p>The most common type of weapon wielded by the Grey Knights is the Nemesis Force Sword. It exemplifies the mixture of magick and science utilized by the Grey Knights. The blade is tempered iron, flecked with shards of silver and inset with ancient runes of daemon slaying. Advanced power field generators are also contained within.</p>',
  },
  {
    ...simpleStub(31102, 'aaoa',110,'Crozius Arcanum', '6V', 'Power, Imperium, Adeptus Astartes', ''),
    ...meleeAaoa('5+2ED; AP -1; Brutal'),
    description:
      '<p>Serving as both a sceptre of office and a weapon for Astartes Chaplains, each Crozius Arcanum is a staff or maul with a head shaped like an aquila or other symbol of significance to the Imperium or the chapter. Inside this sceptre is a power field generator, allowing it to function similarly to a power maul.</p>' +
      '<p>The Dark Apostles of Heretic Astartes forces use a debased counterpart to this weapon, the Accursed Crozius.</p>',
  },
  {
    ...simpleStub(31131, 'aaoa',113,'Plague Knife', '5U', 'Pestilent, Chaos, Nurgle', ''),
    ...meleeAaoa('3+1ED; AP 0; Steadfast, Toxic (7)', 'Chaos Melee Weapon'),
  },
  {
    ...simpleStub(31132, 'aaoa',113,'Plague Sword', '7R', 'Pestilent, Chaos, Daemon, Nurgle', ''),
    ...meleeAaoa('5+1ED; AP 0; Parry, Toxic (7)', 'Chaos Melee Weapon'),
  },
  {
    ...simpleStub(31154, 'aaoa',115,'‘Urty Syringe', '4U', 'Exotic, Ork', ''),
    ...meleeAaoa('4+2ED; AP 0; Toxic (4), Waaagh!', 'Ork Melee Weapon'),
    description:
      'This massive metal syringe superficially resembles a tool of the chirurgeon’s craft and tend to be filled with whatever toxic sludge the Painboy is able to find or create.',
  },
  {
    ...simpleStub(31175, 'aaoa', 117, 'Dragonfire Bolt Rounds', '7R', 'Imperium, Adeptus Astartes', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains the Blast (Small) and Spread traits, and the Fire keyword.',
  },
  {
    ...simpleStub(31193, 'aaoa', 119, 'Inferno Bolt Rounds', '7R', 'Chaos, Heretic Astartes, Tzeentch', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains AP -2, and the Fire keyword..',
  },
  {
    ...simpleStub(31262, 'aaoa',126,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Bulk (1), Powered (4)'),
    snippet: 'Reinforced: The wearer adds +2 to their Toughness while wearing this armour.',
    description:
      '<p>Mark X power armour comes in a number of varieties, as the underlying armour system is designed to be modular and customisable according to battlefield role. The heavier variant is known as Gravis armour, which incorporates additional cowling, and ablative armour layers to increase the wearer’s durability in battle, at the cost of reduced mobility.</p>',
  },
  {
    ...simpleStub(31263, 'aaoa',126,'Phobos Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Powered (3)'),
    snippet: 'Silenced: The wearer may re-roll up to two dice when making a Stealth test.',
    description:
      '<p>Phobos armour is a lightweight variant of Mark X power armour, with lighter plating and tuned servos that operate silently and virtually no loss of protection, though the reduced bulk of the armour does mean it provides less of a boost to the wearer’s strength. It’s favoured by Reivers and other Vanguard Primaris, who operate deep behind enemy lines and rely on stealth and evasion to wage war.</p>',
  },
  {
    ...simpleStub(31264, 'aaoa',126,'Aegis Power Armour', '9V', 'Powered, Imperium, Adeptus Astartes, Grey Knights', ''),
    ...armour('Astartes Armour', 5, 'Powered (3)'),
    snippet: 'The Aegis: Enemy psychic powers which target the wearer suffer +2DN. In addition, the wearer adds +1d when rolling to Soak any attack from a Daemon.',
    description:
      '<p>Aegis Armour is a specialized form of Astartes Power Armour worn by members of the Grey Knights chapter. Worked into their Armour, each Aegis Suit contains a lattice of psycho-conductive filaments and protective amulets, wrought into hexagrammic wards and inscribed with anti-daemonic prayers. Aegis Armour allows Grey Knights to better combat Warp Entities and Rogue Psykers by protecting them from psychic attack. The technology incorporated into The Aegis represents the most potent anti-psychic defences in the Imperium of Man.</p>',
  },
  {
    ...simpleStub(31301, 'aaoa',130,'Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 4),
  },
  {
    ...simpleStub(31302, 'aaoa',130,'Heavy Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 5, 'Bulk (1)'),
  },
  {
    ...simpleStub(31303, 'aaoa',130,'Exarch Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 6),
  },
  {
    ...simpleStub(31222, 'aaoa',131,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Bulk (1), Powered (4)'),
    snippet: 'Reinforced: The wearer adds +2 to their Toughness while wearing this armour.',
    description:
      '<p>Mark X power armour comes in a number of varieties, as the underlying armour system is designed to be modular and customisable according to battlefield role. The heavier variant is known as Gravis armour, which incorporates additional cowling, and ablative armour layers to increase the wearer’s durability in battle, at the cost of reduced mobility.</p>',
  },
  {
    ...simpleStub(31333, 'aaoa',133,'Ionclad Carapace Armour', '6R', 'Heavy, Squat', ''),
    ...armour('Squat Armour',5),
    description:
      'While seeming like ordinary carapace armour—a suit of thick plates of ceramite and plasteel—Ionclad armour represents the cunning artifice of the Squats. ' +
      'Each layer of the armour, crafted using alloys and alchemical processes only Squat Engineers can perform, ' +
      'is configured to conduct a potent electromagnetic charge that hardens the armour and allows ' +
      'it to resist attacks more effectively than material strength alone would permit. ' +
      'During the height of Squat civilisation, Ionclad armour was commonly used by elite soldiers such as Hearthguard—at least, ' +
      'those who couldn’t afford Exo-Armour—and by the rank-and-file War-Pledged from wealthier Strongholds.',
  },
  {
    ...simpleStub(31352, 'aaoa', 135, 'Divinator-class Auspex', '7V', 'Imperium, Adeptus Astartes, Primaris', ''),
    snippet: 'Counts as Auspex. Spend 1 Glory when an enemy within 25 moves to make an immediate ranged attac (with +2 DN) against that enemy.',
    description:
      '<p>These sophisticated forms of auspex provide a remarkable combination of visual and multi-spectral observation-and-analysis technologies, which gather every scrap of data from the wearer\'s surroundings. The auspex’s machine spirit to collate the findings far faster than human thought, feeding the resultant data into the wearer\'s visor.</p>' +
      '<p>With training, this flood of information allows the wearer to fight in an almost precognitive fashion, responding to situations far more swiftly than they would be able to unaided.</p>' +
      '<p>A Divinator-class Auspex functions like a normal Auspex in all regards. ' +
      'In addition, the wearer may spend 1 Glory when an enemy within 25m moves; ' +
      'if they do so, they may make an immediate ranged attack, at +2 DN, against that enemy.</p>',
  },
  {
    ...simpleStub(31353, 'aaoa', 135, 'Etherium', '11L', 'Imperium, Officio Assassinorum, Templum Culexus', ''),
    snippet: 'Attackers must pass Willpower Test (DN 7) or refuse to believe the Culexus exists and cannot continue their attacks. You lose this ability while wounded.',
    description:
      '<p>The Etherium is a highly advanced form of the same kinds of psychic-resistant technology found in Hexagrammic Wards, ' +
      'Null Rods, and the Aegis-pattern armour worn by the Grey Knights. ' +
      'This, in combination with the Culexus Assassin’s innate abilities, ' +
      'is so psychically disruptive that most minds struggle to perceive the assassin, ' +
      'as physical senses and psychic instincts conflict.</p>' +
      '<p>Whenever an enemy attempts to attack a Culexus Assassin, they must pass a Willpower test (DN 7). ' +
      'Failure means that they refuse to believe the Culexus exists and cannot continue their attacks. ' +
      'The Culexus loses this ability while wounded.</p>',
  },
  {
    ...simpleStub(31354, 'aaoa', 135, 'Force Matrix', '11L', 'Imperium, Officio Assassinorum, Templum Culexus', ''),
    type: 'Tools & Equipment',
    snippet:
      'This device gains charges when a Psyker within 25m attempts to use a psychic power (other than Deny the Witch) or when a psyker suffers psychic phenomena. ' +
      'Charges may be used as Reloads for the Animus Speculum, and dissipate after a few minutes.',
    description:
      '<p>The Force Matrix consists of a series of psychic conduits which are made of a material similar to that used in the construction of Force Weapons. ' +
      'When connected to a Culexus Assassin, the Force Matrix gathers excess warp energy drawn upon by nearby psykers, ' +
      'storing it so that it can be used to fuel the assassin’s Animus Speculum.</p>' +
      '<p>Whenever a Psyker within 25m of the wearer attempts to use a psychic power (other than Deny the Witch), the Force Matrix gains a single charge. ' +
      'If a Psyker within that range suffers psychic phenomena, then the Force Matrix gains one additional charge. ' +
      'Charges may be used as Reloads for the Animus Speculum.</p>' +
      '<p>Charges gained dissipate after a few minutes, and thus cannot be carried over from fight to fight.</p>',
  },
  {
    ...simpleStub(31355, 'aaoa', 135, 'Grapple Gun', '2U', '<Any>', ''),
    type: 'Tools & Equipment',
    description:
      '<p>These devices, appearing similar to a normal firearm, use gas pressure or magnetic impulse to propel a sturdy metal hook attached to a cable. ' +
      'They’re favoured by shock troops fighting in dense terrain, ' +
      'as it allows them to attack from unexpected directions and position themselves in hard-to-reach vantages.</p>',
  },
  {
    ...simpleStub(31361, 'aaoa', 136, 'Liber Daemonica', '8V', 'Imperium, Inquisition, Ordo Malleus', ''),
    type: 'Tools & Equipment',
    snippet:
      'Reading from this book may add +2 bonus dice to Scholar Tests regarding combating Daemons and their allies. ' +
      'Reading the book routinely grants +2 Conviction.',
    description:
      '<p>The Liber Daemonica is the Grey Knights Chapter\'s sacred book that contains prayers, battle rituals, litanies, funeral rites, and Chaos lore. Inquisitors of the Ordo Malleus are also known to possess copies of the book. While it may appear to be a normal book, opening it will reveal a series of wafer-screens that contain instructional hololiths and reactive picts which respond to the reader’s needs. Page after page discusses tactics and how to fight the denizens of the Immaterium, as well as listing the True Names of a great many Daemonic entities, information collected from the Librarium Daemonica, and the repository of dangerous knowledge pieced together by the Ordo Malleus over the millennia. The book pulls no punches; it includes an extensive discourse of when to terminate compromised allies and a whole chapter discussing the moral implications and appropriate use of Exterminatus.</p>' +
      '<p>Each Grey Knight fights with a copy of the book displayed in a ceramite case fastened to his breastplate or hanging from a chain around his neck. ' +
      'The book is also represented in Grey Knight iconography, on the chestplate and pauldron of both power armour and Terminator Armour. ' +
      'It is a symbol of the greatest weapon against the forces of Chaos - an unshakable faith in the Emperor of Mankind.</p>' +
      '<p>A character reading from the Liber Daemonica may add +2d to any Scholar test regarding combating Daemons and their allies. ' +
      'A character who keeps the book on their person and reads from it routinely gains +2 Conviction.</p>',
  },
  {
    ...simpleStub(31363, 'aaoa', 136, 'Narthecium', '5R', 'Imperium, Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    snippet:
      'Count`s as Medikit. You add +2 bonus dice to Medicae tests when treating <Adeptus Astartes>. ' +
      'A Complication will inflict 1 Mortal Wound on a non Astartes Patient.',
    description:
      '<p>A Narthecium is a tool of a Space Marine Apothecary\'s trade, containing implements specially designed for treating the Astartes\' genetically engineered physiology and for performing first aid without having to remove the patient\'s Power Armour.</p>' +
      '<p>It also comprises various counterseptics, synthderm patches, transfusions and other compounds engineered for the Space Marines’ physiology, and several stasis tubes for storing any recovered gene-seed taken from a dead Space Marine\'s Progenoid Glands.</p>' +
      '<p>In battle, an Apothecary carries a number of specialised items of equipment, integrating a variety of tools into a customised backpack, with delivery systems in a device mounted on the Apothecary’s vambrace. The Apothecary may have crafted many of these tools himself according to his own needs.</p>' +
      '<p>A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. ' +
      'It also adds +2 to Medicae tests to treat the injuries of characters with the Adeptus Astartes keyword. ' +
      'On characters who lack the Adeptus Astartes keyword, use of a Narthecium can cause problems, ' +
      'as the equipment within is not meant for frail mortal physiology: ' +
      'a complication will inflict 1 Mortal Wound on a non-Astartes patient.</p>',
  },
  {
    ...simpleStub(31371, 'aaoa', 137, 'Psychic Hood', '7V', 'Imperium, Adeptus Astartes, Inquisition', ''),
    type: 'Tools & Equipment',
    snippet:
      'You add +2 bonus dice to Deny the Witch Tests. You may attempt to Deny the Witch once per round as a Free Action.',
    description:
      '<p>The Psychic Hood is an arcane device utilised by Space Marine Librarians to amplify the wearer\'s psychic powers ' +
      'and protect against an assault by enemy psykers. ' +
      'Most importantly, a Psychic Hood renders the wearer more able to counter the effects that other psykers have on the Warp nearby. ' +
      'Distinguished by the trademark metal hood that rises from the backplate of a Librarian\'s Power Armour, ' +
      'a Psychic Hood uses a set of interwoven, intricately aligned crystals to nullify an opponent\'s psychic attacks.</p>' +
      '<p>A character wearing a psychic hood may attempt to Deny the Witch once per round as a Free Action in response to an enemy psyker using a power. ' +
      'Further, they may add +2d on their Psychic Mastery test to use Deny the Witch.</p>',
  },
  {
    ...simpleStub(31372, 'aaoa', 137, 'Reductor', '5R', 'Imperium, Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    snippet:
      'As an Action, extract the gene-seed of a deceased Marine with a Medicae Test (DN 3). You gain 1 Wrath immediatly. ' +
      'If the geen-seed belongs to a player character, he gains +25 BP during character creation.',
    description:
      '<p>A Reductor is a special tool used by Adeptus Astartes Apothecaries and Primaris Apothecaries to retrieve the crucial gene-seed of their fallen Battle-Brothers so that new Astartes might be raised from among their Chapter\'s Aspirants. Retrieval and storage of a fallen Battle-Brother\'s gene-seed is so critical that Apothecaries carry a special tool for this operation, often included as part of the Narthecium.</p>' +
      '<p>While a Reductor is not required for Progenoid removal, it significantly reduces the time. This surgical implement fastens under the wrist and is often integrated into the Apothecary’s Narthecium. It includes a monomolecular saw for penetrating Power Armour and Ossmodula-enhanced rib cages, and a diamantine-tipped extractor drill.</p>' +
      '<p>As an action, an Apothecary can use a Reductor to remove the gene-seed of a deceased Space Marine. ' +
      'This requires a Medicae test (DN 3). ' +
      'Though a grim task, it is a vital one, and an Apothecary who extracts a fallen brother’s gene-seed gains 1 Wrath immediately, ' +
      'as their duty drives them to press on.</p>' +
      '<p>In addition, if the gene-seed recovered belonged to a player character, ' +
      'then that player’s next character receives an additional 25 BPs during character creation, in honour of their sacrifice.</p>',
  },
  {
    ...simpleStub(31412, 'aaoa', 141, 'Banshee Mask', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When a Howling Banshee charges, all enemies within 3m of the Banshee’s target are paralysed by the war-cry, gaining the Hindered (2) and Vulnerable (2) combat effects until the end of their next turn.',
  },
  {
    ...simpleStub(31413, 'aaoa', 141, 'Dark Reaper Rangefinder', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'The Reaper Rangefinder allows the wearer to see even in complete darkness or through fog with no penalty. In addition, when a Dark Reaper aims before making a ranged attack, they add +3d to their attack.',
  },
  {
    ...simpleStub(31423, 'aaoa', 142, 'Ghosthelm', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Any Daemon or other warp entity attempting to perceive, attack, or otherwise interact with a Farseer wearing a Ghosthelm suffers a +2DN penalty to any tests they attempt. In addition, the Farseer gains a +2d bonus on any test made to resist any effects of Perils of the Warp, and reduces all Shock suffered from Perils of the Warp by 2, to a minimum of 0.',
  },
  {
    ...simpleStub(31433, 'aaoa', 142, 'Mandiblaster Helm', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When the wearer of a Mandiblaster Helm charges into combat, and at the start of each turn they are engaged in combat, roll 1d6. On a 4+, one enemy within 2m suffers 1d3 Mortal Wounds.',
  },
  {
    ...simpleStub(31443, 'aaoa', 142, 'Runes of Warding', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Once per round, when an enemy psyker attempts to use a psychic power within 36m, you may force them to re-roll a number of dice on their Psychic Mastery test equal to your Psychic Mastery skill rank.',
  },
  {
    ...simpleStub(31431, 'aaoa', 143, 'Runes of Witnessing', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Once per round, when you attempt to use a psychic power, you may re-roll a number of dice on your Psychic Mastery test equal to your Psychic Mastery skill rank.',
  },
  {
    ...simpleStub(31432, 'aaoa', 143, 'Seer’s Spirit Stone', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When you attempt to use a psychic power, you may draw upon the power of the soul within the stone. This grants one of two effects: either you gain a +3d bonus on the Psychic Mastery test, or you may use the psychic power as a free action. Once used, the stone’s inhabiting soul goes dormant, and requires a day to recover.',
  },
  {
    ...simpleStub(31432, 'aaoa', 143, 'Swooping Hawk Wings', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'A warrior wearing Swooping Hawk Wings gains the ability to fly, and a flying speed equal to twice their normal movement speed.',
  },
  {
    ...simpleStub(31432, 'aaoa', 143, 'Targeting Vane', '7R', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'A warrior wearing a Targeting Vane reduces range DN penalties by 2. In addition, if the warrior aims, they add an additional +1d bonus to the following ranged attack.',
  },
  {
    ...simpleStub(31434, 'aaoa', 143, 'Warp Spider Jump Generator', '7R', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    description:
      '<p>A warrior wearing a Warp Spider Jump Generator may activate it when they move. If they do so, then they vanish from the battlefield, and instantly reappear anywhere within 25m. When they reappear, make a Resolve test (DN 3) for the warrior: if they fail, they suffer 1d3 Shock from the harrowing experience, and 1 Mortal Wound if a Complication was rolled.</p>' +
      '<p>The distance jumped may be increased; for every 10m of increased range, add +2 to the DN of the Resolve test that follows and +1 to the number of Mortal Wounds inflicted on a Complication.</p>' +
      '<p>Teleporting in this way is done instead of normal movement, and you may not Run or Sprint on a turn when you teleport.</p>'
  },
];

const lotn = [
  {
    ...simpleStub(20100, 'lotn',10,'Gauss Flayer', '5U', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapon', 48, 10, 1, -1, 2, 'Rapid Fire (2)'),
  },
  {
    ...simpleStub(20101, 'lotn',10,'Gauss Blaster', '6R', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapon', 48, 12, 1, -2, 2, 'Rapid Fire (2)'),
  },
  {
    ...simpleStub(20102, 'lotn',10,'Gauss Cannon', '7R', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapon', 48, 14, 2, -3, 3, 'Heavy'),
  },
  {
    ...simpleStub(20103, 'lotn',10,'Heavy Gauss Cannon', '8R', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapon', 72, 18, 1, -4, 1, 'Heavy'),
  },
  {
    ...simpleStub(20104, 'lotn',10,'Rod of Covenant', '7V', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapons', 24, 12, 1, -3, 1, 'Assault'),
    //...melee('', 1, 5, 1, -3, '')
  },
  {
    ...simpleStub(20105, 'lotn',10,'Staff of Light', '8V', 'Gauss,Necron', ''),
    ...simpleRange('Gauss Weapons', 24, 12, 1, -2, 3, 'Assault'),
    //...melee('', 1, 5, 1, -2, '')
  },
  {
    ...simpleStub(20110 , 'lotn',11,'Tesla Carbine', '5R', 'Tesla,Necron', ''),
    ...simpleRange('Tesla Weapon', 48, 12, 1, 0, 2, 'Assault,Tesla'),
    //Tesla : These weapons are designed to fire arcs  of energy that seem to bounce between  targets, creating chains of death that can  reduce entire squads to smoking ash.  Whenever one or more 6s are shifted to  damage after hitting with a Tesla weapon, up  to two other enemies within 4m of the original  target are also considered to be hit, so long as  their defense is equal to or less than that of the  original target. If the original target was a mob,  the mob is considered to have been hit three  times instead of only once. The weapon’s full  damage is dealt to all three targets, or three  times to a mob.
  },
  {
    ...simpleStub(20111 , 'lotn',11,'Particle Caster', '6R', 'Particle,Necron', ''),
    ...simpleRange('Particle Weapon', 24, 14, 1, 0, 1, 'Pistol'),
  },
  {
    ...simpleStub(20112 , 'lotn',11,'Synaptic Disintegrator', '7R', 'Necron', ''),
    ...simpleRange('Exotic Weapon', 48, 10, 1, 0, 1, 'Rapid Fire (1), Sniper (2)'),
  },
  {
    ...simpleStub(20113 , 'lotn',11,'Tachyon Arrow', '9V', 'Necron', ''),
    ...simpleRange('Exotic Weapon', 240, 20, 3, -5, '-', 'Assault'),
    // A Tachyon Arrow must be reloaded after each use, taking 1 hour and a successful DN 4 Tech test to do so.
  },
  {
    ...simpleStub(20114 , 'lotn',11,'Hyperphase Sword', '7R', 'Necron', ''),
    ...simpleMelee('Necron Weapon', 1, 6, 1, -3, 'Parry'),
  },
  {
    ...simpleStub(20115 , 'lotn',11,'Voidblade', '6R', 'Necron', ''),
    ...simpleMelee('Necron Weapon', 1, 5, 1, -3, ''),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Voidscythe', '9V', 'Necron,Two-Handed', ''),
    ...simpleMelee('Necron Weapon', 2, 8, 3, -4, 'Unwieldy (2)'),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Warscythe', '8V', 'Necron,Two-Handed', ''),
    ...simpleMelee('Necron Weapon', 1, 7, 2, -4, ''),
  },
  {
    ...simpleStub(20119, 'lotn',11,'Heavy Plating', '7R', 'Necron', ''),
    ...armour('Necron Armour', 5),
  },
  {
    ...simpleStub(20120, 'lotn',12,'Scaled Cloak', '8V', 'Necron', ''),
    ...armour('Necron Armour', 6),
  },
  {
    ...simpleStub(20121, 'lotn',12,'Phase Shifter', '7V', 'Necron', ''),
    ...armour('Necron Armour', 4, 'Force Shield'),
  },
  {
    ...simpleStub(20122, 'lotn',12,'Dispersion Shield', '8V', 'Necron', ''),
    ...armour('Necron Armour', 1, 'Force Shield, Shield'),
  },
  {
    ...simpleStub(20123, 'lotn',12,'Chronometron', '8L', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    description:
      '<p>Rarely carried by any but Crypteks who understand its arcane machinery, this device allows the bearer to warp the temporal fabric of reality, allowing those near the bearer to move slightly out of sync with the galaxy’s normal flow. Necrons within 6m of a Chronometron gain AV *3 with the Force Shield trait, and gain +1 to Defense. Additionally, once per combat, the bearer of a Chronometron may Seize the Initiative without spending glory.</p>',
  },
  {
    ...simpleStub(20124, 'lotn',12,'Canoptek Cloak', '8V', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    description:
      '<p>A specialized platform designed to carry aloft a Cryptek, a Necron with a Canoptek Cloak increases its Speed characteristic to 10, and may fly like a vehicle with the Hover trait. In addition, once per round as a free action, the user may select a vehicle within 6m with the Living Metal trait and make a DN 4 Tech test. It heals d6 wounds instead of d3 wounds that turn if successful.</p>',
  },
  {
    ...simpleStub(20125, 'lotn',12,'Dimensional Oubliette Generator', '7V', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    description:
      '<p>The possessor of this device can, at will, generate a dimensional oubliette, an extradimensional space that can hold a single individual Necron and its wargear. ' +
      'The Necron inside is undetectable by any means, but can see out. ' +
      'It cannot affect the outside world without fully exiting the oubliette. ' +
      'Only the character carrying the generator can enter the Oubliette, and only a Necron can survive inside the airless, hostile environment.</p>',
  },
  {
    ...simpleStub(20126, 'lotn',12,'Grav-Platform', '7V', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    snippet: 'Your speed increased by 10, and you may fly like a vehicle with the Hover trait. Considered Braced for Heavy Weapons.',
    description:
      '<p>Less a piece of wargear and more a permanent modification, a Grav Platform replaces the user’s lower half. ' +
      'The bearer’s Speed is increased to 10, and it may fly like a vehicle with the Hover trait. ' +
      'A Necron with a Grav-Platform is always considered to be braced for the purposes of firing heavy weapons.</p>',
  },
  {
    ...simpleStub(20127, 'lotn',12,'Phylactery', '8V', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    snippet: 'Your `Living Metal` ability heals 1d3 wounds instead of 1.',
    description:
      '<p>A small device that produces nano-scarabs that passively repair the bearer’s body, a Phylactery speeds up the natural healing of a Necron. ' +
      'A Necron with a Phylactery heals d3 wounds rather than 1 wound from its Living Metal ability each turn.</p>',
  },
  {
    ...simpleStub(20128, 'lotn',12,'Resurrection Orb', '9L', 'Necron', ''),
    type: 'Tools & Equipment',
    subtype: 'Necron Equipment',
    snippet: 'Activate as an Action once per session: All Necrons within 6m that are at 0 Wounds or dead my take a Defiance Check and, on success, resurect with 1d6 wounds remaining.',
    description:
      '<pAn arcane relic, this device releases a pulse of energy that can return destroyed and damaged Necrons to functionality, but it requires quite a long time to recharge. ' +
      'Once per session, the bearer of a Resurrection Orb may activate it as an action. ' +
      'When this occurs, all Necrons within 6m that are at 0 wounds or are dead may make an immediate Defiance check. ' +
      'If successful, they return to consciousness with d6 Wounds remaining, even if they were dead.</p>',
  },
];

const pax = [
  {
    ...simpleStub(13550, 'pax',355,'Charm', '1U', 'Apparel, Imperium, Adeptus Ministorum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>A charm is a keepsake, holy relic or good luck token that is intended to draw the benevolent eye of the Emperor to the wearer. They take a myriad of forms including such things as saintly finger bones, fragments of blessed bolter casings, water from holy rivers and even corpse hair woven into significant patterns. Throughout the Imperium, there is no shortage of folk that will sell such items to Acolytes, though discerning the true relics from the false is an almost impossible task (thus the cost of a charm is entirely up to the GM and how well the Acolyte can haggle with the seller).</p>' +
      '<p>Charms have no tangible benefits. However, when the adventure calls for something bad to happen to a random character, at the GMs discretion a character with a charm will be exempt. If all the characters carry charms (as all Emperor-fearing citizens should) then it is up to the GM to choose which charms are the most potent.</p>',
    snippet: 'Charms have no tangible benefits. However, when the adventure calls for something bad to happen to a random character, at the GMs discretion a character with a charm will be exempt. If all the characters carry charms (as all Emperor-fearing citizens should) then it is up to the GM to choose which charms are the most potent.',
  },{
    ...simpleStub(13571, 'pax',357,'Hive Leathers', '2U', 'Apparel, Imperium, Outcast, Scum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>Hive scum, gangers, and other outcasts of the underhive often sport leather vestments made from whatever sources are available. These leathers can be made from grox hide, human or mutant skin, or worse, but all are tailored to create a tough and threatening appearance.</p>' +
      '<p>At the GM’s discretion, Hive Leathers may allow, once per encounter, a re-roll of a failed Intimidate skill test.</p>',
    snippet: 'At the GM’s discretion, Hive Leathers may allow, once per encounter, a re-roll of a failed Intimidate skill test.',
  },
  {
    ...simpleStub(13610, 'pax',360,'Nobilite Robes', '8V', 'Apparel, Imperium, Navis Nobilite, Navigator', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>The majestic and regal robes of the Navis Nobilite blend function and form. Each is woven with the finest materials available throughout the Imperium that are exquisite and expensive far beyond even lesser nobles.</p>' +
      '<p>At the GM’s discretion, Nobilite Robes may grant a situational +1d bonus to a skill test (such as Cunning, Persuasion, Intimidation) or Influence tests when dealing with members of a Navis Nobilite house. Additionally, a character attempting to deceive another as belonging to the house may gain +2d to their Deception skill tests.</p>',
    snippet: 'At the GM’s discretion, Nobilite Robes may grant a situational +1d bonus to a skill test (such as Cunning, Persuasion, Intimidation) or Influence tests when dealing with members of a Navis Nobilite house. Additionally, a character attempting to deceive another as belonging to the house may gain +2d to their Deception skill tests.',
  },
  {
    ...simpleStub(13610, 'pax',361,'Outlandish Attire', '1U', 'Apparel, Imperium, Outcast, Scum', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>Weird, outlandish and striking even against the widely diverse attires worn by the Imperial citizenry, these outfits are designed intentionally to stand apart and draw the eye. Favored by performancers, entertainers, and ostentatious socialites alike, these clothes trade comfort and function for aesthetic appeal and bizarre motifs.</p>' +
      '<p>At the GM’s discretion, Outlandish Attire may grant a situational +1d bonus to a skill test (such as Deception, Persuasion, Intimidation). This bonus should only apply in the appropriate circumstances for the clothing’s intended purpose.</p>',
    snippet: 'At the GM’s discretion, Outlandish Attire may grant a situational +1d bonus to a skill test (such as Deception, Persuasion, Intimidation). This bonus should only apply in the appropriate circumstances for the clothing’s intended purpose.',
  },
  {
    ...simpleStub(13640, 'pax',364,'Trappings', '6C', 'Apparel, Imperium, <Any>', ''),
    type: 'Apparel',
    subtype: 'Imperial',
    description:
      '<p>The citizens of the Imperium wear a staggering range of clothing adorned with jewelry, iconography and other forms of adornment. All manner of styles imaginable exist to illustrate the role or importance of the individual. Individuals might wear bodygloves bedecked in a multitude of rings, the best in noble finery, wigs, tattoos, or religious sigils from any one of a thousand temples, depending on taste, profession, and background. All of the additional adornments that compromise a character’s appearance are collectively known as ‘trappings’.</p>' +
      '<p>Trappings of a certain faction grant a reroll of a single 1d6 in an Interaction skill test with a member of the faction possessing a similar Keyword. For instance, ecclesiarchy trappings would allow the reroll when attempting an Interaction Skill test against characters with the Adeptus Ministorum keyword.</p>',
    snippet: 'Trappings of a certain faction grant a reroll of a single 1d6 in an Interaction skill test with a member of the faction possessing a similar Keyword.',
  },
  {
    ...simpleStub(13770,'pax',377,'Adeptus Arbites Carapace Armour', '3V', 'Carapace, Imperium, Adeptus Arbites', ''),
    ...armour('Carapace',4,'Bulk (1)'),
  },
  {
    ...simpleStub(13780,'pax',378,'Judge Carapace Armour', '5R', 'Carapace, Imperium, Adeptus Arbites', ''),
    ...armour('Carapace',4,'Bulk (1)'),
  },
  {
    ...simpleStub(14280,'pax',428,'Lho-sticks', '2C', 'Narcotic, Imperium, Addictive, Astra Militarum, Lower Class', ''),
    type: 'Drugs',
    subtype: 'Stimulants',
    snippet: 'Consume to enter a relaxed state for 1d6 minutes.',
  },
  {
    ...simpleStub(15810,'pax',581,'Improvised Weapon', '1C', 'Low-Tech, Impact or Blade, Imperium, <Any>', ''),
    ...meleePax('Damage 2+1ED; AP 0; Range M; Steadfast'),
  },
  {
    ...simpleStub(15700,'pax',570,'Egerian Shard Glaive', '7V', 'Xenos, Blade, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage 4+1ED; AP -1; Range M; Agonizing, Crippling (1)', 'Alien Weapon'),
  },
  {
    ...simpleStub(15701,'pax',570,'Fractal Blade', '6V', 'Xenos, Blade, Power Field, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage 3+2ED; AP 0; Range M; Parry', 'Alien Weapon'),
    // Each time a Fractal Blade hits a target, even if it does not cause damage, it gains an armor penetration of -1. This can increase up to -3 in a single encounter, as the blade is sharpened through use.
  },
  {
    ...simpleStub(15702,'pax',570,'Galthite Lacerator', '5V', 'Xenos, Blade, Galthite, Imperium, Rogue Trader Fleet', ''),
    ...meleePax('Damage: 2+1ED; AP -1; Range M; Crippling (2), Penetrating (1)', 'Alien Weapon'),
  },
  {
    ...simpleStub(15840,'pax',584,'Staff', '2C', 'Low-Tech, Impact, Imperium, <Any>', ''),
    ...meleePax('Damage 3+1ED; AP 0; Range 2m; Steadfast, Two-Handed', 'Low-Tech Weapon'),
  },
];

const tea = [
  {
    ...simpleStub(30521,'tea',52,'Diagnostor Helm', '6V', 'Imperium,Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    subtype: 'Armour Upgrades/Attachments',
    snippet:
      'You add +1 bonus die to Medicae Tests to detect and diagnose diseases, injuries and ailments. ' +
      'You add +1 bonus die to Awareness and Investigation Tests to examine a corpse to determine cause of death. ' +
      'This does not stack with a normal diagnostor.',
    description:
      '<p>Issued to Apothecaries in place of their normal helmet, ' +
      'the Diagnostor Helm upgrades the already advanced hardware of a power armor helmet with a suite of medical sensors. ' +
      'In addition to the full suite of abilities granted by a power armor helm, a character ' +
      'wearing a diagnostor helm gains a +1d bonus to Medicae tests made to detect and diagnose diseases, ' +
      'injuries, and ailments, and to Awareness and Investigation tests made when examining a corpse to ' +
      'determine cause of death. This does not stack with a normal diagnostor.</p>',
  },
  {
    ...simpleStub(30530,'tea',53,'Narthecium', '6R', 'Imperium,Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    subtype: 'Armour Upgrades/Attachments',
    snippet:
      'Count as Medikit that may be used without penalty on fully armoured patients. ' +
      'Add +2 bonus die to Medicae Test on <Adeptus Astartes> characters. ' +
      'Also, you may instantly kill any helpless Marine using the build in Emperor´s peace.',
    description:
      '<p>Mounted on an Apothecary’s arm, the Narthecium includes a suite of tools, like micro-saws, injectors, extended surgical implements, ' +
      'flesh-grafts, and a drill designed to cut a hole in power armor, all for the purposes of field surgery. ' +
      'A character equipped with a Narthecium is considered to have a medikit, and may use Medicae on fully armored characters without removing the armor. ' +
      'The user also gains a +2d bonus to Medicae when attempting to heal a character with the Adeptus Astartes keyword. ' +
      'Finally, the Narthecium also incorporates a device known as The Emperor’s Peace, a spring-loaded piston that ' +
      'can be used to euthanize a marine too badly wounded to be savable. This device cannot be used in combat, but can instantly kill any helpless marine.</p>',
  },
  {
    ...simpleStub(30531,'tea',53,'Reductor', '5R', 'Imperium,Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    subtype: 'Armour Upgrades/Attachments',
    snippet:
      'Recover the gene-seeds with a DN 3 Medicae Test (The GM may apply bonus/penalty depending on state of the body and time since death.',
    description:
      '<p>A device mounted below the Narthecium, the Reductor has one use, and one alone--To recover the gene-seed of a fallen battle-brother. ' +
      'After drilling into the armor, the device is used to extract the progenoid glands found in the chest and neck of the dead marine, ' +
      'storing them in stasis vials contained within the reductor. ' +
      'Recovering gene-seed takes a DN 3 Medicae test, with penalties or bonuses depending on the state of the body or the time since death. ' +
      'Without a reductor, the test increases to DN 6, and the user must still have a medical kit and stasis vial in order to keep the gene-seed from spoiling before it can be cultivated. While a Reductor can hold up to 3 stasis vials at once, Apothecaries often carry more, especially if they expect heavy combat.</p>',
  },
  {
    ...simpleStub(30531,'tea',53,'Psychic Hood', '6V', 'Imperium,Adeptus Astartes', ''),
    type: 'Tools & Equipment',
    subtype: 'Armour Upgrades/Attachments',
    snippet: 'Add +1 bonus die to Deny the Witch tests. Reroll the first psycic test complication per combat.',
    description:
      '<p>This device attaches to the collar of a suit of power armor, surrounding the bearer’s ' +
      'helmet and granting him increased focus and control over his psychic might, ' +
      'as well as allowing him to more easily calm the tides of the warp around him. ' +
      'The wearer of a Psychic Hood gains a +1d bonus to Deny the Witch, ' +
      'and may reroll the first complication per combat he rolls on a psychic test.</p>',
  },
];

module.exports = [
  ...core,
  ...pax,
  ...lotn,
  ...aaoa,
  ...tea,
];

/*
Fusion Gun
Melta Bomb
Aeldari Jetbike
Lasblaster
 */
