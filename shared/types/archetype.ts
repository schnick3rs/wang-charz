import {z} from 'zod';


export const CostBreakdownSchema = z.object({
  total: z.number(),
  archetype: z.number(),
  stats: z.number(),
  species: z.number(),
  other: z.number(),
});

export const PrerequisiteSchema = z.object({
  group: z.enum(['attributes', 'skills']),
  value: z.string(),
  threshold: z.number(),
});

export const SpeciesRefSchema = z.object({
  name: z.string(),
  key: z.string(),
  sourceKey: z.string(),
});

export const ValueFilterSchema = z.object({
  useCharacterTier: z.boolean(),
  useSettingTier: z.boolean(),
  fixedValue: z.number(),
});

export type WargearOption = {
  name?: string;
  variant?: string;
  amount?: string | number;
  selected?: string | string[];
  options?: WargearOption[];
  items?: WargearOption[];
  filter?: boolean;
  valueFilter?: z.infer<typeof ValueFilterSchema>;
  rarityFilter?: string[];
  typeFilter?: string[];
  subtypeFilter?: string[];
  triptypeFilter?: string[];
  keywordFilter?: string | string[];
  [key: string]: unknown;
};

// Wargear entries recurse into themselves: a choice (`options`/`items`) is
// itself a list of wargear entries, which may in turn offer further choices.
export const WargearOptionSchema: z.ZodType<WargearOption> = z.lazy(() => z.object({
  name: z.string().optional(),
  variant: z.string().optional(),
  amount: z.coerce.number().optional(),
  selected: z.union([z.string(), z.array(z.string())]).optional(),
  options: z.array(WargearOptionSchema).optional(),
  items: z.array(WargearOptionSchema).optional(),
  filter: z.boolean().optional(),
  valueFilter: ValueFilterSchema.optional(),
  rarityFilter: z.array(z.string()).optional(),
  typeFilter: z.array(z.string()).optional(),
  subtypeFilter: z.array(z.string()).optional(),
  triptypeFilter: z.array(z.string()).optional(),
  keywordFilter: z.union([z.string(), z.array(z.string())]).optional(),
}));

export const SuggestedSchema = z.object({
  attributes: z.array(z.any()).optional(),
  skills: z.array(z.any()).optional(),
  talents: z.array(z.string()).optional(),
});

export const ArchetypeSchema = z.object({
  source: PagedLegacySourceSchema,
  key: z.string(),
  name: z.string(),
  cost: z.number().default(0),
  costs: CostBreakdownSchema.optional(),
  tier: z.number(),
  faction: z.string(),
  factionKey: z.string(),
  species: z.array(SpeciesRefSchema),
  stub: z.boolean().optional(),
  hint: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  influence: z.number().default(0),
  prerequisites: z.array(PrerequisiteSchema).default([]),
  prerequisiteText: z.string().optional(),
  prerequisitesSkillString: z.string().optional(),
  archetypeFeatures: z.array(GenericFeatureSchema).default([]),
  wargear: z.array(WargearOptionSchema).default([]),
  wargearString: z.string().optional(),
  suggested: SuggestedSchema.optional(),
  suggestedStats: z.array(z.any()).optional(),
  alerts: z.array(AlertSchema).optional(),
});

export const ArchetypeRepositorySchema = z.array(ArchetypeSchema);


export type CostBreakdown = z.infer<typeof CostBreakdownSchema>;
export type Prerequisite = z.infer<typeof PrerequisiteSchema>;
export type Modification = z.infer<typeof ModificationSchema>;
export type SpeciesRef = z.infer<typeof SpeciesRefSchema>;
export type FeatureOptionType = z.infer<typeof FeatureOptionSchema>;
export type Suggested = z.infer<typeof SuggestedSchema>;
export type Archetype = z.infer<typeof ArchetypeSchema>;
