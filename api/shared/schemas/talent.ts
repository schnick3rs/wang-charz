import {PagedLegacySourceSchema} from "./source";
import z from "zod";
import {ModificationSchema} from "./core";

export const ComplexRequirementSchema = z.object({
    condition: z.enum(['must', 'mustNot']).optional(),
    type: z.enum(['species', 'keyword', 'attribute', 'skill', 'trait', 'character', 'wargear']).optional(),
    key: z.union([z.string(), z.array(z.string())]).optional(),
    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
})

export const TalentSchema = z.object({

    source: PagedLegacySourceSchema,

    key: z.string(),
    name: z.string(),

    cost: z.number().nullable().describe('The total or base cost'),

    hint: z.string().default(''),
    tags: z.array(z.string()).default([]).describe('Brother Lucius provides some tags for sorting'),

    requirements: z.array(ComplexRequirementSchema).optional(),
    allowedMultipleTimes: z.boolean().default(false),

    snippet: z.string().optional().describe('A short rules focused summary'),
    description: z.string().optional().describe('A more extensive (html) formated description'),

    alert: z.object({ type: z.string(), text: z.string()}).optional(),

    //gains: wargear, modifications, options
    wargear: z.array(z.any()).optional(),

    selected: z.union([
        z.string().default(''),
        z.array(z.string()).default([]),
    ]),
    optionsPlaceholder: z.string().optional(),
    options: z.array(z.any()).optional(),

    modifications: z.array(ModificationSchema).optional(),

    talentGroup: z.string().optional(),
    talentGroupKey: z.string().optional(),
    requirementsString: z.string().optional(),
});

export type Talent = z.infer<typeof TalentSchema>;

export const TalentRepositorySchema = z.array(TalentSchema);
