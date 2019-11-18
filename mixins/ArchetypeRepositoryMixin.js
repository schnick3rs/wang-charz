export default {
  data() {
    // https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994
    const core = [
      // Adeptus Ministorum
      {
        name: "Ministorum Priest",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Imperium,Adeptus Ministorum",
        abilities: [
          { name: 'Fiery Invective', effect: 'Once per combat, the Ministorum priest may take ' +
              'a free action to preach the Imperial Creed. The character and all his allies ' +
              'with the Imperium Keyword within hearing range heal 1d3 + Rank Shock.' },
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'willpower', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 1, },
        ],
        group: "Adeptus Ministorum",
        key: 'ministorumPriest',
        description: null,
        hint: "A zealous preacher of the Imperial Creed."
      },
      {
        name: "Death Cult Assassin",
        cost: 20,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Adeptus Ministorum",
        abilities: [
          { name: 'Glancing Blow', effect: 'Death Cult Assassins depend upon their movement to ' +
              'avoid harm. Unless they are immobilised or restrained, they may attempt to soak ' +
              'Mortal Wounds, and may substitute their Agility for their Soak when doing so.' },
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'agility', threshold: 4, },
          { group: 'skills', value: 'weaponSkill', threshold: 2, },
        ],
        group: "Adeptus Ministorum",
        key: "deathCultAssassin",
        description: null,
        hint: "An agile killer, expressing worship through the art of death."
      },
      {
        name: "Crusader",
        cost: 40,
        tier: 3,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Imperium,Adeptus Ministorum",
        abilities: [
          { name: 'Armour of Faith', effect: 'Crusaders rely upon their faith to carry them ' +
              'through; they increase their Resolve by ½ Rank. Crusaders gain +Rank bonus ' +
              'dice to melee attacks against any opponent with the Heretic or Chaos keywords.'},
        ],
        prerequisites: [
          { group: 'attributes', value: 'initiative', threshold: 3, },
          { group: 'attributes', value: 'willpower', threshold: 3, },
          { group: 'skills', value: 'weaponSkill', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 1, },
        ],
        group: "Adeptus Ministorum",
        key: null,
        description: null,
        hint: "A holy warrior with unfl agging devotion to the God-Emperor."
      },
      // Adepta Sororitas
      {
        key: "sisterHospitaller",
        name: "Sister Hospitaller",
        hint: "A pious healer dedicated to care of both body and soul.",
        group: "Adepta Sororitas",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Adeptus Ministorum,Adeptus Sororitas,<Order>",
        keywordOption: "<Order>",
        abilities: [
          {
            name: 'Loyal Compassion',
            effect: 'A Sister Hospitaller adds +Rank on Medicae tests when treating characters ' +
              'with the Imperium Keyword',
          },
        ],
        prerequisites: [
          { group: 'attributes', value: 'intellect', threshold: 3, },
          { group: 'attributes', value: 'willpower', threshold: 3, },
          { group: 'skills', value: 'medicae', threshold: 1, },
          { group: 'skills', value: 'scholar', threshold: 1, },
        ],
        description: null
      },
      {
        name: "Sister of Battle",
        species: ["Human","Ogryn","Ratling"],
        cost: 40,
        tier: 2,
        influence: 1,
        keywords: "Imperium,Adeptus Ministorum,Adeptus Sororitas,<Order>",
        abilities: [
          { name: 'Purity of Faith', effect: 'Sisters of Battle and any allies within 15 ' +
              'meters and line of sight add +Rank to Corruption Tests. Sisters of Battle gain ' +
              '+Rank to any dice pool to resist psychic powers and effects.' },
        ],
        keywordOption: "<Order>",
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 3, },
          { group: 'attributes', value: 'agility', threshold: 3, },
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'attributes', value: 'willpower', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 1, },
          { group: 'skills', value: 'ballisticSkill', threshold: 2, },
          { group: 'skills', value: 'weaponSkill', threshold: 2, },
        ],
        group: "Adepta Sororitas",
        key: "sisterOfBattle",
        description: "As the militant arm of the of the Adeptus Ministorum, the Sisters of Battle are equipped to engage any who would dare to oppose the Imperial Creed. It is their sacred duty to cleanse the galaxy of heresy and corruption, wherever they should fi nd it, including within the various organisations of the Imperium of Man. Due to their shared goals, the Orders Militant often work in conjunction with the Imperial Inquisition, though they remain distinct organisations. Many of the orders maintain convents on Shrine Worlds, so that they can more easily defend those places most blessed to the Imperial Creed.",
        hint: "A determined warrior, filled with purity and faith."
      },
      // Adeptus Militarum
      {
        name: "Imperial Guardsman",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Astra Militarum,<Regiment>",
        abilities: [
          { name: 'Look Out Sir', effect: 'Once per battle, an Imperial Guardsman may suffer ' +
              'the effects of an attack that hits an ally instead of the allied character. ' +
              'When doing so, increase the Guardsman’s resilience by +Rank for determining the ' +
              'damage of the attack.' },
          { name: 'Regimental Affiliation', effect: 'Select a regiment to which the character ' +
              'belongs (see Regiments on page 114). The soldier gains + ½ Rank bonus dice ' +
              'with that regiment’s bonus (either a Skill or Resolve test).' },
        ],
        keywordOption: "<Regiment>",
        prerequisites: [
          { group: 'skills', value: 'ballisticSkill', threshold: 2, },
        ],
        group: "Astra Militarum",
        key: "imperialGuardsman",
        description: null,
        hint: "A disciplined soldier, used to fi ghting amid multitudes"
      },
      {
        name: "Tempestus Scion",
        cost: 30,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Imperium,Astra Militarum,Militarum Tempest",
        abilities: [
          { name: 'Elite Soldier', effect: 'After spending one or more Glory to increase ' +
              'damage from a successful attack using a weapon with the Imperium and Astra ' +
              'Militarum keywords, a Tempestus Scion may add +Rank to the fi nal damage value.' },
        ],
        prerequisites: [
          { group: 'attributes', value: 'initiative', threshold: 3, },
          { group: 'attributes', value: 'strength', threshold: 3, },
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'skills', value: 'ballisticSkill', threshold: 2, },
          { group: 'skills', value: 'weaponSkill', threshold: 2, },
          { group: 'skills', value: 'stealth', threshold: 2, },
        ],
        group: "Astra Militarum",
        key: "tempestusScion",
        description: null,
        hint: "An elite, highly-trained soldier, used to undertaking special missions."
      },
      {
        name: "Commissar",
        cost: 50,
        tier: 3,
        species: ["Human","Ogryn","Ratling"],
        influence: 3,
        keywords: "Imperium,Astra Militarum,Officio Prefectus",
        abilities: [
          { name: 'Fearsome Respect', effect: 'Commissars and any allies within 15 metres and ' +
              'line of sight add +Rank to Resolve tests. A commissar adds +Rank to ' +
              'Intimidation tests, including Interaction attacks.' },
        ],
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 3, },
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'intimidation', threshold: 2, },
        ],
        group: "Astra Militarum",
        key: "commissar",
        description: null,
        hint: "A fearsome leader, inspiring both dread and respect in great measure."
      },
      // Agents of the Imperium
      {
        name: "Inquisitorial Acolyte",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 2,
        keywords: "Imperium,Inquisition,<ANY>,<Ordo>",
        abilities: [
          { name: 'Inquisitorial Decree', effect: 'Once per scene, an Inquisitorial Acolyte ' +
              'may invoke the name of their Inquisitor to gain +Rank to an Influence or ' +
              'Interaction Skill test involving a being with the Imperium keyword.' },
        ],
        keywordOption: "<Ordo>",
        skills: 'Any (2)',
        /*prerequisites: [
          { group: 'skills', value: '<Any>', threshold: 2, },
        ],*/
        group: "Agents of the Imperium",
        key: "inquisitorialAcolyte",
        description: null,
        hint: "A representative of the Inquisition, adaptable and possessing great potential."
      },
      {
        name: "Inquisitorial Adept",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Imperium,Inquisition,<Ordo>",
        abilities: [
          { name: 'Administratum Records', effect: 'he character is particularly adept at ' +
              'navigating Imperial Bureaucracy. Add +Rank to Influence and Investigation tests ' +
              'to acquire information.' }
        ],
        keywordOption: "<Ordo>",
        prerequisites: [
          { group: 'attributes', value: 'intellect', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 2, },
        ],
        group: "Agents of the Imperium",
        key: "inquisitorialAdept",
        description: null,
        hint: "A learned scholar and scribe, adept at navigating bureaucratic obstacles."
      },
      {
        name: "Rogue Trader",
        cost: 40,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 2,
        keywords: "Imperium,Rogue Trader,<Dynasty>",
        keywordOption: "<Dynasty>",
        abilities: [
          { name: 'Warrant of Trade', effect: 'Rogue Traders are masters at manipulating ' +
              'situations to their advantage. They receive +Rank to all Persuasion tests and ' +
              'Influence tests to acquire goods or services.' },
        ],
        prerequisites: [
          { group: 'attributes', value: 'fellowship', threshold: 3, },
          { group: 'skills', value: 'cunning', threshold: 1, },
          { group: 'skills', value: 'insight', threshold: 2, },
          { group: 'skills', value: 'persuasion', threshold: 2, },
          { group: 'skills', value: 'awareness', threshold: 1, },
        ],
        group: "Agents of the Imperium",
        key: "rogueTrader",
        description: null,
        hint: "An adventuresome and infl uential explorer with their own space vessel."
      },
      {
        name: "Sanctioned Psyker",
        cost: 50,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Adptus Astartes Telepathica,Psyker,Scholastica Psykana",
        abilities: [
          { name: 'Psyker', effect: 'A Sanctioned Psyker begins play with one minor psychic ' +
              'power and the smite psychic power. They may purchase additional Minor Psychic ' +
              'Powers and Universal Psychic powers, subject to Tier restrictions.' }
        ],
        psychicPowers: {
          discount: [
            { name: 'smite', selected: 'Smite', filter: power => ( power.name === 'Smite' ) },
            { name: 'minor', selected: undefined, filter: power => ( ['Minor'].includes(power.discipline) ) },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Universal',
          ],
        },
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'psychicMastery', threshold: 1, },
        ],
        group: "Agents of the Imperium",
        key: "sanctionedPsyker",
        description: null,
        hint: "Able to focus the warp through their mind, they are blessed or cursed with psychic powers."
      },
      {
        name: "Inquisitor",
        cost: 70,
        tier: 4,
        species: ["Human","Ogryn","Ratling"],
        influence: 4,
        keywords: "Imperium,Inquisition,<Any>,<Ordo>",
        abilities: [
          { name: 'Unchecked Authority', effect: 'Inquisitors have supreme authority for ' +
              'maintaining the security of the Imperium. They gain +Rank to all Influence and ' +
              'Interaction skill tests involving characters with the Imperium Keyword.' },
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'intellect', threshold: 4, },
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'cunning', threshold: 2, },
          { group: 'skills', value: 'insight', threshold: 2, },
          { group: 'skills', value: 'intimidation', threshold: 2, },
          { group: 'skills', value: 'awareness', threshold: 2, },
        ],
        group: "Agents of the Imperium",
        key: 'inquisitor',
        description: null,
        hint: "A bearer of profound Imperial authority, adept at discovering the truth in the shadows."
      },
      // Adeptus Astartes
      {
        key: "spaceMarineScout",
        name: "Space Marine Scout",
        hint: "A stealthy warrior adept at reconnaissance.",
        group: "Adeptus Astartes",
        species: ["Adeptus Astartes"],
        cost: 20,
        tier: 2,
        influence: 1,
        keywords: "Imperium,Adeptus Astartes,<Chapter>",
        keywordOption: "<Chapter>",
        abilities: [
          { name: 'Use the Terrain', effect: 'Space Marine Scouts receive +Rank to all Stealth ' +
              'tests if they are in cover.' }
        ],
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 3, },
          { group: 'attributes', value: 'agility', threshold: 3, },
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'skills', value: 'ballisticSkill', threshold: 2, },
          { group: 'skills', value: 'weaponSkill', threshold: 2, },
        ],
        description: null
      },
      {
        name: "Tactical Space Marine",
        species: ["Adeptus Astartes"],
        cost: 50,
        tier: 3,
        influence: 2,
        keywords: "Imperium,Adeptus Astartes,<Chapter>",
        keywordOption: "<Chapter>",
        abilities: [
          { name: 'Tactical Versatility', effect: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).', },
        ],
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 4, },
          { group: 'attributes', value: 'agility', threshold: 4, },
          { group: 'attributes', value: 'toughness', threshold: 4, },
          { group: 'skills', value: 'ballisticSkill', threshold: 3, },
          { group: 'skills', value: 'weaponSkill', threshold: 3, },
        ],
        group: "Adeptus Astartes",
        key: "tacticalSpaceMarine",
        description: null,
        hint: "A versatile warrior, veteran of a hundred battles."
      },
      {
        key: "primarisIntercessor",
        name: "Primaris Intercessor",
        hint: "A skilled and focused warrior, adept at bringing death at range.",
        group: "Adeptus Astartes",
        cost: 60,
        tier: 4,
        species: ["Primaris Astartes"],
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 4, },
          { group: 'attributes', value: 'agility', threshold: 4, },
          { group: 'attributes', value: 'toughness', threshold: 4, },
          { group: 'skills', value: 'ballisticSkill', threshold: 4, },
          { group: 'skills', value: 'weaponSkill', threshold: 4, },
        ],
        influence: 1,
        keywords: "Imperium, Adeptus Astartes, Primaris, <Chapter>",
        keywordOption: "<Chapter>",
        abilities: [
          { name: 'Intercessor Focus', effect: 'When firing a bolt rifle or heavy bolt pistol they gain +Rank bonus to attack rolls.' },
        ],
        description: ""
      },
      // Adeptus Mechanicus
      {
        name: "Skitarius",
        cost: 40,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Adeptus Mechanicus,Skitarii,<Forge World>",
        abilities: [
          { name: 'Heavily Augmented', effect: 'The Skitarius’ body is designed to withstand ' +
              'the rigours of war. Skitarii do not bleed and gain +½ Rank to Soak tests.' },
        ],
        keywordOption: "<Forge World>",
        prerequisites: [
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'skills', value: 'ballisticSkill', threshold: 2, },
          { group: 'skills', value: 'tech', threshold: 1, },
        ],
        group: "Adeptus Mechanicus",
        key: null,
        description: null,
        hint: "A warrior of the Machine Cult, sturdy and reliable."
      },
      {
        name: "Tech-Priest",
        cost: 60,
        tier: 3,
        species: ["Human","Ogryn","Ratling"],
        influence: 2,
        keywords: "Imperium,Adeptus Mechanicus,Cult Mechanicus,<Forge World>",
        keywordOption: "<Forge World>",
        abilities: [
          { name: 'Rite of Repair', effect: 'Tech-Priests automatically reduce the time by ' +
              'half for any Tech test. They receive +Rank on Tech tests to fix or repair a ' +
              'damaged machine.' },
        ],
        prerequisites: [
          { group: 'attributes', value: 'intellect', threshold: 3, },
          { group: 'skills', value: 'tech', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 1, },
        ],
        group: "Adeptus Mechanicus",
        key: "techPriest",
        description: null,
        hint: "A priest of the Omnissiah, able to commune with the machine-spirits."
      },
      // Scum
      {
        name: "Ganger",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Scum,<ANY>",
        keywordOption: "<Any>",
        abilities: [
          { name: 'Scrounger', effect: 'Gangers make use of every available resource, and ' +
              'have a knack for „fi nding“ spares. They receive +Rank to Cunning tests, and ' +
              'may make a single retroactive Infl uence test with a bonus of +Rank once per ' +
              'session, representing an item that they had prepared in advance.' }
        ],
        prerequisites: [
          { group: 'skills', value: 'cunning', threshold: 1, },
        ],
        group: "Scum",
        key: "ganger",
        description: null,
        hint: "A resourceful and tenacious survivor from the depths of enormous industrial cities."
      },
      {
        name: "Scavvy",
        cost: 10,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: -1,
        abilities: [
          { name: 'Mutant', effect: 'The Scavvy may select one mutation (see Scavvy Mutations, ' +
              'page 368). Every time the Scavvy gains a Rank, they may select an additional ' +
              'mutation from that list.' }
        ],
        keywords: 'Scum,<Any>',
        keywordOption: "<Any>",
        prerequisites: [
          { group: 'attributes', value: 'toughness', threshold: 2, },
          { group: 'skills', value: 'survival', threshold: 1, },
        ],
        group: "Scum",
        key: null,
        description: null,
        hint: "A mutant—cast out and reviled—yet their mutations give them power."
      },
      {
        name: "Desperado",
        cost: 40,
        tier: 3,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        abilities: [
          { name: 'Valuable Prey', effect: 'Desperados receive +Rank for Cunning tests. They ' +
              'also receive +Rank to Awareness tests when tracking a target.' }
        ],
        keywords: 'Scum,<Any>',
        keywordOptions: '<Any>',
        prerequisites: [
          { group: 'attributes', value: 'agility', threshold: 3, },
          { group: 'attributes', value: 'intellect', threshold: 2, },
          { group: 'skills', value: 'awareness', threshold: 2, },
          { group: 'skills', value: 'cunning', threshold: 2, },
          { group: 'skills', value: 'investigation', threshold: 2, },
        ],
        group: "Scum",
        key: null,
        description: null,
        hint: "A savvy and dangerous bounty hunter, mercenary, and gun for hire."
      },
      // Renegades
      {
        name: "Cultist",
        cost: 0,
        tier: 1,
        species: ["Human","Ogryn","Ratling"],
        influence: 2,
        keywords: "Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Any>",
        abilities: [
          { name: 'From Within', effect: 'Cultists gain +Rank to Deception tests, including ' +
              'Interaction attacks, against targets with the Imperium keyword.' }
        ],
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modification: 1 },
        ],
        prerequisites: [
          { group: 'skills', value: 'deception', threshold: 1, },
        ],
        group: "Renegades",
        key: "cultist",
        description: null,
        hint: "A disciple of the Ruinous Powers, eager to gain their capricious favour."
      },
      {
        name: "Chaos Space Marine",
        cost: 50,
        tier: 3,
        species: ["Adeptus Astartes"],
        influence: 2,
        keywords: "Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Legion>",
        abilities: [
          { name: 'Tactical Versatility', effect: 'Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).', },
        ],
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
        ],
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 4, },
          { group: 'attributes', value: 'agility', threshold: 4, },
          { group: 'attributes', value: 'toughness', threshold: 4, },
          { group: 'skills', value: 'ballisticSkill', threshold: 3, },
          { group: 'skills', value: 'weaponSkill', threshold: 3, },
        ],
        group: "Renegades",
        key: "chaosSpaceMarine",
        description: null,
        hint: "A renegade warrior and death-dealer, a dark refl ection of their noble brethren."
      },
      {
        name: "Heretek",
        cost: 60,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 1,
        keywords: "Chaos,Heretic,Adeptus Mechanicus,Dark Mechanicus",
        abilities: [
          { name: 'Transformative Technology', effect: 'Hereteks automatically reduce the time ' +
              'by half for any Tech test. They also gain +Rank for Tech interaction attacks.' }
        ],
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
        ],
        prerequisites: [
          { group: 'attributes', value: 'intellect', threshold: 3, },
          { group: 'skills', value: 'tech', threshold: 3, },
          { group: 'skills', value: 'scholar', threshold: 1, },
        ],
        group: "Renegades",
        key: "heretek",
        description: null,
        hint: "A tinkerer, corruptor of machine-spirits, a bearer of the sin of innovation."
      },
      {
        key: "roguePsyker",
        name: "Rogue Psyker",
        group: "Renegades",
        species: ["Human","Ogryn","Ratling"],
        cost: 50,
        tier: 2,
        abilities: [
          { name: 'Psyker', effect: 'A rogue psyker begins play with one Minor Psychic Power, the ' +
              'Smite Power and may purchase additional Minor Psychic Powers, Universal Psychic ' +
              'Powers and Maleficarum Psychic Powers subject to Tier restrictions.' }
        ],
        psychicPowers: {
          discount: [
            { name: 'smite', selected: 'Smite', filter: power => ( power.name === 'Smite' ) },
            { name: 'minor', selected: undefined, filter: power => ( ['Minor'].includes(power.discipline) ) },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Maleficarum',
            'Universal',
          ],
        },
        prerequisites: [
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'psychicMastery', threshold: 1, },
        ],
        influence: 0,
        keywords: "Chaos,Heretic,Psyker",
        modifications: [
          { targetGroup: 'traits', targetValue: 'corruption', modification: 3 },
        ],
        description: null,
        hint: "An unsanctioned bearer of psychic powers, wielding the warp’s power without discipline."
      },
      // Aeldari
      {
        name: "Corsair",
        cost: 0,
        tier: 1,
        species: ["Eldar"],
        influence: 0,
        keywords: "Aeldari,Anhrathe,<Coterie>",
        abilities: [
          { name: 'Dancing the Blade\'s Edge', effect: 'Choose one of the following Interaction ' +
              'Attacks: Athletics or Persuasion. Corsairs get +Rank to the chosen Interaction ' +
              'Attack and get the same bonus for resisting those same attacks. Corsairs suffer ' +
              'a +1DN penalty to any Fear test.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'agility', threshold: 3, },
          { group: 'skills', value: 'athletics', threshold: 2, },
        ],
        group: "Aeldari",
        key: 'corsair',
        description: null,
        hint: "A space-faring pirate of an ancient race."
      },
      {
        name: "Ranger",
        cost: 30,
        tier: 2,
        species: ["Eldar"],
        influence: 0,
        keywords: "Aeldari,Asuryani,<Craftworld>",
        abilities: [
          { name: 'From the Shadows', effect: 'Rangers are adept at exploiting any concealment. ' +
              'Any penalties to detect (using Awareness) or attack a ranger due to lighting or ' +
              'cover are increased by +½ Rank.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'agility', threshold: 3, },
          { group: 'skills', value: 'stealth', threshold: 1, },
          { group: 'skills', value: 'survival', threshold: 2, },
        ],
        group: "Aeldari",
        key: null,
        description: null,
        hint: "A wanderer, a scout, and tracker for the good of their people."
      },
      {
        name: "Warlock",
        cost: 80,
        tier: 3,
        species: ["Eldar"],
        influence: 2,
        keywords: "Aeldari,Asuryani,Psyker,<Craftworld>",
        abilities: [
          { name: 'Runes of Battle', effect: 'A Warlock begins play with the Psyniscience and ' +
              'smite psychic powers (these do not count towards the maximum), and may purchase ' +
              'additional Minor Psychic Powers, Universal Psychic Powers, and Runes of Battle ' +
              'Psychic Powers, subject to Tier restrictions.' }
        ],
        psychicPowers: {
          discount: [
            { name: 'psyniscience', selected: 'Psyniscience', filter: power => ( power.name === 'Psyniscience' ) },
            { name: 'smite', selected: 'Smite', filter: power => ( power.name === 'Smite' ) },
          ],
          access: [
            'Minor',
            'Biomancy',
            'Divination',
            'Pyromancy',
            'Telekinesis',
            'Telepathy',
            'Universal',
            'Runes of Battle',
          ],
        },
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'psychicMastery', threshold: 2, },
        ],
        group: "Aeldari",
        key: null,
        description: null,
        hint: "A powerful psyker, wielding strictly-guided powers for the Aeldari cause."
      },
      // Orks
      {
        name: "Boy",
        cost: 0,
        tier: 1,
        species: ["Ork"],
        influence: 0,
        keywords: "Ork,<Clan>",
        abilities: [
          { name: 'Get Stuck In', effect: 'A Boy gains +Rank to melee attacks for every ally ' +
              'engaged in melee combat with the same target.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'skills', value: 'weaponSkill', threshold: 2, },
        ],
        group: "Orks",
        key: null,
        description: null,
        hint: "A brutish warrior and thug who believes that might makes right."
      },
      {
        name: "Kommando",
        cost: 30,
        tier: 2,
        species: ["Ork"],
        influence: 0,
        keywords: "Ork,<Clan>",
        abilities: [
          { name: 'Kunnin\' Plan', effect: 'A Kommando and any allies with the Ork Keyword ' +
              'within 15 metres gain +½ Rank to Stealth tests.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'agility', threshold: 2, },
          { group: 'attributes', value: 'toughness', threshold: 2, },
          { group: 'skills', value: 'stealth', threshold: 2, },
          { group: 'skills', value: 'survival', threshold: 1, },
        ],
        group: "Orks",
        key: null,
        description: null,
        hint: "A stealthy and cunning warrior who knows how to turn almost any battle to his advantage."
      },
      {
        name: "Nob",
        cost: 60,
        tier: 3,
        species: ["Ork"],
        influence: 2,
        keywords: "Ork,<Clan>",
        abilities: [
          { name: 'Boys', effect: 'A Nob commands a mob of Troops numbering up to Rank x 3 Boyz ' +
              'who loyally follow his direction. These Ork Boyz use the profi le found on page ' +
              '150.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'strength', threshold: 4, },
          { group: 'attributes', value: 'toughness', threshold: 3, },
          { group: 'skills', value: 'intimidation', threshold: 2, },
        ],
        group: "Orks",
        key: null,
        description: null,
        hint: "A savage warrior and capable leader, using brute force to succeed where others fail."
      },
    ];
    const dodScumPsyker = [
      {
        name: "Scum Psyker",
        cost: 50,
        tier: 2,
        species: ["Human","Ogryn","Ratling"],
        influence: 0,
        keywords: "Imperium,Scum,Psyker",
        abilities: [
          { name: 'Psyker', effect: 'A Scum Psyker begins play with one minor psychic ' +
              'power and the smite psychic power. They may purchase additional Minor Psychic ' +
              'Powers and Universal Psychic powers, subject to Tier restrictions.' }
        ],
        keywordOption: null,
        prerequisites: [
          { group: 'attributes', value: 'willpower', threshold: 4, },
          { group: 'skills', value: 'psychicMastery', threshold: 1, },
          { group: 'skills', value: 'cunning', threshold: 1, },
        ],
        group: "Scum",
        key: "dodScumPsyker",
        description: null,
        hint: "Able to focus the warp through their mind, they are blessed or cursed with psychic powers."
      },
    ];

    const objectives = [
      {
        group: 'Adeptus Ministorum',
        objectives: [
          'Extoll the virtues of worshipping the God-Emperor to an unbeliever.',
          'Proclaim your enemy to be a heretic and unworthy of the Emperor’s light.',
          'Bear witness to an act that you consider a miracle of the divine Emperor',
        ],
      },
      {
        group: 'Adepta Sororitas',
        objectives: [
          'Describe how faith and/or sacrifice in the Emperor’s name brings success.',
          'Invoke an Imperial Saint (Saint Alicia Dominica and Saint Celestine are two examples) to bless your achievements',
          'Bear witness to an act that you consider a miracle of the divine Emperor.',
        ],
      },
      {
        group: 'Astra Militarum',
        objectives: [
          'Express confidence (or the opposite!) in the virtue of overwhelming numbers and fi repower',
          'Explain how the Imperial Infantryman’s Uplifting Primer has a lesson appropriate to the current situation.',
          'Reminisce about your far-fl ung home world and compare it to the current situation.',
        ],
      },
      {
        group: 'Agents of the Imperium',
        objectives: [
          'Solve a problem using wealth, influence, psychic abilities, or guile instead of threats or force.',
          'Compare the current situation to a far-fl ung exotic world (within or beyond the Imperium) that you have visited.',
          'Display a symbol of your authority, and use it to firmly establish your position in an interaction with another NPC.',
        ],
      },
      {
        group: 'Adeptus Astartes',
        objectives: [
          'Call upon your Chapter’s Primarch as you defeat an enemy.',
          'Describe how the Codex Astartes applies (or does not apply) to the current situation.',
          'Reminisce upon the traditions of your Chapter (and the Chapter’s home world, if any) and compare it to the current situation.',
        ],
      },
      {
        group: 'Adeptus Mechanicus',
        objectives: [
          'Praise the Omnissiah as you commune with a machine-spirit (a successful Tech test counts for this).',
          'Calculate the odds of any given task and provide an estimate of either survival or success (or both).',
          'Reminisce about a Forge World you have visited and compare it to the current location.',
        ],
      },
      {
        group: 'Scum',
        objectives: [
          'Compare the current situation to a crime you once observed (or participated in).',
          'Verbally estimate the potential value of an item (or person!) if it were in your possession. This may be as subtle or as overt as you wish.',
          'Describe a desperate act of survival you attempted under diffi cult circumstances.',
        ],
      },
      {
        group: 'Renegade',
        objectives: [
          'Describe the benefi ts (or lack thereof!) of gaining the attention of the Ruinous Powers.',
          'Proclaim how a fl aw of the Imperium shall lead to its downfall.',
          'Bear witness to an act that you consider a sign of the Ruinous Powers’ favour (or contempt).',
        ],
      },
      {
        group: 'Aeldari',
        objectives: [
          'Unfavourably evaluate a facet of another species against Eldar culture, technology, or art.',
          'Call upon one of the gods of the Eldar as you accomplish a diffi cult task or defeat an enemy.',
          'Reminisce upon the traditions of an Eldar Craftworld, and compare it to the current situation.',
        ],
      },
      {
        group: 'Ork',
        objectives: [
          'Reminisce on the traditions of your Ork Clan, and compare them to the current situation.',
          'Use your size, physical might, or reputation in a fearsome manner.',
          'Sincerely express a desire for brutal, uncompromising combat.',
        ],
      },
    ];

    return {
      archetypeRepository: [
        ...core,
      ],
      objectiveRepository: objectives,
    }
  },
};
