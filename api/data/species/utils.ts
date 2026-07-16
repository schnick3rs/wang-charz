import {stringToKebab, stringToKebabToCamel} from "../utils";
import {getLegacySource} from "../legacySources";

export const addModifier = function(targetGroup, targetValue, modifier = 0, rank = 0, condition = undefined) {
    return {
        targetGroup,
        targetValue,
        modifier,
        rank,
        condition,
    };
}

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
    }
}

export const statMax = function (str, tou, agi, ini, wil, int, fel, spe) {
    return {
        attributeMaximums: [
            { name: 'Strength', value: str },
            { name: 'Agility', value: agi },
            { name: 'Toughness', value: tou },
            { name: 'Intellect', value: int },
            { name: 'Willpower', value: wil },
            { name: 'Fellowship', value: fel },
            { name: 'Initiative', value: ini },
        ],
        traitMaximums: [
            { name: 'Speed', value: spe },
        ],
    }
};

export const commonNames = function (namesString) {
    return { commonNames: namesString.split(',').map(part => part.trim()) };
};

export const cost = function (cost, stats = 0, species = 0, other = 0) {
    return {
        cost,
        costs: {
            total: cost,
            stats,
            species,
            other,
        }
    };
}

export const species = function (bookKey, sourcePage, group, name, hint, costy, speed, stub = false) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        hint,
        group,
        speed,
        stub,
        ...cost(costy,costy,0,0),
        ...statMax(8,8,8,8,8,8,8,8),
        speciesFeatures: [],
    };
};
