import { UserRole } from "@/domain/enums/user";
import z from "zod";

export const updateUserRoleSchema = z.object({
    role: z.enum(UserRole, "Некорректная роль")
});
export const addUserSchema = z.object({
    name: z.string().min(1, "Введите имя пользователя"),
    email: z.email("Некорректный формат почты"),
    password: z.string().min(6, "Пароль хотя бы 6 символов"),
    phoneNumber: z.string().optional(),
    role: z.enum(UserRole, "Некорректная роль")
});
export const updateUserSchema = z.object({
    name: z.string().min(1, "Введите имя пользователя"),
    phoneNumber: z.string().optional()
});

export type UpdateUserRoleFormValues = z.infer<typeof updateUserRoleSchema>;
export type AddUserFormValues = z.infer<typeof addUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;