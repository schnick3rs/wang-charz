const source = {
  core: { book: 'Core Rules (revised)', key: 'core', version: 'v1.5' },
  core10: { book: 'Core Rules (v1.0)', key: 'core10', version: 'v1' },
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

const chapterz = function (sourceKey, sourcePage, name, primarch, affiliation, founding) {
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
    ...chapterz('core',95,'Blood Angles','Sanguinius','Imperium','First Founding (IX Legion)'),
    hint: 'Masters of Melee, compelled to drink the enemies blood.',
    beliefsAndTraditions: [
      {
        name: 'Savage Echoes',
        effect:
          'You may reroll Double Rank dice on any melee attack Test.',
      },
      {
        name: 'The Red Thirst',
        origin: 'Gene-seed',
        effect:
          'Whenever you are in melee combat and see blood, you must make a DN 3 Willpower Test. If you fail, you are Frenzied.',
      }
    ],
  },
  {
    ...chapterz('core',95,'Dark Angles','Lion El`Jonson','Imperium','First Founding (I Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Grim Resolve',
        effect: 'You may reroll Double Rank dice when you Aim and make a ranged attack.',
      },
      {
        name: 'The Unforgiven',
        origin: 'Tradition',
        effect: 'You suffer a +2 DN penalty to any social Tests made against anyone outside of your Chapter',
      },
    ],
  },
  {
    ...chapterz('core',95,'Imperial Fists','Regal Dorn','Imperium','First Founding (VII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'You may reroll Double Rank dice whenever you attack a building, fortification, or enemy in cover. You may also add +Rank dice whenever you make a Test related to architectural engineering',
      },
      {
        name: 'Geen-seed Flawed',
        origin: 'Geen-Seed',
        effect: 'You are missing implant 12: Sus-an Membrane, and implant 17: Bletcher’s Gland. See below for more information on Space Marine implants.',
      },
    ],
  },
  {
    ...chapterz('core',96,'Iron Hands','Ferrus Manus','Imperium','First Founding (X Legion)'),
    beliefsAndTraditions: [
      {
        name: 'The Flesh is Weak',
        effect: 'Choose one Augmetic Enhancement (p.242). You do not suffer the penalties of being Wounded (p.193). You gain +1 bonus die to Willpower Tests for every augmetic you have.',
      },
      {
        name: 'Ruthless Logic',
        origin: 'Tradition',
        effect: 'You suffer a +2 DN penalty to Fellowship-based Tests made against a target that does not have the IRON HANDS or ADEPTUS MECHANICUS Keywords.',
      },
    ],
  },
  {
    ...chapterz('core',96,'Raven Guard','Corvus Corax','Imperium','First Founding (XIX Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Master of Shadows',
        effect: 'You may reroll Rank dice when you make a Stealth (A) Test. Running, using a Jump Pack, or similar circumstances do not affect your Stealth (A) Tests.',
      },
      {
        name: 'Dark Heritage',
        origin: 'Geen-seed',
        effect: 'ou are missing implant 16: Mucranoid, and implant 17: Bletcher’s Gland. You suffer a + 1 DN penalty to any Fellowship based Test made against any target that could be frightened of your appearance. See below for more information on Space Marine implants',
      },
    ],
  },
  {
    ...chapterz('core',96,'Salamander','Vulkan','Imperium','First Founding (XVIII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Promethian Cult',
        effect: 'You may reroll Rank dice when you make an attack roll with a weapon with the FIRE or MELTA Keywords. You may reroll Double Rank dice when you roll Determination against a damage from a source with the FIRE or MELTA Keyword.',
      },
      {
        name: 'Infernal Inheretance',
        origin: 'Geen-seed',
        effect: 'Whenever an ally within 30 metres of you is killed, the GM gains +1 Ruin. You suffer a + 2 DN penalty to any Fellowship-based Test made against any target that could be frightened of your appearance',
      },
    ],
  },
  {
    ...chapterz('core',96,'Space Wolves','Lemon Russ','Imperium','First Founding (VI Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Hunters Unleashed',
        effect: 'You have the Acute Sense Talent (p.129) and the Dual Wield Talent (p.133).',
      },
      {
        name: 'Savage Within',
        origin: 'Geen-seed',
        effect: 'You cannot Fall Back (p.189).',
      },
    ],
  },
  {
    ...chapterz('core',96,'Ultramarines','Roboute Guilliman','Imperium','First Founding (XIII Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Tactical Versatility',
        effect: 'You may Shift for Glory twice as part of a Test.',
      },
      {
        name: 'Pride Of Ultramar',
        origin: 'Tradition',
        effect: 'You start each session with 1 Wrath Point instead of 2.',
      },
    ],
  },
  {
    ...chapterz('core',97,'White Scars','Jaghatai Khan','Imperium','First Founding (V Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Lightning Assault',
        effect: 'You may reroll Double Rank dice whenever you make a Pilot (A) Test. You triple your Speed when you Charge (p.189).',
      },
      {
        name: 'Ritual Scarring',
        origin: 'Tradition',
        effect: 'You suffer a +1 DN penalty to any Fellowshipbased Test made against any target that could be frightened of your appearance.',
      },
    ],
  },
];

