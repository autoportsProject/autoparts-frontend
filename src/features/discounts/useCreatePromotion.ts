import { PromotionCreateDto, IPromotionsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePromotion = (repo: IPromotionsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: PromotionCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["promotions"]
            });
            notifications.show({
                title: "Успех",
                message: "Акция успешно создана",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания акции", error);
        }
    });

    return create;
}