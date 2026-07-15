import z from "zod";
import {BookSchema} from "./book";

export const SourceSchema = z.object({
    book: BookSchema,
    page: z.number().optional(),
});
export type Source = z.infer<typeof SourceSchema>;

export const LegacySourceSchema = z.object({
    book: z.string(),
    key: z.string(),
    version: z.string(),
    link: z.string().optional(),
    path: z.string().optional(),
});
export type LegacySource = z.infer<typeof LegacySourceSchema>;

export const PagedLegacySourceSchema = LegacySourceSchema.extend({
    page: z.union([z.number(), z.string()]).nullable().optional(),
});
export type PagedLegacySource = z.infer<typeof PagedLegacySourceSchema>;