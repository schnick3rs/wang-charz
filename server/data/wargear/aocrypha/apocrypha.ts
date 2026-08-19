import {aaoaMelee} from "./melee.apocrypha";
import aaoaRanged from "./ranged.apocrypha";
import {aaoaWeaponUpgrades} from "./upgrades.apocrypha";
import {aaoaArmour} from "./armour.apocrypha";
import {aaoaToolsEquipment} from "./tools.apocrypha";
import {aaoaAugmetics} from "./augmetics.apocrypha";

export const aaoa: Wargear[] = [
    ...aaoaMelee,
    ...aaoaRanged,
    ...aaoaWeaponUpgrades,
    ...aaoaArmour,
    ...aaoaToolsEquipment,
    ...aaoaAugmetics,
];
