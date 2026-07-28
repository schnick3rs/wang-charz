import {background, faction} from "./utils";


export const lex = [
    {
        name: 'Adeptus Arbites',
        ...faction('lex',6,'Imperium','Adeptus Arbites'),
        backgroundSection: [
            // ORIGIN
            background('Holy Inspiration: You followed in the footsteps of an Imperial Saint on a pilgrimage, an interstellar voyage, or a military campaign. Your idol inspired your faith to new heights.', 'Resolve', 'Origin'),
        ],
        objectives: [
            'Quote a specific sub-section of the Lex Imperialis.',
            'Successfully suppress a large crowd or riot',
            'Find a new lead by investigating a crime scene.',
            'Use your status as an Arbites to intimidate a local citizen.',
            'Extract a confession from an apprehended suspect.',
            'Bring a known recidivist to justice.',
        ],
        advancedCreationKeywords: ['Imperium','Adeptus Arbites'],
    },
];
