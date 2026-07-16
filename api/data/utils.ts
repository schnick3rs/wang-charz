export function stringToKebab(text) {
    return text.toLowerCase().replace(/\W/gm, '-');
};

export function kebabToCamel(slug) {
    return slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

export function stringToKebabToCamel(text) {
    const slug = stringToKebab(text);
    return kebabToCamel(slug);
};
