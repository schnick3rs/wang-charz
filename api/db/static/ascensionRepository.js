const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1' },
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
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleSource = function(key, page) {
  return {
    ...source[key],
    page: page,
  }
};

const simpleStub = function (sourceKey, sourcePage, name, hint, stub = true) {
  return {
    source: simpleSource(sourceKey, sourcePage),
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    hint,
    teaser: hint,
    stub: stub,
  };
};

const core = [
  {
    ...simpleStub('core', 199, 'Stay The Course', 'Overcome struggles, build alliances, acquire equipment.', false),
    cost: 10, // per tier difference
    minimumCampaignTier: 2,
    attributePrerequisites: [],
    skillPrerequisites: ['Required Archetype Skills +1'],
    influencePerTier: 1,
    ascensionFeatures: [
      { name: 'Keyword', /*<Any>*/ },
      {
        name: 'Story Element',
        snippet: '',
        description:
          '<p>The character gains their choice of either 3 Corruption points or ' +
          'a Memorable Injury (see page 233) of their choice and the +1D Bonus to ' +
          'Intimidation that comes with it from the Table 4-4: Memorable Injury.</p>',
        selected: '',
        options: [
          { key: 'corruption', name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }]
          },
          { key: 'memorableInjury', name: 'Memorable Injury',
            modifications: [ { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' }]
          },
        ],
      },
      {
        name: 'Wargear',
        snippet: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics.',
        options: [
          {
            name: 'Two Rare Items ',
            wargear: [
              {
                name: 'First Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
              {
                name: 'Second Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: true, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
            ],
          },
          {
            name: 'One Very Rare Item ',
            wargear: [
              {
                name: 'Very Rare Item of Value new Tier+3',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, useAscensionTargetTier: true, fixedValue: 3 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                  },
                ],
              },
            ],
          },
        ]
      }
    ],
  },
  {
    ...simpleStub('core', 200, 'Psychic Revelations', 'Tap into the warp, awaken powers, lure the Immaterium.', false),
    cost: 10, // per tier difference
    minimumCampaignTier: 2,
    attributePrerequisites: ['Willpower 3'],
    skillPrerequisites: [],
    influencePerTier: 1,
    ascensionFeatures: [
      {
        name: 'Psyker',
        snippet: 'You gain the Psyker Keyword',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Psyker' },
        ],
      },
      {
        name: 'Story Element',
        snippet: '',
        description:
          '<p>The character gains the smite psychic power. ' +
          'They also may choose one Minor Psychic power per Tier ' +
          'ascended and may purchase powers from one Discipline of their choice. ' +
          'The character must purchase the Psychic Mastery Skill.</p>',
        psychicPowers: [
          { name: 'ascensionSmite', selected: 'Smite', query: { name: 'Smite' }, options: [], free: true },
          { name: 'ascensionMinor1', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor2', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor3', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
          { name: 'ascensionMinor4', selected: '', query: { discipline: 'Minor' }, options: [], free: true },
        ],
        modifications: [
          // access to one minor power
        ],
      },
    ],
  },
];

