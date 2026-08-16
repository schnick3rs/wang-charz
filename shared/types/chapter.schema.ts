import {z} from "zod";

export const ChapterFeatureSchema = z.object({
    key: z.string().optional(),
    name: z.string(),
    origin: z.string().optional(),
    effect: z.string().optional(),
    modifications: z.array(ModificationSchema).default([]),
})

export const ChapterSchema = z.object({

    source: LegacySourceSchema,

    key: z.string(),
    name: z.string(),
    snippet: z.string().optional(),

    features: z.array(ChapterFeatureSchema),

    primarch: z.string(),
    affiliation: z.string(),
    founding: z.string(),
})

export type ChapterType = z.infer<typeof ChapterSchema>;

export const ChapterRepositorySchema = z.array(ChapterSchema);
export type ChapterRepository = z.infer<typeof ChapterRepositorySchema>;