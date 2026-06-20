import z from "zod";

export const updateContactsSchema = z.object({
    contactEmail: z.email("Некорректный формат почты").optional().or(z.literal("")),
    contactPhone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Для телефона нужен формат +7 (ххх) ххх-хх-хх").optional().or(z.literal(""))
});

export type UpdateContactsFormValues = z.infer<typeof updateContactsSchema>;