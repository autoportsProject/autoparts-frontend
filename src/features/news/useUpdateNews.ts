import { INewsRepo, NewsUpdateDto } from "@/domain";
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
        },
        onError: (error) => {
            console.error("Ошибка обновления новости", error);
        }
    });

    return update;
}