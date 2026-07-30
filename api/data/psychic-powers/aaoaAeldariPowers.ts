import {ACTIVATION, DURATION, powerz, simpleCrunch} from "./utils";

export const aaoaAeldariPowers = [
    // Runes of Fortune (Minor powers)
    {
        ...powerz('aaoa',226,'Crushing Orb','Runes of Fortune',10),
        ...simpleCrunch('Strength', ACTIVATION.ACTION, DURATION.INSTANT,'18m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'You crush your foe in a sphere of kinetic energy.',
        effect: 'Deal 1 mortal wound and restrain.',
        description:
            '<p>You crush your foe in a sphere of kinetic energy. You target a single enemy within range with a psychic ranged attack, inflicting 1 Mortal Wound and the Restrained condition.</p>',
    },
    {
        ...powerz('aaoa',226,'Fateful Divergence','Runes of Fortune',10),
        ...simpleCrunch(3, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',true),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'Exerting your will upon destiny, you shift the paths of fate.',
        effect: 'Target ally may reroll a single dice.',
        description:
            '<p>Exerting your will upon destiny, you shift the paths of fate. You select a single ally within range. Until the start of your next turn, the target may re-roll a single die in any dice pool.</p>',
    },
    {
        ...powerz('aaoa',226,'Focus Will','Runes of Fortune',10),
        ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'You channel your mind to aid a fellow seer.',
        effect: 'An ally adds +1/+2 dice to Psychic Mastery tests.',
        description:
            '<p>You channel your mind to aid a fellow seer. You select a single Psyker within range. Whenever the target attempts a Psychic Mastery test before the end of their next turn, they may add +1 bonus dice to their test, or +2 bonus dice if they have the ASURYANI keyword.</p>',
    },
    {
        ...powerz('aaoa',226,'Ghostwalk','Runes of Fortune',10),
        ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'6m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'Imbue your allies with ethereal speed.',
        effect: 'Up to WIL targets gain +2 Speed.',
        description:
            '<p>Channelling energies from your runes, you imbue your allies with ethereal speed. You select a number of allies within range equal to your Willpower. Until the start of your next turn, the targets increase their Speed by +2.</p>',
    },
    {
        ...powerz('aaoa',226,'Impair Senses','Runes of Fortune',10),
        ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'The psyker dims the foe’s senses.',
        effect: 'Reduce enemies awareness and line-of-sight.',
        description:
            '<p>The psyker dims the foe’s senses. The power affects all enemies in a Medium Blast within range. Until the start of the psyker’s next turn, the affected enemies add +2DN to all Awareness tests, reduce their Passive Awareness to 0, and may only make ranged attacks at the closest target.</p>',
    },
    {
        ...powerz('aaoa',227,'Witch Strike','Runes of Fortune',10),
        ...simpleCrunch(3, ACTIVATION.SIMPLE_ACTION, DURATION.ONE_ROUND,'Self',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'Strike foes with potent aetheric energies.',
        effect: 'Add +2ED to your FORCE melee Weapon.',
        description:
            '<p>Focusing a still greater portion of your power into your weapon, each strike blasts foes with potent aetheric energies. Until the start of your next turn, you add +2ED to the damage of one melee weapon you are wielding which has the Force trait.</p>',
    },
    // Runes of Shaping (Bonesinger)
    {
        ...powerz('aaoa',227,'Vaul´s Song','Runes of Shaping',10),
        ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'You invoke the psychosonic ringing of Vaul´s anvil, knitting together wraithbone and psychoreactive crystal in moments.',
        effect: 'Heal AELDARI vehicles or wraith-structures.',
        description:
            '<p>You invoke the psychosonic ringing of Vaul´s anvil, knitting together wraithbone and psychoreactive crystal in moments. Select a single AELDARI vehicle or wraith-construct within range. The target regains 1d3+1 Wounds. Alternatively, target one other pieces of Aeldari technology within range: the device is repaired, and any malfunctions or jams are fixed instantly.</p>' +
            '<p><em>You can multi-target for small items of technology</em></p>',
    },
    {
        ...powerz('aaoa',227,'Webway Step','Runes of Shaping',20),
        ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.INSTANT,'25 m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword and must be holding a Webway key to use this power.'],
        hint: 'You are highly attuned to the Webway, and can slip within its reaches with ease, without the use of a gate.',
        effect: 'You vanish and reappear a few moments later at any point within range.',
        description:
            '<p>You are highly attuned to the Webway, and can slip within its reaches with ease, without the use of a gate. You vanish and reappear a few moments later at any point within range. You must reappear standing on solid ground or another object sturdy enough to support your weight.</p>',
    },
    {
        ...powerz('aaoa',227,'Wraithtomb','Runes of Shaping',15),
        ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'10 m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the AELDARI Keyword.'],
        hint: 'Grapple enemies with thorny tendrils or create shapes.',
        effect: 'Grapple enemies with thorny tendrils or create shapes.',
        description:
            '<p>You conjure and weave a tangle of wraithvines, psychic constructs that take the form of thorny tendrils which enwrap themselves around the target. Though they will not remain coherent without wraithbone or psychocrystal to make the structure tangible, the vines are solid enough for the moment. This power targets a single creature, vehicle, or structure within range. If a creature or vehicle, the target is restrained and hindered (3) while the power remains in effect. If a structure is the target, then the wraithvines wrap themselves around and into the structure in a manner determined by the Bonesinger and the GM: it may seal over or force open doors, ensnare and shut down automated defences, create a climbable surface, or something similar.</p>',
    },
    // Runes of Fate Farseer)
    // Phantasmancy (Harlequin)
    {
        ...powerz('aaoa',230,'Fog of Dreams','Phantasmancy',20),
        ...simpleCrunch(5, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
        keywords: ['Aeldari','Psychic', 'Telepathy'],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'Reduce the attack efficiency of affected ennemies',
        effect: 'The power affects all enemies in a Medium Blast within range. All attacks made by the affected enemies suffer +2 DN until the start of your next turn.',
        description:
            '<p>You send forth your consciousness like a creeping mist, baffling the senses of the enemy. The power affects all enemies in a Medium Blast within range. All attacks made by the affected enemies suffer +2 DN until the start of your next turn..</p>',
    },
    {
        ...powerz('aaoa',230,'Mirror of Minds','Phantasmancy',25),
        ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'25 m',false),
        keywords: ['Aeldari','Psychic', 'Telepathy'],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'you gamble with your target to deal mortal wounds',
        effect: 'you and the target roll 1d6. If you roll equal to or higher than the target, then the target suffers 1 Mortal Wound. Repeat this until either the target is reduced to 0 Wounds or they roll higher than you.',
        description:
            '<p>A maddening clash of wills consumes the victim’s mind as reality falls away. Select an enemy within range, and both you and the target roll 1d6. If you roll equal to or higher than the target, then the target suffers 1 Mortal Wound. Repeat this until either the target is reduced to 0 Wounds or they roll higher than you.</p>',
    },
    {
        ...powerz('aaoa',230,'Shards of Light','Phantasmancy',20),
        ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
        keywords: ['Aeldari','Psychic', 'Telepathy'],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'Deal mortal wound and apply nasty status effect in an area',
        effect: 'The power affects all enemies in a Medium Blast within range. Each target suffers 1 Mortal Wound and is blinded and pinned until the start of your next turn.',
        description:
            '<p>Blades of polychrome energy dazzle the foe, inflicting horrific and disorienting psychosomatic wounds. The power affects all enemies in a Medium Blast within range. Each target suffers 1 Mortal Wound and is blinded and pinned until the start of your next turn.</p>',
    },
    {
        ...powerz('aaoa',230,'Twilight Pathways','Phantasmancy',15),
        ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.INSTANT,'5 m',false),
        keywords: ['Aeldari','Psychic',],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'Immediate group free movement',
        effect: 'You and any number of allies within range may immediately move up to your Speed.',
        description:
            '<p>Eerie half-lit tunnels blink into existence, opening new paths of manoeuvre and attack. You and any number of allies within range may immediately move up to your Speed.</p>',
    },
    {
        ...powerz('aaoa',230,'Veil of Tear','Phantasmancy',15),
        ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'18 m',false),
        keywords: ['Aeldari','Psychic', 'Telepathy'],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'Boost defence and stealth of allies',
        effect: 'Select a number of allies equal to your Willpower within range. The affected allies gain +2 Defence and +2 bonus dice on Stealth tests.',
        description:
            '<p>Sketching a gesture in the air, you snatch the image of your allies from the minds of your foes, hiding them from sight. Select a number of allies equal to your Willpower within range. The affected allies gain +2 Defence and +2 bonus dice on Stealth tests.</p>',
    },
    {
        ...powerz('aaoa',230,'Webway Dance','Phantasmancy',25),
        ...simpleCrunch(6, ACTIVATION.ACTION, DURATION.ONE_ROUND,'12 m',false),
        keywords: ['Aeldari','Psychic'],
        prerequisite: ['Psyker must have the HARLEQUIN Keyword.'],
        hint: 'Allies and you roll Determination without suffering shock',
        effect: 'Until the start of your next turn, you and any allies within range may roll Determination without suffering Shock—Icons rolled simply negate Wounds instead.',
        description:
            '<p>The veil between realspace and the Webway grows thin, allowing Harlequins to jink away from danger in directions that shouldn’t exist, only to reappear unharmed moments later. Until the start of your next turn, you and any allies within range may roll Determination without suffering Shock—Icons rolled simply negate Wounds instead.</p>',
    },
    // Revenant (Ynnari)
];