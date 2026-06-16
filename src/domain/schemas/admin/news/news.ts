import z from "zod";

export const addNewsSchema = z.object({
    name: z.string().min(1, "Введите название новости"),
    description: z.string().optional(),
    publishedAt: z.string().optional(),
    imagePath: z.string().optional()
});
export const updateNewsSchema = addNewsSchema;

export type AddNewsFormValues = z.infer<typeof addNewsSchema>;
export type UpdateNewsFormValues = z.infer<typeof updateNewsSchema>;