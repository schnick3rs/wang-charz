import {source} from './_sourcesRepository';
import {stringToKebab} from './_stringUtils';
import {ATTRIBUTES, SKILLS, TRAITS} from './_statUtils';

const rarity = {
  'C': 'Common',
  'U': 'Uncommon',
  'R': 'Rare',
  'V': 'Very Rare',
  'L': 'Unique',
};

const TYPES = {
  RANGED: 'Ranged Weapon',
  MELEE: 'Melee Weapon',
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

/**
 *
 * @param staticPart
 * @param ed
 * @param ap
 * @param range
 * @param salvo
 * @param traits
 * @param label
 * @returns {{damage: {static: *, ed: *}, traits: *, salvo: *, range: *, label: undefined, type: string, ap: *}}
 */
const metaRange = function(staticPart, ed, ap, range, salvo, traits, label = undefined) {
  return {
    type: 'ranged-weapon',
    range,
    damage: { static: staticPart, ed },
    ap,
    salvo,
    traits,
    label,
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

const metaMelee = function(staticPart, ed, ap, range, traits) {
  return {
    type: 'melee-weapon',
    range,
    damage: { static: staticPart, ed },
    ap,
    traits,
  };
}

const meleez = function (subtype, damage, ed, ap, range, traits = undefined) {
  return {
    type: 'Melee Weapon',
    subtype: subtype ? subtype : undefined,
    meta: [
      metaMelee(damage, ed, ap, range < 1 ? 1 : range, traits ? traits.split(',').map((k)=>k.trim()) : []),
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
    ...gear(source.core.key,211,'Knife','2C','Blade,[Any]'),
    ...meleez(undefined,2,2,0,0),
  },
  {
    ...gear(source.core.key,211,'Psykana Mercy Blade','2C','Adeptus Astra Telephatica'),
    ...meleez(undefined,2,2,-1,0),
  },
  {
    ...gear(source.core.key,211,'Astartes Combat Knife','3U','Blade,Adeptus Astartes'),
    ...meleez(undefined,3,2,-1,0,'Reliable'),
  },
  {
    ...gear(source.core.key,211,'Sword','3C','Blade,[Any]'),
    ...meleez(undefined,3,3,0,0,'Parry'),
  },
  {
    ...gear(source.core.key,211,'Mono Knife','3U','Blade,Imperium,Scum'),
    ...meleez(undefined,3,2,-1,0,'Rending(1)'),
  },
  {
    ...gear(source.core.key,211,'Imperial Bludgeon','3U','[Any]'),
    ...meleez(undefined,4,2,0,0,'Brutal,Unwieldy(1)'),
  },
  {
    ...gear(source.core.key,213,'Chain Bayonet','3R','Chain,Imperium,Chaos'),
    ...meleez('Chain Weapon',4,1,0,0,'Brutal'),
  },
  { // not a real entry delete soon
    ...gear(source.core.key,213,'Chain Sword','4U','Chain,Aeldari,Imperium,Chaos'),
    ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
  },
  {
    ...gear(source.core.key,213,'Chainsword','4U','Chain,Aeldari,Imperium,Chaos'),
    ...meleez('Chain Weapon',5,4,0,0,'Brutal,Parry'),
  },
  {
    ...gear(source.core.key,213,'Chain Axe','5R','Chain,Chaos'),
    ...meleez('Chain Weapon',5,5,0,0,'Brutal,Rending(1)'),
  },
  {
    ...gear(source.core.key,214,'Eviscerator','6R','Chain,2-Handed,Adeptus Astartes,Adeptus Ministorum,Adepta Sororitas'),
    ...meleez('Chain Weapon',6,6,-4,2,'Brutal,Unwieldy(2)'),
  },
  {
    ...gear(source.core.key,214,'Chain Fist','10V','Chain,Power Field,Imperium,Chaos,Adeptus Astartes'),
    ...meleez('Chain Weapon',7,6,-4,0,'Brutal,Unwieldy(3)'),
  },
  {
    ...gear(source.core.key,214,'Whip','2C','Primitive,[Any]'),
    ...meleez('Exotic Melee Weapon',1,1,0,4,'Agonising'),
  },
  {
    ...gear(source.core.key,214,'Neural Whip','5R','Exotic,Adepta Sororitas'),
    ...meleez('Exotic Melee Weapon',3,2,-2,4,'Agonising'),
  },
  {
    ...gear(source.core.key,214,'Shock Whip','4V','Exotic,[Any]'),
    ...meleez('Exotic Melee Weapon',4,2,0,4,'Agonising,Rending(2)'),
  },
  {
    ...gear(source.core.key,214,'Shock Maul','5U','Exotic,Adeptus Arbites'),
    ...meleez('Exotic Melee Weapon',4,4,-1,0,'Agonising,Brutal'),
  },
  {
    ...gear(source.core.key,214,'Force Stave','2U','Forde,2-Handed,Inquisition,Adeptus Astartes,Adeptus Astra Telepathica'),
    ...meleez('Force Weapon',4,2,-1,2,'Brutal,Force'),
  },
  {
    ...gear(source.core.key,214,'Force Sword','6R','Force,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',5,4,-3,0,'Force,Parry'),
  },
  {
    ...gear(source.core.key,214,'Force Axe','6V','Force,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',5,5,-2,0,'Force'),
  },
  {
    ...gear(source.core.key,214,'Nemesis Deamon Hammer','10L','Force,2-Handed,Inquisition,Adeptus Astartes'),
    ...meleez('Force Weapon',8,6,-3,2,'Brutal,Force,Unwieldy(2)'),
  },
  {
    ...gear(source.core.key,215,'Death Cult Powerblade','6V','Power Field,Imperium,Adeptus Ministorum'),
    ...meleez('Power Weapon',5,4,-2,0,'Parry'),
  },
  {
    ...gear(source.core.key,215,'Power Sword','6R','Power Field,Imperium,Aeldari'),
    ...meleez('Power Weapon',5,4,-3,0,'Parry'),
  },
  {
    ...gear(source.core.key,215,'Void Sabre','6V','Power Field,Aeldari,Anhrathe'),
    ...meleez('Aeldari Weapon',5,4,-3,0,'Brutal,Parry'),
  },
  {
    ...gear(source.core.key,215,'Omnissian Axe','6V','Power Field,2-Handed,Imperium,Adeptus Mechanicus'),
    ...meleez('Power Weapon',5,5,-2,2),
  },
  {
    ...gear(source.core.key,215,'Power Axe','6R','Power Field,Imperium,Adeptus Mechanicus,Aeldari'),
    ...meleez('Power Weapon',5,5,-2,0, 'Rending(1)'),
  },
  {
    ...gear(source.core.key,215,'Power Fist','8V','Power Field,Imperium,Adeptus Astartes'),
    ...meleez('Power Weapon',5,5,-3,0, 'Brutal,Unwieldy(2)'),
  },
  {
    ...gear(source.core.key,215,'Thunder Hammer','9L','Power Field,2-Handed,Imperium,Adeptus Astartes,Inquisition'),
    ...meleez('Power Weapon',8,6,-3,2, 'Brutal,Unwieldy(2)'),
  },
  {
    ...gear(source.core.key,215,'Singing Spear','11L','Force,Aeldari,Asuryani'),
    ...meleez('Aeldari Weapon',6,5,0,2, 'Assault,Force,Warp Weapon,Thrown(STRx5)'),
  },
  {
    ...gear(source.core.key,215,'Witchblade','9V','Force,Aeldari,Asuryani'),
    ...meleez('Aeldari Weapon',6,5,0,0, 'Force,Parry,Warp Weapon'),
  },
  {
    ...gear(source.core.key,215,'Choppa','2C','Blade,Ork'),
    ...meleez('Ork Weapon',3,3,0,0, 'Reliable,Waaagh!'),
  },
  {
    ...gear(source.core.key,216,'Wierdboy Staff','5V','Force,2-Handed,Ork'),
    ...meleez('Ork Weapon',4,1,-1,2, 'Force,Waaagh!'),
  },
  {
    ...gear(source.core.key,216,'Chain Choppa','5V','Chain,Ork'),
    ...meleez('Ork Weapon',5,4,0,0, 'Brutal,Waaagh!'),
  },
  {
    ...gear(source.core.key,216,'Big Choppa','4R','Blade,2-Handed,Ork'),
    ...meleez('Ork Weapon',5,5,-1,0, 'Waaagh!'),
  },
  {
    ...gear(source.core.key,216,'Power Klaw','8V','Power Field,Ork'),
    ...meleez('Ork Weapon',6,5,-3,1, 'Brutal,Unwieldy(3),Waaagh!'),
  },
  {
    ...gear(source.core.key,216,'Bolt Pistol','4U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,12,1,'Brutal,Pistol'),
  },
  {
    ...gear(source.core.key,216,'Heavy Bolt Pistol','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',10,1,-1,12,1,'Brutal,Pistol'),
  },
  {
    ...gear(source.core.key,216,'Boltgun','6U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,24,2,'Brutal,Rapid Fire(2)'),
  },
  {
    ...gear(source.core.key,216,'Bolt Rifle','7V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',10,1,-1,30,2,'Brutal,Rapid Fire(2)'),
  },
  {
    ...gear(source.core.key,216,'Storm Bolter','6R','Bolt,Imperium'),
    ...rangez('Bolt Weapon',10,1,0,24,4,'Brutal,Heavy(3),Rapid Fire(3)'),
  },
  {
    ...gear(source.core.key,216,'Assault Bolter','8V','Bolt,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...rangez('Bolt Weapon',12,2,-1,18,3,'Assault,Brutal,Rapid Fire(2)'),
  },
  {
    ...gear(source.core.key,216,'Heavy Bolter','6U','Bolt,Imperium'),
    ...rangez('Bolt Weapon',12,2,-1,36,3,'Brutal,Heavy(4),Rapid Fire(4)'),
  },
  {
    ...gear(source.core.key,221,'Laspistol','3C','Las,Imperium'),
    ...rangez('Las Weapon',7,1,0,12,1,'Pistol,Reliable'),
  },
  {
    ...gear(source.core.key,221,'Hot-Shot Laspistol','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',7,1,-2,6,1,'Pistol,Reliable'),
  },
  {
    ...gear(source.core.key,221,'Master-Crafted Laspistol','6V','Las,Imperium'),
    ...rangez('Las Weapon',10,1,0,12,1,'Pistol,Reliable'),
  },
  {
    ...gear(source.core.key,221,'Lasgun','3C','Las,Imperium'),
    ...rangez('Las Weapon',7,1,0,24,2,'Rapid Fire(1),Reliable'),
  },
  {
    ...gear(source.core.key,222,'Hot-Shot Lasgun','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',7,1,-2,18,2,'Rapid Fire(1),Reliable'),
  },
  {
    ...gear(source.core.key,222,'Hot-Shot Volley Gun','6R','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',10,1,-2,24,4,'Heavy(4),Reliable'),
  },
  {
    ...gear(source.core.key,222,'Long Las','6U','Las,Imperium,Astra Militarum'),
    ...rangez('Las Weapon',10,1,0,24,0,'Sniper(1),Reliable'),
  },
  {
    ...gear(source.core.key,222,'Lascannon','9U','Las,Imperium'),
    ...rangez('Las Weapon',18,3,-3,48,1,'Heavy(8),Reliable'),
  },
  {
    ...gear(source.core.key,223,'Plasmapistol','6R','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,1,-3,12,1,'Pistol,Supercharge'),
  },
  {
    ...gear(source.core.key,223,'Plasma Gun','6R','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,1,-3,24,2,'Rapid Fire(1),Supercharge'),
  },
  {
    ...gear(source.core.key,223,'Plasma Cannon','7V','Plasma,Imperium'),
    ...rangez('Plasma Weapon',15,2,-3,36,3,'Heavy(8),Supercharge'),
  },
  {
    ...gear(source.core.key,223,'Inferno Pistol','6V','Melta,Imperium,Adeptus Astartes,Adepta Sororitas'),
    ...rangez('Melta Weapon',16,1,-4,6,1,'Melta,Pistol'),
  },
  {
    ...gear(source.core.key,223,'Meltagun','6R','Melta,Imperium'),
    ...rangez('Melta Weapon',16,2,-4,12,1,'Assault,Melta'),
  },
  {
    ...gear(source.core.key,224,'Multi-Melta','7R','Melta,Imperium'),
    ...rangez('Melta Weapon',16,3,-4,24,1,'Heavy(8),Melta'),
  },
  {
    ...gear(source.core.key,222,'Autopistol','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,12,2,'Pistol'),
  },
  {
    ...gear(source.core.key,222,'Hand Cannon','4C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',9,1,0,12,1,'Pistol'),
  },
  {
    ...gear(source.core.key,222,'Autogun','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,24,3,'Rapid Fire(1)'),
  },
  {
    ...gear(source.core.key,222,'Stubber','2C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',7,1,0,12,1,'Pistol'),
  },
  {
    ...gear(source.core.key,222,'Needle Pistol','6V','Projectile,Imperium'),
    ...rangez('Projectile Weapon',8,2,0,12,1,'Agonising,Inflict(Poisoned 4),Pistol,Silent'),
  },
  {
    ...gear(source.core.key,222,'Stubcannon','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',9,1,0,18,1,'Brutal'),
  },
  {
    ...gear(source.core.key,222,'Shotgun','3C','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',8,1,0,12,1,'Assault,Spread'),
  },
  {
    ...gear(source.core.key,223,'Combat Shotgun','3U','Projectile,Imperium'),
    ...rangez('Projectile Weapon',9,1,0,12,2,'Assault,Rapid Fire(1),Spread'),
  },
  {
    ...gear(source.core.key,223,'Astartes Shotgun','6R','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',10,1,0,12,2,'Assault,Spread,Reliable'),
  },
  {
    ...gear(source.core.key,223,'Needle Rifle','6V','Needle,Imperium'),
    ...rangez('Projectile Weapon',8,2,0,28,2,'Agonising,Inflict(Poisoned 4),Silent'),
  },
  {
    ...gear(source.core.key,223,'Heavy Stubber','5U','Projectile,Imperium,Scum'),
    ...rangez('Projectile Weapon',10,2,0,36,3,'Heavy(4)'),
  },
  {
    ...gear(source.core.key,223,'Astartes Sniper Rifle','6U','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',10,1,0,36,0,'Sniper(2),Silent'),
  },
  {
    ...gear(source.core.key,223,'Assault Cannon','6U','Projectile,Imperium,Adeptus Astartes'),
    ...rangez('Projectile Weapon',14,2,-1,24,6,'Heavy(8)'),
  },
  {
    ...gear(source.core.key,223,'Autocannon','5C','Projectile,Imperium'),
    ...rangez('Projectile Weapon',16,1,-1,48,3,'Heavy(8)'),
  },
  {
    ...gear(source.core.key,224,'Hand Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',7,1,0,6,1,'Flamer,Pistol'),
  },
  {
    ...gear(source.core.key,224,'Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',10,1,0,8,1,'Assault,Flamer'),
  },
  {
    ...gear(source.core.key,224,'Heavy Flamer','5U','Fire,Imperium'),
    ...rangez('Flame Weapon',12,2,-1,8,2,'Flamer,Heavy(6)'),
  },
  {
    ...gear(source.core.key,224,'Arc Pistol','5R','Arc,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,1,-1,12,1,'Arc(2),Pistol'),
  },
  {
    ...gear(source.core.key,224,'Radium Pistol','6R','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',7,1,0,12,1,'Pistol,Rad(2)'),
  },
  {
    ...gear(source.core.key,224,'Galvanic Rifle','5R','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',10,1,0,30,2,'Rapid Fire(1),Rending(1)'),
  },
  {
    ...gear(source.core.key,224,'Arc Rifle','6R','Arc,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,1,-1,24,2,'Arc(2),Rapid Fire(1)'),
  },
  {
    ...gear(source.core.key,224,'Radium Carbine','6V','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',7,1,0,18,3,'Assault,Rad(2)'),
  },
  {
    ...gear(source.core.key,224,'Volkite Blaster','11L','Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',14,2,0,24,2,'Blast(Small),Heavy(4),Inflict(On Fire),Rapid Fire(2)'),
  },
  {
    ...gear(source.core.key,224,'Frag Grenade','2C','Explosive,Imperium'),
    ...rangez('Grenade & Missile Weapon',10,4,0,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
  },
  {
    ...gear(source.core.key,225,'Plasma Grenade','5V','Explosive,Aeldari'),
    ...rangez('Grenade & Missile Weapon',10,5,-1,'*','-','Blast(Medium),Thrown(STRx4),Launcher'),
  },
  {
    ...gear(source.core.key,225,'Krak Grenade','4U','Explosive,Imperium'),
    ...rangez('Grenade & Missile Weapon',14,5,-2,'*','-','Blast(Small),Thrown(STRx4),Launcher'),
  },
  {
    ...gear(source.core.key,225,'Militarum Tempestus Grenade Launcher','6U','Explosive,Imperium,Astra Militarum'),
    ...rangez('Grenade & Missile Weapon','*','*','*',28,'-','Assault'),
  },
  {
    ...gear(source.core.key,225,'Frag Missile','4C','Explosive,Imperium,[Any]'),
    ...rangez('Grenade & Missile Weapon',10,5,0,'*','-','Blast(Large),Launcher'),
  },
  {
    ...gear(source.core.key,225,'Krak Missile','6C','Explosive,Imperium'),
    ...rangez('Grenade & Missile Weapon',16,6,-2,'*','-','Blast(Medium),Launcher'),
  },
  {
    ...gear(source.core.key,225,'Missile Launcher','4C','Explosive,Imperium'),
    ...rangez('Grenade & Missile Weapon','*','*','*',48,'-','Heavy(6)'),
  },
  {
    ...gear(source.core.key,225,'Cyclone Missile Launcher','11V','Explosive,Imperium,Adeptus Astartes'),
    ...rangez('Grenade & Missile Weapon','*','*','*',36,'-','Heavy(8)'),
  },
  {
    ...gear(source.core.key,225,'Lasblaster','5V','Las,Aeldari'),
    ...rangez('Aeldari Weapon',7,1,0,24,4,'Assault'),
  },
  {
    ...gear(source.core.key,225,'Shuriken Catapult','6R','Shuriken,Aeldari,Asuryani'),
    ...rangez('Aeldari Weapon',10,1,0,12,3,'Assault,Rending(3)'),
  },
  {
    ...gear(source.core.key,226,'Shuriken Pistol','6R','Shuriken,Aeldari,Asuryani'),
    ...rangez('Aeldari Weapon',10,1,0,12,3,'Pistol,Rending(3)'),
  },
  {
    ...gear(source.core.key,226,'Ranger Long Rifle','7V','Las,Aeldari'),
    ...rangez('Aeldari Weapon',10,1,0,36,0,'Sniper(4)'),
  },
  {
    ...gear(source.core.key,226,'Fusion Gun','6V','Melta,Aeldari'),
    ...rangez('Aeldari Weapon',16,2,-4,12,1,'Assault,Melta'),
  },
  {
    ...gear(source.core.key,226,'Slugga','3C','Projectile,Ork'),
    ...rangez('Ork Weapon',10,1,0,12,1,'Pistol,Waaagh!'),
  },
  {
    ...gear(source.core.key,226,'Shoota','4U','Projectile,Ork'),
    ...rangez('Ork Weapon',10,1,0,18,2,'Assault,Waaagh!'),
  },
  {
    ...gear(source.core.key,226,'Burna','5U','Fire,Ork'),
    type: 'Ranged Weapon',
    subtype: 'Ork Weapon',
    meta: [
      metaRange(10,1,0,8,1,['Assault','Flamer']),
      metaMelee(7,1,-2,0,['Inflict(On Fire)']),
    ],
  },
  {
    ...gear(source.core.key,226,'Big Shoota','5U','Projectile,Ork'),
    ...rangez('Ork Weapon',12,2,0,36,3,'Assault,Waaagh!'),
  },
  {
    ...gear(source.core.key,227,'Snazzgun','8L','Ork'),
    ...rangez('Ork Weapon',12,2,-2,24,3,'Heavy(4),Kustom'),
  },
  {
    ...gear(source.core.key,227,'Rokkit Launcher','7R','Explosive,Ork'),
    ...rangez('Ork Weapon',16,'1d3',-2,24,'-','Assault,Blast(Small)'),
  },
  {
    ...gear(source.core.key,227,'Stikkbomb','2U','Explosive,Ork'),
    ...rangez('Ork Weapon',9,5,0,'*','-','Blast(Medium),Trown(STRx4),Launcher'),
  },
  // Weapon Upgrades
  {
    ...gear(source.core.key,227,'Ammo Drum','3C','Imperium,Scum'),
    type: 'Weapon Upgrade',
    snippet: 'You can carry 1 additional Reload.',
  },
  {
    ...gear(source.core.key,227,'Autoloader','5R','Imperium'),
    type: 'Weapon Upgrade',
    snippet: 'You can Reload your weapon as a Free Action.',
  },
  {
    ...gear(source.core.key,227,'Bayonet Lug','1C','[Any]'),
    key: 'core-bayonet-lung',
    type: 'Weapon Upgrade',
    upgradeType: 'Bayonet',
    snippet: 'You can use this weapon as a Knife (p. 211).',
  },
  {
    ...gear(source.core.key,227,'Chain Bayonet','4R','Imperium,Chaos'),
    key: 'core-weapon-upgrade-chain-bayonet',
    type: 'Weapon Upgrade',
    upgradeType: 'Bayonet',
    snippet: 'You can use this weapon as a Chain Bayonet (p. 213).',
  },
  {
    ...gear(source.core.key,227,'Combi Weapon','6R','Imperium,Chaos,Scum'),
    type: 'Weapon Upgrade',
    snippet: 'You may fire the both Weapons as a Multi-Action.',
    description:
      '<p>A combi-weapon may be fired as either or both of its component weapons each round. Firing both component weapons is treated as a Multi-Action.</p>' +
      '<p>You must own the two ranged weapons you want to combine when you purchase this upgrade. Pistols can only be combined with other Pistols, and weapons with the Heavy Trait cannot take this upgrade.</p>',
  },
  {
    ...gear(source.core.key,228,'Distinction','5U','[Any]'),
    type: 'Weapon Upgrade',
    snippet: '+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon.',
    description:
      '<p>+1 bonus die to Intimidation (Wil) Tests when you brandish this weapon. Distinction does not count toward a weapon’s maximum number of upgrades.</p>',
    modifications: [
      { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1, rank: 0, condition: 'when brandishing that weapon' },
    ],
  },
  {
    ...gear(source.core.key,228,'Duelling Grip','3U','[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Grip',
    snippet: '+1 bonus die on Attack Tests using this weapon.',
    description: '<p>+1 bonus die on Attack Tests using this weapon. This upgrade can only be applied to Pistols or onehanded melee weapons.</p>',
  },
  {
    ...gear(source.core.key,228,'Gene-Grip Bio-Verator','5R','Imperium'),
    type: 'Weapon Upgrade',
    upgradeType: 'Grip',
    snippet: 'Any mechanisms your weapon has (triggers, chain engines, etc.) will not activate for anyone but you.',
  },
  {
    ...gear(source.core.key,228,'Mastercrafted','7V','[Any]'),
    type: 'Weapon Upgrade',
    snippet: 'The weapon gains the Reliable Trait. You gain +2 bonus dice to any Attack Test made with this weapon.',
  },
  {
    ...gear(source.core.key,228,'Megathoule Accelerator (Lucius Pattern)','6V','Imperium,Astra Militarum'),
    type: 'Weapon Upgrade',
    snippet: 'The weapon gains +2 Damage. The weapon loses the Reliable Trait.',
  },
  {
    ...gear(source.core.key,228,'Magnocular Scope','2U','Imperium,Astra Militarum'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: 'Awareness (Int) Tests no penalties due to distance. Any Range penalties are reduced by 2.',
  },
  {
    ...gear(source.core.key,228,'Percussive Muzzle Brake','3U','[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Muzzle',
    snippet: 'The weapon gains +1 Salvo. This upgrade can only be applied to a weapon without the Heavy Trait.',
  },
  {
    ...gear(source.core.key,228,'Preysense Sight','6R','Imperium,Scum,[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: 'This weapon upgrade allows the wielder to detect targets via ambient heat, even in total darkness.',
  },
  {
    ...gear(source.core.key,228,'Red-Dot Sight','5U','Imperium,Scum'),
    type: 'Weapon Upgrade',
    upgradeType: 'Scope',
    snippet: '+1 bonus die to ranged attacks made with this weapon.',
  },
  {
    ...gear(source.core.key,229,'Silencer','3U','Imperium,Scum,[Any]'),
    type: 'Weapon Upgrade',
    upgradeType: 'Muzzle',
    snippet: 'The weapon gains the Silent Trait. This upgrade can only be applied to a weapon with the BOLT or PROJECTILE Keywords.',
  },
  // Ammo
  {
    ...gear(source.core.key,229,'Ammo Backpack','5U','[Any]'),
    type: 'Ammo',
    subtype: 'Ammo Container',
    snippet: 'You can carry 10 additional Reloads.',
  },
  {
    ...gear(source.core.key,229,'Bandolier','2C','[Any]'),
    type: 'Ammo',
    subtype: 'Ammo Container',
    snippet: 'You can carry 2 additional Reloads.',
  },
  {
    ...gear(source.core.key,230,'Dragonfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: 'The Weapon gains the Spread trait. The weapon ignores Defence bonuses from cover.',
  },
  {
    ...gear(source.core.key,230,'Hellfire Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: '+3 ED against organic targets. +2 ED against inorganic targets.',
  },
  {
    ...gear(source.core.key,231,'Kraken Bolt Rounds','6V','Imperium,Adeptus Astartes'),
    type: 'Ammo',
    subtype: 'Special Bolt Ammo',
    snippet: 'AP -2',
  },
  {
    ...gear(source.core.key,231,'Bleeder Rounds','5U','Imperium,Scum'),
    type: 'Ammo',
    subtype: 'Special Projectile Ammo',
    snippet: 'You can Shift an Exalted Icon when you make an Attack Test with this weapon to inflict the Bleeding Condition.',
  },
  {
    ...gear(source.core.key,231,'Dumdum Bullets','4U','Imperium,Scum'),
    type: 'Ammo',
    subtype: 'Special Projectile Ammo',
    snippet: '+1 ED',
  },
  // Armour
  {
    ...gear(source.core.key,232,'Primitive Armour','2C','Heavy,Primitive'),
    ...armour('Imperial Armour',2,'Bulk(2)'),
  },
  {
    ...gear(source.core.key,232,'Bodyglove','3R','Light,Imperium,Adeptus Ministorum'),
    ...armour('Imperial Armour',2),
  },
  {
    ...gear(source.core.key,232,'Mesh Armour','3R','Light,Imperium,[Any]'),
    ...armour('Imperial Armour',3),
  },
  {
    ...gear(source.core.key,232,'Flak Armour','4C','Flak,Imperium,Astra Militarum'),
    ...armour('Imperial Armour',3),
  },
  {
    ...gear(source.core.key,232,'Flak Coat','4U','Flak,Imperium,Astra Militarum'),
    ...armour('Imperial Armour',3),
  },
  {
    ...gear(source.core.key,232,'Skitarii Auto-Cuirass','5R','Heavy,Imperium,Adeptus Mechanicus,Skitarii'),
    ...armour('Imperial Armour',4),
  },
  {
    ...gear(source.core.key,232,'Carapace Armour','5U','Imperium,Adeptus Astartes,Astra Militarum'),
    ...armour('Imperial Armour',4,'Bulk(1)'),
  },
  {
    ...gear(source.core.key,232,'Tempestus Carapace','6R','Heavy,Imperium,Astra Militarum,Militarum Tempestus'),
    ...armour('Imperial Armour',4),
  },
  {
    ...gear(source.core.key,234,'Light Power Armour','6V','Powered,Imperium'),
    ...armour('Powered Armour',4, 'Powered(1)'),
  },
  {
    ...gear(source.core.key,234,'Sororitas Power Armour','6V','Powered,Imperium,Adepta Sororitas'),
    ...armour('Powered Armour',5, 'Powered(2)'),
  },
  {
    ...gear(source.core.key,234,'Ignatus Power Armour','7V','Powered,Imperium,Inquisition'),
    ...armour('Powered Armour',5, 'Powered(2)'),
  },
  {
    ...gear(source.core.key,234,'Heavy Power Armour','8V','Heavy,Powered,Imperium,Inquisition'),
    ...armour('Powered Armour',6, 'Bulk(1),Cumbersome,Powered(3)'),
  },
  {
    ...gear(source.core.key,234,'Storm Shield','8L','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum,Inquisition'),
    ...armour('Power Fields',2, 'Bulk(1),Shield,Power Field'),
  },
  {
    ...gear(source.core.key,234,'Refractor Field','5R','Force Field,Imperium,Astra Militarum'),
    ...armour('Power Fields',3, 'Power Field'),
  },
  {
    ...gear(source.core.key,234,'Rosarius','7V','Force Field,Imperium,Adeptus Astartes,Adeptus Ministorum'),
    ...armour('Power Fields',4, 'Power Field'),
  },
  {
    ...gear(source.core.key,234,'Scout Armour','5R','Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',4),
  },
  {
    ...gear(source.core.key,234,'Aquila Mk VII','8V','Powered,Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',5,'Powered(3)'),
  },
  {
    ...gear(source.core.key,235,'Tacticus Mk X','9V','Powered,Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...armour('Astartes Armour',5,'Powered(4)'),
  },
  {
    ...gear(source.core.key,235,'Terminator Armour','10L','Powered,Imperium,Adeptus Astartes'),
    ...armour('Astartes Armour',7,'Powered(4),Cumbersome'),
  },
  {
    ...gear(source.core.key,235,'Corsair Armour','4R','Light,Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',3),
  },
  {
    ...gear(source.core.key,235,'Aeldari Mesh Armour','4V','Light,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',3),
  },
  {
    ...gear(source.core.key,235,'Rune Armour','6L','Force Field,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',4,'Power Field'),
  },
  {
    ...gear(source.core.key,235,'Heavy Mesh Armour','6V','Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',4),
  },
  {
    ...gear(source.core.key,235,'Voidplate Harness','7R','Aeldari,Anhrathe'),
    ...armour('Aeldari Armour',5,'Bulk(1)'),
  },
  {
    ...gear(source.core.key,235,'Shimmershield','7R','Force Field,Aeldari,Asuryani'),
    ...armour('Aeldari Armour',2,'Power Field,Shield'),
  },
  // Armour - Ork Armour
  {
    ...gear(source.core.key,235,'Ork Flak','2U','Primitive,Ork'),
    ...armour('Ork Armour',2),
  },
  {
    ...gear(source.core.key,235,'\'Eavy Armour','3U','Heavy,Primitive,Ork'),
    ...armour('Ork Armour',4,'\Ere We Go,Bulk(1)'),
  },
  {
    ...gear(source.core.key,235,'Mega Armour','9V','Powered,Ork'),
    ...armour('Ork Armour',7,'\Ere We Go,Cumbersome,Powered(4)'),
  },
  // Tools & Equipment
  {
    ...gear(source.core.key,236,'9-70 Entrenching Tool','2C','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','Dig trenches, foxholes, and other earthen fortifications.'),
    description: '<p>A 9-70 entrenching tool halves the time needed to dig trenches, foxholes, and other earthen fortifications. It also makes for a sturdy improvised weapon, as many a Guardsman can attest.</p>'
  },
  {
    ...gear(source.core.key,236,'Auspex','5R','Imperium,Adeptus Mechanicus'),
    ...toolz('Imperial Equipment','Activated as a Combat Action to detect energy emissions, motion, and other life signs within 50 metres.'),
  },
  {
    ...gear(source.core.key,236,'Auto-Quill','3U','Imperium'),
    ...toolz('Imperial Equipment','+2 bonus dice to Tests to forge or alter documents.'),
  },
  {
    ...gear(source.core.key,236,'Ballistic Appeasement Autoreliquary (Absolutis Pattern)','6V','Imperium,Adeptus Astartes,Adeptus Primaris'),
    ...toolz('Imperial Equipment','Clear a jammed weapon as a Free Action.'),
  },
  {
    ...gear(source.core.key,236,'Clothing','1C','Imperium'),
    ...toolz('Imperial Equipment','Common Clothing, nothing Special.'),
  },
  {
    ...gear(source.core.key,236,'Clothing, Uncommon','1U','Imperium'),
    ...toolz('Imperial Equipment','Common Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear(source.core.key,236,'Clothing, Rare','1R','Imperium'),
    ...toolz('Imperial Equipment','Rare Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear(source.core.key,236,'Clothing, Very Rare','1V','Imperium'),
    ...toolz('Imperial Equipment','Very Rare Clothing may grant a small bonus to social skill tests.'),
  },
  {
    ...gear(source.core.key,236,'Combi-Tool','3U','[Any]'),
    ...toolz('Universal Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Imperial technology.'),
  },
  {
    ...gear(source.core.key,236,'Cameleoline Cloak','5R','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Stealth (A) Tests and +1 to Defence when in shadow or cover.'),
    modifications: [
      { targetGroup: 'skills', targetValue: 'stealth', modifier: 1, condition: 'when in shadow or cover' },
      { targetGroup: 'traits', targetValue: 'defence', modifier: 1, condition: 'when in shadow or cover' },
    ],
  },
  {
    ...gear(source.core.key,237,'Chaplet Ecclesiasticus','3U','Imperium,Adeptus Ministorum,Adepta Sororitas'),
    ...toolz('Imperial Equipment','The Chaplet can be used as a Symbol of Authority (p.240) or, if necessary a garrote.'),
  },
  {
    ...gear(source.core.key,237,'Chrono','2C','[Any]'),
    ...toolz('Universal Equipment','Settings on the chrono’s display allow for the accurate tracking of Imperial standard, shipboard, and local planetary time.'),
  },
  {
    ...gear(source.core.key,237,'Data-Slate','2C','[Any]'),
    ...toolz('Universal Equipment','You can record any information transferable from a cogitator, such as local maps, familial records, or manufactorum outputs, onto your Data-Slate.'),
  },
  {
    ...gear(source.core.key,237,'Diagnostor','5R','Imperium'),
    ...toolz('Imperial Equipment','+1 bonus die to Medicae (Int) Tests to detect and diagnose diseases, injuries, and ailments, and to determine cause of death.'),
  },
  {
    ...gear(source.core.key,237,'Grav-Chute','5R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','You can hover or control a fall for up to one hour. You can recharge the Grav-Chute’s solar battery by leaving it in sunlight for one hour.'),
  },
  {
    ...gear(source.core.key,237,'Jump Pack','7R','[Any]'),
    ...toolz('Universal Equipment','Pilot Test to fly at double speed. Fail and Scatter, suffering 1d3 shock on a complication.'),
    description: '<p>You can fly at double your Speed by making a Pilot (A) Test, ignoring any terrain. If you fail the Pilot (A) Test, your movement deviates according to the Scattering (p.186) rules. A Complication triggers a crash, which deals a minimum of 1d3 Shock.</p>',
  },
  {
    ...gear(source.core.key,237,'Mag-Boots','4U','[Any],Navis Imperialis'),
    ...toolz('Universal Equipment','Pilot Test to fly at double speed. Fail and Scatter, suffering 1d3 shock on a complication.'),
    description: '<p>When activated with a Simple Action, the wearer’s feet are fully secured to any metallic surface. The wearer’s feet cannot be removed from the metallic surface by any means, other than their own volition. The wearer can walk and move on the metallic surface whilst the boots are on, but their Speed is reduced by 3.</p>',
  },
  {
    ...gear(source.core.key,238,'Medikit','3U','[Any]'),
    ...toolz('Universal Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124).'),
  },
  {
    ...gear(source.core.key,238,'Chirurgeon\'s Tools','5R','Imperium,Adepta Sororitas'),
    ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). +2 bonus dice to Medicae (Int) Tests when a character is Dying.'),
  },
  {
    ...gear(source.core.key,238,'Martyr\'s Gift Medkit','6R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Includes a standard augmetic replacement for any lost limb or eye (p.242); the augmetic is temporary, and becomes useless after 24 hours. The subcutaneous frag charge has the same damage profile as a Frag Missile (p.220).'),
  },
  {
    ...gear(source.core.key,238,'Missionary Kit','2U','Imperium,Adeptus Ministorum'),
    ...toolz('Imperial Equipment','+1 bonus die to Persuasion (Fel) Tests made involving converts to the Imperial Creed and those seeking redemption through the grace of the God-Emperor.'),
  },
  {
    ...gear(source.core.key,238,'Monoscope','4R','Imperium,Militarum Tempestus'),
    ...toolz('Universal Equipment','Can act as a light source and show live footage if connected wirelessly to a data-slate.'),
  },
  {
    ...gear(source.core.key,238,'Munitorum-Issue Mess Kit','5R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+1 bonus die to Survival (Wil) tests made to find food and water.'),
  },
  {
    ...gear(source.core.key,238,'Periculum Kit','5R','Imperium,[Any]'),
    ...toolz('Imperial Equipment','A Periculum Kit contains: * Chrono * Data-Slate * Magnoculars * 2 Ration Packs * Respirator * Vox-bead.'),
  },
  {
    ...gear(source.core.key,238,'Preysense Goggles','5R','[Any]'),
    ...toolz('Universal Equipment','You ignore any penalties to Tests due to visual conditions.'),
  },
  {
    ...gear(source.core.key,238,'Psychic Focus','3R','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Psychic Mastery (Wil) Tests.'),
  },
  {
    ...gear(source.core.key,238,'Ration Packs','1C','[Any]'),
    ...toolz('Universal Equipment','Nomnomnom...'),
  },
  {
    ...gear(source.core.key,239,'Respirator','2U','[Any]'),
    ...toolz('Universal Equipment','A Respirator canister lasts for 2 hours of continuous breathing. Whilst breathing through the Respirator, you are immune to breathable poisons and toxic atmospheres.'),
  },
  {
    ...gear(source.core.key,239,'Rule Of The Sororitas','2U','[Any]'),
    ...toolz('Imperial Equipment','If you have the ADEPTA SORORITAS Keyword, you can read the Rule of Sororitas as part of a Regroup to recover 1d3 Shock.'),
  },
  {
    ...gear(source.core.key,239,'Sacred Machine Oil','3U','Imperium,Adeptus Mechanicus'),
    ...toolz('Imperial Equipment','You may ignore any Complication involving Imperial technology in any scene (including combat).'),
  },
  {
    ...gear(source.core.key,239,'Slate Monitron','5R','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+2 bonus dice to Medicae (Int) Tests made to heal your Wounds.'),
  },
  {
    ...gear(source.core.key,239,'Stimm','3U','Imperium,Scum'),
    ...toolz('Imperial Equipment','Can be used as part of a Medicae (Int) Test to restore 1d3 + 3 Shock.'),
  },
  {
    ...gear(source.core.key,239,'Survival Kit','3U','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to all Survival (Wil) Tests.'),
  },
  {
    ...gear(source.core.key,240,'Symbol Of Authority','3U','[Any]'),
    ...toolz('Universal Equipment','+1 bonus die to Leadership (Wil) and Intimidation (Wil) Tests versus targets who would respect your position.'),
  },
  {
    ...gear(source.core.key,240,'Uplifting Primer','2C','Imperium,Astra Militarum'),
    ...toolz('Imperial Equipment','+1 bonus die to Scholar (Int) Test. A Complication on the Test means that the user learns potentially dangerous misinformation as determined by the GM.'),
  },
  {
    ...gear(source.core.key,240,'Void Suit','5R','[Any]'),
    ...toolz('Universal Equipment','Protects the wearer from the vacuum of space, with enough oxygen for five hours of continuous use. Includes a Vox Caster.'),
  },
  {
    ...gear(source.core.key,240,'Vox Bead','3U','[Any]'),
    ...toolz('Universal Equipment','You can communicate with anyone within 1,000 metres (one kilometer) that has a vox unit tuned to the same frequency.'),
  },
  {
    ...gear(source.core.key,240,'Vox Caster','3R','[Any]'),
    ...toolz('Universal Equipment','You can communicate with anyone within 100,000 metres (100 kilometers) that has a vox unit.'),
  },
  {
    ...gear(source.core.key,240,'Writing Kit','2C','Imperium'),
    ...toolz('Imperial Equipment','A kit to write stuff'),
  },
  {
    ...gear(source.core.key,241,'Bonesinger Shard','6R','Aeldari'),
    ...toolz('Aeldari Equipment','You ignore DN penalties to build, repair, maintain, and sabotage Aeldari technology.'),
  },
  {
    ...gear(source.core.key,241,'Spirit Stone','7V','Aeldari'),
    ...toolz('Aeldari Equipment','If an Aeldari dies while wearing a Spirit Stone, the Stone immediately absorbs the soul and stores it safely and secretly inside.'),
  },
  {
    ...gear(source.core.key,241,'Webway Keystone','7L','Aeldari'),
    ...toolz('Aeldari Equipment','You can make a DN 5 Tech (Int) Test to activate either of the following effects: (a) Detect the distance and orientation of the nearest Webway portal. (b) Open or close a Webway portal within 30 metres. Large or complex gates have higher DNs.'),
  },
  {
    ...gear(source.core.key,241,'Ammo Runt','5U','Ork'),
    ...toolz('Ork Equipment',''),
  },
  {
    ...gear(source.core.key,241,'Dok´s Toolz','5V','Ork'),
    ...toolz('Ork Equipment','You can make Medicae (Int) Tests to perform surgeries and heal others without suffering a DN penalty, including taking the Restore Shock option (p.124). Only usable for Ork biology. Whenever you roll a Complication whilst using a Dok Bag, the target suffers either 1 Wound or 1 Shock, whichever is funnier.'),
  },
  {
    ...gear(source.core.key,241,'Mek Toolz','5U','Ork'),
    ...toolz('Ork Equipment','Functions as a Combi-Tool (p.236) for Ork technology. Mek Toolz can be used to dismantle and other technology and reassemble it into Ork Wargear of an equal or lesser Value and Rarity. This re-assembly requires a Tech (Int) Test with a DN equal to the Value of the Ork Wargear you are creating, and takes a number of hours equal to the Value of the Wargear you are creating.'),
  },
  // Augments
  {
    ...gear(source.core.key,243,'Augmetic Arm','4R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +1 Strength per Augmetic Arm.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,243,'Augmetic Eye (Auger)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: '+1 bonus die to sight-based Awareness (Int) Tests.',
  },
  {
    ...gear(source.core.key,243,'Augmetic Eye (Night)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'Acts as Preysense Goggles (p.238).',
  },
  {
    ...gear(source.core.key,243,'Augmetic Eye (Pict Recorder)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'Can record up to 1 hour of video or 86,400 still images.',
  },
  {
    ...gear(source.core.key,243,'Augmetic Eye (Reticule)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: '+1 bonus die to ranged Attack Tests.',
  },
  {
    ...gear(source.core.key,243,'Augmetic Eye (Telescope)','6U','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You ignore any penalties related to visual distance.',
  },
  {
    ...gear(source.core.key,243,'Augmetic Legs','4R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +2 Speed and add 2 metres to any jump.',
    modifications: [ { targetGroup: 'traits', targetValue: 'speed', modifier: 2 } ],
  },
  {
    ...gear(source.core.key,244,'Augmetic Respirator','5R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +1 bonus die to Toughness Tests to resist toxic gasses and airborne poisons or diseases. You can hold your breath for twice as long, which doubles how long the air in a Void Suit or similar equipment lasts.',
  },
  {
    ...gear(source.core.key,244,'Augmetic Viscera','5V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Enhancements',
    snippet: 'You gain +1 Toughness.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,244,'Auger Array (Auspex)','4R','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You have an Auspex (p.236) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
  },
  {
    ...gear(source.core.key,244,'Auger Array (Diagnostor)','4R','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You have a Diagnostor (p.237) permanently implanted in your brain. You can take this implant twice, choosing the Auspex or Diagnostor each time.',
  },
  {
    ...gear(source.core.key,244,'Autodogmatic Cortex','6V','Imperium,Adeptus Mechanicus,Adeptus Administorum'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Willpower.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,244,'Cardioproxy','6L','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Toughness.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,244,'Cortex Implant','7V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Intellect.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,244,'Mechadendrites (Ballistic)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Laspistol (p.217). Your biology powers the weapon, so it does not use Ammo or need to be Reloaded.',
    meta: [ metaRange(7,1,0,12,1,['Pistol,Reliable']) ],
  },
  {
    ...gear(source.core.key,245,'Mechadendrites (Exploration)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as an Auspex (p.236). +1 bonus die to Survival (Wil) Tests to navigate or track.',
    modifications: [ { targetGroup: 'skills', targetValue: SKILLS.SURVIVAL, modifier: 1, condition: 'when navigation or tacking.' } ],
  },
  {
    ...gear(source.core.key,245,'Mechadendrites (Medicae)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Medikit (p.238) and a Diagnostor (p.237). +1 bonus die to Medicae (Int) Tests. Can be used to inject toxins, sedatives, and stimulants in combat as a Simple Injecting an unwilling target requires an Opposed Initiative Test.',
    modifications: [ { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1 } ],
  },
  {
    ...gear(source.core.key,245,'Mechadendrites (Optical)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Magnocular Scope (p.228) and Preysense Goggles (p.237). +1 bonus die to Awareness (Int) Tests; allows you to make microscopic examinations.',
    modifications: [ { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 1 } ],
  },
  {
    ...gear(source.core.key,245,'Mechadendrites (Servo-Arm)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'You gain +4 Strength when using the arm. In combat, the arm allows you to Brace (p.189) as a Free Action. You can use the arm as a melee weapon with the following profile: Damage 4+2ED, AP-3, Unwieldy(2)',
    meta: [ metaMelee(4,2,-3,1,['Unwieldy(2)']) ],
  },
  {
    ...gear(source.core.key,245,'Mechadendrites (Utility)','5V','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants', triptype: 'Mechadendrites',
    snippet: 'Functions as a Combi-Tool (p.236). +1 bonus die to Tech (Int) Tests.',
    modifications: [ { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 1 } ],
  },
  {
    ...gear(source.core.key,245,'Mind Impulse Unit','6R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You can converse with a machine spirit as an Action; this may require a Tech (Int) Test for unruly spirits. If you succeed, you gain +Double Rank bonus dice to all Tests to operate the machine.',
  },
  {
    ...gear(source.core.key,245,'Neuroplastic Psychosectemy','7L','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Intellect and +1 Willpower but suffer −2 Fellowship.',
    modifications: [
      { targetGroup: 'attributes', targetValue: ATTRIBUTES.INTELLECT, modifier: 1 },
      { targetGroup: 'attributes', targetValue: ATTRIBUTES.WILLPOWER, modifier: 1 },
      { targetGroup: 'attributes', targetValue: ATTRIBUTES.FELLOWSHIP, modifier: -2 },
    ],
  },
  {
    ...gear(source.core.key,246,'Reflex Catalyst','6V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Initiative.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'initiative', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,246,'Sinew Armature','6V','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Strength.',
    modifications: [ { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,246,'Subdermal Armour','4R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'You gain +1 Base Resilience.',
    modifications: [ { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 } ],
  },
  {
    ...gear(source.core.key,246,'Weapon Implant','3R','[Any]'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Value is 3+ Weapoin Value. Augmetic Arm Weapon Implant (p.246).',
  },
  {
    ...gear(source.core.key,246,'Eyes Of The Crone','5V','Aeldari'),
    type: 'Augmetics', subtype: 'Aeldari Augmetics',
    snippet: 'A single Eye of the Crone can have two different Augmetic Eye effects (p.243).',
  },
  {
    ...gear(source.core.key,246,'Heart Of Vaul','7L','Aeldari'),
    type: 'Augmetics', subtype: 'Aeldari Augmetics',
    snippet: 'You gain +1 to Defence and Armour in addition to any armour or shield you have.',
  },
  {
    ...gear(source.core.key,247,'Iron Gob','3R','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'You gain +1 Armour (this stacks with worn Armour) and +1 bonus die to Intimidation (Wil) Tests. You can make a melee bite attack with a Damage of 6 +2 ED.',
  },
  {
    ...gear(source.core.key,247,'Iron Gutz','5V','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'You gain +2 bonus dice to Tests to resist ingested poisons. You can automatically find food to subsist you in any environment.',
  },
  {
    ...gear(source.core.key,247,'Rebuild Cranium','6V','Ork'),
    type: 'Augmetics', subtype: 'Ork Bionics',
    snippet: 'Roll 1d3 at the start of each session. Your Intellect Attribute increases by the result. You may spend a point of Wrath to reroll the 1d3 at any time. The GM may force a reroll of the 1d3 under circumstances that could cause the bionik to malfunction.',
  },
];

const doctorsOfDoom = [
  {
    ...gear(source.dod.key,0,'Lawgiver','6C','Projectile,Adeptus Arbites'),
    type: 'Ranged Weapon',
    subtype: undefined,
    meta: [
      metaRange(9,1,0,12,1,['Pistol']),
      metaRange(9,1,0,12,2,['Pistol','Fullauto']),
      metaRange(0,0,0,12,1,['Pistol','Shock']),
      metaRange(9,1,0,12,1,['Pistol','Armor Piering']),
    ],
  },
];

const fspg = [
  {
    ...gear(source.fspg.key,121,'Kroot Rifle','3V','2-Handed,Blade,Kroot,Primitive'),
    type: 'Ranged Weapon',
    subtype: undefined,
    meta: [
      metaRange(8, 1, 0, 24, 2, ['Rapid Fire(1)']),
      metaMelee(4, 4, 0, 1,[]),
    ],
  },
  {
    ...gear(source.fspg.key,121,'Blessed Blade','8V','Blade,Imperium,Adeptus Ministorum,Adepta Sororitas'),
    ...meleez('Imperium Melee',5,5,-3,0,'Blessed(3),Parry,Rending(1)'),
  },
  {
    ...gear(source.fspg.key,121,'Crozius Arcanum','6V','Exotic,Adeptus Astartes'),
    ...meleez('Imperium Melee',5,4,-2,0,'Brutal'),
    snippet: 'Also counts as Symbol of Authority (core, pg. 240).',
  },
  {
    ...gear(source.fspg.key,121,'Dialogus Staff','5R','Adepta Sororitas'),
    ...meleez('Imperium Melee',3,3,0,0,'Reliable'),
    snippet: 'A Dialogus Staff functions as a weapon, a Symbol of Authority (core, pg. 240),and a Laud-Hailer (fspg, pg. 126).'
  },
  {
    ...gear(source.fspg.key,121,'Power Maul','6V','Power Field,Imperium,Adeptus Astartes,Adeptus Ministorum'),
    ...meleez('Imperium Melee',5,4,0,0,'Brutal'),
  },
  {
    ...gear(source.fspg.key,121,'Teaser Goad','4R','Adeptus Mechanicus'),
    ...meleez('Adeptus Mechanicus Melee',5,5,0,0,'Agonising'),
  },
  {
    ...gear(source.fspg.key,121,'Transonic Blade','6V','Blade,Transonic,Adeptus Mechanicus'),
    ...meleez('Adeptus Mechanicus Melee',5,5,0,0,'Parry,Rending(5)'),
  },
  {
    ...gear(source.fspg.key,121,'Transonic Razor','5V','Blade,Transonic,Adeptus Mechanicus'),
    ...meleez('Adeptus Mechanicus Melee',3,4,0,0,'Rending(4)'),
  },
  {
    ...gear(source.fspg.key,121,'Bullgryn Maul','3U','Imperium,Astra Militarum,Militarum Auxilla'),
    ...meleez('Ogryn Melee',4,4,-1,0,'Brutal'),
  },
  {
    ...gear(source.fspg.key,121,'Ripper Gun Bayonet','3U','Blade,Imperium,Astra Militarum,Militarum Auxilla'),
    ...meleez('Ogryn Melee',3,3,-1,0,'Reliable'),
  },
  // Ranged Weapons
  {
    ...gear(source.fspg.key,123,'Bolt Carbine','6V','Bolt,Imperium,Adeptus Astartes,Astartes Primaris'),
    ...rangez(undefined,12,1,0,24,2, 'Assault,Brutal,Rapid Fire(2)'),
  },
  {
    ...gear(source.fspg.key,123,'Condemnor Boltgun','6L','Bolt,Imperium,Adepta Sororitas'),
    ...rangez(undefined,10,1,0,24,2, 'Blessed(3),Brutal,Rapid Fire(2)'),
  },
  {
    ...gear(source.fspg.key,123,'Eradication Ray','8V','Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',13,1,-2,24,1, 'Heavy(5),Rending(3)'),
  },
  {
    ...gear(source.fspg.key,123,'Flechette Blaster','4U','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',8,2,0,12,2, 'Pistol,Rapid Fire(4)'),
  },
  {
    ...gear(source.fspg.key,123,'Macrostubber','6V','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',9,2,0,12,3, 'Pistol,Rapid Fire(3)'),
  },
  {
    ...gear(source.fspg.key,123,'Phosphor Serpenta','7V','Phosphex,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',12,2,-1,18,1, 'Assault,Melta'),
  },
  {
    ...gear(source.fspg.key,123,'Stubcarbine','6R','Projectile,Adeptus Mechanicus'),
    ...rangez('Adeptus Mechanicus Weapon',10,1,0,18,1, 'Pistol'),
  },
  {
    ...gear(source.fspg.key,123,'Grenadier Gauntlet','6V','Explosive,Astra Militarum,Militarum Auxilla'),
    ...rangez('Militarum Auxilla',11,3,0,12,1, 'Assault,Blast(2),Heavy(5)'),
  },
  {
    ...gear(source.fspg.key,123,'Ratling Rifle','6U','Projectile,Imperium,Astra Militarum,Militarum Auxilla'),
    ...rangez('Militarum Auxilla',9,1,0,36,0, 'Sniper(3),Reliable'),
  },
  {
    ...gear(source.fspg.key,123,'Ripper Gun','5V','Projectile,Imperium,Astra Militarum,Militarum Auxilla'),
    ...rangez('Militarum Auxilla',11,2,0,12,2, 'Assault,Brutal,Heavy(5)'),
  },
  {
    ...gear(source.fspg.key,124,'Frag Bomb','5U','Explosive,Imperium'),
    ...rangez('Grenades & Grenade Launcher',12,4,0,'STRx4','-', 'Blast(8)'),
  },
  {
    ...gear(source.fspg.key,124,'Melta Bomb','5V','Explosive,Imperium'),
    ...rangez('Grenades & Grenade Launcher',16,4,-4,'STRx4','-', 'Blast(4)'),
  },
  {
    ...gear(source.fspg.key,124,'Mindscrambler Grenade','5R','Explosive,Adeptus Mechanicus'),
    ...rangez('Grenades & Grenade Launcher',10,4,0,'STRx4','-', 'Agonising,Arc(4),Blast(6)'),
  },
  {
    ...gear(source.fspg.key,124,'Shock Grenade','2U','Explosive,Imperium'),
    ...rangez('Grenades & Grenade Launcher',3,4,0,'STRx4','-', 'Blast(6),Inflict(Blinded 1),Inflict(Vulnerable 1)'),
    snippet: 'Deals shock damage instead of wounds. Those that suffer shock are affected by Blinded and Vulnerable.'
    // does SHOCK damage
  },
  //
  {
    ...gear(source.fspg.key,125,'Kroot Armour','1U','Light,Primitive,Kroot'),
    ...armour('Primitive Armour',2,''),
  },
  {
    ...gear(source.fspg.key,125,'Mk X Phobos Power Armour','9V','Powered,Imperium,Adeptus Astartes,Primaris'),
    ...armour('Astartes Armour',4,'Powered(3)'),
  },
  {
    ...gear(source.fspg.key,125,'Sicarian Battle Armour','6R','Imperium,Adeptus Mechanicus,Skitarii'),
    ...armour('Astartes Armour',4,'Power Field'),
  },
  {
    ...gear(source.fspg.key,125,'Bullgryn Plate','5U','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
    ...armour('Militarum Auxilla',4,'Ogryn'),
    snippet: 'Ogryn Armour can`t be worn by Average-sized characteres.',
  },
  {
    ...gear(source.fspg.key,125,'Brute Shield','5R','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
    ...armour('Militarum Auxilla',3,'Shield,Ogryn'),
    snippet: 'Average-sized characters treat Ogryn shields as having the Bulk(2) trait.',
  },
  {
    ...gear(source.fspg.key,125,'Slabshield','5U','Heavy,Imperium,Astra Militarum,Militarum Auxilla'),
    ...armour('Militarum Auxilla',4,'Cumbersome,Shield,Ogryn'),
    snippet: 'Average-sized characters treat Ogryn shields as having the Bulk(2) trait.',
  },
  // Equipment
  {
    ...gear(source.fspg.key,125,'Brazier of Holy Fire','5L','Imperium,Adeptus Ministorum,Adepta Sororitas'),
    type: 'Tools & Equipment',
    snippet: 'Sheds light in 6m. If the carrier has Faith, DAEMONs touched by the light are Hindered. As a reflexive Action, spend Faith to attack with a +3ED (+6ED against DAEMONs) Hand Flamer (Core, pg. 219).',
  },
  {
    ...gear(source.fspg.key,126,'Diagnostor Helmet','5V','Imperium,Adeptus Astartes'),
    type: 'Tools & Equipment',
    snippet: 'Add +1 dice (+2 when targeting Astartes) to Medicae, when detecting/diagnosing diseases, injuries, ailments and cause of death.',
    modifications: [
      { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0, condition: 'when detecting/diagnosing diseases, injuries, ailments, cause of death.'},
      { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0, condition: 'when detecting/diagnosing diseases, injuries, ailments, cause of death targeting Astartes Species.'},
    ],
  },
  {
    ...gear(source.fspg.key,126,'Excrutiator','3R','Adeptus Ministorum,Inquisition'),
    type: 'Tools & Equipment',
    snippet: 'Oh boy, check the rules please',
  },
  {
    ...gear(source.fspg.key,126,'Laud-Hailer','3C','[ANY]'),
    type: 'Tools & Equipment',
    snippet: 'Doubles the range of talents and abilities that uses you voice.',
  },
  {
    ...gear(source.fspg.key,126,'Grapnel Launcher','4U','Imperium,Adeptus Astartes, Primaris'),
    type: 'Tools & Equipment',
    snippet: 'As Combat Action, fire at surface (Dn 3), range 30m, pull yourself up (Free Action).',
  },
  {
    ...gear(source.fspg.key,126,'Infravision','4U','Imperium,Adeptus Mechanicus'),
    type: 'Tools & Equipment',
    snippet: 'Count as Preysense Googles (Core, pg. 239) and allows to detect radiation in immediate area.',
  },
  {
    ...gear(source.fspg.key,127,'Narthecium','5R','Imperium,Adeptus Astartes'),
    type: 'Tools & Equipment',
    snippet: 'May make Medicae test for surgery and healing without DN penalty due to situation. When use as part of a Multi-Action, DN penalty is reduced by 2. Most Narthecium contains a Reductor to recover a dead Astartes geen seed with a Simple Action.',
  },
  {
    ...gear(source.fspg.key,127,'Null Rod','5R','Imperium,Adeptus Astartes'),
    type: 'Tools & Equipment',
    snippet: 'While wielding, any Psychic Mastery test within 18m suffer +3 DN.',
  },
  {
    ...gear(source.fspg.key,127,'Purity Seal','2R','Imperium'),
    type: 'Tools & Equipment',
    snippet: '+1 die to Corruption tests per seal while without corruption points.',
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 1, rank: 0, condition: 'to corruption test while without corruption points.'},
    ],
  },
  {
    ...gear(source.fspg.key,127,'Psychic Hood','5V','Imperium,Adeptus Astartes'),
    type: 'Tools & Equipment',
    snippet: '+1 die to Psychic Mastery Test. Your Deny the Witch DN is equal 1+ DN of the power.',
    modifications: [
      { targetGroup: 'skills', targetValue: SKILLS.PSYCHIC_MASTERY, modifier: 1, rank: 0},
    ],
  },
  {
    ...gear(source.fspg.key,127,'Simulacrum Imperialis','5L','Imperium,Adeptus Ministorum,Adepta Sororitas'),
    type: 'Tools & Equipment',
    snippet: 'While wielding, you and all faithfull allies within 15m gain +2 dice to corruption tests. ',
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 2, rank: 0, condition: 'to corruption tests, while faithfull and within 15m.'},
    ],
  },
  {
    ...gear(source.fspg.key,127,'Skull Helmet','4V','Imperium,Adeptus Astartes'),
    type: 'Tools & Equipment',
    snippet: 'While wearing, +1 die to Leadership tests against ADEPTUS ASTARTES.',
    modifications: [
      { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 1, rank: 0, condition: 'when targeting ADEPTUS ASTARTES.'},
    ],
  },
  // Augmetics
  {
    ...gear(source.fspg.key,128,'Abeyant','8L','Adeptus Mechanicus'),
    type: 'Augmetics',
    snippet: 'Hover up to 3m and move at your speed. You take no falling damage.',
    description:
      '<p><strong>Requirements:</strong> Four other augmetics</p>' +
      '<p>Allows you to hover up to 3 meters off the ground and move at your speed. You take no falling damage.</p>',
  },
  {
    ...gear(source.fspg.key,128,'B.O.N.E','4C','Imperium,Militarum Auxilla'),
    type: 'Augmetics', subtype: 'Auxilla Implants',
    snippet: 'Increase Max Intellect to 3 and increase Intellect by 1.',
    description:
      '<p><strong>Requirements:</strong> Ogryn Species, Leadership 1, Rank 3</p>' +
      '<p>Raise your Maximum Intellect to 3 and increase your Intellect by 1</p>',
    modifications: [
      { targetGroup: 'maxAttributes', targetValue: 'intellect', modifier: 3 },
      { targetGroup: 'attributes', targetValue: 'intellect', modifier: 1 },
    ],
  },
  {
    ...gear(source.fspg.key,128,'Chordclaw','5V','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics',
    snippet: 'Your hand becomes a weapon.',
    meta: [
      metaMelee(3,3,0,0,['Agonising','Rending(6)']),
    ],
  },
  {
    ...gear(source.fspg.key,128,'Enhanced Ballistic Mechadendrit','5V','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics',
    snippet: 'Reduce Multi-Attack/-Action DN penalty by 2. Using a Salvo option deals [Salvo] Shock. Never needs to be reloaded.',
    description:
      '<p><strong>Requirements:</strong> The Weapon you want to integrate into the Mechadendrite.</p>' +
      '<p>Reduce the DN penalty by 2 when attacking with this weapon as part of a Multi-Action or Multi-Attack. The weapon does not need to reload. Using Salvo options deal [Salvo] Shock.</p>',
  },
  {
    ...gear(source.fspg.key,128,'Infiltrator Headpiece','3U','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics',
    snippet: '+Rank to Passive Awareness.',
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.PASSIVE_AWARENESS, modifier: 0, rank: 1 },
    ],
  },
  {
    ...gear(source.fspg.key,129,'Princeps Limb Rig','3V','Imperium,Adeptus Mechanicus'),
    type: 'Augmetics',
    snippet: 'Additional limb that can operate equipment (pass a Tech test) or wield a melee weapon. Reduce Multi-Action/-Attack DN penalty by 1 when you use your additional limp.',
  },
];

const red2_eclisiarchy = [
  // Melee
  {
    ...gear(source.red2.key, 43, 'Anointed Halberd', 'R7', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...meleez('Ecclesiarchy Melee Weapon',7,4,-3,2,'Blessed (1)'),
  },
  {
    ...gear(source.red2.key, 43, 'Hallowed Mace', 'U6', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...meleez('Ecclesiarchy Melee Weapon',6,4,-2,1,'Blessed (1), Brutal'),
  },
  {
    ...gear(source.red2.key, 43, 'Mace of the Righteous', 'R8', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...meleez('Ecclesiarchy Melee Weapon',6,6,-2,1,'Blessed (2), Brutal'),
  },
  {
    ...gear(source.red2.key, 43, 'Novitiate Melee Weapon', 'C4', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...meleez('Ecclesiarchy Melee Weapon',4,4,0,1,'Parry'),
  },
  {
    ...gear(source.red2.key, 43, 'Spear of the Faithful', 'R6', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...meleez('Ecclesiarchy Melee Weapon',7,6,-3,2,'Blessed (2), Parry'),
  },
  {
    ...gear(source.red2.key, 43, 'Vindictor', 'U5', 'Flame, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    type: 'Melee Weapon',
    subtype: 'Ecclesiarchy Melee Weapon',
    meta: [
      metaMelee(5,5,-2,2,['Brutal', 'Inflict (On Fire)'], 'Melee'),
      metaRange(11, 2, -1, 8, 0, ['Flamer'], 'Shooting'),
    ],
  },
  // Ranged
  {
    ...gear(source.red2.key, 44, 'Artificer-crafted Storm Bolter', 'R7', 'BOLT, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...rangez('Ecclesiarchy Ranged Weapon',10,2,0,24,4,'Brutal, Heavy (3), Rapid Fire (4), Mastercrafted'),
  },
  {
    ...gear(source.red2.key, 44, 'Ministorum Flamer', 'R6', 'FLAME, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...rangez('Ecclesiarchy Ranged Weapon',11,2,0,12,1,'Flamer'),
  },
  {
    ...gear(source.red2.key, 44, 'Ministorum Hand Flamer', 'U5', 'FLAME, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...rangez('Ecclesiarchy Ranged Weapon',8,2,0,12,1,'Flamer, Pistol'),
  },
  {
    ...gear(source.red2.key, 44, 'Ministorum Shotgun', 'U5', 'PROJECTILE, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...rangez('Ecclesiarchy Ranged Weapon',9,2,0,12,1,'Spread'),
  },
  // Armor
  {
    ...gear(source.red2.key, 45, 'Novitiate Armour', 'U3', 'IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...armour('Ecclesiarchy Armour', 3, ''),
  },
  {
    ...gear(source.red2.key, 45, 'Sacresant Shield', 'R6', 'FORCE FIELD, IMPERIUM, ADEPTUS MINISTORUM, ADEPTA SORORITAS'),
    ...armour('Ecclesiarchy Armour', 3, 'Shield,Power Field'),
  },
];

const red2_mechanicus = [
  // Melee
  {
    ...gear(source.red2.key, 61, 'Arc Maul', 'U7', 'ARC, ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',6,3,-2,1,'Arc (3), Brutal'),
  },
  {
    ...gear(source.red2.key, 61, 'Cavalry Sabre', 'C3', 'Blade, ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',3,3,-1,1),
  },
  {
    ...gear(source.red2.key, 61, 'Clawed Serberys Limbs', 'C0', 'ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',4,3,0,1,'Brutal'),
  },
  {
    ...gear(source.red2.key, 61, 'Electroleech Stave', 'R7', 'ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',5,6,-2, 1,'Agonising,Brutal'),
  },
  {
    ...gear(source.red2.key, 61, 'Electrostatic Gauntlets', 'R7', 'ADEPTUS MECHANICUS'),
    type: 'Melee Weapon',
    subtype: 'Adeptus Mechanicus Melee Weapon',
    meta: [
      metaMelee(5,4,-1, 1, ['Agonising','Brutal'], 'Melee'),
      metaRange(11, 1, -1, 12, 1, ['Flamer'], 'Shooting'),
    ],
  },
  {
    ...gear(source.red2.key, 61, 'Pteraxii Talons', 'C0', 'ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',3,2,-1, 1,'Reliable'),
  },
  {
    ...gear(source.red2.key, 61, 'Taser Goad', 'U4', 'ADEPTUS MECHANICUS'),
    ...meleez('Adeptus Mechanicus Melee Weapon',5,5,0, 1,'Agonising'),
  },
  // Ranged
  {
    ...gear(source.red2.key, 63, 'Archeo-revolver', 'L7', 'PROJECTILE'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-2,12,1,'Pistol'),
  },
  {
    ...gear(source.red2.key, 63, 'Flechette Blaster', 'C4', 'PROJECTILE,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',8,2,0,12,2,'Pistol, Rapid Fire (4)'),
  },
  {
    ...gear(source.red2.key, 63, 'Flechette Carbine', 'C4', 'PROJECTILE,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',8,2,0,18,2,'Assault, Rapid Fire (4)'),
  },
  {
    ...gear(source.red2.key, 63, 'Gamma Pistol', 'R8', 'ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',13,3,-3,18,1,'Pistol, Rad (3)'),
  },
  {
    ...gear(source.red2.key, 63, 'Galvanic Carbine', 'U5', 'PROJECTILE,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',10,1,-1,18,2,'Rending (1)'),
  },
  {
    ...gear(source.red2.key, 63, 'Phosphor Blast Carbine', 'L8', 'PHOSPHEX,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-1,12,2,'Assault, Blast (4), Melta'),
  },
  {
    ...gear(source.red2.key, 63, 'Phosphor Blast Pistol', 'L8', 'PHOSPHEX,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',12,2,-1,12,1,'Blast (4), Melta, Pistol'),
  },
  {
    ...gear(source.red2.key, 63, 'Phosphor Pistol', 'R7', 'PHOSPHEX,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',10,2,-1,12,1,'Melta, Pistol'),
  },
  {
    ...gear(source.red2.key, 63, 'Phosphor Torch', 'R7', 'PHOSPHEX,ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',10,1,-1,12,1,'Flamer, Melta'),
  },
  {
    ...gear(source.red2.key, 63, 'Sulphur Breath', 'C0', 'ADEPTUS MECHANICUS'),
    ...rangez('Adeptus Mechanicus Ranged Weapon',10,2,-2,12,0,'Assault,Flamer'),
  },
];

const aioe = [
  {
    ...gear(source.aioe.key, 84, 'Splinter Rifle', 'U5', 'Aeldari,Drukhari'),
    ...rangez('Splinter Weapon',7,1,0,24,2,'Assault,Inflict(Poison 4),Rapid Fire(2)'),
  },
  {
    ...gear(source.aioe.key, 92, 'Kabalite Armour', 'U4', 'Aeldari,Drukhari'),
    ...armour('Aeldari Armour', 3, ''),
  },
  {
    ...gear(source.aioe.key, 96, 'Chains', 'C4', 'Aeldari,Drukhari,Kabal'),
    ...toolz('Drukhari Equipment','May be used as a Whip, +1 to Grapple attacks.'),
    meta: [
      metaMelee(1,1,0,4,['Agonising', '+1 to Grapple'], 'Whip'),
    ],
  },
  {
    ...gear(source.aioe.key, 96, 'Blades', 'C4', 'Aeldari,Drukhari,Kabal'),
    ...toolz('Drukhari Equipment','Successful melee attacks also inflict 1 Bleeding Condition.'),
  },
  {
    ...gear(source.aioe.key, 96, 'Hooks', 'C4', 'Aeldari,Drukhari,Kabal'),
    ...toolz('Drukhari Equipment','All attempts to grapple the Drukhari increase their DN by 1.'),
  },
  {
    ...gear(source.aioe.key, 96, 'Initiation Token', 'U4', 'Aeldari,Drukhari,Kabal'),
    ...toolz('Drukhari Equipment','When taking damage, the owner may instead choose another character with the same KABAL Keyword to take the hit. The new target must be within the owner’s move distance.'),
  },
];

const cos = [
  {
    ...gear(source.cos.key,138,'Heavy Squig Launcher','6U','Ork, Squig'),
    ...rangez('Ork Range Weapon','*','*','*',36,'-','Heavy(4)'),
    description: '<p>A larger version of the primitive weapon that propels murderous Orkoids known as Squigs wherever an Ork sees\n' +
      'fit. Whenever you fire a Heavy Squig Launcha, you can fire a Bile, Bitey, or Boom Squig.</p>'
  },
  {
    ...gear(source.cos.key,138,'Bile Squig','2U','Ork, Squig'),
    ...rangez('Ork Range Weapon',10,3,0,'*','-','Blast(8),Inflict(Poisoned 2)'),
    snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
  },
  {
    ...gear(source.cos.key,138,'Bitey Squig','2U','Ork, Squig'),
    ...rangez('Ork Range Weapon',12,2,3,'*','-','Brutal'),
    snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
  },
  {
    ...gear(source.cos.key,138,'Boom Squig','8U','Ork, Squig'),
    ...rangez('Ork Range Weapon',14,4,1,'*','-','Blast(4)'),
    snippet: 'For running Squig as a combatant, see Churf of Steel, pg. 138.',
  },
];

const tnh = [
  {
    ...gear(source.tnh.key,9,'Executioner Greatblade', '10L', 'Anathema Psykana,Power Field,2-Handed'),
    ...meleez('Power Weapon',7,5,-3,'-', 'Brutal'),
  },
  {
    ...gear(source.tnh.key,9,'Psyk-Out Grenade', '10L', 'Anathema Psykana'),
    ...rangez('Sister of Silence Range Weapon','*','*','*','*', '-', 'Blast(3),Thrown(STRx4),Special'),
    description: '<p><strong>Special:</strong> They do no damage but any target with the PSYKER Keyword must immediately make a Perils of the Warp roll if struck</p>',
    },
    {
      ...gear(source.tnh.key,9,'Witchseeker Flamer', '8V', 'Anathema Psykana,Fire,Imperium'),
      ...rangez('Sister of Silence Range Weapon',10,1,-1,8, 1, 'Assault,Blessed,Flamer'),
    },
    {
      ...gear(source.tnh.key,9,'Vratine Power Armour', '8L', 'Anathema Psykana,Power Field'),
      ...armour('Power Armour',5,'Powered(3)'),
    },
];

const afas = [
  {
    ...gear(source.afas.key,25,'Crux Terminatus','10V','Adeptus Astartes,Imperium'),
    snippet: 'Cast in stone and mounted on the bearer’s Power Armour, the Crux Terminatus is the ultimate symbol of valour in the Imperium.',
    modifications: [
      { targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
      { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
    ],
  },
];

const aaoaMelee = [
  // Ordinary Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,133,'Axe', '3C','Blade, [Any]'),
      ...meleez('Ordinary Melee Weapon', 3, 4, 0, 1, 'Rending (1)'),
    },
    {
      ...gear(source.aaoa.key,133,'Flail', '3C','[Any]'),
      ...meleez('Ordinary Melee Weapon', 3, 3, 0, 1, 'Brutal, Overhelming'),
    },
    {
      ...gear(source.aaoa.key,133,'Greataxe', '3C','Blade, 2-Handed, [Any]'),
      ...meleez('Ordinary Melee Weapon', 4, 4, 0, 2, 'Rending (1), Unwieldy (1)'),
    },
    {
      ...gear(source.aaoa.key,133,'Greatsword', '3C','Blade, 2-Handed, [Any]'),
      ...meleez('Ordinary Melee Weapon', 4, 3, -1, 2, 'Parry'),
    },
    {
      ...gear(source.aaoa.key,133,'Spear', '2C','[Any]'),
      ...meleez('Ordinary Melee Weapon', 3, 3, 0, 2, ''),
    },
  ],
  // Force Melee Weapon
  ...[
    {
      ...gear(source.aaoa.key,133,'Nemesis Falchion', '6V','Force, Grey Knights'),
      ...meleez('Force Weapon', 5, 4, -2, 1, 'Force, Nemesis, Paired, Parry'),
    },
    {
      ...gear(source.aaoa.key,133,'Nemesis Force Halberd', '6V','Force, Grey Knights'),
      ...meleez('Force Weapon', 5, 5, -2, 2, 'Force, Nemesis'),
    },
    {
      ...gear(source.aaoa.key,133,'Nemesis Force Sword', '6V','Force, Grey Knights'),
      ...meleez('Force Weapon', 5, 4, -3, 1, 'Force, Nemesis, Parry'),
    },
    {
      ...gear(source.aaoa.key,133,'Nemesis Warding Stave', '6V','Force, Grey Knights'),
      ...meleez('Force Weapon', 4, 2, -1, 1, 'Brutal, Force, Nemesis, Special'),
      description:
        '<p><strong>Special: </strong>Against melee attacks, a Nemesis Warding Stave also counts as a shield, providing an Armour Rating of *2, with the Force Shield and Shield traits.</p>',
    },
  ],
  // Power Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,134,'Crozius Arcanum', '6V', 'Power Field,Adeptus Astartes'),
      ...meleez('Power Weapon',5,5,-1,1,'Brutal'),
    },
    {
      ...gear(source.aaoa.key,134,'Accursed Crozius', '6V', 'Power Field,Heretic Astartes'),
      ...meleez('Power Weapon',5,5,-1,1,'Brutal'),
    },
    {
      ...gear(source.aaoa.key,177,'Executioner Greatblade', '7V', 'Power Field, 2-Handed, Anathma Psykana'),
      ...meleez('Power Weapon',6,5,-3,2,'Parry, Rending(2)'),
    },
    {
      ...gear(source.aaoa.key,134,'Lightning Claw', '7V', 'Power Field, Adeptus Astartes'),
      ...meleez('Power Weapon',5,4,-2,1,'Paired, Tearing'),
    },
    {
      ...gear(source.aaoa.key,134,'Power Lance', '6V', 'Power Field, Imperium, Adeptus Astartes'),
      ...meleez('Power Weapon',5,4,-1,2,'Special'),
      description:
        '<p><strong>Special: </strong>When used from a moving open-topped vehicle or other mount, add the Brutal trait.</p>',
    },
    {
      ...gear(source.aaoa.key,134,'Relic Blade', '8V', 'Power Field, 2-Handed, Adeptus Astartes'),
      ...meleez('Power Weapon',6,5,-3,2,''),
    },
  ],
  // Exotic Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,135,'Chordclaw (Apocrypha Pattern)', '6R', 'Transonic,Adeptus Mechanicus,Skitarii'),
      ...meleez('Exotic Melee Weapon',4,3,0,1,'Careful, Mortal (d3)'),
    },
    {
      ...gear(source.aaoa.key,135,'Electroleech Staff', '6R', 'Luminen, 2-Handed, Adeptus Mechanicus'),
      ...meleez('Exotic Melee Weapon', 6, 3, -2, 2,  'Agonizing, Mortal(d3), Special'),
      description:
        '<p><strong>Special: </strong>Only a character with a Luminen Capacitor may wield an Electroleech Staff – in the hands of anyone else, it counts as a normal staff. Each point of Shock inflicted by an Electroleech Staff adds 1 point of charge to the user’s Luminen Capacitor..</p>',
    },
    {
      ...gear(source.aaoa.key,135,'Electrostatic Gauntlets', '6R', 'Luminen, 2-Handed, Adeptus Mechanicus'),
      ...meleez('Exotic Melee Weapon', 6, 3, 0, 1,  'Tesla'),
      //...rangez('Projectile Range Weapon', 12, 1, 0, 12, 3, 'Assault, Tesla, Special'),
      description:
        '<p><strong>Ranged: </strong>Electrostatic Gauntlets can be used as a Ranged weapon, using the following profile:</p>' +
        '<p>Range: 12, Damage: 12+1ED, Salvo: 3, Assault, Tesla</p>' +
        '<p><strong>Special: </strong>Only a character with a Luminen Capacitor may wield Electrostatic Gauntlets. Electrostatic Gauntlets do not use normal reloads – instead, the wielder may expend charges from their Luminen Capacitor to gain the benefits of spending a reload, with each charge spent counting as one reload.</p>',
    },
    {
      ...gear(source.aaoa.key,135,'Neuro Gauntlet', '9L', 'Officio Assassinorum, Templus Eversor'),
      ...meleez('Exotic Melee Weapon', 6, 4, -1, 1,  'Inflict (Poisoned 5), Special'),
      description:
        '<p><strong>Special: </strong>While <em>Poisoned</em> by a Neuro-Gauntlet, a character is <em>Restrained</em> and suffers 1d3 Mortal Wounds at the beginning of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key,135,'Phase Sword', '10L', 'Phase Blade, Officio Assasinorum, Templum Callidus'),
      ...meleez('Exotic Melee Weapon',5,4,-3,1,'Warp Weapon'),
    },
    {
      ...gear(source.aaoa.key,135,'Poisoned Blades', '7V', 'Blade, Officio Assasinorum, Templum Callidus'),
      ...meleez('Exotic Melee Weapon',3,2,-1,1,'Inflict (Poisoned 5), Mortal (d3), Rending (3), Special'),
      description:
        '<p><strong>Special: </strong>A character Poisoned by Poisoned Blades suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key,135,'Taser Goad', '5R', 'Taser, Adeptus Mechanicus, Skitarii'),
      ...meleez('Exotic Melee Weapon',7,3,0,1,'Agonizing, Tesla'),
    },
    {
      ...gear(source.aaoa.key,135,'Transonic Blade', '6R', 'Transonic, Adeptus Mechanicus, Skitarii'),
      ...meleez('Exotic Melee Weapon',5,3,0,1,'Paired, Mortal (1)'),
    },
    {
      ...gear(source.aaoa.key,135,'Transonic Razor', '6R', 'Transonic, Adeptus Mechanicus, Skitarii'),
      ...meleez('Exotic Melee Weapon',4,3,0,1,'Mortal (1)'),
    },
  ],
  // Chaos Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,137,'Bubobic Axe', '7R', 'Blade, Chaos, Nurgle'),
      ...meleez('Chaos Melee Weapon',5,5,-2,1,'Inflict (Poisoned 4), Rending (1)'),
    },
    {
      ...gear(source.aaoa.key,137,'Flail of Corruption', '7R', 'Chaos, Nurgle'),
      ...meleez('Chaos Melee Weapon',6,4,-2,2,'Brutal, Inflict (Poisoned 4), Overwhelming'),
    },
    {
      ...gear(source.aaoa.key,137,'Great Plague Cleaver', '7V', 'Blade, 2-Handed, Chaos, Nurgle'),
      ...meleez('Chaos Melee Weapon',8,6,-3,2,'Brutal, Inflict (Poisoned 4), Unwieldy (2)'),
    },
    {
      ...gear(source.aaoa.key,137,'Mace of Contagion', '6R', '2-Handed, Chaos, Nurgle'),
      ...meleez('Chaos Melee Weapon',5,5,-1,1,'Inflict (Poisoned 4), Unwieldy (2)'),
    },
    {
      ...gear(source.aaoa.key,137,'Manreaper', '7L', 'Blade, 2-Handed, Chaos, Nurgle, Heretic Astartes'),
      ...meleez('Chaos Melee Weapon',7,4,-3,2,'Inflict (Poisoned 4), Reaping'),
    },
    {
      ...gear(source.aaoa.key,137,'Plague Knife', '5U', 'Blade, Chaos, Nurgle'),
      ...meleez('Chaos Melee Weapon',3,2,0,1,'Inflict (Poisoned 3)'),
    },
    {
      ...gear(source.aaoa.key,137,'Plague Sword', '7R', 'Blade, Chaos, Daemon, Nurgle'),
      ...meleez('Chaos Melee Weapon',5,4,0,1,'Inflict (Poisoned 4), Parry'),
    },
  ],
  // Aeldari Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,138,'Biting Blade', '8L','Chain, 2-Handed, Ancient, Aeldari, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 6, 4, -1, 2, 'Brutal, Silent, Parry, Tearing'),
    },
    {
      ...gear(source.aaoa.key,138,'Diresword', '9L','Power Field, Force, Ancient, Aeldari, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 5, 3, -3, 1, 'Force, Mortal (1), Parry'),
    },
    {
      ...gear(source.aaoa.key,182,'Executioner', '9L','Power Field, 2-Handed, Ancient, Aeldari, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 7, 4, -3, 2, 'Parry, Special'),
      description:
        '<p><strong>Special: </strong>The Parry trait of an Executioner adds +2 to the wielder’s Defence in melee, rather than +1.</p>',
    },
    {
      ...gear(source.aaoa.key,138,'Harlequins Blade', '4U','Blade, Harlequin'),
      ...meleez('Aeldari Melee Weapon', 4, 3, 0, 1, 'Parry, Rending (2)'),
    },
    {
      ...gear(source.aaoa.key,138,'Harlequins Caress', '6V','Power Field, Harlequin'),
      ...meleez('Aeldari Melee Weapon', 5, 5, -2, 1, 'Brutal'),
    },
    {
      ...gear(source.aaoa.key,138,'Harlequins Embrace', '6V','Monofilament, Harlequin'),
      ...meleez('Aeldari Melee Weapon', 5, 4, -3, 1),
    },
    {
      ...gear(source.aaoa.key,138,'Harlequins Kiss', '6V','Monofilament, Harlequin'),
      ...meleez('Aeldari Melee Weapon', 5, 4, -1, 1, 'Careful, Mortal (3)'),
    },
    {
      ...gear(source.aaoa.key,138,'Mirrorsword', '9L','Power Field, Aeldari, Anient, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 5, 4, -2, 1, 'Paired, Parry'),
    },
    {
      ...gear(source.aaoa.key,138,'Miststave', '7V','Force, Harlequin'),
      ...meleez('Aeldari Melee Weapon', 5, 3, -1, 1, 'Agonizing, Force'),
    },
    {
      ...gear(source.aaoa.key,138,'Power Blade', '6R','Power Field, Aeldari, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 5, 3, -2, 1),
    },
    {
      ...gear(source.aaoa.key,138,'Psytronome Shaper', '5R','Force, Aeldari, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 3, 2, 0, 1, 'Force'),
    },
    {
      ...gear(source.aaoa.key,138,'Scorpion Chainsword', '5R','Chain, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 5, 4, 0, 1, 'Brutal, Parry, Silent'),
    },
    {
      ...gear(source.aaoa.key,138,'Scorpions Claw', '5R','Power Field, Aeldari, Anient, Asuryani'),
      ...meleez('Aeldari Melee Weapon', 5, 5, -3, 1, 'Brutal'),
    },
  ],
  // Drukhari Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,140,'Agoniser','7V','Exotic, Drukhari'),
      ...meleez('Drukhari Melee Weapon',5,3,-2,2,'Agonizing, Inflict (Poisoned 5), Special'),
      description:
        '<p><strong>Special: </strong>While suffering the Poisoned condition from an Agoniser, a creature also suffers 1d3+1 Shock at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key,140,'Hekatarii Blade','5R','Blade, Drukhari'),
      ...meleez('Drukhari Melee Weapon',3,3,-1,1,'Parry,Rending(1)'),
    },
    {
      ...gear(source.aaoa.key,140,'Huskblade','8V','Blade, Drukhari'),
      ...meleez('Drukhari Melee Weapon',6,4,-2,1,'Mortal (d3)'),
    },
    {
      ...gear(source.aaoa.key,140,'Hydra Gauntlet','6V','Exotic, Drukhari'),
      ...meleez('Drukhari Melee Weapon',4,3,-1,1,'Paired, Tearing'),
    },
    {
      ...gear(source.aaoa.key,140,'Impaler','6V','Blade, Drukhari'),
      ...meleez('Drukhari Melee Weapon',4,4,-1,2,'Brutal'),
    },
    {
      ...gear(source.aaoa.key,140,'Klaive','7V','Power Field, 2-Handed, Drukhari'),
      ...meleez('Drukhari Melee Weapon',5,5,-3,1,'Parry'),
    },
    {
      ...gear(source.aaoa.key,140,'Raizorflail','5R','Blade, Drukhari'),
      ...meleez('Drukhari Melee Weapon',4,3,-1,2,'Overwhelming, Reaping'),
    },
    {
      ...gear(source.aaoa.key,140,'Shardnet','6R','Exotic, Drukhari'),
      ...meleez('Drukhari Melee Weapon',4,4,0,3,'Agonising, Careful, Inflict (Restrained)'),
    },
    {
      ...gear(source.aaoa.key,140,'Venom Blade','7V','Blade, Drukhari'),
      ...meleez('Drukhari Melee Weapon',5,4,0,1,'Inflict (Poisoned 7), Special'),
      description:
        '<p>Special: While suffering the Poisoned condition from a Venom Blade, a creature also suffers 1d3 Mortal Wounds at the start of each of their turns.</p>'
    },
  ],
  // Ork Melee Weapons
  ...[
    {
      ...gear(source.aaoa.key,141,'‘Urty Syringe', '4U', 'Exotic, Ork'),
      ...meleez('Ork Melee Weapon', 4, 4, 0, 1, 'Careful,Inflict(Poisoned 4), Waaagh!'),
    },
    {
      ...gear(source.aaoa.key,141,'Grabba Stikk', '4U', 'Exotic, Ork'),
      ...meleez('Ork Melee Weapon', 5, 3, 0, 2, 'Inflict(Restrained), Waaagh!'),
    },
    {
      ...gear(source.aaoa.key,141,'Grot Prod', '5R', 'Exotic, Ork'),
      ...meleez('Ork Melee Weapon', 5, 5, -1, 1, 'Agonising, Waaagh!'),
    },
    {
      ...gear(source.aaoa.key,141,'Killsaw', '10V', 'Exotic, Ork'),
      ...meleez('Ork Melee Weapon', 7, 6, -4, 1, 'Brutal, Unwieldy (3), Waaagh!'),
    },
    {
      ...gear(source.aaoa.key,141,'Power Stabba', '6R', 'Power Field, Ork'),
      ...meleez('Ork Melee Weapon', 5, 4, -2, 1, 'Waaagh!'),
    },
    {
      ...gear(source.aaoa.key,141,'Tankhammer', '8U', 'Exotic, Ork'),
      ...meleez('Ork Melee Weapon', 10, 5, -2, 1, 'Careful, Blast (Small), Waaagh!'),
    },
  ],
];

const aaoaRanged = [
  // Bolt Weapons
  ...[
    {
      ...gear(source.aaoa.key,186,'Absolvor Bolt Pistol','8V','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',12,2,-1,16,1,'Brutal,Pistol'),
    },
    {
      ...gear(source.aaoa.key,186,'Auto Bolt Rifle','7V','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,1,0,24,3,'Assault,Brutal,Rapid Fire (3)'),
      description:
        '<p><em>An Auto Bolt Rifle is fitted with an Ammunition Drum as standard.</em></p>',
    },
    {
      ...gear(source.aaoa.key,186,'Auto-Boltstorm Gauntlet','8V','Bolt, Power Field, Adeptus Astartes, Primaris'),
      type: 'Ranged Weapon',
      subtype: 'Bolt Weapon',
      meta: [
        metaRange(10, 1, 0, 18, 3, ['Assault','Brutal','Paired','Rapid Fire (3)']),
        metaMelee(5, 5, -3, 1,['Brutal', 'Unwieldy(2)', 'Paired']),
      ],
    },
    {
      ...gear(source.aaoa.key,186,'Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,1,0,24,2,'Assault, Brutal, Reliable, Rapid Fire (1)'),
    },
    {
      ...gear(source.aaoa.key,186,'Bolt Sniper Rifle','8V','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',12,1,0,36,1,'Brutal, Heavy (6), Sniper (2), Special'),
      description:
        '<p><strong>Special: </strong>When firing a Bolt Sniper Rifle, choose a single ammo type: Executioner (AP -1, +2d to the attack roll and ignore cover), Hyperfrag (add the Blast [Small] trait), or Mortis (+1ED, AP -2, add Inflict [Poisoned 5] trait)</p>' +
        '<p><em>A Bolt Sniper Rifle includes a Monoscope, Preysense Sight and Silencer as standard.</em></p>',
    },
    {
      ...gear(source.aaoa.key,186,'Boltstorm Gauntlet','8V','Bolt, Power Field, Adeptus Astartes, Primaris'),
      type: 'Ranged Weapon',
      subtype: 'Bolt Weapon',
      meta: [
        metaRange(10, 1, 0, 18, 3, ['Brutal','Pistol']),
        metaMelee(5, 5, -3, 1,['Brutal', 'Unwieldy(2)']),
      ],
    },
    {
      ...gear(source.aaoa.key,142,'Instigator Bolt Carbine','7R','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,2,-1,24,1,'Assault, Brutal, Silent, Sniper (1)'),
    },
    {
      ...gear(source.aaoa.key,186,'Marksman Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,1,0,24,1,'Brutal, Rapid Fire (1), Sniper (1)'),
      description:
        '<p><em>Marksman Bolt Carbines are fitted with a Monoscope as standard.</em></p>',
    },
    {
      ...gear(source.aaoa.key,186,'Occulus Bolt Carbine','6R','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,1,0,24,1,'Brutal, Rapid Fire (1), Special'),
      description:
        '<p><strong>Special: </strong>If used by a character equipped with a Divinator-class Auspex, attacks with an Occulus Bolt Carbine ignore all modifiers for the target being in cover.</p>' +
        '<p><em>Occulus Bolt Carbines are fitted with a Preysense Sight as standard.</em></p>',
    },
    {
      ...gear(source.aaoa.key,186,'Stalker Bolt Rifle','7V','Bolt, Adeptus Astartes, Primaris'),
      ...rangez('Bolt Weapon',10,2,-2,36,1,'Brutal, Heavy (4), Rapid Fire (1), Sniper (1)'),
      description:
        '<p><em>A Stalker Bolt Rifle comes with a Monoscope as standard.</em></p>',
    },
    {
      ...gear(source.aaoa.key,186,'Stalker-Pattern Boltgun','7V','Bolt, Adeptus Astartes, Deathwatch'),
      ...rangez('Bolt Weapon',10,1,-1,30,2,'Brutal, Heavy (4), Rapid Fire (1), Sniper (1)'),
      description:
        '<p><em>A Stalker-pattern Boltgun comes with a Monoscope as standard.</em></p>',
    },
  ],
  // Grav < Ranged
  ...[
    {
      ...gear(source.aaoa.key,143,'Grav-pistol','6V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
      ...rangez('Grav Weapon',8,1,-3,12,1,'Grav, Pistol'),
    },
    {
      ...gear(source.aaoa.key,143,'Grav-gun','6V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
      ...rangez('Grav Weapon',8,1,-3,18,1,'Grav, Rapid Fire (1)'),
    },
    {
      ...gear(source.aaoa.key,143,'Grav-cannon','7V','Grav, Adeptus Astartes, Adeptus Mechanicus, Squat'),
      ...rangez('Grav Weapon',8,2,-3,24,4,'Grav, Heavy (8)'),
    },
  ],
  // Plasma < Ranged
  ...[
    {
      ...gear(source.aaoa.key,144,'Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
      ...rangez('Plasma Weapon',15,1,-4,30,2,'Rapid Fire (1), Supercharge'),
    },
    {
      ...gear(source.aaoa.key,144,'Assault Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
      ...rangez('Plasma Weapon',13,1,-4,24,2,'Assault, Supercharge'),
    },
    {
      ...gear(source.aaoa.key,144,'Heavy Plasma Incinerator','7V','Plasma, Adeptus Astartes, Primaris'),
      ...rangez('Plasma Weapon',16,2,-4,36,1,'Heavy (4), Supercharge'),
      description:
        '<p><em>A Heavy Plasma Incinerator comes with a backpack ammunition supply.</em></p>',
    },
    {
      ...gear(source.aaoa.key,144,'Plasma Exterminator','8V','Plasma, Adeptus Astartes, Primaris'),
      ...rangez('Plasma Weapon',15,2,-3,18,1,'Blast (Small), Heavy (4), Supercharge'),
    },
    {
      ...gear(source.aaoa.key,144,'Plasma Caliver','8V','Plasma, Adeptus Mechanicus, Skitarii'),
      ...rangez('Plasma Weapon',15,1,-3,18,3,'Assault, Supercharge'),
    },
  ],
  // Flame Weapons
  ...[
    {
      ...gear(source.aaoa.key,145,'Flamestorm Gauntlet','8V','Flame, Power Field, Adeptus Astartes, Primaris'),
      ...rangez('Flame Weapon',10,1,0,8,1,'Assault, Blast (Medium), Inflict (On Fire), Paired, Spread'),
      description:
        '<p>May be used as Power Fist (Core pg. 212).</p>',
    },
    {
      ...gear(source.aaoa.key,145,'Incinerator','8V','Flame, Power Field, Adeptus Astartes, Grey Knights'),
      ...rangez('Flame Weapon',13,2,-1,8,2,'Blast (Large), Inflict (On Fire), Heavy (6), Spread'),
    },
  ],
  // Exotic < Ranged
  ...[
    {
      ...gear(source.aaoa.key,145,'Animus Speculum', '10L', 'Exotic, Officio Assasinorum, Tempus Culexus'),
      ...rangez('Exotic Weapon', 12, 1, -4, 18, 3, 'Agonizing, Assault, Special'),
      description:
        '<p><strong>Special: </strong>The animus speculum draws power from the assassin’s Force Matrix, described later in this document. It does not use normal Reloads.</p>',
    },
    {
      ...gear(source.aaoa.key,145,'Archeo-Revolver', '7R', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 12, 2, -2, 12, 1, 'Pistol, Stalwart'),
    },
    {
      ...gear(source.aaoa.key,145,'Deathwatch Frag Cannon', '8V', 'Explosive, Projectile, Deathwatch'),
      type: 'Ranged Weapon',
      subtype: 'Exotic Weapon',
      meta: [
        metaRange(14, 2, -1, 8, 2, ['Assault', 'Blast (Large)', 'Heavy (6)', 'Spread', 'Special'], 'Shrapnel'),
        metaRange(16, 2, -2, 24, 2, ['Assault', 'Heavy (6)', 'Special'], 'Shell'),
      ],
      description:
        '<p><strong>Special: </strong>When firing a Deathwatch frag cannon, select either shrapnel or solid shell mode. When the solid shell mode is used, add +2ED to the damage, and increase the AP to -3 when the target is within short range.</p>',
    },
    {
      ...gear(source.aaoa.key,193,'Executioner Pistol', '9L', 'Bolt, Needle, Officio Assasinorum, Tempus Eversor'),
      type: 'Ranged Weapon',
      subtype: 'Exotic Weapon',
      meta: [
        metaRange(10, 2, 0, 12, 1, ['Brutal', 'Pistol', 'Silent', 'Special'], 'Bolt'),
        metaRange(8, 3, 0, 12, 1, ['Agonizing', 'Inflict (Poisoned 4)', 'Pistol', 'Silent', 'Special'], 'Needler'),
      ],
      description:
        '<p><em>This functions as a combi-weapon (CORE, pg. 227) composed of a customised master-crafted bolt pistol and a customised needle pistol, fitted with a gene-grip bio-veritor.</em></p>',
    },
    {
      ...gear(source.aaoa.key,148,'Exitus Longrifle', '9L', 'Projectile, Officio Assasinorum, Tempus Vindicare'),
      ...rangez('Exotic Weapon', 12, 2, -3, 72, 1, 'Sniper (3), Steadfast'),
    },
    {
      ...gear(source.aaoa.key,146,'Exitus Pistol', '9L', 'Projectile, Officio Assasinorum, Tempus Vindicare'),
      ...rangez('Exotic Weapon', 10, 1, -3, 12, 1, 'Pistol, Steadfast'),
    },
    {
      ...gear(source.aaoa.key,146,'Flechette Blaster', '5R', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 7, 2, 0, 12, 5, 'Pistol, Spread'),
    },
    {
      ...gear(source.aaoa.key,146,'Flechette Carbine', '5R', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 7, 3, 0, 24, 5, 'Assault, Spread'),
    },
    {
      ...gear(source.aaoa.key,146,'Macrostubber', '5R', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 10, 1, 0, 12, 5, 'Pistol'),
    },
    {
      ...gear(source.aaoa.key,146,'Neural Shredder', '9L', 'Exotic, Officio Assasinorum, Templum Callidus'),
      ...rangez('Exotic Weapon', 4, 4, 0, 9, 0, 'Assault, Blast (Medium), Special'),
      description:
        '<p><strong>Special: </strong>A Neural Shredder uses no ammo and never needs to reload. It just works. Nobody knows entirely how. The damage of a Neuro Disruptor is compared to the target’s Resolve, rather than Resilience, and each point of damage inflicted is a Mortal Wound instead of a normal wound. It has no effect against mindless creatures or inanimate objects.</p>',
    },
    {
      ...gear(source.aaoa.key,146,'Phosphor Blast Pistol', '6R', 'Phosphex, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 12, 1, -1, 12, 1, 'Inflict (On Fire), Luminagen, Pistol'),
    },
    {
      ...gear(source.aaoa.key,146,'Phosphor Carbine', '6R', 'Phosphex, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 12, 1, -1, 24, 4, 'Assault, Inflict (On Fire), Luminagen'),
    },
    {
      ...gear(source.aaoa.key,146,'Phosphor Pistol', '5R', 'Phosphex, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 10, 1, -1, 12, 1, 'Luminagen, Pistol'),
    },
    {
      ...gear(source.aaoa.key,146,'Phosphor Serpenta', '7V', 'Phosphex, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 12, 1, -1, 18, 1, 'Assault, Inflict (On Fire), Luminagen'),
    },
    {
      ...gear(source.aaoa.key,146,'Phosphor Torch', '6R', 'Fire, Phosphex, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 10, 1, -1, 12, 1, 'Assault, Blast (Medium), Inflict (On Fire), Spread'),
    },
    {
      ...gear(source.aaoa.key,146,'Psilencer', '7V', 'Force, Grey Knights'),
      ...rangez('Exotic Weapon', 10, 2, 0, 24, 6, 'Force, Heavy (6), Special'),
      description:
        '<p><strong>Special: </strong>A Psilencer will not function in the hands of any character who does not have the PSYKER keyword.</p>',
    },
    {
      ...gear(source.aaoa.key,146,'Psycannon', '7V', 'Bolt, Force, Grey Knights, Ordo Malleus'),
      ...rangez('Exotic Weapon', 13, 2, -1, 36, 4, 'Brutal, Force, Heavy (6)'),
    },
    {
      ...gear(source.aaoa.key,146,'Stubcarbine', '5R', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 10, 1, 0, 18, 3, 'Pistol'),
    },
    {
      ...gear(source.aaoa.key,146,'Transuranic Arquebus', '8V', 'Projectile, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 16, 2, -2, 60, 0, 'Heavy (6), Mortal (1), Sniper (3), Special'),
      description:
        '<p><strong>Special: </strong>A Transuranic Arquebus cannot be fired if the wielder has moved in the same turn.</p>',
    },
    {
      ...gear(source.aaoa.key,146,'Volkite Serpenta', '10L', 'Volite, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 13, 1, 0, 10, 1, 'Inflict (On Fire), Pistol'),
    },
    {
      ...gear(source.aaoa.key,146,'Volkite Charger', '10L', 'Volite, Adeptus Mechanicus'),
      ...rangez('Exotic Weapon', 13, 1, 0, 15, 2, 'Assault, Inflict (On Fire)'),
    },
  ],
  // Grenades & Launchers < Ranged
  ...[
    {
      ...gear(source.aaoa.key, 149, 'Fragstorm Grenade Launcher', '6V', 'Explosive, Adeptus Astartes, Primaris'),
      ...rangez('Grenades & Grenade Launcher', 10, 4, 0, 18, 0, 'Assault, Blast (Medium)'),
      triptype: 'Grenade Launcher',
    },
    {
      ...gear(source.aaoa.key, 149, 'Melta Bomb', '6R', 'Melta, Imperium, Aeldari'),
      ...rangez('Grenades & Grenade Launcher', 16, 6, -4, 'STRx4', '-', 'Blast (Small), Melta, Unwieldy (2)'),
      triptype: 'Grenade',
      description:
        '<p><strong>Special: </strong>Any target within a Melta Bomb’s blast is considered to be within close range for the purposes of the Melta trait. Melta Bombs cannot be used in a grenade launcher. In addition, they may be placed onto a vehicle or structure within 1m rather than thrown, requiring a Tech test with a DN equal to the vehicle’s Defence. Placed melta bombs do not detonate immediately and can be detonated as a simple action on any of the character’s subsequent turns.</p>',
    },
    {
      ...gear(source.aaoa.key, 149, 'Psyk-Out Grenade', '8L', 'Exotic, Silent Sisterhood, Grey Knights, Templum Culexus'),
      ...rangez('Grenades & Grenade Launcher', 7, 4, 0, 'STRx4', '-', 'Blast (Medium)'),
      triptype: 'Grenade',
      description:
        '<p><strong>Special: </strong>Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.</p>',
    },
    {
      ...gear(source.aaoa.key, 149, 'Shock Grenade', '7V', 'Exotic, Adeptus Astartes, Primaris'),
      ...rangez('Grenades & Grenade Launcher', '-', '-', '-', 'STRx4', '-', 'Blast (Medium)'),
      triptype: 'Grenade',
      description:
        '<p><strong>Special: </strong>Shock Grenades do not inflict damage. Rather, to use a Shock Grenade, make a Ballistic Skill test as an Interaction Attack against your targets’ Resolve (make one test and compare it individually to the Resolve of each enemy in the blast). This inflicts the normal results from an Interaction Attack on each affected target, and all targets must either be hindered or vulnerable—you can’t mix and match.</p>',
    },
    {
      ...gear(source.aaoa.key, 149, 'Smoke Grenade', '4C', 'Explosive, [Any]'),
      ...rangez('Grenades & Grenade Launcher', '-', '-', '-', 'STRx4', '-', 'Blast (Large)'),
      triptype: 'Grenade',
      description:
        '<p><strong>Special: </strong>Smoke Grenades do not inflict damage. Rather, to use a Smoke Grenade, make a Ballistic Skill test to target a specific location; if it hits, that is where the smoke emerges, filling the blast area. Attempts to see, or make ranged attacks, through the smoke suffer +4 DN. The smoke dissipates over time, reducing the DN penalty by 1 at the end of each round. Strong winds may make the smoke dissipate more quickly, at GM’s discretion.</p>',
    },
    {
      ...gear(source.aaoa.key, 168, 'Psyk-Out Grenades', '8L', 'Exotic, Silent Sisterhood, Grey Knights, Templum Culexus'),
      ...rangez('Grenades & Grenade Launcher', 7, 4, '-', 'STRx4', '-', 'Blast (6)'),
      triptype: 'Grenade',
      description:
        '<p><strong>Special: </strong>Against a character with the Psyker or Daemon keywords, a Psyk-Out Grenade inflicts an automatic 1d3 Mortal Wounds.</p>',
    },
  ],
  // Chaos Ranged
  ...[
    {
      ...gear(source.aaoa.key, 150, 'Blastmaster', '7V', 'Sonic, Chaos, Slaanesh'),
      type: 'Ranged Weapon', subtype: 'Chaos Weapon',
      meta: [
        metaRange(16, 2, -2, 48, 1, ['Blast (Medium)', 'Cacophony', 'Heavy (6)'], 'Single Frequenzy'),
        metaRange(10, 1, -1, 36, 1, ['Blast (Large)', 'Cacophony', 'Heavy (6)'], 'Varied Frequenzy'),
      ],
      description:
        '<p><strong>Special: </strong>When firing a Blastmaster, choose which profile you wish to use before resolving the attack.</p>',
    },
    {
      ...gear(source.aaoa.key, 150, 'Blight Grenade', '4U', 'Explosive, Chaos, Nurgle'),
      ...rangez('Chaos Weapon',10,4,0,'STRx4','-','Blast (Medium), Inflict (Poisoned 4)'),
      description:
        '<p><strong>Special: </strong>A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key, 150, 'Blight Launcher', '7V', 'Explosive, Chaos, Nurgle'),
      ...rangez('Chaos Weapon',13,4,-2,24,2,'Assault, Blast (Medium), Inflict (Poisoned 4)'),
      description:
        '<p><strong>Special: </strong>A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key, 150, 'Doom Siren', '6R', 'Sonic, Chaos, Slaanesh'),
      ...rangez('Chaos Weapon',12,1,-2,8,1,'Assault, Blast (Medium), Cacophony'),
    },
    {
      ...gear(source.aaoa.key, 150, 'Heavy Warpflamer', '6R', 'Fire, Chaos, Tzeench'),
      ...rangez('Chaos Weapon',12,2,-2,8,2,'Corrupting, Flamer, Heavy (6)'),
    },
    {
      ...gear(source.aaoa.key, 150, 'Plague Belcher', '6R', 'Pestilent, Chaos, Nurgle'),
      ...rangez('Chaos Weapon',10,1,0,8,1,'Assault, Flamer, Inflict (Poisoned 4), Spread'),
      description:
        '<p><strong>Special: </strong>PESTILENT weapons with the Flamer trait do not inflict the On Fire condition. Rather, they inflict the Poisoned 4 condition. A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key, 150, 'Plague Spewer', '6R', 'Pestilent, Chaos, Nurgle'),
      ...rangez('Chaos Weapon',12,2,-1,8,2,'Flamer, Heavy (6), Inflict (Poisoned 4)'),
      description:
        '<p><strong>Special: </strong>PESTILENT weapons with the Flamer trait do not inflict the On Fire condition. Rather, they inflict the Poisoned 4 condition. A character Poisoned by a NURGLE weapon suffers 1d3 Mortal Wounds at the start of each of their turns.</p>',
    },
    {
      ...gear(source.aaoa.key, 150, 'Sonic Blaster', '6R', 'Sonic, Chaos, Slaanesh'),
      ...rangez('Chaos Weapon',10,1,0,24,3,'Assault, Cacophony'),
    },
    {
      ...gear(source.aaoa.key, 150, 'Warpflame Pistol', '6R', 'Fire, Chaos, Tzeench'),
      ...rangez('Chaos Weapon',7,1,-2,6,1,'Corrupting, Flamer, Pistol'),
    },
    {
      ...gear(source.aaoa.key, 150, 'Warpflamer', '6R', 'Fire, Chaos, Tzeench'),
      ...rangez('Chaos Weapon',10,1,-2,8,1,'Assault, Corrupting, Flamer'),
    },
  ],
  // Aeldari < Ranged
  ...[{
    ...gear(source.aaoa.key,152,'Avenger Shuriken Catapult', '7R','Shuriken, Aeldari, Asuryani'),
    ...rangez('Aeldari Ranged Weapon', 10, 1, 0, 18, 3, 'Assault, Rending (3)'),
  },
    {
      ...gear(source.aaoa.key,152,'Bright Lance', '7R','Las, Aeldari, Asuryani'),
      ...rangez('Aeldari Ranged Weapon', 16, 3, -4, 36, 0, 'Heavy (4), Sniper (1)'),
    },
    {
      ...gear(source.aaoa.key,152,'Deathspinner', '7V','Monofilament, Aeldari, Asuryani'),
      ...rangez('Aeldari Ranged Weapon', 14, 2, 0, 12, 3, 'Assault, Brutal, Inflict (Restrained), Rending (4)'),
    },
    {
      ...gear(source.aaoa.key,152,'Dragon´s Breath Flamer', '7L','Fire, Ancient, Aeldari, Asuryani'),
      ...rangez('Aeldari Ranged Weapon', 12, 3, -1, 20, 3, 'Assault, Blast (Large), Inflict (On Fire), Spread'),
    },
    {
      ...gear(source.aaoa.key,152,'Firepike', '7L','Melta, Ancient, Aeldari, Asuryani'),
      ...rangez('Aeldari Ranged Weapon', 16, 4, -4, 18, 1, 'Assault, Blast (Small), Inflict (On Fire), Melta'),
    },
    {
      ...gear(source.aaoa.key,152,'Fusion Pistol', '7R','Melta, Aeldari'),
      ...rangez('Aeldari Ranged Weapon', 16, 1, -4, 6, 1, 'Melta, Pistol'),
    },
    {
      ...gear(source.aaoa.key,152,'Laser Lance', '7R','Las, Aeldari, Asuryani, Exodite'),
      ...rangez('Aeldari Ranged Weapon', 14, 2, -4, 6, 0, 'Assault, Melee'),
      description:
        '<p><strong>Melee:</strong> A Laser Lance can be used as a melee weapon, using the following profile:</p>' +
        '<p>Range: 2m, Damage: 3 +3ED, AP: -4, Special</p>' +
        '<p><strong>Special:</strong> When a character wielding a laser lance charges while mounted (upon a vehicle or creature), the laser lance’s damage in melee is 14+2ED, though it is not modified by the user’s Strength.</p>',
    },
    {
      ...gear(source.aaoa.key,153,'Neuro Disruptor', '8V','Exotic, Harlequins'),
      ...rangez('Aeldari Ranged Weapon', 4,4,0, 18, 0, 'Pistol, Special'),
      description:
        '<p><strong>Special:</strong> A Neuro Disruptor uses no ammunition and cannot run out of ammunition. It just works. Nobody knows entirely how. The damage of a Neuro Disruptor is compared to the target’s Resolve, rather than Resilience, and each point of damage inflicted is a Mortal Wound instead of a normal wound. It has no effect against mindless creatures or inanimate objects.</p>',
    },
    {
      ...gear(source.aaoa.key,153,'Hallucinogen Grenade', '7R','Gas, Aeldari, Harlequins'),
      ...rangez('Aeldari Ranged Weapon', '*','*','*', 'STRx4', '-', 'Blast (Large), Special'),
      description:
        '<p><strong>Special:</strong> Any creature caught in the blast of a Hallucinogen Grenade must pass a Terror test (TN 5). Further, if a creature suffers a complication on this test, then they also suffer 1d3 mortal wounds.</p>',
    },
    {
      ...gear(source.aaoa.key,153,'Pack Grenade Launcher', '7R','Explosive, Harlequins'),
      ...rangez('Aeldari Ranged Weapon','*','*','*',18,'-','Assault, Special'),
      description:
        '<p><strong>Special:</strong> A Pack Grenade Launcher can carry up to 6 grenades, and additional grenades cannot be loaded during battle.</p>',
    },
    {
      ...gear(source.aaoa.key,153,'Shuriken Cannon', '6R','Shuriken, Aeldari'),
      ...rangez('Aeldari Ranged Weapon',14,2,0,24,4,'Assault, Heavy (3), Rending (3)'),
    },
  ],
  // Drukhari < Ranged
  ...[
    {
      ...gear(source.aaoa.key,156,'Splinter Pistol','5U','Splinter,Drukhari'),
      ...rangez('Drukhari Ranged Weapon',8,2,0,12,2,'Inflict(Poisoned 4),Pistol'),
      snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
    },
    {
      ...gear(source.aaoa.key,156,'Splinter Rifle','5U','Splinter,Drukhari'),
      ...rangez('Drukhari Ranged Weapon',8,2,0,24,2,'Inflict(Poisoned 4),Rapid Fire(2)'),
      snippet: 'A character who was Poisoned by a weapon with the SPLINTER keyword suffers 1 Mortal Wound at the start of each of their turns. A selection of alternative Drukhari poisons are presented in the Reloads and Ammunition section, which replace this effect.',
    },
  ],
  // Ork < Ranged
  ...[
    {
      ...gear(source.aaoa.key,158,'Kustom Mega Blasta','7R','Kustom, Plasma, Ork'),
      ...rangez('Ork Weapon',16,5,-3,24,1,'Assault,Supercharge,Waaagh!'),
      snippet: 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it. The additional ED it provides are already included in the weapon’s profile.',
    },
    {
      ...gear(source.aaoa.key,158,'Tankbusta Bomb', '5R', 'Explosive, Ork'),
      ...rangez('Ork Range Weapon', 16, 3, -3, 1, '-', 'Brutal, Blast(Small), Waaagh!'),
      snippet: 'A Tankbusta Bomb cannot be thrown or fired from a launcher. It must be planted with a Tech test against a vehicle within 1m, with a DN equal to the vehicle’s Defence. The bomb will detonate at the end of the current turn. After placing a Tankbusta Bomb, the character may move 1d3+1 metres away from the bomb and fall Prone as they leap away before the bomb detonates.',
    },
  ],
];

const aaoaWeaponUpgrades = [
  // Upgrades
  ...[
  ],
  // Reloads & Ammunition
  ...[
    {
      ...gear(source.aaoa.key,163,'Shrieker Bio-Explosive Discs','9L','Harlequin'),
      type: 'Ammo',
      subtype: 'Special Shuriken Ammo',
      snippet: 'The Weapon gains the Careful and Inflict (Poison 7) traits. It also gains Bio-Explosive (explodes on death) and is only a single round (no salvo, its gone).',
      description:
        '<p><strong>Effect: </strong>The weapon gains the Careful and Inflict (Poisoned 7) trait.</p>' +
        '<p><strong>Bio-Explosive: </strong>A character who is Poisoned by Shrieker ammo is also Staggered and suffers 1d3 Mortal Wounds at the start of each of their turns. If they are slain by this damage, they explode with a Medium blast, inflicting 10+6ED damage to anyone in that blast. Any of the victim’s allies within 15 metres must attempt a Terror test (DN 7).</p>' +
        '<p><strong>Single Shot: </strong>A reload of Shrieker ammo consists of a single round. Using this ammunition expends that round, and grants none of the normal benefits a Salvo action.</p>',
    },
    {
      ...gear(source.aaoa.key,162,'Exitus Hellfire Rounds','10L','Templum Vindicare'),
      type: 'Ammo',
      subtype: 'Special Exitus Ammo',
      snippet: '2ED, +3ED against organic targets . In addition, the weapon gains the Careful and Inflict (Poisoned 5) trait. Poisoned. Single Shot. (see rules)',
      description:
        '<p>2ED, +3ED against organic targets . In addition, the weapon gains the Careful and Inflict (Poisoned 5) trait.</p>' +
        '<p><strong>Poisoned:</strong> A creature Poisoned by an Exitus round suffers 1d3 Mortal Wounds at the start of each of their turns.</p>' +
        '<p><strong>Single Shot:</strong> A reload of Exitus special ammunition consists of a single round. Using this ammunition expends that round , and grants none of the normal benefits a Salvo action.</p>',
    },
    {
      ...gear(source.aaoa.key,162,'Exitus Shield-breaker Rounds','10L','Templum Vindicare'),
      type: 'Ammo',
      subtype: 'Special Exitus Ammo',
      snippet: 'The weapon gains the Careful and Warp Weapon traits. (see rules)',
      description:
        '<p>The weapon gains the Careful and Warp Weapon traits. Single Shot.</p>' +
        '<p><strong>Single Shot:</strong>A reload of Exitus special ammunition consists of a single round. You sing this ammunition expends that round, and grants none of the normal benefits a Salvo action.</p>',
    },
    {
      ...gear(source.aaoa.key,162,'Exitus Turbo-Penetrator Rounds','10L','Templum Vindicare'),
      type: 'Ammo',
      subtype: 'Special Exitus Ammo',
      snippet: 'The weapon gains the Careful, Brutal , and Rending [4] traits. (see rules)',
      description:
        '<p>The weapon gains the Careful, Brutal , and Rending [4] traits. Single Shot.</p>' +
        '<p><strong>Single Shot:</strong> A reload of Exitus special ammunition consist s of a single round. Using this ammunition expends that round, and grants none of the no rmal benefits a Salvo action</p>',
    },
  ],
  // Drukhari Poisons
  ...[
  ],
];

const aaoaArmour = [
  // Basic
  ...[
    {
      ...gear(source.aaoa.key,166,'Arbites Carapace','6V','Heavy, Imperium, Adeptus Arbites'),
      ...armour('Basic Armour',4),
      description:
        '<p>The armour includes built-in vox-bead and a respirator.</p>',
    },
    {
      ...gear(source.aaoa.key,166,'Riot Shield','4U','Light,Imperium'),
      ...armour('Basic Armour',1,'Shield'),
    },
    {
      ...gear(source.aaoa.key,166,'Supression Shield','6R','Heavy,Shock,Imperium,Adeptus Arbites'),
      ...armour('Basic Armour',2,'Bulk (1), Shield, Discharge'),
      description:
        '<p><strong>Discharge: </strong>An enemy who fails a melee attack against someone wielding a suppression shield immediately suffers 1 Shock. Anyone suffering a complication on a melee attack against someone wielding a suppression shield suffers 1d3 Shock.</p>',
    },
    {
      ...gear(source.aaoa.key,166,'Vindicare Stealth Suit','10L','Light,Imperium,Officio Assassinorum,Templum Vindicare'),
      ...armour('Basic Armour',2, 'Cameleoline'),
      description:
        '<p><strong>Cameleoline:</strong> The photoreactive mimic - fibres in the suit blur’s the wearer’s outline, granting a +2d bonus to Stealth tests and a +2 bonus to Defence when in shadow or in cover.</p>',
    },
    {
      ...gear(source.aaoa.key,189,'Vratine armour', '7V', 'Powered, Imperium, Silent Sisterhood'),
      ...armour('Astartes Armour', 5, 'Powered (2)'),
    },
    {
      ...gear(source.aaoa.key,167,'Sicarian Battle-Armour', '6V', 'Heavy, Imperium, Adeptus Mechanicus, Skitarii'),
      ...armour('Basic Armour', 4),
      description:
        '<p>Sicarian Battle-Armour has an Armour Rating of 4, plus an invulnerable Armour Rating of *1, which do not stack.</p>'
    },
  ],
  // Astartes
  {
    ...gear(source.aaoa.key,174,'Gravis Mark X', '9V', 'Powered, Imperium, Adeptus Astartes, Primaris'),
    ...armour('Astartes Armour', 5, 'Powered (4), Bulk (1)'),
    description:
      '<p><strong>Reinforced:</strong> The wearer adds +2 to their Toughness while wearing this armour.</p>'
  },
  // Force Shields
  {
    ...gear(source.aaoa.key,174,'Voltagheist Field Generator', '6R', 'Force Field, Cult Mechanicus'),
    ...armour('Basic Armour', 3),
    description:
      '<p><strong>Discharge: </strong>When you charge while wearing a Voltagheist Field generator, roll a d6 for each enemy within 2m of you when you finish the charge. For each 6 rolled, that enemy suffers a Mortal Wound. Any enemy who rolls a 1 on their Wrath die when making a melee attack against you also suffers one Mortal Wound.</p>' +
      '<p><strong>Luminen Charge: </strong>A Voltagheist field generator will not function unless you have a Luminen Capacitor implant with one or more charges. If the Capacitor has more charges than its normal amount, then add +1 to the Armour Rating of the field for every additional charge you have, to a maximum Armour Rating of 6.</p>'
  },
  // Chaos
  // Aeldari
  ...[
    {
      ...gear(source.aaoa.key,176,'Aspect Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior'),
      ...armour('Aeldari Armour', 4),
    },
    {
      ...gear(source.aaoa.key,176,'Heavy Aspect Armour', '5V', 'Heavy, Aeldari, Asuryani, Aspect Warrior'),
      ...armour('Aeldari Armour', 5, 'Bulk (1)'),
    },
    {
      ...gear(source.aaoa.key,167,'Exarch Armour', '5V', 'Aeldari, Asuryani, Aspect Warrior'),
      ...armour('Aeldari Armour', 6),
    },
    {
      ...gear(source.aaoa.key,176,'Forceshield', '8L', 'Force Field, Aeldari'),
      ...armour('Aeldari Armour', 3, 'Force Shield, Shield'),
    },
    {
      ...gear(source.aaoa.key,176,'Holo-Suit', '7V', 'Hologram, Light, Harlequin'),
      ...armour('Aeldari Armour', 1, 'Force Shield, Domino Field'),
      snippet: 'Gain defence bonus depending on previous movement: +1 (stationary), +2 (moved), +3 (ran), +4 (sprinted).',
      description:
        '<p><strong>Domino Field: </strong>A Holo-Suit increases the wearer’s Defence based on how much they have moved. It grants +1 Defence if the wearer was stationary last turn. This increases to +2 if the wearer moved, +3 if the wearer Ran, or +4 if the wearer Sprinted.</p>',
    },
  ],
  // Drukhari
  ...[
    {
      ...gear(source.aaoa.key,177,'Clone Field', '8L', 'Hologram, Drukhari'),
      ...armour('Drukhari Armour', 0, 'Deceptive Defence'),
      description:
        '<p>A Clone Field cannot be worn with Force Field armour, as energy fields disrupt the holographic decoys.</p>' +
        '<p><strong>Deceptive Defence:</strong> Whenever you are attacked while wearing a Clone Field, roll a d6. On an Icon, the attack is considered to have missed. This has no effect against Blasts or area effect attacks.</p>'
    },
    {
      ...gear(source.aaoa.key,177,'Ghostplate', '6V', 'Light, Drukhari'),
      ...armour('Drukhari Armour', 4, 'Force Shield, Field Projectors'),
      description:
        '<p><strong>Field Projectors:</strong> Ghostplate has an Armour Rating of 4, plus an invulnerable Armour Rating of *1, which do not stack.</p>'
    },
    {
      ...gear(source.aaoa.key,177,'Incubus Warsuit', '6V', 'Heavy, Drukhari'),
      ...armour('Drukhari Armour', 5, 'Tormentor'),
      description:
        '<p><strong>Tormentor:</strong> Enemies within 6 metres of this armour’s wearer suffer 1 Shock at the start of their turn.</p>'
    },
    {
      ...gear(source.aaoa.key,177,'Kabalite Warsuit','4R','Light,Drukhari'),
      ...armour('Drukhari Armour', 3),
      snippet: 'Contains a vox and a rebreather, or Dark Eldar equivalents of these items.',
    },
    {
      ...gear(source.aaoa.key,177,'Shadowfield', '8L', 'Force Field, Drukhari'),
      ...armour('Drukhari Armour', 8, 'Force Shield, Near-Perfect Defence, Overload'),
      description:
        '<p><strong>Near-Perfect Defence:</strong> The wearer of a functioning Shadowfield may roll Determination without spending Shock, and rolls 9d6 when they roll Determination.</p>' +
        '<p><strong>Overload:</strong>If the wearer of a Shadowfield takes any damage, the field overloads and will provide no benefit until after the next Regroup.</p>'
    },
    {
      ...gear(source.aaoa.key,167,'Wychsuit','3U','Light,Drukhari'),
      ...armour('Drukhari Armour', 1),
    },
  ],
  // Ork
  // Squat
  // tau
  {
    ...gear(source.aaoa.key, 221, 'T´au Body Armour', '5U', 'Light,T´au Empire, Fire Caste'),
    ...armour('T´au Empire Armour', 4),
    snippet: 'Build in: Mag Boots, Preysense Goggles, Respirator, Vox-Bead, and Void Suit.'
  },
];

const aaoaToolsEquipment = [
  // Imperial
  {
    ...gear(source.aaoa.key,180,'Book of Judgment (abridged)','2U','Adeptus Arbites'),
    ...toolz(undefined, 'The Book of Judgement is the legal code of the Imperium, enforced by the Adeptus Arbites.'),
  },
  {
    ...gear(source.aaoa.key,181,'Magnacles','3U','Imperium,Adeptus Arbites,Inquisition'),
    ...toolz(undefined, 'Breaking free of magnacles’ magnetic lock requires a Strength test (DN 5).'),
  },
  // AAOA Astartes Gear
  {
    ...gear(source.aaoa.key,180,'Narthecium (AAOA)','5R','Adeptus Astartes'),
    ...toolz('Imperial Equipment','A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.'),
    description:
      '<p>A Narthecium is a tool of a Space Marine Apothecary\'s trade, containing implements specially designed for treating the Astartes\' genetically engineered physiology and for performing first aid without having to remove the patient\'s Power Armour.</p>' +
      '<p>It also comprises various counterseptics, synthderm patches, transfusions and other compounds engineered for the Space Marines’ physiology, and several stasis tubes for storing any recovered gene-seed taken from a dead Space Marine\'s Progenoid Glands.</p>' +
      '<p>In battle, an Apothecary carries a number of specialised items of equipment, integrating a variety of tools into a customised backpack, with delivery systems in a device mounted on the Apothecary’s vambrace. The Apothecary may have crafted many of these tools himself according to his own needs.</p>' +
      '<p>A Narthecium provides all the means to treat battlefield injuries and perform medical procedures in the field. It also adds +2 bonus dice to Medicae tests to treat the injuries of characters of the Adeptus Astartes or Primaris Astartes species. On non-Astartes characters, use of a Narthecium can cause problems, as the equipment within is not meant for frail mortal physiology: a complication will inflict 1 Mortal Wound on a non-Astartes patient.</p>',
  },
  {
    ...gear(source.aaoa.key,181,'Reductor','5R','Adeptus Astartes'),
    ...toolz('Imperial Equipment','As an action, an Apothecary can use a Reductor to remove the gene-seed of a deceased Space Marine. This requires a Medicae test (DN 3). Though a grim task, it is a vital one, and an Apothecary who extracts a fallen brother’s gene-seed gains 1 Wrath immediately, as their duty drives them to press on.'),
  },
  {
    ...gear(source.aaoa.key,185,'Vindicare Spy Mask','11L','Templum Vindicare'),
    ...toolz('Imperial Equipment','he mask renders the wearer immune to penalties due to darkness and fog and allows the wearer to ignore any modifiers to the targets’ Defence from being in cover.'),
  },
  // Aeldari Tools
  {
    ...gear(source.aaoa.key,185,'Agaith','7V','Harlequin'),
    ...toolz('Aeldari Equipment','You cause Fear (DN 3+Rank)'),
  },
  {
    ...gear(source.aaoa.key,186,'Flip-Belt','7V','Harlequin'),
    ...toolz('Aeldari Equipment','Ignore difficult terrain and obstavles less then 2m tal or wide. You may stand up as a free action. You may use Agility (instead of Strength) fo jump distance. While not unconcious, you do not suffer falling damage.'),
    description:
      '<p>A Harlequin wearing a Flip-Belt ignores the effects of difficult terrain, can ignore any obstacles less than 2m tall or wide during their movement, and may stand up from prone as a free action at any time without penalty. In addition, a Harlequin wearing a flip-belt determines jump distance using their Agility instead of their Strength, and they do not suffer falling damage unless unconscious.</p>',
  },
  // AAOA Drukhari Gear
  {
    ...gear(source.aaoa.key,186,'Hekatarii Combat Drugs','6R','Drukhari'),
    ...toolz('Aeldari Equipment'),
    triptype: 'Hekatarii Combat Drugs',
    description:
      '<p>Though they dramatically reduce the lifespan of any Aeldari that uses them, performance-enhancing combat drugs are commonly used in the gladiatorial arenas of the Hekatarii, as well as by Wyches entering real battle. The user may administer a single dose as a free action, which will last for about an hour or until the character takes a Regroup (after which, withdrawal symptoms set in, and the character is reduced to 0 Shock until they take a Respite). A single dose of any of these combat drugs taken by anyone who is not Aeldari inflicts 1d6 Shock instead of their normal effect. Anyone using these combat drugs must also make a Corruption test. Taking a second dose of these combat drugs, whether a second dose of the same drug or a different drug, inflicts 1d6 Shock instead of having the desired effect. The drug dispenser contains 3 doses, of whichever of the drugs below the user wishes.</p>' +
      '<ul>' +
      '<li>Adrenalight accelerates the user’s attacks into a blistering tempo. While under the drug’s effect, whenever the character makes a successful attack, they may spend a point of Glory to make a second attack.</li>' +
      '<li>Grave Lotus massively heightens the tensile strength of the user’s muscles, allowing them to exert greater force. While under the drug’s effect, the character’s Strength is increased by +3.</li>' +
      '<li>Hypex augments the fast-twitch fibres in the user’s muscles, allowing them to move at far greater speeds. While under the drug’s effect, the character’s Speed is increased by +2.</li>' +
      '<li>Painbringer alters the user’s pain receptors, increasing their capacity for pain without dulling their experience of it. While under the drug’s effect, the character’s Resilience is increased by 2, and they recover 1d3 Shock at the start of each turn.</li>' +
      '<li>Serpentin amplifies the user’s killer instincts and sharpens their bloodlust. While under the drug’s effect, the character adds +3d to all melee attacks.</li>' +
      '<li>Splintermind help the user’s mind compartmentalise and disassociate from the parts which feel fear. While under the drug’s effect, the character’s Resolve is increased by +2.</li>' +
      '</ul>',
  },
  // Drugs
  {
    ...gear(source.aaoa.key,183,'Eversor Combat Drugs','11L','Templum Eversor'),
    ...toolz('Drugs and Consumables'),
    description:
      '<p>At the start of an Eversor’s turn, they may use a single dose of one of the following combat drugs as a Free Action.</p>' +
      '<ul>' +
      '<li><strong>Fury: </strong>The Eversor’s Speed is doubled for the duration of this turn.</li>' +
      '<li><strong>Destroyer: </strong>During this turn, if the Eversor scores a critical hit or kills an enemy, they may immediately move up to half their Speed and make one additional melee attack if they are within reach. If this or any subsequent attack this turn also scores a critical hit or reduces an enemy to 0 Wounds, roll a d6: on a 4 or more, the Eversor may make another half-Speed move and another attack.</li>' +
      '<li><strong>Terminus: </strong>If the Eversor starts Dying before the start of their next turn, they may continue to act normally for a number of rounds equal to their Toughness. If the Eversor is still Dying after this time, they die immediately, and explode.</li>' +
      '</ul>' +
      '<p>One combat drug dispenser has three doses each of Fury and Destroyer, and a single dose of Terminus</p>' +
      '<p><em>A single dose of any of these combat drugs taken by anyone other than an Eversor Assassin inflicts 1d6 mortal wounds instead of their normal effect.</em></p>'
  },
];

const aaoaAugmetics = [
  // Augmetics
  {
    ...gear(source.aaoa.key,189,'Autosanguine', '6V', 'Adeptus Mechanicus, Cult Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Greatly enhance healing capacity and ignore wounded penalty.',
    description:
      '<p>Whenever you  regain  one or  more  Wounds, you regain one additional Wound. You also ignore the penalty for being Wounded. </p>',
  },
  {
    ...gear(source.aaoa.key,189,'Baleful Eye', '8L', 'Adeptus Mechanicus, Imperium'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Give a Hot-Shot laser eye',
    description:
      '<p>A character with a Baleful Eye is considered to have a Hot-Shot  Laspistol  within  the  eye.  The  weapon  runs from an internal power source, and never runs out of ammunition, but this also means that ammo may not be spent on the weapon’s attacks. As might be imagined, it is very intimidating when used as a part of negotiations with primitive societies.</p>',
  },
  {
    ...gear(source.aaoa.key,190,'Blade-Tines', '5R', 'Chaos, Dark Mechanicus, Drukhari'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Hand mounted scalpel like blade. Good for medic or killer.',
    description:
      '<p>Blade-tines  grant  the  recipient  +1d  on  all  Medicae tests, and they can be used as a Mono Knife in melee. </p>',
	modifications: [
		{ targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 1, rank: 0},
    ],
  },
  {
    ...gear(source.aaoa.key,190,'Calculus Logi Implant', '6V', 'Imperium, Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Internal cogitator implants which aid in data retention and processing',
    description:
      '<p>The recipient has a +2d bonus on all Investigation and Scholar tests.</p>',
	modifications: [
		{ targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 2, rank: 0},
		{ targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 2, rank: 0},
    ],
  },
  {
    ...gear(source.aaoa.key,190,'Chem Injector', '5R', 'Adeptus Mechanicus, Imperium, Adeptus Ministorum'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'This implant allows a dose of a drug or stimulant to be auto-injected  into  the  recipient’s  body.',
    description:
      '<p>Once  loaded with  a  dose  of  a  drug, the character can administer that dose at will as a simple action.</p>'+
	  '<p>Some Chem Injector can be remotely controlled by another character via vox link.</p>'+
	  '<p>A character can  have multiple Chem Injector, they do not need to contain the same drug.</p>',
  },
  {
    ...gear(source.aaoa.key,190,'Data-Tether', '3U', 'Adeptus Mechanicus, Skitarii'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Silently communicate your thoughts and status to similar equipped within 1km.',
    description:
      '<p>Characters with a data-tether may communicate silently to similarly-equipped characters within 1km, transmitting their thoughts and status through the implant to one another. A data-tether may be tuned to receive normal vox transmissions from non-Skitarii allies, though this is less efficient.</p>',
  },
  {
    ...gear(source.aaoa.key,190,'Enhanced Data-Tether', '5R', 'Adeptus Mechanicus, Skitarii'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Commanding officier version of a Data-Tether with a range of 100km.',
    description:
      '<p>Enhanced data-tether with a range of 100k. In addition the recipient and anyone in the group with a NORMAL data-tether may re-roll failures on Resolve tests.</p>',
  },
  {
    ...gear(source.aaoa.key,190,'Interface Port', '7R', 'Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Direct neural interface for cogitator, data storage devices or advanced machinery.',
    description:
      '<p>This allows the user faster and smoother access to the valuable information within, and grants a +1d bonus  to  Scholar,  Investigate,  and  Tech  tests  while connected to a relevant mechanism or data-spool.</p>',
	modifications: [
      { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' },
      { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' },
	  { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 1, rank: 0, condition: 'while connected to a relevant mechanism or data-spool.' }
    ],
  },
  {
    ...gear(source.aaoa.key,191,'Luminen capacitor', '7V', 'Cult Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    //snippet: 'Extensive rules, see AAOA pg. 191.',
    description:
      '<p>A luminen capacitor contains a number of charges equal to the recipient’s Toughness. With a successful Toughness test, and a minute of meditative focus, the character may spend charges to recharge or power machinery. The DN of this test is equal to 2 plus the number of charges spent, and the number of charges required varies based on the system being charged.</p>' +
      '<ul>' +
      '<li>1 charge: simple power cell, illuminator</li>' +
      '<li>2 charges: weapon charge pack, data-slate, starship bridge terminal</li>' +
      '<li>3 charges: shuttle electronics, servo skull</li>' +
      '<li>4 charges: heavy weapon charge pack, servitor, hololithic projector</li>' +
      '<li>5 charges: cogitator core, reactor machine spirit, xenos technology</li>' +
      '</ul>' +
      '<p>If a character would suffer Shock from using an implant or cybernetic, then they may spend charges to reduce this, suffering one fewer Shock for each charge spent.</p>' +
      '<p>The luminen capacitor regains its full charges during a Regroup. The character may also siphon power from powered devices and power sources, requiring a Toughness test (DN 3) and an action. Success means the character regains 1d3 charges, plus 1 for each Exalted Icon shifted. At the GM’s discretion, this may depower the device, and complications may cause damage to the device or the recipient.</p>',
  },
  {
    ...gear(source.aaoa.key,191,'Maglev Coils', '8V', 'Cult Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Allow the user to fly.',
    description:
      '<p>When activated, the character gains the ability to fly, at a speed equal to their Willpower (rounded up), but they may not Run or Sprint while flying in this manner. Each turn the character remains aloft, they suffer 1 Shock.</p>'+
      '<p>The character may also use this implant to slow their descent while falling, suffering 1d3 Shock, plus 1 additional Shock for every 10 meters fallen, instead of the normal falling damage.</p>',
  },
  {
    ...gear(source.aaoa.key,191,'Memorance Implant','6R','Adeptus Mechanicus'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Record everything you see. You gain +1 bonus die to Investigation or Scholar based on Information witnessed or recorded.',
    description:
      '<p>The recipient always has a perfect visual record of everything they see, which may be transferred to other data storage if they have a way to connect to those devices (such as an interface port). Further, they gain a +1d bonus on any Investigate or Scholar tests based on information they have already witnessed and recorded.</p>',
    modifications: [
      { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 1, rank: 0, condition: 'when based on information witnessed and recorder.' },
      { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 1, rank: 0, condition: 'when based on information witnessed and recorder.' },
    ],
  },
  {
    ...gear(source.aaoa.key,192,'Neurostatic projector', '6R', 'Adeptus Mechanicus, Skitarii'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'All Creatures (excluding ADEPTUS MECHANICUS allies) within 10m suffer +Rank DN to Intellect and Resolve tests.',
    description:
      '<p>Creatures within 10 metres of the character add +Rank to the DN of all Intellect tests (including Awareness), and Resolve tests. Allies with the ADEPTUS MECHANICUS keyword receive null-codes which render them immune to this.</p>',
  },
  {
    ...gear(source.aaoa.key,192,'Omnispex', '6R', 'Adeptus Mechanicus, Skitarii'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'High end Auspex with target acquisition and data sharing capability.',
    description:
	  '<p>An omnispex functions as an auspex, in addition if the recipient aims at an enemy, then they ignore any Defence bonuses from cover on their next ranged attack.</p>'+
	  '<p>If the recipient is equipped with a data-tether, they may share this bonus with any allies equipped with data-tethers within 10m.</p>',
  },
  {
    ...gear(source.aaoa.key,192,'Scribe-Tines', '4U', 'Imperium, Adeptus Mechanicus, Adeptus Ministorum'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Specialised and sensitive tools for page-turning, autoscribing, data-slate manipulation, and other activities for a sage.',
    description:
      '<p>Replace the hand and lower forearm, The user gains a +2d bonus on Investigation tests, as they are able to record and retrieve information quickly.</p>',
	modifications: [
	 { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 2, rank: 0 },
    ],
  },
  {
    ...gear(source.aaoa.key,192,'Voidskin', '4U', 'Imperium, Adeptus Mechanicus, Imperial Navy'),
    type: 'Augmetics', subtype: 'Augmetic Implants',
    snippet: 'Help resist exposure to hard vacuum, extreme cold and radiation',
    description:
      '<p>Subdermal  skin  tissue and synthetic  chem-glands giving a +3d bonus on all tests to resist the effects of exposure to hard vacuum, extreme cold, and radiation.</p>',
  },
];

const aaoa = [
  ...aaoaMelee,
  ...aaoaRanged,
  ...aaoaWeaponUpgrades,
  ...aaoaArmour,
  ...aaoaToolsEquipment,
  ...aaoaAugmetics,
];

const aaoav2 = [
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
    ...simpleStub(30982, 'aaoa2',98,'Blight Grenade', '4U', 'Explosive, Chaos, Nurgle', ''),
    ...simpleRange('Grenades and Grenade Launchers', '', '10', '1', '0', '-', 'Blast (Medium),Toxic (5)', ''),
  },
  {
    ...simpleStub(30992, 'aaoa2',99,'Sonic Blaster', '6R','Sonic, Chaos, Slaanesh', ''),
    ...rangeAaoa('10+1ED; AP 0; Range 48m; Salvo 3; Assault, Cacophony'),
  },

  {
    ...simpleStub(31050, 'aaoa2',105,'Kustom Mega-Blasta', '7R', 'Kustom, Plasma, Ork', ''),
    ...rangeAaoa('16+2ED; AP -3; Range 48m; Salvo 1; Assault, Supercharge, Waaagh!', 'Ork Ranged Weapon', 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.'),
    snippet: 'The Supercharge trait is always in effect on a Kustom Mega-Blasta—the firer cannot choose not to use it.',
  },
  {
    ...simpleStub(31099, 'aaoa2',109,'Nemesis Force Sword', '6V', 'Force, Imperium, Adeptus Astartes, Grey Knights', ''),
    ...meleeAaoa('5+1ED; AP -3; Force, Nemesis, Parry'),
    description:
      '<p>The most common type of weapon wielded by the Grey Knights is the Nemesis Force Sword. It exemplifies the mixture of magick and science utilized by the Grey Knights. The blade is tempered iron, flecked with shards of silver and inset with ancient runes of daemon slaying. Advanced power field generators are also contained within.</p>',
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
    ...simpleStub(31175, 'aaoa2', 117, 'Dragonfire Bolt Rounds', '7R', 'Imperium, Adeptus Astartes', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains the Blast (Small) and Spread traits, and the Fire keyword.',
  },
  {
    ...simpleStub(31193, 'aaoa2', 119, 'Inferno Bolt Rounds', '7R', 'Chaos, Heretic Astartes, Tzeentch', ''),
    type: 'Reloads and Ammunition',
    snippet: 'Weapon gains AP -2, and the Fire keyword.',
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
    ...simpleStub(30530,'tea',53,'Narthecium (TEA)', '6R', 'Imperium,Adeptus Astartes', ''),
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

const glhe = [
  {
    ...gear(source.gohe.key,4,'Pulse Rifle (Heathen Pattern)','5V','Tau,Pulse,Plasma'),
    ...rangez('Pulse Weapons',12,1,1,36,2,'Rapid Fire(1)'),
  },
  {
    ...gear(source.gohe.key,7,'Jokaero Defense Orbs','L9','Xenos,Jokaero'),
    ...armour('Jokaro Armour',4, 'Power Field'),
  },
  {
    ...gear(source.gohe.key,7,'Jokaero Scattershot','L9','Xenos,Jokaero,Digi'),
    ...rangez('Jokaero Weapons',8,3,1,2, 2,'Assault,Spread,Digital'),
    description:
      '<p><strong>Digital:</strong> Add +3 dice to stealth or deception tests when concealing this weapon.</p>',
  },
];

module.exports = [
  ...core,
  ...aioe,
  ...red2_eclisiarchy,
  ...red2_mechanicus,
  ...doctorsOfDoom,
  ...fspg,
  ...cos,
  ...tnh,
  ...afas,
  ...aaoa,
  ...aaoav2,
  ...pax,
  ...lotn,
  ...tea,
  ...glhe,
];

/*
Fusion Gun
Melta Bomb
Aeldari Jetbike
Lasblaster
 */
