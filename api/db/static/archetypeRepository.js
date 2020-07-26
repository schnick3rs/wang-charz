// TODO
// Astra Militarum

const source = {
  core: { book: 'Core Rules (v1.5.1)', key: 'core', version: 'v1.5.1' },
  core10: { book: 'Core Rules (v1.0)', key: 'core10', version: 'v1' },
  aaoa: { book: 'An Abundance of Apocrypha (v3.1)', key: 'aaoa', version: 'v3.1', path: '/vault/an-abundance-of-apocrypha' },
  aaoa2: { book: 'An Abundance of Apocrypha (v2)', key: 'aaoa2', version: '', path: '/vault/an-abundance-of-apocrypha' },
  lotn: { book: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
  thaot: { book: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
  ltgb: { book: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
  aptb: { book: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
  jtb: { book: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
  aotgt: { book: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
  tea: { book: 'The Emperor\'s Angels', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
  heva: { book: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
  goen: { book: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
  tog: { book: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
  pax: { book: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
  sotah: { book: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
  amb: { book: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const kebabToCamel = function (slug) {
  return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

const stringToKebabToCamel = function (text) {
  const slug = stringToKebab(text);
  return kebabToCamel(slug);
};

const cost = function (cost, archetype = 0, stats = 0, species = 0, other = 0) {
  return {
    cost,
    costs: {
      total: cost,
      archetype,
      stats,
      species,
      other,
    }
  };
}

// ...archetype('core',99,'Adepta Sororitas','Sister of Battle',2,'Human',94),
const archetype = function (sourceKey, sourcePage, faction, name, tier, species, stub = false) {
  let speciesSourceKey = 'core';
  let speciesName = 'Human';
  let split = [];
  split = species.split('/');
  if ( split.length === 2) {
    speciesSourceKey = split[0];
    speciesName = split[1];
  } else {
    split = species.split('-');
    if ( split.length >= 2 ){
      speciesSourceKey = split[0];
      speciesName = split.splice(1).map((i)=>i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
    } else {
      speciesName = species;
    }
  }
  const speciesLabel = `${speciesName} (${speciesSourceKey.toLowerCase()})`;
  const speciesKey = `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`;

  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    tier,
    faction,
    factionKey: `${stringToKebab(`core ${faction}`)}`,
    species: [ speciesLabel ],
    speciesKey: [ speciesKey ],
    stub,
    wargear: [],
    prerequisites: [],
    archetypeFeatures: [],
    influence: 0,
  };
}

const simpleStub = function (sourceKey, sourcePage, species, group, name, bp, tier, stub = true) {
  let speciesSourceKey = 'core';
  let speciesName = 'Human';

  let split = [];

  split = species.split('/');
  if ( split.length === 2) {
    speciesSourceKey = split[0];
    speciesName = split[1];
  } else {
    split = species.split('-');
    if ( split.length >= 2 ){
      speciesSourceKey = split[0];
      speciesName = split.splice(1).map((i)=>i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
    } else {
      speciesName = species;
    }
  }

  const speciesLabel = `${speciesName} (${speciesSourceKey.toLowerCase()})`;
  const speciesKey = `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`;

  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost: bp,
    tier,
    group,
    species: [ speciesLabel ],
    speciesKey: [ speciesKey ],
    stub: stub,
  };
};

const reqAttribute = function(key, value) {
  return {
    group: 'attributes',
    value: key,
    threshold: value,
  };
};

const reqSkill = function(key, value) {
  return {
    group: 'skills',
    value: key,
    threshold: value,
  };
};

const simpleAbility = function(name, snippet = undefined, description = undefined) {
  let finalSnippet = snippet;
  let finalName = name;

  if ( snippet === undefined ) {
    const parts = name.split(':').map((i)=>i.trim());
    finalName = parts[0];
    finalSnippet = parts[1];
  }

  return {
    name: finalName,
    snippet: finalSnippet,
    description: description ? description : `<p>${finalSnippet}</p>`,
  };
};

const suggestedAttributes = function(str,tou,agi,ini,wil,int,fel) {
  return [
    { group: 'attributes', value: 'strength', threshold: str },
    { group: 'attributes', value: 'toughness', threshold: tou },
    { group: 'attributes', value: 'agility', threshold: agi },
    { group: 'attributes', value: 'initiative', threshold: ini },
    { group: 'attributes', value: 'willpower', threshold: wil },
    { group: 'attributes', value: 'intellect', threshold: int },
    { group: 'attributes', value: 'fellowship', threshold: fel },
  ]
}

const wargearz = function(wargearString) {
  const gears = wargearString.split(',').map(partString => {
    let part = partString.trim();
    const gear = {};
    if (!isNaN(part.split(' ')[0])) {
      gear.amount = part.split(/ /)[0];
      part = part.split(/ (.+)/)[1];
    }
    if (part.indexOf('/') > 0) {
      parts = part.split('/');
      gear.name = parts[0];
      gear.variant = parts[1];
    } else {
      gear.name = part;
    }
    return gear;
  })
  return gears;
}

const core = [
  // Adeptus Ministorum
  {
    ...archetype('core',92,'Adeptus Ministorum','Ministorum Priest',1,'Human'),
    ...cost(12,0,12, 0, 0),
    hint: 'A zealous preacher of the Imperial Creed.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      reqAttribute('willpower', 3),
      reqSkill('scholar', 1),
    ],
    archetypeFeatures: [
      {
        name: 'Fiery Invective',
        snippet: 'You can preach the word of the Imperial Creed as a Free Action once per combat. You and all allies with the IMPERIUM keyword heal 1d3+Rank Shock.',
      },
    ],
    wargear: [
      { name: 'Chainsword' },
      { name: 'Laspistol' },
      { name: 'Rosarius' },
      { name: 'Knife' },
      { name: 'Clothing', variant: 'Ministorum Robes' },
      { name: 'Missionary Kit' },
    ],
    suggested: {
      attributes: [],
      skills: [],
      talents: [ 'core-flagellant', 'core-in-his-name', 'core-repent-' ],
    },
    suggestedStats: [
      ...suggestedAttributes(1,2,2,2,3,2,3),
      reqSkill('awareness', 2),
      reqSkill('ballisticSkill', 2),
      reqSkill('insight', 1),
      reqSkill('intimidation', 1),
      reqSkill('leadership', 2),
      reqSkill('scholar', 2),
    ],
  },
  {
    ...archetype('core',102,'Adeptus Ministorum','Death Cult Assassin',2,'Human'),
    ...cost(36,10,26, 0, 0),
    hint: 'An agile killer, expressing worship through the art of death.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Glancing Blow',
        snippet: 'Unless you are immobilised or restrained, you may roll Determination against Damage from attacks and against Mortal Wounds. You may use Agility instead Toughness for Determination when doing so.',
        description: '<p>You depend upon your swift movement and honed reflexes to avoid harm. You may use your Agility instead of your Toughness when you roll Determination against Damage from attacks, and may roll Determination against Mortal Wounds. You cannot use this ability if you are immobilised in some way, such as through the Restrained Condition.</p>',
      },
    ],
    wargear: wargearz('2 Death Cult Powerblade/Two Death Cult Powerblades, Bodyglove, Knife, Laspistol, 3 dose of Stimm'),
    influence: 1,
  },
  {
    ...archetype('core',110,'Adeptus Ministorum','Crusader',3,'Human'),
    ...cost(54,20,34, 0, 0),
    hint: 'A holy warrior with unfl agging devotion to the God-Emperor.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      { group: 'attributes', value: 'initiative', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Armour of Faith',
        snippet: 'You gain +Double Rank bonus dice to melee attack tests against targets with the CHAOS or HERETIC keyword. Your Resolve also increases by +Rank.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
        ],
      },
    ],
    wargear: wargearz('Power Sword, Storm Shield, Carapace Armour, Clothing/Ministorum Robes'),
    influence: 1,
  },
  // Adepta Sororitas
  {
    ...archetype('core',91,'Adepta Sororitas','Sister Hospitaller',1,'Human'),
    ...cost(24,0,24,0,0),
    hint: 'A pious healer dedicated to care of both body and soul.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'medicae', threshold: 1 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Loyal Compassion',
        snippet: 'Add +Double Rank bonus dice for Medicae (Int) Test on an IMPERIUM character.',
        description: '<p>+Double Rank bonus dice whenever you make a Medicae (Int) Test on a character with the <strong>IMPERIUM</strong> Keyword</p>',
      },
    ],
    wargear: [
      { name: 'Sororitas Power Armour' },
      { name: 'Chirurgeon\'s Tools' },
      { name: 'Chain Bayonet', variant: 'Chain Bayonet (wrist mounted)' },
      { name: 'Laspistol' },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
    ],
  },
  {
    ...archetype('core',99,'Adepta Sororitas','Sister of Battle',2,'Human'),
    ...cost(64,10,54, 0, 0),
    hint: 'A determined warrior, filled with purity and faith.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Purity of Faith',
        snippet: 'You and any allies within 15 metres gain +Double Rank bonus dice to Corruption Tests. You gain +Double Rank bonus dice to any Test to resist the effects of a Psychic Power.',
      },
    ],
    wargear: [
      { name: 'Sororitas Power Armour' },
      { name: 'Chaplet Ecclesiasticus' },
      {
        name: 'Either a boltgun OR a Chainsword and bolt pistol.',
        selected: 'Boltgun',
        options: [
          { name: 'Boltgun' },
          { name: 'Chainsword and Bolt Pistol' },
        ],
      },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Writing Kit' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
    ],
    influence: 1,
  },
  // Adeptus Militarum
  {
    ...archetype('core',93,'Astra Militarum','Imperial Guardsman',1,'Human'),
    ...cost(6,0,6, 0, 0),
    hint: 'A disciplined soldier, used to fighting amid multitudes',
    keywords: 'Imperium,Astra Militarum,[Regiment]',
    prerequisites: [
      reqSkill('ballisticSkill', 2),
    ],
    archetypeFeatures: [
      {
        name: 'Look Out, Sir!',
        snippet: 'Once per combat, as a Reflexive Action, move up to half your Speed to intercept an attack that hit an ally. You Resilience is increased by +Rank.',
        description: '<p>You have been drilled in sacrificing yourself to save your allies. Once per combat, you may take a Reflexive Action to move up to half your Speed to get in the way of any attack that hit an ally. The attacker then rolls against your Resilience instead of your ally’s, and may deal Wounds to you. Your Resilience increases by +Rank for the purpose of calculating damage.</p>'
      },
    ],
    wargear: wargearz('Flak Armour, Lasgun, Knife, Munitorum-Issue Mess Kit, Grooming kit, Uplifting Primer/A copy of the Imperial Infantryman’s Uplifting Primer, 3 ration packs'),
    suggestedStats: [
      ...suggestedAttributes(3,3,3,3,2,1,2),
      reqSkill('athletics', 2),
      reqSkill('awareness', 1),
      reqSkill('ballisticSkill', 2),
      reqSkill('survival', 1),
      reqSkill('weaponSkill', 1),
    ],
  },
  {
    ...archetype('core',103,'Astra Militarum','Tempestus Scion',2,'Human'),
    ...cost(52,10,42, 0, 0),
    hint: 'An elite, highly-trained soldier, used to undertaking special missions.',
    keywords: 'Imperium,Astra Militarum,Militarum Tempest',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Elite Soldier',
        snippet: 'You’re an expert in inflicting pain through the weapons of the Imperium. Whenever you spend Glory to increase damage when using a weapon with the ASTRA MILITARUM you can add +Rank to the final damage value.',
      },
    ],
    wargear: wargearz('Carapace Armour, Hot-Shot Lasgun, Grav-Chute, Knife, Munitorum-Issue Mess Kit, Uplifting Primer/a copy of the Imperial Infantryman’s Uplifting Primer, 3 ration packs'),
    influence: 1,
  },
  {
    ...archetype('core',111,'Astra Militarum','Imperial Commissar',3,'Human'),
    ...cost(76,20,56, 0, 0),
    hint: 'A fearsome leader, inspiring both dread and respect in great measure.',
    keywords: 'Imperium,Astra Militarum,Officio Prefectus',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 1 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
      { group: 'skills', value: 'leadership', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Fearsome Respect',
        snippet: 'You and any allies within 15 metres of you that can see you may add +Double Rank bonus dice to Resolve Tests. You add +Double Rank bonus dice to any Intimidation (Wil) Tests, including Interaction Attacks.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 0, rank: 2, condition: null },
        ],
      },
    ],
    wargear: wargearz('Bolt Pistol, Chainsword, Flak Coat, Munitorum-Issue Mess Kit, Blanket, Grooming Kit, Uplifting Primer, 3 ration packs'),
    influence: 3,
  },
  // Inquisition
  {
    ...archetype('core',94,'The Inquisition','Inquisitorial Acolyte',1,'Human'),
    ...cost(6,0,6, 0, 0),
    hint: 'A representative of the Inquisition, adaptable and possessing great potential.',
    keywords: 'Imperium,Inquisition,[ANY],[ORDO]',
    prerequisitesSkillString: 'Increase a skill of your choice to 2.',
    archetypeFeatures: [
      {
        name: 'Inquisitorial Decree',
        snippet: 'You can invoke the name of your Inquisitor to gain +Rank bonus dice to any social Skill test when interacting with an individual with the IMPERIUM. You can only use this ability once per scene.',
      },
    ],
    wargearString: 'Flak Armour, Any two IMPERIUM weapons with a Value of 5 or less and a Rarity of Uncommon or lower, Symbol of Authority',
    wargear: [
      { name: 'Flak Armour' },
      {
        name: 'Any IMPERIUM weapon with a value 5 or less and up to Uncommon rarity',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
            rarityFilter: ['Common', 'Uncommon'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
            keywordFilter: 'Imperium',
          },
        ],
      },
      {
        name: 'Any IMPERIUM weapon with a value 5 or less and up to Uncommon rarity',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
            rarityFilter: ['Common', 'Uncommon'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
            keywordFilter: 'Imperium',
          },
        ],
      },
      { name: 'Symbol of Authority' },
    ],
  },
  {
    ...archetype('core',95,'The Inquisition','Inquisitorial Sage',1,'Human'),
    ...cost(16,0,16, 0, 0),
    hint: 'A learned scholar and scribe, adept at navigating bureaucratic obstacles.',
    keywords: 'Adeptus Administratum,Imperium,Inquisition,[Ordo]',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Administratum Records',
        snippet: 'You are particularly adept at navigating the Imperium’s colossal bureaucracy. You gain +Rank bonus dice whenever you make a Test to gather information from Imperial sources, typically on Influence or Investigation (Int) tests.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'investigation', modifier: 0, rank: 1, condition: 'when gathering information from Imperial sources' },
        ],
      },
    ],
    wargear: wargearz('Clothing/Administratum Robes, Laspistol, Knife, Auto Quill, Data-Slate, 3 Scroll of Ancient Records'),
    influence: 1,
  },
  {
    ...archetype('core',104,'Rogue Trader Dynasties','Rogue Trader',2,'Human'),
    ...cost(36,10,26,0,0),
    hint: 'An adventuresome and influential explorer with their own space vessel.',
    keywords: 'Imperium,Rogue Trader,[Dynasty]',
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 1 },
      { group: 'skills', value: 'cunning', threshold: 1 },
      { group: 'skills', value: 'insight', threshold: 2 },
      { group: 'skills', value: 'persuasion', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Warrant of Trade',
        snippet: 'You are a master of manipulating a situation to your advantage. You gain +Rank bonus dice to all Persuasion tests and Influence tests to acquire goods and services.',
      },
    ],
    wargearString: 'Imperial Frigate. Choose any two pieces of Wargear with a Value of your Tier +4 or less, and a Rarity of Rare or lower. Choose from any of the following options; Flak Coat or Carapace Armour or Light Power Armour.',
    wargear: [
      { name: 'Imperial Frigate' },
      {
        name: 'Wargear up to value Tier+4 and rarity Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
            rarityFilter: ['Uncommon', 'Common', 'Rare'],
          },
        ],
      },
      {
        name: 'Wargear up to value Tier+4 and rarity Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
            rarityFilter: ['Uncommon', 'Common', 'Rare'],
          },
        ],
      },
      {
        name: 'Choice of Flak Coat, carapace armour or Light Power Armour',
        options: [
          { name: 'Flak Coat' },
          { name: 'Carapace Armour' },
          { name: 'Light Power Armour' },
        ],
      },
    ],
    influence: 2,
  },
  {
    ...archetype('core',100,'Adeptus Astra Telephatica','Sanctioned Psyker',2,'Human'),
    ...cost(32,10,22, 0, 0),
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
    keywords: 'Imperium,Adeptus Astra Telepathica,Psyker,Scholastica Psykana',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.',
        description:
          '<p>You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
      },
      {
        name: 'Unlock Disciplines',
        snippet: 'You gain access to the Minor and Universal Disciplines. You unlock an addtional single Psychic Discipline.',
        description: '<p>You gain access to the Minor and Universal Disciplines. You unlock an additional single Psychic Discipline, following the rules in Chapter 11.</p>',
        selected: [''],
        options: [
          // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
          // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
          { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
          { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
          { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
          { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
          { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
          { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
          { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
        ],
        psychicDisciplines: [
          'Minor',
          'Universal',
        ],
      }
    ],
    wargear: wargearz('Laspistol, Force Rod, Psykana Mercy Blade, Munitorum-Issue Mess Kit, Blanket, Grooming kit, 2 ration packs'),
  },
  {
    ...archetype('core',116,'The Inquisition','Inquisitor',4,'Human'),
    ...cost(110,30,80, 0, 0),
    hint: 'A bearer of profound Imperial authority, adept at discovering the truth in the shadows.',
    keywords: 'Imperium,Inquisition,[Ordo],[Any]',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'cunning', threshold: 4 },
      { group: 'skills', value: 'insight', threshold: 4 },
    ],
    archetypeFeatures: [
      {
        name: 'Unchecked Authority',
        snippet: 'You have supreme authority to maintain the security of the Imperium. You gain +Double Rank bonus dice whenever you make a social Skill Test against a character with the IMPERIUM keyword.',
      },
    ],
    wargearString: 'Inquisitorial Rosette, Any two weapons with a Value of 7 or less and a Rarity of Very Rare or lower, Choose one of the following options: Flack Coat or Carapace Armour or Ignatus Power Armour or Light Power Armour',
    wargear: [
      { name: 'Inquisitorial Rosette' },
      {
        name: 'Any weapon with a value 7 or less and up to Very Rare rarity',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
          },
        ],
      },
      {
        name: 'Any weapon with a value 7 or less and up to Very Rare rarity',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
          },
        ],
      },
      {
        name: 'Choose one of the following options: Flack Coat or Carapace Armour or Ignatus Power Armour or Light Power Armour',
        options: [
          { name: 'Flak Coat' },
          { name: 'Carapace Armour' },
          { name: 'Ignatus Power Armour' },
          { name: 'Light Power Armour' },
        ],
      },
    ],
    influence: 4,
  },
  {
    ...archetype('core',106,'Adeptus Astartes','Space Marine Scout',2,'Adeptus Astartes'),
    ...cost(170,10,160, 0, 0),
    hint: 'A stealthy warrior adept at reconnaissance.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'stealth', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Use the Terrain',
        snippet: 'You gain +Rank to any Stealth (A) Test when there is some form of terrain to hide behind.',
      },
    ],
    wargear: [
      { name: 'Scout Armour' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Vox Bead' },
      {
        name: 'Choose any one of the following options; A Boltgun or A Bolt pistol and a Chainsword or An Astartes Shotgun or An Astartes Sniper Rifle and a Cameleoline Cloak',
        selected: 'Boltgun',
        options: [
          { name: 'Boltgun' },
          { name: 'Chainsword and Bolt Pistol' },
          { name: 'Astartes Shotgun' },
          { name: 'Astartes Sniper Rifle and Cameleoline Cloak' },
        ],
      },
    ],
    influence: 1,
  },
  {
    ...archetype('core',113,'Adeptus Astartes','Tactical Space Marine',3,'Adeptus Astartes'),
    ...cost(272,20,252, 0, 0),
    hint: 'A versatile warrior, veteran of a hundred battles.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 }, // 20
      { group: 'attributes', value: 'toughness', threshold: 5 }, // 20
      { group: 'attributes', value: 'agility', threshold: 5 }, // 20
      { group: 'attributes', value: 'initiative', threshold: 5 }, // 20
      { group: 'attributes', value: 'willpower', threshold: 3 }, // 10
      { group: 'attributes', value: 'intellect', threshold: 3 }, // 10
      { group: 'skills', value: 'athletics', threshold: 3 }, // 12
      { group: 'skills', value: 'awareness', threshold: 3 }, // 12
      { group: 'skills', value: 'ballisticSkill', threshold: 5 }, // 12
      { group: 'skills', value: 'leadership', threshold: 1 }, // 12
      { group: 'skills', value: 'scholar', threshold: 1 }, // 12
      { group: 'skills', value: 'stealth', threshold: 3 }, // 12
      { group: 'skills', value: 'survival', threshold: 1 }, // 12
      { group: 'skills', value: 'weaponSkill', threshold: 4 }, // 12
    ],
    alerts: [
      { type: 'info', text: 'The errata states the cost as 277 but this is probably an error. Thus, we use 272 XP as the cost.', },
    ],
    archetypeFeatures: [
      {
        name: 'Tactical Versatility',
        snippet: 'Your training has prepared you for any circumstance. When you make a Critical Hit you may roll twice on the Critical Hit Table and choose either result.',
      },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
    influence: 2,
  },
  {
    ...archetype('core',117,'Adeptus Astartes','Primaris Intercessor',4,'Primaris Astartes'),
    ...cost(228,30,198, 0, 0),
    hint: 'A skilled and focused warrior, adept at bringing death at range.',
    keywords: 'Imperium, Adeptus Astartes, Primaris, [Chapter]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'stealth', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Intercessor Focus',
        snippet: 'You gain +Double Rank bonus dice to any Ballistic Skill Tests to fire a ranged weapon with the PRIMARIS Keyword.',
      },
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Bolt Rifle, Heavy Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
    influence: 1,
  },
  // Adeptus Mechanicus
  {
    ...archetype('core',101,'Adeptus Mechanicus','Skitarius',2,'Human'),
    ...cost(28,10,18, 0, 0),
    hint: 'A warrior of the Machine Cult, sturdy and reliable.',
    keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'tech', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Heavily Augmented',
        snippet: 'Your body has been redesigned to withstand the rigours of war. You do not bleed (making you immune to the Bleeding) and gain +Rank bonus dice to Determination rolls.',
      },
    ],
    wargear: wargearz('Combi-Tool, Galvanic Rifle, Skitarii Auto-Cuirass'),
  },
  {
    ...archetype('core',109,'Adeptus Mechanicus','Tech-Priest',3,'Human'),
    ...cost(44,20,24, 0, 0),
    hint: 'A priest of the Omnissiah, able to commune with the machine-spirits.',
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World]',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'tech', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Rite of Repair',
        snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
        ],
      },
    ],
    wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Laspistol' },
      {
        name: 'One Mechandrite.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Implants'],
            triptypeFilter: ['Mechadendrites'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      { name: 'Combi tool' },
      { name: 'Light Power Armour' },
      { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
    ],
    influence: 2,
  },
  // Scum
  {
    ...archetype('core',96,'Scum','Ganger',1,'Human'),
    ...cost(2,0,2, 0, 0),
    hint: 'A resourceful and tenacious survivor from the depths of enormous industrial cities.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Scrounger',
        snippet: 'You add +Rank dice to Cunning Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.',
        description:
          '<p>Your life with less has made you adept at finding spares and supplies in the most unlikely of places. You gain +Rank bonus dice to Cunning (Fel) Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: 'cunning', modifier: 0, rank: 1, condition: null },
        ],
      },
    ],
    wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stub Gun',
    wargear: [
      {
        name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stub Gun.',
        selected: 'Autopistol',
        options: [
          { name: 'Autopistol' },
          { name: 'Laspistol' },
          { name: 'Hand Cannon' },
          { name: 'Stub Gun' },
        ],
      },
      {
        name: 'Choice of a Knife or a Sword.',
        selected: 'Knife',
        options: [
          { name: 'Knife' },
          { name: 'Sword' },
        ],
      },
      { name: 'Bedroll' },
      { name: 'Canteen' },
      { name: 'Clothing', variant: 'Gang Colours' },
    ],
    influence: 1,
  },
  {
    ...archetype('core',105,'Scum','Scavvy',2,'Human'),
    ...cost(16,10,6, 0, 0),
    hint: 'A mutant—cast out and reviled—yet their mutations give them power.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Mutant',
        snippet: 'You start with two mutations (pg. 287). Whenever your Rank increases, you may select another Mutation.',
        description: '<p>Your life in the unsanitary underbelly of the Imperium has mutated you. Select two Mutations from the list of Scavvy Mutations on p.287. Whenever your Rank increases, you may select another Mutation from the list.</p>',
        alerts: [
          { type: 'warning', text: 'In case the mutation modifiers are not displayed correctly in the WEB or PRINT view, please clear and re-select your mutations.', },
          { type: 'info', text: 'Only select the amount of mutations that you are allowed to.', },
        ],
        selected: ['', '', '', ''],
        options: [
          {
            name: 'Hint of Red Eye',
            snippet: 'Add 1 dice to Awareness (Int) Tests. You suffer +1 DN to actions that require vision, while exposed to light.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 1, condition: null },
            ],
          },
          {
            name: 'Voice of the Aurelian',
            snippet: 'Add +Rank dice to social tests. Psykers within 25m must reroll Wrath Dice without compolications.'
          },
          {
            name: 'Living Shadow',
            snippet: 'You are aware of any Ambush as if you had spend a Point of Glory. You suffer +1 DN to opposing psychic powers of its effect.'
          },
          {
            name: 'Gossamer Flesh',
            snippet: 'You gain +Double Rank dice to Awareness (Int) Tests involving touch. You Reduce Resistance and Max Shock by 1. You suffer +1 DN to resist painfull contact.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 2, condition: 'when involving touch' },
              { targetGroup: 'traits', targetValue: 'resilience', modifier: -1 },
              { targetGroup: 'traits', targetValue: 'maxShock', modifier: -1 },
            ],
          },
          {
            name: 'Blightend Soul',
            snippet: 'You add +1 dice to resist Poison. You and anyone within 10m suffer +1 DN to Corruption and Malignancy Tests.'
          },
          {
            name: 'Wyrdling',
            snippet: 'You gain the PSYKER Keyword. You gain one Minor Psychic Power (GM choice). If you already are a PSYKER, you gan one aditional Minow Psychic Power.'
          },
          {
            name: 'Misshapen',
            snippet: 'Increase your Resolve by 2. Reduce your Max Shock by 1.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'resolve', modifier: 2 },
              { targetGroup: 'traits', targetValue: 'maxShock', modifier: -1 },
            ],
          },
          {
            name: 'Grotesque',
            snippet: 'You add +1 die to Intimidation (Wil) Tests. You suffer +1 DN to (other) social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
            ],
          },
          {
            name: 'Bestial Hide',
            snippet: 'Increase your Resilience by 1. You add +1 dice to Intimidation (Wil) Tests. You suffer +2 DN to (other) social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 },
              { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
            ],
          },
          {
            name: 'Brute',
            snippet: 'Increase your Strength and Toughness by 1. You suffer +1 DN to all tests involving Tools and Range Weapons, if they are not adjusted to your build.',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
            ],
          },
          {
            name: 'Toxic Blood',
            snippet: 'You are immune to Poisend and diseases. Any Medicae Test on you suffers +2 DN. On a Complication, the Medic must pass DN 4 Toughness or suffer one Mortal Wound.',
          },
          {
            name: 'Withered',
            snippet: 'Increase your Willpower by 2. Reduce your Toughness by 1.',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'willpower', modifier: 2 },
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: -1 },
            ],
          },
          {
            name: 'Vile Alacrity',
            snippet: 'Increase your Speed by 2. Add +1 dice to Athletic (Str) tests. You suffer (at least) +2 DN to social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'speed', modifier: 2 },
              { targetGroup: 'skills', targetValue: 'athletic', modifier: 1 },
            ],
          },
        ],
      },
    ],
    // A Laspistol or an Autopistol, Knife, Bedroll, Canteen, Tattered Clothes
    wargear: [
      {
        name: 'Choice of Laspistol or Autopistol.',
        selected: 'Laspistol',
        options: [
          { name: 'Laspistol' },
          { name: 'Autpistol' },
        ],
      },
      { name: 'Knife' },
      { name: 'Bedroll' },
      { name: 'Canteen' },
      { name: 'Clothing', variant: 'Tattered Clothing' },
    ],
    influence: -1,
  },
  {
    ...archetype('core',112,'Scum','Desperado',3,'Human'),
    ...cost(52,20,32, 0, 0),
    hint: 'A savvy and dangerous bounty hunter, mercenary, and gun for hire.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'skills', value: 'awareness', threshold: 2 },
      { group: 'skills', value: 'cunning', threshold: 2 },
      { group: 'skills', value: 'investigation', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Valuable Prey',
        snippet: 'You gain +Rank bonus dice on Cunning Tests, and any Test made to track an individual.',
      },
    ],
    wargearString: 'Flak Coat, Preysense Goggles, Maps of the Heartworlds, Combi-Tool, any PROJECTILE weapon, any melee weapon of Uncommon or lower Rarity.',
    wargear: [
      { name: 'Flak Coat' },
      { name: 'Prysense Googles' },
      { name: 'Maps of the Heartworlds' },
      { name: 'Combi Tool' },
      {
        name: 'any PROJECTILE weapon',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Ranged Weapon'],
            subtypeFilter: ['Projectile Weapon'],
          },
        ],
      },
      {
        name: 'One melee weapon of Uncommon or lower Rarity',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common','Uncommon'],
            typeFilter: ['Melee Weapon'],
          },
        ],
      },
    ],
    influence: 1,
  },
  // Renegades
  {
    ...archetype('core',96,'Chaos','Cultist',1,'Human'),
    ...cost(2,0,2, 0, 0),
    hint: 'A disciple of the Ruinous Powers, eager to gain their capricious favour.',
    keywords: 'Scum,[Any],Chaos,[Mark of Chaos]',
    prerequisites: [
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Enemy Within',
        snippet: 'You gain +Double Rank bonus dice to Deception (Fel) Tests, including Interaction Attacks, against targets with the IMPERIUM Keyword.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'deception', modifier: 0, rank: 2, condition: 'against IMPERIAL targets' },
        ],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 1 point Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 1 }] },
          { key: 'corruption-2', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 2 }] },
          { key: 'corruption-3', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }] },
        ],
      },
    ],
    wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stub Gun',
    wargear: [
      {
        name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stub Gun.',
        selected: 'Autopistol',
        options: [
          { name: 'Autopistol' },
          { name: 'Laspistol' },
          { name: 'Hand Cannon' },
          { name: 'Stub Gun' },
        ],
      },
      {
        name: 'Choice of a Knife or a Sword.',
        selected: 'Knife',
        options: [
          { name: 'Knife' },
          { name: 'Sword' },
        ],
      },
      { name: 'Bedroll' },
      { name: 'Canteen' },
      { name: 'Clothing', variant: 'Gang Colours' },
    ],
  },
  {
    ...archetype('core',100,'Chaos','Rogue Psyker',2,'Human'),
    ...cost(72,50,22, 0, 0),
    hint: 'How could you...',
    keywords: 'Chaos,Psyker,Scholastica Psykana',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
    ],
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.',
        description:
          '<p>You know 1 Minor Psychic Power and the Smite psychic power. You may purchase additional psychic powers, following the rules in Chapter 11.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
      },
      {
        name: 'Unlock Disciplines',
        snippet: 'You gain access to the Minor, Universal and Maleficarum disciplines. You unlock an additional single Psychic Discipline.',
        description: '<p>You gain access to the Minor, Universal and Maleficarum disciplines. You unlock an additional single Psychic Discipline, following the rules in Chapter 11.</p>',
        selected: [''],
        options: [
          // { key: 'core-minor', name: 'Minor', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
          // { key: 'core-universal', name: 'Universal', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Universal' }] },
          { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
          { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
          { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
          { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
          { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
          //{ key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
          { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
        ],
        psychicDisciplines: [
          'Minor',
          'Universal',
          'Maleficarum',
        ],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 x2 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 2 }] },
          { key: 'corruption-2', name: 'Gain 4 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 4 }] },
          { key: 'corruption-3', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 6 }] },
        ],
      },
    ],
    wargear: wargearz('Laspistol, Force Rod, Psykana Mercy Blade, Munitorum-Issue Mess Kit, Blanket, Grooming kit, 2 ration packs'),
  },
  {
    ...archetype('core',109,'Chaos','Heretek',3,'Human'),
    ...cost(84,60,24, 0, 0),
    hint: 'A fallen priest, able to commune with the heretic machine-spirits.',
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World],Chaos,Dark Mechanicus',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'tech', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Rite of Repair',
        snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
        ],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 x3 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }] },
          { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 6 }] },
          { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 9 }] },
        ],
      },
    ],
    wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Laspistol' },
      {
        name: 'One Mechandrite.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Implants'],
            triptypeFilter: ['Mechadendrites'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      { name: 'Combi tool' },
      { name: 'Light Power Armour' },
      { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
    ],
    influence: 2,
  },
  {
    ...archetype('core',113,'Chaos','Chaos Space Marine',3,'Adeptus Astartes'),
    ...cost(272,20,252, 0, 0),
    hint: 'A dark warrior, veteran of a thousand years.',
    keywords: 'Imperium,Adeptus Astartes,[Legion],Chaos,[Mark of Chaos],Heretic Astartes',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 }, // 20
      { group: 'attributes', value: 'toughness', threshold: 5 }, // 20
      { group: 'attributes', value: 'agility', threshold: 5 }, // 20
      { group: 'attributes', value: 'initiative', threshold: 5 }, // 20
      { group: 'attributes', value: 'willpower', threshold: 3 }, // 10
      { group: 'attributes', value: 'intellect', threshold: 3 }, // 10
      { group: 'skills', value: 'athletics', threshold: 3 }, // 12
      { group: 'skills', value: 'awareness', threshold: 3 }, // 12
      { group: 'skills', value: 'ballisticSkill', threshold: 5 }, // 12
      { group: 'skills', value: 'leadership', threshold: 1 }, // 12
      { group: 'skills', value: 'scholar', threshold: 1 }, // 12
      { group: 'skills', value: 'stealth', threshold: 3 }, // 12
      { group: 'skills', value: 'survival', threshold: 1 }, // 12
      { group: 'skills', value: 'weaponSkill', threshold: 4 }, // 12
    ],
    alerts: [
      { type: 'info', text: 'The errata states the cost as 277 but this is probably an error. Thus, we use 272 XP as the cost.', },
    ],
    archetypeFeatures: [
      {
        name: 'Tactical Versatility',
        snippet: 'Your training has prepared you for any circumstance. When you make a Critical Hit you may roll twice on the Critical Hit Table and choose either result.',
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 x3 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }] },
          { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 6 }] },
          { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: 'corruption', modifier: 9 }] },
        ],
      },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
    influence: 2,
  },
  // Aeldari
  {
    ...archetype('core',97,'Aeldari','Corsair',1,'Aeldari'),
    ...cost(16,0,16, 0, 0),
    hint: 'A space-faring pirate of an ancient race.',
    keywords: 'Aeldari,Anhrathe,[Corerie]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Dancing the Blade\'s Edge',
        snippet: 'You throw yourself into danger with reckless abandon to hide your ancestral fears. You gain +Rank bonus dice whenever you make or resist an Athletics (S) or Persuasion (Fel) Attack. You suffer a +1 DN penalty to Fear Tests.',
      },
    ],
    wargear: wargearz('Corsair Armour, Shuriken Pistol, Lasblaster, Spirit Stone, 3 Plasma Grenade, Void Suit'),
  },
  {
    ...archetype('core',107,'Aeldari','Ranger',2,'Aeldari'),
    ...cost(34,10,24, 0, 0),
    hint: 'A wanderer, a scout, and tracker for the good of their people.',
    keywords: 'Aeldari,Asuryani',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 1 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'From the Shadows',
        snippet: 'You are adept at exploiting any form of concealment. Whenever a Vision Penalty (p.191) or Cover (p.181) impose a penalty on someone trying to attack or detect you, the penalty is increased by +Rank DN.',
      },
    ],
    wargear: wargearz('Cameleoline Cloak, Aeldari Mesh Armour, Ranger Long Rifle, Shuriken Pistol, Knife, Spirit Stone, Bedroll, Blanket, Magnocular Scope'),
  },
  {
    ...archetype('core',114,'Aeldari','Warlock',3,'Aeldari'),
    ...cost(56,20,36, 0, 0),
    hint: 'A powerful psyker, wielding strictly-guided powers for the Aeldari cause.',
    keywords: 'Aeldari,Asuryani,Psyker,[Craftworld]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Runes of Battle',
        snippet: 'You are a Psyker; you know the Smite psyhcic power and may learn other powers as described in Chapter 11.',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          //{ name: 'psykerPsyniscience', selected: 'Psyniscience', query: { name: 'Psyniscience' }, options: [], free: true },
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
    wargear: [
      { name: 'Rune Armour' },
      { name: 'Shuriken Pistol' },
      { name: 'Witchblade' },
      { name: 'A set of Wraithbone Runes' },
      { name: 'Spirit Stone' },
    ],
    influence: 2,
  },
  // Orks
  {
    ...archetype('core',98,'Orks','Boy',1,'Ork'),
    ...cost(26,0,26, 0, 0),
    hint: 'A brutish warrior and thug who believes that might makes right.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Get Stuck In',
        snippet: 'You gain +Rank bonus dice to melee attacks for every ally engaged with the same target as you.',
      },
    ],
    wargear: wargearz('Shoota, Slugga, Choppa, Clothing/Ripped clothes'),
  },
  {
    ...archetype('core',108,'Orks','Kommando',2,'Ork'),
    ...cost(54,10,44, 0, 0),
    hint: 'A stealthy and cunning warrior who knows how to turn almost any battle to his advantage.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'stealth', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 1 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Kunnin\' Plan',
        snippet: 'You and any of your allies with the ORK within 15 metres gain +Rank bonus dice to Stealth (A) Tests.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'stealth', modifier: 0, rank: 1, condition: 'for You and ORK allies within 15 metres' },
        ],
      },
    ],
    wargear: wargearz('Shoota, Slugga, Choppa, 3 Stikkbomb, Survival Kit'),
  },
  {
    ...archetype('core',115,'Orks','Ork Nob',3,'Ork'),
    key: 'core-nob',
    ...cost(56,20,36, 0, 0),
    hint: 'A savage warrior and capable leader, using brute force to succeed where others fail.',
    name: 'Nob',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'The Green Tide',
        snippet: 'You command a mob of Boyz (p.354) equal to your Rank x3. If any of your Boyz die, they can be replaced between sessions at the GMs discretion.',
      },
    ],
    wargear: wargearz('\'Eavy Armour, Kustom Slugga, Kustom Choppa'),
    influence: 2,
  },
];

