import { z } from "zod";
import {PagedLegacySourceSchema} from "./source";


// --- Wargear (augmetics) sub-options ---------------------------------------
export const AscensionWargearOptionSchema = z.object({
    filter: z.boolean().optional(),
    typeFilter: z.array(z.string()).optional(),
});

export const AscensionWargearSchema = z.object({
    key: z.string().optional(),
    name: z.string().optional(),
    selected: z.string().optional().default(""),
    options: z.array(AscensionWargearOptionSchema).optional(),
});

// --- Choosable options within an ascension feature (e.g. injury tables) ----
export const AscensionFeatureOptionSchema = z.object({
    key: z.string().optional(),
    name: z.string().optional(),
    snippet: z.string().optional(),
    wargear: z.array(AscensionWargearSchema).optional(),
});

// --- Modifications applied by a feature ------------------------------------
export const AscensionFeatureModificationSchema = z.object({
    name: z.string().optional(),
    targetGroup: z.string(),
    targetValue: z.string(),
    effect: z.string().optional(),
    modifier: z.number().optional(),
    condition: z.string().optional(),
    meta: z.object({name: z.string()}).optional(),
});

// --- Ascension feature -------------------------------------------------------
export const AscensionFeatureSchema = z.object({
    key: z.string().optional(),
    name: z.string(),
    snippet: z.string().optional(),
    description: z.string().optional(),
    selected: z.union([z.string(), z.array(z.string())]).optional(),
    optionsPlaceholder: z.string().optional(),
    modifications: z.array(AscensionFeatureModificationSchema).optional(),
    options: z.array(AscensionFeatureOptionSchema).optional(),
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

export const AscensionPackageRepositorySchema = z.array(AscensionPackageSchema);
