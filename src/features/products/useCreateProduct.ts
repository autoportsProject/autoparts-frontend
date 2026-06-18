import { IProductsRepo, ProductCreateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = (repo: IProductsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ProductCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Товар успешно добавлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания товара",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка создания товара", error);
        }
    });

    return create;
}