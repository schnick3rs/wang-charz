import {LegacySource} from "../shared/schemas/source";
import bookRepository from "../../api/data/books";

export const legacySources: LegacySource[] = bookRepository.map((book) => {
    return {
        book: book.title,
        key: book.key,
        version: book.version,
        link: book.link,
        path: book.path,
    };
});

export function getLegacySource(key: string): LegacySource | undefined {
    return legacySources.find((source) => source.key === key);
}