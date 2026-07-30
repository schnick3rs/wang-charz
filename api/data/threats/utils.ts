import {getLegacySource} from "../legacy-sources";
import {stringToKebab} from "../utils";
import {SpecialAbility, ThreatAttack} from "../../shared/schemas/threat.schema";

export function createThreatMeleeAttack(
    name: string,
    statik: number,
    ed: number = 1,
    ap: number = 0,
    traits: string[] = [],
    range: number = 1,
): ThreatAttack {
    return {
        name: name,
        type: 'melee-weapon',
        damage: {
            static: statik,
            ed,
        },
        range: range,
        ap,
        traits,
    }
}

export function createThreatRangedAttack(
    name: string,
    statik: number,
    ed: number,
    range: number,
    salvo: number,
    ap: number = 0,
    traits: string[] = [],
): ThreatAttack {
    return {
        name: name,
        type: 'ranged-weapon',
        damage: {
            static: statik,
            ed,
        },
        range: range,
        ap,
        traits,
    }
}


export function createSimpleThreatDetermination(dice: number): SpecialAbility {
    return {
        type: 'Determination',
        effect: `Spend 1 Ruin to roll ${dice}d6.`
    }
}

export const levelMap = {
    t: 'Troops',
    e: 'Elite',
    a: 'Adversary',
    c: 'Monstrous Creature',
    v: 'Vehicle',
};

export function skillRating(name: string, value: number) {
    return {
        name,
        value,
    }
}

export const classificationHelper = function (shortcode) {
    const split = shortcode.split('');
    return split.map((code) => levelMap[code]);
};

export function threatBuilder(
    bookKey: string,
    sourcePage: number,
    faction: string,
    name: string,
    level: string
) {
    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        faction,
        classification: classificationHelper(level),
        stub: false,
    };
}

export function attributArray(...value: number[]){
    return {
        strength: value[0] || 1,
        toughness: value[1] || 1,
        agility: value[2] || 1,
        initiative: value[3] || 1,
        willpower: value[4] || 1,
        intellect: value[5] || 1,
        fellowship: value[6] || 1,
    }
}

export function attributz(string) {
    const splits = string.split(' ').map((i) => i.trim());
    return {
        attributes: {
            strength: splits[0],
            toughness: splits[1],
            agility: splits[2],
            initiative: splits[3],
            willpower: splits[4],
            intellect: splits[5],
            fellowship: splits[6],
        }
    }
}