import { IAppealsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useAppealDetails = (id: string, repo: IAppealsRepo) => {
    const {data: appeal, isLoading, error} = useQuery({
        queryKey: ["appeal", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        appeal,
        isLoading,
        serverError: error
    };
}