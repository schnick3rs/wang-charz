import {ACTIVATION, DURATION, simpleStub, simpleCrunch} from "./utils";

export const aaoaSancticPowers = [
    {
        ...simpleStub(220, 'aaoa2', 157, 20, 'Astral Aim', 'Sanctic', ''),
        ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1d bonus to ranged attacks;[3] +5m range'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker reaches to the minds of his battle-brothers, guiding their aim to the chosen target. ' +
            'The psyker, and all allies within 5m, may make ranged attacks against enemies they cannot see, ' +
            'and ignore any bonuses to Defence from cover on those ranged attacks, until the start of your next turn.</p>',
    },
    {
        ...simpleStub(221, 'aaoa2', 157, 20, 'Gate of Infinity', 'Sanctic', ''),
        ...simpleCrunch('6', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '500m', false, '', '[3] +500m range'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker punches a corridor through the roiling immaterium, allowing him to cross great distances in the blink of an eye. ' +
            'The psyker, and all allies within 5m immediately vanish, and reappear anywhere within range, ' +
            'which must also be more than 20m from an enemy.</p>',
    },
    {
        ...simpleStub(222, 'aaoa2', 157, 20, 'Hammerhand', 'Sanctic', ''),
        ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1ED to damage,[3] +5m range'),
        keywords: ['Psychic'],
        description:
            '<p>Focusing the raging power of his mind, the psyker augments the strength of his comrades ' +
            'to the point where they can crush flesh and bone with a single blow. ' +
            'The psyker, and all allies within 5m, add +1ED to the damage of all melee attacks they make until the start of the psyker’s next turn.</p>',
    },
    {
        ...simpleStub(223, 'aaoa2', 157, 15, 'Purge Soul', 'Sanctic', ''),
        ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.INSTANT, '25m', true, '', '[1] +1 Mortal Wound'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker draws upon all of his willpower to purge the evil of his foes’ souls, ' +
            'scouring every trace of corruption even if it destroys them in the process. ' +
            'The psyker targets one enemy with a psychic ranged attack. ' +
            'If hit, the target suffers 1 Mortal Wound and is staggered until the start of its next turn.</p>' +
            '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
    },
    {
        ...simpleStub(224, 'aaoa2', 158, 10, 'Rites of Banishment', 'Sanctic', ''),
        ...simpleCrunch('Defence', ACTIVATION.ACTION, DURATION.INSTANT, '25m', true, '', '[2] +1 Mortal Wound'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker utters prayers and litanies of detestation and antipathy, which sever the bonds holding Daemons to the material universe, ' +
            'banishing them to the roiling hellscape from whence they came. ' +
            'The psyker targets one enemy with a psychic ranged attack. ' +
            'If hit, the target suffers 1d3 Mortal Wounds, or 1d3+3 Mortal Wounds if they have the Daemon keyword.</p>' +
            '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
    },
    {
        ...simpleStub(225, 'aaoa', 158, 25, 'Sanctuary', 'Sanctic', ''),
        ...simpleCrunch('25', ACTIVATION.ACTION, DURATION.ONE_ROUND, '5m', false, '', '[2] +1d to Soak rolls;[3] +5m range.'),
        keywords: ['Psychic'],
        description:
            '<p>Chanting words of warding, the psyker creates a zone of light around him that can protect him from harm and repel daemonic creatures. ' +
            'The psyker, and all allies within 5m, add +1d to all Soak tests, may Soak Mortal Wounds, and do not suffer Shock when they Soak damage, ' +
            'until the start of next turn. ' +
            'Further, creatures with the Daemon keyword treat the area within range of the psyker as difficult terrain until the start of your next turn.</p>',
    },
    {
        ...simpleStub(226, 'aaoa', 158, 30, 'Vortex of Doom', 'Sanctic', ''),
        ...simpleCrunch('8', ACTIVATION.FULL_ACTION, DURATION.ONE_ROUND, '25m', false, '', '[2] +1 Mortal Wound per target.;*[2] Increase the area of effect to a Large Blast.;*[2] Time to activate reduced to an Action.'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker tears a rift between realspace and the Warp, condemning his foes to oblivion. ' +
            'The power affects all creatures in a Medium Blast, dragging them into a howling vortex. ' +
            'Every creature within the area suffers 1d3 Mortal Wounds.</p>' +
            '<p>Creatures with the Daemon keyword may not Soak any Mortal Wounds inflicted by this power.</p>',
    },
];