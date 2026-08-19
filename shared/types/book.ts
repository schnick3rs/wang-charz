import {z} from 'zod';

export const BookSchema = z.object({
    key: z.string(),
    title: z.string(),
    version: z.string().optional(),

    isOfficial: z.boolean().default(true),

    description: z.string().optional(),
    builder: z.object({
        visible: z.boolean().default(false).describe('Define if this option should be shown'),
        disabled: z.boolean().default(true),
        badge: z.string().optional(),
    }).optional(),

    link: z.string().optional(),
    path: z.string().optional(),
});
export type Book = z.infer<typeof BookSchema>;

export const BookRepositorySchema = z.array(BookSchema);
export type BookRepository = z.infer<typeof BookRepositorySchema>;