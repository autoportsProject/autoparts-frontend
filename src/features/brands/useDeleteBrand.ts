import { IBrandsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
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
            notifications.show({
                title: "Успех",
                message: "Бренд успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления бренда", error);
        }
    });

    return deleteMut;
}