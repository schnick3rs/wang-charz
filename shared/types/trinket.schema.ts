import {z} from "zod";

export const TrinketSchema = z.object({
    group: z.number(),
    number: z.number(),
    description: z.string(),
})

export type Trinket = z.infer<typeof TrinketSchema>;