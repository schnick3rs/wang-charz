import {ATTRIBUTES, SKILLS, TRAITS} from "../../db/static/_statUtils";
import {background, commonNames, cost, species, statMax} from "./utils";
import {addModifier} from "../archetypes/utils";

export const fspg = [
    {
        ...species('fspg', 93, 'Mankind', 'Ogryn', 'The simple mind', 76, 6),
        ...cost(76,76,0,0),
        ...commonNames('Ank, Brok, Berta, Chukka, Dent, Frug, Grok, Hak, Igor, Jab, Karg, Kront, Lokk, Munt, Nork, Okka, Orod, Punt, Rakka, Smasha, Tock, Tug, Urok, Vohn, Wakka, Yarp.'),
        ...statMax(12,12,7,4,8,1,4,8),
        prerequisites: [
            { group: 'attributes', value: 'strength', threshold: 5 },
            { group: 'attributes', value: 'toughness', threshold: 5 },
            { group: 'skills', value: 'survival', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Avalanche of Muscle',
                snippet: 'When you Charge you gain an additional +Rank Bonus Dice to your melee attack Test.',
                modifications: [
                    { targetGroup: 'skill', targetValue: 'weaponSkill', rank: 1, condition: 'when charging.' },
                ],
            },
            {
                name: 'Claustrophobic',
                snippet: 'Whenever you enter an enclosed area you must make a Fear Test (default DN 2). Additionally, whenever you roll a Complication in an enclosed space, the GM can spend 1 Ruin to force you to repeat this Fear Test.',
            },
            {
                name: 'Simple Loyalty',
                snippet: 'Whenever an ally with the IMPERIUM Keyword makes a Leadership Test targeting an Ogryn they gain Bonus Dice equal to the Ogryn’s Rank ( +Rank ).',
            },
            {
                name: 'Abhuman',
                snippet: 'You suffer a +1 DN penalty to social tests with Humans, modified by the target`s Keywords.',
            },
            {
                name: 'No recored Psykers',
                snippet: 'There are no recorded instances of Ogryns with psychic abilities. You cannot have the PSYKER Keyword.',
            },
            {
                name: 'Weapons for Ogryns',
                snippet: 'You treat any weapon designed for a smaller size as heaving the Unwieldy(3) Weapon Trait.',
            },
            {
                name: 'Armour for Abhumans',
                snippet: 'For abhumans like Ogryns, the Rarity of any Armour is increased by +1.',
            },
        ],
        backgroundSection: [
            // ORIGIN
            background('Cloned: You are a vat-grown replicae, created to serve the Imperium. Your conscious life may have only begun very recently, and you are eager to fulfill your purpose.', 'Max Shock', 'Origin'),
            background('High Gravity: World A harsh life of survival is all you have known, and you’ve fought for everything you’ve ever had. Imperial society is a strange but not unwelcome world.', 'Determination', 'Origin'),
            background('Legion Born: War in the Emperor’s name is an Ogryn’s purpose — that’s what everyone tells you, and you have no reason to disagree. The Militarum Auxilla is your home, and the Emperor protects!', 'Resolve', 'Origin'),
            // ACCOMPLISHNMENT
            background('Followed Orders: You executed a series of suicidal orders with unflinching loyalty, surviving against the odds. Your mental and physical fortitude are unquestionable.', 'Conviction', 'Accomplishment'),
            background('Body Shield: Your tremendous bulk protected a superior officer from a deadly blow (this may have been accidental). Your reputation for being almost impenetrable to bullets is well earned.', 'Max Wounds', 'Accomplishment'),
            background('Sanctioned Creativity: Shocking your peers and superiors, you experienced a rare moment of creativity. The strange story of your brief higher function has spread and precedes you.', 'Influence', 'Accomplishment'),
            // GOAL
            background('Promotion: You want to get to the top — be it status, proof of your prowess, or to earn a Bone’ead augmetic, your goal is to be promoted.', 'Influence', 'Goal'),
            background('Medal: You’ve seen other soldiers get shiny medals, and you want one too! Accruing wealth and other shiny things in the pursuit of commendation has become your obsession.', 'Wealth', 'Goal'),
            background('Ward-bound: There is someone you must protect, an individual you value above all others. You may not even have met them yet, but you know your life’s purpose is to defend your ward.', 'Conviction', 'Goal'),
        ],
        objectives: [
            'Follow a superior’s orders to the letter.',
            'Use your tremendous bulk to dominate a social situation.',
            'Display the strength found in ignorance.',
            'Apply your unique understanding of the Emperor’s will to the current situation.',
            'Solve a problem through the judicious application of brute force.',
            'Charge the enemies of the Imperium!',
        ],
    },
    {
        ...species('fspg', 95, 'Mankind', 'Ratling', 'The slippery raskal', 30, 5),
        ...cost(30,30,0,0),
        ...commonNames('Arble, Bigby, Chansey, Doc, Edegar, Fingers, Gormo, Helli, Irma, Jolli, Kelli, Kurds, Lobe, Malgoy, Merrin, Norm, Obbs, Pietra, Rally, Stumper, Talia, Ulto, Vinn, Wanda, Wisp, Yanush.'),
        ...statMax(6,6,10,10,8,8,10,7),
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 2 },
            { group: 'attributes', value: 'fellowship', threshold: 2 },
            { group: 'skills', value: 'awareness', threshold: 2 },
            { group: 'skills', value: 'ballisticSkill', threshold: 1 },
            { group: 'skills', value: 'cunning', threshold: 1 },
            { group: 'skills', value: 'deception', threshold: 2 },
            { group: 'skills', value: 'stealth', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Gourmand',
                snippet: '+Double Rank Bonus Dice to any Test made to prepare food. Prepared food can be used during a Regroup to recover +Rank Shock.',
            },
            {
                name: 'Abhuman',
                snippet: 'You suffer a +1 DN penalty to social tests with Humans, modified by the target`s Keywords.',
            },
            {
                name: 'No recored Psykers',
                snippet: 'There are no recorded instances of Ratlings with psychic abilities. You cannot have the PSYKER Keyword.',
            },
            {
                name: 'Weapons for Ratlings',
                snippet: 'You can wield most Human-sized Weapons, but the GM might rule that some might have a Unwieldy(w) Weapon Trait.',
            },
            {
                name: 'Armour for Abhumans',
                snippet: 'For abhumans like Ratlings, the Rarity of any Armour is increased by +1.',
            },
        ],
        backgroundSection: [
            // ORIGIN
            background('Penal Legionnaire: Your sharp eye and sly movements served you well as a thief, but now after only a modicum of torture — they will serve you as a soldier.','Max Shock', 'Origin'),
            background('Miniature Technician: You used to spend days at a time trapped in coffin-like chambers to ensure machinery you didn’t understand kept working. You proved your value and got out — now you’re eager to see the galaxy.','Resolve', 'Origin'),
            background('Fast Talker: You’ve talked, tricked, and bamboozled your way out of (and into) more scrapes than you care to count. You’ve earned a reputation for charm and deviousness, and are eager to put it to good use.','Influence', 'Origin'),
            // ACCOMPLISHNMENT
            background('Big Score: Be it a cache of armaments, a prized collection of relics, or the stock of an entire manufactorum, you managed to liquidate someone else’s assets — let’s hope it never comes back to haunt you.','Wealth', 'Accomplishment'),
            background('Sharp Shot: You assassinated an important enemy at improbable range or under difficult conditions. News of a deadeye Ratling spread quickly, and you’re likely to be in high demand.','Influence', 'Accomplishment'),
            background('Unnoticeable: You managed to survive a hopeless mission that martyred the remainder of your regiment — you managed to hide and survive. Some laud you as a hero, others a coward.','Conviction', 'Accomplishment'),
            // GOAL
            background('Fame & Fortune: You’ve got the skills to be a hero of the Imperium, and you intend to be well rewarded for using them. Rise through the ranks and take what is due.','Determination', 'Goal'),
            background('The Good Life: Land, food, and friendship — what else could you possibly want? You intend to survive everything the galaxy has to throw at you, then find a way to discreetly abandon your post and get back to basics.','Conviction', 'Goal'),
            background('Acceptance: You’re sick of Humans looking down on you. You want to ensure Ratlings are accepted, building elite units and industrial efforts that serve the Emperor and prove your peoples’ worth.','Resolve', 'Goal'),
        ],
        objectives: [
            'Fill your stomach with some high-quality grub.',
            'Redirect imperial resources to your own advantage.',
            'Loot supplies from your ignoble enemies.',
            'Show the advantages of a smaller size.',
            'Avoid danger using your natural stealth.',
            'Use your precise eyesight to aid the party (or yourself).',
        ],
    },
    {
        ...species('fspg',97,'Kroot','Kroot','The mutating gourmet',22,5),
        ...cost(22,22,0,0),
        ...commonNames('Anghkor, Braztyk, Cechkala, Dahyak, Enghok, Fenya, Gorok, Harbyx, Ixilla, Jiynko, Khort, Lucu, Meyzek, Nhatalla, Ortazk, Pechallai, Quon, Razick, Senghak, Tovrick, Ula, Vhey, Wihn, Xala, Yulu, Zhorick.'),
        ...statMax(12,12,12,12,10,6,6,10),
        prerequisites: [
            { group: 'skills', value: 'athletics', threshold: 1 },
            { group: 'skills', value: 'awareness', threshold: 1 },
            { group: 'skills', value: 'stealth', threshold: 2 },
            { group: 'skills', value: 'survival', threshold: 2 },
            { group: 'skills', value: 'weaponSkill', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Kroot Mutations',
                snippet: 'You have a number of Kroot Mutations equal to your Tier, and may gain additional Kroot Mutations as part of Ascension.',
                alerts: [
                    { type: 'info', text: 'Only select the amount of mutations that you are allowed to.', },
                ],
                selected: ['', '', '', ''],
                options: [
                    {
                        name: 'Maneater (Strength)',
                        snippet: '+1 to your lowest Attribute (Strength).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
                    },
                    {
                        name: 'Maneater (Toughness)',
                        snippet: '+1 to your lowest Attribute (Toughness).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
                    },
                    {
                        name: 'Maneater (Agility)',
                        snippet: '+1 to your lowest Attribute (Agility).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
                    },
                    {
                        name: 'Maneater (Initiative)',
                        snippet: '+1 to your lowest Attribute (Initiative).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 1) ],
                    },
                    {
                        name: 'Maneater (Willpower)',
                        snippet: '+1 to your lowest Attribute (Willpower).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
                    },
                    {
                        name: 'Maneater (Intellect)',
                        snippet: '+1 to your lowest Attribute (Intellect).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 1) ],
                    },
                    {
                        name: 'Maneater (Fellowship)',
                        snippet: '+1 to your lowest Attribute (Fellowship).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 1) ],
                    },
                    {
                        name: 'Astartes Eater (Strength)',
                        snippet: '+2 to any Attribute (Strength).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Toughness)',
                        snippet: '+2 to any Attribute (Toughness).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Agility)',
                        snippet: '+2 to any Attribute (Agility).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Initiative)',
                        snippet: '+2 to any Attribute (Initiative).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INITIATIVE, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Willpower)',
                        snippet: '+2 to any Attribute (Willpower).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Intellect)',
                        snippet: '+2 to any Attribute (Intellect).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.INTELLECT, 2) ],
                    },
                    {
                        name: 'Astartes Eater (Fellowship)',
                        snippet: '+2 to any Attribute (Fellowship).',
                        modifications: [ addModifier('attributes', ATTRIBUTES.FELLOWSHIP, 2) ],
                    },
                    {
                        name: 'Aeldari Eater (Agility)',
                        snippet: '+1 to Agility.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.AGILITY, 1) ],
                    },
                    {
                        name: 'Aeldari Eater (Willpower)',
                        snippet: '+1 to Willpower.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.WILLPOWER, 1) ],
                    },
                    {
                        name: 'Ork Eater (Strength)',
                        snippet: '+1 to Strength.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.STRENGTH, 1) ],
                    },
                    {
                        name: 'Ork Eater (Toughness)',
                        snippet: '+1 to Toughness.',
                        modifications: [ addModifier('attributes', ATTRIBUTES.TOUGHNESS, 1) ],
                    },
                    {
                        name: 'Armoured Hide',
                        snippet: 'You gain +Rank to your Base Resilience.',
                        modifications: [ addModifier('traits', TRAITS.RESILIENCE, 0, 1) ],
                    },
                    {
                        name: 'Bioluminescence',
                        snippet: 'You may cause any part of your body to glow with light. If your entire body is emitting light, it sheds enough light to see in a 10m radius.',
                    },
                    {
                        name: 'Camouflage',
                        snippet: 'As a Simple Action you can control the appearance of your hide, with the same effects as a Cameleoline Cloak (core, pg. 237).',
                    },
                    {
                        name: 'Facultative Bipedalism',
                        snippet: 'You may Sprint twice as fast as normal and make Athletics (S) Tests to jump or climb with +Double Rank Bonus Dice.',
                        modifications: [ addModifier('skills', SKILLS.ATHLETICS, 0, 2, 'when jumping or climbing.') ],
                    },
                    {
                        name: 'Hypersensetive Quills',
                        snippet: 'Your quills act as an Auspex (core, pg. 236) with a range of 30m.',
                    },
                    {
                        name: 'Wings',
                        snippet: 'You can Fly at Speed 7',
                    },
                    {
                        name: 'Weaponised Biology',
                        snippet: '',
                        description: '<p>Your Unarmed Strikes deal (S)+4 Damage / +3 ED, and have one of the following Traits:</p>' +
                            '<ul>' +
                            '<li>Brutal</li>' +
                            '<li>Rending (Rank)</li>' +
                            '<li>Inflict (Poison (Rank))</li>' +
                            '<li>Parry</li>' +
                            '</ul>',
                    },
                ],
            },
            {
                name: 'Primitive Preferences',
                snippet: 'Weapons without thee PRIMITIVE or a shared keyword with the character are treated as having the Unwieldy(2) Weapon Trait.',
            },
            {
                name: 'Despise for Armour',
                snippet: 'If a Kroot wears armour with an AR of 4 or more, the DN of all Tests using the Strength, Agility, or Initiative Attribute increase by an amount equal to the AR of the armour.',
            },
        ],
        backgroundSection: [
            background('Pech Native: Raised amongst the jungles of the Kroot homeworld Pech, you are accustomed to a primitive life, and may have fought alongside the enigmatic T’au.','Max Wounds', 'Origin'),
            background('Void Born: Born aboard a warsphere, your nomadic life has been one of constant excursions on strange worlds and bizarre meals. You have met (and devoured) many minor Species, and now little surprises you.','Max Shock', 'Origin'),
            background('Prodigal Carnivore: Mercenary work has been lucrative and has offered many opportunities to improve yourself, though you long for the day you can return to your kindred and pass on the rich genetic traits you have gained.','Wealth', 'Origin'),
            //
            background('Primitive Victor: Relying on your mutations, you managed to defeat a more technologically advanced foe. You are staunch in your beliefs that biological strength far outweighs any mechanical advantage.','Determination', 'Accomplishment'),
            background('Sole Survivor: Through caution, courage, cowardice, or simple luck, you survived when the rest of your kindred was slain. You have been made strong by survival and are now free to consume any prey you find.','Resolve', 'Accomplishment'),
            background('Contract Secured: Through shrewd diplomacy (and likely a little intimidation) you negotiated a deal that allowed you to fight alongside another Species against powerful foes.','Influence', 'Accomplishment'),
            //
            background('Return Home: Though you have learned much and consumed many foes on your sojourn from your homeworld, you long to return to Pech, and will stop at nothing to do so.','Conviction', 'Goal'),
            background('Become Strong: You have the utmost respect for the goals of your Species. You will journey to any location and fight any foe in your quest to become stronger.','Max Wounds', 'Goal'),
            background('Discovery: You have had a small taste of the vastness of the galaxy, and believe that there are secrets still hidden that could further advance the Kroot — you will be the one to discover them.','Determination', 'Goal'),
        ],
        objectives: [
            'Speculate on how you could evolve to better cope with the current situation.',
            'Point out how the advanced technology of another Species has made them weak.',
            'Relate the wisdom of your Shaper to the current situation.',
            'Use the environment to put yourself in a more advantageous situation.',
            'Make an evaluation on how someone you meet would taste.',
            'Consume the flesh of the strong.',
        ],
    },
];
