import archetypeRepository from "#server/data/archetypes.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = archetypeRepository.find((archetype) => archetype.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Archetype not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});