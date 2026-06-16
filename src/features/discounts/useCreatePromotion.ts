import { PromotionCreateDto, IPromotionsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePromotion = (repo: IPromotionsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: PromotionCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["promotions"]
            });
        },
        onError: (error) => {
            console.error("Ошибка создания акции", error);
        }
    });

    return create;
}