const aaoa = [
  {
    ...chapterz('aaoa',12,'Black Templars','','Mankind',''),
    beliefsAndTraditions: [
      simpleEffect('Righteous Zeal: When charging, a Black Templars Space Marine may re-roll up to ½ Rank dice on their Weapon Skill test.'),
      simpleEffect('No Retreat (Tradition): Like their Imperial Fists progenitors, Black Templars are tenacious and stubborn. If a Black Templars Space Marine fails a Willpower test, the GM gains 1 Ruin.'),
      simpleEffect('Deny the Witch: Characters with the Black Templars keyword may not, under any circumstances, take the Psyker keyword: the Black Templars accept no psykers within their ranks.'),
    ],
  },
  {
    ...chapterz('aaoa',12,'Crimson Fists','','Mankind',''),
    beliefsAndTraditions: [
      simpleEffect('No Matter The Odds: When making an attack while outnumbered at least two-to-one, a Crimson Fists Space Marine may add +½ Rank dice to their Ballistic Skill or Weapon Skill test.'),
      simpleEffect('No Retreat (Tradition): Like their Imperial Fists progenitors, Crimson Fists are tenacious and stubborn. If a Crimson Fists Space Marine fails a Willpower test, the GM gains 1 Ruin.'),
    ],
  },
  {
    ...chapterz('aaoa',12,'Grey Knights','','Mankind',''),
    beliefsAndTraditions: [
      simpleEffect('Daemonbane: When attacking a creature with the Daemon keyword in melee combat, a Grey Knights Space Marine adds +½ Rank ED to the attack’s damage. The character also gains the Psyker, Inquisition, and Ordo Malleus keywords, if their archetype does not already provide them.'),
      simpleEffect('Secretive (Tradition): Grey Knights do not trust outsiders, and their nature cannot be permitted to be known to any outside the chapter. They suffer a +2DN penalty for Interaction tests involving anyone who lacks the Grey Knights or Inquisition keywords.'),
    ],
  },
  {
    ...chapterz('aaoa',13,'Emperor`s Children','Fulgrim','Chaos','First Founding (III Legion)'),
    beliefsAndTraditions: [
      simpleEffect('In Pursuit of Perfection: Each Emperor’s Children Space Marine seeks to perfect a single aspect of the arts of warfare. Select one of the following skills: Awareness, Ballistic Skill, Leadership, Pilot, Weapon Skill. The character gains +½ Rank as a bonus to all uses of that skill.'),
      simpleEffect('Fear of Imperfection (Tradition): The Emperor’s Children cannot abide the imperfect and fear the notion that a flaw may mean perfection is unattainable. Whenever an Emperor’s Children Space Marine suffers a complication on the skill chosen for Pursuit of Perfection, above, the GM gains 1 Ruin, in addition to any other results.', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',13,'Iron Warriors','Perturabo','Chaos','First Founding (IV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Siege Masters: Iron Warriors know fortifications. An Iron Warriors Space Marine may add his Rank bonus to damage when attacking any building or fortification. An Iron Warriors Space Marine may spend a Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.'),
      simpleEffect('Scorn for the Weak (Tradition): Iron Warriors despise weakness in their comrades. If an ally of an Iron Warriors Space Marine fails a Resolve test, the Iron Warrior must pass a Willpower test (DN 3). On a failure, the Iron Warrior feels a strong urge to punish that ally. If the failure involves a complication, the Iron Warrior may not resist this urge. The GM may alter the DN based on the severity or significance of the failure.', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',13,'Night Lords','Konrad Curze','Chaos','First Founding (VIII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Ave Dominus Nox: Night Lords revel in the fear of others and are swift to spread it. While under cover of darkness, a Night Lord Space Marine may add +½ Rank to Defence and Speed. A Night Lord Space Marine may spend one Glory to cause Fear for the duration of a scene; enemies who encounter the Night Lord must pass a Fear test (DN 2+Rank).'),
      simpleEffect('Blood of Nostramo (Tradition): Night Lords often recruit from amongst the criminal element and have little love for a fair fight. A Night Lords Space Marine who sees an ally fail a Resolve or Fear test must attempt a Resolve test themselves (DN 3) or become pinned.', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',14,'World Eaters','Angron','Chaos, Khorne','First Founding (XII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Incarnate Violence: When attacking in melee combat, a World Eaters Space Marine may reroll up to Rank damage dice on every attack.'),
      simpleEffect('Butcher’s Nails (Gene-Seed): After engaging in melee combat, World Eaters become frenzied (see pages 230-231 of the Wrath & Glory rulebook) for the rest of the scene. The Willpower test to restrain their frenzy increases by +1 for every enemy they have killed during the scene.', 'Gene-Seed'),
    ],
  },
  {
    ...chapterz('aaoa',14,'Death Guard','Moartarion','Chaos, Nurgle','First Founding (XIV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Inexorable Advance: A Death Guard Space Marine may count as being within close range of an enemy if within 3/4 of the weapon’s listed range (so, 30m for a boltgun, instead of 20m, for example).'),
      simpleEffect('Intractable (Tradition): Death Guard are slow and purposeful, never given to needless haste when they could instead grind their foes down with inexorable force. A Death Guard Space Marine must spend a point of Glory to take the Sprint action.', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',14,'Thousand Sons','Magnus the Red','Chaos, Tzeentch','First Founding (XV Legion)'),
    beliefsAndTraditions: [
      simpleEffect('The Rubric: A Thousand Sons Space Marine gains the Psyker keyword and may reroll up to Rank dice on any Psychic Mastery tests.'),
      simpleEffect('Gift of Mutation (Gene-Seed): Thousand Sons Space Marines gain an additional +1 Corruption whenever they would gain one or more Corruption points. They also increase the DN of all tests to resist Corruption or Malignancy by +1.', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',15,'Black Legion','Horus Lupercal','Chaos','First Founding (XVI Legion)'),
    beliefsAndTraditions: [
      simpleEffect('The Tip of the Spear: A Black Legion Space Marine gains an additional +½ Rank on all Ballistic Skill tests made with a ranged weapon at close range.'),
      simpleEffect('Bitter Pride (Tradition): The Black Legion have little love for those outside their ranks. They suffer a +2DN penalty for Interaction tests involving anyone outside the Black Legion, unless those people are subordinate to the Black Legion character.'),
    ],
  },
  {
    ...chapterz('aaoa',15,'Word Bearers','Logar Aurelian','Chaos','First Founding (XVII Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Profane Zeal: A Word Bearers Space Marine may reroll any failed Resolve test. In addition, a Word Bearer is immune to fear caused by creatures with the Daemon keyword.'),
      simpleEffect('The Will of the Gods (Tradition): Word Bearers follow the will of the Chaos Gods, as interpreted through their prayers and visions, and through the guidance of their Apostles, and must strive to walk the path the Dark Gods set before them. A Word Bearers Space Marine begins each session with one fewer Wrath. The character regains this lost Wrath point if he accomplishes his Objective during the session (in addition to the normal benefits of accomplishing an Objective).', 'Tradition'),
    ],
  },
  {
    ...chapterz('aaoa',15,'Alpha Legion','Alpharius Omegon','Chaos','First Founding (XX Legion)'),
    beliefsAndTraditions: [
      simpleEffect('Mutable Tactics: After each Respite, select one of the following skills: Athletics, Cunning, Deception, Intimidation, Persuasion, Stealth, or Tech. The Alpha Legionnaire may re-roll up to Rank dice on any test involving the chosen skill.'),
      simpleEffect('I Am Alpharius (Tradition): The Alpha Legion rely on deception and misdirection, and disdain direct tactics. An Alpha Legionnaire suffers a +2DN penalty to any combined action with anyone who lacks the Alpha Legion keyword.', 'Tradition'),
    ],
  },
];

const ltgb = [
  {
    ...chapterz('ltgb',4,'Black Legion','Horus Lupercal','Chaos','First Founding (Legion)'),
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
    ...chapterz('ltgb',5,'Iron Warriors','Perturabo','Chaos','First Founding (Legion)'),
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
    ...chapterz('ltgb',5,'Night Lords','Konrad Kurze','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Terror Troups',
        effect:
          'Night Lords have reputations as sadistic murderers and tourturers, who intentionally spread pain and suffering to their enemies. ' +
          'A Night Lord inflicts a ½ Rank penalty to Willpower to any enemy within 2m of a Night Lord.',
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
    ...chapterz('ltgb',6,'Word Bearers','Lorgar','Chaos','First Founding (Legion)'),
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
    ...chapterz('ltgb',6,'Alpha Legion','Alpharius Omegon','Chaos','First Founding (Legion)'),
    beliefsAndTraditions: [
      {
        name: 'Hidden in Plain Sight',
        effect:
          'Alpha Legionnaires are masters of stealth and decoy tactics, both on the battlefield and off it. ' +
          'An Alpha Legionnaire adds +½ Rank to all Stealth and Deceive Tests.',
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
    ...chapterz('ltgb',6,'Death Guard','Mortarion','Chaos, Nurgle','First Founding (Legion)'),
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
    ...chapterz('ltgb',7,'Emperor´s Children','Fulgrim','Chaos, Slaanesh','First Founding (Legion)'),
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
    ...chapterz('ltgb',7,'Thousand Sons','Magnus the Red','Chaos, Tzeentch','First Founding (Legion)'),
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
    ...chapterz('ltgb',7,'World Eaters','Angron','Chaos, Khorne','First Founding (Legion)'),
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
    ...chapterz('dod','-','Doctors of Doom (House Isenwell)','-','Imperium','Unknown'),
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
    ...chapterz('dod','-','Doctors of Doom (House Hironiat)','-','Imperium','Unknown'),
    beliefsAndTraditions: [
      {
        name: 'Siege Masters',
        effect: 'You may reroll Double Rank dice whenever you attack a building, fortification, or enemy in cover. You may also add +Rank dice whenever you make a Test related to architectural engineering',
      },
      {
        name: 'Geen-seed Flawed',
        origin: 'Geen-Seed',
        effect: 'You are missing implant 12: Sus-an Membrane, and implant 17: Bletcher’s Gland. See below for more information on Space Marine implants.',
      },
    ],
  },
];

module.exports = [
  ...core,
  //...dod,
  //...aaoa,
  //...ltgb,
];
