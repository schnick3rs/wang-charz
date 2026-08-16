import {core} from "#server/data/chapters/core.ts";

export const rawRepository = [
    ...core,
];

export const chaptersRepository: ChapterType[] = ChapterRepositorySchema.parse(rawRepository);
