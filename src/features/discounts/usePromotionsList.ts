import { IPromotionsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const usePromotionsList = (repo: IPromotionsRepo) => {
    const {data: promotions, isLoading, error} = useQuery({
        queryKey: ["promotions"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        promotions,
        isLoading,
        serverError: error
    };
}