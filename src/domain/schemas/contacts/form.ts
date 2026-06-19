import { AppealType } from "@/domain/enums/appeal";
import z from "zod";

export const addClientQuestionSchema = z.object({
    category: z.enum(AppealType, "Выберите корректный тип вопроса"),
    managerComment: z.string().min(1, "Введите ваш вопрос"),
    contactPhone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Нужен формат +7 (xxx) xxx-xx-xx'),
    contactEmail: z.email("Некорректный email")
});

export type AddClientQuestionFormValues = z.infer<typeof addClientQuestionSchema>;