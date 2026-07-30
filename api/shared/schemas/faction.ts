import { z } from "zod";
import {PagedLegacySourceSchema} from "./source";
import {ModificationSchema} from "./core";

const BackgroundSectionEntrySchema = z.object({
    key: z.string(),
    title: z.string(),
    snippet: z.string(),
    plusOne: z.string(), // e.g. "Resolve", "Determination", "Conviction", "Influence", "Max Wounds", "Max Shock"
    type: z.enum(["Origin", "Accomplishment", "Goal"]),
    modification: ModificationSchema,
});

export const FactionSchema = z.object({
    name: z.string(),
    source: PagedLegacySourceSchema,
    key: z.string(),
    group: z.string(),
    backgroundSection: z.array(BackgroundSectionEntrySchema),
    objectives: z.array(z.string()),
    advancedCreationKeywords: z.array(z.string()),
});

export type Faction = z.infer<typeof FactionSchema>;

export const FactionRepositorySchema = z.array(FactionSchema);
