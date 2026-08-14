import bookRepository from "#server/data/books.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {
    const items = bookRepository;

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return items;
});