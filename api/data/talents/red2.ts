import {ATTRIBUTES, SKILLS, TRAITS} from "../../db/static/_statUtils";
import {requireAttribute, requireKeyword, requireSkill, requireTrait, talent} from "./utils";

export const red2 = [
    {//needed snippet correction
        ...talent('red2', 64, 'Journeyman Craftsworker', 10, ''),
        snippet: 'Bonus Rank dice related to your selected trade skill and can reduce Shock if you practice your craft during your Regroup',
        description:
            '<p>Choose a type of trade appropriate for the 41st Millennium that does not involve the creation of Wargear — carpentry, cartography, jewellery, masonry, painting, sculpture etc. You excel at this craft.</p>' +
            '<p>If an enthusiast of the craft witnesses your creations, you gain +Rank bonus dice to social Skills targeting them for the rest of the scene.</p>' +
            '<p>If you ever undertake a Skill Test to determine the success of the crafting itself — rolling Stealth (A) to conceal a recording device in a necklace, for example — you gain +Double Rank bonus dice on the Test.</p>' +
            '<p>If you have a chance to practise your trade during a Regroup, you reduce your Shock by your Rank.</p>'
    },
    {
        ...talent('red2', 64, 'Lightning Reflexes', 10, ''),
        requirements: [ requireAttribute('agility', 4) ],
        snippet: 'Seize initiative for free and prevent the GM of doing so too.',
        description:
            '<p>Once per combat, your character can Seize The Initiative (Wrath & Glory Rulebook, page 177) without spending Glory.</p>' +
            '<p>Additionally, once per combat, when the GM spends 1 Ruin to Seize The Initiative, you can spend 1 Glory to cancel the effect. The Ruin is still spent. You can only use this option if you have not yet taken your Turn, and must now take your Turn immediately</p>',
    },
    {//shifted longer text to description and updated the snippet
        ...talent('red2', 65, 'Longshot', 10, ''),
        requirements: [ requireSkill('ballisticSkill', 2) ],
        snippet: 'Use your Full Round Action to increase your range',
        description:
            '<p>If you spend a Full Round Action setting up a static firing position, the Long Range of your ranged weapons are tripled for as long as you remain in that spot. Weapons with the Sniper (X) Trait instead increase their Long Range to one kilometre.</p>'
    },
    {
        ...talent('red2', 65, 'Manual Labourer', 10, ''),
        snippet: 'Chose a labour. You gain +Rank dice when socialising and +Double Rank when working.',
        description:
            '<p>Choose a type of occupational labour appropriate for the 41st Millennium — construction, forge labour, mining, agri-farming, etc. You are an expert in this work.</p>' +
            '<p>You gain +Rank bonus dice to all social Skill Tests targeting individuals from the same background.</p>' +
            '<p>If you ever undertake a skill Test to determine the success of these labours —- rolling Athletics (S) to dig a trench that provides full cover in combat, for example — you gain +Double Rank bonus dice on the Test.</p>',
    },
    {
        ...talent('red2', 65, 'Mendacious', 10, 'Deception,Interaction'),
        requirements: [ requireSkill('deception', 2) ],
        snippet: 'Your deception interactions to make Vulnerable are twice as effective.',
        description:
            '<p>When you make a successful Deception Interaction Attack to inflict the Vulnerable Condition (Wrath & Glory Rulebook, page 190), ' +
            'your target reduces their Defence by 2 instead of 1. Shifts can be spent to further reduce the Defence of your target by 2, instead of 1.</p>',
    },
    {
        ...talent('red2', 65, 'No Escape', 10, ''),
        requirements: [ requireAttribute('initiative', 5) ],
        snippet: 'Enemies are locked in melee and you gain +Rank dice when making Reflexive Attacks',
        description:
            '<p>Enemies Engaged with you cannot use the Fall Back Combat Action. Additionally, you gain +Rank bonus dice on Reflexive Attack Tests (Wrath & Glory Rulebook, page 184).</p>',
    },
    {
        ...talent('red2', 65, 'Old Reliable', 10, ''),
        snippet: 'Reliable LAS weapons are even more reliable, save against ammo use for these weapons.',
        description:
            '<p>When you use a weapon with the LAS Keyword and the Reliable Trait, rolling a 1 on the Wrath Die does not trigger a Complication. This effect does not apply when you are Dying.</p>' +
            '<p>Additionally, whenever you use an effect that would expend Las Ammo, roll a Wrath Die. If you roll an Exalted Icon, you do not expend that Las Ammo.</p>',
    },
    {
        ...talent('red2', 66, 'Perplexingly Persuasive', 10, ''),
        requirements: [ requireSkill('persuasion', 4) ],
        snippet: 'Your persuasion interactions to Hinder are twice as effective.',
        description:
            '<p>When you succeed on an Interaction Attack using Persuasion to inflict the Hindered Condition (Wrath & Glory Rulebook, page 190), ' +
            'your target suffers a DN penalty of 2 instead of 1. Any Shifts can be spent to increase the DN penalty of your target by 2, instead of 1.</p>' +
            '<p>At the Gamemaster’s discretion, this Talent only works on targets that understand the language you speak, and particularly hardened foes may require an Opposed Test against their Insight (Fel).</p>',
    },
    {
        ...talent('red2', 66, 'Rumoursmith', 10, ''),
        snippet: 'Add +Rank dice to cunning when spreading rumors. Shift for more Rumors.',
        description:
            '<p>You gain +Rank bonus dice to Cunning (Fel) Tests to hear the word on the street.</p>' +
            '<p>Any Shifts you generate on this Test can be spent to insert a new rumour into circulation. The rumour does not have to be true, but is widely believed as such, and cannot be traced back to you.</p>',
    },
    {
        ...talent('red2', 66, 'Trapmaster', 10, ''),
        requirements: [ requireSkill('survival', 3) ],
        snippet: 'Prepare a location using the rules in RED2, pg. 66.',
        description:
            '<p>During a Regroup, you can Test Survival (Wil) to set a trap around your current location instead of removing Wounds. The DN is usually 3, but may increase depending on the availability of tools and materials. Success constructs a single trap.</p>' +
            '<p>When you engage in combat around this location, you may use a Reflexive Action when an enemy moves to reveal that they have stumbled into your trap.</p>',
    },
    {
        ...talent('red2', 66, 'Shadow Haunter', 5, ''),
        snippet: 'You have excellent night vision, navigating darkness almost as easily as daylight. All DN penalties due to darkness are reduced by -1.',
        description:
            '<p>You have excellent night vision, navigating darkness almost as easily as daylight. All DN penalties due to darkness are reduced by -1.</p>',
    },
    {//expanded description
        ...talent('red2', 66, 'Shield Bash', 10, ''),
        snippet: 'If you are carrying armour with the Shield Trait, you can use it as a melee weapon with the following profile: STR+AR +1ED, Inflict(Hindered)',
        description:
            '<p>If you are carrying armour with the Shield Trait, you can use it as a melee weapon with the following profile: STR+AR +1ED, Inflict(Hindered)</p>' +
            '<p>AP is 0, unless the shield has the Power Field Trait, in which case the AP is equal to the shield’s AR. </p>' +
            '<p>On a successful melee attack Test, Shifts can be spent to increase the DN penalty of Hindered by 1 per Shift.</p>',
    },
    {
        ...talent('red2', 67, 'Shrewd Investments', 10, ''),
        snippet: 'When you spend Wealth as part of a Requisition Test, roll a number of dice equal to the Wealth spent. You regain Wealth equal to the number of Exalted Icons rolled, up to the amount of Wealth spent on the Test.',
        description:
            '<p>When you spend Wealth as part of a Requisition Test, roll a number of dice equal to the Wealth spent. You regain Wealth equal to the number of Exalted Icons rolled, up to the amount of Wealth spent on the Test.</p>',
    },
    {
        ...talent('red2', 67, 'Sphere Of Influence', 10, ''),
        requirements: [
            requireAttribute(ATTRIBUTES.FELLOWSHIP, 4),
            requireTrait(TRAITS.INFLUENCE, 2),
        ],
        snippet: 'Use Glory to gain Keyword Features, see Red 2, pg 67 for details',
        description:
            '<p>At any time, you may spend 1 Glory to nominate a Faction Keyword (Wrath & Glory Rulebook, pages 375–377). ' +
            'Subject to the GM’s approval, you may detail a junior member of the Faction in your approximate vicinity. ' +
            'The individual does not work for you, but you have a somewhat positive professional relationship, and you know how to contact them.</p>' +
            '<p>Your contacts may help you, if it is not too great an inconvenience, or they are provided a sufficiently powerful incentive. ' +
            'In addition, roll a Wrath die. On an Exalted Icon, they owe you a favour. On a Complication, you already owe them a favour.</p>',
    },
    {
        ...talent('red2', 67, 'Statue Still', 10, ''),
        requirements: [ requireSkill(SKILLS.STEALTH, 2) ],
        snippet: 'You gain +Rank to your Stealth Score whenever you are perfectly still. (See Red 2, pg 67 for more)',
        description:
            '<p>You gain +Rank to your Stealth Score whenever you are perfectly still. ' +
            'You lose this benefit when moving silently. While using this ability, you can only whisper or use vox, potentially allowing you to Help allies. ' +
            'As soon as you undertake any other action, the bonus is subtracted from your Stealth Score and can’t be restored until you generate a new Stealth Score.</p>',
    },
    {
        ...talent('red2', 67, 'Survivalist', 10, ''),
        requirements: [ requireSkill(SKILLS.SURVIVAL, 3) ],
        snippet: 'You gain +Rank to Passive Awareness with regard to BEASTs. (more at Red2, pg. 67)',
        description:
            '<p>Whether metaphorically or literally, you are at home in nature. ' +
            'You gain +Rank to your Passive Awareness when detecting the presence of creatures with the BEAST Keyword. ' +
            'You can survive by eating practically anything, and never have to worry about suffering starvation while in the wilderness. ' +
            'You never lose your sense of direction, unless afflicted by mindaltering effects such as Psychic Powers. ' +
            'You always know how to find the nearest shelter to protect yourself from environmental hazards.</p>' +
            '<p>While you can easily fend for yourself this way, you must take Survival (Wil) Tests to find food and shelter for other Agents less proficient in wilderness survival.</p>',
    },
    {//fixed snippet
        ...talent('red2', 67, 'Telecryptographer', 10, ''),
        requirements: [
            requireSkill(SKILLS.SCHOLAR, 2),
            requireSkill(SKILLS.TECH, 2),
        ],
        snippet: 'You gain +Double Rank bonus dice on Tests to jam, intercept or decode enemy vox traffic (or the equivalent)',
        description:
            '<p>You gain +Double Rank bonus dice on Tests to jam, intercept or decode enemy vox traffic (or the equivalent).</p>' +
            '<p>If any of your allies are equipped with a vox unit, you can spend a Respite to encrypt their communications to prevent unauthorised access. Enemies can only intercept the vox traffic by succeeding in an Opposed Tech (Int) Test against you, and you gain +Double Rank bonus dice on that Test.</p>',
    },
    {
        ...talent('red2', 67, 'Trip Attack', 10, ''),
        requirements: [ requireSkill(SKILLS.ATHLETICS, 2) ],
        snippet: 'When you succeed on an Interaction Attack using Athletics (Wrath & Glory Rulebook, page 190), your enemy gains the Prone Condition, in addition to other effects. (more at Red2, pg. 67)',
        description:
            '<p>When you succeed on an Interaction Attack using Athletics (Wrath & Glory Rulebook, page 190), your enemy gains the Prone Condition, in addition to other effects. ' +
            'Prone enemies Engaged with you can only remove the Condition on their turn by spending a Combat Action. Allies may still help them stand with a Simple Action.</p>',
    },
    {
        ...talent('red2', 68, 'Unbreakable Guard', 10, ''),
        snippet: 'When you benefit from a Full Defence (Wrath & Glory Rulebook, page 187), your Defence is further increased by +Rank.',
        description:
            '<p>When you benefit from a Full Defence (Wrath & Glory Rulebook, page 187), your Defence is further increased by +Rank.</p>',
    },
    {
        ...talent('red2', 68, 'Whatever The Cost', 10, ''),
        snippet: 'You gain 2 Icons for every point of Wealth you spend on Requisition Tests, instead of the usual 1. However, if you roll a Complication on a Requisition Test you lose 2 Wealth instead of the usual 1.',
        description:
            '<p>You gain 2 Icons for every point of Wealth you spend on Requisition Tests, instead of the usual 1. However, if you roll a Complication on a Requisition Test you lose 2 Wealth instead of the usual 1.</p>',
    },
    {
        ...talent('red2', 68, 'White-Hot Death', 10, ''),
        snippet: 'When you fire a weapon using Supercharge (Wrath & Glory Rulebook, page 210) you add an additional +Rank ED.',
        description:
            '<p>When you fire a weapon using Supercharge (Wrath & Glory Rulebook, page 210) you add an additional +Rank ED.</p>',
    },
    {
        ...talent('red2', 68, 'Wild Attack', 10, ''),
        snippet: 'Whenever you make an All-Out Attack; you gain +Rank bonus dice and you may trade shock 1:1 for +1 ED.',
        description:
            '<p>Whenever you make an All-Out Attack you gain +Rank bonus dice. Additionally, you can choose to sacrifice Shock equal to your Rank. ' +
            'The All-Out Attack gains +ED equal to the amount of Shock sacrificed.</p>',
    },
    {
        ...talent('red2', 68, 'Wings Of Fire', 10, ''),
        requirements: [ requireAttribute(ATTRIBUTES.AGILITY, 5) ],
        snippet: 'You fly with such confidence that jump packs are like extensions of your own body. You ignore the first Complication per scene related to moving by Jump Pack (Wrath & Glory Rulebook, page 237).',
        description:
            '<p>You fly with such confidence that jump packs are like extensions of your own body. You ignore the first Complication per scene related to moving by Jump Pack (Wrath & Glory Rulebook, page 237).</p>',
    },
    // Faith Talents
    {
        ...talent('red2', 68, 'Aegis of the Emperor', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
            requireAttribute(ATTRIBUTES.WILLPOWER, 3),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As an Action, a target (you?) within 5 cant be targeted by Psychic powers for 1 h.',
        description:
            '<p>You gain +1 Faith. As an Action you may target a Human within 5m. Your target cannot be targeted by Psychic Powers for 1 hour. You can target yourself.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 68, 'Castigate the Witch', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
            requireAttribute(ATTRIBUTES.WILLPOWER, 3),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. Prevent becoming prone by Psychic powers as a Reflexive Action, caster suffers 2+Double Rank Shock.',
        description:
            '<p>You gain +1 Faith. When a Psychic Power targeting you fails to have an effect, you may spend 1 Faith as a Reflexive Action. The psyker who targeted you immediately suffers 2+Double Rank Shock.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 68, 'Deliverance from the Daemonic', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
            requireAttribute(ATTRIBUTES.WILLPOWER, 3),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Combat action, spend 1 faith to deal 1d3 +Rank Mortal Wounds to a CHAOS enemy within hearing range by passing an opposed willpower Test. DAEMONs cant Determinate.',
        description:
            '<p>You gain +1 Faith. As a Combat Action, you may spend 1 Faith to target a CHAOS enemy within hearing range with an Opposed Willpower Test.' +
            'If you succeed, the enemy suffers 1d3 +Rank Mortal Wounds. DAEMON Threats can’t roll Determination to reduce this damage</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 69, 'Hand Of The Emperor', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Reflexive Action, spend 1 faith to double the speed of an IMPERIUM character within hearing range.',
        description:
            '<p>You gain +1 Faith. You may spend 1 Faith as a Reflexive Action to double the Speed of an IMPERIUM character for 1 round. This character must be in hearing range</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 69, 'Martyr’s Rites', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
            requireAttribute(ATTRIBUTES.WILLPOWER, 3),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Simple Action, spend 1 faith to remove Prone from IMPERIUM characters in hearing range (see Red 2, pg 69).',
        description:
            '<p>You gain +1 Faith. As a Simple Action, you may spend 1 Faith to recite last rites. ' +
            'Select one IMPERIUM character within hearing range. ' +
            'The target removes the Prone Condition if they have it. ' +
            'For the next 24 hours, the target doesn’t suffer the Prone Condition when they are Dying, ' +
            'aren’t restricted on Actions they can perform while Dying, or subject to the Exhausted Condition. ' +
            'The effect of those Conditions on Shock, Wounds, and Traumatic Injuries still apply as normal.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 69, 'Sacred Radiance', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Simple Action, spend 1 faith to cast a light hindering CHAOS and DAEMON (see Red 2, pg 69).',
        description:
            '<p>You gain +1 Faith. As a Simple Action, you may spend 1 Faith to emit divine light. ' +
            'You cast this light as most people cast a shadow — whatever you look upon becomes fully illuminated for you and your allies, negating all vision penalties.</p>' +
            '<p>This light is physically painful to behold for the enemies of the Emperor. ' +
            'For CHAOS or DAEMON characters, any Tests against you increase their DN by 1. ' +
            'If a Complication is rolled on a Test against you, the attacker gains the Blinded Condition.</p>' +
            '<p>In combat, the effects of Sacred Radiance apply for 1 Round. ' +
            'Outside of combat, the effects persist for the rest of the scene, or until you choose to extinguish the light.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 69, 'Righteous Suffering', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MINISTORUM,ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. Once per Turn, whenever you suffer one or more Wounds, roll a Wrath Die. If you roll an Exalted Icon, you gain +1 Wrath Point. (see Red 2, pg 69).',
        description:
            '<p>You gain +1 Faith. Once per Turn, whenever you suffer one or more Wounds, roll a Wrath Die. If you roll an Exalted Icon, you gain +1 Wrath Point.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 70, 'Shield of Aversion', 20, ''),
        requirements: [
            requireKeyword('ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Simple Action, spend 1 Faith to reduce all AP against allies in 10m by Double Rank (see Red 2, pg 70).',
        description:
            '<p>You gain +1 Faith. ' +
            'As a Simple Action, you may spend 1 Faith to activate your Shield of Aversion. ' +
            'For the remainder of the encounter, the AP value of any attack that targets you or an ally within 10m is reduced by Double your Rank.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 70, 'Unshakable Vengeance', 20, ''),
        requirements: [
            requireKeyword('ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. When you suffer a Wound, as a Reflexive Action, spend 1 Faith to Bolterattack the culprit (see Red 2, pg 70).',
        description:
            '<p>You gain +1 Faith. Whenever you suffer one or more Wounds, ' +
            'you may spend 1 Faith as a Reflexive Action to immediately make a Bolter attack against the target that dealt you damage, ' +
            'and may reroll all dice that do not result in Icons on the attack Tests as though you had spent a point of Wrath.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    {
        ...talent('red2', 70, 'Verse of Holy Piety', 10, ''),
        requirements: [
            requireKeyword('ADEPTA SORORITAS'),
            requireKeyword('CHAOS',true),
        ],
        group: 'Faith',
        groupKey: 'core-faith',
        snippet: '+1 Faith. As a Simple Action, spend 1 Faith to make IMPERIUM characters fail Deception and suffer Double Rank shock (see Red 2, pg 70).',
        description:
            '<p>You gain +1 Faith. As a Simple Action you may spend 1 Faith to utter the verse of holy piety. ' +
            'Any character with the IMPERIUM Keyword hearing the verse automatically fails any Fellowship (Deception) Tests ' +
            'and suffers Shock damage equal to double your Rank.</p>',
        modifications: [
            { targetGroup: 'resources', targetValue: 'faith', modifier: 1 },
        ],
    },
    // Adeptus Mechanicus
    {
        ...talent('red2', 71, 'Rad-Saturated', 10, ''),
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
        ],
        snippet: 'Whenever a creature enters Engagement with you or starts a Turn Engaged with you they make a Toughness Test with a DN equal to your Rank x2. If they fail, they are Hindered until the start of their next Turn.',
        description:
            '<p>Whenever a creature enters Engagement with you or starts a Turn Engaged with you they make a Toughness Test with a DN equal to your Rank x2. If they fail, they are Hindered until the start of their next Turn.</p>',
    },
    {
        ...talent('red2', 71, 'Reclamator', 20, ''),
        requirements: [
            requireSkill(SKILLS.TECH, 2),
        ],
        snippet: 'When you requisition Wargear you can choose to reduce the Value by Double Rank to a minimum of 1 (Rarity is unaffected). More on Red 2, pg. 71.',
        description:
            '<p>When you requisition Wargear you can choose to reduce the Value by Double Rank to a minimum of 1 (Rarity is unaffected). ' +
            'However, if you do so, the item cannot be used until you repair it. ' +
            'By default, this requires 8 hours of work and a successful Tech (Int) Test, with a DN equal to the Wargear’s original Value + Rarity. ' +
            'Shifts can be used to halve the repair time.</p>' +
            '<p>If you do not have the <strong>ADEPTUS MECHANICUS</strong>, this activity is considered illegal, a violation of both Lex Imperialis and the Treaty of Mars.</p>',
    },
    {
        ...talent('red2', 71, 'Rite of the Voltagheist', 10, ''),
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
        ],
        snippet: 'When you are hit by a melee attack, or a Complication is rolled on an attack Test that targets you, your attacker suffers Shock damage equal to your Rank. More on Red 2, pg. 71.',
        description:
            '<p>When you are hit by a melee attack, or a Complication is rolled on an attack Test that targets you, your attacker suffers Shock damage equal to your Rank. ' +
            'In addition, your attacker must pass a DN3 Toughness Test or be Restrained for one Round, and be knocked Prone on a Complication.</p>',
    },
    {
        ...talent('red2', 71, 'Rite of Shroudpsalm', 20, ''),
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
        ],
        snippet: 'While the Talent is active, you do not register on auspices, pict-thieves, monoscopes, or other forms of scanning or recording equipment (see Red 2, pg. 71).',
        description:
            '<p>You may activate or deactivate this Talent as a Free Action. While the Talent is active, you do not register on auspices, pict-thieves, monoscopes, or other forms of scanning or recording equipment. ' +
            'Anyone attempting to identify your presence uses their own unmodified Awareness (Int), without any bonuses from Wargear.</p>',
    },
    {
        ...talent('red2', 71, 'Signal Booster', 10, ''),
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
            requireSkill(SKILLS.TECH, 2),
        ],
        snippet: 'Increase Tech Interaction Attack range by x5, shifts for effect are doubled (see Red 2, pg. 71).',
        description:
            '<p>You are equipped to interact with machines at a greater distance, manipulating their spirits to startle and demoralise your foes. ' +
            'The range at which you can make Interaction Attacks using Tech is increased to 5 times your Intellect attribute in metres (Wrath & Glory Rulebook, page 190).</p>' +
            '<p>Any Shifts can be spent to increase the Defence or DN penalty of your target by 2, instead of 1.</p>',
    },
    {
        ...talent('red2', 71, 'Techno-animist', 10, ''),
        requirements: [
            requireKeyword('ADEPTUS MECHANICUS'),
            requireSkill(SKILLS.TECH, 3),
        ],
        snippet: 'You can use Tech (Int) instead of Medicae (Int) to remove Wounds, Shock, and Conditions from targets with the ADEPTUS MECHANICUS Keyword (see Red 2, pg. 71).',
        description:
            '<p>Your skill in repairing augmetics and cyberimplants can restore servitors and the techno-faithful to functionality. ' +
            'You can use Tech (Int) instead of Medicae (Int) to remove Wounds, Shock, and Conditions from targets with the ADEPTUS MECHANICUS Keyword (Wrath & Glory Rulebook, page 124).</p>',
    },
];