const dodScumPsyker = [
  {
    name: 'Scum Psyker',
    cost: 50,
    tier: 2,
    source: {
      book: 'Doctors of Doom Compendium',
      key: 'dodc',
      version: '',
      path: '',
    },
    species: ['Human (core)'],
    speciesKey: ['core-human'],
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
    influence: 0,
    keywords: 'Imperium,Scum,Psyker',
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'A Scum Psyker begins play with one minor psychic '
        + 'power and the smite psychic power. They may purchase additional Minor Psychic '
        + 'Powers and Universal Psychic powers, subject to Tier restrictions.',
        psychicPowers: [
          { name: 'psykerSmmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
        ],
      },
    ],
    keywordOption: null,
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 1 },
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    group: 'Scum',
    key: 'core-scum-psyker',
    description: null,
  },
];

const aotgtRep = [
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Callidus Assassin', 70, 4),
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Culexus Assassin', 75, 4),
  simpleStub('aotgt', '', 'core-human', 'Agents of the Imperium', 'Vindicare Assassin', 80, 4),
  simpleStub('aotgt', '', 'core-adeptus-astartes', 'Agents of the Imperium', 'Grey Knight', 90, 4),
];

const aaoaOrks = [
  {
    ...archetype('aaoa',48,'Orks','Burna Boy',2,'Ork'),
    ...cost(68,30,38, 0, 0),
    hint: 'Pyromaniacal Greenskins whose desire to burn and destroy grows to consume them entirely.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'tech', threshold: 1 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Da Burna Dance',
        snippet: 'You add +1 to Resolve for every creature you can see which is currently On Fire.',
      },
    ],
    wargear: wargearz('Burna, Ork Flak, 3 Stikkbomb'),
  },
  {
    ...archetype('aaoa',53,'Orks','Mekboy',2,'Ork'),
    ...cost(62,20,42, 0, 0),
    hint: 'A type of Ork Oddboy who build all the weapons, vehicles, and other advanced technology used by the Greenskins.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Fix It Proppa',
        description:
          '<p>You gain +Double Rank bonus dice on Tech tests to fix any weapon, vehicle, or other machine with the ORK keyword. In addition, during a regroup or respite, you may tinker with a weapon, vehicle, or other machine with the ORK keyword. If tinkering with a weapon, you may add your Rank from the weapon’s Range (add the same to all range categories), ED, Salvo rating, or any rated Trait the weapon already possesses. Other machines gain a bonus of the GM’s discretion. These bonuses last until the next respite, or until the machine suffers a complication, whichever comes first.</p>',
      },
    ],
    wargear: wargearz('Kustom Mega Blasta, Choppa, 3 Stikkbomb, Ork Flak, Mek Toolz'),
    influence: 1,
  },
  {
    ...archetype('aaoa',55,'Orks','Painboy',2,'Ork'),
    ...cost(62,20,42, 0, 0),
    hint: 'Responsible for fixing injuries even the highly regenerative Ork physiology cannot repair.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'medicae', threshold: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Make It All Betta',
        description:
          '<p>You add Double Rank bonus dice to all Medicae tests made on characters with the ORK keyword. In addition, when making a Medicae test on an ORK character outside of combat, you may spend an Exalted Icon from to remove a single Traumatic Injury immediately, as you crudely reattached lost body parts.</p>',
      },
    ],
    wargear: wargearz('‘Urty Syringe, Choppa, Ork Flak, Dok´s Toolz'),
    influence: 1,
  },
  {
    ...archetype('aaoa',55,'Orks','Runtherd',2,'Ork'),
    ...cost(68,20,48, 0, 0),
    hint: 'Oddboyz who exhibit a trait extremely uncommon amongst Orks: patience.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
      { group: 'skills', value: 'leadership', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Slaver',
        description:
          '<p>You are accompanied by a mob of Grots (p. 358) equal to your Rank x4. If any of your Grots die, they can be replaced between sessions at the GM’s discretion. All Grots, Snotlings, and Squigs within 10 + Rank metres of you add your Leadership to their Resolve.</p>',
      },
    ],
    wargear: wargearz('Slugga, grabba stikk, 3 stikkbomb, grot lash, Ork Flak'),
    influence: 1,
  },
  {
    ...archetype('aaoa',58,'Orks','Tankbusta',2,'Ork'),
    ...cost(58,20,38, 0, 0),
    hint: 'A Tankbusta (pl. Tankbustaz) has become completely addicted to the thrill of destroying the armoured fighting vehicles of his foes.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'tech', threshold: 1 },
    ],
    keywords: 'Ork,[Clan]',
    archetypeFeatures: [
      {
        name: 'Tank Hunters',
        description:
          '<p>When you make an attack against a vehicle, you may reroll up to Double Rank dice.</p>',
      },
    ],
    wargear: wargearz('Rokkit Launcher, Ork Flak, 3 stikkbomb, 1 tankbusta bomb'),
    influence: 1,
  },
  {
    ...archetype('aaoa',72,'Orks','Flash Git',3,'Ork'),
    ...cost(94,30,64, 0, 0),
    hint: 'An elite breed of Ork Nobz who are obsessed with their lovingly customised, ostentatiously polished and painted weapons known as Snazzguns.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'cunning', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    keywords: 'Ork,[Clan]',
    archetypeFeatures: [
      {
        name: 'Gun Crazy Show-Offs',
        description:
          '<p>If you roll a 6 on your Wrath die when making a ranged attack, you may spend a reload to immediately make a second shooting attack with that weapon at the nearest target.</p>',
      },
    ],
    wargear: wargearz('Snazzgun, ‘Eavy armour, 3 stikkbomb, ammo runt'),
    influence: 2,
  },
  {
    ...archetype('aaoa',86,'Orks','Weirdboy',3,'Ork'),
    ...cost(126,80,46, 0, 0),
    hint: 'Capable of vomiting blasts of Warp energy that can reduce foes to molten goop in seconds.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
    ],
    keywords: 'Ork,Psyker,[Clan]',
    archetypeFeatures: [
      {
        name: 'The Power of the WAAAGH!',
        description:
          '<p>You are a Psyker; you know the Smite psychic power and may learn other powers from the WAAAGH discipline. When using psychic powers, you do not choose a Power Level; rather, you gain one additional Wrath die for every five Orks within 20 metres of you. You must roll these Wrath dice. Each 1 rolled on a Wrath die when using a Psychic Power inflicts one Mortal Wound on you instead of a roll on the Perils of the Warp table, and if you exceed your Max Wounds from this, you explode, dying instantly and inflicting 1d3+Tier Mortal Wounds on all Orks within 20 metres.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'WAAAGH!',
        ],
      },
    ],
    wargear: wargearz('Weirdboy Staff, Ork Flak, collection of jangly baubles'),
  },
];

