import z from "zod";

export const loginSchema = z.object({
    email: z.email("Некорректный формат почты"),
    password: z.string().min(1, "Введите пароль")
});

export type LoginFormValues = z.infer<typeof loginSchema>;