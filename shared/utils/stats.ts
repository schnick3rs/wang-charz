import { z } from 'zod';

export type CharacterAttributes = {
    strength: number;
    toughness: number;
    agility: number;
    initiative: number;
    willpower: number;
    intellect: number;
    fellowship: number;
};

export type AttributeKey = keyof CharacterAttributes;

interface AttributeDefinition {
    key: AttributeKey;
    name: string;
    short: string;
    description: string;
    order: number;
}

export const attributeRepository: AttributeDefinition[] = [
    {
        key: 'strength',
        name: 'Strength',
        short: 'Str',
        description: 'Raw physical power.',
        order: 1,
    },
    {
        key: 'toughness',
        name: 'Toughness',
        short: 'Tou',
        description: 'Endurance and ability to shrug off damage.',
        order: 3,
    },
    {
        key: 'agility',
        name: 'Agility',
        short: 'Agi',
        description: 'Dexterity and coordination.',
        order: 2,
    },
    {
        key: 'initiative',
        name: 'Initiative',
        short: 'Ini',
        description: 'Reflexes and reaction speed.',
        order: 7,
    },
    {
        key: 'willpower',
        name: 'Willpower',
        short: 'Wil',
        description: 'Determination and strength of will.',
        order: 5,
    },
    {
        key: 'intellect',
        name: 'Intellect',
        short: 'Int',
        description: 'Ability to process and interpret information.',
        order: 4,
    },
    {
        key: 'fellowship',
        name: 'Fellowship',
        short: 'Fel',
        description: 'Force of personality.',
        order: 6,
    },
];

export const skillRepository = [
    {
        key: 'athletics',
        name: 'Athletics',
        attribute: 'Strength',
        description: 'A character’s overall physical prowess',
    },
    {
        key: 'awareness',
        name: 'Awareness',
        attribute: 'Intellect',
        description: 'Notice additional details, or perceive hidden or obscured objects.',
    },
    {
        key: 'ballisticSkill',
        name: 'Ballistic Skill',
        attribute: 'Agility',
        description: undefined,
    },
    {
        key: 'cunning',
        name: 'Cunning',
        attribute: 'Fellowship',
        description: undefined,
    },
    {
        key: 'deception',
        name: 'Deception',
        attribute: 'Fellowship',
        description: undefined,
    },
    {
        key: 'insight',
        name: 'Insight',
        attribute: 'Fellowship',
        description: undefined,
    },
    {
        key: 'intimidation',
        name: 'Intimidation',
        attribute: 'Willpower',
        description: undefined,
    },
    {
        key: 'investigation',
        name: 'Investigation',
        attribute: 'Intellect',
        description: undefined,
    },
    {
        key: 'leadership',
        name: 'Leadership',
        attribute: 'Willpower',
        description: undefined,
    },
    {
        key: 'medicae',
        name: 'Medicae',
        attribute: 'Intellect',
        description: undefined,
    },
    {
        key: 'persuasion',
        name: 'Persuasion',
        attribute: 'Fellowship',
        description: 'convince',
    },
    {
        key: 'pilot',
        name: 'Pilot',
        attribute: 'Agility',
        description: undefined,
    },
    {
        key: 'psychicMastery',
        name: 'Psychic Mastery',
        attribute: 'Willpower',
        description: undefined,
    },
    {
        key: 'scholar',
        name: 'Scholar',
        attribute: 'Intellect',
        description: undefined,
    },
    {
        key: 'stealth',
        name: 'Stealth',
        attribute: 'Agility',
        description: undefined,
    },
    {
        key: 'survival',
        name: 'Survival',
        attribute: 'Willpower',
        description: undefined,
    },
    {
        key: 'tech',
        name: 'Tech',
        attribute: 'Intellect',
        description: undefined,
    },
    {
        key: 'weaponSkill',
        name: 'Weapon Skill',
        attribute: 'Initiative',
        description: undefined,
    },
];


export const traitTypeSchema = z.enum(['Combat', 'Mental', 'Social']);

export const traitComputeSchema = z.object({
    static: z.number(),
    multi: z.number(),
    tier: z.number(),
    min: z.number(),
});

export const traitSchema = z.object({
    key: z.string(),
    name: z.string(),
    attribute: z.string().optional(),
    skill: z.string().optional(),
    description: z.string().optional(),
    type: traitTypeSchema,
    compute: traitComputeSchema,
    calculate: z
        .function({
            input: [z.number()],
            output: z.number(),
        })
        .optional(),
});

export const traitRepositorySchema = z.array(traitSchema);

export type TraitType = z.infer<typeof traitTypeSchema>;
export type TraitCompute = z.infer<typeof traitComputeSchema>;
export type Trait = z.infer<typeof traitSchema>;

// https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253
export const traitRepository = [
    {
        key: 'defence',
        name: 'Defence',
        attribute: 'Initiative',
        description: undefined,
        type: 'Combat',
        compute: { static: -1, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'resilience',
        name: 'Resilience',
        attribute: 'Toughness',
        description: undefined,
        type: 'Combat',
        compute: { static: 1, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'determination',
        name: 'Determination',
        attribute: 'Toughness',
        description: undefined,
        type: 'Combat',
        compute: { static: 0, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'maxWounds',
        name: 'Max Wounds',
        attribute: 'Toughness',
        description: undefined,
        type: 'Combat',
        compute: { static: 0, multi: 1, tier: 2, min: 1 },
    },
    {
        key: 'maxShock',
        name: 'Max Shock',
        attribute: 'Willpower',
        description: undefined,
        type: 'Combat',
        compute: { static: 0, multi: 1, tier: 1, min: 1 },
    },
    {
        key: 'conviction',
        name: 'Conviction',
        attribute: 'Willpower',
        description: undefined,
        type: 'Mental',
        compute: { static: 0, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'resolve',
        name: 'Resolve',
        attribute: 'Willpower',
        description: undefined,
        type: 'Mental',
        compute: { static: -1, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'influence',
        name: 'Influence',
        attribute: 'Fellowship',
        description: undefined,
        type: 'Social',
        compute: { static: -1, multi: 1, tier: 0, min: 1 },
    },
    {
        key: 'wealth',
        name: 'Wealth',
        attribute: undefined,
        description: undefined,
        type: 'Social',
        compute: { static: 0, multi: 1, tier: 1, min: 0 },
    },
    {
        key: 'speed',
        name: 'Speed',
        attribute: undefined,
        description: undefined,
        type: 'Combat',
        compute: { static: 0, multi: 1, tier: 0, min: 0 },
    },
    {
        key: 'corruption',
        name: 'Corruption',
        attribute: undefined,
        description: undefined,
        type: 'Mental',
        compute: { static: 0, multi: 1, tier: 0, min: 0 },
    },
    {
        key: 'passiveAwareness',
        name: 'Passive Awareness',
        attribute: undefined,
        skill: 'Awareness',
        description: undefined,
        type: 'Mental',
        compute: { static: 0, multi: 0.5, tier: 0, min: 1 },
    },
];