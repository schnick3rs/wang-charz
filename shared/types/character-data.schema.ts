import {string, z} from "zod";

export const CharacterDataSchema = z.object({

    name: string().default('OINKOINK'),

    // setting
    enabledHouseRules: z.array(z.string()).default([]),
    enabledBooks: z.array(z.string()).default(['core']),
    enabledHomebrews: z.array(z.string()).default([]),

    settingTier: z.number().default(2),

    earnedXp: z.number().default(0),

    rank: z.number().default(1),

    // character
    speciesAstartesChapterKey: z.string().optional(),

    attributes: z.object({
        strength: z.number().default(1),
        toughness: z.number().default(1),
        agility: z.number().default(1),
        initiative: z.number().default(1),
        willpower: z.number().default(1),
        intellect: z.number().default(1),
        fellowship: z.number().default(1),
    }).default({
        strength: 1,
        toughness: 1,
        agility: 1,
        initiative: 1,
        willpower: 1,
        intellect: 1,
        fellowship: 1,
    }),

    skills: z.object({
        athletics: z.number().default(0),
        awareness: z.number().default(0),
        ballisticSkill: z.number().default(0),
        stealth: z.number().default(0),
        medicae: z.number().default(0),
        scholar: z.number().default(0),
        survival: z.number().default(0),
        intimidation: z.number().default(0),
        investigation: z.number().default(0),
        leadership: z.number().default(0),
        deception: z.number().default(0),
        cunning: z.number().default(0),
        insight: z.number().default(0),
        persuasion: z.number().default(0),
        tech: z.number().default(0),
        pilot: z.number().default(0),
        psychicMastery: z.number().default(0),
        weaponSkill: z.number().default(0),
    }).default({
        athletics: 0,
        awareness: 0,
        ballisticSkill: 0,
        stealth: 0,
        medicae: 0,
        scholar: 0,
        survival: 0,
        intimidation: 0,
        investigation: 0,
        leadership: 0,
        deception: 0,
        cunning: 0,
        insight: 0,
        persuasion: 0,
        tech: 0,
        pilot: 0,
        psychicMastery: 0,
        weaponSkill: 0,
    }),

    species: z.object({
       key: z.string().optional(),
       label: z.string().optional(),
       cost: z.number().default(0),
    }).default({
        key: undefined,
        label: '',
        cost: 0,
    }),

    faction: z.object({
        key: z.string(),
        label: z.string(),
    }).optional(),

    archetype: z.object({
        key: z.string().optional(),
        label: z.string().optional(),
        cost: z.number().default(0),
        tier: z.number().default(1),
    }).default({
        key: undefined,
        label: '',
        cost: 0,
        tier: 1,
    }),

    ascensions: z.array(z.object({
        key: z.string(),
        label: z.string(),
        cost: z.number().default(0),
        sourceTier: z.number().default(1),
        targetTier: z.number().default(2),
    })).default([]),

    talents: z.array(z.object({
        id: z.string().describe('A character unique identifier, because some talents can be taken multiple times'),
        name: z.string(),
        key: z.string(),
        cost: z.number().default(0).describe('The actual cost, might differ, due to being granted or similar'),
        source: z.string().optional().describe('source of the granting effect, if empty, it was bought'),

        // selected
        // label
    })).default([]),

    wargear: z.array(z.object({
        id: z.string().describe('A character unique identifier, because some talents can be taken multiple times'),
        label: z.string(),
        key: z.string(),
        source: z.string().optional().describe('source of the granting effect, if empty, it was bought'),

        equipped: z.boolean().default(true),
    })).default([]),

    psychicPowers: z.array(z.object({
        name: z.string(),
        key: z.string(),
        cost: z.number().default(0).describe('The actual cost, might differ, due to being granted or similar'),
        source: z.string().optional().describe('source of the granting effect, if empty, it was bought'),
    })).default([]),

    languages: z.array(z.object({
        key: z.string().optional(),
        label: z.string().optional(),
        cost: z.number().default(0),
    })).default([]),

    traumaticInjuries: z.array(z.object({})).default([]),
    mutations: z.array(z.object({})).default([]),

})
export type CharacterDataType = z.infer<typeof CharacterDataSchema>