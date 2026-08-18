import {bracketedKeywordBuilder, keywordBuilder} from "#server/data/keywords/utils.ts";

export const core = [
    // Special Keywords
    keywordBuilder(
        'core',
        375,
        'Psyker',
        'Special',
        'Those who can wield psychic powers, channeling the warp through their mind.'
    ),
    keywordBuilder(
        'core',
        375,
        '[Any]',
        'Special',
        'This keyword represents a free choice by the player at character creation; the GM deter-mines which selections are appropriate for the character.'
    ),
    // Species Keywords
    keywordBuilder(
        'core',
        375,
        'Abhuman',
        'Faction',
        'Some mutated strains of Humanity, such as the muscular, oversized, impeccably loyal Ogryns, are allowed citizenship in parts of the Imperium due to their usefulness. These mutants are known as Abhumans.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTA SORORITAS',
        'Faction',
        'A sect of righteous warriormonks that form the army of the Adeptus Ministorum, waging Wars of Faith to see the God-Emperor’s will done.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTUS ADMINISTRATUM',
        'Faction',
        'The colossal bureaucratic organisation that governs the Imperium. They keep the records, levy the tithes, assemble the munitions, and fulfill a numberless host of other clerical duties.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTUS ASTARTES',
        'Faction',
        'The Space Marines: genetically enhanced transhuman super soldiers who know no fear.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTUS ASTRA TELEPATHICA',
        'Faction',
        'The organisation responsible for recruiting and training Psykers for the Imperium.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTUS MECHANICUS',
        'Faction',
        'Adherents to the Cult Mechanicus, the Mars-based cult of the machine that supply the Imperium with its advanced technology and guard the sacred knowledge of its workings.'
    ),
    keywordBuilder(
        'core',
        375,
        'ADEPTUS MINISTORUM',
        'Faction',
        'The state church of the Imperium that propagates and maintains the worship of the God-Emperor to unite His people.'
    ),
    keywordBuilder(
        'core',
        375,
        'AELDARI',
        'Faction',
        'An ancient xenos Species whose declining empire once spanned the galaxy. They are naturally psychic, long lived, and old enemies of the Imperium.'
    ),
    keywordBuilder(
        'core',
        375,
        'AERONAUTICA IMPERIALIS',
        'Faction',
        'The Aeronautica Imperialis are part of the Navis Imperialis, and are responsible for Imperial in-atmosphere aviation.'
    ),
    keywordBuilder(
        'core',
        375,
        'ANHRATHE',
        'Faction',
        'Anhrathe is the Aeldari name for the Corsairs, the piratical outcasts that form Coteries.'
    ),
    keywordBuilder(
        'core',
        375,
        'ASPECT WARRIOR',
        'Faction',
        'Asuryani that follow the Path of the Warrior devote themselves to a specific aspect of Khaine, the Aeldari God of War. These Asuryani are known as Aspect Warriors.'
    ),
    keywordBuilder(
        'core',
        375,
        'ASTRA CARTOGRAPHICA',
        'Faction',
        'A sub-faction of the Administratum, the Astra Cartographica are tasked with mapping the vast expanse of the galaxy.'
    ),
    keywordBuilder(
        'core',
        375,
        'ASTRA MILITARUM',
        'Faction',
        'The largest military force of the Imperium, numbering billions of mortal Humans.'
    ),
    keywordBuilder(
        'core',
        375,
        'ASURYANI',
        'Faction',
        'The Aeldari name for the citizens that live disciplined lives on Craftworlds.'
    ),
    keywordBuilder(
        'core',
        375,
        'BEAST',
        'Faction',
        'Unintelligent creatures that do not possess the self-awareness and high intelligence of Humans.'
    ),
    keywordBuilder(
        'core',
        375,
        'CHAOS',
        'Faction',
        'The forces and worshippers of the Chaos Gods.'
    ),
    keywordBuilder(
        'core',
        375,
        'DAEMON',
        'Faction',
        'The twisted creatures native to the Immaterium are named daemons and are believed to be made of Warp energy.'
    ),
    keywordBuilder(
        'core',
        375,
        'DARK MECHANICUM',
        'Faction',
        'Traitors and renegades formerly of the Cult Mechanicus, those of the Dark Mechanicum commit the sins of worshipping Chaos, abusing forbidden technologies, and practicing innovation, including the abject horrors of daemon-infused tech.'
    ),
    keywordBuilder(
        'core',
        375,
        'DRUKHARI',
        'Faction',
        'Cruel and depraved, the \'Dark Eldar\' are Aeldari who have succumbed utterly to their Species\' bottomless hedonism. Since the fall of the Aeldari, they have lived in the foul Webway metropolis Commorragh, subsisting their twisted souls on the psychic emanations of the suffering of their many slaves.'
    ),
    keywordBuilder(
        'core',
        375,
        'GENESTEALER CULT',
        'Faction',
        'The Genestealer life cycle infects other creatures, warping their minds and bodies to serve the grotesque Tyranid as it grows in power and plans total insurrection. The brainwashed and hybridised lifeforms that worship the Genestealer Patriarch are known as Genestealer Cultists.'
    ),
    keywordBuilder(
        'core',
        375,
        'HARLEQUIN',
        'Faction',
        'The inscrutable worshipers of the Laughing God Cegorach, the Harlequins are Aeldari that tour the galaxy in troupes, mounting theatrical reenactments of Aedlari history and intervening in combats with deadly efficiency.'
    ),
    keywordBuilder(
        'core',
        375,
        'HERETIC',
        'Faction',
        'Those that have sinned, blasphemed, or turned traitorously from the light of the Emperor are known as heretics.'
    ),
    keywordBuilder(
        'core',
        375,
        'IMPERIUM',
        'Faction',
        'The vast interstellar empire of Humanity that spans over a million worlds, led by the Emperor from Holy Terra.'
    ),
    keywordBuilder(
        'core',
        375,
        'INQUISITION',
        'Faction',
        'A clandestine organisation given absolute power to battle the greatest threats to the Imperium: heresy, xenos, and daemons.'
    ),
    keywordBuilder(
        'core',
        375,
        'JOKAERO',
        'Faction',
        'A simian-like xenos Species with an incredible innate understanding of technology.'
    ),
    keywordBuilder(
        'core',
        375,
        'KHORNE',
        'Faction',
        'One of the Ruinous Powers, the Blood God\'s domains are acts of violence, murder, and brutality.'
    ),
    keywordBuilder(
        'core',
        375,
        'KROOT',
        'Faction',
        'A mercenary xenos Species with the ability to control their evolution through the consumption of other lifeforms.'
    ),
    keywordBuilder(
        'core',
        375,
        'MILITARUM AUXILLA',
        'Faction',
        'A division of the Astra Militarum that consists of Abhumans.'
    ),
    keywordBuilder(
        'core',
        375,
        'MILITARUM TEMPESTUS',
        'Faction',
        'A division of the Astra Militarum that provides elite special operations soldiers.'
    ),
    keywordBuilder(
        'core',
        375,
        'MUTANT',
        'Faction',
        'Humans that have deviated from the pure, Ecclesiarchy-defined form due to the malign influence of the Warp are known as Mutants.'
    ),
    keywordBuilder(
        'core',
        375,
        'NAVIS IMPERIALIS',
        'Faction',
        'The Imperial organisation responsible for the operation and application of voidships. The Navis Imperialis, or Imperial Navy, ferry the Astra Militarum from one of a million battles to another, and engage in void combat with the many spacefaring enemies of the Imperium.'
    ),
    keywordBuilder(
        'core',
        375,
        'NAVIS NOBILITE',
        'Faction',
        'An ancient extended noble family of sanctioned Human mutants, all possessing the hereditary ability to navigate through the shifting tides of the Warp and guide a voidship through the seas of the Empyrean.'
    ),
    keywordBuilder(
        'core',
        375,
        'NECRON',
        'Faction',
        'A prehistoric Species of deathless robotic xenos that are returning to life after a multiple millennia of slumber. The Necrons employ technology beyond any other living Species in their quest to re-conquer the galaxy.'
    ),
    keywordBuilder(
        'core',
        375,
        'NURGLE',
        'Faction',
        'One of the Ruinous Powers, the Plague God\'s domains are disease, decay, and entropy.'
    ),
    keywordBuilder(
        'core',
        375,
        'OFFICIO ASSASSINORUM',
        'Faction',
        'A clandestine Imperial organisation that trains the deadliest assassins available to Humanity.'
    ),
    keywordBuilder(
        'core',
        375,
        'OFFICIO PREFECTUS',
        'Faction',
        'The Imperial organisation that recruits and trains Commissars.'
    ),
    keywordBuilder(
        'core',
        375,
        'ORK',
        'Faction',
        'A brutal xenos Species that crave violence and live only for war.'
    ),
    keywordBuilder(
        'core',
        375,
        'PRIMARIS',
        'Faction',
        'A new breed of transhuman Space Marines, more powerful even that their Adeptus Astartes brethren.'
    ),
    keywordBuilder(
        'core',
        375,
        'QUESTOR MECHANICUS',
        'Faction',
        'The robotic combat walkers known as Imperial Knights are referred to as Questor Mechanicus in High Gothic. Laying ancient claim to the feudal Knight Worlds of the Imperium, a single Knight can turn the tide of a battle using the millennia of combat knowledge passed down through the Throne Mechanicum.'
    ),
    keywordBuilder(
        'core',
        375,
        'ROGUE TRADER',
        'Faction',
        'The Holders of Warrants of Trade, Rogue Traders are empowered to explore, conquer, and trade beyond the borders of the Imperium to expand the Emperor\'s realm.'
    ),
    keywordBuilder(
        'core',
        375,
        'SCHOLASTIA PSYKANA',
        'Faction',
        'A division of the Adeptus Astra Telepathica, the Scholastia Psykana are tasked with examining the Psykers that are brought to Terra by the Black Ships and training them to determine their usefulness to the Imperium.'
    ),
    keywordBuilder(
        'core',
        375,
        'SCUM',
        'Faction',
        'The dregs of Imperial society operating outside of other Factions, and often the law.'
    ),
    keywordBuilder(
        'core',
        375,
        'SERVITOR',
        'Faction',
        'AI, or Abominable Intelligence, is a sin to the Cult Mechanicus. Their many technological servants, known as Servitors, are all constructed around biological brains supplemented with holy mechanisms.'
    ),
    keywordBuilder(
        'core',
        375,
        'SKITARII',
        'Faction',
        'The heavily augmented Humans known as Skitarii are the eternally devoted mechanised armies of the Cult Mechanicus.'
    ),
    keywordBuilder(
        'core',
        375,
        'SLAANESH',
        'Faction',
        'One of the Ruinous Powers, the Lord of Excess — or to the Aeldari, She Who Thirsts — claims domain over decadence, hedonism, and the pursuit of perfection.'
    ),
    keywordBuilder(
        'core',
        375,
        'T\'AU',
        'Faction',
        'A young but technologically advanced xenos Species, the T\'au empire is rapidly spreading on the eastern fringes of the galaxy.'
    ),
    keywordBuilder(
        'core',
        375,
        'TYRANID',
        'Faction',
        'An extra-galactic gestalt Species of grotesque xenos solely intent on devouring all other life. Though they appear as multiple adaptive bioforms (including the dreaded Genestealers) they operate as a Hive Mind, deadly and singular in purpose and fighting with disgusting bio-tech weaponry.'
    ),
    keywordBuilder(
        'core',
        375,
        'TZEENTCH',
        'Faction',
        'One of the Ruinous Powers, the Changer of Ways\' domains are fate, ambition, and sorcery.'
    ),
    keywordBuilder(
        'core',
        375,
        'WRAITH CONSTRUCT',
        'Faction',
        'Every Asuryani carries a Spirit Stone, a device that will capture their soul when they die to protect it from the predations of She Who Thirsts. These Spirit Stones can be attached to wraithbone technology, powering it with the nascent psychic ability of the Aeldari soul. A Wraith Construct is an artificial body that can be powered by a Spirit Stone, allowing a semblance of life beyond death.'
    ),
    keywordBuilder(
        'core',
        375,
        'YNNARI',
        'Faction',
        'A recently emerging religious sub-faction of the Aeldari, the Ynnari seek to unite the Asuryani, Drukhari, Harlequins, and Outcasts. Their ultimate mission is to awaken Ynnead, the Aeldari God of the Dead, so that they may defeat She Who Thirsts and reclaim their position as rulers of the galaxy.'
    ),
    // Bracketed
    bracketedKeywordBuilder(
        'core',
        377,
        '[CHAPTER]',
        'Every Space Marine belongs to a Chapter, an organisation of 1,000 Adeptus Astartes with their own strictures, cultures, traditions, and inherited gene-seed.',
        [],
        73
    ),
    bracketedKeywordBuilder(
        'core',
        377,
        '[CLAN]',
        'An Ork Clan is a cultural mindset or timeless philosophy that unites large gatherings of Orks. Each has their own focus on a specific part of Ork kultur, such as Brutality, Kunnin\', or lootin\'.',
        [],
        82
    ),
    bracketedKeywordBuilder(
        'core',
        377,
        '[COTERIE]',
        'A Coterie is a collective of Aeldari Corsairs, a band of opportunistic space pirates that have each left their former lives to indulge in adventure and hedonistic pursuits. A Coterie is a loose organisation based on camaraderie and shared goals, and may include both Aeldari and Drukhari.',
        ['Greensteel Corsairs', 'Yriel\'s Eldritch Raiders', 'Sunblitz Brotherhood', 'Void Dragons']
    ),
    bracketedKeywordBuilder(
        'core',
        377,
        '[CRAFTWORLD]',
        'A Craftworld is a gargantuan wraithbone voidcraft the size of a small planet housing a huge population of Asuryani Aeldari. Each Craftworld has its own unique culture, and is powered by an Infinity Circuit which houses the spirits of the Craftworld\'s deceased citizens.',
        ['Ul-Khari', 'Alaitoc', 'Biel-Tan', 'Iyanden']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[DYNASTY]',
        'The Warrant of Trade that gives a Rogue Trader their power is often subject to inheritance, with the wealth and influence of a Rogue Trader\'s Dynasty growing through the generations. Each Dynasty may have wildly different inherited resources, or a reputation to uphold.',
        ['Varonius', 'Kahlixian', 'Armengarde']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[FORGE WORLD]',
        'The Cult Mechanicus lay claim to many Imperial planets, coveting their useful mineral resources and converting their entire surface to vast interlinked manufactorums. Each has their own particular culture, methods of worshipping the Omnissiah, and specialised manufacturing patterns.',
        ['Avachrus', 'Mars', 'Ryza', 'Metalica']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[HAEMONCULUS COVEN]',
        'Haemonculi are Drukhari that have mastered the arts of inflicting torturous pain and the reshaping of flesh through biological manipulation. They frequently gather together to pursue their twisted goals as a coven, attended by the grotesque monstrosities they create.',
        ['Prophets of Flesh', 'Dark Creed', 'Coven of Twelve']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[KABAL]',
        'The majority of the Drukhari are part of an immoral Kabal, a scattered army of raiders and slavers that pillage the galaxy through use of the Webway. Each Kabal is led by an Archon with their own twisted goals.',
        ['Black Heart', 'Flayed Skull', 'Poisoned Tongue', 'Obsidian Rose']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[LEGION]',
        'The Traitor Legions of the Chaos Space Marines each worship the Chaos Gods differently, but all are foul renegades. Some are many thousands in strength, others mere warbands united by a common goal, scattered through the galaxy and the nightmare Immaterium.',
        ['Black Legion', 'Death Guard', 'Word Bearers']
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[MARK OF CHAOS]',
        'Those that worship the Ruinous Powers may be gifted with a Mark of Chaos, a foul manifestation of the favor of the Dark Gods that defines a mortal as a servant of Chaos. Most of these traitors are marked with the eight-pointed star of Chaos undivided, but some focus their worship on a single god and in turn receive their specific mark.',
        []
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[ORDER]',
        'The convents of the Adepta Sororitas train righteous servants of the God-Emperor to serve many roles, each known as an Order.',
        [],
        51
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[ORDO]',
        'The Inquisition comprises multiple Holy Ordos, each specialised to clandestinely combat the greatest threats to the Imperium.',
        [],
        64
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[REGIMENT]',
        'Each of the diverse planets of the Imperium owe a tithe of warriors to the Emperor to fight His holy wars. The tremendous variety of planets — from jungle-covered Death Worlds to honourable industrial worlds — mean that every planetary Regiment is vastly different in training, technique, and equipment.',
        [],
        61
    ),
    bracketedKeywordBuilder(
        'core',
        378,
        '[WYCH CULT]',
        'The Drukari of Commorragh flock to the nightly gladiatorial murder-shows of the Wych Cults for sustinence. They relish the displays of violence and pain as literal nourishment for their depraved souls. Each Cult uses different techniques, combat drugs, and weaponry to perform glorious slaughter.',
        ['Cult of Strife', 'Cult of the Cursed Blade', 'Cult of the Red Grief']
    ),
    keywordBuilder(
        'core',
        378,
        '2-HANDED',
        'Wargear',
        'A weapon that requires two hands to wield.'
    ),
    keywordBuilder(
        'core',
        378,
        'ARC',
        'Wargear',
        'Ancient weapons that spew blasts of electricity that tear asunder biological nerves and mechanical systems.'
    ),
    keywordBuilder(
        'core',
        378,
        'BLADE',
        'Wargear',
        'A simple bladed weapon, such as a Sword or Knife.'
    ),
    keywordBuilder(
        'core',
        378,
        'BOLT',
        'Wargear',
        'A firearm that fires the self-propelled, mass-reactive rounds known as Bolts, which explode when they penetrate the enemy.'
    ),
    keywordBuilder(
        'core',
        379,
        'CHAIN',
        'Wargear',
        'A weapon that uses sharp, motorised teeth to inflict maximum damage.'
    ),
    keywordBuilder(
        'core',
        379,
        'EXOTIC',
        'Wargear',
        'A strange or unusual weapon that defies usual categorisation.'
    ),
    keywordBuilder(
        'core',
        379,
        'EXPLOSIVE',
        'Wargear',
        'A weapon that explodes or fires explosives.'
    ),
    keywordBuilder(
        'core',
        379,
        'FIRE',
        'Wargear',
        'A weapon that shoots flames or incorporates fire.'
    ),
    keywordBuilder(
        'core',
        379,
        'FLAK',
        'Wargear',
        'A sturdy, lightweight, mass-produced form of armour.'
    ),
    keywordBuilder(
        'core',
        379,
        'FORCE',
        'Wargear',
        'Psykers can channel Warp energies into a Force weapon, unnaturally amplifying the power of their blows.'
    ),
    keywordBuilder(
        'core',
        379,
        'HEAVY',
        'Wargear',
        'A particularly weighty piece of equipment.'
    ),
    keywordBuilder(
        'core',
        379,
        'LAS',
        'Wargear',
        'Mass-produced, easily maintained, and fueled by rechargeable power cells used to fire lasers, Las weapons are the mainstay weapon of the Imperium.'
    ),
    keywordBuilder(
        'core',
        379,
        'LIGHT',
        'Wargear',
        'A particularly low-weight piece of equipment.'
    ),
    keywordBuilder(
        'core',
        379,
        'MELTA',
        'Wargear',
        'Firing focused beams of extreme heat, these thermal firearms are powered by sub-atomic technology and make excellent anti-armour weapons.'
    ),
    keywordBuilder(
        'core',
        379,
        'NEEDLE',
        'Wargear',
        'These silent weapons have a two-stage firing mechanism: an invisible laser that penetrates the skin, followed by a poisonous crystalised needle of neurotoxin to ruthlessly dispatch foes at a distance.'
    ),
    keywordBuilder(
        'core',
        379,
        'PLASMA',
        'Wargear',
        'Advanced firearms that shoot deadly pulses of superheated matter, these weapons revered for their destructive prowess and feared for their instability.'
    ),
    keywordBuilder(
        'core',
        379,
        'POWER FIELD',
        'Wargear',
        'Melee weapons sheathed in matter-disrupting power fields cut through armour with ease.'
    ),
    keywordBuilder(
        'core',
        379,
        'POWERED',
        'Wargear',
        'Ceramite, adamantium, and plasteel are but a few of the super-heavy materials used to provide Imperial warriors with protection against the myriad threats of the 41st Millennium. This armour would be too heavy to use were it not for the electrically motivated fibre bundles that enhance and replicate the wearer\'s movements, mitigating heavy weight and increasing the strength of the wearer. Armour that can increase its wearer\'s strength in this way is known as Powered Armour, or Power Armour.'
    ),
    keywordBuilder(
        'core',
        379,
        'PRIMITIVE',
        'Wargear',
        'Equipment that uses outdated technology.'
    ),
    keywordBuilder(
        'core',
        379,
        'PROJECTILE',
        'Wargear',
        'A firearm that uses ancient gunpowder technology to launch simple metal slugs at high speeds.'
    ),
    keywordBuilder(
        'core',
        379,
        'SHURIKEN',
        'Wargear',
        'The advanced technology of the Aeldari allows them to construct monomolecular plasti-crystal ammunition that slices through flesh and armour when fired. These weapons usually utilise gravitic pulses to launch Shurikens at speeds so fast they screech through the air.'
    ),
    keywordBuilder(
        'core',
        379,
        'AELDARI',
        'Psychic Power',
        'An advanced psychic power employed only by the Aeldari Species.'
    ),
    keywordBuilder(
        'core',
        379,
        'AUDITORY',
        'Psychic Power',
        'A psychic power that has an audible effect.'
    ),
    keywordBuilder(
        'core',
        379,
        'CHAOS',
        'Psychic Power',
        'A psychic power employed only by the forces of Chaos.'
    ),
    keywordBuilder(
        'core',
        379,
        'FIRE',
        'Psychic Power',
        'A psychic power that manipulates heat or conjures flame.'
    ),
    keywordBuilder(
        'core',
        379,
        'KINETIC',
        'Psychic Power',
        'A psychic power that manifests kinetic force to move something in realspace.'
    ),
    keywordBuilder(
        'core',
        379,
        'LIGHT',
        'Psychic Power',
        'A psychic power that produces light.'
    ),
    keywordBuilder(
        'core',
        379,
        'PSYCHIC',
        'Psychic Power',
        'A Keyword attached to every Psychic Power.'
    ),
    keywordBuilder(
        'core',
        379,
        'TELEPATHY',
        'Psychic Power',
        'A psychic power that allows the Psyker to enter the mind of another individual.'
    ),
    // Sub
    {
        ...keywordBuilder(
            'core',
            74,
            'Blood Angels',
            '[Chapter]',
            'Equal parts nobility and ferocity, the Blood Angels are model saviours of Humanity. Every Blood Angel perpetually mourns the loss of their Primarch Sanguinius at the hands of the Arch-Traitor Horus, their souls marred by his passing. On the field of battle, this grief manifests as a vicious rage and thirst for vengeance, making them devastating melee combatants.',
            '[Chapter]',
        ),
    },
    {
        ...keywordBuilder(
            'core',
            74,
            'Dark Angels',
            '[Chapter]',
            'Stalwart and secretive, the Dark Angels are honour-bound to their clandestine rituals and traditions. Known for stubborn determination in the face of any odds, the Dark Angels have proven themselves righteously steadfast. Despite their reputation, they eschew glory, always turning inward to protect the grim secrets of their past betrayal.',
            '[Chapter]',
        ),
    },
    {
        ...keywordBuilder(
            'core',
            74,
            'Imperial Fists',
            '[Chapter]',
            'Standing as bastions of loyalty, the Imperial Fists are the defensive bulwark of Holy Terra. Able and willing to outlast any foe, the Chapter are proud traditionalists and adherents to the Codex Astartes, with a notable exception; the Imperial Fists are notoriously stubborn, refusing to retreat even in the direst of circumstances.',
            '[Chapter]',
        ),
    },
    {
        ...keywordBuilder(
            'core',
            74,
            'Iron Hands',
            '[Chapter]',
            'Unyielding defenders of the Imperium, the Iron Hands strive with religious fervour to replicate the infallible perfection of the machine. Endeavouring to improve their already genetically enhanced forms, each Iron Hands Astartes embraces multiple augmetics in twin praise of the Emperor and the Omnissiah.',
            '[Chapter]',
        ),
    },
    {
        ...keywordBuilder(
            'core',
            74,
            'Raven Guard',
            '[Chapter]',
            'A covert Chapter of baleful Astartes, the Raven Guard prioritise swift, silent, surprise strikes against the enemy\'s weak points, ravaging them before they can react. Utilising the armour of darkness and clandestine movements, their guerrilla operations are always calculated, never reckless. Honouring their Primarch Corvus Corax, the Raven Guard remain cool headed and continue their morbid traditions.',
            '[Chapter]',
        ),
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Bad Moons',
            '[Clan]',
            'Growing the Teef that are Orkish currency faster than any other Clan, the Bad Moons are the wealthiest, and thus have the best food and flashiest weaponry — traits they are incredibly proud of.',
            '[Clan]',
        ),
        features: {
            key: 'growing-teef',
            name: 'Growing Teef',
            snippet: 'Gain +1 Wealth at the end of every session.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Blood Axes',
            '[Clan]',
            'Considered \'un-Orky\' by other Clans, the Blood Axes use unorthodox \'taktiks\' like planning, strategy, and even trading with the Imperium to get better Wargear.',
            '[Clan]',
        ),
        features: {
            key: 'unorthodox-taktiks',
            name: 'Unorthodox Taktiks',
            snippet: '+Rank bonus dice to Leadership (Wil) and Stealth (A) Tests.',
            modifications: [
                { targetGroup: 'skills', targetValue: 'leadership', modifier: 0, rank: 1 },
                { targetGroup: 'skills', targetValue: 'stealth', modifier: 0, rank: 1 },
            ],
        },
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Deathskulls',
            '[Clan]',
            'Scheming scavengers, the Deathskulls steal, loot, or scrounge whatever they can. Known to hoard, they \'trade\' and customise gear more frequently than other Clans.',
            '[Clan]',
        ),
        features: {
            key: 'scheming-scavengers',
            name: 'Scheming Scavengers',
            snippet: '+Rank bonus dice to Tech (Int) and Influence Tests.',
            modifications: [
                { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1 },
                { targetGroup: 'traits', targetValue: 'influence', modifier: 0, rank: 1 },
            ],
        },
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Evil Sunz',
            '[Clan]',
            'Obsessed with speed, Evil Sunz revel in the roar of engines, the smell of burning promethium, and the feeling of going as fast as possible.',
            '[Clan]',
        ),
        features: {
            key: 'obsessed-with-speed',
            name: 'Obsessed with Speed',
            snippet: 'You gain +1 Speed, and +Rank bonus dice to all Tests whenever you are in a vehicle moving at top speed.',
            modifications: [
                { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
            ],
        },
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Goffs',
            '[Clan]',
            'Massive and multitudinous, Goffs example typical Ork warfare; all tough, large, loutish brutes looking for any excuse to charge headlong into battle in as big a mob as possible.',
            '[Clan]',
        ),
        features: {
            key: 'headlong-charge',
            name: 'Headlong Charge',
            snippet: '+Rank bonus dice to melee attack Tests when you Charge (p.189).',
        },
    },
    {
        ...keywordBuilder(
            'core',
            82,
            'Snakebites',
            '[Clan]',
            'Deliberately primitive, the tribal Snakebites prefer their thick skin to crafted armour, proud of their ability to live off the land.',
            '[Clan]',
        ),
        features: {
            key: 'living-off-the-land',
            name: 'Living off the Land',
            snippet: '+Double Rank bonus dice to Survival (Wil) Tests.',
            modifications: [
                { targetGroup: 'skills', targetValue: 'survival', modifier: 0, rank: 2 },
            ],
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Militant',
            '[Order]',
            'The Sisters of Battle are the army of the Ecclesiarchy, and are split into different Orders each with their own traditions and strategies. The Order of Our Martyred Lady have perfected the application of purifying flame to cleanse and purge their enemies, whilst the Order of the Sanctified Shield of Enoch prefer to counterattack against heretics that crash against their unyielding defensive formations.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Dialogus',
            '[Order]',
            'Linguists and scholars, the Dialogus study and interpret ancient scriptures both holy and blasphemous. Experts in communication, they ensure the prayers and orders of the Sororitas are heard and decode messages in alien languages.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Famulous',
            '[Order]',
            'Facilitating diplomatic alliances between Imperial nobles, the Famulous ensure the wheels of feudal society turn to benefit the Emperor. They act as undercover operatives whilst advising others, unravelling heretical plots in high society.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Hospitaller',
            '[Order]',
            'Providing medical aid to all arms of the military save the Adeptus Astartes, Hospitallers heal the bodies and souls of their allies.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Sabine',
            '[Order]',
            'Collaborating with the Missionarus Galaxia, the Sabine can transform a semi-heretical primitive world into a population that sings the praises of the Emperor. Their prophets permeate societies and privately preach the Emperor\'s holy word, inciting righteous uprisings.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },
    {
        ...keywordBuilder(
            'core',
            52,
            'Orders Pronatus',
            '[Order]',
            'Defenders, rescuers, and preservers of the holiest of Imperial relics, the Pronatus ensure hallowed artefacts do not fall into the foul hands of the enemy. They are known for their determination on crusades to retrieve ancient heirlooms.',
            '[Order]',
        ),
        features: {
            key: 'pious-action',
            name: 'Pious Action',
            snippet: 'When attempting an action associated with your order, the GM may grant you bonus dice.',
        },
    },

]