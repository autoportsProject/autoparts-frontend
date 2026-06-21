import { ICategoriesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
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
            notifications.show({
                title: "Успех",
                message: "Категория успешно удалена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления категории", error);
        }
    });

    return deleteMut;
}