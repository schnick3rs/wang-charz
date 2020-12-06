import { source } from './_sourcesRepository';
import { stringToKebab } from './_stringUtils';
import { ATTRIBUTES, SKILLS, TRAITS } from './_statUtils';

const _statCosts = {
  attributes: [0, 0, 4, 10, 20, 35, 55, 80, 110, 145, 185, 230, 280],
  skills: [0, 2, 6, 12, 20, 30, 42, 56, 72],
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

// ...archetype(source.core.key, 99,'Adepta Sororitas','Sister of Battle',2,'Human',94),
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

  const speciesObject = {
    name: speciesName,
    key: `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`,
    sourceKey: speciesSourceKey.toLowerCase(),
  };

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
    species: [ speciesObject ],
    stub,
    wargear: [],
    prerequisites: [],
    archetypeFeatures: [],
    influence: 0,
  };
}

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

const costz = function(total = 0, prerequisites = []) {
  let skillAndAttributeCost = 0;
  prerequisites.forEach((pre) => {
    skillAndAttributeCost += _statCosts[pre.group][pre.threshold];
  });
  const archetypeCost = total - skillAndAttributeCost;
  return {
    ...cost(total, archetypeCost, skillAndAttributeCost),
    prerequisites,
  };
}

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

const wargearOptionFromString = function(partString) {
  let part = partString.trim();
  const gear = {};

  // of it does start with a number
  if (!isNaN(part.split(' ')[0])) {
    gear.amount = part.split(/ /)[0];
    part = part.split(/ (.+)/)[1];
    // remove trailing s, indicating a plural
    part = part.replace(/s$/, "");
  }

  // if it contains a /
  if (part.indexOf('/') > 0) {
    let parts = part.split('/');
    gear.name = parts[0];
    gear.variant = parts[1];
  } else {
    gear.name = part;
  }

  return gear;
}

const wargearz = function(wargearString) {
  const gears = wargearString.split(',').map(partString => {
    let part = partString.trim();
    const gear = {};

    let parts = part.split(' or ');
    if (parts.length > 1) {
      return {
        name: part,
        selected: '',
        options: parts.map((p) => wargearOptionFromString(p)),
      }
    } else {
      return wargearOptionFromString(part);
    }

  })
  return gears;
}

const core = [
  // Adeptus Ministorum
  {
    ...archetype(source.core.key,92,'Adeptus Ministorum','Ministorum Priest',1,'Human'),
    ...cost(12,0,12, 0, 0),
    hint: 'A zealous preacher of the Imperial Creed.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
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
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.INSIGHT, 1),
      reqSkill(SKILLS.INTIMIDATION, 1),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.SCHOLAR, 2),
    ],
  },
  {
    ...archetype(source.core.key, 102,'Adeptus Ministorum','Death Cult Assassin',2,'Human'),
    ...cost(36,10,26, 0, 0),
    hint: 'An agile killer, expressing worship through the art of death.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
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
    ...archetype(source.core.key, 110,'Adeptus Ministorum','Crusader',3,'Human'),
    ...cost(54,20,34, 0, 0),
    hint: 'A holy warrior with unfl agging devotion to the God-Emperor.',
    keywords: 'Imperium,Adeptus Ministorum',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INITIATIVE, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ],
    archetypeFeatures: [
      {
        name: 'Armour of Faith',
        snippet: 'You gain +Double Rank bonus dice to melee attack tests against targets with the CHAOS or HERETIC keyword. Your Resolve also increases by +Rank.',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1 },
        ],
      },
    ],
    wargear: wargearz('Power Sword, Storm Shield, Carapace Armour, Clothing/Ministorum Robes'),
    influence: 1,
  },
  // Adepta Sororitas
  {
    ...archetype(source.core.key, 91,'Adepta Sororitas','Sister Hospitaller',1,'Human'),
    ...cost(24,0,24,0,0),
    hint: 'A pious healer dedicated to care of both body and soul.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.MEDICAE, 1),
      reqSkill(SKILLS.SCHOLAR, 1),
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
    ...archetype(source.core.key, 99,'Adepta Sororitas','Sister of Battle',2,'Human'),
    ...cost(64,10,54, 0, 0),
    hint: 'A determined warrior, filled with purity and faith.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
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
    ...archetype(source.core.key, 93,'Astra Militarum','Imperial Guardsman',1,'Human'),
    ...cost(6,0,6, 0, 0),
    hint: 'A disciplined soldier, used to fighting amid multitudes',
    keywords: 'Imperium,Astra Militarum,[Regiment]',
    prerequisites: [
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Look Out, Sir!',
        snippet: 'Once per combat, as a Reflexive Action, move up to half your Speed to intercept an attack that hit an ally. You Resilience is increased by +Rank.',
        description: '<p>You have been drilled in sacrificing yourself to save your allies. Once per combat, you may take a Reflexive Action to move up to half your Speed to get in the way of any attack that hit an ally. The attacker then rolls against your Resilience instead of your ally’s, and may deal Wounds to you. Your Resilience increases by +Rank for the purpose of calculating damage.</p>'
        // TODO conditional modifier
      },
    ],
    wargear: wargearz('Flak Armour, Lasgun, Knife, Munitorum-Issue Mess Kit, Grooming kit, Uplifting Primer/A copy of the Imperial Infantryman’s Uplifting Primer, 3 ration packs'),
    suggestedStats: [
      ...suggestedAttributes(3,3,3,3,2,1,2),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.AWARENESS, 1),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.SURVIVAL, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 1),
    ],
  },
  {
    ...archetype(source.core.key, 103,'Astra Militarum','Tempestus Scion',2,'Human'),
    ...cost(52,10,42, 0, 0),
    hint: 'An elite, highly-trained soldier, used to undertaking special missions.',
    keywords: 'Imperium,Astra Militarum,Militarum Tempest',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.STEALTH, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Elite Soldier',
        snippet: 'You’re an expert in inflicting pain through the weapons of the Imperium. Whenever you spend Glory to increase damage when using a weapon with the ASTRA MILITARUM you can add +Rank to the final damage value.',
      },
    ],
    wargear: wargearz('Carapace Armour, Hot-Shot Lasgun, Grav-Chute, Knife, Munitorum-Issue Mess Kit, Uplifting Primer/a copy of the Imperial Infantryman’s Uplifting Primer, Slate Monitron, Monoscope, 3 ration packs'),
    influence: 1,
  },
  {
    ...archetype(source.core.key, 111,'Astra Militarum','Imperial Commissar',3,'Human'),
    ...costz(76,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 1),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 1),
    ]),
    hint: 'A fearsome leader, inspiring both dread and respect in great measure.',
    keywords: 'Imperium,Astra Militarum,Officio Prefectus',
    archetypeFeatures: [
      {
        name: 'Fearsome Respect',
        snippet: 'You and any allies within 15 metres of you that can see you may add +Double Rank bonus dice to Resolve Tests. You add +Double Rank bonus dice to any Intimidation (Wil) Tests, including Interaction Attacks.',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 2, condition: 'for You and allies within 15 metres' },
          { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 2, condition: null },
        ],
      },
    ],
    wargear: wargearz('Bolt Pistol, Chainsword, Flak Coat, Munitorum-Issue Mess Kit, Blanket, Grooming Kit, Uplifting Primer, 3 ration packs'),
    influence: 3,
  },
  // Inquisition
  {
    ...archetype(source.core.key, 94,'The Inquisition','Inquisitorial Acolyte',1,'Human'),
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
    ...archetype(source.core.key, 95,'The Inquisition','Inquisitorial Sage',1,'Human'),
    ...cost(16,0,16, 0, 0),
    hint: 'A learned scholar and scribe, adept at navigating bureaucratic obstacles.',
    keywords: 'Adeptus Administratum,Imperium,Inquisition,[Ordo]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Administratum Records',
        snippet: 'You are particularly adept at navigating the Imperium’s colossal bureaucracy. You gain +Rank bonus dice whenever you make a Test to gather information from Imperial sources, typically on Influence or Investigation (Int) tests.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.INVESTIGATION, modifier: 0, rank: 1, condition: 'when gathering information from Imperial sources' },
        ],
      },
    ],
    wargear: wargearz('Clothing/Administratum Robes, Laspistol, Knife, Auto-Quill, Data-Slate, 3 Scroll of Ancient Records'),
    influence: 1,
  },
  {
    ...archetype(source.core.key, 104,'Rogue Trader Dynasties','Rogue Trader',2,'Human'),
    ...cost(36,10,26,0,0),
    hint: 'An adventuresome and influential explorer with their own space vessel.',
    keywords: 'Imperium,Rogue Trader,[Dynasty]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.AWARENESS, 1),
      reqSkill(SKILLS.CUNNING, 1),
      reqSkill(SKILLS.INSIGHT, 2),
      reqSkill(SKILLS.PERSUASION, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Warrant of Trade',
        snippet: 'You are a master of manipulating a situation to your advantage. You gain +Rank bonus dice to all Persuasion (Fel) Tests and Influence tests to acquire goods and services.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when acquiring goods and services.' },
          { targetGroup: 'traits', targetValue: TRAITS.INFLUENCE, modifier: 0, rank: 1, condition: 'when acquiring goods and services.' },
        ],
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
    ...archetype(source.core.key, 100,'Adeptus Astra Telephatica','Sanctioned Psyker',2,'Human'),
    ...cost(32,10,22, 0, 0),
    hint: 'Able to focus the warp through their mind, they are blessed or cursed with psychic powers.',
    keywords: 'Imperium,Adeptus Astra Telepathica,Psyker,Scholastica Psykana',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
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
    ...archetype(source.core.key, 116,'The Inquisition','Inquisitor',4,'Human'),
    ...cost(110,30,80, 0, 0),
    hint: 'A bearer of profound Imperial authority, adept at discovering the truth in the shadows.',
    keywords: 'Imperium,Inquisition,[Ordo],[Any]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.CUNNING, 4),
      reqSkill(SKILLS.INSIGHT, 4),
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
    ...archetype(source.core.key, 106,'Adeptus Astartes','Space Marine Scout',2,'Adeptus Astartes'),
    ...cost(170,10,160, 0, 0),
    hint: 'A stealthy warrior adept at reconnaissance.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ],
    archetypeFeatures: [
      {
        name: 'Use the Terrain',
        snippet: 'You gain +Rank to any Stealth (A) Test when there is some form of terrain to hide behind.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.STEALTH, modifier: 0, rank: 1, condition: 'when there is some form of terrain to hide behind' },
        ],
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
    ...archetype(source.core.key, 113,'Adeptus Astartes','Tactical Space Marine',3,'Adeptus Astartes'),
    ...cost(272,20,252, 0, 0),
    hint: 'A versatile warrior, veteran of a hundred battles.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5), // 20
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
      reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
      reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
      reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
      reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
      reqSkill(SKILLS.ATHLETICS, 3), // 12
      reqSkill(SKILLS.AWARENESS, 3), // 12
      reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
      reqSkill(SKILLS.LEADERSHIP, 1), // 12
      reqSkill(SKILLS.SCHOLAR, 1), // 12
      reqSkill(SKILLS.STEALTH, 3), // 12
      reqSkill(SKILLS.SURVIVAL, 1), // 12
      reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
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
    ...archetype(source.core.key, 117,'Adeptus Astartes','Primaris Intercessor',4,'Primaris Astartes'),
    ...costz(300, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 6),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A skilled and focused warrior, adept at bringing death at range.',
    keywords: 'Imperium, Adeptus Astartes, Primaris, [Chapter]',
    archetypeFeatures: [
      {
        name: 'Intercessor Focus',
        snippet: 'You gain +Double Rank bonus dice to any Ballistic Skill Tests to fire a ranged weapon with the PRIMARIS Keyword.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.BALLISTIC_SKILL, modifier: 0, rank: 2, condition: 'when firing a PRIMARIS weapon.' },
        ],
      },
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Bolt Rifle, Heavy Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
    influence: 1,
  },
  // Adeptus Mechanicus
  {
    ...archetype(source.core.key, 101,'Adeptus Mechanicus','Skitarius',2,'Human'),
    ...cost(28,10,18, 0, 0),
    hint: 'A warrior of the Machine Cult, sturdy and reliable.',
    keywords: 'Imperium,Adeptus Mechanicus,Skitarii,[Forge World]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.TECH, 1),
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
    ...archetype(source.core.key, 109,'Adeptus Mechanicus','Tech-Priest',3,'Human'),
    ...cost(44,20,24, 0, 0),
    hint: 'A priest of the Omnissiah, able to commune with the machine-spirits.',
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 3),
    ],
    archetypeFeatures: [
      {
        name: 'Rite of Repair',
        snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
        ],
      },
    ],
    wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi-Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
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
      { name: 'Combi-Tool' },
      { name: 'Light Power Armour' },
      { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
    ],
    influence: 2,
  },
  // Scum
  {
    ...archetype(source.core.key, 96,'Scum','Ganger',1,'Human'),
    ...cost(2,0,2, 0, 0),
    hint: 'A resourceful and tenacious survivor from the depths of enormous industrial cities.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      reqSkill(SKILLS.CUNNING, 1),
    ],
    archetypeFeatures: [
      {
        name: 'Scrounger',
        snippet: 'You add +Rank dice to Cunning Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.',
        description:
          '<p>Your life with less has made you adept at finding spares and supplies in the most unlikely of places. You gain +Rank bonus dice to Cunning (Fel) Tests. Once per session you may make an Influence or Cunning Test to acquire an item, representing something you have prepared in advance.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.CUNNING, modifier: 0, rank: 1, condition: null },
        ],
      },
    ],
    wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stubber',
    wargear: [
      {
        name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stubber.',
        selected: 'Autopistol',
        options: [
          { name: 'Autopistol' },
          { name: 'Laspistol' },
          { name: 'Hand Cannon' },
          { name: 'Stubber' },
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
    ...archetype(source.core.key, 105,'Scum','Scavvy',2,'Human'),
    ...cost(16,10,6, 0, 0),
    hint: 'A mutant—cast out and reviled—yet their mutations give them power.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
      reqSkill(SKILLS.SURVIVAL, 1),
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
              { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 1, condition: null },
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
              { targetGroup: 'skills', targetValue: SKILLS.AWARENESS, modifier: 0, rank: 2, condition: 'when involving touch' },
              { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: -1 },
              { targetGroup: 'traits', targetValue: TRAITS.MAX_SHOCK, modifier: -1 },
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
              { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 2 },
              { targetGroup: 'traits', targetValue: TRAITS.MAX_SHOCK, modifier: -1 },
            ],
          },
          {
            name: 'Grotesque',
            snippet: 'You add +1 die to Intimidation (Wil) Tests. You suffer +1 DN to (other) social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 1 },
            ],
          },
          {
            name: 'Bestial Hide',
            snippet: 'Increase your Resilience by 1. You add +1 dice to Intimidation (Wil) Tests. You suffer +2 DN to (other) social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'traits', targetValue: TRAITS.RESILIENCE, modifier: 1 },
              { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 1 },
            ],
          },
          {
            name: 'Brute',
            snippet: 'Increase your Strength and Toughness by 1. You suffer +1 DN to all tests involving Tools and Range Weapons, if they are not adjusted to your build.',
            modifications: [
              { targetGroup: 'attributes', targetValue: ATTRIBUTES.STRENGTH, modifier: 1 },
              { targetGroup: 'attributes', targetValue: ATTRIBUTES.TOUGHNESS, modifier: 1 },
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
              { targetGroup: 'attributes', targetValue: ATTRIBUTES.WILLPOWER, modifier: 2 },
              { targetGroup: 'attributes', targetValue: ATTRIBUTES.TOUGHNESS, modifier: -1 },
            ],
          },
          {
            name: 'Vile Alacrity',
            snippet: 'Increase your Speed by 2. Add +1 dice to Athletic (Str) tests. You suffer (at least) +2 DN to social interaction tests with non-CHAOS.',
            modifications: [
              { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 2 },
              { targetGroup: 'skills', targetValue: SKILLS.ATHLETICS, modifier: 1 },
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
    ...archetype(source.core.key, 112,'Scum','Desperado',3,'Human'),
    ...cost(52,20,32, 0, 0),
    hint: 'A savvy and dangerous bounty hunter, mercenary, and gun for hire.',
    keywords: 'Scum,[Any]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 2),
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.CUNNING, 2),
      reqSkill(SKILLS.INVESTIGATION, 2),
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
      { name: 'Combi-Tool' },
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
    ...archetype(source.core.key, 96,'Chaos','Cultist',1,'Human'),
    ...cost(2,0,2, 0, 0),
    hint: 'A disciple of the Ruinous Powers, eager to gain their capricious favour.',
    keywords: 'Scum,[Any],Chaos,[Mark of Chaos]',
    prerequisites: [
      reqSkill(SKILLS.CUNNING, 1),
    ],
    archetypeFeatures: [
      {
        name: 'Enemy Within',
        snippet: 'You gain +Double Rank bonus dice to Deception (Fel) Tests, including Interaction Attacks, against targets with the IMPERIUM Keyword.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.DECEPTION, modifier: 0, rank: 2, condition: 'against IMPERIAL targets' },
        ],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 1 point Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 1 }] },
          { key: 'corruption-2', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 }] },
          { key: 'corruption-3', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
        ],
      },
    ],
    wargearString: 'A Knife or a Sword, Bedroll, Canteen, Gang colours, any one of the following: a Laspistol or an Autopistol or a Hand Cannon or a Stubber',
    wargear: [
      {
        name: 'Choice of Laspistol, Autopistol, Hand Cannon or Stubber.',
        selected: 'Autopistol',
        options: [
          { name: 'Autopistol' },
          { name: 'Laspistol' },
          { name: 'Hand Cannon' },
          { name: 'Stubber' },
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
    ...archetype(source.core.key, 100,'Chaos','Rogue Psyker',2,'Human'),
    ...cost(72,50,22, 0, 0),
    hint: 'How could you...',
    keywords: 'Chaos,Psyker,Scholastica Psykana',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
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
          { key: 'corruption-1', name: 'Gain 2 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 }] },
          { key: 'corruption-2', name: 'Gain 4 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 4 }] },
          { key: 'corruption-3', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
        ],
      },
    ],
    wargear: wargearz('Laspistol, Force Rod, Psykana Mercy Blade, Munitorum-Issue Mess Kit, Blanket, Grooming kit, 2 ration packs'),
  },
  {
    ...archetype(source.core.key, 109,'Chaos','Heretek',3,'Human'),
    ...cost(84,60,24, 0, 0),
    hint: 'A fallen priest, able to commune with the heretic machine-spirits.',
    keywords: 'Imperium,Adeptus Mechanicus,Cult Mechanicus,[Forge World],Chaos,Dark Mechanicus',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 3),
    ],
    archetypeFeatures: [
      {
        name: 'Rite of Repair',
        snippet: 'You receive +Double Rank to Tech (Int) Tests to repair damaged machinery. All Tech (Int) Tests you make take half the standard time.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when repairing damaged machinery' },
        ],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 1d3 x3 corruption.',
        selected: [''],
        options: [
          { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
          { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
          { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 9 }] },
        ],
      },
    ],
    wargearString: 'Omnissian Axe, Laspistol, One Mechadendrite, any 2 Augmetics, Combi-Tool, Light Power Armour, Omnissian Sigil (Symbol of Authority)',
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
      { name: 'Combi-Tool' },
      { name: 'Light Power Armour' },
      { name: 'Symbol of Authority', variant: 'Omnissian Sigil' },
    ],
    influence: 2,
  },
  {
    ...archetype(source.core.key, 113,'Chaos','Chaos Space Marine',3,'Adeptus Astartes'),
    ...cost(272,20,252, 0, 0),
    hint: 'A dark warrior, veteran of a thousand years.',
    keywords: 'Imperium,Adeptus Astartes,[Legion],Chaos,[Mark of Chaos],Heretic Astartes',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5), // 20
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5), // 20
      reqAttribute(ATTRIBUTES.AGILITY, 5), // 20
      reqAttribute(ATTRIBUTES.INITIATIVE, 5), // 20
      reqAttribute(ATTRIBUTES.WILLPOWER, 3), // 10
      reqAttribute(ATTRIBUTES.INTELLECT, 3), // 10
      reqSkill(SKILLS.ATHLETICS, 3), // 12
      reqSkill(SKILLS.AWARENESS, 3), // 12
      reqSkill(SKILLS.BALLISTIC_SKILL, 5), // 12
      reqSkill(SKILLS.LEADERSHIP, 1), // 12
      reqSkill(SKILLS.SCHOLAR, 1), // 12
      reqSkill(SKILLS.STEALTH, 3), // 12
      reqSkill(SKILLS.SURVIVAL, 1), // 12
      reqSkill(SKILLS.WEAPON_SKILL, 4), // 12
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
          { key: 'corruption-1', name: 'Gain 3 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 }] },
          { key: 'corruption-2', name: 'Gain 6 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 6 }] },
          { key: 'corruption-3', name: 'Gain 9 points Corruption', modifications: [{ targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 9 }] },
        ],
      },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Boltgun, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenade, 3 Krak Grenade'),
    influence: 2,
  },
  // Aeldari
  {
    ...archetype(source.core.key, 97,'Aeldari','Corsair',1,'Aeldari'),
    ...cost(16,0,16, 0, 0),
    hint: 'A space-faring pirate of an ancient race.',
    keywords: 'Aeldari,Anhrathe,[Corerie]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
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
    ...archetype(source.core.key, 107,'Aeldari','Ranger',2,'Aeldari'),
    ...cost(34,10,24, 0, 0),
    hint: 'A wanderer, a scout, and tracker for the good of their people.',
    keywords: 'Aeldari,Asuryani',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.STEALTH, 1),
      reqSkill(SKILLS.SURVIVAL, 2),
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
    ...archetype(source.core.key, 114,'Aeldari','Warlock',3,'Aeldari'),
    ...cost(56,20,36, 0, 0),
    hint: 'A powerful psyker, wielding strictly-guided powers for the Aeldari cause.',
    keywords: 'Aeldari,Asuryani,Psyker,[Craftworld]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Runes of Battle',
        snippet: 'You are a Psyker; you know the Smite psyhcic power, a single Runes of Battle psychic power and may learn other powers as described in Chapter 11.',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerRunesOfBattle', selected: 'Runes of Battle', query: { discipline: 'Runes of Battle' }, options: [], free: true },
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
    ...archetype(source.core.key, 98,'Orks','Boy',1,'Ork'),
    ...cost(26,0,26, 0, 0),
    hint: 'A brutish warrior and thug who believes that might makes right.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
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
    ...archetype(source.core.key, 108,'Orks','Kommando',2,'Ork'),
    ...cost(54,10,44, 0, 0),
    hint: 'A stealthy and cunning warrior who knows how to turn almost any battle to his advantage.',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.STEALTH, 2),
      reqSkill(SKILLS.SURVIVAL, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ],
    archetypeFeatures: [
      {
        name: 'Kunnin\' Plan',
        snippet: 'You and any of your allies with the ORK within 15 metres gain +Rank bonus dice to Stealth (A) Tests.',
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.STEALTH, modifier: 0, rank: 1, condition: 'for You and ORK allies within 15 metres' },
        ],
      },
    ],
    wargear: wargearz('Shoota, Slugga, Choppa, 3 Stikkbomb, Survival Kit'),
  },
  {
    ...archetype(source.core.key, 115,'Orks','Ork Nob',3,'Ork'),
    key: 'core-nob',
    ...cost(56,20,36, 0, 0),
    hint: 'A savage warrior and capable leader, using brute force to succeed where others fail.',
    name: 'Nob',
    keywords: 'Ork,[Clan]',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqSkill(SKILLS.INTIMIDATION, 2),
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
    ...archetype(source.dod.key, '','Scum','Scum Psyker',2,'Human'),
    ...costz(20,[
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 1),
      reqSkill(SKILLS.CUNNING, 1),
    ]),
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
    description: null,
  },
];

