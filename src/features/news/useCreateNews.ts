import { INewsRepo, NewsCreateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNews = (repo: INewsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: NewsCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["news-list"]
            });
            notifications.show({
                title: "Успех",
                message: "Новость успешно создана",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания новости", error);
        }
    });
    
    return create;
}