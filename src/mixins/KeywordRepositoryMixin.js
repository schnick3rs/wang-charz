export default {
  data: function() {
    return {
      keywordRepository: [
        // General Keywords
        { name: 'Psyker',       type: 'General', parentKeyword: undefined,  description: 'Those who can wield psychic powers, channeling the warp through their mind.'},
        { name: '<Any>',        type: 'General', parentKeyword: undefined,  description: 'This keyword represents a free choice by the player at character creation; the GM deter-mines which selections are appropriate for the character.'},

        // Species Keywords
        { name: 'Aeldari',      type: 'Species', parentKeyword: undefined,  description: 'The Eldar race.'},
        { name: 'Anhrathe',     type: 'Species', parentKeyword: undefined,  description: 'Eldar Corsairs, spacefaring pirates and raiders.'},
        { name: '<Coterie>',    type: 'Species', parentKeyword: 'Anhrathe', description: 'A specific Eldar Corsair band (replaces this keyword when chosen).'},
        { name: 'Asuryani',     type: 'Species', parentKeyword: undefined,  description: 'Eldar of the Craftworlds.'},
        { name: '<Craftworld>', type: 'Species', parentKeyword: 'Asuryani', description: 'A specifi c Eldar Craftworld (replaces this keyword when chosen).'},
        { name: 'Ork',          type: 'Species', parentKeyword: undefined,  description: 'The Ork race.'},
        { name: '<Clan>',       type: 'Species', parentKeyword: 'Ork',      description: 'A specifi c Ork clan (replaces this keyword when chosen).'},

        // Imperium Keywords
        { name: 'Adepta Sororitas',   type: 'Imperium', parentKeyword: undefined,             description: 'The Sisters of Battle, warriors of the Ecclesiarchy.'},
        { name: '<Order>',            type: 'Imperium', parentKeyword: 'Adepta Sororitas',    description: 'A specifi c Adepta Sororitas Order (replaces this keyword when chosen).'},
        { name: 'Adeptus Astartes',   type: 'Imperium', parentKeyword: undefined,             description: 'The Space Marines, superhuman elite warriors of the Imperium.'},
        { name: '<Chapter>',          type: 'Imperium', parentKeyword: 'Adeptus Astartes',    description: 'A specifi c Adeptus Astartes Chapter (replaces this keyword when chosen).'},
        { name: 'Adeptus Astra Telepathica',   type: 'Imperium', parentKeyword: undefined,    description: 'They administrate the role of psykers in the Imperium.'},
        { name: 'Adeptus Mechanicus', type: 'Imperium', parentKeyword: undefined,             description: 'The Tech-Priesthood of Mars, they are entrusted with the secrets of tech-nology; allied to the Imperium.'},
        { name: '<Forge World>',      type: 'Imperium', parentKeyword: 'Adeptus Mechanicus',  description: 'A specifi c Adeptus Mechanicus Forge World (replaces this keyword when chosen).'},
        { name: 'Adeptus Ministorum', type: 'Imperium', parentKeyword: undefined,             description: 'Those who preach the Imperial Creed.'},
        { name: 'Astra Militarum',    type: 'Imperium', parentKeyword: undefined,             description: 'The Imperial Guard, soldiers of the Imperium’s main ground forces.'},
        { name: '<Regiment>',         type: 'Imperium', parentKeyword: 'Astra Militarum',     description: 'A specifi c Astra Militarum Regiment (replaces this keyword when chosen).'},
        { name: 'Cult Mechanicus',    type: 'Imperium', parentKeyword: undefined,             description: 'The Priesthood of the Omnissiah, a subset of the Adeptus Mechanicus.'},
        { name: 'Imperium',           type: 'Imperium', parentKeyword: undefined,             description: 'The Imperium of Man, a galaxy-spanning civilisation 10,000 years old.'},
        { name: 'Inquisition',        type: 'Imperium', parentKeyword: undefined,             description: 'Investigators and questioners, they wield great authority to root out threats to the Imperium.'},
        { name: '<Ordo>',             type: 'Imperium', parentKeyword: 'Inquisition',         description: 'A specifi c Ordo of the Inquisition (replaces this keyword when chosen).'},
        { name: 'Militarum Tempestus',type: 'Imperium', parentKeyword: undefined,             description: 'Elite, specially-trained and equipped soldiers of the Astra Militarum.'},
        { name: 'Officio Prefectus',  type: 'Imperium', parentKeyword: undefined,             description: 'Elite leaders and disciplinarians of the Imperium’s military.'},
        { name: 'Primaris',           type: 'Imperium', parentKeyword: undefined,             description: 'A new, improved breed of Space Marine.'},
        { name: 'Rogue Trader',       type: 'Imperium', parentKeyword: undefined,             description: 'Space-faring merchant princes and explorers, granted great authority to expand the Imperium’s borders.'},
        { name: '<Dynasty>',          type: 'Imperium', parentKeyword: 'Rogue Trader',        description: 'A specifi c Rogue Trader Dynasty (replaces this keyword when chosen).'},
        { name: 'Scholastica Psycana',type: 'Imperium', parentKeyword: undefined,             description: 'A subset of the Adeptus Astra Telepathica, they train psykers in the use of their powers.'},
        { name: 'Scum',               type: 'Imperium', parentKeyword: undefined,             description: 'Those who live upon the fringes of Imperial society, often in the underhive or criminal syndicates.'},
        { name: 'Skitarii',           type: 'Imperium', parentKeyword: undefined,             description: 'The warriors of the Omnissiah, devout troops who wield ancient technology.'},

        // Renegade and Heretic Keywords
        { name: 'Chaos',            type: 'Renegade', parentKeyword: undefined, description: 'Those who serve the Dark Gods, knowingly or otherwise.'},
        { name: '<Mark of Chaos>',  type: 'Renegade', parentKeyword: undefined, description: 'A specifi c Chaos God (replaces this keyword when chosen).'},
        { name: 'Dark Mechanicus',  type: 'Renegade', parentKeyword: undefined, description: 'Small groups of Tech-Priests who have rejected the doctrines of Mars and work with the forces of Chaos.'},
        { name: 'Heretic',          type: 'Renegade', parentKeyword: undefined, description: 'Those who have rejected the Imperial Creed.'},
      ],
      keywordSubwordRepository: [

        // Orders of the Adepta Sororitas
        { placeholder: '<Order>', name: 'Order of the Bloody Rose', description: 'Formed from the bodyguards of an Abbess, this order honours the martyrdom of a sister who died in exceptionally bloody battle.' },
        { placeholder: '<Order>', name: 'Order of Our Martyred Lady', description: 'Founded in honour of Saint Katherine, this order wears black as a symbol of the deep mourning for their namesake’s death.' },
        { placeholder: '<Order>', name: 'Order of the Valorous Heart', description: 'A highly penitent order, they seek to atone for their part in the Reign of Blood.' },
        { placeholder: '<Order>', name: 'Order of Sacred Rose', description: 'This order is highly disciplined, embodying the virtues of calm determination in the face of the enemy.' },
        { placeholder: '<Order>', name: 'Order of the Ebon Chalice', description: 'The oldest of the Orders Militant, this one was founded by Saint Alicia Dominica in the 38th Millennium. This order reveres the history and traditions of the Adepta Sororitas.' },
        { placeholder: '<Order>', name: 'Order of the Agent Shroud', description: 'This order is famed for their righteous fury and selfl ess acts of heroism. Their founder seldom spoke, believing that deeds proved more devotion than words.' },

        // Regiments of the Astra Militarum
        { placeholder: '<Regiment>', name: 'Death Korps of Krieg', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Cadian Shock Troopers', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Catachan Jungle Fighters', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Armageddon Steel Legion', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Vostroyan Firstborn', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Valhallan Ice Warriors', description: '', modification: {  } },
        { placeholder: '<Regiment>', name: 'Tallarn Desert Raiders', description: '', modification: {  } },

        // Ordos of the Inquisitor - Characters with the <Ordo> keyword must have the Inquisition keyword as well.
        { placeholder: '<Ordo>', name: 'Ordo Hereticus', description: '', modification: {  } },
        { placeholder: '<Ordo>', name: 'Ordo Xenos', description: '', modification: {  } },
        { placeholder: '<Ordo>', name: 'Ordo Malleus', description: '', modification: {  } },
        { placeholder: '<Ordo>', name: 'Other Ordo', description: '', modification: {  } },
        { placeholder: '<Ordo>', name: 'No Ordo', description: '', modification: {  } },

        // Rogue Trader Dystanies - Characters with the <Dynasty> keyword must have the Rogue Trader keyword as well.
        { placeholder: '<Dystany>', name: 'Your Rogue Trader House', description: '' },

        // Forge Worlds of the Adeptus Mechanicus
        { placeholder: '<Forge World>', name: 'Mars', description: 'The Red Planet: Birthplace of the Cult Mechanicus, considered the holiest of all celestial orbs. Tech-Priests of Mars consider themselves the most blessed of the Cult Mechanicus, and their ability to placate machine spirits is second to none.', },
        { placeholder: '<Forge World>', name: 'Lucius', description: 'The Hollow Forge: A hollow world, Lucius is powered by an artifi cial sun in the planet’s core. This Forge World is known for creating a unique, sought-after alloy known as Luciun.', },
        { placeholder: '<Forge World>', name: 'Agripinaa', description: 'Orb of a Million Scars: This Forge World exists on the threshold of the Eye of Terror. Agripinaa has fought off countless, relentless invasions by the forces of Chaos.', },
        { placeholder: '<Forge World>', name: 'Stygies VIII', description: 'The Ever-Staring Cyclops: Considered untrustworthy by other Forge Worlds, Stygies VIII nearly fell to heresy but was saved by an Aeldari intervention. It is home to a secretive sect dedicated to the study of alien technology known as Xenarites.', },
        { placeholder: '<Forge World>', name: 'Graia', description: 'The Crown of Miracles: Graia’s forges exist as a geometrically-perfect network of space stations known as the Crown. The tenacity of this Forge World is legendary, and they are known for their steadfast pursuit of their goals, no matter the cost.', },
        { placeholder: '<Forge World>', name: 'Metalica', description: 'The Gleaming Giant of Ultima Segmentum: This Forge World is formed nearly entirely from metal, having exterminated all biological life. It is a world of hissing pistons, glowing forges, and strata upon strata of industrial waste. The Tech-Priests of Metalica take pride in the sterile perfection of their lifeless world.', },
        { placeholder: '<Forge World>', name: 'Ryza', description: 'Furnace of Shackled Stars: Famed for producing containment fi elds and plasma weaponry, Ryza is locked in a battle of survival against the invasion of two major Ork Waaagh!s. The residents of this Forge World have a reputation for fi erceness.', },
        { placeholder: '<Forge World>', name: 'Triplex / Phall', description: 'Forge of the Eastern Frontier: Isolated on the Eastern Fringe, this Forge World is considered somewhat insubordinate to Mars. Autonomous and independently-minded, Triplex Phall sends numerous explorator fl eets to discover new worlds and resources.', },
        { placeholder: '<Forge World>', name: 'Daimos', description: 'The Gift of the Sigillite: Relocated from the orbit of Mars to Titan, this heavily-industrialised moon produces highly-specialised wargear for the Grey Knights—a secret Chapter of Space Marines tasked with directly combating the threat of daemons and Chaos.', },
        { placeholder: '<Forge World>', name: 'Voss Prime', description: 'The Right Hand of Mars: Modelled after Mars, Voss Prime is second only to that world in production of armaments for the Imperium. The Forge World’s vaunted capacity has gai-ned them praise for Vosspattern vehicles, but they have struggled to master replicating plasma technology.', },
        { placeholder: '<Forge World>', name: 'Gryphonne IV', description: 'The Lost Forge: The formidable defences of this Forge World were overrun by the assault of Hive Fleet Leviathan. Certain that their fortifi cations would ensure victory, the defenders fought with valour and skill. However, the Tyranids shattered Gryphonne IV’s armies and laid waste to the world. Only a relative handful of survivors escaped.', },

        // Marks of the Chaos Goods
        { placeholder: '<Mark of Chaos>', name: 'Mark of Khorne', description: '', },
        { placeholder: '<Mark of Chaos>', name: 'Mark of Tzzeench', description: '', },
        { placeholder: '<Mark of Chaos>', name: 'Mark of Nurgle', description: '', },
        { placeholder: '<Mark of Chaos>', name: 'Mark of Slaneesh', description: '', },
        { placeholder: '<Mark of Chaos>', name: 'Chaos Undivided', description: '', },

        // Eldar Craftworlds
        { placeholder: '<Craftworld>', name: 'Alaitoc', description: 'The Starstriders: The Eldar of Alaitoc have spread further afi eld than other Craftworlds, acting as their people’s eyes and ears as they wander the galaxy. The warriors of Alaitoc favour stealth and misdirection over brute force.', },
        { placeholder: '<Craftworld>', name: 'Biel-Tan', description: 'The Swordwind: This is the most militant of all Craftworlds. Those who strive hardest to return to the glory of their people before the Fall, the Eldar of Biel-Tan mourn the shattering of their Craftworld during an invasion by the forces of Slaanesh.', },
        { placeholder: '<Craftworld>', name: 'Iyanden', description: 'The Ghost Warriors: Once a thriving Craftworld, Iyanden was invaded by Tyranids of Hive Fleet Kraken. The Eldar fought off this brutal assault at great cost. Now, most of the Craftworld is empty, forcing the Iyanden Farseers to call upon their fallen to fi ght for survival.', },
        { placeholder: '<Craftworld>', name: 'Saim-Hann', description: 'The Wild Host: The Eldar of Saim-Hann are renowned for their fast, mobile warfare. They are a Craftworld of ancient tradition and a proud warrior culture. They observe many rituals that are unique to their Craftworld, including special races and duels.', },
        { placeholder: '<Craftworld>', name: 'Ulthwé', description: 'The Damned: This Craftworld has fought an unending war around the Eye of Terror. Ulthwé tends to involve itself in the events of the galaxy far more than other Craftworlds. It is also home to many of the most powerful psykers in the galaxy. Some Eldar believe this Craftworld is cursed due to its proximity to the Eye of Terror.', },

        // Ork Clans
        { placeholder: '<Clan>', name: 'Goffs', description: 'Goffs have a prominent place in the battle line and can usually be found where the fi ghting is thickest. Goffs consider massed infantry charges the only true way for Orks to fi ght, declaring anything else to be “muckin’ about.”', modification: {}, },
        { placeholder: '<Clan>', name: 'Evil Sunz', description: 'The Evil Sunz Clan embodies the Orks’ obsessive love for speed. Evil Sunz typically pile aboard the fastest vehicles they can fi nd to hurtle into battle at the vanguard of the Waaagh!', modification: {}, },
        { placeholder: '<Clan>', name: 'Bad Moons', description: 'The Bad Moons Clan is the richest of their kind, for their teeth—the basis of Ork economy—grow at twice the normal rate. Because of their wealth, Bad Moons possess the best and shiniest gear, and are not shy about bragging about it.', modification: {}, },
        { placeholder: '<Clan>', name: 'Deathskulls', description: 'Deathskulls are light-fi ngered thieves who share an almost Mekboylike knack for tinkering with Ork technology. Though Deathskulls enjoy a good fi ght as much as the next Ork, their innate kleptomania makes them see every battle as an excuse to scavenge or loot anything they can get their hands on.', modification: {}, },
        { placeholder: '<Clan>', name: 'Blood Axe', description: 'The Blood Axe Clan is unique amongst orks for their belief that battles should be fought according to an actual plan. Blood Axes are not less courageous or violent, they simply possess a rudimentary comprehension of strategy, tactics, and stealth.', modification: {}, },
        { placeholder: '<Clan>', name: 'Snakebites', description: 'Snakebites see themselves as staunch traditionalists, caring little that the other clans mock them for their backward ways. Snakebites specialise in the breeding of squigs (or squiggly beasts), the strange fungoid monsters that make up much of the Orks’ bizarre ecosystem.', modification: {}, },

        { placeholder: '<>', name: '', description: '', },
      ],
    }
  },
}