import { INewsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
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
            notifications.show({
                title: "Успех",
                message: "Новость успешно удалена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления новости", error);
        }
    });

    return deleteMut;
}