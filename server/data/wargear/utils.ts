import {getLegacySource} from "../legacy-sources";
import {stringToKebab} from "../utils";

const RARITY_LOOKUP = {
    'C': 'Common',
    'U': 'Uncommon',
    'R': 'Rare',
    'V': 'Very Rare',
    'L': 'Unique',
};

export function gear(
    bookKey: string,
    sourcePage: number,
    name: string,
    value: string,
    keywords: string,
    stub: boolean = false
): Partial<Wargear> {

    const valueMatch = value.match(/\d+/g);
    const rarityMatch = value.match(/[a-zA-Z]+/g);
    const valuePart: number = valueMatch ? parseInt(valueMatch[0]) : 0;
    const rarityPart: string = rarityMatch ? rarityMatch[0].toUpperCase() : 'L';

    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
        name,
        hint: '',
        type: 'Misc',
        subtype: '',
        value: valuePart,
        rarity: RARITY_LOOKUP[rarityPart],
        keywords: keywords.split(',').map((k)=>k.trim()),
        stub: stub,
        meta: [],
    };
}


export function armour(
    subtype: string,
    armourRating: number,
    traits: string | undefined = undefined
) {
    return {
        type: 'Armour',
        subtype: subtype,
        meta: [
            {
                type: 'armour',
                armourRating: armourRating,
                traits: traits ? traits.split(',').map((k)=>k.trim()) : [],
            } as ArmourProfile
        ],
    };
};

export function simpleRange(
    subtype: string,
    range: string,
    damageStatic: string,
    damageEd: string,
    ap: number,
    salvo: number,
    traits: string,
    specialTrait: never,
) {

    let finalTraits = traits ? traits.split(',').map((k)=>k.trim()) : [];

    if (specialTrait) {
        finalTraits.push('Special*');
    }

    return {
        type: 'Ranged Weapon',
        subtype: subtype,
        meta: [
            {
                type: 'ranged-weapon',
                range: range,
                damage: {
                    static: parseInt(damageStatic),
                    ed: parseInt(damageEd),
                },
                ap: ap,
                salvo: salvo,
                traits: finalTraits,
                special: specialTrait,
            }
        ],
    };
};

export function toolz(subtype: string | undefined = undefined, snippet = '') {
    return {
        type: 'Tools & Equipment',
        subtype: subtype ? subtype : undefined,
        snippet
    };
}

/**
 *
 * @param staticPart
 * @param ed
 * @param ap
 * @param range
 * @param salvo
 * @param traits
 * @param label
 * @returns {{damage: {static: *, ed: *}, traits: *, salvo: *, range: *, label: undefined, type: string, ap: *}}
 */
export function metaRange(
    staticPart,
    ed,
    ap,
    range,
    salvo,
    traits,
    label = undefined,
    thrownX: number | undefined = undefined,
): RangedProfile {
    return {
        type: 'ranged-weapon',
        range,
        damage: { static: staticPart, ed },
        ap,
        salvo,
        traits,
        label,
        thrownX,
    };
}

export function rangez(
    subtype: string,
    damage: number | string,
    ed: number,
    ap: number,
    range: number | string,
    salvo: number | string,
    traits: string | undefined = undefined,
) {
    return {
        type: 'Ranged Weapon',
        subtype: subtype ? subtype : undefined,
        meta: [
            metaRange(damage, ed, ap, range < 1 ? 1 : range, salvo, traits ? traits.split(',').map((k)=>k.trim()) : []),
        ],
    };
}

export function thrownWeaponBuilder(
    subtype: string,
    damage: number,
    ed: number,
    ap: number,
    thrownX: number,
    salvo: number | string,
    traits: string | undefined = undefined,
) {
    return {
        type: 'Ranged Weapon',
        subtype: subtype ? subtype : undefined,
        meta: [
            metaRange(damage, ed, ap, `Thrown(Sx${thrownX})`, salvo, traits ? traits.split(',').map((k)=>k.trim()) : [], undefined, thrownX),
        ],
    };
}

export function metaMelee(
    staticPart: string | number,
    ed: number,
    ap: number,
    range: number,
    traits: string[],
    label: string | undefined = undefined,
    ignoreStrength: boolean = false
): MeleeProfile {
    return {
        type: 'melee-weapon',
        range,
        damage: { static: staticPart, ed, ignoreStrength },
        ap,
        traits,
        label,
    };
}

export function meleez(
    subtype: string | undefined,
    damage: string | number,
    ed: number,
    ap: number,
    range: number = 0,
    traits: string = '',
): Partial<Wargear> {
    return {
        type: 'Melee Weapon',
        subtype: subtype ? subtype : undefined,
        meta: [
            metaMelee(damage, ed, ap, range < 1 ? 1 : range, traits ? traits.split(',').map((k)=>k.trim()) : []),
        ],
    };
}