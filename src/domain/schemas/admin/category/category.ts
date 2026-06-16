import z from "zod";

export const addCategorySchema = z.object({
    name: z.string().min(1, "Введите название категории")
});
export const updateCategorySchema = addCategorySchema;

export type AddCategoryFormValues = z.infer<typeof addCategorySchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;