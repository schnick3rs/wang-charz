import {getLegacySource} from "#server/data/legacy-sources.ts";
import {requireKeyword} from "#server/data/talents/utils.ts";

export const aioe = [
    {
        source: {
            ...getLegacySource('aioe'),
            page: 69,
        },
        key: 'core-bonesinging',
        name: 'Bonesinging',
        snippet: 'Create, shape, repair, and destroy wraithbone',
        requirement: [
            requireKeyword('AELDARI'),
            requireKeyword('ASURYANI,YNNARI,'),
        ]
    },
    {
        source: {
            ...getLegacySource('aioe'),
            page: 70,
        },
        key: 'core-phantasmancy',
        name: 'Phantasmancy',
        snippet: 'Subtle manipulation and cruel application of psychic illusion and deception',
    },
    {
        source: {
            ...getLegacySource('aioe'),
            page: 72,
        },
        key: 'aioe-runes-of-battle',
        name: 'Runes of Battle',
        snippet: 'Empowering allies or weakening foes',
        /// requirement: [ requireKeyword('AELDARI') ] but why
    },
    {
        source: {
            ...getLegacySource('aioe'),
            page: 74,
        },
        key: 'aioe-runes-of-fate',
        name: 'Runes of Fate',
        snippet: 'unravel the very threads of fate itself or unleash powerful torrents',
        /// requirement: [ requireKeyword('AELDARI') ] but why
    },
    {
        source: {
            ...getLegacySource('aioe'),
            page: 75,
        },
        key: 'aioe-runes-of-fortune',
        name: 'Runes of Fortune',
        snippet: 'unlock the various strands of fate that intricately weave across the Galaxy',
        /// requirement: [ requireKeyword('AELDARI') ] but why
    },
]