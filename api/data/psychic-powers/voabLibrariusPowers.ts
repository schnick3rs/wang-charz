import {ACTIVATION, DURATION, powerz, simpleCrunch} from "./utils";

export const voabPowers = [
    {
        ...powerz('voab', 52, 'Veil of Time', 'Librarius', 20),
        ...simpleCrunch(
            6,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '10m',
            true,
            'Targets may move up to twice the normal distance each turn. Up to one Agent affected may Seize the Initiative each round without spending Glory. Seizing more than once in a round costs Glory as normal.',
            '[2] Targets may perform an additional Simple Action each turn or perform a Multi-Action without penalty.'
        ),
        keywords: ['Psychic'],
        effect:
            'Targets may move up to twice the normal distance each turn. Up to one Agent affected may Seize the Initiative each round without spending Glory. Seizing more than once in a round costs Glory as normal.',
        description:
            '<p>You push against the flow of time through pure will, directing your allies’ movement through the temporal currents at what appear to be impossible speeds. So enhanced, you and your allies can strike anywhere on the battlefield in the blink of an eye. Targets affected by this power may move up to twice the normal distance on each turn. In addition, up to one Agent affected by this power may Seize the Initiative (Wrath & Glory Core Rulebook, page 177) in each combat round without spending a point of Glory to do so. Seizing the Initiative more than once in a round costs Glory as standard, no matter how many Agents are affected by this power.</p>',
    },
    {
        ...powerz('voab', 52, 'Might of Heroes', 'Librarius', 20),
        ...simpleCrunch(
            8,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '10m',
            false,
            'Target may make an additional attack each Attack Action; Defence +1; +1 bonus die to attacks while sustained. Both you and the target suffer 1 Shock at the start of your turn while sustained. If you target yourself, you suffer 2 Shock at the start of your turn.',
            '[1] Target does not suffer Shock while sustained if another character; if you are the target, you suffer only 1 Shock at the start of your turn.;[3] All attacks made by the target while sustained inflict +1 ED on a successful hit.'
        ),
        keywords: ['Psychic'],
        effect:
            'Target may make an additional attack each Attack Action; Defence +1; +1 bonus die to attacks while sustained. Both you and the target suffer 1 Shock at the start of your turn while sustained. If you target yourself, you suffer 2 Shock at the start of your turn.',
        description:
            '<p>Drawing on the energies of the Empyrean, you fill an ally with immense vigour and swiftness, making them a lever with which you can shift the battle’s outcome. The target may make an additional attack each time they make an Attack Action; their Defence is increased by +1, and they add one bonus die to any attack they make while this power is sustained. However, such enhancement comes at a cost for both you and your ally. Both you and the target suffer 1 Shock at the start of your turn while you sustain this power. In addition, if you target yourself with this power, you suffer 2 Shock at the beginning of your turn.</p>',
    },
    {
        ...powerz('voab', 52, 'Fury of the Ancients', 'Librarius', 15),
        ...simpleCrunch(
            9,
            ACTIVATION.ACTION,
            DURATION.INSTANT,
            '30m',
            false,
            'Summon a force that travels forward up to Range, striking up to five foes for d3 Mortal Wounds each.',
            '[1] +10m range;[2] +1 enemy can be affected'
        ),
        keywords: ['Psychic'],
        effect:
            'Summon a force that travels forward up to Range, striking up to five foes for d3 Mortal Wounds each.',
        description:
            '<p>Calling upon the myths of your Chapter, you conjure the visage of a terrifying monster or legendary hero and send forth their avatar to strike down your foes. The summoned force travels forward in a path out to the power’s Range, striking up to five foes and causing them to suffer d3 Mortal Wounds each. After delivering its wrath, the summoned entity dissipates into nothingness.</p>',
    },
    {
        ...powerz('voab', 52, 'Psychic Fortress', 'Librarius', 15),
        ...simpleCrunch(
            7,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '10m',
            false,
            'All allies within Range increase their Armour to 3 if not already higher; their Armour becomes Invulnerable while sustained.',
            '[1] Allies gain an additional point of Armour, up to a maximum of 4. Allies with 4 or more Armour already are unaffected.'
        ),
        keywords: ['Psychic'],
        effect:
            'All allies within Range increase their Armour to 3 if not already higher; their Armour becomes Invulnerable while sustained.',
        description:
            '<p>By infusing your power into an adamant barrier around your comrades, you protect them from enemy attacks and help limit any losses that must be suffered to succeed in your mission or achieve victory in battle. All allies within Range increase their Armour to 3 if it was not already higher, and your allies’ Armour becomes Invulnerable (Wrath & Glory Core Rulebook, page 232) while the power is sustained.</p>',
    },
    {
        ...powerz('voab', 53, 'Shrouding', 'Obscuration', 15),
        ...simpleCrunch(
            4,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '30m',
            true,
            'Affected targets may Hide and Move Stealthily without regard to cover and while moving at full Speed. Enemies attempting to perceive them suffer a +2 DN increase. Does not affect fully automated systems without a mind, but does affect remote observation.',
            '[1] Affected targets gain +1 die to Stealth (A) Tests while the power is sustained.;[2] Enemies attempting to perceive affected targets suffer an additional +2 DN increase.;[3] Automated systems are affected by this power.'
        ),
        keywords: ['Psychic'],
        effect:
            'Affected targets may Hide and Move Stealthily without regard to cover and while moving at full Speed. Enemies attempting to perceive them suffer a +2 DN increase. Does not affect fully automated systems without a mind, but does affect remote observation.',
        description:
            '<p>You weave shadows over your enemies’ minds, rendering your comrades as little more than indistinct blurs, if they can be glimpsed at all. Affected targets may Hide and Move Stealthily (Wrath & Glory Core Rulebook, pages 181-182) without regard to cover and while moving at full Speed. In addition, enemies attempting to perceive them suffer a +2 DN increase. This power does not affect fully automated systems without a mind, although this power affects remote observation (through cameras or the like).</p>',
    },
    {
        ...powerz('voab', 54, 'Soul Sight', 'Obscuration', 15),
        ...simpleCrunch(
            6,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '30m',
            true,
            'Characters affected can see any living being within 100m, ignoring obscurity from any physical barrier. Enemies hiding halve their Stealth Score and cannot benefit from cover. Attacks ignore DN/Defence increases from lack of light, cover, or similar concerns.',
            '[2] Affected targets gain +1 die to Awareness (Int) and Ballistic Skill (A) tests while this power is sustained.'
        ),
        keywords: ['Psychic'],
        effect:
            'Characters affected can see any living being within 100m, ignoring obscurity from any physical barrier. Enemies hiding halve their Stealth Score and cannot benefit from cover. Attacks ignore DN/Defence increases from lack of light, cover, or similar concerns.',
        description:
            '<p>Reaching your awareness through the Immaterium, you enable your brothers to perceive the very souls of others. Mere physical barriers can obscure neither your sight nor your aim, while those being observed are none the wiser save perhaps when locking eyes with one so affected and seeing the strange glowing reflections therein. Characters affected by this power can see any living being within 100m, ignoring obscurity from any physical barrier. When attempting to hide from a target of this power, enemies halve their Stealth Score (Wrath & Glory Core Rulebook, p181-182) rounding down and cannot benefit from cover. In addition, a character helping from Soul Sight, who is firing at a foe with a soul, ignores increases to DN or the target’s Defence from lack of light, cover, or similar concerns of normal vision. However, there must still be a way to land a shot on the target physically.</p>',
    },
    {
        ...powerz('voab', 54, 'Tenebrous Curse', 'Obscuration', 15),
        ...simpleCrunch(
            'Defence',
            ACTIVATION.ACTION,
            DURATION.INSTANT,
            '30m',
            true,
            'Target one enemy within range and make a Psychic Mastery (Wil) Test against their Defence. If successful, the target suffers a Mortal Wound and halves its Speed until the start of your next turn. The target cannot fly while affected.',
            '[1] The target cannot Charge until the start of your next turn.;[3] +1 Mortal Wound'
        ),
        keywords: ['Psychic'],
        effect:
            'Target one enemy within range and make a Psychic Mastery (Wil) Test against their Defence. If successful, the target suffers a Mortal Wound and halves its Speed until the start of your next turn. The target cannot fly while affected.',
        description:
            '<p>Such is your mastery of stealth that the very shadows in which you walk are your allies. You can reach through the darkness to the shadows of your enemies and animate them as weapons against your unsuspecting foes. Target one enemy within range and make a Psychic Mastery (Wil) Test against their Defence. If successful, the target suffers a Mortal Wound and halves its Speed until the start of your next turn. While so affected, the target is dragged to the ground by the grip of their shadow and cannot fly.</p>',
    },
    {
        ...powerz('voab', 54, 'Mind Raid', 'Obscuration', 20),
        ...simpleCrunch(
            'Willpower (Opposed)',
            ACTIVATION.ACTION,
            DURATION.INSTANT,
            '20m',
            false,
            'Target one enemy within range and make an opposed Psychic Mastery (Wil) Test against their Willpower. If successful, you learn facts from the target equal to the difference in the Test results as if you had asked them questions that they wholly and truthfully answered. The target suffers damage equal to your total successes and cannot add Armour to their Resilience against this damage.',
            '[2] You better understand the learned information, viewing locations and people with which the target was familiar as if you had seen them yourself. You benefit from a -2 DN reduction to any Tests to identify relevant locales and individuals.;[3] Damage is Mortal Wounds.'
        ),
        keywords: ['Psychic'],
        effect:
            'Target one enemy within range and make an opposed Psychic Mastery (Wil) Test against their Willpower. If successful, you learn facts from the target equal to the difference in the Test results as if you had asked them questions that they wholly and truthfully answered. The target suffers damage equal to your total successes and cannot add Armour to their Resilience against this damage.',
        description:
            '<p>You reach brutally into the target’s psyche, tearing secrets from their brain with such force that the weak-willed fatally haemorrhage as they struggle to resist your power. Target one enemy within range and make an opposed Psychic Mastery (Wil) Test against their Willpower. An enemy may suffer up to their Willpower in Shock to add the same number of dice to their test. If you are successful, you learn facts from the target equal to the difference in the Test results as if you had asked them questions that they wholly and truthfully answered. The GM must decide what information the target had access to and would remember but must ultimately provide the information you request within those bounds. In addition, the target suffers damage equal to your total successes and cannot add Armour to their Resilience against this damage.</p>',
    },
    {
        ...powerz('voab', 56, 'Bastion of Force', 'Unbroken', 15),
        ...simpleCrunch(
            7,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            '30m',
            true,
            'Target’s Armour increases to 4 if it is not already higher. Armour becomes Invulnerable while sustained.',
            '[1] Target gains an additional point of Armour, up to a maximum of 5. Targets with 5 or more Armour already are unaffected.;[3] All allies within 10m of the target benefit from this power.'
        ),
        keywords: ['Psychic'],
        effect:
            'Target’s Armour increases to 4 if it is not already higher. Armour becomes Invulnerable while sustained.',
        description:
            '<p>You call forth a wave of shimmering energy that flows through the target to protect them from harm. The target’s Armour increases to 4 if it is not already higher. In addition, the target’s Armour becomes Invulnerable (Wrath & Glory Core Rulebook, page 232) while the power is sustained.</p>',
    },
    {
        ...powerz('voab', 56, 'Swift as Prophecy', 'Unbroken', 20),
        ...simpleCrunch(
            6,
            ACTIVATION.SIMPLE_ACTION,
            'UntilEndOfTurn',
            'Self',
            false,
            'Your Speed is doubled. You may take an additional Action on your turn and include multiple melee Attack Actions in a Multi-Action.',
            '[1] Your Speed is tripled instead of doubled.;[3] Penalties for Multi-Actions are reduced by 1.'
        ),
        keywords: ['Psychic'],
        effect:
            'Your Speed is doubled. You may take an additional Action on your turn and include multiple melee Attack Actions in a Multi-Action.',
        description:
            '<p>You draw upon the powers of the Immaterium and the innate gift of prophecy, dormant in your Gene-Seed, to enhance your reflexes beyond even that of your transhuman battle-brothers, becoming impossibly swift for an instant. After activating this power, your Speed is doubled. In addition, you may take an additional Action on your turn and include multiple melee Attack Actions in a Multi-Action (Wrath & Glory Core Rulebook, page 178).</p>',
    },
    {
        ...powerz('voab', 56, 'On Wings of Wrath', 'Unbroken', 15),
        ...simpleCrunch(
            4,
            ACTIVATION.ACTION,
            DURATION.SUSTAINED,
            'Self',
            false,
            'You can fly at double your Speed while you sustain this power.',
            '[1] You may immediately fly a distance equal to your enhanced Speed upon initially manifesting this power.;[2] You can fly at triple your Speed instead of double.'
        ),
        keywords: ['Psychic'],
        effect:
            'You can fly at double your Speed while you sustain this power.',
        description:
            '<p>Summoning pinions of psychic energy, you bear yourself aloft and soar above your foes. You can fly at double your Speed while you sustain this power.</p>',
    },
];