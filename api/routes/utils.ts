export function filterBySource<T extends { source: { key: string } }>(
    items: T[],
    sourceQuery: unknown
): T[] {
    if (typeof sourceQuery !== 'string' || !sourceQuery) return items;
    const sources = sourceQuery.split(',');
    return items.filter((item) => sources.includes(item.source.key));
}