const aaoa = [
  {
    ...simpleStub('aaoa', 78, 'Agent of the Inquisition', 'Join the Inquisition (that was unexpected).', false),
    cost: 10, // per new tier difference
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      'Insight 2 OR Awareness 2',
      '<Imperium> Keyword',
    ],
    attributePrerequisites: ['Willpower 3'],
    skillPrerequisites: ['Insight 2', 'Awareness 2'],
    influencePerTier: 1,
    ascensionFeatures: [
      {
        name: 'Keywords',
        keywords: [
          'Inquisition',
          '<Ordo>',
        ]
      },
      {
        name: 'Story Element',
        snippet: 'You add +Rank dice to Influence and Interaction Skill Tests involving a character with the <Imperium> Keyword',
        description:
          '<p>The character’s status means that they may invoke the name and authority of their Inquisitor ' +
          'to gain +Rank to an Influence or Interaction skill test involving a being with the Imperium keyword. ' +
          'However, because of the character’s experiences, they gain 3 Corruption points or a Memorable Injury of their choice.</p>',
      },
      {
        name: 'Scorged from experience',
        description: '<p>Because of the character’s experiences, they gain 3 Corruption points or a Memorable Injury of their choice.</p>',
        selected: '',
        options: [
          { key: 'corruption', name: '3 Corruption Points',
            modifications: [ { name: 'Corruption', targetGroup: 'traits', targetValue: 'corruption', modifier: 3 }]
          },
          { key: 'memorableInjury', name: 'Memorable Injury',
            modifications: [ { name: 'Memorable Injury', targetGroup: 'abilities', targetValue: '', effect: 'You add +1 die to Intimidation Tests.' }]
          },
        ],
      },
      {
        name: 'Wargear',
        description:
          '<p>Inquisitorial Rosette (symbol of authority), plus up to two items of Rare Wargear, ' +
          'or one item of Very Rare Wargear, with a Value up to 3 + the new Tier.</p>',
        wargear: [
          { name: 'Symbol of Authority', variant: 'Inquisitorial Rosette' },
        ],
        options: [
          {
            name: 'Two items of Rare Wargear',
            wargear: [
              {
                name: 'Item of value (3+ new Tier) or less of up to Rare rarity.',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare'],
                  },
                ],
              },
            ],
          },
          {
            name: 'One  item of Very Rare Wargear',
            wargear: [
              {
                name: 'Item of value (3+ new Tier) or less of up to Very Rare rarity.',
                selected: '',
                options: [
                  {
                    filter: true,
                    valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 5 },
                    rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    description: '<p>You have been recruited by an Inquisitor to continue the ongoing fight against the Enemies of the Imperium. You’re not merely an informant or minion bearing the Inquisition’s mark, but a trusted associate and confidante of an Inquisitor, with valued skills, experience, and insights, and the ability to wield some measure of their authority.</p>',
  },
  {
    ...simpleStub('aaoa', 78, 'Apocryphon Oath', 'The Deathwatch have requested your service.',false),
    cost: 10, // per new tier difference
    minimumCampaignTier: 5,
    prerequisites: [
      'Willpower 5',
      'Ballistic Skill 5 OR Weapon Skill 5',
      '<Adeptus Astartes> Keyword',
    ],
    influencePerTier: 1,
    ascensionFeatures: [
      {
        name: 'Keywords',
        keywords: [
          'Deathwatch',
          'Inquisition',
          'Ordo Xenos',
        ]
      },
      {
        name: 'Deathwatch Arsenal',
        snippet: 'As an Action, you can transfer one Wrath to any other character with the Deathwatch Keyword. ',
        description:
          '<p>You join the ranks of the Deathwatch, and you are initiated into secrets that allow you to hunt Xenos more effectively. ' +
          'You receive the normal benefit for having the Ordo Xenos keyword ' +
          '(page 119 of the Wrath & Glory core rulebook) and have access to special Deathwatch ' +
          'arsenals containing rare and specialised equipment. ' +
          'In addition, so efficiently do you coordinate with your Kill-Team that at any time you may ' +
          'spend one Wrath in order to give one Wrath to any other character with the Deathwatch keyword.</p>',
      },
      {
        name: 'Wargear',
        description:
          '<p>One reload each of Dragonfire, Hellfire, Kraken, and Vengeance bolt rounds, and one Weapon Upgrade with a value of up to 7 (Very Rare).</p>',
        wargear: [
          { name: 'Dragonfire' },
          { name: 'Hellfire' },
          { name: 'Kraken' },
          { name: 'Vengeance' },
          {
            name: 'one Weapon Upgrade with a value of up to 7 (Very Rare)',
            selected: '',
            options: [
              {
                filter: true,
                valueFilter: { useCharacterTier: false, useSettingTier: false, fixedValue: 7 },
                rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                typeFilter: ['Weapon Upgrade'],
              },
            ],
          }
        ],
      },
    ],
    description: '<p>You have sworn to serve the Deathwatch, perhaps for a decade-long Vigil, perhaps in perpetuity. Either way, you are amongst the mightiest of Astartes, and you shall not suffer the alien to live.</p>',
  },
  {
    ...simpleStub('aaoa', 79, 'Betrayal', 'Missing the Chaos keyword? Wait no more! Also; Corruption...',false),
    description:
      '<p>You have seen that the Emperor is a False God, and you have forsaken the Imperium for the Dark Gods.</p>',
    cost: 10, // per new tier difference
    minimumCampaignTier: 2,
    prerequisites: [
      '<Imperium> Keyword',
    ],
    influencePerTier: 1,
    ascensionFeatures: [
      {
        name: 'Keywords',
        keywords: [
          'Heretic',
          'Chaos',
          '<Mark of Chaos>',
        ]
      },
      {
        name: 'Story Element',
        description:
          '<p>You lose the Imperium keyword. ' +
          'If you had the Adeptus Astartes keyword, you replace it with the Heretic Astartes keyword. ' +
          'If you had the Adeptus Mechanicus keyword, you replace it with the Dark Mechanicus keyword. ' +
          'If you had any talents that required you not to have the Chaos keyword, the build points from those talents are refunded. ' +
          'The recent nature of your betrayal means that you gain +2d on all Deception tests to pretend that you are still loyal.</p>',
      }
    ],
  },
  {
    ...simpleStub('aaoa', 78, 'Crux Terminatus', '"May I request a Terminator Armour, please?"', false),
    description:
      '<p>The Crux Terminatus is a stone medallion awarded to highly skilled and experienced Space Marine Veterans. All members of a Chapter trained in the use of Terminator Armour will have been first awarded the Crux Terminatus. These badges, set into the left shoulder plate of Terminator armour, are highly distinctive and usually fashioned from stone. In Codex Chapters, members of the Chapter\'s veteran First Company are the exclusive users of Terminator armour.</p>' +
      '<p>This Honour appears most commonly as a skull set onto a cruciform shape of red iron or bone. Terminator sergeants often add crossed bones behind the skull, whilst lightning bolts behind the skull are often added for Terminators trained as Assault units wielding lightning claws and thunder hammers with storm shields. Variations include the size and dimensions of the skull and the removal of the crossed lightning bolts or bones or their scale in relation to the shape of the cruciform. The Crux Terminatus is almost always worn on the left shoulder pad, though it may also be worn on one knee pad (this is usually done only in combination with the shoulder pad, however). Legend has it that the first Crux Terminatus ever crafted contained a tiny fragment of the Emperor\'s own armour within it, an honour granted to commemorate a squad of Imperial Fists Terminators who aided the Emperor in the battle against Horus. Whether or not this is true it means that ancient suits of power armour bearing Terminator Honours are considered even more rare and precious to a Chapter as a result of their reputed connection to the Master of the Imperium.</p>',
    cost: 50,
    costPerTier: 0,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Skills +1',
      '<Adeptus Astartes> Keyword',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    storyElementString:
      'The character is regarded as an honoured veteran amongst the Adeptus Astartes, ' +
      'and even when not wearing Terminator Armour, they are seen as some of the mightiest and most dedicated warriors in the Imperium. ' +
      'The character’s Resolve is increased by +2, ' +
      'and whenever the character makes a successful Weapon Skill, Ballistic Skill, or Leadership test, ' +
      'they may shift a single exalted icon to allow themselves and all allies with the Imperium keyword within 15m to heal 1+Rank Shock.',
    wargearString:
      'The character may request the use of Terminator Armour and accompanying weapons ' +
      '(normally a Storm Bolter and Power fist, but other combinations are common, including a Thunder Hammer and Storm Shield, or a pair of lightning claws)' +
      'from their Chapter’s armoury before embarking upon a mission. ' +
      'Primaris Astartes cannot use Terminator Armour, as no suits of it exist which fit their enhanced stature.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Honoured Veteran',
        snippet: 'Increase your resolve by 2.',
        description: '<p>The character’s Resolve is increased by +2.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 2 },
        ],
      },
      {
        name: 'Lead by Example',
        snippet: 'Shift a single exalted icon per Test (Weapon Skill, Ballistic Skill, Leadership) and all <Imperium> allies within 15m heal 1+Rank Shock.',
        description:
          '<p>Whenever the character makes a successful Weapon Skill, Ballistic Skill, or Leadership test, ' +
          'they may shift a single exalted icon to allow themselves and all allies with the Imperium keyword within 15m to heal 1+Rank Shock.</p>',
      },
      {
        name: 'Terminator',
        snippet: 'The character may request a Terminator Armour and accompanying Weapons.',
        description:
          '<p>The character may request the use of Terminator Armour and accompanying weapons ' +
          '(normally a Storm Bolter and Power fist, but other combinations are common, including a Thunder Hammer and Storm Shield, or a pair of lightning claws)' +
          'from their Chapter’s armoury before embarking upon a mission. ' +
          'Primaris Astartes cannot use Terminator Armour, as no suits of it exist which fit their enhanced stature.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 80, 'The Rubicon Primaris', 'Pick an Astartes and cross the rubicon to show those trueborn Primaris who\'s boss.',false),
    description:
      '<p></p>',
    cost: 50,
    costPerTier: 0,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Toughness 5',
      '<Adeptus Astartes> Keyword',
      'NOT <Primaris Astartes> Keyword',
    ],
    // Benefits
    influenceBonus: 1,
    influencePerTier: 0,
    storyElementString:
      'Change your Species from Adeptus Astartes to Primaris Astartes, with all the accompanying benefits. ' +
      'The cost of this has already been accounted for in the cost of this ascension package.',
    wargearString:
      'You replace your weapons and armour with the nearest equivalents which have the Primaris keyword. ' +
      'At the GM’s discretion, unique wargear may be altered or upgraded as well.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keyword',
        keywords: ['Primaris Astartes'],
      },
    ],
  },
  {
    ...simpleStub('aaoa', 81, 'Lost upon the Path of the Warrior', 'Gain some fancy Exarch gear but not everyone is pleased. ',false),
    description:
      '<p>An Exarch is a former Eldar Aspect Warrior who has lost himself upon the Eldar Path of the Warrior and is unable to ever leave it again. At this point he is considered to have abandoned the Eldar Paths with their promise of new experiences and development of new skills in favour of a constant life of bloodshed. The Eldar becomes the elite warrior called an Exarch; simultaneously, an Exarch is a priest of Kaela Mensha Khaine, the Eldar God of War as well as a caretaker of the individual warrior shrine, and trainer, teacher, and instructor for other Aspect Warriors. The sacrifice of an Eldar Exarch can summon an Avatar of Kaela Mensha Khaine. He is equipped with ancient and powerful Eldar weaponry and armour. Each Eldar Warrior Aspect has its own particular kind of Exarch. On the battlefield, an Exarch commands an individual squad of Eldar Aspect Warriors. Exarchs are formidable opponents, and most of them can use their often-potent psychic and combat abilities to help the whole squad of Aspect Warriors under their command.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Required Attributes +1',
      'Required Skills +1',
      '<Aspect Warrior> Keyword',
    ],
    // Benefits
    influenceBonus: 0,
    influencePerTier: 1,
    storyElementString:
      'You can no longer empathise with those who have not devoted their existence to war. ' +
      'You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return. ' +
      'In addition, you may now purchase and use Exarch Powers.',
    wargearString:
      'You replace your Aspect Armour with Exarch Armour, which provides the same functions but has ' +
      'an AP of 6 and loses the Bulky (X) or Cumbersome traits (if it had them). ' +
      'You may also replace one of your weapons with a weapon of up to Unique rarity and a Value of up to 5 plus your new Tier. ' +
      'The GM may create a unique weapon, an ancient relic of the Aeldari, for this purpose.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keyword',
        snippet: 'You gain the Exarch Keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Exarch' },
        ],
      },
      {
        name: 'You walk alone',
        description:
          '<p>You increase the DN of all Interaction tests against non-warriors by +2, and they suffer the same penalty in return.</p>',
      },
      {
        name: 'Exalted',
        snippet: 'You may purchase and use Exarch Powers (special talents).',
      },
      {
        name: 'Exarch Armour',
        description: 
          '<p>You replace your Aspect Armour with Exarch Armour, which provides the same functions ' +
          'but has an AP of 6 and loses the Bulky (X) or Cumbersome traits (if it had them).</p>',
        // filter for exarch armour
      },
      {
        name: 'Exarch Weapon',
        description:
          '<p>replace one of your weapons with a weapon of up to Unique rarity and a Value of up to 5 plus your new Tier.</p>' +
          '<p>The GM may create a unique weapon, an ancient relic of the Aeldari, for this purpose.</p>',
      }
    ],
  },
  {
    ...simpleStub('aaoa', 80, 'Lost upon the Seer Path', 'A prophet for the Aeldari, but lost on this course.',false),
    description:
      '<p>A Farseer is the most potent and respected form of Eldar psyker or Seer. A Farseer has become lost upon the Path of the Seer forever in the same way as the Exarchs are wed eternally to the Path of the Warrior. A council of the most powerful Farseers generally governs a Craftworld. Farseers possess a wide diversity of psychic specialities with divination being the most common skill. They are most often known for using their vast psychic powers to see the possibilities of the future so that they can manipulate events to better ensure the survival of the Eldar species in the wake of the Fall.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 4,
    prerequisites: [
      'Willpower 6',
      'Insight 6',
      'Psychic Mastery 6',
      '<Aeldari> Keyword',
      '<Asuryani> Keyword',
      '<Psyker> Keyword',
    ],
    // Benefits
    influenceBonus: 3,
    influencePerTier: 0,
    influenceString: '+3. You may use your Willpower instead of your Fellowship to determine your Influence.',
    storyElementString:
      'You gain the Prophetic Visions and Scry psychic powers. ' +
      'In addition, you may purchase additional Runes of Fate psychic powers, subject to Tier restrictions. ' +
      'Your maximum number of Psychic Powers is increased by 2. ' +
      'If you wish, you may trade in psychic powers you already possess, regaining the points spent on them, in order to buy new powers.',
    wargearString:
      'Ghosthelm, Runes of Witnessing, Runes of Warding.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keyword',
        keywords: ['Farseer'],
      },
      {
        name: 'Recognisable Fortitude',
        //snippet: '',
        description:
          '<p>You may use your Willpower instead of your Fellowship to determine your Influence.</p>',
      },
      {
        name: 'Unlock Powers',
        snippet: 'You gain the Prophetic Visions and Scry psychic powers.',
        // powers: Prophetic Visions, Scry
        // discipline access: Runes of Fate
        // increase power tier +2
        // may trade powers
      },
      {
        name: 'Unique Weapon',
        wargear: [
          { name: 'Ghosthelm' },
          { name: 'Runes of Witnessing' },
          { name: 'Runes of Warding' },
        ],
      },
    ],
  },
  {
    ...simpleStub('aaoa', 82, 'Possession', 'Invited a deamon (knock, knock) into yourself, boosting stats and corruption.',false),
    description:
      '<p>Daemonic Possession is the act of the essence of a Daemon possessing and controlling the body of another being. As Daemons can only exist in the Materium for a limited period before being forced back into the Warp, Daemonic Possession is one of the most common methods for Daemons to enter the material realm. Daemonic Possession can occur involuntarily to those of psychic potential, but the host sometimes willingly gives themselves over to Daemonic Possession, as is the case with Possessed Chaos Space Marines and certain Cultists. Possessed individuals can often be used as gateways to the Warp, allowing Daemons to spill into the Materium.</p>' +
      '<p>A character selecting this Ascension Package has invited a daemon into their flesh, granting them tremendous power, at the cost of subjecting their body, mind, and soul to the ravening touch of the Warp. Few who become possessed can endure it for long, often finding their bodies degenerating into spawndom or becoming purely a vessel for the daemon’s will, but some can find a degree of symbiosis with the daemon they are host to, becoming a singular mighty entity.</p>',
    cost: 0,
    costPerTier: 15,
    // Prerequisites
    minimumCampaignTier: 3,
    prerequisites: [
      'Willpower 4',
      '<Chaos> Keyword',
    ],
    // Benefits
    influenceBonus: 3,
    influencePerTier: 0,
    // corruption: +3, see below
    storyElementString:
      'The character is now possessed by a daemon of Chaos. ' +
      'The character gains the Daemonic special rule, described below. ' +
      'In addition, the character may draw upon the daemon’s power. ' +
      'Select three attributes when the character first becomes possessed; ' +
      'as a free action you may gain a number of bonus dice to those attributes equal to the campaign’s Tier. ' +
      'You may sustain this for as many rounds as you wish (or minutes, if outside of combat), ' +
      'but when you stop using this power, you suffer 1d3 Shock, ' +
      '+1 for each Round (or minute) you used the daemon’s power, and gain +1 Corruption. ' +
      'While using the daemon’s power, the character also gains the Horns, Spines, Fangs, ' +
      'or Claws minor mutation (page 373 of the Wrath & Glory rulebook), ' +
      'and a single major mutation, chosen when the character first became possessed. ' +
      'The character may attempt to Soak Mortal Wounds, and Soaking does not cost this character any Shock.',
    wargearString:
      'None. While manifesting the daemon’s power, it tends to meld your wargear and your flesh together, ' +
      'but this effect is normally reversed when you revert to your mortal state.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keyword',
        keywords: ['Daemon'],
      },
      {
        name: 'Corruption',
        snippet: 'You gain 3 points of Corruption.',
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
        ],
      },
      {
        name: 'Invoke Daemonic Power',
        description:
          '<p>Select three attributes when the character first becomes possessed; as a free action you may gain a number of bonus dice to those attributes equal to the campaign’s Tier.</p>' +
          '<p>You may sustain this for as many rounds as you wish (or minutes, if outside of combat), but when you stop using this power, you suffer 1d3 Shock, +1 for each Round (or minute) you used the daemon’s power, and gain +1 Corruption.</p>',
      },
      {
        name: 'Bestial features',
        description:
          '<p>While using the daemon’s power, the character also gains the Horns, Spines, Fangs, ' +
          'or Claws minor mutation (page 373 of the Wrath & Glory rulebook), and a single major mutation, ' +
          'chosen when the character first became possessed.</p>' +
          '<p>While manifesting the daemon’s power, it tends to meld your wargear and your flesh together, ' +
          'but this effect is normally reversed when you revert to your mortal state.</p>',
        // options: [],  select a mutation
      },
      {
        name: 'Daemonic',
        snippet: 'You may Soak Mortal Wounds and soaking does not cost you any Shock.',
        description:
          '<p>The character may attempt to Soak Mortal Wounds, and Soaking does not cost this character any Shock.</p>',
      },
    ],
  },
  {
    ...simpleStub('aaoa', 82, 'Reborn', 'Once an Aeldari, no Yinnari',false),
    description:
      '<p>The Ynnari are the members of a newly formed eponymous Eldar group that worship the God Ynnead and believe their race can be saved from the depredation of Slaanesh by helping to bring about the birth of the slumbering god of the dead.</p>' +
      '<p>Under the leadership of the prophet Yvraine, the "Daughter of Shades," the Ynnari seek to fully awaken the Aeldari god of the dead Ynnead, who they believe can defeat Slaanesh and restore the Aeldari species\' unity and its lost glory.</p>' +
      '<p>They aim to achieve this in a ritual that would not require the sacrifice of the entire Aeldari species, using a method known as the "Seventh Path" or the "Seventh Way."</p>' +
      '<p>A great many Aeldari, hailing from every sub-faction and allegiance save the most conservative and entrenched, have joined their cause. No abstract philosophy is this, for the effects of their new deity can be seen manifesting around them -- the Reborn can draw upon the souls within the Spirit Stones they wear to bolster their own abilities, can siphon the power of those slain nearby to invigorate their attacks, and turn their foes to ashes with the strange weapons and psychic powers they wield.</p>',
    cost: 0,
    costPerTier: 10,
    // Prerequisites
    minimumCampaignTier: 2,
    prerequisites: [
      'Willpower 3',
      '<Aeldari> Keyword',
    ],
    // Benefits
    influenceBonus: 2,
    influencePerTier: 0,
    storyElementString:
      'The character has been reborn as one of the Ynnari, and now has a powerful connection to the spirits of the dead. ' +
      'The character may attempt a Psychic Mastery test in order to communicate with the spirits of Aeldari dead ' +
      '(contained within spirit stones, infinity circuits, Exodite world-spirits, and similar). ' +
      'Further, they gain the Strength From Death ability, below: ' +
      'Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. ' +
      'You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you regroup or take a respite. ' +
      'Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied Ynnari within 10m.',
    wargearString:
      'Spirit Stone. ' +
      'When carried by an Ynnari character, a Spirit Stone may be used to generate 1d3+1 Soul tokens as a free action once every 24 hours – ' +
      'the character taps into the powerful spirits within, which then take some time to recover their strength.',
    // Crunch
    ascensionFeatures: [
      {
        name: 'Keyword',
        snippet: 'You gain the Ynnari keyword.',
        modifications: [
          { targetGroup: 'keywords', targetValue: 'Ynnari' },
        ],
      },
      {
        name: 'Connection to the dead spirits',
        description:
          '<p>The character may attempt a Psychic Mastery test in order to communicate with the spirits of Aeldari dead ' +
          '(contained within spirit stones, infinity circuits, Exodite world-spirits, and similar).</p>',
      },
      {
        name: 'Strength From Death',
        description:
          '<p>Once per round, when a player character, or an Adversary or Elite, or three Troops, dies within 15m of you, you immediately gain +1 Soul token. ' +
          'You may carry a number of Soul tokens up to your Willpower, and unused Soul tokens are lost when you regroup or take a respite. ' +
          'Soul tokens may be used as if they were Glory points, but only by the owning character, or by other allied Ynnari within 10m.</p>',
      },
      {
        name: 'Soul Stone',
        description:
          '<p>A <em>Spirit Stone</em> may be used to generate 1d3+1 Soul tokens as a free action once every 24 hours – ' +
          'the character taps into the powerful spirits within, which then take some time to recover their strength.</p>',
      },
      {
        name: 'Wargear',
        snippet: 'You gain a Spirit Stone.',
        wargear: [
          'Spirit Stone',
        ],
      },
    ],
  },
];

