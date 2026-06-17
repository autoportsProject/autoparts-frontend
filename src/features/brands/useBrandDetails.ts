import { IBrandsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useBrandDetails = (id: string, repo: IBrandsRepo) => {
    const {data: brand, isLoading, error} = useQuery({
        queryKey: ["brand", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        brand,
        isLoading,
        serverError: error
    };
}