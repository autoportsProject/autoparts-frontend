import { IPromotionsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePromotion = (repo: IPromotionsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["promotions"]
            });
            queryClient.invalidateQueries({
                queryKey: ["promotion", id]
            });
            notifications.show({
                title: "Успех",
                message: "Акция успешно удалена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления акции", error);
        }
    });

    return deleteMut;
}