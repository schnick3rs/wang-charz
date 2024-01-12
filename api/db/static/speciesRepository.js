import {source} from './_sourcesRepository';
import {ATTRIBUTES, SKILLS, TRAITS} from './_statUtils';

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

const addModifier = function(targetGroup, targetValue, modifier = 0, rank = 0, condition = undefined) {
  return {
    targetGroup,
    targetValue,
    modifier,
    rank,
    condition,
  };
}

const background = function (text, plusOne, type) {
  const parts = text.split(': ');
  const title = parts[0];
  const snippet = parts[1];
  const modification = plusOne === '[ANY] Keyword'
    ? { targetGroup: 'keywords', targetValue: '[Any]' }
    : { targetGroup: 'traits', targetValue: stringToKebabToCamel(plusOne), modifier: 1 };
  return {
    key: `${stringToKebab(title)}`,
    title,
    snippet,
    plusOne,
    type,
    modification,
  }
}

const statMax = function (str, tou, agi, ini, wil, int, fel, spe) {
  return {
    attributeMaximums: [
      { name: 'Strength', value: str },
      { name: 'Agility', value: agi },
      { name: 'Toughness', value: tou },
      { name: 'Intellect', value: int },
      { name: 'Willpower', value: wil },
      { name: 'Fellowship', value: fel },
      { name: 'Initiative', value: ini },
    ],
    traitMaximums: [
      { name: 'Speed', value: spe },
    ],
  }
};

const cost = function (cost, stats = 0, species = 0, other = 0) {
  return {
    cost,
    costs: {
      total: cost,
      stats,
      species,
      other,
    }
  };
}

const species = function (sourceKey, sourcePage, group, name, hint, costy, speed, stub = false) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    group,
    speed,
    stub,
    ...cost(costy,costy,0,0),
    ...statMax(8,8,8,8,8,8,8,8),
    speciesFeatures: [],
  };
};

const commonNames = function (namesString) {
  return { commonNames: namesString.split(',').map(part => part.trim()) };
};

