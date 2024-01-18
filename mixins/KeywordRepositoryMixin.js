import {SKILLS, TRAITS} from '../api/db/static/_statUtils';

export default {
  data() {
    const keywordRepository = [
      // General Keywords
      {
        name: 'Psyker', type: 'General', parentKeyword: undefined, description: 'Those who can wield psychic powers, channeling the warp through their mind.',
      },
      {
        name: '[Any]', type: 'General', parentKeyword: undefined, description: 'This keyword represents a free choice by the player at character creation; the GM deter-mines which selections are appropriate for the character.',
      },

      // Species Keywords
      {
        name: 'Abhuman', type: 'Species', parentKeyword: undefined, description: 'Some mutated strains of Humanity, such as the muscular, oversized, impeccably loyal Ogryns, are allowed citizenship in parts of the Imperium due to their usefulness. These mutants are known as Abhumans.',
      },
      {
        name: 'Ratling', type: 'Species', parentKeyword: undefined, description: 'The Ratling abhuman.',
      },
      {
        name: 'Ogryn', type: 'Species', parentKeyword: undefined, description: 'The Ogryn abhuman.',
      },
      {
        name: 'Kroot', type: 'Species', parentKeyword: undefined, description: 'A mercenary xenos Species with the ability to control their evolution through the consumption of other lifeforms.',
      },
      {
        name: 'Aeldari', type: 'Species', parentKeyword: undefined, description: 'The Eldar race.',
      },
      {
        name: 'Anhrathe', type: 'Species', parentKeyword: undefined, description: 'Eldar Corsairs, spacefaring pirates and raiders.',
      },
      {
        name: '[Coterie]', type: 'Species', parentKeyword: 'Anhrathe', description: 'A specific Eldar Corsair band (replaces this keyword when chosen).',
      },
      {
        name: 'Asuryani', type: 'Species', parentKeyword: undefined, description: 'Eldar of the Craftworlds.',
      },
      {
        name: '[Craftworld]', type: 'Species', parentKeyword: 'Asuryani', description: 'A specific Eldar Craftworld (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: 'Drukhari',
        type: 'Species',
        parentKeyword: undefined,
        description: 'The dark Aeldari siblings.',
      },
      {
        source: 'aaoa',
        name: '[Cult]',
        type: 'Species',
        description: 'A specific Drukhari Witch Cult (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Masque]',
        type: 'Species',
        description: 'A specific Harlequin Masque (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Coven]',
        type: 'Species',
        description: 'A specific Drukhari Haemunculus Coven (replaces this keyword when chosen).',
      },
      {
        source: 'aaoa',
        name: '[Cabal]',
        type: 'Species',
        description: 'A specific Drukhari Cabal (replaces this keyword when chosen).',
      },
      {
        name: 'Ork', type: 'Species', parentKeyword: undefined, description: 'The Ork race.',
      },
      {
        name: '[Clan]', type: 'Species', parentKeyword: 'Ork', description: 'A specific Ork clan (replaces this keyword when chosen).',
      },
      { source: 'aaoa', name: '[League]', type: 'Species', parentKeyword: 'Squat', description: 'A specific Squat league (replaces this keyword when chosen).' },

      // Imperium Keywords
      {
        name: 'Adepta Sororitas', type: 'Imperium', parentKeyword: undefined, description: 'The Sisters of Battle, warriors of the Ecclesiarchy.',
      },
      {
        name: '[Order]', type: 'Imperium', parentKeyword: 'Adepta Sororitas', description: 'A specific Adepta Sororitas Order (replaces this keyword when chosen).',
      },
      {
        name: '[Enclave]',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'A specific Sisters of Silence Enclave (replaces this keyword when chosen).',
        source: 'tnh',
      },
      { name: 'Adeptus Astartes', type: 'Imperium', parentKeyword: undefined, description: 'The Space Marines, superhuman elite warriors of the Imperium.' },
      {
        name: '[Chapter]', type: 'Imperium', parentKeyword: 'Adeptus Astartes', description: 'A specific Adeptus Astartes Chapter (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Astra Telepathica', type: 'Imperium', parentKeyword: undefined, description: 'They administrate the role of psykers in the Imperium.',
      },
      {
        name: 'Adeptus Mechanicus',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The Tech-Priesthood of Mars, they are entrusted with the secrets of tech-nology; allied to the Imperium.',
        // Data is Currency
        effectLabel: 'Data is Currency',
        effect: 'Characters with the Adeptus Mechanicus keyword may use Intellect in place of Fellowship when calculating Influence.',
      },
      {
        name: '[Forge World]', type: 'Imperium', parentKeyword: 'Adeptus Mechanicus', description: 'A specific Adeptus Mechanicus Forge World (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Ministorum', type: 'Imperium', parentKeyword: undefined, description: 'Those who preach the Imperial Creed.',
      },
      {
        name: 'Astra Militarum', type: 'Imperium', parentKeyword: undefined, description: 'The Imperial Guard, soldiers of the Imperium’s main ground forces.',
      },
      {
        name: '[Regiment]', type: 'Imperium', parentKeyword: 'Astra Militarum', description: 'A specific Astra Militarum Regiment (replaces this keyword when chosen).',
      },
      {
        name: 'Cult Mechanicus', type: 'Imperium', parentKeyword: undefined, description: 'The Priesthood of the Omnissiah, a subset of the Adeptus Mechanicus.',
      },
      {
        name: 'Imperium', type: 'Imperium', parentKeyword: undefined, description: 'The Imperium of Man, a galaxy-spanning civilisation 10,000 years old.',
      },
      {
        name: 'Inquisition', type: 'Imperium', parentKeyword: undefined, description: 'Investigators and questioners, they wield great authority to root out threats to the Imperium.',
      },
      {
        name: '[Ordo]', type: 'Imperium', parentKeyword: 'Inquisition', description: 'A specific Ordo of the Inquisition (replaces this keyword when chosen).',
      },
      {
        name: 'Militarum Tempestus', type: 'Imperium', parentKeyword: undefined, description: 'Elite, specially-trained and equipped soldiers of the Astra Militarum.',
      },
      {
        name: 'Militarum Auxilla', type: 'Imperium', parentKeyword: undefined, description: 'A division of the Astra Militarum that consists of Abhumans.',
      },
      {
        name: 'Officio Prefectus', type: 'Imperium', parentKeyword: undefined, description: 'Elite leaders and disciplinarians of the Imperium’s military.',
      },
      {
        name: 'Primaris', type: 'Imperium', parentKeyword: undefined, description: 'A new, improved breed of Space Marine.',
      },
      {
        name: 'Rogue Trader', type: 'Imperium', parentKeyword: undefined, description: 'Space-faring merchant princes and explorers, granted great authority to expand the Imperium’s borders.',
      },
      {
        name: '[Dynasty]', type: 'Imperium', parentKeyword: 'Rogue Trader', description: 'A specific Rogue Trader Dynasty (replaces this keyword when chosen).',
      },
      {
        name: 'Adeptus Astra Telepathica', type: 'Imperium', parentKeyword: undefined, description: 'This Organisation is responsible for the recruitment and training of psykers.',
      },
      {
        name: 'Scholastica Psykana', type: 'Imperium', parentKeyword: undefined, description: 'A subset of the Adeptus Astra Telepathica, they train psykers in the use of their powers.',
      },
      {
        name: 'Anathema Psykana', type: 'Imperium', parentKeyword: undefined, description: 'A subset of the Adeptus Astra Telepathica, they train the Psychic Blanks into the Sisters of Silence.', source: 'tnh',
      },
      {
        name: 'Scum', type: 'Imperium', parentKeyword: undefined, description: 'Those who live upon the fringes of Imperial society, often in the underhive or criminal syndicates.',
      },
      {
        name: 'Skitarii', type: 'Imperium', parentKeyword: undefined, description: 'The warriors of the Omnissiah, devout troops who wield ancient technology.',
      },
      {
        name: 'Navis Nobilite',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The mutants whose abilities allow starships to pass through the warp and so travel between distant stars.',
        source: 'pax',
        // Data is Currency
        effectLabel: 'Nobilite Encoding',
        effect: 'A number of archaic, dead tongues or dialects, now only know to the ancient Nobilite families that keep the old languages alive. A Navis Nobilite House character may choose this language as one of his initial languages, or purchase it for 1 XP at a later time.',
      },
      {
        name: '[Navis House]',
        type: 'Imperium',
        parentKeyword: 'Navis Nobilite',
        description: 'A specific type of Navis Nobilite house (replaces this keyword when chosen).',
        source: 'pax',
      },
      {
        name: 'Untouchable',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'Those unfortunate few whose very presence is unnaturally ‘wrong’, and intrinsically opposed to the Immaterium.',
        source: 'pax'
      },
      {
        name: '[Gang]',
        type: 'Imperium',
        parentKeyword: undefined,
        description: '',
        source: 'pax',
      },
      {
        name: 'Adeptus Arbites',
        type: 'Imperium',
        parentKeyword: undefined,
        description: 'The keepers of Imperial law and enforcers of loyalty to the Golden Throne.',
        effect:
          'You are immune to Terror or Fear originating from enemies with the [Imperium] keyword. ' +
          'In addition, you gain +2 bonus dice to any Scholar or Investigation tests related to recidivists or heretics.',
        source: 'pax',
      },

      {
        name: '[Predict]',
        type: 'Imperium',
        parentKeyword: 'Adeptus Arbites',
        description: 'A specific type of Arbites precinct (replaces this keyword when chosen).',
        source: 'pax',
      },

      // Renegade and Heretic Keywords
      { name: 'Chaos', type: 'Renegade', parentKeyword: undefined, description: 'Those who serve the Dark Gods, knowingly or otherwise.' },
      { name: '[Mark of Chaos]', type: 'Renegade', parentKeyword: undefined, description: 'A specific Chaos God (replaces this keyword when chosen).' },
      { name: 'Dark Mechanicus', type: 'Renegade', parentKeyword: undefined, description: 'Small groups of Tech-Priests who have rejected the doctrines of Mars and work with the forces of Chaos.' },
      { name: 'Heretic', type: 'Renegade', parentKeyword: undefined, description: 'Those who have rejected the Imperial Creed.' },
      { name: 'Heretic Astartes', type: 'Renegade', parentKeyword: undefined, description: 'Once loyal to the imperium but now outlawed and enemies of mankind.' },
      { name: '[Legion]', type: 'Renegade', parentKeyword: undefined, description: 'A specific Heretic Astartes Legion (replaces this keyword when chosen).' },

      // Social PAX
      { source: 'pax', name: 'Nobility', type: 'Social', parentKeyword: undefined, description: 'The high born elite of the Imperium.' },
      { source: 'pax', name: 'Lower Class', type: 'Social', parentKeyword: undefined, description: 'Those who in their uncountable numbers toil at industry, agriculture or another manual trade.' },
      { source: 'pax', name: 'Outcast', type: 'Social', parentKeyword: undefined, description: 'Those unfortunates who have slipped through the cracks of society.' },
      { source: 'pax', name: 'Military', type: 'Social', parentKeyword: undefined, description: 'Those whose craft is the waging of war.' },
    ];
    const keywordSubwordRepository = [

      // Orders of the Adepta Sororitas
      { placeholder: '[Order]', name: 'Order of the Bloody Rose', type: 'Order Militant of the Adepta Sororitas', description: 'Formed from the bodyguards of an Abbess, this order honours the martyrdom of a sister who died in exceptionally bloody battle.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of Our Martyred Lady', type: 'Order Militant of the Adepta Sororitas', description: 'Founded in honour of Saint Katherine, this order wears black as a symbol of the deep mourning for their namesake’s death.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Valorous Heart', type: 'Order Militant of the Adepta Sororitas', description: 'A highly penitent order, they seek to atone for their part in the Reign of Blood.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of Sacred Rose', type: 'Order Militant of the Adepta Astartes', description: 'This order is highly disciplined, embodying the virtues of calm determination in the face of the enemy.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Ebon Chalice', type: 'Order Militant of the Adepta Sororitas', description: 'The oldest of the Orders Militant, this one was founded by Saint Alicia Dominica in the 38th Millennium. This order reveres the history and traditions of the Adepta Sororitas.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.' },
      { placeholder: '[Order]', name: 'Order of the Agent Shroud', type: 'Order Militant of the Adepta Sororitas', description: 'This order is famed for their righteous fury and selfl ess acts of heroism. Their founder seldom spoke, believing that deeds proved more devotion than words.', effect: 'When attempting an action associated with your order, the GM may grant you bonus dice.'},

      // Regiments of the Astra Militarum
      {
        name: 'Armageddon Steel Legion',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice on any Test to repair a vehicle or weapon',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'A mechanised force known for their industrial efficiency, these soldiers excel at motorised warfare to quickly outflank their Ork foes and protect them from the toxic environs of their homeworld.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1, condition: 'when repairing a vehicle or weapon' },
        ],
      },
      {
        name: 'Cadian Shock Troopers',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Resolve Tests',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'Though their homeworld was destroyed, the resolute will of the most renowned Regiment of the Astra Militarum refuses to break as long as a single soldier stands.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Catachan Jungle Fighters',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Survival (Wil) Tests',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        description: 'Raised in savage jungles filled with monstrous fauna, the troopers of the Death World Catachan fight for survival from the day of their birth.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'survival', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Death Korps of Krieg',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Intimidation (Wil) Tests',
        description: 'A planet in penitence for past rebellion, the radioactive Death World Krieg produces scores of warriors indoctrinated by sermons of sincere sacrifice. Their solemn nature, eagerness for martyrdom, and rebreather-covered faces are unnerving.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Gilead Gravediggers',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus to Defence when in Cover',
        description: 'Trained to embrace the discomforts of trench warfare even before the emergence of the Great Rift, the surviving Gilead Gravediggers have dug themselves deep into immovable positions to survive three years of daemonic incursions.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'defence', modifier: 0, rank: 1, condition: 'when in Cover' },
        ],
      },
      {
        name: 'Tallarn Desert Raiders',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus dice to Pilot (A) Tests.',
        description: 'Masters of mobile warfare, the Tallarns have a vaunted reputation for hit-and-run tactics and indirect engagement. Capable of meticulous military order in tank and vehicle formations, they strike fast and fade into dust storms.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'pilot', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Valhallan Ice Warriors',
        effectLabel: 'Regimental Affiliation',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effect: '+Rank bonus to Determination Tests',
        description: 'Tenacious and stubborn beyond a fault, Valhallans are indomitable in the face of defeat. They continue their grim advances and succeed despite suicidal odds — ignoring their oft heavy losses.',
        modification: { },
      },
      {
        name: 'Vostroyan Firstborn',
        placeholder: '[Regiment]',
        type: 'Regiment of the Astra Militarum',
        effectLabel: 'Regimental Affiliation',
        effect: '+Rank bonus to Leadership (Fel) Tests',
        description: 'Every firstborn child of Vostroya is offered to the Astra Militarum in atonement for the planet’s past sins. All see this as an honour, continuing to send reinforcements blind through the void despite the perils of Noctis Aeternia.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'determination', modifier: 0, rank: 1 },
        ],
      },

      // Ordos of the Inquisitor
      // (i) Characters with the [Ordo] keyword must have the Inquisition keyword as well.
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Hereticus',
        description:
          'The Ordo Hereticus hunts down heretics, mutants, and rogue psykers. It is their ' +
          'responsibility to police the Adeptus Ministorum. Their most common ally is the Order ' +
          'Militant of the Ecclesiarchy, the Sisters of Battle.',
        effect: 'Choose one: You gain +2 bonus dice to resist psychic powers, or you gain +2 '
        + 'bonus dice to Corruption tests.',
        modification: {},
        options: [
          {
            name: 'Ordo Hereticus Specialisaton',
            snippet: 'You gain +2 bonus dice to resist psychic powers.',
            description: ''
          },
          {
            name: 'Ordo Hereticus Specialisaton',
            snippet: 'You gain +2 bonus dice to Corruption tests.',
            description: ''
          },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Xenos',
        description: 'The Ordo Xenos is tasked with defeating the alien in all its loathsome '
        + 'forms. They study their foe, always probing for more information about the '
        + 'weaknesses of alien species and civilisations. It is their duty to investigate '
        + 'xenos influence over Imperial domains. Their operations often see them working '
        + 'alongside the Space Marines of the Deathwatch.',
        effect: 'The character is fluent in one alien language; choose an alien species and '
        + 'write it down on the character sheet. In addition, the character gains +2 bonus '
        + 'dice for any Scholar or Investigation tests related to xenos.',
        modification: {},
        modifications: [
          {
            name: 'Understand your enemies',
            snippet: 'The character is fluent in one alien language,',
          },
          {
            name: 'Know your enemies',
            snippet: '+2 bonus dice to Scholar tests related to xenos.',
          },
          {
            name: 'Exploit your enemies',
            snippet: '+2 bonus dice to Investigation tests related to xenos.',
          },
          { targetGroup: 'skills', targetValue: 'scholar', modifier: 2, condition: 'when related to xenos.' },
          { targetGroup: 'skills', targetValue: 'investigation', modifier: 2, condition: 'when related to xenos.' },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Ordo Malleus',
        description: 'The Ordo Malleus were established to fight against mankind’s greatest '
        + 'menace the corrupting influence of Chaos. The Chamber Militant of the Ordo Malleus '
        + 'are the Grey Knights, and they sometimes campaign together under a dual command '
        + 'structure.',
        effect: 'Either the character gains +3 Corruption and +1 Conviction, or gain +2 bonus dice for any '
        + 'Scholar (Int) and Investigation (Int) tests related to daemons and the warp.',
        modification: {},
        options: [
          {
            name: 'Ordo Malleus Specialisaton',
            snippet: 'You gain +3 Corruption and +1 Conviction.',
            description: '',
            modifications: [
              { targetGroup: 'traits', targetValue: 'corruption', modifier: 3 },
              { targetGroup: 'traits', targetValue: 'conviction', modifier: 1 },
            ],
          },
          {
            name: 'Ordo Malleus Specialisaton',
            snippet: 'You gain +2 bonus dice to Scholar (Int) and Investigation (Int) tests related to daemons and the warp.',
            description: '',
            modifications: [
              { targetGroup: 'skills', targetValue: 'scholar', modifier: 2, condition: 'when related to daemons and the warp' },
              { targetGroup: 'skills', targetValue: 'investigation', modifier: 2, condition: 'when related to daemons and the warp' },
            ],
          },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'Other Ordo',
        description: 'Inquisitors are as varied in appearance, manner and method as the worlds '
        + 'of the Imperium they strive to protect.',
        effect: 'Choose one Skill from the following list: Cunning, Deception, Insight, '
        + 'Intimidation, Persuasion, Psychic Mastery, Scholar, Stealth, Survival, Tech. '
        + 'Gain +Rank bonus dice with that skill.',
        modification: {},
        options: [
          { name: 'Cunning', snippet: 'Gain +Rank bonus dice to Cunning Tests.' },
          { name: 'Deception', snippet: 'Gain +Rank bonus dice to Deception Tests.' },
          { name: 'Insight', snippet: 'Gain +Rank bonus dice to Insight Tests.' },
          { name: 'Intimidation', snippet: 'Gain +Rank bonus dice to Intimidation Tests.' },
          { name: 'Persuasion', snippet: 'Gain +Rank bonus dice to Persuasion Tests.' },
          { name: 'Psychic Mastery', snippet: 'Gain +Rank bonus dice to Psychic Mastery Tests.' },
          { name: 'Scholar', snippet: 'Gain +Rank bonus dice to Scholar Tests.' },
          { name: 'Stealth', snippet: 'Gain +Rank bonus dice to Stealth Tests.' },
          { name: 'Survival', snippet: 'Gain +Rank bonus dice to Survival Tests.' },
          { name: 'Tech', snippet: 'Gain +Rank bonus dice to Tech Tests.' },
        ],
      },
      {
        placeholder: '[Ordo]',
        type: 'Ordo of the Inquisiton',
        name: 'No Ordo',
        description: 'Inquisitors are as varied in appearance, manner and method as the worlds '
        + 'of the Imperium they strive to protect.',
        effect: 'Choose one Skill from the following list: Cunning, Deception, Insight, '
        + 'Intimidation, Persuasion, Psychic Mastery, Scholar, Stealth, Survival, Tech. '
        + 'Gain +Rank bonus dice with that skill.',
        modification: {},
        options: [
          { name: 'Cunning', snippet: 'Gain +Rank bonus dice to Cunning Tests.' },
          { name: 'Deception', snippet: 'Gain +Rank bonus dice to Deception Tests.' },
          { name: 'Insight', snippet: 'Gain +Rank bonus dice to Insight Tests.' },
          { name: 'Intimidation', snippet: 'Gain +Rank bonus dice to Intimidation Tests.' },
          { name: 'Persuasion', snippet: 'Gain +Rank bonus dice to Persuasion Tests.' },
          { name: 'Psychic Mastery', snippet: 'Gain +Rank bonus dice to Psychic Mastery Tests.' },
          { name: 'Scholar', snippet: 'Gain +Rank bonus dice to Scholar Tests.' },
          { name: 'Stealth', snippet: 'Gain +Rank bonus dice to Stealth Tests.' },
          { name: 'Survival', snippet: 'Gain +Rank bonus dice to Survival Tests.' },
          { name: 'Tech', snippet: 'Gain +Rank bonus dice to Tech Tests.' },
        ],
      },

      // Rogue Trader Dystanies
      // (i) Characters with the [Dynasty] keyword must have the Rogue Trader keyword as well.
      { placeholder: '[Dynasty]', name: 'Your Rogue Trader House', type: 'Rogue Trader Dynasty', description: '' },

      // Forge Worlds of the Adeptus Mechanicus
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Mars', description: 'The Red Planet: Birthplace of the Cult Mechanicus, considered the holiest of all celestial orbs. Tech-Priests of Mars consider themselves the most blessed of the Cult Mechanicus, and their ability to placate machine spirits is second to none.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Lucius', description: 'The Hollow Forge: A hollow world, Lucius is powered by an artificial sun in the planet’s core. This Forge World is known for creating a unique, sought-after alloy known as Luciun.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Agripinaa', description: 'Orb of a Million Scars: This Forge World exists on the threshold of the Eye of Terror. Agripinaa has fought off countless, relentless invasions by the forces of Chaos.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Stygies VIII', description: 'The Ever-Staring Cyclops: Considered untrustworthy by other Forge Worlds, Stygies VIII nearly fell to heresy but was saved by an Aeldari intervention. It is home to a secretive sect dedicated to the study of alien technology known as Xenarites.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Graia', description: 'The Crown of Miracles: Graia’s forges exist as a geometrically-perfect network of space stations known as the Crown. The tenacity of this Forge World is legendary, and they are known for their steadfast pursuit of their goals, no matter the cost.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Metalica', description: 'The Gleaming Giant of Ultima Segmentum: This Forge World is formed nearly entirely from metal, having exterminated all biological life. It is a world of hissing pistons, glowing forges, and strata upon strata of industrial waste. The Tech-Priests of Metalica take pride in the sterile perfection of their lifeless world.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Ryza', description: 'Furnace of Shackled Stars: Famed for producing containment fields and plasma weaponry, Ryza is locked in a battle of survival against the invasion of two major Ork Waaagh!s. The residents of this Forge World have a reputation for fi erceness.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Triplex / Phall', description: 'Forge of the Eastern Frontier: Isolated on the Eastern Fringe, this Forge World is considered somewhat insubordinate to Mars. Autonomous and independently-minded, Triplex Phall sends numerous explorator fl eets to discover new worlds and resources.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Daimos', description: 'The Gift of the Sigillite: Relocated from the orbit of Mars to Titan, this heavily-industrialised moon produces highly-specialised wargear for the Grey Knights—a secret Chapter of Space Marines tasked with directly combating the threat of daemons and Chaos.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Voss Prime', description: 'The Right Hand of Mars: Modelled after Mars, Voss Prime is second only to that world in production of armaments for the Imperium. The Forge World’s vaunted capacity has gai-ned them praise for Vosspattern vehicles, but they have struggled to master replicating plasma technology.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Gryphonne IV', description: 'The Lost Forge: The formidable defences of this Forge World were overrun by the assault of Hive Fleet Leviathan. Certain that their fortifi cations would ensure victory, the defenders fought with valour and skill. However, the Tyranids shattered Gryphonne IV’s armies and laid waste to the world. Only a relative handful of survivors escaped.' },
      { type: 'Forge World of the Adeptus Mechanicus', placeholder: '[Forge World]', name: 'Avachrus', description: '(See CORE pg. xx)' },

      // Astartes Chapters
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Blood Angels', description: 'Masters of melee combat, the Blood Angels readily charge into hordes of even the most capable foes, often overcoming terrible odds. Horus slew Sanguinius during the attack on blessed Terra, and visions of that death haunt the minds of every battle brother. Fury from that tragedy keeps all Blood Angels on the verge of complete loss of control.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Dark Angels', description: 'The Dark Angels demonstrate no emotion when they engage their opponents. They have no mercy for the Imperium’s foes, nor do they take pride in even their greatest triumphs. Their darkest secret is that members of the founding Legion turned against the Imperium—though this is known only to the highest-ranking members of the chapter. The Dark Angels and their successors strive endlessly to fi nd and eliminate their Fallen brethren.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Imperial Fists', description: 'The Imperial Fists proudly assume the responsibility for defending blessed Terra from invaders, including traitors and xenos. They are masters of siegecraft, exhibiting the patience and determination to outlast a foe in combination with a well-earned recognition for exceptional marksmanship. After the Horus Heresy, the Imperial Fists embraced the Codex Astartes, following its tenets to the letter.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Iron Hands', description: 'The Iron Hands see flesh and emotion as weaknesses to be excised. In battle, they always strive to fight without emotion, following a strategy directed entirely by logic. To purge themselves of weakness, Iron Hands replace their body’s fl esh with cybernetics—including the replacement of healthy tissues. These beliefs have led the chapter to build close ties to the Adeptus Mechanicus.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Raven Guard', description: 'The Raven Guard prefer to fight covertly, executing swift strikes from the shadows and rapid withdrawals instead of protracted engagements on open battlefi elds. While they are fully capable and equipped to execute more straightforward attacks, their numbers are limited due to fl aws in their gene-seed. Consequently, they prefer to execute focused attacks, exploiting what they can identify as the enemy’s weakest points.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Salamanders', description: 'The Salamanders’ Seed World is the planet Nocturne, a planet of exotic radiation and constant lava fl ows. They are known for their fi erce determination and endurance, which complement their skill at arms. The Salamanders are the only legion that did not divide into other chapters during the Second Founding, due to the severe losses they suffered during the Horus Heresy.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Space Wolves', description: 'The Space Wolves are fiercely loyal to the Imperium, but they are a savage and boastful lot. They have no patience for the rules of the Codex Astartes or any other Imperial authority. Instead, they revel in their feral actions and appearance as they overcome any who would dare to oppose the Imperium.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Ultramarines', description: 'Ultramarines are renowned for their discipline, honour, and tactical acumen. In the wake of the Horus Heresy, the Ultramarines Legion composed nearly half of the Space Marines in the galaxy. By willingly dividing the Legion into chapters, they set the example that enabled the second founding to succeed and provide a basis for the other legions to embrace the Codex Astartes.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'White Scars', description: 'The White Scars embrace strategies built around rapid and savage attacks, striking at an opponent and withdrawing before the foe has any opportunity to make a counterstrike. They prefer to attack from vehicles, deploying from transports or riding bikes or Land Speeders into battle. Their traditions prize ferocity, tempered by an inherent sense of honour and justice.' },
      { type: 'Chapter of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Other Chapter', description: 'An unkown chapter in the vast space.' },

      // Doctors of Doom
      { source: 'dod', type: 'Chapter House of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Doctors of Doom (House Isenwell)', description: 'Thrive for excellence.' },
      { source: 'dod', type: 'Chapter House of the Adeptus Astartes', placeholder: '[Chapter]', name: 'Doctors of Doom (House Hironiat)', description: 'Break the Tide.' },

      // [Legion] -> Let the Galaxy Burn
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Black Legion', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Iron Warriors', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Night Lords', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'World Bearers', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Alpha Legion', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Death Guard', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Emperor`s Children', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'Thousand Suns', description: '' },
      { source: 'ltgb', type: 'Legion of the Heretic Astartes', placeholder: '[Legion]', name: 'World Eaters', description: '' },

      // [Enclave] -> The Null Hypothese
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Raptor Guard', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Storm Dagger', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'White Talon', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Brazen Sabre', description: '' },
      { source: 'tnh', type: 'Enclave of the Sisters of Silence', placeholder: '[Enclave]', name: 'Vigil of Gilead', description: '' },

      // Marks of the Chaos Goods
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Khorne', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Tzzeench', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Nurgle', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Mark of Slaneesh', description: '' },
      { type: 'Mark of Chaos', placeholder: '[Mark of Chaos]', name: 'Chaos Undivided', description: '' },

      // Eldar Craftworlds
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Alaitoc', description: 'The Starstriders: The Eldar of Alaitoc have spread further afi eld than other Craftworlds, acting as their people’s eyes and ears as they wander the galaxy. The warriors of Alaitoc favour stealth and misdirection over brute force.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Biel-Tan', description: 'The Swordwind: This is the most militant of all Craftworlds. Those who strive hardest to return to the glory of their people before the Fall, the Eldar of Biel-Tan mourn the shattering of their Craftworld during an invasion by the forces of Slaanesh.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Iyanden', description: 'The Ghost Warriors: Once a thriving Craftworld, Iyanden was invaded by Tyranids of Hive Fleet Kraken. The Eldar fought off this brutal assault at great cost. Now, most of the Craftworld is empty, forcing the Iyanden Farseers to call upon their fallen to fight for survival.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Saim-Hann', description: 'The Wild Host: The Eldar of Saim-Hann are renowned for their fast, mobile warfare. They are a Craftworld of ancient tradition and a proud warrior culture. They observe many rituals that are unique to their Craftworld, including special races and duels.' },
      //{ type: 'Aeldari Craftsworld', placeholder: '[Craftworld]', name: 'Ulthwé', description: 'The Damned: This Craftworld has fought an unending war around the Eye of Terror. Ulthwé tends to involve itself in the events of the galaxy far more than other Craftworlds. It is also home to many of the most powerful psykers in the galaxy. Some Eldar believe this Craftworld is cursed due to its proximity to the Eye of Terror.' },

      // Asuryani Craftworlds
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Alaitoc',
        description: 'The Rangers alienated by Alaitoc’s puritanical interpretation of the Asuryani Path maintain a galaxy-wide intelligence network in support of their kin.',
        effect: '+1 bonus die on Cunning (Fel) Tests',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.CUNNING, modifier: 1 } ],
      },
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Biel-Tan',
        description: 'Daemonic invasion, and the first summoning of the Yncarne, have fractured the craftworld of Biel-Tan. The survivors are aggressively militant, determined to defy their culture’s extinction by rebuilding the Aeldari empire.',
        effect: '+1 bonus die on Intimidation (Wil) Tests',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 1 } ],

      },
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Iyanden',
        description: 'The ravages of the Tyranid hive fleets have reduced Iyanden to a craftworld of ghosts — but those who still live are determined to keep doing so.',
        effect: '+1 Resolve',
        modifications: [ { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 1 } ],
      },
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Saim-Hann',
        description: 'Saim-Hann is divided into Wild Rider tribes, bold warriors who wage war from the saddles of anti-grav vehicles, and leave no insult to their honour unchallenged.',
        effect: '+1 bonus die on Pilot (A) Tests',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.PILOT, modifier: 1 } ],
      },
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Ul-Khari',
        description: 'After years of isolationism, the ‘doom-courters’ of Ul-Khari who failed to heed the omens of annihilation have become stranded amidst vengeful, crystal ice — but adapted impressively well.',
        effect: '+1 bonus die on Toughness Tests',
      },
      {
        source: 'aioe',
        type: 'Asuryani Craftsworld',
        placeholder: '[Craftworld]',
        name: 'Ulthwé',
        description: 'Orbiting the Eye of Terror has cursed Ulthwé’s psykers to see further than any others, foresight they use to wage a long war against the Ruinous Powers.',
        effect: '+1 bonus Wrath Die on Psychic Mastery (Wil) Tests',
      },

      // Anrathe Corties / CORSAIRS
      {
        source: 'aioe',
        type: 'Corsair Coterie',
        placeholder: '[Coterie]',
        name: 'Eldritch Raiders',
        description: 'Under the renowned Prince Yriel of Iyanden, the Eldritch Raiders have bound other Corsair fleets to their banner and formed a disciplined corps of warrior privateers.',
        effect: 'Spend Shifts on Leadership (Wil) Tests to gain Wrath. Up to RANK times per session',
      },
      {
        source: 'aioe',
        type: 'Corsair Coterie',
        placeholder: '[Coterie]',
        name: 'Greensteel Warriors',
        description: 'Operating out of the Gilead System, the Greensteel Warriors delight in brokering alliances with other factions, if only for the thrill of betraying them later.',
        effect: 'Spend Shifts on Deception (Fel) Tests to gain Wrath. Up to RANK times per session',
      },
      {
        source: 'aioe',
        type: 'Corsair Coterie',
        placeholder: '[Coterie]',
        name: 'Steeleye Reavers',
        description: 'The Steeleye Reavers cultivate an aura of dread and menace by physically marking their victims with a sigil — the sign of an elongated iris, with a pointing arrowhead.',
        effect: 'Spend Shifts on Intimidation (Wil) Tests to gain Wrath. Up to RANK times per session',
      },
      {
        source: 'aioe',
        type: 'Corsair Coterie',
        placeholder: '[Coterie]',
        name: 'Sunblitz Brotherhood',
        description: 'The triplet siblings who rule the Sunblitz Brotherhood treat the ‘lesser species’ of the galaxy with scorn, and yearn for the extermination of all non-Aeldari.',
        effect: 'Spend Shifts on Weapon Skill (I) Tests to gain Wrath. Up to RANK times per session',
      },
      {
        source: 'aioe',
        type: 'Corsair Coterie',
        placeholder: '[Coterie]',
        name: 'Void Dragons',
        description: 'The fickle and ubiquitous Void Dragons are a plague on the galaxy at large, venturing into the farthest reaches of the void with their raids, ambushing unpredictably and ruthlessly.',
        effect: 'Spend Shifts on Pilot (A) Tests Tests to gain Wrath. Up to RANK times per session',
      },

      // Drukhari KABALS
      {
        source: 'aioe',
        type: 'Drukhari Kabal',
        placeholder: '[Kabal]',
        name: 'The Black Heart',
        description: 'The enforcers of the legendary Asdrubael Vect know their Kabal’s preeminence in Commorragh is preserved only as long as they continue to violently assert it.',
        effect: 'Gain 1 Ruin to add +Double Rank bonus dice on a Leadership (Wil) Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.LEADERSHIP, modifier: 0, rank: 2, condition: 'when granting the GM 1 Ruin' } ],
      },
      {
        source: 'aioe',
        type: 'Drukhari Kabal',
        placeholder: '[Kabal]',
        name: 'The Bloodied Claw',
        description: 'The long reign of Akhara’Keth over this opportunistic Kabal is credited to his keen sense for impending betrayal. His rivals must be even wilier to unseat him.',
        effect: 'Gain 1 Ruin to add +Double Rank bonus dice on an Insight (Fel) Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.INSIGHT, modifier: 0, rank: 2, condition: 'when granting the GM 1 Ruin' } ],
      },
      {
        source: 'aioe',
        type: 'Drukhari Kabal',
        placeholder: '[Kabal]',
        name: 'The Flayed Skull',
        description: 'Where possible, these rapid-attack specialists do not sully themselves by setting foot on alien worlds, killing instead from the comfort of their anti-grav vehicles.',
        effect: 'Gain 1 Ruin to add +Double Rank bonus dice on a Pilot (A) Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.PILOT, modifier: 0, rank: 2, condition: 'when granting the GM 1 Ruin' } ],
      },
      {
        source: 'aioe',
        type: 'Drukhari Kabal',
        placeholder: '[Kabal]',
        name: 'The Obsidian Rose',
        description: 'These arms dealers and master-crafters produce the deadliest weapons in all of Commorragh, and enjoy putting their precious tools to murderous use.',
        effect: 'Gain 1 Ruin to add +Double Rank bonus dice on a Tech (Int) Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.TECH, modifier: 0, rank: 2, condition: 'when granting the GM 1 Ruin' } ],
      },
      {
        source: 'aioe',
        type: 'Drukhari Kabal',
        placeholder: '[Kabal]',
        name: 'The Poisoned Tongue',
        description: 'This Kabal is notorious for scheming and conspiracy, preferring to kill with poisoned weapons and other unfair advantages rather than unimaginative brute force.',
        effect: 'Gain 1 Ruin to add +Double Rank bonus dice on a Deception (Fel) Test.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.DECEPTION, modifier: 0, rank: 2, condition: 'when granting the GM 1 Ruin' } ],
      },

      // [WYCH]
      {
        source: 'aioe',
        type: 'Drukhari Wych Cult',
        placeholder: '[Wych Cult]',
        name: 'Cult of Strife',
        description: 'This Cult runs some of the most popular bloodsports in Commorragh, because they always make a spectacularly explosive first impression.',
        effect: 'Gain 1 Ruin to add +Double Rank extra dice on an attack Test made as part of a Charge.',
      },
      {
        source: 'aioe',
        type: 'Drukhari Wych Cult',
        placeholder: '[Wych Cult]',
        name: 'The Cursed Blade',
        description: 'Whilst most Wych Cults stay out of the Dark City’s politics, this Cult holds that a well-executed betrayal is as arresting as any gladiatorial duel.',
        effect: 'Gain 1 Ruin to add +Double Rank extra dice and +Double Rank ED on a Surprise Attack.',
      },
      {
        source: 'aioe',
        type: 'Drukhari Wych Cult',
        placeholder: '[Wych Cult]',
        name: 'Endless Trauma',
        description: 'The performances of this Cult are more niche and psychological, subjecting their victims to a demeaning subjugation before delivering the killer strike.',
        effect: 'Gain 1 Ruin to inflict Double Rank Shock on an enemy targeted by a successful melee attack.',
      },
      {
        source: 'aioe',
        type: 'Drukhari Wych Cult',
        placeholder: '[Wych Cult]',
        name: 'The Red Grief',
        description: 'This Cult’s shows are characterised by high velocity as well as martial skill, dealing death at such blistering speed even Aeldari reflexes cannot track the blow.',
        effect: 'Gain 1 Ruin to add +Rank Speed for the rest of a Turn.',
        modifications: [ { targetGroup: 'traits', targetValue: TRAITS.SPEED, modifier: 0, rank: 1, condition: 'when granting the GM 1 Ruin' } ],
      },

      // [COVEN]
      {
        source: 'aioe',
        type: 'Drukhari Coven',
        placeholder: '[Coven]',
        name: 'The Baleful Curriculum',
        description: 'This Coven is generous with its appalling knowledge, hoping its teachings can inspire a wave of atrocities across the Gilead System.',
        effect: 'Gain 1 Ruin to provide +Rank bonus dice when Helping another Agent.',
      },
      {
        source: 'aioe',
        type: 'Drukhari Coven',
        placeholder: '[Coven]',
        name: 'Coven of Twelve',
        description: 'Assassination by power hungry underlings is a constant threat for this Coven’s ruling council. The Haemonculus masters punish impulsively, vigilant for signs of betrayal while engrossed in their terrible work.',
        effect: 'Gain 1 Ruin to reduce the DN penalties for Multi-Actions by Rank for the rest of a Turn.',
      },
      {
        source: 'aioe',
        type: 'Drukhari Coven',
        placeholder: '[Coven]',
        name: 'The Dark Creed',
        description: 'This Coven has perfected the cultivation of fear — not just to satisfy their culture’s soul debt, but as an art form worth practising in its own right.',
        effect: 'Gain 1 Ruin to add +Rank bonus dice and +Rank targets to an Intimidate (Wil) Interaction Attack.',
        modifications: [ { targetGroup: 'skills', targetValue: SKILLS.INTIMIDATION, modifier: 0, rank: 1, condition: 'to Interaction Attacks, when granting the GM 1 Ruin' } ],
      },
      {
        source: 'aioe',
        type: 'Drukhari Coven',
        placeholder: '[Coven]',
        name: 'The Prophets of Flesh',
        description: 'Under the notorious Urien Rakarth, this Coven has repeatedly violated the laws of nature, with transgressive fleshcrafting procedures its recipients are nervous to accept.',
        effect: 'Gain 1 Ruin to heal +Rank additional Wounds on a successful use of the Medicae (Int) Skill.',
      },

      // [MASQUE]
      {
        source: 'aioe',
        type: 'Harlequin Mask',
        placeholder: '[MASQUE]',
        name: 'The Calamity Trail',
        description: 'The sites of terrible disasters are the preferred backdrops for this Masque’s performances, where such dire environments provide a perfect stage for one of the many tragedies of Aeldari myth.',
        effect: 'When you inflict a Critical Hit against a Mob or Threat with a Condition, inflict +2 Mortal Wounds on the target.',
      },
      {
        source: 'aioe',
        type: 'Harlequin Mask',
        placeholder: '[MASQUE]',
        name: 'The Dreaming Shadow',
        description: 'These sombre sentinels are committed to battling the ancient Necrons. Rarely away from the battlefield, the Dreaming Shadow has honed to a razor’s edge those saedath best suited to combating this ancient foe.',
        effect: 'When you roll a Wrath Critical whilst Dying, you gain 1 Wound and 1 Wrath Point.',
      },
      {
        source: 'aioe',
        type: 'Harlequin Mask',
        placeholder: '[MASQUE]',
        name: 'The Frozen Stars',
        description: 'The upbeat Harlequins of this Masque dance with giddy, frenetic enthusiasm that quickly translates to malicious and sadistic punishment in combat.',
        effect: 'When you inflict a Critical Hit as part of a Charge, inflict +2 Mortal Wounds on the Mob or Threat targeted.',
      },
      {
        source: 'aioe',
        type: 'Harlequin Mask',
        placeholder: '[MASQUE]',
        name: 'The Midnight Sorrow',
        description: 'The intensity with which this Masque pursues the Great War against Chaos produces acrobats of incredible grace and skill, at the cost of their personal identity',
        effect: 'When you inflict a Critical Hit on a melee attack, you may move up to your Speed as a Free Action.',
      },
      {
        source: 'aioe',
        type: 'Harlequin Mask',
        placeholder: '[MASQUE]',
        name: 'The Veiled Path',
        description: 'This Masque exemplifies Cegorach’s role as a trickster god, misleading enemies and betraying allies for the fun of their indignant reaction.',
        effect: 'When you roll a Wrath Critical on a Deception Interaction Attack, Conditions inflicted last for the rest of combat.',
      },


      // Ynnari
      {
        name: 'Ynnari',
        type: 'Aeldari',
        parentKeyword: undefined,
        description: 'The departing souls of fallen warriors nourish the Ynnari and inspire them to exceed the limitations of the living. ',
        // Data is Currency
        effectLabel: 'Strength From Death',
        effect: 'When an allied Agent kills a living creature in their Turn and you Seize the Initiative to act next, you gain +Rank bonus dice on all Tests made during your Turn',
      },

      // Ork Clans
      {
        name: 'Bad Moons',
        placeholder: '[Clan]',
        type: 'Ork Clan',
        description: 'Growing the Teef that are Orkish currency faster than any other Clan, the Bad Moons are the wealthiest, and thus have the best food and flashiest weaponry — traits they are incredibly proud of.',
        effect: 'Gain +1 Wealth at the end of every session.',
        modification: {},
      },
      {
        name: 'Blood Axe',
        type: 'Ork Clan',
        placeholder: '[Clan]',
        description: 'Considered ‘un-Orky’ by other Clans, the Blood Axes use unorthodox ‘taktiks’, like planning, strategy, and even trading with the Imperium to get better Wargear.',
        effect: '+Rank bonus dice to Leadership (Fel) and Stealth (A) Tests.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'leadership', modifier: 0, rank: 1 },
          { targetGroup: 'skills', targetValue: 'stealth', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Deathskulls',
        placeholder: '[Clan]',
        type: 'Ork Clan',
        description: 'Sabrous and scheming, the Deathskulls steal, loot, or scrounge whatever they can. Known to hoard, they ‘trade’ and customise gear more frequently than other Clans.',
        effect: '+Rank bonus dice to Tech (Int) and Influence Tests.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1 },
          { targetGroup: 'traits', targetValue: 'influence', modifier: 0, rank: 1 },
        ],
      },
      {
        name: 'Evil Sunz',
        placeholder: '[Clan]',
        type: 'Ork Clan',
        description: 'Obsessed with speed, Evil Sunz revel in the roar of engines, the smell of burning promethium, and the feeling of going as fast as possible.',
        effect: 'You gain +1 Speed, and +Rank bonus dice to all Tests whenever you are in a vehicle moving at top speed.',
        modification: {},
        modifications: [
          { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
        ],
      },
      {
        name: 'Goffs',
        placeholder: '[Clan]',
        type: 'Ork Clan',
        description: 'Massive and multitudinous, Goffs example typical Ork warfare; all tough, large, loutish brutes looking for any excuse to charge headlong into battle in as big a mob as possible.',
        effect: '+Rank bonus dice to melee attack Tests when you Charge (p.189).',
        modification: {},
      },
      {
        name: 'Snakebites',
        placeholder: '[Clan]',
        type: 'Ork Clan',
        description: 'Deliberately primitive, the tribal Snakebites prefer their thick skin to crafted armour, proud of their ability to live off the land.',
        effect: '+Double Rank bonus dice to Survival (Wil) Tests.',
        modification: {},
        modifications: [
          { targetGroup: 'skills', targetValue: 'survival', modifier: 0, rank: 2 },
        ],
      },

      // PAX Navigator Houses
      { type: 'Navigator House', placeholder: '[Navis House]', name: 'Magisterial House', description: 'Greatest in size and power are the Magisterial Houses. The roots of the original Navigator families, these Houses maintain mighty palaces on Terra and their influence reaches to the very edges of the light of the Astronomican. The Magisterial Houses maintain traditions and practices that have served them for millennia. They are masters of the traditional Navigator crafts and have more control over the malign mutations that afflict those with the gene. To be part of a Magisterial House is to know without question the purity of your blood and the ancient power and nobility of your family.' },
      { type: 'Navigator House', placeholder: '[Navis House]', name: 'Nomadic House', description: 'Some of the Great Houses have forsaken ties of sector and system, relinquishing their terrestrial holdings. Instead, over the centuries, these Navigator Houses have taken wholly to the stars to become wanderers and gypsies, their lines preserved on vast fleets of ships constantly on the move. To be part of a Nomadic House is to be born between the stars and spurn the life of a dirt dweller. It is also this long term exposure to both the void and the Immaterium that hones the skills of Navigators from Nomadic Houses, giving them an understanding of space and warp second to none' },
      { type: 'Navigator House', placeholder: '[Navis House]', name: 'Renegade House', description: 'Some of the Great Houses have completely forsaken the traditions and ancient practices of the Navigator families in their quest for power, or may have been turned on by the rest of the Navis Nobilite, harrowed, and driven into exile. Dabbling heavily in the genes of their children in order to improve their lot, their tampering often leads to hideous mutations and unconscionable monsters in their lineage, which in turn leads to rejection by the Paternova and a hunt to extinction by the Inquisition. In some cases, however, it has birthed new strains of the gene and given rise to families with unique abilities and potent powers. To be a part of a Renegade House is to have cast aside the sacred Navigator traditions as small minded and restrictive and instead embraced the glory and limitless potential of your ancestry - or so the houses believe, to comfort themselves.' },
      { type: 'Navigator House', placeholder: '[Navis House]', name: 'Shrouded House', description: 'Shrouded houses have suffered great losses or shame within the more established dominions of the Imperium. They have opted to move their powerbase completely to the edge of known space, where they cling to the barest strands of their former status and power. Though they may be rich in skill, knowledge or lore, something in the past of Shrouded Houses has blighted them and reduced them to a state so far from their once exalted position that they are sometimes cruelly called ‘beggar houses’ by their more successful counterparts. To be part of a Shrouded House is to be part of a fallen line that is slowly rising again to stand defiant against those that once cast them down - or at least, so you are told by your elders. Their loss in standing has often forced such houses to flee to the margins of the Imperium and to develop a cunning and opportunistic mindset alongside a skill that is often lacked by more comfortably indolent houses.' },

      // PAX Adeptus Arbites Predict
      { type: 'Adeptus Arbited Predict', placeholder: '[Predict]', name: 'Astra', description: 'Precinct Astra is the designation for the diffused networks of a local sector, tasked with patrolling interstellar trade routes and monitoring crime within the void.' },
      { type: 'Adeptus Arbited Predict', placeholder: '[Predict]', name: 'Courthouse', description: 'Sprawling hive cities typically also have their own Courthouse Precinct to aid in large scale monitoring, reporting to their central Precinct Fortress.' },
      { type: 'Adeptus Arbited Predict', placeholder: '[Predict]', name: 'Fortress', description: 'Most Arbitrators operate out of massive Precinct Fortresses, located within capital cities in close proximity to the Planetary Governor of major Imperial worlds.' },
      { type: 'Adeptus Arbited Predict', placeholder: '[Predict]', name: 'House', description: 'Remote planets of little importance typically have just a single fortified Precinct House for the single Arbitrator stationed there.' },
      { type: 'Adeptus Arbited Predict', placeholder: '[Predict]', name: 'Op-Center', description: 'Operational centers are forward operating bases maintained throughout Imperial worlds, particularly hive or industrial worlds, with each being a garrison for a few dozen Arbitrators who report to their nearest precinct.' },

      // AAOA Squat Leagues
      { source: 'aaoa', type: 'Squat League', placeholder: '[League]', name: 'League of Thor', description: 'The most powerful and influential League, once containing more than three hundred Strongholds. What remains is a fleet of a thousand ships, sailing through the inky void of the Imperium Nihilus, seeking allies.' },
      { source: 'aaoa', type: 'Squat League', placeholder: '[League]', name: 'League of Emberg', description: 'The furthest League from the galactic core, lying near to the Eye of Terror. The remnants gathered up with survivors from Cadia and are currently waging a crusade of vengeance against any of the forces of Chaos they encounter.' },
      { source: 'aaoa', type: 'Squat League', placeholder: '[League]', name: 'League of Kapellar', description: 'The League with the greatest number of member Strongholds, though none so influential as those within the League of Thor. The remnants are scattered far and wide and can normally be found hiring themselves out as mercenaries as they search for signs of their kin.' },
      { source: 'aaoa', type: 'Squat League', placeholder: '[League]', name: 'League of Norgyr', description: 'The first of the Leagues to be discovered by the Great Crusades, due to its relative proximity with Earth. Most of the survivors rallied to the Imperium after the cataclysm, and now scour the western edge of the rift looking for other Squats and for Chaos raiders.' },
      { source: 'aaoa', type: 'Squat League', placeholder: '[League]', name: 'League of Grindel', description: 'A rival to the League of Thor, who waged war against them in the 39th Millennium until they united in the face of WAAAGH Grunhag. Few survived the cataclysm, and the survivors have tried to settle a world near the rift in the Imperium Nihilus.' },

      // PAX Hive Gang
      {
        name: 'Anarcho-Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'While other gangs are driven by the thrill of conquest, honor or prestige of their patron houses, or the pursuit of wealth and dominance, the anarcho-gangs are an altogether different beast. Lacking motivation or ambition, the defining trait of these gangs is purely violence, mayhem and anarchy, reveling in the fires, smoke, screams and klaxons that are left in the wake of their presence Only the strongest anarcho-gangs survive long as their goals put them directly into the confrontation with agents of the Adeptus Terra, and only truly flourish where weak planetary governors hold reign.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Intimidation tests.',
      },
      {
        name: 'Autoduelers',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Throughout the iron spires of hive worlds there exists a burning need for speed in some gangs, obsessed with pushing a variety of vehicles to the limit and fueling their adrenaline addictions. Whether it is on the back of a black shadow ferro-beast, antigravitic drav-bikes, or supped up autocarriages, these reckless gangers always flirt with death or incarceration as they inevitably attract enforcers and arbites alike.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Pilot tests.',
      },
      {
        name: 'Brat Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Amongst the vicious gangs of the Imperium, the brat gangs, or cloudboys, stand out not only for their deadliness but also for their cruelty. Their members are exclusively from the upper reaches; most are young toughs from noble families, those not in the line of ascension and constantly causing embarrassment to their houses. Some are banished to the lower levels; others leave on their own, eager to get away. Unlike almost everyone else in the hives, they have actually seen not only the sky, but looked down on the noxious clouds below them, just as they view almost everyone else in the hive.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Influence tests.',
      },
      {
        name: 'Death Masks',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'The Death Masks are necro-cultists who worship death in all its many and varied forms. Each ganger crafts and wears a mask made from the skinned face of his first victim, though some replace this with a new mask to mark an especially memorable death. Well-made masks with few marks or stitches needed are signs of high status, especially if the skin’s original owner is recognizable. The rest of a Death Mask’s grotesque clothing consists mostly of thick leather straps studded with bone and metal, as well as loincloths of shaved skin. They wear totems of carved bone, jaws, and appealing titbits such as fingers and ears. Skulls from cherished deaths or beloved relations are worn on belts or chains.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Resolve tests.',
      },
      {
        name: 'Fleshcutters',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'As the name suggests, these gangers love knives and almost exclusively use only bladed weapons; knives, swords, or any other weapon with an edge is worthy. Refraining from guns, they delight in using throwing knives as their main ranged weapon. In combat Fleshcutters are aggressive and fast, their primary weapons agility and speed. They are silent stalkers, preferring to sneak up on or ambush their foes; once battle commences, though, they are loud and wild, screaming with each cut they make. Fleshcutters place great value on personal combat, but prefer inflicting severe wounds to killing, for it ensures their enemies always carry the memory of who bested them in combat. Many of their blades are heavily serrated with thick, triangular points for maximum maiming; some coat their blades with pain-inducing toxins or nerve-acids to ensure the cuts are especially memorable',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Weapon Skill tests.',
      },
      {
        name: 'House Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'In many hives every manufacturing process, industry, service and transaction is the concern of one great house or another. Every house, and groups of related families within each house, have their own territory or concession, often carved out and defended by their own gangs of young house members. In the this way, forests have been replaced by a jungle of metal and concrete, and society is ordered along tribal lines. For many ordinary running with a gang comes as part of the life cycle. Young members of the gang are expected to play their part in defending the gang territory and upholding the honor of their relative house. Youths in their early teens are initiated into the gang by various rites of passage. From then until their mid-twenties they fight for the gang in the same way that young warriors would fight for their tribe in a primitive feral word society. After several years with the gang, a gang member gains the respect and status of his family and other house members and gains the right to found his own family and take part in the house business.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Leadership tests.',
      },
      {
        name: 'Inkers',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Inkers view themselves as artists and skin as their palate. Insanely defensive over their inkwork, they would eagerly call someone out for simply bumping into them as it might damage newly-finished skinart. Many tattoos are done with luminen inks that glow in the dark, or metallic inks that reflect light in glorious patterns, the better for all to admire. For these gangers, tattoos are more than decoration though: they are the history, a way to memorialize important events and personages so they are never forgotten. Inkers use tribal tattoos to mark special occasions, impressive feats and kills, loved ones who have died, and other personal events. Some of the older members literally are a walking history, showing hive-quakes, major fights, and other events the gang will always remember.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Awareness tests.',
      },
      {
        name: 'Narco-Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Of all the gangs to form within the Imperium, the narco-gang is perhaps the most mundane. While its members are often split between two types, those preferring to indulge in excess and stupor or those who are keen on profiting on the addictions of others, these gangs are comparatively tame by Imperial standards. Tame, but also responsible for some of the cruelest, inhumane or notorious crimes the arbites have ever recorded. Whether tortures born from the mind of a spook-addled ganger, the unstoppable rampage of an obscura-dosed addict, or the outright terrifying results of a gang leader making an example and warning to his rivals in grisly displays, the narco-gang maintains one of the most populous',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Cunning tests.',
      },
      {
        name: 'Outlaw Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Even in the under hives there is a code of behavior which most gangers abide by. At least it is true to say that most like to be seen to abide by these local standards. What they do when no-one is watching is another matter entirely. Those who break what is colloquially known as the downhive code can find themselves outlawed by other gangs and powerful under hive powers. When this occurs, outlaws are not welcomed in settlements, traders won’t deal with them openly, and other gangs can claim bounty for hunting them down. Outlaw gangs find it hard to get by because they can no longer enter settlements to trade. With a bounty on their heads they may be hunted down and slain. Their situation can even force them to rob settlers or underhive merchants just to stay alive. Although they may have loyal friends or relatives who continue to support them, it is not an easy or profitable life.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Survival tests.',
      },
      {
        name: 'Tech-Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Entranced with technology, these gangs worship the machine, with many having strong links to agencies of the Cult Mechanicus in the higher hive levels. Most members have poorly-made and poorly-installed bionics and other mechanical augmentations; not waiting for actual injury to require the artificial replacements, they perform surgery once their hive-made devices are deemed fit for implantation. Their bionics are crude but powerful, and to wear tech a ganger has himself constructed is a sign of honor. Those gangs with an exiled Tech-Priest or heretek leading it can feature truly imaginative bionics, items that would shock Mechanicum followers higher in the hive.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Tech tests.',
      },
      {
        name: 'Venator Gang',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'In hive settlements and cross-tunnel gibbets, images of the faces of wanted fighters flutter in the stale breeze of the carbon scrubbers. A group of talented murders can make a healthy living collecting these bounties, and with the promise of shared rewards and extra firepower they sometimes gather together into bands of ruthless professional killers. Drawn from every Clan, House and outland race on a hive world, Venators come in all shapes and sizes - mixing heavily muscled brutes, nimble assassins, alongside disgraced watchmen or embittered cast-out nobles. The most infamous are drawn from the ancient and much-feared Executioner Families, entire bloodlines founded on meting out the justice of the planetary governor. Most are sanctioned by the Imperial houses themselves and carry a hunter\'s oath-token. Many are not however, the merchant guilds often paying for the hunters\' captives and kill all the same. Venator bands are not limited to hivers, and some even come from off world.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Stealth tests.',
      },
      {
        name: 'Watchmen',
        type: 'Hive Gang',
        placeholder: '[Gang]',
        description: 'Justice in the underhive is a rough and ready affair, administered chiefly by merchant guilds under the supervision of each settlement’s most powerful guilder. These rich and influential individuals keep the peace inside the towns and oversee any trading that goes on there.\n' +
          'The guilds hire local fighters called Watchmen to man the gates and walk the streets during lights out. If bigger problems arise, such as outlaw gangs raiding the surrounding holes, the guilders pay local gang leaders to deal with them. This provides a lucrative income for the most successful gangs. Strangers, trouble-makers and quarrelsome citizens are targeted by the diligent Watchmen and dealt with by means of a swift crack on the head or a night in the pit. Belligerent or persistent types are hauled up before the next Guilder Court for trial and sentence.',
        effectLabel: 'Gang Affiliation',
        effect: '+2 bonus dice to Leadership tests.',
      },

      // { placeholder: '<>', name: '', description: '' },
    ];
    return {
      keywordRepository,
      keywordSubwordRepository,
      keywordCombinedRepository: [ ...keywordRepository, ...keywordSubwordRepository],
    };
  },
};
