import {getLegacySource} from "../legacy-sources";
import {stringToKebab} from "../utils";

export function simpleStub(
    bookKey: string,
    sourcePage,
    name,
    hint,
    stub = true
) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage || null,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        hint,
        teaser: hint,
        stub: stub,
    };
}
