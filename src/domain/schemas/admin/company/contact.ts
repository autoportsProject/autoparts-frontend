import z from "zod";

export const addContactSchema = z.object({
    name: z.string().min(1, "Введите название контакта"),
    description: z.string().optional()
});
export const updateContactSchema = addContactSchema;

export type AddContactFormValues = z.infer<typeof addContactSchema>;
export type UpdateContactFormValues = z.infer<typeof updateContactSchema>;