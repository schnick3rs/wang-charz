import {z} from "zod";

export const AlertSchema = z.object({
    type: z.string(),
    text: z.string(),
});


export const PsychicPowerSlotSchema = z.object({
    name: z.string().optional(),
    selected: z.union([z.string(), z.array(z.string())]).optional(),
    query: z.record(z.string(), z.any()).optional(),
    options: z.array(z.any()).optional(),
    free: z.boolean().optional(),
});

export const ModificationSchema = z.object({
    targetGroup: z.string(),
    targetValue: z.string(),
    modifier: z.number().default(0).optional(),
    rank: z.number().nullable().optional(),
    condition: z.string().nullable().optional(),

    // from ascensions
    name: z.string().optional(),
    effect: z.string().optional(),
    meta: z.object({name: z.string()}).optional(),
});


// --- Wargear (augmetics) sub-options ---------------------------------------
export const FeatureWargearOptionFilterSchema = z.object({
    filter: z.boolean().optional(),
    typeFilter: z.array(z.string()).optional(),
});


export const FeatureWargearSchema = z.object({
    key: z.string().optional(),
    name: z.string().optional(),
    selected: z.string().optional().default(""),
    options: z.array(FeatureWargearOptionFilterSchema).optional(),
});


type FeatureOption = {
    key?: string;
    name: string;
    snippet?: string;
    description?: string;
    modifications?: Modification[];
    options?: FeatureOption[];
};

export const FeatureOptionSchema: z.ZodType<FeatureOption> = z.object({
    key: z.string().optional(),
    name: z.string(),
    snippet: z.string().optional(),
    description: z.string().optional(),
    modifications: z.array(ModificationSchema).optional(),
    options: z.array(z.lazy(() => FeatureOptionSchema)).optional(),
});

export const GenericFeatureSchema = z.object({
    key: z.string().optional(), // TODO ensure via builder
    name: z.string(),
    snippet: z.string().optional(),
    alerts: z.array(AlertSchema).optional(),
    description: z.string().optional(),
    modifications: z.array(ModificationSchema).optional(),
    selected: z.union([z.string(), z.array(z.string())]).optional(),
    options: z.array(FeatureOptionSchema).optional(),
    psychicPowers: z.array(PsychicPowerSlotSchema).optional(),
    psychicDisciplines: z.array(z.string()).optional(),

    // from ascensions
    wargear: z.array(FeatureWargearSchema).optional(),
});

export type GenericFeature = z.infer<typeof GenericFeatureSchema>;