const aaoaOrks = [
  {
    name: 'Burna Boy',
    ...archetype(source.aaoa.key, 48,'Orks','Burna Boy',2,'Ork'),
    ...costz(48,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'Pyromaniacal Greenskins whose desire to burn and destroy grows to consume them entirely.',
    keywords: 'Ork,[Clan]',
    archetypeFeatures: [
      {
        name: 'Da Burna Dance',
        snippet: 'You add +1 to Resolve for every creature you can see which is currently On Fire.',
      },
    ],
    wargear: wargearz('Burna, Ork Flak, 3 Stikkbomb'),
  },
  {
    name: 'Mekboy',
    ...archetype(source.aaoa.key, 53,'Orks','Mekboy',2,'Ork'),
    ...costz(52,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.TECH, 3),
    ]),
    hint: 'A type of Ork Oddboy who build all the weapons, vehicles, and other advanced technology used by the Greenskins.',
    keywords: 'Ork,[Clan]',
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
    name: 'Painboy',
    ...archetype(source.aaoa.key, 55,'Orks','Painboy',2,'Ork'),
    ...cost(52,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.MEDICAE, 3),
    ]),
    hint: 'Responsible for fixing injuries even the highly regenerative Ork physiology cannot repair.',
    keywords: 'Ork,[Clan]',
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
    name: 'Runtherd',
    ...archetype(source.aaoa.key, 55,'Orks','Runtherd',2,'Ork'),
    ...costz(58,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
      reqSkill(SKILLS.LEADERSHIP, 2),
    ]),
    hint: 'Oddboyz who exhibit a trait extremely uncommon amongst Orks: patience.',
    keywords: 'Ork,[Clan]',
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
    name: 'Tankbusta',
    ...archetype(source.aaoa.key, 58,'Orks','Tankbusta',2,'Ork'),
    ...costz(48,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.TECH, 1),
    ]),
    hint: 'A Tankbusta (pl. Tankbustaz) has become completely addicted to the thrill of destroying the armoured fighting vehicles of his foes.',
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
    name: 'Flash Git',
    ...archetype(source.aaoa.key, 72,'Orks','Flash Git',3,'Ork'),
    ...costz(84,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.CUNNING, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
    ]),
    hint: 'An elite breed of Ork Nobz who are obsessed with their lovingly customised, ostentatiously polished and painted weapons known as Snazzguns.',
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
    name: 'Weirdboy',
    ...archetype(source.aaoa.key, 86,'Orks','Weirdboy',3,'Ork'),
    ...cost(66,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
    ]),
    hint: 'Capable of vomiting blasts of Warp energy that can reduce foes to molten goop in seconds.',
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
  // Craftsworld
  {
    name: 'Guardian',
    ...archetype(source.aaoa.key, 35, 'Aeldari', 'Guardian', 1, 'Aeldari'),
    ...costz(20,[
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      // OR reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'A Cratsworld Last Line of Defence.',
    keywords: 'Aeldari, Asuryani, [Craftworld]',
    archetypeFeatures: [
      {
        name: 'The Last Line',
        description:
          '<p>Guardians march to war only when necessary, for the Asuryani are few and their lives are precious. This grim necessity means you increase your Resolve and Conviction by Rank.</p>',
      },
    ],
    wargear: wargearz('Eldar Mesh Armour, Shuriken Catapult, Mono Knife, 3 plasma grenade, spirit stone'),
  },
  {
    name: 'Bonesinger',
    ...archetype(source.aaoa.key, 47, 'Aeldari', 'Bonesinger', 2, 'Aeldari'),
    ...costz(72,[
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 2),
      reqSkill(SKILLS.TECH, 2),
    ]),
    hint: 'Shapers of Bone.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Psyker',
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
  // Craftsworld > Aspect warriors
  {
    name: 'Dark Reaper',
    ...archetype(source.aaoa.key, 67, 'Aeldari', 'Dark Reaper', 3, 'Aeldari'),
    ...costz(92,[
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.AWARENESS, 3),
    ]),
    hint: 'Aspect warriors, merciless and deadly at range.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Inescapable Aim: You may reroll up to Double Rank dice on any Ranged Attack you make.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Reaper Launcher, Dark Reaper Rangefinder, Mono Knife, spirit stone'),
    influence: 1,
  },
  {
    name: 'Dire Avenger',
    ...archetype(source.aaoa.key, 70, 'Aeldari', 'Dire Avenger', 3, 'Aeldari'),
    ...costz(116,[
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'Aspect warriors, skilled in the arts of aggressive defence.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Defensive Tactics: You add +Rank to your Defence. In addition, when an enemy Charges you, you may make a ranged attack against them as a Reflexive Action, adding +2 to the DN of the attack. This attack is resolved before the enemy moves.'),
    ],
    wargear: wargearz('Aspect Armour, Avenger Shuriken Catapult, targeting vane, Mono Knife, 3 plasma grenade, spirit stone'),
    influence: 2,
  },
  {
    name: 'Fire Dragon',
    ...archetype(source.aaoa.key, 71, 'Aeldari', 'Fire Dragon', 3, 'Aeldari'),
    ...costz(108,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.TECH, 3),
    ]),
    hint: 'Aspect warriors, turning all in their path to molten ruin.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    modifications: [],
    archetypeFeatures: [
      simpleAbility('Assured Destruction: When you attack a vehicle, structure, or monstrous creature, add +Rank ED to the attack. In addition, add +Rank to your resilience against attacks with the FIRE or MELTA keywords.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Fusion Gun, 1 melta bomb, Mono Knife, spirit stone'),
    influence: 1,
  },
  {
    name: 'Howling Banshee',
    ...archetype(source.aaoa.key, 75, 'Aeldari', 'Howling Banshee', 3, 'Aeldari'),
    ...costz(127,[
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'Aspect warriors, swift shock troops whose shriek freezes the hearts of their foes.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Swift Death: When you Run, Charge, or Sprint, increase your Speed by +Rank. In addition, you may use Agility instead of Strength for your Athletics skill tests.'),
    ],
    wargear: wargearz('Aspect Armour, shuriken pistol, power sword, Banshee Mask, spirit stone'),
    influence: 1,
  },
  {
    name: 'Shining Spear',
    ...archetype(source.aaoa.key, 75, 'Aeldari', 'Shining Spear', 3, 'Aeldari'),
    ...costz(141,[
      reqAttribute(ATTRIBUTES.STRENGTH, 2),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.PILOT, 5),
      reqSkill(SKILLS.TECH, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'Aspect warriors, jetbike-mounted lancers who slay the mightiest foes',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Ride the Wind: You may reroll Double Rank dice on any Pilot test you make when operating an Aeldari Jetbike'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Laser Lance, Aeldari Jetbike, spirit stone'),
    influence: 1,
  },
  {
    name: 'Striking Scorpion',
    ...archetype(source.aaoa.key, 82, 'Aeldari', 'Striking Scorpion', 3, 'Aeldari'),
    ...costz(108,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'Aspect warriors, stealthy killers who strike with unseen power.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Hunt in the Shadows: You may reroll up to Double Rank dice when making a Stealth test. In addition, you add +Rank bonus dice when you make a Surprise Attack.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Scorpion Chainsword, Shuriken Pistol, Mandiblaster Helm, 3 plasma grenade, Spirit Stone'),
    influence: 1,
  },
  {
    name: 'Swooping Hawk',
    ...archetype(source.aaoa.key, 83, 'Aeldari', 'Swooping Hawk', 3, 'Aeldari'),
    ...costz(101,[
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
    ]),
    hint: 'Aspect warriors, flitting across the skies to deal vengeance.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Skyleap: So long as you are able to Fly, you may Fall Back as a Simple action, rather than a Combat Action. In addition, when you take the Full Defence action, you immediately move twice your Flying Speed (instead of halving your Speed) away from the enemy and add +Rank bonus dice to the Initiative test to increase your Defence. Naturally, these abilities require that you be able to fly, and have room to do so.'),
    ],
    wargear: wargearz('Aspect Armour, Lasblaster, Mono Knife, Swooping Hawk Wings, Swooping Hawk Grenade Pack, 6 plasma grenade, Spirit Stone'),
    influence: 2,
  },
  {
    name: 'Warp Spider',
    ...archetype(source.aaoa.key, 85, 'Aeldari', 'Warp Spider', 3, 'Aeldari'),
    ...costz(108,[
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.TECH, 2),
    ]),
    hint: 'Aspect warriors, appearing from nowhere to cut down their prey.',
    keywords: 'Aeldari, Asuryani, [Craftworld], Aspect Warrior',
    archetypeFeatures: [
      simpleAbility('Flickerjump: As a Reflexive Action when a ranged attack is made against you, you may add +Double Rank to your Defence, as you use your Warp Jump Generator to flicker in and out of reality.'),
    ],
    wargear: wargearz('Heavy Aspect Armour, Death Spinner, Warp Jump Generator, Mono Knife, spirit stone'),
    influence: 1,
  },
  // Harlequin
  {
    name: 'Harlequin Player',
    ...archetype(source.aaoa.key, 93, 'Aeldari', 'Harlequin Player', 4, 'Aeldari'),
    ...costz(200, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'You are a performer upon a galactic stage, playing your part in a performance that shapes worlds and lives. Your existence is enigma, but there can be no doubting your skill or your lethality.',
    keywords: 'Aeldari, Harlequin, [Masque]',
    archetypeFeatures: [
      {
        name: 'We Dance the Dance of Death',
        description:
          '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
        ],
      },
    ],
    wargear: wargearz('Holo-suit, Agaith, Flip-Belt, Harlequins Blade, Shuriken Pistol, 3 Plasma Grenades'),
    influence: 3,
  },
  {
    name: 'Harlequin Troupe Master',
    ...archetype(source.aaoa.key, 115, 'Aeldari', 'Harlequin Troupe Master', 5, 'Aeldari'),
    ...costz(226, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'Your soul is forfeit, for you portray the Great Enemy in the grimmest of performances, and none can do so without cost. But you pay that price willingly, to defend your people from the horror that awaits you.',
    keywords: 'Aeldari, Harlequin, [Masque]',
    archetypeFeatures: [
      {
        name: 'We Dance the Dance of Death',
        description:
          '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Pivotal Role',
        snippet: 'Choose one...',
        selected: [''],
        options: [
          {
            name: 'Choreographer of War',
            snippet: 'Harlequin allies within 6 metres of you add +Rank ED to their melee attacks.',
          },
          {
            name: 'Prince of Light',
            snippet: 'When you or any HARLEQUIN allies within 6 metres Charge, you increase your total movement by +Rank.',
          },
          {
            name: 'Darkness Bite',
            snippet: 'After you make a melee attack, you may inflict a number of Mortal Wounds equal to your Rank, allocated amongst any enemies you hit during your attack.',
          },
          {
            name: 'Twilight Grasp',
            snippet: 'When you make a melee attack against an enemy which is not a Vehicle or Monstrous Creature, your melee weapon gains the Warp Weapon trait.',
          },
        ],
      },
    ],
    wargear: [
      { name: 'Holo-suit' },
      { name: 'Agaith' },
      { name: 'flip-belt' },
      { name: 'Webway Keystone' },
      { name: 'Plasma Grenade', amount: 3 },
      {
        name: 'Any one AELDARI melee weapon of Value 9 or less up to Very Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Melee Weapon'],
            keywordFilter: ['Aeldari'],
          },
        ],
      },
      {
        name: 'Any one pistol of Value 9 or less up to Very Rare',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            traitFilter: ['Pistol']
          },
        ],
      },
    ],
    influence: 5,
  },
  {
    name: 'Harlequin Shadowseer',
    ...archetype(source.aaoa.key, 113, 'Aeldari', 'Harlequin Shadowseer', 5, 'Aeldari'),
    ...costz(281, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 6),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'You personify Fate, and all who look upon your mirrored face see something different; what was, what might be, what could have been, or what must be.',
    keywords: 'Aeldari, Harlequin, [Masque], Psyker',
    archetypeFeatures: [
      {
        ...simpleAbility('We Dance the Dance of Death', 'You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.'),
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Pivotal Role',
        snippet: 'Choose one...',
        selected: [''],
        options: [
          {
            name: 'Shield from Harm',
            snippet: 'Allies within 6 metres of you add +Rank to their Resilience.',
          },
          {
            name: 'Veil of Illusion',
            snippet: 'Whenever a ranged attack targets an ally within 6 metres of you, the attacker counts the range to their attacker as being +Triple Rank metres longer than it actually is.',
          },
          {
            name: 'Gloomwake',
            snippet: 'Allies within 6 metres of you receive +Rank Defence against ranged attacks. This is considered to be a bonus from Cover.',
            modifications: [
              { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1, condition: 'you and allies within 6m, against ranged attacks.' },
            ],
          },
          {
            name: 'Agent of Bedlam',
            snippet: 'Enemies within 6 metres of you add +Rank to the DN of all melee attacks they make.',
          },
        ],
      },
      {
        name: 'Psyker',
        snippet: 'You are a Psyker, and you know the Smite psychic power. You may learn additional psychic powers from the Divination, Telepathy, and Phantasmancy disciplines.',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Divination',
          'Telepathy',
          'Phantasmancy', // AAOA Spells
        ],
      },
    ],
    wargear: wargearz('Holo-suit, Agaith, flip-belt, miststave, shuriken pistol, pack grenade launcher, 6 hallucinogen grenades'),
    influence: 4,
  },
  {
    name: 'Harlequin Death Jester',
    ...archetype(source.aaoa.key, 112, 'Aeldari', 'Harlequin Death Jester', 5, 'Aeldari'),
    ...costz(238, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'Upon the stage and the battlefield alike, you portray Death itself—aloof, bold, inescapable, cruel, and often ironic.',
    keywords: 'Aeldari, Harlequin, [Masque]',
    archetypeFeatures: [
      {
        name: 'We Dance the Dance of Death',
        description:
          '<p>You add +Rank to Speed, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Pivotal Role',
        snippet: 'Choose one...',
        selected: [''],
        options: [
          {
            name: 'Death is Not Enough',
            snippet: 'Damage rolls you make against enemies who are currently suffering from the effects of Fear, Terror, or Pinning add +Rank ED.',
          },
          {
            name: 'Harvester of Torment',
            snippet: 'When you make a successful ranged attack against a Mob, you count as scoring +Double Rank additional Icons when determining how many of the Mob you hit.',
          },
          {
            name: 'The Jest Inescapable',
            snippet: 'Add +6 to the short range of your ranged weapon, +12 to the medium range, and +18 to the long range. In addition, the weapon gains the Mortal [1] trait.',
          },
          {
            name: 'Humbling Cruelity',
            snippet: 'Your ranged weapon gains the Inflict [Pinned] trait, and enemies add your Rank to the DN of tests to resist being Pinned or to recover from pinning.',
          },
        ],
      },
    ],
    wargearString:'Holo-suit, Agaith, Flip-Belt, Master-Crafted Shuriken Cannon, 3 Shrieker Bio-Explosive Discs',
    wargear: [
     { name: 'Holo-suit' },
     { name: 'Agaith' },
     { name: 'Flip-Belt' },
     { name: 'Shrieker Bio-Explosive Discs', amount: 3 },
     { name: 'Shuriken Cannon', variant: 'Master-Crafted Shuriken Cannon' },
    ],
    influence: 4,
  },
  {
    name: 'Harlequin Solitaire',
    ...archetype(source.aaoa.key, 114, 'Aeldari', 'Harlequin Solitaire', 5, 'Aeldari'),
    ...costz(283, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 6),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 6),
    ]),
    hint: 'Your soul is forfeit, for you portray the Great Enemy in the grimmest of performances, and none can do so without cost. But you pay that price willingly, to defend your people from the horror that awaits you.',
    keywords: 'Aeldari, Harlequin, [Masque]',
    archetypeFeatures: [
      {
        name: 'Impossible Grace',
        description:
          '<p>You add +Rank to Speed and Defence, and enemies may never attempt a Reflexive Attack against you when you move out of Engagement.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
          { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'The Path of Damnation',
        description:
          '<p>Other Aeldari shun you, and you add +6 to the DN of all Interaction tests with other Aeldari outside of ritual circumstances or performances. All Aeldari – even allies – must pass a Fear test (DN 3) when they first meet you. However, you automatically succeed at all Conviction and Resolve tests.</p>',
        },
      {
        name: 'Pivotal Role',
        snippet: 'Choose one...',
        selected: [''],
        options: [
          {
            name: 'Blitz',
            snippet: 'At the start of one of your turns, you may choose to initiate a Blitz. When you do so, your Speed is doubled, and you ignore Double Rank DN increases on Multi-Attacks until the end of your turn. Once you have done this, you cannot do so again until after your next Regroup.',
          },
          {
            name: 'Shocking Emergence',
            snippet: 'As a Free Action at the start of combat, you may take on an indistinct, shimmering form, and cannot be seen or targeted by enemies or allies; you cannot take any actions other than movement in this form. At the start of any of your turns, you may reveal yourself, and you add +Rank bonus dice to any melee attack you make if you charge on the turn you reveal yourself.',
          },
          {
            name: 'Chromatic Rush',
            snippet: 'Your speed is increased by +Double Rank instead of +Rank.',
            modifications: [
              { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1 },
            ],
          },
          {
            name: 'Unnatural Acrobatics',
            snippet: 'Your Defence is increased by +Double Rank instead of +Rank.',
            modifications: [
              { targetGroup: 'traits', targetValue: TRAITS.DEFENCE, modifier: 0, rank: 1 },
            ],
          },
        ],
      },
    ],
    wargear: wargearz('Holo-suit, Agaith, flip-belt, Harlequins Caress, Harlequins Kiss'),
  },
  // druchari
  {
    name: 'Kabalite Warrior',
    ...archetype(source.aaoa.key, 38, 'Drukhari', 'Kabalite Warrior', 1, 'aaoa/Drukhari'),
    ...costz(38,[
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.STRENGTH, 2),
      reqAttribute(ATTRIBUTES.INITIATIVE, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.CUNNING, 1),
      reqSkill(SKILLS.INTIMIDATION, 2),
    ]),
    factionKey: 'aaoa-drukhari',
    hint: 'A dark hunter from the noble houses.',
    keywords: 'Aeldari,Drukhari,[Cabal]',
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
    ...archetype(source.aaoa.key, 38, 'Drukhari', 'Wych', 1, 'aaoa/Drukhari'),
    ...costz(52,[
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.STRENGTH, 2),
      reqAttribute(ATTRIBUTES.INITIATIVE, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    factionKey: 'aaoa-drukhari',
    hint: 'A deadly cult gladiator.',
    keywords: 'Aeldari,Drukhari,[Cult]',
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
    ...archetype(source.aaoa.key, 76, 'Drukhari', 'Incubus', 3, 'aaoa/Drukhari'),
    ...costz(102,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    factionKey: 'aaoa-drukhari',
    hint: 'A deadly cult gladiator.',
    keywords: 'Drukhari',
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
    name: 'War-Pledged Warrior',
    ...archetype(source.aaoa.key, 43,'The Squat Remnant','War-Pledged Warrior',1,'aaoa/Squat'),
    ...costz(34,  [
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    factionKey: 'aaoa-the-squat-remnant',
    hint: 'The rank and file of a Squat Stronghold.',
    keywords: 'Squat, [League]',
    influence: 0,
    archetypeFeatures: [
      {
        name: 'War-Pledged',
        description:
          '<p>When you make an attack against an enemy who has already been attacked this round, you gain +Rank bonus dice.</p>',
      },
    ],
    wargear: wargearz('Bolter, hand-cannon, axe, flak armour, 3 frag grenade'),
  },
  {
    ...archetype(source.aaoa.key, 73,  'The Squat Remnant', 'Guild Engineer',  3, 'aaoa/Squat'),
    ...costz(70,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    factionKey: 'aaoa-the-squat-remnant',
    hint: 'Masterful artisans, creating the devices necessary for survival.',
    keywords: 'Squat, [League]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Guild Techniques',
        description:
          '<p>You receive +Rank on Tech tests to repair a damaged machine, or to craft a new one. You may re-roll up to Rank dice on any skill test made to use a device you’ve personally built. You are considered to have built all of your starting wargear personally.</p>',
      },
    ],
    wargear: wargearz('Bolt Pistol, Power Axe, augmetic servo-arm, Ionclad Carapace Armour, Refractor Field, combi-tool'),
  },
  {
    name: 'Hearthguard',
    ...archetype(source.aaoa.key, 74, 'The Squat Remnant', 'Hearthguard',  3,'aaoa/Squat'),
    ...costz(128,[
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    factionKey: 'aaoa-the-squat-remnant',
    hint: 'Doughty elite warriors pledged to defend hearth and home.',
    keywords: 'Squat, [League]',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Close Protection',
        description:
          '<p>When an enemy makes an attack against an ally within 5m of you, then as a Reflexive Action, you may increase that ally’s Defence and Resilience by +Rank against that attack.</p>',
      },
    ],
    wargear: wargearz('Bolter, Power Axe, Bolt Pistol, Mono Knife, Ionclad Carapace Armour, 3 frag grenade, 3 krak grenade'),
  },
  {
    name: 'Ancestor Lord',
    ...archetype(source.aaoa.key, 87, 'The Squat Remnant', 'Ancestor Lord', 4,'aaoa/Saquat'),
    ...costz(182,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    factionKey: 'aaoa-the-squat-remnant',
    hint: 'Ancient sages, wise enough to tap into the Warp with care and listen to the voices of the dead.',
    keywords: 'Squat [League], Psyker',
    influence: 4,
    archetypeFeatures: [
      {
        name: 'Psychic Protector',
        description:
          '<p>You are a Psyker; you know the <strong>Smite</strong> psychic power and may learn other powers from the <strong>Telekinesis</strong> and <strong>Ancestral Rites</strong> disciplines.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
        ],
        psychicDisciplines: [
          'Minor',
          'Telekinesis',
          'Universal',
          'Ancestral Rites',
        ],
      },
    ],
    wargearString: 'Ionclad Carapace armour, ancestor’s robes (clothing), Master-Crafted Force Rod, Master-Crafted Bolt Pistol.',
    wargear: [
      { name: 'Ionclad Carapace Armour' },
      { name: 'Clothing', variant: 'Ancestor’s robes' },
      { name: 'Force Rod (MC)', variant: 'Master-Crafted Force Rod' },
      { name: 'Bolt Pistol (MC)', variant: 'Master-Crafted Bolt Pistol' },
    ],
  },
];

const aaoaAdeptusArbites = [
  {
    name: 'Arbitrator',
    ...archetype(source.aaoa.key, 45, 'Adeptus Arbites', 'Arbitrator', 2, 'Human'),
    ...costz(58, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.INVESTIGATION, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'An armoured enforcer of the Emperor’s Law, unyielding in their devotion',
    keywords: 'Imperium,Adeptus Arbites',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('I am the Law!',
        'When you attempt an Intimidation interaction attack, you may affect up to Double Rank targets at once. Add +Rank bonus dice if you’re attacking enemies who possess the SCUM keyword.'),
    ],
    wargearString: 'Arbites Carapace, combat shotgun or shock maul and suppression shield, magnacles, Book of Judgement (abridged).',
    wargear: [
      { name: 'Arbites Carapace' },
      {
        name: 'combat shotgun or shock maul and suppression shield',
        selected: '',
        options: [
          { name: 'Combat Shotgun' },
          { name: 'Shock Maul and Spression Shield' },
        ],
      },
      { name: 'Magnacles' },
      { name: 'Book of Judgement (abridged)' },
    ],
  },
  {
    name: 'Magistrate',
    ...archetype(source.aaoa.key, 51, 'Adeptus Arbites', 'Magistrate', 2, 'Human'),
    ...costz(70, [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.INSIGHT, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.INVESTIGATION, 2),
      reqSkill(SKILLS.SCHOLAR, 2),
    ]),
    hint: 'A scholar of the Law, passing judgement upon the guilty',
    keywords: 'Imperium,Adeptus Arbites',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Cast Judgement',
        'Add +Rank bonus dice when you make an Intimidation test—including an interaction attack—to coerce or subdue someone. Increase that to Double Rank bonus dice your target possess the SCUM keyword.'),
    ],
    wargearString: 'Flak coat, stubber, auto-quill, Data-Slate, Book of Judgement (abridged)',
    wargear: [
      { name: 'Flak Coat' },
      { name: 'Auto-Quill' },
      { name: 'Data-Slate' },
      { name: 'Book of Judgement (abridged)' },
    ],
  },
  {
    name: 'Chastener',
    ...archetype(source.aaoa.key, 65, 'Adeptus Arbites', 'Chastener', 3, 'Human'),
    ...costz(110, [
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.CUNNING, 1),
      reqSkill(SKILLS.INSIGHT, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
      reqSkill(SKILLS.MEDICAE, 1),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'A dogged pursuer of those who would flee the Emperor’s judgement',
    keywords: 'Imperium,Adeptus Arbites',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Subdue and Interrogate',
        'You add +Rank bonus dice to all Intimidation and Insight tests during an interrogation. In addition, when you make an attack with an Agonizing weapon and your target exceeds their Max Wounds as a result, you may choose for them to become unconscious (unable to take further action, unaware of their surroundings) rather than dying.'),
    ],
    wargear: wargearz('Arbites Carapace, Shock Maul, Combat Shotgun, magnacles, medkit, Book of Law/Book of Law (abridged)'),
  },
  {
    name: 'Detective',
    ...archetype(source.aaoa.key, 68, 'Adeptus Arbites', 'Detective', 3, 'Human'),
    ...costz(108, [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.CUNNING, 2),
      reqSkill(SKILLS.DECEPTION, 2),
      reqSkill(SKILLS.INVESTIGATION, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 2),
    ]),
    hint: 'A specialised investigator, assigned to solve more complex crimes',
    keywords: 'Imperium,Adeptus Arbites',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Undercover Agent',
        'You gain +Rank bonus dice on all Deception tests make to disguise yourself or present yourself as someone else. In addition, you may spend an Exalted Icon from a Deception test to grant yourself the use of a Keyword which you don’t normally possess. This keyword must relate to your current disguise or alias.'),
    ],
    wargearString: 'Flak coat, combi-tool, any one ranged weapon of uncommon or lower rarity, knife, auspex, three sets of clothing for use in disguises, symbol of authority, vox caster.',
    wargear: [
      { name: 'Flak coat' },
      { name: 'combi-tool' },
      {
        name: 'any one ranged weapon of uncommon or lower rarity',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common','Uncommon'],
            typeFilter: ['Ranged Weapon'],
          },
        ],
      },
      { name: 'Knife' },
      { name: 'Auspex' },
      { name: 'three sets of clothing for use in disguises' },
      { name: 'symbol of authority' },
      { name: 'vox caster' },
    ],
  },
  {
    name: 'Verispex Adept',
    ...archetype(source.aaoa.key, 84, 'Adeptus Arbites', 'Verispex Adept', 3, 'Human'),
    ...costz(107, [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.INVESTIGATION, 3),
      reqSkill(SKILLS.TECH, 2),
    ]),
    hint: 'A technician who studies the scenes of crimes to uncover evidence',
    keywords: 'Imperium, Adeptus Arbites, Adeptus Mechanicus',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Crime Scene Investigation',
        'You have seen enough crime scenes that you can quickly identify common patterns. When you shift one or more Exalted Icons on an Investigate test, you count as having shifted +Rank additional Exalted Icons (this doesn’t affect whether you pass or fail, just the number of extra benefits you get from shifting).'),
    ],
    wargear: wargearz('Bodyglove, clothing, Laspistol, knife, Auspex, data-slate, Preysense goggles, Memorance Implant'),
  },
];

