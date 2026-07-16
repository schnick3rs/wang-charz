import {z} from "zod";

export const ModificationSchema = z.object({
    targetGroup: z.string(),
    targetValue: z.string(),
    modifier: z.number().default(0).optional(),
    rank: z.number().default(0).optional(),
    condition: z.string().nullable().optional(),
});