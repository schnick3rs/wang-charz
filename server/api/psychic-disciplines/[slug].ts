import {psychicDisciplinesRepository} from "#server/data/psychic-disciplines.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = psychicDisciplinesRepository.find((item) => item.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Psychic Discipline not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});