const aaoaAstraMilitarum = [
  {
    name: 'Beastman Auxiliary',
    ...archetype(source.aaoa.key, 33, 'Astra Militarum', 'Beastman Auxiliary', 1, 'aaoa/Beastman'),
    ...costz(28, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqSkill(SKILLS.ATHLETICS, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'You have been drafted to serve alongside Astra Militarum forces as an auxiliary.',
    keywords: 'Imperium,Astra Militarum,[Regiment]',
    influence: 0,
    archetypeFeatures: [
      {
        ...simpleAbility('Bestial Zealotry','When you are able to see an enemy (either an obvious foe, or a creature identified as an enemy by an ally or superior), you add +Rank to your Resolve, and add +Rank bonus dice to any melee attacks you make when you charge.'),
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when you can see your enemy.' },
          // XXX { targetGroup: 'combat', targetValue: 'meleeAttacks', modifier: 0, rank: 1, condition: 'when you can see charge.' },
        ],
      }
    ],
    wargearString: 'Two melee weapons each of Value 3 or less of up to Common rarity, primitive armour',
    wargear: [
      { name: 'Primitive Armour' },
      {
        name: 'Common Melee Weapon up to value 3',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
            typeFilter: ['Melee Weapon'],
            rarityFilter: ['Common'],
          },
        ],
      },
      {
        name: 'Common Melee Weapon up to value 3',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
            typeFilter: ['Melee Weapon'],
            rarityFilter: ['Common'],
          },
        ],
      },
    ],
  },
  {
    name: 'Imperial Guard Medic',
    ...archetype(source.aaoa.key, 36, 'Astra Militarum', 'Imperial Guard Medic', 1, 'Human'),
    ...costz(22, [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.MEDICAE, 2),
    ]),
    hint: 'A disciplined soldier trained to treat the injuries of their comrades.',
    keywords: 'Imperium,Astra Militarum,[Regiment]',
    influence: 0,
    archetypeFeatures: [
      {
        ...simpleAbility('Field Medic','When you make a Medicae test during combat on a Dying character, +Double Rank bonus dice.'),
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.MEDICAE, modifier: 0, rank: 2, condition: 'when treating a Dying character.' },
        ],
      },
    ],
    wargear: wargearz(
      'Flak armour, Lasgun, knife, Munitorum-Issue Mess Kit/guard issue mess kit, blanket, grooming kit, Uplifting Primer, 3 ration pack, medikit'),
  },
  {
    name: 'Imperial Guard Officer',
    ...archetype(source.aaoa.key, 37, 'Astra Militarum', 'Imperial Guard Officer', 1, 'Human'),
    ...costz(22,[
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.LEADERSHIP, 2),
    ]),
    hint: 'A stern commander trained to inspire and lead others into the fray.',
    keywords: 'Imperium,Astra Militarum,[Regiment],Officer',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Voice of Command',
        description:
          '<p>An Officer may spend an action giving an order to a character with the Astra Militarum keyword who is within hearing range and subordinate to the officer. This requires a Leadership test (DN 3). A successful test allows the ordered character to gain one of the following benefits (Officer’s choice, see pg. 37) on their next turn:</p>' +
          '<ul>' +
          '<li>The ally may re-roll Double Rank dice on their next aimed ranged attack.</li>' +
          '<li>The officer chooses a single enemy, and the ally adds +Rank ED to their next ranged attack against that target..</li>' +
          '<li>The ally may shoot as part of a run action as if their weapon had the Assault trait.</li>' +
          '<li>The ally adds +Rank to their Speed if they Run or Sprint in their next turn.</li>' +
          '<li>The ally adds +Rank bonus dice to their next melee attack.</li>' +
          '</ul>' +
          '<p>An officer may issue orders to multiple characters, adding +2 to the DN of the leadership test for each character after the first being orders. All character ordered must receive the same benefit.</p>'
      },
    ],
    wargear: wargearz('Flak armour, Refractor Field, Laspistol, chainsword, knife, Munitorum-Issue Mess Kit/guard issue mess kit, blanket, grooming kit, Uplifting Primer, 3 ration packs'),
  },
];

