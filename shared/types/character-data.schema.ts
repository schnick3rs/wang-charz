import {string, z} from "zod";

export const CharacterDataSchema = z.object({

    name: string().default('OINKOINK'),

    // setting
    enabledBooks: z.array(z.string()).default(['core']),
    enabledHomebrews: z.array(z.string()).default([]),

    // character
    speciesKey: z.string().optional(),
    archetypeKey: z.string().optional(),

})
export type CharacterDataType = z.infer<typeof CharacterDataSchema>