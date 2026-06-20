import z from "zod";

export const updateForSuppliersPageSchema = z.object({
    title: z.string().min(1, "Введите заголовок карточки \"Поставщикам\""),
    content: z.string().min(1, "Введите описание к карточке \"Поставщикам\"")
});

export type UpdateForSuppliersPageFormValues = z.infer<typeof updateForSuppliersPageSchema>;