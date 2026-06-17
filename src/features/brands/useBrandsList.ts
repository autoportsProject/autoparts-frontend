import { IBrandsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useBrandsList = (repo: IBrandsRepo) => {
    const {data: brands, isLoading, error} = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        brands,
        isLoading,
        serverError: error
    };
}