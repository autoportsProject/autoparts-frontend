import z from "zod";

export const registerSchema = z.object({
    name: z.string().nullable(),
    phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Нужен формат +7 (xxx) xxx-xx-xx'),
    password: z.string().min(6, "Пароль хотя бы 6 символов")
});

export type RegisterFormValues = z.infer<typeof registerSchema>;