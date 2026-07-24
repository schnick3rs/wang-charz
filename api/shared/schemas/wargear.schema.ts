import {PagedLegacySourceSchema} from "./source";
import {z} from "zod";
import {ModificationSchema} from "./core";

/** taxonomy
 *
 * Weapons
 *  Melee Weapons
 *   Chain Weapons
 *   Exotic Melee Weapons
 *   Force Weapons
 *   Power Weapons
 *   Aeldari Melee Weapons
 *   Ork Melee Weapons
 *  Ranged Weapons
 *   Bolt Weapons
 *   Las Weapons
 *   Plasma Weapons
 *   Melta Weapons
 *   Projectile Weapons
 *   Flame Weapons
 *   Adeptus Mechanicus Ranged Weapons
 *   Granade & Missile Weapons
 *   Aeldari Ranged Weapons
 *   Ork Ranged Weapons
 *  Weapon Upgrades
 *  Ammo
 * Armour
 *  (Basic) Armour
 *  Powered Armour
 *  Power Field
 *  Astartes Armour
 *  Aeldari Armour
 *  Ork Armour
 * Tools & Equipment
 *  Imperial Equipment
 *  Aeldari Equipment
 *  Ork Equipment
 * Augmetics
 *  Augmetic Enhancements
 *  Augmetic Implants
 *  Aledari Augmetics
 *  Ork Bioniks
 *
 */

export const MeleeProfileSchema = z.object({
    type: z.enum(['melee-weapon']),
    range: z.union([z.number(), z.string()]).default(1),
    damage: z.object({
        static: z.union([z.number(), z.string()]),
        ed: z.union([z.number(), z.string()]),
    }),
    ap: z.union([z.number(), z.string()]).default(0),
    traits: z.array(z.string()).default([]),

    label: z.string().optional().describe('A custom name for this profile')
});
export type MeleeProfile = z.infer<typeof MeleeProfileSchema>

export const RangedProfileSchema = z.object({
    type: z.enum(['ranged-weapon']),
    range: z.union([z.number(), z.string()]),
    damage: z.object({
        static: z.union([z.number(), z.string()]),
        ed: z.union([z.number(), z.string()]),
    }),
    ap: z.union([z.number(), z.string()]).default(0),
    salvo: z.union([z.number(), z.string()]),
    traits: z.array(z.string()).default([]),

    label: z.string().optional().describe('A custom name for this profile')
});
export type RangedProfile = z.infer<typeof RangedProfileSchema>

export const ArmourProfileSchema = z.object({
    type: z.enum(['armour']),
    armourRating: z.number().optional(),
    isInvulnerable: z.boolean().default(false).optional(),
    traits: z.array(z.string()).default([]),
})
export type ArmourProfile = z.infer<typeof ArmourProfileSchema>


export const WargearSchema = z.object({
    source: PagedLegacySourceSchema,
    key: z.string(),

    name: z.string(),
    type: z.string(),
    upgradeType: z.string().optional(),
    subtype: z.string().optional(),
    triptype: z.string().optional(),
    value: z.union([z.number(), z.string()]),
    rarity: z.enum(['Common', 'Uncommon', 'Rare', 'Very Rare', 'Unique']),
    keywords: z.array(z.string()),

    meta: z.array(z.discriminatedUnion('type', [MeleeProfileSchema, RangedProfileSchema, ArmourProfileSchema])),
    modifications: z.array(ModificationSchema).optional(),

    snippet: z.string().optional(),
    hint: z.string().optional(),
    description: z.string().optional(),
    stub: z.boolean().default(false).optional(),
});

export type Wargear = z.infer<typeof WargearSchema>;

export const WargearRepositorySchema = z.array(WargearSchema);

