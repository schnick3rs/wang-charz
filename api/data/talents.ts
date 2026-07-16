import {Talent, TalentRepositorySchema} from "../shared/schemas/talent";
import {core} from "./talents/core";
import {red2} from "./talents/red2";
import {voab} from "./talents/voab";
import {red1} from "./talents/red1";
import {aaoa} from "./talents/aaoa";


export const rawRepository = [
    ...core,
    ...aaoa,
    ...red1,
    ...red2,
    ...voab,
];

export const talentsRepository: Talent[] = TalentRepositorySchema.parse(rawRepository);
