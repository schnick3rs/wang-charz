import {filterBySource} from "#server/utils/filter.ts";
import {wargearRepository} from "#server/data/wargear.repository.ts";

const ONE_HOUR = 'public, max-age=3600';

export function filterByName<T extends { name: string }>(
    items: T[],
    name?: string
): T[] {
    if (!name) {
        return items;
    }

    return items.filter((item) => item.name.toLocaleUpperCase() === name.toLocaleUpperCase() );
}

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(filterByName(wargearRepository, query.name as string | undefined), query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});