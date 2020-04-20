const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1.5' },
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
};

const idBase = {
  aaoa: 30000,
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const talent = function (sourceKey, sourcePage, name, cost, hint, tags = '') {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    hint,
    tags: tags.split(',').map((k) => k.trim()),
    requirements: [],
  };
};


const core = [
  {
    ...talent('core',129,'Acute Sense',20),
    snippet: 'Pick one of your 5 senses (sight, hearing, smell, taste, or touch). Whenever you make an Awareness Test based on that sense, you gain +Rank bonus dice.',
    // TODO the 5 senses
    options: [],
  },
  {
    ...talent('core',129,'Angel Of Death',30),
    snippet: 'Add +Rank damage when using Astartes related Weapons. (see core pg. 129 for details).',
    description:
      '<p>You are a Space Marine — one of the most feared warriors in the galaxy. You are a highly trained superhuman veteran of hundreds of battles, and have mastered the use of many deadly weapons.</p>' +
      '<p>Add +Rank to the total Damage Value of successful attacks with the following weapons:</p>' +
      '<ul>' +
      '<li>Chainswords</li>' +
      '<li>Chainaxes</li>' +
      '<li>Power Swords</li>' +
      '<li>Power Fists</li>' +
      '<li>Unarmed strikes</li>' +
      '<li>Bolt weapons</li>' +
      '<li>Any weapon with the <span class="text--keyword">ADEPTUS ASTARTES</span> Keyword.</li>' +
      '</ul>' +
      '<p class="mt-2">At the GM’s discretion, this Talent may also apply to weapons with the <span class="text--keyword">CHAOS</span> Keyword for Chaos Space Marines.</p>',
    requirements: [
      {
        condition: 'must',
        type: 'species',
        value: [ 'Adeptus Astartes' ],
      },
      {
        condition: 'must',
        type: 'character',
        key: 'Rank',
        value: '2+',
      },
    ],
  },
  {
    ...talent('core',129,'Armourbane',20),
    snippet: 'Use shifts to reduce the targets resilience (1 per shift) when using BLADE, CHAIN, FORCE or POWER FIELD weapons.',
    description:
      '<p>Your furious strikes rend armour, leaving it broken and useless.</p>' +
      '<p>When you make a successful melee attack you can Shift Exalted Icons to reduce the target’s Resilience instead of adding ED. Each Exalted Icon you Shift decreases the target’s Resilience by 1. This Resilience is removed before you calculate damage from the attack.</p>' +
      '<p>Your weapon must have one of the following Keywords to activate this Talent:</p>' +
      '<ul>' +
      '<li><span class="text--keyword">BLADE</span></li>' +
      '<li><span class="text--keyword">CHAIN</span></li>' +
      '<li><span class="text--keyword">FORCE</span></li>' +
      '<li><span class="text--keyword">POWER FIELD</span></li>' +
      '</ul>',
    requirements: [
      {
        condition: 'must',
        type: 'skill',
        key: 'Weapon Skill',
        value: '2+',
      },
    ],
  },
  {
    ...talent('core',129,'Augmetic',20),
    snippet: 'Gain augmetics',
    description:
      '<p>You replace part of your biology with an augmetic, the common name for cybernetic implants in the Imperium.</p>' +
      '<p>You may take this Talent more than once. Each time you take this Talent you may select two augmetics of Rare or lower rarity, or a single Very Rare augmetic. The value of the selected augmetics are added to the talents cost. See p242 for more information on Augmetics.</p>' +
      '<p>The GM determines which augmetics are available (usually any of those designed for your Species) and who can perform the necessary installation procedure.</p>',
    options: [
      {
        name: 'Two Rare Augmetics',
        wargear: [
          {
            name: 'First Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare'],
                subtypeFilter: ['Augmetic']
              },
            ],
          },
          {
            name: 'Second Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare'],
                subtypeFilter: ['Augmetic']
              },
            ],
          },
        ],
      },
      {
        name: 'One Very Rare Augmetic',
        wargear: [
          {
            name: 'Very Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                subtypeFilter: ['Augmetic']
              },
            ],
          },
        ],
      },
    ],
  },
];