const coreRep = [
  {
    ...species('core',29,'Mankind','Human','The humble human',0,6),
    ...cost(0,0,0,0),
    ...commonNames('Adrielle, Alaric, Barus, Castus, Celeste, Diana, Dar, Davian, Ephrael, Erith, Estebus, Felicia, Gaius, Gezrael, Halo, Harken, Haveloch, Hestia, Iris, Jestilla, Kamir, Katrina, Lukas, Lyta, Mikel, Mira, Nura, Ophelia, Poul, Quitus, Ravenna, Rossel, Ruby, Silvana, Skyv, Steele, Taur, Titus, Tyanna, Ursa, Undine, Verbal, Victor, Waynoka, Wilhemina, Xavier, Yvette, Zane, Zellith, Zek'),
  },
  {
    ...species('core', 29, 'Mankind', 'Adeptus Astartes', 'The Sword of Mankind', 160, 7),
    ...cost(160,160,0,0),
    ...commonNames('Androcles, Balthazar, Chryses, Diallo, Egnatius, Fafnir, Gerhart, Helbrecht, Ibrahim, Jamshaid, Kalim, Luthando, Maximus, Nicator, Octavian, Proteus, Qaseem, Raziq, Seigfried, Tarik, Ursinus, Viggo, Woyzeck, Xanthus, Youssou, Zosimus.'),
    ...statMax(10,10,9,9,10,10,8,9),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 4 },
      { group: 'attributes', value: 'toughness', threshold: 4 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 3 },
      { group: 'skills', value: 'stealth', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Defender of Humanity',
        snippet: 'Add +Rank icons to any successful attack against a Mob.',
      },
      {
        name: 'Honour the Chapter',
        snippet: 'You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter. You increase your Resolve by 1.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
        ],
      },
      {
        name: 'Space Marine Implants',
        snippet: 'You are immune to the Bleeding Condition. You gain +1 bonus dice to any test related to one of the 19 implants (p.76) if the GM agrees it is appropriate.',
      },
    ],
  },
  {
    ...species('core',29,'Mankind','Primaris Astartes','The newborn breed',198,7),
    ...cost(198,198, 0),
    ...commonNames('Androcles, Balthazar, Chryses, Diallo, Egnatius, Fafnir, Gerhart, Helbrecht, Ibrahim, Jamshaid, Kalim, Luthando, Maximus, Nicator, Octavian, Proteus, Qaseem, Raziq, Seigfried, Tarik, Ursinus, Viggo, Woyzeck, Xanthus, Youssou, Zosimus.'),
    ...statMax(12,12,9,9,10,10,8,9),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 4 },
      { group: 'attributes', value: 'initiative', threshold: 4 },
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'athletics', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 3 },
      { group: 'skills', value: 'ballisticSkill', threshold: 4 },
      { group: 'skills', value: 'stealth', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Defender of Humanity',
        snippet: 'Add +Rank icons to any successful attack against a Mob.',
      },
      {
        name: 'Honour the Chapter (Primaris)',
        snippet: 'You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter. You ignore impurities in the Gene-Seed. You increase Resolve by 1 and Max Wounds by 3.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 3 },
        ],
      },
      {
        name: 'Space Marine Implants',
        snippet: 'You are immune to the Bleeding Condition. You gain +1 bonus dice to any test related to one of the 21 implants (p.76) if the GM agrees it is appropriate.',
      },
    ],
  },
  {
    ...species('core',29,'Aeldari','Aeldari','The Mysterious Aeldari',10,8),
    ...cost(10,10,0, 0),
    ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
    ...statMax(7,7,12,12,12,10,6,10),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
      },
      {
        name: 'Psychosensitive',
        snippet: 'You may choose to take the PSYKER Keyword.',
        description: '<p>You may choose to take the <strong>PSYKER</strong> Keyword.</p>',
        // TODO options to select beeing a psyker
        alerts: [
          { type: 'warning', text: 'For the PSYKER variant choose the Aeldari (Psychosensitive) species variant.', },
        ],
      },
      {
        name: 'Asuryani Paths',
        snippet: 'You walked a path of the Asuryani.',
        selected: [''],
        options: [
          {
            name: 'Path of Awakening', snippet: 'You gain +Rank bonus dice to Awareness (Int) Tests.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 1 },
            ]
          },
          {
            name: 'Path of The Artisan',
            snippet: 'You gain +Double Rank bonus dice to Scholar (Int) Tests related to the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'scholar', modifier: 0, rank: 2, condition: 'related to AELDARI' },
            ]
          },
          {
            name: 'Path of The Bonesinger',
            snippet: 'You gain +Double Rank bonus dice to Tech (Int) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'targets with the AELDARI Keyword' },
            ],
          },
          {
            name: 'Path of The Dreamer',
            snippet: 'You gain +Rank bonus dice to Corruption Tests',
            modifications: [
              { targetGroup: 'traits', targetValue: 'conviction', modifier: 0, rank: 1, condition: 'to corruption tests' },
            ],
          },
          {
            name: 'Path of The Mourner',
            snippet: 'You gain +Rank Maximum Shock.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'maxShock', modifier: 0, rank: 1 },
            ],
          },
          {
            name: 'Path of The Healer',
            snippet: 'You gain +Double Rank bonus dice to Medicae (Int) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'medicae', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
            ],
          },
          {
            name: 'Path of Service',
            snippet: 'You gain +Double Rank bonus dice to Insight (Fel) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'insight', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
            ],
          },
          {
            name: 'Path of The Mariner',
            snippet: 'You gain +Double Rank bonus dice to Pilot (A) Tests using vehicles with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 2, condition: 'when using AELDARI vehicles' },
            ],
          },
        ],
      },
    ],
  },
  {
    ...species('core',29,'Aeldari','Aeldari (Psychosensitive)','The Psychosensitive Aeldari',10,8),
    variant: 'core-aeldari',
    ...cost(10,10,0, 0),
    ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
    ...statMax(7,7,12,12,12,10,6,10),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
      },
      {
        name: 'Psychosensitive',
        snippet: 'You have the PSYKER Keyword. You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline.',
        description: '<p>You have the <strong>PSYKER</strong> Keyword. You gain access to the <em>Minor</em>, <em>Universal</em>, <em>Divination</em> and <em>Runes of Battle</em> Disciplines. You also gain access to on additional Discipline.</p>',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Psyker' },
        ],
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
      {
        name: 'Asuryani Paths',
        snippet: 'You walked a path of the Asuryani.',
        selected: [''],
        options: [
          {
            name: 'Path of Awakening', snippet: 'You gain +Rank bonus dice to Awareness (Int) Tests.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 1 },
            ]
          },
          {
            name: 'Path of The Artisan',
            snippet: 'You gain +Double Rank bonus dice to Scholar (Int) Tests related to the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'scholar', modifier: 0, rank: 2, condition: 'related to AELDARI' },
            ]
          },
          {
            name: 'Path of The Bonesinger',
            snippet: 'You gain +Double Rank bonus dice to Tech (Int) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 2, condition: 'targets with the AELDARI Keyword' },
            ],
          },
          {
            name: 'Path of The Dreamer',
            snippet: 'You gain +Rank bonus dice to Corruption Tests',
            modifications: [
              { targetGroup: 'traits', targetValue: 'conviction', modifier: 0, rank: 1, condition: 'to corruption tests' },
            ],
          },
          {
            name: 'Path of The Mourner',
            snippet: 'You gain +Rank Maximum Shock.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'maxShock', modifier: 0, rank: 1 },
            ],
          },
          {
            name: 'Path of The Healer',
            snippet: 'You gain +Double Rank bonus dice to Medicae (Int) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'medicae', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
            ],
          },
          {
            name: 'Path of Service',
            snippet: 'You gain +Double Rank bonus dice to Insight (Fel) Tests on targets with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'insight', modifier: 0, rank: 2, condition: 'on AELDARI targets' },
            ],
          },
          {
            name: 'Path of The Mariner',
            snippet: 'You gain +Double Rank bonus dice to Pilot (A) Tests using vehicles with the AELDARI Keyword.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 2, condition: 'when using AELDARI vehicles' },
            ],
          },
        ],
      },
    ],
  },
  {
    ...species('core',29,'Orks','Ork','The savage brute',20,6),
    ...cost(20,20,0, 0),
    ...commonNames('Arrlug, Balgrog, Blacktoof, Bluddflak, Bonesmasha, Dedak, Dragnatz, Eddbasha, Garahak, Gargash, Garmek, Genghiz, Gorbad, Grimskull, Hackitt, Hruk, Klawjaw, Kozdek, Lug, Morglum, Murgor, Nazhakka, Rakka, Rekkfist, Rotchop, Skarjaw, Skubmak, Urkthrall, Vorhgad, Zogax'),
    ...statMax(12,12,7,7,8,7,7,7),
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Orky',
        snippet: '+1 bonus dice to Intimidation Tests.',
      },
      {
        name: 'Bigger is Better',
        snippet: 'You calculate Influence using Strength instead of Fellowship.',
      },
    ],
  },
];

