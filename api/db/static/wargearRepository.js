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

const range = function (subtype, range, damageStatic, damageEd, ap, salvo, traits) {
  return {
    type: 'Ranged Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'range-weapon',
        range: range+'m',
        damage: {
          static: damageStatic,
          ed: damageEd,
        },
        ap: ap,
        salvo: salvo,
        traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
      }
    ],
  };
};

const melee = function (subtype, range, damageStatic, damageEd, ap, traits) {
  return {
    type: 'Malee Weapon',
    subtype: subtype,
    meta: [
      {
        type: 'malee-weapon',
        range: range <= 1 ? 'melee' : range+'m',
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

const lotn = [
  {
    ...simpleStub(20100, 'lotn',10,'Gauss Flayer', '5U', 'Gauss,Necron', ''),
    ...range('Gauss Weapon', 48, 10, 1, -1, 2, 'Rapid Fire (2)'),
  },
  {
    ...simpleStub(20101, 'lotn',10,'Gauss Blaster', '6R', 'Gauss,Necron', ''),
    ...range('Gauss Weapon', 48, 12, 1, -2, 2, 'Rapid Fire (2)'),
  },
  {
    ...simpleStub(20102, 'lotn',10,'Gauss Cannon', '7R', 'Gauss,Necron', ''),
    ...range('Gauss Weapon', 48, 14, 2, -3, 3, 'Heavy'),
  },
  {
    ...simpleStub(20103, 'lotn',10,'Heavy Gauss Cannon', '8R', 'Gauss,Necron', ''),
    ...range('Gauss Weapon', 72, 18, 1, -4, 1, 'Heavy'),
  },
  {
    ...simpleStub(20104, 'lotn',10,'Rod of Covenant', '7V', 'Gauss,Necron', ''),
    ...range('Gauss Weapons', 24, 12, 1, -3, 1, 'Assault'),
    //...melee('', 1, 5, 1, -3, '')
  },
  {
    ...simpleStub(20105, 'lotn',10,'Staff of Light', '8V', 'Gauss,Necron', ''),
    ...range('Gauss Weapons', 24, 12, 1, -2, 3, 'Assault'),
    //...melee('', 1, 5, 1, -2, '')
  },
  {
    ...simpleStub(20110 , 'lotn',11,'Tesla Carbine', '5R', 'Tesla,Necron', ''),
    ...range('Tesla Weapon', 48, 12, 1, 0, 2, 'Assault,Tesla'),
    //Tesla : These weapons are designed to fire arcs  of energy that seem to bounce between  targets, creating chains of death that can  reduce entire squads to smoking ash.  Whenever one or more 6s are shifted to  damage after hitting with a Tesla weapon, up  to two other enemies within 4m of the original  target are also considered to be hit, so long as  their defense is equal to or less than that of the  original target. If the original target was a mob,  the mob is considered to have been hit three  times instead of only once. The weapon’s full  damage is dealt to all three targets, or three  times to a mob.
  },
  {
    ...simpleStub(20111 , 'lotn',11,'Particle Caster', '6R', 'Particle,Necron', ''),
    ...range('Particle Weapon', 24, 14, 1, 0, 1, 'Pistol'),
  },
  {
    ...simpleStub(20112 , 'lotn',11,'Synaptic Disintegrator', '7R', 'Necron', ''),
    ...range('Exotic Weapon', 48, 10, 1, 0, 1, 'Rapid Fire (1), Sniper (2)'),
  },
  {
    ...simpleStub(20113 , 'lotn',11,'Tachyon Arrow', '9V', 'Necron', ''),
    ...range('Exotic Weapon', 240, 20, 3, -5, '-', 'Assault'),
    // A Tachyon Arrow must be reloaded after each use, taking 1 hour and a successful DN 4 Tech test to do so.
  },
  {
    ...simpleStub(20114 , 'lotn',11,'Hyperphase Sword', '7R', 'Necron', ''),
    ...melee('Necron Weapon', 1, 6, 1, -3, 'Parry'),
  },
  {
    ...simpleStub(20115 , 'lotn',11,'Voidblade', '6R', 'Necron', ''),
    ...melee('Necron Weapon', 1, 5, 1, -3, ''),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Voidscythe', '9V', 'Necron,Two-Handed', ''),
    ...melee('Necron Weapon', 2, 8, 3, -4, 'Unwieldy (2)'),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Warscythe', '8V', 'Necron,Two-Handed', ''),
    ...melee('Necron Weapon', 1, 7, 2, -4, ''),
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

module.exports = [
  ...core,
  ...pax,
  ...lotn,
];
