import {string, z} from "zod";

export const CharacterDataSchema = z.object({

    name: string().default('OINKOINK'),

    // setting
    enabledBooks: z.array(z.string()).default(['core']),
    enabledHomebrews: z.array(z.string()).default([]),

    settingTier: z.number().default(2),

    // character
    speciesKey: z.string().optional(),
    speciesAstartesChapterKey: z.string(),
    archetypeKey: z.string().optional(),

})
export type CharacterDataType = z.infer<typeof CharacterDataSchema>