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
  dod: { book: 'Doctors of Doom Compendium', key: 'dod', version: '', path: '' },
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

// Siege Masters: Iron Warriors know fortifications. An Iron Warriors Space Marine may add his Rank bonus to damage when attacking any building or fortification. An Iron Warriors Space Marine may spend a Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.
const simpleEffect = function (effectString, origin = 'Tradition') {
  const effectParts = effectString.split(':').map(i=>i.trim());

  return {
    name: effectParts[0],
    effect: effectParts[1],
    tradition: origin,
  };
};

const simpleSource = function(key, page) {
  return {
    source: {
      ...source[key],
      page,
    },
  };
};

const simpleChapter = function (sourceKey, sourcePage, name, primarch, affiliation, founding) {
  return {
    ...simpleSource(sourceKey, sourcePage),
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    primarch,
    affiliation,
    founding,
  };
};

const core = [
  {
    ...simpleChapter('core',95,'Blood Angles','Sanguinius','Imperium','First Founding (IX Legion)'),
    hint: 'Masters of Melee, compelled to drink the enemies blood.',
    beliefsAndTraditions: [
      {
        name: 'Blood Frenzy',
        effect:
          'When attacking in melee combat, a Blood Angels Space Marine may reroll up to Rank damage dice on every attack.',
      },
      {
        name: 'The Red Thirst',
        origin: 'Gene-seed',
        effect:
          'After engaging in melee combat, Blood Angels must pass a Willpower test (DN 3). ' +
          'On a failure, the Blood Angels Space Marine feels a strong urge to drink the blood of the fallen—the player may choose how to respond to this urge. ' +
          'If the failure involves a complication, the Blood Angels Space Marine may not resist this urge. ' +
          'The Game Master may alter the DN based on how long it has been since the character has tasted blood.',
      }
      ],
  },
  {
    ...simpleChapter('core',95,'Dark Angles','Lion El`Jonson','Imperium','First Founding (I Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Fire Discipline',
        effect: 'When Dark Angels make a ranged attack using a held action, they ignore up to Rank penalties on the attack.',
      },
      {
        name: 'The Secret',
        origin: 'Tradition',
        effect: 'Dark Angels distrust anyone outside of their chapter. They suffer a +2DN penalty for Interaction tests involving anyone outside the Dark Angels chapter',
      },
    ],
  },
  {
    ...simpleChapter('core',95,'Imperial Fists','Regal Dorn','Imperium','First Founding (VII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'Imperial Fists immediately recognise the weaknesses in any fortification. '
        + 'An Imperial Fists Space Marine may add his Rank bonus to damage when attacking '
        + 'any building or fortifi cation. An Imperial Fists Space Marine may spend a '
        + 'Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.',
      },
      {
        name: 'No Retreat',
        origin: 'Tradition',
        effect: 'Imperial Fists are stubborn, tenacious and stoic. If an Imperial Fists '
        + 'Space Marine fails a Willpower test, the GM gains 1 Ruin.',
      },
    ],
  },
  {
    ...simpleChapter('core',96,'Iron Hands','Ferrus Manus','Imperium','First Founding (X Legion)'),
    beliefsAndTraditions: [
      {
        name: 'The Flesh is Weak',
        effect: 'Iron Hands draw surety from their cybernetic replacements. An Iron Hands Space Marine gains a bonus to Willpower tests equal to the number of cybernetic replacement parts he has, up to Rank.',
      },
      {
        name: 'Unforgiving',
        origin: 'Tradition',
        effect: 'The Iron Hands despise weakness and corruption. When an Iron Hands Space '
        + 'Marine fails a Corruption test, the GM gains 2 Ruin rather than 1.',
      },
    ],
  },
  {
    ...simpleChapter('core',96,'Raven Guard','Corvus Corax','Imperium','First Founding (XIX Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Master of Shadows',
        effect: 'A Raven Guard may reroll up to Rank dice when making a Stealth test. '
        + 'Raven Guards may make Stealth tests even under unusual circumstances, such as '
        + 'while Running (but not Sprinting) or while using a Jump Pack.',
      },
      {
        name: 'Fiercely Independent',
        origin: 'Tradition',
        effect: 'Raven Guards traditionally disdain using direct tactics and have a '
        + 'reputation for independent action. A Raven Guard Space Marine suffers a +2DN '
        + 'penalty to any combined action (see page 52) with non- Raven Guards',
      },
    ],
  },
  {
    ...simpleChapter('core',96,'Salamander','Vulkan','Imperium','First Founding (XVIII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Fire Born',
        effect: 'Salamanders receive +Rank bonus dice for Soak rolls when resisting '
        + 'damage from any weapon or effect with the Fire or Melta keywords',
      },
      {
        name: 'Unyielding',
        origin: 'Tradition',
        effect: 'Salamanders are determined warriors who consider retreat or surrender an '
        + 'act of last resort. If a Salamanders Space Marine fails a Resolve test, '
        + 'the GM gains 1 Ruin.',
      },
    ],
  },
  {
    ...simpleChapter('core',96,'Space Wolves','Lemon Russ','Imperium','First Founding (VI Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Heightened Senses',
        effect: 'Space Wolves receive +Rank bonus dice to any Awareness test due to their '
        + 'lupine senses.',
      },
      {
        name: 'Savage Within',
        origin: 'Tradition',
        effect: 'Space Wolves suffer a +2DN penalty for any Infl uence tests for authority '
        + 'outside of dealing with their own Chapter.',
      },
    ],
  },
  {
    ...simpleChapter('core',96,'Ultramarines','Roboute Guilliman','Imperium','First Founding (XIII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Courage and Honour',
        effect: 'The Ultramarines are adept at multiple aspects of war—they are exemplars '
        + 'of brotherhood and adapt quickly to changing circumstances. An Ultramarines Space '
        + 'Marine may choose to bank up to 2 Exalted Icons for Glory per test instead of just 1.',
      },
      {
        name: 'Pride of Ultramar',
        origin: 'Tradition',
        effect: 'The Ultramarines are held to a high standard, and work doubly hard to '
        + 'excel under the eyes of their reborn Primarch, Roboute Guilliman. An Ultramarines '
        + 'Space Marine begins each session with 1 fewer Wrath. The character regains this '
        + 'lost Wrath point if he accomplishes his Objective during the session (in addition '
        + 'to the normal benefits of accomplishing an Objective).',
      },
    ],
  },
  {
    ...simpleChapter('core',97,'White Scars','Jaghatai Khan','Imperium','First Founding (V Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Swift as the Wind',
        effect: 'White Scars are famously agile in the saddles of their bikes. A White '
        + 'Scars Space Marine gains +Rank bonus to Piloting tests for vehicles with '
        + 'the Adeptus Astartes keyword.',
      },
      {
        name: 'Strike like Lightning',
        origin: 'Tradition',
        effect: 'White Scars value swift action and are reluctant to give up the chase '
        + 'when hunting their foes. A White Scars Space Marine must spend a point of Glory '
        + 'to Hold Action (see page 222).',
      },
    ],
  },
];

