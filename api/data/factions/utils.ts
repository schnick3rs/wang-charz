import {getLegacySource} from "../legacySources";
import {stringToKebab, stringToKebabToCamel} from "../utils";


export function faction(bookKey, sourcePage, group, name) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage || null,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        group,
        name,
        backgroundSection: [],
        objectives: [],
    };
};

export const background = function (text, plusOne, type) {
    const parts = text.split(': ');
    const title = parts[0];
    const snippet = parts[1];
    const modification = plusOne === '[ANY] Keyword'
        ? { targetGroup: 'keywords', targetValue: '[Any]' }
        : { targetGroup: 'traits', targetValue: stringToKebabToCamel(plusOne), modifier: 1 };
    return {
        key: `${stringToKebab(title)}`,
        title,
        snippet,
        plusOne,
        type,
        modification,
    };
};