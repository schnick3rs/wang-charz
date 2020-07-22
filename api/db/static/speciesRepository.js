const source = {
  core: { book: 'Core Rules (v1.5)', key: 'core', version: 'v1.5' },
  core10: { book: 'Core Rules (v1.0)', key: 'core10', version: 'v1' },
  coreab: { book: 'Abhumans (Beta)', key: 'core-legacy-abhumans', version: 'v0.5' },
  aaoa: { book: 'An Abundance of Apocrypha (v3)', sumplements: 'core', key: 'aaoa', version: 'v3', path: '/vault/an-abundance-of-apocrypha' },
  aaoa2: { book: 'An Abundance of Apocrypha (v2)', sumplements: 'core10', key: 'aaoa2', version: 'v2', path: '/vault/an-abundance-of-apocrypha' },
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
}

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
        name: 'Angel of Death',
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
        name: 'Angel of Death',
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
        name: 'Outsider',
        snippet: '+2DN to all Interaction tests with members of the Imperium.',
      },
      {
        name: 'Intense Emotion',
        snippet: '+1DN to all Resolve Tests. If you fail a Willpower based test in a scene involving emotion, the GM gains +1 Ruin.',
      },
      {
        name: 'Psychosensitive',
        snippet: 'You may choose to take the PSYKER Keyword.',
        description: '<p>You may choose to take the <strong>PSYKER</strong> Keyword.</p>',
        // todo options to select beeing a psyker
      },
      {
        name: 'Asuryani Paths',
        snippet: 'You walked a path of the Asuryani.',
        description: 'Select a fancy path',
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
        name: 'Outsider',
        snippet: '+2DN to all Interaction tests with members of the Imperium.',
      },
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
    ...species('aaoa', 11,'Drukhari','Drukhari','The Sinister Kin',20,8),
    ...cost(20,20,0, 0),
    ...commonNames('Akhirion, Anarkyss, Anielyn, Bekliel, Ethrilliac, Grendett, Grevyth, Kylos, Laelanyel, Madrax, Melikka, Mellyx, Monsatos, Narlek, Nyktos, Peiythia, Phyrix, Selithrian, Theskril, Thessa, Thraed, Thresyn, Thrixxesh, Quaez, Uless, Vrexith, Vylekh, Vypus, Xela, Xurul'),
    ...statMax(7,7,12,12,12,10,6,10),
    prerequisites: [
      { group: 'attributes', value: 'agility', threshold: 3 },
      { group: 'attributes', value: 'strength', threshold: 2 },
      { group: 'skills', value: 'intimidation', threshold: 2 },
    ],
    speciesFeatures: [
      {
        name: 'Outsider',
        snippet: '+2DN to all Interaction tests with members of the Imperium.',
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
    ...species('aaoa', 11,'Squats','Squat','The forgotten',28,5),
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
];

/*
const homebrewReps = [
  simpleStub('heva', 6, 'Aeldari', 'Dark Eldar', 'From the shadows, from the Dark City', 20, 1),
  {
    ...simpleStub('lotn', 3, 'Necrons', 'Necron', 'Living metal form the deepest slumber', 60, 3),
    stub: false,
    speed: 5,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Increase Strength, Toughness, Resolve and Wounds by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'wounds', modifier: 1 },
        ],
      },
      {
        name: 'Reanimation Protocols',
        description:
          'A Necron reduced to 0 wounds gains +1 to the die result of its Defiance checks, ' +
          'and if it rolls a 6 (after bonuses) it returns to consciousness with d6 wounds remaining rather than 1. ' +
          'If a Necron fails 3 defiance checks and would “die”, it is instead returned to its home tomb for repairs via teleportation. ' +
          'It remains dead and leaves behind a body only if the defiance check that “killed” the Necron was a 1, or if the Necron was killed by Annihilation.'
      },
      {
        name: 'Living Metal',
        description:
          'A Necron regenerates 1 wound at the beginning of each of its turns if it has more than 0 wounds. ' +
          'It does not need to eat, sleep, or breathe, and is immune to disease, poison, or blood loss. ' +
          'If not equipped with other plating, a Necron is considered to have AV 4. ' +
          'For the purposes of weapons and abilities that affect machines, a Necron is considered a machine.'
      },
      {
        name: 'Soulless Machine',
        description:
          'A Necron cannot be affected by any ability or psychic power that would inflict fear or affect the target’s emotions or soul. ' +
          'A Necron never needs to pass Resolve tests in order to keep fighting. ' +
          'A Necron’s Corruption is permanently locked at 0.'
      },
      {
        name: 'A Galaxy of Enemies',
        snippet: 'You suffer +3 DN to Social Tests (not Intimidation) with non-Necrons.',
        description:
          'A Necron is generally hated by all other races.' +
          ' It suffers a +3DN penalty to all social tests apart from Intimidate when dealing with non-Necrons.'
      },
    ],
  },
  {
    ...simpleStub('pax', 14, 'Mankind', 'Navigator', 'Blessed with the third eye', 50, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Fellowship by 1. Increase Willpower by 1.',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'willpower', modifier: 1 },
        ],
      },
      {
        name: 'Warp Eye',
        snippet: 'Gain the Lidless Stare Power. Lean or improve powers with each Rank or point buy.',
        description:
          'All Navigators begin with the Lidless Stare Navigator power and may select an ' +
          'additional navigator power or improve an existing power (see Navigator Powers) at each ' +
          'additional Rank. They may also purchase additional powers, subject to Tier ' +
          'restrictions (as if they were psychic powers), including powers gained for free.',
        psychicDisciplines: [ 'Navigator Powers'],
        psychicPowers: [
          { name: 'navigatorPowers', selected: 'The Lidless Stare', query: { name: 'The Lidless Stare' }, options: [], free: true },
        ],
      },
      {
        name: 'Stared into the Abyss',
        snippet: 'Gain +1 die to Fear tests against daemons. +2 DN to Melificarum, Chaos and Daemonic Powers against you.',
        description:
          'All Navigators have witnessed the horrors of the Warp many times, because of this ' +
          'they gain +1 bonus die to Fear tests when confronted by any daemonic creatures.' +
          'Navigators are also resistant to Chaos, so any psychic powers from the Malificarum discipline ' +
          'or possessing the <Chaos> or <Daemonic> keywords have a reduced effect against Navigators, ' +
          'with the Navigator inflicting a +2 DN penalty to such powers that target him.',
      },
      {
        name: 'Are Navigators Psykers?',
        snippet: 'You are considered a Psyker. But you can never lear powers, the keyword or respective ascension packages.',
        description:
          'Navigators are not marked as psykers in the traditional sense within the Imperium, ' +
          'though they do have a connection with the warp and use its power to fuel their abilities. ' +
          'For all game purposes, however, a Navigator character is considered a psyker. ' +
          'This means that weapons, powers, and creatures that have special effects on a character ' +
          'that possess the Psyker keyword will have similar effects on a Navigator character. ' +
          'However, Navigators can never gain the Psyker keyword, nor gain psychic powers or take the Psychic Revelation ascension package.',
      },
      {
        name: 'Navigator Mutation',
        snippet: 'Roll a random mutation or select Strangely Jointed Limbs, Elongated Form, Pale and Hairless Flesh, Eyes as Dark as the Void.',
        description:
          'Navigators begin play with a single mutations randomly determined from Table: Navigator Mutations, ' +
          'or chosen from the following options: ' +
          'Strangely Jointed Limbs, Elongated Form, Pale and Hairless Flesh, Eyes as Dark as the Void.',
        options: [
          { name: 'Strangely Jointed Limbs', snippet: 'You gain +2 bd to Agility attribute tests when performing acts of contortionism or similar acrobatic feats requiring flexibility.' },
          { name: 'Elongated Form', snippet: 'You lose -1 Toughness permanently. Re-roll this mutation if you already have the Bloated Form mutation.' },
          { name: 'Pale and Hairless Flesh', snippet: 'Your skin is pale, marbled with veins and completely without hair.' },
          { name: 'Eyes as Dark as the Void', snippet: 'you gain the ability to see in the dark, and never suffer penalties to your vision from it.' },
          { name: 'Withered Form', snippet: 'You reduce your Strength Attribute species maximum by 1 permanently and reduce your Speed by 2. Re-roll this mutation if you already have the Bloated Form mutation.' },
          { name: 'Bloated Form', snippet: 'You gain 1 Resilience and increase your Shock value by 2 but may no longer run. Re-roll this mutation if you already have the Elongated Form or Withered Form mutations.' },
          { name: 'Membranous Growths', snippet: 'you suffer -1 to your Fellowship attribute species maximum.' },
          { name: 'Inhuman Visage', snippet: 'You gain the Fear (1) Trait.' },
          { name: 'Fingers like Talons', snippet: 'Your unarmed attacks gain an AP value of -1' },
          { name: 'Teeth as Sharp as Needles', snippet: 'Your unarmed attacks gain an AP value of -1 and suffer -1 to your Fellowship attribute species maximum.' },
          { name: 'Disturbing Grace', snippet: 'You gain +2 Speed' },
          { name: 'Strange Vitality', snippet: 'You gain +2 Resilience.' },
          { name: 'Unnatural Presence', snippet: 'All your tests that involve positive social interaction increase their DN by 1, whilst all those that involve intimidation or inducing fear gain +1 bd.' },
        ],
      },
      {
        name: 'Navigating the Warp',
        snippet: 'Use Willpower instead of Agility for warp-travel related Pilot tests.',
        description:
          'When making Pilot tests when traveling the warp (see Travelling the Immaterium, ' +
          'page 249 of the Wrath & Glory core rulebook), a Navigator combines her Pilot skill with ' +
          'her Willpower Attribute instead of Intellect',
      }
    ],
  },
  {
    ...simpleStub('pax', 18, 'Mankind', 'Untouchable', 'The soulless', 20, 1),
    stub: false,
    speed: 6,
    speciesFeatures: [
      {
        name: 'The Untouchable and the Profane',
        snippet: 'May not use, utilize or suffer from force, warp or deamon weapons.',
        description:
          'A force weapon, daemon weapon, or occult artefact (or the like) in the hands of an ' +
          'untouchable is merely a weapon or object of its type. The character may not unleash or ' +
          'benefit from any of the weapon’s special powers or abilities, or (in the case of a daemon weapon) master it. ' +
          'However, the same also applies to such items and weapons used against the untouchable. ' +
          'Other than base damage listed (a sword in the guts is still a sword in the guts after all) ' +
          'any other particular effect such a weapon would normally have on the untouchable is likewise ignored.',
      },
      {
        name: 'Psychic Null',
        snippet: 'Immune to positive and negative effects from Powers, unnatural talents, traits or abilities.',
        description:
          'An untouchable (thanks to his special nature) is spared the perils of interaction with the Warp. ' +
          'The untouchable can never gain nor benefit from the positive effects of psychic powers ' +
          'or any other related unnatural talents, traits, or abilities that call on the Warp for ' +
          'power, including sorcery, dark pacts or acts of faith. ' +
          'They may not take the psychic revelation ascension and can never gain the <Psyker> keyword. ' +
          'However, they are completely immune to the negative consequences of psychic power and ' +
          'similar abilities, and ignore any such effects that target them outright.',
      },
      {
        name: 'Soulless',
        snippet: '+1 DN to all interactions tests with other characters.',
        description:
          'Psychic Untouchables are incredibly rare, and often live lonely and short lives due ' +
          'to the effect they have on all living beings that get near them. ' +
          'They suffer +1 DN to all interaction tests with other characters.',
      },
      {
        name: 'Human',
        snippet: 'May select Archetypes for Humans and Untouchables.',
        description:
          'Untouchables can take any archetypes listed with a prerequisite species of Human. ' +
          'In addition, there are Untouchable exclusive archetypes.',
      },
    ],
    variant: 'core-human',
  },
  {
    ...simpleStub('pax', 13, 'Mankind', 'Beastman', 'Beastly touch of unknown origin', 10, 1),
    stub: false,
    speed: 8,
    speciesFeatures: [
      {
        name: 'Attribute Modifications',
        snippet: 'Decrease Fellowship by 1. Increase Toughness or Strength by 1.',
        options: [
          { name: 'Toughness', modifications: [ { name: 'Toughness', targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 } ] },
          { name: 'Strength', modifications: [ { name: 'Strength', targetGroup: 'attributes', targetValue: 'strength', modifier: 1 } ] },
        ],
        modifications: [
          { targetGroup: 'attributes', targetValue: 'fellowship', modifier: -1 },
        ],
      },
      {
        name: 'Abhuman',
        snippet: '+1 DN to all interaction tests with characters possessing the Imperium keyword.',
      },
      {
        name: 'Restricted Archetypes',
        snippet: 'Beastmen can take any Tier 1 archetypes listed with a prerequisite species of Human.',
      },
      {
        name: 'Stable Mutation',
        snippet: 'All Beastmen have the Aberration Mutation (page 374 of the Wrath & Glory core rulebook) and choose an animal hybrid from Table 7-14: Hybrid Merges (page 375).',
        description:
          'The force of Corruption transforms the mutant, merging their flesh with that of a ' +
          'nearby animal to turn them into a hybrid beastman. If an animal. is in the immediate ' +
          'vicinity, choose that species or the nearest approximation from Table 7-14: Hybrid Merges. ' +
          'If no animals are nearby, roll on the chart, assuming that beast was the closest, even ' +
          'if it was on a distant world. While the example animals are all terrestrial, players are ' +
          'encouraged to coin names for species from other planets that fulfil similar niches. ' +
          'If the player and GM wish to use another animal, they are encouraged to do so using these examples as a model.',
         options: [
          {
            name: 'Horse',
            snippet: 'You increase Toughness and Speed by 1.',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of an equine, ' +
              'and they grow a lengthy mane and tail. Their feet transform into hooves and their ' +
              'legs become digitigrade. The character must modify any clothing worn on the head or ' +
              'lower body to have it fit.</p><p>The character gains +1 modified Toughness and +1 Speed.</p>',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
            ],
          },
          {
            name: 'Tortoise',
            snippet: 'You increase Toughness and Resilience by 1.',
            description:
              '<p>The character loses all body hair, and their torso becomes encased in a thick shell, ' +
              'into which they may withdraw their head and limbs. All clothing and armour must be ' +
              'modified to accommodate the extreme physiological transformation.</p>' +
              '<p>The character gains +1 modified Toughness and +1 Resilience.</p>',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 },
            ],
          },
          {
            name: 'Goat',
            snippet: 'Add +1 dice to Athletics test and you horns are a natural weapon (count as knife).',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of a goat, ' +
              'and they grow horns upon their brow. Their feet transform into hooves and their ' +
              'legs become digitigrade. The character must modify any clothing worn on the head or ' +
              'lower body to have it fit.</p>' +
              '<p>The character gains +1d to Athletics tests. ' +
              'They may make melee attacks with their horns, treating them as if they were a knife. ' +
              'Consequently, the character is never unarmed. ' +
              'When these growths are visible, the character suffers +1DN to all social interactions unless the character has the Chaos keyword.</p>',
            modifications: [
              { targetGroup: 'skills', targetValue: 'athletics', modifier: 1 },
            ],
          },
          {
            name: 'Shark',
            snippet: 'You can breath underwater and your fangs are natural weapons (count as knife).',
            description:
              '<p>The character loses all body hair, and their skin becomes rough to the touch. ' +
              'They grow gills, which they can distend at will for aquatic respiration. ' +
              'Their mouth expands and fills with massive fangs.</p>' +
              '<p>The character cannot drown underwater. ' +
              'They may make melee attacks with their fangs, treating them as if they were a knife. ' +
              'Consequently, the character is never unarmed.</p>',
            modifications: [
            ],
          },
          {
            name: 'Dog',
            snippet: 'Increase Speed by 1 and add +2 dice to Awareness tests.',
            description:
              '<p>The character’s body is covered with fur, their head distends into that of a dog, ' +
              'including pointed or dropped ears. Their senses of smell and hearing improve. ' +
              'Their feet transform into paws and their legs become digitigrade. The character ' +
              'must modify any clothing worn on the head or lower body to have it fit.</p>' +
              '<p>The character gains +1 Speed and +2d to all Awareness tests.</p>',
            modifications: [
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 2 },
            ],
          },
          {
            name: 'Eagle',
            snippet: 'Add +1 die to Awareness tests and your beak is a natural melee weapon (count as knife).',
            description:
              '<p>The character’s body is covered in feathers, and a hooked beak emerges from their face. ' +
              'Their vision sharpens substantially. Their feet transform into scaly, ' +
              'hooked talons, and their legs become digitigrade. ' +
              'The character must modify any clothing worn on the head or lower body to have it fit. ' +
              'The character gains +1d to Awareness tests. ' +
              'They may make melee attacks with their beak, treating it as if it was a knife. ' +
              'Consequently, the character is never unarmed.</p>' +
              '<p>The character gains +1d to Awareness tests. ' +
              'They may make melee attacks with their beak, treating it as if it was a knife. ' +
              'Consequently, the character is never unarmed.</p>',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 1 },
            ],
          },
        ],
      }
    ],
    variant: 'core-human',
    archetypeRestrictionsMaxTier: 1,
  },
];
*/
module.exports = [
  ...coreRep,
  ...aaoa,
  //...homebrewReps, xxx disavled for now, until updated to 1.5
];
