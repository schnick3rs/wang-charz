import {getLegacySource} from "#server/data/legacy-sources.ts";

export const voab = [
    {
        source: {
            ...getLegacySource('voab'),
            page: 1,
        },
        key: 'voab-librarius',
        name: 'Librarius',
        snippet: 'Oh lord Emperor (again?)',
    },
]