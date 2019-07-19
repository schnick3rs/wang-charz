export default {
  data() {

    const talentSuperhumanAttribute = ['Strength', 'Agility', 'Toughness', 'Fellowship', 'Intellect', 'Initiative', 'Willpower']
    .sort()
    .map(
      attribute => ({
        name: `Superhuman ${attribute}`,
        cost: 60,
        prerequisites: [
          {
            condition: 'must', type: 'attribute', key: attribute, value: '5+',
          },
        ],
        effect: `+Rank to all dice pools that incorporate ${attribute}.`,
        source: {
          book: 'core',
          version: 'v1',
          page: '180',
        },
        crunch: [
          { type: 'ability' },
        ],
      }),
    );

    const talentSurpremePresence = ['Athletics', 'Deception', 'Intimidation', 'Persuasion', 'Tech']
    .sort()
    .map(
      skill => ({
        name: `Surpreme Presence ${skill}`,
        cost: 30,
        prerequisites: [
          {
            condition: 'must', type: 'skill', key: skill, value: '4+',
          },
        ],
        effect: `May target Rank +1 or one mob of troops without penalty for Interaction attacks using ${skill}.`,
        source: {
          book: 'core',
          version: 'v1',
          page: '180',
        },
        crunch: [
          { type: 'ability' },
        ],
      }),
    );

    const talentUncannyTrait = ['Conviction', 'Defence', 'Resilience', 'Resolve', 'Shock', 'Soak', 'Speed', 'Wounds']
    .sort()
    .map(
      trait => ({
        name: `Uncanny ${trait}`,
        cost: 40,
        prerequisites: [],
        effect: `${trait} increases by ½ Rank.`,
        source: {
          book: 'core',
          version: 'v1',
          page: '181',
        },
        crunch: [
          { type: 'ability' },
        ],
      }),
    );

    const talentUnnaturalSkill = ['Athletics', 'Awareness', 'Ballistic Skill', 'Cunning', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Leadership', 'Medicae', 'Persuasion', 'Pilot', 'Psychic Mastery', 'Scholar', 'Stealth', 'Survival', 'Tech', 'Weapon Skill']
    .sort()
    .map(
      skill => ({
        name: `Unnatural ${skill}`,
        cost: 60,
        prerequisites: [
          {
            condition: 'must', type: 'skill', key: skill, value: '4+',
          },
        ],
        effect: '...',
        source: {
          book: 'core',
          version: 'v1',
          page: '182',
        },
        crunch: [
          { type: 'ability' },
        ],
      }),
    );

    return {
      talentRepository: [
        {
          name: 'Acts of Faith',
          cost: 40,
          prerequisites: [
            {
              condition: 'must', type: 'keyword', key: ['Adeptus Ministorum', 'Adepta Sororitas'],
            },
            {
              condition: 'must', type: 'attribute', key: 'Willpower', value: '3+',
            },
            { condition: 'mustNot', type: 'keyword', key: ['Chaos'], },
          ],
          effect: 'Grants Faith and bonuses with various options.',
          source: {
            book: 'core',
            version: 'v1',
            page: '171',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Cybernetic Reconstruction',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'character', key: 'Tier', value: '2+',
            },
          ],
          effect: 'Does not bleed or breathe. +½ Rank to Tech and Soak tests. +2DN to Persuasion tests.',
          source: {
            book: 'core',
            version: 'v1',
            page: '171',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Betrayer',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'character', key: 'Rank', value: '2+',
            },
            { condition: 'must', type: 'keyword', key: ['Chaos'] },
            { condition: 'must', type: 'talent', key: ['Devotees'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '172',
          },
          crunch: [
            {
              type: 'modification', targetGroup: 'trait', targetValue: 'Corruption', value: 1,
            },
          ],
        },
        {
          name: 'Bombardment',
          cost: 40,
          prerequisites: [
            {
              condition: 'must', type: 'character', key: 'Rank', value: '3+',
            },
            { condition: 'must', type: 'keyword', key: ['Aeldari', 'Astra Militarum', 'Chaos', 'Ork', 'Rogue Trader', 'Adeptus Astartes'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '173',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Chaos Familiar',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Chaos'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '173',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Counterstrike',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '5+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '173',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Dedicated <Ability>',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'character', key: 'One Ability that  grant a bonus of +½ Rank.' },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '174',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Devotees',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Leadership', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '174',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Dual Wielder (Ballistic Skill)',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '174',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Dual Wielder (Weapon Skill)',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '174',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Favoured by the Warp',
          cost: 40,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Psyker'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '174',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Fearless',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'attribute', key: 'Willpower', value: '5+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '175',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Hammer Blow',
          cost: 20,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '3+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '175',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Hardy',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'attribute', key: 'Toughness', value: '3+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '175',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Hatred <Keyword>',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '3+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '175',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Heroic Charge',
          cost: 20,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Athletics', value: '2+',
            },
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '2+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '175',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Inspired Blessing',
          cost: 25,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Adeptus Ministorum'] },
            { condition: 'mustNot', type: 'keyword', key: ['Chaos'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '176',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Legacy of Sorrow',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Aeldari'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '176',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Let the Galaxy Burn',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Chaos'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '176',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Loremaster <Keyword>',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Scholar', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '176',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mark of Chaos (Khorne)',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Khorne'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mark of Chaos (Nurgle)',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Nurgle'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mark of Chaos (Slaanesh)',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Slaanesh'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mark of Chaos (Tzeentch)',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Tzeentch'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mark of Chaos (Undedicated)',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Undedicated'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Marksman',
          cost: 20,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '3+',
            },
          ],
          effect: 'Aim may reduce Called Shot DN.',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            {
              type: 'hint',
              hooks: ['Ballistic Skill'],
              text: 'If a Marksman takes the Aim option, instead of taking its normal bonus, '
                + 'they may reduce the Difficulty Number increase for a Called Shot option by +1/2 '
                + 'Rank, to a minimum increase of 0.',
            },
          ],
        },
        {
          name: 'Mastered Path',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Aeldari', 'Asuryani'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Mob Rule',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Ork'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '178',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Peer',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Persuasion', value: '3+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '178',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Primaris Directive',
          cost: 40,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Primaris Astartes'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '178',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Rite of Fear',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Adeptus Mechanicus'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '178',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Rite of Magnometrics',
          cost: 20,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Adeptus Mechanicus'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '178',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Rite of Pure Thought',
          cost: 30,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Adeptus Mechanicus'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '179',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Shootier',
          cost: 35,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Ork'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '179',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Sidestep',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'attribute', key: 'Initiative', value: '3+',
            },
          ],
          effect: 'Sacrifice move to gain +Rank Defence and +Rank resilience vs. one attack.',
          source: {
            book: 'core',
            version: 'v1',
            page: '177',
          },
          crunch: [
            {
              type: 'hint',
              hooks: ['Defence', 'Resilience'],
              text: 'A defending character may take a Sidestep any time they are attacked in '
                + 'melee and are aware of the attacker. This action must be taken after the '
                + 'attacker declares the attack, but before the dice are rolled. The defending '
                + 'character must sacrifice their next move action (either from this combat round '
                + 'or the next one) to gain +Rank Defence and +Rank Resilience for resolving this '
                + 'attack. Note that a Sidestep may only be taken once per round and only applies '
                + 'to a single attack.',
            },
          ],
        },
        {
          name: 'Special Weapons Trooper',
          cost: 20,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '3+',
            },
            { condition: 'must', type: 'keyword', key: ['Imperial Guardsman', 'Tempestus Scion'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '179',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Steel and Doom',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'character', key: 'Rank', value: '3+',
            },
            { condition: 'must', type: 'keyword', key: ['Adeptus Astartes'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '180',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Storm of Death',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '180',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        ...talentSuperhumanAttribute,
        ...talentSurpremePresence,
        {
          name: 'The Emperor\'s Light',
          cost: 25,
          prerequisites: [
            { condition: 'must', type: 'keyword', key: ['Adeptus Ministorum'] },
            { condition: 'mustNot', type: 'keyword', key: ['Chaos'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '181',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Touched by Fate',
          cost: 25,
          prerequisites: [],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '181',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Trademark Weapon: (Ranged <Weapon>)',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Ballistic Skill', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '181',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'Trademark Weapon: (Melee <Weapon>)',
          cost: 30,
          prerequisites: [
            {
              condition: 'must', type: 'skill', key: 'Weapon Skill', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '181',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        {
          name: 'True Grit',
          cost: 40,
          prerequisites: [
            {
              condition: 'must', type: 'attribute', key: 'Toughness', value: '4+',
            },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '181',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
        ...talentUncannyTrait,
        ...talentUnnaturalSkill,
        {
          name: 'Unquestioning Faith',
          cost: 20,
          prerequisites: [
            {
              condition: 'must', type: 'attribute', key: 'Willpower', value: '3+',
            },
            { condition: 'mustNot', type: 'keyword', key: ['Chaos'] },
          ],
          effect: '...',
          source: {
            book: 'core',
            version: 'v1',
            page: '182',
          },
          crunch: [
            { type: 'ability' },
          ],
        },
      ],
    }
  }
};
