export function stringToKebab(text: string) {
    return text.toLowerCase().replace(/\W/gm, '-');
}

export function kebabToCamel(slug: string) {
    return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

export function stringToKebabToCamel(text: string) {
    const slug = stringToKebab(text);
    return kebabToCamel(slug);
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

export function requireFreetext(text: string) {
    return {
        condition: 'must',
        type: 'text',
        value: text
    }
}

export const requireCharacterTier = function(value) {
    return { condition: 'must', type: 'character', key: 'Tier', value: value };
};

export const requireCampaignTier = function(value) {
    return { condition: 'must', type: 'campaign', key: 'Tier', value: value };
};