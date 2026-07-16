import {z} from 'zod';
import {PagedLegacySourceSchema} from "./source";
import {ModificationSchema} from "./core";

// ---------------------------------------------------------------------------
// Archetype schema
//
// archetypeRepository.ts is a ~9k line, hand-authored dataset, so this
// schema is intentionally permissive (`.passthrough()`) rather than a
// strict/closed model: it documents and validates the fields every consumer
// relies on while tolerating the long tail of one-off fields particular
// entries add (wargear filters, loadout choices, psychic power slots, ...).
// ---------------------------------------------------------------------------


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
}).passthrough();

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
  amount: z.union([z.string(), z.number()]).optional(),
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
}).passthrough());

export const FeatureOptionSchema = z.object({
  key: z.string().optional(),
  name: z.string(),
  modifications: z.array(ModificationSchema).optional(),
}).passthrough();

export const PsychicPowerSlotSchema = z.object({
  name: z.string(),
  selected: z.union([z.string(), z.array(z.string())]).optional(),
  query: z.record(z.string(), z.any()).optional(),
  options: z.array(z.any()).optional(),
  free: z.boolean().optional(),
}).passthrough();

export const AlertSchema = z.object({
  type: z.string(),
  text: z.string(),
}).passthrough();

export const ArchetypeFeatureSchema = z.object({
  name: z.string(),
  snippet: z.string().optional(),
  description: z.string().optional(),
  modifications: z.array(ModificationSchema).optional(),
  selected: z.union([z.string(), z.array(z.string())]).optional(),
  options: z.array(FeatureOptionSchema).optional(),
  psychicPowers: z.array(PsychicPowerSlotSchema).optional(),
  psychicDisciplines: z.array(z.string()).optional(),
}).passthrough();

export const SuggestedSchema = z.object({
  attributes: z.array(z.any()).optional(),
  skills: z.array(z.any()).optional(),
  talents: z.array(z.string()).optional(),
}).passthrough();

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
  keywords: z.string().optional(),
  influence: z.number().default(0),
  prerequisites: z.array(PrerequisiteSchema).default([]),
  prerequisiteText: z.string().optional(),
  prerequisitesSkillString: z.string().optional(),
  archetypeFeatures: z.array(ArchetypeFeatureSchema).default([]),
  wargear: z.array(WargearOptionSchema).default([]),
  wargearString: z.string().optional(),
  suggested: SuggestedSchema.optional(),
  suggestedStats: z.array(z.any()).optional(),
  alerts: z.array(AlertSchema).optional(),
}).passthrough();

export const ArchetypeRepositorySchema = z.array(ArchetypeSchema);


export type CostBreakdown = z.infer<typeof CostBreakdownSchema>;
export type Prerequisite = z.infer<typeof PrerequisiteSchema>;
export type Modification = z.infer<typeof ModificationSchema>;
export type SpeciesRef = z.infer<typeof SpeciesRefSchema>;
export type FeatureOption = z.infer<typeof FeatureOptionSchema>;
export type PsychicPowerSlot = z.infer<typeof PsychicPowerSlotSchema>;
export type Alert = z.infer<typeof AlertSchema>;
export type ArchetypeFeature = z.infer<typeof ArchetypeFeatureSchema>;
export type Suggested = z.infer<typeof SuggestedSchema>;
export type Archetype = z.infer<typeof ArchetypeSchema>;
