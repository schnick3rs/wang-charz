
export function calcCharacterCost(data: CharacterDataType) {
    let cost = 0

    cost += calcSpeciesCost(data)
    cost += calcArchetypeCost(data)
    cost += calcAscensionCost(data)
    cost += calcAttributeCost(data)
    cost += calcSkillCost(data)
    cost += calcTalentCost(data)
    cost += calcPsychicPowersCost(data)
    cost += calcOtherCost(data)

    return cost;
}

export function calcStatCost(data: CharacterDataType) {
    return calcAttributeCost(data) + calcSkillCost(data)
}

export function calcSpeciesCost(data: CharacterDataType) {
    return data.species.cost
}

export function calcArchetypeCost(data: CharacterDataType) {
    return data.archetype.cost
}

export function calcAscensionCost(data: CharacterDataType) {
    if (data.ascensions.length === 0) return 0
    return data.ascensions.map((a) => a.cost).reduce((a, b) => a + b)
}

/**
 * total attribute cost as of CORE v3, pg.24
 * @param data
 */
export function calcAttributeCost(data: CharacterDataType) {
    const totalCostByRating = data.enabledHouseRules.includes('legacy-stat-costs')
        ? [0, 0, 4, 10, 18, 33, 51, 72, 104, 140, 180, 235, 307]
        : [0, 0, 4, 10, 20, 35, 55, 80, 110, 145, 185, 230, 280]

    return Object.values(data.attributes).reduce((sum, value) => {
        const rating = value ?? 0
        return sum + (totalCostByRating[Math.min(8, rating)] ?? 0)
    }, 0)
}

/**
 * total skill cost as of CORE v3, pg.25
 * @param data
 */
export function calcSkillCost(data: CharacterDataType) {
    const totalCostByRating = data.enabledHouseRules.includes('legacy-stat-costs')
        ? [0, 1, 3, 6, 10, 20, 32, 46, 70]
        : [0, 2, 6, 12, 20, 30, 42, 56, 72]

    return Object.values(data.skills).reduce((sum, value) => {
        const rating = value ?? 0
        return sum + (totalCostByRating[Math.min(8, rating)] ?? 0)
    }, 0)
}

/**
 * TODO ensure to handle extra cost
 *
 * @param data
 */
export function calcTalentCost(data: CharacterDataType) {
    if (data.talents.length === 0) return 0
    return data.talents.map((a) => a.cost).reduce((a, b) => a + b)
}

export function calcPsychicPowersCost(data: CharacterDataType) {
    if (data.psychicPowers.length === 0) return 0
    return data.psychicPowers.map((a) => a.cost).reduce((a, b) => a + b)
}

/**
 * starting wealth increment
 * maybe also languages could go here?
 *
 * @param data
 */
export function calcOtherCost(data: CharacterDataType) {
    let cost = 0

    if (data.languages.length > 0) {
        cost += data.languages.map((a) => a.cost).reduce((a, b) => a + b)
    }

    // TODO wealth cost

    return cost
}