import { IBrandsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBrand = (repo: IBrandsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
            queryClient.invalidateQueries({
                queryKey: ["brand", id]
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления бренда", error);
        }
    });

    return deleteMut;
}