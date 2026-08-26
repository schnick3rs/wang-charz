import {requireAttribute, requireKeyword, requireSkill, requireSpecies, requireTier, talent} from "./utils";

export const red1 = [
    {
        ...talent('red1',60,'Absolute Incineration',20,'Combat,Melta,Damage'),
        snippet: 'When you use a weapon with the Melta Trait at Short Range, increase both the ED and AP by +Rank.',
        description: '<p>When you use a weapon with the <em>Melta</em> Trait at Short Range, increase both the ED and AP by +Rank.</p>',
    },
    {
        ...talent('red1',60,'Anatomical Scourge',20,'Combat,Melta,Damage'),
        snippet: 'You gain +2ED when making Called Shots.',
        description: '<p>When you use a weapon with the <em>Melta</em> Trait at Short Range, increase both the ED and AP by +Rank.</p>',
        requirements: [
            requireSkill('medicae', 2),
        ],
    },
    {
        ...talent('red1', 60, 'Angel Of Mercy', 10, ''),
        snippet: 'Add +Rank to your Medicae (Int) dice pool to determine how many Wounds you can remove in a Regroup of an hour or longer. ',
        description:
            '<p>Add +Rank to your Medicae (Int) dice pool to determine how many Wounds you can remove in a Regroup of an hour or longer. You can split the number of Wounds you remove between multiple characters, rather than a single target.</p>',
        requirements: [
            requireSkill('medicae', 2),
        ],
        modifications: [
            { targetGroup: 'skills', targetValue: 'medicae', modifier: 2, condition: 'When determining wound removal during a Regroup'  },
        ],
    },
    {
        ...talent('red1', 60, 'Animal Wrangler', 10, ''),
        snippet: 'You gain +Double Rank bonus dice on any social Skill Test against a target with the BEAST Keyword. You may use Survival for those social skill tests.',
        description:
            '<p>You gain +Double Rank bonus dice on any social Skill Test against a target with the BEAST Keyword. ' +
            '<p> You may choose to use the Survival (Wil) Skill for any social Skill Tests against these targets.</p>',
        requirements: [
            requireSkill('survival', 2),
        ],
        modifications: [
            { targetGroup: 'skills', targetValue: 'survival', modifier: 0, rank: 2, condition: 'when rolling social against BEASTS' },
        ],
    },
    {
        ...talent('red1', 61, 'Arch-Perfromer', 10, ''),
        snippet: 'Perform art before an enthusiast, gain +Rank bonus dice to social skills targeting them fro the rest of the scene. Gain +Double Rank for a skill Test for a performance itself. Performing during Regroup reduces Shock to zero.',
        description:
            '<p>You have devoted your body to a creative endeavour you perform live before an audience. As well as providing personal fulfilment, it occasionally provides an excellent distraction.</p>' +
            '<p> Choose a type of performance appropriate for the 41st Millennium — choral singing, organ playing, hagiographic recital, ritual dance, etc. You excel at this art form or craft.</p>' +
            '<p>If an enthusiast of the arts witnesses your performance, you gain +Rank bonus dice to social Skills targeting them for the rest of the scene.</p>' +
            '<p>If you ever undertake a skill Test to determine the success of the performance itself — rolling Deception (Fel) to attract attention away from companions, for example — you gain +Double Rank bonus dice on the Test.</p>' +
            '<p>If you have a chance to practise your performing art during a Regroup, you reduce your Shock to zero</p>'
    },
    {
        ...talent('red1', 61, 'Arsonist', 10, ''),
        snippet: 'Inflicting On Fire, victims suffer additional +Rank Mortal Wounds at start of your turn. DN of Athletics (S) Test for your victims also increased by +Rank',
        description:
            '<p>You keep starting fires, and they burn long into the night. When you inflict the On Fire Condition, your victims suffer an additional +Rank Mortal Wounds at the start of each of your Turns.' +
            'The DN for the Athletics (S) Test for your victims to remove the Condition is also increased by +Rank.</p>',
    },
    {
        ...talent('red1', 61, 'Assault Doctrine', 30, ''),
        snippet: 'Receive Bolt Pistol, Astartes Chainsword (page 49), Aquilla Mark VII armour, and Jump Pack. Gain +Rank AP on any melee, or any ranged weapon with the Pistol Trait.',
        description:
            '<p>You fight at the vanguard of any advance, shrieking across the battlefield to bring the might of your Astartes physiology to bear.</p>' +
            '<p>You receive a Bolt Pistol, Astartes Chainsword (page 49), Aquilla Mark VII armour, and Jump Pack, if you don’t already have them.</p>' +
            '<p>You gain additional +Rank AP on any melee weapon you wield, or any ranged weapons with the Pistol Trait.</p>' +
            '<p>An Agent Ascending from Tier 2 to Tier 3 may purchase this Talent instead of an Ascension Package.</p>',
        requirements: [
            requireTier(3),
            requireSpecies('Adeptus Astartes'),
        ],
    },
    {
        ...talent('red1', 61, 'A Feast in Famine', 10, ''),
        snippet: 'During Regroup: anyone eating food you cooked, besides yourself, removes all Shock.',
        description:
            '<p>You are a talented and resourceful cook, able to make a satisfying repast from meagre ration packs, hunted local fauna, or scavenged scraps, raising the spirits of your comrades.</p>' +
            '<p>When you prepare food for your allies during a Regroup, anyone who partakes in the meal besides yourself removes all Shock.</p>',
    },
    {
        ...talent('red1', 61, 'Battle-Psyker', 20, ''),
        snippet: 'When targeting a target with a psychic power, their resistance test DN is increased by +Rank',
        description:
            '<p>You wield your powers with unstoppable force, compelling your victims to submit to your will.</p>' +
            '<p>When you successfully use a psychic power that forces targets to take a Test to resist its effects, the DN of that Test is increased by +Rank.</p>',
        requirements: [
            requireSkill('psychicMastery', 4),
        ],
    },
    {
        ...talent('red1', 61, 'Blademaster', 20, ''),
        snippet: 'Every weapon you use with BLADE keyword gains the Parry Trait, gain additional +Rank Defence against melee attacks.',
        description:
            '<p>You have mastered the art of blocking and riposting, giving you the edge when you clash swords with an opponent. Any weapons you use with the BLADE Keyword gain the Parry Trait.</p>' +
            '<p>When using a weapon that already has the Parry Trait (whether it has the BLADE Keyword or not), you gain additional +Rank Defence against melee attacks.</p>',
        requirements: [
            requireSkill('weaponSkill', 2),
        ],
    },
    {
        ...talent('red1', 61, 'Bloodhound', 10, ''),
        snippet: 'Nominate a target until your next Regroup, gain +Rank bonus dice to Survival (Wil) Tests to track the target or any test against it',
        description:
            '<p>Once you have the scent of a potential target, nothing short of their death or yours can end your pursuit.</p>' +
            '<p>You may nominate a single creature or individual as the target of this Talent — you cannot switch targets until the next Regroup.</p>' +
            '<p>You gain +Rank bonus dice to Survival (Wil) Tests to track the target, and any attack Tests you make against the target.</p>' ,
    },
    {
        ...talent('red1', 62, 'Bolter Discipline', 10, ''),
        snippet: 'Using a weapon with the BOLT keyword, gain Rapid Fire (2) Trait, if it already has the trait add +Rank to its rating',
        description:
            '<p>Your Bolter spits forth a storm of iron that pulverises threats in an unyielding sequence of explosions.</p>' +
            '<p>When you use a weapon with the BOLT Keyword, it gains the Rapid Fire (2) Trait. If the weapon already has the Rapid Fire Trait, add +Rank to the weapon’s Rapid Fire rating.</p>',
        requirements: [
            requireKeyword('ADEPTUS ASTARTES'),
        ],
    },
    {
        ...talent('red1', 62, 'Bombardier', 20, ''),
        snippet: 'Weapons with Blast Trait increase their Blast rating by +Double Rank. Against Mobs (or when using theatre of mind) this increases the number of targets hit by +Rank',
        description:
            '<p>Your munitions are modified to be extra explosive and pitched at the perfect arc to cause maximum carnage.</p>' +
            '<p>Any weapons you use with the Blast Trait increase their Blast rating by +Double Rank. Against Mobs (or when using a simplified theatre of the mind approach) this therefore increases the number of targets hit by +Rank.</p>',
    },
    {
        ...talent('red1', 62, 'Born Survivor', 10, ''),
        snippet: 'You can use Survival (Wil) instead of Medicae (Int) to remove your own Wounds, Shock or Conditions. You do not suffer the usual DN penalties for using this ability on yourself.',
        description:
            '<p>You are aggressively self-reliant, substituting your culture’s folk remedies for formal medical training.</p>' +
            '<p>You can use Survival (Wil) instead of Medicae (Int) to remove your own Wounds, Shock, or Conditions (Wrath & Glory, page 124). You do not suffer the usual DN penalties for using this ability on yourself.</p>',
        requirements: [
            requireSkill('survival', 2),
        ],
    },
    {
        ...talent('red1', 62, 'Built Tough', 10, ''),
        snippet: 'Any weapons you carry with the Heavy (X) Trait halve their Heavy rating.',
        description:
            '<p>You have the squat, sturdy physique and temperament to manage heavy loads without complaint.</p>' +
            '<p>Any weapons you carry with the Heavy (X) Trait halve their Heavy rating.</p>',
        requirements: [
            requireAttribute('strength', 3),
            requireAttribute('toughness', 3),
        ],
    },
    {
        ...talent('red1', 62, 'Bullet Hell', 20, ''),
        snippet: 'Any weapons with the PROJECTILE Keyword increase their Salvo rating by +Rank',
        description:
            '<p>You discharge a hailstorm of lead from your shooter, spent bullet casings puddling around your feet. Any weapons you carry with the PROJECTILE Keyword increase their Salvo rating by +Rank.</p>',
    },
    {
        ...talent('red1', 62, 'Chainsaw Warrior', 10, ''),
        snippet: 'When using a weapon with CHAIN Keyword, you may re-roll any ED dice you choose, but must accept the second result.',
        description:
            '<p>Whatever the spinning teeth of your Chainblade doesn’t catch on the first rotation is shredded on the next pass.</p>' +
            '<p>When you use a weapon with the CHAIN Keyword, you may re-roll any ED dice you choose, but must accept the second result.</p>',
    },
    {
        ...talent('red1', 62, 'Concealed Cavity', 10, ''),
        snippet: 'Declare an item, no larger than a small knife, concealed. Normal searches will never reveal it. Searches involving technology, you gain +Double Rank bonus dice to your Stealth (A) test. Retrieving the weapon gives +Double Rank bonus on the attack Test the same turn.',
        description:
            '<p>You have a tiny compartment hidden on your person, either inside an augmetic or carved into your flesh.</p>' +
            '<p>You can declare that you are concealing an item inside your compartment — this item can be no larger than a small knife, recording device, or miniaturised auspex. Normal searches of your person will never reveal this cavity, but if the search involves the use of technology, you gain +Double Rank bonus dice on Stealth (A) Tests to conceal it.</p>' +
            '<p>If you retrieve a weapon from the compartment and attack with it on the same Turn, you gain +Double Rank bonus dice on the attack Test.</p>',
    },
    {
        ...talent('red1', 62, 'Counter-Curse', 10, ''),
        snippet: 'Gain +Rank on Tests to Deny The Witch. Once per session use it as Reflexive Action',
        description:
            '<p>Your allies tolerate your presence as a necessary evil, to prevent the enemy witches from thwarting their work.</p>' +
            '<p>You gain +Rank on Tests to Deny The Witch (Wrath & Glory, pages 267-268). Once per session, you can Deny The Witch as a Reflexive Action.</p>',
        requirements: [
            requireSkill('psychicMastery', 2),
        ],
    },
    {
        ...talent('red1', 63, 'Deathworld Veteran', 10, ''),
        snippet: 'Choose one environmental hazard. Gain +Rank on Toughness Tests to resist the hazard’s effects, and +Double Rank to Medicae (Int) and Survival (Wil) Tests to adapt protections against that hazard.',
        description:
            '<p>You were raised or campaigned on one of the deadliest worlds in the Imperium, and survived only by adapting your body to resist its environmental hazards..</p>' +
            '<p>Choose one environmental hazard: suffocation, extreme heat, extreme cold, radiation, poisons, or another option at the GM’s discretion (Wrath & Glory, pages 201-202). You gain +Rank on Toughness Tests to resist the hazard’s effects, and +Double Rank to Medicae (Int) and Survival (Wil) Tests to adapt protections against that hazard.</p>' +
            '<p>You can purchase this Talent multiple times, choosing a different environmental hazard each time.</p>',
        requirements: [
            requireAttribute('toughness', 3),
        ],
    },
    {
        ...talent('red1', 63, 'Dedicate The Kill', 10, ''),
        snippet: 'Sacrifice your Move, nominate an Elite or Adversary in line of sight. Gain 1 faith if you kill your target in melee.',
        description:
            '<p>You are a devout believer that only offerings of flesh and blood can appease your God.</p>' +
            '<p>In combat, you may sacrifice your Move for the Turn to nominate an Elite or Adversary in line of sight as your target. You may nominate a new target by sacrificing another Move, but this replaces the previous target.</p>' +
            '<p>If you personally kill your target in melee combat, you regain 1 Faith.</p>',
        requirementsString: 'at least 1 Faith',
    },
    {
        ...talent('red1', 63, 'Deductive Genius', 10, ''),
        snippet: 'Spend 1 Glory at any time for a clue on the fastest way to proceed with your current mission',
        description:
            '<p>You are renowned for incredible leaps of logic, as though the voice of the God-Emperor whispers truths into your ear.</p>' +
            '<p>You can spend 1 Glory at any time for a clue on the fastest way to proceed with your current mission. The GM will give you an honest answer, but will not give you brand new information unless it can be plausibly extrapolated from what you already know. More likely, they will direct you to an individual or location where new information can be found, but this may take you into further danger!</p>' +
            '<p>Your GM may invite you to suggest how you reached this conclusion, or even help determine the most direct way forward..</p>',
        requirements: [
            requireSkill('investigation', 3),
        ],
    },
    {
        ...talent('red1', 63, 'Deflect Shot', 10, ''),
        snippet: 'The Parry trait applies to ranged attacks with POWERFIELD and FORCE weapons. Enemies hit themselves in case of a miss with a complication. Has no effect against area effect weapons.',
        description:
            '<p>You are a devout believer that only offerings of flesh and blood can appease your God.</p>' +
            '<p>In combat, you may sacrifice your Move for the Turn to nominate an Elite or Adversary in line of sight as your target. You may nominate a new target by sacrificing another Move, but this replaces the previous target.</p>' +
            '<p>If you personally kill your target in melee combat, you regain 1 Faith.</p>',
        requirements: [
            requireAttribute('initiative', 4),
        ],
    },
    {
        ...talent('red1', 63, 'Devastator Doctrine', 30, ''),
        snippet: 'Receive a Aquilla Mark VII armour if you do not have one. Receive one weapon: Heavy Bolter, Heavy Flamer, Lascannon, Missile Launcher, Multi-Melta or Plasma Cannon. Gain +Rank AP when using this weapon. May be purchased instead of an Ascnsion Package when Ascending from Tier 2 to Tier 3.',
        description:
            '<p>An Astartes who becomes a full Battle-Brother usually starts off as a Devastator Marine, learning to master warfare from the relative safety of long range.</p>' +
            '<p>You receive a suit of Aquilla Mark VII armour, if you don’t already have one, and any one of the following weapons:</p>' +
            '<ul class="mb-2">' +
            '<li>Heavy Bolter</li>' +
            '<li>Heavy Flamer</li>' +
            '<li>Lascannon</li>' +
            '<li>Missile Launcher</li>' +
            '<li>Multi-Melta</li>' +
            '<li>Plasma Cannon</li>' +
            '</ul>' +
            '<p>You gain additional +Rank AP when using this weapon.</p>' +
            '<p>An Agent Ascending from Tier 2 to Tier 3 may purchase this Talent instead of an Ascension Package.</p>',
        requirements: [
            requireTier(3),
            requireSpecies('Adeptus Astartes'),
        ],
    },
    {
        ...talent('red1', 64, 'De-Escalator', 10, ''),
        snippet: 'Called shots to Disarm with an Uarmed Strike do not suffer DN penalties. The DN for your opponent’s Strength Test is equal to the Damage you’d have inflicted.',
        description:
            '<p>You can disarm people with your bare hands, preventing someone you just want to talk to from making a mistake they’ll regret.</p>' +
            '<p>When making a Shot To Disarm with an Unarmed Strike, you do not suffer DN penalties for a Called Shot (Wrath & Glory, pages 186-187). The DN for your opponent’s Strength Test is equal to the Damage you’d have inflicted, instead of half of it.</p>',
        requirements: [
            requireSkill('weaponSkill', 2) ,
        ],
    },
    {
        ...talent('red1', 64, 'Death From Above', 20, ''),
        snippet: '+Rank bonus dice to attack Tests made from higher ground. You can climb vertically at the same Speed as horizontal Movement without an Athletics (S) Test. Roll Determination against Mortal Wounds from falling.',
        description:
            '<p>You take a three-dimensional approach to every battle, searching for higher ground you can quickly scale and drop down from.</p>' +
            '<p>You gain +Rank bonus dice to attack Tests made from higher ground.</p>' +
            '<p>You can climb vertically at the same Speed as horizontal Movement without an Athletics (S) Test.</p>' +
            '<p>You can roll Determination against Mortal Wounds from falling ( Wrath & Glory, page 201).',
        requirements: [
            requireSkill('athletics', 3) ,
        ],
    },
    {
        ...talent('red1', 64, 'Dig In Deep', 10, ''),
        snippet: 'Double Defence bonus from cover. If enemies target you by Shoot Through Cover gain +Rank Resilience.',
        description:
            '<p>You are an expert of defensive warfare, making maximum use of cover to reinforce your position.</p>' +
            '<p>When targeted by enemy attacks whilst concealed by cover, you gain +2 Defence (instead of +1) if less than half of you is concealed, and +4 Defence (instead of +2) if more than half of you is concealed.</p>' +
            '<p>If enemies target you by Shoot Through Cover (Wrath & Glory, page 189) gain +Rank Resilience.</p>',
        requirements: [
            requireSkill('athletics', 3) ,
        ],
    },
    {
        ...talent('red1', 64, 'Disarming Stare', 10, ''),
        snippet: 'When you succeed on an Interaction Attack using Intimidation, your enemy is Staggered, in addition to other effects.',
        description:
            '<p>With a few choice words, or even just a look, you can slow an enemy’s charge as they think better of picking a fight with you.</p>' +
            '<p>When you succeed on an Interaction Attack using Intimidation (Wrath & Glory, page 190), your enemy is Staggered, in addition to other effects.</p>' ,
        requirements: [
            requireSkill('intimidation', 2) ,
        ],
    },
    {
        ...talent('red1', 64, 'Disciple Of The Holy Trinity', 30, ''),
        snippet: 'You add +Rank to the Damage of any weapons you use with the BOLT, FIRE or MELTA Keywords',
        description:
            '<p>The Sisters of Battle venerate the Holy Trinity of bolter, flamer and melta above all other weapons, and veterans of their Order are rewarded with the most exceptional versions of such sacred tools.</p>' +
            '<p>You add +Rank to the Damage of any weapons you use with the BOLT, FIRE or MELTA Keywords</p>' ,
        requirements: [
            requireKeyword('ADEPTA SORORITAS'),
        ],
    },
    {
        ...talent('red1', 64, 'Disruptive Launch', 10, ''),
        snippet: 'Spend Shifts to inflict Hindered(1) in Melee when equipped with a Jump Pack. Spend more Shifts to target more enemies (1 per Shift).',
        description:
            '<p>You employ short bursts of your Jump Pack as suppressive fire, protecting you from retaliatory assaults.</p>' +
            '<p>When equipped with a Jump Pack, you can spend a Shift on successful melee attack Tests to inflict the Hindered (1) Condition on an enemy you’re engaged with. Additional Shifts can be spent to target 1 additional enemy per Shift, or increase the DN penalty of a victim’s Hindered Condition by 1 per Shift.</p>' ,
        requirements: [
            requireKeyword('ADEPTA SORORITAS,ADEPTUS ASTARTES,AELDARI,HERETIC ASTARTES,ORK'),
        ],
    },
    {
        ...talent('red1', 64, 'Enviable Grace', 10, ''),
        snippet: 'Difficult terrain does not reduce speed. Fall Back is now a Move. Immune to Staggered. No restrictions on replacement Movement options when you remove the Prone Condition as a Free Action. +Double Rank bonus dice to remove restrained. May be able to insert yourself into otherwise  impassable spaces',
        description:
            '<p>You are a dextrous contortionist, twirling around restrictions to navigate your environment with enviable grace.</p>' +
            '<p>Difficult terrain does not reduce your Speed. You may Fall Back as a Move instead of a Combat Action.</p>' +
            '<p>You are immune to the Staggered Condition. You suffer no restrictions on replacement Movement options when you remove the Prone Condition as a Free Action. You gain +Double Rank bonus dice on Tests to remove the Restrained Condition.</p>' +
            '<p>At the GM’s discretion, you may be able to insert yourself into otherwise impassable spaces.</p>' ,
        requirements: [
            requireAttribute('agility', 3),
        ],
    },
    {
        ...talent('red1', 65, 'Fashionista', 10, ''),
        snippet: 'When requisitioning clothing: For a single mission gain bonus dice on social Skill Tests equal to the Rarity of the Clothing.',
        description:
            '<p>You remain on the cutting edge of Gothic fashion, delighting in any opportunity to make a memorable entrance.</p>' +
            '<p>When you requisition Clothing (Wrath & Glory, pages 236-237), you gain bonus dice on social Skill Tests equal to the Rarity of the Clothing, in situations where your appearance would make a positive impression. You only gain this benefit for the duration of a single mission — after that reappearing in the same outfit again provides no advantage, and you must requisition new Clothing to regain the bonus.</p>',
        requirementsString: 'Wealth 2+',
    },
    {
        ...talent('red1', 65, 'Fast Draw', 10, ''),
        snippet: 'Draw a weapon as a Free Action or Reaction. In combat, any attacks you make against enemies who have not yet taken a Turn gain +Double Rank bonus dice on the attack Test',
        description:
            '<p>You blindside your enemies by drawing and firing whilst they are still preparing for combat.</p>' +
            '<p>You may draw a weapon as a Free Action or Reaction. In combat, any attacks you make against enemies who have not yet taken a Turn gain +Double Rank bonus dice on the attack Test.</p>',
    },
    {
        ...talent('red1', 65, 'Feint Attack', 10, ''),
        snippet: 'You can use Weapon Skill to make Interaction Attacks against enemies you are Engaged with',
        description:
            '<p>You disorient enemies with distraction attacks, setting them up for follow-up hits.</p>' +
            '<p>You can use Weapon Skill to make Interaction Attacks against enemies you are Engaged with (Wrath & Glory, page 190).</p>',
        requirements: [
            requireSkill('weaponSkill', 2) ,
        ],
    },
    {
        ...talent('red1', 65, 'First Response', 10, ''),
        snippet: 'Once per combat, you can make a Medicae (Int) Test to remove Wounds, Shock or a Condition as a Simple Action instead of a Combat Action.',
        description:
            '<p>You have an unerring knack for being in the right place at the right time when someone needs patching up.</p>' +
            '<p>Once per combat, you can make a Medicae (Int) Test to remove Wounds, Shock or a Condition as a Simple Action instead of a Combat Action.</p>',
        requirements: [
            requireSkill('medicae', 2) ,
        ],
    },
    {
        ...talent('red1', 65, 'Forbidden Knowledge', 10, ''),
        snippet: 'Gain forbidden knowledge. See page 65 Redacted Records',
        description:
            '<p>Through curiosity or ill-fortune, you have learned secrets your Imperium does not want you to know.</p>' +
            '<p>Choose a proscribed subject you have unsanctioned knowledge of: for example, daemons, heretical beliefs, a specific alien species, even a secretive Faction you don’t have the Keyword for (such as INQUISITION, ADEPTUS ASTRA TELEPATHICA or OFFICIO ASSASSINORUM). Alternatively, with your GM’s consent, you can detail a little known and dangerous secret — the true allegiances of a powerful Patron, the fate of the Absolver Chapter Command, etc.</p>' +
            '<p>You gain +Double Rank bonus dice on Tests that benefit from your forbidden knowledge. However, GMs may spend Complications rolled on these Tests to award themselves 2 Ruin instead of 1.</p>' +
            '<p>Your forbidden knowledge may increase the DN on resistance Tests to learn more tantalising truths about the subject, such as social Skills used by individuals with the relevant Keyword, or Corruption Tests.</p>' +
            '<p>Whilst your knowledge makes you a useful asset to some, it makes you a dangerous liability to others. Caveat emptor!</p>',
        requirements: [
            requireKeyword('IMPERIUM'),
        ],
    },
    {
        ...talent('red1', 65, 'Force Of Will', 10, ''),
        snippet: 'You gain +Double Rank bonus dice on Willpower Tests to continue sustaining psychic powers when you suffer damage',
        description:
            '<p>To those who risk their souls tangling with daemons, traumas of the flesh are a distant concern.</p>' +
            '<p>You gain +Double Rank bonus dice on Willpower Tests to continue sustaining psychic powers when you suffer damage (Wrath & Glory, page 265).</p>',
        requirements: [
            requireSkill('psychicMastery',2),
        ],
    },
    {
        ...talent('red1', 65, 'Honed to Lethality', 20, ''),
        snippet: 'When using a weapon with the POWER FIELD Keyword, increase the AP by +Rank.',
        description:
            '<p>You have refined the edge of your weapon’s power field into the perfect armour-shredding tool.</p>' +
            '<p>When using a weapon with the POWER FIELD Keyword, increase the AP by +Rank.</p>',
        requirements: [],
    },
    {
        ...talent('red1', 66, 'Identify Weakness [Awareness]', 20, ''),
        snippet: 'As a Combat Action: Make a Awareness(int) vs an Elite or Adversary to give your allys + Double Rank ED against it',
        description:
            '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
            '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
        requirements: [
            requireSkill('awareness', 3),
        ],
    },
    {
        ...talent('red1', 66, 'Identify Weakness [Insight]', 20, ''),
        snippet: 'Make an Insight(Fel) test vs an Elite or Adversary you talk to, to give your allys + Double Rank ED against them',
        description:
            '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
            '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
        requirements: [
            requireSkill('insight', 3),
        ],
    },
    {
        ...talent('red1', 66, 'Identify Weakness [Investigation]', 20, ''),
        snippet: 'Make an Investigation(Int) Test vs an Elite or Adversary who you surveiled or investigated for a day, to give your allys + Double Rank ED against them',
        description:
            '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
            '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
        requirements: [
            requireSkill('investigation', 3),
        ],
    },
    {
        ...talent('red1', 66, 'Identify Weakness [Scholar]', 20, ''),
        snippet: 'As a Combat Action: Make a Scholar(Int) Test an Elite or Adversary to give your allys + Double Rank ED against them',
        description:
            '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
            '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
        requirements: [
            requireSkill('scholar', 3),
        ],
    },
    {
        ...talent('red1', 66, 'Imposing Presence', 20, ''),
        snippet: 'Use Strength Attribute instead Willpower Attribute for Intimidation (Wil) Tests. Gain +Rank bonus dice if wearing armor with the HEAVY Keyword. Only applies if target can see you.',
        description:
            '<p>You leverage your sheer physical size and weight as an implicit threat if you don’t get your way. You can substitute your Willpower Attribute rating for' +
            'your Strength Attribute rating on Intimidation (Wil) Tests. You also gain +Rank bonus dice to Intimidation (Wil) Tests if wearing armour with the HEAVY' +
            'Keyword. These effects only apply when the target of your Intimidation can see you.</p>',
        modifications: [
            { targetGroup: 'skills', targetValue: 'intimidation', modifier: 0, rank: 1, condition: 'when wearing HEAVY armour' },
        ],
    },
    {
        ...talent('red1', 66, 'Improvised Weaponry', 10, ''),
        snippet: 'Craft a simple melee weapon or firearm. See Redacted Records page 65 and 66 for details.',
        description:
            '<p>You are never truly disarmed, as long as you have access to raw materials and crafting time.</p>' +
            '<p>You may make a Survival (Wil) or Tech (Int) Test to fashion a crude weapon, with a profile from the table on page 65. By default this takes 8 minutes. The DN is usually 3 for a melee weapon, or 5 for a simple firearm, but may increase depending on the availability of tools and materials.</p>' +
            '<p>Shifts on this Test can be spent to:</p>' +
            '<ul class="mb-2">' +
            '<li>Half the crafting time (this option may be chosen more than once).</li>' +
            '<li>Increase the weapon Damage by +Rank.</li>' +
            '<li>Remove the Unwieldy Trait.</li>' +
            '<li>Add one of the following Traits: Inflict (On Fire), Inflict (Poisoned 3), Inflict (Restrained), Parry, Pistol, Silent. This option may be chosen more than once, selecting a different Trait each time.</li>' +
            '<li>Double all weapon Ranges (Simple Firearm only).</li>' +
            '</ul>' +
            '<p>Players should provide details about the weapon they craft, which may affect its Keywords and possibly the range of available Traits you can spend Shifts on.</p>' +
            '<table>' +
            '<tr>' +
            '<th>Name</th>' +
            '<th>Damage</th>' +
            '<th>ED</th>' +
            '<th>AP</th>' +
            '<th colspan="3">Range</th>' +
            '<th>Salvo</th>' +
            '<th>Traits</th>' +
            '</tr>' +
            '<tr>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th></th>' +
            '<th>Sht</th>' +
            '<th>Med</th>' +
            '<th>Lng</th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>' +
            '<tr>' +
            '<td>Melee Weapon</td>' +
            '<td>(S) +2</td>' +
            '<td>2</td>' +
            '<td>-</td>' +
            '<td>-</td>' +
            '<td>-</td>' +
            '<td>-</td>' +
            '<td>-</td>' +
            '<td>Unwieldy (2)</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Simple Firearm</td>' +
            '<td>6</td>' +
            '<td>1</td>' +
            '<td>-</td>' +
            '<td>6</td>' +
            '<td>12</td>' +
            '<td>18</td>' +
            '<td>-</td>' +
            '<td>Unwieldy (2)</td>' +
            '</tr>' +
            '</table>',
        requirements: [
            requireSkill('survival', 2),
            requireSkill('tech', 2),
        ],
    },
    {
        ...talent('red1', 66, 'Investigative Omophagy', 10, ''),
        snippet: 'When eating flesh of a sentient creature, you may ask the GM one question. The GM will answer as honest as the consumed creature\'s memories can provide.',
        description:
            '<p>Through flesh-tasting rituals and psycho- conditioning, you have learned to reliably extract useful intelligence by absorbing the memories of what you consume.</p>' +
            '<p>When you eat the flesh of a sentient creature, you may ask the GM one question. The GM will provide as honest an answer as the consumed creature’s memories can provide, but be aware that this answer may be skewed by the target’s personal perspective.' +
            'In addition, you may choose a Skill. Until the next Regroup, when Testing that Skill, you use the Attribute+Skill dice pool of the creature you consumed instead of your own. Consuming the flesh of a Heretic requires a Corruption Test with a DN of at least 4 (higher at the GM’s discretion).</p>' +
            '<p>Extracting a creature’s flesh requires the target to be incapacitated first, and using this Talent requires a Combat Action. Due to extreme psychological disorientation of blending another creature’s memories with your own, you cannot re-use this Talent until after the next Regroup.</p>',
        requirementsString: 'Must have functioning Omophagea (Space Marine Implant 8).',
        requirements: [
            {
                condition: 'must',
                type: 'species',
                value: [ 'Adeptus Astartes', 'Primaris Astartes' ],
            },
        ],
    },
];
