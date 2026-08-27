import {filterBySource} from "#server/utils/filter.ts";
import {psychicDisciplinesRepository} from "#server/data/psychic-disciplines.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(psychicDisciplinesRepository, query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});