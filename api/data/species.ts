import {core} from "./species/core";
import {Species, SpeciesRepositorySchema} from "../shared/schemas/species";
import {fspg} from "./species/fspg";
import {aioe} from "./species/aioe";
import {aaoa} from "./species/aaoa";
import {dod} from "./species/dod";
import {gohe} from "./species/gohe";



export const rawRepository = [
    ...core,
    ...fspg,
    ...aioe,
    ...aaoa,
    ...dod,
    ...gohe,
];

export const speciesRepository: Species[] = SpeciesRepositorySchema.parse(rawRepository);
