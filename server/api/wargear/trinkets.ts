import {trinkets} from "#server/data/trinkets.ts";

const ONE_HOUR = 'public, max-age=3600';

export default defineEventHandler((event) => {

    setResponseHeader(event, 'Cache-Control', ONE_HOUR);

    return trinkets;
});