const ascensionRepository = [
  simpleStub('aotgt', 4, 'Rosette in Hand', 'Join the Inquisition and brag with new gear.'),
  simpleStub('goen', 9, 'The Titan walks', 'Gain a ship, but it can\'t fly, has feet and is a Titan and not a ship.'),
  simpleStub('tog', 14, 'Veteran of the Long War', 'You have a burning Hatred for (well, against) the Imperium.'),
  simpleStub('tog', 14, 'Traitor', 'It\'s like Stay the Course, but with Chaos Keywords.'),
  simpleStub('tog', 15, 'Deamon Prince', 'Become a Deamon Prince!'),
  simpleStub('thaot', 25, 'Chosen by the Omnissiah', 'Damaged, broken, repaired, enlisted, welcome on Mars.'),
  simpleStub('sotah', 2, 'To Hunt the Alien', 'Join the Deathwatch, gain neat Ammunition.'),
  simpleStub('sotah', 3, 'Unnumbered Sons', 'Aaah, the Grayshields. Wait, what?'),
  simpleStub('ltgb', 3, 'Forsake Your Chains', 'Leave the Imperium (Keyword) behind and join the Chaos or it\'s various factions.'),
];

module.exports = [
  ...core,
  ...aaoa,
  ...ascensionRepository,
];
