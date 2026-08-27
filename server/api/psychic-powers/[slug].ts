import {psychicPowersRepository} from "#server/data/psychic-powers.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = psychicPowersRepository.find((power) => power.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Psychic Power not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});