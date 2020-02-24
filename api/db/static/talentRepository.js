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
};

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const simpleStub = function (sourceKey, sourcePage, name, cost, hint) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    hint,
    stub: true,
    tags: [],
  };
};

const core = [
  {
    ...simpleStub('core', 171, 'Acts of Faith', 40, 'Grants Faith and bonuses with various options.'),
    // condensed and data-drive summary for the character sheet
    snippet:
      'You gain 2 Faith and select two effects. ' +
      'Once per round, as an Action, suffer 1 Shock and spend 1 Faith to activate one effect',
    // an extensive summary
    description: // html
      '<p>Each time you select this Talent, ' +
      'you gain 2 Faith and you may choose to gain access ' +
      'to two effects from the list below. ' +
      'To gain access to all four effects, ' +
      'you must purchase this Talent twice.</p>' +
      '<p>You may use this talent only once per round. ' +
      'As an action, suffer 1 Shock and spend 1 Faith to activate one of the chosen effects.</p>',
    // check to hide this ability in the builder
    hideInBuilder: false,
    // check to hide this ability in the characterSheet
    hideInSheet: false,
    prerequisites: [
      {
        description: 'Have the Adeptus Ministorum or Adepta Sororitas Keyword',
        condition: 'must',
        type: 'keyword',
        value: [ 'Adeptus Ministorum', 'Adepta Sororita' ],
      },
      {
        description: 'Willpower 3 or higher',
        condition: 'must',
        type: 'attribute',
        subType: 'willpower',
        value: 3,
      },
      {
        description: 'Does not have the Chaos Keyword',
        condition: 'not',
        type: 'keyword',
        value: [ 'Chaos' ],
      },
    ],
    modifications: [
      { targetGroup: 'resources', targetValue: 'faith', modifier: 2 },
    ],
    selectMultipleTimes: true,
    optionsChoices: 2,
    options: [
      { name: 'Hand of the Emperor', snippet: 'You may immediately move up to your Speed as a free action.' },
      { name: 'Divine Guidance', snippet: 'You gain +Rank to Ballistic Skill tests for 1 round.' },
      { name: 'The Passion', snippet: 'You gain +Rank to Weapon Skill tests for 1 round.' },
      { name: 'Spirit of the Martyr', snippet: 'You recover 1d3 Wounds.' },
    ],
  },
  {
    ...simpleStub('core', '-', 'Mark of Chaos', 30, 'Dedicate yourself to a Chaos God to gain a benefit.'),
    prerequisites: [],
    selectMultipleTimes: true,
    snippet: 'You gain 1 Corruption and select to you one of the Chaos Gods.',
    description:
      '<p>You have been granted the favour of the Ruinous Powers. ' +
      'This may be from dedicating yourself to one of the named gods or to an act that venerates the entire pantheon. ' +
      'Occasionally, one of the Chaos Gods may grant favour more from amusement than as a reward. ' +
      'Gaining this talent should represent a significant change in the character’s ongoing narrative.</p>' +
      '<p>You gain +1 Corruption. Select one of the fi ve options below, and apply the bonus to your character sheet. ' +
      'Choosing this talent replaces the &lt;Mark of Chaos&gt; keyword with one of the chosen gods. ' +
      'Choosing the Undedicated Option, below, means that you do not replace the &lt;Mark of Chaos&gt; keyword.</p>',
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
    options: [
      { name: 'Mark of Nurgle', modifications: [ { name: 'Nurgle', targetGroup: 'traits', targetValue: 'wounds', modifier: 1 } ] },
      { name: 'Mark of Khorne', snippet: 'You may not also possess the Psyker keyword. You add +2 bonus dice to All-out Attacks.' },
      { name: 'Mark of Slaanesh', snippet: 'You add +2 bonus dice to Awareness and Persuasion tests.' },
      { name: 'Mark of Tzeentch', snippet: 'You gain the Psyker keyword. If you already possess the Psyker keyword, you gain one minor psychic power of your choice. Work with the Game Master to determine which powers are appropriate for your character to select.' },
      { name: 'Undecided', snippet: 'Choose one of the following skills: Awareness, Cunning, Deception, Insight, Persuasion, Psychic Mastery, Stealth, Weapon Skill. You gain +1/2 Rank bonus dice when using that Skill.' },
    ],
  }
];

module.exports = [
  ...core,
];
