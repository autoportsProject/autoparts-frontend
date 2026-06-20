import { AttributeType } from "@/domain/enums/product";
import z from "zod";

export const addAttribSchema = z.object({
    name: z.string().min(1, "Введите название атрибута"),
    type: z.enum(AttributeType, "Выберите корректный тип значения атрибута"),
    unit: z.string().optional(),
    categoryId: z.uuid("Некорректный формат ID категории")
});
export const updateAttribSchema = z.object({
    name: z.string().min(1, "Введите название атрибута"),
    type: z.enum(AttributeType, "Выберите корректный тип значения атрибута"),
    unit: z.string().optional()
});

export type AddAttribFormValues = z.infer<typeof addAttribSchema>;
export type UpdateAttribFormValues = z.infer<typeof updateAttribSchema>;