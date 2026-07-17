import {ACTIVATION, DURATION, simpleStub, simpleCrunch} from "./utils";

export const aaoaAncestrialRites = [
    {
        ...simpleStub(210, 'aaoa', 183, 20, 'Domination', 'Ancestral Rites', 'Command a single action of the target at the cost of some shock.'),
        ...simpleCrunch('Willpower (Opposed)', ACTIVATION.FULL_ACTION, DURATION.INSTANT, '25m', false, ''),
        keywords: ['Squat','Telepathy','Psychic'],
        description:
            '<p>The Ancestor Lord turns his immense willpower on the mind of a single enemy and takes over its body for a moment. ' +
            'Select an enemy within range: if the psyker wins an opposed willpower test against the target, ' +
            'the target immediately takes a single action of the Ancestor Lord’s choice, following all the normal rules. ' +
            'This power cannot force a creature to take an action which would kill them. ' +
            'The Ancestor Lord suffers 1d3+1 Shock after this power is used.</p>',
    },
    {
        ...simpleStub(211, 'aaoa', 183, 20, 'Force Dome', 'Ancestral Rites', 'Create a Protective Dome.'),
        ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.SUSTAINED, '50m', false, ''),
        keywords: ['Squat','Kinetic','Psychic'],
        description:
            '<p>At the Ancestor Lord’s command, a dome of energy erupts from the ground, and it is as unyielding as the Ancestor Lord’s own mind. ' +
            'The dome appears at anywhere within range, with a radius of 5m (so, it’s 10m across and 5m tall). ' +
            'The dome blocks all line of sight, and ranged attacks cannot damage it. ' +
            'The dome can be attacked in melee: attacks automatically hit, and the dome has a Resilience equal to three times the Ancestor Lord’s Willpower, ' +
            'and Wounds equal to twice the Ancestor Lord’s Psychic Mastery score. It collapses and dissipates when reduced to 0 Wounds. ' +
            'The Ancestor Lord suffers 1 Shock at the end of each turn they sustain this power.</p>',
    },
    {
        ...simpleStub(212, 'aaoa', 184, 20, 'Hammer of Fury', 'Ancestral Rites', 'Deal mortal wounds in a large (18m) range.'),
        ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.INSTANT, '18m', false, ''),
        keywords: ['Squat','Kinetic','Psychic'],
        description:
            '<p>The Ancestor Lord unleashes a mighty psychic hammer blow against their foes, smashing them back with an inexorable kinetic impact. ' +
            'All enemies within range suffer 1d3+1 Mortal Wounds. ' +
            'In addition, enemies must pass a Strength test (DN 5) or be knocked prone and moved away from ' +
            'the Ancestor Lord a number of metres equal to the number of Mortal Wounds they suffered.</p>',
    },
    {
        ...simpleStub(214, 'aaoa', 184, 20, 'Mental Fortress', 'Ancestral Rites', 'Hinder hostile psychic powers that affect you or you allies.'),
        ...simpleCrunch('8', ACTIVATION.ACTION, DURATION.SUSTAINED, '25m', false, ''),
        keywords: ['Squat','Psychic'],
        description:
            '<p>The Ancestor Lord weaves a powerful mental barrier around themselves and those nearby, warding them from mental assault. ' +
            'While this power remains in effect, any hostile psychic power targeted at the Ancestor Lord or an ally within range suffers +4 DN.</p>',
    },
];