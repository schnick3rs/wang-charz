import {string, z} from "zod";

export const CharacterDataSchema = z.object({

    name: string().default('OINKOINK'),

    // setting
    enabledBooks: z.array(z.string()).default(['core']),
    enabledHomebrews: z.array(z.string()).default([]),

    settingTier: z.number().default(2),

    // character
    speciesAstartesChapterKey: z.string().optional(),

    species: z.object({
       key: z.string(),
       label: z.string(),
       cost: z.number().default(0),
    }).optional(),

    faction: z.object({
        key: z.string(),
        label: z.string(),
    }).optional(),

    archetype: z.object({
        key: z.string(),
        label: z.string(),
        cost: z.number().default(0),
        tier: z.number().default(1),
    }).optional(),

    ascensions: z.array(z.object({
        key: z.string(),
        label: z.string(),
        cost: z.number().default(0),
        sourceTier: z.number().default(1),
        targetTier: z.number().default(2),
    })).default([])

})
export type CharacterDataType = z.infer<typeof CharacterDataSchema>