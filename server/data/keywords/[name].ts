import keywordRepository from "#server/data/keywords.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const name = getRouterParam(event, 'name');
    const item = keywordRepository.find((keyword) => keyword.name === name?.toLocaleUpperCase());

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Keyword not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});