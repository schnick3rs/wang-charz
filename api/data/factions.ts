import {Faction, FactionRepositorySchema} from "../shared/schemas/faction";
import {core} from "./factions/core";
import {aioe} from "./factions/aioe";
import {aaoa} from "./factions/aaoa";
import {fspg} from "./factions/fspg";

export const rawFactionRepository = [
    ...core,
    ...fspg,
    ...aaoa,
    ...aioe,
];

export const factionRepository: Faction[] = FactionRepositorySchema.parse(rawFactionRepository);
