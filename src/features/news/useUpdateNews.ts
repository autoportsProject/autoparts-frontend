import { INewsRepo, NewsUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: NewsUpdateDto;
}

export const useUpdateNews = (repo: INewsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["news", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["news-list"]
            });
            notifications.show({
                title: "Успех",
                message: "Новость успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления новости", error);
        }
    });

    return update;
}