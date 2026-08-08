import {filterBySource} from "#server/utils/filter.ts";
import {speciesRepository} from "#server/data/species.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(speciesRepository, query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});