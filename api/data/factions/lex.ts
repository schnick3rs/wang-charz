import {background, faction} from "./utils";

export const lex = [
    {
        ...faction('lex',6,'Imperium','Adeptus Arbites'),
        backgroundSection: [
            background('Schola Progenium: You were raised from childhood to know nothing but discipline, duty, and the Emperor\'s laws.', 'Max Wounds', 'Origin'),
            background('Line-of-Duty: You were drafted directly from a planetary enforcement force after demonstrating cold-blooded efficiency in the application of local law.', 'Resolve', 'Origin'),
            background('Secundus Tithe: You were transferred from a distant sector of Imperial space to replace heavy losses and, as such, view the local populations with suspicion.', 'Resolve', 'Origin'),
            background('The Long Night: You were part of a force holding a remote Arbites Precinct against overwhelming odds.', 'Determination', 'Accomplishment'),
            background('Workplace Negotiator: You participated in suppressing a workforce riot and executed the ringleaders with ruthless efficiency.', 'Max Shock', 'Accomplishment'),
            background('High Treason: You prosecuted the fall of a corrupt noble house, regardless of political consequence.', 'Influence', 'Accomplishment'),
            background('Sector Subjugation: You seek to bring the order of Imperial Law to the Sector. ', 'Conviction', 'Goal'),
            background('Bounty Hunter: You are tracking a known recidivist and will stop at nothing to bring them to justice.', 'Determination', 'Goal'),
            background('Earn the Eagle: You strive to rise through the ranks of the Adeptus Arbites', 'Influence', 'Goal'),
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