const fspg = [
  {
    ...species('fspg', 93, 'Mankind', 'Ogryn', 'The simple mind', 76, 6),
    ...cost(76,76,0,0),
    ...commonNames('Ank, Brok, Berta, Chukka, Dent, Frug, Grok, Hak, Igor, Jab, Karg, Kront, Lokk, Munt, Nork, Okka, Orod, Punt, Rakka, Smasha, Tock, Tug, Urok, Vohn, Wakka, Yarp.'),
    ...statMax(12,12,7,4,8,1,4,8),
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 5 },
      { group: 'skills', value: 'survival', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Avalanche of Muscle',
        snippet: 'When you Charge you gain an additional +Rank Bonus Dice to your melee attack Test.',
        modifications: [
          { targetGroup: 'skill', targetValue: 'weaponSkill', rank: 1, condition: 'when charging.' },
        ],
      },
      {
        name: 'Claustrophobic',
        snippet: 'Whenever you enter an enclosed area you must make a Fear Test (default DN 2). Additionally, whenever you roll a Complication in an enclosed space, the GM can spend 1 Ruin to force you to repeat this Fear Test.',
      },
      {
        name: 'Simple Loyalty',
        snippet: 'Whenever an ally with the IMPERIUM Keyword makes a Leadership Test targeting an Ogryn they gain Bonus Dice equal to the Ogryn’s Rank ( +Rank ).',
      },
      {
        name: 'Abhuman',
        snippet: 'You suffer a +1 DN penalty to social tests with Humans, modified by the target`s Keywords.',
      },
      {
        name: 'No recored Psykers',
        snippet: 'There are no recorded instances of Ogryns with psychic abilities. You cannot have the PSYKER Keyword.',
      },
      {
        name: 'Armour for Abhumans',
        snippet: 'For abhumans like Ogryns, the Rarity of any Armour is increased by +1.',
      },
    ],
    backgroundSection: [
      // ORIGIN
      background('Cloned: You are a vat-grown replicae, created to serve the Imperium. Your conscious life may have only begun very recently, and you are eager to fulfill your purpose.', 'Max Shock', 'Origin'),
      background('High Gravity: World A harsh life of survival is all you have known, and you’ve fought for everything you’ve ever had. Imperial society is a strange but not unwelcome world.', 'Determination', 'Origin'),
      background('Legion Born: War in the Emperor’s name is an Ogryn’s purpose — that’s what everyone tells you, and you have no reason to disagree. The Militarum Auxilla is your home, and the Emperor protects!', 'Resolve', 'Origin'),
      // ACCOMPLISHNMENT
      background('Followed Orders: You executed a series of suicidal orders with unflinching loyalty, surviving against the odds. Your mental and physical fortitude are unquestionable.', 'Conviction', 'Accomplishment'),
      background('Body Shield: Your tremendous bulk protected a superior officer from a deadly blow (this may have been accidental). Your reputation for being almost impenetrable to bullets is well earned.', 'Max Wounds', 'Accomplishment'),
      background('Sanctioned Creativity: Shocking your peers and superiors, you experienced a rare moment of creativity. The strange story of your brief higher function has spread and precedes you.', 'Influence', 'Accomplishment'),
      // GOAL
      background('Promotion: You want to get to the top — be it status, proof of your prowess, or to earn a Bone’ead augmetic, your goal is to be promoted.', 'Influence', 'Goal'),
      background('Medal: You’ve seen other soldiers get shiny medals, and you want one too! Accruing wealth and other shiny things in the pursuit of commendation has become your obsession.', 'Wealth', 'Goal'),
      background('Ward-bound: There is someone you must protect, an individual you value above all others. You may not even have met them yet, but you know your life’s purpose is to defend your ward.', 'Conviction', 'Goal'),
    ],
    objectives: [
      'Follow a superior’s orders to the letter.',
      'Use your tremendous bulk to dominate a social situation.',
      'Display the strength found in ignorance.',
      'Apply your unique understanding of the Emperor’s will to the current situation.',
      'Solve a problem through the judicious application of brute force.',
      'Charge the enemies of the Imperium!',
    ],
  },
  {
    ...species('fspg', 95, 'Mankind', 'Ratling', 'The slippery raskal', 30, 5),
    ...cost(30,30,0,0),
    ...commonNames('Arble, Bigby, Chansey, Doc, Edegar, Fingers, Gormo, Helli, Irma, Jolli, Kelli, Kurds, Lobe, Malgoy, Merrin, Norm, Obbs, Pietra, Rally, Stumper, Talia, Ulto, Vinn, Wanda, Wisp, Yanush.'),
    ...statMax(6,6,10,10,8,8,10,7),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 2 },
      { group: 'attributes', value: 'fellowship', threshold: 2 },
      { group: 'skills', value: 'awareness', threshold: 2 },
      { group: 'skills', value: 'ballisticSkill', threshold: 1 },
      { group: 'skills', value: 'cunning', threshold: 1 },
      { group: 'skills', value: 'deception', threshold: 2 },
      { group: 'skills', value: 'stealth', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Gourmand',
        snippet: '+Double Rank Bonus Dice to any Test made to prepare food. Prepared food can be used during a Regroup to recover +Rank Shock.',
      },
      {
        name: 'Abhuman',
        snippet: 'You suffer a +1 DN penalty to social tests with Humans, modified by the target`s Keywords.',
      },
      {
        name: 'No recored Psykers',
        snippet: 'There are no recorded instances of Ratlings with psychic abilities. You cannot have the PSYKER Keyword.',
      },
      {
        name: 'Armour for Abhumans',
        snippet: 'For abhumans like Ratlings, the Rarity of any Armour is increased by +1.',
      },
    ],
    backgroundSection: [
      // ORIGIN
      background('Penal Legionnaire: Your sharp eye and sly movements served you well as a thief, but now after only a modicum of torture — they will serve you as a soldier.','Max Shock', 'Origin'),
      background('Miniature Technician: You used to spend days at a time trapped in coffin-like chambers to ensure machinery you didn’t understand kept working. You proved your value and got out — now you’re eager to see the galaxy.','Resolve', 'Origin'),
      background('Fast Talker: You’ve talked, tricked, and bamboozled your way out of (and into) more scrapes than you care to count. You’ve earned a reputation for charm and deviousness, and are eager to put it to good use.','Influence', 'Origin'),
      // ACCOMPLISHNMENT
      background('Big Score: Be it a cache of armaments, a prized collection of relics, or the stock of an entire manufactorum, you managed to liquidate someone else’s assets — let’s hope it never comes back to haunt you.','Wealth', 'Accomplishment'),
      background('Sharp Shot: You assassinated an important enemy at improbable range or under difficult conditions. News of a deadeye Ratling spread quickly, and you’re likely to be in high demand.','Influence', 'Accomplishment'),
      background('Unnoticeable: You managed to survive a hopeless mission that martyred the remainder of your regiment — you managed to hide and survive. Some laud you as a hero, others a coward.','Conviction', 'Accomplishment'),
      // GOAL
      background('Fame & Fortune: You’ve got the skills to be a hero of the Imperium, and you intend to be well rewarded for using them. Rise through the ranks and take what is due.','Determination', 'Goal'),
      background('The Good Life: Land, food, and friendship — what else could you possibly want? You intend to survive everything the galaxy has to throw at you, then find a way to discreetly abandon your post and get back to basics.','Conviction', 'Goal'),
      background('Acceptance: You’re sick of Humans looking down on you. You want to ensure Ratlings are accepted, building elite units and industrial efforts that serve the Emperor and prove your peoples’ worth.','Resolve', 'Goal'),
    ],
    objectives: [
      'Fill your stomach with some high-quality grub.',
      'Redirect imperial resources to your own advantage.',
      'Loot supplies from your ignoble enemies.',
      'Show the advantages of a smaller size.',
      'Avoid danger using your natural stealth.',
      'Use your precise eyesight to aid the party (or yourself).',
    ],
  },
  {
    ...species('fspg',97,'Kroot','Kroot','The mutating gourmet',22,5),
    ...cost(22,22,0,0),
    ...commonNames('Anghkor, Braztyk, Cechkala, Dahyak, Enghok, Fenya, Gorok, Harbyx, Ixilla, Jiynko, Khort, Lucu, Meyzek, Nhatalla, Ortazk, Pechallai, Quon, Razick, Senghak, Tovrick, Ula, Vhey, Wihn, Xala, Yulu, Zhorick.'),
    ...statMax(12,12,12,12,10,6,6,10),
    prerequisites: [
      { group: 'skills', value: 'athletics', threshold: 1 },
      { group: 'skills', value: 'awareness', threshold: 1 },
      { group: 'skills', value: 'stealth', threshold: 2 },
      { group: 'skills', value: 'survival', threshold: 2 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Kroot Mutations',
        snippet: 'You have a number of Kroot Mutations equal to your Tier, and may gain additional Kroot Mutations as part of Ascension.',
        alerts: [
          { type: 'info', text: 'Only select the amount of mutations that you are allowed to.', },
        ],
        selected: ['', '', '', ''],
        options: [
          {
            name: 'Maneater (Strength)',
            snippet: '+1 to your lowest Attribute (Strength).',
            modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
          },
          {
            name: 'Maneater (Toughness)',
            snippet: '+1 to your lowest Attribute (Toughness).',
            modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
          },
          {
            name: 'Maneater (Agility)',
            snippet: '+1 to your lowest Attribute (Agility).',
            modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
          },
          {
            name: 'Maneater (Initiative)',
            snippet: '+1 to your lowest Attribute (Initiative).',
            modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 1) ],
          },
          {
            name: 'Maneater (Willpower)',
            snippet: '+1 to your lowest Attribute (Willpower).',
            modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
          },
          {
            name: 'Maneater (Intellect)',
            snippet: '+1 to your lowest Attribute (Intellect).',
            modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 1) ],
          },
          {
            name: 'Maneater (Fellowship)',
            snippet: '+1 to your lowest Attribute (Fellowship).',
            modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 1) ],
          },
          {
            name: 'Astartes Eater (Strength)',
            snippet: '+2 to any Attribute (Strength).',
            modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 2) ],
          },
          {
            name: 'Astartes Eater (Toughness)',
            snippet: '+2 to any Attribute (Toughness).',
            modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 2) ],
          },
          {
            name: 'Astartes Eater (Agility)',
            snippet: '+2 to any Attribute (Agility).',
            modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 2) ],
          },
          {
            name: 'Astartes Eater (Initiative)',
            snippet: '+2 to any Attribute (Initiative).',
            modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 2) ],
          },
          {
            name: 'Astartes Eater (Willpower)',
            snippet: '+2 to any Attribute (Willpower).',
            modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 2) ],
          },
          {
            name: 'Astartes Eater (Intellect)',
            snippet: '+2 to any Attribute (Intellect).',
            modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 2) ],
          },
          {
            name: 'Astartes Eater (Fellowship)',
            snippet: '+2 to any Attribute (Fellowship).',
            modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 2) ],
          },
          {
            name: 'Aeldari Eater (Agility)',
            snippet: '+1 to Agility.',
            modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
          },
          {
            name: 'Aeldari Eater (Willpower)',
            snippet: '+1 to Willpower.',
            modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
          },
          {
            name: 'Ork Eater (Strength)',
            snippet: '+1 to Strength.',
            modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
          },
          {
            name: 'Ork Eater (Toughness)',
            snippet: '+1 to Toughness.',
            modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
          },
          {
            name: 'Armoured Hide',
            snippet: 'You gain +Rank to your Base Resilience.',
            modifications: [ addModifier('traits', TRAITS.RESILIENCE, 0, 1) ],
          },
          {
            name: 'Bioluminescence',
            snippet: 'You may cause any part of your body to glow with light. If your entire body is emitting light, it sheds enough light to see in a 10m radius.',
          },
          {
            name: 'Camouflage',
            snippet: 'As a Simple Action you can control the appearance of your hide, with the same effects as a Cameleoline Cloak (core, pg. 237).',
          },
          {
            name: 'Facultative Bipedalism',
            snippet: 'You may Sprint twice as fast as normal and make Athletics (S) Tests to jump or climb with +Double Rank Bonus Dice.',
            modifications: [ addModifier('skills', SKILLS.ATHLETICS, 0, 2, 'when jumping or climbing.') ],
          },
          {
            name: 'Hypersensetive Quills',
            snippet: 'Your quills act as an Auspex (core, pg. 236) with a range of 30m.',
          },
          {
            name: 'Wings',
            snippet: 'You can Fly at Speed 7',
          },
          {
            name: 'Weaponised Biology',
            snippet: '',
            description: '<p>Your Unarmed Strikes deal (S)+4 Damage / +3 ED, and have one of the following Traits:</p>' +
              '<ul>' +
              '<li>Brutal</li>' +
              '<li>Rending (Rank)</li>' +
              '<li>Inflict (Poison (Rank))</li>' +
              '<li>Parry</li>' +
              '</ul>',
          },
        ],
      },
      {
        name: 'Despise for Armour',
        snippet: 'If a Kroot wears armour with an AR of 4 or more, the DN of all Tests using the Strength, Agility, or Initiative Attribute increase by an amount equal to the AR of the armour.',
      },
    ],
    backgroundSection: [
      background('Pech Native: Raised amongst the jungles of the Kroot homeworld Pech, you are accustomed to a primitive life, and may have fought alongside the enigmatic T’au.','Max Wounds', 'Origin'),
      background('Void Born: Born aboard a warsphere, your nomadic life has been one of constant excursions on strange worlds and bizarre meals. You have met (and devoured) many minor Species, and now little surprises you.','Max Shock', 'Origin'),
      background('Prodigal Carnivore: Mercenary work has been lucrative and has offered many opportunities to improve yourself, though you long for the day you can return to your kindred and pass on the rich genetic traits you have gained.','Wealth', 'Origin'),
      //
      background('Primitive Victor: Relying on your mutations, you managed to defeat a more technologically advanced foe. You are staunch in your beliefs that biological strength far outweighs any mechanical advantage.','Determination', 'Accomplishment'),
      background('Sole Survivor: Through caution, courage, cowardice, or simple luck, you survived when the rest of your kindred was slain. You have been made strong by survival and are now free to consume any prey you find.','Resolve', 'Accomplishment'),
      background('Contract Secured: Through shrewd diplomacy (and likely a little intimidation) you negotiated a deal that allowed you to fight alongside another Species against powerful foes.','Influence', 'Accomplishment'),
      //
      background('Return Home: Though you have learned much and consumed many foes on your sojourn from your homeworld, you long to return to Pech, and will stop at nothing to do so.','Conviction', 'Goal'),
      background('Become Strong: You have the utmost respect for the goals of your Species. You will journey to any location and fight any foe in your quest to become stronger.','Max Wounds', 'Goal'),
      background('Discovery: You have had a small taste of the vastness of the galaxy, and believe that there are secrets still hidden that could further advance the Kroot — you will be the one to discover them.','Determination', 'Goal'),
    ],
    objectives: [
      'Speculate on how you could evolve to better cope with the current situation.',
      'Point out how the advanced technology of another Species has made them weak.',
      'Relate the wisdom of your Shaper to the current situation.',
      'Use the environment to put yourself in a more advantageous situation.',
      'Make an evaluation on how someone you meet would taste.',
      'Consume the flesh of the strong.',
    ],
  },
];

