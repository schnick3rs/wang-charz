import {filterBySource} from "#server/utils/filter.ts";
import {frameworkRepository} from "#server/data/frameworks.repository.ts";

const ONE_HOUR = 'public, max-age=3600';


export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(frameworkRepository, query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});