import z from "zod";

export const loginSchema = z.object({
    login: z.string().min(1, "Нужен логин или телефон"),
    password: z.string().min(1, "Введите пароль")
});

export type LoginFormValues = z.infer<typeof loginSchema>;