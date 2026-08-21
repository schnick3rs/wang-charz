import {ascensionPackageRepository} from "#server/data/ascension-packages.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug');
    const item = ascensionPackageRepository.find((species) => species.key === slug);

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Ascension Package not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});