import { IPromotionsRepo } from "@/domain";
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
        },
        onError: (error) => {
            console.error("Ошибка удаления акции", error);
        }
    });

    return deleteMut;
}