import {z} from "zod";

export const KeywordSchema = z.object({
    source: PagedLegacySourceSchema,
    key: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    features: z.array(ArchetypeFeatureSchema).default([]),

    parentKeyword: z.string().optional().default(''),
    examples: z.array(z.string()).default([]),
    examplePage: z.number().optional(),
})

export type KeywordType = z.infer<typeof KeywordSchema>;

export const KeywordRepositorySchema = z.array(KeywordSchema);
