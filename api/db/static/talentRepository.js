import { source } from './_sourcesRepository';

const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};

const talent = function (sourceKey, sourcePage, name, cost, tags = '') {
  return {
    source: {
      ...source[sourceKey],
      page: sourcePage,
    },
    key: `${stringToKebab(`${sourceKey} ${name}`)}`,
    name,
    cost,
    hint: '',
    tags: tags.split(',').map((k) => k.trim()),
    requirements: [],
    allowedMultipleTimes: false,
  };
};

const requireAttribute = function(key, value) {
  return { condition: 'must', type: 'attribute', key, value };
};

const requireSkill = function(key, value) {
  return { condition: 'must', type: 'skill', key, value };
};

const requireRank = function(value) {
  return { condition: 'must', type: 'character', key: 'Rank', value };
};

const requireSpecies = function(species, not = false) {
  return {
    condition: 'must',
    type: 'species',
    value: [ species ],
  };
};

const requireKeyword = function(keywords, not = false) {
  return {
    condition: not ? 'mustNot' : 'must',
    type: 'keyword',
    key: [ ...keywords.split(',') ],
  };
};


const core = [
  {
    ...talent('core',129,'Acute Sense [Sense]',20,'Skill'),
    key: 'core-acute-sense',
    snippet: 'You gain +Rank dice to Awareness Tests based on the selected sense.',
    description: '<p>Pick one of your 5 senses (sight, hearing, smell, taste, or touch). Whenever you make an Awareness Test based on that sense, you gain +Rank bonus dice.</p>',
    selected: '',
    optionsPlaceholder: 'Pick one of your 5 senses',
    options: [
      { key: stringToKebab('core acute sense sight'), name: 'Sight' },
      { key: stringToKebab('core acute sense hearing'), name: 'Hearing' },
      { key: stringToKebab('core acute sense smell'), name: 'Smell' },
      { key: stringToKebab('core acute sense taste'), name: 'Taste' },
      { key: stringToKebab('core acute sense touch'), name: 'Touch' },
    ],
    allowedMultipleTimes: true,
    modifications: [
      { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 1, condition: 'when using the selected sense.' },
    ],
  },
  {
    ...talent('core',129,'Angel Of Death',30,'Combat,Damage'),
    snippet: 'Add +Rank damage when using Astartes related Weapons. It´ more or less: Bolt, Unarmed, Chain- and Power-Weapons. (see core pg. 129 for details).',
    description:
      '<p>You are a Space Marine — one of the most feared warriors in the galaxy. You are a highly trained superhuman veteran of hundreds of battles, and have mastered the use of many deadly weapons.</p>' +
      '<p>Add +Rank to the total Damage Value of successful attacks with the following weapons:</p>' +
      '<ul class="mb-2">' +
      '<li>Chainswords</li>' +
      '<li>Chainaxes</li>' +
      '<li>Power Swords</li>' +
      '<li>Power Fists</li>' +
      '<li>Unarmed strikes</li>' +
      '<li>Bolt weapons</li>' +
      '<li>Any weapon with the <span class="text--keyword">ADEPTUS ASTARTES</span> Keyword.</li>' +
      '</ul>' +
      '<p>At the GM’s discretion, this Talent may also apply to weapons with the <span class="text--keyword">CHAOS</span> Keyword for Chaos Space Marines.</p>',
    requirements: [
      requireSpecies('Adeptus Astartes'),
      requireRank(2),
    ],
  },
  {
    ...talent('core',129,'Armourbane',20,'Combat,Melee,Damage'),
    snippet: 'Use shifts to reduce the targets resilience (1 per shift) when using BLADE, CHAIN, FORCE or POWER FIELD weapons.',
    description:
      '<p>Your furious strikes rend armour, leaving it broken and useless.</p>' +
      '<p>When you make a successful melee attack you can Shift Exalted Icons to reduce the target’s Resilience instead of adding ED. Each Exalted Icon you Shift decreases the target’s Resilience by 1. This Resilience is removed before you calculate damage from the attack.</p>' +
      '<p>Your weapon must have one of the following Keywords to activate this Talent:</p>' +
      '<ul class="mb-2">' +
      '<li><span class="text--keyword">BLADE</span></li>' +
      '<li><span class="text--keyword">CHAIN</span></li>' +
      '<li><span class="text--keyword">FORCE</span></li>' +
      '<li><span class="text--keyword">POWER FIELD</span></li>' +
      '</ul>',
    requirements: [ requireSkill('weaponSkill', 2) ],
  },
  /*{
    ...talent('core',129,'Augmetic, Very Rare',20,'Wargear'),
    snippet: 'Replace part of your biology with augmetics.',
    description:
      '<p>You replace part of your biology with an augmetic, the common name for cybernetic implants in the Imperium.</p>' +
      '<p>You may take this Talent more than once. Each time you take this Talent you may select two augmetics of Rare or lower rarity, or a single Very Rare augmetic. The value of the selected augmetics are added to the talents cost. See p242 for more information on Augmetics.</p>' +
      '<p>The GM determines which augmetics are available (usually any of those designed for your Species) and who can perform the necessary installation procedure.</p>',
    options: [
      {
        name: 'Two Rare Augmetics',
        wargear: [
          {
            name: 'First Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare'],
                typeFilter: ['Augmetic']
              },
            ],
          },
          {
            name: 'Second Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare'],
                typeFilter: ['Augmetic']
              },
            ],
          },
        ],
      },
      {
        name: 'One Very Rare Augmetic',
        wargear: [
          {
            name: 'Very Rare Augmetic',
            selected: '',
            options: [
              {
                filter: true,
                rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
                typeFilter: ['Augmetic']
              },
            ],
          },
        ],
      },
    ],
    allowedMultipleTimes: true,
  },*/
  {
    ...talent('core',129,'Augmetic, One Very Rare',20,'Wargear'),
    key: 'core-augmetic-very-rare',
    snippet: 'Replace part of your biology with one very rare augmetic.',
    description:
      '<p>You replace part of your biology with an augmetic, the common name for cybernetic implants in the Imperium.</p>' +
      '<p>You may take this Talent more than once. Each time you take this Talent you may select two augmetics of Rare or lower rarity, or a single Very Rare augmetic. The value of the selected augmetics are added to the talents cost. See p242 for more information on Augmetics.</p>' +
      '<p>The GM determines which augmetics are available (usually any of those designed for your Species) and who can perform the necessary installation procedure.</p>',
    wargear: [
      {
        key: 'very-rare-augmetic',
        name: 'Very Rare Augmetic',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common', 'Uncommon', 'Rare', 'Very Rare'],
            typeFilter: ['Augmetics']
          },
        ],
      },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',129,'Augmetic, Two Rare',20,'Wargear'),
    key: 'core-augmetic-rare',
    snippet: 'Replace part of your biology with two rare augmetics.',
    alert: { type: 'warning', text: 'Due to an issue with the computed talent cost, it might be needed to re-add the selected augmetics.', },
    description:
      '<p>You replace part of your biology with an augmetic, the common name for cybernetic implants in the Imperium.</p>' +
      '<p>You may take this Talent more than once. Each time you take this Talent you may select two augmetics of Rare or lower rarity, or a single Very Rare augmetic. The value of the selected augmetics are added to the talents cost. See p242 for more information on Augmetics.</p>' +
      '<p>The GM determines which augmetics are available (usually any of those designed for your Species) and who can perform the necessary installation procedure.</p>',
    wargear: [
      {
        key: 'first-rare-augmetic',
        name: 'First Rare Augmetic',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common', 'Uncommon', 'Rare'],
            typeFilter: ['Augmetics']
          },
        ],
      },
      {
        key: 'second-rare-augmetic',
        name: 'Second Rare Augmetic',
        selected: '',
        options: [
          {
            filter: true,
            rarityFilter: ['Common', 'Uncommon', 'Rare'],
            typeFilter: ['Augmetics']
          },
        ],
      },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',130,'Betrayer',20,'Corruption'),
    snippet: '+1 Corruption. Sacrifice a willing or unconscious individual for some heretic wrath.',
    requirements: [ requireKeyword('CHAOS') ],
    description: '',
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
  },
  {
    ...talent('core',130,'Berzerker',20,'Corruption,Wrath'),
    snippet: 'When a creature within 30 metres suffer a crit or bleeding, you gain 1 Wrath.',
    description:
      '<p>The very sight of blood energises you in battle.</p>' +
      '<p>Whenever you see an individual within 30 metres of you suffer a Critical Hit or the Bleeding Condition, you gain 1 point of Wrath.</p>' +
      '<p>The GM may require a Corruption Test whenever this Talent is activated.</p>',
    requirements: [],
  },
  {
    ...talent('core',130,'Binary Chatter',20,'Utility'),
    snippet: 'Add +Double Rank when you instruct/program/question a servitor (or similar).',
    description:
      '<p>You are adept at controlling mechanical constructs.</p>' +
      '<p>You gain +Double Rank bonus dice whenever you attempt to instruct, program, or question a servitor or a similar construct, such as a cherub, or a servo-skull.</p>',
    requirements: [ requireKeyword('ADEPTUS MECHANICUS') ],
  },
  {
    ...talent('core',130,'Blindfighter',20,'Melee,Combat'),
    snippet: 'Your Weapon Skill Attack Tests are not affected by the Blinded condition.',
    description:
      '<p>You have trained to fight blind, relying on your instincts and other senses to detect and dispatch your foes even when you cannot see.</p>' +
      '<p>The Blinded Condition does not affect your attack Tests using your Weapon Skill (I).</p>',
    requirements: [ requireSkill('awareness', 3) ],
  },
  {
    ...talent('core',130,'Blood Must Flow!',20,'Melee,Combat,Debuff'),
    snippet: 'You may shift melee attack dice to inflict bleeding.',
    description:
      '<p>You know how to place your strikes to inflict hemorrhaging injuries.</p>' +
      '<p>You may spend an Exalted Icon whenever you make a successful Weapon Skill (I) attack to inflict the Bleeding Condition to your target.</p>',
    requirements: [ requireSkill('weaponSkill', 2) ],
  },
  {
    ...talent('core',130,'Bombardment',40,'Ranged,Combat,Damage,Area'),
    snippet: 'Once per session, deal 20+Double Rank ED to all targets within 10 x Rank metres of the target.',
    description:
      '<p>You have the connections and military backup to call in an airstrike. A bombardment may come from ground-based artillery, aircraft, or even a voidship in low orbit. In all cases, the attacks are devastating to their targets.</p>' +
      '<p>Once per game session, a character with this Talent and access to communications with their vessel or other forces may call in a bombardment. The bombardment attack deals 20 + Double Rank ED damage to all targets within Rank x 10 metres of the designated target.</p>',
    requirements: [
      requireRank(2),
      requireKeyword('ADEPTUS ASTARTES,AELDARI,ASTRA MILLITARUM,CHAOS,ORK,ROGUE TRADER'),
    ],
  },
  {
    ...talent('core',130,'Brutalist',20,'Combat,Damage'),
    snippet: 'All your melee attacks gain Brutal or (of they are already Brutal) deal +1 damage.',
    description:
      '<p>Your strike brutal blows regardless of the weapon you wield.</p>' +
      '<p>Every melee weapon you wield has the Brutal Weapon Trait (p.209), including your unarmed strikes.</p>' +
      '<p>If you make a successful melee attack with a weapon that already has the Brutal Weapon Trait, you deal an additional +1 damage. This bonus damage is applied after calculating your total damage, not to the weapon’s Damage value.</p>',
    requirements: [ requireAttribute('strength', 3) ],
  },
  {
    ...talent('core',130,'Chaos Familiar',20,'Corruption,Utility,Survival'),
    snippet: '+2 Corruption. The minion is proficient in Stealth and Scholar. It`s also a douche...',
    description:
      '<p>The Dark Gods have rewarded you with a minion drawn from the Warp. This malign creature revels in violence and deception, and serves as a constant reminder of your choices. Chaos familiars are unreliable, fickle, and treacherous, but they can be a powerful tool in any cultist’s arsenal.</p>' +
      '<p>You gain +2 Corruption.</p>' +
      '<p>You gain a minion, a lesser daemon spawned from the Warp. It uses the Brimstone Horror profile (see p.349), but has a 1 in all Attributes. It’s only Skills are Scholar (5) and Stealth (8).</p>' +
      '<p>The daemon is fickle. To get it to take action, you must first succeed at an Opposed Persuasion or Intimidation Test. Once persuaded, the daemon goes to extreme measures to accomplish whatever task you set, to the best of its limited abilities.</p>' +
      '<p>At the GM’s discretion, if the minion sees you act against the interests of the Warp, the familiar immediately turns on you until it’s destroyed or convinced of its mistake.</p>' +
      '<p>If the familiar is slain, you must spend a Wrath Point to summon it again — which is timeconsuming and requires the GM’s permission.</p>',
    requirements: [ requireKeyword('CHAOS') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 2 },
    ],
  },
  {
    ...talent('core',131,'Conversational Cogitator',10,'Interaction'),
    snippet: 'Roll Tech instead of Cunning, Deception, Insight or Persuasion once per short or long rest.',
    description:
      '<p>The cogitation devices that form your brain are finely tuned. Through the cold purity of logic you can calculate the likely outcomes of a conversation, and predict the responses of weaker biological minds.</p>' +
      '<p>Before making a Cunning (Fel), Deception (Fel), Insight (Fel), or Persuasion (Fel) Skill Test you can choose to use this Talent to use your Tech (Int) Skill instead.</p>' +
      '<p>You must complete a Regroup or Respite before you can use this Talent again.</p>',
    requirements: [ requireKeyword('ADEPTUS MECHANICUS') ],
  },
  {
    ...talent('core',131,'Counter Attack',30,'Combat,Melee'),
    snippet: 'As a Reflexive Action, execute a single, plain, non-options using melee attack after an enemy targets you with a melee attack.',
    description:
      '<p>You are a master of melee combat, able to find an opening in your opponent’s guard when they attack.</p>' +
      '<p>You can use this Talent whenever an enemy targets you with a melee attack. After the enemy has completed their attack, you may make a single melee attack against that enemy as a Reflexive Action.</p>' +
      '<p>You may not apply any other Talents, Abilities, or combat options to a Counter Attack.</p>' +
      '<p>You may Counter Attack up to Rank times per Round.</p>' +
      '<p>If you Counter Attack, you cannot take any Move Actions on your next turn.</p>',
    requirements: [ requireSkill('weaponSkill', 5) ],
  },
  {
    ...talent('core',131,'Deadshot',20,'Combat,Ranged,Damage'),
    snippet: 'When you take the Aim action (p.189) and make a Called Shot (p.187) you double the bonus ED you receive.',
    description:
      '<p>You are a skilled shot, trained to carefully target your enemies’ weak points.</p>' +
      '<p>When you take the Aim action (p.189) and make a Called Shot (p.187) you double the bonus ED you recieve.</p>',
    requirements: [ requireSkill('ballisticSkill', 2) ],
  },
  {
    ...talent('core',132,'Death or Glory!',20,'Melee,Morale'),
    snippet: 'Instead of making a Fear Test, you may just Charge it`s source. Make the Feat Test afterwards.',
    description:
      '<p>Even when terrified, you can summon the courage to mount a ferocious attack.</p>' +
      '<p>Whenever you are required to make a Fear Test, you may choose to instantly Charge the source of <em>Fear</em>, if you are able to, and make a single melee attack. Make the Fear Test after this attack resolves if the target is still alive.</p>' +
      '<p>If you are in combat after the Fear Test resolves, you sacrifice your first Turn.</p>',
    requirements: [ requireSpecies('Human') ],
  },
  {
    ...talent('core',132,'Deductive',20,'Utility'),
    hint: 'Your studious mind can pick apart a problem (or person) with ease.',
    snippet: 'As a Simple Action, make an Int based Skill test and the GM may give you some information. Gain +Rank dice to tests when using this information.',
    description:
      '<p>Your studious mind can pick apart a problem (or person) with ease.</p>' +
      '<p>As a Simple Action, you may use this Talent to make an Intellect-based Skill Test to recall or notice something about a target. The target can be anything, from a mag-locked door with a cantankerous machine spirit to an inscrutable Planetary Governor.</p>' +
      '<p>If you pass the Test, the GM may give you information based on the Skill you used to make the Test. You also gain +Rank bonus dice to any Test made against that target that utilises this information, and may give this bonus to an ally, if you communicate what you have learned.</p>',
    requirements: [ requireAttribute('intellect',3) ],
  },
  {
    ...talent('core',132,'Devotees',30,'Utility,Survival'),
    snippet: 'You gain 2+Double Rank devotees. They have Attributes and Skills equal 1+Double Rank. They can`t be better than you and you may sacrifice one to avoid damage.',
    description:
      '<p>Through reputation or assignment, you have gathered a number of followers that will do whatever you ask.</p>' +
      '<p>If you are attacked, they intervene.</p>' +
      '<p>Your devotees are a Mob of Troops, as described in Chapter 14: Bestiary. A number of devotees equal to Double Rank +2 have decided to follow you. You may use the stats presented in Chapter 14 for each devotee, or use the following rules:</p>' +
      '<ul>' +
      '<li>Devotee Attributes are equal to 1 + Double Rank.</li>' +
      '<li>Devotee Skills are equal to 1 + Double Rank.</li>' +
      '<li>A devotee’s Attributes and Skills cannot be higher than your own.</li>' +
      '</ul>' +
      '<p>Whenever you are hit by any form of attack, any of your devotees may make a DN5 Initiative Test as a Reflexive Action. If they succeed, the attack kills the devotee instead of hitting you.</p>' +
      '<p>Slain devotees may be replaced for free with new devotees the next time you visit a major encampment or city.</p>' +
      '<p>If you take this Talent more than once, you gain more devotees of the same type you already possess. If you already have followers from an archetype ability, this Talent provides additional followers of that type instead.</p>',
    requirements: [ requireSkill('leadership',4) ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',132,'Die Hard',20,'Survival'),
    hint: 'You’re hard to kill.',
    snippet: 'When reaching max Wounds, roll for a Memorable Injurie, heal 1 Wound. Use once per Short Rest.',
    description:
      '<p>You’re hard to kill.</p>' +
      '<p>When you suffer your maximum Wounds, you are not Dying. Roll once on the Memorable Injuries table and heal 1 Wound.</p>' +
      '<p>You may not use this Talent again until you complete a Regroup.</p>',
    requirements: [],
  },
  {
    ...talent('core',132,'Dirty Fighter',20,'Combat,Interaction,Debuff'),
    hint: 'You’re proficient in the art of foul play.',
    snippet: 'Shift 2 Excalted Icons with an Interaction Attack to also inflict Blinded, Prone, Restrained or Staggered.',
    description:
      '<p>You’re proficient in the art of foul play.</p>' +
      '<p>Whenever you make an Interaction Attack (p.190) and you shift 2 Exalted Icons, you can inflict your target with an additional Condition. Choose the most narratively appropriate Condition from the following options:</p>' +
      '<ul>' +
      '<li>Blinded (p.199)</li>' +
      '<li>Prone (p.200)</li>' +
      '<li>Restrained(p.200)</li>' +
      '<li>Staggered (p.200)</li>' +
      '</ul>',
    requirements: [],
  },
  {
    ...talent('core',132,'Discipline Savant',30,'Warp'),
    snippet: 'Activating Powers in the selected Discipline reduce their DN by 1.',
    description:
      '<p>Your devotion to a psychic discipline has given you mastery over your style of Warpcraft.</p>' +
      '<p>When you take this Talent, you may select a psychic discipline in which you have at least 2 psychic powers.</p>' +
      '<p>Whenever you make a Psychic Mastery (Wil) Test to activate a psychic power from that discipline, reduce the DN by 1.</p>',
    requirements: [
      { key: 'at least 2 psychic powers from a single Discipline' },
      requireSkill('psychicMastery',4),
    ],
  },
  {
    ...talent('core',133,'Disturbing Voice',20,'Social'),
    snippet: 'Add +Rank dice to voice based Intimidation and Leadership tests. Might impose +2 DN on Fellowship tests with the weak hearthed.',
    description:
      '<p>You have a sinister and upsetting voice.</p>' +
      '<p>This may be due to infrasonic cadences produced by a vox synthesiser, interrogation training, or just an inborn air of malice.</p>' +
      '<p>You gain +Rank bonus dice to Intimidation (Wil) and Leadership (Wil) Tests when you use your voice.</p>' +
      '<p>Any Fellowship Test made with someone likely to be put off by your voice (nervous individuals, Psykers, pious members of the Ecclesiarchy) suffers +2 DN penalty.</p>',
    requirements: [],
    modifications: [
      { targetGroup: 'skills', targetValue: 'intimidation', modifier: 0, rank: 1, condition: 'when voiced based' },
      { targetGroup: 'skills', targetValue: 'leadership', modifier: 0, rank: 1, condition: 'when voiced based' },
    ],
  },
  {
    ...talent('core',133,'Dual Wield',20,'Combat,Ranged,Melee'),
    hint: 'You can wield two weapons with uncanny accuracy.',
    snippet: 'When dual-wielding, reduce the Multi-Attack penalty by 2.',
    description:
      '<p>You can wield two weapons with uncanny accuracy.</p>' +
      '<p>If you are wielding two weapons that have the Pistol Weapon Trait or are one-handed melee weapons, the DN penalty for using the Multi- Attack option is reduced by 2.</p>' +
      '<p>You can also choose to use a different weapon you are wielding for each of your Multi-Attacks.</p>',
    requirements: [],
  },
  {
    ...talent('core',133,'Duty Until Death',20,'Combat'),
    hint: 'Your ardent faith in the Emperor allows you to push beyond the limits of injury to act in His will, at a cost to your physical form.',
    snippet: 'When suffer more Wounds then your Max Wounds, you can act normal for one final round. You are still dying and rolling Complications is not a good idea.',
    description:
      '<p>Your ardent faith in the Emperor allows you to push beyond the limits of injury to act in His will, at a cost to your physical form.</p>' +
      '<p>Whenever you suffer more Wounds than your Max Wounds, you can use this Talent. You may take your next Turn normally; you begin Dying at the end of that Turn. You may choose to take your next Turn immediately after activating this Talent, potentially interrupting an enemy’s Turn. If you roll a Complication on any Test, you take a Traumatic Wound.</p>',
    requirements: [
      requireAttribute('willpower',3),
      requireKeyword('IMPERIUM'),
    ],
  },
  {
    ...talent('core',133,'Eliminator',20,'Combat,Stealth'),
    snippet: 'Add you Stealth Score as ED to unaware targets.',
    description:
      '<p>You strike from the shadows, using stealth and the element of surprise to take down your foes in one fell swoop.</p>' +
      '<p>When you have a Stealth Score (p.181) and you attack an enemy that is unaware of you, you may add your Stealth Score as ED. This is in addition to the bonuses received from a Surprise Attack (p.182). Any decrease to your Stealth Score is resolved after the attack.</p>',
    requirements: [ requireSkill('stealth',2) ],
  },
  {
    ...talent('core',133,'Escape Artist',20,'Utility'),
    snippet: 'Add +Double Rank dice to escape bondage or grapplings... Kinky.',
    description:
      '<p>Through bodily contortions, practice, or subdermally concealed equipment, you are adept at escaping any form of bondage.</p>' +
      '<p>You gain +Double Rank bonus dice to all attempts to escape any form of bondage, be it mechanical bonds or an individual Grappling you (p.189).</p>',
    requirements: [],
  },
  {
    ...talent('core',133,'Ever Vigilant',20,'Utility'),
    snippet: 'Add +Double Rank to Passive Awareness.',
    description:
      '<p>You never let down your guard. You gain +Double Rank to your Passive Awareness.</p>',
    requirements: [],
    modifications: [
      { targetGroup: 'traits', targetValue: 'passiveAwareness', modifier: 0, rank: 2 },
    ],
  },
  {
    ...talent('core',133,'Favoured By The Warp',40,'Warp,Survival'),
    snippet: 'You may reroll the Perils of the Warp, the second result is final.',
    description:
      '<p>The Warp is both dangerous and fickle, it’s horrors afflicting some more than others. Even those with great mental conditioning and a seeming control over psychic powers can find it turns against them.</p>' +
      '<p>You may use this Talent to reroll any Perils of the Warp (p.263) result. You must accept the new result.</p>',
    requirements: [ requireKeyword('PSYKER') ],
  },
  {
    ...talent('core',133,'Fear',30,'Intimidation'),
    snippet: 'Your successfull Intimidations may force a Fear Test with DN 1+Double Rank',
    description:
      '<p>Either by the ravages of war on your body, an aura of malice, or the weight of your words, you frighten those you meet.</p>' +
      '<p>When you succeed on an Intimidation (Wil) Test, you can force the target to make a Fear Test with a DN equal to 1 + Double Rank.</p>',
    requirements: [],
  },
  {
    ...talent('core',133,'Fearless',30,'Surviuval'),
    snippet: 'Immune to Fear and Intimidation Interaction Attacks.',
    description:
      '<p>Extensive mental conditioning or intensive training allow you to completely control your fear.</p>' +
      '<p>You automatically pass any Fear Test. You are immune to Interaction Attacks made using Intimidation (Wil).</p>',
    requirements: [ requireAttribute('willpower', 4) ],
  },
  {
    ...talent('core',134,'Feel no Pain',40,'Survival,Combat'),
    hint: 'Your pain tolerance is above and beyond that of most of your Species.',
    snippet: 'Your Max Wounds are increased by +Rank and you do not suffer a DN penalty for beeing wounded.',
    description:
      '<p>Your pain tolerance is above and beyond that of most of your Species.</p>' +
      '<p>You do not suffer a penalty to DN for being Wounded.</p>' +
      '<p>Your Wounds Trait is increases by +Rank.</p>',
    requirements: [ requireAttribute('toughness', 4) ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 0, rank: 1 },
    ],
  },
  {
    ...talent('core',134,'Flagellant',20,'Combat,Melee'),
    hint: 'You have dedicated your pain to the service of the Emperor.',
    snippet: 'You pray, you hurt yourself, you gain +Rank dice to Determination and Conviction, you may become Frenzied.',
    description:
      '<p>You have dedicated your pain to the service of the Emperor.</p>' +
      '<p>At the start of each day, you must spend 20 minutes (Terran standard) in prayer, and inflict Wounds to yourself equal to your Tier through self-flagellation.</p>' +
      '<p>You may not roll Determination against these Wounds, or allow them to be healed by any method other than through a Respite.</p>' +
      '<p>As long as you are wounded in this way, you gain +Rank bonus dice to your Determination and Conviction rolls and may choose to become Frenzied (p.199) as a Combat Action. If you also have the Frenzy Talent, you may become Frenzied as a Simple Action.</p>' +
      '<p>If you fail to flagellate yourself, you are overcome with shame and take a +2 DN penalty to all Tests until you flagellate again.</p>',
    requirements: [ requireKeyword('IMPERIUM') ],
  },
  {
    ...talent('core',134,'Frenzy',20,'Combat,Melee'),
    snippet: 'As a Combat Action you can become Frenzied (pg. 199).',
    description:
      '<p>You can use a Combat Action to become Frenzied (p.199).</p>',
    requirements: [],
  },
  {
    ...talent('core',134,'Furious Charge',20,'Combat,Melee'),
    snippet: 'You add +Rank dice to melee attacks you make as part of a Charge (p.189).',
    description:
      '<p>You have practised closing distance to a foe with speed; swinging your weapon whilst running has become second nature.</p>' +
      '<p>You gain +Rank to any melee attack you make as part of a Charge (p.189).</p>',
    requirements: [
      requireSkill('athletics',2),
      requireSkill('weaponSkill',2),
    ],
  },
  {
    ...talent('core',134,'Gallows Humour',20,'Support,Survival'),
    snippet: 'As a Simple Action you can roll Fellowship vs DN 2 when wounded or suffer a condition. You and you allies heal Shock equals to Icons Rolled +Rank.',
    description:
      '<p>You find humour in the darkest of places, and can use it to bolster the resolve of your allies.</p>' +
      '<p>You can take a Simple Action to make a grim joke whenever you are Wounded or are suffering from a Condition, as long as you are still able to speak. Make a DN 2 Fellowship Attribute Test. If you succeed, you and any allies that can hear you recover Shock equal to your Rank plus the number of Icons rolled.</p>',
    requirements: [],
  },
  {
    ...talent('core',134,'Hardy',30,'Survival'),
    snippet: 'As a Combat Action, roll Toughness (DN 3): Recover 1+Double Rank shock or only 1 on a failure. Shift for 1 additional shock. Use once per Short Rest.',
    description:
      '<p>You are innately durable, or have undergone harrowing endurance training.</p>' +
      '<p>As a Combat Action, you can make a DN 3 Toughness Test. On a failure you recover 1 Shock. On a success you recover 1 + Double Rank Shock. Each Shifted Exalted Icon recovers an additional point of Shock.</p>' +
      '<p>Once you use this Talent, you cannot use it again until you have completed a Regroup (p.196).</p>',
    requirements: [ requireAttribute('toughness',3) ],
  },
  {
    ...talent('core',135,'Hatred [Any]',30,'Combat,Melee,Social'),
    key: 'core-hatred',
    snippet: 'You gain +Double Rank dice for Melee Attacks against the Keyword. You suffer +2 DN to interactions with the Keyword.',
    description:
      '<p></p>',
    requirements: [],
    allowedMultipleTimes: true,
    // Select a species or faction to hate with the blaze of a thousand suns
  },
  {
    ...talent('core',135,'Hive Explorer',20),
    snippet: 'You add +Rank dice to Stealth and Survival in Urban environment.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('IMPERIUM') ],
  },
  {
    ...talent('core',135,'Jargon [Skill]',20),
    key: 'core-jargon',
    snippet: 'Talk on and on over a Topic to lock someone in the conversation.',
    description:
      '<p></p>',
    requirements: [
      { key: 'A rating of 1+ in the respective skill.' },
    ],
    selected: '',
    optionsPlaceholder: 'Select a skill',
    options: [
      { key: 'ballistic-skill', name: 'Ballistic Skill' },
      { key: 'medicae', name: 'Medicae' },
      { key: 'pilot', name: 'Pilot' },
      { key: 'scholar', name: 'Scholar' },
      { key: 'survival', name: 'Survival' },
      { key: 'tech', name: 'Tech' },
      { key: 'weapon-skill', name: 'Weapon Skill' },
    ],
  },
  {
    ...talent('core',135,'Legacy Of Sorrow',20),
    snippet: 'You do not suffer from Intense Emotion and th Group gains 1 Glory every time you recover from dying.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Aeldari') ],
  },
  {
    ...talent('core',136,'Let The Galaxy Burn',20),
    snippet: '+1 Corruption. Incapacitating an Elite or Adversary grants 1 Glory (up to Double Rank per encounter).',
    description:
      '<p></p>',
    requirements: [ requireKeyword('CHAOS') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
  },
  {
    ...talent('core',136,'Lip Reader',20),
    snippet: 'Read Lips, the GM may ask for an Awareness Test.',
    description:
      '<p></p>',
    requirements: [],
  },
  {
    ...talent('core',136,'Lobotomised Efficiency',20),
    snippet: 'You add +Double Rank to Conviction and Resolve. You do not add your Tier to your Shock.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Human') ],
  },
  {
    ...talent('core',136,'Loremaster [Keyword]',30),
    key: 'core-loremaster',
    snippet: 'You add +Double Rank to any (fitting) Skill Tests related to [Keyword]. This includes Interaction Attacks.',
    description:
      '<p></p>',
    requirements: [ requireSkill('scholar',3) ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',136,'Mark Of Chaos',30),
    snippet: 'Serve the Dark Gods, well only one of them.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('[MARK OF CHAOS]') ],
  },
  {
    ...talent('core',136,'Mark Of Nurgle',30),
    snippet: '+1 Corruption. Add +1 to Toughness.',
    description:
      '<p>You gain +1 Corruption.</p>' +
      '<p>Your Toughness increases by +1.</p>',
    requirements: [ requireKeyword('NURGLE') ],
    modifications: [
      { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
  },
  {
    ...talent('core',136,'Mark Of Khorne',30),
    snippet: '+1 Corruption. Add +2 dice to All-Out melee attacks.',
    description:
      '<p>You gain +1 Corruption.</p>' +
      '<p>Add +2 dice to All-Out melee attacks.</p>',
    requirements: [ requireKeyword('KHORNE'), requireKeyword('PSYKER',true) ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
  },
  {
    ...talent('core',136,'Mark Of Slaanesh',30),
    snippet: '+1 Corruption. Add +2 dice to Awareness and Persuasion Tests.',
    description:
      '<p>You gain +1 Corruption.</p>' +
      '<p>Add +2 dice to Awareness and Persuasion Tests.</p>',
    requirements: [ requireKeyword('SLAANESH') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
      { targetGroup: 'skills', targetValue: 'awareness', modifier: 2 },
      { targetGroup: 'skills', targetValue: 'persuasion', modifier: 2 },
    ],
  },
  { // Duplicate
    ...talent('core',136,'Mark Of Tzeentch',30),
    snippet: '+1 Corruption. Add gain the PSYKER Keyword. If you already have it, gain one Minor Psychic Power.',
    description:
      '<p>You gain +1 Corruption.</p>' +
      '<p>Add gain the PSYKER Keyword. If you already have it, gain one Minor Psychic Power.</p>',
    requirements: [ requireKeyword('TZEENTCH') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
      // add PSYKER if not have it
    ],
  },
  {
    ...talent('core',136,'Mark Of Undedicated',30),
    snippet: '+1 Corruption. Choose one of the following Skills: Awareness, Cunning, Deception, Insight, Persuasion, Psychic Mastery, Stealth, or Weapon Skill. You gain +Rank bonus dice when using that Skill.',
    description:
      '<p>You gain +1 Corruption.</p>' +
      '<p>Choose one of the following Skills: Awareness, Cunning, Deception, Insight, Persuasion, Psychic Mastery, Stealth, or Weapon Skill. You gain +Rank bonus dice when using that Skill.</p>',
    requirements: [ requireKeyword('MARK OF CHAOS') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 1 },
    ],
    selected: '',
    optionsPlaceholder: 'Choose a Skill',
    options: [
      { key: 'awareness', name: 'Awareness', modifications: [{ targetGroup: 'skills', targetValue: 'awareness', modifier: 0 , rank: 1 },] },
      { key: 'cunning', name: 'Cunning', modifications: [{ targetGroup: 'skills', targetValue: 'cunning', modifier: 0 , rank: 1 },] },
      { key: 'deception', name: 'Deception', modifications: [{ targetGroup: 'skills', targetValue: 'deception', modifier: 0 , rank: 1 },] },
      { key: 'insight', name: 'Insight', modifications: [{ targetGroup: 'skills', targetValue: 'insight', modifier: 0 , rank: 1 },] },
      { key: 'persuasion', name: 'Persuasion', modifications: [{ targetGroup: 'skills', targetValue: 'persuasion', modifier: 0 , rank: 1 },] },
      { key: 'psychic-mastery', name: 'Psychic Mastery', modifications: [{ targetGroup: 'skills', targetValue: 'psychicMastery', modifier: 0 , rank: 1 },] },
      { key: 'stealth', name: 'Stealth', modifications: [{ targetGroup: 'skills', targetValue: 'stealth', modifier: 0 , rank: 1 },] },
      { key: 'weapon-skill', name: 'Weapon Skill', modifications: [{ targetGroup: 'skills', targetValue: 'weaponSkill', modifier: 0 , rank: 1 },] },
    ],
  },
  {
    ...talent('core',136,'Mastered Paths',20),
    snippet: 'Pick one of your Aeldari Paths. You gain additionaly +Rank bonus from that park.',
    description:
      '<p></p>',
    requirements: [
      requireSpecies('Aeldari'),
      requireKeyword('ASURYANI'),
    ],
  },
  {
    ...talent('core',137,'Mimic Voice',20),
    snippet: 'Study the voice for 1 hour and pass Awareness (DN by GM) to gain +Double Rank to Deception Tests to mimic the voice.',
    description:
      '<p></p>',
    requirements: [ requireSkill('deception',3) ],
    modifications: [
      { targetGroup: 'skills', targetValue: 'deception', modifier: 0, rank: 2, condition: 'when mimicking voices your studied before.' },
    ],
  },
  {
    ...talent('core',137,'Mob Rule',20),
    snippet: 'When commanding 2+ Orks, all allied Orks within 15+Double Rank metres add +Double Rank to Resolve.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Ork') ],
  },
  {
    ...talent('core',137,'More Dakka!',35),
    snippet: 'Add +Rank to your Weapons Salvo Rating.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Ork') ],
  },
  {
    ...talent('core',137,'Noble Peer',30),
    snippet: 'When Status plays a factor, add +Double Rank to Influence and fitting tests.',
    description:
      '<p></p>',
    requirements: [ requireSkill('persuasion',3)],
  },
  {
    ...talent('core',137,'Orthopraxy',20),
    snippet: 'As an ongoing Simple Action, you gain +1 to Willpower for up to Double Rank turns. Use once per Respite (Long Rest).',
    description:
      '<p>The litanies of His holy word have burned themselves deep in your memory. You can recite hymns and prayers to the Emperor by rote, and can use them to bolster your mind.</p>' +
      '<p>As a Simple Action you can begin mentally reciting Ecclesiastical liturgies. As long as you sacrifice your Simple Action in this way, you gain +1 bonus Willpower, for a maximum of Double Rank Rounds.</p>' +
      '<p>You can’t use this Talent again until you complete a Respite.</p>',
    requirements: [ requireKeyword('IMPERIUM') ],
  },
  {
    ...talent('core',137,'Paranoid',20),
    snippet: 'Once per session, contact you network and ask one question. A secret Cunning roll determines the Details.',
    description:
      '<p></p>',
    requirements: [ requireSkill('cunning',3) ],
  },
  {
    ...talent('core',137,'Primaris Perspective',40),
    snippet: 'You add +Rank to Resolve and Corruption Tests. You add +Double Rank to Scholar tests for long (<31k) gone events.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Primaris Astartes') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
      { targetGroup: 'traits', targetValue: 'corruption', modifier: 0, rank: 1, condition: 'to corruption tests' },
      { targetGroup: 'skills', targetValue: 'scholar', modifier: 0, rank: 2, condition: 'when recalling long (<31k) gone events' },
    ],
  },
  {
    ...talent('core',138,'Promethium Proficiency',20),
    snippet: 'Your Inflict(On Fire) weapons, add +Rank ED. Once per round, you gain 1 Wrath when killing an enemy of the Imperium with such a weapon.',
    description:
      '<p>You have been trained in the use of the Emperor’s holy fire.</p>' +
      '<p>When using weapons with the Inflict (On Fire) Trait, you gain +Rank ED to any damage rolls.</p>' +
      '<p>Once per Round, you may gain 1 Wrath when you kill an enemy of the Imperium using a weapon with the Inflict (On Fire) Trait.</p>',
    requirements: [ requireKeyword('IMPERIUM') ],
  },
  {
    ...talent('core',138,'Rite Of Fear',30),
    snippet: 'As a Combat Action, all creatues within a cone (10m x 3m) must face Fear with DN 2+Double Rank. Disturbing Voice costs you only 10 xp.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MECHANICUS') ],
  },
  {
    ...talent('core',138,'Rite Of Magnometrics',20),
    snippet: 'Pick up and Carry metal objects within 3+Double Rank metres without touching. Draw yourself to large metal objects and hover.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MECHANICUS') ],
  },
  {
    ...talent('core',139,'Rite Of Pure Thought',20),
    snippet: 'You add +Rank to Resolve and Fear Test and to resist Persuasion and Intimidation Interaction Attacks. You add +Rank to Investigation Tests.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MECHANICUS') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 },
      { targetGroup: 'skills', targetValue: 'investigation', modifier: 0, rank: 1 },
    ],
  },
  {
    ...talent('core',139,'Scum Savvy',20),
    snippet: 'You add +Double Rank when resisting chemicals. You add +Rank to Cunning tests.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Human') ],
    modifications: [
      { targetGroup: 'skills', targetValue: 'cunning', modifier: 0, rank: 1 },
    ],
  },
  {
    ...talent('core',139,'Secret Identity',20),
    snippet: 'It´s and Identity and it´s a secret one.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('INQUISITION') ],
  },
  {
    ...talent('core',139,'Sidestep',30),
    snippet: 'As a Reflexive Action, you may sidestep a melee attack (before the roll). You add +Double Rank to Defence and Resilience. This also costs you your next Move Action.',
    description:
      '<p></p>',
    requirements: [ requireAttribute('initiative',3) ],
  },
  {
    ...talent('core',139,'Silent',20),
    snippet: 'You may Move at full Speed while Moving Stealthily. Whenever your Stealth Score would be reduced, reduce it by 1 fewer.',
    description:
      '<p></p>',
    requirements: [],
  },
  {
    ...talent('core',139,'Simultaneous Strike (Ballistic Skill)',30),
    snippet: 'You add half your second weapons damage as ED to the damage roll.',
    description: '<p></p>',
    requirements: [ requireSkill('ballisticSkill',4) ],
  },
  {
    ...talent('core',139,'Simultaneous Strike (Weapon Skill)',30),
    snippet: 'You add half your second weapons damage as ED to the damage roll.',
    description: '<p></p>',
    requirements: [ requireSkill('weaponSkill',4) ],
  },
  {
    ...talent('core',139,'Smash Attack',20),
    snippet: 'You add +Rank ED to All-Out Attacks.',
    description:
      '<p></p>',
    requirements: [ requireSkill('weaponSkill',2)],
  },
  {
    ...talent('core',140,'Special Weapons Trooper',20), // + weapon
    snippet: 'You may select a Combat Shotgun, Plasma Gun, Meltagun, Long Las, Flamer, Grenade Launcher or Hot Shot Volley Gun.',
    description:
      '<p></p>',
    requirements: [
      requireSkill('ballisticSkill',3),
      requireKeyword('ASTRA MILITARUM'),
    ],
  },
  {
    ...talent('core',140,'Stoic',20),
    snippet: 'Insight tests targeting you suffer +Double Rank to DN.',
    description:
      '<p></p>',
    requirements: [],
  },
  {
    ...talent('core',140,'Storm of Death',30),
    snippet: 'You reduce the DN for plain Multi-Attacks by Double Rank.',
    description:
      '<p></p>',
    requirements: [ requireSkill('weaponSkill',4)],
  },
  {
    ...talent('core',140,'Supplicant',20),
    snippet: 'Your fancy @$$-kissing will grant you +Rank dice to respective tests.',
    description:
      '<p></p>',
    requirements: [ requireSpecies('Human') ],
  },
  {
    ...talent('core',140,'Supreme Presence [Skill]',30),
    key: 'core-supreme-presence',
    snippet: 'Your Interaction attacks may either affect 1+Double Rank targets or any number of Troops within a Mob.',
    description:
      '<p></p>',
    requirements: [], // 4+
    selected: '',
    optionsPlaceholder: 'Select an interaction attack Skill',
    options: [
      { key: 'athletics', name: 'Athletics' },
      { key: 'ballistic-skill', name: 'Ballistic Skill' },
      { key: 'cunning', name: 'Cunning' },
      { key: 'deception', name: 'Deception' },
      { key: 'intimidation', name: 'Intimidation' },
      { key: 'persuasion', name: 'Persuasion' },
      { key: 'tech', name: 'Tech' },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',140,'Tenacious',30),
    snippet: 'You recover 1 Shock for each Exalted Icon rolled during Determination tests.',
    description:
      '<p></p>',
    requirements: [],
  },
  {
    ...talent('core',140,'The Flesh Is Weak',30),
    snippet: 'You do not breath or bleed. You add +Rank to Tech and Determination tests. You suffer +2 DN to Persuasion Tests.',
    description:
      '<p></p>',
    requirements: [],
    modifications: [
      // immunity (Bleeding)
      // immunity (Suffocation)
      { targetGroup: 'traits', targetValue: 'determination', modifier: 0, rank: 1 },
      { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1 },
    ],
  },
  {
    ...talent('core',141,'Touched By Fate',20),
    snippet: 'You start your sessions with +Rank Wrath.',
    description:
      '<p></p>',
    requirements: [],
  },
  {
    ...talent('core',141,'Trademark Weapon [Weapon]',30),
    key: 'core-trademark-weapon',
    snippet: 'You add +Double Rank ED when attacking with your Trademark Weapon.',
    description:
      '<p></p>',
    requirements: [],
    // some difficult selection to be made usable
  },
  {
    ...talent('core',141,'Transhuman [Attribute]',60),
    key: 'core-transhuman-attribute',
    snippet: 'You add +Double Rank when rolling tests using [Attribute]',
    description:
      '<p></p>',
    requirements: [ { key: 'Attribute 5+'} ],
    selected: '',
    optionsPlaceholder: 'Select an Attribute',
    options: [
      { key: 'strength', name: 'Strength' },
      { key: 'toughness', name: 'Toughness' },
      { key: 'agility', name: 'Agility' },
      { key: 'initiative', name: 'Initiative' },
      { key: 'willpower', name: 'Willpower' },
      { key: 'intellect', name: 'Intellect' },
      { key: 'fellowship', name: 'Fellowship' },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',141,'Twin Focus',20),
    snippet: 'You decrease the DN for sustaining multiple powers by 2.',
    description:
      '<p></p>',
    requirements: [ requireSkill('psychicMastery',4) ],
  },
  {
    ...talent('core',141,'Uncanny [Trait]',40),
    key: 'core-uncanny-trait',
    snippet: 'Increase a Trait by +Rank.',
    description:
      '<p></p>',
    requirements: [],
    selected: '',
    optionsPlaceholder: 'Select a Trait',
    options: [
      { key: 'defence', name: 'Defence', modifications: [ { targetGroup: 'traits', targetValue: 'defence', modifier: 0, rank: 1 } ] },
      { key: 'resilience', name: 'Resilience', modifications: [ { targetGroup: 'traits', targetValue: 'resilience', modifier: 0, rank: 1 } ] },
      { key: 'determination', name: 'Determination', modifications: [ { targetGroup: 'traits', targetValue: 'determination', modifier: 0, rank: 1 } ] },
      { key: 'max-wounds', name: 'Max Wounds', modifications: [ { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 0, rank: 1 } ] },
      { key: 'max-shock', name: 'Max Shock', modifications: [ { targetGroup: 'traits', targetValue: 'maxShock', modifier: 0, rank: 1 } ] },
      { key: 'conviction', name: 'Conviction', modifications: [ { targetGroup: 'traits', targetValue: 'conviction', modifier: 0, rank: 1 } ] },
      { key: 'resolve', name: 'Resolve', modifications: [ { targetGroup: 'traits', targetValue: 'resolve', modifier: 0, rank: 1 } ] },
      { key: 'influence', name: 'Influence', modifications: [ { targetGroup: 'traits', targetValue: 'influence', modifier: 0, rank: 1 } ] },
      { key: 'wealth', name: 'Wealth', modifications: [ { targetGroup: 'traits', targetValue: 'wealth', modifier: 0, rank: 1 } ] },
      { key: 'speed', name: 'Speed', modifications: [ { targetGroup: 'traits', targetValue: 'speed', modifier: 0, rank: 1 } ] },
      { key: 'corruption', name: 'Corruption', modifications: [ { targetGroup: 'traits', targetValue: 'corruption', modifier: 0, rank: 1 } ] },
      { key: 'passive-awareness', name: 'Passive Awareness', modifications: [ { targetGroup: 'traits', targetValue: 'passiveAwareness', modifier: 0, rank: 1 } ] },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',141,'Unnatural [Skill]',60),
    key: 'core-unnatural-skill',
    snippet: 'Reduce Penalties to [Skill] tests by Double Rank.',
    description:
      '<p></p>',
    requirements: [ { key: 'Skill 4+ '} ],
    selected: '',
    optionsPlaceholder: 'Select a Trait',
    options: [
      { key: 'athletics', name: 'Athletics' },
      { key: 'awareness', name: 'Awareness' },
      { key: 'ballistic-skill', name: 'Ballistic Skill' },
      { key: 'cunning', name: 'Cunning' },
      { key: 'deception', name: 'Deception' },
      { key: 'insight', name: 'insight' },
      { key: 'intimidation', name: 'Intimidation' },
      { key: 'investigation', name: 'Investigation' },
      { key: 'leadership', name: 'Leadership' },
      { key: 'medicae', name: 'Medicae' },
      { key: 'persuasion', name: 'Persuasion' },
      { key: 'pilot', name: 'Pilot' },
      { key: 'psychic-mastery', name: 'Psychic Mastery' },
      { key: 'scholar', name: 'Scholar' },
      { key: 'stealth', name: 'Stealth' },
      { key: 'survival', name: 'Survival' },
      { key: 'tech', name: 'Tech' },
      { key: 'weapon-skill', name: 'Weapon Skill' },
    ],
    allowedMultipleTimes: true,
  },
  {
    ...talent('core',141,'Unremarkable',20),
    snippet: '`It´s me! Joe Average!`, Tracking and spotting you in crowds suffer +2 DN.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('IMPERIUM') ],
  },
  {
    ...talent('core',141,'Warped Mind [Discipline]',30),
    snippet: 'You unlock an additional Psychic Discipline. You may reduce the costs by gaining Corruption, reducing cost by 5 for each point of corruption.',
    alert: { type: 'warning', text: 'For reducing the cost for corruption: (a) give yourself custom xp and (b) add corruption in the corruption management in the character view.', },
    description:
      '<p></p>',
    requirements: [ requireSkill('psychicMastery',4) ],
    selected: '',
    optionsPlaceholder: 'Pick one discipline',
    options: [
      { key: 'core-biomancy', name: 'Biomancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Biomancy' }] },
      { key: 'core-divination', name: 'Divination', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Divination' }] },
      { key: 'core-pyromancy', name: 'Pyromancy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Pyromancy' }] },
      { key: 'core-telekinesis', name: 'Telekinesis', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telekinesis' }] },
      { key: 'core-telepathy', name: 'Telepathy', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Telepathy' }] },
      { key: 'core-maleficarum', name: 'Maleficarum', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Maleficarum' }] },
      { key: 'core-runes-of-battle', name: 'Runes of Battle', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Battle' }] },
      { key: 'aaoa-runes-of-shaping', name: 'Runes of Shaping', modifications: [{ targetGroup: 'psychicDisciplines', targetValue: 'Runes of Shaping' }] },
    ],
  },
  // FAITH
  {
    ...talent('core',142,'Bolstering Purity',40, 'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Reflexive Action, spend 1 faith to grant one IMPERIUM individual auto-pass for Resolve and Conviction for one Round.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
    ],
  },
  {
    ...talent('core',143,'By His Will',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. Spend 1 Faith to tripple the Bonus Dice when helping an IMPERIUM individual.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('IMPERIUM'), requireKeyword('CHAOS',true), ],
  },
  {
    ...talent('core',143,'Consecrated Light',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Reflexive Action, spend 1 Faith to grant youself and IMPERIUM allies within 15+Double Rank metres +Double Rank to Fear and Conviction tests until the end of the Round.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MINISTORUM'), requireKeyword('CHAOS',true), ],
  },
  {
    ...talent('core',143,'Divine Guidance',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Combat Action, spend 1 Faith to grant yourself or an IMPERIUM individual in hearing range +Double Rank dice to Ballistic Skill tests for 1 Round.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),requireKeyword('CHAOS',true), ],
  },
  {
    ...talent('core',143,'In His Name',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. When targeting a IMPERIUM individual with Persuasion or Leadership, you can spend 1 Faith to add +Double Rank dice.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('IMPERIUM'),
      requireKeyword('CHAOS',true),
      requireSkill('scholar', 1),
    ],
  },
  {
    ...talent('core',143,'Inspired Blessing',25,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Combat Action, spend 1 Faith to restore 1d3 +Double Rank Shock to you and IMPERIUM allies within 15+Double Rank metres.',
    description:
      '<p></p>',
    requirements: [ requireKeyword('ADEPTUS MINISTORUM'), requireKeyword('CHAOS',true), ],
  },
  {
    ...talent('core',143,'Litany Of Hatred',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Simple Action, spend 1 Faith to grant IMPERIUM allies within 10xRank metres your Hatred talent.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
    ], // +++ Hatret talent
  },
  {
    ...talent('core',143,'Martyr’s Tears',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Simple Action, spend 1 Faith and take Wounds up to your Tier. You heal double the amount from a selcted target.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
      requireAttribute('willpower', 3),
    ],
  },
  {
    ...talent('core',144,'Repent!',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. Spend 1 Faith and pass a Intimidation Test (with +Rank dice) to force an IMPRIUM inividual to repent an kneel for 10xDouble Rank seconds.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
      requireAttribute('willpower', 3),
    ],
  },
  {
    ...talent('core',144,'Righteous Wrath',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Combat Action, spend 1 Faith to gain +2 Wrath. You may grant one of those to an IMPERIUM ally you can hear you.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('IMPERIUM'),
      requireKeyword('CHAOS',true),
      requireAttribute('willpower', 3),
    ],
  },
  {
    ...talent('core',144,'Shield Of Faith',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Reflecive Action, spend 1 Faith to ignore a psychic power or effect for one round. Spend to to grant this bonus to IMPERIUM allies within 15+Double Rank metres.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('IMPERIUM'),
      requireKeyword('CHAOS',true),
      requireAttribute('willpower', 3),
    ],
  },
  {
    ...talent('core',144,'The Passion',20,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As a Combat Action, spend 1 Faith to grant yourself or an IMPERIUM individual in hearing range +Double Rank dice to Weapon Skill tests for 1 Round.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
    ],
  },
  {
    ...talent('core',144,'The Emperor Protects',30,'Faith'),
    group: 'Faith',
    groupKey: 'core-faith',
    snippet: '+1 Faith. As A Reflexive Action, spend 2 Faith to force an attack directed at you to miss.',
    description:
      '<p></p>',
    requirements: [
      requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
      requireKeyword('CHAOS',true),
      { key: 'at least 1 Faith' },
    ],
  },
];

// Redacted Records volume 1
const red1 = [
  {
    ...talent(source.red1.key,60,'Absolute Incineration',20,'Combat,Melta,Damage'),
    snippet: 'When you use a weapon with the Melta Trait at Short Range, increase both the ED and AP by +Rank.',
    description: '<p>When you use a weapon with the <em>Melta</em> Trait at Short Range, increase both the ED and AP by +Rank.</p>',
  },
  {
    ...talent(source.red1.key,60,'Anatomical Scourge',20,'Combat,Melta,Damage'),
    snippet: 'You gain +2ED when making Called Shots.',
    description: '<p>When you use a weapon with the <em>Melta</em> Trait at Short Range, increase both the ED and AP by +Rank.</p>',
    requirements: [
      requireSkill('medicae', 2),
    ],
  },
  {
    ...talent(source.red1.key, 60, 'Angel Of Mercy', 10, ''),
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
    ...talent(source.red1.key, 60, 'Animal Wrangler', 10, ''),
    snippet: 'You gain +Double Rank bonus dice on any social Skill Test against a target with the BEAST Keyword. ',
    description:
      '<p>You gain +Double Rank bonus dice on any social Skill Test against a target with the BEAST Keyword. ' +
      '<p> You may choose to use the Survival (Wil) Skill for any social Skill Tests against these targets..</p>',
    requirements: [
      requireSkill('survival', 2),
    ],
  },
  {
    ...talent(source.red1.key, 66, 'Identify Weakness [Awareness]', 20, ''),
    snippet: 'As a Combat Action: Make a Awareness(int) vs an Elite or Adversary to give your allys + Double Rank ED against it',
    description:
      '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
      '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
    requirements: [
      requireSkill('awareness', 3),
    ],
  },
  {
    ...talent(source.red1.key, 66, 'Identify Weakness [Insight]', 20, ''),
    snippet: 'Make an Insight(Fel) test vs an Elite or Adversary you talk to, to give your allys + Double Rank ED against them',
    description:
      '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
      '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
    requirements: [
      requireSkill('insight', 3),
    ],
  },
  {
    ...talent(source.red1.key, 66, 'Identify Weakness [Investigation]', 20, ''),
    snippet: 'Make an Investigation(Int) Test vs an Elite or Adversary who you surveiled or investigated for a day, to give your allys + Double Rank ED against them',
    description:
      '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
      '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
    requirements: [
      requireSkill('investigation', 3),
    ],
  },
  {
    ...talent(source.red1.key, 66, 'Identify Weakness [Scholar]', 20, ''),
    snippet: 'As a Combat Action: Make a Scholar(Int) Test an Elite or Adversary to give your allys + Double Rank ED against them',
    description:
      '<p>The DN of the Skill Test is usually 3, but may vary; for example, a target may make an Opposed Test' +
      '<p>against Insight (Fel) using their Deception (Fel) Skill. You can only track one enemy’s weakness at a time.',
    requirements: [
      requireSkill('scholar', 3),
    ],
  },
];

const aaoa = [
  {
    ...talent(source.aaoa.key, 119, '`Ere We Go!', 20, ''),
    snippet: 'When you Charge, increase speed by +Rank and add +1 ED on attacks.',
    description:
      '<p>When you Charge, you increase your Speed by +Rank. In addition, you gain +1 ED on your attacks when you charge.</p>',
    requirements: [ requireSpecies('Ork') ],
    modifications: [
      { targetGroup: 'traits', targetValue: 'speed', modifier: 0, rank: 1, condition: 'when charging.' },
    ],
  },
  {
    ...talent(source.aaoa.key, 119, 'Abhor The Witch', 20, ''),
    snippet: 'Psykers targeting you suffer +Rank to Psychic Mastery DN. You do not consider Psykers your ally. ',
    description:
      '<p>When a psyker attempts to target you with a psychic power, increase the difficulty of their Psychic Mastery test by +Rank. This applies to both friendly and enemy psykers, as you consider no psyker your ally.</p>',
    requirements: [ requireKeyword('BLACK TEMPLAR') ],
  },
  {
    ...talent(source.aaoa.key, 119, 'Acolyte of Ynnead', 15, ''),
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
    ...talent(source.aaoa.key, 119, 'And They Shall Know No Fear', 5, ''),
    snippet: 'You may re-roll any failures on any Resolve test you make.',
    description:
      '<p>You may re-roll any failures on any Resolve test you make.</p>',
    requirements: [
      { condition: 'must', type: 'species', value: [ 'Adeptus Astartes','Primaris Astartes' ] },
    ],
  },
  {
    ...talent(source.aaoa.key, 119, 'Armour of Contempt', 20, ''),
    snippet: 'When you roll Determination, you add +Double Rank bonus dice to the roll.',
    description:
      '<p>When you roll Determination, you add +Double Rank bonus dice to the roll.</p>',
    requirements: [
      { condition: 'must', type: 'species', value: [ 'Adeptus Astartes','Primaris Astartes' ] },
      requireAttribute('toughness', 5),
    ],
  },
  {
    ...talent(source.aaoa.key, 119, 'Armour-Monger', 20, ''),
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
    ...talent(source.aaoa.key, 119, 'A Taste for Death', 10, ''),
    snippet: 'You may spend a Soul token to add +Rank bonus dice to your next attack.',
    description:
      '<p>You may spend a Soul token to add +Rank bonus dice to your next attack.</p>',
    requirements: [
      { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
      requireKeyword('YNNARI'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Avatar of Blood', 20, ''),
    snippet: 'Whenever you inflict a Critical Hit with a melee attack, you immediately recover Double Rank Shock.',
    description:
      '<p>Whenever you inflict a Critical Hit with a melee attack, you immediately recover Double Rank Shock.</p>',
    requirements: [
      requireSkill('weaponSkill', 3),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Back from the Brink', 20, ''),
    snippet: 'When you start Dying, you may immediately spend a Soul token to heal 1 Wound.',
    description:
      '<p>When you start Dying, you may immediately spend a Soul token to heal 1 Wound.</p>',
    requirements: [
      { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
      requireKeyword('YNNARI'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Battle Focus', 10, ''),
    snippet: 'You do not have to move in a straight line when you sprint. Further, when you Sprint, you may make a ranged attack with any weapon as if that weapon had the Assault trait. You do not suffer the normal +2DN on the attack for doing this. This does not apply to weapons with the Heavy trait.',
    description:
      '<p>You do not have to move in a straight line when you sprint. Further, when you Sprint, you may make a ranged attack with any weapon as if that weapon had the Assault trait. You do not suffer the normal +2DN on the attack for doing this. This does not apply to weapons with the Heavy trait.</p>',
    requirements: [
      requireSpecies('Aeldari'),
      requireKeyword('ASURYANI'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Blood for the Blood God', 30, ''),
    snippet: 'You gain +1d3 Corruption. After you make a melee attack, you may spend 1 Wrath to make an additional attack.',
    description:
      '<p>You gain +1d3 Corruption. After you make a melee attack, you may spend 1 Wrath to make an additional attack.</p>',
    requirements: [
      requireKeyword('CHAOS'),
      requireKeyword('KHORNE'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Bloodlust', 20, ''),
    snippet: 'Immediately after you kill an enemy with a melee attack, you may move up to half your Speed towards the next nearest enemy.',
    description:
      '<p>Immediately after you kill an enemy with a melee attack, you may move up to half your Speed towards the next nearest enemy.</p>',
  },
  {
    ...talent(source.aaoa.key, 120, 'Bolter Drill', 20, ''),
    snippet: 'When you make a successful attack with a weapon with the Bolt keyword, and you roll a 6 on your Wrath die, instead of inflicting a critical hit you may choose to spend 1 ammo and make an additional attack with that weapon immediately, at the same target or another within 2+Rank metres of the initial target. This additional attack may not generate any further attacks.',
    description:
      '<p>When you make a successful attack with a weapon with the Bolt keyword, and you roll a 6 on your Wrath die, instead of inflicting a critical hit you may choose to spend 1 ammo and make an additional attack with that weapon immediately, at the same target or another within 2+Rank metres of the initial target. This additional attack may not generate any further attacks.</p>',
    requirements: [
      requireKeyword('IMPERIAL FISTS,CRIMSON FISTS'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Brotherhood of Psykers', 10, ''),
    snippet: 'When you attempt a Psychic Mastery test, you may add +1 bonus dice for every GREY KNIGHT with this Talent within 10m of you.',
    description:
      '<p>When you attempt a Psychic Mastery test, you may add +1 bonus dice for every GREY KNIGHT with this Talent within 10m of you.</p>',
    requirements: [
      requireKeyword('GREY KNIGHTS'),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Bulging Biceps', 10, ''),
    snippet: 'When you wield a Heavy weapon, you are no longer knocked Prone by a Complication when firing the weapon.',
    description:
      '<p>When you wield a Heavy weapon, you are no longer knocked Prone by a Complication when firing the weapon.</p>',
    requirements: [
      requireAttribute('strength', 3),
    ],
  },
  {
    ...talent(source.aaoa.key, 120, 'Bull Charge', 10, ''),
    snippet: 'When you Charge, your melee weapons gain the Inflict (Prone) trait for that attack. This has no effect on enemies who are larger than you.',
    description:
      '<p>When you Charge, your melee weapons gain the Inflict (Prone) trait for that attack. This has no effect on enemies who are larger than you.</p>',
    requirements: [
      requireAttribute('strength', 3),
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Catfall', 10, ''),
    snippet: 'When you fall, count the distance fallen as half the actual distance for determining how many Mortal Wounds you suffer.',
    description:
      '<p>When you fall, count the distance fallen as half the actual distance for determining how many Mortal Wounds you suffer.</p>',
    requirements: [
      requireAttribute('agility', 3),
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Codex Discipline', 10, ''),
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
    ...talent(source.aaoa.key, 121, 'Conqueror Imperative', 20, ''),
    snippet: 'At the start of any of your turns, you may activate the Conqueror Imperative. This adds +Double Rank bonus dice to any melee attacks you attempt during that turn but increases the DN of any ranged attacks you attempt that turn by +3. At the end of a turn in which you activate the Conqueror Imperative, you suffer 1d3+2 Shock.',
    description:
      '<p>At the start of any of your turns, you may activate the Conqueror Imperative. This adds +Double Rank bonus dice to any melee attacks you attempt during that turn but increases the DN of any ranged attacks you attempt that turn by +3. At the end of a turn in which you activate the Conqueror Imperative, you suffer 1d3+2 Shock.</p>',
    requirements: [
      requireKeyword('SKITARII'),
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Death to the False Emperor', 30, ''),
    snippet: 'When you make a successful melee attack against a character with the IMPERIUM keyword and roll a 6 on the Wrath die, you may choose to make an additional melee attack instead of inflicting a critical hit. This additional attack cannot be used to gain more attacks.',
    description:
      '<p>When you make a successful melee attack against a character with the IMPERIUM keyword and roll a 6 on the Wrath die, you may choose to make an additional melee attack instead of inflicting a critical hit. This additional attack cannot be used to gain more attacks.</p>',
    requirements: [
      requireKeyword('CHAOS'),
      requireKeyword('HERETIC ASTARTES'),
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Death Visions', 10, ''),
    snippet: 'When you charge into melee, you may add +Rank ED to the damage of that attack. However, you increase the Difficulty of any Willpower test to resist The Red Thirst by an amount equal to your Rank, and a Complication suffered in combat may cause you to hallucinate that you are Sanguinius himself, battling traitors in the Horus Heresy. Primaris Space Marines who take this talent become subject to The Red Thirst despite being Primaris.',
    description:
      '<p>When you charge into melee, you may add +Rank ED to the damage of that attack. However, you increase the Difficulty of any Willpower test to resist The Red Thirst by an amount equal to your Rank, and a Complication suffered in combat may cause you to hallucinate that you are Sanguinius himself, battling traitors in the Horus Heresy. Primaris Space Marines who take this talent become subject to The Red Thirst despite being Primaris.</p>',
    requirements: [
      requireKeyword('BLOOD ANGLES'),
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Deceptive Retreat', 20, ''),
    snippet: 'After you make a melee attack, whether successful or not, you may spend one Glory to Disengage as a free action.',
    description:
      '<p>After you make a melee attack, whether successful or not, you may spend one Glory to Disengage as a free action.</p>',
    requirements: [
      { condition: 'must', type: 'species', value: [ 'Aeldari', 'Drukhari' ] },
    ],
  },
  {
    ...talent(source.aaoa.key, 121, 'Ded ‘Ard!', 40, ''),
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
    ...talent(source.aaoa.key, 121, 'Descent of Angels', 20, ''),
    snippet: 'If you Charge into melee while using a Jump Pack, roll a number of dice equal to Double Rank. For each 6 rolled, you inflict a single Mortal Wound upon an enemy within 2 metres of your landing. Resolve this before making the melee attack from your Charge.',
    description:
      '<p>If you Charge into melee while using a Jump Pack, roll a number of dice equal to Double Rank. For each 6 rolled, you inflict a single Mortal Wound upon an enemy within 2 metres of your landing. Resolve this before making the melee attack from your Charge.</p>',
    requirements: [
      requireKeyword('BLOOD ANGLES'),
    ],
  },
  {
    ...talent(source.aaoa.key, 122, 'Dreadful Vigour', 25, ''),
    snippet: 'You gain +1d3 Corruption. As a simple action, you may spend 1 Wrath to regain 1d3+2 Wounds.',
    description:
      '<p>You gain +1d3 Corruption. As a simple action, you may spend 1 Wrath to regain 1d3+2 Wounds.</p>',
    requirements: [
      requireKeyword('CHAOS'),
      requireKeyword('NURGLE'),
    ],
  },
  {
    ...talent(source.aaoa.key, 130, 'Anathema', 30, ''),
    snippet: 'Whenever you succeed at a melee attack against a creature with the DAEMON or PSYKER keywords, your attack inflicts mortal wounds equal to your Rank in addition to any other damage inflicted. In addition, creatures with the DAEMON keyword within a number of metres of you equal to your Willpower may not attempt to roll Determination.',
    description:
      '<p>Whenever you succeed at a melee attack against a creature with the DAEMON or PSYKER keywords, your attack inflicts mortal wounds equal to your Rank in addition to any other damage inflicted. In addition, creatures with the DAEMON keyword within a number of metres of you equal to your Willpower may not attempt to roll Determination.</p>',
    requirements: [
      requireSpecies('Pariah'),
      requireAttribute('willpower', 4),
    ],
  },
  {
    ...talent(source.aaoa.key, 138, 'Quell the Warp', 10, ''),
    snippet: 'You gain the ability to Deny the Witch (Core, pg. 267) even though you are not a psyker. Instead of a Psychic Mastery test, you make a Willpower test with a bonus of +Double Rank.',
    description:
      '<p>You gain the ability to Deny the Witch (Core, pg. 267) even though you are not a psyker. Instead of a Psychic Mastery test, you make a Willpower test with a bonus of +Double Rank.</p>',
    requirements: [
      requireSpecies('Pariah'),
      requireAttribute('willpower', 5),
    ],
  },
  {
    ...talent(source.aaoa.key, 135, 'Luminen Blast', 20, ''),
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
    ...talent(source.aaoa.key, 140, 'Witch’s Nightmare', 30, ''),
    snippet: 'Creatures possessing the DAEMON or PSYKER keywords must make a Terror test with a DN equal to 2+Rank when they encounter you, even if they’re normally immune to terror. As you cause terror to them, you are immune to fear, terror, or Intimidation Interaction attacks caused by daemons and psykers.',
    description:
      '<p>Creatures possessing the DAEMON or PSYKER keywords must make a Terror test with a DN equal to 2+Rank when they encounter you, even if they’re normally immune to terror. As you cause terror to them, you are immune to fear, terror, or Intimidation Interaction attacks caused by daemons and psykers.</p>',
    requirements: [
      requireSpecies('Pariah'),
    ],
  },



  // Excarch Powers
  {
    ...talent('aaoa2',147,'Ambush',30,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Striking Scorpion, Stealth 6+',
    description:
      '<p>The Exarch has a perfect sense of precision and timing, and their ambushes are virtually impossible to detect.</p>' +
      '<p>The Exarch and their squad may re-roll any Stealth tests made to set up an ambush, and enemies may not spend Ruin to become aware of the ambushing Striking Scorpions. Finally, the Exarch and any member of their squad may add +1ED to all attacks made during the first round of combat, if they are ambushing.</p>',
  },
  {
    ...talent('aaoa2',147,'Avenging Strikes',20,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Willpower 4+',
    description:
      '<p>Little can withstand the Exarch’s cold fury when they avenge their fallen.</p>' +
      '<p>If the Exarch’s squad has taken any casualties during the current day, then the Exarch and any remaining member of the squad add +2d to all melee and ranged attacks they make for the remainder of the day.</p>',
  },
  {
    ...talent('aaoa2',147,'Battle Fortune',25,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger',
    description:
      '<p>The Exarch is protected by fate and fortune, warded from death until their purpose is done.</p>' +
      '<p>The Exarch may Soak Mortal Wounds, and they add +3d to their Soak rolls. Further, when Soaking damage, the Exarch suffers only one Shock for every two Wounds negated.</p>',
  },
  {
    ...talent('aaoa2',147,'Blademaster',50,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch’s mastery of the blade is incomparable, and few foes can overcome their defences or withstand their attacks.</p>' +
      '<p>The Exarch doubles the bonus to Defence from weapons with the Parry quality and adds +2ED to damage with all bladed melee weapons.</p>',
  },
  {
    ...talent('aaoa2',147,'Bladestorm',40,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Ballistic Skill 5+',
    description:
      '<p>Little can withstand the tempest of blades that issues forth from shuriken weapons under the Exarch’s command.</p>' +
      '<p>When the Exarch, or any member of their squad, rolls a 6 on their Wrath die when making a ranged attack with a weapon with the Shuriken keyword, they may choose to make a second attack with that weapon instead of inflicting a critical hit. These additional attacks may not generate extra attacks of their own.</p>',
  },
  {
    ...talent('aaoa2',147,'Bounding Leap',30,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Athletics 5+',
    description:
      '<p>The Exarch’s speed and grace are superlative, and little can match the pace at which they cross the battlefield.</p>' +
      '<p>The Exarch may use their Agility instead of their Strength for all Athletics tests, and they count their Agility is twice its normal value for the purposes of determining how far they can jump. Finally, the Exarch may disengage as a free action at the start of their turn.</p>',
  },
  {
    ...talent('aaoa2',148,'Burning Heat',25,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Fire Dragon, Toughness 5+',
    description:
      '<p>Enemies who close with the Exarch find their strength and their will to fight sapped by searing, stifling heat.</p>' +
      '<p>Whenever an enemy makes a melee attack against the Exarch or a member of the Exarch’s squad, they add +2 to the DN required to hit.</p>',
  },
  {
    ...talent('aaoa2',148,'Crack Shot',30,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Ballistic Skill 6+',
    description:
      '<p>The Exarch’s precision and lethality with ranged weapons is incomparable.</p>' +
      '<p>The Exarch may re-roll all rolls of 1 whenever they make a ranged attack.</p>',
  },
  {
    ...talent('aaoa2',148,'Crushing Blow',25,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Strength 5+',
    description:
      '<p>The Exarch’s physical might is bolstered by their will to overcome the foes arrayed before them, and little can withstand the impact of their blows.</p>' +
      '<p>The Exarch’s Strength is increased by +2 in melee.</p>',
  },
  {
    ...talent('aaoa2',148,'Deadly Touch',35,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch knows the myriad ways in which living creatures can be slain, and with precision they can deliver death with but a touch.</p>' +
      '<p>When the Exarch hits with a melee attack, each ED which rolls a 6 inflicts 1 Mortal Wound, in addition to the attack’s normal damage.</p>',
  },
  {
    ...talent('aaoa2',148,'Decapitating Strikes',30,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch’s sweeping strikes seldom fail to find their mark, leaving maimed and butchered foes in their wake mere moments after the charge.</p>' +
      '<p>When the Exarch scores a critical hit with a melee attack, the severity of that critical hit automatically increases by 2, as if two Glory had been spent. The Exarch may still spend Glory to increase the severity further, if necessary.</p>',
  },
  {
    ...talent('aaoa2',148,'Defend',50,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dire Avenger, Weapon Skill 5+',
    description:
      '<p>The Exarch is well-versed in the principles of unyielding defence, and their squad are well-drilled to ensure that no enemy can overcome them without great sacrifice.</p>' +
      '<p>The Exarch, and their squad, increase both their Defence and Resilience by +2.</p>',
  },
  {
    ...talent('aaoa2',148,'Disarming Strike',30,'','', 7 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch does not leave battle to chance and eliminates their foe’s weapon at the first opportunity.</p>' +
      '<p>The Exarch ignores the normal DN penalty for a called shot when making a melee attack, so long as they are making the called shot to disarm the opponent.</p>',
  },
  {
    ...talent('aaoa2',148,'Distract',30,'','', 8 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Athletics 5+',
    description:
      '<p>The Exarch’s motions in battle are misleading, even entrancing, leaving enemies off-balance and unable to perceive when the true attack will come.</p>' +
      '<p>Once per round, as a free action on their turn, the Exarch may make an Athletics Interaction attack.</p>',
  },
  {
    ...talent('aaoa2',148,'Dragon’s Bite',20,'','', 9 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Fire Dragon, Weapon Skill 5+',
    snippet: 'You and your squad may treat any weapon with the Melta keyword as if it had the Pistol trait.',
    description:
      '<p>The Exarch and their squad are adept at bringing their weapons to bear even in the closest confines.</p>' +
      '<p>The Exarch and their squad may treat their Fusion Guns or any other weapon with the Melta keyword, as if they had the Pistol trait.</p>',
  },
  {
    ...talent('aaoa2',148,'Evade',30,'','', 0 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Swooping Hawk or Shining Spear or Crimson Hunter, Agility 5+',
    description:
      '<p>Your airborne movement is difficult for the eye to follow or predict, making you and exceptionally difficult target.</p>' +
      '<p>When you move through the air – yourself, or while operating a flying vehicle – add +3 to your Defence until the start of your next turn.</p>',
  },
  {
    ...talent('aaoa2',149,'Expert Hunter',30,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill or Ballistic Skill 5+',
    description:
      '<p>Like the heroes of old, the Exarch is foe to the mightiest enemies on the battlefield.</p>' +
      '<p>When the Exarch makes an melee attack, or a ranged attack at close range, against a vehicle or a Monstrous Creature, they add +2ED to the attack’s damage and may re-roll any ED which result in failures.</p>',
  },
  {
    ...talent('aaoa2',149,'Fast Shot',50,'','', 2 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Ballistic Skill 6+',
    description:
      '<p>The Exarch is a master at making the most of their firepower, laying down lethally-accurate volleys of fire.</p>' +
      '<p>When the Exarch makes a ranged attack, they may count their weapon’s Salvo value as 2 higher than normal. In addition, when making a ranged attack, the Exarch may spend 1 Reload to make a second attack with that weapon.</p>',
  },
  {
    ...talent('aaoa2',149,'Fighting Fury',40,'','', 3 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Weapon Skill 6+',
    description:
      '<p>The Exarch remains in perpetual motion in melee, never missing an opportunity to strike.</p>' +
      '<p>When the Exarch makes a melee attack, they may spend 1 Glory to make a second melee attack. In addition, when the Exarch makes a multi-attack with a melee attack, halve the normal DN penalty for each target (i.e., each target adds +1DN rather than +2DN).</p>',
  },
  {
    ...talent('aaoa2',149,'Flickering Assault',30,'','', 4 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Warp Spider',
    description:
      '<p>The Exarch slips between reality and the Warp seamlessly, stepping out to strike and then withdrawing to find a new target.</p>' +
      '<p>When the Exarch, or any member of their squad, makes a multi-attack as part of a melee attack, they may count their speed as double its normal value when determining if they can reach their targets. Characters benefiting from this ability must be wearing Warp Spider Jump Generators.</p>',
  },
  {
    ...talent('aaoa2',149,'Focussed Fire',30,'','', 5 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Dark Reaper',
    description:
      '<p>The Exarch directs their attention – and their firepower – at a single foe, seeking to eliminate them utterly, regardless of other factors or distractions.</p>' +
      '<p>The Exarch may nominate a single enemy – not a mob, but any individual threat – within 35m as a priority target as a free action at the start of their turn. Until the start of the Exarch’s next turn, any ranged attacks from the Exarch or members of their squad at that priority target may re-roll any dice which roll 1 on their skill test and on their damage roll. Further, the enemy may not use any Ruin spends or special abilities which would redirect the attack to another target.</p>',
  },
  {
    ...talent('aaoa2',149,'Graceful Avoidance',30,'','', 6 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Howling Banshee',
    description:
      '<p>The Exarch’s motions make it almost impossible to land a telling blow upon them.</p>' +
      '<p>When attempting to Soak damage inflicted by a melee attack, the Exarch or a member of their squad may use their Agility instead of their Toughness to Soak, and they may Soak mortal wounds.</p>',
  },
  {
    ...talent('aaoa2',149,'Grim Visage',25,'','', 7 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Willpower 5+',
    description:
      '<p>The Exarch’s presence inspires feelings of foreboding and dread in their foes.</p>' +
      '<p>Characters within 12 yards of the Exarch reduce their Resolve by 1. Members of the Exarch’s squad are immune to this effect.</p>',
  },
  {
    ...talent('aaoa2',149,'Immortal Endurance',30,'','', 8 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Toughness 4+',
    description:
      '<p>The Exarch is supernaturally resilient and wears their armour like a second skin.</p>' +
      '<p>The Exarch’s Resilience and Soak are both increased by +2.</p>',
  },
  {
    ...talent('aaoa2',150,'Intercept',20,'','', 1 ),
    talentGroup: 'Exarch Powers',
    talentGroupKey: 'aaoa-exarch-powers',
    requirementsString: 'Agility 6+, Swooping Hawk',
    snippet: 'When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.',
    description:
      '<p>The Exarch is a peerless aerial combatant, effortlessly proficient at fighting opponents in the sky.</p>' +
      '<p>When the Exarch, or a member of their squad, makes an attack against a flying enemy, they may re-roll any failures on their skill test.</p>',
  },
];

module.exports = [
  ...core,
  ...red1,
  ...aaoa,
];
