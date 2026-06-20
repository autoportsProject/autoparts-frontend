import z from "zod";

export const updateCompanyInfoSchema = z.object({
    name: z.string().min(1, "Введите название компании"),
    description: z.string().optional(),
    address: z.string().optional()
});

export type UpdateCompanyInfoFormValues = z.infer<typeof updateCompanyInfoSchema>;