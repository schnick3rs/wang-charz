import {core} from "#server/data/keywords/core.ts";
import type { KeywordType} from "#shared/types/keyword.schema.ts";
import {KeywordRepositorySchema} from "#shared/types/keyword.schema.ts";


export const rawRepository = [
    ...core,
];

const keywordRepository: KeywordType[] = KeywordRepositorySchema.parse(rawRepository);
export default keywordRepository