const aaoa = [
  {
    ...talent('aaoa',147,'Ambush',30,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Striking Scorpion, Stealth 6+',
    description:
      '<p>The Exarch has a perfect sense of precision and timing, and their ambushes are virtually impossible to detect.</p>' +
      '<p>The Exarch and their squad may re-roll any Stealth tests made to set up an ambush, and enemies may not spend Ruin to become aware of the ambushing Striking Scorpions. Finally, the Exarch and any member of their squad may add +1ED to all attacks made during the first round of combat, if they are ambushing.</p>',
  },
  {
    ...talent('aaoa',147,'Avenging Strikes',20,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Willpower 4+',
    description:
      '<p>Little can withstand the Exarch’s cold fury when they avenge their fallen.</p>' +
      '<p>If the Exarch’s squad has taken any casualties during the current day, then the Exarch and any remaining member of the squad add +2d to all melee and ranged attacks they make for the remainder of the day.</p>',
  },
  {
    ...talent('aaoa',147,'Battle Fortune',25,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger',
    description:
      '<p>The Exarch is protected by fate and fortune, warded from death until their purpose is done.</p>' +
      '<p>The Exarch may Soak Mortal Wounds, and they add +3d to their Soak rolls. Further, when Soaking damage, the Exarch suffers only one Shock for every two Wounds negated.</p>',
  },
  {
    ...talent('aaoa',147,'Blademaster',50,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch’s mastery of the blade is incomparable, and few foes can overcome their defences or withstand their attacks.</p>' +
      '<p>The Exarch doubles the bonus to Defence from weapons with the Parry quality and adds +2ED to damage with all bladed melee weapons.</p>',
  },
  {
    ...talent('aaoa',147,'Bladestorm',40,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Ballistic Skill 5+',
    description:
      '<p>Little can withstand the tempest of blades that issues forth from shuriken weapons under the Exarch’s command.</p>' +
      '<p>When the Exarch, or any member of their squad, rolls a 6 on their Wrath die when making a ranged attack with a weapon with the Shuriken keyword, they may choose to make a second attack with that weapon instead of inflicting a critical hit. These additional attacks may not generate extra attacks of their own.</p>',
  },
  {
    ...talent('aaoa',147,'Bounding Leap',30,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Athletics 5+',
    description:
      '<p>The Exarch’s speed and grace are superlative, and little can match the pace at which they cross the battlefield.</p>' +
      '<p>The Exarch may use their Agility instead of their Strength for all Athletics tests, and they count their Agility is twice its normal value for the purposes of determining how far they can jump. Finally, the Exarch may disengage as a free action at the start of their turn.</p>',
  },
  {
    ...talent('aaoa',148,'Burning Heat',25,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Fire Dragon, Toughness 5+',
    description:
      '<p>Enemies who close with the Exarch find their strength and their will to fight sapped by searing, stifling heat.</p>' +
      '<p>Whenever an enemy makes a melee attack against the Exarch or a member of the Exarch’s squad, they add +2 to the DN required to hit.</p>',
  },
  {
    ...talent('aaoa',148,'Crack Shot',30,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Ballistic Skill 6+',
    description:
      '<p>The Exarch’s precision and lethality with ranged weapons is incomparable.</p>' +
      '<p>The Exarch may re-roll all rolls of 1 whenever they make a ranged attack.</p>',
  },
  {
    ...talent('aaoa',148,'Crushing Blow',25,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Strength 5+',
    description:
      '<p>The Exarch’s physical might is bolstered by their will to overcome the foes arrayed before them, and little can withstand the impact of their blows.</p>' +
      '<p>The Exarch’s Strength is increased by +2 in melee.</p>',
  },
  {
    ...talent('aaoa',148,'Deadly Touch',35,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch knows the myriad ways in which living creatures can be slain, and with precision they can deliver death with but a touch.</p>' +
      '<p>When the Exarch hits with a melee attack, each ED which rolls a 6 inflicts 1 Mortal Wound, in addition to the attack’s normal damage.</p>',
  },
  {
    ...talent('aaoa',148,'Decapitating Strikes',30,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch’s sweeping strikes seldom fail to find their mark, leaving maimed and butchered foes in their wake mere moments after the charge.</p>' +
      '<p>When the Exarch scores a critical hit with a melee attack, the severity of that critical hit automatically increases by 2, as if two Glory had been spent. The Exarch may still spend Glory to increase the severity further, if necessary.</p>',
  },
  {
    ...talent('aaoa',148,'Defend',50,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Weapon Skill 5+',
    description:
      '<p>The Exarch is well-versed in the principles of unyielding defence, and their squad are well-drilled to ensure that no enemy can overcome them without great sacrifice.</p>' +
      '<p>The Exarch, and their squad, increase both their Defence and Resilience by +2.</p>',
  },
  {
    ...talent('aaoa',148,'Disarming Strike',30,'','', 7 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch does not leave battle to chance and eliminates their foe’s weapon at the first opportunity.</p>' +
      '<p>The Exarch ignores the normal DN penalty for a called shot when making a melee attack, so long as they are making the called shot to disarm the opponent.</p>',
  },
  {
    ...talent('aaoa',148,'Distract',30,'','', 8 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Athletics 5+',
    description:
      '<p>The Exarch’s motions in battle are misleading, even entrancing, leaving enemies off-balance and unable to perceive when the true attack will come.</p>' +
      '<p>Once per round, as a free action on their turn, the Exarch may make an Athletics Interaction attack.</p>',
  },
  {
    ...talent('aaoa',148,'Dragon’s Bite',20,'','', 9 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Fire Dragon, Weapon Skill 5+',
    snippet: 'You and your squad may treat any weapon with the Melta keyword as if it had the Pistol trait.',
    description:
      '<p>The Exarch and their squad are adept at bringing their weapons to bear even in the closest confines.</p>' +
      '<p>The Exarch and their squad may treat their Fusion Guns or any other weapon with the Melta keyword, as if they had the Pistol trait.</p>',
  },
  {
    ...talent('aaoa',148,'Evade',30,'','', 0 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Swooping Hawk or Shining Spear or Crimson Hunter, Agility 5+',
    description:
      '<p>Your airborne movement is difficult for the eye to follow or predict, making you and exceptionally difficult target.</p>' +
      '<p>When you move through the air – yourself, or while operating a flying vehicle – add +3 to your Defence until the start of your next turn.</p>',
  },
  {
    ...talent('aaoa',149,'Expert Hunter',30,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill or Ballistic Skill 5+',
    description:
      '<p>Like the heroes of old, the Exarch is foe to the mightiest enemies on the battlefield.</p>' +
      '<p>When the Exarch makes an melee attack, or a ranged attack at close range, against a vehicle or a Monstrous Creature, they add +2ED to the attack’s damage and may re-roll any ED which result in failures.</p>',
  },
  {
    ...talent('aaoa',149,'Fast Shot',50,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Ballistic Skill 6+',
    description:
      '<p>The Exarch is a master at making the most of their firepower, laying down lethally-accurate volleys of fire.</p>' +
      '<p>When the Exarch makes a ranged attack, they may count their weapon’s Salvo value as 2 higher than normal. In addition, when making a ranged attack, the Exarch may spend 1 Reload to make a second attack with that weapon.</p>',
  },
  {
    ...talent('aaoa',149,'Fighting Fury',40,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch remains in perpetual motion in melee, never missing an opportunity to strike.</p>' +
      '<p>When the Exarch makes a melee attack, they may spend 1 Glory to make a second melee attack. In addition, when the Exarch makes a multi-attack with a melee attack, halve the normal DN penalty for each target (i.e., each target adds +1DN rather than +2DN).</p>',
  },
  {
    ...talent('aaoa',149,'Flickering Assault',30,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Warp Spider',
    description:
      '<p>The Exarch slips between reality and the Warp seamlessly, stepping out to strike and then withdrawing to find a new target.</p>' +
      '<p>When the Exarch, or any member of their squad, makes a multi-attack as part of a melee attack, they may count their speed as double its normal value when determining if they can reach their targets. Characters benefiting from this ability must be wearing Warp Spider Jump Generators.</p>',
  },
  {
    ...talent('aaoa',149,'Focussed Fire',30,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dark Reaper',
    description:
      '<p>The Exarch directs their attention – and their firepower – at a single foe, seeking to eliminate them utterly, regardless of other factors or distractions.</p>' +
      '<p>The Exarch may nominate a single enemy – not a mob, but any individual threat – within 35m as a priority target as a free action at the start of their turn. Until the start of the Exarch’s next turn, any ranged attacks from the Exarch or members of their squad at that priority target may re-roll any dice which roll 1 on their skill test and on their damage roll. Further, the enemy may not use any Ruin spends or special abilities which would redirect the attack to another target.</p>',
  },
  {
    ...talent('aaoa',149,'Graceful Avoidance',30,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Howling Banshee',
    description:
      '<p>The Exarch’s motions make it almost impossible to land a telling blow upon them.</p>' +
      '<p>When attempting to Soak damage inflicted by a melee attack, the Exarch or a member of their squad may use their Agility instead of their Toughness to Soak, and they may Soak mortal wounds.</p>',
  },
  {
    ...talent('aaoa',149,'Grim Visage',25,'','', 7 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Willpower 5+',
    description:
      '<p>The Exarch’s presence inspires feelings of foreboding and dread in their foes.</p>' +
      '<p>Characters within 12 yards of the Exarch reduce their Resolve by 1. Members of the Exarch’s squad are immune to this effect.</p>',
  },
  {
    ...talent('aaoa',149,'Immortal Endurance',30,'','', 8 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Toughness 4+',
    description:
      '<p>The Exarch is supernaturally resilient and wears their armour like a second skin.</p>' +
      '<p>The Exarch’s Resilience and Soak are both increased by +2.</p>',
  },
  {
    ...talent('aaoa',150,'Intercept',20,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Agility 6+, Swooping Hawk',
    snippet: 'When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.',
    description:
      '<p>The Exarch is a peerless aerial combatant, effortlessly proficient at fighting opponents in the sky.</p>' +
      '<p>When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.</p>',
  },
];

module.exports = [
  ...core,
  //...aaoa,
];
