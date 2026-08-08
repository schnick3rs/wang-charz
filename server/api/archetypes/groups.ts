import archetypeRepository from "#server/data/archetypes.ts";
import {filterBySource} from "#server/utils/filter.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(archetypeRepository, query.source);

    const groups = [...new Set(items.map((item) => item.group))].sort();

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return groups;
});