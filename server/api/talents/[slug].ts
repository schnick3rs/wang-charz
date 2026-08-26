import {talentsRepository} from "#server/data/talents.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = talentsRepository.find((talent) => talent.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Talent not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});