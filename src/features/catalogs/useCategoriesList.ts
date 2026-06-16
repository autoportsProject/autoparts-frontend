import { ICategoriesRepo } from "@/domain"
import { categories } from "@/shared/mocks/catalogs";
import { useQuery } from "@tanstack/react-query"

export const useCategoriesList = (repo: ICategoriesRepo) => {
    const {data: categories, isLoading, error} = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });    

    return {
        categories,
        isLoading,
        serverError: error
    };
}

export const useCategoriesMocksList = (repo: ICategoriesRepo) => {
    const catalogs = categories;
    return {
        categories: catalogs,
        isLoading: false,
    };
}