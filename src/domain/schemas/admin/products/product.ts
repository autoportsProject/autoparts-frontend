import z from "zod";

const attribValueSchema = z.object({
    attributeId: z.uuid("Некорректный ID атрибута"),
    value: z.string("Введите значение атрибута").min(1, "Введите значение атрибута").trim()
});

export const addProductSchema = z.object({
    name: z.string().min(1, "Введите название товара"),
    article: z.string().min(1, "Введите артикул товара"),
    quantity: z.number("Некорректное количество товара"),
    price: z.number("Некорректная цена товара"),
    inStock: z.boolean(),
    description: z.string().optional(),
    imagePath: z.string().optional(),
    brandId: z.uuid("Выберите бренд"),
    categoryId: z.uuid("Товар должен принадлежать какой-то категории"),
    attributeValues: z.array(attribValueSchema).optional()  
});
export const updateProductSchema = addProductSchema;

export type AddProductFormValues = z.infer<typeof addProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;