import z from "zod";

export const PsychicDisciplineSchema = z.object({

    source: PagedLegacySourceSchema,

    key: z.string(),
    name: z.string(),
    snippet: z.string(),

    requirements: z.array(ComplexRequirementSchema).default([]),
});

export type PsychicDiscipline = z.infer<typeof PsychicDisciplineSchema>;


export const PsychicDisciplineRepositorySchema = z.array(PsychicDisciplineSchema);
