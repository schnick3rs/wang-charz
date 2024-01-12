import {source} from './_sourcesRepository';

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
  };
};

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
    advancedCreationKeywords: ['Imperium','Adeptus Ministorum','Adepta Sororitas'],
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
    advancedCreationKeywords: ['Imperium','Adeptus Astra Telepathica'],
    // Scholastica Psycana
  },
  {
    name: 'Adeptus Mechanicus',
    ...faction('core',57,'Imperium','Adeptus Mechanicus'),
    backgroundSection: [
      // ORIGIN
      background('Forge Born: You were born in the Cult Mechanicus, raised by steel and choir. The rhythms of the forge, the manufactorum, and the data-loom beat in your heart, whether natural or artificial.','Resolve','Origin'),
      background('Void Born: You spent your early life aboard an orbital station, built either for defence or industry. You were unaware planets existed until adolescence.','Max Wounds','Origin'),
      background('Promethean Proselytism: You converted to the Cult Mechanicus, leaving your former life behind after a holy vision, revelatory moment, or some other change of heart.','Conviction','Origin'),
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
    advancedCreationKeywords: ['Imperium','Adeptus Mechanicus'],
    // Cult Mechanicus, [Forge World]
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
    advancedCreationKeywords: ['Imperium','Adeptus Ministorum'],
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
      'Compare the protection given by faith in the Emperor to a piece of armour or cover.',
      'Cite the logistical use of hatred for the enemy.',
      'Obey an order without question or doubt.',
      'Make a tactically sound plan to achieve an objective.',
    ],
    advancedCreationKeywords: ['Imperium','Astra Militarum'],
    // [Regiment]
  },
  {
    name: 'The Inquisition',
    ...faction('core',65,'Imperium','The Inquisition'),
    backgroundSection: [
      background('Chosen: You were hand-picked to join the Inquisition; an Inquisitor saw your potential or specific skill set and hired you, or employed you for your contacts or resources.','Wealth','Origin'),
      background('Fickle Fortune: Caught in horrors hidden from the populace, you were forced to join the Inquisition. Your life was redacted from Administratum records, now a half-forgotten shadow.','Determination','Origin'),
      background('Schola Progenia: An Imperial orphan raised to be the greatest servant of the Emperor possible, you excelled through a gruelling upbringing to enter the ranks of the Holy Ordos.','Max Wounds','Origin'),
      background('The Scheme Revealed: You were instrumental in uncovering and foiling a plot against the Imperium. The Emperor’s enemies are often sly and sinister, but unable to deceive you.','Influence','Accomplishment'),
      background('The Unseen: You accomplished a crucial mission without alerting the public pleasing your superiors by succeeding covertly. Your cunning saved many lives.','Determination','Accomplishment'),
      background('Exterminatus: You watched a world die. You stood on the bridge of a voidship, looking down as the terrible mechanism of Exterminatus destroyed a planet, killing billions.','Max Shock','Accomplishment'),
      background('For the Ordo: You work to advance the cause of your particular philosophy or Ordo in the Inquisition, ever looking for opportunities to forward the work of your fellows.','Conviction','Goal'),
      background('Find the Truth: You are consumed by the search for answers. There is one particular mystery that haunts your dreams, and you will not rest until you have undone the conundrum.','Determination','Goal'),
      background('The Hunt: A particular heretic, alien, or being of Chaos has done you grievous harm. You yearn to confront this enemy and bring their plans crashing down around them.','Resolve','Goal'),
    ],
    objectives: [
      'Complete a social interaction without revealing your identity.',
      'Demonstrate the superiority of the philosophy of your Ordo.',
      'Gauge the approximate interrogative breaking point for an individual.',
      'Postulate on the weakness of the mutant, the alien, or the renegade.',
      'Cleanse the filth of the enemy with holy flame.',
      'Establish your authority using a symbol of office.',
    ],
    advancedCreationKeywords: ['Imperium','Inquisition'],
    // [Ordo]
  },
  {
    name: 'Rogue Trader Dynasties',
    ...faction('core',67,'Imperium','Rogue Trader Dynasties'),
    backgroundSection: [
      background('Dynastic Scion: You were born into a Rogue Trader dynasty, heir to the family’s prestigious Warrant of Trade. Your lineage may be renowned, or darkly infamous.','Conviction','Origin'),
      background('Merchant Prince: You bargained your wealth — legitimate or ill-gotten — into the acquisition of a far more thrilling and adventurous Warrant of Trade.','Wealth','Origin'),
      background('Exile: You were given the choice to either take a Warrant of Trade and leave the Imperium or suffer the wrath of your rivals. Will you claim revenge, or fame?','Determination','Origin'),
      background('Dabbled in the Proscribed: You believe that rules were meant to be broken. You do not shrink from dealing with xenos species, nor do you fear travelling into forbidden stars. You see something that most Imperials consider blasphemous and think ‘that would look good in my trophy room!’','Conviction','Accomplishment'),
      background('Dark Frontier: You have travelled far from Imperial worlds, exploring the fringes of the galaxy. You’ve found worlds, xenos, and sights that few have ever dreamed of.','Influence','Accomplishment'),
      background('Strange Alliance: You have made deals with an unusual, unique, or otherwise iconoclastic group or individual, giving you prestige (or infamy) beyond many of your contemporaries.','[ANY] Keyword','Accomplishment'),
      background('Boundless Ambition: Enough is never enough. You want to be a legend, not just an interesting story. You pursue an epic destiny, and damn any who stand in your way.','Resolve','Goal'),
      background('Beyond the Map: You dream of going further then others have dared. Your destination may be nigh-legendary, well-hidden, or simply considered impossible.','Determination','Goal'),
      background('Fortune and Glory: The lure of the unknown calls. You want to boldly venture into regions better left alone, gifting your name to your discoveries and making a massive profit.','Conviction','Goal'),
    ],
    objectives: [
      'Make a profit in coin, connections, or information.',
      'Use your proud dynastic lineage — real or fabricated — to seal a deal.',
      'Spend some time admiring your ship and reminiscing on journeys through the void.',
      'Compare your current environment to a strange world beyond the frontier you have visited.',
      'Recant an experience you had with a xenos species that applies to the current situation.',
      'Use your Warrant of Trade to get your way or refuse a request.',
    ],
    advancedCreationKeywords: ['Imperium','Rogue Trader'],
    // [Dynasty]
  },
  {
    name: 'Scum',
    ...faction('core',69,'Imperium','Scum'),
    backgroundSection: [
      background('Downtrodden: Every memory you have is painful; for you, life in the Imperium means violence, toxic conditions, and slavery. You’ve developed strong willpower to combat this.','Determination','Origin'),
    background('Born Scummy: You’ve got a natural knack for the dangerous life of Scum, barely affected by its daily trials. That, or you just love life off the Imperial grid.','Max Shock','Origin'),
      background('Fallen: Once a member of an Adepta, or even a noble house, you have fallen from grace through tragedy, betrayal, or some disgraceful failing.','Resolve','Origin'),
      background('Gang Wrangler: You united squabbling gangs to fight for a common cause. You’ve probably made quite a few friends in the underground, and maybe a few enemies too.','Influence','Accomplishment'),
      background('Pit Champion: Through wit or brawn, you proved yourself the most proficient fighter in an underground fighting ring, with the scars to prove it.','Max Wounds','Accomplishment'),
      background('The Big One: You were instrumental in the biggest score anyone from your home has made. Hopefully you won’t run into anyone that can place you at the crime scene.','Wealth','Accomplishment'),
      background('Hive Topper: You started at the bottom, and you’ll make it to the top. Whatever it takes, you’re going to find the good life — and maybe even be a hero while you’re at it.','Determination','Goal'),
      background('Rescuer: You left someone close to you behind when you left the sump or the underhive. One day, you’ll return and show them the sunlight.','Conviction','Goal'),
      background('Fortunate and Forgotten: You’re sick of this city, this planet, even your own name — by amassing riches you plan to abandon your life and everyone you know in search of something better.','Max Shock','Goal'),
    ],
    objectives: [
      'Apply your experience in a crime to the current situation.',
      'Verbally estimate the black market value of an item or person.',
      'Recount a desperate act of survival you once made.',
      'Use some gang slang — invented or real.',
      'Explain how a common object has an alternative use — probably as a weapon.',
      'Decry the violence and villainy of authority.',
    ],
    advancedCreationKeywords: ['Scum'],
    // Imperium, [Any]
  },
  {
    name: 'Adeptus Astartes',
    ...faction('core',72,'Imperium','Adeptus Astartes'),
    backgroundSection: [
      background('Killer Instinct: Aggression and fury fueled your Aspirant trials. You overcame every challenger with bloody-minded savagery, impressing your betters.','Max Wounds','Origin'),
      background('Courage: You faced every Aspirant trial with grit and determination, pushing through exhaustion, fear, and uncertainty with conviction and bravery.','Resolve','Origin'),
      background('Cunning: You made your way through the Aspirant trials by using your experience with the underhanded, relying on wit over brawn.','Determination','Origin'),
      background('Crusader: You zealously shouldered a personal responsibility to destroy a particular foe; your chapter has given you leave to continue your grim work.','Determination','Accomplishment'),
      background('Badge of Honor: You risked your immortal life to rescue mortals in peril, and have been justly recognized for your unasked for selflessness.','Influence','Accomplishment'),
      background('Cleanse and Purge: You fought enemy forces in their blasphemous lair. Some of your battlebrothers died in the conflict, but you ensured the mission was a success.','Max Shock','Accomplishment'),
      background('Advancement: You desire the honour of a special role in your chapter. You look for opportunities to show your worth to your battle-brothers.','Influence','Goal'),
      background('Vengeance: Many of your battle-brothers were slain by a particular foe; you burn to avenge this stain on your honour.','Determination','Goal'),
      background('Honour the Chapter: You uphold the Chapter’s valour, quick to extoll its virtues, never allowing a slight against your battle-brothers to go unanswered','Conviction','Goal'),
    ],
    objectives: [
      'Dedicate a victory in combat to the Primarch (or if unknown, honour) of your Chapter.',
      'Apply the wisdom of the Codex Astartes to a situation.',
      'Clarify your duty — or lack thereof — in the current circumstances.',
      'Speak a motto or saying of your Chapter.',
      'Practice one of the traditions or rituals of your Chapter.',
      'Ruminate on the divide between Astartes and mortals.',
    ],
    advancedCreationKeywords: ['Imperium','Adeptus Astartes'],
    // [Chapter]
  },
  {
    name: 'Aeldari',
    ...faction('core',72,'Aeldari','Aeldari'),
    backgroundSection: [
      background('Denied Destiny: Where the Farseers foresaw death, you prevailed, defeating an incredible foe or accomplishing an impossible task.','Determination','Accomplishment'),
      background('Communed with Infinity: You have devoted considerable time to meditation with the spirits of the departed; they have taught you much of life and death.','Resolve','Accomplishment'),
      background('Mon-Keigh Animosity: The depraved stupidity of Humanity has endangered your life on more than one occasion. You have survived battles alongside and against them.','Max Shock','Accomplishment'),
      background('Webway Explorer: Traversing many Webway paths you have uncovered the hidden and forgotten, recovering valuable artefacts and even more crucial routes.','Wealth','Accomplishment'),
      background('Unusual Ally: Your actions saved the life of someone beyond your Faction; a Drukhari, a Harlequin, maybe even an Imperial.','Influence','Accomplishment'),
      background('Black Library Scholar: You have studied the ancient arcane writings of the cryptic Black Library; obscure knowledge of the profane is your constant companion.','Conviction','Accomplishment'),
      background('Fatalist: After a series of unfortunate battles, you have accepted your Species is doomed. You seek only protection; a defensible refuge for you and your allies.','Conviction','Goal'),
      background('Renewal: Your long life was fraught with the tragic milieu of your Species. You seek new experiences and perspectives to lift your burdens and wash away your sorrows.','Max Shock','Goal'),
      background('Serenity: Like many of your Species, your emotions are overwhelming to the point of selfdestruction. Seek serenity to protect your soul from Slaanesh.','Conviction','Goal'),
      background('Path Mastery: You see nothing beyond your current Path, and have thrown yourself into it utterly; whatever your present discipline is, you will be an exemplar and pioneer.','Determination','Goal'),
      background('Recovery: You will restore the lost majesty of your Species, finding artefacts and lost knowledge; are you seeking something specific?','Resolve','Goal'),
      background('Unity: The arch-foe cannot be defeated by the dwindling forces of your Species — at least, not fractured as they are. You will forge great allegiances and bring unity.','Influence','Goal'),
    ],
    objectives: [
      'Unfavourably compare another Species’ culture, art, or technology to your own.',
      'Devote an accomplishment or victory to an Aeldari God.',
      'Recount a lesson from the traditions of a Craftworld that applies to the current situation.',
      'Utilise the reputation of your Species to manipulate an individual.',
      'Employ knowledge you learned from an earlier Path of your life to the current circumstances.',
      'Apply your superior intellect and sensitivity to prophecy to carry out a perfect plan.',
    ],
    advancedCreationKeywords: ['Aeldari'],
    // Anhrathe and [Coterie], Asuryani and [Craftworld]
  },
  {
    name: 'Orks',
    ...faction('core',80,'Orks','Orks'),
    backgroundSection: [
      background('Squig Brain Transfer: Your earliest memory is awakening from surgery, covered in scars, and the Mad Dok telling you you’re ready to fight again. Who were you before? Does it matter?','Max Shock','Origin'),
      background('Endless WAAAGH!: The best time of your life — so far — was on the frontlines of a WAAAGH! You kept fighting until there was no one left… including your allies.','Resolve','Origin'),
      background('Time To Fight: After travelling through the Warp, you somehow ended up back in time. You feel an indescribable urge to find and fight your past self.','Determination','Origin'),
      background('Lost Boy: Every Boy you know was defeated in a futile charge against daemonic forces, but you survived.','Conviction','Origin'),
      background('Rok or Hulk: Fighting in low-grav situations amongst Genestealers, Aeldari, and whatever else got on your transport, your life was exciting and simple — until you fell out or crashed, and you landed wherever you are now.','Resolve','Origin'),
      background('Lonely Spawn: You knew something was wrong from your first cognisant thought — you were alone. Your drive to search for other Boyz has fueled your brash spirit.','Determination','Origin'),
      background('Marafon: Your Megaboss told you to go somewhere to deliver a message or retrieve some Wargear. An impossible mission, but your colossal self-belief saw you through.','Determination','Accomplishment'),
      background('Made it Flashy: You fixed up a piece of gear for your Warboss, adding spikey bits and more dakka! You were handsomely rewarded.','Wealth','Accomplishment'),
      background('Proppa Fast!: You achieved incredible speed and performed death-defying stunts that the Boyz will talk about for years. You wrecked your vehicle, but it was still impressive.','Influence','Accomplishment'),
      background('Surgical Success: You recovered from grievous injuries after a brave engagement. The brush with death has only made you more eager for a fight.','Max Shock','Accomplishment'),
      background('Kroosader: On your Warbosses behest, you’ve travelled the galaxy spreading violence and mayhem. You’ve come far, and have forgotten the purpose of the Kroosade','Max Wounds','Accomplishment'),
      background('Blessed by Gork (or Mork): You yelled an impromptu speech amidst a battle against impossible odds; the fight somehow swung in your favour, a blessing from the Gods themselves.','Conviction','Accomplishment'),
      background('‘Ardest: You’re going to be the toughest Ork in the galaxy, gathering Boyz behind you and raising a mighty WAAAGH!','Max Wounds','Goal'),
      background('Biggest Choppa: You will wield the biggest, sharpest, heaviest Choppa anyone has ever known.   You might have to win a few fights and grow to raise such an ideal weapon.','Influence','Goal'),
      background('Red Wuns Go Fastest: You will pilot the loudest, fastest, most dangerous vehicle ever known. Sure, a few bits might get blown off and the red paint scratched, but it will be worth it.','Determination','Goal'),
      background('Flashy-est: You hoard Teef, and intend to be the richest Ork that ever lived. Of course, you still need to spend them on stuff to show off how flashy you are!','Wealth','Goal'),
      background('Most Dakka: Enough is never enough — you must have the loudest, shiniest, biggest shoota, with more spikey bitz than anyone else’s. You dream of the carnage it will cause.','Influence','Goal'),
      background('Proppa Fight: You’re going to win the biggest, best fight ever. You never stop searching for the best of ultraviolence, and embrace the idea you might have to start it.','Determination','Goal'),
    ],
    objectives: [
      'Start a fight.',
      'Solve a problem with the brutality of Gork.',
      'Demonstrate the wisdom of one of your Clans traditions.',
      'Kustomize a piece of Wargear.',
      'Solve a problem with the sage knowledge that bigger is better.',
      'Apply the kunnin’ of Mork to a situation.',
    ],
    advancedCreationKeywords: ['Ork', '[Clan]'],
  },
  {
    name: 'Chaos',
    ...faction('core',84,'Chaos','Chaos'),
    backgroundSection: [
      background('Born Evil: For as long as you remember you have served the Chaos Gods; somehow, your very soul was created tainted.','Corruption','Origin'),
      background('Converted: An agent of the Chaos Gods seduced or coerced you with heresy, luring you to an immoral descent. Are they still an ally? Or a mortal enemy?','Resolve','Origin'),
      background('Contaminated: Whilst on an operation, an artefact, individual, or environment befouled by the Ruinous Powers polluted your soul.','Max Shock','Origin'),
      background('Revolting: You led an insurrection, overthrowing the Imperium’s influence in a location.','Influence','Accomplishment'),
      background('Reclaimer: An artefact suffused with Warp energies called out to you from the void; you found it after a dark pilgrimage.','Wealth','Accomplishment'),
      background('Vanquisher: You almost died in a battle against a force against Chaos, but managed to defeat them with Warp-fuelled resilience.','Max Wounds','Accomplishment'),
      background('Champion: You crave the attention of the Ruinous Powers, slaying in their name until you become their recognised champion.','Determination','Goal'),
      background('Conquer: There is a civilisation, a city, or a planet you are destined to destroy.','Influence','Goal'),
      background('Ascension: Power is not enough; you lust to become a daemon, your every mutation bringing you closer to your apotheosis.','Corruption','Goal'),
    ],
    objectives: [
      'Corrupt an innocent individual.',
      'Extoll the benefits (or negatives) of gaining the attention of the Chaos Gods.',
      'Pervert a religious icon, dedicating it to the Ruinous Powers.',
      'Point out a flaw in Imperial culture or philosophy that will lead to its downfall.',
      'Create confusion, incite bloodshed, pursue decadence, or spread disease.',
      'Claim an act or event is evidence of the favour (or contempt) of the Ruinous Powers',
    ],
    advancedCreationKeywords: ['Chaos'],
    // [Mark of Chaos]
  },
];

