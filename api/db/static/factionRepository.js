// TODO
// Astra Militarum

const source = {
  core: { book: 'Core Rules', key: 'core', version: 'v1.5' },
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

const faction = function (sourceKey, sourcePage, group, name) {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    group,
    name,
    backgroundSection: [],
    objectives: [],
  };
};

const background = function (text, plusOne, type) {
  const parts = text.split(': ');
  const title = parts[0];
  const snippet = parts[1];
  return {
    key: `${stringToKebab(title)}`,
    title,
    snippet,
    plusOne,
    type,
  }
}

const core = [
  {
    ...faction('core',52,'Imperium','Adepta Sororitas'),
    backgroundSection: [
      // ORIGIN
      background('Holy Inspiration: You followed in the footsteps of an Imperial Saint on a pilgrimage, an interstellar voyage, or a military campaign. Your idol inspired your faith to new heights.', 'Resolve', 'Origin'),
      background('Heresy Begets Retribution: You survived a brutal heretical assault. At great sacrifice you emerged triumphant through your zeal. Their attacks only made your faith in Him stronger.', 'Determination', 'Origin'),
      background('Blessed Tomes: The words of the faithful guided you since you first beheld them. You quote from these texts often, though not always in the way that the original writer intended!', 'Conviction', 'Origin'),
      // ACCOMPLISHNMENT
      background('Defended Enoch: One of Enoch’s many prized holy sites came under assault, and you were there to drive off the attackers. Pilgrims on the shrine world owe you their lives.', 'Influence', 'Accomplishment'),
      background('Purge the Unclean: You led a kill-team to wipe out a nest of Corruption. Victory came at a cost', 'Max Wounds', 'Accomplishment'),
      background('Saving Souls: The strongest waver in the face of nightmarish terror in the Gilead. You banished the doubts and fears of those who struggled on the path of the Imperial Creed.', 'Conviction', 'Accomplishment'),
      // GOAL
      background('Reclaim a Relic: Long ago, an important Ministorum relic went missing. You would do anything to recover this relic and restore it to the Ecclesiarchy.', 'Determination', 'Goal'),
      background('Shine the Light: The dark closes in; you intend to push it back. Build a monastery and recruit holy warriors to your righteous cause.', 'Influence', 'Goal'),
      background('Martyrdom: Your prayers have guided you to an inescapable truth — you must be a martyr. You search for a worthy cause to die for in the Emperor’s name.', 'Max Shock', 'Goal'),
    ],
    objectives: [
      'Exult the rewards of sacrifice in the Emperor’s name.',
      'Invoke an Imperial Saint (such as Alicia Dominica or Celestine) to bless your achievements.',
      'Recant a holy litany applicable to the current situation.',
      'Fill your lungs with a bolstering hymn in a time of stress.',
      'Recall a wise stricture your Drill Abess laid down and its application to the current situation.',
      'Purge a heretical item (or individual) with holy flame.',
    ],
  },
  {
    ...faction('core',54,'Imperium','Adeptus Astra Telephatica'),
    backgroundSection: [
      // ORIGIN
      background('Shipbound Sickness: Tithed to a Black Ship at a very early age, you are still marked by the torturous time you spent on the voyage to your tutelage.', 'Max Wounds', 'Origin'),
      background('Betrayed: You attempted to ignore, suppress, or hide your psychic awakening, but were betrayed by those closest to you, surrendered to the Black Ships.', 'Resolve', 'Origin'),
      background('Oracular Visions: Your powers first manifested as twisted visions of potential fates. You hoped the Scholastica Psykana could cure you, but they have not entirely faded.', 'Conviction', 'Origin'),
      // ACCOMPLISHNMENT
      background('Warp Hound: Your abilities proved instrumental in an operation to collect and capture other Psykers.', 'Influence', 'Accomplishment'),
      background('Proven Practical: A mighty foe fell to your psychic powers, convincing your allies of your usefulness and frightening potential.', 'Resolve', 'Accomplishment'),
      background('Stalwart: You resisted the call of Chaos at a crucial moment when others could not, and emerged unscathed from a brush with the Ruinous Powers.', 'Conviction', 'Accomplishment'),
      // GOAL
      background('Pacifier: Word must be spread that not all Psykers are witches or sorcerers — you aim to reverse the tragic effects of centuries of propaganda.', 'Determination', 'Goal'),
      background('Arcane Lore: The Warp has revealed a scant few of its mysteries to you, now you crave a fuller understanding, seeking knowledge few can grasp.', 'Influence', 'Goal'),
      background('Vengeance: Through fickle fate you can manipulate a daemonic force, but this was not your desire. You will revenge yourself on the Warp by slaying its manifestations.', 'Conviction', 'Goal'),
    ],
    objectives: [
      'Utilise your feared reputation in a social situation.',
      'Extoll the virtues of your training in honing your already considerable willpower.',
      'Express gratitude for the Emperor’s guiding hand, protecting you from the Warp.',
      'Pass judgement on an individual you have never met through knowledge from ’Warp-sight’.',
      'Dismiss the potential extent of psychic powers as being rumour or propaganda.',
      'Appraise another individual for psychic potential.',
    ],
  },
  {
    ...faction('core',57,'Imperium','Adeptus Mechanicus'),
  },
  {
    ...faction('core',59,'Imperium','Adeptus Ministorum'),
  },
  {
    ...faction('core',62,'Imperium','Astra Militarum'),
  },
  {
    ...faction('core',65,'Imperium','Inquisition'),
  },
  {
    ...faction('core',67,'Imperium','Rogue Trader'),
  },
  {
    ...faction('core',69,'Imperium','Scum'),
  },
  {
    ...faction('core',72,'Imperium','Adeptus Astartes'),
  },
  {
    ...faction('core',72,'Aeldari','Aeldari'),
    // TODO handle Pathes 0, 10, 20*
  },
  {
    ...faction('core',80,'Orks','Orks'),
  },
  {
    ...faction('core',84,'Chaos','Chaos'),
    // traitor variants
  },
];

const factionRepository = [
  ...core,
];

module.exports = factionRepository;
