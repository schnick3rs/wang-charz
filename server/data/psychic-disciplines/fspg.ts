import {getLegacySource} from "#server/data/legacy-sources.ts";

export const fspg = [
    {
        source: {
            ...getLegacySource('fspg'),
            page: 1,
        },
        key: 'fspg-librarius',
        name: 'Librarius',
        snippet: 'Oh lord Emperor',
    },
]