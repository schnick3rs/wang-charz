import {filterBySource} from "#server/utils/filter.ts";
import {factionRepository} from "#server/data/factions.ts";

const ONE_HOUR = 'public, max-age=3600';


export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(factionRepository, query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});