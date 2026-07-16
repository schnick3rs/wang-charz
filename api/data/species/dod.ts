import {cost, species} from "./utils";

export const dod = [
    // Tau
    {
        ...species('dod', 1, 'Tau Empire', 'Shas T\'au', 'The Offspring of Fire', 0, 6),
        ...cost(9,4,5,0),
        description:
            '<p>Born into the Fire Caste. Your life is determined by war and combat.</p>',
        prerequisites: [
            { group: 'attributes', value: 'agility', threshold: 2 },
        ],
        speciesFeatures: [
            {
                name: 'Bound by Caste',
                snippet: 'You gain +1 to athletic and survival tests.',
                description:
                    'Fire (Shas) form the military and are capable survivors and hunters. You gain +1 to athletic and survival tests.',
                modifications: [
                    { targetGroup: 'skill', targetValue: 'athletics', modifier: 1 },
                    { targetGroup: 'skill', targetValue: 'survival', modifier: 1 },
                ],
            },
            {
                name: 'Warp Presence',
                snippet: 'Never a Psyker. You gain +1 to resist telephatic powers or for Conviction tests.',
                description:
                    'Tau can never have the PSYKER keyword or learn Psychic Powers. Their low presence in the warp also gives them +1 bonus dice when resiting telephatic powers or for Conviction tests.',
                modifications: [
                    { targetGroup: 'trait', targetValue: 'conviction', modifier: 1 },
                ],
            },
            {
                name: 'For the Greater Good',
                snippet: 'Once per combat round, you may allow that an ally within 15 meters spend a Wrath Token from your pool as if it was theirs.',
                description:
                    'Once per combat round, you may allow that an ally within 15 meters spend a Wrath Token from your pool as if it was theirs.',
            },
        ],
    },
];