const aaoaPrimarisAstartes = [
  {
    ...archetype(source.aaoa.key, 100, 'Adeptus Astartes', 'Primaris Hellblaster',  4, 'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A specialised warrior, armed with sophisticated, powerful weapons to deal with the toughest foes.',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Hellblaster Focus: When you make an attack with a Plasma weapon, you may re-roll up to Double Rank dice.'),
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Plasma Incinerator, Heavy Bolt Pistol, Astartes Combat Knife, 3 frag grenade, 3 krak grenade'),
  },
  {
    ...archetype(source.aaoa.key, 101, 'Adeptus Astartes', 'Primaris Inceptor', 4,'Primaris Astartes'),
    ...costz(230,[
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.PILOT, 1),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'An airborne warrior, dealing death from above.',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Meteoric Descent','You run, sprint, or charge using your jump pack, any enemy within 2m of the point where you landed must pass an Agility test (DN 2+Rank) or be knocked prone and suffer a Mortal Wound.'),
      simpleAbility('Guns Blazing','When you wield a pair of Assault Bolters or Plasma Exterminators, you may benefit from the Dual Wield or Simultaneous Strike talents even though those weapons lack the Pistol trait.'),
    ],
    wargearString:
      'Mark X Gravis Power Armour, Jump Pack, Grav-Chute, two Assault Bolters or two Plasma Exterminators.',
    wargear: [
      { name: 'Gravis Mark X' },
      { name: 'Jump Pack' },
      { name: 'Grav-Chute' },
      {
        name: 'Choose either two Assault Bolters or two Plasma Exterminators',
        selected: '',
        options: [
          { name: 'Two Assault Bolters' },
          { name: 'Two Plasma Exterminators' },
        ],
      },
    ],
  },
  {
    ...archetype(source.aaoa.key, 104,  'Adeptus Astartes', 'Primaris Reiver', 4,'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A cunning warrior, spreading death and terror to the enemy.',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Terror Troops', 'When you charge an enemy who was unaware of you before you charged, they must make a Fear test with a DN equal to your Stealth Score.'),
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
    ...archetype(source.aaoa.key, 102, 'Adeptus Astartes', 'Primaris Incursor',  4,'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'Aggressive, close-assault shock troops, wearing advanced sensors that expose enemies.',
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
    ...archetype(source.aaoa.key, 103,  'Adeptus Astartes', 'Primaris Vanguard Infiltrator', 4,'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'Saboteurs and marksmen, used to operating far from support',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    archetypeFeatures: [
      simpleAbility('Voxbane: When you make a Tech interaction attack against an enemy, the range of the attack is increased by 1+Double Rank.'),
    ],
    influence: 1,
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
    ...archetype(source.aaoa.key, 98, 'Adeptus Astartes', 'Primaris Aggressor', 4,'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A mighty warrior, overwhelming foes at close range.',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Relentless Advance: When you Run, you ignore the DN increase for firing an Assault weapon as part of your move.'),
      simpleAbility('Fire Storm: When you make a ranged attack and do not move during your turn, you increase the Salvo of your weapons by +Rank. In addition, when you wield a pair of Auto Boltstorm Gauntlets or Flamestorm Gauntlets, you may benefit from the Dual Wield or Simultaneous Strike talents even though those weapons lack the Pistol trait.'),
    ],
    wargearString:
      'Mark X Gravis Power Armour, ammunition backpack, Ballistic Appeasement Autoreliquary, and either: Fragstorm Grenade Launcher and 2 Auto Boltstorm Gauntlets or 2 Flamestorm Gauntlets.',
    wargear: [
      { name: 'Gravis Mark X' },
      { name: 'Ammunition Backpack' },
      { name: 'Ballistic Appeasement Autoreliquary' },
      { name: 'Fragstorm grenade launcher' },
      {
        options: [
          { name: 'Auto-Boltstorm Gauntlet', variant: 'Paried Auto Boltstorm Gauntlets' },
          { name: 'Flamestorm Gauntlets', variant: 'Paried Flamestorm Gauntlets' },
        ],
      }
    ],
  },
  {
    ...archetype(source.aaoa.key, 99, 'Adeptus Astartes', 'Primaris Vanguard Eliminator', 4,'Primaris Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A mighty warrior, executing foes at long range.',
    keywords: 'Imperium,Adeptus Astartes,Primaris,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Precision Shots: When you aim, you add +Rank bonus dice onto the following ranged attack, in addition to the other benefits of aiming.'),
    ],
    wargearString:
      'Mark X Phobos Power Armour, Cameleoline Cloak, Preysense Goggle, Bolt Pistol, Astartes Combat Knife, 3 Frag Grenades, 3 Krak Grenades, and either: a Bolt Sniper Rifle or a Las Fusil.',
    wargear: [
      { name: 'Phobos Mark X' },
      { name: 'Cameleoline Cloak' },
      { name: 'Preysense Goggle' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', ammount: 3 },
      { name: 'Krak Grenade', ammount: 3 },
      {
        name: 'Chose either a Bolt Sniper Rifle or a Las Fusil',
        selected: '',
        options: [
          { name: 'Bolt Sniper Rifle' },
          { name: 'Las Fusil' },
        ],
      }
    ],
  },
  {
    ...archetype(source.aaoa.key, 60,'Adeptus Astartes','Primaris Apothecary',4,'Primaris Astartes'),
    ...costz(294, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.MEDICAE, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A warrior-healer, guardian of his brothers’ lives.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter],Primaris',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Guard Thy Brethren: Whenever you succeed at a Medicae test upon a Dying ally with the ADEPTUS ASTARTES keyword, gain 1 Wrath. In addition, you gain +Rank to Resolve and Determination while you can see or hear one or more Dying Adeptus Astartes allies.'),
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus Power Armour, Absolvor Bolt Pistol, Narthecium, Reductor, 3 Frag Grenade, 3 Krak Grenade'),
  },
  {
    ...archetype(source.aaoa.key, 108,  'Adeptus Astartes', 'Primaris Techmarine', 4,'Primaris Techmarine'),
    ...costz(403, [
      reqAttribute(ATTRIBUTES.STRENGTH, 6),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.PILOT, 2),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.TECH, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A warrior-savant initiated into the mysteries of the Machine Cult.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Adeptus Mechanicus, Cult Mechanicus, Primaris',
    archetypeFeatures: [
      simpleAbility('Rite of Repair: You receive +Double Rank to Tech tests to repair damaged machinery. All Tech tests you make take half the standard time..'),
    ],
    influence: 2,
    wargearString:
      'Artificer Armour, Heavy Bolt Pistol, Omnissian Axe, Heavy Bolter, 3 Frag Grenades, 3 Krak Grenades, Augmetic Servo-arm, and any 2 augmetics.',
    wargear: [
      { name: 'Artificer Armour' },
      { name: 'Heavy Bolt Pistol' },
      { name: 'Omnissian Axe' },
      { name: 'Heavy Bolter' },
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
    ...archetype(source.aaoa.key, 106,'Adeptus Astartes','Primaris Chaplain',5,'Primaris Astartes'),
    ...costz(384,[
      reqAttribute(ATTRIBUTES.STRENGTH, 6),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'A devout warrior, who tends to the spirits of his comrades.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter],Primaris,Priest',
    influence: 3,
    archetypeFeatures: [
      simpleAbility('Spiritual Leaders', 'You, and all allies with the IMPERIUM keyword within 15+Rank metres add +Rank to Resolve. This increases to +Double Rank if they share your [CHAPTER] keyword.'),
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus power armour, Absolver Bolt Pistol, Crozius Arcanum, 3 Frag Grenade, 3 Krak Grenade, Rosarius'),
  },
  {
    ...archetype(source.aaoa.key, 107, 'Adeptus Astartes', 'Primaris Librarian', 5,'Primaris Astartes'),
    ...costz(375,[
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 6),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.INTIMIDATION, 1),
      reqSkill(SKILLS.LEADERSHIP, 1),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A warrior-sage of the Adeptus Astartes.',
    keywords: 'Imperium, Adeptus Astartes, [Chapter], Psyker',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You know the Smite psychic power.',
        description:
          '<p>You are a psyker; you know the Smite psychic power.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          //{ name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
      },
      {
        name: 'Unlock Disciplines',
        snippet: 'You gain access to the Minor and Universal Disciplines. You unlock an addtional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum, Librarius, or a discipline unique to your Chapter',
        description: '<p>You gain access to the Minor and Universal Disciplines. You unlock an additional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum, Librarius, or a discipline unique to your Chapter.</p>',
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
          { key: 'aaoa-librarius', name: 'Librarius', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Librarius' }] },
          // TODO Chapter Disciplines
        ],
        psychicDisciplines: [
          'Minor',
          'Universal',
        ],
      },
    ],
    wargear: wargearz('Tacticus Mk X/Mark X Tacticus power armour, Heavy Bolt Pistol, Force Sword, 3 Frag Grenade, 3 Krak Grenade, Psychic Hood'),
  },
];

const aaoaAdeptusAstartes = [
  {
    ...archetype(source.aaoa.key, 61, 'Adeptus Astartes', 'Assault Space Marine',3, 'Adeptus Astartes'),
    ...costz(270, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.PILOT, 4),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A deadly shock trooper, taking the fight to the enemy.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Hammer of Wrath',
        description:
          '<p>When you charge into melee using your jump pack, all enemies 2 metres of the point where you land must pass an Agility test (DN 2 +Rank) or be knocked <em>Prone</em>.</p>',
      },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Chainsword, Jump Pack, 3 Frag Grenade, 3 Krak Grenade'),
  },
  {
    ...archetype(source.aaoa.key, 69, 'Adeptus Astartes', 'Devastator Space Marine', 3, 'Adeptus Astartes'),
    ...costz(270, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A ruthless heavy weapons specialist, delivering death at a distance.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter]',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Unrelenting Devastation',
        description:
          'When you sacrifice your Move to Brace a Heavy weapon, you may add +Rank bonus dice to all attacks with that weapon, and +Rank ED to that weapon’s damage.',
      },
    ],
    wargearString:
      'Aquila Power Armour, Bolt Pistol, Astartes combat knife, 3 Frag Grenades, 3 Krak Grenades, ammunition backpack, and one heavy weapon from the following list: heavy bolter, missile launcher with 6 frag and 6 krak missiles, lascannon, multi-melta, plasma cannon, or grav-cannon.',
    wargear: [
      { name: 'Aquila Mk VII' },
      { name: 'Bolt Pistol' },
      { name: 'Astartes Combat Knife' },
      { name: 'Frag Grenade', amount: 3 },
      { name: 'Krak Grenade', amount: 3 },
      { name: 'Ammunition backpack' },
      {
        name: 'One of the following heavy weapons: heavy bolter, missile launcher with 6 frag and 6 krak missiles, lascannon, multi-melta, plasma cannon, or grav-cannon.',
        options: [
          { name: 'Heavy Bolter' },
          { name: 'Missile Launcher' },
          { name: 'Lascannon' },
          { name: 'Multi-Melta' },
          { name: 'Plasma Cannon' },
          { name: 'Grav-cannon' },
        ]
      }
    ],
  },
  {
    ...archetype(source.aaoa.key, 92, 'Adeptus Astartes', 'Grey Knight', 4, 'Adeptus Astartes'),
    ...costz(340,[
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 5),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ]),
    hint: 'A member of a secretive order of elite psychic daemon-hunters',
    keywords: 'Imperium,Adeptus Astartes,Grey Knights,Psyker,Inquisition, Ordo Malleus',
    influence: 1,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You are a Psyker; you begin play with the Rites of Banishment psychic power. You may purchase additional powers from the Sanctic discipline.',
        description:
          '<p>A Grey Knight begins play with the Rites of Banishment psychic power. You may purchase additional powers from the Sanctic discipline.</p>',
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
    ...archetype(source.aaoa.key, 60, 'Adeptus Astartes', 'Apothecary', 3, 'Adeptus Astartes'),
    ...costz(276, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.MEDICAE, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A warrior-healer, guardian of his brothers’ lives.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter]',
    influence: 2,
    archetypeFeatures: [
      simpleAbility('Guard Thy Brethren: Whenever you succeed at a Medicae test upon a Dying ally with the ADEPTUS ASTARTES keyword, gain 1 Wrath. In addition, you gain +Rank to Resolve and Determination while you can see or hear one or more Dying Adeptus Astartes allies.'),
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Chainsword, Narthecium, Reductor, 3 Frag Grenade, 3 Krak Grenade'),
  },
  {
    ...archetype(source.aaoa.key, 108,  'Adeptus Astartes', 'Techmarine',3, 'Adeptus Astartes'),
    ...costz(329, [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.PILOT, 2),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.TECH, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A warrior-savant initiated into the mysteries of the Machine Cult.',
    keywords: 'Imperium, Adeptus Astartes,[Chapter], Adeptus Mechanicus, Cult Mechanicus',
    archetypeFeatures: [
      simpleAbility('Rite of Repair: You receive +Double Rank to Tech tests to repair damaged machinery. All Tech tests you make take half the standard time.'),
    ],
    wargearString:
      'Artificer Armour, Bolt Pistol, Omnissian Axe, 3 Frag Grenades, 3 Krak Grenades, Augmetic Servo-arm, and any 2 augmetics.',
    influence: 2,
    wargear: [
      { name: 'Artificer Armour' },
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
    ...archetype(source.aaoa.key, 106,'Adeptus Astartes','Space Marine Chaplain',4,'Adeptus Astartes'),
    ...costz(312,[
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.INTIMIDATION, 2),
      reqSkill(SKILLS.LEADERSHIP, 1),
      reqSkill(SKILLS.PERSUASION, 4),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A devout warrior, who tends to the spirits of his comrades.',
    keywords: 'Imperium,Adeptus Astartes,[Chapter],Priest',
    influence: 3,
    archetypeFeatures: [
      simpleAbility('Spiritual Leaders', 'You, and all allies with the IMPERIUM keyword within 15+Rank metres add +Rank to Resolve. This increases to +Double Rank if they share your [CHAPTER] keyword.'),
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Crozius Arcanum, 3 Frag Grenade, 3 Krak Grenade, Rosarius'),
  },
  {
    ...archetype(source.aaoa.key, 107, 'Adeptus Astartes', 'Space Marine Librarian', 4,'Adeptus Astartes'),
    ...costz(367,[
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.WILLPOWER, 6),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.LEADERSHIP, 1),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    hint: 'A warrior-sage of the Adeptus Astartes.',
    keywords: 'Imperium, Adeptus Astartes, [Chapter], Psyker',
    influence: 2,
    archetypeFeatures: [
      {
        name: 'Psyker',
        snippet: 'You know the Smite psychic power.',
        description:
          '<p>You are a psyker; you know the Smite psychic power.</p>',
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          //{ name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
      },
      {
        name: 'Unlock Disciplines',
        snippet: 'You gain access to the Minor and Universal Disciplines. You unlock an addtional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum, Librarius, or a discipline unique to your Chapter',
        description: '<p>You gain access to the Minor and Universal Disciplines. You unlock an additional single Psychic Discipline: Divination, Pyromancy, Telekinesis, Telepathy, Maleficarum, Librarius, or a discipline unique to your Chapter.</p>',
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
          { key: 'aaoa-librarius', name: 'Librarius', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Librarius' }] },
          // TODO Chapter Disciplines
        ],
        psychicDisciplines: [
          'Minor',
          'Universal',
        ],
      },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Bolt Pistol, Force Staff, 3 Frag Grenade, 3 Krak Grenade, Psychic Hood'),
  },
  ...aaoaPrimarisAstartes,
];

const aaoaOfficioAssassinorum = [
  {
    name: 'Callidus Assassin',
    ...archetype(source.aaoa.key, 109,'Officio Assassinorum','Callidus Assassin',5,'Human'),
    ...costz(308,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.DECEPTION, 4),
      reqSkill(SKILLS.INSIGHT, 4),
      reqSkill(SKILLS.MEDICAE, 1),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.PILOT, 1),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 4),
      reqSkill(SKILLS.SURVIVAL, 2),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    factionKey: 'aaoa-officio-assassinorum',
    hint: 'The second skinned assassin.',
    keywords: 'Imperium,Officio Assassinorum,Templum Callidus',
    archetypeFeatures: [
      {
        name: 'Assassinorum Conditioning',
        snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
        description:
          '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
      },
      {
        name: 'Betrayal’s Blade',
        snippet: 'When disguised or otherwise concealing your identity, you gain a Stealth Score based on the total of your Deception test. This score only decreases when you take actions which may reveal your true intentions (GM’s discretion).',
        description:
          '<p>When disguised or otherwise concealing your identity, you gain a Stealth Score based on the total of your Deception test. This score only decreases when you take actions which may reveal your true intentions (GM’s discretion).</p>',
      },
    ],
    influence: 0,
    wargear: wargearz('C’Tan Phase Sword, Neural Shredder, 2 Polymorphine, 3 poisoned mono-knive, bodyglove'),
  },
  {
    name: 'Culexus Assassin',
    ...archetype(source.aaoa.key, 110,'Officio Assassinorum','Culexus Assassin',5,'aaoa/Pariah'),
    ...costz(308,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.MEDICAE, 1),
      reqSkill(SKILLS.PILOT, 1),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 4),
      reqSkill(SKILLS.SURVIVAL, 3),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    factionKey: 'aaoa-officio-assassinorum',
    hint: 'Witch-slayer, wyrd-bane, living nightmare to all psykers.',
    keywords: 'Imperium,Officio Assassinorum,Templum Culexus',
    archetypeFeatures: [
      {
        name: 'Assassinorum Conditioning',
        snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
        description:
          '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
      },
      {
        name: 'Life Drain',
        snippet: 'Enemies engaged with you at the end of their turn must pass a Willpower test (DN 2+Rank) or suffer Shock equal to your Rank. PSYKERS suffer Double Rank shock damage instead.',
        description:
          '<p>Enemies engaged with you at the end of their turn must pass a Willpower test (DN 2+Rank) or suffer Shock equal to your Rank. PSYKERS suffer Shock equal to twice your Rank instead.</p>',
      },
    ],
    influence: 0,
    wargear: wargearz('Etherium, Force Matrix, Animus Speculum, 3 Psyk-Out Grenade, Bodyglove'),
    description:
      '<p><strong>You are anathema, witch-bane, wyrdslayer, psychic abomination. Your foes dread your presence, desperately hoping that you are a nightmarish figment, for their minds cannot bear to acknowledge the abyss within your soul.</strong></p>' +
      '<p>The Culexus Assassins are the most sinister, feared, and hated of all Imperial Assassins. They are null-entities in the warp, and their unnatural lack of a presence inspiring a sense of unease even in non-psykers. To psykers their mere presence is terrifying, invoking panic. In the confusion caused by this fear, the assassin can move in on its target and eliminate them. To purely psychic entities like daemons, they are nigh-invisible at best, akin to trying to see a black hole amidst the inky void of space.</p>' +
      '<p>The Culexus Assassins possess the "Pariah Gene", making them for all intents, "soulless," accounting for their lack of warp-presence. This gene manifests itself very rarely, in a single individual among a billion, or more. This extreme rarity, coupled with the inevitable losses during training, makes the Culexus assassins the rarest of all Imperial assassins. The Culexus temple is known to hunt down and recruit these Pariahs but also to vat-grow them, an arduous and complex process that produces only a few viable candidates a year.</p>',
  },
  {
    name: 'Eversor Assassin',
    ...archetype(source.aaoa.key, 111,'Officio Assassinorum','Eversor Assassin',5,'Human'),
    ...costz(308,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.MEDICAE, 1),
      reqSkill(SKILLS.PILOT, 1),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.STEALTH, 4),
      reqSkill(SKILLS.SURVIVAL, 3),
      reqSkill(SKILLS.TECH, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ]),
    factionKey: 'aaoa-officio-assassinorum',
    hint: 'Hunter, killer, bane.',
    keywords: 'Imperium,Officio Assassinorum,Templum Eversor',
    archetypeFeatures: [
      {
        name: 'Assassinorum Conditioning',
        snippet: 'You add +Rank ED to all damage rolls and +Double Rank to damage value of unarmed strikes. You may substitute Agility for Toughness for Determination. You may roll Determination against Mortal Wounds.',
        description:
          '<p>You add +Rank ED to all damage rolls, and you add +Double Rank to the damage value of your Unarmed Strikes. In addition, so long as you are not immobilised or Restrained, you may use Agility instead of Toughness when you roll Determination, and you may roll Determination against Mortal Wounds.</p>',
      },
      {
        name: 'Alchemical Metabolism',
        snippet: 'When you suffer one or more Wounds in melee, roll 1d6; on a 4+, the attacker suffers a Mortal Wound. If you are killed, you detonate, inflicting 10+4ED damage with AP-2 to everything within a number of metres equal to your Toughness.',
        description:
          '<p>When you suffer one or more Wounds in melee, roll 1d6; on a 4+, the attacker suffers a Mortal Wound. If you are killed, you detonate, inflicting 10+4ED damage with AP-2 to everything within a number of metres equal to your Toughness.</p>',
      },
    ],
    influence: 0,
    wargear: wargearz('Augmetic viscera, cardioproxy, reflex catalyst, sinew armature, executor pistol, sentinel array, neuro-gauntlet, power sword, 2 melta bomb, Eversor combat drugs, Bodyglove'),
  },
  {
    name: 'Vindicare Assassin',
    ...archetype(source.aaoa.key, 116,'Officio Assassinorum','Vindicare Assassin',5,'Human',true),
    factionKey: 'aaoa-officio-assassinorum',
  },
];

const aaoaAdeptusMinistorum=  [
  {
    name: 'Frateris Militia',
    ...archetype(source.aaoa.key, 34,  'Adeptus Ministorum', 'Frateris Militia', 1, 'Human'),
    ...costz(6, [
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 1),
      // or reqSkill(SKILLS.WEAPON_SKILL, 1),
    ]),
    hint: 'A faithful citizen whipped into a fervour and eager to slay in the Emperor’s name.',
    keywords: 'Imperium',
    influence: 0,
    archetypeFeatures: [
      {
        ...simpleAbility('Fevour', 'When within hearing range of a character with the ADEPTUS MINISTORUM keyword, you increase your Resolve by +Rank. In addition, if that Adeptus Ministorum character has suffered any wounds during the current scene, your Determination is increased by +Rank while you remain within 10 metres of them.'),
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when in hearing range of another ADEPTUS MINISTORUM character.' },
          { targetGroup: 'traits', targetValue: TRAITS.DETERMINATION, modifier: 0, rank: 1, condition: 'when an ADEPTUS MINISTORUM character within hearing range suffere any wound during this combat and you are witin 10m.' },
          // XXX { targetGroup: 'combat', targetValue: 'meleeAttacks', modifier: 0, rank: 1, condition: 'when you can see charge.' },
        ],
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
    name: 'Confessor',
    ...archetype(source.aaoa.key, 66, 'Adeptus Ministorum', 'Confessor', 3, 'Human'),
    ...costz(84, [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
      reqSkill(SKILLS.PERSUASION, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
    ]),
    hint: 'A high-ranking priest whose rhetoric inspires zeal and piety wherever they go.',
    keywords: 'Imperium,Adeptus Ministorum,Priest',
    influence: 3,
    archetypeFeatures: [
      {
        name: 'Incite Zeal',
        description:
          '<p>You add +Double Rank to all Persuasion Interaction attacks against targets with the IMPERIUM, SCUM, or HERETIC keywords. In addition, you may spend a Wrath point to make yourself Frenzied; If you do so, then you may make all allies with the IMPERIUM keyword within 15+Double Rank metres Frenzied as well.</p>'
      },
    ],
    wargearString: 'Laspistol, one melee weapon or one ranged weapon of up to Value 7 and a rarity of up to Rare, Rosarius, knife, clothing (Ministorum robes), missionary kit, symbol of authority.',
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
];

const aaoaAdeptaSororitas = [
  {
    name: 'Sister Dialogus',
    ...archetype(source.aaoa.key, 40, 'Adepta Sororitas', 'Sister Dialogus', 1, 'Human'),
    ...costz(24, [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.PERSUASION, 1),
      reqSkill(SKILLS.SCHOLAR, 1),
    ]),
    hint: 'A devout scholar of language, ensuring that the Emperor’s Word is understood by all.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    influence: 1,
    archetypeFeatures: [
      {
        ...simpleAbility('Sanctified Linguist','You add +Rank bonus dice on Scholar tests relating to language, and you know Double Rank additional languages. You also gain +Rank Conviction.'),
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.SCHOLAR, modifier: 0, rank: 1, condition: 'when related to language' },
          { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 0, rank: 1 },
        ],
      },
    ],
    wargearString: 'Sororitas power armour, bolt pistol, copy of the Rule of the Sororitas, collection of reference texts, vox caster, laud hailer.',
    wargear: [
      { name: 'Sororitas power armour' },
      { name: 'Bolt Pistol' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
      { name: 'collection of reference texts' },
      { name: 'vox caster' },
      { name: 'laud hailer' },
    ],
  },
  {
    name: 'Sister Famulous',
    ...archetype(source.aaoa.key, 23, 'Adepta Sororitas', 'Sister Famulous', 1, 'Human'),
    ...costz(28, [
      reqAttribute(ATTRIBUTES.INTELLECT, 2),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.LEADERSHIP, 1),
      reqSkill(SKILLS.PERSUASION, 1),
    ]),
    hint: 'A pious advisor to those of noble birth and ancient bloodlines.',
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
    influence: 1,
    archetypeFeatures: [
      {
        ...simpleAbility('Spiritual Advisor','You add +Rank bonus dice to Leadership and Persuasion tests when interacting with the Nobility of the Imperium. You also add +Rank to your Conviction.'),
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 1, condition: 'when interacting with imperial nobility.' },
          { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when interacting with imperial nobility.' },
          { targetGroup: 'traits', targetValue: TRAITS.CONVICTION, modifier: 0, rank: 1 },
        ],
      },
    ],
    wargearString: 'Formal Sororitas Robes (clothing), bodyglove, Laspistol, Mono Knife, Chaplet Ecclesiasticus, copy of Rule of the Sororitas.',
    wargear: [
      { name: 'Laspistol' },
      { name: 'Bodyglove' },
      { name: 'Clothing', variant: 'Formal Sororitas Robes' },
      { name: 'Mono Knife' },
      { name: 'Chaplet Ecclesiasticus' },
      { name: 'Rule Of The Sororitas', variant: 'Copy of the Rule Of The Sororitas' },
    ],
  },
  {
    name: 'Sister Seraphim',
    ...archetype(source.aaoa2.key, 24, 'Adepta Sororitas', 'Sister Seraphim', 3, 'Human'),
    ...costz(55, [ /* TODO */]),
    hint: 'An elite and zealous warrior, faithful even compared to other Sisters of Battle.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.PILOT, 4),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
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
    name: 'Sister Repentia',
    ...archetype(source.aaoa2.key, 24, 'Adepta Sororitas', 'Sister Repentia', 2, 'Human'),
    ...costz(40, [ /* TODO */]),
    hint: 'A penitent soul, seeking atonement for her sins through death and pain.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ],
    keywords: 'Imperium,Adeptus Ministorum,Adepta Sororitas,[Order]',
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
];

const aaoaAdeptusMechanicus = [
  {
    name: 'Corpuscarii Electro-Priest',
    ...archetype(source.aaoa.key, 49, 'Adeptus Mechanicus', 'Corpuscarii Electro-Priest', 2, 'Human'),
    ...costz(46,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 1),
    ]),
    hint: 'Devotee of the Motive Force that flows through the universe.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 0,
    archetypeFeatures: [
      simpleAbility('Fanatical Devotion', 'You add +Double Rank bonus dice to Determination rolls, and you do not suffer any Shock when you roll Determination.'),
    ],
    wargearString: 'Luminen capacitor, electrostatic gauntlets, Voltagheist field generator, any two augmetics.',
    wargear: [
      { name: 'Luminen capacitor' },
      { name: 'electrostatic gauntlets' },
      { name: 'Voltagheist field generator' },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    name: 'Fulgurite Electro-Priest',
    ...archetype(source.aaoa.key, 50, 'Adeptus Mechanicus', 'Fulgurite Electro-Priest', 2, 'Human'),
    ...costz(50,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'Devotee of the Motive Force that flows through the universe.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 0,
    archetypeFeatures: [
      simpleAbility('Fanatical Devotion', 'You add +Double Rank bonus dice to Determination rolls, and you do not suffer any Shock when you roll Determination.'),
    ],
    wargearString: 'Luminen capacitor, electroleech staff, Voltagheist field generator, any two augmetics.',
    wargear: [
      { name: 'Luminen capacitor' },
      { name: 'electroleech staff' },
      { name: 'Voltagheist field generator' },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    name: 'Skitarius Vanguard',
    ...archetype(source.aaoa.key, 57, 'Adeptus Mechanicus', 'Skitarius Vanguard', 2, 'Human'),
    ...costz(28,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.TECH, 1),
    ]),
    hint: 'Devotee of the Motive Force that flows through the universe.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 0,
    archetypeFeatures: [
      simpleAbility('Irradiated and Augmented','You do not bleed (making you immune to Bleeding), and gain +Rank bonus dice to Determination rolls. In addition, any living creature without the ADEPTUS MECHANICUS keyword within 2 metres of you at the start of their turn must pass a DN 3 Toughness Test or suffer the Poisoned condition. This poison is radiation poisoning, inflicting 1 Mortal Wound and Rank Shock at the start of each of the Poisoned character’s turns.'),
    ],
    wargear: wargearz('Radium carbine, data-tether, Skitarii Auto-Cuirass'),
  },
  {
    name: 'Sicarian Infiltrator',
    ...archetype(source.aaoa.key, 78, 'Adeptus Mechanicus', 'Sicarian Infiltrator', 3, 'Human'),
    ...costz(94,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqSkill(SKILLS.STEALTH, 2),
      reqSkill(SKILLS.TECH, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'You are an assassin, a blade turned towards those who would blaspheme against the Machine God.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('More Machine Than Man','You do not bleed (making you immune to Bleeding), and you add +Rank to your Maximum Wounds and Maximum Shock.'),
    ],
    wargearString: 'Sicarian battle-armour, stubcarbine and power sword or flechette blaster and taser goad, Augmetic Arms (two), data-tether, augmetic legs, augmetic viscera, Neurostatic projector',
    wargear: [
      { name: 'Sicarian battle-armour' },
      {
        name: 'stubcarbine and power sword or flechette blaster and taser goad',
        selected: '',
        options: [
          { name: 'stubcarbine and power sword' },
          { name: 'flechette blaster and taser goad' },
        ],
      },
      { name: 'Augmetic Arm' },
      { name: 'Augmetic Arm' },
      { name: 'data-tether' },
      { name: 'augmetic legs' },
      { name: 'augmetic viscera' },
      { name: 'Neurostatic projector' },
    ],
  },
  {
    name: 'Sicarian Ruststalker',
    ...archetype(source.aaoa.key, 94, 'Adeptus Mechanicus', 'Sicarian Ruststalker', 3, 'Human'),
    ...costz(94,[
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqSkill(SKILLS.STEALTH, 2),
      reqSkill(SKILLS.TECH, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'You have had the weakness of flesh cast away to hone your body into a living weapon in the Omnissiah’s arsenal.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World], Skitarii',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('More Machine Than Man','You do not bleed (making you immune to Bleeding), and you add +Rank to your Maximum Wounds and Maximum Shock.'),
    ],
    wargear: wargearz('Sicarian battle-armour, transonic razor and chordclaw or transonic blade and transonic blade, Augmetic Arm, Augmetic Arm, data-tether, augmetic legs, augmetic viscera'),
  },
  {
    name: 'Transmechanic',
    ... archetype(source.aaoa.key, 48, 'Adeptus Mechanicus', 'Transmechanic', 2, 'Human'),
    ...costz(28,[
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.INVESTIGATION, 2),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.TECH, 2),
    ]),
    hint: 'You are attuned to wavelengths and signals that flesh cannot discern.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Vox Communion','You can silently communicate with any vox or similar communications device within Rank x100 kilometres. You may also make Awareness or Investigation tests to detect concealed signals and study intercepted signals. You add +Rank bonus dice to any Investigation or Scholar test to decipher a code, translate a language, or create a new cipher.'),
    ],
    wargearString: 'Augur array (auspex), enhanced data tether, any two augmetics, mesh armour, laspistol.',
    wargear: [
      { name: 'Augur array (auspex)' },
      { name: 'enhanced data tether' },
      { name: 'mesh armour' },
      { name: 'laspistol' },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    name: 'Lexmechanic',
    ...archetype(source.aaoa.key, 52, 'Adeptus Mechanicus', 'Lexmechanic', 2, 'Human'),
    ...costz(28,[
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.INVESTIGATION, 1),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.TECH, 2),
    ]),
    hint: 'You are a voracious consumer of information, collating and compiling vast quantities of data.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 1,
    archetypeFeatures: [
      simpleAbility('Infovore', 'You may reroll up to Double Rank dice on Investigation and Scholar tests, and such tests take you only half as long to perform.'),
    ],
    wargearString: 'Calculus Logi implant, one optical or utility Mechadendrite, any two Augmetics, mesh armour, laspistol.',
    wargear: [
      { name: 'Calculus Logi implant' },
      { name: 'mesh armour' },
      { name: 'laspistol' },
      {
        name: 'optical or utility Mechadendrite.',
        selected: '',
        options: [
          { name: 'Mechadendrites (Utility)' },
          { name: 'Mechadendrites (Optical)' },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
    ],
  },
  {
    name: 'Genetor',
    ...archetype(source.aaoa.key, 91, 'Adeptus Mechanicus', 'Genetor', 4, 'Human'),
    ...costz(98,[
      reqAttribute(ATTRIBUTES.TOUGHNESS, 2),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqSkill(SKILLS.MEDICAE, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.TECH, 4),
    ]),
    hint: 'A devotee of the biological sciences.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 3,
    archetypeFeatures: [
      simpleAbility('Magos Biologis','You add +Rank bonus dice to any Medicae test you attempt and take only half as long to perform a Medicae test. In addition, your bioengineered and genetic augmentations increase your Max Wounds and Max Shock by +Rank.'),
    ],
    wargearString: 'Omnissian Axe, Augur Array (diagnostor), Medicae Mechadendrite, any two augmetics, any one cybernetic of up to Availability 7 (Unique), light power armour, and any one weapon of up to Availability 6 (Very Rare).',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Augur array (diagnostor)' },
      { name: 'Mechadendrites (Medicae)' },
      { name: 'light power armour' },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'one cybernetic of up to Availability 7 (Unique)',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'one weapon of up to Availability 6 (Very Rare).',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 6 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
          },
        ],
      },
    ],
  },
  {
    name: 'Logis',
    ...archetype(source.aaoa.key, 95, 'Adeptus Mechanicus', 'Logis', 4, 'Human'),
    ...costz(109,[
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.INVESTIGATE, 3),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.TECH, 4),
    ]),
    hint: 'Through mathemantic rite and numerological prophecy, you discern the future from the raw data of today.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
    influence: 3,
    archetypeFeatures: [
      simpleAbility('Technoprophet', 'You may purchase psychic powers from the Divination discipline even though you are not a Psyker. Using these powers requires an Investigation test in place of a Psychic Mastery test, and you do not choose a power level. Use of these abilities is not considered a psychic power. A Complication that results from one of these abilities inflicts 1d3+1 Shock, due to logic errors and paradoxical outcomes.'),
    ],
    wargearString: 'Omnissian Axe, Calculus Logi implant, any 3 augmetics, any one cybernetic of up to Availability 7 (Unique), light power armour, and any one weapon of up to Availability 6 (Very Rare).',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Calculus Logi implant' },
      { name: 'light power armour' },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'One augmetic of your choice.',
        selected: '',
        options: [
          {
            filter: true,
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'one cybernetic of up to Availability 7 (Unique)',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
            typeFilter: ['Augmetics'],
          },
        ],
      },
      {
        name: 'one weapon of up to Availability 6 (Very Rare).',
        selected: '',
        options: [
          {
            filter: true,
            valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 6 },
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Ranged Weapon','Melee Weapon'],
          },
        ],
      },
    ],
  },
  {
    name: 'Magos',
    ...archetype(source.aaoa.key, 96,'Adeptus Mechanicus','Magos',4,'Human'),
    ...costz(139 ,[
      reqAttribute(ATTRIBUTES.WILLPOWER, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.TECH, 4),
    ]),
    hint: 'The High-Priest of the Omnissiah.',
    keywords: 'Imperium, Adeptus Mechanicus, Cult Mechanicus, [Forge World]',
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
    wargearString: 'Omnissian Axe, augmetic servo-arm, any two augmetics, any two cybernetics of up to Availability 7 (Unique), light power armour, and any two weapons of up to Availability 7 (Unique).',
    wargear: [
      { name: 'Omnissian Axe' },
      { name: 'Mechadendrites (Servo-Arm)' },
      { name: 'Light Power Armour' },
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
    ],
  },
];

