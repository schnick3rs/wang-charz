import {z} from "zod";
import {PrerequisiteSchema} from "#shared/types/archetype.ts";
import {ComplexRequirementSchema} from "#shared/types/talent.ts";


// --- Top-level story element -------------------------------------------------
export const AscensionPackageSchema = z.object({
    name: z.string(),
    source: PagedLegacySourceSchema,
    key: z.string(),
    hint: z.string(),
    teaser: z.string(),
    stub: z.boolean(),
    cost: z.number().optional(),
    costPerTier: z.number().optional(),
    minimumCampaignTier: z.number().optional(),
    prerequisites: z.array(ComplexRequirementSchema).default([]),
    influenceBonus: z.number().optional(),
    influencePerTier: z.number().optional(),
    keywordString: z.string().optional().optional(),
    storyElementDescription: z.string().optional(),
    ascensionFeatures: z.array(GenericFeatureSchema).optional(),
});

export type AscensionPackage = z.infer<typeof AscensionPackageSchema>;
export const AscensionPackageRepositorySchema = z.array(AscensionPackageSchema);
