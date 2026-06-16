import { ICategoriesRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = (repo: ICategoriesRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            queryClient.invalidateQueries({
                queryKey: ["category", id]
            });
        },
        onError: (error) => {
            console.error("Delete category error", error);
        }
    });

    return deleteMut;
}