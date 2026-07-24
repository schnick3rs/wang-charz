import {Wargear, WargearRepositorySchema} from "../shared/schemas/wargear.schema";
import {core} from "./wargear/core";
import {aioe} from "./wargear/aeldariAioe";
import {aaoa} from "./wargear/aocrypha/apocrypha";
import {voab} from "./wargear/astartesVowOfAbsolution";
import {cos} from "./wargear/churchOfSteel";
import {fspg} from "./wargear/forsakenSystemPlayersGuide";
import {red2Eclisiarchy, red2Mechanicus} from "./wargear/redactedRecords";
import {afas} from "./wargear/aflictionAscended";
import {tnh} from "./wargear/theNullHepothesis";
import {doctorsOfDoom} from "./wargear/doctorsOfDoom";
import {gohe} from "./wargear/legacy/gohe";

export const rawRepository = [
    // official
    ...core,
    ...aioe,
    ...voab,
    ...cos,
    ...fspg,
    ...red2Eclisiarchy,
    ...red2Mechanicus,
    ...tnh,
    ...afas,
    // homebrew
    ...aaoa,
    ...doctorsOfDoom,
    ...gohe,
    // lotn ?
    // tea ?
    // aaoav2 ?
    // pax ?

];

export const wargearRepository: Wargear[] = WargearRepositorySchema.parse(rawRepository);


/*
  ...core,
  ...aioe,
  ...red2_eclisiarchy,
  ...red2_mechanicus,
  ...doctorsOfDoom,
  ...fspg,
  ...cos,
  ...tnh,
  ...afas,
  ...aaoa,
  ...aaoav2,
  ...pax,
  ...lotn,
  ...tea,
  ...glhe,
  ...voab,
 */