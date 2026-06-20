import { IProductsRepo, ProductPriceUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: ProductPriceUpdateDto;
}

export const useUpdateProductPrice = (repo: IProductsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.updatePrice(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["product", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            notifications.show({
                title: "Успех",
                message: "Цена товара успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления цены товара",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка обновления цены товара", error);
        }
    });

    return update;
}