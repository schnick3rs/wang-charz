export default {
  data() {
    return {
      // https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994
      archetypeRepository: [
        // Adeptus Ministorum
        {
          name: "Ministorum Priest",
          cost: 0,
          tier: 1,
          species: "Human",
          influence: 1,
          keywords: "Imperium,Adeptus Ministorum",
          abilities: [
            { name: 'Fiery Invective', effect: '' },
          ],
          keywordOption: null,
          prerequisites: [
            { group: 'attributes', value: 'willpower', threshold: 3, },
            { group: 'skills', value: 'scholar', threshold: 1, },
          ],
          group: "Adeptus Ministorum",
          key: null,
          description: null,
          hint: "A zealous preacher of the Imperial Creed."
        },
        {
          name: "Death Cult Assassin",
          cost: 20,
          tier: 2,
          species: "Human",
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
          species: "Human",
          influence: 1,
          keywords: "Imperium,Adeptus Ministorum",
          abilities: [
            { name: 'Armour of Faith', effect: ''},
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
          group: "Adeptus Sororitas",
          cost: 0,
          tier: 1,
          species: "Human",
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
          species: "Human",
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
          group: "Adeptus Sororitas",
          key: "sisterOfBattle",
          description: "As the militant arm of the of the Adeptus Ministorum, the Sisters of Battle are equipped to engage any who would dare to oppose the Imperial Creed. It is their sacred duty to cleanse the galaxy of heresy and corruption, wherever they should fi nd it, including within the various organisations of the Imperium of Man. Due to their shared goals, the Orders Militant often work in conjunction with the Imperial Inquisition, though they remain distinct organisations. Many of the orders maintain convents on Shrine Worlds, so that they can more easily defend those places most blessed to the Imperial Creed.",
          hint: "A determined warrior, filled with purity and faith."
        },
        // Adeptus Militarum
        {
          name: "Imperial Guardsman",
          cost: 0,
          tier: 1,
          species: "Human",
          influence: 0,
          keywords: "Imperium,Astra Militarum,<Regiment>",
          abilities: [
            { name: 'Look Out Sir' }
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
          species: "Human",
          influence: 1,
          keywords: "Imperium,Astra Militarum,Militarum Tempest",
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
          species: "Human",
          influence: 3,
          keywords: "Imperium,Astra Militarum,Officio Prefectus",
          abilities: [
            { name: 'Fearsome Respect', effect: '' },
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
          species: "Human",
          influence: 2,
          keywords: "Imperium,Inquisition,<ANY>,<Ordo>",
          abilities: [
            { name: 'Inquisitorial Decree', effect: '' },
          ],
          keywordOption: "<Ordo>",
          prerequisites: [
            { group: 'skills', value: '<Any>', threshold: 2, },
          ],
          group: "Agents of the Imperium",
          key: "inquisitorialAcolyte",
          description: null,
          hint: "A representative of the Inquisition, adaptable and possessing great potential."
        },
        {
          name: "Inquisitorial Adept",
          cost: 0,
          tier: 1,
          species: "Human",
          influence: 1,
          keywords: "Imperium,Inquisition,<Ordo>",
          "abilities": "Administratum Records",
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
          species: "Human",
          influence: 2,
          keywords: "Imperium,Rogue Trader,<Dynasty>",
          keywordOption: "<Dynasty>",
          "abilities": "Warrant of Trade",
          prerequisites: [
            { group: 'attributes', value: 'fellowship', threshold: 3, },
            { group: 'skills', value: 'cunning', threshold: 1, },
            { group: 'skills', value: 'insight', threshold: 2, },
            { group: 'skills', value: 'persuasion', threshold: 2, },
            { group: 'skills', value: 'awareness', threshold: 1, },
          ],
          group: "Agents of the Imperium",
          "avatar": null,
          "theme": null,
          key: "rogueTrader",
          description: null,
          hint: "An adventuresome and infl uential explorer with their own space vessel."
        },
        {
          name: "Sanctioned Psyker",
          cost: 50,
          tier: 2,
          species: "Human",
          influence: 0,
          keywords: "Imperium,Adptus Astartes Telepathica,Psyker,Scholastica Psykana",
          "abilities": "Psyker (Sanctioned)",
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
          species: "Human",
          influence: null,
          keywords: "Imperium,",
          "abilities": null,
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
          key: null,
          description: null,
          hint: "A bearer of profound Imperial authority, adept at discovering the truth in the shadows."
        },
        // Adeptus Mechanicus
        {
          name: "Skitarius",
          cost: 40,
          tier: 2,
          species: "Human",
          influence: 0,
          keywords: "Imperium,Adeptus Mechanicus,Skitarii,<Forge World>",
          "abilities": "Heavily Augmented",
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
          species: "Human",
          influence: 2,
          keywords: "Imperium,Adeptus Mechanicus,Cult Mechanicus,<Forge World>",
          keywordOption: "<Forge World>",
          "bonus": null,
          "abilities": "Rite of Repair",
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
          species: "Human",
          influence: 1,
          keywords: "Scum,<ANY>",
          keywordOption: "<Any>",
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
          species: "Human",
          influence: null,
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
          species: "Human",
          influence: 1,
          keywords: 'Scum,<Any>',
          keywordOptions: '<Any>',
          prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 3, },
            { group: 'attributes', value: 'intellect', threshold: 2, },
            { group: 'skills', value: 'awareness', threshold: 2, },
            { group: 'skills', value: 'cunning', threshold: 2, },
            { group: 'skills', value: 'investiigation', threshold: 2, },
          ],
          group: "Scum",
          key: null,
          description: null,
          hint: "A savvy and dangerous bounty hunter, mercenary, and gun for hire."
        },
        // Adeptus Astartes
        {
          key: "primarisIntercessor",
          name: "Primaris Intercessor",
          hint: "A skilled and focused warrior, adept at bringing death at range.",
          group: "Adeptus Astartes",
          cost: 60,
          tier: 4,
          species: "Primaris Astartes",
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
        {
          key: "spaceMarineScout",
          name: "Space Marine Scout",
          hint: "A stealthy warrior adept at reconnaissance.",
          group: "Adeptus Astartes",
          species: "Adeptus Astartes",
          cost: 20,
          tier: 2,
          influence: 1,
          keywords: "Imperium,Adeptus Astartes,<Chapter>",
          keywordOption: "<Chapter>",
          "abilities": [
            { name: "Use the Terrain", effect: 'Space Marine Scouts receive +Rank to all Stealth tests if they are in cover.' }
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
          species: "Adeptus Astartes",
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
        // Renegades
        {
          name: "Cultist",
          cost: 0,
          tier: 1,
          species: "Human",
          influence: 2,
          keywords: "Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Any>",
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
          species: "Adeptus Astartes",
          influence: 2,
          keywords: "Chaos,Heretic,Heretic Astartes,<Mark of Chaos>,<Legion>",
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
          species: "Human",
          influence: 1,
          keywords: "Chaos,Heretic,Adeptus Mechanicus,Dark Mechanicus",
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
          species: "Human",
          cost: 50,
          tier: 2,
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
          species: "Eldar",
          influence: 0,
          keywords: "Aeldari,Anhrathe,<Coterie>",
          "abilities": "Dancing the Blade's Edge",
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
          species: "Eldar",
          influence: 0,
          keywords: "Aeldari,Asuryani,<Crafsworld>",
          "abilities": "From the Shadows",
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
          species: "Eldar",
          influence: 2,
          keywords: "Aeldari,Asuryani,Psyker,<Crafsworld>",
          "abilities": "Runes of Battle",
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
          "label": "[1] Boy (0)",
          name: "Boy",
          cost: 0,
          tier: 1,
          species: "Ork",
          influence: 0,
          keywords: "Ork,<Clan>",
          "bonus": null,
          "wargear": "Shoota,Slugga,Choppa",
          "abilities": "Get Stuck In",
          keywordOption: null,
          "prerequisite": null,
          "attributes": null,
          "skills": null,
          group: "Orks",
          "avatar": null,
          "theme": null,
          key: null,
          description: null,
          hint: "A brutish warrior and thug who believes that might makes right."
        },
        {
          name: "Kommando",
          cost: 30,
          tier: 2,
          species: "Ork",
          influence: 0,
          keywords: "Ork,<Clan>",
          "bonus": null,
          "wargear": "Shoota,Slugga,Choppa,Stickbombs",
          "abilities": "Kunnin' Plan",
          keywordOption: null,
          "prerequisite": null,
          "attributes": null,
          "skills": null,
          group: "Orks",
          "avatar": null,
          "theme": null,
          key: null,
          description: null,
          hint: "A stealthy and cunning warrior who knows how to turn almost any battle to his advantage."
        },
        {
          name: "Nob",
          cost: 60,
          tier: 3,
          species: "Ork",
          influence: 2,
          keywords: "Ork,<Clan>",
          "bonus": null,
          "wargear": null,
          "abilities": null,
          keywordOption: null,
          "prerequisite": null,
          "attributes": null,
          "skills": null,
          group: "Orks",
          "avatar": null,
          "theme": null,
          key: null,
          description: null,
          hint: "A savage warrior and capable leader, using brute force to succeed where others fail."
        },
      ],
      // https://api.sheety.co/6790490e-d9cc-439f-839b-dec3f1f8edc0
      archetypeAbilityRepository: [
        {
          "label": "Purity of Faith",
          name: "Purity of Faith",
          "archetype": "Sisters of Battle",
          "rules": "Sisters of Battle and any allies within 15 meters and line of sight add +Rank to Corruption Tests. Sisters of Battle gain +Rank to any dice pool to resist psychic powers and effects.",
          "affects": "Corruption Tests",
          "effect": "Sisters of Battle and any allies within 15 meters and line of sight add +Rank to Corruption Tests. Sisters of Battle gain +Rank to any dice pool to resist psychic powers and effects."
        },
        {
          "label": "Inquisitorial Decree",
          name: "Inquisitorial Decree",
          "archetype": null,
          "rules": "Once per scene, an Inquisitorial Acolyte may invoke the name of their Inquisitor to gain +Rank to an Infl uence or Interaction Skill test involving a being with the Imperium keyword.",
          "affects": null,
          "effect": "Once per scene, an Inquisitorial Acolyte may invoke the name of their Inquisitor to gain +Rank to an Infl uence or Interaction Skill test involving a being with the Imperium keyword."
        },
        {
          "label": "Warrant of Trade",
          name: "Warrant of Trade",
          "archetype": null,
          "rules": "Rogue Traders are masters at manipulating situations to their advantage. They receive +Rank to all Persuasion tests and Influence tests to acquire goods or services.",
          "affects": null,
          "effect": "Rogue Traders are masters at manipulating situations to their advantage. They receive +Rank to all Persuasion tests and Influence tests to acquire goods or services."
        },
        {
          "label": "Rite of Repair",
          name: "Rite of Repair",
          "archetype": null,
          "rules": "Tech-Priests automatically reduce the time by half for any Tech test. They receive +Rank on Tech tests to fix or repair a damaged machine.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Get Stuck In",
          name: "Get Stuck In",
          "archetype": "Boy",
          "rules": "A Boy gains +Rank to melee attacks for every ally engaged in melee combat with the same target.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Kunnin' Plan",
          name: "Kunnin' Plan",
          "archetype": "Kommando",
          "rules": "A Kommando and any allies with the Ork Keyword within 15 metres gain +1/2 Rank to Stealth tests.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Administratum Records",
          name: "Administratum Records",
          "archetype": null,
          "rules": "The character is particularly adept at navigating Imperial Bureaucracy. Add +Rank to Influence and Investigation tests to acquire information.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Unchecked Authority",
          name: "Unchecked Authority",
          "archetype": null,
          "rules": "Inquisitors have supreme authority for maintaining the security of the Imperium. They gain +Rank to all Influence and Interaction skill tests involving characters with the Imperium Keyword.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Psyker",
          name: "Psyker",
          "archetype": "Sanctioned Psyker",
          "rules": "A Sanctioned Psyker begins play with one minor psychic power and the smite psychic power. They may purchase additional Minor Psychic Powers and Universal Psychic powers, subject to Tier restrictions.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Use the Terrain",
          name: "Use the Terrain",
          "archetype": null,
          "rules": "Space Marine Scouts receive +Rank to all Stealth tests if they are in cover (see page 213).",
          "affects": null,
          "effect": null
        },
        {
          "label": "Tactical Versatility",
          name: "Tactical Versatility",
          "archetype": null,
          "rules": "Space Marine training prepares a soldier for any combat circumstance. When making a critical hit, they may draw two Wrath Cards and choose one (if using the Critical Chart, make two rolls and pick one).",
          "affects": null,
          "effect": null
        },
        {
          "label": "Intercessor Focus",
          name: "Intercessor Focus",
          "archetype": null,
          "rules": "When firing a bolt rifle or heavy bolt pistol they gain +Rank bonus to attack rolls.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Heavily Augmented",
          name: "Heavily Augmented",
          "archetype": null,
          "rules": "The Skitarius’ body is designed to withstand the rigours of war. Skitarii do not bleed and gain +1/2 Rank to Soak tests",
          "affects": null,
          "effect": null
        },
        {
          "label": "Scrounger",
          name: "Scrounger",
          "archetype": null,
          "rules": "Gangers make use of every available resource, and have a knack for „fi nding“ spares. They receive +Rank to Cunning tests, and may make a single retroactive Infl uence test with a bonus of +Rank once per session, representing an item that they had prepared in advance.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Mutant",
          name: "Mutant",
          "archetype": null,
          "rules": "The Scavvy may select one mutation (see Scavvy Mutations, page 368). Every time the Scavvy gains a Rank, they may select an additional mutation from that list.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Valuable Prey",
          name: "Valuable Prey",
          "archetype": null,
          "rules": "Desperados receive +Rank for Cunning tests. They also receive +Rank to Awareness tests when tracking a target.",
          "affects": null,
          "effect": null
        },
        {
          "label": "From Within",
          name: "From Within",
          "archetype": null,
          "rules": "Cultists gain +Rank to Deception tests, including Interaction attacks, against targets with the Imperium keyword.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Transformative Technology",
          name: "Transformative Technology",
          "archetype": null,
          "rules": "Hereteks automatically reduce the time by half for any Tech test. They also gain +Rank for Tech interaction attacks.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Rogue Psyker",
          name: "Rogue Psyker",
          "archetype": "Rogue Psyker",
          "rules": "A rogue psyker begins play with one Minor Psychic Power, the Smite Power and may purchase additional Minor Psychic Powers, Universal Psychic Powers and Maleficarum Psychic Powers subject to Tier restrictions.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Dancing on the Blade’s Edge",
          name: "Dancing on the Blade’s Edge",
          "archetype": null,
          "rules": "Corsairs prosecute war with wild abandon, unleashing weapons fi re and scathing insults. Their reckless bravery covers the gnawing fear of the price they might pay for their uninhibited ways. Choose one of the following Interaction Attacks: Athletics or Persuasion. Corsairs get +Rank to the chosen Interaction Attack and get the same bonus for resisting those same attacks. Corsairs suffer a +1DN penalty to any Fear test.",
          "affects": null,
          "effect": null
        },
        {
          "label": "From the Shadows",
          name: "From the Shadows",
          "archetype": null,
          "rules": "Rangers are adept at exploiting any concealment. Any penalties to detect (using Awareness) or attack a ranger due to lighting or cover are increased by +1/2 Rank.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Runes of Battle",
          name: "Runes of Battle",
          "archetype": null,
          "rules": "A Warlock begins play with the Psyniscience and smite psychic powers (these do not count towards the maximum), and may purchase additional Minor Psychic Powers, Universal Psychic Powers, and Runes of Battle Psychic Powers, subject to Tier restrictions.",
          "affects": null,
          "effect": null
        },
        {
          "label": "Boyz",
          name: "Boyz",
          "archetype": null,
          "rules": "A Nob commands a mob of Troops numbering up to Rank x 3 Boyz who loyally follow his direction. These Ork Boyz use the profi le found on page 150.",
          "affects": null,
          "effect": null
        }
      ]
    }
  }
};
