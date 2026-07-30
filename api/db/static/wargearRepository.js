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
  const valueMatch = value.match(/\d+/g);
  const rarityMatch = value.match(/[a-zA-Z]+/g);
  const valuePart = valueMatch ? valueMatch[0] : '-';
  const rarityPart = rarityMatch ? rarityMatch[0].toUpperCase() : 'Unique';

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

module.export = {

}