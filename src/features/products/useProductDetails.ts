import { IProductsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useProductDetails = (id: string, repo: IProductsRepo) => {
    const {data: product, isLoading, error} = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        product,
        isLoading,
        serverError: error
    };
}