const aaoaChaos = [
  {
    ...archetype(source.aaoa2.key, 44, 'Chaos', 'Chaos Space Marine', 3, 'Adeptus Astartes'),
    ...costz(50, [  /* TODO */]),
    hint: 'Monstrous traitors and savage posthuman killers',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 44, 'Chaos', 'Chaos Space Marine Raptor', 3, 'Adeptus Astartes'),
    ...costz(60, [  /* TODO */]),
    hint: 'Cruel hunters who descent upon shrieking wings of fire',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.PILOT, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 45, 'Chaos', 'Chaos Space Marine Havoc', 3, 'Adeptus Astartes'),
    ...costz(60, [  /* TODO */]),
    hint: 'Heavy weapon specialists who revel in endless destruction',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.TECH, 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion]',
    influence: 2,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 43, 'Chaos', 'Khorne Berzerker', 3, 'Adeptus Astartes'),
    ...costz(80, [  /* TODO */]),
    hint: 'Frenzied, bloodthirsty killers who have devoted themselves to the Blood God',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
    ],
    keywords: 'Heretic, Chaos, Khorne, Heretic Astartes, [Legion]',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 46, 'Chaos', 'Nurgle Plague Marine', 3, 'Adeptus Astartes', true),
    hint: 'Nigh-unstoppable foot-soldiers of the God of Disease',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
    ],
    keywords: 'Heretic, Chaos, Nurgle, Heretic Astartes, [Legion]',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
      { targetGroup: 'traits', targetValue: TRAITS.SPEED, modification: -1 },
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
    ...archetype(source.aaoa2.key, 46, 'Chaos', 'Slaanesh Noise Marine', 3, 'Adeptus Astartes', true),
    hint: 'Sensation-addicted warriors of the Prince of Pleasure, armed with sonic weaponry',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.AWARENESS, 4),
    ],
    keywords: 'Heretic, Chaos, Slaanesh, Heretic Astartes, [Legion]',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 47, 'Chaos', 'Chaos Sorcerer', 3, 'Adeptus Astartes', true),
    hint: 'Warrior-mystics who have dabbled in the blasphemous powers of the Warp',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.SCHOLAR, 2),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Psyker',
    influence: 3,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 46, 'Chaos', 'Warpsmith', 3, 'Adeptus Astartes'),
    ...costz(55, [  /* TODO */]),
    hint: 'An artisan who blends warpcraft and engineering to create daemonic machines of war.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.TECH, 3),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Dark Mechanicus',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 46, 'Chaos', 'Dark Apostle', 4, 'Adeptus Astartes'),
    ...costz(60, [  /* TODO */]),
    hint: 'A furious zealot-priest, speaking blasphemous prayers from blood-flecked lips.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.SCHOLAR, 4),
      reqSkill(SKILLS.INTIMIDATION, 4),
    ],
    keywords: 'Heretic, Chaos, [Mark of Chaos], Heretic Astartes, [Legion], Priest',
    influence: 3,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 48, 'Chaos', 'Khorngor', 1, 'aaoa/Beastman'),
    ...costz(20, [  /* TODO */]),
    hint: 'Savage beastmen, driven to a berserk rage by the scent of blood.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ],
    keywords: 'Heretic, Chaos, Khorne',
    influence: 0,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 49, 'Chaos', 'Pestigor', 1, 'aaoa/Beastman'),
    ...costz(20, [  /* TODO */]),
    hint: 'Monstrous beastmen, uncaring to pain or fear.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.INTIMIDATION, 1),
    ],
    keywords: 'Heretic, Chaos, Nurgle',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 49,  'Chaos', 'Slaangor',  1,'aaoa/Beastman', false),
    ...costz(20, [
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.PERSUASION, 1),
    ]),
    hint: 'Beastmen who glory in the name of the Prince of Pleasure',
    keywords: 'Heretic, Chaos, Slaanesh',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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
    ...archetype(source.aaoa2.key, 50, 'Chaos', 'Tzaangor', 1, 'aaoa/Beastman'),
    ...costz(20, [ /* TODO */]),
    hint: 'Twisted, cunning Beastmen who serve sorcerous masters',
    prerequisites: [
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.SCHOLAR, 1),
    ],
    keywords: 'Heretic, Chaos, Tzeentch',
    influence: 1,
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
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

