import {wargearRepository} from "#server/data/wargear.repository.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = wargearRepository.find((wargear) => wargear.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Wargear not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});