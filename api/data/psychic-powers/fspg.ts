import {ACTIVATION, DURATION, powerz, simpleCrunch} from "./utils";

export const fspg = [
    {
        ...powerz('fspg',129,'Veil of Time','Librarius',20),
        ...simpleCrunch(8, ACTIVATION.ACTION, DURATION.SUSTAINED,'20m',true),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: 'Act twice per ronud.',
        description: '<p>For as long as you Sustain this power, your target may take two Turns in each Round.</p>',
    },
    {
        ...powerz('fspg',129,'Might of Heroes','Librarius',15),
        ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.SUSTAINED,'15m',false),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: 'Increase Strength, Toughness and Initative by 1.',
        description: '<p>Your target gains +1 Strength, Toughness, and Initiative until the start of your next Turn.</p>',
    },
    {
        ...powerz('fspg',130,'Psychic Scourge','Librarius',20),
        ...simpleCrunch(7, ACTIVATION.ACTION, DURATION.INSTANT,'20m',true),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: 'Succeed in opposed Willpower and deal 1d3 mortal wounds and Fear.',
        description: '<p>To activate this power, you must win an Opposed Willpower Test with your target. If you succeed, you deal 1d3 Mortal Wounds and the target suffers the Fear Condition.</p>',
    },
    {
        ...powerz('fspg',130,'Fury of the Ancients','Librarius',15),
        ...simpleCrunch(10, ACTIVATION.ACTION, DURATION.INSTANT,'14m',false),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: 'Line that deals 2d6 mortal wounds to enemies.',
        description: '<p>If you successfully activate this power, the Fury of the Ancients travels in a straight line for 14m in a direction you choose. All enemies on that line suffer 2d3 Mortal Wounds.</p>',
    },
    {
        ...powerz('fspg',130,'Psychic Fortress','Librarius',15),
        ...simpleCrunch(6, ACTIVATION.SIMPLE_ACTION, DURATION.SUSTAINED,'20m',true),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: 'Immune to Fear and Terror. Add +Willpower dice to Determination vs Psychic Powers. And more..',
        description: '<p>Your target becomes immune to the Fear and Terror Conditions for as long as you Sustain this power. Your target also gains Bonus Dice equal to your Willpower Attribute when they roll Determination against damage caused by a Psychic Power, and may roll Determination against Mortal Wounds caused by Psychic Powers for as long as you sustain this power.</p>',
    },
    {
        ...powerz('fspg',130,'Null Zone','Librarius',15),
        ...simpleCrunch(7, ACTIVATION.SIMPLE_ACTION, DURATION.INSTANT,'20m',false),
        keywords: ['Psychic'],
        prerequisite: ['You must have the ADEPTUS ASTARTES Keyword.'],
        effect: '6m radius within range that incease cast DN by Willpower and nullifies invulnerable trait.',
        description: '<p>When you successfully activate this power, select a point or target in range. You create a null zone with a 6m radius centered on that point or target until the start of your next Turn. The DN of all Psychic Mastery (Wil) Tests made within the null zone is increased by your Willpower Rating. The Invulnerable Armour Trait has no effect inside the null zone.</p>',
    },
];