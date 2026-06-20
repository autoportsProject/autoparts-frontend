import { ICompanyRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useCompany = (repo: ICompanyRepo) => {
    const {data: company, isLoading, error} = useQuery({
        queryKey: ["company"],
        queryFn: async () => {
            const res = await repo.get();
            return res;
        }
    });

    return {
        company,
        isLoading,
        serverError: error
    };
}