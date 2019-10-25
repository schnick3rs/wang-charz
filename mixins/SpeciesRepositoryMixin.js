export default {
  async asyncData({ params }) {
    //const speciesResponse = await axios.get('https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151');
    //const speciesAbilitiesResponse = await axios.get('https://api.sheety.co/a192e4d5-a73f-46c0-929e-f3eca3dde0a0');
    return {
      //speciesRepository: speciesResponse.data || [],
      //speciesAbilitiesRepository: speciesAbilitiesResponse.data || [],
    };
  },
  data() {
    return {
      speciesRepository: [
        {
          name: "Human",
          cost: 0,
          baseTier: 1,
          speed: 6,
          attributes: "None",
          modifications: [],
          abilities: null,
          key: "human",
          hint: "The humble human",
          description: "Each human is just one of untold billions spread across the galaxy over millions of planets. Those in the Imperium live under the authority of the Emperor, but He has not stirred from His Golden Throne on Holy Terra for over ten thousand years. The remorseless government agencies of the Imperium use His authority to mercilessly rule Humanity according to their interpretations of the Emperor’s will. Every planet has its own culture and unique interpretations of the Imperium’s laws and sacred beliefs, but a few things are especially common.",
          avatar: null,
          theme: null
        },
        {
          name: "Ratling",
          cost: 15,
          baseTier: 1,
          speed: 5,
          size: "Small",
          attributes: "Agility +1, Strength -1",
          modifications: [
            { targetGroup: "attributes", targetValue: "strength", modifier: -1 },
            { targetGroup: "attributes", targetValue: "agility", modifier: 1 },
          ],
          abilities: "Abhuman,Born Sharpshooter,Conniving",
          key: "human",
          hint: "Half-man by name, but not by nature",
          description: "",
          avatar: null,
          theme: null
        },
        {
          name: "Eldar",
          cost: 10,
          baseTier: 1,
          speed: 8,
          attributes: "Agility +1",
          modifications: [
            {
              targetGroup: "attributes",
              targetValue: "agility",
              modifier: 1
            }
          ],
          abilities: "Outsider,Intense Emotion,Psychosensitive",
          key: "eldar",
          hint: "The filthy xenos",
          description: "The Aeldari ruled the galaxy for millions of years. During their rise to power, this species uncovered secrets of the galaxy’s very essence, learning to create and shatter entire worlds. They discovered and developed the webway, enabling them to quickly travel across the galaxy without the risk of warp travel. Their collective knowledge eventually reached the point that any drive to learn dampened, as they could accomplish virtually any task they could imagine. The longlived Aeldari existed in luxury, pursuing whatever interests drew their attention. Eventually, such leisure led to increasingly hedonistic pursuits that spread in cults across their entire population. Those moral failings, over time, coalesced within the warp, giving birth to Slaanesh.",
          avatar: null,
          theme: null
        },
        {
          name: "Ork",
          cost: 10,
          baseTier: 1,
          speed: 6,
          attributes: "Toughness +1",
          modifications: [
            {
              targetGroup: "attributes",
              targetValue: "toughness",
              modifier: 1
            }
          ],
          abilities: "Outsider,Orky,Bigger is Better",
          key: "ork",
          hint: "The savage brute",
          description: "Orks are ubiquitous throughout the galaxy. Their incomprehensible physiology and ecosystem is capable of actively proliferating in even the most hostile of environments—from ash wastes, to overgrown Death Worlds, to barren asteroids. Even a small tribe of a few dozen Orks can inexplicably grow into a force of tens of thousands in relatively short order. The biological mechanisms behind this growth and adaptability confound even the most accomplished scholars of the Adeptus Mechanicus. There are no consistent requirements for Orks to thrive within any climate. However, their functionality is clearly evident on the countless worlds they have subsumed.",
          avatar: null,
          theme: null
        },
        {
          name: "Ogryn",
          cost: 15,
          baseTier: 2,
          speed: 4,
          size: "Large",
          attributes: "Strength +2, Toughness +2, Fellowship -1, Intellect -1",
          modifications: [
            { targetGroup: "attributes", targetValue: "strength", modifier: 2 },
            { targetGroup: "attributes", targetValue: "toughness", modifier: 2 },
            { targetGroup: "attributes", targetValue: "fellowship", modifier: -1 },
            { targetGroup: "attributes", targetValue: "intellect", modifier: -1 },
          ],
          abilities: "Abhuman,Burly",
          key: "human",
          hint: "The brutal, eeh... human?",
          description: "",
          avatar: null,
          theme: null
        },
        {
          name: "Adeptus Astartes",
          cost: 50,
          baseTier: 2,
          speed: 7,
          attributes: "Strength +1, Agility +1, Toughness +1, Resolve +1",
          modifications: [
            { targetGroup: "attributes", targetValue: "strength", modifier: 1 },
            { targetGroup: "attributes", targetValue: "agility", modifier: 1 },
            { targetGroup: "attributes", targetValue: "toughness", modifier: 1 },
            { targetGroup: "traits", targetValue: "resolve", modifier: 1 }
          ],
          abilities: "Angel of Death,Honour the Chapter,Space Marine Implants",
          key: "adeptusAstartes",
          hint: "the sword of mankind",
          description: "Prior to launching the Great Crusade, the Emperor of Man created the Adeptus Astartes and assembled them into his legions. Each began as a mortal man, but a combination of genetic manipulations and physical implantations transformed each into a superhuman warrior—an Imperial Space Marine. The Emperor initially created twenty legions of Space Marines, each one containing vast numbers. All members of each of the twenty legions used a gene-seed developed from one of the twenty godlike Primarchs, whom the emperor also created. During the Great Crusade, Primarchs served as the generals of the Space Marine Legions, as the Emperor strove to reunify all lost human worlds, bringing the galaxy into Imperial Compliance.",
          avatar: null,
          theme: null
        },
        {
          name: "Primaris Astartes",
          cost: 100,
          baseTier: 4,
          speed: 7,
          attributes: "Strength +2, Agility +1,Toughness: +1, Resolve +1, Wounds +4",
          modifications: [
            { targetGroup: "attributes", targetValue: "strength", modifier: 2 },
            { targetGroup: "attributes", targetValue: "agility", modifier: 1 },
            { targetGroup: "attributes", targetValue: "toughness", modifier: 1 },
            { targetGroup: "traits", targetValue: "resolve", modifier: 1 },
            { targetGroup: "traits", targetValue: "wound", modifier: 4 }
          ],
          abilities: "Angel of Death,Honour the Chapter (Primaris),Space Marine Implants",
          key: "primarisAstartes",
          hint: "the new breed",
          description: "In the wake of the Horus Heresy, after completing the Codex Astartes, Primarch Roboute Guilliman decided that the Adeptus Astartes needed further enhancements to better defend the Imperium from outside threats—including those Space Marines who had turned traitor. He assigned the job of improving them to Archmagos Dominus Belisarius Cawl of the Adeptus Mechanicus. To aid the Tech-Priest, Guilliman provided him with an archive of genetic material taken from his fellow Primarchs, called the Sangprimus Portum.",
          avatar: null,
          theme: null
        }
      ],
      speciesAbilitiesRepository: [
        {
          key: null,
          name: "Angel of Death",
          effect: "Space Marines add +½ Rank icons to any successful attack against a Mob.",
          description: null
        },
        {
          key: null,
          name: "Honour the Chapter",
          effect: "You are subject to the orders of your chapter master, and must honour both the beliefs and traditions of your chapter.",
          description: null
        },
        {
          key: null,
          name: "Space Marine Implants",
          effect: "Space Marines do not bleed. Space Marines gain +1 bonus dice as a situational modifi er to any test if the Game Master deems it appropriate for one of the 19 implants.",
          description: null
        },
        {
          key: null,
          name: "Honour the Chapter (Primaris)",
          effect: "You are subject to the orders of your chapter master and the beliefs and traditions of your chapter. Primaris Space Marines gain the fi rst special rule from their Chapter and ignore any penalties or drawbacks from the second if it is marked as being related to the Chapter’s gene-seed.",
          description: null
        },
        {
          key: null,
          name: "Outsider",
          effect: "+2DN to all Interaction tests with those with the Keyword <Imperium>.",
          description: null
        },
        {
          key: null,
          name: "Abhuman",
          effect: "+1DN to all interaction tests with characters possessing the Imperium keyword.",
          description: null
        },
        {
          key: null,
          name: "Burly",
          effect: " +2d to all Intimidation tests.",
          description: null
        },
        {
          key: null,
          name: "Born Sharpshooter",
          effect: " +2d to all Ballistic Skill tests.",
          description: null
        },
        {
          key: null,
          name: "Conniving",
          effect: "Ratlings begin play with the Scum keyword.",
          description: null
        },
        {
          key: null,
          name: "Orky",
          effect: "+1 to all Intimidation tests.",
          description: null
        },
        {
          key: null,
          name: "Bigger is Better",
          effect: "Orks calculate Infl uence using their Strength in place of Fellowship.",
          description: null
        },
        {
          key: null,
          name: "Intense Emotion",
          effect: "+1DN to all Resolve tests. Failing a Willpower-based test in a scene involving intense emotion grants the GM +1 Ruin.",
          description: null
        },
        {
          key: null,
          name: "Psychosensitive",
          effect: "All Eldar may purchase 1 Minor Psychic Power if they also purchase the Psychic Mastery skill. This purchase also gives them the Psyker keyword. In addition, the Tier Restriction for Maximum Psychic Powers for Eldar Characters is increased by 1 to accommodate this purchase.",
          description: null
        }
      ],
      astartesChapterRepository: [
        {
          key: 'bloodAngles',
          name: 'Blood Angels',
          beliefsAndTraditions: [
            {
              name: 'Blood Frenzy',
              effect: 'When attacking in melee combat, a Blood Angels Space Marine may reroll up to Rank damage dice on every attack.',
            },
            {
              name: 'The Red Thirst',
              origin: 'Gene-seed',
              effect: 'After engaging in melee combat, Blood Angels must pass a Willpower test (DN 3). On a failure, the Blood Angels Space Marine feels a strong urge to drink the blood of the fallen—the player may choose how to respond to this urge. If the failure involves a complication, the Blood Angels Space Marine may not resist this urge. The Game Master may alter the DN based on how long it has been since the character has tasted blood.',
            }],
        },
        {
          key: 'darkAngles',
          name: 'Dark Angels',
          beliefsAndTraditions: [
            {
              name: 'Fire Discipline',
              effect: 'When Dark Angels make a ranged attack using a held action, they ignore up to Rank penalties on the attack.',
            },
            {
              name: 'The Secret',
              origin: 'Tradition',
              effect: 'Dark Angels distrust anyone outside of their chapter. They suffer a +2DN penalty for Interaction tests involving anyone outside the Dark Angels chapter',
            },
          ],
        },
        {
          key: 'imperialFists',
          name: 'Imperial Fists',
          beliefsAndTraditions: [
            {
              name: 'Siege Masters',
              effect: 'Imperial Fists immediately recognise the weaknesses in any fortification. ' +
                'An Imperial Fists Space Marine may add his Rank bonus to damage when attacking ' +
                'any building or fortifi cation. An Imperial Fists Space Marine may spend a ' +
                'Glory point to ignore any bonuses to an enemy’s Defence from cover on any attack.',
            },
            {
              name: 'No Retreat',
              origin: 'Tradition',
              effect: 'Imperial Fists are stubborn, tenacious and stoic. If an Imperial Fists ' +
                'Space Marine fails a Willpower test, the GM gains 1 Ruin.',
            },
          ],
        },
        {
          key: 'ironHands',
          name: 'Iron Hands',
          beliefsAndTraditions: [
            {
              name: 'The Flesh is Weak',
              effect: 'Iron Hands draw surety from their cybernetic replacements. An Iron Hands Space Marine gains a bonus to Willpower tests equal to the number of cybernetic replacement parts he has, up to Rank.',
            },
            {
              name: 'Unforgiving',
              origin: 'Tradition',
              effect: 'The Iron Hands despise weakness and corruption. When an Iron Hands Space ' +
                'Marine fails a Corruption test, the GM gains 2 Ruin rather than 1.',
            },
          ],
        },
        {
          key: 'ravenGuard',
          name: 'Raven Guard',
          beliefsAndTraditions: [
            {
              name: 'Master of Shadows',
              effect: 'A Raven Guard may reroll up to Rank dice when making a Stealth test. ' +
                'Raven Guards may make Stealth tests even under unusual circumstances, such as ' +
                'while Running (but not Sprinting) or while using a Jump Pack.',
            },
            {
              name: 'Fiercely Independent',
              origin: 'Tradition',
              effect: 'Raven Guards traditionally disdain using direct tactics and have a ' +
                'reputation for independent action. A Raven Guard Space Marine suffers a +2DN ' +
                'penalty to any combined action (see page 52) with non- Raven Guards',
            },
          ],
        },
        {
          key: 'salamanders',
          name: 'Salamanders',
          beliefsAndTraditions: [
            {
              name: 'Fire Born',
              effect: 'Salamanders receive +Rank bonus dice for Soak rolls when resisting ' +
                'damage from any weapon or effect with the Fire or Melta keywords',
            },
            {
              name: 'Unyielding',
              origin: 'Tradition',
              effect: 'Salamanders are determined warriors who consider retreat or surrender an ' +
                'act of last resort. If a Salamanders Space Marine fails a Resolve test, ' +
                'the GM gains 1 Ruin.',
            },
          ],
        },
        {
          key: 'spaceWolves',
          name: 'Space Wolves',
          beliefsAndTraditions: [
            {
              name: 'Heightened Senses',
              effect: 'Space Wolves receive +Rank bonus dice to any Awareness test due to their ' +
                'lupine senses.',
            },
            {
              name: 'Savage Within',
              origin: 'Tradition',
              effect: 'Space Wolves suffer a +2DN penalty for any Infl uence tests for authority ' +
                'outside of dealing with their own Chapter.',
            },
          ],
        },
        {
          key: 'ultramarines',
          name: 'Ultramarines',
          beliefsAndTraditions: [
            {
              name: 'Courage and Honour',
              effect: 'The Ultramarines are adept at multiple aspects of war—they are exemplars ' +
                'of brotherhood and adapt quickly to changing circumstances. An Ultramarines Space ' +
                'Marine may choose to bank up to 2 Exalted Icons for Glory per test instead of just 1.',
            },
            {
              name: 'Pride of Ultramar',
              origin: 'Tradition',
              effect: 'The Ultramarines are held to a high standard, and work doubly hard to ' +
                'excel under the eyes of their reborn Primarch, Roboute Guilliman. An Ultramarines ' +
                'Space Marine begins each session with 1 fewer Wrath. The character regains this ' +
                'lost Wrath point if he accomplishes his Objective during the session (in addition ' +
                'to the normal benefi ts of accomplishing an Objective).',
            },
          ],
        },
        {
          key: 'whiteScars',
          name: 'White Scars',
          beliefsAndTraditions: [
            {
              name: 'Swift as the Wind',
              effect: 'White Scars are famously agile in the saddles of their bikes. A White ' +
                'Scars Space Marine gains +Rank bonus to Piloting tests for vehicles with ' +
                'the Adeptus Astartes keyword.',
            },
            {
              name: 'Strike like Lightning',
              origin: 'Tradition',
              effect: 'White Scars value swift action and are reluctant to give up the chase ' +
                'when hunting their foes. A White Scars Space Marine must spend a point of Glory ' +
                'to Hold Action (see page 222).',
            },
          ],
        },
      ]
    }
  }
};
