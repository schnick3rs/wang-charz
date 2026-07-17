import {ACTIVATION, DURATION, powerz, simpleCrunch} from "./utils";

export const coreAbilities = [
    {
        ...powerz('core',267,'Psyniscience','Universal Ability',0),
        ...simpleCrunch(3, ACTIVATION.FREE_ACTION, DURATION.INSTANT,'50 m',false),
        keywords: ['Psychic'],
        effect: 'Search the area for signs of psychic presence. I not considered a psychic power, no perils of warp.',
    },
    {
        ...powerz('core',267,'Deny The Witch','Universal Ability',0),
        ...simpleCrunch(3,'Action*', DURATION.INSTANT,'50 m',false),
        keywords: ['Psychic'],
        effect: 'Hinder others to affect the Warp.',
    },
];