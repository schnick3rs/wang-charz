import { z } from 'zod'

export const libraryLinkSchema = z.object({
    text: z.string(),
    route: z.string(),
})

export const libraryItemSchema = z.object({
    key: z.string(),
    title: z.string(),
    subtitle: z.string(),
    imageSrc: z.string(),
    htmlText: z.string(),
    icon: z.string().optional(),
    link: libraryLinkSchema,
    isActive: z.boolean(),
    classes: z.array(z.string()),
})

export const libraryItemsSchema = z.array(libraryItemSchema)

export type LibraryLink = z.infer<typeof libraryLinkSchema>
export type LibraryItem = z.infer<typeof libraryItemSchema>
export type LibraryItems = z.infer<typeof libraryItemsSchema>

export const library: LibraryItems = [
    {
        key: 'species',
        title: 'Species',
        subtitle: 'Browse Species, Abhumans and Variants',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-dna1',
        link: { text: 'Browse Species', route: '/library/species' },
        isActive: true,
        classes: [],
    },
    {
        key: 'archetypes',
        title: 'Archetypes',
        subtitle: 'Browse Archetypes, filter by Species and Groups',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-duality-mask',
        link: { text: 'Browse Archetypes', route: '/library/archetypes' },
        isActive: true,
        classes: [],
    },
    {
        key: 'ascension-packages',
        title: 'Ascension Packages',
        subtitle: 'Browse Ascension Options and Packages',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-upgrade',
        link: { text: 'Browse Ascensions', route: '/library/ascension-packages' },
        isActive: true,
        classes: [],
    },
    {
        key: 'talents',
        title: 'Talents',
        subtitle: 'Browse Options to flesh out your Character',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-skills',
        link: { text: 'Browse Talents', route: '/library/talents' },
        isActive: true,
        classes: [],
    },
    {
        key: 'keywords',
        title: 'Keywords',
        subtitle: 'Browse Options to flesh out your Character',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-skeleton-key',
        link: { text: 'Browse Keywords', route: '/library/keywords' },
        isActive: true,
        classes: [],
    },
    {
        key: 'psychic-powers',
        title: 'Psychic Powers',
        subtitle: 'Browse Psychic Powers of various Disciplines',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-bolt-spell-cast',
        link: { text: 'Browse Powers', route: '/library/psychic-powers' },
        isActive: true,
        classes: [],
    },
    {
        key: 'psychic-disciplines',
        title: 'Psychic Disciplines',
        subtitle: 'Browse Psychic Disciplines of various Disciplines',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-spell-book',
        link: { text: 'Browse Disciplines', route: '/library/psychic-disciplines' },
        isActive: true,
        classes: [],
    },
    {
        key: 'wargear',
        title: 'Wargear',
        subtitle: 'Browse Weapons, Armour, Equipment and more',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-battle-gear',
        link: { text: 'Browse Wargear', route: '/library/wargear' },
        isActive: true,
        classes: [],
    },
    {
        key: 'factions',
        title: 'Factions',
        subtitle: 'Browse Factions',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-tattered-banner',
        link: { text: 'Browse Factions', route: '/library/factions' },
        isActive: true,
        classes: [],
    },
    {
        key: 'frameworks',
        title: 'Frameworks',
        subtitle: 'Browse Campaign Frameworks',
        imageSrc: '/img/artwork_vault_bright.jpg',
        htmlText: '',
        icon: 'i-game-icons-scroll-unfurled', // no match in source list — guessed
        link: { text: 'Browse Frameworks', route: '/library/frameworks' },
        isActive: true,
        classes: [],
    },
].sort((a,b) => a.title.localeCompare(b.title))