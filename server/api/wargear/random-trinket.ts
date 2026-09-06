import {trinkets} from "#server/data/trinkets.ts";


export default defineEventHandler(() => {

    const random = Math.floor(Math.random() * trinkets.length);

    return trinkets[random];
});