const aaoaAeldari = [
  {
    name: 'Guardian',
    ...archetype('aaoa', 35, 'Aeldari', 'Guardian', 1, 'Aeldari'),
    ...cost(38,0,38, 0, 0),
    hint: 'A Cratsworld Last Line of Defence.',
    keywords: 'Aeldari, Asuryani, [Craftworld]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      // OR { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'The Last Line',
        description:
          '<p>Guardians march to war only when necessary, for the Asuryani are few and their lives are precious. This grim necessity means you increase your Resolve and Conviction by Rank.</p>',
      },
    ],
    wargear: wargearz('Eldar Mesh Armour, Shuriken Catapult, mono-knife, 3 plasma grenade, spirit stone'),
  },
  {
    name: 'Bonesinger',
    ...archetype('aaoa', 47, 'Aeldari', 'Bonesinger', 2, 'Aeldari'),
    ...cost(102,40,62, 0, 0),
    hint: 'Shapers of Bone.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Psyker',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'psychicMastery', threshold: 2 },
      { group: 'skills', value: 'tech', threshold: 2 },
      // OR { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Path of the Shaper',
        // TODO probably error
        snippet: 'You are a psyker; you know the Smite and Vaul’s Song psychic powers and may learn other powers as described in Chapter 11.',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerVaulsSong', selected: 'Vaul´s Song', query: { name: 'Vaul´s Song' }, options: [], free: true },
        ],
      },
      {
        name: 'Unlock Disciplines',
        snippet: 'You gain access to the Minor, Universal, Divination and Runes of Shaping Disciplines. You also gain access to one additional Discipline.',
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
          { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
        ],
        psychicDisciplines: [
          'Minor',
          'Universal',
          'Divination',
          'Runes of Shaping',
        ],
      },
    ],
    wargear: wargearz('Rune armour, psytronome shaper, a set of wraithbone runes, Bonesinger shard, Spirit Stone'),
    influence: 1,
  },
  // Aspect warriors
  {
    name: 'Dark Reaper',
    ...archetype('aaoa', 67, 'Aeldari', 'Dark Reaper', 3, 'Aeldari'),
    ...cost(112,30,82, 0, 0),
    hint: 'Aspect warriors, merciless and deadly at range.',
    prerequisites: [
      reqAttribute('agility', 3),
      reqAttribute('strength', 4),
      reqAttribute('willpower', 3),
      reqSkill('ballisticSkill', 5),
      reqSkill('awareness', 3),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Inescapable Aim: You may reroll up to Double Rank dice on any Ranged Attack you make.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Reaper Launcher, Dark Reaper Rangefinder, mono-knife, spirit stone'),
    influence: 1,
  },
  {
    name: 'Dire Avenger',
    ...archetype('aaoa', 70, 'Aeldari', 'Dire Avenger', 3, 'Aeldari'),
    ...cost(126,30,96, 0, 0),
    hint: 'Aspect warriors, skilled in the arts of aggressive defence.',
    prerequisites: [
      reqAttribute('agility', 4),
      reqAttribute('initiative', 4),
      reqAttribute('willpower', 3),
      reqSkill('ballisticSkill', 4),
      reqSkill('leadership', 2),
      reqSkill('weaponSkill', 4),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Defensive Tactics: You add +Rank to your Defence. In addition, when an enemy Charges you, you may make a ranged attack against them as a Reflexive Action, adding +2 to the DN of the attack. This attack is resolved before the enemy moves.'),
    ],
    wargear: wargearz('Aspect Armour, Avenger Shuriken Catapult, targeting vane, mono-knife, 3 plasma grenade, spirit stone'),
    influence: 2,
  },
  {
    name: 'Fire Dragon',
    ...archetype('aaoa', 71, 'Aeldari', 'Fire Dragon', 3, 'Aeldari'),
    ...cost(118,30,88, 0, 0),
    hint: 'Aspect warriors, turning all in their path to molten ruin.',
    prerequisites: [
      reqAttribute('toughness', 3),
      reqAttribute('agility', 4),
      reqAttribute('willpower', 3),
      reqSkill('athletics', 2),
      reqSkill('ballisticSkill', 5),
      reqSkill('tech', 3),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    modifications: [],
    archetypeFeatures: [
      simpleAbility('Assured Destruction: When you attack a vehicle, structure, or monstrous creature, add +Rank ED to the attack. In addition, add +Rank to your resilience against attacks with the FIRE or MELTA keywords.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Fusion Gun, 1 melta bomb, mono-knife, spirit stone'),
    influence: 1,
  },
  {
    name: 'Howling Banshee',
    ...archetype('aaoa', 75, 'Aeldari', 'Howling Banshee', 3, 'Aeldari'),
    ...cost(137,30,107, 0, 0),
    hint: 'Aspect warriors, swift shock troops whose shriek freezes the hearts of their foes.',
    prerequisites: [
      reqAttribute('agility', 5),
      reqAttribute('initiative', 4),
      reqAttribute('willpower', 3),
      reqSkill('athletics', 2),
      reqSkill('intimidation', 2),
      reqSkill('weaponSkill', 5),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Swift Death: When you Run, Charge, or Sprint, increase your Speed by +Rank. In addition, you may use Agility instead of Strength for your Athletics skill tests.'),
    ],
    wargear: wargearz('Aspect Armour, shuriken pistol, power sword, Banshee Mask, spirit stone'),
    influence: 1,
  },
  {
    name: 'Shining Spear',
    ...archetype('aaoa', 75, 'Aeldari', 'Shining Spear', 3, 'Aeldari'),
    ...cost(151,30,131, 0, 0),
    hint: 'Aspect warriors, jetbike-mounted lancers who slay the mightiest foes',
    prerequisites: [
      reqAttribute('strength', 2),
      reqAttribute('agility', 5),
      reqAttribute('willpower', 3),
      reqSkill('pilot', 5),
      reqSkill('tech', 2),
      reqSkill('weaponSkill', 5),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Ride the Wind: You may reroll Double Rank dice on any Pilot test you make when operating an Aeldari Jetbike'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Laser Lance, Aeldari Jetbike, spirit stone'),
    influence: 1,
  },
  {
    name: 'Striking Scorpion',
    ...archetype('aaoa', 82, 'Aeldari', 'Striking Scorpion', 3, 'Aeldari'),
    ...cost(118,30,88, 0, 0),
    hint: 'Aspect warriors, stealthy killers who strike with unseen power.',
    prerequisites: [
      reqAttribute('strength', 3),
      reqAttribute('agility', 4),
      reqAttribute('willpower', 3),
      reqSkill('athletics', 2),
      reqSkill('stealth', 3),
      reqSkill('weaponSkill', 5),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Hunt in the Shadows: You may reroll up to Double Rank dice when making a Stealth test. In addition, you add +Rank bonus dice when you make a Surprise Attack.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Scorpion Chainsword, Shuriken Pistol, Mandiblaster Helm, 3 plasma grenade, Spirit Stone'),
    influence: 1,
  },
  {
    name: 'Swooping Hawk',
    ...archetype('aaoa', 83, 'Aeldari', 'Swooping Hawk', 3, 'Aeldari'),
    ...cost(111,30,81, 0, 0),
    hint: 'Aspect warriors, flitting across the skies to deal vengeance.',
    prerequisites: [
      reqAttribute('agility', 5),
      reqAttribute('willpower', 3),
      reqSkill('athletics', 2),
      reqSkill('ballisticSkill', 5),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Skyleap: So long as you are able to Fly, you may Fall Back as a Simple action, rather than a Combat Action. In addition, when you take the Full Defence action, you immediately move twice your Flying Speed (instead of halving your Speed) away from the enemy and add +Rank bonus dice to the Initiative test to increase your Defence. Naturally, these abilities require that you be able to fly, and have room to do so.'),
    ],
    wargear: wargearz('Aspect Armour, Lasblaster, mono-knife, Swooping Hawk Wings, Swooping Hawk Grenade Pack, 6 plasma grenade, Spirit Stone'),
    influence: 2,
  },
  {
    name: 'Warp Spider',
    ...archetype('aaoa', 85, 'Aeldari', 'Warp Spider', 3, 'Aeldari'),
    ...cost(118,30,88, 0, 0),
    hint: 'Aspect warriors, appearing from nowhere to cut down their prey.',
    prerequisites: [
      reqAttribute('agility', 4),
      reqAttribute('intellect', 3),
      reqAttribute('willpower', 4),
      reqSkill('awareness', 3),
      reqSkill('ballisticSkill', 4),
      reqSkill('tech', 2),
    ],
    keywords: 'Aeldari, Asuryani, <Craftworld>, Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Flickerjump: As a Reflexive Action when a ranged attack is made against you, you may add +Double Rank to your Defence, as you use your Warp Jump Generator to flicker in and out of reality.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Death Spinner, Warp Jump Generator, mono-knife, spirit stone'),
    influence: 1,
  },
  // Harlequin
  simpleStub('aaoa2', 57, 'Eldar', 'Aeldari', 'Harlequin Player', 100, 4),
  simpleStub('aaoa2', 57, 'Eldar', 'Aeldari', 'Harlequin Troupe Master', 150, 5),
  simpleStub('aaoa2', 58, 'Eldar', 'Aeldari', 'Harlequin Shadowseer', 150, 5),
  simpleStub('aaoa2', 58, 'Eldar', 'Aeldari', 'Harlequin Death Jester', 150, 5),
  simpleStub('aaoa2', 59, 'Eldar', 'Aeldari', 'Harlequin Solitaire', 150, 5),
  // druchari
  {
    name: 'Kabalite Warrior',
    ...archetype('aaoa', 38, 'Drukhari', 'Kabalite Warrior', 1, 'aaoa/Drukhari'),
    ...cost(38,0,38, 0, 0),
    hint: 'A dark hunter from the noble houses.',
    keywords: 'Aeldari,Drukhari,[Cabal]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 2 },
      { group: 'attributes', value: 'initiative', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'cunning', threshold: 1 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Tormentor',
        snippet: 'You add +Double Rank bonus dice to all Intimidation Interaction attacks you make.',
      },
    ],
    wargear: wargearz('Kabalite Warsuit, Splinter Rifle, Mono Knife'),
    influence: 1,
  },
  {
    name: 'Wych',
    ...archetype('aaoa', 38, 'Drukhari', 'Wych', 1, 'aaoa/Drukhari'),
    ...cost(52,0,52, 0, 0),
    hint: 'A deadly cult gladiator.',
    keywords: 'Aeldari,Drukhari,[Cult]',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'strength', threshold: 2 },
      { group: 'attributes', value: 'initiative', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    archetypeFeatures: [
      {
        name: 'Hekatarii Prowess',
        snippet: 'As long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds. In addition, enemies attempting to Fall Back must pass an Agility test (DN 2+ Double Rank); failure means that they cannot Fall Back this turn.',
      },
    ],
    wargear: wargearz('Wychsuit, Hekatarii blade, splinter pistol, 3 plasma grenade, 3 Hekatarii Combat Drugs'),
  },
  {
    name: 'Incubus',
    ...archetype('aaoa', 76, 'Drukhari', 'Incubus', 3, 'aaoa/Drukhari'),
    ...cost(108,0,58, 0, 0),
    hint: 'A deadly cult gladiator.',
    keywords: 'Drukhari',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 5 },
    ],
    archetypeFeatures: [
      {
        name: 'Lethal Precision',
        snippet: 'For each Exalted Icon you roll on the damage roll for a melee attack, you may roll one additional ED. These additional ED cannot themselves allow you to roll extra ED.',
      },
    ],
    wargear: wargearz('Incubi Warsuit, Klaive, Tormentor'),
    influence: 1,
  },
];