const fspg = [
  {
    name: 'Tau Empire',
    ...faction(source.fspg.key,93,'Tau Empire','Tau Empire'),
    advancedCreationKeywords: ['Tau Empire'],
  },
];

const aioe = [
  {
    name: 'Asuryani',
    ...faction(source.aioe.key,10,'Aeldari','Asuryani'),
    advancedCreationKeywords: ['Asuryani', '[Craftworld]'],
  },
  {
    name: 'Corsairs',
    ...faction(source.aioe.key,10,'Aeldari','Corsairs'),
    advancedCreationKeywords: ['Asuryani', '[Coterie]'],
  },
  {
    name: 'Drukhari',
    ...faction(source.aioe.key,10,'Aeldari','Drukhari'),
    advancedCreationKeywords: ['Drukhari', 'Blades for Hire'],
  },
  {
    name: 'Harlequins',
    ...faction(source.aioe.key,10,'Aeldari','Harlequins'),
    advancedCreationKeywords: ['Harlequins', '[Mask]'],
  },
  {
    name: 'Ynnari',
    ...faction(source.aioe.key,10,'Aeldari','Ynnari'),
    advancedCreationKeywords: ['Ynnari'],
  },
];


const aaoa = [
  {
    name: 'Adeptus Arbites',
    ...faction('aaoa',25,'Imperium','Adeptus Arbites'),
    backgroundSection: [
      // Origin
      background('PROGENA: Your parents were stalwart servants of the Throne, and after their deaths, you were raised by the Schola Progenium, who identified your talents and groomed you to join the Adeptus Arbites.','Influence','Origin'),
      background('REPENTANT: You once lived a life of criminality and desperation before you found the Emperor’s light and saw the error of your ways. You sought out an Arbites Precinct-Fortress and turned yourself over to their judgements, and after your sentence was served, your contrition was rewarded with an opportunity for redemption.','Conviction','Origin'),
      background('ASCENDED: You served the local Enforcers of your homeworld honourably and dutifully, until you found yourself caught between your loyalty to your home and your loyalty to the Emperor. You chose the Imperium, and the Arbites recruited you in the aftermath.','Resolve','Origin'),
      // Accomplishment
      background('REBELLION QUASHED: When a rebellion arose on your last posting, you were instrumental in crushing it and bringing the Emperor’s Justice to the rebels.','Conviction','Accomplishment'),
      background('SUBVERSIVE ELIMINATED: A noted subversive who had eluded Justice upon a dozen or more worlds found himself within your jurisdiction, and you were the one who carried out the Judgement.','Determination','Accomplishment'),
      background('FRONTIER MARSHAL: You were posted to a world on the fringes of the Imperium, with little established Imperial presence. Your efforts helped bring order to such a lawless place.','Max Wounds','Accomplishment'),
      // Goal
      background('FUGITIVE: One criminal in particular has continued to elude your efforts, and you will stop at nothing to see them Judged.','Determination','Goal'),
      background('ORDER TO THE LAWLESS: You desire the next great challenge that awaits an Arbitrator – to pacify the criminality and anarchy of places which have fallen from the Emperor’s Light.','Resolve','Goal'),
      background('COLD CASE: An unsolved crime has haunted your precinct, or possibly your career specifically, for longer than anyone is comfortable with. You will solve that case and bring the perpetrator to justice.','Max Shock','Goal'),
    ],
    objectives: [
      'Seek to apply the dictates of the Lex Imperialis to a situation.',
      'Compare your current environment to another world on which you have served.',
      'Interrogate a suspect using threats of violence and punishment while an ally offers leniency in exchange for compliance (or vice versa).',
      'Berate a criminal or other citizen who you have judged as insufficiently law-abiding.' +
      'Open a door, or otherwise enter a room, using forceful methods.',
      'Subdue an enemy non-lethally so that they might face proper judgement later.',
    ],
    advancedCreationKeywords: ['Imperium'],
  },
  {
    name: 'Officio Assassinorum',
    ...faction('aaoa',28,'Imperium','Officio Assassinorum'),
    backgroundSection: [
      // Origin
      background('PROGENA: Your parents were stalwart servants of the Throne, and after their deaths, you were raised by the Schola Progenium. There, you demonstrated an aptitude for killing that set you apart.','Resolve','Origin'),
      background('CULTIST: You were once a member of one of the countless death cults devoted to the God-Emperor’s glory. Your existence was, and still is, devoted to slaying the Emperor’s foes','Determination','Origin'),
      background('ABANDONED: Whatever your life before, at one point it ended, and you were left to fend for yourself. Learning to survive in such inhospitable condition has honed your instincts and hardened you for the duties you now perform.','Max Wounds','Origin'),
      // Accomplishment
      background('TARGET ELIMINATED: After extensive time and effort infiltrating their stronghold, you slew a mighty Champion of Chaos','Conviction','Accomplishment'),
      background('TARGET ELIMINATED: After tracking the enemy force across a dozen worlds, you assassinated a powerful Xenos warlord.','Resolve','Accomplishment'),
      background('TARGET ELIMINATED: After infiltrating the depths of a world in rebellion, you made an example of the witch or demagogue at the heart of a rebellion.','Max Shock','Accomplishment'),
      // Goal
      background('TARGET ACQUIRED: You have little ambition beyond the annihilation of your next target in the Emperor’s name.','Conviction','Goal'),
      background('TARGET ACQUIRED: A target escaped you once. You cannot permit this failure to stain your service to the Emperor.','Determination','Goal'),
      background('TARGET ACQUIRED: Of all the targets you have slain, one particular foe haunts your thoughts and fills your heart with rage. You crave each opportunity to slay targets that resemble that particular hated foe.','Resolve','Goal'),
    ],
    objectives: [
      'Conclude a combat without any surviving witnesses other than your allies.',
      'Extol the superiority of your Temple’s methods of dealing death.',
      'Explain the how your assigned mission allows – or prohibits – a particular course of action.',
      'Quote a motto or philosophy of your Temple.',
      'Refuse to use overt methods to gain access to a location',
      'Maintain secrecy over your entire operation, refusing to reveal your identity or target to any but your immediate allies'
    ],
    advancedCreationKeywords: ['Imperium'],
  },
  {
    name: 'Drukhari',
    ...faction('aaoa',29,'Aeldari','Drukhari'),
    backgroundSection: [
      // Origin
      background('TRUEBORN: You were born naturally, to one of the powerful families of the Dark City whose resources allowed them to raise a child in the traditional manner. You are a scion of the powerful, raised from childhood to dominate and terrorise.','Influence','Origin'),
      background('HALFBORN: You were born from an artificial gestation tube, quickly and efficiently, like the majority of Drukhari. To thrive in the slums and lower tiers of the Dark City, you had to be ruthless and ambitious.','Determination','Origin'),
      background('WROUGHT: You know not from whence you came, only that you awoke upon a Haemonculus’ table fully-formed and thirsting for the agony of others. Your mysterious, possibly unnatural origin may disquiet some, but you are what you have made of yourself.','Max Shock','Origin'),
      // Accomplishment
      background('RAIDER: You were part of a victorious real-space raid, and the souls you dragged back, and the recorded hologhosts of your kills have earned you prestige, glory, and status.','Wealth','Accomplishment'),
      background('TRIUMPH: You set foot within the arena, and you emerged victorious. The hard-fought victory came with many scars, the ache of which still reminds you of the fury of the battle.','Max Wounds','Accomplishment'),
      background('USURPER: You attained your current status through guile and skill, undermining and then eliminating a former superior and assuming their position. You know that others seek to recreate your ascension and take what you have won, but you will not make it easy for them…','Determination','Accomplishment'),
      // Goal
      background('DOMINION: You seek to rise to the highest levels of Drukhari society, by any means necessary. Nothing short of final death or ultimate dominion will see your ambition sated.','Resolve','Goal'),
      background('TERROR: Out there, in realspace, there is a place which awaits your malicious attentions, which has not learned to dread your kind. You will find them, and you will feast upon their anguish.','Determination','Goal'),
      background('SATIETY: The thirst that gnaws away at your soul, at once part of you and external to you, is a perpetual weight upon your existence. You will slake that thirst, or escape it.','Conviction','Goal'),
    ],
    objectives: [
      'Revel in the pain or distress of another creature',
      'Be scornful or dismissive of the taboos of other Aeldari, or another species',
      'Coerce or threaten another creature into doing what you want',
      'Apply your cruelty and cunning to trick or ambush a foe',
      'Explain a number of the different ways you could hurt or kill someone',
      'Gain in status or influence through murder or intimidation',
    ],
    advancedCreationKeywords: ['Aeldari','Drukhari'], // [Cabal], [Cult], [Coven]
  },
  {
    name: 'The Squat Remnant',
    ...faction('aaoa',29,'Squats','The Squat Remnant'),
    backgroundSection: [
      // Origin
      background('ADRIFT: You were aboard one of the vessels fleeing the Cataclysm, floating through the void as a remnant of a once-proud civilisation.','Resolves','Origin'),
      background('FAR AFIELD: You fought as a mercenary or plied your trade far from your home and found yourself suddenly cut off from home and support.','Max Wounds','Origin'),
      background('AMONGST THE ENEMY: You’ve had to fight for every moment of life since the Cataclysm, surrounded by foes bolstered the disaster.','Determination','Origin'),
      // Accomplishment
      background('REUNION: You were reunited with some who you thought lost, perhaps old comrades, perhaps family, perhaps merely other wandering refugees','Influence','Accomplishment'),
      background('GRUDGE SETTLED: You worked to defeat a notorious enemy of your kind and bring some measure of recompense to the lost. It was a long, hard effort, but you’ve now got one less grudge to avenge.','Max Wounds','Accomplishment'),
      background('RECLAMATION: A piece of technology, an heirloom, or some other item of great value, thought lost, has been returned to your people through your efforts.','Wealth','Accomplishment'),
      // Goal
      background('SURVIVAL: In the face of extinction, to endure for even another day is a victory. Securing as many days as possible is your priority.','Determination','Goal'),
      background('RESURGENCE: Your people are hardy, and you once prospered and thrived amidst the least hospitable conditions. No disaster is so great that it cannot be recovered from.','Resolve','Goal'),
      background('VENGEANCE: The dark forces that created this disaster will pay for every Squat life they ended, and they will pay in blood.','Max Shock','Goal'),
    ],
    objectives: [
      'Grumble about human technology, comparing it to the craftsmanship of your own people',
      'Compare current events to the accomplishments of an honoured ancestor or relative',
      'Swear an oath to avenge a misdeed done to you',
      'Describe a glorious victory or major achievement as if it were something casual or expected',
      'Dedicate an action to ancestors and kin lost during the Cataclysm',
      'Seek to obtain extra necessary supplies, such as ammunition, when preparing for a mission.',
    ],
    advancedCreationKeywords: ['Squat'],
  },
  {
    name: 'T´au',
    ...faction('aaoa',29,'T’au','T’au'),
    backgroundSection: [
      // Origin
      background('FIRST-SPHERE SEPT: You hail from one of the original Septs settled by the T’au, or possibly from the T’au homeworld itself.','Influence', 'Origin'),
      background('SECOND-SPHERE SEPT: Your ancestors braved the unknown to colonise a Sept during the second-sphere expansion phase','Resolve','Origin'),
      background('THIRD-SPHERE SEPT: Your forebears faced extreme resistance to settle a Sept during the third-sphere expansion phase.','Determination','Origin'),
      // Accomplishment
      background('DISCOVERY: You aided in finding, securing, or creating something valuable to the ongoing expansion of the T’au Empire.','Wealth','Accomplishment'),
      background('PROTECTION: You helped to protect some territory, resource, or other vital asset from being lost to outsiders.','Resolve','Accomplishment'),
      background('SACRIFICE: You willingly gave of yourself in the name of the Greater Good, suffering some form of loss or injury for the betterment of the T’au Empire.','Conviction','Accomplishment'),
      // Goal
      background('ADVANCEMENT: You know that you will be able to further the tau’va if you can gain power and status within the Empire.','Influence','Goal'),
      background('DUTY: You will do whatever the Ethereals will to ensure the T’au Empire grows and prospers and all are brought within the protection of the Greater Good.','Max Shock','Goal'),
      background('SUPREMACY: The galaxy is full of misguided species who need to be shown the error of their ways, and you will do your part to show them.','Resolve','Goal'),
    ],
    objectives: [
      'When you seek to apply the wisdom of the Ethereals to a situation.',
      'Extol the virtues of the Greater Good to someone who does not belong to the T’au Empire',
      'Reminisce about the wonders and glories of your home Sept and other worlds within the T’au Empire',
      'Describe a previous triumph or achievement of the T’au Empire',
      'Reflect on your bond with your team-mates (especially if you Ta’lissera bonded)',
      'Ponder the differences or similarities between the Castes, or between the T’au and another species',
    ],
    advancedCreationKeywords: ['Squat'],
  },
];

const factionRepository = [
  ...core,
  ...fspg,
  ...aaoa,
  ...aioe,
];

module.exports = factionRepository;
