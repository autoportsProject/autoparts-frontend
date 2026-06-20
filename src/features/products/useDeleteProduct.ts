import { IProductsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = (repo: IProductsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["product", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Товар успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления товара",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка удаления товара", error);
        }
    });

    return deleteMut;
}