const aaoaSquat = [
  {
    ...simpleStub('aaoa2', 63, 'aaoa-squat', 'Squats', 'War-Pledged Warrior', 0, 1, false),
    hint: 'The rank and file of a Squat Stronghold.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'cunning', threshold: 2 },
    ],
    keywords: 'Squat,<League>',
    influence: 0,
    archetypeFeatures: [
      {
        name: 'War-Pledged',
        description:
          '<p>A War-Pledged Warrior is bound by oaths of loyalty and duty and stands united with their comrades-in-arms.</p>' +
          'Whenever a War-Pledged Warrior attacks an enemy who has been attacked by an ' +
          'ally already during this round (including Interaction attacks), ' +
          'they gain a bonus of +½ Rank to their attack.</p>',
      },
    ],
    wargearString:
      'Boltgun, hand-cannon, mono knife, Flak armour, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Boltgun' },
      { name: 'Hand-cannon' },
      { name: 'mono knife' },
      { name: 'Flak armour' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 63, 'aaoa-squat', 'Squats', 'Guild Engineer', 60, 3, false),
    hint: 'Masterful artisans, creating the devices necessary for survival.',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
    ],
    keywords: 'Squat,<League>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Guild Techniques',
        description:
          '<p>Guild Engineers receive +Rank on Tech tests to repair a damaged machine. They may re-roll up to ½ Rank dice on any skill test to use a device that they have personally built or repaired. They are considered to have built all of their starting wargear.</p>',
      },
    ],
    wargearString:
      'Boltgun, Power Axe, augmetic servo-arm, Ionclad Carapace armour, Refractor field, Guild Engineer’s tools.',
    wargear: [
      { name: 'Boltgun' },
      { name: 'Power Axe' },
      { name: 'Mechadendrites (Servo-Arm)' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Refractor field' },
      { name: 'Guild Engineer’s tools' },
    ],
  },
  {
    ...simpleStub('aaoa2', 64, 'aaoa-squat', 'Squats', 'Hearthguard', 60, 3, false),
    hint: 'Doughty elite warriors pledged to defend hearth and home.',
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 2 },
    ],
    keywords: 'Squat,<League>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Bodyguard',
        description:
          '<p>A Hearthguard is unstinting in their devotion to their comrades, ' +
          'and they will not permit their allies to come to harm if it can be helped. ' +
          'When an enemy makes an attack against a character within 5m of the Hearthguard (and who is one of the Hearthguard’s allies), the DN of the attack is increased by ½ the Hearthguard’s Rank.</p>',
      },
    ],
    wargearString:
      'Boltgun, Power Axe, Bolt Pistol, mono knife, Ionclad Carapace Armour, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Boltgun' },
      { name: 'Power Axe' },
      { name: 'Bolt Pistol' },
      { name: 'Mono Knife' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 64, 'aaoa-squat', 'Squats', 'Ancestor Lord', 100, 4, false),
    hint: 'Ancient sages, wise enough to tap into the Warp with care and listen to the voices of the dead.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'attributes', value: 'fellowship', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 3 },
      { group: 'skills', value: 'psychicMastery', threshold: 3 },
    ],
    keywords: 'Squat,<League>,Psyker',
    influence: 4,
    archetypeFeatures: [
      {
        name: 'Psychic Protector',
        description:
          '<p>An Ancestor Lord begins play with the Psyniscience and smite psychic powers (which do not count towards the maximum), ' +
          'and may purchase additional Minor Psychic Powers, Universal Psychic Powers, and Ancestral Rites Psychic Powers, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerPsyniscience', selected: 'Psyniscience', query: { name: 'Psyniscience' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Ancestral Rites',
        ],
      },
    ],
    wargearString:
      'Master-Crafted Force Rod, Ionclad Carapace armour, clothing (Ancestor’s robes).',
    wargear: [
      { name: 'Force Rod', variant: 'Master-Crafted Force Rod' },
      { name: 'Ionclad Carapace Armour' },
      { name: 'Clothing', variant: 'Ancestor’s robes' },
    ],
  },
];

