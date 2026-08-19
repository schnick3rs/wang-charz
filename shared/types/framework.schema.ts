import z from "zod";

export const FrameworkSchema = z.object({

    source: PagedLegacySourceSchema,

    key: z.string().describe('A kebab-cased identifier derived from source and name.'),
    name: z.string(),

    patron: z.object({
        name: z.string(),
        agents: z.string(),
    }).optional(),

    hint: z.string().describe('A single catchy sentence.'),

    description: z.string().optional().describe('Your characters as a group, define who you are and what you want to archive.'),
    limitationsString: z.string().optional(),
    wargearString: z.string().optional(),
    bonusString: z.string().optional(),

    limitations: z.array(z.object({
        condition: z.string(),
        type: z.string(),
        key: z.union([z.array(z.string()), z.string()]),
        value: z.number().optional(),
    })),

    wargear: z.array(z.object({
        name: z.string(),
        variant: z.string().optional(),
        shared: z.boolean().default(false).optional(),
    })),

    features: z.array(z.object({
        name: z.string(),
        snippet: z.string(),
        modifications: z.array(ModificationSchema).optional(),
    })),

});

export type Framework = z.infer<typeof FrameworkSchema>;

export const FrameworkRepositorySchema = z.array(FrameworkSchema);
