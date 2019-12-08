export default {
  data() {
    const combatActions = [
      {
        key: 'standardMovement',
        name: 'Standard Movement',
        group: 'Movement',
        shortDescriptionHtml: 'During a turn, a character can <strong>move a number of metres up to their Speed attribute</strong>.'
        + 'Characters do not have to use all of their movement; they can move as little as they wish, or not at all.',
        source: { book: 'CORE', page: 211 },
      },
      {
        key: 'running',
        name: 'Running',
        group: 'Movement',
        shortDescriptionHtml: '<strong>As an action</strong>, a character may run. '
        + 'Doing so enables the character to <strong>move a number of metres equal to their Speed</strong>. '
        + 'Thus, a character can move, then take the Run action to move again during his turn.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'sprinting',
        name: 'Sprinting',
        group: 'Movement',
        shortDescriptionHtml: '<strong>As an action</strong>, a character may sprint. '
        + 'A sprinting character <strong>moves double their Speed</strong> attribute in metres in a straight line. '
        + 'The character may end this movement at any time along the path. '
        + 'A sprinting character <strong>suffers -2 Defence</strong> until the end of their next turn.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'tacticalAdvance',
        name: 'Tactical Advance',
        group: 'Movement',
        shortDescriptionHtml: 'A tactical advance allows a character to move from one piece of '
        + 'cover to another without losing the Defence bonus (see page 158).'
        + 'This type of movement slows the character to ½ Speed.',
        source: { book: 'CORE', page: 212 },
      },
      {
        key: 'manifestPsychicPower',
        name: 'Manifest Psychic Power',
        group: 'Combat',
        shortDescriptionHtml: 'Any character with the ability to channel psychic powers '
        + 'may do so as an action during their turn. '
        + 'Some powers activate quickly while some take longer, '
        + 'depending on the individual power being activated.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'meleeAttack',
        name: 'Melee Attack',
        group: 'Combat',
        shortDescriptionHtml: 'During a melee attack, '
        + 'a character attempts to hit a threat within range of their melee weapon. '
        + 'The 41st Millennium is filled with a large variety of deadly close combat weapons that can be used to perform melee attacks '
        + '— including power swords, chain axes, singing spears, rending claws, and man-reaper scythes.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'interactionAttack',
        name: 'Interaction Attack',
        group: 'Combat',
        shortDescriptionHtml: 'Interaction attacks attempt to unbalance, tire out, or manoeuvre a foe into a bad situation, '
        + 'reducing their effectiveness or making them more open to harm.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'investigate',
        name: 'Investigate',
        group: 'Combat',
        shortDescriptionHtml: 'This action allows a character to dedicate their turn to investigating a location or object '
        + 'to try and find or learn something. Depending on the nature of the investigation, '
        + 'a Game Master might ask you to make an Investigation or Awareness test.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'rangedAttack',
        name: 'Ranged Attack',
        group: 'Combat',
        shortDescriptionHtml: 'You can make a ranged attack against any threat that isn’t within melee range of your character, '
        + 'but it must also be within the maximum range of your ranged weapon. '
        + 'Firing a ranged weapon has more modifiers generally than a melee attack, '
        + 'but the ability to destroy your enemies before they can reach you should not be underestimated.',
        source: { book: 'CORE', page: 215 },
      },
      {
        key: 'stealth',
        name: 'Stealth',
        group: 'Combat',
        shortDescriptionHtml: 'Using an action, a character can attempt to sneak by the enemy undetected to gain a tactical advantage or avoid being attacked. '
        + 'Make a Stealth test, and if successful, you gain certain benefits until you are detected or make a surprise attack (see page 218).',
        source: { book: 'CORE', page: 216 },
      },
      {
        key: 'useObject',
        name: 'Use Object',
        group: 'Combat',
        shortDescriptionHtml: 'Most interactions with objects take place outside of combat encounters, '
        + 'or are considered free actions, but on occasion a character might need to use an object during the heat of battle. '
        + '<strong>When an object requires an action to use, a character can take their action to use it during a turn.</strong>',
        source: { book: 'CORE', page: 216 },
      },
    ];

    const combatOptions = [
      {
        key: 'aim',
        name: 'Aim',
        type: ['Ranged'],
        hint: 'Sacrifice move to gain either +1d on a ranged attack or fire into melee without risk',
        shortDescriptionHtml: 'An aim action allows a character to sacrifice their move for the turn to focus on aiming their weapon and lining up a shot. '
        + 'A character that aims gets a +1d bonus to their ranged attack this turn, '
        + 'or they can ignore the penalty for firing at a target engaged in melee.',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'allOutAttack',
        name: 'All-Out Attack',
        type: ['Melee'],
        hint: 'Sacrifice move to gain either +1d on a ranged attack or fire into melee without risk',
        shortDescriptionHtml: 'A character may perform an All-Out attack, putting all of their effort into aggression and forgoing caution. When making an All-Out attack, a character gains a +2d bonus to their melee attack, but they also suffer a -2 penalty to their Defence until their next turn. A character that performs an All-Out attack cannot use a Multiaction.',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'brace',
        name: 'Brace',
        type: ['Ranged'],
        hint: 'Sacrifice move to brace a heavy weapon.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'calledShotDamage',
        name: 'Called Shot (Damage)',
        type: ['Ranged', 'Melee'],
        hint: 'Suffer a +2/+4/+6 DN penalty for +1/+2/+3 ED on a successful attack.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'calledShotDisarm',
        name: 'Called Shot (Disarm)',
        type: ['Ranged', 'Melee'],
        hint: '',
        shortDescriptionHtml: 'Called shots may be used to disarm an opponent by shooting their weapon or the hand that holds it. If the attack hits, the victim must make a Strength test against a DN equal to ½ the attack’s total damage value to hang on to their weapon. Using a called shot to disarm a weapon does not grant the attack any additional bonus damage dice. At the GM’s discretion, called shots may also bypass a target’s armour (for example, shooting at a target’s head who is not wearing a helmet).',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'charge',
        name: 'Charge',
        type: ['Move', 'Melee'],
        hint: 'Make a full move and a melee attack at +1d.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'disengage',
        name: 'Disengage',
        type: ['Move'],
        hint: 'Move up to half your speed and you are no longer engaged; Requires an Action.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 221 },
      },
      {
        key: 'fullDefence',
        name: 'Full Defence',
        type: ['Move'],
        hint: 'Sacrifice turn to roll Initiative. The result is added to your Defence for the round. Speed reduced to ½.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'grapple',
        name: 'Grapple',
        type: ['Melee'],
        hint: 'Opposed Strength test to restrain an opponent.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'holdAction',
        name: 'Hold Action',
        type: ['Misc'],
        hint: 'Wait to act later in the round. If you wish to interrupt an NPC, you must succeed at an opposed Initiative test.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'multiAttack',
        name: 'Multi-Attack',
        type: ['Misc'],
        hint: 'Attack more than one target; +2 DN for each additional target.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'multiAction',
        name: 'Multi-Action',
        type: ['Misc'],
        hint: 'Make more than one action during a turn; +2 DN for each additional action. You may not repeat actions.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'salvo',
        name: 'Salvo',
        type: ['Ranged'],
        hint: 'Sacrifice a Reload to gain a bonus on a ranged attack',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
      {
        key: 'suppressiveFire',
        name: 'Suppressive Fire',
        type: ['Ranged'],
        hint: 'Sacrifice a Reload to make an Interaction attack using Ballistic Skill.',
        shortDescriptionHtml: '',
        source: { book: 'CORE', page: 222 },
      },
    ];

    const combatEffects = [
      {
        key: 'bleeding',
        name: 'Bleeding',
        hint: 'Suffer a Mortal Wound at the end of your turn.',
        shortDescriptionHtml: '<p>A character that is bleeding <strong>suffers one Mortal Wound at the end of their turn</strong>. '
        + 'Bleeding can be stopped with a successful <strong>Toughness test (DN 4)</strong>, '
        + 'or if another character aids them with the <strong>Medicae skill</strong>.</p>'
        + '<p>If a character that is bleeding reaches 0 Wounds and falls unconscious, '
        + 'the bleeding effect ends and the character no longer suffers Mortal Wounds.</p>',
        source: { book: 'CORE', page: 229 },
      },
      {
        key: 'blinded',
        name: 'Blinded',
        hint: '+4 DN for all sight-related tasks.',
        shortDescriptionHtml: '<p>A character that is blinded is unable to see properly. '
        + 'They increase the Difficulty Number for any sight related tasks (including all combat tests) by +4.</p>',
        source: { book: 'CORE', page: 230 },
      },
      {
        key: 'burning',
        name: 'Burning',
        hint: 'On fire, suffer damage and must make Willpower tests to act.',
        shortDescriptionHtml:
        '<p>A burning character takes D3 Mortal Wounds at the start of their turn. '
          + 'In addition, a burning character must pass a Willpower test (DN 3) or suffer the effects of being pinned until the end of the round.</p>'
        + '<p>For more information on burning and fi re, see page 247.</p>',
        source: { book: 'CORE', page: 230 },
      },
      {
        key: 'exhausted',
        name: 'Exhausted',
        hint: 'May only take a basic move action, a regular action, or disengage. More shock = Mortal Wounds.',
        shortDescriptionHtml:
        '<p>An exhausted character is weary from battle and is suffering from fatigue. '
          + 'A character that is exhausted can only perform a basic move action, a regular action, or disengage. '
          + 'However, they cannot perform any other combat actions (such as aim or multi-attack). '
          + 'An exhausted character may not Soak damage.</p>'
        + '<p>Certain circumstances directly affect exhaustion. '
          + 'A character is automatically exhausted if they are reduced to 0 shock. '
          + 'A character can also be exhausted while being above 0 shock as a result of a weapon, psychic power, or Ruin action.</p>'
        + '<p>The exhausted condition is removed when the character’s Shock is restored above 0.</p>',
        source: { book: 'CORE', page: 230 },
      },
      {
        key: 'fear',
        name: 'Fear',
        hint: 'Victim suffers +1 DN to any tests involving the attacker.',
        shortDescriptionHtml:
        '<p>When a character encounters something that causes fear, '
          + 'they must pass a Fear test by rolling their Resolve. Success allows them to act normally during their turn. '
          + 'If the test is failed, the character suffers a +1 DN penalty when attacking or interacting with the source of the fear.</p>'
        + '<p>The effects of fear may be removed by a Leadership test (see Leadership on page 165). '
          + 'A being that causes fear is immune to fear and Intimidation Interaction attacks.</p>',
        source: { book: 'CORE', page: 230 },
      },
      {
        key: 'frenzied',
        name: 'Frenzied',
        hint: 'Must All-out Attack; immune to Fear and Pinning.',
        shortDescriptionHtml:
        '<p>A character can be frenzied or have it triggered with a minor action, such as an injection. '
          + 'A character can choose to embrace the frenzy or attempt to resist it. '
          + 'At the start of a character’s turn, they can choose to resist. '
          + 'To do so, a character makes a Willpower test with a DN of 3. '
          + 'If the test is passed, the rage subsides and the frenzy is resisted.</p>'
        + '<p>If the effect is triggered, a frenzied character tries to get into close combat as quickly as possible. '
          + 'If they can see targets, they charge the nearest. If they are in cover, they break cover and move towards the nearest threat. '
          + 'If no enemies are in sight, they instead try and attack the nearest character that is in sight.</p>'
        + '<p>A frenzied character is immune to fear and pinning and must always use the All-Out attack option if possible.</p>',
        source: { book: 'CORE', page: 230 },
      },
      {
        key: 'hindered',
        name: 'Hindered',
        hint: 'Suffers a DN penalty on all tests.',
        shortDescriptionHtml:
          '<p>A hindered character increases the Difficulty Number for all tests.</p>'
          + '<p>The Difficulty Number increases by +1 or higher if the victim was the subject of an Interaction attack, '
            + 'or by the number in parentheses if triggered through another source.</p>'
          + '<p>Being hindered lasts for one round unless otherwise stated.</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'pinned',
        name: 'Pinned',
        hint: 'Must move to cover, cannot charge; +2 DN to ranged attacks.',
        shortDescriptionHtml:
          '<p>When a character comes under heavy fire, there is a chance their Resolve will break under the pressure. '
            + 'If a character is targeted with a suppressing fire attack, they may be pinned.</p>'
          + '<p>To see if a character is pinned, make a Resolve test, but add +1 DN for each additional ranged attacker. '
            + 'If the test is failed, the character hunkers down behind their cover or automatically seeks out the nearest cover as a forced move action. '
            + 'A pinned character cannot make charge actions or move out from behind cover. Any shooting attacks while pinned suffer a DN increase of 2.</p>'
          + '<p>An ally may attempt to rally their comrades during their turn by making a Leadership test. '
            + 'If the test is successful, the character has successfully rallied any pinned characters within 5 metres and the effect is removed.</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'prone',
        name: 'Prone',
        hint: '-2 Defence; standing up counts as moving.',
        shortDescriptionHtml: '<p>When made prone, a character is knocked down and their Defence is reduced by 2. '
        + 'If a character is forced to go prone while flying, they fall to the ground and suffer D3 wounds from the impact.</p>'
        + '<p>Standing up is a free action, allowing a character to stand up on their turn. '
        + 'However, another adjacent character may sacrifice his move to help a prone character stand up immediately. '
        + 'A character who stands up may not sacrifice their move (such as for the Aim combat action).</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'poisoned',
        name: 'Poisoned',
        hint: 'Must pass Toughness test or suffer the poison\'s effects.',
        shortDescriptionHtml: '<p>A character that is poisoned must pass a Toughness test at the end of every turn or suffer damage (amounts vary based on the poison). '
        + 'Some poisons may affect a character’s ability to function instead of (or in addition to) causing damage. '
        + 'The poisoned effect ends when the character succeeds at the required Toughness test or they are treated using the Medicae skill (see page 165).</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'restrained',
        name: 'Restrained',
        hint: '-2 Defence, must forfeit next move action; may not run or sprint.',
        shortDescriptionHtml: '<p>A restrained character must forfeit their next move action (meaning they have no move action to sacrifi ce for any other combat option, such as Aim), and may not sprint or run. A restrained character’s Defence is also reduced by 2.</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'staggered',
        name: 'Staggered',
        hint: 'Speed reduced to 1/2; may not run or sprint',
        shortDescriptionHtml: '<p>A staggered character’s move is reduced to half speed, and they may not run or sprint for one round unless otherwise stated.</p>',
        source: { book: 'CORE', page: 231 },
      },
      {
        key: 'terror',
        name: 'Terror',
        hint: 'Victim suffers +2DN penalty to all tests regarding the attacker; may not move closer to the attacker.',
        shortDescriptionHtml:
          '<p>When a character encounters something that causes terror, they must pass a terror test by rolling their resolve. '
            + 'Success allows them to act normally during their turn. '
            + 'If the test is failed, the character suffers a +2 DN penalty when attacking or interacting with the source of the terror. '
          + 'The character may not move closer to the source of the terror.</p>'
          + '<p>The effects of terror may be removed by a Leadership test (see Leadership on page 165).</p>'
          + '<p>Fear and terror are inextricably linked. '
            + 'Any effect that renders a character immune to fear or grants a bonus to Fear tests also applies to terror. '
            + 'A being that causes terror is immune to fear, terror, and Intimidation Interaction attacks.</p>',
        source: { book: 'CORE', page: 232 },
      },
      {
        key: 'vulnerable',
        name: 'Vulnerable',
        hint: 'Defence is reduced.',
        shortDescriptionHtml: '<p>A vulnerable character suffers a penalty to their Defence.</p>'
        + '<p>The penalty is +1 or higher if the victim was the subject of an Interaction attack, or the number in parentheses if through another source.</p>'
        + '<p>Being vulnerable last for one round unless otherwise stated.</p>',
        source: { book: 'CORE', page: 232 },
      },
    ];

    return {
      combatActionsRepository: combatActions,
      combatOptionsRepository: combatOptions,
      combatEffectsRepository: combatEffects,
    };
  },
};