const aioe = [
  {
    ...species('aioe',10,'Aeldari','Aeldari','The Mysterious Aeldari',10,8),
    ...cost(10,10,0, 0),
    ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
    ...statMax(7,7,12,12,12,10,6,10),
    replaces: 'core-aeldari',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
      },
      {
        name: 'Psychosensitive',
        snippet: 'You may choose to take the PSYKER Keyword.',
        description: '<p>You may choose to take the <strong>PSYKER</strong> Keyword.</p>',
        selected: '',
        options: [
          { key: 'mundane', name: 'Mundane', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Minor' }] },
          { key: 'psyker', name: 'Sensitive', unlocks: 'Psychosensitive Psyker' },
        ],
      },
      {
        condition: 'psychosensitive.psyker',
        name: 'Psychosensitive Psyker',
        snippet: 'You have the PSYKER Keyword. You gain access to the Minor, Universal, Divination and Runes of Battle Disciplines. You also gain access to on additional Discipline.',
        description: '<p>You have the <strong>PSYKER</strong> Keyword. You gain access to the <em>Minor</em>, <em>Universal</em>, <em>Divination</em> and <em>Runes of Battle</em> Disciplines. You also gain access to on additional Discipline.</p>',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Psyker' },
        ],
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
  },
  {
    ...species('aioe',10,'Aeldari','Drukhari','The Mysterious Drukhari',10,8),
    ...cost(10,10,0, 0),
    ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
    ...statMax(7,7,12,12,12,10,6,10),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
      },
      {
        name: 'Night Vision',
        snippet: 'You do not suffer vision penalties for low-light or darkness.',
      },
      {
        name: 'Soul Debt',
        snippet: 'Make a DN Tier+1 Corruption Test at the end of any session in which you did not inflict Wounds on an unwilling creature. You never make Corruption Tests for inflicting pain. Drukhari with the ASURYANI, HARLEQUIN, or YNNARI Keyword lose this ability.',
      },
    ],
  },
  {
    ...species('aioe',10,'Aeldari','Wraith Construct','The Constructed Souls',90,8),
    ...cost(90,90,0, 0),
    ...commonNames('Aethon, Anthrillien, Ashkalla, Aulirel, Auran, Avenelle, Baharroth, Caerys, Culyan, Elashbel, Elarique, Eldorath, Elessar, Erandel, Gilead, Gilvas, Hrythar, Hyrne, Idranel, Illic, Iyanna, Kaelith, Kelmon, Micha, Meliniel, Mirehn, Morwyn, Naudhu, Naguan, Quillindral, Requiel, Salaine, Sylandri, Taladin, Taldeer, Talyesin, Ullarion, Ulthos, Yriel'),
    ...statMax(7,7,12,12,12,10,6,10),
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 5 },
      { group: 'attributes', value: 'toughness', threshold: 6 },
    ],
    speciesFeatures: [
      {
        name: 'Wraithbone Form',
        snippet: 'Wraith Constructs are immune to the Blinded, Bleeding, and Poisoned Conditions, and cannot Suffocate. They cannot wear armour, but always count as having an Armour Rating (AR) of 5',
      },
      {
        name: 'Wraithsight',
        snippet: 'Wraith Constructs can communicate telepathically with Spiritseers and other psychically attuned Aeldari, and perceive the presence of psychic powers and warp phenomena, as well as strong thoughts and feelings at the GM’s discretion. Unless a living Aeldari character is within line of sight, they suffer from the Hindered Condition.',
      },
    ],
  },
];

