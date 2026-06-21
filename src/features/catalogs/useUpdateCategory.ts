import { CategoryUpdateDto, ICategoriesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProps {
    id: string;
    req: CategoryUpdateDto;
}

export const useUpdateCategory = (repo: ICategoriesRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["category", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            notifications.show({
                title: "Успех",
                message: "Категория успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления категории", error);
        }
    });

    return update;
}