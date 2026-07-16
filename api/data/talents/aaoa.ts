import {requireAttribute, requireKeyword, requireSkill, requireSpecies, talent} from "./utils";

export const aaoa = [
    {
        ...talent('aaoa', 119, '`Ere We Go!', 20, ''),
        snippet: 'When you Charge, increase speed by +Rank and add +1 ED on attacks.',
        description:
            '<p>When you Charge, you increase your Speed by +Rank. In addition, you gain +1 ED on your attacks when you charge.</p>',
        requirements: [ requireSpecies('Ork') ],
        modifications: [
            { targetGroup: 'traits', targetValue: 'speed', modifier: 0, rank: 1, condition: 'when charging.' },
        ],
    },
    {
        ...talent('aaoa', 119, 'Abhor The Witch', 20, ''),
        snippet: 'Psykers targeting you suffer +Rank to Psychic Mastery DN. You do not consider Psykers your ally. ',
        description:
            '<p>When a psyker attempts to target you with a psychic power, increase the difficulty of their Psychic Mastery test by +Rank. This applies to both friendly and enemy psykers, as you consider no psyker your ally.</p>',
        requirements: [ requireKeyword('BLACK TEMPLAR') ],
    },
    {
        ...talent('aaoa', 119, 'Acolyte of Ynnead', 15, ''),
        snippet: 'Spend 1 soul token to add +Rank to Psychic Mastery tests. ',
        description:
            '<p>When you attempt a Psychic Mastery test, you may spend 1 Soul token to add +Rank bonus dice to the test.</p>',
        requirements: [
            requireSpecies('Aeldari'),
            requireKeyword('PSYKER'),
            requireKeyword('YNNARI'),
        ],
        modifications: [
            { targetGroup: 'skills', targetValue: 'psychicMastery', modifier: 0, rank: 1, condition: 'when spending a soul token.' },
        ],
    },
    {
        ...talent('aaoa', 119, 'And They Shall Know No Fear', 5, ''),
        snippet: 'You may re-roll any failures on any Resolve test you make.',
        description:
            '<p>You may re-roll any failures on any Resolve test you make.</p>',
        requirements: [
            { condition: 'must', type: 'species', value: [ 'Adeptus Astartes','Primaris Astartes' ] },
        ],
    },
    {
        ...talent('aaoa', 119, 'Armour of Contempt', 20, ''),
        snippet: 'When you roll Determination, you add +Double Rank bonus dice to the roll.',
        description:
            '<p>When you roll Determination, you add +Double Rank bonus dice to the roll.</p>',
        requirements: [
            { condition: 'must', type: 'species', value: [ 'Adeptus Astartes','Primaris Astartes' ] },
            requireAttribute('toughness', 5),
        ],
    },
    {
        ...talent('aaoa', 119, 'Armour-Monger', 20, ''),
        snippet: 'Increase Armour Rating by +Rank for your special suit of armour.',
        description:
            '<p>Select a single suit of armour you possess when you choose this Talent. When you wear that armour, increase the Armour Rating by +Rank. You must be able to spend at least an hour a day maintaining and adjusting the armour in order to gain this bonus.</p>',
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: 'resilience', rank: 1, condition: 'when wearing YOUR armour.' },
        ],
    },
    {
        ...talent('aaoa', 119, 'A Taste for Death', 10, ''),
        snippet: 'You may spend a Soul token to add +Rank bonus dice to your next attack.',
        description:
            '<p>You may spend a Soul token to add +Rank bonus dice to your next attack.</p>',
        requirements: [
            { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
            requireKeyword('YNNARI'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Avatar of Blood', 20, ''),
        snippet: 'Whenever you inflict a Critical Hit with a melee attack, you immediately recover Double Rank Shock.',
        description:
            '<p>Whenever you inflict a Critical Hit with a melee attack, you immediately recover Double Rank Shock.</p>',
        requirements: [
            requireSkill('weaponSkill', 3),
        ],
    },
    {
        ...talent('aaoa', 120, 'Back from the Brink', 20, ''),
        snippet: 'When you start Dying, you may immediately spend a Soul token to heal 1 Wound.',
        description:
            '<p>When you start Dying, you may immediately spend a Soul token to heal 1 Wound.</p>',
        requirements: [
            { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
            requireKeyword('YNNARI'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Battle Focus', 10, ''),
        snippet: 'You do not have to move in a straight line when you sprint. Further, when you Sprint, you may make a ranged attack with any weapon as if that weapon had the Assault trait. You do not suffer the normal +2DN on the attack for doing this. This does not apply to weapons with the Heavy trait.',
        description:
            '<p>You do not have to move in a straight line when you sprint. Further, when you Sprint, you may make a ranged attack with any weapon as if that weapon had the Assault trait. You do not suffer the normal +2DN on the attack for doing this. This does not apply to weapons with the Heavy trait.</p>',
        requirements: [
            requireSpecies('Aeldari'),
            requireKeyword('ASURYANI'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Blood for the Blood God', 30, ''),
        snippet: 'You gain +1d3 Corruption. After you make a melee attack, you may spend 1 Wrath to make an additional attack.',
        description:
            '<p>You gain +1d3 Corruption. After you make a melee attack, you may spend 1 Wrath to make an additional attack.</p>',
        requirements: [
            requireKeyword('CHAOS'),
            requireKeyword('KHORNE'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Bloodlust', 20, ''),
        snippet: 'Immediately after you kill an enemy with a melee attack, you may move up to half your Speed towards the next nearest enemy.',
        description:
            '<p>Immediately after you kill an enemy with a melee attack, you may move up to half your Speed towards the next nearest enemy.</p>',
    },
    {
        ...talent('aaoa', 120, 'Bolter Drill', 20, ''),
        snippet: 'When you make a successful attack with a weapon with the Bolt keyword, and you roll a 6 on your Wrath die, instead of inflicting a critical hit you may choose to spend 1 ammo and make an additional attack with that weapon immediately, at the same target or another within 2+Rank metres of the initial target. This additional attack may not generate any further attacks.',
        description:
            '<p>When you make a successful attack with a weapon with the Bolt keyword, and you roll a 6 on your Wrath die, instead of inflicting a critical hit you may choose to spend 1 ammo and make an additional attack with that weapon immediately, at the same target or another within 2+Rank metres of the initial target. This additional attack may not generate any further attacks.</p>',
        requirements: [
            requireKeyword('IMPERIAL FISTS,CRIMSON FISTS'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Brotherhood of Psykers', 10, ''),
        snippet: 'When you attempt a Psychic Mastery test, you may add +1 bonus dice for every GREY KNIGHT with this Talent within 10m of you.',
        description:
            '<p>When you attempt a Psychic Mastery test, you may add +1 bonus dice for every GREY KNIGHT with this Talent within 10m of you.</p>',
        requirements: [
            requireKeyword('GREY KNIGHTS'),
        ],
    },
    {
        ...talent('aaoa', 120, 'Bulging Biceps', 10, ''),
        snippet: 'When you wield a Heavy weapon, you are no longer knocked Prone by a Complication when firing the weapon.',
        description:
            '<p>When you wield a Heavy weapon, you are no longer knocked Prone by a Complication when firing the weapon.</p>',
        requirements: [
            requireAttribute('strength', 3),
        ],
    },
    {
        ...talent('aaoa', 120, 'Bull Charge', 10, ''),
        snippet: 'When you Charge, your melee weapons gain the Inflict (Prone) trait for that attack. This has no effect on enemies who are larger than you.',
        description:
            '<p>When you Charge, your melee weapons gain the Inflict (Prone) trait for that attack. This has no effect on enemies who are larger than you.</p>',
        requirements: [
            requireAttribute('strength', 3),
        ],
    },
    {
        ...talent('aaoa', 121, 'Catfall', 10, ''),
        snippet: 'When you fall, count the distance fallen as half the actual distance for determining how many Mortal Wounds you suffer.',
        description:
            '<p>When you fall, count the distance fallen as half the actual distance for determining how many Mortal Wounds you suffer.</p>',
        requirements: [
            requireAttribute('agility', 3),
        ],
    },
    {
        ...talent('aaoa', 121, 'Codex Discipline', 10, ''),
        snippet: 'You increase your Conviction and Resolve by +Rank.',
        description:
            '<p>You increase your Conviction and Resolve by +Rank.</p>',
        requirements: [
            requireKeyword('ULTRAMARINES'),
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: 'conviction', rank: 1 },
            { targetGroup: 'traits', targetValue: 'resolve', rank: 1 },
        ],
    },
    {
        ...talent('aaoa', 121, 'Conqueror Imperative', 20, ''),
        snippet: 'At the start of any of your turns, you may activate the Conqueror Imperative. This adds +Double Rank bonus dice to any melee attacks you attempt during that turn but increases the DN of any ranged attacks you attempt that turn by +3. At the end of a turn in which you activate the Conqueror Imperative, you suffer 1d3+2 Shock.',
        description:
            '<p>At the start of any of your turns, you may activate the Conqueror Imperative. This adds +Double Rank bonus dice to any melee attacks you attempt during that turn but increases the DN of any ranged attacks you attempt that turn by +3. At the end of a turn in which you activate the Conqueror Imperative, you suffer 1d3+2 Shock.</p>',
        requirements: [
            requireKeyword('SKITARII'),
        ],
    },
    {
        ...talent('aaoa', 121, 'Death to the False Emperor', 30, ''),
        snippet: 'When you make a successful melee attack against a character with the IMPERIUM keyword and roll a 6 on the Wrath die, you may choose to make an additional melee attack instead of inflicting a critical hit. This additional attack cannot be used to gain more attacks.',
        description:
            '<p>When you make a successful melee attack against a character with the IMPERIUM keyword and roll a 6 on the Wrath die, you may choose to make an additional melee attack instead of inflicting a critical hit. This additional attack cannot be used to gain more attacks.</p>',
        requirements: [
            requireKeyword('CHAOS'),
            requireKeyword('HERETIC ASTARTES'),
        ],
    },
    {
        ...talent('aaoa', 121, 'Death Visions', 10, ''),
        snippet: 'When you charge into melee, you may add +Rank ED to the damage of that attack. However, you increase the Difficulty of any Willpower test to resist The Red Thirst by an amount equal to your Rank, and a Complication suffered in combat may cause you to hallucinate that you are Sanguinius himself, battling traitors in the Horus Heresy. Primaris Space Marines who take this talent become subject to The Red Thirst despite being Primaris.',
        description:
            '<p>When you charge into melee, you may add +Rank ED to the damage of that attack. However, you increase the Difficulty of any Willpower test to resist The Red Thirst by an amount equal to your Rank, and a Complication suffered in combat may cause you to hallucinate that you are Sanguinius himself, battling traitors in the Horus Heresy. Primaris Space Marines who take this talent become subject to The Red Thirst despite being Primaris.</p>',
        requirements: [
            requireKeyword('BLOOD ANGLES'),
        ],
    },
    {
        ...talent('aaoa', 121, 'Deceptive Retreat', 20, ''),
        snippet: 'After you make a melee attack, whether successful or not, you may spend one Glory to Disengage as a free action.',
        description:
            '<p>After you make a melee attack, whether successful or not, you may spend one Glory to Disengage as a free action.</p>',
        requirements: [
            { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
        ],
    },
    {
        ...talent('aaoa', 121, 'Ded ‘Ard!', 40, ''),
        snippet: 'Your Resilience is increased by +Rank, and you add +Rank to the number of Traumatic Injuries you can suffer before dying.',
        description:
            '<p>Your Resilience is increased by +Rank, and you add +Rank to the number of Traumatic Injuries you can suffer before dying.</p>',
        requirements: [
            requireSpecies('Ork'),
            requireAttribute('toughness', 5),
        ],
        modifications: [
            { targetGroup: 'traits', targetValue: 'resilience', rank: 1 },
        ],
    },
    {
        ...talent('aaoa', 121, 'Descent of Angels', 20, ''),
        snippet: 'If you Charge into melee while using a Jump Pack, roll a number of dice equal to Double Rank. For each 6 rolled, you inflict a single Mortal Wound upon an enemy within 2 metres of your landing. Resolve this before making the melee attack from your Charge.',
        description:
            '<p>If you Charge into melee while using a Jump Pack, roll a number of dice equal to Double Rank. For each 6 rolled, you inflict a single Mortal Wound upon an enemy within 2 metres of your landing. Resolve this before making the melee attack from your Charge.</p>',
        requirements: [
            requireKeyword('BLOOD ANGLES'),
        ],
    },
    {
        ...talent('aaoa', 122, 'Dreadful Vigour', 25, ''),
        snippet: 'You gain +1d3 Corruption. As a simple action, you may spend 1 Wrath to regain 1d3+2 Wounds.',
        description:
            '<p>You gain +1d3 Corruption. As a simple action, you may spend 1 Wrath to regain 1d3+2 Wounds.</p>',
        requirements: [
            requireKeyword('CHAOS'),
            requireKeyword('NURGLE'),
        ],
    },
    {
        ...talent('aaoa', 130, 'Anathema', 30, ''),
        snippet: 'Whenever you succeed at a melee attack against a creature with the DAEMON or PSYKER keywords, your attack inflicts mortal wounds equal to your Rank in addition to any other damage inflicted. In addition, creatures with the DAEMON keyword within a number of metres of you equal to your Willpower may not attempt to roll Determination.',
        description:
            '<p>Whenever you succeed at a melee attack against a creature with the DAEMON or PSYKER keywords, your attack inflicts mortal wounds equal to your Rank in addition to any other damage inflicted. In addition, creatures with the DAEMON keyword within a number of metres of you equal to your Willpower may not attempt to roll Determination.</p>',
        requirements: [
            requireSpecies('Pariah'),
            requireAttribute('willpower', 4),
        ],
    },
    {
        ...talent('aaoa', 138, 'Quell the Warp', 10, ''),
        snippet: 'You gain the ability to Deny the Witch (Core, pg. 267) even though you are not a psyker. Instead of a Psychic Mastery test, you make a Willpower test with a bonus of +Double Rank.',
        description:
            '<p>You gain the ability to Deny the Witch (Core, pg. 267) even though you are not a psyker. Instead of a Psychic Mastery test, you make a Willpower test with a bonus of +Double Rank.</p>',
        requirements: [
            requireSpecies('Pariah'),
            requireAttribute('willpower', 5),
        ],
    },
    {
        ...talent('aaoa', 135, 'Luminen Blast', 20, ''),
        snippet: 'You may make a ranged attack using this talent. The attack has a range of 10m, and inflicts damage equal to twice your Willpower, plus Rank ED, with the Agonizing and Spread traits, and a Salvo rating of –. Instead of reloads, this attack uses charges from your Luminen Capacitor.',
        description:
            '<p><strong>Additional prerequisite: Luminen Capacitor augmetic</strong></p>' +
            '<p>You may make a ranged attack using this talent. The attack has a range of 10m, and inflicts damage equal to twice your Willpower, plus Rank ED, with the Agonizing and Spread traits, and a Salvo rating of –. Instead of reloads, this attack uses charges from your Luminen Capacitor.</p>',
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
            requireKeyword('CULT MECHANICUS'),
            { condition: 'must', type: 'wargear', key: 'Luminen Capacitor augmetic' },
        ],
    },
    {
        ...talent('aaoa', 140, 'Witch’s Nightmare', 30, ''),
        snippet: 'Creatures possessing the DAEMON or PSYKER keywords must make a Terror test with a DN equal to 2+Rank when they encounter you, even if they’re normally immune to terror. As you cause terror to them, you are immune to fear, terror, or Intimidation Interaction attacks caused by daemons and psykers.',
        description:
            '<p>Creatures possessing the DAEMON or PSYKER keywords must make a Terror test with a DN equal to 2+Rank when they encounter you, even if they’re normally immune to terror. As you cause terror to them, you are immune to fear, terror, or Intimidation Interaction attacks caused by daemons and psykers.</p>',
        requirements: [
            requireSpecies('Pariah'),
        ],
    },



    // Excarch Powers
    {
        ...talent('aaoa2',147,'Ambush',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Striking Scorpion, Stealth 6+',
        description:
            '<p>The Exarch has a perfect sense of precision and timing, and their ambushes are virtually impossible to detect.</p>' +
            '<p>The Exarch and their squad may re-roll any Stealth tests made to set up an ambush, and enemies may not spend Ruin to become aware of the ambushing Striking Scorpions. Finally, the Exarch and any member of their squad may add +1ED to all attacks made during the first round of combat, if they are ambushing.</p>',
    },
    {
        ...talent('aaoa2',147,'Avenging Strikes',20,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Dire Avenger, Willpower 4+',
        description:
            '<p>Little can withstand the Exarch’s cold fury when they avenge their fallen.</p>' +
            '<p>If the Exarch’s squad has taken any casualties during the current day, then the Exarch and any remaining member of the squad add +2d to all melee and ranged attacks they make for the remainder of the day.</p>',
    },
    {
        ...talent('aaoa2',147,'Battle Fortune',25,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Dire Avenger',
        description:
            '<p>The Exarch is protected by fate and fortune, warded from death until their purpose is done.</p>' +
            '<p>The Exarch may Soak Mortal Wounds, and they add +3d to their Soak rolls. Further, when Soaking damage, the Exarch suffers only one Shock for every two Wounds negated.</p>',
    },
    {
        ...talent('aaoa2',147,'Blademaster',50,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill 6+',
        description:
            '<p>The Exarch’s mastery of the blade is incomparable, and few foes can overcome their defences or withstand their attacks.</p>' +
            '<p>The Exarch doubles the bonus to Defence from weapons with the Parry quality and adds +2ED to damage with all bladed melee weapons.</p>',
    },
    {
        ...talent('aaoa2',147,'Bladestorm',40,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Dire Avenger, Ballistic Skill 5+',
        description:
            '<p>Little can withstand the tempest of blades that issues forth from shuriken weapons under the Exarch’s command.</p>' +
            '<p>When the Exarch, or any member of their squad, rolls a 6 on their Wrath die when making a ranged attack with a weapon with the Shuriken keyword, they may choose to make a second attack with that weapon instead of inflicting a critical hit. These additional attacks may not generate extra attacks of their own.</p>',
    },
    {
        ...talent('aaoa2',147,'Bounding Leap',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Athletics 5+',
        description:
            '<p>The Exarch’s speed and grace are superlative, and little can match the pace at which they cross the battlefield.</p>' +
            '<p>The Exarch may use their Agility instead of their Strength for all Athletics tests, and they count their Agility is twice its normal value for the purposes of determining how far they can jump. Finally, the Exarch may disengage as a free action at the start of their turn.</p>',
    },
    {
        ...talent('aaoa2',148,'Burning Heat',25,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Fire Dragon, Toughness 5+',
        description:
            '<p>Enemies who close with the Exarch find their strength and their will to fight sapped by searing, stifling heat.</p>' +
            '<p>Whenever an enemy makes a melee attack against the Exarch or a member of the Exarch’s squad, they add +2 to the DN required to hit.</p>',
    },
    {
        ...talent('aaoa2',148,'Crack Shot',30,'' ),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Ballistic Skill 6+',
        description:
            '<p>The Exarch’s precision and lethality with ranged weapons is incomparable.</p>' +
            '<p>The Exarch may re-roll all rolls of 1 whenever they make a ranged attack.</p>',
    },
    {
        ...talent('aaoa2',148,'Crushing Blow',25,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Strength 5+',
        description:
            '<p>The Exarch’s physical might is bolstered by their will to overcome the foes arrayed before them, and little can withstand the impact of their blows.</p>' +
            '<p>The Exarch’s Strength is increased by +2 in melee.</p>',
    },
    {
        ...talent('aaoa2',148,'Deadly Touch',35,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill 6+',
        description:
            '<p>The Exarch knows the myriad ways in which living creatures can be slain, and with precision they can deliver death with but a touch.</p>' +
            '<p>When the Exarch hits with a melee attack, each ED which rolls a 6 inflicts 1 Mortal Wound, in addition to the attack’s normal damage.</p>',
    },
    {
        ...talent('aaoa2',148,'Decapitating Strikes',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill 6+',
        description:
            '<p>The Exarch’s sweeping strikes seldom fail to find their mark, leaving maimed and butchered foes in their wake mere moments after the charge.</p>' +
            '<p>When the Exarch scores a critical hit with a melee attack, the severity of that critical hit automatically increases by 2, as if two Glory had been spent. The Exarch may still spend Glory to increase the severity further, if necessary.</p>',
    },
    {
        ...talent('aaoa2',148,'Defend',50,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Dire Avenger, Weapon Skill 5+',
        description:
            '<p>The Exarch is well-versed in the principles of unyielding defence, and their squad are well-drilled to ensure that no enemy can overcome them without great sacrifice.</p>' +
            '<p>The Exarch, and their squad, increase both their Defence and Resilience by +2.</p>',
    },
    {
        ...talent('aaoa2',148,'Disarming Strike',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill 6+',
        description:
            '<p>The Exarch does not leave battle to chance and eliminates their foe’s weapon at the first opportunity.</p>' +
            '<p>The Exarch ignores the normal DN penalty for a called shot when making a melee attack, so long as they are making the called shot to disarm the opponent.</p>',
    },
    {
        ...talent('aaoa2',148,'Distract',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Athletics 5+',
        description:
            '<p>The Exarch’s motions in battle are misleading, even entrancing, leaving enemies off-balance and unable to perceive when the true attack will come.</p>' +
            '<p>Once per round, as a free action on their turn, the Exarch may make an Athletics Interaction attack.</p>',
    },
    {
        ...talent('aaoa2',148,'Dragon’s Bite',20,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Fire Dragon, Weapon Skill 5+',
        snippet: 'You and your squad may treat any weapon with the Melta keyword as if it had the Pistol trait.',
        description:
            '<p>The Exarch and their squad are adept at bringing their weapons to bear even in the closest confines.</p>' +
            '<p>The Exarch and their squad may treat their Fusion Guns or any other weapon with the Melta keyword, as if they had the Pistol trait.</p>',
    },
    {
        ...talent('aaoa2',148,'Evade',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Swooping Hawk or Shining Spear or Crimson Hunter, Agility 5+',
        description:
            '<p>Your airborne movement is difficult for the eye to follow or predict, making you and exceptionally difficult target.</p>' +
            '<p>When you move through the air – yourself, or while operating a flying vehicle – add +3 to your Defence until the start of your next turn.</p>',
    },
    {
        ...talent('aaoa2',149,'Expert Hunter',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill or Ballistic Skill 5+',
        description:
            '<p>Like the heroes of old, the Exarch is foe to the mightiest enemies on the battlefield.</p>' +
            '<p>When the Exarch makes an melee attack, or a ranged attack at close range, against a vehicle or a Monstrous Creature, they add +2ED to the attack’s damage and may re-roll any ED which result in failures.</p>',
    },
    {
        ...talent('aaoa2',149,'Fast Shot',50,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Ballistic Skill 6+',
        description:
            '<p>The Exarch is a master at making the most of their firepower, laying down lethally-accurate volleys of fire.</p>' +
            '<p>When the Exarch makes a ranged attack, they may count their weapon’s Salvo value as 2 higher than normal. In addition, when making a ranged attack, the Exarch may spend 1 Reload to make a second attack with that weapon.</p>',
    },
    {
        ...talent('aaoa2',149,'Fighting Fury',40,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Weapon Skill 6+',
        description:
            '<p>The Exarch remains in perpetual motion in melee, never missing an opportunity to strike.</p>' +
            '<p>When the Exarch makes a melee attack, they may spend 1 Glory to make a second melee attack. In addition, when the Exarch makes a multi-attack with a melee attack, halve the normal DN penalty for each target (i.e., each target adds +1DN rather than +2DN).</p>',
    },
    {
        ...talent('aaoa2',149,'Flickering Assault',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Warp Spider',
        description:
            '<p>The Exarch slips between reality and the Warp seamlessly, stepping out to strike and then withdrawing to find a new target.</p>' +
            '<p>When the Exarch, or any member of their squad, makes a multi-attack as part of a melee attack, they may count their speed as double its normal value when determining if they can reach their targets. Characters benefiting from this ability must be wearing Warp Spider Jump Generators.</p>',
    },
    {
        ...talent('aaoa2',149,'Focussed Fire',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Dark Reaper',
        description:
            '<p>The Exarch directs their attention – and their firepower – at a single foe, seeking to eliminate them utterly, regardless of other factors or distractions.</p>' +
            '<p>The Exarch may nominate a single enemy – not a mob, but any individual threat – within 35m as a priority target as a free action at the start of their turn. Until the start of the Exarch’s next turn, any ranged attacks from the Exarch or members of their squad at that priority target may re-roll any dice which roll 1 on their skill test and on their damage roll. Further, the enemy may not use any Ruin spends or special abilities which would redirect the attack to another target.</p>',
    },
    {
        ...talent('aaoa2',149,'Graceful Avoidance',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Howling Banshee',
        description:
            '<p>The Exarch’s motions make it almost impossible to land a telling blow upon them.</p>' +
            '<p>When attempting to Soak damage inflicted by a melee attack, the Exarch or a member of their squad may use their Agility instead of their Toughness to Soak, and they may Soak mortal wounds.</p>',
    },
    {
        ...talent('aaoa2',149,'Grim Visage',25,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Willpower 5+',
        description:
            '<p>The Exarch’s presence inspires feelings of foreboding and dread in their foes.</p>' +
            '<p>Characters within 12 yards of the Exarch reduce their Resolve by 1. Members of the Exarch’s squad are immune to this effect.</p>',
    },
    {
        ...talent('aaoa2',149,'Immortal Endurance',30,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Toughness 4+',
        description:
            '<p>The Exarch is supernaturally resilient and wears their armour like a second skin.</p>' +
            '<p>The Exarch’s Resilience and Soak are both increased by +2.</p>',
    },
    {
        ...talent('aaoa2',150,'Intercept',20,''),
        talentGroup: 'Exarch Powers',
        talentGroupKey: 'aaoa-exarch-powers',
        requirementsString: 'Agility 6+, Swooping Hawk',
        snippet: 'When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.',
        description:
            '<p>The Exarch is a peerless aerial combatant, effortlessly proficient at fighting opponents in the sky.</p>' +
            '<p>When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.</p>',
    },
];