import {PagedLegacySourceSchema} from "./source";
import z from "zod";

export const PsychicPowerSchema = z.object({

    source: PagedLegacySourceSchema,

    id: z.number().optional(),
    key: z.string(),
    name: z.string(),

    cost: z.number().optional(),
    discipline: z.string().optional(),

    hint: z.string().optional(),
    effect: z.string().optional(),

    prerequisite: z.array(z.string()).optional(),

    stub: z.boolean().default(false),

    crunch_difficulty_number: z.union([z.number(), z.string()]).optional(),
    crunch_activation: z.string().optional(),
    crunch_duration: z.string().optional(),
    crunch_range: z.string().optional(),
    crunch_multi_target: z.boolean().optional(),
    crunch_effect: z.string().optional(),
    crunch_potency: z.array(z.string()).optional(),

    keywords: z.array(z.string()).default([]),
    description: z.string().optional(),
});

export type PsychicPower = z.infer<typeof PsychicPowerSchema>;

export const PsychicPowerRepositorySchema = z.array(PsychicPowerSchema);