const aaoa = [
  {
    ...simpleChapter('aaoa',13,'Emperor`s Children','Fulgrim','Chaos','First Founding (III Legion)'),
    beliefsAndTraditions: [
      simpleEffect('In Pursuit of Perfection: Each Emperor’s Children Space Marine seeks to perfect a single aspect of the arts of warfare. Select one of the following skills: Awareness, Ballistic Skill, Leadership, Pilot, Weapon Skill. The character gains +1/2 Rank as a bonus to all uses of that skill.'),
      simpleEffect('Fear of Imperfection (Tradition): The Emperor’s Children cannot abide the imperfect and fear the notion that a flaw may mean perfection is unattainable. Whenever an Emperor’s Children Space Marine suffers a complication on the skill chosen for Pursuit of Perfection, above, the GM gains 1 Ruin, in addition to any other results.', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',13,'Iron Warriors','Perturabo','Chaos','First Founding (IV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Siege Masters: Iron Warriors know fortifications. An Iron Warriors Space Marine may add his Rank bonus to damage when attacking any building or fortification. An Iron Warriors Space Marine may spend a Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.'),
      simpleEffect('Scorn for the Weak (Tradition): Iron Warriors despise weakness in their comrades. If an ally of an Iron Warriors Space Marine fails a Resolve test, the Iron Warrior must pass a Willpower test (DN 3). On a failure, the Iron Warrior feels a strong urge to punish that ally. If the failure involves a complication, the Iron Warrior may not resist this urge. The GM may alter the DN based on the severity or significance of the failure.', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',13,'Night Lords','Konrad Curze','Chaos','First Founding (VIII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Ave Dominus Nox: Night Lords revel in the fear of others and are swift to spread it. While under cover of darkness, a Night Lord Space Marine may add +1/2 Rank to Defence and Speed. A Night Lord Space Marine may spend one Glory to cause Fear for the duration of a scene; enemies who encounter the Night Lord must pass a Fear test (DN 2+Rank).'),
      simpleEffect('Blood of Nostramo (Tradition): Night Lords often recruit from amongst the criminal element and have little love for a fair fight. A Night Lords Space Marine who sees an ally fail a Resolve or Fear test must attempt a Resolve test themselves (DN 3) or become pinned.', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',14,'World Eaters','Angron','Chaos, Khorne','First Founding (XII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Incarnate Violence: When attacking in melee combat, a World Eaters Space Marine may reroll up to Rank damage dice on every attack.'),
      simpleEffect('Butcher’s Nails (Gene-Seed): After engaging in melee combat, World Eaters become frenzied (see pages 230-231 of the Wrath & Glory rulebook) for the rest of the scene. The Willpower test to restrain their frenzy increases by +1 for every enemy they have killed during the scene.', 'Gene-Seed'),
    ],
  },
  {
    ...simpleChapter('aaoa',14,'Death Guard','Moartarion','Chaos, Nurgle','First Founding (XIV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Inexorable Advance: A Death Guard Space Marine may count as being within close range of an enemy if within 3/4 of the weapon’s listed range (so, 30m for a boltgun, instead of 20m, for example).'),
      simpleEffect('Intractable (Tradition): Death Guard are slow and purposeful, never given to needless haste when they could instead grind their foes down with inexorable force. A Death Guard Space Marine must spend a point of Glory to take the Sprint action.', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',14,'Thousand Sons','Magnus the Red','Chaos, Tzeentch','First Founding (XV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('The Rubric: A Thousand Sons Space Marine gains the Psyker keyword and may reroll up to Rank dice on any Psychic Mastery tests.'),
      simpleEffect('Gift of Mutation (Gene-Seed): Thousand Sons Space Marines gain an additional +1 Corruption whenever they would gain one or more Corruption points. They also increase the DN of all tests to resist Corruption or Malignancy by +1.', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',15,'Black Legion','Horus Lupercal','Chaos','First Founding (XVI Legion)'),
    beliefsAndTraditions: [
      simpleEffect('The Tip of the Spear: A Black Legion Space Marine gains an additional +1/2 Rank on all Ballistic Skill tests made with a ranged weapon at close range.'),
      simpleEffect('Bitter Pride (Tradition): The Black Legion have little love for those outside their ranks. They suffer a +2DN penalty for Interaction tests involving anyone outside the Black Legion, unless those people are subordinate to the Black Legion character.'),
    ],
  },
  {
    ...simpleChapter('aaoa',15,'Word Bearers','Logar Aurelian','Chaos','First Founding (XVII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Profane Zeal: A Word Bearers Space Marine may reroll any failed Resolve test. In addition, a Word Bearer is immune to fear caused by creatures with the Daemon keyword.'),
      simpleEffect('The Will of the Gods (Tradition): Word Bearers follow the will of the Chaos Gods, as interpreted through their prayers and visions, and through the guidance of their Apostles, and must strive to walk the path the Dark Gods set before them. A Word Bearers Space Marine begins each session with one fewer Wrath. The character regains this lost Wrath point if he accomplishes his Objective during the session (in addition to the normal benefits of accomplishing an Objective).', 'Tradition'),
    ],
  },
  {
    ...simpleChapter('aaoa',15,'Alpha Legion','Alpharius Omegon','Chaos','First Founding (XX Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Mutable Tactics: After each Respite, select one of the following skills: Athletics, Cunning, Deception, Intimidation, Persuasion, Stealth, or Tech. The Alpha Legionnaire may re-roll up to Rank dice on any test involving the chosen skill.'),
      simpleEffect('I Am Alpharius (Tradition): The Alpha Legion rely on deception and misdirection, and disdain direct tactics. An Alpha Legionnaire suffers a +2DN penalty to any combined action with anyone who lacks the Alpha Legion keyword.', 'Tradition'),
    ],
  },
];

const ltgb = [
  {
    ...simpleChapter('ltgb',4,'Black Legion','Horus Lupercal','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Black Crusader',
        effect:
          'The Black Legion have fought with determined and steadfast will over the millennia, and will never hesitate to take the fight directly to their enemies. ' +
          'A Black Legionnaire may treat any Rapid Fire weapons he wields as Assault weapons in a turn where he ran, ' +
          'and may add +½ Rank bonus dice to any Interaction and Leadership tests he makes towards those with the Heretic Astartes Keyword.',
      },
      {
        name: 'Jealous Command',
        effect:
          'Black Legionnaires have high opinions of themselves, to the point that they will rarely suffer anyone to have authority over them. ' +
          'A Black Legionnaire will not gladly accept anyone outside his Legion as a superior, ' +
          'and inflicts a +2DN penalty to any Leadership tests made by the party unless the one making the test is also of the Black Legion.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',5,'Iron Warriors','Perturabo','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Siege Lords',
        effect:
          'An Iron Warrior is a master of siege warfare, and is skilled in destroying fortification and enemy structures. ' +
          'An Iron Warrior may add +½ Rank to ED when attacking fortifications and buildings, ' +
          'and may add +Rank to Awareness Tests in order to identify structural weaknesses.',
      },
      {
        name: 'Attrition Tactics',
        effect:
          'An Iron Warrior is known and feared as one who is willing to sacrifice anyone and anything to achieve his goal, ' +
          'and even while servants of the Imperium they achieved victory atop piles of corpses. ' +
          'An Iron Warrior suffers a +2DN penalty to influence tests to acquire followers or servants, ' +
          'as few besides base slaves will follow him to the ignoble death that surely awaits them.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',5,'Night Lords','Konrad Kurze','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Terror Troups',
        effect:
          'Night Lords have reputations as sadistic murderers and tourturers, who intentionally spread pain and suffering to their enemies. ' +
          'A Night Lord inflicts a 1/2 Rank penalty to Willpower to any enemy within 2m of a Night Lord.',
      },
      {
        name: 'Stand Alone',
        effect:
          'The Night Lords often reject the Chaos Gods and rarely, if ever use Daemons and their ilk. ' +
          'A Night Lord suffers a +2DN penalty to interaction tests with Daemonic enteties and those with the Mark of Chaos talent.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',6,'Word Bearers','Lorgar','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Profane Zeal',
        effect:
          'A Word Bearer is incredibly faithful, and treat their warfare as divinely ordained. ' +
          'Add +Rank bonus dice to all Conviction and Resolve Tests made by a World Bearer.',
      },
      {
        name: 'The Path to Damnation',
        effect:
          'The Word Bearers zeal ensures that Daemons always wait hungrily for one to fail in their charge and become prone to possession. ' +
          'If a Word Bearer fails a Willpower-based test, the GM gains 1 Ruin.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',6,'Alpha Legion','Alpharius Omegon','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Hidden in Plain Sight',
        effect:
          'Alpha Legionnaires are masters of stealth and decoy tactics, both on the battlefield and off it. ' +
          'An Alpha Legionnaire adds +1/2 Rank to all Stealth and Deceive Tests.',
      },
      {
        name: 'For the Emperor!',
        effect:
          'The Alpha Legion’s tactics are mysterious and their motives make them suspicious to many. ' +
          'An Alpha Legionnaire suffers a -2 DN penalty to non-hostile Interaction Tests with members of other Legions.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',6,'Death Guard','Mortarion','Chaos, Nurgle','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Inexorable Advance',
        effect:
          'The Death Guard fight with little care for their own bodies, and are trained to continually fire without slowing to brace. ' +
          'a Death Guard Marine ignores all penalties for firing a Heavy or Assault weapons due to moving or running, ' +
          'and may benefit from the Rapid Fire trait at a distance up to 36m, unless the weapon`s normal Rapid Fire range is higher.',
      },
      {
        name: 'Slow But Purposeful',
        effect:
          'he Death Guard’s physical changes have resulted in a form that does not reward haste. A Death Guard’s base speed is reduced by 1.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',7,'Emperor´s Children','Fulgrim','Chaos, Slaanesh','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Flawless Perfection',
        effect:
          'An Emperor’s Child possesses reflexes and agility beyond even that of a normal Astartes. He is never considered to be surprised and may act normally in surprise rounds, and once per combat, he may Seize the Iniave without spending glory.',
      },
      {
        name: 'Unaainable Standards',
        effect:
          'When one seeks to be without peer and without flaws, any failure is something that cannot be allowed. ' +
          'If an Emperor’s Child rolls a Complicaon on a test, he must pass a DN 4 Willpower test or spend a Wrath point to reroll all failures.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',7,'Thousand Sons','Magnus the Red','Chaos, Tzeentch','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Brotherhood of Psykers',
        effect:
          'All Thousand Sons that retain their sentience are psykers. ' +
          'A Thousand Son Astartes gains the Psyker keyword and may purchase the Psychic Mastery skill and Universal psychic powers, ' +
          'subject to Tier restrictions, though he does not gain any psychic powers for free. ' +
          'If a Thousand Son gains the Psyker keyword from his archetype, he may add 12m to the range of any psychic powers he casts that have a range.',
      },
      {
        name: 'The Flesh Change',
        effect:
          'Although it has been mitigated to a certain extent, the Thousand Sons’ geneseed is relatively unstable. ' +
          'If a Thousand Son gains one or more Corruption points, he gains one additional Corruption point.',
      },
    ],
  },
  {
    ...simpleChapter('ltgb',7,'World Eaters','Angron','Chaos, Khorne','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Butcher’s Nails',
        effect:
          'A World Eater is constantly punished with pain and annoyance whenever he does not indulge his violent impulses. ' +
          'When he does, his rage and ferocity are legendary. ' +
          'After making a charge move, a World Eater may ignore up to +Rank DN of penalties to melee multi-attacks he makes that turn.',
      },
      {
        name: 'The Depths of Hatred',
        effect:
          'A World Eater’s constant anger and rage causes him to seem unstable and violent, ' +
          'and he rarely minces words or acts in a manner that any would consider “charismatic“. ' +
          'A World Eater suffers a +3DN penalty to all social Interaction Tests apart from Intimidation.',
      },
    ],
  },
];

const dod = [

  {
    ...simpleChapter('dod','-','Doctors of Doom (House Isenwell)','-','Imperium','Unknown'),
    beliefsAndTraditions: [
      {
        name: 'Thunder’s Call',
        effect: 'Blade in hand, Isenwellers loudly issue challenges to those enemies they deem worthy to face them. A Isenweller may spend a Glory as a free action to issue a Thunder’s Call, picking out a specific threat. So long as he spends his next action(s) attempting to engage that enemy in melee, the target of the Call suffers a +½ Rank DN penalty to all attacks against targets that are not the Warden, and the Warden gains +½ Rank bonus dice to all melee attacks against the target until the target is dead or combat has ended. Only one enemy may be the target of a specific Isenweller’s Thunder’s Call at a time.',
      },
      {
        name: 'My Oath is My Bond',
        origin: 'Tradition',
        effect: 'A Isenweller who breaks his word is without honor, and to purposefully use a false oath to deceive an enemy is the lowest cowardice. If the Isenweller says that he will perform an action, and then does not at least earnestly attempt to perform that action, then the GM gains 2 ruin. ',
      },
    ],
  },
  {
    ...simpleChapter('dod','-','Doctors of Doom (House Hironiat)','-','Imperium','Unknown'),
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'Hironians immediately recognise the weaknesses in any fortification. '
          + 'An Hironian Space Marine may add his Rank bonus to damage when attacking '
          + 'any building or fortification. An Hironian Space Marine may spend a '
          + 'Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.',
      },
      {
        name: 'No Retreat',
        origin: 'Tradition',
        effect: 'Hironians are stubborn, tenacious and stoic. If an Hironian '
          + 'Space Marine fails a Willpower test, the GM gains 1 Ruin.',
      },
    ],
  },
];

module.exports = [
  ...core,
  ...aaoa,
  ...ltgb,
  ...dod,
];
