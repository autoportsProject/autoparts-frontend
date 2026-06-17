import z from "zod";

export const addPromotionSchema = z.object({
    name: z.string().min(1, "Введите название акции"),
    description: z.string().optional(),
    publishedAt: z.string().optional(),
    imagePath: z.string().optional()
});
export const updatePromotionSchema = addPromotionSchema;

export type AddPromotionFormValues = z.infer<typeof addPromotionSchema>;
export type UpdatePromotionFormValues = z.infer<typeof updatePromotionSchema>;