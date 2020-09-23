export default {
  data() {
    const SEVERITY = {
      SUBTILE: 'subtile',
      MINOR: 'minor',
      SEVERE: 'severe',
    };
    const corruptionLevelsRepository = [
      {
        key: 'core-0',
        level: 0,
        label: 'Pure',
        pointRange: [0,1,2,3,4,5],
        dnModifier: 0,
      },
      {
        key: 'core-1',
        level: 1,
        label: 'Tarnished',
        pointRange: [6,7,8,9,10],
        dnModifier: 1,
      },
      {
        key: 'core-2',
        level: 2,
        label: 'Contaminated',
        pointRange: [11,12,13,14,15],
        dnModifier: 2,
      },
      {
        key: 'core-3',
        level: 3,
        label: 'Tainted',
        pointRange: [16,17,18,19,20],
        dnModifier: 3,
      },
      {
        key: 'core-4',
        level: 4,
        label: 'Defiled',
        pointRange: [21,22,23,24,25],
        dnModifier: 4,
      },
      {
        key: 'core-4',
        level: 5,
        label: 'Chaos Spawn',
        pointRange: [26],
        dnModifier: 5,
      },
    ];
    const mutationsRepository = [
      {
        key: 'core-hint-of-red-eye',
        name: 'Hint of Red Eye',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '288' },
        severity: SEVERITY.SUBTILE,
        roll: [11,12,13,14,15,16],
        snippet: 'Add 1 dice to Awareness (Int) Tests. You suffer +1 DN to actions that require vision, while exposed to light.',
        description:
          '<p>You gain +1 bonus dice to Awareness (Attribute) Tests. You also suffer +1 DN to any actions requiring vision or visual coordination while in areas of light (daylight or stronger), or during a round of exposure to light (flamer burst, stablight, etc.). Visors and lenses that shade the eyes remove both the bonus and penalty.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: 'awareness', modifier: 1 },
        ],
      },
      {
        key: 'core-voice-of-the-aurelian',
        name: 'Voice of the Aurelian',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '288' },
        severity: SEVERITY.SUBTILE,
        roll: [21,22,23,24,25,26],
        snippet: 'Add +Rank dice to social tests. Psykers within 25m must reroll Wrath Dice without complications.',
        description:
          '<p>You gain +Rank bonus dice when making any social Test. However, such glibness is dangerous; any allied Psykers within 25 m of this character must re-roll any Wrath Dice that don’t generate a Complication on any Psychic Mastery rolls they make.</p>',
      },
      {
        key: 'core-living-shadow',
        name: 'Living Shadow',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '288' },
        severity: SEVERITY.SUBTILE,
        roll: [31,32,33],
        snippet: 'You are aware of any Ambush as if you had spend a Point of Glory. You suffer +1 DN to opposing psychic powers of its effect.',
        description:
          '<p>The Living Shadow opens a gateway to your soul. Any rolls to oppose a psychic power or resist its effects are made at +1 DN. However, the curious nature of this mutation makes you aware of any ambush as if you had spent a point of Glory.</p>',
      },
      {
        key: 'core-gossamer-flesh',
        name: 'Gossamer Flesh',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '288' },
        severity: SEVERITY.SUBTILE,
        roll: [34,35,36],
        snippet: 'You gain +Double Rank dice to Awareness (Int) Tests involving touch. You Reduce Resistance and Max Shock by 1. You suffer +1 DN to resist painfull contact.',
        description:
          '<p>Gossamer Flesh reduces your Resistance and Shock values by 1 and imposes a +1 DN penalty to resist experiences of painful physical contact. However, it also gives a sense of touch so refined that you can read a page of writing with your fingertips alone. You gain +Double Rank bonus dice to Awareness (I) Tests involving touch, and can attempt otherwise impossible feats.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: 'awareness', modifier: 0, rank: 2, condition: 'when involving touch' },
          { targetGroup: 'traits', targetValue: 'resilience', modifier: -1 },
          { targetGroup: 'traits', targetValue: 'maxShock', modifier: -1 },
        ],
      },
      {
        key: 'core-visions',
        name: 'Visions',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '289' },
        severity: SEVERITY.SUBTILE,
        roll: [41,42,43],
        snippet: 'You may activate the following effect on a Complication or when the Gm spends 1 Ruin to force you: Roll on the Vision Table (core, pg. 289).',
        description:
          '<p>Whenever you roll a Complication on the Wrath Dice you may choose to activate the following effect. Alternatively, the GM can spend a Ruin to force this effect to activate. Roll on the Visions table on core, pg. 289. The vision lasts for the remainder of the scene, during which time you suffer a +3 DN penalty to all other actions as you hallucinate.</p>',
      },
      {
        key: 'core-echoes',
        name: 'Echoes',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '289' },
        severity: SEVERITY.SUBTILE,
        roll: [44,45,46],
        snippet: 'You may activate the following effect on a Complication or when the Gm spends 1 Ruin to force you: You must reroll all any Wrath die that is no [1,6].',
        description:
          '<p>Whenever you roll a Complication you may choose to activate the following effect. Alternatively, the GM can spend a Ruin to force this effect to activate. For the remainder of the scene you must reroll any Wrath Dice once per Test, unless you rolled a Complication or a Wrath Critical.</p>',
      },
      {
        key: 'core-blighted-soul',
        name: 'Blighted Soul',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '289' },
        severity: SEVERITY.SUBTILE,
        roll: [51,52,53],
        snippet: 'You add +1 dice to resist Poison. You and anyone within 10m suffer +1 DN to Corruption and Malignancy Tests.',
        description:
          '<p>Corruption and Malignancy Tests you and anyone within 10 m of you make suffer a +1 DN penalty. Your blighted form becomes a little more resistant to toxins, giving you +1 bonus dice to Tests to resist poisons.</p>',
      },
      {
        key: 'core-wyrdling',
        name: 'Wyrdling',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.SUBTILE,
        roll: [54,55,56],
        snippet: 'You gain the PSYKER Keyword. You gain one Minor Psychic Power (GM choice). If you already are a PSYKER, you gan one aditional Minow Psychic Power.',
        description:
          '<p>If you are not a Psyker, you gain the PSYKER Keyword. You also gain one Minor Psychic Power of the GM’s choice. You can now purchase the Psychic Mastery Skill whenever the GM deems it appropriate.</p>' +
          '<p>If you are already a Psyker, you gain an additional Minor Psychic Power.</p>',
        allowedMultipleTimes: true,
      },
      {
        key: 'core-misshapen',
        name: 'Misshapen',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.MINOR,
        roll: [11,12,13,14,15,16],
        snippet: 'Increase your Resolve by 2. Reduce your Max Shock by 1.',
        description:
          '<p>Your constant agony decreases your maximum Shock by 1. However, your exposure to constant pain inures you to threats and mental assault, increasing your Resolve by +2.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resolve', modifier: 2 },
          { targetGroup: 'traits', targetValue: 'maxShock', modifier: -1 },
        ],
      },
      {
        key: 'core-grotesque',
        name: 'Grotesque',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.MINOR,
        roll: [21,22,23,24,25,26],
        snippet: 'Add +1 to Intimidation tests. You suffer +1 DN to social interactions with non-CHAOS characteres.',
        description:
          '<p>Your new appearance is unnerving to all. You receive +1 bonus dice to all Intimidation (Wil) Tests, but your grotesquery imposes +1 DN to all other social interactions with characters who do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
        ],
      },
      {
        key: 'core-bestial-hide',
        name: 'Bestial Hide',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.MINOR,
        roll: [31,32,33],
        snippet: 'Increase Resilience by 1. Add +1 to Intimidation tests. You suffer +2 DN to social interactions with non-CHAOS characteres.',
        description:
          '<p>Your thickened skin grants a +1 to Resilience. You receive +1 bonus dice to all Intimidation (Wil) Tests, but you also suffer a +2 DN penalty to all other social interactions with characters who do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 },
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
        ],
      },
      {
        key: 'core-brute',
        name: 'Brute',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.MINOR,
        roll: [34,35,36,41,42,43],
        snippet: 'Increase Strength and Toughness by 1. Using equipment (incl. ranged weapons), not adjusted to your size, suffer a +1 DN.',
        description:
          '<p>Your sudden growth grants +1 to Strength and Toughness. Most tools and devices are now too small for you to easily use. Unless you acquire modified versions, you suffer a +1 DN penalty to all Tests that involve physical manipulation of tools, including all ranged weapons.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 1 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
        ],
      },
      {
        key: 'core-horns-spines-fangs-or-claws',
        name: 'Horns, Spines, Fangs or Claws',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '290' },
        severity: SEVERITY.MINOR,
        roll: [44,45,46],
        snippet: 'Melee (Strength 5 +Rank ED). When these growth are visible, you suffer +2 DN to social interactions with non-CHAOS characters.',
        description:
          '<p>You may make melee attacks with these new growths. When these growths are visible, you suffer +2 DN to all social interactions unless the target character has the CHAOS Keyword.</p>',
        allowedMultipleTimes: true,
      },
      {
        key: 'core-corrosive-miasma',
        name: 'Corrosive Miasma',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '291' },
        severity: SEVERITY.MINOR,
        roll: [51,52,53],
        snippet: 'On a Complication, you may destroy one item. The GM may spend 1 Ruin to choose the item. You my shift from a melee attack to Inflict Poisoned (1 Mortal Wound).',
        description:
          '<p>Whenever you suffer a Complication, you may choose to have one item of Wargear crumble and become useless. The GM can spend a point of Ruin to choose the item of Wargear. When you make a melee attack you may Shift to give the target the Poisoned Condition with a damage of 1 Mortal Wound.</p>',
      },
      {
        key: 'core-toxic-blood',
        name: 'Toxic Blood',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '291' },
        severity: SEVERITY.MINOR,
        roll: [54,55,56],
        snippet: 'Medicae test on you suffer +2 DN. On A Medicae Complication, the user must success Toughness DN 4 or suffer 1 Mortal Wound.',
        description:
          '<p>Getting any medical treatment is far more difficult and dangerous due to your unusual bodily fluids. Any Medicae (Int) Test made on you suffers a +2 DN penalty. If the Medicae (Int) Test suffers a Complication, the person administering treatment must succeed on a DN 4 Toughness Test or suffer 1 Mortal Wound when bodily fluids splash them.</p>',
      },
      {
        key: 'core-extra-appendages',
        name: 'Extra Appendages',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '291' },
        severity: SEVERITY.SEVERE,
        roll: [11,12],
        snippet: 'You gain an appendage (roll on core pg. 291). Non concealed limbs cause you to suffer a +2 DN on Persuasion Tests with non-CHAOS characters.',
        description:
          '<p>The influence of Corruption has Warped your body; roll on the table below to determine the nature of the appendage.</p>' +
          '<p>Unless you can somehow conceal the extra limb, you suffer a minimum +2 DN penalty to Persuasion (Fel) Tests when dealing with characters who do not have the CHAOS Keyword. Any of these limbs require unusual modifications to your armour and clothing.</p>' +
          '<ol class="mt-2">' +
            '<li><strong>Head:</strong> GM spends Ruin so that the Head might give you a bad time...</li>' +
            '<li><strong>Malformed Arm:</strong> "This is worthless."</li>' +
            '<li><strong>Strong Arm:</strong> Ignore the first +2 DN Multi-Attack/Action penalty involving this arm.</li>' +
            '<li><strong>Malformed Leg:</strong> Decrease your Speed by 1.</li>' +
            '<li><strong>Strong Leg:</strong> Brace Heavy Weapons as a Free Action.</li>' +
            '<li><strong>Prehensive Tail:</strong> Can be used as Strong Arm or Strong Leg.</li>' +
          '</ol>',
        selected: '',
        options: [
          {
            key: 'core-extra-appendages-head',
            name: 'Head',
            snippet: 'GM spends Ruin so that the Head might give you a bad time...',
          },
          {
            key: 'core-extra-appendages-malformed-arm',
            name: 'Malformed Arm',
            snippet: '"This is worthless."',
          },
          {
            key: 'core-extra-appendages-strong-arm',
            name: 'Strong Arm',
            snippet: 'Ignore the first +2 DN Multi-Attack/Action penalty involving this arm.',
          },
          {
            key: 'core-extra-appendages-malformed-leg',
            name: 'Malformed Leg',
            snippet: 'Decrease your Speed by 1.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'speed', modifier: -1 },
            ],
          },
          {
            key: 'core-extra-appendages-strong-leg',
            name: 'Strong Leg',
            snippet: 'Brace Heavy Weapons as a Free Action.',
          },
          {
            key: 'core-extra-appendages-prehensive-tail',
            name: 'Prehensive Tail',
            snippet: 'Can be used as Strong Arm (Ignore the first +2 DN Multi-Attack/Action penalty involving this arm) or Strong Leg (Brace Heavy Weapons as a Free Action).',
          },
        ],
        allowedMultipleTimes: true,
      },
      {
        key: 'core-aberration',
        name: 'Aberration',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '292' },
        severity: SEVERITY.SEVERE,
        roll: [13,14],
        snippet: 'Roll your animalistic aberration (see core pg. 292). Visible mutations cause you to suffer +2 DN to social Interactions with non-CHAOS.',
        description:
          '<p>When this mutation is visible you suffer a minimum +2 DN penalty to all social interactions unless the target character has the CHAOS Keyword.</p>' +
          '<ol>' +
            '<li><strong>Equidae (Horse):</strong> Increase Toughness and Speed by 1.</li>' +
            '<li><strong>Testudinidae (Tortoise):</strong> Increase Toughness and Resilience by 1.</li>' +
            '<li><strong>Caprinae (Goat):</strong> Increase Athletic by 1. Your Horns substitute as a Knive.</li>' +
            '<li><strong>Carcharodon (Shark):</strong> Immune to Suffocation by Water. Your Fangs substitute as a Knive.</li>' +
            '<li><strong>Canidae (Dog):</strong> Increase Speed by 1. Add +2 dice to Awareness based on Smell or Sound.</li>' +
            '<li><strong>Aquila (Eagle):</strong> Add +2 dice to Awareness based on sight. Your beaks substitute for a knife.</li>' +
          '</ol>',
        selected: '',
        options: [
          {
            key: 'core-aberration-equidae',
            name: 'Equidae (Horse)',
            snippet: 'Increase Toughness and Speed by 1.',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
            ],
          },
          {
            key: 'core-aberration-testudinidae',
            name: 'Testudinidae (Tortoise)',
            snippet: 'Increase Toughness and Resilience by 1.',
            modifications: [
              { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
              { targetGroup: 'traits', targetValue: 'resolve', modifier: 1 },
            ],
          },
          {
            key: 'core-aberration-caprinae',
            name: 'Caprinae (Goat)',
            snippet: 'Increase Athletic by 1. Your Horns substitute as a Knive.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'athletics', modifier: 1 },
            ],
          },
          {
            key: 'core-aberration-carcharodon',
            name: 'Carcharodon (Shark)',
            snippet: 'Immune to Suffocation by Water. Your Fangs substitute as a Knive.',
          },
          {
            key: 'core-aberration-canidae',
            name: 'Canidae (Dog)',
            snippet: 'Increase Speed by 1. Add +2 dice to Awareness based on Smell or Sound.',
            modifications: [
              { targetGroup: 'traits', targetValue: 'speed', modifier: 1 },
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 2, condition: 'when based on Smell or Sound' },
            ],
          },
          {
            key: 'core-aberration-aquila',
            name: 'Aquila (Eagle)',
            snippet: 'Add +2 dice to Awareness based on sight. Your beaks substitute for a knife.',
            modifications: [
              { targetGroup: 'skills', targetValue: 'awareness', modifier: 2, condition: 'when based on Sight' },
            ],
            // Todo Wargear Knife
          },
        ],
        allowedMultipleTimes: true,
      },
      {
        key: 'core-corrupted-flesh',
        name: 'Corrupted Flesh',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '292' },
        severity: SEVERITY.SEVERE,
        roll: [15,16],
        snippet: 'Increase Toughness by 1. Medicae tests on you suffer +2 DN.',
        description:
          '<p>You gain +2 Toughness. All Medicae (Int) Tests made on you suffer a +2 DN penalty.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 1 },
        ],
      },
      {
        key: 'core-wings',
        name: 'Wings',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [21,22],
        snippet: 'Fly with double your normal speed.',
        description:
          '<p>All torso clothing and armour must be modified to accommodate the physiological transformation. You can Fly at double your normal Speed. These wings are inherently clumsy; make an Athletics (S) Test for any maneuverability difficulties while aloft.</p>',
      },
      {
        key: 'core-serpentine-body',
        name: 'Serpentine Body',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [23,24],
        snippet: 'Increase Wounds by 2 and Resilience by 1. You are always considered Crawling and Prone without the penalties.',
        description:
          '<p>Any clothing or armour worn on the lower body must be modified to accommodate the physiological transformation. You gain +2 Wounds and +1 Resilience due to your toughened lower body’s hide and musculature. You’re always considered to be Crawling, but you don’t halve your Speed when doing so. You can Run and Sprint as normal. You’re always considered Prone, but don’t suffer penalties for this status.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'resilience', modifier: 1 },
          { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 2 },
        ],
      },
      {
        key: 'core-cannibalistic-drive',
        name: 'Cannibalistic Drive',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [25,26],
        snippet: 'Increase Toughness and Strength by 2. You must consume flesh from sentient creatures or suffer penalties (see core pg. 293).',
        description:
          '<p>You gain +2 to Toughness and Strength. You must consume one pound of flesh taken from a sentient creature each week. You need no other food or water. Every week you go without, you must make a DN 8 Conviction Test or suffer a cumulative +1 DN penalty to all actions. The penalty is eliminated as soon as you consume the appropriate flesh. If the cumulative penalty exceeds 4, you lapse into a coma until you consume the substance. Placing flesh in your mouth restores you from the coma enough that you can consume it, but you may not take any other action until the pound of flesh is devoured.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'strength', modifier: 2 },
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 2 },
        ],
      },
      {
        key: 'core-withered',
        name: 'Withered',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [31,32],
        snippet: 'Increase Willpower by 2 and reduce Toughness by 1.',
        description:
          '<p>You suffer –1 Toughness, and gain +2 Willpower.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: -1 },
          { targetGroup: 'attributes', targetValue: 'willpower', modifier: 2 },
        ],
      },
      {
        key: 'core-vile-alacrity',
        name: 'Vile Alacrity',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [33,34],
        snippet: 'Increase Speed by 2. Add +1 die to Athetics Tests. You suffer at least +2 DN to Social Interaction tests with non-CHAOS targets.',
        description:
          '<p>You gain +2 Speed and +1 bonus dice to Athletics (S) Test. Your expressions and tone cause a minimum +2 DN penalty to social interaction Tests against targets that do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'speed', modifier: 2 },
          { targetGroup: 'skills', targetValue: 'athletics', modifier: 1 },
        ],
      },
      {
        key: 'core-fleshmetal',
        name: 'Fleshmetal',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '293' },
        severity: SEVERITY.SEVERE,
        roll: [35,36],
        snippet: 'Increase Wounds and Shock by 2. You can´t remove worn armour. You suffer at least +2 DN to Social Interaction tests with non-CHAOS targets.',
        description:
          '<p>The union of flesh and armour increases your Wounds and Shock by 2. You can no longer remove worn armour, including helmets, gauntlets, and similar components, as they are a part of your body. Your strange visage causes a minimum +2 DN penalty to social interaction Tests against targets that do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 2 },
          { targetGroup: 'traits', targetValue: 'maxShock', modifier: 2 },
        ],
      },
      {
        key: 'core-corrosive-bile',
        name: 'Corrosive Bile',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '294' },
        severity: SEVERITY.SEVERE,
        roll: [41,42],
        snippet: 'Medicae tests on you suffer +3 DN. Bleeding causes you to spread bile to all characters within 2m. You may also vomit the bile once per scene. Both are a free action using ballistic skill. Range 2m; Damage 6 +1 ED; Assault, Toxic 7, Penetrating(1), Spread.',
        description:
          '<p>All Medicae (Int) Tests made to assist you suffer a +3 DN penalty. Any time you suffer the Bleeding condition, you spray corrosive fluids on all characters in a 2 m diameter circle. Similarly, you can make a vomit attack with a 2 m range once per scene. Either type of attack is taken as a Free Action, using your Ballistic Skill against eligible targets.</p>',
      },
      {
        key: 'core-corpulent',
        name: 'Corpulent',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '294' },
        severity: SEVERITY.SEVERE,
        roll: [43,44],
        snippet: 'Increase Toughness by 2. Add +1 dice to Intimidation Tests.',
        description:
          '<p>You gain +2 Toughness. Your added mass provides +1 bonus dice to Intimidation (Wil) Tests.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 2 },
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
        ],
      },
      {
        key: 'core-an-excess-of-eyes',
        name: 'An Excess Of Eyes',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '294' },
        severity: SEVERITY.SEVERE,
        roll: [45,46],
        snippet: 'Increase Defence by 2 and Passive Awareness by 3. You add +2 dice to Awareness tests. You suffer at least +2 DN penalty to social interaction tests with non-CHAOS creatures.',
        description:
          '<p>You gain +2 Awareness and your Passive Awareness increases by 3. You gain +2 Defence. Your strange visage causes a minimum +2 DN penalty to social interaction Tests against targets that do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'defence', modifier: 2 },
          { targetGroup: 'traits', targetValue: 'passiveAwareness', modifier: 3 },
          { targetGroup: 'skills', targetValue: 'awareness', modifier: 2 },
        ],
      },
      {
        key: 'core-enduring-life',
        name: 'Enduring Life',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '294' },
        severity: SEVERITY.SEVERE,
        roll: [51,52],
        snippet: 'You cannot die. Whenever you take a Traumatic Wound you gain 1d6 Corruption points.',
        description:
          '<p>You cannot die. Whenever you take a Traumatic Wound you gain 1d6 Corruption points.</p>',
      },
      {
        key: 'core-aquatic',
        name: 'Aquatic',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '294' },
        severity: SEVERITY.SEVERE,
        roll: [53,54],
        snippet: 'You are immune to Suffocation (p.200) from water but suffer Suffocation from air. You no longer treat water as Difficult Terrain, and so may Swim at full Speed without an Athletics Test.',
        description:
          '<p>You no longer treat water as Difficult Terrain, and so may Swim at full Speed without an Athletics Test. You no longer suffer from Suffocation (p.200) when under water. However, you cannot breathe air and begin to suffocate when your gills are not submerged in water.</p>',
      },
      {
        key: 'core-amorphous',
        name: 'Amorphous',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '295' },
        severity: SEVERITY.SEVERE,
        roll: [55,56],
        snippet: 'Increase Toughness by 2. You can no longer wear clothing or armour. You movement is crawling but you may run and sprint. You are always prone without drawbacks. Add +1 die to Intimidation test. You suffer at least +6 DN penalty to social interaction tests with non-CHAOS characters.',
        description:
          '<p>You are no longer capable of wearing clothing or armour. You gain +2 Toughness due to the rearrangement of your organs. All of your movement is Crawling (p.180). You can Run and Sprint. You are always considered Prone, but don’t suffer the penalties for this status. You gain a +1 bonus dice to Intimidation (Wil) Tests, but you suffer a minimum +6 DN penalty to all other social interaction Tests when dealing with characters who do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'attributes', targetValue: 'toughness', modifier: 2 },
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 1 },
        ],
      },
      {
        key: 'core-afflicted',
        name: 'Afflicted',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '295' },
        severity: SEVERITY.SEVERE,
        roll: [61,62,63],
        snippet: 'Increase Wounds by 3. Add +2 dice to Intimidation test. You suffer at least +2 DN penalty to social interaction tests with non-CHAOS characters.',
        description:
          '<p>You gain +3 Wounds. You gain +2 bonus dice to Intimidation (Wil) Tests, but suffer a minimum +2 DN penalty to social interaction Tests when dealing with characters who do not have the CHAOS Keyword.</p>',
        modifications: [
          { targetGroup: 'traits', targetValue: 'maxWounds', modifier: 3 },
          { targetGroup: 'skills', targetValue: 'intimidation', modifier: 2 },
        ],
      },
      {
        key: 'core-the-warp-made-manifest',
        name: 'The Warp Made Manifest',
        source: { book: 'Core Rules', key: 'core', version: 'v2.1', page: '295' },
        severity: SEVERITY.SEVERE,
        roll: [64],
        snippet: 'You gain Wings (p.293), Wyrdling (p.290), and Horns, Spines, Fangs, or Claws (p.290).',
        description:
          '<p>You gain Wings (p.293), Wyrdling (p.290), and Horns, Spines, Fangs, or Claws (p.290). You must roll 2 additional mutations, rerolling on the Severe Mutations table if you roll The Warp Made Manifest a second time. You may substitute Willpower for any other Attribute when making any Test.</p>',
      },
    ];
    return {
      corruptionLevelsRepository,
      mutationsRepository,
    };
  },
  methods: {
    getCorruptionLevel(corruptionValue) {
      if (corruptionValue >= 26) {
        return this.corruptionLevelsRepository.find(c => c.level === 5);
      }
      return this.corruptionLevelsRepository.find(c => c.pointRange.includes(corruptionValue));
    },
  },
};