const aaoaRep = [
  ...aaoaAeldari,
  ...aaoaOrks,
  ...aaoaSquat,
  {
    ...simpleStub('aaoa2', 22, 'core-human', 'Adeptus Ministorum', 'Frateris Militia', 0, 1, false),
    hint: 'A faithful citizen whipped into a fervour and eager to slay in the Emperor’s name.',
    prerequisites: [
      reqAttribute('willpower', 2),
      reqSkill('ballisticSkill', 1),
      reqSkill('weaponSkill', 1),
    ],
    keywords: 'Imperium',
    influence: 0,
    archetypeFeatures: [
      {
        name: 'Fevour',
        snippet:
          'When within hearing range of a character with the Adeptus Ministorum keyword, ' +
          'a Frateris Militiaman increases their Resolve by +½ Rank. ' +
          'In addition, if that Adeptus Ministorum character has suffered any wounds during the current scene, ' +
          'the Frateris Militiaman’s Soak is increased by +½ Rank while they remain within ten metres.'
      },
    ],
    wargearString: 'One ranged or melee weapon of Value 3 or less of up to Common rarity, knife, symbol of devotion (tin aquila, devotional scroll, etc.).',
    wargear: [
      {
        name: 'One ranged or melee weapon of Value 3 or less of up to Common rarity',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 3 },
            rarityFilter: ['Common'],
            typeFilter: ['Ranged Weapon', 'Melee Weapon'],
          },
        ],
      },
      { name: 'Knife' },
      { name: 'Symbol of devotion' },
    ],
  },
  {
    ...simpleStub('aaoa2', 22, 'core-human', 'Adeptus Ministorum', 'Confessor', 40, 3, false),
    hint: 'A high-ranking priest whose rhetoric inspires zeal and piety wherever they go.',
    prerequisites: [
      reqAttribute('willpower', 4),
      reqAttribute('fellowship', 4),
      reqSkill('persuasion', 3),
      reqSkill('scholar', 2),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Priest',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Incite Zeal',
        snippet:
          'A Confessor adds +Rank to all Persuade Interaction attacks against targets with the Imperium, Scum, or Heretic keywords. ' +
          'In addition, a Confessor may spend a Wrath point to make themselves frenzied; ' +
          'If they do so, they may also make all allies with the Imperium keyword within 15+Rank metres frenzied too.'
      },
    ],
    wargearString:
      'Laspistol, one melee weapon or one ranged weapon of up to Value 7 and a rarity of up to Rare, ' +
      'Rosarius, knife, clothing (Ministorum robes), missionary kit, symbol of authority.',
    wargear: [
      { name: 'Laspistol' },
      {
        name: 'one melee weapon or one ranged weapon of up to Value 7 and a rarity of up to Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 3 },
            rarityFilter: ['Common','Uncommon','Rare'],
            typeFilter: ['Ranged Weapon', 'Melee Weapon'],
          },
        ],
      },
      { name: 'Rosarius' },
      { name: 'Knife' },
      { name: 'Clothing', variant: 'Ministorum robes' },
      { name: 'Missionary kit' },
      { name: 'symbol of authority' },
    ],
  },
  {
    ...simpleStub('aaoa2', 23, 'core-human', 'Adepta Sororitas', 'Sister Dialogous', 0, 1, false),
    hint: 'A devout scholar of language, ensuring that the Emperor’s Word is understood by all.',
    prerequisites: [
      reqAttribute('intellect', 2),
      reqAttribute('willpower', 3),
      reqSkill('persuasion', 1),
      reqSkill('scholar', 2),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Linguist',
        snippet:
          'A Sister Dialogous knows three additional languages and adds +Rank on Scholar tests relating to language. In addition, an ally may attempt Persuade or Intimidation tests against characters who do not share a common language so long as a Sister Dialogous is present and knows the target’s language – the Sister translates for her ally.'
      },
    ],
    wargearString:
      'Laspistol, clothing (Sororitas vestments), copy of the Rule of the Sororitas, collection of reference books, vox-caster.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
      { name: 'collection of reference books' },
      { name: 'vox-caster' },
    ],
  },
  {
    ...simpleStub('aaoa2', 23, 'core-human', 'Adepta Sororitas', 'Sister Famulous', 10, 1, false),
    hint: 'A pious advisor to those of noble birth and ancient bloodlines.',
    prerequisites: [
      reqAttribute('intellect', 2),
      reqAttribute('willpower', 3),
      reqAttribute('fellowship', 3),
      reqSkill('leadership', 1),
      reqSkill('scholar', 1),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Major-domo',
        snippet:
          'A Sister Famulous adds +Rank to Scholar tests to know information about noble families and similar high-status groups. In addition, a Sister Famulous may, when acting on behalf of a client, add +Rank to Influence tests and interaction skills where social status is relevant.'
      },
    ],
    wargearString:
      'Laspistol, clothing (Sororitas vestments), copy of the Rule of the Sororitas, collection of reference books, vox-caster.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
      { name: 'collection of reference books' },
      { name: 'vox-caster' },
    ],
  },
  {
    ...simpleStub('aaoa2', 24, 'core-human', 'Adepta Sororitas', 'Sister Seraphim', 55, 3, false),
    hint: 'An elite and zealous warrior, faithful even compared to other Sisters of Battle.',
    prerequisites: [
      reqAttribute('strength', 3),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 3),
      reqAttribute('willpower', 4),
      reqSkill('scholar', 2),
      reqSkill('ballisticSkill', 4),
      reqSkill('weaponSkill', 4),
      reqSkill('pilot', 4),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Angelic',
        snippet:
          'Sisters Seraphim and allies within 15 metres and line of sight add +Rank to Corruption tests. Sisters Seraphim gain +Rank to any dice pool to resist psychic powers and effects. Sisters Seraphim also have +1 Faith.'
      },
    ],
    wargearString:
      'Sororitas power armour, Chaplet Ecclesiasticus, two bolt pistols (with Matched Pair upgrade), ' +
      'jump pack, clothing (Sororitas vestments), writing kit, copy of the Rule of the Sororitas.',
    wargear: [
      { name: 'Sororitas Power Armour' },
      { name: 'Chaplet Ecclesiasticus' },
      { name: 'Bolt Pistol', variant: 'Bolt Pistol with Matched Pair upgrade' },
      { name: 'Bolt Pistol', variant: 'Bolt Pistol with Matched Pair upgrade' },
      { name: 'Jump Pack' },
      { name: 'Clothing', variant: 'Sororitas vestments' },
      { name: 'Writing Kit' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
    ],
  },
  {
    ...simpleStub('aaoa2', 24, 'core-human', 'Adepta Sororitas', 'Sister Repentia', 40, 2, false),
    hint: 'A penitent soul, seeking atonement for her sins through death and pain.',
    prerequisites: [
      reqAttribute('strength', 3),
      reqAttribute('agility', 3),
      reqAttribute('toughness', 4),
      reqAttribute('willpower', 3),
      reqSkill('scholar', 2),
      reqSkill('weaponSkill', 4),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,<Order>',
    influence: -2,
    archetypeFeatures: [
      {
        name: 'Outcast',
        snippet:
          'Sisters Repentia add +2DN to all interaction tests with other characters with the Adeptus Ministorum or Adepta Sororitas keywords and may not benefit from their Adepta Sororitas keyword in social situations.'
      },
      {
        name: 'Penitent',
        snippet:
          'Sisters Repentia add +Rank to Corruption tests and all dice pools to resist psychic powers and effects. Sisters Repentia may become frenzied at will and may re-roll up to Rank dice on Soak rolls.'
      },
    ],
    wargearString:
      'Eviscerator, clothes (tattered penitent robes).',
    wargear: [
      { name: 'Eviscerator' },
      { name: 'Clothing', variant: 'tattered penitent robes' },
    ],
  },
  {
    ...simpleStub('aaoa2', 25, 'core-human', 'Astra Militarum', 'Imperial Guard Medic', 0, 1, false),
    hint: 'A disciplined soldier trained to treat the injuries of their comrades.',
    prerequisites: [
      reqAttribute('intellect', 3),
      reqSkill('ballisticSkill', 2),
      reqSkill('medicae', 2),
    ],
    keywords: 'Imperium,Astra Militarum,<Regiment>',
    influence: 0,
    archetypeFeatures: [
      {
        name: 'Field Medic',
        snippet:
          'When an Imperial Guard Medic stabilises a dying character, each shifted Exalted Icon restores one additional wound in the character being stabilised.'
      },
      {
        name: 'Regiment Affiliation',
        snippet:
          'Select a regiment to which the character belongs (see Regiments on page 114 of the Wrath & Glory rulebook).'
      },
    ],
    wargearString:
      'Flak armour, Lasgun, knife, Munitorum-Issue Mess Kit, blanket, grooming kit, Uplifting Primer, 3 ration packs, medikit.',
    wargear: [
      { name: 'Flak Armour' },
      { name: 'Lasgun' },
      { name: 'Knife' },
      { name: 'Munitorum-Issue Mess Kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Uplifting Primer' },
      { name: 'Ration Packs', amount: 3 },
      { name: 'Medkit' },
    ],
  },
  {
    ...simpleStub('aaoa2', 25, 'core-human', 'Astra Militarum', 'Imperial Guard Officer', 15, 1, false),
    hint: 'A stern commander trained to inspire and lead others into the fray.',
    prerequisites: [
      reqAttribute('fellowship', 3),
      reqSkill('ballisticSkill', 2),
      reqSkill('leadership', 2),
    ],
    keywords: 'Imperium,Astra Militarum,<Regiment>,Officer',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Voice of Command',
        description:
          '<p>An Officer may spend an action giving an order to a character with the Astra Militarum keyword who is within hearing range and subordinate to the officer. This requires a Leadership test (DN 3). A successful test allows the ordered character to gain one of the following benefits (Officer’s choice) on their next turn:</p>' +
          '<ul>' +
            '<li>Reduce the DN penalty for taking a Multi-action by the Officer’s Rank.</li>' +
            '<li>Add the Officer’s Rank as a bonus on one test they attempt.</li>' +
            '<li>Add the Officer’s Rank as +ED on the damage of one successful attack they make.</li>' +
          '</ul>' +
          '<p>An officer may issue orders to multiple characters, adding +2 to the DN of the leadership test for each character after the first being orders. All character ordered must receive the same benefit.</p>'
      },
      {
        name: 'Regiment Affiliation',
        snippet:
          'Select a regiment to which the character belongs (see Regiments on page 114 of the Wrath & Glory rulebook).'
      },
    ],
    wargearString:
      'Flak armour, Laspistol, chainsword, knife, Munitorum-Issue Mess Kit, blanket, grooming kit, Uplifting Primer, 3 ration packs.',
    wargear: [
      { name: 'Flak Armour' },
      { name: 'Lasgun' },
      { name: 'Chainsword' },
      { name: 'Knife' },
      { name: 'Munitorum-Issue Mess Kit' },
      { name: 'Blanket' },
      { name: 'Grooming kit' },
      { name: 'Uplifting Primer' },
      { name: 'Ration Packs', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Assault Space Marine', 55, 3, false),
    hint: 'A deadly shock trooper, taking the fight to the enemy.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('weaponSkill', 3),
      reqSkill('pilot', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hammer of Wrath',
        description:
         'When an Assault Marine charges into melee using his jump pack, all enemies within 2m of the point where he lands must pass an Agility test (DN 2+Rank) or be knocked prone.',
      },
    ],
    wargearString:
      'Aquila power armour, bolt pistol, chainsword, 3 frag and krak grenades, jump pack.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Chainsword' },
      { name: 'Jump Pack' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Devastator Space Marine', 55, 3, false),
    hint: 'A ruthless heavy weapons specialist, delivering death at a distance.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 3),
      reqSkill('tech', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Unrelenting Devastation',
        description:
          'When a Devastator Marine sacrifices their move action to brace, and then makes a ranged attack, they add ½ Rank to their Ballistic Skill test and ½ Rank bonus ED to the weapon’s damage.',
      },
    ],
    wargearString:
      'Aquila power armour, bolt pistol, 3 frag and krak grenades, ' +
      'and one of the following heavy weapons (all of which are accompanied by an ammunition backpack, barring the missile launcher): ' +
      'heavy bolter, missile launcher with 6 frag and 6 krak missiles, lascannon, multi-melta, plasma cannon, or grav-cannon.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      {
        name: 'One of the following heavy weapons (all of which are accompanied by an ammunition backpack, barring the missile launcher)',
        options: [
          { name: 'Heavy Bolter and Ammunition Backpack' },
          { name: 'Lascannon and Ammunition Backpack' },
          { name: 'Multi-Melta and Ammunition Backpack' },
          { name: 'Plasma Cannon and Ammunition Backpack' },
          { name: 'Grav Cannon and Ammunition Backpack' },
          { name: 'Missile Launcher' },
        ]
      }
    ],
  },
  {
    ...simpleStub('aaoa2', 27, 'core-adeptus-astartes', 'Adeptus Astartes', 'Grey Knight', 60, 3, false),
    hint: 'A member of a secretive order of elite psychic daemon-hunters',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('weaponSkill', 4),
      reqSkill('psychicMastery', 2),
      reqSkill('scholar', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,Grey Knights,Psyker,Inquisition, Ordo Malleus',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Rites of Banishment',
        snippet: 'You learn the Rites of Banishment power and one additional minor power. You gain access to Minor, Universal and Sanctic powers.',
        description:
          '<p>A Grey Knight begins play with the Rites of Banishment psychic power and one minor psychic power. ' +
          'He may also purchase additional minor psychic powers and Sanctic Psychic powers, subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerRitesOfBanishment', selected: 'Rites of Banishment', query: { name: 'Rites of Banishment' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Sanctic',
        ],
      },
    ],
    wargearString:
      'Aquila power armour, aegis, nemesis force sword, storm bolter, 3 psyk-out grenades, armoured copy of the liber daemonica.',
    wargear: [
      { name: 'Aegis Power Armour' },
      { name: 'Nemesis Force Sword' },
      { name: 'Storm Bolter' },
      { name: 'Psyk-out Grenade', amount: 3 },
      { name: 'Liber Daemonica', variant: 'Armoured copy of the liber daemonica' },
    ],
  },
  {
    ...simpleStub('aaoa2', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Hellblaster', 60, 4, false),
    hint: 'A specialised warrior, armed with sophisticated, powerful weapons to deal with the toughest foes.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('tech', 4),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Hellblaster Focus', 'When firing a plasma incinerator (including assault plasma incinerators and heavy plasma incinerators), Hellblasters gain +½ Rank bonus ED to weapon damage.'),
    ],
    wargearString:
      'Mark X Tacticus power armour, plasma incinerator, heavy bolt pistol, Astartes combat knife, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Tacticus Mk X' },
      { name: 'Plasma Incinerator' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Inceptor', 70, 4,false),
    hint: 'An airborne warrior, dealing death from above.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('pilot', 4),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Meteoric Impact:When an Inceptor charges into melee using his heavy jump pack, all enemies within 2m of the point where he lands must pass an Agility test (DN 2+Rank) or be knocked prone and suffer a Mortal Wound.'),
    ],
    wargearString:
      'Mark X Gravis power armour with jump pack and grav-chute, two Assault Bolters.',
    wargear: [
      { name: 'Gravis Mark X' },
      { name: 'Jump Pack' },
      { name: 'Grav-chute' },
      { name: 'Assault Bolter' },
      { name: 'Assault Bolter' },
    ],
  },
  {
    ...simpleStub('aaoa2', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Reiver', 50, 4,false),
    hint: 'A cunning warrior, spreading death and terror to the enemy.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('weaponSkill', 4),
      reqSkill('stealth', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Terror Troops', 'Enemies who encounter a Reiver must make a Fear test (DN 2+ ½ Rank).'),
    ],
    wargearString:
      'Mark X Phobos power armour, heavy bolt pistol, bolt carbine, Astartes combat knife, grav-chute, grapple gun, 3 shock grenades, 3 frag grenades, 3 krak grenades.',
    wargear: [
      { name: 'Phobos Mark X' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Bolt Carbine' },
      { name: 'Astartes Combat Knife' },
      { name: 'Grav-chute' },
      { name: 'Grapple gun' },
      { name: 'Shock Grenade', amount: 3 },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Incursor', 50, 4,false),
    hint: 'Aggressive, close-assault shock troops, wearing advanced sensors that expose enemies.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 5),
      reqAttribute('initiative', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('weaponSkill', 4),
      reqSkill('stealth', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Close Quarters Assault: When making a melee attack, or a ranged attack at short range, against an enemy in cover, an Incursor may re-roll up to Rank dice.'),
    ],
    wargearString:
      'Mark X Phobos power armour, bolt pistol, Occulus bolt carbine, Divinator-class Auspex, two Astartes combat knives (with Matched Pair upgrade), 3 smoke grenades, 3 frag grenades, 3 krak grenades.',
    wargear: [
      { name: 'Phobos Mark X' },
      { name: 'Bolt Pistol' },
      { name: 'Occulus Bolt Carbine' },
      { name: 'Divinator-class Auspex' },
      { name: 'Astartes Combat Knife', variant: 'Two Astartes combat knives (with Matched Pair upgrade)' },
      { name: 'Smoke Grenade', amount: 3 },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Infiltrator', 50, 4,false),
    hint: 'Saboteurs and marksmen, used to operating far from support',
    prerequisites: [
      reqAttribute('intellect', 4),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 4),
      reqSkill('stealth', 4),
      reqSkill('survival', 3),
      reqSkill('tech', 3),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Voxbane: When an Infiltrator makes a Tech interaction attack against enemies, the range of the attack is multiplied by 1+Rank.'),
    ],
    wargearString:
      'Mark X Phobos power armour, bolt pistol, Marksman bolt carbine, Astartes combat knife, 3 smoke grenades, 3 frag grenades, 3 krak grenades.',
    wargear: [
      { name: 'Phobos Mark X' },
      { name: 'Bolt Pistol' },
      { name: 'Marksman Bolt Carbine' },
      { name: 'Astartes Combat Knife' },
      { name: 'Smoke Grenade', amount: 3 },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 30, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Eliminator', 60, 4,false),
    hint: 'Expert snipers, laying down supporting fire from concealed positions',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 5),
      reqSkill('ballisticSkill', 4),
      reqSkill('stealth', 4),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Precision Fire: When an Eliminator aims, they may add +½ Rank additional dice to their next ranged attack, in addition to other benefits.'),
    ],
    wargearString:
      'Mark X Phobos power armour, bolt pistol, bolt sniper rifle, Astartes combat knife, camo cloak, 3 frag grenades, 3 krak grenades.',
    wargear: [
      { name: 'Phobos Mark X' },
      { name: 'Bolt Pistol' },
      { name: 'Bolt Sniper Rifle' },
      { name: 'Astartes Combat Knife' },
      { name: 'Cameo Cloak' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 30, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Aggressor', 80, 4,false),
    hint: 'A mighty warrior, overwhelming foes at close range.',
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('agility', 3),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('weaponSkill', 4),
    ],
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Fire Storm: Aggressors who sacrifice their move to Brace may double the Salvo rating of their weapons until the start of their next Turn.'),
      simpleAbility('Relentless Advance: Aggressors do not suffer any DN increase when fire an Assault weapon as part of a Run action.'),
    ],
    wargearString:
      'Mark X Gravis power armour with Fragstorm grenade launcher and ammunition backpack, two Auto Boltstorm Gauntlets.',
    wargear: [
      { name: 'Gravis Mark X' },
      { name: 'Fragstorm grenade launcher' },
      { name: 'Ammunition Backpack' },
      { name: 'Auto-Boltstorm Gauntlet', variant: 'Paried Auto Boltstorm Gauntlets' },
    ],
  },
  {
    ...simpleStub('aaoa2', 31, 'core-adeptus-astartes', 'Adeptus Astartes', 'Codicier', 60, 3, false),
    hint: 'A potent warrior-mystic, whose minds are deadly weapons.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqAttribute('willpower', 2),
      reqSkill('ballisticSkill', 2),
      reqSkill('weaponSkill', 2),
      reqSkill('scholar', 2),
      reqSkill('psychicMastery', 3),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Psyker',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite power and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specifc powers',
        description:
          '<p>A Codicier begins play with the smite psychic power and one minor psychic power.' +
          ' He may also purchase additional minor psychic powers, Universal Psychic powers, ' +
          'and either Librarius psychic powers or powers from another Astartes discipline according to their Chapter, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Librarius', // OR Chapter Specific
        ],
      },
    ],
    wargearString:
      'Aquila power armour, force sword, psychic hood, bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Force Sword' },
      { name: 'Bolt Pistol' },
      { name: 'Psychic Hood' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 31, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Codicier', 60, 4, false),
    hint: 'A potent warrior-mystic, whose minds are deadly weapons.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqAttribute('willpower', 2),
      reqSkill('ballisticSkill', 2),
      reqSkill('weaponSkill', 2),
      reqSkill('scholar', 2),
      reqSkill('psychicMastery', 3),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Psyker, Primaris',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite power and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specifc powers',
        description:
          '<p>A Codicier begins play with the smite psychic power and one minor psychic power.' +
          ' He may also purchase additional minor psychic powers, Universal Psychic powers, ' +
          'and either Librarius psychic powers or powers from another Astartes discipline according to their Chapter, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Librarius', // OR Chapter Specific
        ],
      },
    ],
    wargearString:
      'Mark X Tacticus power armour, force sword, psychic hood, heavy bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Tacticus Mk X' },
      { name: 'Force Sword' },
      { name: 'Psychic Hood' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 31, 'core-adeptus-astartes', 'Adeptus Astartes', 'Epistolary', 80, 4, false),
    hint: 'A veteran battle-psyker with greater command of his deadly mind.',
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 5),
      reqAttribute('willpower', 3),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 3),
      reqSkill('psychicMastery', 4),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Psyker',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite and Telepathy power, and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specific powers.',
        description:
          '<p>An Epistolary begins play with the smite and telepathy psychic powers and one minor psychic power. ' +
          'He may also purchase additional minor psychic powers, Universal Psychic powers, ' +
          'and either Librarius psychic powers or powers from another Astartes discipline according to their Chapter, subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerTelepathy', selected: 'Telepathy', query: { name: 'Telepathy' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Librarius', // OR Chapter Specific
        ],
      },
      simpleAbility('Potent Psyker', 'an Epistolary reduces the DN penalty caused by sustaining multiple psychic powers by Rank.'),
    ],
    wargearString:
      'Aquila power armour, force sword, psychic hood, bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Force Sword' },
      { name: 'Bolt Pistol' },
      { name: 'Psychic Hood' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 31, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Epistolary', 80, 4, false),
    hint: 'A veteran battle-psyker with greater command of his deadly mind.',
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 5),
      reqAttribute('willpower', 3),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 3),
      reqSkill('psychicMastery', 4),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Psyker, Primaris',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite and Telepathy power, and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specific powers.',
        description:
          '<p>An Epistolary begins play with the smite and telepathy psychic powers and one minor psychic power. ' +
          'He may also purchase additional minor psychic powers, Universal Psychic powers, ' +
          'and either Librarius psychic powers or powers from another Astartes discipline according to their Chapter, subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerTelepathy', selected: 'Telepathy', query: { name: 'Telepathy' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Librarius', // OR Chapter Specific
        ],
      },
      simpleAbility('Potent Psyker', 'an Epistolary reduces the DN penalty caused by sustaining multiple psychic powers by Rank.'),
    ],
    wargearString:
      'Mark X Tacticus power armour, force sword, psychic hood, heavy bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Tacticus Mk X' },
      { name: 'Force Sword' },
      { name: 'Psychic Hood' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 32, 'core-adeptus-astartes', 'Adeptus Astartes', 'Apothecary', 50, 3, false),
    hint: 'A warrior-healer, guardian of his brothers’ lives.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 2),
      reqSkill('medicae', 3),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Battlefield Medic: When an Apothecary attempts a Medicae test, they may choose to gain two of the benefits listed on page 166 of the Wrath & Glory rulebook (remove a combat effect, stabilise a dying character, heal a wounded character, heal shock) rather than one. The DN for this is equal to the highest DN for either of the options chosen, +2.'),
    ],
    wargearString:
      'Aquila power armour, bolt pistol, chainsword, 3 frag and krak grenades, Narthecium, Reductor.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Chainsword' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Narthecium' },
      { name: 'Reductor' },
    ],
  },
  {
    ...archetype('aaoa',60,'Adeptus Astartes','Primaris Apothecary',1,'Primaris Astartes'),
    ...cost(294 ,50,243, 0, 0),
    hint: 'A warrior-healer, guardian of his brothers’ lives.',
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('toughness', 5),
      reqAttribute('agility', 4),
      reqAttribute('initiative', 4),
      reqAttribute('willpower', 3),
      reqAttribute('intellect', 4),
      reqSkill('athletics', 3),
      reqSkill('awareness', 3),
      reqSkill('ballisticSkill', 4),
      reqSkill('scholar', 2),
      reqSkill('medicae', 4),
      reqSkill('stealth', 3),
      reqSkill('weaponSkill', 3),
    ],
    keywords: 'Imperium, Adeptus Astartes,[Chapter],Primaris',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Guard Thy Brethren: Whenever you succeed at a Medicae test upon a Dying ally with the ADEPTUS ASTARTES keyword, gain 1 Wrath. In addition, you gain +Rank to Resolve and Determination while you can see or hear one or more Dying Adeptus Astartes allies.'),
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Absolvor Bolt Pistol, Narthecium, Reductor, 3 Frag Grenade, 3 Krak Grenade'),
  },
  {
    ...simpleStub('aaoa2', 32, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarine', 55, 3, false),
    hint: 'A warrior-savant initiated into the mysteries of the Machine Cult.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Adeptus Mechanicus, Cult Mechanicus',
    influence: 1,
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('toughness', 4),
      reqAttribute('intellect', 3),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 1),
      reqSkill('tech', 3),
    ],
    archetypeFeatures: [
      simpleAbility('Rite of Repair: Techmarines automatically reduce the time by half for any Tech test. They receive +Rank on Tech tests to fix or repair damaged machines.'),
    ],
    wargearString:
      'Aquila power armour, bolt pistol, Omnissian Axe, 3 frag and krak grenades, augmetic servo-arm, choice of two augmetics.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Omnissian Axe' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Mechadendrites (Servo-Arm)' },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa2', 32, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Techmarine', 55, 4, false),
    hint: 'A warrior-savant initiated into the mysteries of the Machine Cult.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Adeptus Mechanicus, Cult Mechanicus, Primaris',
    influence: 1,
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('toughness', 4),
      reqAttribute('intellect', 3),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 1),
      reqSkill('tech', 3),
    ],
    archetypeFeatures: [
      simpleAbility('Rite of Repair: Techmarines automatically reduce the time by half for any Tech test. They receive +Rank on Tech tests to fix or repair damaged machines.'),
    ],
    wargearString:
      'Mark X Tacticus power armour, heavy bolt pistol, Omnissian Axe, 3 frag and krak grenades, augmetic servo-arm, choice of two augmetics.',
    wargear: [
      { name: 'Tacticus Mk X' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Omnissian Axe' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Mechadendrites (Servo-Arm)' },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    ...archetype('aaoa',106,'Adeptus Astartes','Space Marine Chaplain',4,'Adeptus Astartes'),
    ...cost(282,40,242, 0, 0),
    hint: 'A devout warrior, who tends to the spirits of his comrades.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter],Priest',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 }, // 20
      { group: 'attributes', value: 'toughness', threshold: 4 }, // 20
      { group: 'attributes', value: 'agility', threshold: 4 }, // 20
      { group: 'attributes', value: 'initiative', threshold: 4 }, // 20
      { group: 'attributes', value: 'willpower', threshold: 4 }, // 10
      { group: 'attributes', value: 'intellect', threshold: 3 }, // 10
      { group: 'attributes', value: 'fellowship', threshold: 3 }, // 10
      { group: 'skills', value: 'athletics', threshold: 3 }, // 12
      { group: 'skills', value: 'awareness', threshold: 3 }, // 12
      { group: 'skills', value: 'ballisticSkill', threshold: 3 }, // 12
      { group: 'skills', value: 'persuasion', threshold: 2 }, // 6
      { group: 'skills', value: 'scholar', threshold: 2 }, // 6
      { group: 'skills', value: 'stealth', threshold: 3 }, // 12
      { group: 'skills', value: 'weaponSkill', threshold: 3 }, // 12
    ],
    influence: 3,
    archetypeFeatures: [
      simpleAbility('Spiritual Leaders', 'You, and all allies with the IMPERIUM keyword within 15+Rank metres add +Rank to Resolve. This increases to +Double Rank if they share your [CHAPTER] keyword.'),
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Crozius Arcanum, 3 Frag Grenade, 3 Krak Grenade, Rosarius'),
  },
  {
    ...simpleStub('aaoa2', 33, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Chaplain', 60, 4,false),
    hint: 'A devout warrior, who tends to the spirits of his comrades.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Adeptus Ministorum, Priest, Primaris',
    influence: 3,
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('toughness', 5),
      reqAttribute('toughness', 5),
      reqAttribute('fellowship', 3),
      reqSkill('weaponSkill', 4),
      reqSkill('scholar', 4),
      reqSkill('intimidation', 3),
    ],
    archetypeFeatures: [
      simpleAbility('Spiritual Leaders: A Chaplain, and all allies with the Imperium keyword within 15+Rank metres, may add +Rank to their Resolve.'),
    ],
    wargearString:
      'Mark X Tacticus power armour, Absolvor bolt pistol, Crozius Arcanum, 3 frag and krak grenades, Rosarius.',
    wargear: [
      { name: 'Tacticus Mk X' },
      { name: 'Absolvor Bolt Pistol' },
      { name: 'Crozius Arcanum' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Rosarius' },
    ],
  },
  simpleStub('aaoa2',32,'core-human','Agents of the Imperium','Astropath', 60, 2),
  simpleStub('aaoa2',33,'core-human','Agents of the Imperium','Sister of Silence', 40, 3),
  simpleStub('aaoa2',33,'core-human','Agents of the Imperium','Arbitrator', 30, 3),
  simpleStub('aaoa2',34,'core-human','Agents of the Imperium','Eversor Assassin', 150, 5),
  simpleStub('aaoa2',34,'core-human','Agents of the Imperium','Callidus Assassin', 150, 5),
  {
    ...simpleStub('aaoa2', 35, 'aaoa-pariah', 'Agents of the Imperium', 'Culexus Assassin', 150, 5, false),
    hint: 'Witch-slayer, wyrd-bane, living nightmare to all psykers.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 5 },
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 5 },
      { group: 'skills', value: 'weaponSkill', threshold: 5 },
      { group: 'skills', value: 'stealth', threshold: 5 },
    ],
    keywords: 'Imperium,Officio Assassinorum,Templum Culexus',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Dodge',
        snippet: 'You my soak mortal wounds and use agility when doing so.',
        description:
          '<p>A Culexus Assassin may Soak mortal wounds and may roll Agility rather than Toughness when doing so.</p>',
      },
      {
        name: 'Life Drain',
        description:
          '<p>A character with the Psyker keyword who ends their turn within 2m of a Culexus Assassin must pass a Willpower test (DN is the Culexus Assassin’s Willpower) or suffer 1d3+2 Shock.</p>',
      },
    ],
    wargearString:
      'Etherium, Force Matrix, Animus Speculum, Psyk-Out Grenades, Bodyglove',
    wargear: [
      { name: 'Etherium' },
      { name: 'Force Matrix' },
      { name: 'Animus Speculum' },
      { name: 'Psyk-Out Grenade' },
      { name: 'Bodyglove' },
    ],
  },
  simpleStub('aaoa2', 35, 'core-human', 'Agents of the Imperium', 'Vindicare Assassin', 150, 5),
  simpleStub('aaoa2', 37, 'core-human', 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 40, 2),
  simpleStub('aaoa2', 37, 'core-human', 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 40, 2),
  simpleStub('aaoa2', 38, 'core-human', 'Adeptus Mechanicus', 'Skitarius Vanguard', 50, 2),
  simpleStub('aaoa2', 38, 'core-human', 'Adeptus Mechanicus', 'Sicarian Infiltrator', 60, 3),
  simpleStub('aaoa2', 39, 'core-human', 'Adeptus Mechanicus', 'Sicarian Ruststalker', 50, 3),
  simpleStub('aaoa2', 39, 'core-human', 'Adeptus Mechanicus', 'Lexmechanic', 30, 2),
  simpleStub('aaoa2', 40, 'core-human', 'Adeptus Mechanicus', 'Transmechanic', 30, 2),
  simpleStub('aaoa2', 41, 'core-human', 'Adeptus Mechanicus', 'Genetor', 80, 4),
  simpleStub('aaoa2', 41, 'core-human', 'Adeptus Mechanicus', 'Logis', 80, 4),
  {
    ...archetype('aaoa',96,'Adeptus Mechanicus','Magos',4,'Human'),
    ...cost(199 ,106,93, 0, 0),
    hint: 'The High-Priest of the Omnissiah.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    prerequisites: [
      reqAttribute('willpower', 4),
      reqAttribute('intellect', 5),
      reqSkill('leadership', 2),
      reqSkill('scholar', 3),
      reqSkill('tech', 4),
    ],
    influence: 4,
    archetypeFeatures: [
      simpleAbility('Forge-Lord', 'You halve the time it takes to attempt any Tech test, and you add +Double Rank bonus dice to interact with machinery. In addition, as a Simple Action you may invoke one of the Canticles of the Omnissiah (see AAOA, pg. 96).'),
      {
        name: 'Canticles of the Omnissiah',
        description:
          '<p>These binaric blessings are as much programming as exhortations to action, and they take effect automatically.</p>' +
          '<p>Invoking a Canticle requires a DN 1 Tech test, adding +1 to the DN for each affected ADEPTUS MECHANICUS character after the first. Affected characters must be within 15m of the Magos or connected by Data-Tether.</p>' +
          '<p>All references to Rank in the Canticles below refer to the Rank of the Magos invoking the Canticle. A character may only benefit from one Canticle at a time, and the effects last only until the start of the Magos’ next turn.</p>' +
          '<ul>' +
          '<li>INCANTATION OF THE IRON SOUL: Affected characters add +Rank to their Resolve</li>' +
          '<li>LITANY OF THE ELECTROMANCER: Roll 1d6 for each enemy Engaged with an affected character; on a 6, that enemy suffers 1d3 Mortal Wounds.</li>' +
          '<li>CHANT OF THE REMORSELESS FIST: Affected characters add +Rank bonus dice to melee attacks.</li>' +
          '<li>SHROUDPSALM: Affected characters add +Rank to Defence.</li>' +
          '<li>INVOCATION OF MACHINE MIGHT: Affected characters add +Rank to the damage value of their melee weapons.</li>' +
          '<li>BENEDICTION OF THE OMNISSIAH: Affected characters add +Rank bonus dice to ranged attacks.</li>' +
          '<li>ORISON OF SCRUTINY: Affected characters add +Rank bonus dice to Awareness Tests.</li>' +
          '<li>TECHNOSUPPLICATION: Affected characters add +Rank bonus dice to Tech Tests.</li>' +
          '</ul>',
      }
    ],
    wargearString: 'Omnissian Axe, augmetic servo-arm, any two augmetic enhancements, any two augmetic implants of up to Availability 7 (Unique), light power armour, and any two weapons of up to Availability 7 (Unique).',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Mechadendrites (Servo-Arm)' },
      {
        name: 'One augmetic enhancement of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Enhancements'],
          },
        ],
      },
      {
        name: 'One augmetic enhancement of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Enhancements'],
          },
        ],
      },
      {
        name: 'One augmetic implant up to value 7 of Unique or lower rarity of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Unique'],
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Implants'],
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
          },
        ],
      },
      {
        name: 'One augmetic implant up to value 7 of Unique or lower rarity of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Unique'],
            typeFilter: ['Augmetics'],
            subtypeFilter: ['Augmetic Implants'],
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
          },
        ],
      },
      {
        name: 'One unique weapon up to value 7 of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Melee Weapon','Ranged Weapon'],
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
          },
        ],
      },
      {
        name: 'One unique weapon up to value 7 of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Melee Weapon','Ranged Weapon'],
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
          },
        ],
      },
      { name: 'Light Power Armour' },
    ],
  },
  {
    ...simpleStub('aaoa2', 44, 'core-adeptus-astartes', 'Renegades', 'Chaos Space Marine', 50, 3, false),
    hint: 'Monstrous traitors and savage posthuman killers',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Masters of Slaughter: The cruelty and malice of a Chaos Space Marine knows no limit, and few can endure their wrath. When making a critical hit, they count as improving the severity of the critical hit as if they had spent one Glory. They may still spend additional Glory to increase the severity further.'),
    ],
    wargearString:
      'Aquila power armour, boltgun or chainsword, bolt pistol, Astartes combat knife, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      {
        name: 'Boltgun or Chainsword',
        options: [
          { name: 'Boltgun' },
          { name: 'Chainsword' },
        ]
      },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 44, 'core-adeptus-astartes', 'Renegades', 'Chaos Space Marine Raptor', 60, 3, false),
    hint: 'Cruel hunters who descent upon shrieking wings of fire',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('weaponSkill', 4),
      reqSkill('pilot', 3),
      reqSkill('intimidation', 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Cruel Hunters: Enemies within 15m of a Chaos Space Marine Raptor add +½ Rank to the DN of any Resolve tests they are required to make.'),
    ],
    wargearString:
      'Aquila power armour, bolt pistol, chainsword, 3 frag and krak grenades, jump pack.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Jump Pack' },
      { name: 'Chainsword' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 45, 'core-adeptus-astartes', 'Renegades', 'Chaos Space Marine Havoc', 60, 3, false),
    hint: 'Heavy weapon specialists who revel in endless destruction',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('ballisticSkill', 4),
      reqSkill('tech', 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Addicted to Destruction: When a Chaos Space Marine Havoc rolls a 6 on their Wrath die when making a ranged attack, they may forego their critical hit and spend a reload in order to make a second ranged attack with that weapon. This second attack may not allow them to make any additional attacks.'),
    ],
    wargearString:
      'Aquila power armour, bolt pistol, 3 frag and krak grenades, and one of the following weapons: autocannon, flamer, heavy bolter, missile launcher with 6 frag and 6 krak missiles, lascannon, melta gun, or plasma gun.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      {
        name: 'Krak Grenade',
        options: [
          { name: 'autocannon' },
          { name: 'flamer' },
          { name: 'heavy bolter' },
          { name: 'missile launcher' },
          { name: 'lascannon' },
          { name: 'melta gun' },
          { name: 'plasma gun' },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa2', 43, 'core-adeptus-astartes', 'Renegades', 'Khorne Berzerker', 80, 3, false),
    hint: 'Frenzied, bloodthirsty killers who have devoted themselves to the Blood God',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqSkill('weaponSkill', 5),
    ],
    keywords: 'Heretic, Chaos, Khorne, Heretic Astartes, <Legion>',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Blood for the Blood God!: When a Khorne Berzerker makes an All-Out Attack, they may choose up to ½ Rank dice in their dice pool to be Wrath dice, in addition to the normal Wrath die. If any of these Wrath dice are 6s, then the character scores a critical hit. They gain one level of extra severity on that critical hit, as if a Glory had been spent, for every Wrath die after the first which rolls a 6.'),
    ],
    wargearString:
      'Aquila power armour, chainsword or chain axe, bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      {
        name: 'Chainsword or chain axe',
        options: [
          { name: 'Chainsword' },
          { name: 'chain axe' },
        ],
      },
      { name: 'Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 46, 'core-adeptus-astartes', 'Renegades', 'Nurgle Plague Marine', 70, 3),
    hint: 'Nigh-unstoppable foot-soldiers of the God of Disease',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 3),
      reqAttribute('toughness', 5),
      reqSkill('ballisticSkill', 4),
    ],
    keywords: 'Heretic, Chaos, Nurgle, Heretic Astartes, <Legion>',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
      { targetGroup: 'traits', targetValue: 'speed', modification: -1 },
    ],
    archetypeFeatures: [
      simpleAbility('Disgustingly Resilient: Plague Marines are extraordinarily durable, as they feel no pain and they draw their nauseating vitality from their patron god. A Plague Marine may Soak mortal wounds and does not cost them any Shock.'),
      {
        name: 'Bulky and Bloated',
        snippet: 'Your speed is decreased by 1.',
        description: '<p>Plague Marines reduce their Speed by 1.</p>',
      }
    ],
    wargearString:
      'Aquila power armour, bolt gun, plague knife, 3 blight grenades and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Gun' },
      { name: 'Plague Knife' },
      { name: 'Blight Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 46, 'core-adeptus-astartes', 'Renegades', 'Slaanesh Noise Marine', 60, 3),
    hint: 'Sensation-addicted warriors of the Prince of Pleasure, armed with sonic weaponry',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 5),
      reqAttribute('intellect', 3),
      reqSkill('ballisticSkill', 4),
      reqSkill('awareness', 4),
    ],
    keywords: 'Heretic, Chaos, Slaanesh, Heretic Astartes, <Legion>',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Cacophony and Ecstasy: Noise Marines gain +Rank on all skill tests that relate specifically to hearing, and can pick out sounds, and variations in sounds that a normal human cannot. Further, a Noise Marine heals ½ Rank shock at the end of every turn, as they revel in the sensations of battle. However, a Noise Marine who is reduced to 0 Shock is staggered as well as exhausted, as they are overcome by sensation.'),
    ],
    wargearString:
      'Aquila power armour, bolt gun or sonic blaster, Astartes combat knife, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      {
        name: 'bolt gun or sonic blaster',
        options: [
          { name: 'Bolt Gun' },
          { name: 'Sonic Blaster' },
        ],
      },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 47, 'core-adeptus-astartes', 'Renegades', 'Chaos Sorcerer', 60, 3),
    hint: 'Warrior-mystics who have dabbled in the blasphemous powers of the Warp',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('agility', 4),
      reqAttribute('toughness', 4),
      reqAttribute('willpower', 2),
      reqSkill('ballisticSkill', 2),
      reqSkill('weaponSkill', 2),
      reqSkill('scholar', 2),
      reqSkill('psychicMastery', 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>, Psyker',
    influence: 3,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You learn the Smite power and one additional minor power. You gain access to Minor and Universal powers. You also gain access to either Librarius or Chapter specifc powers',
        description:
          '<p>A Sorcerer begins play with the smite psychic power and one minor psychic power. ' +
          'He may also purchase additional minor psychic powers and Universal Psychic powers, ' +
          'Maleficarum Psychic Powers, or Dark Hereticus discipline, subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Maleficarum',
          'Dark Hereticus', // AAOA Spells
        ],
      },
      simpleAbility('Hatred of Khorne', 'Sorcerers may never choose the Khorne keyword.'),
    ],
    wargearString:
      'Aquila power armour, force sword, bolt pistol, 3 frag and 3 krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Force Sword' },
      { name: 'Bolt Pistol' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('aaoa2', 46, 'core-adeptus-astartes', 'Renegades', 'Warpsmith', 55, 3, false),
    hint: 'An artisan who blends warpcraft and engineering to create daemonic machines of war.',
    prerequisites: [
      reqAttribute('strength', 4),
      reqAttribute('toughness', 4),
      reqAttribute('intellect', 3),
      reqSkill('ballisticSkill', 3),
      reqSkill('weaponSkill', 3),
      reqSkill('scholar', 1),
      reqSkill('tech', 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>, Dark Mechanicus',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Master of Mechanisms: Warpsmiths automatically reduce the time by half for any Tech test. They receive +Rank on any test to summon or bind a daemon into a machine, or to command a daemonic machine.'),
    ],
    wargearString:
      'Fleshmetal armour, bolt pistol, power axe, 3 frag and krak grenades, augmetic servo-arm, choice of two augmetics',
    wargear: [
      { name: 'Fleshmeta Armor' },
      { name: 'Bolt Pistol' },
      { name: 'Power Axe' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Mechadendrites (Servo-Arm)' },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetics of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            subtypeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa2', 46, 'core-adeptus-astartes', 'Renegades', 'Dark Apostle', 60, 4, false),
    hint: 'A furious zealot-priest, speaking blasphemous prayers from blood-flecked lips.',
    prerequisites: [
      reqAttribute('strength', 5),
      reqAttribute('agility', 5),
      reqAttribute('toughness', 5),
      reqAttribute('fellowship', 3),
      reqSkill('weaponSkill', 4),
      reqSkill('scholar', 4),
      reqSkill('intimidation', 4),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, <Legion>, Priest',
    influence: 3,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Demagogue: A Chaplain, and all allies with the Chaos keyword within 15+Rank metres, may add +Rank to their Resolve.'),
    ],
    wargearString:
      'Aquila power armour, bolt pistol, Accursed Crozius (Crozius Arcanum), 3 frag and krak grenades, Sigil of Corruption.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Crozius Arcanum', variant: 'Accused Crozium' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Sigil of Corruption' },
    ],
  },
  {
    ...simpleStub('aaoa2', 48, 'aaoa-beastman', 'Renegades', 'Khorngor', 20, 1, false),
    hint: 'Savage beastmen, driven to a berserk rage by the scent of blood.',
    prerequisites: [
      reqAttribute('strength', 3),
      reqAttribute('agility', 3),
      reqSkill('weaponSkill', 2),
    ],
    keywords: 'Heretic, Chaos, Khorne',
    influence: 0,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('The Scent of Blood: After an enemy has been killed in a scene, a Khorngor becomes frenzied, and must make WP tests to restrain themselves. While frenzied, however, they add +½ Rank ED to all melee damage rolls they make.'),
    ],
    wargearString:
      'Two axes, or chainaxe and Autopistol, flak armour',
    wargear: [
      { name: 'Flak Armour' },
      {
        name: 'Two axes, or chainaxe and Autopistol, flak armour',
        options: [
          { name: 'Axe', amount: 2 },
          { name: 'Chain Axe and Autopistol' },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa2', 49, 'aaoa-beastman', 'Renegades', 'Pestigor', 20, 1, false),
    hint: 'Monstrous beastmen, uncaring to pain or fear.',
    prerequisites: [
      reqAttribute('agility', 3),
      reqSkill('weaponSkill', 2),
      reqSkill('intimidation', 1),
    ],
    keywords: 'Heretic, Chaos, Nurgle',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Inured to Suffering: Pestigor know no pain or fear, and little can dissuade them from their task. They increase both their Resolve and their Soak by +½ Rank.'),
    ],
    wargearString:
      'Autogun, plague knife, flak armour',
    wargear: [
      { name: 'Flak Armour' },
      { name: 'Autogun' },
      { name: 'Plague Knife' },
    ],
  },
  {
    ...simpleStub('aaoa2', 49, 'aaoa-beastman', 'Renegades', 'Slaangor', 20, 1,false),
    hint: 'Beastmen who glory in the name of the Prince of Pleasure',
    prerequisites: [
      reqAttribute('agility', 3),
      reqSkill('weaponSkill', 2),
      reqSkill('persuasion', 1),
    ],
    keywords: 'Heretic, Chaos, Slaanesh',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Distracting Musk: Slaangor exude a faintly soporific musk that disrupts the concentration of any who stray too close. Characters within 5m of a Slaangor increase the DN of all Willpower and Resolve tests by ½ Rank. This does not affect characters with the Slaanesh keyword, who’ve already built up a resistance to it.'),
    ],
    wargearString:
      'Two swords, mesh armour.',
    wargear: [
      { name: 'Mesh Armour' },
      { name: 'Sword' },
      { name: 'Sword' },
    ],
  },
  {
    ...simpleStub('aaoa2', 50, 'aaoa-beastman', 'Renegades', 'Tzaangor', 20, 1,false),
    hint: 'Twisted, cunning Beastmen who serve sorcerous masters',
    prerequisites: [
      reqAttribute('intellect', 3),
      reqSkill('weaponSkill', 2),
      reqSkill('scholar', 1),
    ],
    keywords: 'Heretic, Chaos, Tzeentch',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
    ],
    archetypeFeatures: [
      simpleAbility('Aura of Change: Tzaangor are wreathed in an aura of warp energy and twisted probabilities, which shields them from harm. A Tzaangor may Soak Mortal Wounds and increases their Resilience by +½ Rank. This increase to their Resilience is considered to be a force field, and thus cannot be reduced by an attack’s AP.'),
    ],
    wargearString:
      'Two swords, or chainsword and autopistol.',
    wargear: [
      {
        name: 'Two swords, or chainsword and autopistol.',
        options: [
          { name: 'Sword', amount: 2 },
          { name: 'Chainsword and Autopistl' },
        ],
      },
    ],
  },
];

