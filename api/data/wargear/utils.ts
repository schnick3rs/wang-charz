import {getLegacySource} from "../legacy-sources";
import {stringToKebab} from "../utils";
import {ArmourProfile, MeleeProfile, RangedProfile} from "../../shared/schemas/wargear.schema";

const rarity = {
    'C': 'Common',
    'U': 'Uncommon',
    'R': 'Rare',
    'V': 'Very Rare',
    'L': 'Unique',
};

export function gear(bookKey: string, sourcePage, name, value, keywords, stub = false) {
    const valueMatch = value.match(/\d+/g);
    const rarityMatch = value.match(/[a-zA-Z]+/g);
    const valuePart = valueMatch ? valueMatch[0] : '-';
    const rarityPart = rarityMatch ? rarityMatch[0].toUpperCase() : 'L';

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
        rarity: rarity[rarityPart],
        keywords: keywords.split(',').map((k)=>k.trim()),
        stub: stub,
        meta: [],
    };
}


export function armour(subtype, armourRating, traits = undefined) {
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

export function simpleRange(subtype, range, damageStatic, damageEd, ap, salvo, traits, specialTrait) {

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

export function toolz(subtype = undefined, snippet = '') {
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
    label = undefined
): RangedProfile {
    return {
        type: 'ranged-weapon',
        range,
        damage: { static: staticPart, ed },
        ap,
        salvo,
        traits,
        label,
    };
}

export function rangez (subtype, damage, ed, ap, range, salvo, traits) {
    return {
        type: 'Ranged Weapon',
        subtype: subtype ? subtype : undefined,
        meta: [
            metaRange(damage, ed, ap, range < 1 ? 1 : range, salvo, traits ? traits.split(',').map((k)=>k.trim()) : []),
        ],
    };
};

export function metaMelee(
    staticPart,
    ed,
    ap,
    range,
    traits: string[],
    label = undefined
): MeleeProfile {
    return {
        type: 'melee-weapon',
        range,
        damage: { static: staticPart, ed },
        ap,
        traits,
        label,
    };
}

export function meleez (subtype, damage, ed, ap, range, traits = undefined) {
    return {
        type: 'Melee Weapon',
        subtype: subtype ? subtype : undefined,
        meta: [
            metaMelee(damage, ed, ap, range < 1 ? 1 : range, traits ? traits.split(',').map((k)=>k.trim()) : []),
        ],
    };
};