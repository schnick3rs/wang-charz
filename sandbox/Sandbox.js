export default {
  data() {
    return {
      talent: [
        {
          /** ONLINE SHEET
           * Talents
           * *Hatred* • Core, pg. 123
           * You gain bonus dice on melee attacks and +2 DN for non-hostile interaction tests
           * | *Adeptus Astartes*
           * | Here comes the help test describing the Keyword
           *
           *
           */
          name: 'Hatred',
          // condensed and data-drive summary for the character sheet
          snippet: '+Rank on melee attacks against a chosen keyword; +2DN for non-hostile Interaction tests with that keyword.',
          // an extensive summary
          description:
            'Characters with this talent must select a keyword related to a species or faction. ' +
            'The characters gains +Rank bonus dice on melee attacks against targets possessing the ' +
            'chosen keyword. The character also suffers a +2DN penalty on all non-hostile ' +
            'Interaction skill tests vs. targets possessing the chosen keyword.',
          displayOrder: 1, // obsolete
          // check to hide this ability in the builder
          hideInBuilder: false,
          // check to hide this ability in the characterSheet
          hideInSheet: false,
          options: [
            {

            }
          ], // options itself can be modifiers, spells, actions,
          modifiers: [
            {
              modifierType: 'Bonus', // Keyword
              modifierSubtype: 'Melee Attacks',
              fixedValue: 0,
              diceCount: 0,
              rankValue: 0,
              rankDiceCount: 1, // meaning +RANK, alternatives would be 0.5 or
              details: 'Against a target possessing the chosen keyword.' // aka restrictions
            },
            {
              modifierType: 'DN increase', // aka penalty
              modifierSubtype: 'Skill tests',
              fixedValue: 2,
              diceCount: 0,
              rankValue: 0,
              rankDiceCount: 0,
              details: 'For non-hostile interaction skill tests against a target posessing the chosen keyword.' // aka restrictions
            },
          ],
          actions: [],
          gear: [],
        },
        {
          /** ONLINE SHEET
           * Talents
           * *Acts of Faith* • Core, pg. 123
           * As an Action, spend 1 Faith and suffer 1 shock to activate one of the chosen effects.
           * | *Blessing Holy* • Core, pg. 123
           * | You may immediately move up to your Speed as a free action.
           * | *Blessing Immanent* • Core, pg. 123
           * | You may immediately move up to your Speed as a free action.
           *
           */
          name: 'Acts of Faith',
          // condensed and data-drive summary for the character sheet
          snippet: 'Grants Faith and bonuses with various options.',
          // an extensive summary
          description: // html
            '<p>Each time you select this Talent, you gain 2 Faith and you may choose to gain access ' +
            'to two effects from the list below. To gain access to all four effects, you must ' +
            'purchase this Talent twice.</p><p>You may use this talent only once per round. As an action, ' +
            'suffer 1 Shock and spend 1 Faith to activate one of the chosen effects.</p>',
          bpCost: 40,
          // check to hide this ability in the builder
          hideInBuilder: false,
          // check to hide this ability in the characterSheet
          hideInSheet: false,
          selectCount: 1, // -1 aka infinity, 1 default, 2..3..4 respectively
          optionCount: 2,
          prerequisites: [
            {
              description: 'Have the Adeptus Ministorum or Adepta Sororitas Keyword',
              condition: 'must',
              type: 'keyword',
              value: [ 'Adeptus Ministorum', 'Adepta Sororita' ],
            },
            {
              description: 'Willpower 3 or higher',
              condition: 'must',
              type: 'attribute',
              subType: 'willpower',
              value: 3,
            },
            {
              description: 'Does not have the Chaos Keyword',
              condition: 'not',
              type: 'keyword',
              value: [ 'Chaos' ],
            },
          ],
          options: [
            {
              name: '',
              snippet: '',
              description: '',
              actions: [
                {
                  type: 'General',
                  name: 'Hand of the Emperor',
                  activation: 'Free',
                  description: 'You may immediately move up to your Speed ([trait:speed]) as a free action.',
                  snippet: 'You may immediately move up to your Speed as a free action.',
                  target: 'Self',
                },
                {
                  type: 'General',
                  name: 'Divine Guidance',
                  activation: 'Free',
                  description: 'You gain +1 to Ballistic Skill tests for 1 round.',
                  snippet: 'You gain [[rank:1]] to Ballistic Skill tests for 1 round.',
                  target: 'Self',
                },
              ],
            }
          ], // options itself can be modifiers, spells, actions,
          modifiers: [
            {
              "modifierType": "Bonus",
              "modifierGroup": "traits",
              "modifierSubtype": "defence",
              "fixedValue": 1
            },
            {
              "modifierType": "Bonus",
              "modifierGroup": "traits",
              "modifierSubtype": "armour",
              "fixedValue": 1
            },
            {
              modifierType: 'Bonus', // Keyword
              modifierSubtype: 'Faith',
              fixedValue: 2,
              diceCount: 0,
              rankValue: 0,
              rankDiceCount: 1, // meaning +RANK, alternatives would be 0.5 or
              details: '',
            },
          ],
          actions: [
            {
              type: 'General',
              name: 'Activate Act of faith',
              snippet: 'As an Action, spend 1 Faith and suffer 1 shock to activate one of the chosen effects.',
              activation: 'Action',
              resetType: 'Round', // e.g. Round, Session
              costs: {
                faith: 1,
                shock: 1,
              },
            }
          ],
          gear: [],
        },
      ],
    };
  },
};

var feats = [
  {
    id: 1,
    name: 'Hatred',
    sourceId: 1, // aka CORE
    sourcePage: 234,

  }
];

var backgrounds = [
  {
    id: 1,
    name: 'Keyword as a Background',
    snippet: '',
    description: '', // html
    shortDescription: '', // html
  }
]