const ltgbRep = [
  simpleStub('ltgb', '9', 'core-human', 'Renegades', 'Apostate', 0, 1),
  simpleStub('ltgb', '10', 'core-human', 'Renegades', 'Cultist', 0, 1),
  simpleStub('ltgb', '11', 'core-human', 'Renegades', 'Renegade', 0, 1),
  simpleStub('ltgb', '11', 'core-human', 'Renegades', 'Heretek', 60, 2),
  simpleStub('ltgb', '12', 'core-human', 'Renegades', 'Rogue Psyker', 50, 2),
  simpleStub('ltgb', '13', 'core-human', 'Renegades', 'Pirate', 40, 2),
  simpleStub('ltgb', '13', 'core-adeptus-astartes', 'Renegades', 'Legionnaire', 50, 3),
  simpleStub('ltgb', '14', 'core-adeptus-astartes', 'Renegades', 'Havoc', 60, 3),
  simpleStub('ltgb', '15', 'core-adeptus-astartes', 'Renegades', 'Raptor', 55, 3),
  simpleStub('ltgb', '15', 'core-adeptus-astartes', 'Renegades', 'Warpsmith', 85, 3),
  simpleStub('ltgb', '16', 'core-adeptus-astartes', 'Renegades', 'Sorcerer', 80, 3),
  simpleStub('ltgb', '17', 'core-adeptus-astartes', 'Renegades', 'Noise Marine', 55, 3),
  simpleStub('ltgb', '17', 'core-adeptus-astartes', 'Renegades', 'Plague Marine', 60, 3),
  simpleStub('ltgb', '18', 'core-adeptus-astartes', 'Renegades', 'Khorne Berzerker', 60, 3),
  simpleStub('ltgb', '19', 'core-adeptus-astartes', 'Renegades', 'Dark Apostle', 80, 4),
];

