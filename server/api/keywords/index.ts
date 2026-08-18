import {filterBySource} from "#server/utils/filter.ts";
import keywordRepository from "#server/data/keywords.ts";

const ONE_HOUR = 'public, max-age=3600';

export function filterByParent<T extends { parentKeyword: string }>(
    items: T[],
    parent?: string
): T[] {
    if (!parent) {
        return items;
    }

    return items.filter((item) => item.parentKeyword.toLocaleUpperCase() === parent.toLocaleUpperCase() );
}

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const items = filterBySource(filterByParent(keywordRepository, query.parent as string | undefined), query.source);

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});