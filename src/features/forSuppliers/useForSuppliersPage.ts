import { IForSuppliersPageRepo } from "@/domain/repos/IForSuppliersPageRepo";
import { useQuery } from "@tanstack/react-query";

export const useForSuppliersPage = (repo: IForSuppliersPageRepo) => {
    const {data: page, isLoading, error} = useQuery({
        queryKey: ["forSuppliers"],
        queryFn: async () => {
            const res = await repo.get();
            return res;
        }
    });

    return {
        page,
        isLoading,
        serverError: error
    };
}