import {Threat, ThreatRepositorySchema} from "../shared/schemas/threat.schema";
import {core} from "./threats/core";

export const rawRepository = [
    ...core,
];

export const threatsRepository: Threat[] = ThreatRepositorySchema.parse(rawRepository);
