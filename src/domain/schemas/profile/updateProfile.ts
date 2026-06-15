import z from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(1, "Введите ваше имя"),
    email: z.email("Некорректный формат почты"),
    phoneNumber: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх").optional().or(z.literal("")),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;