import { IPromotionsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const usePromotionDetails = (id: string, repo: IPromotionsRepo) => {
    const {data: promotion, isLoading, error} = useQuery({
        queryKey: ["promotion", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        promotion,
        isLoading,
        serverError: error
    };
}