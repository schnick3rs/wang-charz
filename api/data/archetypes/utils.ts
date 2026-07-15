import {Modification, Prerequisite, WargearOption} from "../../shared/schemas/archetype";
import {stringToKebab} from "../../db/static/_stringUtils";
import {getLegacySource} from "../../data/legacySources";

export const addModifier = function(targetGroup: string, targetValue: string, modifier = 0, rank = 0, condition: string | undefined = undefined): Modification {
    return {
        targetGroup,
        targetValue,
        modifier,
        rank,
        condition,
    };
}

export const _statCosts: Record<'attributes' | 'skills', number[]> = {
    attributes: [0, 0, 4, 10, 20, 35, 55, 80, 110, 145, 185, 230, 280],
    skills: [0, 2, 6, 12, 20, 30, 42, 56, 72],
};

export const cost = function (total = 0, archetypeCost = 0, statsCost = 0, speciesCost = 0, otherCost = 0) {
    return {
        cost: total,
        costs: {
            total,
            archetype: archetypeCost,
            stats: statsCost,
            species: speciesCost,
            other: otherCost,
        }
    };
}

/**
 * Creates an archetype object with specified attributes, including source information,
 * faction, species details, and other properties.
 *
 * @param {string} bookKey - The key identifying the source of the archetype.
 * @param {string|number} sourcePage - The page or identifier within the source material.
 * @param {string} faction - The faction the archetype belongs to.
 * @param {string} name - The name of the archetype.
 * @param {number} tier - The rank or level of the archetype.
 * @param {string} species - The species information, which may include additional details delimited by a '/' or '-'.
 * @param {boolean} [stub=false] - Whether the archetype is a placeholder or incomplete.
 * @return {Object} An object representing the archetype, including details about the source, faction, species, and other attributes.
 */
export function archetype(
    bookKey: string,
    sourcePage: string | number,
    faction: string,
    name: string,
    tier: number,
    species: string,
    stub = false
) {
    let speciesSourceKey = 'core';
    let speciesName = 'Human';
    let split: string[] = [];
    split = species.split('/');
    if ( split.length === 2) {
        speciesSourceKey = split[0];
        speciesName = split[1];
    } else {
        split = species.split('-');
        if ( split.length >= 2 ){
            speciesSourceKey = split[0];
            speciesName = split.splice(1).map((i)=>i.charAt(0).toUpperCase() + i.slice(1)).join(' ');
        } else {
            speciesName = species;
        }
    }

    const speciesObject = {
        name: speciesName,
        key: `${speciesSourceKey.toLowerCase()}-${stringToKebab(speciesName)}`,
        sourceKey: speciesSourceKey.toLowerCase(),
    };

    return {
        source: {
            ...getLegacySource(bookKey),
            page: sourcePage,
        },
        key: `${stringToKebab(`${bookKey} ${name}`)}`,
            name,
            // Defaults to a real number rather than the `cost` helper itself, so
            // stub entries that skip `...cost(...)`/`...costz(...)` still satisfy
            // ArchetypeSchema instead of leaking a function reference into `cost`.
            cost: 0,
            costs: { total: 0, archetype: 0, stats: 0, species: 0, other: 0 },
        tier,
            faction,
            factionKey: `${stringToKebab(`core ${faction}`)}`,
            species: [ speciesObject ],
            stub,
            wargear: [],
            prerequisites: [],
            archetypeFeatures: [],
            influence: 0,
    };
}

export const reqAttribute = function(key: string, value: number): Prerequisite {
    return {
        group: 'attributes',
        value: key,
        threshold: value,
    };
};

export const reqSkill = function(key: string, value: number): Prerequisite {
    return {
        group: 'skills',
        value: key,
        threshold: value,
    };
};

export const costz = function(total = 0, prerequisites: Prerequisite[] = []) {
    let skillAndAttributeCost = 0;
    prerequisites.forEach((pre) => {
        skillAndAttributeCost += _statCosts[pre.group][pre.threshold];
    });
    const archetypeCost = total - skillAndAttributeCost;
    return {
        ...cost(total, archetypeCost, skillAndAttributeCost),
        prerequisites,
    };
}

export const  simpleAbility = function(name: string, snippet: string | undefined = undefined, description: string | undefined = undefined) {
    let finalSnippet = snippet;
    let finalName = name;

    if ( snippet === undefined ) {
        const parts = name.split(':').map((i)=>i.trim());
        finalName = parts[0];
        finalSnippet = parts[1];
    }

    return {
        name: finalName,
        snippet: finalSnippet,
        description: description ? description : `<p>${finalSnippet}</p>`,
    };
};

export const  suggestedAttributes = function(str: number, tou: number, agi: number, ini: number, wil: number, int: number, fel: number): Prerequisite[] {
    return [
        { group: 'attributes', value: 'strength', threshold: str },
        { group: 'attributes', value: 'toughness', threshold: tou },
        { group: 'attributes', value: 'agility', threshold: agi },
        { group: 'attributes', value: 'initiative', threshold: ini },
        { group: 'attributes', value: 'willpower', threshold: wil },
        { group: 'attributes', value: 'intellect', threshold: int },
        { group: 'attributes', value: 'fellowship', threshold: fel },
    ]
}

export const wargearOptionFromString = function(partString: string): WargearOption {
    let part = partString.trim();
    const gear: WargearOption = {};

    // of it does start with a number
    if (!isNaN(Number(part.split(' ')[0]))) {
        gear.amount = part.split(/ /)[0];
        part = part.split(/ (.+)/)[1];
        // remove trailing s, indicating a plural
        part = part.replace(/s$/, "");
    }

    // if it contains a /
    if (part.indexOf('/') > 0) {
        let parts = part.split('/');
        gear.name = parts[0];
        gear.variant = parts[1];
    } else {
        gear.name = part;
    }

    return gear;
}

export const  wargearz = function(wargearString: string): WargearOption[] {
    const gears = wargearString.split(',').map(partString => {
        let part = partString.trim();

        let parts = part.split(' or ');
        if (parts.length > 1) {
            return {
                name: part,
                selected: '',
                options: parts.map((p) => wargearOptionFromString(p)),
            }
        } else {
            return wargearOptionFromString(part);
        }

    })
    return gears;
}
