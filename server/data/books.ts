const books : Book[] = [
    // Official
    {
        key: 'core',
        title: 'Core Rules',
        version: 'v3.0',
        description: 'All the needed stuff from the Core Rules',
        isOfficial: true,
        link: 'https://www.drivethrurpg.com/product/249388/Wrath--Glory-Core-Rules?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Forsaken System Player`s Guide',
        key: 'fspg',
        version: 'v2.0',
        isOfficial: true,
        description: 'Good Imperial Archetypes',
        link: 'https://www.drivethrurpg.com/product/303930/Wrath--Glory--Forsaken-System-Players-Guide?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Redacted Records I',
        key: 'red1',
        version: 'v1.0',
        isOfficial: true,
        description: 'Mostly... juicy talents',
        link: 'https://www.drivethrurpg.com/product/343896/Wrath--Glory--Redacted-Records?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Redacted Records II',
        key: 'red2',
        version: 'v1.0',
        isOfficial: true,
        description: 'Mostly... more juicy talents',
        link: 'https://www.drivethrurpg.com/de/product/388102/warhammer-40-000-wrath-glory-redacted-records-2?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Aeldari - Inheritance of Embers',
        key: 'aioe',
        version: 'v1.0',
        isOfficial: true,
        link: 'https://www.drivethrurpg.com/de/product/305327/warhammer-40-000-wrath-and-glory-aeldari-inheritance-of-embers?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: true,
            badge: 'WIP'
        },
        description: 'A vast amount of options for Aeldari and Drukhari',
    },
    {
        title: 'Vow of Absolution',
        key: 'voab',
        version: 'v1.0',
        isOfficial: true,
        description: 'Astartes Archetypes and Options',
        link: 'https://www.drivethrurpg.com/en/product/416203/warhammer-40-000-wrath-glory-vow-of-absolution?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Sons of Russ',
        key: 'sonr',
        version: 'v1.0',
        isOfficial: true,
        description: 'Space Wolves Archetypes, Talents, Powers and Wargear',
        link: 'https://www.drivethrurpg.com/en/product/532635/warhammer-40-000-wrath-glory-sons-of-russ?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: true,
            badge: 'WIP'
        },
    },
    {
        title: 'Lex Imperialis',
        key: 'lex',
        version: 'v1.0',
        isOfficial: true,
        description: 'Adeptus Arbites Archetypes, Talents and Wargear',
        link: 'https://www.drivethrurpg.com/en/product/552043/warhammer-40-000-wrath-glory-lex-imperialis?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },

    // Small books
    {
        title: 'Affliction Ascendant',
        key: 'afas',
        version: 'v1.0',
        isOfficial: true,
        link: 'https://www.drivethrurpg.com/product/343904/Wrath--Glory--Affliction-Ascendant?affiliate_id=466959',
        builder: {
            visible: false,
            disabled: false,
        },
    },
    {
        title: 'Church of Steel',
        key: 'cos',
        version: 'v1.0',
        isOfficial: true,
        link: 'https://www.drivethrurpg.com/product/343889/Wrath--Glory--Church-of-Steel?affiliate_id=466959',
        builder: {
            visible: false,
            disabled: false,
        },
    },
    {
        title: 'The Null Hypothesis',
        key: 'tnh',
        version: 'v1.0',
        isOfficial: true,
        link: 'https://www.drivethrurpg.com/product/343894/Wrath--Glory--The-Null-Hypothesis?affiliate_id=466959',
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5',
        isOfficial: false,
    },
    // Doctors of Doom
    {
        title: 'Doctors of Doom Compendium', key: 'dod',
        isOfficial: false,
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Godless Heathens', key: 'gohe', version: 'v0.2',
        isOfficial: false
    },
    {
        title: 'Shadow of the Imperium Sandbox', key: 'soti', version: 'v0.1',
        isOfficial: false
    },
    // Homebrews (Up to date)
    {
        title: 'An Abundance of Apocrypha', key: 'aaoa', version: 'v7.0', path: '/vault/an-abundance-of-apocrypha',
        isOfficial: false,
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'An Abundance of Apocrypha', key: 'aaoa2', version: 'v2.0', path: '/vault/an-abundance-of-apocrypha',
        isOfficial: false
    },
    {
        title: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory',
        isOfficial: false,
        builder: {
            visible: true,
            disabled: false,
        },
    },
    {
        title: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew',
        isOfficial: false
    },
    // Other (Outdated)
    {
        title: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr',
        isOfficial: false
    },
    {
        title: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology',
        isOfficial: false
    },
    {
        title: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn',
        isOfficial: false
    },
    {
        title: 'ArdentPurple\'s Tyranid Bestiary',
        key: 'aptb',
        isOfficial: false,
        path: '/vault/ardentpurples-tyranid-bestiary'
    },
    {
        title: 'Javelin\'s Tyranid Bestiary', key: 'jtb',
        isOfficial: false, path: '/vault/javelins-tyranid-bestiary'
    },
    {
        title: 'Agents of the Golden Throne', key: 'aotgt',
        isOfficial: false, path: '/vault/agents-of-the-golden-throne'
    },
    {
        title: 'The Emperor\'s Angels', key: 'tea',
        isOfficial: false, path: '/vault/the-emperors-angels'
    },
    {
        title: 'Hesperaxs\'s Vault', key: 'heva',
        isOfficial: false, path: '/vault/hesperaxs-vault'
    },
    {
        title: 'God Engines', key: 'goen',
        isOfficial: false, path: '/vault/god-engines'
    },
    {
        title: 'Pax Imperialis', key: 'pax',
        isOfficial: false, path: '/vault/pax-imperialis'
    },
    {
        title: 'The Deathwatch - Slayer of the Alien Hordes',
        key: 'sotah',
        isOfficial: false,
        path: '/vault/the-deathwatch---slayers-of-the-alien-horde'
    },
];

export const bookRepository: Book[] = BookRepositorySchema.parse(books);

export function getBook(key: string): Book | undefined {
    return books.find((book) => book.key === key);
}

export default bookRepository;