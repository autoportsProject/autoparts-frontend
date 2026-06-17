import { IAppealsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useAppealsList = (repo: IAppealsRepo) => {
    const {data: appeals, isLoading, error} = useQuery({
        queryKey: ["appeals"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        appeals,
        isLoading,
        serverError: error
    };
}