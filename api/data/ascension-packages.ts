import {
    AscensionPackage,
    AscensionPackageRepositorySchema,
} from "../shared/schemas/ascension-package.schema";
import {core} from "./ascension-packages/core";
import {red2} from "./ascension-packages/red2";
import {aaoa} from "./ascension-packages/aaoa";
import {tog} from "./ascension-packages/tog";
import {ltgb} from "./ascension-packages/ltgb";
import {aotgt} from "./ascension-packages/aotgt";
import {thaot} from "./ascension-packages/thaot";
import {sotah} from "./ascension-packages/sotah";
import {goen} from "./ascension-packages/goen";
import {voab} from "./ascension-packages/voab";

export const rawAscensionPackageRepository = [
    ...core,
    ...red2,
    ...aaoa,
    ...tog,
    ...ltgb,
    ...aotgt,
    ...thaot,
    ...sotah,
    ...goen,
    ...voab,
]

export const ascensionPackageRepository: AscensionPackage[] = AscensionPackageRepositorySchema.parse(rawAscensionPackageRepository)