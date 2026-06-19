import z from "zod";

export const addCertificateSchema = z.object({
    name: z.string().min(1, "Введите название сертификата"),
    imagePath: z.string().optional()
});
export const updateCertificateSchema = addCertificateSchema;

export type AddCertificateFormValues = z.infer<typeof addCertificateSchema>;
export type UpdateCertificateFormValues = z.infer<typeof updateCertificateSchema>;