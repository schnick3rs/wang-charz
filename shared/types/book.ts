import { z } from 'zod';

export const BookSchema = z.object({
    title: z.string(),
    key: z.string(),
    version: z.string(),
    link: z.string().optional(),
    path: z.string().optional(),
});
export type Book = z.infer<typeof BookSchema>;

export const BookRepositorySchema = z.array(BookSchema);
export type BookRepository = z.infer<typeof BookRepositorySchema>;