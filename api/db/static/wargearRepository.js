const source = {
  core: { book: 'Core Rules (v1.5)', key: 'core', version: 'v1.5' },
  core10: { book: 'Core Rules (v1.0)', key: 'core10', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha (v3)', sumplements: 'core', key: 'aaoa', version: 'v3', path: '/vault/an-abundance-of-apocrypha' },
  aaoa2: { book: 'An Abundance of Apocrypha (v2)', sumplements: 'core10', key: 'aaoa2', version: 'v2', path: '/vault/an-abundance-of-apocrypha' },
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
  'C': 'Common',
  'U': 'Uncommon',
  'R': 'Rare',
  'V': 'Very Rare',
  'L': 'Unique',
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const gear = function (sourceKey, sourcePage, name, value, keywords, stub = false) {
  const valuePart = value.match(/\d+/g)[0];
  const rarityPart = value.match(/[a-zA-Z]+/g)[0].toUpperCase();
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint: '',
    type: 'Misc',
    subtype: '',
    value: valuePart,
    rarity: rarity[rarityPart],
    keywords: keywords.split(',').map((k)=>k.trim()),
    stub: stub,
    meta: [],
  };
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
        type: 'ranged-weapon',
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

const toolz = function(subtype, snippet) {
  return {
    type: 'Tools & Equipment',
    subtype: subtype ? subtype : undefined,
    snippet
  };
}

const metaRange = function(static, ed, ap, range, salvo, traits) {
  return {
    type: 'ranged-weapon',
    range,
    damage: { static, ed },
    ap,
    salvo,
    traits,
  };
}

const rangez = function (subtype, damage, ed, ap, range, salvo, traits) {
  return {
    type: 'Ranged Weapon',
    subtype: subtype ? subtype : undefined,
    meta: [
      metaRange(damage, ed, ap, range < 1 ? 1 : range, salvo, traits ? traits.split(',').map((k)=>k.trim()) : []),
    ],
  };
};

const metaMelee = function(static, ed, ap, range, traits) {
  return {
    type: 'melee-weapon',
    range,
    damage: { static, ed },
    ap,
    traits,
  };
}

const meleez = function (subtype, damage, ed, ap, range, traits) {
  return {
    type: 'Melee Weapon',
    subtype: subtype ? subtype : undefined,
    meta: [
      metaMelee(damage, ed, ap, range < 1 ? 1 : range, traits ? traits.split(',').map((k)=>k.trim()) : []),
    ],
  };
};

/**
 * 16+2ED; AP -3; Range 48m; Salvo 1; Assault, Supercharge, WaaCardioproxy
 agh!
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

  return meleez(subtype, 1, damageStatic, damageEd, ap, traitString);
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


const core = [
  {
    ...gear('core',211,'Knife','2C','Blade,[Any]'),
    ...meleez(undefined,2,2,0,0),
  },
  {
    ...gear('core',211,'Psykana Mercy Blade','2C','Adeptus Astra Telephatica'),
    ...meleez(undefined,2,2,-1,0),
  },
  {
    ...gear('core',211,'Astartes Combat Knife','3U','Blade,Adeptus Astartes'),
    ...meleez(undefined,3,2,0,0,'Reliable'),
  },
  {
    ...gear('core',211,'Sword','3C','Blade,[Any]'),
    ...meleez(undefined,3,3,0,0,'Reliable'),
  },
  {
    ...gear('core',211,'Mono Knife','3U','Blade,Imperium,Scum'),
    ...meleez(undefined,3,2,-1,0,'Rending(1)'),
  },
  {
    ...gear('core',211,'Imperial Bludgeon','3U','[Any]'),
    ...meleez(undefined,4,2,0,0,'Brutal,Unwieldy(1)'),
  },
  {
    ...gear('core',213,'Chain Bayonet','3R','Chain,Imperium,Chaos'),
    ...meleez('Chain Weapon',4,1,0,0,'Brutal'),
  },
  { // not a real entry delete soon
    ...gear('core',213,'Chain Sword','4R','Chain,[Any]'),
    ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
  },
  {
    ...gear('core',213,'Chainsword','4R','Chain,[Any]'),
    ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
  },
  {
    ...gear('core',213,'Chain Axe','3R','Chain,Chaos'),
    ...meleez('Chain Weapon',5,4,0,0,'Brutal,Rending(1)'),
  },
  {
    ...gear('core',214,'Evisceractor','3R','Chain,2-Handed,Adeptus Astartes,Adeptus Ministorum,Adepta Sororitas'),
    ...meleez('Chain Weapon',6,6,-4,2,'Brutal,Unwieldy(2)'),
  },
  {
    ...gear('core',214,'Chain Fist','10V','Chain,Power Field,Imperium,Chaos,Adeptus Astartes'),
    ...meleez('Chain Weapon',7,6,-4,0,'Brutal,Unwieldy(3)'),
  },
  {
    ...gear('core',214,'Whip','2C','Primitive,[Any]'),
    ...meleez('Exotic Melee Weapon',1,1,0,4,'Agonising'),
  },
  {
    ...gear('core',214,'Neural Whip','5R','Exotic,Chaos,Inquisition'),
    ...meleez('Exotic Melee Weapon',3,2,-2,4,'Agonising'),
  },
  {
    ...gear('core',214,'Shock Whip','4V','Excotic,[Any]'),
    ...meleez('Exotic Melee Weapon',4,2,0,4,'Agonising,Rending(2)'),
  },
  {
    ...gear('core',214,'Shock Maul','5U','Exotic,Adeptus Arbites'),
    ...meleez('Exotic Melee Weapon',4,4,-1,0,'Agonising,Brutal'),
  },
  {
    ...gear('core',214,'Force Stave','2U','Primitive,[Any]'),
    ...meleez('Force Weapon',4,2,-1,2,'Brutal,Force'),
  },
  {
    ...gear('core',214,'Force Sword','6R','Force,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',5,4,-3,0,'Parry'),
  },
  {
    ...gear('core',214,'Force Axe','6V','Force,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',5,5,-2,0,'Force'),
  },
  {
    ...gear('core',214,'Nemesis Deamon Hammer','10L','Force,2-Handed,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',8,6,-3,2,'Brutal,Force,Unwieldy(2)'),
  },
  {
    ...gear('core',215,'Death Cult Power Blade','6V','Power Field,Imperium,Adeptus Ministorum'),
    ...meleez('Power Weapon',5,4,-2,0,'Parry'),
  },
  {
    ...gear('core',215,'Power Sword','5R','Power Field,Imperium,Aeldari'),
    ...meleez('Power Weapon',5,4,-3,0,'Parry'),
  },
  {
    ...gear('core',215,'Void Sabre','6V','Power Field,Aeldari,Anhrathe'),
    ...meleez('Power Weapon',5,4,-2,0,'Brutal,Parry'),
  },
  {
    ...gear('core',215,'Omnissian Axe','6V','Power Field,2-Handed,Imperium,Adeptus Mechanicus'),
    ...meleez('Power Weapon',5,5,-2,2),
  },
  {
    ...gear('core',215,'Power Axe','6R','Power Field,Imperium,Adeptus Mechanicus,Aeldari'),
    ...meleez('Power Weapon',5,5,-2,0, 'Rending(1)'),
  },
  {
    ...gear('core',215,'Power Fist','8V','Power Field,Imperium,Adeptus Astartes'),
    ...meleez('Power Weapon',5,5,-3,0, 'Brutal,Unwieldy(2)'),
  },
  {
    ...gear('core',215,'Thunder Hammer','8V','Power Field,2-Handed,Imperium,Adeptus Astartes,Inquisition'),
    ...meleez('Power Weapon',8,6,-3,2, 'Brutal,Unwieldy(2)'),
  },
  {
    ...gear('core',215,'Singing Spear','11L','Force,Aeldari,Asuryani'),
    ...meleez('Aeldari Weapon',6,5,0,2, 'Assault,Force,Warp Weapon,Thrown(STRx5)'),
  },
  {
    ...gear('core',215,'Witchblade','9R','Force,Aeldari,Asuryani'),
    ...meleez('Aeldari Weapon',6,5,0,0, 'Force,Parry,Warp Weapon'),
  },
  {
    ...gear('core',215,'Choppa','2C','Blade,Ork'),
    ...meleez('Ork Weapon',3,3,0,0, 'Reliable,Waaagh!'),
  },
  {
    ...gear('core',216,'Wierdboy Staff','5V','Force,2-Handed,Ork'),
    ...meleez('Ork Weapon',4,1,-1,2, 'Force,Waaagh!'),
  },
  {
    ...gear('core',216,'Chain Choppa','5V','Chain,Ork'),
    ...meleez('Ork Weapon',5,4,0,0, 'Brutal,Waaagh!'),
  },
  {
    ...gear('core',216,'Big Choppa','4R','Blade,2-Handed,Ork'),
    ...meleez('Ork Weapon',5,5,-1,0, 'Waaagh!'),
  },
  {
    ...gear('core',216,'Power Klaw','8V','Power Field,Ork'),
    ...meleez('Ork Weapon',6,5,-3,0, 'Brutal,Unwieldy(3)'),
  },
  {
    ...gear('core',216,'Bolt Pistol','4U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,12,1,'Brutal,Pistol'),
  },
  {
    ...gear('core',216,'Heavy Bolt Pistol','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',10,1,-1,12,1,'Brutal,Pistol'),
  },
  {
    ...gear('core',216,'Boltgun','6U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,24,2,'Brutal,Rapid Fire(2)'),
  },
  {
    ...gear('core',216,'Bolt Rifle','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',10,1,-1,30,2,'Brutal,Rapid Fire(2)'),
  },
  {
    ...gear('core',216,'Storm Bolter','6R','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,24,4,'Brutal,Heavy(3),Rapid Fire(2)'),
  },
  {
    ...gear('core',216,'Assault Bolter','8V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',12,2,-1,18,3,'Assault,Brutal'),
  },
  {
    ...gear('core',216,'Heavy Bolter','6U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',12,2,-1,36,3,'Brutal,Heavy(4)'),
  },
  {
    ...gear('core',221,'Laspistol','3C','Las,Imperium'),
    ...rangez('Las Weapon',7,1,0,12,1,'Pistol,Reliable'),
  },
  {
    ...gear('core',221,'Hot-Shot Laspistol','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',7,1,-2,6,1,'Pistol,Reliable'),
  },
  {
    ...gear('core',221,'Master-Crafted Laspistol','6V','Las,Imperium'),
    ...rangez('Las Weapon',10,1,0,12,1,'Pistol'),
  },
  {
    ...gear('core',221,'Lasgun','3C','Las,Imperium'),
    ...rangez('Las Weapon',7,1,0,24,2,'Rapid Fire(1),Reliable'),
  },
  {
    ...gear('core',222,'Hot-Shot Lasgun','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',7,1,-2,18,2,'Rapid Fire(1),Reliable'),
  },
  {
    ...gear('core',222,'Hot-Shot Volley Gun','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',10,1,-2,24,4,'Heavy(4),Reliable'),
  },
  {
    ...gear('core',222,'Long Las','6U','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',10,1,-2,24,0,'Sniper(1),Reliable'),
  },
  {
    ...gear('core',222,'Lascannon','9U','Las,Imperium'),
    ...rangez('Las Weapon',18,3,-3,48,1,'Heavy(4),Reliable'),
  },
  {
    ...gear('core',223,'Plasmapistol','6R','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,1,-3,12,1,'Pistol,Supercharge'),
  },
  {
    ...gear('core',223,'Plasma Gun','6R','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,1,-3,24,2,'Rapid Fire(1),Supercharge'),
  },
  {
    ...gear('core',223,'Plasma Cannon','7R','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,2,-3,36,3,'Heavy(8),Supercharge'),
  },
  {
    ...gear('core',223,'Inferno Pistol','6V','Melta,Imperium,Adeptus Astartes,Adepta Sororitas'),
    ...rangez('Melta Weapon',16,1,-4,6,1,'Melta,Pistol'),
  },
  {
    ...gear('core',223,'Meltagun','6R','Melta,Imperium'),
    ...rangez('Melta Weapon',16,2,-4,12,1,'Assault,Melta'),
  },
  {
    ...gear('core',224,'Multi-Melta','7V','Melta,Imperium'),
    ...rangez('Melta Weapon',16,3,-4,24,1,'Heavy(8),Melta'),
  },
  {
    ...gear('core',222,'Autopistol','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,12,2,'Pistol'),
  },
  {
    ...gear('core',222,'Hand Cannon','4C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',9,1,-1,12,1,'Pistol'),
  },
  {
    ...gear('core',222,'Autogun','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,24,3,'Rapid Fire(1)'),
  },
  {
    ...gear('core',222,'Stubber','2C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,12,3,'Pistol'),
  },
  {
    ...gear('core',222,'Needle Pistol','6V','Projectile,Imperium'),
    ...rangez('Projectile Weapon',8,2,0,12,1,'Agonising,Inflict(Poisoned 4),Pistol,Silent'),
  },
  {
    ...gear('core',222,'Stubcannon','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',9,1,0,18,1,'Brutal'),
  },
  {
    ...gear('core',222,'Shotgun','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',8,1,0,12,1,'Assault,Spread'),
  },
  {
    ...gear('core',223,'Combat Shotgun','3U','Projectile,Imperium'),
    ...rangez('Projectile Weapon',9,1,0,12,2,'Assault,Rapid Fire(1),Spread'),
  },
  {
    ...gear('core',223,'Astartes Shotgun','6R','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',10,1,0,12,2,'Assault,Spread,Reliable'),
  },
  {
    ...gear('core',223,'Needle Rifle','6V','Projectile,Imperium'),
    ...rangez('Projectile Weapon',8,2,0,28,2,'Agonising,Inflict(Poisoned 4),Silent'),
  },
  {
    ...gear('core',223,'Heavy Stubber','5U','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',10,2,0,36,3,'Heavy(4)'),
  },
  {
    ...gear('core',223,'Astartes Sniper Rifle','6U','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',10,1,0,36,0,'Sniper(2)'),
  },
  {
    ...gear('core',223,'Assault Cannon','6U','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',14,2,-1,24,6,'Heavy(8)'),
  },
  {
    ...gear('core',223,'Autocannon','5C','Projectile,Imperium'),
    ...rangez('Projectile Weapon',16,1,-1,48,3,'Heavy(8)'),
  },
  {
    ...gear('core',224,'Hand Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',10,1,0,6,1,'Blast(Small),Inflict(On Fire),Pistol,Spread'),
  },
  {
    ...gear('core',224,'Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',10,1,0,8,1,'Blast(Medium),Inflict(On Fire),Spread'),
  },
  {
    ...gear('core',224,'Heavy Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',12,2,-1,8,2,'Blast(Large),Inflict(On Fire),Heavy(6),Spread'),
  },
  {
    ...gear('core',224,'Arc Pistol','5R','Arc,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,1,-1,12,1,'Arc(2),Pistol'),
  },
  {
    ...gear('core',224,'Radium Pistol','6R','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',7,1,0,12,1,'Pistol,Rad(2)'),
  },
  {
    ...gear('core',224,'Galvanic Rifle','5R','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',10,1,0,30,2,'Rapid Fire(1),Rending(1)'),
  },
  {
    ...gear('core',224,'Arc Rifle','6R','Arc,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,1,-1,24,2,'Arc(2),Rapid Fire(1)'),
  },
  {
    ...gear('core',224,'Radium Carbine','6V','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',7,1,0,18,3,'Assault,Rad(2)'),
  },
  {
    ...gear('core',224,'Volkite Blaster','11L','Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,2,0,24,2,'Blast(Small),Heavy(4),Inflict(On Fire),Rapid Fire(2)'),
  },
  {
    ...gear('core',224,'Frag Grenade','2C','Explosive,Imperium'),
    ...rangez('Grenade & or Missile Weapon',10,4,0,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
  },
  {
    ...gear('core',225,'Plasma Grenade','7V','Explosive,Aeldari'),
    ...rangez('Grenade & or Missile Weapon',10,5,-1,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
  },
  {
    ...gear('core',225,'Krak Grenade','4U','Explosive,Imperium'),
    ...rangez('Grenade & or Missile Weapon',14,5,-2,'*','-','Blast(Small),Thrown(STRx4),Launcher'),
  },
  {
    ...gear('core',225,'Militarum Tempestus Grenade Launcher','6U','Explosive,Imperium,Astra Militarum'),
    ...rangez('Grenade & or Missile Weapon','*','*','*',28,'-','Assault'),
  },
  {
    ...gear('core',225,'Frag Missile','4C','Explosive,Imperium,[Any]'),
    ...rangez('Grenade & or Missile Weapon',10,5,0,'*','-','Blast(Large),Launcher'),
  },
  {
    ...gear('core',225,'Krak Missile','6C','Explosive,Imperium'),
    ...rangez('Grenade & or Missile Weapon',16,6,-2,'*','-','Blast(Medium),Launcher'),
  },
  {
    ...gear('core',225,'Missile Launcher','6U','Explosive,Imperium'),
    ...rangez('Grenade & or Missile Weapon','*','*','*',48,'-','Heavy(6)'),
  },
  {
    ...gear('core',225,'Cyclone Missile Launcher','11V','Explosive,Imperium,Adeptus Astartes'),
    ...rangez('Grenade & or Missile Weapon','*','*','*',36,'-','Heavy(8)'),
  },
  {
    ...gear('core',225,'Lasblaster','5V','Las,Aeldari'),
    ...rangez('Aeldari Weapon',7,1,0,24,4,'Assault'),
  },
  {
    ...gear('core',225,'Shuriken Catapult','6R','Shuriken,Aeldari,Asuryani'),
    ...rangez('Aeldari Weapon',10,1,0,12,3,'Assault,Rending(3)'),
  },
  {
    ...gear('core',226,'Shuriken Pistol','6R','Shuriken,Aeldari,Asuryani'),
    ...rangez('Aeldari Weapon',10,1,0,12,3,'Pistol,Rending(3)'),
  },
  {
    ...gear('core',226,'Ranger Long Rifle','7V','Las,Aeldari'),
    ...rangez('Aeldari Weapon',10,1,0,36,'-','Sniper(2)'),
  },
  {
    ...gear('core',226,'Fusion Gun','6V','Melta,Aeldari'),
    ...rangez('Aeldari Weapon',16,2,-4,12,1,'Assault,Melta'),
  },
  {
    ...gear('core',226,'Slugga','3C','Projectile,Ork'),
    ...rangez('Ork Weapon',10,1,0,12,1,'Pistol,Waaagh!'),
  },
  {
    ...gear('core',226,'Shoota','4U','Projectile,Ork'),
    ...rangez('Ork Weapon',10,1,0,18,2,'Assault,Waaagh!'),
  },
  {
    ...gear('core',226,'Burna','5U','Fire,Ork'),
    type: 'Ranged Weapon',
    subtype: 'Ork Weapon',
    meta: [
      metaRange(10,1,0,8,1,['Assault','Blast(Small)','Inflict(On Fire)','Spread']),
      metaMelee(7,1,-2,0,['Inflict(On Fire)']),
    ],
  },
  {
    ...gear('core',226,'Big Shoota','5U','Projectile,Ork'),
    ...rangez('Ork Weapon',12,2,0,36,3,'Assault,Waaagh!'),
  },
  {
    ...gear('core',227,'Snazzgun','8L','Ork'),
    ...rangez('Ork Weapon',12,2,-2,24,3,'Heavy(4),Kustom'),
  },
  {
    ...gear('core',227,'Rokkit Launcher','7R','Explosive,Ork'),
    ...rangez('Ork Weapon',16,'1d3',-2,24,3,'Blast(Small)'),
  },
  {
    ...gear('core',227,'Stikkbomb','2U','Explosive,Ork'),
    ...rangez('Ork Weapon',7,1,0,'*','-','Blast(Medium),Trown(STRx4),Launcher'),
  },
  // Weapon Upgrades
  {
    ...gear('core',227,'Ammo Drum','3C','Imperium,Scum'),
    type: 'Weapon Upgrade',
    snippet: 'You can carry 1 additional Reload.',
  },
  {
    ...gear('core',227,'Autoloader','5R','Imperium'),
    type: 'Weapon Upgrade',
    snippet: 'You can Reload your weapon as a Free Action.',
  },
  {
    ...gear('core',227,'Bayonet Lung','1C','[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Bayonet',
    snippet: 'You can use this weapon as a Knife (p. 211).',
  },
  {
    ...gear('core',227,'Chain Bayonet','4R','Imperium,Chaos'),
    key: 'core-weapon-upgrade-chain-bayonet',
    type: 'Weapon Upgrade',
    upgradeType: 'Bayonet',
    snippet: 'You can use this weapon as a Chain Bayonet (p. 213).',
  },
  {
    ...gear('core',227,'Combi Weapon','6R','Imperium,Chaos,Scum'),
    type: 'Weapon Upgrade',
    snippet: 'You may fire the both Weapons as a Multi-Action.',
    description:
      '<p>A combi-weapon may be fired as either or both of its component weapons each round. Firing both component weapons is treated as a Multi-Action.</p>' +
      '<p>You must own the two ranged weapons you want to combine when you purchase this upgrade. Pistols can only be combined with other Pistols, and weapons with the Heavy Trait cannot take this upgrade.</p>',
  },
  {
    ...gear('core',228,'Distinction','5U','[Any]'),
    type: 'Weapon Upgrade',
    snippet: '+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon.',
    description:
      '<p>+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon. Distinction does not count toward a weapon’s maximum number of upgrades.</p>',
  },
  {
    ...gear('core',228,'Duelling Grip','3U','[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Grip',
    snippet: '+1 bonus die on Attack Tests using this weapon.',
    description: '<p>+1 bonus die on Attack Tests using this weapon. This upgrade can only be applied to Pistols or onehanded melee weapons.</p>',
  },
  {
    ...gear('core',228,'Gene-Grip Bio-Verator','5R','Imperium'),
    type: 'Weapon Upgrade',
    upgradeType: 'Grip',
    snippet: 'Any mechanisms your weapon has (triggers, chain engines, etc.) will not activate for anyone but you.',
  },
  {
    ...gear('core',228,'Mastercrafted','7V','[Any]'),
    type: 'Weapon Upgrade',
    snippet: 'The weapon gains the Reliable Trait. You gain +2 bonus dice to any Attack Test made with this weapon.',
  },
  {
    ...gear('core',228,'Megathoule Accelerator (Lucius Pattern)','6V','Imperium,Astra Militarum'),
    type: 'Weapon Upgrade',
    snippet: 'The weapon gains +2 Damage. The weapon loses the Reliable Trait.',
  },
  {
    ...gear('core',228,'Monoscope','4R','Imperium,Astra Militarum'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: 'Any Range penalties are reduced by 2.',
  },
  {
    ...gear('core',228,'Percussive Muzzle Brake','3U','[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Muzzle',
    snippet: 'The weapon gains +1 Salvo. This upgrade can only be applied to a weapon with the Heavy Trait.',
  },
  {
    ...gear('core',228,'Preysense Sight','6R','Imperium,Scum,[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: 'This weapon upgrade allows the wielder to detect targets via ambient heat, even in total darkness.',
  },
  {
    ...gear('core',228,'Red-Dot Sight','5U','Imperium,Scum'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: '+1 bonus die to ranged attacks made with this weapon.',
  },
  {
    ...gear('core',229,'Silencer','3U','Imperium,Scum,[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Muzzle',
    snippet: 'The weapon gains the Silent Trait. This upgrade can only be applied to a weapon with the BOLT or PROJECTILE Keywords.',
  },
  // Ammo
  {
    ...gear('core',229,'Ammo Backpack','5U','[Any]'),
    type: 'Ammo',
    subtype: 'Ammo Container',
    snippet: 'You can carry 10 additional Reloads.',
  },
  {
    ...gear('core',229,'Bandolier','5C','[Any]'),
    type: 'Ammo',
    subtype: 'Ammo Container',
    snippet: 'You can carry 2 additional Reloads.',
  },
  {
    ...gear('core',230,'Dragonfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: 'The Weapon gains the Spread trait. The weapon ignores Defence bonuses from cover.',
  },
  {
    ...gear('core',230,'Hellfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: '+3 ED against organic targets. +2 ED against inorganic targets.',
  },
  {
    ...gear('core',231,'Kraken Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: 'AP -2',
  },
  {
    ...gear('core',231,'Bleeder Rounds','5U','Imperium,Scum'),
    type: 'Ammo',
    subtype: 'Special Projectile Ammo',
    snippet: 'You can Shift an Exalted Icon when you make an Attack Test with this weapon to inflict the Bleeding Condition.',
  },
  {
    ...gear('core',231,'Dumdum Bullets','4U','Imperium,Scum'),
    type: 'Ammo',
    subtype: 'Special Projectile Ammo',
    snippet: '+1 ED',
  },
  // Armour
  {
    ...gear('core',232,'Primitive Armour','2C','Heavy,Primitive'),
    ...armour('Imperial Armour',2,'Bulk(2)'),
  },
  {
    ...gear('core',232,'Bodyglove','3R','Light,Imperium,Adeptus Ministorum'),
    ...armour('Imperial Armour',2),
  },
  {
    ...gear('core',232,'Mesh Armour','3R','Light,Imperium,[Any]'),
    ...armour('Imperial Armour',3),
  },
  {
    ...gear('core',232,'Flak Armour','4C','Flak,Imperium,Astra Militarum'),
    ...armour('Imperial Armour',3),
  },
  {
    ...gear('core',232,'Skitarri Auto-Cuirass','5R','Heavy,Imperium,Adeptus Mechanicus,Skitarii'),
    ...armour('Imperial Armour',4),
  },
  {
    ...gear('core',232,'Carapace Armour','5U','Imperium,Adeptus Astartes,Astra Militarum'),
    ...armour('Imperial Armour',4,'Bulk(1)'),
  },
  {
    ...gear('core',232,'Tempestus Carapace','6R','Heavy,Imperium,Astra Militarum,Militarum Tempestus'),
    ...armour('Imperial Armour',4),
  },
  {
    ...gear('core',234,'Light Power Armour','6V','Powered,Imperium'),
    ...armour('Powered Armour',4, 'Powered(1)'),
  },
  {
    ...gear('core',234,'Sororitas Power Armour','6V','Powered,Imperium,Adepta Sororitas'),
    ...armour('Powered Armour',5, 'Powered(2)'),
  },
  {
    ...gear('core',234,'Ignatus Power Armour','7V','Powered,Imperium,Inquisition'),
    ...armour('Powered Armour',5, 'Powered(2)'),
  },
  {
    ...gear('core',234,'Heavy Power Armour','8V','Heavy,Powered,Imperium,Inquisition'),
    ...armour('Powered Armour',6, 'Bulk(1),Cumbersome,Powered(3)'),
  },
  {
    ...gear('core',234,'Storm Shield','8L','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum,Inquisition'),
    ...armour('Power Fields',2, 'Bulk(1),Shield,Power Field'),
  },
  {
    ...gear('core',234,'Refractor Field','5R','Force Field,Imperium,Astra Militarum'),
    ...armour('Power Fields',3, 'Power Field'),
  },
  {
    ...gear('core',234,'Rosarius','7V','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum'),
    ...armour('Power Fields',4, 'Power Field'),
  },
  {
    ...gear('core',234,'Scout Armour','5R','Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',4),
  },
  {
    ...gear('core',234,'Aquila Mk VII','8V','Powered,Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',5,'Powered(3)'),
  },
  {
    ...gear('core',235,'Tacticus Mk X','9V','Powered,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...armour('Astartes Armour',5,'Powered(4)'),
  },
  {
    ...gear('core',235,'Terminator Armour','10L','Powered,Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',7,'Powered(4),Cumbersome'),
  },
  {
    ...gear('core',235,'Corsair Armour','4R','Light,Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',3),
  },
  {
    ...gear('core',235,'Aeldari Mesh Armour','4V','Light,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',3),
  },
  {
    ...gear('core',235,'Rune Armour','6L','Force Field,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',4,'Power Field'),
  },
  {
    ...gear('core',235,'Heavy Mesh Armour','6V','Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',4),
  },
  {
    ...gear('core',235,'Voidplate Harness','7R','Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',5,'Bulk(2)'),
  },
  {
    ...gear('core',235,'Shimmershield','7R','Force Field,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',2,'Power Field,Shield'),
  },
  // Armour - Ork Armour
  {
    ...gear('core',235,'Ork Flak','2U','Primitive,Ork'),
    ...armour('Ork Armour',2),
  },
  {
    ...gear('core',235,'\'Eavy Armour','3U','Heavy,Primitive,Ork'),
    ...armour('Ork Armour',4,'\Ere We Go,Bulk(1)'),
  },
  {
    ...gear('core',235,'Mega Armour','9V','Powered,Ork'),
    ...armour('Ork Armour',7,'\Ere We Go,Cumbersome,Powered(4)'),
  },
  // Tools & Equipment
  {
    ...gear('core',236,'9-70 Entrenching Tool','2C','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','Dig trenches, foxholes, and other earthen fortifications.'),
    description: '<p>A 9-70 entrenching tool halves the time needed to dig trenches, foxholes, and other earthen fortifications. It also makes for a sturdy improvised weapon, as many a Guardsman can attest.</p>'
  },
  {
    ...gear('core',236,'Auspex','5R','Imperium,Adeptus Mechanicus'),
    ...toolz('Imperial Equipment','Activated as a Combat Action to detect energy emissions, motion, and other life signs within 50 metres.'),
  },
  {
    ...gear('core',236,'Auto-Quill','3U','Imperium'),
    ...toolz('Imperial Equipment','+2 bonus dice to Tests to forge or alter documents.'),
  },
  {
    ...gear('core',236,'Ballistic Appeasement Autoreliquary (Absolutis Pattern)','6V','Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...toolz('Imperial Equipment','Clear a jammed weapon as a Free Action.'),
  },
  {
    ...gear('core',236,'Clothing','1C','Imperium'),
    ...toolz('Imperial Equipment','Common Clothing, nothing Special.'),
  },
  {
    ...gear('core',236,'Clothing, Uncommon','1U','Imperium'),
    ...toolz('Imperial Equipment','Common Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear('core',236,'Clothing, Rare','1R','Imperium'),
    ...toolz('Imperial Equipment','Rare Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear('core',236,'Clothing, Very Rare','1V','Imperium'),
    ...toolz('Imperial Equipment','Very Rare Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear('core',236,'Clombi-Tool','3U','[Any]'),
    ...toolz('Universal Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Imperial technology.'),
  },
  {
    ...gear('core',236,'Cameleoline Cloak','5R','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Stealth (A) Tests and +1 to Defence when in shadow or cover.'),
  },
  {
    ...gear('core',237,'Chaplet Ecclesiasticus','3U','Imperium,Adeptus Ministorum,Adepta Sororitas'),
    ...toolz('Imperial Equipment','The Chaplet can be used as a Symbol of Authority (p.240) or, if necessary a garrote.'),
  },
  {
    ...gear('core',237,'Chrono','2C','[Any]'),
    ...toolz('Universal Equipment','Settings on the chrono’s display allow for the accurate tracking of Imperial standard, shipboard, and local planetary time.'),
  },
  {
    ...gear('core',237,'Data-Slate','2C','[Any]'),
    ...toolz('Universal Equipment','You can record any information transferable from a cogitator, such as local maps, familial records, or manufactorum outputs, onto your Data-Slate.'),
  },
  {
    ...gear('core',237,'Diagnostor','5R','Imperium'),
    ...toolz('Imperial Equipment','+1 bonus die to Medicae (Int) Tests to detect and diagnose diseases, injuries, and ailments, and to determine cause of death.'),
  },
  {
    ...gear('core',237,'Grav-Chute','5R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','You can hover or control a fall for up to one hour. You can recharge the Grav-Chute’s solar battery by leaving it in sunlight for one hour.'),
  },
  {
    ...gear('core',237,'Grav-Chute','2C','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+1 bonus die to Survival (Wil) tests made to find food and water.'),
  },
  {
    ...gear('core',237,'Jump Pack','7R','[Any]'),
    ...toolz('Universal Equipment','Pilot Test to fly at double speed. Fail and Scatter, suffering 1d3 shock on a complication.'),
    description: '<p>You can fly at double your Speed by making a Pilot (A) Test, ignoring any terrain. If you fail the Pilot (A) Test, your movement deviates according to the Scattering (p.186) rules. A Complication triggers a crash, which deals a minimum of 1d3 Shock.</p>',
  },
  {
    ...gear('core',237,'Magnoculars','2U','[Any]'),
    ...toolz('Universal Equipment','Awareness (Int) Tests made with Magnoculars suffer no penalties for distance.'),
  },
  {
    ...gear('core',238,'Medikit','3U','[Any]'),
    ...toolz('Universal Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124).'),
  },
  {
    ...gear('core',238,'Chirurgeon\'s Tools','5R','Imperium,Adepta Sororitas'),
    ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). +2 bonus dice to Medicae (Int) Tests when a character is Dying.'),
  },
  {
    ...gear('core',238,'Martyr\'s Gift Medkit','6R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Includes a standard augmetic replacement for any lost limb or eye (p.242); the augmetic is temporary, and becomes useless after 24 hours. The subcutaneous frag charge has the same damage profile as a Frag Missile (p.220).'),
  },
  {
    ...gear('core',238,'Missionary Kit','2U','Imperium,Adeptus Ministorum'),
    ...toolz('Imperial Equipment','+1 bonus die to Persuasion (Fel) Tests made involving converts to the Imperial Creed and those seeking redemption through the grace of the God-Emperor.'),
  },
  {
    ...gear('core',238,'Periculum Kit','5R','Imperium,[Any]'),
    ...toolz('Imperial Equipment','A Periculum Kit contains: * Chrono * Data-Slate * Magnoculars * 2 Ration Packs * Respirator * Vox-bead.'),
  },
  {
    ...gear('core',238,'Preysense Goggles','5R','[Any]'),
    ...toolz('Universal Equipment','You ignore any penalties to Tests due to visual conditions.'),
  },
  {
    ...gear('core',238,'Psychic Focus','3R','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Psychic Mastery (Wil) Tests.'),
  },
  {
    ...gear('core',238,'Ration Packs','1C','[Any]'),
    ...toolz('Universal Equipment','Nomnomnom...'),
  },
  {
    ...gear('core',239,'Respirator','2U','[Any]'),
    ...toolz('Universal Equipment','A Respirator canister lasts for 2 hours of continuous breathing. Whilst breathing through the Respirator, you are immune to breathable poisons and toxic atmospheres.'),
  },
  {
    ...gear('core',239,'Rule Of The Sororitas','2U','[Any]'),
    ...toolz('Imperial Equipment','If you have the ADEPTA SORORITAS Keyword, you can read the Rule of Sororitas as part of a Respite to recover 1d3 Shock.'),
  },
  {
    ...gear('core',239,'Sacred Machine Oil','3U','Imperium,Adeptus Mechanicus'),
    ...toolz('Imperial Equipment','You ignore the first Complication involving Imperial technology in any scene (including combat).'),
  },
  {
    ...gear('core',239,'Slate Monitron','5R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+2 bonus dice to Medicae (Int) Tests made to heal your Wounds.'),
  },
  {
    ...gear('core',239,'Stimm','3U','Imperium,Scum'),
    ...toolz('Imperial Equipment','Can be used as part of a Medicae (Int) Test to restore 1d3 + 3 Shock.'),
  },
  {
    ...gear('core',239,'Survival Kit','3U','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to all Survival (Wil) Tests.'),
  },
  {
    ...gear('core',240,'Symbol Of Authority','3U','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Leadership (Wil) and Intimidation (Wil) Tests versus targets who would respect your position.'),
  },
  {
    ...gear('core',240,'Uplifting Primer','2C','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+1 bonus die to Scholar (Int) Test. A Complication on the Test means that the user learns potentially dangerous misinformation as determined by the GM.'),
  },
  {
    ...gear('core',240,'Void Suit','5R','[Any]'),
    ...toolz('Universal Equipment','Protects the wearer from the vacuum of space, with enough oxygen for five hours of continuous use. Includes a Vox Caster.'),
  },
  {
    ...gear('core',240,'Vox Bead','3U','[Any]'),
    ...toolz('Universal Equipment','You can communicate with anyone within 1,000 metres (one kilometer) that has a vox unit tuned to the same frequency.'),
  },
  {
    ...gear('core',240,'Vox Caster','3R','[Any]'),
    ...toolz('Universal Equipment','You can communicate with anyone within 100,000 metres (100 kilometers) that has a vox unit.'),
  },
  {
    ...gear('core',240,'Writing Kit','2C','Imperium'),
    ...toolz('Imperial Equipment','A kit to write stuff'),
  },
  {
    ...gear('core',241,'Bonesinger Shard','6R','Aeldari'),
    ...toolz('Aeldari Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Aeldari technology.'),
  },
  {
    ...gear('core',241,'Spirit Stone','7V','Aeldari'),
    ...toolz('Aeldari Equipment','If an Aeldari dies while wearing a Spirit Stone, the Stone immediately absorbs the soul and stores it safely and secretly inside.'),
  },
  {
    ...gear('core',241,'Webway Keystone','7L','Aeldari'),
    ...toolz('Aeldari Equipment','You can make a DN 5 Tech (Int) Test to activate either of the following effects: (a) Detect the distance and orientation of the nearest Webway portal. (b) Open or close a Webway portal within 30 metres. Large or complex gates have higher DNs.'),
  },
  {
    ...gear('core',241,'Ammo Runt','5U','Ork'),
    ...toolz('Ork Equipment',''),
  },
  {
    ...gear('core',241,'Dok\s Toolz','5V','Ork'),
    ...toolz('Ork Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Only usable for Ork biology. Whenever you roll a Complication whilst using a Dok Bag, the target suffers either 1 Wound or 1 Shock, whichever is funnier.'),
  },
  {
    ...gear('core',241,'Mek Toolz','5U','Ork'),
    ...toolz('Ork Equipment','Functions as a Combi-Tool (p.236) for Ork technology. Mek Toolz can be used to dismantle and other technology and reassemble it into Ork Wargear of an equal or lesser Value and Rarity. This re-assembly requires a Tech (Int) Test with a DN equal to the Value of the Ork Wargear you are creating, and takes a number of hours equal to the Value of the Wargear you are creating.'),
  },
  // Augments
  {
    ...gear('core',243,'Augmetic Arm','4R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +1 Strength per Augmetic Arm.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
  },
  {
    ...gear('core',243,'Augmetic Eye (Auger)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: '+1 bonus die to sight-based Awareness (Int) Tests.',
  },
  {
    ...gear('core',243,'Augmetic Eye (Night)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'Acts as Preysense Goggles (p.238).',
  },
  {
    ...gear('core',243,'Augmetic Eye (Pict Recorder)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'Can record up to 1 hour of video or 86,400 still images.',
  },
  {
    ...gear('core',243,'Augmetic Eye (Reticule)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: '+1 bonus die to ranged Attack Tests.',
  },
  {
    ...gear('core',243,'Augmetic Eye (Telescope)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You ignore any penalties related to visual distance.',
  },
  {
    ...gear('core',243,'Augmetic Legs','4R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +2 Speed and add 2 metres to any jump.',
    modifications: [ { targetGroup: 'traits', targetValue: 'speed', modifier: 2 } ],
  },
  {
    ...gear('core',244,'Augmetic Respirator','5R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +1 bonus die to Toughness Tests to resist toxic gasses and airborne poisons or diseases. You can hold your breath for twice as long, which doubles how long the air in a Void Suit or similar equipment lasts.',
  },
  {
    ...gear('core',244,'Augmetic Viscera','5V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +2 Toughness.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 2 } ],
  },
  {
    ...gear('core',244,'Auger Array (Auspex)','4R','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You have an Auspex (p.236) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
  },
  {
    ...gear('core',244,'Auger Array (Diagnostor)','4R','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You have a Diagnostor (p.237) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
  },
  {
    ...gear('core',244,'Cardioproxy','6L','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Toughness.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ],
  },
  {
    ...gear('core',244,'Cortex Implant','7V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Intellect.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 } ],
  },
  {
    ...gear('core',244,'Mechadendrites (Ballistic)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Laspistol (p.217). Your biology powers the weapon, so it does not use Ammo or need to be Reloaded.',
  },
  {
    ...gear('core',245,'Mechadendrites (Exploration)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as an Auspex (p.236). +1 bonus die to Survival (Wil) Tests to navigate or track.',
  },
  {
    ...gear('core',245,'Mechadendrites (Medicae)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Medikit and a Diagnostor (p.238 & p.237). +1 bonus die to Medicae (Int) Tests. Can be used to inject toxins, sedatives, and stimulants in combat as a Simple Injecting an unwilling target requires an Opposed Initiative Test.',
  },
  {
    ...gear('core',245,'Mechadendrites (Optical)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Pict Recorder and Magnoculars (p.237). +1 bonus die to Awareness (Int) Tests; allows you to make microscopic examinations.',
  },
  {
    ...gear('core',245,'Mechadendrites (Servo-Arm)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'You gain +4 Strength when using the arm. In combat, the arm allows you to Brace (p.189) as a Free Action. You can use the arm as a melee weapon with the following profile: Damage 6+2ED, AP-3, Unwieldy(2)',
  },
  {
    ...gear('core',245,'Mechadendrites (Utility)','5R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Combi-Tool (p.236). +1 bonus die to Tech (Int) Tests.',
  },
  {
    ...gear('core',245,'Mind Impulse Unit','6R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You can converse with a machine spirit as an Action; this may require a Tech (Int) Test for unruly spirits. If you succeed, you gain +Double Rank bonus dice to all Tests to operate the machine.',
  },
  {
    ...gear('core',245,'Neuroplastic Psychosectemy','7L','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Intellect and +1 Willpower but suffer −2 Fellowship.',
    modifications: [
      { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 },
      { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 },
      { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -2 },
    ],
  },
  {
    ...gear('core',246,'Reflex Catalyst','6V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Initiative.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ],
  },
  {
    ...gear('core',246,'Sinew Armature','6V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Strength.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
  },
  {
    ...gear('core',246,'Subdermal Armour','6R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Base Resilience.',
    modifications: [ { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 } ],
  },
  {
    ...gear('core',246,'Weapon Implant','3R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Value is 3+ Weapoin Value. Augmetic Arm Weapon Implant (p.246).',
  },
  {
    ...gear('core',246,'Eyes Of The Crone','5V','Aeldari'),
    type: 'Augmetics', subtype: 'Aeldari Augmetics',
    snippet: 'A single Eye of the Crone can have two different Augmetic Eye effects (p.243).',
  },
  {
    ...gear('core',246,'Heart Of Vaul','7L','Aeldari'),
    type: 'Augmetics', subtype: 'Aeldari Augmetics',
    snippet: 'You gain +1 to Defence and Armour in addition to any armour or shield you have.',
  },
  {
    ...gear('core',247,'Iron Gob','3R','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'You gain +1 Armour (this stacks with worn Armour) and +1 bonus die to Intimidation (Wil) Tests. You can make a melee bite attack with a Damage of 6 +2 ED.',
  },
  {
    ...gear('core',247,'Iron Gutz','5V','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'You gain +2 bonus dice to Tests to resist ingested poisons. You can automatically find food to subsist you in any environment.',
  },
  {
    ...gear('core',247,'Rebuild Cranium','6V','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'Roll 1d3 at the start of each session. Your Intellect Attribute increases by the result. You may spend a point of Wrath to reroll the 1d3 at any time. The GM may force a reroll of the 1d3 under circumstances that could cause the bionik to malfunction.',
  },
];

const aaoa = [
  // AAOA v3
  {
    ...gear('aaoa',140,'Hekatarii Blade','5R','Blade,Drukhari'),
    ...meleez('Drukhari Melee Weapon',3,3,-1,1,'Parry,Rending(1)'),
  },
  {
    ...gear('aaoa',142,'Absolvor Bolt Pistol','8V','Bolt, Imperium, Adeptus Astartes, Primaris'),
    ...rangez('Bolt Weapon',12,2,-1,16,1,'Brutal,Pistol'),
  },
  {
    ...gear('aaoa',156,'Splinter Pistol','5U','Splinter,Drukhari'),
    ...rangez('Drukhari Ranged Weapon',8,2,0,12,2,'Inflict(Poisoned 4),Pistol'),
    snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
  },
  {
    ...gear('aaoa',156,'Splinter Rifle','5U','Splinter,Drukhari'),
    ...rangez('Drukhari Ranged Weapon',8,2,0,24,2,'Inflict(Poisoned 4),Rapid Fire(2)'),
    snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
  },
  {
    ...gear('aaoa',167,'Kabalite Warsuit','4R','Light,Drukhari'),
    ...armour('Drukhari Armour', 3),
    snippet: 'Contains a vox and a rebreather, or Dark Eldar equivalents of these items.',
  },
  {
    ...gear('aaoa',167,'Wychsuit','3U','Light,Drukhari'),
    ...armour('Drukhari Armour', 1),
  },
  // AAOA v2
  {
    ...simpleStub(30903, 'aaoa2',90,'Auto-Boltstorm Gauntlet', '8V','Bolt, Power Field, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 24m; Salvo 3; Assault, Brutal, Paired', 'Bolt Weapon',''),
    description:
      '<p>Larger, and more stable than the conventional Boltstorm Gauntlet, the bolter component of these weapons allows them to sustain a higher rate of fire while on the move, compared to the close quarters burst fire of the smaller version. Auto Boltstorm Gauntlets are normally wielded in pairs by Primaris Aggressors; when operated as a pair, they may fire as a single weapon, but with a Salvo value of 6.</p>' +
      '<p>The profile below describes the gun component, though the Value and Keywords apply to the whole weapon. The power fist uses the profile found on page 293 of the Wrath & Glory rulebook but gains the Paired trait.</p>',
  },
  {
    ...simpleStub(30904, 'aaoa2',90,'Bolt Carbine', '6R', 'Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 2; Assault, Brutal, Steadfast', 'Bolt Weapon', ''),
  },
  {
    ...simpleStub(30905, 'aaoa2',90,'Bolt Sniper Rifle', '8V', 'Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('12+1ED; AP 0; Range 75m; Salvo 1; Heavy [6], Sniper [2]', 'Bolt Weapon','When firing a Bolt Sniper Rifle, choose a single ammo type: Executioner (AP -1, +2d to the attack roll and ignore cover), Hyperfrag (add the Blast [Small] trait), or Mortis (+1ED, AP -2, add Toxic [5] trait)'),
  },
  {
    ...simpleStub(30921, 'aaoa2',92,'Instigator Bolt Carbine', '7R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+2ED; AP -1; Range 40m; Salvo 1; Assault, Brutal, Sniper [1]', 'Bolt Weapon', ''),
    snippet: 'Instigator Bolt Carbines are fitted with silencers as standard.',
  },
  {
    ...simpleStub(30922, 'aaoa2',92,'Marksman Bolt Carbine', '6R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 1; Brutal, Rapid Fire, Sniper [1]', 'Bolt Weapon', ''),
    snippet: 'Marksman Bolt Carbines are fitted with a Monoscope as standard.',
  },
  {
    ...simpleStub(30923, 'aaoa2',92,'Occulus Bolt Carbine', '6R','Bolt, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 40m; Salvo 1; Brutal, Rapid Fire','Bolt Weapon','If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.'),
    snippet: 'Occulus Bolt Carbines are fitted with a Preysense Sight as standard. If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.',
    // If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.
  },
  {
    ...simpleStub(30925, 'aaoa2',92,'Plasma Incinerator', '7V', 'Plasma, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('15+1ED; AP -4; Range 60m; Salvo 2; Rapid Fire [1], Supercharge', 'Plasma Weapon', ''),
    description:
      '<p>A more advanced version of the standard plasma gun, the Mark III Belisarius-pattern plasma incinerator is the primary weapon of Primaris Hellblasters, used to deliver death and destruction to armoured targets from afar.</p>',
  },
  {
    ...simpleStub(30934, 'aaoa2', 93, 'Fragstorm Grenade Launcher', '6V', 'Explosive, Imperium, Adeptus Astartes, Primaris', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 35m; Salvo 3; Assault, Blast (Medium)', 'Grenades and Grenade Launchers', ''),
    description:
      '<p>Utilised by Primaris Aggressors and aboard certain Astartes vehicles, Fragstorm grenade launchers fire salvoes of charges similar to frag grenades, though somewhat denser and more compact, raining down fire and shrapnel upon the enemy.</p>',
  },
  {
    ...simpleStub(30936, 'aaoa2', 93, 'Psyk-Out Grenades', '8L', 'Explosive, Imperium, Inquisition, Grey Knights, Silent Sisterhood, Templum Culexus', ''),
    ...rangeAaoa('8+1ED; AP 0; Range Strength x 4 metres [T] or as launcher [R]; Salvo –; Blast [Medium]', 'Grenades and Grenade Launchers', 'Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.'),
    snippet: 'Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.',
    description:
      '<p>Psyk-out grenades are anti-psyker weapons. When they detonate, they release fine dust particles which are heavily impregnated with negative psychic energy. This form of energy is extremely rare; in all of human space it can be obtained only as a by-product of the Emperor\'s metabolism. Using the material to create anti-psyker weapons is considered by many to be a great waste, and their issue is strictly controlled. Psyk-out weapons are nigh-useless against non-psychic targets. Against psychic creatures such as daemons and psykers, however, their effects are devastating.</p>',
  },
  {
    ...simpleStub(30941, 'aaoa2',94,'Shock Grenade', '7V','Explosive, Imperium, Adeptus Astartes, Primaris', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '-', '-', '-', '-', 'Blast (Medium)', 'Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable – you can’t mix and match.'),
    snippet: 'Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable – you can’t mix and match.',
  },
  {
    ...simpleStub(30942, 'aaoa2',94,'Smoke Grenade', '4C','Explosive, Imperium', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '-', '-', '-', '-', 'Blast (Large)', 'Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round.'),
    snippet: 'Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round.',
  },
  {
    ...simpleStub(30952, 'aaoa2', 95, 'Animus Speculum', '10L', 'Exotic, Imperium, Officio Assassinorum, Templum Culexus', ''),
    ...rangeAaoa('12+1ED; AP -4; Range 36m; Salvo 3; Agonizing, Assault', 'Exotic Ranged Weapon', 'the animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.'),
    snippet: 'The animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.',
    description:
      '<p>A helmet-mounted psychic weapon, the animus speculum focusses the negative psychic presence of the wearer into bolts of energy that overwhelm the minds and souls of others. They draw additional power from nearby psykers, becoming deadlier with each psyker nearby.</p>',
  },
  {
    ...simpleStub(30982, 'aaoa2',98,'Blight Grenade', '4U', 'Explosive, Chaos, Nurgle', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '10', '1', '0', '-', 'Blast (Medium),Toxic (5)', ''),
  },
  {
    ...simpleStub(30992, 'aaoa2',99,'Sonic Blaster', '6R','Sonic, Chaos, Slaanesh', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 48m; Salvo 3; Assault, Cacophony'),
  },
  {
    ...simpleStub(30996, 'aaoa2',99,'Avenger Shuriken Catapult', '7R','Shuriken, Aeldari, Asuryani', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 36m; Salvo 3; Assault, Penetrating (3)', 'Aeldari Ranged Weapon'),
  },
  {
    ...simpleStub(31005, 'aaoa2',100,'Deathspinner', '7V','Monofilament, Aeldari, Asuryani', ''),
    ...rangeAaoa('14+2ED; AP 0; Range 24m; Salvo 3; Assault, Brutal, Penetrating (4), Tangle (3)', 'Aeldari Ranged Weapon'),
  },
  {
    ...simpleStub(31016, 'aaoa2',101,'Laser Lance', '7V','Las, Aeldari, Asuryani, Exodite', ''),
    ...rangeAaoa('14+2ED; AP -4; Range 12m; Salvo 1; Assault', 'Aeldari Ranged Weapon'),
    // 3+1ED; AP -4; Range 2m
    description:
      '<p>The Laser Lance has a range and a melee weapon profile</p>' +
      '<p>When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>'
  },
  {
    ...simpleStub(31022, 'aaoa2',102,'Reaper Launcher', '7V','Explosive, Aeldari, Asuryani', ''),
    // Starshot Missile
    ...rangeAaoa('16+3ED; AP -2; Range 100m; Salvo –; Blast (Small), Heavy (5)', 'Aeldari Ranged Weapon'),
    // Starswarm Missile
    ...rangeAaoa('12+2ED; AP -2; Range 100m; Salvo 3; Heavy (5)', 'Aeldari Ranged Weapon'),
    description:
      '<p>The Laser Lance has a range and a melee weapon profile</p>' +
      '<p>When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>'
  },
  {
    ...simpleStub(31043, 'aaoa2',104,'Grenade Pack', '6V','Explosive, Aeldari, Asuryani', ''),
    ...simpleRange('Grenades and Grenade Launchers', 'special', '-', '-', '-', '-', 'Assault'),
    description: '<p>A Swooping Hawk Grenade Pack can only launch grenades downwards, and the user may launch grenades at any point while flying. This is done as part of the character’s move, rather than as a distinct attack action.</p>',
  },
  {
    ...simpleStub(31050, 'aaoa2',105,'Kustom Mega-Blasta', '7R', 'Kustom, Plasma, Ork', ''),
    ...rangeAaoa('16+2ED; AP -3; Range 48m; Salvo 1; Assault, Supercharge, Waaagh!', 'Ork Ranged Weapon', 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.'),
    snippet: 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.',
  },
  {
    ...simpleStub(31053, 'aaoa2',105,'Tankbusta Bomb', '7R', 'Explosive, Ork', ''),
    ...rangeAaoa('16+3ED; AP -2; Salvo –; Blast (Small), Waaagh!', 'Ork Ranged Weapon', 'Cannot be thrown or fired from a launcher. They are placed as a melee attack against a vehicle. An Ork placing a Tankbusta bomb may immediately Disengage as a free action.'),
  },
  {
    ...simpleStub(31099, 'aaoa2',109,'Nemesis Force Sword', '6V', 'Force, Imperium, Adeptus Astartes, Grey Knights', ''),
    ...meleeAaoa('5+1ED; AP -3; Force, Nemesis, Parry'),
    description:
      '<p>The most common type of weapon wielded by the Grey Knights is the Nemesis Force Sword. It exemplifies the mixture of magick and science utilized by the Grey Knights. The blade is tempered iron, flecked with shards of silver and inset with ancient runes of daemon slaying. Advanced power field generators are also contained within.</p>',
  },
  {
    ...gear('aaoa',134,'Crozius Arcanum', '6V', 'Power Field,Adeptus Astartes', ''),
    ...meleez('Power Weapon',5,5,-1,1,'Brutal'),
  },
  {
    ...simpleStub(31131, 'aaoa2',113,'Plague Knife', '5U', 'Pestilent, Chaos, Nurgle', ''),
    ...meleeAaoa('3+1ED; AP 0; Steadfast, Toxic (7)', 'Chaos Melee Weapon'),
  },
  {
    ...simpleStub(31132, 'aaoa2',113,'Plague Sword', '7R', 'Pestilent, Chaos, Daemon, Nurgle', ''),
    ...meleeAaoa('5+1ED; AP 0; Parry, Toxic (7)', 'Chaos Melee Weapon'),
  },
  {
    ...simpleStub(31154, 'aaoa2',115,'‘Urty Syringe', '4U', 'Exotic, Ork', ''),
    ...meleeAaoa('4+2ED; AP 0; Toxic (4), Waaagh!', 'Ork Melee Weapon'),
    description:
      'This massive metal syringe superficially resembles a tool of the chirurgeon’s craft and tend to be filled with whatever toxic sludge the Painboy is able to find or create.',
  },
  {
    ...simpleStub(31175, 'aaoa2', 117, 'Dragonfire Bolt Rounds', '7R', 'Imperium, Adeptus Astartes', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains the Blast (Small) and Spread traits, and the Fire keyword.',
  },
  {
    ...simpleStub(31193, 'aaoa2', 119, 'Inferno Bolt Rounds', '7R', 'Chaos, Heretic Astartes, Tzeentch', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains AP -2, and the Fire keyword..',
  },
  {
    ...simpleStub(31262, 'aaoa2',126,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Bulk (1), Powered (4)'),
    snippet: 'Reinforced: The wearer adds +2 to their Toughness while wearing this armour.',
    description:
      '<p>Mark X power armour comes in a number of varieties, as the underlying armour system is designed to be modular and customisable according to battlefield role. The heavier variant is known as Gravis armour, which incorporates additional cowling, and ablative armour layers to increase the wearer’s durability in battle, at the cost of reduced mobility.</p>',
  },
  {
    ...simpleStub(31263, 'aaoa2',126,'Phobos Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Powered (3)'),
    snippet: 'Silenced: The wearer may re-roll up to two dice when making a Stealth test.',
    description:
      '<p>Phobos armour is a lightweight variant of Mark X power armour, with lighter plating and tuned servos that operate silently and virtually no loss of protection, though the reduced bulk of the armour does mean it provides less of a boost to the wearer’s strength. It’s favoured by Reivers and other Vanguard Primaris, who operate deep behind enemy lines and rely on stealth and evasion to wage war.</p>',
  },
  {
    ...simpleStub(31264, 'aaoa2',126,'Aegis Power Armour', '9V', 'Powered, Imperium, Adeptus Astartes, Grey Knights', ''),
    ...armour('Astartes Armour', 5, 'Powered (3)'),
    snippet: 'The Aegis: Enemy psychic powers which target the wearer suffer +2DN. In addition, the wearer adds +1d when rolling to Soak any attack from a Daemon.',
    description:
      '<p>Aegis Armour is a specialized form of Astartes Power Armour worn by members of the Grey Knights chapter. Worked into their Armour, each Aegis Suit contains a lattice of psycho-conductive filaments and protective amulets, wrought into hexagrammic wards and inscribed with anti-daemonic prayers. Aegis Armour allows Grey Knights to better combat Warp Entities and Rogue Psykers by protecting them from psychic attack. The technology incorporated into The Aegis represents the most potent anti-psychic defences in the Imperium of Man.</p>',
  },
  {
    ...simpleStub(31301, 'aaoa2',130,'Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 4),
  },
  {
    ...simpleStub(31302, 'aaoa2',130,'Heavy Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 5, 'Bulk (1)'),
  },
  {
    ...simpleStub(31303, 'aaoa2',130,'Exarch Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior', ''),
    ...armour('Aeldari Armour', 6),
  },
  {
    ...simpleStub(31222, 'aaoa2',131,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris', ''),
    ...armour('Astartes Armour', 5, 'Bulk (1), Powered (4)'),
    snippet: 'Reinforced: The wearer adds +2 to their Toughness while wearing this armour.',
    description:
      '<p>Mark X power armour comes in a number of varieties, as the underlying armour system is designed to be modular and customisable according to battlefield role. The heavier variant is known as Gravis armour, which incorporates additional cowling, and ablative armour layers to increase the wearer’s durability in battle, at the cost of reduced mobility.</p>',
  },
  {
    ...simpleStub(31333, 'aaoa2',133,'Ionclad Carapace Armour', '6R', 'Heavy, Squat', ''),
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
    ...simpleStub(31352, 'aaoa2', 135, 'Divinator-class Auspex', '7V', 'Imperium, Adeptus Astartes, Primaris', ''),
    snippet: 'Counts as Auspex. Spend 1 Glory when an enemy within 25 moves to make an immediate ranged attac (with +2 DN) against that enemy.',
    description:
      '<p>These sophisticated forms of auspex provide a remarkable combination of visual and multi-spectral observation-and-analysis technologies, which gather every scrap of data from the wearer\'s surroundings. The auspex’s machine spirit to collate the findings far faster than human thought, feeding the resultant data into the wearer\'s visor.</p>' +
      '<p>With training, this flood of information allows the wearer to fight in an almost precognitive fashion, responding to situations far more swiftly than they would be able to unaided.</p>' +
      '<p>A Divinator-class Auspex functions like a normal Auspex in all regards. ' +
      'In addition, the wearer may spend 1 Glory when an enemy within 25m moves; ' +
      'if they do so, they may make an immediate ranged attack, at +2 DN, against that enemy.</p>',
  },
  {
    ...simpleStub(31353, 'aaoa2', 135, 'Etherium', '11L', 'Imperium, Officio Assassinorum, Templum Culexus', ''),
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
    ...simpleStub(31354, 'aaoa2', 135, 'Force Matrix', '11L', 'Imperium, Officio Assassinorum, Templum Culexus', ''),
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
    ...simpleStub(31355, 'aaoa2', 135, 'Grapple Gun', '2U', '[Any]', ''),
    type: 'Tools & Equipment',
    description:
      '<p>These devices, appearing similar to a normal firearm, use gas pressure or magnetic impulse to propel a sturdy metal hook attached to a cable. ' +
      'They’re favoured by shock troops fighting in dense terrain, ' +
      'as it allows them to attack from unexpected directions and position themselves in hard-to-reach vantages.</p>',
  },
  {
    ...simpleStub(31361, 'aaoa2', 136, 'Liber Daemonica', '8V', 'Imperium, Inquisition, Ordo Malleus', ''),
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
    ...gear('aaoa',180,'Narthecium','5R','Adeptus Astartes'),
    ...toolz('Imperial Equipment','A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.'),
    description:
      '<p>A Narthecium is a tool of a Space Marine Apothecary\'s trade, containing implements specially designed for treating the Astartes\' genetically engineered physiology and for performing first aid without having to remove the patient\'s Power Armour.</p>' +
      '<p>It also comprises various counterseptics, synthderm patches, transfusions and other compounds engineered for the Space Marines’ physiology, and several stasis tubes for storing any recovered gene-seed taken from a dead Space Marine\'s Progenoid Glands.</p>' +
      '<p>In battle, an Apothecary carries a number of specialised items of equipment, integrating a variety of tools into a customised backpack, with delivery systems in a device mounted on the Apothecary’s vambrace. The Apothecary may have crafted many of these tools himself according to his own needs.</p>' +
      '<p>A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.</p>',
  },
  {
    ...simpleStub(31371, 'aaoa2', 137, 'Psychic Hood', '7V', 'Imperium, Adeptus Astartes, Inquisition', ''),
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
    ...gear('aaoa',181,'Reductor','5R','Adeptus Astartes'),
    ...toolz('Imperial Equipment','As an action, an Apothecary can use a Reductor to remove the gene-seed of a deceased Space Marine. This requires a Medicae test (DN 3). Though a grim task, it is a vital one, and an Apothecary who extracts a fallen brother’s gene-seed gains 1 Wrath immediately, as their duty drives them to press on.'),
  },
  {
    ...simpleStub(31412, 'aaoa2', 141, 'Banshee Mask', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When a Howling Banshee charges, all enemies within 3m of the Banshee’s target are paralysed by the war-cry, gaining the Hindered (2) and Vulnerable (2) combat effects until the end of their next turn.',
  },
  {
    ...simpleStub(31413, 'aaoa2', 141, 'Dark Reaper Rangefinder', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'The Reaper Rangefinder allows the wearer to see even in complete darkness or through fog with no penalty. In addition, when a Dark Reaper aims before making a ranged attack, they add +3d to their attack.',
  },
  {
    ...simpleStub(31423, 'aaoa2', 142, 'Ghosthelm', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Any Daemon or other warp entity attempting to perceive, attack, or otherwise interact with a Farseer wearing a Ghosthelm suffers a +2DN penalty to any tests they attempt. In addition, the Farseer gains a +2d bonus on any test made to resist any effects of Perils of the Warp, and reduces all Shock suffered from Perils of the Warp by 2, to a minimum of 0.',
  },
  {
    ...simpleStub(31433, 'aaoa2', 142, 'Mandiblaster Helm', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When the wearer of a Mandiblaster Helm charges into combat, and at the start of each turn they are engaged in combat, roll 1d6. On a 4+, one enemy within 2m suffers 1d3 Mortal Wounds.',
  },
  {
    ...simpleStub(31443, 'aaoa2', 142, 'Runes of Warding', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Once per round, when an enemy psyker attempts to use a psychic power within 36m, you may force them to re-roll a number of dice on their Psychic Mastery test equal to your Psychic Mastery skill rank.',
  },
  {
    ...simpleStub(31431, 'aaoa2', 143, 'Runes of Witnessing', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'Once per round, when you attempt to use a psychic power, you may re-roll a number of dice on your Psychic Mastery test equal to your Psychic Mastery skill rank.',
  },
  {
    ...simpleStub(31432, 'aaoa2', 143, 'Seer’s Spirit Stone', '9L', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'When you attempt to use a psychic power, you may draw upon the power of the soul within the stone. This grants one of two effects: either you gain a +3d bonus on the Psychic Mastery test, or you may use the psychic power as a free action. Once used, the stone’s inhabiting soul goes dormant, and requires a day to recover.',
  },
  {
    ...simpleStub(31432, 'aaoa2', 143, 'Swooping Hawk Wings', '7V', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'A warrior wearing Swooping Hawk Wings gains the ability to fly, and a flying speed equal to twice their normal movement speed.',
  },
  {
    ...simpleStub(31432, 'aaoa2', 143, 'Targeting Vane', '7R', 'Aeldari, Asuryani', ''),
    type: 'Tools & Equipment',
    subtype: 'Aeldari Equipment',
    snippet: 'A warrior wearing a Targeting Vane reduces range DN penalties by 2. In addition, if the warrior aims, they add an additional +1d bonus to the following ranged attack.',
  },
  {
    ...simpleStub(31434, 'aaoa2', 143, 'Warp Spider Jump Generator', '7R', 'Aeldari, Asuryani', ''),
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
    ...meleez('Necron Weapon',6,1,-3,1,'Parry'),
  },
  {
    ...simpleStub(20115 , 'lotn',11,'Voidblade', '6R', 'Necron', ''),
    ...meleez('Necron Weapon',5, 1, -3,1, ''),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Voidscythe', '9V', 'Necron,Two-Handed', ''),
    ...meleez('Necron Weapon',8, 3, -4,2, 'Unwieldy (2)'),
  },
  {
    ...simpleStub(20116 , 'lotn',11,'Warscythe', '8V', 'Necron,Two-Handed', ''),
    ...meleez('Necron Weapon',7, 2, -4, 2, ''),
  },
  {
    ...simpleStub(20119, 'lotn',11,'Heavy Plating', '7R', 'Necron', ''),
    ...armour('Necron Armour',5),
  },
  {
    ...simpleStub(20120, 'lotn',12,'Scaled Cloak', '8V', 'Necron', ''),
    ...armour('Necron Armour',6),
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
    ...simpleStub(13640, 'pax',364,'Trappings', '6C', 'Apparel, Imperium, [Any]', ''),
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
    ...simpleStub(15810,'pax',581,'Improvised Weapon', '1C', 'Low-Tech, Impact or Blade, Imperium, [Any]', ''),
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
    ...simpleStub(15840,'pax',584,'Staff', '2C', 'Low-Tech, Impact, Imperium, [Any]', ''),
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
  ...aaoa,
  ...pax,
  ...lotn,
  ...tea,
];

/*
Fusion Gun
Melta Bomb
Aeldari Jetbike
Lasblaster
 */
