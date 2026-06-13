import z from "zod";

export const forSuppliersSchema = z.object({
    companyName: z.string().min(1, "Нужно название компании"),
    contactName: z.string().min(1, "Нужно имя контакного лица"),
    phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Нужен формат +7 (xxx) xxx-xx-xx'),
    email: z.email("Некорректный email"),
    comment: z.string().optional()
});

export type ForSuppliersFormValues = z.infer<typeof forSuppliersSchema>;