const aaoaAdeptusAstraTelephatica = [
  archetype(source.aaoa.key, 46,'Adeptus Astra Telephatica','Astropath',2,'Human',true),
  archetype(source.aaoa.key, 80,'Adeptus Astra Telephatica','Sister of Silence',2,'aaoa/Pariah',true),
];

const aaoaRep = [
  ...aaoaAeldari,
  ...aaoaOrks,
  ...aaoaSquat,
  ...aaoaAdeptusArbites,
  ...aaoaAstraMilitarum,
  ...aaoaAdeptusAstartes,
  ...aaoaOfficioAssassinorum,
  ...aaoaAdeptusMinistorum,
  ...aaoaAdeptaSororitas,
  ...aaoaAdeptusMechanicus,
  ...aaoaChaos,
  ...aaoaAdeptusAstraTelephatica,
];

const aotgtRep = [
  archetype(source.aotgt.key, '', 'Agents of the Imperium', 'Callidus Assassin', 4, 'Human', true),
  archetype(source.aotgt.key, '', 'Agents of the Imperium', 'Culexus Assassin', 4, 'Human', true),
  archetype(source.aotgt.key, '', 'Agents of the Imperium', 'Vindicare Assassin', 4, 'Human', true),
  archetype(source.aotgt.key, '', 'Agents of the Imperium', 'Grey Knight', 4, 'Adeptus Astartes', true),
];

