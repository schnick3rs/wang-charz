import { z } from "zod";
import {LegacySourceSchema} from "./source";

const ThreatAttributesSchema = z.object({
    strength: z.number(),
    agility: z.number(),
    toughness: z.number(),
    intellect: z.number(),
    willpower: z.number(),
    fellowship: z.number(),
    initiative: z.number(),
});

const ResilienceSchema = z.object({
    total: z.number(),
    armourRating: z.number(),
    armourName: z.string(),
});

const TraitsSchema = z.object({
    defence: z.number(),
    speed: z.number(),
    wounds: z.number(),
    shock: z.number(),
    resolve: z.number(),
    conviction: z.number(),
    passiveAwareness: z.number().optional(),
    resilience: z.number(),
});

const SkillSchema = z.object({
    name: z.string(),
    value: z.number(),
});

const SkillsSchema = z.object({
    default: z.number(),
    others: z.array(SkillSchema).default([]),
});

const DamageSchema = z.object({
    static: z.number(),
    ed: z.number(),
});

export const ThreatAttackSchema = z.object({
    name: z.string(),
    type: z.enum(["ranged-weapon", "melee-weapon"]),
    damage: DamageSchema,
    range: z.number().optional(), // melee weapons may omit range
    salvo: z.number().optional(),
    ap: z.number(),
    traits: z.array(z.string()),
});
export type ThreatAttack = z.infer<typeof ThreatAttackSchema>

const SpecialAbilitySchema = z.object({
    name: z.string().optional(),
    type: z.enum(['Battlecry', 'Action', 'Ruin', 'Wrath', 'Complication', 'Reaction', 'Determination', 'Annihilation']).optional(),
    effect: z.string().optional(),
});
export type SpecialAbility = z.infer<typeof SpecialAbilitySchema>

export const ThreatSchema = z.object({
    key: z.string(),
    source: LegacySourceSchema,
    faction: z.string(),
    name: z.string(),
    classification: z.array(z.enum(['Troops','Elites','Adversaries', 'Monstrous Creatures'])).max(5).default([]),
    keywords: z.array(z.string()),
    attributes: ThreatAttributesSchema,
    traits: TraitsSchema,
    skills: SkillsSchema,
    resilience: ResilienceSchema,
    size: z.string(),
    sizeModifier: z.number().optional(),
    attacks: z.array(ThreatAttackSchema).optional(),
    specialAbilities: z.array(SpecialAbilitySchema),
});

export type Threat = z.infer<typeof ThreatSchema>;

export const ThreatRepositorySchema = z.array(ThreatSchema);

