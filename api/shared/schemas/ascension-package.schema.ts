import { z } from "zod";
import {PagedLegacySourceSchema} from "./source";
import {SpeciesSchema} from "./species";

// --- Source book reference -------------------------------------------------
export const SourceSchema = z.object({
    book: z.string(),
    key: z.string(),
    version: z.string(),
    link: z.string().url(),
    page: z.number(),
});

// --- Wargear (augmetics) sub-options ---------------------------------------
export const WargearOptionSchema = z.object({
    filter: z.boolean().optional(),
    typeFilter: z.array(z.string()).optional(),
});

export const WargearSchema = z.object({
    key: z.string().optional(),
    name: z.string().optional(),
    selected: z.string().optional().default(""),
    options: z.array(WargearOptionSchema).optional(),
});

// --- Choosable options within an ascension feature (e.g. injury tables) ----
export const FeatureOptionSchema = z.object({
    key: z.string().optional(),
    name: z.string().optional(),
    snippet: z.string().optional(),
    wargear: z.array(WargearSchema).optional(),
});

// --- Modifications applied by a feature ------------------------------------
export const ModificationSchema = z.object({
    name: z.string().optional(),
    targetGroup: z.string(),
    targetValue: z.string(),
    effect: z.string().optional(),
    modifier: z.number().optional(),
    condition: z.string().optional(),
    meta: z
        .object({
            name: z.string(),
        })
        .optional(),
});

// --- Ascension feature -------------------------------------------------------
export const AscensionFeatureSchema = z.object({
    key: z.string().optional(),
    name: z.string(),
    snippet: z.string().optional(),
    description: z.string().optional(),
    selected: z.union([z.string(), z.array(z.string())]).optional(),
    optionsPlaceholder: z.string().optional(),
    modifications: z.array(ModificationSchema).optional(),
    options: z.array(FeatureOptionSchema).optional(),
});

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
    prerequisites: z.array(z.unknown()).default([]),
    influenceBonus: z.number().optional(),
    influencePerTier: z.number().optional(),
    keywordString: z.string().optional().optional(),
    storyElementDescription: z.string().optional(),
    ascensionFeatures: z.array(AscensionFeatureSchema).optional(),
});

export const StoryElementsArraySchema = z.array(AscensionPackageSchema);

// --- Inferred TS types --------------------------------------------------------
export type Source = z.infer<typeof SourceSchema>;
export type Wargear = z.infer<typeof WargearSchema>;
export type FeatureOption = z.infer<typeof FeatureOptionSchema>;
export type Modification = z.infer<typeof ModificationSchema>;
export type AscensionFeature = z.infer<typeof AscensionFeatureSchema>;
export type AscensionPackage = z.infer<typeof AscensionPackageSchema>;

export const AscensionPackageRepositorySchema = z.array(AscensionPackageSchema);
