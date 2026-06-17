import z from "zod";

export const addBrandSchema = z.object({
    name: z.string().min(1, "Введите название бренда")
});
export const updateBrandSchema = addBrandSchema;

export type AddBrandFormValues = z.infer<typeof addBrandSchema>;
export type UpdateBrandFormValues = z.infer<typeof updateBrandSchema>;