const aaoa = [
  // Human Origins
  {
    ...species('aaoa', 8, 'Mankind', 'Death World Origin', 'Survivor of endless hostility', 0, 6),
    variant: 'core-human',
    description:
      '<p>Born to harsh, savage worlds, which are hostile to human life. To survive in such places creates people as fierce and unforgiving as the worlds that raised them, and many of the mightiest defenders of the Imperium hail from worlds where existence is a daily struggle for survival.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Strength, Toughness, Stealth, Survival.</em></p>',
    speciesFeatures: [
      {
        name: 'Bitter Survivor',
        snippet: 'You add +1 bonus die to Determination Tests.',
        description:
          'The character clings onto life and is well-versed in eluding death’s grasp. The character adds +1 to Determination.',
      },
      {
        name: 'Not One of Us',
        snippet: 'You suffer +1 DN to Interaction Tests with non-Deathworldlers.',
        description:
          'DeathDeathworlders don’t easily trust those who haven’t endured the same kind of hostile environments. They suffer +1DN to all Interaction tests with those who aren’t Deathworlders.'
      },
    ],
  },
  {
    ...species('aaoa', 8, 'Mankind', 'Hive World Origin', 'One in a bazzilion', 0, 6),
    variant: 'core-human',
    description:
      '<p>Towering, overcrowded megacities dominating polluted worlds, even the smallest hive city is home to billions of souls. These people toil in obscurity, slaving away for their entire lives in vast manufactories, or battling for survival in breadline riots or territorial skirmishes. For most, the only hope of seeing open sky is to leave their homes and fight for the Imperium.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Agility, Initative, Cunning, Tech.</em></p>',
    speciesFeatures: [
      {
        name: 'Caves of Steel',
        snippet: 'You gain +1 dice to Tech tests.',
        description:
          '<p>The character has been surrounded by technology, some of which may be centuries or millennia old, for their entire lives. The character gains +1d to Tech tests.</p>',
      },
      {
        name: 'Hivebound',
        snippet: 'You suffer +1 DN to Survival tests not made within urban or manufactured environments.',
        description:
          '<p>Hivers are unaccustomed to the ways of wild, untamed places. Even the wilderness of underhive levels and abandoned habs is still built around artificial structures. Hiveworlders suffer +1DN on all Survival tests made when not in an urban or manufactured environment.</p>'
      },
    ],
  },
  {
    ...species('aaoa', 9, 'Mankind', 'Voidborn Origin', 'Born into darkness', 0, 6),
    variant: 'core-human',
    description:
      '<p>Born and raised in the darkness between the stars, the voidborn are a strange breed. Accustomed to the peculiar life aboard city-sized voidships and vast orbital stations, they are often seen as warp-touched, and the weird, insular customs of life in space often set them apart from planetborn people.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Initiative, Willpower, Pilot, Tech.</em></p>',
    speciesFeatures: [
      {
        name: 'Voidwise',
        snippet: 'You gain +1 dice to Tests ti resist radiation. You also ignore all penalties to actions due to low- or zero-gravity.',
        description:
          '<p>The character is accustomed to the vagaries of life aboard ship or station and is well-versed in protective rites and emergency doctrines. The character gains +1d on all tests to resist radiation and ignores all penalties to action caused by low- or zero-gravity environments.</p>',
      },
      {
        name: 'Ill-Omened',
        snippet: 'Interaction tests with non-Voidborn must use two Wrath dice and can`t score criticals.',
        description:
          '<p>Voidborn are considered strange and inauspicious by others, who look for even the slightest sign of ill-fortune. When attempting an interaction test with a non-Voidborn, two dice are treated as Wrath dice, rather than one, and the character is unable to score criticals on these tests.</p>'
      },
    ],
  },
  {
    ...species('aaoa', 9, 'Mankind', 'Forge World Origin', 'Under the Omnissiahs watch', 0, 6),
    variant: 'core-human',
    description:
      '<p>You hail from a domain of the Adeptus Mechanicus and were raised invoking psalms to the Omnissiah rather than prayers to the God-Emperor. You are a cog within a grand machine that contains trillions of souls, honed to serve your specific purpose.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Strength, Intelligence, Scholar, Tech.</em></p>',
    speciesFeatures: [
      {
        name: 'Ave Omnissiah',
        snippet: 'You add +1 die to all Tech and Scholar tests related to the Adeptus Mechanicus.',
        description:
          '<p>The character has memorised countless operation litanies and maintenance hymnals, giving them an innate familiarity with machines and the Cult Mechanicus. They receive +1d on all Tech tests and Scholar tests relating to the Adeptus Mechanicus.</p>',
      },
      {
        name: 'Stranger to the Church',
        snippet: 'You suffer a +2 DN Penalty to Scholar tests related to the Imparial Creed. You may not choose an Archetype with the ADEPTUS MINISTORUM keyword.',
        description:
          '<p>Forgeworlders are unfamiliar with the ways of the Ministorum and the Imperial Creed and suffer +2DN on all Scholar tests relating to the Imperial Creed. The character may not take any archetypes with the ADEPTUS MINISTORUM keyword.</p>'
      },
    ],
  },
  {
    ...species('aaoa', 10, 'Mankind', 'Scholar Progenium Origin', 'Orphaned but not without family', 0, 6),
    variant: 'core-human',
    description:
      '<p>You were an orphaned child of a notable servant of the Imperium, raised in one of the Schola Progenium abbeys scattered across the galaxy. Under the tutelage of Drill-Abbots and other stern teachers, young Progena are honed into devout, highly capable servants of Him-on-Terra. Many of the most renowned figures in Imperial history are former Progena, recruited into positions of status and power.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Toughness, Willpower, Athletics, Leadership.</em></p>',
    speciesFeatures: [
      {
        name: 'Schola Education',
        snippet: 'You gain +1 die to any two of the following skills: Insight, Intimidation, Leadership, Scholar',
        description:
          '<p>The character was groomed from a young age to be an example to others. You gain +1d on any two of the following skills, chosen during character creation: Insight, Intimidation, Leadership, Scholar.</p>',
      },
      {
        name: 'Cloistered Upbringing',
        snippet: 'You suffer a +2 DN penalty to non-hostile Interaction tests when dealing with SCUM.',
        description:
          '<p>Progena have little patience for, or understanding of, the dregs of society. The character suffers +2DN on all non-hostile Interaction tests made when dealing with characters who have the SCUM keyword.</p>'
      },
    ],
  },
  {
    ...species('aaoa', 10, 'Mankind', 'Shrine World Origin', 'Children of Faith', 0, 6),
    variant: 'core-human',
    description:
      '<p>You were raised on a world which exists to exalt the God-Emperor. You were raised amidst faith and fury, exposed to lore of saints and martyrs and the Emperor’s righteousness at every moment of every day.</p>' +
      '<p><em>Note: It`s recommended to increase the following Attributes and Skills at least once, to reflect the homeworld`s origin: Willpower, Fellowship, Insight, Scholar.</em></p>',
    speciesFeatures: [
      {
        name: 'The Scorn of the Devout',
        snippet: 'You increase Resolve and Conviction by 1. You gain +1 die to Weapon Skill tests when attacking HERETICs.',
        description:
          '<p>The character is filled with holy hatred and fury. They receive +1 to Resolve and Conviction, and +1d on all Weapon Skill tests made to attack enemies with the Heretic keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
        ],
      },
      {
        name: 'Abhor the Unhallowed',
        snippet: 'You suffer a +1 DN penalty to Scholar and Tech tests related to HERETIC, CHAOS or Xenos items or characters.',
        description:
          '<p>The character is filled with an instinctive revulsion for the unholy or unclean. They suffer +1DN on all Scholar or Tech tests relating to items or characters with the HERETIC or CHAOS keywords, or with any keyword belonging to a Xenos species.</p>',
      },
    ],
  },
  // Pariah
  {
    ...species('aaoa',12,'Mankind','Pariah','The blank, the void',30,8),
    ...cost(30,0,30, 0),
    ...statMax(7,7,12,12,12,10,6,10),
    variant: 'core-human',
    speciesFeatures: [
      {
        name: 'Abhorrent Presence',
        snippet: 'You suffer +2 DN to all Interaction tests with non-Pariahs. You suffer +4 DN to all Interaction tests with Psykers. You Influence is reduced by 1.',
        description:
          '<p>+2DN to all interaction tests with non-pariah characters. +4DN to interaction tests with psykers. Pariahs reduce their Influence by 1.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'influence', modifier: -1 },
        ],
      },
      {
        name: 'Psychic Abomination',
        snippet: 'You may never be a PSYKER nor gain Faith points or abilities that draw from the warp. Any psychic powers attempted or targeted within a number of metres of you  equal to your Willpower increase their DN by +Double Rank.',
        description:
          '<p>A pariah cannot be directly affected by psychic powers or other warp phenomena, whether positive or negative. A pariah can never gain the PSYKER keyword, nor can they ever gain Faith points or any other ability that requires drawing upon the Warp for power. Any psychic powers attempted or targeted within a number of metres of the Pariah equal to their Willpower increase their DN by twice the Pariah’s Rank.</p>',
      },
    ],
  },
  // Aeldarie
  {
    ...species('aaoa', 13,'Drukhari','Drukhari','The Sinister Kin',20,8),
    ...cost(20,20,0, 0),
    ...commonNames('Akhirion, Anarkyss, Anielyn, Bekliel, Ethrilliac, Grendett, Grevyth, Kylos, Laelanyel, Madrax, Melikka, Mellyx, Monsatos, Narlek, Nyktos, Peiythia, Phyrix, Selithrian, Theskril, Thessa, Thraed, Thresyn, Thrixxesh, Quaez, Uless, Vrexith, Vylekh, Vypus, Xela, Xurul'),
    ...statMax(7,7,12,12,12,10,6,8),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Blade Artist',
        snippet: 'When you make an attack with a melee weapon, increase the weapon’s AP by 1 (i.e., from -1 to -2) if you shift one or more Icons on the attack. This stacks with effects such as the Rending weapon trait.',
      },
      {
        name: 'The Thirst',
        snippet: 'You cannot recover Shock by spending Wrath or the use of Medicae. You recover 1d3+Rank Shock when you inflict Shock on or kill an opponent, when you succeed at an Intimidation Interaction Attack, or when an enemy fails a Resolve test. The GM gains +1 Ruin whenever you become Exhausted.',
      },
      {
        name: 'She Who Thirsts',
        snippet: 'Your Max Shock is reduced by your Corruption Level.',
      },
    ],
  },
  // Squats
  {
    ...species('aaoa', 13, 'Squats','Squat','The forgotten',28,5),
    ...cost(28,28,0, 0),
    ...commonNames('Algunella, Athgni, Athlun, Balgrimella, Beladokina, Burnir, Burzin, Drokgrimella, Dronglin, Elanya, Elruna, Fimagrin, Fimarun, Gadrinella, Gimzin, Grendl, Grimgrund, Grimtoka, Hakakin, Harmin, Harnina, Kazgrond, Lundor, Moranina, Mori, Odaskina,Olfmir, Ollagona, Ollanya, Ragni, Rorangona, Rorgar, Skagromina, Skoraskina, Skordokina, Snoragund, Throngana, Thuramin, Uthagrund, Zakgni'),
    prerequisites: [
      { group: 'attributes', value: 'toughness', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 1 },
      { group: 'skills', value: 'weaponSkill', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Abhuman',
        snippet: '+1DN to all Interaction tests with the IMPERIUM.',
        description:
          '<p>+1DN to all Interaction tests with characters possessing the IMPERIUM keyword.</p>',
      },
      {
        name: 'Grudges',
        snippet: 'You gain +1 die to melee attacks against ORK and CHAOS. You suffer +2 DN to non-hostile Interaction skill tests with ORKs and CHAOS.',
        description:
          '<p>+1d to all melee attacks against characters possessing the ORK or CHAOS keywords. +2DN penalty on all non-hostile Interaction skill tests vs. targets possessing the ORK or CHAOS keywords.</p>',
      },
      {
        name: 'Legacy of the Cataclysm',
        snippet: 'Your Resolve and Conviction is increased by 1. You suffer +3 Corruption.',
        description:
          '<p>Your Resolve and Conviction increase by +1 each. You begin play with +3 corruption.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
    ],
  },
  // Beastman
  {
    ...species('aaoa', 15, 'Chaos', 'Beastman', 'Servants of Chaos', 20, 7),
    prerequisites: [
      { group: 'attributes', value: 'strength', threshold: 3 },
      { group: 'attributes', value: 'toughness', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Reviled Abhuman',
        snippet: 'You suffer +2 DN to Interaction tests with CHAOS.',
        description:
          '<p>+2DN to all Interaction tests with characters who do not possess the Chaos keyword.</p>',
      },
      {
        name: 'Horns',
        snippet: 'You may attack with your Horns (5 +2 ED).',
        description:
          '<p>You may make melee attacks with your horns (5+2ED; AP 0). Thus, you are always armed.</p>',
      },
      {
        name: 'Bestial Savagery',
        snippet: 'You gain +1 die to Intimidation tests.',
        description:
          '<p>+1d to all Intimidation tests.</p>',
      },
      {
        name: 'Child of Chaos',
        snippet: 'You gain +3 Corruption.',
        description:
          '<p>You begin play with +3 corruption.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
    ],
  },
  // T'au
  {
    ...species('aaoa', 19, 'T’au','Shas T’au','The Warrior',4,6),
    ...cost(4,4,0, 0),
    ...commonNames(''),
    prerequisites: [
      { group: 'skills', value: 'ballisticSkill', threshold: 1 },
      { group: 'skills', value: 'tech', threshold: 1 },
    ],
    speciesFeatures: [
      {
        name: 'For the Greater Good (Shas)',
        snippet: 'When you assist an ally using Awareness, Ballistic Skill, or Stealth, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
      },
      {
        name: 'Dull Soul',
        snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
      },
    ],
  },
  {
    ...species('aaoa', 21, 'T’au', 'Fio T’au', 'The Builder', 14, 5),
    ...cost(14, 14, 0, 0),
    ...commonNames(''),
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 3 },
      { group: 'skills', value: 'scholar', threshold: 1 },
      { group: 'skills', value: 'tech', threshold: 1 },
    ],
    speciesFeatures: [
      {
        name: 'For the Greater Good (Fio)',
        snippet: 'When you assist an ally using Medicae, Scholar, or Tech , you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
      },
      {
        name: 'Dull Soul',
        snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
      },
    ],
  },
  {
    ...species('aaoa', 21, 'T’au', 'Kor T’au', 'The Flyer', 14, 6),
    ...cost(14, 14, 0, 0),
    ...commonNames(''),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'skills', value: 'awareness', threshold: 1 },
      { group: 'skills', value: 'pilot', threshold: 1 },
    ],
    speciesFeatures: [
      {
        name: 'For the Greater Good (Kor)',
        snippet: 'When you assist an ally using Awareness, Pilot, or Tech, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
      },
      {
        name: 'Grav-Adapted',
        snippet: 'You ignore all DN increases for high, low, or zero-gravity, and you gain a Flying Speed equal to your normal Speed when in zero gravity.',
      },
      {
        name: 'Dull Soul',
        snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
      },
    ],
  },
  {
    ...species('aaoa', 21, 'T’au', 'Por T’au', 'The Bureaucrat', 14, 6),
    ...cost(14, 14, 0, 0),
    ...commonNames(''),
    prerequisites: [
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'insight', threshold: 1 },
      { group: 'skills', value: 'persuasion', threshold: 1 },
    ],
    speciesFeatures: [
      {
        name: 'For the Greater Good (Por)',
        snippet: 'When you assist an ally using Cunning, Deception, or Persuasion, you may halve the number of dice you would add and add that many Icons to the test you are assisting.',
      },
      {
        name: 'Polyglot',
        snippet: 'You know additional languages equal to your Scholar rank. When you encounter an unfamiliar language, you gain +Double Rank on Scholar tests to learn or translate that language.',
      },
      {
        name: 'Dull Soul',
        snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
      },
    ],
  },
  {
    ...species('aaoa', 21, 'T’au', 'Aun T’au', 'The Lord', 40, 6),
    ...cost(40, 40, 0, 0),
    ...commonNames(''),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'willpower', threshold: 3 },
      { group: 'skills', value: 'leadership', threshold: 2 },
      { group: 'skills', value: 'scholar', threshold: 3 },
      { group: 'skills', value: 'weaponSkill', threshold: 1 },
    ],
    speciesFeatures: [
      {
        name: 'Ethereal Presence',
        snippet: 'T’AU characters within 12m always add bonus dice equal to twice the Ethereal’s Rank to their Resolve and Conviction tests. T’AU characters cannot willingly harm an Ethereal, and must pass a DN 5 Resolve test or become Pinned if their actions allow an Ethereal to be harmed.',
      },
      {
        name: 'Dull Soul',
        snippet: 'You cannot gain the PSYKER keyword under any circumstances.',
      },
    ],
  },
];

