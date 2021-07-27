const Router = require('express-promise-router');

const wargearRepository = require('../db/static/wargearRepository');

const router = new Router();

module.exports = router;

// Helper
const range = (s, e) => Array.from('x'.repeat(e - s), (_, i) => s + i);
const rangeP = (s, e) => range(s, e).map((i) => `$${i}`);
const toP = (a, o) => rangeP(o + 1, o + a.length + 1);


router.get('/', async (request, response) => {
  let where = '';
  const filter = {};
  const params = [];

  let homebrewWargear = wargearRepository;

  const filterTypeString = request.query.type;
  if (filterTypeString) {
    filter.type = filterTypeString.split(',');
    if (filter.type) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` type in ( ${toP(filter.type, params.length).join(',')} )`;
      params.push(...filter.type);
      homebrewWargear.filter((w)=>filter.type.includes(w.type));
    }
  }

  const filterRarityString = request.query.rarity;
  if (filterRarityString) {
    filter.rarity = filterRarityString.split(',');
    if (filter.rarity) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` rarity in ( ${toP(filter.rarity, params.length).join(',')} )`;
      params.push(...filter.rarity);
      homebrewWargear.filter((w)=>filter.rarity.includes(w.rarity));
    }
  }

  const filterValueLowerEqualString = request.query['value-leq'];
  if (filterValueLowerEqualString) {
    filter['value-leq'] = filterValueLowerEqualString;
    if (filter['value-leq']) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` value <= ${toP(filter['value-leq'], params.length)}  `;
      params.push(...filter['value-leq']);
      homebrewWargear.filter((w)=>w.value <= filter['value-leq']);
    }
  }

  const filterNameString = request.query.name;
  if (filterNameString) {
    filter.name = filterNameString.split(',');
    if (filter.name) {
      where += (where.length > 0) ? ' AND ' : ' WHERE ';
      where += ` name in ( ${toP(filter.name, params.length).join(',')} )`;
      params.push(...filter.name);
      homebrewWargear.filter((w)=>filter.name.includes(w.name));
    }
  }

  /*
  const { rows } = await db.queryAsyncAwait(
    `SELECT * FROM wrath_glory.wargear ${where}`,
    params,
  );

  sourcedRows = rows.map((r)=>{
    return {
      ...r,
      source: {
        book: 'Core Rules',
        key: 'core',
        version: '1',
        path: undefined,
        page: '-'
      },
    };
  });
  */

  let merged = [
    //...sourcedRows,
    ...homebrewWargear,
  ];

  const filterSourceString = request.query.source;
  if (filterSourceString) {
    filter.source = filterSourceString.split(',');
    if (filter.source) {
      merged = merged.filter((item) => filter.source.includes(item.source.key));
    }
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(merged);
});

function toFoundry(item) {
  const bonus = {
    "attributes": {
      "strength": 0,
      "toughness": 0,
      "agility": 0,
      "initiative": 0,
      "willpower": 0,
      "intellect": 0,
      "fellowship": 0
    },
    "skills": {
      "athletics": 0,
      "awareness": 0,
      "ballisticSkill": 0,
      "cunning": 0,
      "deception": 0,
      "insight": 0,
      "intimidation": 0,
      "investigation": 0,
      "leadership": 0,
      "medicae": 0,
      "persusasion": 0,
      "pilot": 0,
      "psychicMastery": 0,
      "scholar": 0,
      "stealth": 0,
      "survival": 0,
      "tech": 0,
      "weaponSkill": 0
    },
    "combat": {
      "defense": 0,
      "resilence": 0,
      "wounds": 0,
      "determination": 0,
      "shock": 0,
      "resolve": 0,
      "passiveAwareness": 0
    }
  };
  const flags = {
    "exportSource": {
      "world": "wrath-and-glory",
      "system": "wrath-and-glory",
      "coreVersion": "0.8.6",
      "systemVersion": "2.1.0"
    }
  };

  switch (item.type) {
    case 'Ranged Weapon':
      const rangedWeapon = item.meta.find(i => i.type === 'ranged-weapon');
      return {
        "name": item.name,
        "type": "weapon",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "attack": {
            "base": 0,
            "bonus": 0,
            "rank": "none"
          },
          "damage": {
            "base": rangedWeapon.damage.static,
            "bonus": 0,
            "rank": "none"
          },
          "ed": {
            "base": rangedWeapon.damage.ed,
            "bonus": 0,
            "die": {
              "one": 0,
              "two": 0,
              "three": 0,
              "four": 1,
              "five": 1,
              "six": 2
            },
            "rank": "none"
          },
          "ap": {
            "base": rangedWeapon.ap,
            "bonus": 0,
            "rank": "none"
          },
          "category": "ranged",
          "range": {
            "short": rangedWeapon.range/2,
            "medium": rangedWeapon.range,
            "long": rangedWeapon.range*1.5,
          },
          "salvo": rangedWeapon.salvo || 0,
          "traits": rangedWeapon.traits.join(', '),
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
          "upgrades": ""
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    case 'Melee Weapon':
      const meleeWeapon = item.meta.find(i => i.type === 'melee-weapon');
      return {
        "name": item.name,
        "type": "weapon",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "attack": {
            "base": 0,
            "bonus": 0,
            "rank": "none"
          },
          "damage": {
            "base": meleeWeapon.damage.static,
            "bonus": 0,
            "rank": "none"
          },
          "ed": {
            "base": meleeWeapon.damage.ed,
            "bonus": 0,
            "die": {
              "one": 0,
              "two": 0,
              "three": 0,
              "four": 1,
              "five": 1,
              "six": 2
            },
            "rank": "none"
          },
          "ap": {
            "base": meleeWeapon.ap,
            "bonus": 0,
            "rank": "none"
          },
          "category": "melee",
          "range": {
            "short": meleeWeapon.range,
            "medium": meleeWeapon.range,
            "long": meleeWeapon.range,
          },
          "salvo": 0,
          "traits": meleeWeapon.traits.join(', '),
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
          "upgrades": ""
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    case 'Armour':
      const armour = item.meta.find(i => i.type === 'armour');
      return {
        "name": item.name,
        "type": "armour",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "category": "armour",
          "rating": armour.armourRating,
          "traits": armour.traits.join(', '),
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
          "upgrades": ""
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    case 'Tools & Equipment':
      return {
        "name": item.name,
        "type": "gear",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    case 'Ammo':
      return {
        "name": item.name,
        "type": "ammo",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    case 'Augmetics':
      return {
        "name": item.name,
        "type": "augmentic",
        "img": "icons/svg/mystery-man.svg",
        "data": {
          bonus,
          "description": item.hint,
          "value": parseInt(item.value) || 0,
          "rarity": item.rarity.toLowerCase().replace(/\W/gm, '-'),
          "keywords": item.keywords.map(k => k.toUpperCase()).join(', '),
        },
        "effects": [],
        "sort": 0,
        flags,
      };
    default:
      return [];
  }
}

router.get('/:slug', async (request, response) => {
  const { slug } = request.params;

  let item = wargearRepository.find((gear) => gear.key === slug);

  if (request.query.format === 'foundry' && item) {
    item = toFoundry(item);
  }

  response.set('Cache-Control', 'public, max-age=3600'); // one hour
  response.status(200).json(item);
});
