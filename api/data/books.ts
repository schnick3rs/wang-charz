import {Book, BookRepositorySchema} from "../shared/schemas/book";

const books: Book[] = [
    // Official
    { title: 'Core Rules', key: 'core', version: 'v2.1', link: 'https://www.drivethrurpg.com/product/249388/Wrath--Glory-Core-Rules?affiliate_id=466959' },
    { title: 'Forsaken System Player`s Guide', key: 'fspg', version: 'v2.0', link: 'https://www.drivethrurpg.com/product/303930/Wrath--Glory--Forsaken-System-Players-Guide?affiliate_id=466959' },
    { title: 'Redacted Records I', key: 'red1', version: 'v1.0', link: 'https://www.drivethrurpg.com/product/343896/Wrath--Glory--Redacted-Records?affiliate_id=466959' },
    { title: 'Redacted Records II', key: 'red2', version: 'v1.0', link: 'https://www.drivethrurpg.com/de/product/388102/warhammer-40-000-wrath-glory-redacted-records-2?affiliate_id=466959' },
    { title: 'Aeldari - Inheritance of Embers', key: 'aioe', version: 'v1.0', link: 'https://www.drivethrurpg.com/de/product/305327/warhammer-40-000-wrath-and-glory-aeldari-inheritance-of-embers?affiliate_id=466959' },
    { title: 'Vow of Absolution', key: 'voab', version: 'v1.0', link: 'https://www.drivethrurpg.com/en/product/416203/warhammer-40-000-wrath-glory-vow-of-absolution' },
    // Small books
    { title: 'Affliction Ascendant', key: 'afas', version: 'v1.0', link: 'https://www.drivethrurpg.com/product/343904/Wrath--Glory--Affliction-Ascendant?affiliate_id=466959' },
    { title: 'Church of Steel', key: 'cos', version: 'v1.0', link: 'https://www.drivethrurpg.com/product/343889/Wrath--Glory--Church-of-Steel?affiliate_id=466959' },
    { title: 'The Null Hypothesis', key: 'tnh', version: 'v1.0', link: 'https://www.drivethrurpg.com/product/343894/Wrath--Glory--The-Null-Hypothesis?affiliate_id=466959' },
    { title: 'Abhumans (Beta)', key: 'coreab', version: 'v0.5' },
    { title: 'Core Rules', key: 'core10', version: 'v1' },
    // Doctors of Doom
    { title: 'Doctors of Doom Compendium', key: 'dod', version: '', path: '' },
    { title: 'Godless Heathens', key: 'gohe', version: 'v0.2', path: '' },
    { title: 'Shadow of the Imperium Sandbox', key: 'soti', version: 'v0.1' },
    // Homebrews (Up to date)
    { title: 'An Abundance of Apocrypha', key: 'aaoa', version: 'v7.0', path: '/vault/an-abundance-of-apocrypha' },
    { title: 'An Abundance of Apocrypha', key: 'aaoa2', version: 'v2.0', path: '/vault/an-abundance-of-apocrypha' },
    { title: 'Tome of Glory', key: 'tog', version: '', path: '/vault/tome-of-glory' },
    { title: 'Astra Militarum Brew', key: 'amb', version: '', path: '/vault/astra-militarum-brew' },
    // Other (Outdated)
    { title: 'Legacy of the Necrontyr', key: 'lotn', version: '', path: '/vault/legacy-of-the-necrontyr' },
    { title: 'The High Altar of Technology', key: 'thaot', version: '', path: '/vault/the-high-altar-of-technology' },
    { title: 'Let The Galaxy Burn', key: 'ltgb', version: '', path: '/vault/let-the-galaxy-burn' },
    { title: 'ArdentPurple\'s Tyranid Bestiary', key: 'aptb', version: '', path: '/vault/ardentpurples-tyranid-bestiary' },
    { title: 'Javelin\'s Tyranid Bestiary', key: 'jtb', version: '', path: '/vault/javelins-tyranid-bestiary' },
    { title: 'Agents of the Golden Throne', key: 'aotgt', version: '', path: '/vault/agents-of-the-golden-throne' },
    { title: 'The Emperor\'s Angels', key: 'tea', version: '', path: '/vault/the-emperors-angels' },
    { title: 'Hesperaxs\'s Vault', key: 'heva', version: '', path: '/vault/hesperaxs-vault' },
    { title: 'God Engines', key: 'goen', version: '', path: '/vault/god-engines' },
    { title: 'Pax Imperialis', key: 'pax', version: '', path: '/vault/pax-imperialis' },
    { title: 'The Deathwatch - Slayer of the Alien Hordes', key: 'sotah', version: '', path: '/vault/the-deathwatch---slayers-of-the-alien-horde' },
];

export const bookRepository: Book[] = BookRepositorySchema.parse(books);

export function getBook(key: string): Book | undefined {
    return books.find((book) => book.key === key);
}

export default bookRepository;