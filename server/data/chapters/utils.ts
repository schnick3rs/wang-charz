import {stringToKebab} from "#server/data/utils.ts";
import {getLegacySource} from "#server/data/legacy-sources.ts";

export function chapterz(
    bookKey: string,
    sourcePage: number,
    name: string,
    primarch: string = '',
    affiliation: string = '',
    founding: string = '',
) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage || null,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        primarch,
        affiliation,
        founding,
    };
};