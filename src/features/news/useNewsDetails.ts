import { INewsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useNewsDetails = (id: string, repo: INewsRepo) => {
    const {data: news, isLoading, error} = useQuery({
        queryKey: ["news", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        news,
        isLoading,
        serverError: error
    };
}