const ltgbRep = [
  archetype(source.ltgb.key, '9', 'Renegades', 'Apostate', 1, 'Human', true),
  archetype(source.ltgb.key, 10, 'Renegades', 'Cultist', 1, 'Human', true),
  archetype(source.ltgb.key, 11, 'Renegades', 'Renegade', 1, 'Human', true),
  archetype(source.ltgb.key, 11, 'Renegades', 'Heretek', 2, 'Human', true),
  archetype(source.ltgb.key, 12, 'Renegades', 'Rogue Psyker', 2, 'Human', true),
  archetype(source.ltgb.key, 13, 'Renegades', 'Pirate', 2, 'Human', true),
  archetype(source.ltgb.key, 13, 'Renegades', 'Legionnaire', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 14, 'Renegades', 'Havoc', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 15, 'Renegades', 'Raptor', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 15, 'Renegades', 'Warpsmith', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 16, 'Renegades', 'Sorcerer', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 17, 'Renegades', 'Noise Marine', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 17, 'Renegades', 'Plague Marine', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 18, 'Renegades', 'Khorne Berzerker', 3, 'Adeptus Astartes', true),
  archetype(source.ltgb.key, 19, 'Renegades', 'Dark Apostle', 4, 'Adeptus Astartes', true),
];

const teaRep = [
  {
    ...archetype(source.tea.key, 22, 'Adeptus Astartes', 'Devastator Space Marine', 3, 'Adeptus Astartes'),
    ...costz(60, [  /* TODO */]),
    hint: 'Devastate the wast masses of enemies with your focus fire.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
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
    ...archetype(source.tea.key, 23, 'Adeptus Astartes', 'Assault Space Marine', 3, 'Adeptus Astartes'),
    ...costz(55, [  /* TODO */]),
    hint: 'Decent like a meteor into the enemy lines.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
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
  archetype(source.tea.key, 23, 'Adeptus Astartes', 'Tactical Marine', 3, 'Adeptus Astartes', true),
  {
    ...archetype(source.tea.key, 24, 'Adeptus Astartes', 'Techmarine', 3, 'Adeptus Astartes'),
    ...costz(85, [  /* TODO */]),
    hint: 'Support the Chapter with your craftsmanship and technical knock.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
      reqSkill(SKILLS.TECH, 4),
      reqSkill(SKILLS.PILOT, 3),
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
    ...archetype(source.tea.key, 25, 'Adeptus Astartes', 'Apothecary', 3, 'Adeptus Astartes'),
    ...costz(70, [  /* TODO */]),
    hint: 'Rescue the dying from their well earned retirement.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
      reqSkill(SKILLS.MEDICAE, 4),
      reqSkill(SKILLS.SCHOLAR, 3),
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
    ...archetype(source.tea.key, 25, 'Adeptus Astartes', 'Librarian', 3, 'Adeptus Astartes'),
    ...costz(80, [  /* TODO */]),
    hint: 'Harness the universal and librarius powers of the warp.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 4),
      reqSkill(SKILLS.SCHOLAR, 4),
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
  archetype(source.tea.key, 26, 'Adeptus Astartes', 'Chaplain', 4, 'Adeptus Astartes', true),
  archetype(source.tea.key, 27, 'Adeptus Astartes', 'Primaris Intercessor', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 27, 'Adeptus Astartes', 'Primaris Hellblaster', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 28, 'Adeptus Astartes', 'Primaris Reiver', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 28, 'Adeptus Astartes', 'Primaris Inceptor', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 29, 'Adeptus Astartes', 'Primaris Aggressor', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 29, 'Adeptus Astartes', 'Primaris Apothecary', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 30, 'Adeptus Astartes', 'Primaris Librarian', 4, 'Primaris Astartes', true),
  archetype(source.tea.key, 31, 'Adeptus Astartes', 'Primaris Chaplain', 5, 'Primaris Astartes', true),
];

const hevaRep = [
  archetype(source.heva.key, 9, 'Aeldari', 'Kabalite', 1, 'heva/Dark Eldar', true),
  archetype(source.heva.key, 10, 'Aeldari', 'Wych', 2, 'heva/Dark Eldar', true),
  archetype(source.heva.key, 11, 'Aeldari', 'Scourge', 3, 'heva/Dark Eldar', true),
  archetype(source.heva.key, 12, 'Aeldari', 'Incubus', 4, 'heva/Dark Eldar', true),
];

const goenRep = [
  archetype(source.goen.key, 6, 'Adeptus Titanicus', 'Moderati', 2,'Human', true),
  archetype(source.goen.key, 7, 'Adeptus Titanicus', 'Princeps', 3, 'Human', true),
  archetype(source.goen.key, 8, 'Adeptus Titanicus', 'Legate', 4, 'Human', true),
];

const togRep = [
  {
    name: 'Raider',
    ...archetype(source.tog.key, 8, 'Chaos', 'Raider', 2, 'Human'),
    ...costz(24, [
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.CUNNING, 2),
      reqSkill(SKILLS.PILOT, 1),
    ]),
    hint: 'A corrupted thug for lightning strikes',
    keywords: '[Any],Chaos,[Mark of Chaos]',
    archetypeFeatures: [
      {
        ...simpleAbility('Take Everything!', 'The Raider gains +Rank to all Pilot tests. They also begin each game session with one additional Reload.'),
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
    ],
    wargear: wargearz('Lasgun or Hand Flamer, Mono Knife or Sword, 2 Throwing Knifes, 1 Frag Grenade, Mesh Armour'),
    influence: 1,
  },
  {
    name: 'Champion',
    ...archetype(source.tog.key, 8, 'Chaos', 'Champion', 3, 'Human'),
    ...costz(64, [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INITIATIVE, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.SCHOLAR, 1),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
    ]),
    hint: 'A champion for the dark gods',
    keywords: 'Chaos,Heretic,[Mark of Chaos]',
    archetypeFeatures: [
      {
        ...simpleAbility('Favour of the Gods', 'You start each session with an additional point of Wrath. You also gain a Wrath point when you kill a creature with the IMPERIUM Keyword.'),
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
    ],
    wargear: wargearz('Flak Armour, Chain Axe or Chain Sword, Bolt Pistol, 2 Frag Grenades, 1 krak Grenade'),
    influence: 2,
  },
  {
    name: 'Apostate',
    ...archetype(source.tog.key, 9, 'Chaos', 'Apostate', 2, 'Human'),
    ...costz(78, [
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 4),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.LEADERSHIP, 4),
      reqSkill(SKILLS.PERSUASION, 3),
      reqSkill(SKILLS.SCHOLAR, 2),
    ]),
    hint: 'A demagoge of the forbidden words',
    keywords: 'Chaos,Heretic,[Mark of Chaos]',
    archetypeFeatures: [
      {
        ...simpleAbility('Demagogue', 'You gain +Rank on all Leadership and Persuasion tests.'),
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 1 },
          { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1 },
        ],
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
    ],
    wargear: wargearz('Duelling Las Pistol, Mono Knife, Refractor Field, Heretical Texts, Fine Robes'),
    influence: 2,
  },
  {
    name: 'Plague Marine',
    ...archetype(source.tog.key, 9, 'Chaos', 'Plague Marine', 3, 'Adeptus Astartes'),
    ...costz(246, [
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
      reqSkill(SKILLS.MEDICAE, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A bloated harbinger of plages',
    keywords: 'Chaos,Heretic Astartes,[Legion],[Nurgle]',
    archetypeFeatures: [
      {
        ...simpleAbility('Abnormal Physiology', 'The marine is immune to all diseases, poisons, and automatically passes any test that would case FEAR. You also gain +Rank bonus when using Intimidation or any effect that instills FEAR.'),
        modifications: [
          { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 1 },
        ],
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
    ],
    wargear: wargearz('Plague Marine Armour, Boltgun, Bolt Pistol, Plague Knife, 3 frag grenades, 3 tox grenades'),
    influence: 1,
  },
  {
    name: 'Khorne Berzerker',
    ...archetype(source.tog.key, 9, 'Chaos', 'Khorne Berzerker', 3, 'Adeptus Astartes'),
    ...costz(228, [
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A raging berserker in search for worthy prey',
    keywords: 'Chaos,Heretic Astartes,[Legion],[Khorne]',
    archetypeFeatures: [
      {
        ...simpleAbility('More Blood!', 'Increase the berserkers speed by 2 when they charge. You do not suffer a penalty when wounded and instead gain +Rank bonus to all Weapon Skill and Resolve tests'),
        modifications: [
          { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 2, rank: 0, condition: 'when charging' },
          { targetGroup: 'skills', targetValue: SKILLS.WEAPON_SKILL, modifier: 0, rank: 1, condition: 'when wounded' },
          { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 0, rank: 1, condition: 'when wounded' },
        ],
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Chain Axe or Chain Sword, Bolt Pistol, Astartes Combat Knife, 3 frag grenades, 3 krak grenades'),
    influence: 1,
  },
  {
    name: 'Noise Marine',
    ...archetype(source.tog.key, 9, 'Chaos', 'Noise Marine', 3, 'Adeptus Astartes'),
    ...costz(226, [
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 5),
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.ATHLETICS, 4),
      reqSkill(SKILLS.AWARENESS, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ]),
    hint: 'A sound adicted follower of slaanesh',
    keywords: 'Chaos,Heretic Astartes,[Legion],[Slaanesh]',
    archetypeFeatures: [
      {
        ...simpleAbility('New Sensations', 'The Gamemaster must spend 2 Ruin o Seize the initative while you are in the necounter. In Addition, once per combat encounter the Noise Marine may seize the initiative without spending a point of Glory.'),
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 3 },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Noise Marine Sonic Blaster, Bolt Pistol, Astartes Combat Knife, 3 frag grenades, 3 concussion grenades'),
    influence: 2,
  },
  {
    name: 'Chaos Sorcerer',
    ...archetype(source.tog.key, 9, 'Chaos', 'Chaos Sorcerer', 3, 'Adeptus Astartes'),
    ...costz(214, [
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 3),
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.ATHLETICS, 3),
      reqSkill(SKILLS.AWARENESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 3),
      reqSkill(SKILLS.STEALTH, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
      reqSkill(SKILLS.SCHOLAR, 3),
      reqSkill(SKILLS.PSYCHIC_MASTERY, 3),
    ]),
    hint: 'A weaver of the corrupted warp magic',
    keywords: 'Chaos,Heretic Astartes,[Legion],[Mark of Chaos],Psyker',
    archetypeFeatures: [
      {
        ...simpleAbility('Arcane Secrets', 'The Character gains the PSYKER keyword and starts the game with one minor Psychic Power and Smite. When performing a Ritual they may reroll a number of failed dice equal to Rank. Complications cannot be rerolled. If they already posses the PSYKER keyword, the start with an additional minor power.'),
        psychicPowers: [
          { name: 'psykerSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'psykerMinor', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'psykerMinorDouble', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
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
      },
    ],
    modifications: [
      { targetGroup: 'traits', targetValue: TRAITS.CORRUPTION, modifier: 2 },
    ],
    wargear: wargearz('Aquila Mk VII/Aquila Power Armour, Force Axe or Force Sword, Boltgun, Astartes Combat Knife, PSychic Focus'),
    influence: 1,
  },
];

const lotnRep = [
  {
    ...archetype(source.lotn.key, 5, 'Necrons', 'Immortal', 3, 'lotn/Necron'),
    ...costz(60, [ /* TODO */]),
    hint: 'Formerly members of the Necrontyr’s professional military, the Immortals were known for their peerless skill and resolve.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 3),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 5, 'Necrons', 'Deathmark', 3, 'lotn/Necron'),
    ...costz(65, [ /* TODO */]),
    hint: 'Assassins without peer, the Deathmarks are highly accurate and well-trained soldiers',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 5),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.STEALTH, 4),
      reqSkill(SKILLS.AWARENESS, 3),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 6, 'Necrons', 'Destroyer', 3, 'lotn/Necron'),
    ...costz(85, [ /* TODO */]),
    hint: 'Awoken with their minds decayed and damaged.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 6, 'Necrons', 'Lychguard', 4, 'lotn/Necron'),
    ...costz(70, [ /* TODO */]),
    hint: 'The Royal Guard of the Necron Dynasties.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 5),
      reqSkill(SKILLS.AWARENESS, 4),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 7, 'Necrons', 'Triarch Praetorian', 4, 'lotn/Necron'),
    ...costz(70, [ /* TODO */]),
    hint: 'The law enforcing arm of the old triarch.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.INTELLECT, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.SCHOLAR, 5),
      reqSkill(SKILLS.PERSUASION, 3),
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
    ...archetype(source.lotn.key, 7, 'Necrons', 'Lord', 4, 'lotn/Necron'),
    ...costz(80, [ /* TODO */]),
    hint: 'The least of the many nobles that make up a Necron Dynasty.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.LEADERSHIP, 5),
      reqSkill(SKILLS.PERSUASION, 3),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 8, 'Necrons', 'Cryptek', 4, 'lotn/Necron'),
    ...costz(75, [ /* TODO */]),
    hint: 'Techno-Wizards that dedicated their lives to understanding and working with the many Necron technologies.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 4),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.TECH, 5),
      reqSkill(SKILLS.SCHOLAR, 4),
    ],
    keywords: 'Necron,[Dynasty]',
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
    ...archetype(source.lotn.key, 8, 'Necrons', 'Destroyer Lord', 5, 'lotn/Necron'),
    ...costz(95, [ /* TODO */]),
    hint: 'Of those that fall victim to the path of the Destroyer, few are seemingly as insane as the Destroyer Lords.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 5),
      reqAttribute(ATTRIBUTES.AGILITY, 4),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 6),
      reqAttribute(ATTRIBUTES.INITIATIVE, 4),
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 5),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.WEAPON_SKILL, 4),
      reqSkill(SKILLS.LEADERSHIP, 5),
      reqSkill(SKILLS.PERSUASION, 4),
    ],
    keywords: 'Necron,[Dynasty]',
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
  archetype(source.pax.key, '-', 'Adeptus Administratum', 'Scribe', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Administratum', 'Ordinate', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Administratum', 'Sage', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Administratum', 'Prefect', 4, 'Human', true),
  {
    ...archetype(source.pax.key, 37, 'Adeptus Arbites', 'Arbitrator', 1, 'Human'),
    ...costz(10, [ /* TODO */]),
    hint: 'A guardian of imperial law, ruthless and implacable.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.INTIMIDATION, 2),
    ],
    keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
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
    ...archetype(source.pax.key, 38, 'Adeptus Arbites', 'Proctor', 1, 'Human'),
    ...costz(30, [ /* TODO */]),
    hint: 'An unrelenting warrior, adept at tracking down the most recalcitrant recidivist.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqAttribute(ATTRIBUTES.INITIATIVE, 2),
      reqAttribute(ATTRIBUTES.AGILITY, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.INTIMIDATION, 3),
    ],
    keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
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
    ...archetype(source.pax.key, 38, 'Adeptus Arbites', 'Mortiurge', 3, 'Human'),
    ...costz(50, [ /* TODO */]),
    hint: 'Little more than judicially recognized assassins',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.INTELLECT, 2),
      reqAttribute(ATTRIBUTES.AGILITY, 3),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 4),
      reqSkill(SKILLS.INVESTIGATION, 3),
      reqSkill(SKILLS.SURVIVAL, 2),
      reqSkill(SKILLS.STEALTH, 2),
    ],
    keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
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
      { name: 'Arbites Carapace' },
      { name: 'Symbol of Authority', variant: 'Arbitrator ID' },
      { name: 'abridged copy of the Lex Imperialis' },
    ],
  },
  {
    ...archetype(source.pax.key, 39, 'Adeptus Arbites', 'Marshal', 3, 'Human'),
    ...costz(60, [ /* TODO */]),
    hint: 'A fearsome commander, championing the righteous Imperial law.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.INITIATIVE, 2),
      reqAttribute(ATTRIBUTES.AGILITY, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.INTIMIDATION, 4),
    ],
    keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
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
    ...archetype(source.pax.key, 40, 'Adeptus Arbites', 'Judge', 4, 'Human'),
    ...costz(80, [ /* TODO */]),
    hint: 'A lord of justice, inspiring both dread and respect in great measure.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 5),
      reqAttribute(ATTRIBUTES.INITIATIVE, 2),
      reqAttribute(ATTRIBUTES.AGILITY, 2),
      reqSkill(SKILLS.WEAPON_SKILL, 2),
      reqSkill(SKILLS.BALLISTIC_SKILL, 2),
      reqSkill(SKILLS.INTIMIDATION, 5),
    ],
    keywords: 'Imperium,Adeptus Arbites,[Predict],Military',
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
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Cleric', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Confessor', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Deacon', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Preacher', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Banisher', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Exorcist', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Missionary', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Saint', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Cardinal', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Crusader', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Adeptus Ministorum', 'Heirophant', 4, 'Human', true),
  archetype(source.pax.key, '-', 'Astrophathicus Choirs', 'Astropathicus Envoy', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Astrophathicus Choirs', 'Black Sentinel', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Astrophathicus Choirs', 'Astropath', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Astrophathicus Choirs', 'Choirmaster', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Astrophathicus Choirs', 'Astropath Transcendent', 4, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Acquisitionist', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Guilder', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Chartist Captain', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Executioner', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Seneschal', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Servo-Master', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Tech-Thrall', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Commercia Imperialis', 'Merchant Magnate', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Highborn', 'Noble Scion', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Highborn', 'Politico', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Highborn', 'Noble Lord', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Highborn', 'Sprye Hunter', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Blooodsworn', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Bounty Hunter', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Freelancer', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Oathsworn Bodyguard', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Veteran Guardsman', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'Arch-Militant', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Hired Guns', 'ArchGunslinger', 3, 'Human', true),
  {
    ...archetype(source.pax.key, 116, 'Hive Ganger', 'Juve', 1, 'Human'),
    ...costz(0, [ /* TODO */]),
    hint: 'An inexperienced youth, eager for chance to prove themselves.',
    prerequisites: [],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,[Gang],Outcast',
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
    ...archetype(source.pax.key, 117, 'Hive Ganger', 'Ganger', 1, 'Human'),
    ...costz(10, [ /* TODO */]),
    hint: 'Competent and trusted fighters, accustomed to brutality and violence.',
    prerequisites: [
      reqSkill(SKILLS.CUNNING, 1),
    ],
    prerequisiteText: 'The respective <Gang> Skill at (3).',
    keywords: 'Imperium,Scum,[Gang],Outcast',
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
    ...archetype(source.pax.key, 118, 'Hive Ganger', 'Heavy', 1, 'Human'),
    ...costz(20, [ /* TODO */]),
    hint: 'A strong warrior, bigger and burlier than ordinary gangers.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
      reqAttribute(ATTRIBUTES.TOUGHNESS, 3),
    ],
    prerequisiteText: 'The respective <Gang> Skill at (1).',
    keywords: 'Imperium,Scum,[Gang],Outcast',
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
    ...archetype(source.pax.key, 118, 'Hive Ganger', 'Gang Leader', 2, 'Human'),
    ...costz(30, [ /* TODO */]),
    hint: 'A terrifying leader, leading by strength and will',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqAttribute(ATTRIBUTES.STRENGTH, 3),
    ],
    prerequisiteText: 'The respective <Gang> Skill at (4).',
    keywords: 'Imperium,Scum,[Gang],Outcast',
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
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Scholar', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Artisan', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Chirurgeon', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Colonist', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Enforcer', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Menial', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Planetary Defender', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Bonded Emissary', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Civilians', 'Planetary Governor', 4, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Charlatan', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Convert', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Cultist', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Frateris Militia', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Penitent', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Crusader of Faith', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Cult Magus', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Death Cult Assassin', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Fanatic', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Redemptionist', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Cults', 'Demagoge', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Rating', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Voidsman-At-Arms', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Midshipman', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Junior Officer', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Warrant Officer', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Imperial Navy', 'Senior Officer', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Magistratum', 'Law-Wright', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Magistratum', 'Offense-Barker', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Magistratum', 'Magistrate', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Magistratum', 'Sentencing Lord', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Hive Twist', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Mutant Outcast', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Twist Hulk', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Wyrd', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Ghilliam', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Psychic Abomination', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Scavvy', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Mutant Outcast', 'Hullghast', 3, 'Human', true),
  {
    ...archetype(source.pax.key, 195, 'Navis Nobility Houses', 'Navis Scion', 1, 'pax/Navigator'),
    ...costz(20, [/* TODO */]),
    stub: false,
    hint: 'A young navigator, groomed for diplomacy since birth.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 3),
      reqSkill(SKILLS.LEADERSHIP, 2),
      reqSkill(SKILLS.PERSUASION, 2),
      reqSkill(SKILLS.DECEPTION, 2),
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
    ...archetype(source.pax.key, '-', 'Navis Nobility Houses', 'Nobilite Emissary', 1, 'pax/Navigator'),
    ...costz(10, [/* TODO */]),
    stub: false,
    hint: 'A representative of the Navis Nobilite, empowered to enact the will of a houses Novators.',
    species: [ 'Human (core)', 'Navigator (pax)' ],
    speciesKey: [ 'core-human', 'pax-navigator' ],
    prerequisites: [
      reqAttribute(ATTRIBUTES.FELLOWSHIP, 2),
      reqSkill(SKILLS.INTIMIDATION, 1),
      reqSkill(SKILLS.PERSUASION, 1),
      reqSkill(SKILLS.DECEPTION, 1),
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
    ...archetype(source.pax.key, '-', 'Navis Nobility Houses', 'Navigator Primaris', 2, 'pax/Navigator'),
    ...costz(30, [ /* TODO */]),
    stub: false,
    hint: 'A warp guide, tasked with the sacred charge of guiding voidships through the immaterium.',
    prerequisites: [
     reqAttribute(ATTRIBUTES.WILLPOWER, 4),
     reqSkill(SKILLS.PILOT, 2),
     reqSkill(SKILLS.PERSUASION, 2),
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
    ...archetype(source.pax.key, '-', 'Navis Nobility Houses', 'Novator', 3, 'pax/Navigator'),
    ...costz(40, [/* TODO */]),
    stub: false,
    hint: 'An elder navigator who directs the interests of their house.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 6),
      reqSkill(SKILLS.PILOT, 5),
      reqSkill(SKILLS.LEADERSHIP, 4),
      reqSkill(SKILLS.PERSUASION, 3),
      reqSkill(SKILLS.DECEPTION, 3),
      reqSkill(SKILLS.INTIMIDATION, 3),
      reqSkill(SKILLS.INSIGHT, 3),
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
    ...archetype(source.pax.key, '-', 'Navis Nobility Houses', 'Heir-Apparent', 4, 'pax/Navigator'),
    ...costz(50, [/* TODO */]),
    stub: false,
    hint: 'The strongest navigators, primed to become the next paternova.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 7),
      reqSkill(SKILLS.PERSUASION, 5),
      reqSkill(SKILLS.PILOT, 4),
      reqSkill(SKILLS.INTIMIDATION, 4),
      reqSkill(SKILLS.LEADERSHIP, 4),
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
  archetype(source.pax.key, '-', 'Questoris Famila', 'Bannerman', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Boundsman', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Drover', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Serfitor', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Knight Scion', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Sacristan', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Freeblade', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Questoris Famila', 'Knight Baron', 4, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Household Trooper', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Rejuvenat Adept', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Child of Destiny', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Companion', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Rogue Trader', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Rogue Trader Fleets', 'Legendary Trader', 4, 'Human', true),
  archetype(source.pax.key, '-', 'Schola Progenium', 'Explicator-Progenii', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Schola Progenium', 'Progena', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Schola Progenium', 'Truant', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Schola Progenium', 'Drill-Abbot', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Scapegrace', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Scavenger', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Stubjack', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Performancer', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Verminspeaker', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Witch', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Reclaimator', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Scum', 'Desperado', 3, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Dreg', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Fixer', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Malifixer', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Skulker', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Smuggler', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Thug', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Cold Trader', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Underworld Syndicates', 'Crime Lord', 2, 'Human', true),
  {
    ...archetype(source.pax.key, '-', 'Untouchables', 'Blank', 1, 'pax/Untouchable'),
    ...costz(0, [ /* TODO */ ]),
    stub: false,
    hint: 'An untouchable, whose aura of ‘wrongness’ sets them apart from his fellow man.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 2),
      reqSkill(SKILLS.SURVIVAL, 2),
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
    ...archetype(source.pax.key, '-', 'Untouchables', 'Null', 2, 'pax/Untouchable'),
    ...costz(20, [ /* TODO */ ]),
    stub: false,
    hint: 'A more unnatural untouchable, whose presence can harm the psychically gifted and ward of the daemonic.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 3),
      reqSkill(SKILLS.SURVIVAL, 2),
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
    ...archetype(source.pax.key, '-', 'Untouchables', 'Pariah', 3, 'pax/Untouchable'),
    ...costz(50, [ /* TODO */ ]),
    stub: false,
    hint: 'A particularly powerful untouchable, whose aura is palpable and capable of disrupting the strongest of psychic manifestations.',
    prerequisites: [
      reqAttribute(ATTRIBUTES.WILLPOWER, 4),
      reqSkill(SKILLS.SURVIVAL, 3),
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
  archetype(source.pax.key, '-', 'Voidfarers', 'Dark-Holder', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Voidfarers', 'Pilgrim', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Voidfarers', 'Voidborn Clanner', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Voidfarers', 'Void-Master', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Void Pirates', 'Wolfpack Raiders', 1, 'Human', true),
  archetype(source.pax.key, '-', 'Void Pirates', 'Pirate Prince', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Void Pirates', 'Reaver', 2, 'Human', true),
  archetype(source.pax.key, '-', 'Void Pirates', 'Swashbuckler', 2, 'Human', true),
];

const sotahRep = [
  archetype(source.sotah.key, 4, 'Deathwatch', 'Blackshield', 4, 'Adeptus Astartes', true),
  archetype(source.sotah.key, 4, 'Deathwatch', 'Keeper', 5, 'Adeptus Astartes', true),
  archetype(source.sotah.key, 5, 'Deathwatch', 'Kill Marine', 4, 'Adeptus Astartes', true),
];

const thaotRep = [
  archetype(source.thaot.key, 4, 'Adeptus Astartes', 'Techmarin', 3, 'Adeptus Astartes', true),
];

const ambRep = [
  archetype(source.amb.key, 2, 'Astra Militarum', 'Weapon Specialist', 2, 'Human', true),
  archetype(source.amb.key, 3, 'Astra Militarum', 'Brawler', 2, 'Human', true),
  archetype(source.amb.key, 4, 'Astra Militarum', 'Scout', 2, 'Human', true),
  archetype(source.amb.key, 4, 'Astra Militarum', 'Sniper', 2, 'Human', true),
  archetype(source.amb.key, 5, 'Astra Militarum', 'Heavy Weapon Specialist', 2, 'Human', true),
  archetype(source.amb.key, 6, 'Astra Militarum', 'Bulwark',  2, 'coreab/Ogryn', true),
  archetype(source.amb.key, 6, 'Astra Militarum', 'Field Medicae', 2, 'Human', true),
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