const dod = [
  // Tau
  {
    ...species('dod', 1, 'Tau Empire', 'Shas T\'au', 'The Offspring of Fire', 0, 6),
    ...cost(9,4,5,0),
    description:
      '<p>Born into the Fire Caste. Your life is determined by war and combat.</p>',
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Bound by Caste',
        snippet: 'You gain +1 to athletic and survival tests.',
        description:
          'Fire (Shas) form the military and are capable survivors and hunters. You gain +1 to athletic and survival tests.',
        modifications: [
          { targetGroup: 'skill', targetValue: 'athletics', modifier: 1 },
          { targetGroup: 'skill', targetValue: 'survival', modifier: 1 },
        ],
      },
      {
        name: 'Warp Presence',
        snippet: 'Never a Psyker. You gain +1 to resist telephatic powers or for Conviction tests.',
        description:
          'Tau can never have the PSYKER keyword or learn Psychic Powers. Their low presence in the warp also gives them +1 bonus dice when resiting telephatic powers or for Conviction tests.',
        modifications: [
          { targetGroup: 'trait', targetValue: 'conviction', modifier: 1 },
        ],
      },
      {
        name: 'For the Greater Good',
        snippet: 'Once per combat round, you may allow that an ally within 15 meters spend a Wrath Token from your pool as if it was theirs.',
        description:
          'Once per combat round, you may allow that an ally within 15 meters spend a Wrath Token from your pool as if it was theirs.',
      },
    ],
  },
];

const gohe = [
  {
    ...species('gohe', 5, 'Mankind', 'Jokaero', 'Simian Forgers', 10, 6),
    ...cost(58,48,10,0),
    description:
      '<p>Born into the Fire Caste. Your life is determined by war and combat.</p>',
    prerequisites: [
      { group: 'attributes', value: 'intellect', threshold: 4 },
      { group: 'attributes', value: 'fellowship', threshold: 3 },
      { group: 'skills', value: 'tech', threshold: 3 },
    ],
    speciesFeatures: [
      {
        name: 'Simple Simian',
        snippet: 'You gain +Rank to deception tests when convincing other species that you are not sentient and cannot speak.',
        description:
          'You gain +Rank to deception tests when convincing other species that you are not sentient and cannot speak.',
      },
      {
        name: 'Designed for success',
        snippet: 'You gain +Rank to tech tests when building new machines or operating existing ones.',
        description:
          'You gain +Rank to tech tests when building new machines or operating existing ones.',
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1, condition: 'when building new machines or operating existing ones' },
        ],
      },
    ],
  },
];

module.exports = [
  ...coreRep,
  ...fspg,
  ...aioe,
  ...aaoa,
  ...dod,
  ...gohe,
];
