import { IProductsRepo, ProductUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: ProductUpdateDto;
}

export const useUpdateProduct = (repo: IProductsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["product", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Товар успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления товара",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка обновления товара", error);
        }
    });

    return update;
}