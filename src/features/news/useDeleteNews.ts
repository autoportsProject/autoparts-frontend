import { INewsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNews = (repo: INewsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["news-list"]
            });
            queryClient.invalidateQueries({
                queryKey: ["news", id]
            });
        },
        onError: (error) => {
            console.error("Delete news error", error);
        }
    });

    return deleteMut;
}