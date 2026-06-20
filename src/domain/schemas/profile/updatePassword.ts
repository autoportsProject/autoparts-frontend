import z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z.string().min(6, "Пароль должен быть длиной хотя бы 6 символов"),
    confirmPassword: z.string().min(1, "Повторите новый пароль")
}).refine(data => data.newPassword === data.currentPassword, {
    error: "Пароли должны совпадать",
    path: ["confirmPassword"]
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;