import {cost, species} from "./utils";

export const gohe = [
    {
        ...species('gohe', 5, 'Mankind', 'Jokaero', 'Simian Forgers', 10, 6),
        ...cost(58,48,10,0),
        description:
            '<p>Born into the Fire Caste. Your life is determined by war and combat.</p>',
        prerequisites: [
            { group: 'attributes', value: 'intellect', threshold: 4 },
            { group: 'attributes', value: 'fellowship', threshold: 3 },
            { group: 'skills', value: 'tech', threshold: 3 },
        ],
        speciesFeatures: [
            {
                name: 'Simple Simian',
                snippet: 'You gain +Rank to deception tests when convincing other species that you are not sentient and cannot speak.',
                description:
                    'You gain +Rank to deception tests when convincing other species that you are not sentient and cannot speak.',
            },
            {
                name: 'Designed for success',
                snippet: 'You gain +Rank to tech tests when building new machines or operating existing ones.',
                description:
                    'You gain +Rank to tech tests when building new machines or operating existing ones.',
                modifications: [
                    { targetGroup: 'skills', targetValue: 'tech', modifier: 0, rank: 1, condition: 'when building new machines or operating existing ones' },
                ],
            },
        ],
    },
];