const teaRep = [
  {
    ...simpleStub('tea', 22, 'core-adeptus-astartes', 'Adeptus Astartes', 'Devastator Space Marine', 60, 3, false),
    hint: 'Devastate the wast masses of enemies with your focus fire.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Focus Fire',
        snippet: 'Devastator Marines are known for their ability to lay down waves of suppressive fire, cutting down any enemy foolish enough to approach them. They add +Rank bonus dice to hit with weapons with the Heavy trait, but only if they did not move that turn.',
      },
    ],
    wargearString:
      'Aquila power armor, heavy bolter with ammunition backpack, bolt pistol, Astartes combat knife, 3 frag and krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Heavy Bolter' },
      { name: 'Ammunition Backpack' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('tea', 23, 'core-adeptus-astartes', 'Adeptus Astartes', 'Assault Space Marine', 55, 3, false),
    hint: 'Decent like a meteor into the enemy lines.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
    ],
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Meteoric Descent',
        snippet: 'An Assault Marine uses his jump pack to its fullest potential, using his momentum as a weapon. After charging while equipped with a jump pack, an Assault Marine may add +Rank ED to any melee attacks he makes that round.',
      },
    ],
    wargearString:
      'Aquila power armor, Chainsword, bolt pistol, jump pack, 3 frag and krak grenades.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Chainsword' },
      { name: 'Bolt Pistol' },
      { name: 'Jump Pack' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  simpleStub('tea', 23, 'core-adeptus-astartes', 'Adeptus Astartes', 'Tactical Marine', 50, 3),
  {
    ...simpleStub('tea', 24, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarine', 85, 3, false),
    hint: 'Support the Chapter with your craftsmanship and technical knock.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 4 },
      { group: 'skills', value: 'pilot', threshold: 3 },
    ],
    keywords: 'Imperium,Adeptus Astartes,Adeptus Mechanicus,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Master of the Forge',
        snippet: 'A Techmarine gains +Rank to all Scholar, Pilot and Tech tests involving vehicles, weapons, armor, and wargear with the Adeptus Astartes keyword and +½ Rank to all other Imperium items.',
      },
    ],
    wargearString:
      'Aquila power armor, bolt pistol or boltgun, Omnissian Axe, 3 frag and krak grenades, augmetic Servo Arm.',
    wargear: [
      { name: 'Aquila Mk VII' },
      {
        name: 'Bolt Pistol or Boltgun',
        options: [
          { name: 'Bolt Pistol' },
          { name: 'Boltgun' },
        ],
      },
      { name: 'Omnissian Axe' },
      { name: 'Mechadendrites (Servo-Arm)' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('tea', 25, 'core-adeptus-astartes', 'Adeptus Astartes', 'Apothecary', 70, 3, false),
    hint: 'Rescue the dying from their well earned retirement.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
      { group: 'skills', value: 'medicae', threshold: 4 },
      { group: 'skills', value: 'scholar', threshold: 3 },
    ],
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Prime Helix',
        snippet: 'An Apothecary adds +½ Rank to the number of wounds he heals when performing first aid. He gains +Rank bonus dice to all Scholar and Medicae tests he makes regarding Adeptus Astartes or Primaris Astartes. An Apothecary will never willingly leave recoverable gene-seed behind, and is duty-bound to recover any that can be.',
      },
    ],
    wargearString:
      'Aquila power armor with Diagnostor helmet, bolt pistol, boltgun or Chainsword, 3 frag and krak grenades, narthecium, reductor',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Diagnostor Helmet' },
      { name: 'Bolt Pistol' },
      {
        name: 'Boltgun or Chainsword',
        options: [
          { name: 'Boltgun' },
          { name: 'Chainsword' },
        ],
      },
      { name: 'Narthecium' },
      { name: 'Reductor' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  {
    ...simpleStub('tea', 25, 'core-adeptus-astartes', 'Adeptus Astartes', 'Librarian', 80, 3, false),
    hint: 'Harness the universal and librarius powers of the warp.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
      { group: 'skills', value: 'psychicMastery', threshold: 4 },
      { group: 'skills', value: 'scholar', threshold: 4 },
    ],
    keywords: 'Imperium,Adeptus Astartes,Psyker,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You gain the Smite Power and one Minor or Librarius Power. You gain access To Minor, Universal and Librarius powers.',
        description:
          '<p>A Librarian begins play with one minor or Librarius psychic power and the smite psychic power. ' +
          'They may purchase additional Minor psychic powers, Librarius psychic powers, and powers from up to one other discipline, ' +
          'subject to Tier restrictions.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinorOrLibrarius', selected: '', query: { discipline: 'Minor,Librarius' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Biomancy',
          'Divination',
          'Pyromancy',
          'Telekinesis',
          'Telepathy',
          'Universal',
          'Librarius',
        ],
      },
      {
        name: 'Abandon the Witch',
        snippet: 'Marines from the Black Templars Chapter may not choose this Archetype.',
      },
    ],
    wargearString:
      'Aquila power armor with psychic hood, bolt pistol, force sword or force staff, 3 frag and krak Grenade',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Psychic Hood' },
      { name: 'Bolt Pistol' },
      {
        name: 'force sword or force staff',
        options: [
          { name: 'Force Sword' },
          { name: 'Force Staff' },
        ],
      },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
    ],
  },
  simpleStub('tea', 26, 'core-adeptus-astartes', 'Adeptus Astartes', 'Chaplain', 85, 4),
  simpleStub('tea', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Intercessor', 60, 4),
  simpleStub('tea', 27, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Hellblaster', 75, 4),
  simpleStub('tea', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Reiver', 60, 4),
  simpleStub('tea', 28, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Inceptor', 80, 4),
  simpleStub('tea', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Aggressor', 80, 4),
  simpleStub('tea', 29, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Apothecary', 80, 4),
  simpleStub('tea', 30, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Librarian', 90, 4),
  simpleStub('tea', 31, 'core-primaris-astartes', 'Adeptus Astartes', 'Primaris Chaplain', 95, 5),
];

const hevaRep = [
  simpleStub('heva', 9, 'heva-dark-eldar', 'Aeldari', 'Kabalite', 0, 1),
  simpleStub('heva', 10, 'heva-dark-eldar', 'Aeldari', 'Wych', 30, 2),
  simpleStub('heva', 11, 'heva-dark-eldar', 'Aeldari', 'Scourge', 60, 3),
  simpleStub('heva', 12, 'heva-dark-eldar', 'Aeldari', 'Incubus', 70, 4),
];

const goenRep = [
  simpleStub('goen', 6, 'core-human', 'Adeptus Titanicus', 'Moderati', 40, 2),
  simpleStub('goen', 7, 'core-human', 'Adeptus Titanicus', 'Princeps', 70, 3),
  simpleStub('goen', 8, 'core-human', 'Adeptus Titanicus', 'Legate', 80, 4),
];

const togRep = [
  simpleStub('tog', 6, 'core-human', 'Renegades', 'Raider', 30, 2),
  simpleStub('tog', 6, 'core-human', 'Renegades', 'Champion', 50, 3),
  simpleStub('tog', 7, 'core-human', 'Renegades', 'Apostate', 50, 3),
  simpleStub('tog', 8, 'core-adeptus-astartes', 'Renegades', 'Plague Marine', 60, 3),
  simpleStub('tog', 8, 'core-adeptus-astartes', 'Renegades', 'Khorne Berserker', 60, 3),
  simpleStub('tog', 9, 'core-adeptus-astartes', 'Renegades', 'Chaos Sorcerer', 70, 3),
  simpleStub('tog', 9, 'core-adeptus-astartes', 'Renegades', 'Noise Marine', 60, 3),
];

const lotnRep = [
  {
    ...simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Immortal', 60, 3, false),
    hint: 'Formerly members of the Necrontyr’s professional military, the Immortals were known for their peerless skill and resolve.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Undying Warrior',
        snippet: 'An Immortal reduces the amount of shock it loses when soaking wounds by ½ Rank.',
      },
    ],
    wargearString:
      'Heavy plating, Gauss blaster or Tesla carbine',
    wargear: [
      { name: 'Heavy plating' },
      {
        name: 'Gauss blaster or Tesla carbine',
        options: [
          { name: 'Gauss blaster' },
          { name: 'Tesla carbine' },
        ],
      },
    ],
  },
  {
    ...simpleStub('lotn', 5, 'lotn-necron', 'Necrons', 'Deathmark', 65, 3, false),
    hint: 'Assassins without peer, the Deathmarks are highly accurate and well-trained soldiers',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'stealth', threshold: 4 },
      { group: 'skills', value: 'awareness', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hunter’s Mark',
        description:
          'A Deathmark may declare a single elite or adversary-level threat as its  “mark” as a free action. ' +
          'Once a target has been marked in such a way, ' +
          'the Deathmark will know the marked target’s exact geographic location relative to the Deathmark, ' +
          'as well as his status as alive or dead. ' +
          'This does not give the Deathmark information about the surroundings of the target, ' +
          'only its relative location. It may use this ability ½ Rank times per day.',
      },
    ],
    wargearString:
      'Heavy plating, Synaptic Disintegrator, Dimensional Oubliette generator',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Synaptic Disintegrator' },
      { name: 'Dimensional Oubliette generator' },
    ],
  },
  {
    ...simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Destroyer', 85, 3, false),
    hint: 'Awoken with their minds decayed and damaged.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hardwired Hatred',
        snippet: 'You add +½ Rank bonus dice to Attack Tests against organic targets. You suffer +2 DN to Social Tests with non-Destroyer Necrons.',
        description:
          '<p>A Destroyer gains +½ Rank to Attack tests against organic targets, ' +
          'but suffers a +2DN penalty to social tests with non-Destroyer Necrons.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Gauss Cannon, Grav-platform',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Gauss Cannon' },
      { name: 'Grav-platform' },
    ],
  },
  {
    ...simpleStub('lotn', 6, 'lotn-necron', 'Necrons', 'Lychguard', 70, 4, false),
    hint: 'The Royal Guard of the Necron Dynasties.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 5 },
      { group: 'skills', value: 'awareness', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Guardian Protocols',
        description:
          '<p>The Lychguard may designate another &lt;Dynasty&gt; Necron as its Charge as a free action. ' +
          'If the Lychguard is within 6m of its charge, it may make a DN 3 Agility test when the Charge is attacked or ' +
          'would otherwise take damage from an outside source. If it succeeds on this test, the ' +
          'Lychguard takes the place of its Charge as the target of the attack or effect. ' +
          'If the effect would harm both the Lychguard and its charge, such as a weapon with the Blast trait, ' +
          'the Lychguard takes the damage for both itself and its charge separately. ' +
          'If the Lychguard loses wounds by taking damage for its charge, reduce any wounds lost by the Lychguard by ½ Rank.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Warscythe, Dynastic Crest (symbol of authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Warscythe' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
    ],
  },
  {
    ...simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Triarch Praetorian', 70, 4, false),
    hint: 'The law enforcing arm of the old triarch.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'scholar', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
    ],
    keywords: 'Necron, Triarch',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Codes of Combat',
        description:
          '<p>A Triarch gains +Rank bonus dice to all Scholar tests to decide matters of Necrontyr law. ' +
          'A Praetorian may make choose a single non-Necron elite or adversary-tier threat and make a DN 4 Scholar test as an action. ' +
          'If successful, the Triarch may declare that threat Honorable or Dishonorable. ' +
          'If it is Honorable, all Necrons within 12m gain +½ Rank to Weapon Skill tests against that threat. ' +
          'If it is Dishonorable, all Necrons within 12m gain +½ Rank to Ballistic Skill tests against that target, ' +
          'and certain tactics and cruelties may be permissible to use against it.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Rod of Covenant, Crest of the Triarch (Symbol of Authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Rod of Covenant' },
      { name: 'symbol of authority', variant: 'Crest of the Triarch' },
    ],
  },
  {
    ...simpleStub('lotn', 7, 'lotn-necron', 'Necrons', 'Lord', 80, 4, false),
    hint: 'The least of the many nobles that make up a Necron Dynasty.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'The Lord`s will',
        description:
          '<p>A Lord may make a DN 4 Leadership test and designate a specific threat as a free ' +
          'action at the beginning of each of its turns. If it is successful, ' +
          'all other <Dynasty> Necrons within 12m that are not Lords or Overlords may reroll ' +
          'up to Rank failed ED on damage rolls against that threat.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority)',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Staff of Light' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
    ],
  },
  {
    ...simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Cryptek', 75, 4, false),
    hint: 'Techno-Wizards that dedicated their lives to understanding and working with the many Necron technologies.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'tech', threshold: 5 },
      { group: 'skills', value: 'scholar', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Technomancer',
        description:
          '<p>A Cryptek gains +½ Rank to Tech tests when working on any item with the Necron keyword. All Necrons within 6m of a Cryptek gain +1 to Defiance tests.</p>',
      },
    ],
    wargearString:
      'Staff of Light',
    wargear: [
      { name: 'Staff of Light' },
    ],
  },
  {
    ...simpleStub('lotn', 8, 'lotn-necron', 'Necrons', 'Destroyer Lord', 95, 5, false),
    hint: 'Of those that fall victim to the path of the Destroyer, few are seemingly as insane as the Destroyer Lords.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 6 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 5 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'weaponSkill', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 5 },
      { group: 'skills', value: 'persuasion', threshold: 4 },
    ],
    keywords: 'Necron,<Dynasty>',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'United Hatred',
        description:
          '<p>A Destroyer Lord may issue orders to Destroyers. The Destroyer Lord and all Destroyers within 12m may reroll up to ½ Rank ED on damage rolls when attacking organic targets.</p>',
      },
    ],
    wargearString:
      'Heavy plating, Staff of Light, Dynastic Crest (symbol of authority), Phase Shifter, Grav-Platform',
    wargear: [
      { name: 'Heavy plating' },
      { name: 'Staff of light' },
      { name: 'symbol of authority', variant: 'Dynastic Crest' },
      { name: 'Phase Shifter' },
      { name: 'Grav-platform' },
    ],
  },
];

const paxRep = [
  simpleStub('pax', '-', 'core/Human', 'Adeptus Administratum', 'Scribe', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Ordinate', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Sage', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Administratum', 'Prefect', 40, 4),
  {
    ...simpleStub('pax', 37, 'core-human', 'Adeptus Arbites', 'Arbitrator', 10, 1, false),
    hint: 'A guardian of imperial law, ruthless and implacable.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'The Face of the Law',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. Add +Rank to Intimidation tests against any with the <Imperium> keywords.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'bolt pistol or riot shield, ' +
      'shock maul, ' +
      'book of law, ' +
      'manacles, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec.',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'bolt pistol or riot shield',
        options: [
          { name: 'Bolt Pistol' },
          { name: 'Riot Shield' },
        ],
      },
      { name: 'Shock Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 38, 'core-human', 'Adeptus Arbites', 'Proctor', 30, 1, false),
    hint: 'An unrelenting warrior, adept at tracking down the most recalcitrant recidivist.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Imperial Authority',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +½ Rank to Resolve and Corruption Tests, and add +Rank to Intimidation tests against any with the <Imperium> keyword.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'combat shotgun or boltgun or riot shield, ' +
      'power maul, ' +
      'book of law, ' +
      'manacles, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'combat shotgun or boltgun or riot shield',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Boltgun' },
          { name: 'Riot Shield' },
        ],
      },
      { name: 'Power Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 38, 'core-human', 'Adeptus Arbites', 'Mortiurge', 50, 3, false),
    hint: 'Little more than judicially recognized assassins',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'investigation', threshold: 3 },
      { group: 'skills', value: 'survival', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 2 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Last Killer Standing',
        snippet: 'Veteran of a hundred gun battles, summary executions and black operations, a Mortiurge has learned to stay alive regardless of the odds when the bullets and las-bolts fly by, using them environment to their best advantage. They are immune to pinning from personal small arms excluding weapons with the Heavy (x) trait. Additionally, they add +1 to the defensive value of any cover except when ambushed in combat.',
      },
    ],
    wargearString:
      'Bolt pistol or needle pistol, ' +
      'sniper rifle or needle rifle, ' +
      'arbites carapace armor, ' +
      'arbitrator ID (Symbol of Authority), ' +
      'abridged copy of the Lex Imperialis.',
    wargear: [
      {
        name: 'Bolt pistol or needle pistol',
        options: [
          { name: 'Bolt Pistol' },
          { name: 'Needle Pistol' },
        ],
      },
      {
        name: 'Sniper Rifle or Needle Rifle',
        options: [
          { name: 'Sniper Rifle' },
          { name: 'Needle Rifle' },
        ],
      },
      { name: 'Arbites Carapace Armour' },
      { name: 'Symbol of Authority', variant: 'Arbitrator ID' },
      { name: 'abridged copy of the Lex Imperialis' },
    ],
  },
  {
    ...simpleStub('pax', 39, 'core-human', 'Adeptus Arbites', 'Marshal', 60, 3, false),
    hint: 'A fearsome commander, championing the righteous Imperial law.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 4 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'The Thin Black Line',
        snippet: 'The character is an embodiment of the Lex Imperialis itself, bringing fear and terror to those bound by its laws. They gain +½ Rank to Corruption Tests and add +Rank to Intimidation and Resolve tests against any with the <Imperium> keywords.',
      },
      {
        name: 'Psi-Marshal',
        snippet: 'Arbites Psi-Marshals are rare solitary figures, held at bay by their own men as much as the citizenry. Each precinct-house will have a single Psi-Marshal assigned under ideal conditions to lend their unique talents to the Arbites law-enforcement efforts. Adeptus Arbites Marshals who ascend with the Psychic Revelations package gain access to the Judicium psychic discipline.',
      },
    ],
    wargearString:
      'Carapace armor, ' +
      'combat shotgun or bolt pistol, ' +
      'power maul, ' +
      'book of law, ' +
      'manacles, ' +
      'cyber-mastiff, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec',
    wargear: [
      { name: 'Carapace Armour' },
      {
        name: 'combat shotgun or Bolt Pistol',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Bolt Pistol' },
        ],
      },
      { name: 'Power Maul' },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      { name: 'Cyber-mastiff' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', 40, 'core-human', 'Adeptus Arbites', 'Judge', 80, 4,false),
    hint: 'A lord of justice, inspiring both dread and respect in great measure.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 5 },
      { group: 'attributes', value: 'initiative', threshold: 2 },
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 5 },
    ],
    keywords: 'Imperium,Adeptus Arbites,<Predict>,Military',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Hammer of Heretics',
        snippet: 'The character is the very embodiment of imperial law and retribution, striking fear to recidivists and heretics alike.. Add +Rank to Intimidation, Resolve, and Corruption tests against any with the <Imperium> and <Chaos> keywords.',
      },
    ],
    wargearString:
      'Judge carapace armor, ' +
      'combat shotgun or bolt gun, ' +
      'bolt pistol, ' +
      'power maul or shock maul, ' +
      'book of law, ' +
      'manacles, ' +
      'cyber-mastiff, ' +
      'grapplehawk or patrol bike, ' +
      'arbitrator ID, ' +
      'chrono, ' +
      'pack of lho-sticks or flask of amasec.',
    wargear: [
      { name: 'Judge Carapace Armour' },
      {
        name: 'combat shotgun or Boltgun',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Boltgun' },
        ],
      },
      {
        name: 'Power Maul or Shock Maul',
        options: [
          { name: 'Power Mail' },
          { name: 'Shock Maul' },
        ],
      },
      { name: 'Book of Law' },
      { name: 'Manacles' },
      {
        name: 'Grapplehawk or Patrol Bike',
        options: [
          { name: 'Grapplehawk' },
          { name: 'Ptarol Bike' },
        ]
      },
      { name: 'Cyber-mastiff' },
      { name: 'Arbitrator ID' },
      { name: 'Chrono' },
      {
        name: 'pack of lho-sticks or flask of amasec',
        options: [
          { name: 'Pack of loh-sticks' },
          { name: 'flask of amasec' },
        ],
      },
    ],
  },
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Cleric', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Confessor', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Deacon', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Preacher', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Banisher', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Exorcist', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Missionary', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Saint', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Cardinal', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Crusader', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Adeptus Ministorum', 'Heirophant', 50, 4),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropathicus Envoy', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Black Sentinel', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropath', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Choirmaster', 60, 3),
  simpleStub('pax', '-', 'core-human', 'Astrophathicus Choirs', 'Astropath Transcendent', 70, 4),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Acquisitionist', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Guilder', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Chartist Captain', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Executioner', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Seneschal', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Servo-Master', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Tech-Thrall', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Commercia Imperialis', 'Merchant Magnate', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Noble Scion', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Politico', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Noble Lord', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Highborn', 'Sprye Hunter', 60, 3),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Blooodsworn', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Bounty Hunter', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Freelancer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Oathsworn Bodyguard', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Veteran Guardsman', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'Arch-Militant', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Hired Guns', 'ArchGunslinger', 30, 3),
  {
    ...simpleStub('pax',116, 'core-human', 'Hive Ganger', 'Juve', 0, 1, false),
    hint: 'An inexperienced youth, eager for chance to prove themselves.',
    prerequisites: [],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: -1,
    archetypeFeatures: [
      {
        name: 'Eager to kill',
        snippet: 'Once per combat, a Juve can add +Rank to a single Action. They also gain a +½ Rank bonus to Resolve tests in combat.',
      },
    ],
    wargearString:
      'Hive leathers or outlandish attire, ' +
      'stubber, ' +
      'knife or brass knuckles, ' +
      '3 doses of narcotics or graphic memento, ' +
      'lho-sticks, ' +
      'gang trappings.',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      { name: 'Stubber' },
      {
        name: 'knife or brass knuckles',
        options: [
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: '3 doses of narcotics or graphic memento',
        options: [
          { name: 'doses of narcotics', amount: 3 },
          { name: 'graphic memento' },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 117, 'core-human', 'Hive Ganger', 'Ganger', 10, 1, false),
    hint: 'Competent and trusted fighters, accustomed to brutality and violence.',
    prerequisites: [
      { group: 'skills', value: 'cunning', threshold: 1 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (3).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hab-wise',
        snippet: 'Gangers are accustomed to the deadly environs of the underhives. They gain +Rank to Cunning and Insight tests when interacting with underworld or similar characters.',
      },
    ],
    wargearString:
      'Hive leathers or outlandish attire, ' +
      'stubber, autogun or combat shotgun, ' +
      'knife or brass knuckles, ' +
      'flask of amasec or 3 doses of narcotics, ' +
      'lho-sticks, ' +
      'charm (graphic memento), ' +
      'gang trappings',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'stubber, autogun or combat shotgun',
        options: [
          { name: 'Stubber' },
          { name: 'Autogun' },
          { name: 'Combat Shotgun' },
        ],
      },
      {
        name: 'knife or brass knuckles',
        options: [
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: 'flask of amasec or 3 doses of narcotics',
        options: [
          { name: 'Flask of amasec' },
          { name: 'doses of narcotics', amount: 3 },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'charm', variant: 'graphic memento' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 118, 'core-human', 'Hive Ganger', 'Heavy', 20, 1, false),
    hint: 'A strong warrior, bigger and burlier than ordinary gangers.',
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Pure muscle',
        snippet: 'Heavies are capable of shouldering many weapons other gangers find difficult to wield properly. They gain +Rank when determining their Strength for the Heavy weapon trait. Additionally, they gain +½ Rank damage to their melee attacks.',
      },
    ],
    wargearString:
      'Hive leathers or flak armor, heavy stubber or chainaxe, knife, lho-sticks, charm (graphic memento) or dog, gang trappings.',
    wargear: [
      {
        name: 'Hive leathers or outlandish attire',
        options: [
          { name: 'Hive leathers' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'stubber, knife or brass knuckles',
        options: [
          { name: 'Stubber' },
          { name: 'Knife' },
          { name: 'Improvised Weapon', variant: 'Brass Knuckles' },
        ],
      },
      {
        name: '3 doses of narcotics or graphic memento',
        options: [
          { name: 'doses of narcotics', amount: 3 },
          { name: 'graphic memento' },
        ],
      },
      { name: 'lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  {
    ...simpleStub('pax', 118, 'core-human', 'Hive Ganger', 'Gang Leader', 30, 2, false),
    hint: 'A terrifying leader, leading by strength and will',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'attributes', value: 'strength', threshold: 3 },
    ],
    prerequisiteText: 'The respective <Gang> Skill at (4).',
    keywords: 'Imperium,Scum,<Gang>,Outcast',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Bigger and badder',
        snippet: 'The gang leaders are often the biggest (next to the heavies) and the baddest member of his crew. The gang leader gains +Rank bonus to his Gang Skill. During a combat, he also gains +½ Rank bonus to his Resolve tests',
      },
    ],
    wargearString:
      'Outlandish garb or attire, ' +
      'flak armor or carapace armor, ' +
      'chainsword, bolt pistol or plasma pistol, ' +
      'charm (grisly trophies) or dog, ' +
      'stimm-injector, ' +
      'lho sticks, ' +
      'gang trappings.',
    wargear: [
      {
        name: 'Outlandish garb or outlandish attire',
        options: [
          { name: 'Outlandish garb' },
          { name: 'outlandish attire' },
        ],
      },
      {
        name: 'flak armor or carapace armor',
        options: [
          { name: 'Flak Armour' },
          { name: 'Carapace Armour' },
        ],
      },
      {
        name: 'chainsword, bolt pistol or plasma pistol',
        options: [
          { name: 'Chainsword' },
          { name: 'Bolt Pistol' },
          { name: 'Plasma Pistol' },
        ],
      },
      {
        name: 'charm (grisly trophies) or dog',
        options: [
          { name: 'Charm', variant: 'Grisly Thropies)' },
          { name: 'Dog' },
        ],
      },
      { name: 'Stimm-injector' },
      { name: 'Lho-sticks' },
      { name: 'Trappings', variant: 'Gang Trappings' },
    ],
  },
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Scholar', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Artisan', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Chirurgeon', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Colonist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Enforcer', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Menial', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Planetary Defender', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Bonded Emissary', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Civilians', 'Planetary Governor', 40, 4),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Charlatan', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Convert', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Cultist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Frateris Militia', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Penitent', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Crusader of Faith', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Cult Magus', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Death Cult Assassin', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Fanatic', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Redemptionist', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Cults', 'Demagoge', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Rating', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Voidsman-At-Arms', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Midshipman', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Junior Officer', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Warrant Officer', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Imperial Navy', 'Senior Officer', 40, 3),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Law-Wright', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Offense-Barker', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Magistrate', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Magistratum', 'Sentencing Lord', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Hive Twist', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Mutant Outcast', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Twist Hulk', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Wyrd', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Ghilliam', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Psychic Abomination', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Scavvy', 10, 2),
  simpleStub('pax', '-', 'core-human', 'Mutant Outcast', 'Hullghast', 30, 3),
  {
    ...simpleStub('pax', 195, 'pax-navigator', 'Navis Nobility Houses', 'Navis Scion', 20, 1),
    stub: false,
    hint: 'A young navigator, groomed for diplomacy since birth.',
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'leadership', threshold: 2 },
      { group: 'skills', value: 'persuasion', threshold: 2 },
      { group: 'skills', value: 'deception', threshold: 2 },
    ],
    keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Groomed from Birth',
        snippet: 'Navis Scions begin play without an initial mutation. Additionally, they gain a +½ Rank bonus to Persuasion skill tests.',
      },
    ],
    // new
    wargearString: 'Staff, Mesh Armour, nobilite robes, charm (silk headscarf), flask of amasec',
    wargear: [
      { name: 'Staff' },
      { name: 'Mesh Armour' },
      { name: 'Nobilite Robes' }, // possession
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Flask of amasec' }, // possession
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Nobilite Emissary', 10, 1),
    stub: false,
    hint: 'A representative of the Navis Nobilite, empowered to enact the will of a houses Novators.',
    species: [ 'Human (core)', 'Navigator (pax)' ],
    speciesKey: [ 'core-human', 'pax-navigator' ],
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 1 },
      { group: 'skills', value: 'persuasion', threshold: 1 },
      { group: 'skills', value: 'deception', threshold: 1 },
    ],
    keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'House Operative',
        snippet: 'A Nobilite Emissary gains +Rank to opposed skill tests to resist the effects of seduction and interrogation. In addition, the Nobilite Emissary character may utilize an interrogator’s questions and techniques to garner detailed information about the nature, aims, and motivations of the interrogator himself and those he works for. If the Nobilite Emissary is subjected to interrogation, and wins an opposed test, he may immediately make an Awareness Test (DN 4). On a success and for every shifted icon, he can learn one detail about his captors (what he can and cannot learn is ultimately up to the GM but it should be something valuable).',
      },
    ],
    wargearString: 'Laspistol, staff, nobilite robes or imperial robes, charm (silk headscarf) or micro-bead, gene-coded slate monitron.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Staff' },
      {
        name: 'Nobilite Robes or Imperial Robes',
        options: [
          { name: 'Nobilite Robes' },
          { name: 'Imperial Robes' },
        ],
      },
      {
        name: 'Charm or micro-bead',
        options: [
          { name: 'Charm', variant: 'Silk headscarf' }, // possession
          { name: 'Micro-bead' },
        ],
      },
      { name: 'gene-coded slate monitron' }, // possession
    ],
  },
  {
    ...simpleStub('pax','-','pax-navigator','Navis Nobility Houses','Navigator Primaris',30,2),
    stub: false,
    hint: 'A warp guide, tasked with the sacred charge of guiding voidships through the immaterium.',
    prerequisites: [
     { group: 'attributes', value: 'willpower', threshold: 4 },
     { group: 'skills', value: 'pilot', threshold: 2 },
     { group: 'skills', value: 'persuasion', threshold: 2 },
    ],
    keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Warp Guide',
        snippet: 'The Navigator Primaris gains +Rank bonus dice to Pilot skill tests when steering a voidship through the Warp. Additionally, he gains +½ Rank to Conviction tests.',
      },
    ],
    wargearString:
      'Dueling Laspistol or hand cannon, staff, Mesh Armour, emperor’s tarot deck, nobilite robes, ' +
      'charm (silk headscarf), charm (navis occulta), micro-bead.',
    wargear: [
      {
        name: 'Dueling Laspistol or hand cannon',
        options: [
          { name: 'Dueling Laspistol' },
          { name: 'Hand Cannon' },
        ],
      },
      { name: 'Staff' },
      { name: 'Mesh Armour' },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Charm', variant: 'Navis Occulta' }, // possession
      { name: 'Micro-bead' },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Novator', 40, 3),
    stub: false,
    hint: 'An elder navigator who directs the interests of their house.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 6 },
      { group: 'skills', value: 'pilot', threshold: 5 },
      { group: 'skills', value: 'leadership', threshold: 4 },
      { group: 'skills', value: 'persuasion', threshold: 3 },
      { group: 'skills', value: 'deception', threshold: 3 },
      { group: 'skills', value: 'intimidation', threshold: 3 },
      { group: 'skills', value: 'insight', threshold: 3 },
    ],
    keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Exalted Lineage',
        snippet: 'As the head of a family of the most ancient and powerful houses of the Imperium, the Novator is able to utilize his prestige among the nobility of the Imperium. The Novator may call upon his lineage in social situations and gains +Rank bonus to any Interaction Skill tests when dealing with characters with both the <Nobility> and <Imperium> keywords',
      },
    ],
    wargearString:
      'Digi-weapon or infernal pistol, staff, Mesh Armour, emperor’s tarot deck, ' +
      'charm (silk headscarf), nobilite robes, devoted attendant or mono-tasked servo-skull, ' +
      'choice of augmetic',
    wargear: [
      {
        name: 'Digi-Weapon or Infernal Pistol',
        options: [
          { name: 'Digi Weapon' },
          { name: 'Inferno Pistol' },
        ],
      },
      { name: 'Staff' },
      { name: 'Mesh Armour' },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      {
        name: 'devoted attendant or mono-tasked servo-skull',
        options: [
          { name: 'Devoted Attendant' },
          { name: 'mono-tasked servo-skull' },
        ],
      },
      { name: 'Choice of Augmetic' },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-navigator', 'Navis Nobility Houses', 'Heir-Apparent', 50, 4),
    stub: false,
    hint: 'The strongest navigators, primed to become the next paternova.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 7 },
      { group: 'skills', value: 'persuasion', threshold: 5 },
      { group: 'skills', value: 'pilot', threshold: 4 },
      { group: 'skills', value: 'intimidation', threshold: 4 },
      { group: 'skills', value: 'leadership', threshold: 4 },
    ],
    keywords: 'Imperium,Navis Nobilite,[Navis House],Nobility',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'The Call of the Paternova',
        snippet: 'As Heir-Apparents are inexorably drawn to each, their power waxes in preparation of contending to become the next Paternova. Heir-Apparents gains a chosen Navigator Mutation with each Rank and also gain +Rank when utilizing his Lidless Stare power.',
      },
    ],
    wargearString:
      'Hotshot laspistol or hand cannon, staff, Mesh Armour or carapace Armour, emperor’s tarot deck, ' +
      'nobilite robes, charm (silk headscarf), micro-bead',
    wargear: [
      {
        name: 'Hotshot laspistol or hand cannon',
        options: [
          { name: 'Hotshot Laspistol' },
          { name: 'Hand Cannon' },
        ],
      },
      { name: 'Staff' },
      {
        name: 'Mesh Armour or Carapace',
        options: [
          { name: 'Mesh Armour' },
          { name: 'Carapace Armour' },
        ],
      },
      { name: 'Emperor`s tarot deck' },
      { name: 'Nobilite Robes' },
      { name: 'Charm', variant: 'Silk headscarf' }, // possession
      { name: 'Micro-bead' },
    ],
  },
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Bannerman', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Boundsman', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Drover', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Serfitor', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Knight Scion', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Sacristan', 50, 2),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Freeblade', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Questoris Famila', 'Knight Baron', 60, 4),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Household Trooper', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Rejuvenat Adept', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Child of Destiny', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Companion', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Rogue Trader', 50, 3),
  simpleStub('pax', '-', 'core-human', 'Rogue Trader Fleets', 'Legendary Trader', 60, 4),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Explicator-Progenii', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Progena', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Truant', 5, 1),
  simpleStub('pax', '-', 'core-human', 'Schola Progenium', 'Drill-Abbot', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Scapegrace', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Scavenger', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Stubjack', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Performancer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Verminspeaker', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Witch', 30, 1),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Reclaimator', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Scum', 'Desperado', 30, 3),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Dreg', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Fixer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Malifixer', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Skulker', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Smuggler', 20, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Thug', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Cold Trader', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Underworld Syndicates', 'Crime Lord', 40, 2),
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Blank', 0, 1),
    stub: false,
    hint: 'An untouchable, whose aura of ‘wrongness’ sets them apart from his fellow man.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -1,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Soulless Aura',
        snippet: 'All Characters within the Untouchables Willpower x ½ Rank meters suffer a +Rank DN increase to all Social skill test. Characters with the [Eldar] or [Psyker] keyword suffer a single point of Shock for every Round they remain within this area of effect.',
        description:
          '<p>The Many feel the Untouchable’s unnatural essence as a subconscious irritation. ' +
          'Those unused to this often find their emotional stability irritated to distraction ' +
          'from his mere presence. Characters within a distance of meters equal to the ' +
          'Untouchables Willpower x ½ Rank suffer a +Rank increase to all Social skill test Difficulty Numbers.</p>' +
          '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer a single point of Shock for every Round they remain within this area of effect.</p>'
      },
    ],
    wargear: [
      {
        name: 'Rag-robes, uniform or street clothes',
        options: [
          { name: 'Rag-Robes' },
          { name: 'Uniform' },
          { name: 'Street Clothes' },
        ],
      },
      {
        name: 'sword or mace or autogun',
        options: [
          { name: 'Sword' },
          { name: 'Mace' },
          { name: 'Autogun' },
        ],
      },
      {
        name: 'null-limiter or Flak Armour',
        options: [
          { name: 'Null-Limiter' },
          { name: 'Flak Armour' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Null', 20, 2),
    stub: false,
    hint: 'A more unnatural untouchable, whose presence can harm the psychically gifted and ward of the daemonic.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -2,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Null-Field',
        snippet: '',
        description:
          '<p>Untouchables of greater power present a stronger aversion to the Immaterium, encompassing a wider area surrounding them. In this region, psykers see their powers fail and despair, knowing an Untouchable is nearby. The characters Psychic Null traits extend outwards, protecting a number of allies equal to his Rank who are nearby, no further than a distance in meters equal to his Passive Awareness +½ Rank. Characters with the [Eldar] or [Psyker] keyword suffer ½ Rank points of Shock for every Round they remain within this area of effect.</p>'
      },
    ],
    // Rag-robes, uniform or street clothes, trade tools, laspistol or autopistol, null-limiter or Flak Armour.
    wargear: [
      {
        name: 'Rag-robes, uniform or street clothes',
        options: [
          { name: 'Rag-Robes' },
          { name: 'Uniform' },
          { name: 'Street Clothes' },
        ],
      },
      { name: 'trade tools' },
      {
        name: 'laspistol or autopistol',
        options: [
          { name: 'Laspistol' },
          { name: 'Autopistol' },
        ],
      },
      {
        name: 'null-limiter or Flak Armour',
        options: [
          { name: 'Null-Limiter' },
          { name: 'Flak Armour' },
        ],
      },
    ],
  },
  {
    ...simpleStub('pax', '-', 'pax-untouchable', 'Untouchables', 'Pariah', 50, 3),
    stub: false,
    hint: 'A particularly powerful untouchable, whose aura is palpable and capable of disrupting the strongest of psychic manifestations.',
    prerequisites: [
      { group: 'attributes', value: 'willpower', threshold: 4 },
      { group: 'skills', value: 'survival', threshold: 3 },
    ],
    keywords: 'Imperium,Untouchable',
    influence: -3,
    archetypeFeatures: [
      {
        name: 'Social Pariah',
        snippet: 'You obtain the Lower Class or Outcast Keyword',
        selected: '',
        options: [
          { name: 'Lower Class', keywords: [ 'Lower Class' ] },
          { name: 'Outcast', keywords: [ 'Outcast' ] },
        ],
      },
      {
        name: 'Bane of the Immaterium',
        snippet:
          '[Psyker]s within Willpower x ½ Rank suffer + Rank DN to manifest Powers. ' +
          '[Eldar] and [Psyker]s in range also suffer Rank points of shock each round. ' +
          'The Character is healed by an equal amount shock that is suffered. ' +
          'Also, [Deamonic]s within range suffer +½ Rank DN to Skill Tests.',
        description:
          '<p>The abyss where the Untouchable’s soul should be is unrelenting in its psychic hemorrhage, ' +
          'and increases the anathema he projects into larger areas. ' +
          'Psykers can suddenly find themselves diminished as an Untouchable charges forward, ' +
          'emanating a wavefront they find terrible to contemplate. All character with the &lt;Psyker&gt; ' +
          'keyword increase the DN to manifest their powers by +Rank while they remain within a ' +
          'distance from the untouchable equal to his Willpower x ½ Rank.</p>' +
          '<p>Characters with the &lt;Eldar&gt; or &lt;Psyker&gt; keyword suffer Rank points of Shock for ' +
          'every Round they remain within this area of effect, which automatically ' +
          'heal any Shock the Untouchable may have incurred with an equal amount. ' +
          'Additionally, creatures with the &lt;Daemonic&gt; keyword suffer a penalty to all skill tests ' +
          'equal to the Untouchables ½ Rank within the same area of effect.</p>',
      },
    ],
    // Flak or Mesh Armour or symbol of inquisitorial authority, boltgun or bolt pistol and Chainsword, null-limiter
    wargear: [
      {
        name: 'Flak or Mesh Armour or symbol of inquisitorial authority',
        options: [
          { name: 'Flak Armour' },
          { name: 'Mesh Armour' },
          { name: 'Symbol of Authority' },
        ],
      },
      {
        name: 'Boltgun or bolt pistol and Chainsword',
        options: [
          { name: 'Boltgun' },
          { name: 'Bolt Pistol and Chainsword' },
        ],
      },
      { name: 'Null-Limiter' },
    ],
  },
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Dark-Holder', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Pilgrim', 10, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Voidborn Clanner', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Voidfarers', 'Void-Master', 30, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Wolfpack Raiders', 0, 1),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Pirate Prince', 40, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Reaver', 20, 2),
  simpleStub('pax', '-', 'core-human', 'Void Pirates', 'Swashbuckler', 40, 2),
];

