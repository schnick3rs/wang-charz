import {stringToKebab} from "../utils";
import {getLegacySource} from "../legacy-sources";

export function talent(bookKey: string, sourcePage, name, cost, tags = '') {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        cost,
        hint: '',
        tags: tags.split(',').map((k) => k.trim()),
        requirements: [],
        allowedMultipleTimes: false,
    };
}

export const requireAttribute = function(key, value) {
    return { condition: 'must', type: 'attribute', key, value };
};

export const requireSkill = function(key, value) {
    return { condition: 'must', type: 'skill', key, value };
};
export const requireTrait = function(key, value) {
    return { condition: 'must', type: 'trait', key, value };
};

export const requireRank = function(value) {
    return { condition: 'must', type: 'character', key: 'Rank', value: value };
};

export const requireSpecies = function(species, not = false) {
    return {
        condition: 'must',
        type: 'species',
        value: [ species ],
    };
};

export const requireKeyword = function(keywords, not = false) {
    return {
        condition: not ? 'mustNot' : 'must',
        type: 'keyword',
        key: [ ...keywords.split(',') ],
    };
};

export const requireTier = function(value) {
    return { condition: 'must', type: 'character', key: 'Tier', value: value };
};