import { ICategoriesRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useCategoryDetails = (id: string, repo: ICategoriesRepo) => {
    const {data: category, isLoading, error} = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        category,
        isLoading,
        serverError: error
    };
}