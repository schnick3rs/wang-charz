import {SKILLS} from "../../db/static/_statUtils";
import {simpleStub} from "./utils";

export const red2 = [
    {
        name: 'Cadre Questor',
        ...simpleStub('red2', 73, 'Cadre Questor', 'A quest, gladly taken or demandfull given', false),
        cost: 0,
        costPerTier: 30,
        minimumCampaignTier: 2,
        prerequisites: [],
        keywordString: '[Any]',
        // Benefits
        influenceBonus: 0,
        influencePerTier: 0,
        storyElementDescription:
            '<p>A Faction tasks or forces you into resolving a quest. You gain:</p>' +
            '<ul>' +
            '<li>The Devotee Talent</li>' +
            '<li>+1 Influence (or -1 if this is a punishment)</li>' +
            '<li>A quest, and +1 Influence on fullfillment</li>' +
            '<li>+Rank dice to persuade the right people</li>' +
            '</ul>',
        ascensionFeatures: [
            {
                key: 'keywords',
                name: 'Keywords',
                snippet: 'You gain the [Any] Keyword of the group that gave you the quest and cadre.',
                modifications: [
                    { targetGroup: 'keywords', targetValue: '[Any]' },
                ],
            },
            {
                key: 'source-of-the-quest',
                name: 'Source of the Quest',
                snippet: 'You gain +1 Influence (or -1, if this quest is a punishment).',
                description: '<p>You gain +1 Influence (or -1, if this quest is a punishment).</p>',
                selected: '',
                optionsPlaceholder: 'Choose granted or punishment',
                options: [
                    {
                        key: 'granted',
                        name: 'Granted',
                        snippet: 'You gain +1 Influence.',
                        modifications: [
                            { name: 'Granted', targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
                        ],
                    },
                    {
                        key: 'punishment',
                        name: 'Punishment',
                        snippet: 'You lose -1 Influence.',
                        modifications: [
                            { name: 'Punishment', targetGroup: 'traits', targetValue: 'influence', modifier: -1 },
                        ],
                    },
                ],
            },
            {
                key: 'devotee',
                name: 'Devotees',
                snippet: 'You gain the Devotees talent. If your Devotees die, you get -1 Influence.',
                description: '<p>You gain the Devotees talent. You do not need to meet the Leadership (Wil) Skill prerequisite. However, if your Devotees die, you get -1 Influence.</p>',
                modifications: [
                    { targetGroup: 'talents', targetValue: 'core-devotees', meta: { name: 'Devotees' } },
                ],
            },
            {
                key: 'holy-quest',
                name: 'Holy Quest',
                snippet: 'Once completed you gain +1 Influence.',
                description: '<p>A holy quest to perform. If you complete the quest, you gain +1 Influence.</p>',
                selected: '',
                optionsPlaceholder: 'Choose wip or done',
                options: [
                    {
                        key: 'ongoing',
                        name: 'Ongoing',
                        snippet: 'Fulfill your destiny to gain +1 Influence.',
                    },
                    {
                        key: 'completed',
                        name: 'Completed',
                        snippet: 'You gain +1 Influence.',
                        modifications: [
                            { name: 'Completed', targetGroup: 'traits', targetValue: 'influence', modifier: 1 },
                        ],
                    },
                ],
            },
            {
                key: 'persuasive',
                name: 'Persuasive',
                snippet: '+Rank dice to persuasion when targeting creatures with the awarded keyword that know of your quest.',
                description: '<p>You gain +Rank bonus dice on any Persuasion (Fel) Test targeting individuals with the awarded Keyword that know of your quest.</p>',
                modifications: [
                    { targetGroup: 'skills', targetValue: SKILLS.PERSUASION, modifier: 0, rank: 1, condition: 'when targeting those that know of your quest'},
                ],
            },
        ],
    },
];