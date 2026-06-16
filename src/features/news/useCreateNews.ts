import { INewsRepo, NewsCreateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNews = (repo: INewsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: NewsCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["news-list"]
            });
        },
        onError: (error) => {
            console.error("Create news error", error);
        }
    });
    
    return create;
}