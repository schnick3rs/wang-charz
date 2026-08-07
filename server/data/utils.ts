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
