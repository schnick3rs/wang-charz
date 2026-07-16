import {PagedLegacySourceSchema} from "./source";
import {z} from "zod";
import {ArchetypeFeatureSchema, PrerequisiteSchema} from "./archetype";

export const StatValuesSchema = z.object({
    name: z.string(),
    value: z.number(),
})

export const SpeciesCostSchema = z.object({
    total: z.number().default(0),
    stats: z.number().default(0),
    species: z.number().default(0),
    other: z.number().default(0),
})

export const SpeciesSchema = z.object({

    source: PagedLegacySourceSchema,

    key: z.string(),
    name: z.string(),
    hint: z.string(),
    group: z.string(),

    speed: z.number().optional(),

    stub: z.boolean().default(false),
    cost: z.number().default(0),
    costs: SpeciesCostSchema.optional(),

    attributeMaximums: z.array(StatValuesSchema).default([]),
    traitMaximums: z.array(StatValuesSchema).default([]),
    speciesFeatures: z.array(ArchetypeFeatureSchema).default([]),

    commonNames: z.array(z.string()).optional(),

    description: z.string().optional(),
    prerequisites: z.array(PrerequisiteSchema).optional(),
});

export type Species = z.infer<typeof SpeciesSchema>;

export const SpeciesRepositorySchema = z.array(SpeciesSchema);