const sotahRep = [
  simpleStub('sotah', 4, 'core-adeptus-astartes', 'Deathwatch', 'Blackshield', 60, 4),
  simpleStub('sotah', 4, 'core-adeptus-astartes', 'Deathwatch', 'Keeper', 80, 5),
  simpleStub('sotah', 5, 'core-adeptus-astartes', 'Deathwatch', 'Kill Marine', 60, 4),
];

const thaotRep = [
  simpleStub('thaot', 4, 'core-adeptus-astartes', 'Adeptus Astartes', 'Techmarin', 70, 3),
];

const ambRep = [
  simpleStub('amb', 2, 'core-human', 'Astra Militarum', 'Weapon Specialist', 25, 2),
  simpleStub('amb', 3, 'core-human', 'Astra Militarum', 'Brawler', 25, 2),
  simpleStub('amb', 4, 'core-human', 'Astra Militarum', 'Scout', 30, 2),
  simpleStub('amb', 4, 'core-human', 'Astra Militarum', 'Sniper', 30, 2),
  simpleStub('amb', 5, 'core-human', 'Astra Militarum', 'Heavy Weapon Specialist', 35, 2),
  simpleStub('amb', 6, 'coreab-ogryn', 'Astra Militarum', 'Bulwark', 25, 2),
  simpleStub('amb', 6, 'core-human', 'Astra Militarum', 'Field Medicae', 25, 2),
];

const archetypeRepository = [
  ...core,
  ...dodScumPsyker,
  ...aaoaRep,
  ...ltgbRep,
  ...aotgtRep,
  ...teaRep,
  ...hevaRep,
  ...goenRep,
  ...lotnRep,
  ...togRep,
  ...paxRep,
  ...sotahRep,
  ...thaotRep,
  ...ambRep,
];

module.exports = archetypeRepository;
