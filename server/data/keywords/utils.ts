import {getLegacySource} from "#server/data/legacy-sources.ts";
import {stringToKebab} from "#server/data/utils.ts";

export function keywordBuilder(
    bookKey: string,
    sourcePage: number,
    name: string,
    type: string,
    description: string,
    parentKeyword: string | undefined = undefined,
): Partial<KeywordType> {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage || null,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name: name.toLocaleUpperCase(),
        type,
        description,
        parentKeyword: parentKeyword?.toLocaleUpperCase(),
    };
}


export function bracketedKeywordBuilder(
    bookKey: string,
    sourcePage: number,
    name: string,
    description: string,
    examples: string[] = [],
    examplePage: number | undefined = undefined,
): object {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage || null,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name: name.toLocaleUpperCase(),
        type: 'Bracketed',
        description,
        parentKeyword: undefined,
        examples: examples,
        examplePage: examplePage || undefined,
    };
}
