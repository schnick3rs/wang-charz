import {core} from "./factions/core";
import {aioe} from "./factions/aioe";
import {aaoa} from "./factions/aaoa";
import {fspg} from "./factions/fspg";
import {lex} from "./factions/lex";

export const rawFactionRepository = [
    ...core,
    ...fspg,
    ...aaoa,
    ...aioe,
    ...lex,
];

export const factionRepository: Faction[] = FactionRepositorySchema.parse(rawFactionRepository);
