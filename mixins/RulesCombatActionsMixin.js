export default {
  data() {

    const combatActions = [
      {
        key: 'standardMovement',
        name: 'Standard Movement',
        group: 'Movement',
        shortDescriptionHtml: 'During a turn, a character can <strong>move a number of metres up to their Speed attribute</strong>.' +
        'Characters do not have to use all of their movement; they can move as little as they wish, or not at all.',
        source: { book: 'CORE', page: 211 },
      },
      {
        key: 'running',
        name: 'Running',
        group: 'Movement',
        shortDescriptionHtml: '<strong>As an action</strong>, a character may run. ' +
        'Doing so enables the character to <strong>move a number of metres equal to their Speed</strong>. ' +
        'Thus, a character can move, then take the Run action to move again during his turn.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'sprinting',
        name: 'Sprinting',
        group: 'Movement',
        shortDescriptionHtml: '<strong>As an action</strong>, a character may sprint. ' +
        'A sprinting character <strong>moves double their Speed</strong> attribute in metres in a straight line. ' +
        'The character may end this movement at any time along the path. ' +
        'A sprinting character <strong>suffers -2 Defence</strong> until the end of their next turn.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'tacticalAdvance',
        name: 'Tactical Advance',
        group: 'Movement',
        shortDescriptionHtml: 'A tactical advance allows a character to move from one piece of ' +
        'cover to another without losing the Defence bonus (see page 158).' +
        'This type of movement slows the character to ½ Speed.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'manifestPsychicPower',
        name: 'Manifest Psychic Power',
        group: 'Combat',
        shortDescriptionHtml: 'Any character with the ability to channel psychic powers ' +
        'may do so as an action during their turn. ' +
        'Some powers activate quickly while some take longer, ' +
        'depending on the individual power being activated.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'meleeAttack',
        name: 'Melee Attack',
        group: 'Combat',
        shortDescriptionHtml: 'During a melee attack, ' +
        'a character attempts to hit a threat within range of their melee weapon. ' +
        'The 41st Millennium is filled with a large variety of deadly close combat weapons that can be used to perform melee attacks ' +
        '— including power swords, chain axes, singing spears, rending claws, and man-reaper scythes.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'interactionAttack',
        name: 'Interaction Attack',
        group: 'Combat',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'investigate',
        name: 'Investigate',
        group: 'Combat',
        shortDescriptionHtml: 'This action allows a character to dedicate their turn to investigating a location or object to try and fi nd or learn something. Depending on the nature of the investigation, a Game Master might ask you to make an Investigation or Awareness test.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'rangedAttack',
        name: 'Ranged Attack',
        group: 'Combat',
        shortDescriptionHtml: 'You can make a ranged attack against any threat that isn’t within melee range of your character, ' +
        'but it must also be within the maximum range of your ranged weapon. ' +
        'Firing a ranged weapon has more modifiers generally than a melee attack, ' +
        'but the ability to destroy your enemies before they can reach you should not be underestimated.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'stealth',
        name: 'Stealth',
        group: 'Combat',
        shortDescriptionHtml: 'Using an action, a character can attempt to sneak by the enemy undetected to gain a tactical advantage or avoid being attacked. ' +
        'Make a Stealth test, and if successful, you gain certain benefits until you are detected or make a surprise attack (see page 218).',
        source: { book: 'CORE', page: 216 },
      },
      {
        key: 'useObject',
        name: 'Use Object',
        group: 'Combat',
        shortDescriptionHtml: 'Most interactions with objects take place outside of combat encounters, ' +
        'or are considered free actions, but on occasion a character might need to use an object during the heat of battle. ' +
        '<strong>When an object requires an action to use, a character can take their action to use it during a turn.</strong>',
        source: { book: 'CORE', page: 216 },
      },
    ];

    const combatOptions = [
      {
        key: 'aim',
        name: 'Aim',
        type: [ 'Ranged' ],
        hint: 'Sacrifice move to gain either +1d on a ranged attack or fire into melee without risk',
        shortDescriptionHtml: 'An aim action allows a character to sacrifice their move for the turn to focus on aiming their weapon and lining up a shot. ' +
        'A character that aims gets a +1d bonus to their ranged attack this turn, ' +
        'or they can ignore the penalty for firing at a target engaged in melee.',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'allOutAttack',
        name: 'All-Out Attack',
        type: [ 'Melee' ],
        hint: 'Sacrifice move to gain either +1d on a ranged attack or fire into melee without risk',
        shortDescriptionHtml: 'A character may perform an All-Out attack, putting all of their effort into aggression and forgoing caution. When making an All-Out attack, a character gains a +2d bonus to their melee attack, but they also suffer a -2 penalty to their Defence until their next turn. A character that performs an All-Out attack cannot use a Multiaction.',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'brace',
        name: 'Brace',
        type: [ 'Ranged' ],
        hint: 'Sacrifice move to brace a heavy weapon.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'calledShotDamage',
        name: 'Called Shot (Damage)',
        type: [ 'Ranged', 'Melee' ],
        hint: 'Suffer a +2/+4/+6 DN penalty for +1/+2/+3 ED on a successful attack.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'calledShotDisarm',
        name: 'Called Shot (Disarm)',
        type: [ 'Ranged', 'Melee' ],
        hint: '',
        shortDescriptionHtml: 'Called shots may be used to disarm an opponent by shooting their weapon or the hand that holds it. If the attack hits, the victim must make a Strength test against a DN equal to ½ the attack’s total damage value to hang on to their weapon. Using a called shot to disarm a weapon does not grant the attack any additional bonus damage dice. At the GM’s discretion, called shots may also bypass a target’s armour (for example, shooting at a target’s head who is not wearing a helmet).',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'charge',
        name: 'Charge',
        type: [ 'Move', 'Melee' ],
        hint: 'Make a full move and a melee attack at +1d.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'disengage',
        name: 'Disengage',
        type: [ 'Move' ],
        hint: 'Move up to half your speed and you are no longer engaged; Requires an Action.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'fullDefence',
        name: 'Full Defence',
        type: [ 'Move' ],
        hint: 'Sacrifice turn to roll Initiative. The result is added to your Defence for the round. Speed reduced to ½.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'grapple',
        name: 'Grapple',
        type: [ 'Melee' ],
        hint: 'Opposed Strength test to restrain an opponent.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'holdAction',
        name: 'Hold Action',
        type: [ 'Misc' ],
        hint: 'Wait to act later in the round. If you wish to interrupt an NPC, you must succeed at an opposed Initiative test.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'multiAttack',
        name: 'Multi-Attack',
        type: [ 'Misc' ],
        hint: 'Attack more than one target; +2 DN for each additional target.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'multiAction',
        name: 'Multi-Action',
        type: [ 'Misc' ],
        hint: 'Make more than one action during a turn; +2 DN for each additional action. You may not repeat actions.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'salvo',
        name: 'Salvo',
        type: [ 'Ranged' ],
        hint: 'Sacrifice a Reload to gain a bonus on a ranged attack',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'suppressiveFire',
        name: 'Suppressive Fire',
        type: [ 'Ranged' ],
        hint: 'Sacrifice a Reload to make an Interaction attack using Ballistic Skill.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
    ];

    return {
      combatActionsRepository: combatActions,
      combatOptionsRepository: combatOptions,
    }
  },
};
