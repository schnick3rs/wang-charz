import { PsychicDisciplineRepositorySchema} from "#shared/types/psychic-discipline.schema.ts";
import type {PsychicDiscipline} from "#shared/types/psychic-discipline.schema.ts";
import {core} from "#server/data/psychic-disciplines/core.ts";
import {voab} from "#server/data/psychic-disciplines/voab.ts";
import {fspg} from "#server/data/psychic-disciplines/fspg.ts";
import {aioe} from "#server/data/psychic-disciplines/aioe.ts";

const rawRepository = [
    ...core,
    ...fspg,
    ...voab,
    ...aioe,
];

export const psychicDisciplinesRepository: PsychicDiscipline[] = PsychicDisciplineRepositorySchema.parse(rawRepository)