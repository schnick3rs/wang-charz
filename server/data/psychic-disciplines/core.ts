import {getLegacySource} from "#server/data/legacy-sources.ts";
import {requireKeyword} from "#server/data/talents/utils.ts";

export const core = [
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-minor',
        name: 'Minor',
        snippet: 'Less powerful psychic phenomena outside of any discipline',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-biomancy',
        name: 'Biomancy',
        snippet: 'Manipulating a biological form',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-divination',
        name: 'Divination',
        snippet: 'Predicting or reading the future',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-pyromancy',
        name: 'Pyromancy',
        snippet: 'Manipulating or producing fire',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-telekinesis',
        name: 'Telekinesis',
        snippet: 'Exerting kinetic force through thought',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-telepathy',
        name: 'Telepathy',
        snippet: 'Manipulating a mind',
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-maleficarum',
        name: 'Maleficarum',
        snippet: 'Unleashing the unholy powers of Chaos',
        requirement: [ requireKeyword('CHAOS') ]
    },
    {
        source: {
            ...getLegacySource('core'),
            page: 257,
        },
        key: 'core-runes-of-battle',
        name: 'Runes of Battle',
        snippet: 'Empowering allies or weakening foes',
        requirement: [ requireKeyword('AELDARI') ]
    },
]