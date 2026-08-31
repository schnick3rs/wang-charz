import {core} from "#server/data/factions/core";
import {aioe} from "#server/data/factions/aioe";
import {aaoa} from "#server/data/factions/aaoa";
import {fspg} from "#server/data/factions/fspg";
import {lex} from "#server/data/factions/lex";
import {sofr} from "#server/data/factions/sofr.ts";

export const rawFactionRepository = [
    ...core,
    ...fspg,
    ...aaoa,
    ...aioe,
    ...lex,
    ...sofr,
];

export const factionRepository: Faction[] = FactionRepositorySchema.parse(rawFactionRepository);
