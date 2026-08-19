import {z} from 'zod'

// ---------- Shared primitives ----------

const NonNegInt = z.number().int().min(0)

// ---------- Nested object schemas ----------

const SpeciesSchema = z.object({
    key: z.string(),
    label: z.string(),
    cost: z.number(),
})

const FactionSchema = z.object({
    key: z.string(),
    label: z.string(),
})

const ArchetypeSchema = z.object({
    key: z.string(),
    value: z.string(),
    cost: z.number(),
    tier: z.number(),
})

const AttributesSchema = z.object({
    strength: NonNegInt,
    agility: NonNegInt,
    toughness: NonNegInt,
    intellect: NonNegInt,
    willpower: NonNegInt,
    fellowship: NonNegInt,
    initiative: NonNegInt,
})

// All known skills seen in exports. If new skills get added by homebrew
// content, .catchall lets extra keys through as numbers instead of failing.
const SkillsSchema = z
    .object({
        athletics: NonNegInt,
        awareness: NonNegInt,
        ballisticSkill: NonNegInt,
        cunning: NonNegInt,
        deception: NonNegInt,
        insight: NonNegInt,
        intimidation: NonNegInt,
        investigation: NonNegInt,
        leadership: NonNegInt,
        medicae: NonNegInt,
        persuasion: NonNegInt,
        pilot: NonNegInt,
        psychicMastery: NonNegInt,
        scholar: NonNegInt,
        stealth: NonNegInt,
        survival: NonNegInt,
        tech: NonNegInt,
        weaponSkill: NonNegInt,
    })
    .catchall(NonNegInt)

const LanguageSchema = z.object({
    name: z.string(),
    cost: z.number(),
    source: z.string(),
})

const KeywordSchema = z.object({
    name: z.string(),
    source: z.string(),
    type: z.string(),
    replacement: z.string().optional(),
})

const TalentSchema = z.object({
    id: z.string(),
    name: z.string(),
    key: z.string(),
    cost: z.number(),
    source: z.string(),
})

const AscensionPackageSchema = z.object({
    key: z.string(),
    value: z.string(),
    cost: z.number(),
    sourceTier: z.number(),
    targetTier: z.number(),
    featureChoices: z.record(z.string(), z.string()).optional(),
})

const WargearSchema = z.object({
    id: z.string(),
    name: z.string(),
    variant: z.string().optional(),
    source: z.string(),
})

const BackgroundSchema = z.object({
    origin: z.string(),
    accomplishment: z.string(),
    goal: z.string(),
    plusOne: z.string(),
})

// Enhancements are the most polymorphic array in the sheet (traits vs
// ability-text entries look quite different) - most fields optional,
// only targetGroup/targetValue/source are guaranteed present.
const EnhancementSchema = z.object({
    name: z.string().optional(),
    targetGroup: z.string(),
    targetValue: z.string(),
    modifier: z.number().optional(),
    effect: z.string().optional(),
    id: z.string().optional(),
    ascendedTiers: z.number().optional(),
    source: z.string(),
})

const HouserulesSchema = z
    .object({
        'rank-advancement-type': z.string(), // e.g. "milestone" — tighten to z.enum([...]) once you've enumerated all options
        'skill-attribute-advancement-costs': z.string(), // e.g. "v10"
    })
    .partial()
    .catchall(z.string())

const PointsSpendSchema = z.object({ points: z.number(), spend: z.number() })
const SpendOnlySchema = z.object({ spend: z.number() })
const PointsOnlySchema = z.object({ points: z.number() })
const DefianceSchema = z.object({ passed: z.number(), failed: z.number() })
const FluffSchema = z.object({ notes: z.string() })

// ---------- Top-level character schema ----------

export const LegacyCharacterSchema = z.object({
    id: z.string(),
    version: z.number(), // bump on breaking shape changes; drives migrations, see below
    settingSelected: z.boolean(),
    settingTier: z.number(),
    settingTitle: z.string(),
    settingHomebrewContent: z.array(z.string()),
    settingHouserules: HouserulesSchema,
    customXp: z.string(), // stored as string in source data, not number
    customRank: z.string(),
    name: z.string().min(1),

    species: SpeciesSchema,
    faction: FactionSchema,
    archetype: ArchetypeSchema,

    attributes: AttributesSchema,
    skills: SkillsSchema,
    customSkills: z.array(z.unknown()).default([]), // shape unknown from sample data — tighten once you have an example

    languages: z.array(LanguageSchema).default([]),
    keywords: z.array(KeywordSchema).default([]),
    talents: z.array(TalentSchema).default([]),
    mutations: z.array(z.unknown()).default([]), // shape unknown from sample data
    psychicPowers: z.array(z.unknown()).default([]), // shape unknown from sample data
    ascensionPackages: z.array(AscensionPackageSchema).default([]),
    wargear: z.array(WargearSchema).default([]),

    background: BackgroundSchema,
    enhancements: z.array(EnhancementSchema).default([]),

    objectives: z.array(z.unknown()).default([]), // shape unknown from sample data
    objectiveArchived: z.boolean(),

    faith: PointsSpendSchema,
    maxWounds: SpendOnlySchema,
    maxShock: SpendOnlySchema,
    assets: PointsOnlySchema,
    wealth: PointsSpendSchema,
    wrath: PointsSpendSchema,
    reloads: PointsSpendSchema,
    defiance: DefianceSchema,

    fluff: FluffSchema,
})

export type LegacyCharacterType = z.infer<typeof LegacyCharacterSchema>

// ---------- Import helper ----------

export type ImportResult =
    | { success: true; data: LegacyCharacterType }
    | { success: false; error: z.ZodError; raw: unknown }

/**
 * Decode a base64-encoded JSON character export and validate it.
 * Use this on the client when a user pastes/uploads their old character string.
 */
export function parseImportedCharacter(base64: string): ImportResult {
    let raw: unknown
    try {
        const json = atob(base64.trim())
        raw = JSON.parse(json)
    } catch {
        return {
            success: false,
            error: new z.ZodError([
                {
                    code: 'custom',
                    path: [],
                    message: 'Could not decode base64 or parse JSON — file may be corrupted.',
                },
            ]),
            raw: base64,
        }
    }

    const result = LegacyCharacterSchema.safeParse(raw)
    if (!result.success) {
        return { success: false, error: result.error, raw }
    }
    return { success: true, data: result.data }
}