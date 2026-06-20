import { IProductsRepo, ProductQuery } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useProductsList = (query: ProductQuery, repo: IProductsRepo) => {
    const {data: products, isLoading, error} = useQuery({
        queryKey: ["products", query],
        queryFn: async () => {
            const res = await repo.getAll(query);
            return res;
        }
    });

    return {
        products,
        isLoading,
        serverError: error
    };
}