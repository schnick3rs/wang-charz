import {requireAttribute, requireKeyword, requireSkill, requireSpecies, requireTier, talent} from "./utils";
import {stringToKebab} from "../utils";

export const voab = [
    {
        ...talent('voab',44,'Adaptive Strategy',20),
        key: stringToKebab('voab adaptive strategy'),
        snippet: 'Wrath spent on Narrative Declarations may not be lost if you roll an Icon.',
        description:
            '<p>Informed by your Chapter doctrines or the Codex Astartes, you can overcome whatever obstacles emerge on your path to victory. Your battle plans are comprehensive, and what you cannot plan for, you overcome with cunning improvisation.</p>' +
            '<p>When spending a point of Wrath to make a Narrative Declaration, you may roll a die if the GM approves your declaration. If this die rolls an Icon, the point of Wrath is not spent. If the die rolls an Exalted Icon, the results of the Narrative Declaration are more impressive than usual, and the Wrath point is not spent.</p>' +
            '<p>A Narrative Declaration can easily be upscaled by adding a few dice to Tests involving it, increasing the number of items or personnel involved, or even adding one or more ED dice to damage resulting from it.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Intellect Rating 4+',
        requirements: [
            requireAttribute('intellect', 4),
            requireKeyword('Adeptus Astartes'),
        ],
    },
    {
        ...talent('voab',45,'Armour of Contempt',30),
        key: stringToKebab('voab armour of contempt'),
        snippet: 'Spend Wrath to roll Determination against Mortal Wounds.',
        description:
            '<p>No fell sorcery or malign xenotechnology is sufficient to overcome your armour, for you are clad in righteous faith as well as ceramite. You may spend a point of Wrath to roll Determination against Mortal Wounds as if a standard source of damage inflicted them.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Willpower Rating 5+, Must have received the Black Carapace',
        requirements: [
            requireAttribute('willpower', 5),
            requireKeyword('Adeptus Astartes'),
        ],
    },
    {
        ...talent('voab',45,'Bolter Discipline',20),
        key: stringToKebab('voab bolter discipline'),
        snippet: 'BOLT weapons gain Rapid Fire (2) or +Rank to Rapid Fire.',
        description:
            '<p>Your Bolter spits forth a storm of iron that pulverises threats in an unyielding sequence of explosions. When you use a weapon with the BOLT Keyword, it gains the Rapid Fire (2) Trait. If the weapon already has the Rapid Fire Trait, add +Rank to the weapon\'s Rapid Fire rating.</p>',
        requirementsString: 'Adeptus Astartes Keyword',
        requirements: [
            requireKeyword('Adeptus Astartes'),
        ],
    },
    {
        ...talent('voab',45,'Codex Innovator',20),
        key: stringToKebab('voab codex innovator'),
        snippet: '+Rank dice to Leadership and Persuasion for your plans; gain bonus Wrath for planning.',
        description:
            '<p>Since the return of Roboute Guilliman, the Codex Astartes has slowly been recognised as a living document which the greatest tacticians may contribute and iterate upon. Your own studious knowledge of the Codex Astartes and years of service allow you to quickly adapt and evolve strategies on the battlefield in line with its tenets. While it may be decades or centuries before your tactics receive the necessary approval to be disseminated to other Chapters for consideration and adoption, your brethren know your strategic insight, as do all those who witness you in battle.</p>' +
            '<p>When executing a strategic plan or tactic that you helped create, you add + (Rank) dice to all Leadership (Wil) and Persuasion (Fel) Tests to guide others through the details. In addition, if you have at least one hour to plan for an upcoming encounter or mission, you receive one bonus Wrath point that can only be spent on a Narrative Declaration (Wrath & Glory Core Rulebook, page 164) relevant to your plan. This Wrath point can carry over between sessions, but you may never possess more than one bonus Wrath point from this Talent.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Intellect 5+, Ultramarines or Ultramarines Successor Chapter',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('intellect', 5)
        ],
    },
    {
        ...talent('voab',45,'Codex Duelist',20),
        key: stringToKebab('voab codex duelist'),
        snippet: 'First Rank amount of Wounds inflicted require 2 Icons each to soak.',
        description:
            '<p>You are a practitioner of one of the many duelling schools derived from the Codex Astartes teachings and the martial traditions of your Chapter. Precise movements ensure your blade arrives with maximum force and no time to dodge or brace against its killing edge.</p>' +
            '<p>When a Threat attempts to roll Determination against damage you inflict with a melee weapon, the first (Rank) Wounds inflicted require 2 Icons each on the Determination Test to eliminate, although the Threat still only suffers 1 Shock for each Wound reduced.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Weapon Skill 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('weaponSkill', 4)
        ],
    },
    {
        ...talent('voab',46,'Echo of Sanguinius',10),
        key: stringToKebab('voab echo of sanguinius'),
        snippet: 'After Respite, ask GM a question about your mission.',
        description:
            '<p>The violent and horrific death of the Blood Angels’ Primarch at the hands of Warmaster Horus haunts all of Sanguinius’ sons to this day. Those most afflicted eventually succumb to the Black Rage, haunted by the psychic echoes of that fateful battle. Still, there are more benign manifestations — including the one to which you have become a witness.</p>' +
            '<p>A fragment of the visionary spirit of your Primarch lives within you, granting you knowledge of the past and future. You may declare you have had a vision after a Respite (Wrath & Glory Core Rulebook, page 196). If you do, ask the GM one question about events related to your mission. The GM must answer truthfully, although they do not need to tell the whole truth and may be cryptic in their response. However, after your vision, the closeness to Sanguinius’ spirit haunts you. If you have the PRIMARIS Keyword, you are affected by the Blood Angels gene-seed flaw (Wrath & Glory Core Rulebook, pages 71-73) despite your refined origin. Otherwise, increase the DN of the Willpower Test to avoid becoming Frenzied to 5.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Blood Angels or Blood Angels Successor Chapter',
        requirements: [
            requireKeyword('Adeptus Astartes'),
        ],
    },
    {
        ...talent('voab',46,'Fear Made Manifest',20),
        key: stringToKebab('voab fear made manifest'),
        snippet: 'Enemies within 10m who can see you suffer +1 DN to all tests.',
        description:
            '<p>When unleashing your wrath in battle, the fury of an Astartes warrior is written across your features. You may make an Intimidation (Wil) Test as a Reflexive Action in combat upon encountering any new foes, including at the start of a battle. Apply the results of the Test to each enemy individually (so a Test that rolls four Icons could intimidate a Cultist requiring DN 3, but not their Traitor Astartes master with a DN of 7). You can only attempt to intimidate a given character in this manner once per encounter.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Fear Talent',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireKeyword('Fear'),
        ],
    },
    {
        ...talent('voab',46,'Gene-Wrought Might',20),
        key: stringToKebab('voab gene-wrought might'),
        snippet: 'Automatic Icon on physical tests. Physical tests take half as long.',
        description:
            '<p>The power of your modified physiology enables you to perform incredible feats of raw strength, and failure in such endeavours is a stranger to you. You may add an automatic Icon to your results when making a Test involving physical might, such as an Athletics (S) Test to lift a chunk of debris pinning a wounded ally. Additionally, any such Tests take half as long as usual.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Strength 6+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('strength', 6)
        ],
    },
    {
        ...talent('voab',47,'Chainsaw Warrior',10),
        key: stringToKebab('voab chainsaw warrior'),
        snippet: 'Reroll damage dice with CHAIN weapons',
        description:
            '<p>Whatever the spinning teeth of your Chainblade doesn’t catch on the first rotation is shredded on the next pass. When you use a weapon with the CHAIN Keyword, you may re-roll any ED dice you choose, but must accept the second result.</p>',
        requirementsString: 'None',
        requirements: [
        ],
    },
    {
        ...talent('voab',46,'Built Tough',10),
        key: stringToKebab('voab built tough'),
        snippet: 'You may use Survival instead of Medicae to remove your own Wounds, Shock, or Conditions.',
        description:
            '<p>You are aggressively self-reliant, substituting your culture’s folk remedies for formal medical training. You can use Survival (Wil) instead of Medicae (Int) to remove your own Wounds, Shock, or Conditions (Wrath & Glory, page 124). You do not suffer the usual DN penalties for using this ability on yourself.</p>',
        requirementsString: 'Survival Rating 2+',
        requirements: [
            requireSkill('survival', 2)
        ],
    },
    {
        ...talent('voab',47,'Gilead Combat Veteran',20),
        key: stringToKebab('voab gilead combat veteran'),
        snippet: 'You have fought across the Gilead System. Once per encounter, you can make a Narrative Declaration without GM permission.',
        description:
            '<p> You have fought across the length and breadth of the Gilead System, striking the fear of the Emperor into foes in every corner of the system. Once per encounter, when making a Narrative Declaration (Wrath & Glory Core Rulebook, p164), you do not need the GM’s permission to possess routine clearance codes, briefing information, or facts about enemy disposition and numbers. This does not allow you to influence what is physically present in a scene, only to have the ability to access otherwise hidden information by virtue of your extensive experience. </p>',
        requirementsString: 'Adeptus Astartes Keyword, Absolvers Chapter or vast experience in the Gilead System',
        requirements: [
            requireKeyword('Adeptus Astartes'),
        ],
    },
    {
        ...talent('voab',47,'Hammer of Wrath',20),
        key: stringToKebab('voab hammer of wrath'),
        snippet: 'You may spend one Wrath to make any attack you make as part of a flying Charge deal Mortal Wounds for damage.',
        description:
            '<p>The wargear of the Assault Companies is as familiar to you as your battle-brothers themselves, and you have mastered their use on the battlefield. When equipped with a Jump Pack (Wrath & Glory Core Rulebook, page 237), you may spend one Wrath to make any attack you make as part of a flying Charge deal Mortal Wounds for damage. </p>',
        requirementsString: 'Adeptus Astartes Keyword, Pilot Rating 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('pilot', 4)
        ],
    },
    {
        ...talent('voab',47,'Inner Circle Secrets',20),
        key: stringToKebab('voab inner circle secrets'),
        snippet: 'You are immune to Fear and Intimidation from CHAOS sources. Add +Rank to Resolve tests and Determination rolls against psychic powers.',
        description:
            '<p>The Dark Angels and their Successors sometimes cryptically refer to themselves as the “Unforgiven,” and even the lay brethren of these Chapters do not fully understand why. It is a secret wreathed in myth and metaphor, obscured by Chapter mysteries to which only a few are privy. Those who learn the truth, or are sufficiently trusted by their superiors, are inducted into the Inner Circle and told the reality of the Legion’s ancient split and fall from grace, giving them a unique perspective on fallibility and failure.</p>' +
            '<p>As one entrusted with these secrets — perhaps by Interrogator-Chaplain Caphziel aboard the Varonius Flotilla — or who discovered the terrible truth in the field, you are prepared to face the worst forms of betrayal. Ever vigilant, you do not need to pay a point of Glory to be considered aware of an ambush (Wrath & Glory Core Rulebook, page 177), and reduce by 2 the DN of Cunning (Fel) and Scholar (Int) Tests to unearth or learn of betrayal and those who would engage in it.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Dark Angels Chapter or Dark Angels Successor Chapter, Willpower 5+, must have been entrusted with or discovered the secret of the Fallen',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('willpower', 5)
        ],
    },
    {
        ...talent('voab',47,'The Imperium’s Sword',20),
        key: stringToKebab('voab the imperium’s sword'),
        snippet: 'You may move an additional +(Rank) metres when you charge. +1 ED to Charge attacks, +2 ED against Mobs.',
        description:
            '<p>Always first to the fray, you hurl yourself into combat like a whirlwind of vengeance. You may move an additional +(Rank) metres when you charge. In addition, the attack you make as part of a Charge gains +1 ED, or +2 ED when attacking a Mob.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Athletics Rating 3+, Weapon Skill 3+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('athletics', 3),
            requireSkill('weaponSkill', 3)
        ],
    },
    {
        ...talent('voab',48,'Legacy of the Primarch',20),
        key: stringToKebab('voab legacy of the primarch'),
        snippet: 'Choose a Legion trait related to your Chapter\'s Primarch. Gain +Double Rank bonus to associated rolls.',
        description:
            '<p>You are a true inheritor of the legacy of your progenitor, bearing the fruits of their genetic, martial, and spiritual heritage in full. For some Astartes, this means countless hours of study of the Codex Astartes to master Guilliman’s teachings. In contrast, for others, it means embracing the spirit of the wolf within or replacing the frailty of flesh with the surety of iron. What it means for you depends on your Chapter and the First Founding Legion from which you descend, but it enables you to perform incredible feats, the likes of which only a mighty champion of your gene line could manage.</p>' +
            '<p>This Talent has a variable effect depending on your [CHAPTER] Keyword. If you are playing a Chapter with an unknown succession (Wrath & Glory Core Rulebook, page 71), use the Keyword from which you drew your Chapter Traits at character creation.</p>',
        requirementsString: 'Adeptus Astartes Keyword, [Chapter] Keyword',
        requirements: [
            requireKeyword('Adeptus Astartes'),
        ],
        selected: '',
        optionsPlaceholder: 'Select your Chapter',
        options: [
            {
                key: 'blood-angels',
                name: 'Blood Angels',
                description: 'Once per game session, you may draw on the fury in your gene-seed to reduce the DN of a melee attack Test by (Rank).'
            },
            {
                key: 'dark-angels',
                name: 'Dark Angels',
                description: 'Once per game session, you may draw on your natural perception and insight to reduce the DN of an Investigation(Int) Test you make by (Rank).'
            },
            {
                key: 'imperial-fists',
                name: 'Imperial Fists',
                description: 'Once per game session, you may draw on your knowledge of siege warfare to reduce by (Rank) either the DN of a Test made to attack a building, fortification, or enemy in cover, or the DN of a Test related to architectural engineering.'
            },
            {
                key: 'iron-hands',
                name: 'Iron Hands',
                description: 'Once per game session, you may draw on the blessed strength of technology to reduce the DN of a Willpower Test by an amount equal to the number of augmetics you possess.'
            },
            {
                key: 'raven-guard',
                name: 'Raven Guard',
                description: ' Once per game session, you may draw on your cunning and swiftness to reduce the DN of a Stealth (A) Test by (Rank).'
            },
            {
                key: 'salamanders',
                name: 'Salamanders',
                description: 'Once per game session, you may draw upon your familiarity with the hazards of Nocturne to reduce by (Rank) either the DN of a Test made to attack using a weapon with the FIRE or MELTA Keywords or the DN of a Determination Test made against damage with a source with the FIRE or MELTA Keywords.'
            },
            {
                key: 'space-wolves',
                name: 'Space Wolves',
                description: 'Once per game session, you may draw on the senses granted to you by the Canis Helix to reduce the DN of an Awareness (Int) Test by (Rank).'
            },
            {
                key: 'ultramarines',
                name: 'Ultramarines',
                description: 'Once per game session, you may draw on the teachings of the Codex Astartes to reduce the DN of any single Test by 1.'
            },
            {
                key: 'white-scars',
                name: 'White Scars',
                description: 'Once per game session, you may draw on the riding traditions of Chogoris to reduce the DN of a Pilot (A) Test by (Rank).'
            },
        ],
    },
    {
        ...talent('voab',49,'Mortal Understanding',10),
        key: stringToKebab('voab mortal understanding'),
        snippet: '+Double Rank to social skills when interacting with unaugmented humans. Reduce penalties for intimidating presence.',
        description:
            '<p>You have lived among the unaugmented Humans of Nocturne, perhaps alongside your distant kin. As such, you find it easier to relate to the ordinary citizens of the Imperium than most Astartes. Therefore, you reduce the DN of Fellowship-based Tests by 2 when interacting with Humans. In addition, once you have made a successful Fellowship-based Test to influence or calm someone frightened by your Infernal Inheritance Chapter Trait (Wrath & Glory Core Rulebook, page 74), you may waive future penalties when interacting with that individual.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Salamanders Chapter or Salamanders Successor Chapters, Fellowship Rating 2+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('fellowship', 2)
        ],
    },
    {
        ...talent('voab',49,'Pain Glove Endurant',30),
        key: stringToKebab('voab pain glove endurant'),
        snippet: 'You may roll Determination against Agonizing damage and gain +Rank to these rolls.',
        description:
            '<p>Having regularly engaged in the tradition of the Pain Glove familiar to the scions of Dorn, you have pitted your will against relentless pain. You typically prove the victor in such battles and have learned to disregard fear and suffering as unworthy distractions. As a result, you ignore penalties to Tests caused by pain. In addition, you are immune to Fear.  </p>',
        requirementsString: 'Adeptus Astartes Keyword, Imperial Fists Chapter or Imperial Fists Successor Chapters, Willpower 5+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('willpower', 5)
        ],
    },
    {
        ...talent('voab',49,'Rapid Assault',20),
        key: stringToKebab('voab rapid assault'),
        snippet: 'You can fire Assault weapons while Sprinting without an increased DN.',
        description:
            '<p> You can maintain a steady volley of fire while swiftly advancing. You can fire ranged weapons with the Assault Trait (Wrath & Glory Core Rulebook, page 208) as part of a Sprint (Wrath & Glory Core Rulebook, page 180) without an increased DN.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Athletics Rating 2+, Ballistic Skill 3+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('athletics', 2),
            requireSkill('ballisticSkill', 3)
        ],
    },
    {
        ...talent('voab',49,'Raiding Master',10),
        key: stringToKebab('voab raiding master'),
        snippet: '+Rank to raid/ambush planning and execution. +Rank to detect/prevent enemy raids/ambushes.',
        description:
            '<p>Not only are the White Scars masters of raiding warfare, but they also have an ancient hatred of raiders who dare strike against the Imperium. Conflicts against Drukhari and Traitor Astartes alike have long nourished this hatred. As few others have done, you have mastered raiding warfare by careful study and hard-won experience. You gain +(Rank) dice to all Tests to plan and execute a raid or ambush. You also gain the same bonus to Tests to detect or prevent enemies from raiding or ambushing you and your allies.</p>',
        requirementsString: 'Adeptus Astartes Keyword, White Scars Chapter or White Scars Successor Chapters, Initiative Rating 5+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('initiative', 5)
        ],
    },
    {
        ...talent('voab',49,'Scion of the Forge',20),
        key: stringToKebab('voab scion of the forge'),
        snippet: '+Rank to Tech tests when working on weapons/armor. Items you craft gain +1 to one profile stat.',
        description:
            '<p>Through ritual study, you have mastered the machine spirits, not just of your wargear but of various tech patterns and obscure devices. What you do not know you learn swiftly, applying your vast knowledge with practised pragmatism and efficiency. When making a Tech Test to analyse or repair a piece of advanced Imperial machinery or wargear, add +Rank dice.</p>',
        requirementsString: 'Iron Hands or Salamanders Keyword, Tech 3+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('tech', 4)
        ],
    },
    {
        ...talent('voab',49,'Skilled Rider',20),
        key: stringToKebab('voab skilled rider'),
        snippet: '+Rank to Pilot tests with bikes/speeders. Reduce difficult terrain penalties when mounted.',
        description:
            '<p>Atop one of your Chapter’s iron steeds, you are capable of feats of daring speed that can see you ride through the teeth of an enemy barrage unharmed. When riding a combat bike, Land Speeder, or similarly swift Astartes vehicle, enemies who make ranged attacks against you or your vehicle increase their DN by +2. This penalty only applies if you moved at least 10m in your previous turn.  </p>',
        requirementsString: 'Adeptus Astartes Keyword, Pilot Rating 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('pilot', 4)
        ],
    },
    {
        ...talent('voab',50,'Spirit of the Pack',10),
        key: stringToKebab('voab spirit of the pack'),
        snippet: '+(double Rank) dice to Tests involving natural wildlife. Creatures treat you as if you caused Fear (DN = Rank +2).',
        description:
            '<p> You count not only the warriors of your Chapter as battle-brothers but the beasts of Fenris and many other worlds. Such is your intuitive understanding of feral beasts that you can almost communicate with them. Therefore, when making a Test to interact with or influence natural wildlife (including xeno-fauna), you may add +(double Rank) dice. In addition, such creatures are reluctant to attack you, treating you as if you caused Fear with a DN equal to (Rank +2).</p>',
        requirementsString: 'Adeptus Astartes Keyword, Space Wolves Chapter or Space Wolves Sucessor Chapter, Survival Rating 3+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('survival', 3)
        ],
    },
    {
        ...talent('voab',50,'Strength from Steel',20),
        key: stringToKebab('voab strength from steel'),
        snippet: 'You rely on your augmetics to bolster your resilience. Once per session, ignore a source of damage that would inflict Wounds equal to or less than the number of augmetics you have installed.',
        description:
            '<p>You are aware of the frailties and weaknesses of flesh and have learned to bolster yourself by relying instead on your blessed augmetics. Once per session, you may ignore a source of damage that would inflict Wounds equal to or less than the number of augmetics you have installed.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Iron Hands Chapter or Iron Hands Successor Chapter, Toughness Rating 5+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('toughness', 5)
        ],
    },
    {
        ...talent('voab',49,'Transhuman Physiology',40),
        key: stringToKebab('voab transhuman physiology'),
        snippet: 'When an attack deals less than (Rank) Wounds, convert them to Shock. You receive one less Shock per instance of conversion, to a minimum of 1.',
        description:
            '<p>Your constitution is such that no blade, bolt, or other weapon can keep you down for long. When an attack deals less than (Rank) Wounds to you, you may immediately choose to convert them to Shock as if you had automatically received (Rank) Icons while rolling Determination. In addition, when converting Wounds to Shock through this method or with standard Determination rolls, you receive one less Shock per instance of conversion, to a minimum of 1.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Toughness Rating 6+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('toughness', 6)
        ],
    },
    {
        ...talent('voab',50,'Uncompromising Fire',20),
        key: stringToKebab('voab uncompromising fire'),
        snippet: 'When you use Storm of Fire combat option, negate the -2 ED penalty and add +Rank bonus dice to the attack.',
        description:
            '<p>Combat is so routine to you that it has receded to a reflexive level, freeing your conscious mind to perform other tasks. </p>' +
            '<p>On your turn in combat, you may complete an additional Simple Action that does not involve significant physical motion, such as making an Awareness (Int) Test to spot a hidden enemy or giving orders with Leadership (Wil), but not reloading a weapon or kicking down a barricade. This restriction only applies to the bonus Simple Action gained from this Talent.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Initiative Rating 5+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('initiative', 5)
        ],
    },
    {
        ...talent('voab',50,'Whirlwind of Rage',20),
        key: stringToKebab('voab whirlwind of rage'),
        snippet: 'When making a Charge, you may shift up to (Rank) Exalted Icons for +2 ED each instead of the standard +1 ED.',
        description:
            '<p>Raw gene-enhanced muscle mass aids your brutal charges, driven by a hatred of the unclean. When attacking part of a Charge, you may shift up to (Rank) Exalted Icons for +2 ED each instead of the standard +1 ED.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Athletics Rating 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('athletics', 4)
        ],
    },
    {
        ...talent('voab',50,'Wise Orator',30),
        key: stringToKebab('voab wise orator'),
        snippet: 'You carry an air of authority and wisdom. Decrease DN to persuade or influence loyal Imperial citizens and soldiers when making a Leadership Test. Litany of Battle effects last one additional turn.',
        description:
            '<p>You carry an air of authority and wisdom any faithful servant of the Emperor can recognise. Those who stop and listen to you are invariably impressed by insight, decreasing the DN to persuade or influence loyal Imperial citizens and soldiers when making a Leadership Test. If using the optional NPC Attitudes rules (Wrath & Glory Core Rulebook, page 168), you can treat all Neutral NPCs as having a Helpful Attitude.</p>' +
            '<p>In addition, your sermons carry particular weight with your Astartes brethren. When reciting a Litany of Battle (page 57), any affected targets other than yourself retain the benefits of the Litany for an additional turn after you cease to sustain the Litany. This effect stacks with any similar products from Potency.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Leadership Rating 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill  ('leadership', 4)
        ],
    },
    {
        ...talent('voab',50,'Wraith-Slipping',10),
        key: stringToKebab('voab wraith slipping'),
        snippet: 'Once per combat, become hidden to any observer not within 5m. Gain +Rank to your next attack if undetected.',
        description:
            '<p> In the traditions of the Raven Guard, many esoteric physical and mental exercises prepare battlebrothers for stealth operations. They are collectively known as “wraith-slipping,” and you are versed in every single one. As a result, you may ignore penalties to Stealth (A) Tests from your size, wargear, or lack of camouflage.</p>',
        requirementsString: 'Adeptus Astartes Keyword, Raven Guard Chapter or Raven Guard Sucessor Chapter, Agility Rating 5+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireAttribute('agility', 5)
        ],
    },
    {
        ...talent('voab', 58, 'Litany of Hate', 0),
        key: stringToKebab('voab litany of hate'),
        snippet: 'Spend 1 Faith: ADEPTUS ASTARTES within 20m may re-roll (Rank) dice showing 1-3 on melee attacks.',
        description:
            '<p>Invoking the psycho-conditioning of your brethren, you prime the Space Marines around you to fight with zeal and fervour until their foes are nought but ruin and corpses.</p>' +
            '<p>Spend 1 Faith to affect targets with the ADEPTUS ASTARTES Keyword within 20m range of the Chaplain. Those affected may re-roll (Chaplain’s Rank) dice with a result of 1, 2, or 3 whenever making a melee attack.</p>' +
            '<p>By spending a further point of Faith, to further enhance the effect, affected targets may re-roll an additional die on melee attacks, and the effect lasts for an additional round so long as the Chaplain remains in sight and can be heard.</p>',
        requirementsString: 'Adeptus Astartes',
        requirements: [ requireKeyword('Adeptus Astartes') ],
    },
    {
        ...talent('voab', 58, 'Litany of Faith', 10),
        key: stringToKebab('voab litany of faith'),
        snippet: 'Targets within 20m may roll Determination for Mortal Wounds as if typical damage.',
        description:
            '<p>You inspire those around you to stand fast, as enduring in flesh as they are in faith. Affected targets within 20m may roll Determination for Mortal Wounds as if they were typical damage.</p>' +
            '<p>By spending a further point of Faith, the effect of this Litany is enhanced and affected targets may reroll a single Determination die against Mortal Wounds.</p>',
        requirementsString: 'Adeptus Astartes',
        requirements: [ requireKeyword('Adeptus Astartes') ],
    },
    {
        ...talent('voab', 58, 'Catechism of Fire', 20),
        key: stringToKebab('voab catechism of fire'),
        snippet: 'Targets within 20m gain +2 ED to ranged damage vs closest threat. +3 ED with extra Faith.',
        description:
            '<p>Exhorting your comrades to expend every bolt and ounce of fuel they have in the utter destruction of oncoming foes, you direct their armaments towards nearby enemies so that you might destroy a threat before it can close to melee.</p>' +
            '<p>When you begin reciting this Litany, you designate the threat closest to you. Affected targets within 20m gain an additional +2 ED for damage for each hit applied to the designated threat when making ranged attacks.</p>' +
            '<p>By spending an additional point of Faith, the affected targets instead gain +3ED to damage for each hit applied to the threat.</p>',
        requirementsString: 'Adeptus Astartes, Leadership 4+',
        requirements: [
            requireKeyword('Adeptus Astartes'),
            requireSkill('leadership', 4)
        ],
    },
    {
        ...talent('voab', 58, 'Exhortation of Rage', 15),
        key: stringToKebab('voab exhortation of rage'),
        snippet: 'Targets within 20m add +1 ED to melee damage. Extra Faith: +1 die to melee attacks, lasts extra round.',
        description:
            '<p>Denouncing the unrighteous, you call upon your allies to face down the foes of Mankind with steel in their hearts and their hands. Affected targets within 20m add +1 ED to damage on successful melee attacks.</p>' +
            '<p>By spending a further point of Faith, affected targets gain +1 die to melee attack Tests, and the effects of the Litany lasts for an additional round, even if the Chaplain moves out of range, or can no longer be heard.</p>',
        requirementsString: 'Adeptus Astartes, Frenzy Talent',
        requirements: [ requireKeyword('Adeptus Astartes'),
            // notworking requireKeyword('Frenzy')
        ],
    },
    {
        ...talent('voab', 58, 'Sword of the Emperor', 20),
        key: stringToKebab('voab sword of the emperor'),
        snippet: 'Single Astartes within 20m: next melee hit inflicts Mortal Wounds equal to your Rank.',
        description:
            '<p>Whether reciting words only you can hear or announcing your faith in a deafening bellow, your words ring in the ears of an ally, upon them your blessing bestows them the vigour of the Emperor and His fiery wrath.</p>' +
            '<p>A single affected target with the Astartes Keyword, within 20m, inflicts with their next melee attack, if it hits, a number of Mortal Wounds equal to your Rank.</p>' +
            '<p>By spending a further point of Faith the effect of this Litany is sustained for a further round.</p>',
        requirementsString: 'Adeptus Astartes, Orthopraxy Talent',
        requirements: [ requireKeyword('Adeptus Astartes'),
            // notworking requireKeyword('Orthopraxy')
        ],
    },
    {
        ...talent('voab', 58, 'Recitation of Focus', 15),
        key: stringToKebab('voab recitation of focus'),
        snippet: 'Targets within 20m extend weapon ranges by short range, reduce cover/vision penalties by 1.',
        description:
            '<p>You chant a stern and steady prayer that guides your brethren to focus and clarity, enabling their shots to hit even the most distant and mysterious foes through the chaos of the battlefield.</p>' +
            '<p>Affected targets within 20m range extend all the ranges of their ranged weapons by their short range. Affected targets reduce the bonus due to cover conferred to a threat by 1, and reduce Vision Penalties by 1.</p>' +
            '<p>By spending an extra point of Faith, affected targets may reroll a number of attack dice equal to your Rank, including the Wrath die.</p>',
        requirementsString: 'Adeptus Astartes, Ballistic Skill 6+',
        requirements: [ requireKeyword('Adeptus Astartes'), requireSkill('ballisticSkill', 6) ],
    },
    {
        ...talent('voab', 60, 'Hellblaster Doctrine', 60),
        key: stringToKebab('voab hellblaster doctrine'),
        snippet: 'Primaris Intercessor: Receive a Plasma Incinerator, Assault Plasma Incinerator, or Plasma Pistol. +Rank AP with this weapon. Ignore first Complication damage with Supercharge. Can trade bonus ED for Spread.',
        description: `
      <p>Primaris Astartes may specialise in particular forms of warfare and death-dealing. Hellblasters focus upon the use of heavy weaponry, like their Devastator kin. However, thanks to the innovations and arcane technologies of Archmagos Dominus Belisarius Cawl, Hellblasters wield variants of Plasma Incinerators.</p>
      <ul>
        <li>If you don’t already have one, you receive one of the following weapons: Plasma Incinerator, Assault Plasma Incinerator, or Plasma Pistol.</li>
        <li>You gain an additional +Rank AP when using this weapon.</li>
        <li>During an adventure, you may ignore the first instance of damage inflicted due to a Complication when firing a Plasma weapon using the Supercharge option.</li>
        <li>When firing a Plasma weapon using Supercharge, you may trade the bonus Extra Damage for the Spread trait (still at risk of Complication damage as normal).</li>
      </ul>
    `,
        requirementsString: 'PRIMARIS INTERCESSOR',
        requirements: [
            requireKeyword('Primaris Intercessor')
        ],
        wargear: [
            {
                name: 'Plasma Weapon',
                selected: '',
                options: [
                    { key: 'plasma-incinerator', name: 'Plasma Incinerator' },
                    { key: 'assault-plasma-incinerator', name: 'Assault Plasma Incinerator' },
                    { key: 'plasma-pistol', name: 'Plasma Pistol' }
                ]
            }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'selected', meta: { apBonus: 'Rank' } }
        ]
    },

    // Eradicator Doctrine
    {
        ...talent('voab', 60, 'Eradicator Doctrine', 60),
        key: stringToKebab('voab eradicator doctrine'),
        snippet: 'Primaris Intercessor: Receive Mark X Gravis armour and Melta Rifle or Heavy Melta Rifle. +Rank AP with this weapon. Spend Glory for extra ED with melta.',
        description: `
      <p>Similar to their Hellblaster brothers, Eradicators offer fire support to battleline units. Rather than volleys of plasma, Eradicators stride forward in thick Gravis plate, employing the advance melta weaponry of Belisarius Cawl to sunder armour and fortifications alike.</p>
      <ul>
        <li>You receive Mark X Gravis armour if you don’t already have it and one of the following weapons: Melta Rifle or Heavy Melta Rifle.</li>
        <li>You gain additional +Rank AP when using this weapon.</li>
        <li>When rolling the Extra Damage dice for an attack made with a melta weapon, you may spend one Glory, up to your Rank Bonus, to add an Extra Damage dice per point of Glory spent to the damage dealt.</li>
      </ul>
    `,
        requirementsString: 'PRIMARIS INTERCESSOR',
        requirements: [
            requireKeyword('Primaris Intercessor')
        ],
        wargear: [
            { key: 'mark-x-gravis-armour', name: 'Mark X Gravis Armour' },
            {
                name: 'Melta Weapon',
                selected: '',
                options: [
                    { key: 'melta-rifle', name: 'Melta Rifle' },
                    { key: 'heavy-melta-rifle', name: 'Heavy Melta Rifle' }
                ]
            }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'selected', meta: { apBonus: 'Rank' } }
        ]
    },

    // Heavy Intercessor Doctrine
    {
        ...talent('voab', 60, 'Heavy Intercessor Doctrine', 60),
        key: stringToKebab('voab heavy intercessor doctrine'),
        snippet: 'Primaris Intercessor: Receive Mark X Gravis armour and Heavy Bolt Rifle or Heavy Bolter. +Rank AP with this weapon. Gain Bolter Discipline Talent.',
        description: `
      <p>While Eradicators and Hellblasters are deployed to tackle heavily armoured troops and vehicles with their searing energy weapons, Heavy Intercessors lay down a withering storm of bolter rounds to tear through troops.</p>
      <ul>
        <li>You receive Mark X Gravis armour if you don’t already have it and one of the following weapons: Heavy Bolt Rifle or Heavy Bolter.</li>
        <li>You gain additional +Rank AP when using this weapon.</li>
        <li>You gain the Bolter Discipline Talent.</li>
      </ul>
    `,
        requirementsString: 'PRIMARIS INTERCESSOR',
        requirements: [
            requireKeyword('Primaris Intercessor')
        ],
        wargear: [
            { key: 'mark-x-gravis-armour', name: 'Mark X Gravis Armour' },
            {
                name: 'Heavy Bolter Weapon',
                selected: '',
                options: [
                    { key: 'heavy-bolt-rifle', name: 'Heavy Bolt Rifle' },
                    { key: 'heavy-bolter', name: 'Heavy Bolter' }
                ]
            }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'selected', meta: { apBonus: 'Rank' } },
            { targetGroup: 'talents', targetValue: 'voab-bolter-discipline', meta: { name: 'Bolter Discipline' } }
        ]
    },

    // Assault Intercessor Doctrine
    {
        ...talent('voab', 60, 'Assault Intercessor Doctrine', 60),
        key: stringToKebab('voab assault intercessor doctrine'),
        snippet: 'Primaris Intercessor: Receive Heavy Bolt Pistol and Astartes Chainsword. +Rank AP with these. Gain Chainsaw Warrior Talent.',
        description: `
      <p>With Eradicators, Hellblasters, and Heavy Intercessors shredding the enemy with a hail of gunfire, Assault Intercessors specialise in vicious close combat. These Primaris Intercessors leap from drop pods and Impulsors into the heaving throng of the enemy and tear them asunder with whirring chainswords and staccato bolt rounds from their pistols.</p>
      <ul>
        <li>You receive if you don’t already have them: Heavy Bolt Pistol and Astartes Chainsword.</li>
        <li>You gain an additional +Rank AP when using these weapons.</li>
        <li>You gain the Chainsaw Warrior Talent.</li>
      </ul>
    `,
        requirementsString: 'PRIMARIS INTERCESSOR',
        requirements: [
            requireKeyword('Primaris Intercessor')
        ],
        wargear: [
            { key: 'heavy-bolt-pistol', name: 'Heavy Bolt Pistol' },
            { key: 'astartes-chainsword', name: 'Astartes Chainsword' }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'heavy-bolt-pistol', meta: { apBonus: 'Rank' } },
            { targetGroup: 'wargear', targetValue: 'astartes-chainsword', meta: { apBonus: 'Rank' } },
            { targetGroup: 'talents', targetValue: 'voab-chainsaw-warrior', meta: { name: 'Chainsaw Warrior' } }
        ]
    },

    // Assault Doctrine
    {
        ...talent('voab', 61, 'Assault Doctrine', 30),
        key: stringToKebab('voab assault doctrine'),
        snippet: 'Adeptus Astartes, Tier 3+: Receive Bolt Pistol, Chainsword, Mark VII Aquila Power Armour, Jump Pack. +Rank AP with melee or Pistol weapons.',
        description: `
      <p>You fight at the vanguard of any advance, howling across the battlefield to bring the might of your transhuman physiology to bear.</p>
      <ul>
        <li>You receive a Bolt Pistol, Chainsword, Mark VII Aquila Power Armour, and Jump Pack if you don’t already have them.</li>
        <li>You gain additional +Rank AP on any melee weapon you wield or any ranged weapons with the Pistol Trait.</li>
      </ul>
    `,
        requirementsString: 'Adeptus Astartes Species, Tier 3+',
        requirements: [
            requireSpecies('Adeptus Astartes'),
            requireTier(3)
        ],
        wargear: [
            { key: 'bolt-pistol', name: 'Bolt Pistol' },
            { key: 'chainsword', name: 'Chainsword' },
            { key: 'mark-vii-aquila-armour', name: 'Mark VII Aquila Power Armour' },
            { key: 'jump-pack', name: 'Jump Pack' }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'melee', meta: { apBonus: 'Rank' } },
            { targetGroup: 'wargear', targetValue: 'pistol', meta: { apBonus: 'Rank' } }
        ]
    },

    // Devastator Doctrine
    {
        ...talent('voab', 61, 'Devastator Doctrine', 30),
        key: stringToKebab('voab devastator doctrine'),
        snippet: 'Adeptus Astartes, Tier 3+: Receive Mark VII Aquila Power Armour and a heavy weapon. +Rank AP with this weapon.',
        description: `
      <p>An Astartes who becomes a full battle-brother usually starts as a Devastator Marine, mastering the strategic application of overwhelming firepower.</p>
      <ul>
        <li>You receive a suit of Mark VII Aquila Power Armour if you don’t already have one, and any one of the following weapons: Heavy Bolter, Heavy Flamer, Lascannon, Missile Launcher, Multi-Melta, Plasma Cannon.</li>
        <li>You gain additional +Rank AP when using this weapon.</li>
        <li>An Agent Ascending from Tier 2 to Tier 3 may purchase this Talent instead of an Ascension Package.</li>
      </ul>
    `,
        requirementsString: 'Adeptus Astartes Species, Tier 3+',
        requirements: [
            requireSpecies('Adeptus Astartes'),
            requireTier(3)
        ],
        wargear: [
            { key: 'mark-vii-aquila-armour', name: 'Mark VII Aquila Power Armour' },
            {
                name: 'Heavy Weapon',
                selected: '',
                options: [
                    { key: 'heavy-bolter', name: 'Heavy Bolter' },
                    { key: 'heavy-flamer', name: 'Heavy Flamer' },
                    { key: 'lascannon', name: 'Lascannon' },
                    { key: 'missile-launcher', name: 'Missile Launcher' },
                    { key: 'multi-melta', name: 'Multi-Melta' },
                    { key: 'plasma-cannon', name: 'Plasma Cannon' }
                ]
            }
        ],
        modifications: [
            { targetGroup: 'wargear', targetValue: 'selected', meta: { apBonus: 'Rank' } }
        ]
    },
]
