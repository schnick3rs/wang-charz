import {string, z} from "zod";

export const CharacterSchema = z.object({

    // identification
    id: z.uuid().default(() => crypto.randomUUID()),
    ownerId: z.string(),

    // meta
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
    isPublic: z.boolean().default(false),

    name: string().default('OINKOINK'),

    // setting

    // character
    speciesKey: z.string().optional(),
    archetypeKey: z.string().optional(),

})
export type Character = z.infer<typeof CharacterSchema>