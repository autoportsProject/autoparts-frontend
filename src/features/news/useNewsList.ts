import { INewsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useNewsList = (repo: INewsRepo) => {
    const {data: newsList, isLoading, error} = useQuery({
        queryKey: ["news-list"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        newsList,
        isLoading,
        serverError: error
    };
}