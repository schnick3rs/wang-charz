import {commonNames, cost, species, statMax} from "./utils";
import {GROUPS} from "#server/data/species/core.ts";

export const dod = [
    {
        ...species('core', 0, GROUPS.MANKIND, 'Battle Brother', 'Followers of Doom', 160, 7),
        variant: 'core-adeptus-astartes',
        ...cost(160,160,0,0),
        ...commonNames('Lucius, Barakus, Raziel, Vladimir, Androcles, Balthazar, Chryses, Diallo, Egnatius, Fafnir, Gerhart, Helbrecht, Ibrahim, Jamshaid, Kalim, Luthando, Maximus, Nicator, Octavian, Proteus, Qaseem, Raziq, Seigfried, Tarik, Ursinus, Viggo, Woyzeck, Xanthus, Youssou, Zosimus.'),
        ...statMax(10,10,9,9,10,10,8,9),
        prerequisites: [
            { group: 'attributes', value: ATTRIBUTES.AGILITY, threshold: 4 },
            { group: 'attributes', value: ATTRIBUTES.INITIATIVE, threshold: 4 },
            { group: 'attributes', value: ATTRIBUTES.INTELLECT, threshold: 3 },
            { group: 'attributes', value: ATTRIBUTES.STRENGTH, threshold: 4 },
            { group: 'attributes', value: ATTRIBUTES.TOUGHNESS, threshold: 4 },
            { group: 'attributes', value: ATTRIBUTES.WILLPOWER, threshold: 3 },
            { group: 'skills', value: SKILLS.ATHLETICS, threshold: 3 },
            { group: 'skills', value: SKILLS.AWARENESS, threshold: 3 },
            { group: 'skills', value: SKILLS.BALLISTIC_SKILL, threshold: 3 },
            { group: 'skills', value: SKILLS.STEALTH, threshold: 3 },
            { group: 'skills', value: SKILLS.WEAPON_SKILL, threshold: 3 },
        ],
        speciesFeatures: [
            {
                key: 'defender-of-humanity',
                name: 'Defender of Humanity',
                snippet: 'Add +Rank icons to any successful attack against a Mob.',
            },
            {
                key: 'honour-the-doctors-of-doom',
                name: 'Honour the Doctors of Doom',
                snippet:
                    'You are subject to the orders of your chapter master, Victor Doom, ' +
                    'and must honour both the beliefs and traditions of your chapter. ' +
                    'You increase your Resolve by 1.',
                modifications: [
                    { targetGroup: 'traits', targetValue: TRAITS.RESOLVE, modifier: 1 },
                ],
            },
            {
                key: 'astartes-implants',
                name: 'Space Marine Implants',
                snippet:
                    'You are immune to the Bleeding Condition. ' +
                    'You gain +1 bonus dice to any test related to one of the 19 implants (p.76) ' +
                    'if the GM agrees it is appropriate.',
            },
            {
                key: 'Angles of Doom',
                name: 'Angles of Doom',
                snippet:
                    'You gain the Angles of Death Talent and the DOCTORS OF DOOM Keyword.',
            },
        ],
    },
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