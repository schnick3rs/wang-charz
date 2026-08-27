import {coreAbilities} from "./psychic-powers/abilities";
import {fspg} from "./psychic-powers/fspg";
import {voabPowers} from "./psychic-powers/voabLibrariusPowers";
import {paxNavigatorPowers} from "./psychic-powers/paxNavigatorPowers";
import {aaoaWaaaghPowers} from "./psychic-powers/aaoaWaaaghPowers";
import {aaoaSancticPowers} from "./psychic-powers/aaoaSancticPowers";
import {aaoaLibrariusPowers} from "./psychic-powers/aaoaLibrariusPowers";
import {aaoaAncestrialRites} from "./psychic-powers/aaoaAncestrialRites";
import {aaoaAeldariPowers} from "./psychic-powers/aaoaAeldariPowers";
import {core} from "./psychic-powers/core";

const rawPowersRepository = [
    ...core,
    ...fspg,
    ...voabPowers,
    // Abundance
    ...aaoaAeldariPowers,
    ...aaoaWaaaghPowers,
    ...aaoaSancticPowers,
    ...aaoaLibrariusPowers,
    ...aaoaAncestrialRites,    // outdated
    ...paxNavigatorPowers,
];

export const psychicPowersRepository: PsychicPower[] = PsychicPowerRepositorySchema.parse(rawPowersRepository);

const rawAbilitiesRepository = [
    ...coreAbilities,
];

export const universalAbilitiesRepository: PsychicPower[] = PsychicPowerRepositorySchema.parse(rawAbilitiesRepository);