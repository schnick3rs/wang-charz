import {core} from "./frameworks/core";
import {fspg} from "./frameworks/fosakenSystemPlayersGuide";

const rawFrameworkRepository = [
    ...core,
    ...fspg,
];

export const frameworkRepository: Framework[] = FrameworkRepositorySchema.parse(rawFrameworkRepository);
