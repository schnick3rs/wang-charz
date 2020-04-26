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
    name: 'Adepta Sororitas',
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
    name: 'Adeptus Astra Telephatica',
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
    name: 'Adeptus Mechanicus',
    ...faction('core',57,'Imperium','Adeptus Mechanicus'),
    backgroundSection: [
      // ORIGIN
      background('Forge Born: You were born in the Cult Mechanicus, raised by steel and choir. The rhythms of the forge, the manufactorum, and the data-loom beat in your heart, whether natural or artificial.','Resolve','Origin'),
      background('Void Born: You spent your early life aboard an orbital station, built either for defence or industry. You were unaware planets existed until adolescence.','Max Wounds','Origin'),
      background('Promethean Proselytism: You converted to the Cult Mechanicus, leaving your former life behind after a holy vision, revelatory moment, or some other change of heart.','Conviction','Goal'),
      // ACCOMPLISHNMENT
      background('Quest for Knowledge: You accompanied a Rogue Trader or an Explorator mission to search for forgotten technology. The journey was rife with danger, but you prevailed, earning scars and wisdom.','Determination','Accomplishment'),
      background('Forbidden Tech: You encountered technology considered anathema. Xenos machines, heretical experimentation, or something stranger — did you destroy the abhorrent machine, or take a risk?','Influence','Accomplishment'),
  background('Necron Assault: You survived a clash with the nightmarish Necrons; many allies fell to their bizarre weapons, but, you managed to escape or prevail, haunted by visions of death-masked mechanical horrors.','Max Shock','Accomplishment'),
      // GOAL
      background('Mechanical Missionary: The truth of the Omnissiah must be spread. By converting individuals and raising holy temples or forges, you serve the expansion of the Cult Mechanicus.','Conviction','Goal'),
      background('Acquire Archeotech: The acquisition of technology is a core tenet of your faith. You zealously pursue the possibility of recovering lost Dark Age technology, or even an STC.','Determination','Goal'),
      background('Ascend to Iron: The flesh is weak. You are driven to replace biological matter with augmetics.','Wealth','Goal'),
    ],
    objectives: [
      'Commune with a Machine Spirit.',
      'Calculate the odds of any given task and provide an estimate of survival or success.',
      'Reminisce about a Forge World you have visited and compare it to your current location.',
      'Examine an interesting piece of technology, determining a flaw or potential improvement.',
      'Give praise to the Omnissiah for some small miracle.',
      'Extoll the virtues of augmetics over the weakness of the flesh.',
    ],
  },
  {
    name: 'Adeptus Ministorum',
    ...faction('core',59,'Imperium','Adeptus Ministorum'),
    backgroundSection: [
      background('Tithed: As a child you were given unto the Ecclesiarchy’s charge as part of a family tradition.You have spent your cloistered life in devout study of the Imperial Cult.','Conviction','Origin'),
      background('Penitent: Confession and prayer are not enough; you believe you sinned, and this stains your very soul. You seek penance with your every act — but for what sin?','Resolve','Origin'),
    background('Guided by Visions: You are guided by waking dreams of glorious figures of the Creed; preachers, Saints, and the God-Emperor Himself. You rely on these questionably accurate visions.','Determination','Origin'),
    background('Breaker of Heretics: You personally destroyed a heretical movement. The sight of such blasphemy was enough to twist your stomach, but your righteous anger served you well.','Influence','Accomplishment'),
    background('Trust No One: Ambition and greed permeate even the zealous clerics of the Creed. You have suffered firsthand at this corruption, and now judge the faith of others.','Conviction','Accomplishment'),
    background('Crisis of Faith: After your community faced doubt you rekindled the light of fervour, overcoming a profoundly dark and lonesome trial.','Resolve','Accomplishment'),
    background('Avenge the Lost: Part of your church turned traitor, committing grievous sins and slaying your allies. Find the renegades, judge their crimes, and carry out your grim sentence.','Determination','Goal'),
    background('Aspiration: The lofty spire of Ecclesiarchy advancement is yours to climb; honour and influence are your desire, through whatever means necessary.','Influence','Goal'),
    background('Pilgrimage: You feel driven to undertake a pilgrimage, one that will surely test your faith to  become one of the blessed.','Max Shock','Goal'),
    ],
    objectives: [
      'Utilise blind faith to achieve your goals.',
      'Emphasise the power of faithful deeds over words.',
      'Recant a holy litany applicable to the current situation.',
      'Fill your lungs with a bolstering hymn in a time of stress.',
      'Chastise an individual for their lack of faith.',
      'Convert a non-believer to the truth of the Imperial Cult',
    ],
  },
  {
    name: 'Astra Militarum',
    ...faction('core',62,'Imperium','Astra Militarum'),
    backgroundSection: [
      //d3 Origin +1
      background('Recent Recruit: You’re still getting used to the Astra Militarum; until recently, your life was very different. You’re surrounded by strangers and unused to the horrors of war.',' Conviction','Origin'),
      background('Regiment Born: Your parents were lifelong Astra Militarum. The regimental beliefs and traditions are in your very bones, and the other troopers in your squad are like family.','Influence','Origin'),
      background('No Choice: Whether you were tithed without consent, press ganged, or signed up to escape a criminal past, you’re in the Astra Militarum now. Time to make the best of it!','Resolve','Origin'),
      // d3 Accomplishment +1
      background('15+ Hours: You’ve exceeded the usual life expectancy of a frontline trooper, despite the horrors of war. You’re practically a veteran.','Max Shock','Accomplishment'),
      background('Last One Standing: Your squad was destroyed in a heroic last stand; as the only survivor you held a crucial position. Do you feel guilty, or believe the Emperor has plans for you.','Determination','Accomplishment'),
  background('Underdog: You’re known for taking on foes far beyond your fragile human physique; the fires of faith and fury stoke your reputation.','Influence','Accomplishment'),
      // d3 Goal +1
      background('Advancement: You’ve set your sights on promotion; bearing the regimental banner or perhaps becoming an officer leading a platoon — where will your ambition lead?','Determination','Goal'),
      background('Best of the Best: Holding the line is not enough — you want to excel at dealing death. Hone your skills to a lethal edge and become an elite warrior of the Astra Militarum.','Max Wounds','Goal'),
      background('Overwhelming Firepower: You like guns — the bigger the better. Through position, funds, or foul play, you intend to be the most well-armed member of the Astra Militarum that ever lived.','Wealth','Goal'),
    ],
    objectives: [
      'Express confidence (or the opposite) in the virtue of overwhelming numbers and firepower.',
      'Apply a lesson from the Imperial Infantryman’s Uplifting Primer to the current situation.',
      'Recant a holy litany applicable to the current situation.',
      'Compare the protection given by faith in the Emperor to a piece of armour or cover.',
      'Cite the logistical use of hatred for the enemy.',
      'Obey an order without question or doubt.',
    ],
  },
  {
    name: 'The Inquisition',
    ...faction('core',65,'Imperium','The Inquisition'),
    objectives: [
      'Complete a social interaction without revealing your identity.',
      'Demonstrate the superiority of the philosophy of your Ordo.',
      'Gauge the approximate interrogative breaking point for an individual.',
      'Postulate on the weakness of the mutant, the alien, or the renegade.',
      'Cleanse the filth of the enemy with holy flame.',
      'Establish your authority using a symbol of office.',
    ],
  },
  {
    name: 'Rogue Trader Dynasties',
    ...faction('core',67,'Imperium','Rogue Trader Dynasties'),
    objectives: [
      'Make a profit in coin, connections, or information.',
      'Use your proud dynastic lineage — real or fabricated — to seal a deal.',
      'Spend some time admiring your ship and reminiscing on journeys through the void.',
      'Compare your current environment to a strange world beyond the frontier you have visited.',
      'Recant an experience you had with a xenos species that applies to the current situation.',
      'Use your Warrant of Trade to get your way or refuse a request.',
    ],
  },
  {
    name: 'Scum',
    ...faction('core',69,'Imperium','Scum'),
    objectives: [
      'Apply your experience in a crime to the current situation.',
      'Verbally estimate the black market value of an item or person.',
      'Recount a desperate act of survival you once made.',
      'Use some gang slang — invented or real.',
      'Explain how a common object has an alternative use — probably as a weapon.',
      'Decry the violence and villainy of authority.',
    ],
  },
  {
    name: 'Adeptus Astartes',
    ...faction('core',72,'Imperium','Adeptus Astartes'),
    objectives: [
      'Dedicate a victory in combat to the Primarch (or if unknown, honour) of your Chapter.',
      'Apply the wisdom of the Codex Astartes to a situation.',
      'Clarify your duty — or lack thereof — in the current circumstances.',
      'Speak a motto or saying of your Chapter.',
      'Practice one of the traditions or rituals of your Chapter.',
      'Ruminate on the divide between Astartes and mortals.',
    ],
  },
  {
    name: 'Aeldari',
    ...faction('core',72,'Aeldari','Aeldari'),
    objectives: [
      'Unfavourably compare another Species’ culture, art, or technology to your own.',
      'Devote an accomplishment or victory to an Aeldari God.',
      'Recount a lesson from the traditions of a Craftworld that applies to the current situation.',
      'Utilise the reputation of your Species to manipulate an individual.',
      'Employ knowledge you learned from an earlier Path of your life to the current circumstances.',
      'Apply your superior intellect and sensitivity to prophecy to carry out a perfect plan.',
    ],
  },
  {
    name: 'Orks',
    ...faction('core',80,'Orks','Orks'),
    objectives: [
      'Start a fight.',
      'Solve a problem with the brutality of Gork.',
      'Demonstrate the wisdom of one of your Clans traditions.',
      'Kustomize a piece of Wargear.',
      'Solve a problem with the sage knowledge that bigger is better.',
      'Apply the kunnin’ of Mork to a situation.',
    ],
  },
  {
    name: 'Chaos',
    ...faction('core',84,'Chaos','Chaos'),
    objectives: [
      'Corrupt an innocent individual.',
      'Extoll the benefits (or negatives) of gaining the attention of the Chaos Gods.',
      'Pervert a religious icon, dedicating it to the Ruinous Powers.',
      'Point out a flaw in Imperial culture or philosophy that will lead to its downfall.',
      'Create confusion, incite bloodshed, pursue decadence, or spread disease.',
      'Claim an act or event is evidence of the favour (or contempt) of the Ruinous Powers',
    ],
  },
];

const factionRepository = [
  ...core,
];

module.exports = factionRepository;
