import {ACTIVATION, DURATION, simpleStub, simpleCrunch} from "./utils";

export const aaoaLibrariusPowers = [
    {
        ...simpleStub(241, 'aaoa', 283, 15, 'Fury of the Ancients (AAOA)', 'Librarius', ''),
        key: 'aaoa-fury-of-the-ancients',
        ...simpleCrunch('7', ACTIVATION.ACTION, DURATION.INSTANT, '*', false, '', '[2] +1 Mortal Wound per target.;[2] Increase the range by +1d6.'),
        keywords: ['Psychic'],
        description:
            '<p>Calling upon the myths and legends of his Chapter’s homeworld, the Librarian sends forth a terrifying monstrosity wrought from psychic energy. If successful, roll a number of d6 equal to the psyker’s Willpower. This power projects a monstrous psychic projection two metres wide in a straight line which extends out a number of metres equal to the total rolled. Any enemy touched by the projection suffers 1d3 Mortal Wounds.</p>',
    },
    {
        ...simpleStub(242, 'aaoa', 283, 20, 'Might of Heroes (AAOA)', 'Librarius', ''),
        key: 'aaoa-might-of-heroes',
        ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.ONE_COMBAT, '25m', false, '', '[2] Bonuses to Strength, Toughness, and DN reduction increase by +1.'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker cages the immense power of the immaterium within his physical form and becomes the Emperor’s vengeance given flesh. If successful, select an ally with the Adeptus Astartes keyword (which may include yourself) within range. While the power remains in effect, the chosen character increases his Strength and Toughness by +4, and he ignores up to 4 points of DN increase for taking</p>',
    },
    {
        ...simpleStub(243, 'aaoa', 283, 30, 'Null Zone (AAOA)', 'Librarius', ''),
        key: 'aaoa-null-zone',
        ...simpleCrunch('8', ACTIVATION.FULL_ACTION, DURATION.SUSTAINED, '25m', false, '', '[2] +6m range.;*[2] Time to activate reduced to an Action.'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker unleashes the full might of his mind to cast down his opponent’s defences, both technological and mystical. While this power remains in effect, enemies within range of the psyker may not attempt to Soak and increase the DN for all Psychic Mastery tests by +4. This power is taxing to sustain, so the psyker suffers 1 Shock each turn they sustain the power.</p>',
    },
    {
        ...simpleStub(244, 'aaoa', 283, 15, 'Psychic Fortress (AAOA)', 'Librarius', ''),
        key: 'aaoa-psychic-fortress',
        ...simpleCrunch('5', ACTIVATION.ACTION, DURATION.SUSTAINED, '35m', true, '', '[2] +5m range.;*[2] The target is also automatically successful on Conviction tests.'),
        keywords: ['Psychic'],
        description:
            '<p>Drawing on boundless reserves of inner strength, the psyker shields his battle-brothers from mortal fears and the threat of sorcerous assault. If successful, select an ally within range. That ally will automatically succeed at all Resolve tests and are immune to fear, terror, and intimidation-based Interaction attacks. Further, each time the ally Soaks to resist damage from a psychic power, they gain bonus dice equal to your Psychic Mastery, and may Soak Mortal Wounds.</p>',
    },
    {
        ...simpleStub(245, 'aaoa', 284, 15, 'Psychic Scourge (AAOA)', 'Librarius', ''),
        key: 'aaoa-psychic-scourge',
        ...simpleCrunch('Resolve', ACTIVATION.ACTION, DURATION.INSTANT, '35m', true, '', '[1] +1 Mortal Wound.'),
        keywords: ['Psychic', 'Telepathy'],
        description:
            '<p>The psyker pits his superhuman willpower against that of his enemies in a battle of mental fortitude, seeking to destroy their minds in a burst of psychic fury. The psyker targets one enemy with a psychic ranged attack. If hit, the target suffers 1d3 Mortal Wounds.</p>',
    },
    {
        ...simpleStub(246, 'aaoa', 284, 20, 'Veil of Time (AAOA)', 'Librarius', ''),
        key: 'aaoa-veil-of-time',
        ...simpleCrunch('6', ACTIVATION.ACTION, DURATION.INSTANT, '35m', true, '', '[2] Bonus to Speed increases by +1.'),
        keywords: ['Psychic'],
        description:
            '<p>The psyker projects their will beyond the regular passage of time, taking in the strands of fate before returning to the present to sway the tide of battle. If successful, select an ally within range. That ally increases their Speed by +2 when charging, advancing, or running. In addition, it does not cost Glory for that ally to Seize the Initiative.</p>',
    },
];
