import {speciesRepository} from "#server/data/species.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = speciesRepository.find((species) => species.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Archetype not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});