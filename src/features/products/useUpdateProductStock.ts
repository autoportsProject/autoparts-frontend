import { IProductsRepo, ProductStockUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: ProductStockUpdateDto;
}

export const useUpdateProductStock = (repo: IProductsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.updateStock(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["product", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Наличие товара успешно обновлено",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления наличия товара", error);
        }
    });

    return update;
}