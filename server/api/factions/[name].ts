import {factionRepository} from "#server/data/factions.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const name = getRouterParam(event, 'name');
    const item = factionRepository.find((faction) => faction.name === name?.toLocaleUpperCase());

    if (!item) {
        throw createError({statusCode: 404, statusMessage: 'Faction not found'});
    }

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return item;
});