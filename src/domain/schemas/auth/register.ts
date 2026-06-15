import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Введите свое имя"),
    email: z.email("Некорректный формат почты"),
    phoneNumber: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх").optional().or(z.literal("")),
    password: z.string().min(6, "Пароль хотя бы 6 символов"),
    confirmPassword: z.string().min(1, "Введите пароль еще раз для подтверждения")
}).refine((data) => data.password === data.confirmPassword, {
    error: "Пароли должны совпадать",
    path: ["confirmPassword"]
});

export type RegisterFormValues = z.infer<typeof registerSchema>;