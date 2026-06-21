import { PromotionUpdateDto, IPromotionsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProps {
    id: string;
    req: PromotionUpdateDto;
}

export const useUpdatePromotion = (repo: IPromotionsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["promotion", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["promotions"]
            });
            notifications.show({
                title: "Успех",
                message: "Акция успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления акции", error);
        }
    });

    return update;
}