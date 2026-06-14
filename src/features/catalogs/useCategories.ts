import { categories } from "@/shared/mocks/catalogs"

export const useCategories = () => {
    return {
        catalogs: categories,
        isLoading: false
    };
}